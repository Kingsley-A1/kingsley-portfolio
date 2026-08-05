import "server-only";

import { query } from "@/lib/db";

export interface GraphicsWork {
  id: string;
  title: string;
  category: string;
  description: string | null;
  imageUrl: string;
  imageKey: string | null;
  client: string | null;
  year: string;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface GraphicsRow {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string;
  image_key: string | null;
  client: string | null;
  year: string;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

function mapGraphics(row: GraphicsRow): GraphicsWork {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    imageUrl: row.image_url.startsWith("/api/")
      ? row.image_url
      : row.image_key
        ? `/api/storage/${encodeURIComponent(row.image_key)}`
        : row.image_url,
    imageKey: row.image_key,
    client: row.client,
    year: row.year,
    published: row.published,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listGraphics(includeUnpublished = true) {
  const result = await query<GraphicsRow>(
    `SELECT * FROM graphics_works
     ${includeUnpublished ? "" : "WHERE published = true"}
     ORDER BY sort_order ASC, created_at DESC`,
  );
  return result.rows.map(mapGraphics);
}

export async function listPublishedGraphicsSafe(): Promise<GraphicsWork[]> {
  try {
    return await listGraphics(false);
  } catch {
    return [];
  }
}

export async function getGraphics(id: string) {
  const result = await query<GraphicsRow>(
    "SELECT * FROM graphics_works WHERE id = $1 LIMIT 1",
    [id],
  );
  return result.rows[0] ? mapGraphics(result.rows[0]) : null;
}

export async function createGraphics(input: {
  title: string;
  category: string;
  description?: string;
  imageUrl: string;
  imageKey?: string;
  client?: string;
  year: string;
  published?: boolean;
  sortOrder?: number;
}): Promise<GraphicsWork> {
  const result = await query<GraphicsRow>(
    `INSERT INTO graphics_works (title, category, description, image_url, image_key, client, year, published, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [
      input.title,
      input.category,
      input.description ?? null,
      input.imageUrl,
      input.imageKey ?? null,
      input.client ?? null,
      input.year,
      input.published ?? true,
      input.sortOrder ?? 0,
    ],
  );
  return mapGraphics(result.rows[0]);
}

export async function updateGraphics(
  id: string,
  input: Partial<{
    title: string;
    category: string;
    description: string | null;
    imageUrl: string;
    imageKey: string | null;
    client: string | null;
    year: string;
    published: boolean;
    sortOrder: number;
  }>,
): Promise<GraphicsWork> {
  const sets: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue;
    const col = key.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
    sets.push(`${col} = $${idx}`);
    values.push(value);
    idx++;
  }
  sets.push("updated_at = now()");
  values.push(id);

  const result = await query<GraphicsRow>(
    `UPDATE graphics_works SET ${sets.join(", ")} WHERE id = $${idx} RETURNING *`,
    values,
  );
  return mapGraphics(result.rows[0]);
}

export async function deleteGraphics(id: string): Promise<void> {
  await query("DELETE FROM graphics_works WHERE id = $1", [id]);
}
