
const GRAPH_API_VERSION = process.env.WA_GRAPH_API_VERSION || "v23.0";

export async function enviarAvisoAcesso(nome, dataAcesso) {
    const token = process.env.WA_ACCESS_TOKEN;
    const phoneNumberId = process.env.WA_PHONE_NUMBER_ID;
    const numeroMarcos = process.env.MARCOS_WHATSAPP;

    if (!token || !phoneNumberId || !numeroMarcos) {
        throw new Error("Configurações do WhatsApp não encontradas.");
    }

    const resposta = await fetch(
        `https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneNumberId}/messages`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                to: numeroMarcos,
                type: "template",
                template: {
                    name: "colaborador_acessou_treinamento",
                    language: {
                        code: "pt_BR"
                    },
                    components: [
                        {
                            type: "body",
                            parameters: [
                                { type: "text", text: nome },
                                { type: "text", text: dataAcesso }
                            ]
                        }
                    ]
                }
            })
        }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
        console.error("Erro WhatsApp Meta:", dados);
        throw new Error("Não foi possível enviar a notificação pelo WhatsApp.");
    }

    return dados;
}
