import db from './backend/db.js';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

console.log("Testing DB Connection...");
console.log("URL:", process.env.TURSO_DATABASE_URL ? "Found" : "Missing");
console.log("Token:", process.env.TURSO_AUTH_TOKEN ? "Found" : "Missing");

try {
    const result = await db.execute("SELECT 1");
    console.log("Connection Success!", result);
} catch (err) {
    console.error("Connection Failed!", err);
}
