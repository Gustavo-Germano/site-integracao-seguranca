import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

export async function testarBanco() {

    try {
        const resultado = await pool.query(
            "SELECT * FROM usuarios"
        );

        console.log("========================================");
        console.log("✅ TABELA USUARIOS ACESSADA");
        console.log("📋 Registros encontrados:", resultado.rows.length);
        console.log("========================================");
    } catch (erro) {
        console.error("========================================");
        console.error("❌ ERRO AO ACESSAR USUARIOS");
        console.error("========================================");
        console.error(erro.message);
    }
}

export async function testarUsuarios() {
    try {
        const resultado = await pool.query(
            "SELECT * FROM usuarios"
        );

        console.log("========================================");
        console.log("✅ TABELA USUARIOS ACESSADA");
        console.log("📋 Registros encontrados:", resultado.rows.length);
        console.log("========================================");
    } catch (erro) {
        console.error("========================================");
        console.error("❌ ERRO AO ACESSAR USUARIOS");
        console.error("========================================");
        console.error(erro.message);
    }
}