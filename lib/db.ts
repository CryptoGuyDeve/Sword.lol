import { Pool } from "pg";

let pool: Pool | null = null;

function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined");
    }

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: true, // Neon requires SSL
      },
    });
  }
  return pool;
}

export const db = {
  query: (text: string, params?: any[]) => getPool().query(text, params),
};
