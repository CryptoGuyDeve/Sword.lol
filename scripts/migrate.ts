import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

console.log("Starting migration...");

async function migrate() {
  const { pool } = await import("../lib/db");
  const client = await pool.connect();

  try {
    const sqlPath = path.join(process.cwd(), "database-setup.sql");
    console.log(`Reading SQL from ${sqlPath}`);
    const sql = fs.readFileSync(sqlPath, "utf8");
    console.log("Executing SQL...");
    await client.query(sql);
    console.log("Migration completed successfully");
  } catch (err) {
    console.error("Migration failed", err);
  } finally {
    client.release();
    pool.end();
  }
}

migrate();
