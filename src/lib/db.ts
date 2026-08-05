import "server-only";

import { Pool, type QueryResultRow } from "pg";

declare global {
  var __kingsleyPortfolioPool: Pool | undefined;
}

function getPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }
  globalThis.__kingsleyPortfolioPool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes("sslmode=disable")
      ? false
      : { rejectUnauthorized: false },
    max: 5,
    connectionTimeoutMillis: 5_000,
    query_timeout: 20_000,
    statement_timeout: 20_000,
    idleTimeoutMillis: 30_000,
  });
  return globalThis.__kingsleyPortfolioPool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  values: unknown[] = [],
) {
  const pool = getPool();
  return pool.query<T>(text, values);
}

export async function withTransaction<T>(
  work: (client: import("pg").PoolClient) => Promise<T>,
  attempts = 3,
): Promise<T> {
  const pool = getPool();
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await work(client);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      lastError = error;
      await client.query("ROLLBACK").catch(() => undefined);
      const code =
        typeof error === "object" && error && "code" in error
          ? String(error.code)
          : "";
      if (code !== "40001" || attempt === attempts) throw error;
    } finally {
      client.release();
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("Transaction failed.");
}
