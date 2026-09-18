import express from "express";
import { pool } from "../db.js";
import { autenticar } from "../middleware/auth.js";

const router = express.Router();

router.get("/", autenticar, async (req, res) => {
    try {
        const resultado = await pool.query(
            `SELECT modulo, parte, concluido, atualizado_em
             FROM progresso
             WHERE usuario_id = $1
             ORDER BY modulo ASC, parte ASC`,
            [req.usuario.id]
        );

        res.json({
            progresso: resultado.rows
        });

    } catch (erro) {
        console.error("Erro ao buscar progresso:", erro);

        res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
});

router.post("/", autenticar, async (req, res) => {
    try {
        const { modulo, parte, concluido } = req.body;

        if (!modulo || !parte) {
            return res.status(400).json({
                erro: "Módulo e parte são obrigatórios."
            });
        }

        const resultado = await pool.query(
            `INSERT INTO progresso
            (usuario_id, modulo, parte, concluido)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (usuario_id, modulo, parte)
            DO UPDATE SET
                concluido = EXCLUDED.concluido,
                atualizado_em = CURRENT_TIMESTAMP
            RETURNING *`,
            [
                req.usuario.id,
                modulo,
                parte,
                concluido ?? true
            ]
        );

        res.status(201).json({
            mensagem: "Progresso salvo com sucesso.",
            progresso: resultado.rows[0]
        });

    } catch (erro) {
        console.error("Erro ao salvar progresso:", erro);

        res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
});

router.post("/concluir", autenticar, async (req, res) => {
    try {
        await pool.query(
            `UPDATE usuarios
             SET treinamento_concluido = TRUE,
                 atualizado_em = CURRENT_TIMESTAMP
             WHERE id = $1`,
            [req.usuario.id]
        );

        res.json({
            mensagem: "Treinamento concluído com sucesso."
        });

    } catch (erro) {
        console.error("Erro ao concluir treinamento:", erro);

        res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
});

router.post("/reiniciar", autenticar, async (req, res) => {

    try {

        await pool.query(
            `DELETE FROM public.progresso
             WHERE usuario_id = $1`,
            [req.usuario.id]
        );

        await pool.query(
            `UPDATE public.usuarios
             SET treinamento_concluido = FALSE,
                 atualizado_em = CURRENT_TIMESTAMP
             WHERE id = $1`,
            [req.usuario.id]
        );

        res.json({
            mensagem:
                "Progresso reiniciado com sucesso."
        });

    } catch (erro) {

        console.error(
            "Erro ao reiniciar progresso:",
            erro
        );

        res.status(500).json({
            erro:
                "Erro interno do servidor."
        });

    }

});

export default router;