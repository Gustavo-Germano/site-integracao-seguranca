import express from "express";

import { pool } from "../db.js";

import {
    autenticar,
    permitirRoles
} from "../middleware/auth.js";


const router = express.Router();


// ======================================================
// LISTAR COLABORADORES
// ======================================================

router.get(
    "/usuarios",
    autenticar,
    permitirRoles("rh", "admin"),
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

                        ativo,

                        acesso_inicial,
                        acesso_inicial_em,

                        ultimo_login,

                        treinamento_concluido,

                        modulo_atual,
                        parte_atual,

                        concluido_em,

                        criado_em

                    FROM public.usuarios

                    WHERE
                        role = 'colaborador'
                        OR perfil = 'colaborador'

                    ORDER BY
                        nome ASC
                    `
                );


            res.json({
                usuarios:
                    resultado.rows
            });

        } catch (erro) {

            console.error(
                "Erro ao listar colaboradores:",
                erro
            );

            res.status(500).json({
                erro:
                    "Erro interno do servidor."
            });
        }
    }
);


// ======================================================
// STATUS ATIVO / INATIVO
// ======================================================

router.patch(
    "/usuarios/:id/status",
    autenticar,
    permitirRoles("rh", "admin"),
    async (req, res) => {

        const usuarioId =
            Number(req.params.id);

        const ativo =
            Boolean(req.body.ativo);


        if (!Number.isInteger(usuarioId)) {

            return res.status(400).json({
                erro:
                    "ID de usuário inválido."
            });
        }


        try {

            const resultado =
                await pool.query(
                    `
                    UPDATE public.usuarios

                    SET ativo = $1

                    WHERE id = $2

                    RETURNING
                        id,
                        nome,
                        email,
                        usuario_login,
                        ativo
                    `,
                    [
                        ativo,
                        usuarioId
                    ]
                );


            if (
                resultado.rows.length === 0
            ) {

                return res.status(404).json({
                    erro:
                        "Colaborador não encontrado."
                });
            }


            res.json({

                mensagem:
                    ativo
                        ? "Colaborador ativado."
                        : "Colaborador desativado.",

                usuario:
                    resultado.rows[0]

            });

        } catch (erro) {

            console.error(
                "Erro ao alterar status:",
                erro
            );

            res.status(500).json({
                erro:
                    "Erro interno do servidor."
            });
        }
    }
);


// ======================================================
// RESETAR TREINAMENTO
// ======================================================

router.post(
    "/usuarios/:id/resetar-treinamento",
    autenticar,
    permitirRoles("rh", "admin"),
    async (req, res) => {

        const usuarioId =
            Number(req.params.id);


        if (!Number.isInteger(usuarioId)) {

            return res.status(400).json({
                erro:
                    "ID de usuário inválido."
            });
        }


        try {

            const usuario =
                await pool.query(
                    `
                    SELECT
                        id,
                        nome,
                        email,
                        usuario_login,
                        treinamento_concluido

                    FROM public.usuarios

                    WHERE id = $1
                    `,
                    [usuarioId]
                );


            if (
                usuario.rows.length === 0
            ) {

                return res.status(404).json({
                    erro:
                        "Colaborador não encontrado."
                });
            }


            await pool.query(
                `
                DELETE FROM public.progresso

                WHERE usuario_id = $1
                `,
                [usuarioId]
            );


            const atualizado =
                await pool.query(
                    `
                    UPDATE public.usuarios

                    SET
                        treinamento_concluido = FALSE,
                        modulo_atual = 1,
                        parte_atual = 0,
                        concluido_em = NULL

                    WHERE id = $1

                    RETURNING
                        id,
                        nome,
                        email,
                        usuario_login,
                        ativo,
                        acesso_inicial,
                        treinamento_concluido,
                        modulo_atual,
                        parte_atual,
                        concluido_em
                    `,
                    [usuarioId]
                );


            res.json({

                mensagem:
                    "Treinamento resetado com sucesso.",

                usuario:
                    atualizado.rows[0]

            });

        } catch (erro) {

            console.error(
                "Erro ao resetar treinamento:",
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