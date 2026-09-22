import express from "express";
import { pool } from "../db.js";
import {
    autenticar,
    permitirRoles
} from "../middleware/auth.js";

const router = express.Router();


/*
|--------------------------------------------------------------------------
| BUSCAR PROGRESSO DO COLABORADOR LOGADO
|--------------------------------------------------------------------------
*/

router.get("/", autenticar, async (req, res) => {

    try {

        const resultado = await pool.query(
            `
            SELECT
                modulo,
                parte,
                concluido,
                atualizado_em
            FROM public.progresso
            WHERE usuario_id = $1
            ORDER BY modulo ASC, parte ASC
            `,
            [req.usuario.id]
        );

        res.json({
            progresso: resultado.rows
        });

    } catch (erro) {

        console.error(
            "Erro ao buscar progresso:",
            erro
        );

        res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }

});


/*
|--------------------------------------------------------------------------
| SALVAR PROGRESSO
|--------------------------------------------------------------------------
*/

router.post("/", autenticar, async (req, res) => {

    try {

        const {
            modulo,
            parte,
            concluido
        } = req.body;

        if (!modulo || !parte) {

            return res.status(400).json({
                erro:
                    "Módulo e parte são obrigatórios."
            });

        }

        /*
         * Não permitimos salvar progresso
         * de alguém que já concluiu o treinamento.
         */
        const usuarioResult = await pool.query(
            `
            SELECT treinamento_concluido
            FROM public.usuarios
            WHERE id = $1
            `,
            [req.usuario.id]
        );

        if (usuarioResult.rows.length === 0) {

            return res.status(404).json({
                erro: "Usuário não encontrado."
            });

        }

        if (
            usuarioResult.rows[0].treinamento_concluido
        ) {

            return res.status(403).json({
                erro:
                    "Treinamento já concluído. O progresso não pode mais ser alterado."
            });

        }

        const resultado = await pool.query(
            `
            INSERT INTO public.progresso
            (
                usuario_id,
                modulo,
                parte,
                concluido
            )
            VALUES ($1, $2, $3, $4)

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
            erro: "Erro interno do servidor."
        });
    }

});


/*
|--------------------------------------------------------------------------
| CONCLUIR TREINAMENTO
|--------------------------------------------------------------------------
|
| O próprio colaborador pode chegar aqui somente
| enquanto o treinamento ainda não está concluído.
|
*/

router.post("/concluir", autenticar, async (req, res) => {

    try {

        const usuarioId =
            req.usuario.id;

        const usuarioResult =
            await pool.query(
                `
                SELECT
                    id,
                    treinamento_concluido
                FROM public.usuarios
                WHERE id = $1
                `,
                [usuarioId]
            );

        if (usuarioResult.rows.length === 0) {

            return res.status(404).json({
                erro:
                    "Usuário não encontrado."
            });

        }

        const usuario =
            usuarioResult.rows[0];

        /*
         * Se já concluiu, não deixa concluir
         * novamente.
         */
        if (usuario.treinamento_concluido) {

            return res.status(409).json({
                erro:
                    "Treinamento já está concluído."
            });

        }

        await pool.query(
            `
            UPDATE public.usuarios
            SET
                treinamento_concluido = TRUE,
                concluido_em =
                    CURRENT_TIMESTAMP
            WHERE id = $1
            `,
            [usuarioId]
        );

        res.json({
            mensagem:
                "Treinamento concluído com sucesso."
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

});


/*
|--------------------------------------------------------------------------
| REINICIAR TREINAMENTO DO PRÓPRIO COLABORADOR
|--------------------------------------------------------------------------
|
| REGRA:
|
| - Se ainda está treinando → pode reiniciar.
| - Se já concluiu → NÃO pode reiniciar.
|
*/

router.post("/reiniciar", autenticar, async (req, res) => {

    try {

        const usuarioId =
            req.usuario.id;

        const usuarioResult =
            await pool.query(
                `
                SELECT
                    id,
                    treinamento_concluido
                FROM public.usuarios
                WHERE id = $1
                `,
                [usuarioId]
            );

        if (usuarioResult.rows.length === 0) {

            return res.status(404).json({
                erro:
                    "Usuário não encontrado."
            });

        }

        const usuario =
            usuarioResult.rows[0];

        /*
         * AQUI está a trava principal.
         *
         * Depois do certificado/conclusão,
         * o próprio colaborador NÃO pode resetar.
         */
        if (usuario.treinamento_concluido) {

            return res.status(403).json({
                erro:
                    "Treinamento já concluído. O reinício deve ser solicitado ao RH."
            });

        }

        await pool.query(
            `
            DELETE FROM public.progresso
            WHERE usuario_id = $1
            `,
            [usuarioId]
        );

        await pool.query(
            `
            UPDATE public.usuarios
            SET
                treinamento_concluido = FALSE,
                modulo_atual = 1,
                parte_atual = 0,
                concluido_em = NULL
            WHERE id = $1
            `,
            [usuarioId]
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

});


/*
|--------------------------------------------------------------------------
| RH / ADMIN — RESETAR QUALQUER COLABORADOR
|--------------------------------------------------------------------------
|
| Somente:
|
| role = rh
| role = admin
|
| poderão utilizar essa rota.
|
| O colaborador NÃO consegue chamar essa rota.
|
*/

router.post(
    "/rh/reiniciar/:usuarioId",
    autenticar,
    permitirRoles("rh", "admin"),
    async (req, res) => {

        try {

            const usuarioId =
                req.params.usuarioId;

            const usuarioResult =
                await pool.query(
                    `
                    SELECT
                        id,
                        nome,
                        email,
                        treinamento_concluido
                    FROM public.usuarios
                    WHERE id = $1
                    `,
                    [usuarioId]
                );

            if (
                usuarioResult.rows.length === 0
            ) {

                return res.status(404).json({
                    erro:
                        "Colaborador não encontrado."
                });

            }

            const usuario =
                usuarioResult.rows[0];

            /*
             * Diferente do reset do colaborador,
             * o RH PODE resetar inclusive alguém
             * que já terminou o treinamento.
             */
            await pool.query(
                `
                DELETE FROM public.progresso
                WHERE usuario_id = $1
                `,
                [usuarioId]
            );

            await pool.query(
                `
                UPDATE public.usuarios
                SET
                    treinamento_concluido = FALSE,
                    modulo_atual = 1,
                    parte_atual = 0,
                    concluido_em = NULL
                WHERE id = $1
                `,
                [usuarioId]
            );

            res.json({
                mensagem:
                    "Treinamento do colaborador reiniciado com sucesso.",

                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });

        } catch (erro) {

            console.error(
                "Erro ao RH reiniciar treinamento:",
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