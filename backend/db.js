import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); // 🔥 cargar variables

const { Pool } = pkg;

// 🔍 DEBUG
console.log("🌍 DATABASE_URL:", process.env.DATABASE_URL);

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // 🔥 NECESARIO para Render SIEMPRE
  },
});

// 🔍 Test conexión
db.connect()
  .then(() => console.log("✅ PostgreSQL conectado"))
  .catch((err) => console.error("❌ Error conexión:", err));