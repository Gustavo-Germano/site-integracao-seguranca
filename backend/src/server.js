import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { testarBanco, testarUsuarios } from "./db.js";
import usuariosRouter from "./routes/usuarios.js";
import authRouter from "./routes/auth.js";

dotenv.config();


const app = express();

const PORT = 3000;


// ========================================
// CONFIGURAÇÕES
// ========================================

app.use(helmet());

app.use(cors({
    origin: "http://localhost:5500",
    credentials: true
}));

app.use(express.json());
app.use("/api/usuarios", usuariosRouter);
app.use("/api/auth", authRouter);


// ========================================
// ROTA PRINCIPAL
// ========================================

app.get("/", (req, res) => {

    res.json({
        sistema: "Integração de Segurança",
        status: "online",
        versao: "1.0.0"
    });

});


// ========================================
// TESTE DO BACKEND
// ========================================

app.get("/api/health", (req, res) => {

    res.json({
        status: "ok",
        backend: "online",
        horario: new Date().toISOString()
    });

});


// ========================================
// INICIAR SERVIDOR
// ========================================

app.listen(PORT, async () => {

    console.log("");
    console.log("========================================");
    console.log(" 🚀 BACKEND INTEGRAÇÃO DE SEGURANÇA");
    console.log("========================================");
    console.log(`🌐 Servidor: http://localhost:${PORT}`);
    console.log(`❤️  Health:  http://localhost:${PORT}/api/health`);
    console.log("========================================");
    console.log("");

    await testarBanco();
    await testarUsuarios();

});