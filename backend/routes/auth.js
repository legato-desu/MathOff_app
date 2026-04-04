import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

const router = express.Router();

// 🟣 REGISTER
router.post("/register", async (req, res) => {

  console.log("🔥 BODY COMPLETO:", req.body);
  console.log("🔥 USERNAME:", req.body.username);

  const { username, email, password } = req.body;

  if (!username) {
    console.log("❌ USERNAME NO LLEGA");
  }

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username || "SIN_USERNAME", email, password],
    (err) => {
      if (err) {
        console.log("ERROR INSERT:", err);
        return res.status(500).json({ message: "Error" });
      }

      res.json({ message: "ok" });
    }
  );
});

// 🔑 LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("BODY:", req.body);
  console.log("BODY REGISTER:", req.body);

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        console.log("ERROR LOGIN:", err);
        return res.status(500).json({ message: "Error servidor" });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: "Usuario no existe" });
      }

      const user = results[0];

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        { id: user.id },
        "SECRET_KEY",
        { expiresIn: "1d" }
      );

      res.json({ token });
    }
  );
});

export default router;