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
        const resultado = await pool.query(`
            SELECT
                current_database() AS banco,
                current_user AS usuario,
                current_schema() AS schema_atual,
                current_setting('search_path') AS search_path,
                to_regclass('public.usuarios') AS tabela
        `);

        console.log("========================================");
        console.log("BANCO CONECTADO");
        console.log("Banco:", resultado.rows[0].banco);
        console.log("Usuário:", resultado.rows[0].usuario);
        console.log("Schema:", resultado.rows[0].schema_atual);
        console.log("Search path:", resultado.rows[0].search_path);
        console.log("Tabela:", resultado.rows[0].tabela);
        console.log("========================================");

        const colunas = await pool.query(`
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = 'usuarios'
            ORDER BY ordinal_position
        `);

        console.log("COLUNAS VISÍVEIS PELO BACKEND:");
        console.table(colunas.rows);

    } catch (erro) {
        console.error("ERRO AO DIAGNOSTICAR BANCO:", erro);
    }
}

export async function testarUsuarios() {
    try {
        const resultado = await pool.query(
            "SELECT COUNT(*) FROM public.usuarios"
        );

        console.log(
            "USUÁRIOS ENCONTRADOS:",
            resultado.rows[0].count
        );

    } catch (erro) {
        console.error("ERRO AO ACESSAR USUARIOS:", erro);
    }
}