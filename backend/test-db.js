import db from './db.js';
import dotenv from 'dotenv';
dotenv.config();

console.log("Testing DB Connection...");
console.log("URL:", process.env.TURSO_DATABASE_URL ? "Found" : "Missing");

try {
    const result = await db.execute("SELECT 1");
    console.log("Connection Success!");
    const tables = await db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
    console.log("Users Table Check:", tables.rows.length ? "Exists" : "MISSING");
} catch (err) {
    console.error("Connection Failed!", err);
}
