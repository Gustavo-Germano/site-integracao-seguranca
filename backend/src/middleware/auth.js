import jwt from "jsonwebtoken";

export function autenticar(req, res, next) {
    try {
        const autorizacao = req.headers.authorization;

        if (!autorizacao) {
            return res.status(401).json({
                erro: "Token não informado."
            });
        }

        const partes = autorizacao.split(" ");

        if (partes.length !== 2 || partes[0] !== "Bearer") {
            return res.status(401).json({
                erro: "Formato do token inválido."
            });
        }

        const token = partes[1];

        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = usuario;

        next();

    } catch (erro) {
        return res.status(401).json({
            erro: "Token inválido ou expirado."
        });
    }
}

export function permitirPerfis(...perfisPermitidos) {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({
                erro: "Usuário não autenticado."
            });
        }

        if (!perfisPermitidos.includes(req.usuario.perfil)) {
            return res.status(403).json({
                erro: "Você não tem permissão para acessar este recurso."
            });
        }

        next();
    };
}

export function exigirPerfil(...perfisPermitidos) {

    return (req, res, next) => {

        if (!req.usuario) {
            return res.status(401).json({
                erro: "Usuário não autenticado."
            });
        }

        if (!perfisPermitidos.includes(req.usuario.perfil)) {

            return res.status(403).json({
                erro: "Você não possui permissão para esta ação."
            });
        }

        next();
    };
}