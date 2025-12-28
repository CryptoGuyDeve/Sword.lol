import { db } from "../lib/db";

async function run() {
  try {
    console.log("Running migration...");

    // Add is_admin column
    await db.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE
    `);
    console.log("Added is_admin column.");

    // Add cursor_effect column
    await db.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS cursor_effect TEXT DEFAULT 'none'
    `);
    console.log("Added cursor_effect column.");

    console.log("Migration completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

run();
