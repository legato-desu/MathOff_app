import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

const router = express.Router();


// 🟢 REGISTER
router.post("/register", async (req, res) => {
  console.log("🔥 REGISTER BODY:", req.body);

  const { username, email, password } = req.body;

  // 🔍 Validación básica
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    // 🔐 Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔍 Verificar si usuario ya existe
    db.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username],
      (err, results) => {
        if (err) {
          console.log("❌ ERROR SELECT:", err);
          return res.status(500).json({ message: "Error servidor" });
        }

        if (results.length > 0) {
          return res.status(400).json({ message: "Usuario ya existe" });
        }

        // 🟢 Insertar usuario
        db.query(
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
          [username, email, hashedPassword],
          (err) => {
            if (err) {
              console.log("❌ ERROR INSERT:", err);
              return res.status(500).json({ message: "Error al registrar" });
            }

            res.json({ message: "Usuario creado correctamente" });
          }
        );
      }
    );

  } catch (error) {
    console.log("❌ ERROR HASH:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});


// 🟢 LOGIN (username o email)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("🔥 LOGIN BODY:", req.body);

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  // 🔍 Buscar por username o email
  db.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, username],
    async (err, results) => {
      if (err) {
        console.log("❌ ERROR LOGIN:", err);
        return res.status(500).json({ message: "Error servidor" });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: "Usuario no existe" });
      }

      const user = results[0];

      try {
        // 🔐 Comparar contraseña
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // 🎟️ Crear token
        const token = jwt.sign(
          { id: user.id },
          "SECRET_KEY",
          { expiresIn: "1d" }
        );

        /* res.json({ token }); */

        res.json({
  token,
  user: {
    id: user.id,
    username: user.username,
    email: user.email,
  },
});

      } catch (error) {
        console.log("❌ ERROR COMPARE:", error);
        res.status(500).json({ message: "Error en el servidor" });
      }
    }
  );
});

// 🔐 CAMBIAR CONTRASEÑA REAL
router.post("/change-password", async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    db.query(
      "SELECT * FROM users WHERE id = ?",
      [userId],
      async (err, results) => {

        if (err) {
          return res.status(500).json({ message: "Error servidor" });
        }

        if (results.length === 0) {
          return res.status(400).json({ message: "Usuario no existe" });
        }

        const user = results[0];

        // 🔐 validar contraseña actual
        const valid = await bcrypt.compare(currentPassword, user.password);

        if (!valid) {
          return res.status(400).json({ message: "Contraseña actual incorrecta" });
        }

        // 🔥 encriptar nueva
        const hashed = await bcrypt.hash(newPassword, 10);

        db.query(
          "UPDATE users SET password = ? WHERE id = ?",
          [hashed, userId],
          (err2) => {

            if (err2) {
              return res.status(500).json({ message: "Error actualizando" });
            }

            res.json({ message: "Contraseña actualizada" });
          }
        );
      }
    );

  } catch (error) {
    res.status(500).json({ message: "Error servidor" });
  }
});


export default router;