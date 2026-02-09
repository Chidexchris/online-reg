import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {
    await db.execute({
      sql: `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      args: [name, email, hash],
    });

    res.json({ message: "User registered" });
  } catch (err) {
    console.error("Registration Error:", err);
    if (err.message && err.message.includes("UNIQUE constraint failed")) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.execute({
    sql: `SELECT * FROM users WHERE email = ?`,
    args: [email],
  });

  if (!user.rows.length) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.rows[0].password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.rows[0].id, role: user.rows[0].role },
    process.env.JWT_SECRET
  );

  res.json({ token, role: user.rows[0].role });
});

export default router;
