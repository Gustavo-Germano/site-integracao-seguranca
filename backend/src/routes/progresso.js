import express from "express";

import { pool } from "../db.js";

import {
    autenticar
} from "../middleware/auth.js";


const router = express.Router();


// ======================================================
// BUSCAR PROGRESSO
// ======================================================

router.get(
    "/",
    autenticar,
    async (req, res) => {

        try {

            const resultado =
                await pool.query(
                    `
                    SELECT
                        modulo,
                        parte,
                        concluido,
                        atualizado_em

                    FROM public.progresso

                    WHERE usuario_id = $1

                    ORDER BY
                        modulo ASC,
                        parte ASC
                    `,
                    [req.usuario.id]
                );


            const usuario =
                await pool.query(
                    `
                    SELECT
                        nome,
                        email,
                        usuario_login,
                        acesso_inicial,
                        treinamento_concluido,
                        modulo_atual,
                        parte_atual,
                        concluido_em

                    FROM public.usuarios

                    WHERE id = $1
                    `,
                    [req.usuario.id]
                );


            res.json({

                progresso:
                    resultado.rows,

                usuario:
                    usuario.rows[0] || null

            });

        } catch (erro) {

            console.error(
                "Erro ao buscar progresso:",
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
// SALVAR PROGRESSO
// ======================================================

router.post(
    "/",
    autenticar,
    async (req, res) => {

        try {

            const {
                modulo,
                parte,
                concluido
            } = req.body;


            if (
                modulo === undefined ||
                parte === undefined
            ) {

                return res.status(400).json({
                    erro:
                        "Módulo e parte são obrigatórios."
                });
            }


            // Não permite alterar progresso
            // depois de concluir o treinamento.

            const usuario =
                await pool.query(
                    `
                    SELECT
                        treinamento_concluido

                    FROM public.usuarios

                    WHERE id = $1
                    `,
                    [req.usuario.id]
                );


            if (
                usuario.rows[0]?.treinamento_concluido
            ) {

                return res.status(403).json({
                    erro:
                        "Este treinamento já foi concluído."
                });
            }


            const resultado =
                await pool.query(
                    `
                    INSERT INTO public.progresso
                    (
                        usuario_id,
                        modulo,
                        parte,
                        concluido
                    )

                    VALUES
                    (
                        $1,
                        $2,
                        $3,
                        $4
                    )

                    ON CONFLICT
                    (
                        usuario_id,
                        modulo,
                        parte
                    )

                    DO UPDATE SET

                        concluido =
                            EXCLUDED.concluido,

                        atualizado_em =
                            CURRENT_TIMESTAMP

                    RETURNING *
                    `,
                    [
                        req.usuario.id,
                        modulo,
                        parte,
                        concluido ?? true
                    ]
                );


            await pool.query(
                `
                UPDATE public.usuarios

                SET
                    modulo_atual = $1,
                    parte_atual = $2

                WHERE id = $3
                `,
                [
                    modulo,
                    parte,
                    req.usuario.id
                ]
            );


            res.status(201).json({

                mensagem:
                    "Progresso salvo com sucesso.",

                progresso:
                    resultado.rows[0]

            });

        } catch (erro) {

            console.error(
                "Erro ao salvar progresso:",
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
// CONCLUIR TREINAMENTO
// ======================================================

router.post(
    "/concluir",
    autenticar,
    async (req, res) => {

        try {

            const usuario =
                await pool.query(
                    `
                    SELECT
                        treinamento_concluido

                    FROM public.usuarios

                    WHERE id = $1
                    `,
                    [req.usuario.id]
                );


            if (usuario.rows.length === 0) {

                return res.status(404).json({
                    erro:
                        "Usuário não encontrado."
                });
            }


            if (
                usuario.rows[0].treinamento_concluido
            ) {

                return res.status(409).json({
                    erro:
                        "O treinamento já foi concluído."
                });
            }


            const resultado =
                await pool.query(
                    `
                    UPDATE public.usuarios

                    SET
                        treinamento_concluido = TRUE,
                        concluido_em = CURRENT_TIMESTAMP,
                        modulo_atual = (
                            SELECT COALESCE(
                                MAX(modulo),
                                1
                            )

                            FROM public.progresso

                            WHERE usuario_id = $1
                        ),
                        parte_atual = 0

                    WHERE id = $1

                    RETURNING
                        id,
                        nome,
                        email,
                        usuario_login,
                        treinamento_concluido,
                        modulo_atual,
                        parte_atual,
                        concluido_em
                    `,
                    [req.usuario.id]
                );


            res.json({

                mensagem:
                    "Treinamento concluído com sucesso.",

                usuario:
                    resultado.rows[0]

            });

        } catch (erro) {

            console.error(
                "Erro ao concluir treinamento:",
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
// REINICIAR PELO PRÓPRIO COLABORADOR
// ======================================================

router.post(
    "/reiniciar",
    autenticar,
    async (req, res) => {

        try {

            const usuario =
                await pool.query(
                    `
                    SELECT
                        treinamento_concluido

                    FROM public.usuarios

                    WHERE id = $1
                    `,
                    [req.usuario.id]
                );


            if (
                usuario.rows[0]?.treinamento_concluido
            ) {

                return res.status(403).json({
                    erro:
                        "O treinamento concluído só pode ser reiniciado pelo RH."
                });
            }


            await pool.query(
                `
                DELETE FROM public.progresso

                WHERE usuario_id = $1
                `,
                [req.usuario.id]
            );


            await pool.query(
                `
                UPDATE public.usuarios

                SET
                    modulo_atual = 1,
                    parte_atual = 0

                WHERE id = $1
                `,
                [req.usuario.id]
            );


            res.json({
                mensagem:
                    "Treinamento reiniciado com sucesso."
            });

        } catch (erro) {

            console.error(
                "Erro ao reiniciar treinamento:",
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