import "server-only";

import { query } from "@/lib/db";
import type {
  CollaborationCreateInput,
  CollaborationUpdateInput,
} from "@/features/admin/admin-schemas";

export interface Collaboration {
  id: string;
  partnerName: string;
  partnerLogoUrl: string | null;
  partnerLogoKey: string | null;
  projectName: string;
  description: string;
  role: string;
  year: string;
  link: string | null;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface CollabRow {
  id: string;
  partner_name: string;
  partner_logo_url: string | null;
  partner_logo_key: string | null;
  project_name: string;
  description: string;
  role: string;
  year: string;
  link: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

function mapCollab(row: CollabRow): Collaboration {
  return {
    id: row.id,
    partnerName: row.partner_name,
    partnerLogoUrl: row.partner_logo_url,
    partnerLogoKey: row.partner_logo_key,
    projectName: row.project_name,
    description: row.description,
    role: row.role,
    year: row.year,
    link: row.link,
    published: row.published,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listCollaborations(includeUnpublished = true) {
  const result = await query<CollabRow>(
    `SELECT * FROM collaborations
     ${includeUnpublished ? "" : "WHERE published = true"}
     ORDER BY sort_order ASC, created_at DESC`,
  );
  return result.rows.map(mapCollab);
}

export async function listPublishedCollaborationsSafe(): Promise<
  Collaboration[]
> {
  try {
    return await listCollaborations(false);
  } catch {
    return [];
  }
}

export async function getCollaboration(id: string) {
  const result = await query<CollabRow>(
    "SELECT * FROM collaborations WHERE id = $1 LIMIT 1",
    [id],
  );
  return result.rows[0] ? mapCollab(result.rows[0]) : null;
}

export async function createCollaboration(
  input: CollaborationCreateInput,
): Promise<Collaboration> {
  const result = await query<CollabRow>(
    `INSERT INTO collaborations (partner_name, partner_logo_url, partner_logo_key, project_name, description, role, year, link, published, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [
      input.partnerName,
      input.partnerLogoUrl ?? null,
      input.partnerLogoKey ?? null,
      input.projectName,
      input.description,
      input.role,
      input.year,
      input.link ?? null,
      input.published ?? true,
      input.sortOrder ?? 0,
    ],
  );
  return mapCollab(result.rows[0]);
}

const COLLABORATION_COLUMNS: Record<keyof CollaborationUpdateInput, string> = {
  partnerName: "partner_name",
  partnerLogoUrl: "partner_logo_url",
  partnerLogoKey: "partner_logo_key",
  projectName: "project_name",
  description: "description",
  role: "role",
  year: "year",
  link: "link",
  published: "published",
  sortOrder: "sort_order",
};

export async function updateCollaboration(
  id: string,
  input: CollaborationUpdateInput,
): Promise<Collaboration | null> {
  const sets: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue;
    const col = COLLABORATION_COLUMNS[key as keyof CollaborationUpdateInput];
    if (!col) continue;
    sets.push(`${col} = $${idx}`);
    values.push(value);
    idx++;
  }
  sets.push("updated_at = now()");
  values.push(id);

  const result = await query<CollabRow>(
    `UPDATE collaborations SET ${sets.join(", ")} WHERE id = $${idx} RETURNING *`,
    values,
  );
  return result.rows[0] ? mapCollab(result.rows[0]) : null;
}

export async function deleteCollaboration(id: string): Promise<boolean> {
  const result = await query("DELETE FROM collaborations WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
}
