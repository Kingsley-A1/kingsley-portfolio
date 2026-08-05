// Migration runner — applies SQL files from migrations/ in order.
// Usage: node --env-file-if-exists=.env.local scripts/migrate.mjs
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import pg from "pg";

const { Pool } = pg;

const MIGRATIONS_DIR = join(import.meta.dirname, "..", "migrations");

async function run() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is not set. Set it in .env.local");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 1,
  });

  try {
    // Ensure migrations tracking table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        name STRING PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    const files = readdirSync(MIGRATIONS_DIR)
      .filter((f) => f.endsWith(".sql"))
      .sort();

    if (files.length === 0) {
      console.log("No migration files found.");
      return;
    }

    for (const file of files) {
      const { rows } = await pool.query(
        "SELECT name FROM _migrations WHERE name = $1",
        [file],
      );
      if (rows.length > 0) {
        console.log(`⏭  Skipping ${file} (already applied)`);
        continue;
      }

      const sql = readFileSync(join(MIGRATIONS_DIR, file), "utf-8");
      console.log(`🔄 Applying ${file}...`);
      await pool.query(sql);
      await pool.query("INSERT INTO _migrations (name) VALUES ($1)", [file]);
      console.log(`✅ Applied ${file}`);
    }

    console.log("\n🎉 All migrations applied.");
  } finally {
    await pool.end();
  }
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
