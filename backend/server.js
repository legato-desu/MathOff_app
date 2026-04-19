import dotenv from "dotenv";
dotenv.config(); // 🔥 SIEMPRE PRIMERO

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import { db } from "./db.js";

const app = express();

// 🔍 DEBUG (temporal)
console.log("🌍 DATABASE_URL:", process.env.DATABASE_URL);

// 🔓 Middlewares
app.use(cors());
app.use(express.json());

// 🔥 Inicializar base de datos
const initDB = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);
    console.log("✅ Tabla users lista");
  } catch (error) {
    console.log("❌ Error creando tabla:", error);
  }
};

// Ejecutar inicialización
initDB();

// 📌 Ruta principal
app.get("/", (req, res) => {
  res.send("🚀 API MathOff funcionando correctamente");
});

// 🧪 Test DB
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json(result.rows);
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// 🔑 Rutas
app.use("/api/auth", authRoutes);

// ⚠️ Puerto dinámico (Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor en puerto ${PORT}`);
  console.log("🔥 BACKEND CORRIENDO");
});