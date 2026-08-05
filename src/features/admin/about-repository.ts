import "server-only";

import { query } from "@/lib/db";

export interface AboutContent {
  id: string;
  bio: string;
  headline: string;
  extendedBio: string;
  interests: string[];
  socialLinks: Record<string, string>;
  photoUrl: string | null;
  photoKey: string | null;
  cvUrl: string | null;
  cvKey: string | null;
  updatedAt: string;
}

interface AboutRow {
  id: string;
  bio: string;
  headline: string;
  extended_bio: string;
  interests: unknown;
  social_links: unknown;
  photo_url: string | null;
  photo_key: string | null;
  cv_url: string | null;
  cv_key: string | null;
  updated_at: string;
}

function parseInterests(value: unknown): string[] {
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

function parseSocialLinks(value: unknown): Record<string, string> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, string>;
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }
  return {};
}

function mapAbout(row: AboutRow): AboutContent {
  return {
    id: row.id,
    bio: row.bio,
    headline: row.headline,
    extendedBio: row.extended_bio,
    interests: parseInterests(row.interests),
    socialLinks: parseSocialLinks(row.social_links),
    photoUrl: row.photo_url,
    photoKey: row.photo_key,
    cvUrl: row.cv_url,
    cvKey: row.cv_key,
    updatedAt: row.updated_at,
  };
}

export async function getAbout(): Promise<AboutContent | null> {
  const result = await query<AboutRow>(
    "SELECT * FROM personal_about WHERE id = 'primary' LIMIT 1",
  );
  return result.rows[0] ? mapAbout(result.rows[0]) : null;
}

export async function getAboutSafe(): Promise<AboutContent | null> {
  try {
    return await getAbout();
  } catch {
    return null;
  }
}

export async function updateAbout(input: {
  bio?: string;
  headline?: string;
  extendedBio?: string;
  interests?: string[];
  socialLinks?: Record<string, string>;
  photoUrl?: string | null;
  photoKey?: string | null;
  cvUrl?: string | null;
  cvKey?: string | null;
}): Promise<AboutContent> {
  const sets: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue;
    const col = key.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
    if (key === "interests" || key === "socialLinks") {
      sets.push(`${col} = $${idx}::JSONB`);
      values.push(JSON.stringify(value));
    } else {
      sets.push(`${col} = $${idx}`);
      values.push(value);
    }
    idx++;
  }

  sets.push(`updated_at = now()`);

  const result = await query<AboutRow>(
    `UPDATE personal_about SET ${sets.join(", ")} WHERE id = 'primary' RETURNING *`,
    values,
  );
  return mapAbout(result.rows[0]);
}
