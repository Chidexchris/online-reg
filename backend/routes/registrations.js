import express from "express";
import db from "../db.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/:id/register", auth, async (req, res) => {
  const course_id = req.params.id;

  try {
    const exists = await db.execute({
      sql: "SELECT * FROM registrations WHERE user_id=? AND course_id=?",
      args: [req.user.id, course_id],
    });

    if (exists.rows.length) {
      return res.status(400).json({ message: "Already registered" });
    }

    await db.execute({
      sql: "INSERT INTO registrations (user_id, course_id, status) VALUES (?, ?, 'pending')",
      args: [req.user.id, course_id],
    });

    res.json({ message: "Course registered (pending approval)" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});
export default router;
