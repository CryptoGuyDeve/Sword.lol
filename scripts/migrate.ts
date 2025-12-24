import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

console.log("Starting migration...");

async function migrate() {
  const { db } = await import("../lib/db");

  try {
    const sqlPath = path.join(process.cwd(), "database-setup.sql");
    console.log(`Reading SQL from ${sqlPath}`);
    const sql = fs.readFileSync(sqlPath, "utf8");
    console.log("Executing SQL...");
    await db.query(sql);
    console.log("Migration completed successfully");
  } catch (err) {
    console.error("Migration failed", err);
    process.exit(1);
  }
}

migrate();
