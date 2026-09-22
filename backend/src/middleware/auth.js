import jwt from "jsonwebtoken";

export function autenticar(req, res, next) {

    try {

        const autorizacao =
            req.headers.authorization;

        if (!autorizacao) {

            return res.status(401).json({
                erro: "Token não informado."
            });

        }

        const partes =
            autorizacao.split(" ");

        if (
            partes.length !== 2 ||
            partes[0] !== "Bearer"
        ) {

            return res.status(401).json({
                erro: "Formato do token inválido."
            });

        }

        const token = partes[1];

        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        /*
         * O auth.js cria o JWT contendo:
         *
         * id
         * perfil
         * role
         *
         * Aqui nós colocamos essas informações
         * dentro de req.usuario para que qualquer
         * rota do backend possa utilizá-las.
         */
        req.usuario = usuario;

        next();

    } catch (erro) {

        return res.status(401).json({
            erro: "Token inválido ou expirado."
        });

    }

}


/*
 * CONTROLE PELO PERFIL ANTIGO
 *
 * Mantemos essa função porque seu projeto
 * já utiliza req.usuario.perfil.
 */
export function permitirPerfis(...perfisPermitidos) {

    return (req, res, next) => {

        if (!req.usuario) {

            return res.status(401).json({
                erro: "Usuário não autenticado."
            });

        }

        if (
            !perfisPermitidos.includes(
                req.usuario.perfil
            )
        ) {

            return res.status(403).json({
                erro:
                    "Você não tem permissão para acessar este recurso."
            });

        }

        next();

    };

}


/*
 * CONTROLE PELO PERFIL ANTIGO
 *
 * Também mantemos essa função para não
 * quebrar nenhuma rota existente.
 */
export function exigirPerfil(...perfisPermitidos) {

    return (req, res, next) => {

        if (!req.usuario) {

            return res.status(401).json({
                erro: "Usuário não autenticado."
            });

        }

        if (
            !perfisPermitidos.includes(
                req.usuario.perfil
            )
        ) {

            return res.status(403).json({
                erro:
                    "Você não possui permissão para esta ação."
            });

        }

        next();

    };

}


/*
 * NOVO CONTROLE POR ROLE
 *
 * É este que vamos usar para o novo
 * painel do RH e posteriormente para ADMIN.
 *
 * Exemplos:
 *
 * permitirRoles("rh")
 * permitirRoles("admin")
 * permitirRoles("rh", "admin")
 */
export function permitirRoles(...rolesPermitidas) {

    return (req, res, next) => {

        if (!req.usuario) {

            return res.status(401).json({
                erro: "Usuário não autenticado."
            });

        }

        if (
            !rolesPermitidas.includes(
                req.usuario.role
            )
        ) {

            return res.status(403).json({
                erro:
                    "Você não tem permissão para acessar este recurso."
            });

        }

        next();

    };

}


/*
 * CONTROLE MAIS RÍGIDO PARA AÇÕES DO RH
 *
 * Futuramente poderemos usar:
 *
 * exigirRole("rh", "admin")
 *
 * para:
 * - resetar colaborador
 * - criar colaborador
 * - bloquear usuário
 * - visualizar progresso
 * - etc.
 */
export function exigirRole(...rolesPermitidas) {

    return (req, res, next) => {

        if (!req.usuario) {

            return res.status(401).json({
                erro: "Usuário não autenticado."
            });

        }

        if (
            !rolesPermitidas.includes(
                req.usuario.role
            )
        ) {

            return res.status(403).json({
                erro:
                    "Você não possui permissão para esta ação."
            });

        }

        next();

    };

}