import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { email, usuario, senha } = req.body;

        const identificador = (email || usuario || "")
            .trim()
            .toLowerCase();

        if (!identificador || !senha) {
            return res.status(400).json({
                erro: "Usuário/e-mail e senha são obrigatórios."
            });
        }

        const resultado = await pool.query(
            `SELECT
                id,
                nome,
                email,
                usuario_login,
                senha,
                perfil,
                ativo,
                treinamento_concluido
             FROM public.usuarios
             WHERE LOWER(email) = $1
                OR LOWER(usuario_login) = $1
             LIMIT 1`,
            [identificador]
        );

        if (resultado.rows.length === 0) {
            return res.status(401).json({
                erro: "Usuário ou senha inválidos."
            });
        }

        const usuarioBanco = resultado.rows[0];

        if (!usuarioBanco.ativo) {
            return res.status(403).json({
                erro: "Este usuário está desativado. Procure o RH."
            });
        }

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuarioBanco.senha
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                erro: "Usuário ou senha inválidos."
            });
        }

        // Registra o último acesso
        await pool.query(
            `UPDATE public.usuarios
             SET ultimo_login = CURRENT_TIMESTAMP
             WHERE id = $1`,
            [usuarioBanco.id]
        );

        const token = jwt.sign(
            {
                id: usuarioBanco.id,
                perfil: usuarioBanco.perfil
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }
        );

        res.json({
            mensagem: "Login realizado com sucesso.",
            token,
            usuario: {
                id: usuarioBanco.id,
                nome: usuarioBanco.nome,
                email: usuarioBanco.email,
                usuario_login: usuarioBanco.usuario_login,
                perfil: usuarioBanco.perfil,
                ativo: usuarioBanco.ativo,
                treinamento_concluido:
                    usuarioBanco.treinamento_concluido
            }
        });

    } catch (erro) {
        console.error("Erro no login:", erro);

        res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
});

export default router;