import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function checkSocials() {
  try {
    const res = await pool.query(
      "SELECT username, social_links FROM users WHERE username = 'crypto'"
    );
    console.log("Social Links for crypto:");
    res.rows.forEach((row) => {
      console.log(`Username: ${row.username}`);
      console.log(JSON.stringify(row.social_links, null, 2));
    });
  } catch (err) {
    console.error("Error querying database:", err);
  } finally {
    await pool.end();
  }
}

checkSocials();
