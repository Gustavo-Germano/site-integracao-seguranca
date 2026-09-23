import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { pool } from "../db.js";
import {
    autenticar,
    permitirPerfis
} from "../middleware/auth.js";

const router = express.Router();

const FRONTEND_URL =
    process.env.FRONTEND_URL ||
    "https://site-integracao-seguranca-1.onrender.com";


// =====================================================
// LOGIN DO ADMIN / RH
// =====================================================

router.post("/login", async (req, res) => {

    try {

        const login =
            String(
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
                    ativo
                FROM public.usuarios
                WHERE
                    LOWER(email) = $1
                    OR LOWER(usuario_login) = $1
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


        await pool.query(
            `
            UPDATE public.usuarios
            SET ultimo_login =
                CURRENT_TIMESTAMP
            WHERE id = $1
            `,
            [usuario.id]
        );


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
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil,
                role: usuario.role
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
});


// =====================================================
// GERAR LINK EXPIRÁVEL
// ADMIN / RH
// =====================================================

router.post(
    "/gerar-link",

    autenticar,

    permitirPerfis(
        "admin",
        "rh"
    ),

    async (req, res) => {

        try {

            const diasSolicitados =
                Number(
                    req.body.dias || 7
                );

            const dias =
                Math.min(
                    Math.max(
                        diasSolicitados,
                        1
                    ),
                    30
                );


            // -----------------------------------------
            // GERA IDENTIFICADORES INTERNOS
            // -----------------------------------------

            const identificador =
                crypto
                    .randomBytes(12)
                    .toString("hex");


            const usuarioLogin =
                `link_${identificador}`;


            const emailInterno =
                `${usuarioLogin}@acesso.local`;


            const senhaInterna =
                crypto
                    .randomBytes(32)
                    .toString("hex");


            const senhaHash =
                await bcrypt.hash(
                    senhaInterna,
                    10
                );


            // -----------------------------------------
            // CRIA USUÁRIO INTERNO
            // -----------------------------------------

            const resultado =
                await pool.query(
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
                        'Aguardando identificação',
                        $1,
                        $2,
                        'colaborador',
                        'colaborador',
                        TRUE,
                        $3,
                        TRUE,
                        CURRENT_TIMESTAMP,
                        FALSE,
                        1,
                        0
                    )
                    RETURNING
                        id
                    `,
                    [
                        emailInterno,
                        senhaHash,
                        usuarioLogin
                    ]
                );


            const usuarioId =
                resultado.rows[0].id;


            // -----------------------------------------
            // TOKEN EXPIRÁVEL
            // -----------------------------------------

            const token =
                jwt.sign(
                    {
                        id: usuarioId,
                        perfil: "colaborador",
                        role: "colaborador",
                        acesso_link: true
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn:
                            `${dias}d`
                    }
                );


            const link =
                `${FRONTEND_URL}/?acesso=${encodeURIComponent(token)}`;


            return res.json({

                mensagem:
                    "Link de acesso criado.",

                link,

                validade_dias:
                    dias
            });

        } catch (erro) {

            console.error(
                "Erro ao gerar link:",
                erro
            );

            return res.status(500).json({

                erro:
                    "Não foi possível gerar o link."
            });
        }
    }
);


// =====================================================
// VALIDAR LINK
// =====================================================

router.get(
    "/acesso",
    autenticar,
    async (req, res) => {

        try {

            if (!req.usuario.acesso_link) {

                return res.status(403).json({

                    erro:
                        "Este token não é um link de acesso."
                });
            }


            const resultado =
                await pool.query(
                    `
                    SELECT
                        id,
                        nome,
                        perfil,
                        role,
                        ativo,
                        treinamento_concluido,
                        modulo_atual,
                        parte_atual
                    FROM public.usuarios
                    WHERE id = $1
                    LIMIT 1
                    `,
                    [req.usuario.id]
                );


            if (
                resultado.rows.length === 0
            ) {

                return res.status(404).json({

                    erro:
                        "Acesso não encontrado."
                });
            }


            const usuario =
                resultado.rows[0];


            if (!usuario.ativo) {

                return res.status(403).json({

                    erro:
                        "Este acesso foi desativado."
                });
            }


            return res.json({

                acesso_valido:
                    true,

                usuario
            });

        } catch (erro) {

            console.error(
                "Erro ao validar acesso:",
                erro
            );

            return res.status(500).json({

                erro:
                    "Erro ao validar acesso."
            });
        }
    }
);


// =====================================================
// INICIAR TREINAMENTO PELO LINK
// =====================================================

router.post(
    "/acesso/iniciar",
    autenticar,
    async (req, res) => {

        try {

            if (!req.usuario.acesso_link) {

                return res.status(403).json({

                    erro:
                        "Este acesso não é válido para treinamento."
                });
            }


            const nome =
                String(
                    req.body.nome || ""
                ).trim();


            if (
                !nome ||
                nome.length < 3
            ) {

                return res.status(400).json({

                    erro:
                        "Informe seu nome completo."
                });
            }


            const resultado =
                await pool.query(
                    `
                    UPDATE public.usuarios

                    SET nome = $1

                    WHERE id = $2

                    RETURNING
                        id,
                        nome,
                        perfil,
                        role,
                        ativo,
                        treinamento_concluido,
                        modulo_atual,
                        parte_atual
                    `,
                    [
                        nome,
                        req.usuario.id
                    ]
                );


            if (
                resultado.rows.length === 0
            ) {

                return res.status(404).json({

                    erro:
                        "Acesso não encontrado."
                });
            }


            return res.json({

                mensagem:
                    "Treinamento iniciado.",

                usuario:
                    resultado.rows[0]
            });

        } catch (erro) {

            console.error(
                "Erro ao iniciar treinamento:",
                erro
            );

            return res.status(500).json({

                erro:
                    "Não foi possível iniciar o treinamento."
            });
        }
    }
);


export default router;