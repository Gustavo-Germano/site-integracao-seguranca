import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { login, email, senha } = req.body;

        const identificador = (login || email || "").trim().toLowerCase();

        if (!identificador || !senha) {
            return res.status(400).json({
                erro: "Usuário/e-mail e senha são obrigatórios."
            });
        }

        const resultado = await pool.query(
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
                treinamento_concluido,
                modulo_atual,
                parte_atual
            FROM public.usuarios
            WHERE LOWER(email) = $1
               OR LOWER(usuario_login) = $1
            LIMIT 1
            `,
            [identificador]
        );

        if (resultado.rows.length === 0) {
            return res.status(401).json({
                erro: "Usuário/e-mail ou senha inválidos."
            });
        }

        const usuario = resultado.rows[0];

        if (!usuario.ativo) {
            return res.status(403).json({
                erro: "Usuário desativado."
            });
        }

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                erro: "Usuário/e-mail ou senha inválidos."
            });
        }

        await pool.query(
            `
            UPDATE public.usuarios
            SET ultimo_login = CURRENT_TIMESTAMP
            WHERE id = $1
            `,
            [usuario.id]
        );

        const token = jwt.sign(
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
            mensagem: "Login realizado com sucesso.",

            token,

            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil,
                role: usuario.role,
                usuario_login: usuario.usuario_login,

                treinamento_concluido:
                    usuario.treinamento_concluido,

                modulo_atual:
                    usuario.modulo_atual,

                parte_atual:
                    usuario.parte_atual
            }
        });

    } catch (erro) {

        console.error("Erro no login:", erro);

        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
});

export default router;