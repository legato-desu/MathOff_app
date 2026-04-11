import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { db } from "./db.js";

dotenv.config();

const app = express();

// 🔓 Middlewares
app.use(cors());
app.use(express.json());

// 🔥 Inicializar base de datos (crear tabla)
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

// 🔑 Rutas
app.use("/api/auth", authRoutes);

// ⚠️ Puerto dinámico (Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor en puerto ${PORT}`);
  console.log("🔥 BACKEND CORRIENDO");
});