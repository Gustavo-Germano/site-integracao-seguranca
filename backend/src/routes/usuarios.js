import express from "express";
import bcrypt from "bcryptjs";
import { pool } from "../db.js";
import { autenticar, permitirPerfis } from "../middleware/auth.js";

const router = express.Router();

router.post(
    "/",
    autenticar,
    permitirPerfis("admin"),
    async (req, res) => {
    try {
        const { nome, email, senha, perfil } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: "Nome, email e senha são obrigatórios."
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const resultado = await pool.query(
            `INSERT INTO usuarios
            (nome, email, senha, perfil)
            VALUES ($1, $2, $3, $4)
            RETURNING id, nome, email, perfil, ativo, criado_em`,
            [
                nome,
                email,
                senhaHash,
                perfil || "colaborador"
            ]
        );

        res.status(201).json({
            mensagem: "Usuário criado com sucesso.",
            usuario: resultado.rows[0]
        });

    } catch (erro) {

        if (erro.code === "23505") {
            return res.status(409).json({
                erro: "Este email já está cadastrado."
            });
        }

        console.error("Erro ao criar usuário:", erro);

        res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
});

router.get(
    "/",
    autenticar,
    permitirPerfis("admin"),
    async (req, res) => {
        try {
            const resultado = await pool.query(`
                SELECT
                    u.id,
                    u.nome,
                    u.email,
                    u.perfil,
                    u.ativo,
                    u.treinamento_concluido,
                    u.criado_em,
                    COALESCE(
                        (
                            SELECT MAX(p.modulo)
                            FROM progresso p
                            WHERE p.usuario_id = u.id
                              AND p.concluido = TRUE
                        ),
                        0
                    ) AS ultimo_modulo
                FROM usuarios u
                ORDER BY u.criado_em DESC
            `);

            res.json({
                usuarios: resultado.rows
            });

        } catch (erro) {
            console.error("Erro ao listar usuários:", erro);

            res.status(500).json({
                erro: "Erro interno do servidor."
            });
        }
    }
);

router.patch(
    "/:id/status",
    autenticar,
    permitirPerfis("admin"),
    async (req, res) => {
        try {
            const { id } = req.params;
            const { ativo } = req.body;

            if (typeof ativo !== "boolean") {
                return res.status(400).json({
                    erro: "O campo ativo deve ser true ou false."
                });
            }

            const resultado = await pool.query(
                `UPDATE usuarios
                 SET ativo = $1
                 WHERE id = $2
                 RETURNING id, nome, email, perfil, ativo`,
                [ativo, id]
            );

            if (resultado.rows.length === 0) {
                return res.status(404).json({
                    erro: "Usuário não encontrado."
                });
            }

            res.json({
                mensagem: ativo
                    ? "Usuário ativado com sucesso."
                    : "Usuário desativado com sucesso.",
                usuario: resultado.rows[0]
            });

        } catch (erro) {
            console.error("Erro ao alterar status:", erro);

            res.status(500).json({
                erro: "Erro interno do servidor."
            });
        }
    }
);

router.get("/me", autenticar, async (req, res) => {
    try {
        const resultado = await pool.query(
            `SELECT id, nome, email, perfil, ativo
             FROM usuarios
             WHERE id = $1`,
            [req.usuario.id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Usuário não encontrado."
            });
        }

        res.json({
            usuario: resultado.rows[0]
        });

    } catch (erro) {
        console.error("Erro ao buscar usuário:", erro);

        res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
});

router.get(
    "/admin",
    autenticar,
    permitirPerfis("admin"),
    async (req, res) => {
        res.json({
            mensagem: "Acesso autorizado.",
            usuario: req.usuario
        });
    }
);

export default router;