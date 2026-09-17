import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool(
    process.env.DATABASE_URL
        ? {
              connectionString: process.env.DATABASE_URL,
              ssl: {
                  rejectUnauthorized: false
              }
          }
        : {
              host: process.env.DB_HOST,
              port: process.env.DB_PORT,
              database: process.env.DB_NAME,
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD
          }
);

export async function testarBanco() {

    try {

        const resultado = await pool.query(
            "SELECT NOW()"
        );

        console.log("========================================");
        console.log("✅ BANCO DE DADOS CONECTADO");
        console.log("🗄️ Banco:", process.env.DB_NAME);
        console.log("🖥️ Servidor:", process.env.DB_HOST);
        console.log("🕐 Horário do banco:", resultado.rows[0].now);
        console.log("========================================");

    } catch (erro) {

        console.error("========================================");
        console.error("❌ ERRO AO CONECTAR AO BANCO");
        console.error("========================================");
        console.error(erro.message);
        console.error("========================================");

    }
}

export async function testarUsuarios() {
    try {
        const resultado = await pool.query(
            "SELECT * FROM public.usuarios"
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