import express from "express";
import { pool } from "../db.js";
import {autenticar, permitirRoles} from "../middleware/auth.js";

const router = express.Router();


/*
|--------------------------------------------------------------------------
| LISTAR COLABORADORES
|--------------------------------------------------------------------------
|
| Somente RH e ADMIN podem acessar.
|
*/

router.get(
    "/usuarios",
    autenticar,
    permitirRoles("rh", "admin"),
    async (req, res) => {

        try {

            const resultado = await pool.query(
                `
                SELECT
                    id,
                    nome,
                    email,
                    usuario_login,
                    ativo,
                    treinamento_concluido,
                    modulo_atual,
                    parte_atual,
                    ultimo_login,
                    criado_em,
                    concluido_em
                FROM public.usuarios
                WHERE perfil = 'colaborador'
                ORDER BY nome ASC
                `
            );

            res.json({
                usuarios: resultado.rows
            });

        } catch (erro) {

            console.error(
                "Erro ao listar colaboradores:",
                erro
            );

            res.status(500).json({
                erro:
                    "Erro interno do servidor."
            });
        }

    }
);


/*
|--------------------------------------------------------------------------
| RESETAR TREINAMENTO DE UM COLABORADOR
|--------------------------------------------------------------------------
|
| Essa rota é diferente de:
|
| POST /api/progresso/reiniciar
|
| Aqui o RH pode resetar inclusive um colaborador
| que já concluiu o treinamento.
|
*/

router.post(
    "/usuarios/:id/resetar-treinamento",
    autenticar,
    permitirRoles("rh", "admin"),
    async (req, res) => {

        try {

            const usuarioId =
                Number(req.params.id);

            if (!Number.isInteger(usuarioId)) {

                return res.status(400).json({
                    erro:
                        "ID de usuário inválido."
                });

            }

            const usuario =
                await pool.query(
                    `
                    SELECT
                        id,
                        nome,
                        email,
                        treinamento_concluido
                    FROM public.usuarios
                    WHERE id = $1
                    AND perfil = 'colaborador'
                    `,
                    [usuarioId]
                );

            if (usuario.rows.length === 0) {

                return res.status(404).json({
                    erro:
                        "Colaborador não encontrado."
                });

            }

            /*
             * APAGA o progresso antigo.
             */
            await pool.query(
                `
                DELETE FROM public.progresso
                WHERE usuario_id = $1
                `,
                [usuarioId]
            );


            /*
             * DEVOLVE o colaborador para o início.
             */
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


            /*
             * REGISTRA QUEM FEZ O RESET.
             *
             * Isso só será executado se a tabela
             * public.auditoria já existir.
             */
            try {

                await pool.query(
                    `
                    INSERT INTO public.auditoria
                    (
                        autor_id,
                        usuario_id,
                        acao,
                        descricao
                    )
                    VALUES
                    (
                        $1,
                        $2,
                        'RESET_TREINAMENTO',
                        $3
                    )
                    `,
                    [
                        req.usuario.id,
                        usuarioId,
                        `Treinamento de ${usuario.rows[0].nome} foi reiniciado.`
                    ]
                );

            } catch (erroAuditoria) {

                /*
                 * O reset continua funcionando mesmo
                 * se a tabela de auditoria ainda não
                 * estiver criada.
                 */
                console.warn(
                    "Auditoria não registrada:",
                    erroAuditoria.message
                );

            }


            res.json({

                mensagem:
                    "Treinamento reiniciado pelo RH com sucesso.",

                usuario: {
                    id:
                        usuario.rows[0].id,

                    nome:
                        usuario.rows[0].nome,

                    email:
                        usuario.rows[0].email
                }

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


/*
|--------------------------------------------------------------------------
| ATIVAR / DESATIVAR COLABORADOR
|--------------------------------------------------------------------------
*/

router.patch(
    "/usuarios/:id/status",
    autenticar,
    permitirRoles("rh", "admin"),
    async (req, res) => {

        try {

            const usuarioId =
                Number(req.params.id);

            const { ativo } =
                req.body;

            if (!Number.isInteger(usuarioId)) {

                return res.status(400).json({
                    erro:
                        "ID inválido."
                });

            }

            if (typeof ativo !== "boolean") {

                return res.status(400).json({
                    erro:
                        "O campo ativo deve ser boolean."
                });

            }

            const resultado =
                await pool.query(
                    `
                    UPDATE public.usuarios
                    SET ativo = $1
                    WHERE id = $2
                    AND perfil = 'colaborador'
                    RETURNING
                        id,
                        nome,
                        email,
                        ativo
                    `,
                    [
                        ativo,
                        usuarioId
                    ]
                );

            if (resultado.rows.length === 0) {

                return res.status(404).json({
                    erro:
                        "Colaborador não encontrado."
                });

            }

            res.json({

                mensagem: ativo
                    ? "Colaborador ativado."
                    : "Colaborador desativado.",

                usuario:
                    resultado.rows[0]

            });

        } catch (erro) {

            console.error(
                "Erro ao alterar status:",
                erro
            );

            res.status(500).json({
                erro:
                    "Erro interno do servidor."
            });

        }

    }
);

// =====================================================
// RESETAR TREINAMENTO DE UM COLABORADOR
// Permitido somente para RH e Admin
// =====================================================

router.post(
    "/usuarios/:id/resetar-treinamento",
    autenticar,
    permitirRoles("rh", "admin"),
    async (req, res) => {
        const usuarioId = Number(req.params.id);

        if (!Number.isInteger(usuarioId)) {
            return res.status(400).json({
                erro: "ID de usuário inválido."
            });
        }

        try {
            // Verifica se o colaborador existe
            const usuario = await pool.query(
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

            if (usuario.rows.length === 0) {
                return res.status(404).json({
                    erro: "Colaborador não encontrado."
                });
            }

            // Apaga todo o progresso salvo
            await pool.query(
                `
                DELETE FROM public.progresso
                WHERE usuario_id = $1
                `,
                [usuarioId]
            );

            // Volta o colaborador para o início
            const atualizado = await pool.query(
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
                    treinamento_concluido,
                    modulo_atual,
                    parte_atual
                `,
                [usuarioId]
            );

            res.json({
                mensagem: "Treinamento resetado com sucesso.",
                usuario: atualizado.rows[0]
            });

        } catch (erro) {
            console.error(
                "Erro ao resetar treinamento:",
                erro
            );

            res.status(500).json({
                erro: "Erro interno do servidor."
            });
        }
    }
);

export default router;