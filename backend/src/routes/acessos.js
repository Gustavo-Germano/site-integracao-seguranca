import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { pool } from "../db.js";
import {
    autenticar,
    permitirPerfis
} from "../middleware/auth.js";

const router = express.Router();


// =====================================================
// GERAR LINK DE ACESSO
// =====================================================

router.post(
    "/gerar",
    autenticar,
    permitirPerfis("admin"),
    async (req, res) => {

        try {

            const nome =
                String(
                    req.body.nome || ""
                ).trim();


            if (!nome || nome.length < 3) {

                return res.status(400).json({
                    erro:
                        "Informe o nome completo do colaborador."
                });

            }


            // =================================================
            // GERA TOKEN ÚNICO
            // =================================================

            const token =
                crypto
                    .randomBytes(32)
                    .toString("hex");


            // =================================================
            // CRIA USUÁRIO COM LINK VÁLIDO POR 7 DIAS
            // =================================================

            const tokenAcesso =
                crypto
                    .randomBytes(32)
                    .toString("hex");

            const resultado =
                await pool.query(
                    `
                    INSERT INTO public.usuarios
                    (
                        nome,
                        perfil,
                        role,
                        ativo,
                        acesso_por_link,
                        token_acesso,
                        token_expira_em,
                        treinamento_concluido,
                        modulo_atual,
                        parte_atual
                    )
                    VALUES
                    (
                        $1,
                        'colaborador',
                        'colaborador',
                        TRUE,
                        TRUE,
                        $2,
                        CURRENT_TIMESTAMP + INTERVAL '7 days',
                        FALSE,
                        1,
                        0
                    )
                    RETURNING
                        id,
                        nome,
                        token_acesso,
                        token_expira_em
                    `,
                    [
                        nome,
                        token
                    ]
                );


            const usuario =
                resultado.rows[0];


            // =================================================
            // MONTA O LINK
            // =================================================

            const link =
                `https://site-integracao-seguranca-1.onrender.com/acesso/${usuario.token_acesso}`;


            return res.json({

                mensagem:
                    "Acesso criado com sucesso.",

                acesso: {

                    id:
                        usuario.id,

                    nome:
                        usuario.nome,

                    link,

                    expira_em:
                        usuario.token_expira_em

                }

            });

        } catch (erro) {

            console.error(
                "Erro ao gerar acesso:",
                erro
            );

            return res.status(500).json({

                erro:
                    "Não foi possível gerar o acesso."

            });

        }

    }
);


// =====================================================
// VERIFICAR LINK
// =====================================================

router.get(
    "/verificar/:token",
    async (req, res) => {

        try {

            const token =
                String(
                    req.params.token || ""
                ).trim();


            if (!token) {

                return res.status(400).json({
                    erro:
                        "Link de acesso inválido."
                });

            }


            const resultado =
                await pool.query(
                    `
                    SELECT
                        id,
                        nome,
                        ativo,
                        acesso_por_link,
                        token_expira_em,
                        treinamento_concluido,
                        modulo_atual,
                        parte_atual
                    FROM public.usuarios
                    WHERE token_acesso = $1
                    LIMIT 1
                    `,
                    [token]
                );


            if (resultado.rows.length === 0) {

                return res.status(404).json({
                    erro:
                        "Este link de acesso não existe."
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


            if (!usuario.acesso_por_link) {

                return res.status(403).json({
                    erro:
                        "Este acesso não é válido para treinamento."
                });

            }


            if (
                usuario.token_expira_em &&
                new Date(
                    usuario.token_expira_em
                ) < new Date()
            ) {

                return res.status(410).json({
                    erro:
                        "Este link de acesso expirou."
                });

            }


            if (usuario.treinamento_concluido) {

                return res.status(409).json({
                    erro:
                        "Este treinamento já foi concluído."
                });

            }


            const tokenJWT =
                jwt.sign(
                    {
                        id: usuario.id,
                        perfil: "colaborador",
                        role: "colaborador"
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "8h"
                    }
                );

            return res.json({
                valido: true,
            
                token: tokenJWT,
            
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    modulo_atual: usuario.modulo_atual,
                    parte_atual: usuario.parte_atual
        }
    });
        } catch (erro) {

            console.error(
                "Erro ao verificar acesso:",
                erro
            );

            return res.status(500).json({

                erro:
                    "Erro interno ao verificar o acesso."

            });

        }

    }
);


export default router;