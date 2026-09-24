import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { pool } from "../db.js";

import {
    autenticar,
    permitirRoles
} from "../middleware/auth.js";

const router = express.Router();


/*
|--------------------------------------------------------------------------
| GERAR USUÁRIO E SENHA DO COLABORADOR
|--------------------------------------------------------------------------
|
| O RH informa apenas:
|
| - nome
| - email
|
| O backend gera:
|
| - usuario_login
| - senha temporária
|
*/

router.post(
    "/",
    autenticar,
    permitirRoles("rh", "admin"),
    async (req, res) => {
        try {
            const { nome, email } = req.body;

            if (!nome || !email) {
                return res.status(400).json({
                    erro: "Nome e email são obrigatórios."
                });
            }

            const emailNormalizado =
                email.trim().toLowerCase();

            // Verifica se o email já existe
            const emailExistente =
                await pool.query(
                    `
                    SELECT id
                    FROM public.usuarios
                    WHERE LOWER(email) = $1
                    `,
                    [emailNormalizado]
                );

            if (emailExistente.rows.length > 0) {
                return res.status(409).json({
                    erro: "Este email já está cadastrado."
                });
            }

            // Gera usuário de login
            const nomeBase =
                nome
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, ".")
                    .replace(/^\.+|\.+$/g, "");

            let usuarioLogin =
                nomeBase || "colaborador";

            let contador = 1;

            while (true) {
                const loginExistente =
                    await pool.query(
                        `
                        SELECT id
                        FROM public.usuarios
                        WHERE usuario_login = $1
                        `,
                        [usuarioLogin]
                    );

                if (loginExistente.rows.length === 0) {
                    break;
                }

                contador++;

                usuarioLogin =
                    `${nomeBase}.${contador}`;
            }

            // Senha temporária
            const senhaTemporaria =
                crypto
                    .randomBytes(9)
                    .toString("base64")
                    .replace(/[^a-zA-Z0-9]/g, "")
                    .slice(0, 12);

            const senhaHash =
                await bcrypt.hash(
                    senhaTemporaria,
                    12
                );

            // Token exclusivo do link de treinamento
            const tokenAcesso =
                crypto
                    .randomBytes(32)
                    .toString("hex");

            // Cria o colaborador
            const resultado =
                await pool.query(
                    `
                    INSERT INTO public.usuarios
                    (
                        nome,
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
                        'colaborador',
                        'colaborador',
                        TRUE,
                        TRUE,
                        $5,
                        CURRENT_TIMESTAMP + INTERVAL '7 days',
                        FALSE,
                        1,
                        0
                    )
                    RETURNING
                        id,
                        nome,
                        email,
                        usuario_login,
                        perfil,
                        role,
                        ativo,
                        acesso_por_link,
                        token_acesso,
                        token_expira_em,
                        treinamento_concluido,
                        modulo_atual,
                        parte_atual,
                        criado_em
                    `,
                    [
                        nome.trim(),
                        emailNormalizado,
                        usuarioLogin,
                        senhaHash,
                        tokenAcesso
                    ]
                );

            // Link real do treinamento
            const linkTreinamento =
                `https://site-integracao-seguranca-1.onrender.com/acesso/${tokenAcesso}`;

            return res.status(201).json({
                mensagem:
                    "Colaborador cadastrado com sucesso.",

                usuario:
                    resultado.rows[0],

                credenciais: {
                    usuario_login:
                        usuarioLogin,

                    senha_temporaria:
                        senhaTemporaria
                },

                link_treinamento:
                    linkTreinamento
            });

        } catch (erro) {
            console.error(
                "Erro ao criar colaborador:",
                erro
            );

            if (erro.code === "23505") {
                return res.status(409).json({
                    erro:
                        "Email ou usuário já cadastrado."
                });
            }

            return res.status(500).json({
                erro:
                    "Erro interno do servidor."
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

            const resultado =
                await pool.query(
                    `
                    SELECT
                        id,
                        nome,
                        email,
                        usuario_login,
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


            if (
                resultado.rows.length === 0
            ) {

                return res.status(404).json({
                    erro:
                        "Usuário não encontrado."
                });

            }


            res.json({
                usuario:
                    resultado.rows[0]
            });


        } catch (erro) {

            console.error(
                "Erro ao buscar usuário:",
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