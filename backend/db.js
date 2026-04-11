import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// 🔍 Test conexión
db.connect()
  .then(() => console.log("✅ PostgreSQL conectado"))
  .catch((err) => console.log("❌ Error conexión:", err));