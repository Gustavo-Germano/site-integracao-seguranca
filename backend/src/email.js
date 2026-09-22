export async function enviarEmailAcesso({
    nome,
    email,
    usuarioLogin,
    senhaTemporaria
}) {

    const apiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM;

    if (!apiKey) {
        throw new Error(
            "RESEND_API_KEY não configurada."
        );
    }

    if (!emailFrom) {
        throw new Error(
            "EMAIL_FROM não configurado."
        );
    }

    const resposta = await fetch(
        "https://api.resend.com/emails",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },

            body: JSON.stringify({

                from: emailFrom,

                to: [email],

                subject:
                    "Seu acesso ao treinamento de Segurança",

                html: `
                    <div style="
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 30px;
                        color: #222;
                    ">

                        <h2 style="color:#f28c28;">
                            Integração de Segurança
                        </h2>

                        <p>
                            Olá, <strong>${nome}</strong>!
                        </p>

                        <p>
                            Seu acesso ao treinamento foi
                            criado automaticamente.
                        </p>

                        <p>
                            Utilize os dados abaixo para
                            entrar no treinamento:
                        </p>

                        <div style="
                            background:#f5f5f5;
                            padding:20px;
                            border-radius:10px;
                            margin:20px 0;
                        ">

                            <p>
                                <strong>Usuário:</strong><br>
                                ${usuarioLogin}
                            </p>

                            <p>
                                <strong>Senha:</strong><br>
                                ${senhaTemporaria}
                            </p>

                        </div>

                        <p>
                            Guarde essas informações para
                            realizar seu acesso.
                        </p>

                        <p>
                            Atenciosamente,<br>
                            <strong>Integração de Segurança</strong>
                        </p>

                    </div>
                `
            })
        }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {

        console.error(
            "Erro retornado pelo Resend:",
            dados
        );

        throw new Error(
            dados.message ||
            dados.erro ||
            "Não foi possível enviar o e-mail."
        );
    }

    return dados;
}