import "server-only";

import { query } from "@/lib/db";

export interface PortfolioProjectItem {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  imageUrl: string;
  liveUrl: string | null;
  tags: string[];
  year: string;
  comingSoon: boolean;
  featured: boolean;
  published: boolean;
  sortOrder: number;
}

interface ProjectRow {
  id: string;
  name: string;
  project_type: string;
  category: string;
  description: string;
  image_url: string;
  live_url: string | null;
  tags: unknown;
  year: string;
  coming_soon: boolean;
  featured: boolean;
  published: boolean;
  sort_order: number;
}

function parseTags(value: unknown): string[] {
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

function mapProject(row: ProjectRow): PortfolioProjectItem {
  return {
    id: row.id,
    name: row.name,
    type: row.project_type,
    category: row.category,
    description: row.description,
    imageUrl: row.image_url,
    liveUrl: row.live_url,
    tags: parseTags(row.tags),
    year: row.year,
    comingSoon: row.coming_soon,
    featured: row.featured,
    published: row.published,
    sortOrder: row.sort_order,
  };
}

export async function listPortfolioProjects(includeUnpublished = true) {
  const result = await query<ProjectRow>(
    `SELECT * FROM portfolio_projects
     ${includeUnpublished ? "" : "WHERE published = true"}
     ORDER BY sort_order ASC`,
  );
  return result.rows.map(mapProject);
}

export async function listPublishedPortfolioProjectsSafe(): Promise<
  PortfolioProjectItem[]
> {
  try {
    return await listPortfolioProjects(false);
  } catch {
    return [];
  }
}
