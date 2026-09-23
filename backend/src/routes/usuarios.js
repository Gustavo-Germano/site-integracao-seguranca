try {
const linkTreinamento =
    `https://site-integracao-seguranca-1.onrender.com/index.html?acesso=${encodeURIComponent(emailNormalizado)}`;

res.status(201).json({
    mensagem: "Colaborador cadastrado com sucesso.",
    usuario: resultado.rows[0],

    credenciais: {
        usuario_login: usuarioLogin,
        senha_temporaria: senhaTemporaria
    },

    link_treinamento: linkTreinamento
});

} catch (erro) {

    console.error(
        "Erro ao criar colaborador:",
        erro
    );

    if (erro.code === "23505") {

        return res.status(409).json({
            erro: "Email ou usuário já cadastrado."
        });

    }

    res.status(500).json({
        erro: "Erro interno do servidor."
    });

}