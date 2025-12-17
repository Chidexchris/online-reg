import express from "express";
import db  from "../db.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

/* VIEW ALL COURSES */
router.get("/", auth, async (req, res) => {
  const courses = await db.execute("SELECT * FROM courses");
  res.json(courses.rows);
});

/* REGISTER COURSE */
router.post("/:id/register", auth, async (req, res) => {
  await db.execute({
    sql: `INSERT INTO registrations (user_id, course_id) VALUES (?, ?)`,
    args: [req.user.id, req.params.id],
  });

  res.json({ message: "Course registered (pending approval)" });
});

/* MY REGISTRATIONS */
router.get("/my", auth, async (req, res) => {
  const result = await db.execute({
    sql: `
      SELECT r.id, c.code, c.title, c.unit, r.status
      FROM registrations r
      JOIN courses c ON c.id = r.course_id
      WHERE r.user_id = ?
    `,
    args: [req.user.id],
  });

  res.json(result.rows);
});

/* DROP COURSE */
router.delete("/:id/drop", auth, async (req, res) => {
  await db.execute({
    sql: `DELETE FROM registrations WHERE id = ? AND user_id = ?`,
    args: [req.params.id, req.user.id],
  });

  res.json({ message: "Course dropped" });
});

export default router;
