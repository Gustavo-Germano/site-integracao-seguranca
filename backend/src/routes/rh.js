import express from "express";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import crypto from "crypto";

import {
    autenticar,
    permitirRoles,
} from "../middleware/auth.js";


const router = express.Router();

// Acesso privado ao painel administrativo
router.get("/validar-admin-painel", (req, res) => {
    const chaveRecebida = req.query.chave;
    const chaveCorreta = process.env.ADMIN_PANEL_SECRET;

    if (!chaveCorreta || chaveRecebida !== chaveCorreta) {
        return res.status(401).json({
            erro: "Acesso não autorizado."
        });
    }

    const token = jwt.sign(
        {
            id: "painel-admin",
            role: "admin",
            perfil: "admin",
            tipo: "admin_panel"
        },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
    );

    return res.json({
        sucesso: true,
        token
    });
});

// ======================================================
// VALIDAR CHAVE E GERAR SESSÃO TEMPORÁRIA DO PAINEL RH
// ======================================================

// ======================================================
// LISTAR COLABORADORES
// ======================================================


 // LISTAR COLABORADORES - SOMENTE DADOS ADMINISTRATIVOS
router.get(
    "/usuarios",
    autenticar,
    permitirRoles("admin"),
    async (req, res) => {
        try {
            const resultado = await pool.query(`
                SELECT
                    id,
                    nome,
                    data_admissao,
                    funcao,
                    setor,
                    whatsapp,
                    ativo
                FROM public.usuarios
                WHERE perfil = 'colaborador'
                   OR role = 'colaborador'
                ORDER BY nome ASC
            `);

            return res.json({
                usuarios: resultado.rows
            });

        } catch (erro) {
            console.error("Erro ao listar colaboradores:", erro);

            return res.status(500).json({
                erro: "Erro interno do servidor."
            });
        }
    }
);


// ======================================================
// STATUS ATIVO / INATIVO
// ======================================================


 // STATUS ATIVO / INATIVO - SOMENTE ADMIN
router.patch(
    "/usuarios/:id/status",
    autenticar,
    permitirRoles("admin"),
    async (req, res) => {
        const usuarioId = Number(req.params.id);
        const ativo = req.body.ativo;

        if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
            return res.status(400).json({
                erro: "ID de usuário inválido."
            });
        }

        if (typeof ativo !== "boolean") {
            return res.status(400).json({
                erro: "Informe um status válido."
            });
        }

        try {
            const resultado = await pool.query(`
                UPDATE public.usuarios
                SET ativo = $1
                WHERE id = $2
                  AND (perfil = 'colaborador' OR role = 'colaborador')
                RETURNING id, nome, ativo
            `, [ativo, usuarioId]);

            if (resultado.rows.length === 0) {
                return res.status(404).json({
                    erro: "Colaborador não encontrado."
                });
            }

            return res.json({
                mensagem: ativo
                    ? "Colaborador ativado."
                    : "Colaborador desativado.",
                usuario: resultado.rows[0]
            });

        } catch (erro) {
            console.error("Erro ao alterar status:", erro);

            return res.status(500).json({
                erro: "Erro interno do servidor."
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
    permitirRoles("admin"),
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



// ==========================================
// ACESSO INDIVIDUAL DO PAINEL RH
// ==========================================

// Confere se o token temporário do RH ainda é válido.
async function autenticarAcessoRh(req, res, next) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({ mensagem: "Acesso não autorizado." });
        }

        const token = authorization.split(" ")[1];
        const dadosToken = jwt.verify(token, process.env.JWT_SECRET);

        if (dadosToken.tipo !== "rh_link" || !dadosToken.rh_access_id || !dadosToken.usuario_id) {
            return res.status(403).json({ mensagem: "Token de acesso inválido." });
        }

        const resultado = await pool.query(
            `
            SELECT ra.id, ra.usuario_id
            FROM public.rh_acessos ra
            INNER JOIN public.usuarios u ON u.id = ra.usuario_id
            WHERE ra.id = $1
              AND ra.usuario_id = $2
              AND ra.revogado_em IS NULL
              AND (
                ra.expira_em IS NULL
                OR ra.expira_em > CURRENT_TIMESTAMP
            )
            `,
            [dadosToken.rh_access_id, dadosToken.usuario_id]
        );

        if (resultado.rows.length === 0) {
            return res.status(401).json({
                mensagem: "Este link do RH expirou ou foi revogado."
            });
        }

        req.acessoRh = {
            rh_access_id: dadosToken.rh_access_id,
            usuario_id: dadosToken.usuario_id
        };

        next();
    } catch (erro) {
        return res.status(401).json({
            mensagem: "Acesso inválido ou expirado."
        });
    }
}


// 1. Valida o link individual recebido pelo RH
router.post("/acesso/validar", async (req, res) => {
    try {
        const { token } = req.body;

        if (!token || typeof token !== "string") {
            return res.status(400).json({
                mensagem: "Link de acesso inválido."
            });
        }

        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const resultado = await pool.query(
            `
            SELECT ra.id, ra.usuario_id
            FROM public.rh_acessos ra
            INNER JOIN public.usuarios u ON u.id = ra.usuario_id
            WHERE ra.token_hash = $1
            AND ra.revogado_em IS NULL
            AND (
                ra.expira_em IS NULL
                OR ra.expira_em > CURRENT_TIMESTAMP
            )
            AND (u.perfil = 'colaborador' OR u.role = 'colaborador')
            AND u.ativo = TRUE
            `,
            [tokenHash]
        );

        if (resultado.rows.length === 0) {
            return res.status(401).json({
                mensagem: "Link expirado, revogado ou inválido."
            });
        }

        const acesso = resultado.rows[0];

        const tokenSessao = jwt.sign(
            {
                tipo: "rh_link",
                rh_access_id: acesso.id,
                usuario_id: acesso.usuario_id
            },
            process.env.JWT_SECRET,
            { expiresIn: "30m" }
        );

        return res.json({
            mensagem: "Acesso validado com sucesso.",
            token: tokenSessao
        });

    } catch (erro) {
        console.error("Erro ao validar link RH:", erro);
        return res.status(500).json({
            mensagem: "Erro ao validar acesso."
        });
    }
});


// 2. Consulta somente o colaborador vinculado ao link
router.get("/acesso/me", autenticarAcessoRh, async (req, res) => {
    try {
        const resultado = await pool.query(
            `
            SELECT
                token_acesso,
                id,
                nome,
                email,
                data_admissao,
                funcao,
                setor,
                whatsapp,
                ativo,
                primeiro_acesso_em,
                ultimo_login,
                modulo_atual,
                parte_atual,
                treinamento_concluido,
                concluido_em
            FROM public.usuarios
            WHERE id = $1
              AND (perfil = 'colaborador' OR role = 'colaborador')
            `,
            [req.acessoRh.usuario_id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: "Colaborador não encontrado."
            });
        }

        const colaborador = resultado.rows[0];

        const frontendUrl = (process.env.FRONTEND_URL || "").replace(/\/$/, "");

        if (!frontendUrl || !colaborador.token_acesso) {
            return res.status(500).json({
                mensagem: "Não foi possível gerar o link de treinamento."
            });
        }

        const linkTreinamento =
            `${frontendUrl}/?acesso=${encodeURIComponent(colaborador.token_acesso)}`;

        // Não expõe o token bruto na resposta
        delete colaborador.token_acesso;

        const progresso = await pool.query(
            `
            SELECT modulo, parte, concluido, atualizado_em
            FROM public.progresso
            WHERE usuario_id = $1
            ORDER BY modulo, parte
            `,
            [req.acessoRh.usuario_id]
        );

        return res.json({
            colaborador,
            progresso: progresso.rows,
            link_treinamento: linkTreinamento
        });

    } catch (erro) {
        console.error("Erro ao consultar painel RH:", erro);
        return res.status(500).json({
            mensagem: "Erro ao carregar dados do colaborador."
        });
    }
});


// 3. Ativa ou desativa somente o colaborador vinculado ao link

router.patch("/acesso/status", autenticarAcessoRh, async (req, res) => {
    try {
        const { ativo } = req.body;

        if (typeof ativo !== "boolean") {
            return res.status(400).json({
                mensagem: "Informe um status válido."
            });
        }

        const resultado = await pool.query(
            `
            UPDATE public.usuarios
            SET ativo = $1,
                atualizado_em = CURRENT_TIMESTAMP,
                token_expira_em = CASE
                    WHEN $1 = TRUE
                    THEN CURRENT_TIMESTAMP + INTERVAL '30 days'
                    ELSE token_expira_em
                END
            WHERE id = $2
              AND (perfil = 'colaborador' OR role = 'colaborador')
            RETURNING id, nome, ativo
            `,
            [ativo, req.acessoRh.usuario_id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensagem: "Colaborador não encontrado."
            });
        }

        return res.json({
            mensagem: ativo
                ? "Colaborador ativado com sucesso."
                : "Colaborador desativado com sucesso.",
            colaborador: resultado.rows[0]
        });

    } catch (erro) {
        console.error("Erro ao alterar status pelo RH:", erro);
        return res.status(500).json({
            mensagem: "Erro ao alterar status do colaborador."
        });
    }
});

export default router;