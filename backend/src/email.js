export async function enviarEmailAcesso({
    nome,
    email,
    usuarioLogin,
    senhaTemporaria
}) {
    
    const apiKey = process.env.RESEND_API_KEY;

    const emailFrom =
        process.env.EMAIL_FROM?.trim() ||
        "Integração de Segurança <onboarding@resend.dev>";

    if (!apiKey) {
        throw new Error("RESEND_API_KEY não configurada.");
    }

    const resposta = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            from: emailFrom,
            to: [email],
            subject: "Seu acesso ao treinamento de Segurança",
            html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
                    <h2 style="color:#f57c00;">
                        Integração de Segurança
                    </h2>

                    <p>Olá, <strong>${nome}</strong>!</p>

                    <p>
                        Seu acesso ao treinamento foi criado com sucesso.
                    </p>

                    <p>
                        <strong>Usuário:</strong> ${usuarioLogin}<br>
                        <strong>Senha:</strong> ${senhaTemporaria}
                    </p>

                    <p>
                        Utilize esses dados para acessar o treinamento.
                    </p>

                    <p>
                        Atenciosamente,<br>
                        <strong>Integração de Segurança</strong>
                    </p>
                </div>
            `
        })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        console.error("Erro retornado pelo Resend:", dados);

        throw new Error(
            dados.message ||
            dados.erro ||
            "Não foi possível enviar o e-mail."
        );
    }

    return dados;
}