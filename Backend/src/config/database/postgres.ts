import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // Carga variables de .env

// Debug: verifica que la contraseña se esté leyendo
console.log("Conectando a PostgreSQL...");
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("Tipo:", typeof process.env.DB_PASSWORD);

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on("connect", () => {
  //console.log("✅ Conectado a PostgreSQL!");
});

pool.on("error", (err) => {
  console.error("❌ Error en PostgreSQL:", err);
});