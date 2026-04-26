import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

const router = express.Router();

// 🟢 REGISTER
router.post("/register", async (req, res) => {
  console.log("🔥 REGISTER BODY:", req.body);

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );

    res.json({ message: "Usuario creado correctamente" });

  } catch (error) {
    console.error("❌ ERROR REGISTER:", error);
    res.status(500).json({ message: error.message });
  }
});


// 🔐 LOGIN
router.post("/login", async (req, res) => {
  console.log("🔥 LOGIN BODY:", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    // 🔍 Buscar usuario
    const result = await db.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, username]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Usuario no existe" });
    }

    const user = result.rows[0];

    // 🔐 Validar contraseña
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // 🔥 DEBUG JWT
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está definido");
    }

    // 🎟️ Generar token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("❌ ERROR LOGIN COMPLETO:", error);

    res.status(500).json({
      message: error.message || "Error en el servidor",
    });
  }
});


// 🔐 CAMBIAR CONTRASEÑA
router.post("/change-password", async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Usuario no existe" });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(currentPassword, user.password);

    if (!valid) {
      return res.status(400).json({ message: "Contraseña actual incorrecta" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await db.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [hashed, userId]
    );

    res.json({ message: "Contraseña actualizada" });

  } catch (error) {
    console.error("❌ ERROR CHANGE PASSWORD:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;