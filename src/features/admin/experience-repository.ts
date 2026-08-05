import "server-only";

import { query } from "@/lib/db";

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  companyLogoUrl: string | null;
  companyLogoKey: string | null;
  skillsUsed: string[];
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface ExperienceRow {
  id: string;
  company: string;
  role: string;
  description: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  company_logo_url: string | null;
  company_logo_key: string | null;
  skills_used: unknown;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

function parseSkills(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return [];
    }
  }
  return [];
}

function mapExperience(row: ExperienceRow): WorkExperience {
  return {
    id: row.id,
    company: row.company,
    role: row.role,
    description: row.description,
    startDate: row.start_date,
    endDate: row.end_date,
    isCurrent: row.is_current,
    companyLogoUrl: row.company_logo_url,
    companyLogoKey: row.company_logo_key,
    skillsUsed: parseSkills(row.skills_used),
    published: row.published,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listExperience(includeUnpublished = true) {
  const result = await query<ExperienceRow>(
    `SELECT * FROM work_experience
     ${includeUnpublished ? "" : "WHERE published = true"}
     ORDER BY sort_order ASC, start_date DESC`,
  );
  return result.rows.map(mapExperience);
}

export async function listPublishedExperienceSafe(): Promise<WorkExperience[]> {
  try {
    return await listExperience(false);
  } catch {
    return [];
  }
}

export async function getExperience(id: string) {
  const result = await query<ExperienceRow>(
    "SELECT * FROM work_experience WHERE id = $1 LIMIT 1",
    [id],
  );
  return result.rows[0] ? mapExperience(result.rows[0]) : null;
}

export async function createExperience(input: {
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  companyLogoUrl?: string;
  companyLogoKey?: string;
  skillsUsed?: string[];
  published?: boolean;
  sortOrder?: number;
}): Promise<WorkExperience> {
  const result = await query<ExperienceRow>(
    `INSERT INTO work_experience (company, role, description, start_date, end_date, is_current, company_logo_url, company_logo_key, skills_used, published, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::JSONB, $10, $11) RETURNING *`,
    [
      input.company,
      input.role,
      input.description,
      input.startDate,
      input.endDate ?? null,
      input.isCurrent ?? false,
      input.companyLogoUrl ?? null,
      input.companyLogoKey ?? null,
      JSON.stringify(input.skillsUsed ?? []),
      input.published ?? true,
      input.sortOrder ?? 0,
    ],
  );
  return mapExperience(result.rows[0]);
}

export async function updateExperience(
  id: string,
  input: Partial<{
    company: string;
    role: string;
    description: string;
    startDate: string;
    endDate: string | null;
    isCurrent: boolean;
    companyLogoUrl: string | null;
    companyLogoKey: string | null;
    skillsUsed: string[];
    published: boolean;
    sortOrder: number;
  }>,
): Promise<WorkExperience> {
  const sets: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue;
    const col = key.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
    if (key === "skillsUsed") {
      sets.push(`${col} = $${idx}::JSONB`);
      values.push(JSON.stringify(value));
    } else {
      sets.push(`${col} = $${idx}`);
      values.push(value);
    }
    idx++;
  }
  sets.push("updated_at = now()");
  values.push(id);

  const result = await query<ExperienceRow>(
    `UPDATE work_experience SET ${sets.join(", ")} WHERE id = $${idx} RETURNING *`,
    values,
  );
  return mapExperience(result.rows[0]);
}

export async function deleteExperience(id: string): Promise<void> {
  await query("DELETE FROM work_experience WHERE id = $1", [id]);
}
