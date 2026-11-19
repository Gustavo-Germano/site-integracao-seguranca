import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { pool } from "../db.js";
import {
    autenticar,
    permitirRoles
} from "../middleware/auth.js";

const router = express.Router();

const FRONTEND_URL =
    process.env.FRONTEND_URL ||
    "https://site-integracao-seguranca-1.onrender.com";


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
    async (req, res) => {
        const client = await pool.connect();
        let transacaoIniciada = false;

        try {
            const {
                nome,
                data_admissao,
                funcao,
                setor,
                whatsapp
            } = req.body;

            if (!nome || !data_admissao || !funcao || !setor || !whatsapp) {
                return res.status(400).json({
                    erro: "Preencha todos os campos obrigatórios."
                });
            }

            // Inicia transação
            await client.query("BEGIN");
            transacaoIniciada = true;

            // Gera usuário de login
            
            const nomeBase = nome
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, ".")
                .replace(/^\.+|\.+$/g, "");

            let usuarioLogin = nomeBase || "colaborador";
            let contador = 1;

            while (true) {
                const loginExistente = await client.query(
                    `SELECT id
                     FROM public.usuarios
                     WHERE usuario_login = $1`,
                    [usuarioLogin]
                );

                if (loginExistente.rows.length === 0) {
                    break;
                }

                contador++;
                usuarioLogin = `${nomeBase}.${contador}`;
            }

            // Gera senha temporária
            const primeiroNome = String(nome).trim().split(/\s+/)[0];

            const nomeSenha =
                primeiroNome.charAt(0).toLocaleUpperCase("pt-BR") +
                primeiroNome.slice(1).toLocaleLowerCase("pt-BR");

            
            const numeros = String(
                crypto.randomInt(0, 10000)
            ).padStart(4, "0");


            const senhaTemporaria = `${nomeSenha}${numeros}`;

            const senhaHash = await bcrypt.hash(
                senhaTemporaria,
                12
            );

            // Gera token exclusivo do treinamento
            const tokenAcesso = crypto
                .randomBytes(32)
                .toString("hex");

            // Gera token exclusivo do painel RH
            const tokenRh = crypto
                .randomBytes(32)
                .toString("hex");

            // Armazena somente o hash do token RH
            const tokenRhHash = crypto
                .createHash("sha256")
                .update(tokenRh)
                .digest("hex");

            // Cadastra colaborador
            const resultado = await client.query(
                `
                INSERT INTO public.usuarios
                (
                    nome,
                    data_admissao,
                    funcao,
                    setor,
                    whatsapp,
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
                    $1, $2, $3, $4, $5, $6, $7,
                    'colaborador',
                    'colaborador',
                    TRUE,
                    TRUE,
                    $8,
                    CURRENT_TIMESTAMP + INTERVAL '30 days',
                    FALSE,
                    1,
                    0
                )
                RETURNING id
                `,
                [
                    nome.trim(),
                    data_admissao,
                    funcao.trim(),
                    setor.trim(),
                    whatsapp.trim(),
                    usuarioLogin,
                    senhaHash,
                    tokenAcesso
                ]
            );

            // Registra o acesso individual do RH
            await client.query(
                `
                INSERT INTO public.rh_acessos
                (
                    usuario_id,
                    token_hash,
                    criado_por,
                    expira_em
                )
                VALUES (
                    $1,
                    $2,
                    $3,
                    CURRENT_TIMESTAMP + INTERVAL '90 days'
                )
                `,
                [
                    resultado.rows[0].id,
                    tokenRhHash,
                    null
                ]
            );

            // Confirma as duas operações
            await client.query("COMMIT");
            transacaoIniciada = false;

            // Monta o link individual do RH
            const linkPainelRh =
                `${FRONTEND_URL}/rh/acesso.html?token=${encodeURIComponent(tokenRh)}`;

            return res.status(201).json({
                mensagem: "Colaborador cadastrado com sucesso.",
                credenciais: {
                    usuario_login: usuarioLogin,
                    senha_temporaria: senhaTemporaria
                },
                link_painel_rh: linkPainelRh
            });

        } catch (erro) {
            if (transacaoIniciada) {
                await client.query("ROLLBACK");
            }

            console.error("Erro ao criar colaborador:", erro);

            if (erro.code === "23505") {
                return res.status(409).json({
                    erro: "Usuário já cadastrado."
                });
            }

            return res.status(500).json({
                erro: "Erro interno do servidor."
            });

        } finally {
            client.release();
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



router.delete(
    "/:id",
    autenticar,
    permitirRoles("admin"),
    async (req, res) => {
        const client = await pool.connect();
        let transacaoIniciada = false;

        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    erro: "ID de colaborador inválido."
                });
            }

            await client.query("BEGIN");
            transacaoIniciada = true;

            const resultado = await client.query(
                `SELECT id, perfil, role
                 FROM public.usuarios
                 WHERE id = $1
                 FOR UPDATE`,
                [id]
            );

            if (resultado.rows.length === 0) {
                await client.query("ROLLBACK");
                transacaoIniciada = false;

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
                transacaoIniciada = false;

                return res.status(403).json({
                    erro: "Somente colaboradores podem ser desativados."
                });
            }

            await client.query(
                `UPDATE public.usuarios
                 SET ativo = FALSE,
                     atualizado_em = CURRENT_TIMESTAMP
                 WHERE id = $1`,
                [id]
            );

            await client.query(
                `UPDATE public.rh_acessos
                 SET revogado_em = CURRENT_TIMESTAMP
                 WHERE usuario_id = $1
                   AND revogado_em IS NULL`,
                [id]
            );

            await client.query("COMMIT");
            transacaoIniciada = false;

            return res.json({
                mensagem: "Colaborador desativado e acessos RH revogados. Histórico preservado."
            });

        } catch (erro) {
            if (transacaoIniciada) {
                await client.query("ROLLBACK");
            }

            console.error("Erro ao desativar colaborador:", erro);

            return res.status(500).json({
                erro: "Não foi possível desativar o colaborador."
            });

        } finally {
            client.release();
        }
    }
);



export default router;