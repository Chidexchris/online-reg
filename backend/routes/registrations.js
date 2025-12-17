import express from "express";
import db from "../db.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Register course
router.post("/", auth, (req, res) => {
  const { course_id } = req.body;

  // Prevent duplicate registration
  const exists = db.prepare(`
    SELECT * FROM registrations
    WHERE user_id = ? AND course_id = ?
  `).get(req.user.id, course_id);

  if (exists) {
    return res.status(400).json({ message: "Already registered" });
  }

  db.prepare(`
    INSERT INTO registrations (user_id, course_id, status)
    VALUES (?, ?, 'pending')
  `).run(req.user.id, course_id);

  res.json({ message: "Registration pending approval" });
});

export default router;
