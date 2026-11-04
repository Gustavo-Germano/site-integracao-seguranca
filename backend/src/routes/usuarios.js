import express from "express";
import crypto from "crypto";
import { pool } from "../db.js";

import {
    autenticar,
    permitirRoles
} from "../middleware/auth.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| CADASTRAR COLABORADOR E GERAR LINK DE TREINAMENTO
|--------------------------------------------------------------------------
|
| O RH informa:
| - nome completo
| - data de admissão
| - função
| - setor
| - WhatsApp
|
| O backend gera:
| - link individual de treinamento
|
| Não gera e-mail, usuário ou senha para o colaborador.
|
*/

router.post(
    "/",
    autenticar,
    permitirRoles("rh", "admin"),
    async (req, res) => {
        try {
            const {
                nome,
                data_admissao,
                funcao,
                setor,
                whatsapp
            } = req.body;

            if (
                !nome?.trim() ||
                !data_admissao ||
                !funcao?.trim() ||
                !setor?.trim() ||
                !whatsapp?.trim()
            ) {
                return res.status(400).json({
                    erro: "Preencha nome, data de admissão, função, setor e WhatsApp."
                });
            }

            if (!/^\d{4}-\d{2}-\d{2}$/.test(data_admissao)) {
                return res.status(400).json({
                    erro: "Data de admissão inválida."
                });
            }

            const tokenAcesso = crypto
                .randomBytes(32)
                .toString("hex");

            const verificacao = await pool.query(`
                SELECT current_database() AS banco,
                       current_schema() AS esquema,
                       to_regclass('public.usuarios') AS tabela,
                       EXISTS (
                           SELECT 1
                           FROM information_schema.columns
                           WHERE table_schema = 'public'
                             AND table_name = 'usuarios'
                             AND column_name = 'data_admissao'
                       ) AS tem_data_admissao
            `);

console.log("VERIFICAÇÃO DO BANCO:", verificacao.rows[0]);

            const resultado = await pool.query(
                `
                INSERT INTO public.usuarios
                (
                    nome,
                    data_admissao,
                    funcao,
                    setor,
                    whatsapp,
                    email,
                    usuario_login,
                    senha,
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
                    $2,
                    $3,
                    $4,
                    $5,
                    NULL,
                    NULL,
                    NULL,
                    'colaborador',
                    'colaborador',
                    TRUE,
                    TRUE,
                    $6,
                    CURRENT_TIMESTAMP + INTERVAL '30 days',
                    FALSE,
                    1,
                    0
                )
                RETURNING
                    id,
                    nome,
                    data_admissao,
                    funcao,
                    setor,
                    whatsapp,
                    perfil,
                    ativo,
                    treinamento_concluido,
                    modulo_atual,
                    parte_atual,
                    token_expira_em,
                    criado_em
                `,
                [
                    nome.trim(),
                    data_admissao,
                    funcao.trim(),
                    setor.trim(),
                    whatsapp.trim(),
                    tokenAcesso
                ]
            );

            const linkTreinamento =
                `${process.env.FRONTEND_URL || "https://site-integracao-seguranca-1.onrender.com"}/?acesso=${encodeURIComponent(tokenAcesso)}`;

            return res.status(201).json({
                mensagem: "Colaborador cadastrado com sucesso.",
                usuario: resultado.rows[0],
                link_treinamento: linkTreinamento
            });

        } catch (erro) {
            console.error(
                "Erro ao cadastrar colaborador:",
                erro
            );

            if (erro.code === "23505") {
                return res.status(409).json({
                    erro: "Este colaborador já possui cadastro."
                });
            }

            return res.status(500).json({
                erro: "Erro interno do servidor."
            });
        }
    }
);

/*
|--------------------------------------------------------------------------
| USUÁRIO LOGADO
|--------------------------------------------------------------------------
*/

router.get(
    "/me",
    autenticar,
    async (req, res) => {
        try {
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
                    parte_atual,
                    ultimo_login,
                    criado_em,
                    concluido_em
                FROM public.usuarios
                WHERE id = $1
                `,
                [req.usuario.id]
            );

            if (resultado.rows.length === 0) {
                return res.status(404).json({
                    erro: "Usuário não encontrado."
                });
            }

            return res.json({
                usuario: resultado.rows[0]
            });

        } catch (erro) {
            console.error(
                "Erro ao buscar usuário:",
                erro
            );

            return res.status(500).json({
                erro: "Erro interno do servidor."
            });
        }
    }
);

/*
|--------------------------------------------------------------------------
| EXCLUIR COLABORADOR
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    autenticar,
    permitirRoles("rh", "admin"),
    async (req, res) => {
        const client = await pool.connect();

        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    erro: "ID de colaborador inválido."
                });
            }

            await client.query("BEGIN");

            const resultado = await client.query(
                `
                SELECT id, perfil, role, ativo
                FROM public.usuarios
                WHERE id = $1
                FOR UPDATE
                `,
                [id]
            );

            if (resultado.rows.length === 0) {
                await client.query("ROLLBACK");

                return res.status(404).json({
                    erro: "Colaborador não encontrado."
                });
            }

            const usuario = resultado.rows[0];

            if (
                usuario.perfil !== "colaborador" &&
                usuario.role !== "colaborador"
            ) {
                await client.query("ROLLBACK");

                return res.status(403).json({
                    erro: "Somente colaboradores podem ser excluídos."
                });
            }

            if (usuario.ativo) {
                await client.query("ROLLBACK");

                return res.status(409).json({
                    erro: "Desative o colaborador antes de excluí-lo."
                });
            }

            await client.query(
                `
                DELETE FROM public.progresso
                WHERE usuario_id = $1
                `,
                [id]
            );

            await client.query(
                `
                DELETE FROM public.usuarios
                WHERE id = $1
                `,
                [id]
            );

            await client.query("COMMIT");

            return res.json({
                mensagem: "Colaborador excluído com sucesso."
            });

        } catch (erro) {
            await client.query("ROLLBACK");

            console.error(
                "Erro ao excluir colaborador:",
                erro
            );

            return res.status(500).json({
                erro: "Não foi possível excluir o colaborador. Verifique se existem outros registros vinculados."
            });

        } finally {
            client.release();
        }
    }
);

export default router;