import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";  // For __dirname in ES modules

import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes (MUST come BEFORE static serving and catch-all)
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);

// ----------------- PRODUCTION: Serve React build -----------------
if (process.env.NODE_ENV === "production") {
  // Adjust this path if your client/build is in a different location
  // Common monorepo setups: "../client/build" or "../../client/build"
  const buildPath = path.join(__dirname, "../client/build");
console.log('Serving static files from:', buildPath);  // Add this for debugging
  // Serve static files (JS, CSS, images, etc.)
  app.use(express.static(buildPath));

  // SPA fallback: Fixed for Express 5 – use "/*" instead of "*"
  app.get("/*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}
// ----------------------------------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});