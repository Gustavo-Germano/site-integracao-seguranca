import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { pool } from "../db.js";

import {
    autenticar,
    permitirPerfis
} from "../middleware/auth.js";

const router = express.Router();


// =====================================================
// LOGIN DO ADMIN / RH
// =====================================================

router.post("/login", async (req, res) => {
    try {
        const login = String(
            req.body.login ||
            req.body.email ||
            ""
        ).trim().toLowerCase();

        const senha = String(req.body.senha || "");

        if (!login || !senha) {
            return res.status(400).json({
                erro: "Usuário e senha são obrigatórios."
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
                erro: "Usuário ou senha inválidos."
            });
        }

        const usuario = resultado.rows[0];

        if (!usuario.ativo) {
            return res.status(403).json({
                erro: "Usuário desativado."
            });
        }

        if (!usuario.senha) {
            return res.status(401).json({
                erro: "Usuário ou senha inválidos."
            });
        }

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                erro: "Usuário ou senha inválidos."
            });
        }

        const perfil = String(usuario.perfil || "").toLowerCase();
        const role = String(usuario.role || "").toLowerCase();

        if (
            !["admin", "rh"].includes(perfil) &&
            !["admin", "rh"].includes(role)
        ) {
            return res.status(403).json({
                erro: "Colaboradores devem acessar pelo link de treinamento."
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
                role: usuario.role
            }
        });

    } catch (erro) {
        console.error("Erro no login:", erro);

        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
});


// =====================================================
// VALIDAR LINK ANTES DO PRIMEIRO ACESSO
// =====================================================

router.get("/acesso", async (req, res) => {
    try {
        const tokenAcesso = String(
            req.headers.authorization || ""
        ).replace(/^Bearer\s+/i, "").trim();

        if (!tokenAcesso) {
            return res.status(400).json({
                erro: "Link de acesso não informado."
            });
        }

        const resultado = await pool.query(
            `
            SELECT
                id,
                nome,
                data_admissao,
                funcao,
                setor,
                whatsapp,
                perfil,
                role,
                ativo,
                treinamento_concluido,
                modulo_atual,
                parte_atual
            FROM public.usuarios
            WHERE token_acesso = $1
              AND acesso_por_link = TRUE
              AND token_expira_em > CURRENT_TIMESTAMP
            LIMIT 1
            `,
            [tokenAcesso]
        );

        if (resultado.rows.length === 0) {
            return res.status(403).json({
                erro: "Link inválido, já utilizado ou expirado."
            });
        }

        const usuario = resultado.rows[0];

        if (!usuario.ativo) {
            return res.status(403).json({
                erro: "Este acesso foi desativado."
            });
        }

        return res.json({
            acesso_valido: true,
            usuario
        });

    } catch (erro) {
        console.error("Erro ao validar acesso:", erro);

        return res.status(500).json({
            erro: "Erro ao validar acesso."
        });
    }
});


// =====================================================
// ENTRAR PELO LINK — SEM USUÁRIO E SENHA
// CONSUME O LINK NO PRIMEIRO ACESSO
// =====================================================

router.post("/acesso/entrar", async (req, res) => {
    try {
        const tokenAcesso = String(
            req.body.token || ""
        ).trim();

        if (!tokenAcesso) {
            return res.status(400).json({
                erro: "Link de acesso não informado."
            });
        }

        /*
         * O UPDATE consome o token atomicamente.
         * Dois acessos simultâneos não conseguem
         * utilizar o mesmo link.
         */

        const resultado = await pool.query(
            `
            UPDATE public.usuarios

            SET
                token_acesso = NULL,
                token_expira_em = NULL,
                acesso_por_link = FALSE,
                ultimo_login = CURRENT_TIMESTAMP

            WHERE token_acesso = $1
              AND acesso_por_link = TRUE
              AND token_expira_em > CURRENT_TIMESTAMP
              AND ativo = TRUE
              AND perfil = 'colaborador'
              AND role = 'colaborador'

            RETURNING
                id,
                nome,
                data_admissao,
                funcao,
                setor,
                whatsapp,
                perfil,
                role,
                ativo,
                treinamento_concluido,
                modulo_atual,
                parte_atual
            `,
            [tokenAcesso]
        );

        if (resultado.rows.length === 0) {
            return res.status(403).json({
                erro: "Este link já foi utilizado, expirou ou foi desativado. Solicite um novo link ao RH."
            });
        }

        const usuario = resultado.rows[0];

        /*
         * O link já foi consumido.
         * Agora o colaborador recebe uma sessão
         * para continuar o treinamento.
         */

        const tokenSessao = jwt.sign(
            {
                id: usuario.id,
                perfil: usuario.perfil,
                role: usuario.role,
                acesso_link: true
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }
        );

        return res.json({
            mensagem: "Acesso ao treinamento liberado.",
            token: tokenSessao,
            usuario
        });

    } catch (erro) {
        console.error(
            "Erro ao entrar pelo link:",
            erro
        );

        return res.status(500).json({
            erro: "Não foi possível liberar o treinamento."
        });
    }
});


// =====================================================
// INICIAR TREINAMENTO COM SESSÃO VÁLIDA
// =====================================================

router.post(
    "/acesso/iniciar",
    autenticar,
    async (req, res) => {
        try {
            if (!req.usuario.acesso_link) {
                return res.status(403).json({
                    erro: "Este acesso não é válido para treinamento."
                });
            }

            const resultado = await pool.query(
                `
                SELECT
                    id,
                    nome,
                    data_admissao,
                    funcao,
                    setor,
                    whatsapp,
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

            if (resultado.rows.length === 0) {
                return res.status(404).json({
                    erro: "Colaborador não encontrado."
                });
            }

            const usuario = resultado.rows[0];

            if (!usuario.ativo) {
                return res.status(403).json({
                    erro: "Este colaborador está desativado."
                });
            }

            return res.json({
                mensagem: "Treinamento iniciado.",
                usuario
            });

        } catch (erro) {
            console.error(
                "Erro ao iniciar treinamento:",
                erro
            );

            return res.status(500).json({
                erro: "Não foi possível iniciar o treinamento."
            });
        }
    }
);


export default router;