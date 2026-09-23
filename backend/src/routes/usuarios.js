import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { pool } from "../db.js";

import {
    autenticar,
    permitirRoles
} from "../middleware/auth.js";

const router = express.Router();


/*
|--------------------------------------------------------------------------
| GERAR USUÁRIO E SENHA DO COLABORADOR
|--------------------------------------------------------------------------
|
| O RH informa apenas:
|
| - nome
| - email
|
| O backend gera:
|
| - usuario_login
| - senha temporária
|
*/

router.post(
    "/",
    autenticar,
    permitirRoles("rh", "admin"),
    async (req, res) => {

        try {

            const {
                nome,
                email
            } = req.body;


            /*
             * VALIDAÇÃO
             */
            if (!nome || !email) {

                return res.status(400).json({
                    erro:
                        "Nome e email são obrigatórios."
                });

            }


            /*
             * NORMALIZA EMAIL
             */
            const emailNormalizado =
                email.trim().toLowerCase();


            /*
             * VERIFICA SE EMAIL JÁ EXISTE
             */
            const emailExistente =
                await pool.query(
                    `
                    SELECT id
                    FROM public.usuarios
                    WHERE LOWER(email) = $1
                    `,
                    [emailNormalizado]
                );


            if (emailExistente.rows.length > 0) {

                return res.status(409).json({
                    erro:
                        "Este email já está cadastrado."
                });

            }


            /*
             * ==================================================
             * GERAR USUÁRIO_LOGIN
             * ==================================================
             *
             * Exemplo:
             *
             * João da Silva
             * ↓
             * joao.silva
             */

            const nomeBase =
                nome
                    .normalize("NFD")
                    .replace(
                        /[\u0300-\u036f]/g,
                        ""
                    )
                    .toLowerCase()
                    .replace(
                        /[^a-z0-9]+/g,
                        "."
                    )
                    .replace(
                        /^\.+|\.+$/g,
                        ""
                    );


            let usuarioLogin =
                nomeBase || "colaborador";


            /*
             * ==================================================
             * GARANTIR LOGIN ÚNICO
             * ==================================================
             */

            let contador = 1;

            while (true) {

                const loginExistente =
                    await pool.query(
                        `
                        SELECT id
                        FROM public.usuarios
                        WHERE usuario_login = $1
                        `,
                        [usuarioLogin]
                    );


                if (
                    loginExistente.rows.length === 0
                ) {

                    break;

                }


                contador++;

                usuarioLogin =
                    `${nomeBase}.${contador}`;

            }


            /*
             * ==================================================
             * GERAR SENHA TEMPORÁRIA
             * ==================================================
             *
             * 12 caracteres aleatórios.
             */

            const senhaTemporaria =
                crypto
                    .randomBytes(9)
                    .toString("base64")
                    .replace(
                        /[^a-zA-Z0-9]/g,
                        ""
                    )
                    .slice(0, 12);


            /*
             * ==================================================
             * TRANSFORMAR SENHA EM HASH
             * ==================================================
             *
             * A senha verdadeira NÃO é armazenada no banco.
             */

            const senhaHash =
                await bcrypt.hash(
                    senhaTemporaria,
                    12
                );


            /*
             * ==================================================
             * CADASTRAR COLABORADOR
             * ==================================================
             */

            const resultado =
                await pool.query(
                    `
                    INSERT INTO public.usuarios
                    (
                        nome,
                        email,
                        usuario_login,
                        senha,
                        perfil,
                        role,
                        ativo,
                        treinamento_concluido,
                        modulo_atual,
                        parte_atual
                    )
                    VALUES
                    (
                        $1,
                        $2,
                        $3,
                        $4,
                        'colaborador',
                        'colaborador',
                        TRUE,
                        FALSE,
                        1,
                        0
                    )
                    RETURNING
                        id,
                        nome,
                        email,
                        usuario_login,
                        perfil,
                        role,
                        ativo,
                        treinamento_concluido,
                        modulo_atual,
                        parte_atual,
                        criado_em
                    `,
                    [
                        nome.trim(),
                        emailNormalizado,
                        usuarioLogin,
                        senhaHash
                    ]
                );


            /*
             * ==================================================
             * RESPOSTA PARA O RH
             * ==================================================
             *
             * A senha temporária é enviada somente nesta
             * resposta. Ela não é salva em texto no banco.
             */

            const linkTreinamento = 
                `https://site-integracao-seguranca-1.onrender.com/index.html?acesso=${encodeURIComponent(emailNormalizado)}`;

            res.status(201).json({
                mensagem: "Colaborador cadastrado com sucesso.",
                usuario: resultado.rows[0],
            
                credenciais: {

                    usuario_login: 
                        usuarioLogin,

                    senha_temporaria: 
                        senhaTemporaria
                },
            
                link_treinamento: 
                    linkTreinamento
            });
    
        } catch (erro) {

            console.error(
                "Erro ao criar colaborador:",
                erro
            );


            /*
             * Email ou usuario_login duplicado.
             */
            if (erro.code === "23505") {

                return res.status(409).json({
                    erro:
                        "Email ou usuário já cadastrado."
                });

            }


            res.status(500).json({
                erro:
                    "Erro interno do servidor."
            });

        }
    });

/*
|--------------------------------------------------------------------------
| USUÁRIO LOGADO
|--------------------------------------------------------------------------
*/

router.get(
    "/me",
    autenticar,
    async (req, res) => {

        try {

            const resultado =
                await pool.query(
                    `
                    SELECT
                        id,
                        nome,
                        email,
                        usuario_login,
                        perfil,
                        role,
                        ativo,
                        treinamento_concluido,
                        modulo_atual,
                        parte_atual,
                        ultimo_login,
                        criado_em,
                        concluido_em
                    FROM public.usuarios
                    WHERE id = $1
                    `,
                    [req.usuario.id]
                );


            if (
                resultado.rows.length === 0
            ) {

                return res.status(404).json({
                    erro:
                        "Usuário não encontrado."
                });

            }


            res.json({
                usuario:
                    resultado.rows[0]
            });


        } catch (erro) {

            console.error(
                "Erro ao buscar usuário:",
                erro
            );

            res.status(500).json({
                erro:
                    "Erro interno do servidor."
            });

        }

    }
);

export default router;