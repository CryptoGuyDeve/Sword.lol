import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function updateAndCheck() {
  try {
    // Update badges for crypto
    await pool.query("UPDATE users SET badges = $1 WHERE username = $2", [
      ["Owner", "Admin"],
      "crypto",
    ]);
    console.log("Updated badges for 'crypto'.");

    // Check again
    const res = await pool.query(
      "SELECT username, badges FROM users WHERE username = 'crypto'"
    );
    const row = res.rows[0];
    console.log(
      `Username: ${row.username}, Badges:`,
      row.badges,
      `Type: ${typeof row.badges}`,
      `Is Array: ${Array.isArray(row.badges)}`
    );
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await pool.end();
  }
}

updateAndCheck();
