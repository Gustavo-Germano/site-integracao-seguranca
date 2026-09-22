import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { pool } from "../db.js";
import { enviarEmailAcesso } from "../email.js";

const router = express.Router();


// =====================================================
// GERA O USUÁRIO A PARTIR DO NOME COMPLETO
// =====================================================

function transformarNomeEmLogin(nome) {

    return nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, ".")
        .replace(/^\.+|\.+$/g, "");
}


// =====================================================
// GERA USUÁRIO ÚNICO
// =====================================================

async function gerarUsuarioUnico(nome) {

    const base = transformarNomeEmLogin(nome);

    let usuarioLogin;

    while (true) {

        const numero = Math.floor(
            1000 + Math.random() * 9000
        );

        usuarioLogin =
            `${base}${numero}`;


        const resultado = await pool.query(
            `
            SELECT id
            FROM public.usuarios
            WHERE LOWER(usuario_login) = LOWER($1)
            LIMIT 1
            `,
            [usuarioLogin]
        );


        if (resultado.rows.length === 0) {
            return usuarioLogin;
        }
    }
}


// =====================================================
// GERA SENHA AUTOMÁTICA
// =====================================================

function gerarSenhaTemporaria() {

    let senha = "";

    while (senha.length < 10) {

        senha += crypto
            .randomBytes(8)
            .toString("base64")
            .replace(/[^a-zA-Z0-9]/g, "");
    }

    return senha.slice(0, 10);
}


// =====================================================
// PRIMEIRO ACESSO
// =====================================================

router.post(
    "/primeiro-acesso",
    async (req, res) => {

        const client = await pool.connect();

        try {

            const nome = String(
                req.body.nome || ""
            ).trim();

            const email = String(
                req.body.email || ""
            )
                .trim()
                .toLowerCase();


            // -----------------------------------------
            // VALIDAÇÃO
            // -----------------------------------------

            if (!nome || nome.length < 3) {

                return res.status(400).json({
                    erro:
                        "Informe seu nome completo."
                });
            }


            if (
                !email ||
                !email.includes("@") ||
                !email.includes(".")
            ) {

                return res.status(400).json({
                    erro:
                        "Informe um e-mail válido."
                });
            }


            await client.query("BEGIN");


            // -----------------------------------------
            // PROCURA E-MAIL
            // -----------------------------------------

            const existente =
                await client.query(
                    `
                    SELECT
                        id,
                        nome,
                        email,
                        senha,
                        usuario_login,
                        ativo,
                        acesso_inicial
                    FROM public.usuarios
                    WHERE LOWER(email) = LOWER($1)
                    LIMIT 1
                    FOR UPDATE
                    `,
                    [email]
                );


            let usuario;
            let nomeFinal;


            // =================================================
            // E-MAIL JÁ EXISTE
            // =================================================

            if (existente.rows.length > 0) {

                usuario = existente.rows[0];

                nomeFinal = usuario.nome;


                if (!usuario.ativo) {

                    await client.query("ROLLBACK");

                    return res.status(403).json({
                        erro:
                            "Este acesso está desativado."
                    });
                }


                if (usuario.acesso_inicial) {

                    await client.query("ROLLBACK");

                    return res.status(409).json({
                        erro:
                            "Este e-mail já possui um acesso. Verifique sua caixa de entrada."
                    });
                }

            }


            // =================================================
            // E-MAIL AINDA NÃO EXISTE
            // =================================================

            else {

                nomeFinal = nome;

                usuario = null;
            }


            // -----------------------------------------
            // GERA CREDENCIAIS
            // -----------------------------------------

            const usuarioLogin =
                await gerarUsuarioUnico(
                    nomeFinal
                );


            const senhaTemporaria =
                gerarSenhaTemporaria();


            const senhaHash =
                await bcrypt.hash(
                    senhaTemporaria,
                    12
                );


            // =================================================
            // CRIA NOVO USUÁRIO
            // =================================================

            if (!usuario) {

                const novoUsuario =
                    await client.query(
                        `
                        INSERT INTO public.usuarios
                        (
                            nome,
                            email,
                            senha,
                            perfil,
                            role,
                            ativo,
                            usuario_login,
                            acesso_inicial,
                            acesso_inicial_em,
                            treinamento_concluido,
                            modulo_atual,
                            parte_atual
                        )
                        VALUES
                        (
                            $1,
                            $2,
                            $3,
                            'colaborador',
                            'colaborador',
                            TRUE,
                            $4,
                            TRUE,
                            CURRENT_TIMESTAMP,
                            FALSE,
                            1,
                            0
                        )
                        RETURNING
                            id,
                            nome,
                            email
                        `,
                        [
                            nomeFinal,
                            email,
                            senhaHash,
                            usuarioLogin
                        ]
                    );


                usuario =
                    novoUsuario.rows[0];
            }


            // =================================================
            // ATUALIZA USUÁRIO EXISTENTE
            // =================================================

            else {

                await client.query(
                    `
                    UPDATE public.usuarios

                    SET
                        nome = $1,
                        senha = $2,
                        usuario_login = $3,
                        acesso_inicial = TRUE,
                        acesso_inicial_em =
                            CURRENT_TIMESTAMP

                    WHERE id = $4
                    `,
                    [
                        nomeFinal,
                        senhaHash,
                        usuarioLogin,
                        usuario.id
                    ]
                );
            }


            // -----------------------------------------
            // ENVIA E-MAIL
            // -----------------------------------------

            await enviarEmailAcesso({

                nome: nomeFinal,

                email: email,

                usuarioLogin:
                    usuarioLogin,

                senhaTemporaria:
                    senhaTemporaria
            });


            // -----------------------------------------
            // CONFIRMA BANCO
            // -----------------------------------------

            await client.query("COMMIT");


            return res.json({

                mensagem:
                    "Seu acesso foi criado e enviado para o seu e-mail.",

                email: email
            });


        } catch (erro) {

            await client.query("ROLLBACK");

            console.error(
                "Erro no primeiro acesso:",
                erro
            );

            return res.status(500).json({
                erro:
                    "Não foi possível criar seu acesso."
            });

        } finally {

            client.release();
        }
    }
);


// =====================================================
// LOGIN NORMAL
// =====================================================

router.post(
    "/login",
    async (req, res) => {

        try {

            const login = String(
                req.body.login ||
                req.body.email ||
                ""
            )
                .trim()
                .toLowerCase();

            const senha =
                String(
                    req.body.senha || ""
                );


            if (!login || !senha) {

                return res.status(400).json({
                    erro:
                        "Usuário e senha são obrigatórios."
                });
            }


            const resultado =
                await pool.query(
                    `
                    SELECT
                        id,
                        nome,
                        email,
                        senha,
                        perfil,
                        role,
                        ativo,
                        usuario_login,
                        acesso_inicial,
                        treinamento_concluido,
                        modulo_atual,
                        parte_atual,
                        ultimo_login,
                        concluido_em

                    FROM public.usuarios

                    WHERE
                        LOWER(email) = $1
                        OR
                        LOWER(usuario_login) = $1

                    LIMIT 1
                    `,
                    [login]
                );


            if (resultado.rows.length === 0) {

                return res.status(401).json({
                    erro:
                        "Usuário ou senha inválidos."
                });
            }


            const usuario =
                resultado.rows[0];


            if (!usuario.ativo) {

                return res.status(403).json({
                    erro:
                        "Usuário desativado."
                });
            }


            const senhaCorreta =
                await bcrypt.compare(
                    senha,
                    usuario.senha
                );


            if (!senhaCorreta) {

                return res.status(401).json({
                    erro:
                        "Usuário ou senha inválidos."
                });
            }


            // -----------------------------------------
            // REGISTRA ÚLTIMO LOGIN
            // -----------------------------------------

            await pool.query(
                `
                UPDATE public.usuarios

                SET ultimo_login =
                    CURRENT_TIMESTAMP

                WHERE id = $1
                `,
                [usuario.id]
            );


            // -----------------------------------------
            // GERA TOKEN
            // -----------------------------------------

            const token =
                jwt.sign(
                    {
                        id: usuario.id,
                        perfil: usuario.perfil,
                        role: usuario.role
                    },

                    process.env.JWT_SECRET,

                    {
                        expiresIn: "8h"
                    }
                );


            return res.json({

                mensagem:
                    "Login realizado com sucesso.",

                token,

                usuario: {

                    id: usuario.id,

                    nome:
                        usuario.nome,

                    email:
                        usuario.email,

                    perfil:
                        usuario.perfil,

                    role:
                        usuario.role,

                    usuario_login:
                        usuario.usuario_login,

                    treinamento_concluido:
                        usuario.treinamento_concluido,

                    modulo_atual:
                        usuario.modulo_atual,

                    parte_atual:
                        usuario.parte_atual,

                    ultimo_login:
                        usuario.ultimo_login,

                    concluido_em:
                        usuario.concluido_em
                }
            });


        } catch (erro) {

            console.error(
                "Erro no login:",
                erro
            );

            return res.status(500).json({
                erro:
                    "Erro interno do servidor."
            });
        }
    }
);


export default router;