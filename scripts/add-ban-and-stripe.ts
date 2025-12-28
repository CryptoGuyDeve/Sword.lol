import { db } from "../lib/db";

async function run() {
  try {
    console.log("Running migration Phase 2...");

    // Add is_banned column
    await db.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT FALSE
    `);
    console.log("Added is_banned column.");

    // Add stripe_account_id column
    await db.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS stripe_account_id TEXT
    `);
    console.log("Added stripe_account_id column.");

    console.log("Migration Phase 2 completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

run();
