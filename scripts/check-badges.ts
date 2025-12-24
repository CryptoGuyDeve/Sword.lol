import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function checkBadges() {
  try {
    const res = await pool.query("SELECT username, badges FROM users");
    console.log("Users and Badges:");
    res.rows.forEach((row) => {
      console.log(
        `Username: ${row.username}, Badges:`,
        row.badges,
        `Type: ${typeof row.badges}`,
        `Is Array: ${Array.isArray(row.badges)}`
      );
    });
  } catch (err) {
    console.error("Error querying database:", err);
  } finally {
    await pool.end();
  }
}

checkBadges();
