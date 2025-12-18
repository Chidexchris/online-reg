import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";  // Add this for __dirname in ES modules

import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Your API routes (MUST come BEFORE static serving)
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);

// ----------------- PRODUCTION: Serve React build -----------------
if (process.env.NODE_ENV === "production") {
  // Path to your React build folder
  // Adjust this based on your actual project structure!
  const buildPath = path.join(__dirname, "../client/build");  // Most common monorepo setup

  app.use(express.static(buildPath));

  // SPA fallback: for any route not matching API, serve index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}
// ----------------------------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));