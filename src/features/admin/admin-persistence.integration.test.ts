import { randomUUID } from "node:crypto";
import { DataType, newDb } from "pg-mem";
import { describe, expect, it, vi } from "vitest";
import {
  aboutUpdateSchema,
  collaborationCreateSchema,
  experienceCreateSchema,
  graphicsCreateSchema,
} from "./admin-schemas";

describe("admin repository persistence against ephemeral PostgreSQL", () => {
  it("accepts validated writes, rejects extra keys, and restores every editor fixture", async () => {
    const memory = newDb();
    memory.public.registerFunction({
      name: "gen_random_uuid",
      returns: DataType.uuid,
      implementation: randomUUID,
      impure: true,
    });
    memory.public.none(`
      CREATE TABLE personal_about (
        id text PRIMARY KEY, bio text NOT NULL, headline text NOT NULL,
        extended_bio text NOT NULL, interests jsonb NOT NULL DEFAULT '[]',
        social_links jsonb NOT NULL DEFAULT '{}', photo_url text, photo_key text,
        cv_url text, cv_key text, updated_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE TABLE graphics_works (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL,
        category text NOT NULL, description text, image_url text NOT NULL,
        image_key text, client text, year text NOT NULL, published boolean NOT NULL,
        sort_order integer NOT NULL, created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE TABLE collaborations (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(), partner_name text NOT NULL,
        partner_logo_url text, partner_logo_key text, project_name text NOT NULL,
        description text NOT NULL, role text NOT NULL, year text NOT NULL, link text,
        published boolean NOT NULL, sort_order integer NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE TABLE work_experience (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(), company text NOT NULL,
        role text NOT NULL, description text NOT NULL, start_date text NOT NULL,
        end_date text, is_current boolean NOT NULL, company_logo_url text,
        company_logo_key text, skills_used jsonb NOT NULL DEFAULT '[]',
        published boolean NOT NULL, sort_order integer NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
      );
      INSERT INTO personal_about (id, bio, headline, extended_bio)
      VALUES ('primary', 'Original bio', 'Original headline', 'Original extended bio');
    `);

    const adapter = memory.adapters.createPg();
    const pool = new adapter.Pool();
    vi.doMock("@/lib/db", () => ({
      query: (text: string, params?: unknown[]) => pool.query(text, params),
    }));

    const aboutRepo = await import("./about-repository");
    const graphicsRepo = await import("./graphics-repository");
    const collaborationRepo = await import("./collaborations-repository");
    const experienceRepo = await import("./experience-repository");

    const about = aboutUpdateSchema.parse({ headline: "Validated headline" });
    expect((await aboutRepo.updateAbout(about))?.headline).toBe("Validated headline");
    expect(aboutUpdateSchema.safeParse({ headline: "Bad", owner: "attacker" }).success).toBe(false);

    const graphic = await graphicsRepo.createGraphics(
      graphicsCreateSchema.parse({
        title: "Fixture graphic",
        category: "Branding",
        imageUrl: "/fixture.png",
        year: "2026",
      }),
    );
    expect(graphic.title).toBe("Fixture graphic");
    expect(graphicsCreateSchema.safeParse({ title: "Bad", category: "Branding", imageUrl: "/bad.png", year: "2026", owner: true }).success).toBe(false);

    const collaboration = await collaborationRepo.createCollaboration(
      collaborationCreateSchema.parse({
        partnerName: "Fixture partner",
        projectName: "Fixture project",
        description: "Fixture description",
        role: "Engineer",
        year: "2026",
      }),
    );
    expect(collaboration.projectName).toBe("Fixture project");
    expect(collaborationCreateSchema.safeParse({ partnerName: "Bad", projectName: "Bad", description: "Bad", role: "Bad", year: "2026", owner: true }).success).toBe(false);

    const experience = await experienceRepo.createExperience(
      experienceCreateSchema.parse({
        company: "Fixture company",
        role: "Engineer",
        description: "Fixture description",
        startDate: "Jan 2026",
        isCurrent: true,
      }),
    );
    expect(experience.company).toBe("Fixture company");
    expect(experienceCreateSchema.safeParse({ company: "Bad", role: "Bad", description: "Bad", startDate: "2026", owner: true }).success).toBe(false);

    await graphicsRepo.deleteGraphics(graphic.id);
    await collaborationRepo.deleteCollaboration(collaboration.id);
    await experienceRepo.deleteExperience(experience.id);
    await aboutRepo.updateAbout({ headline: "Original headline" });

    expect((await graphicsRepo.listGraphics()).length).toBe(0);
    expect((await collaborationRepo.listCollaborations()).length).toBe(0);
    expect((await experienceRepo.listExperience()).length).toBe(0);
    expect((await aboutRepo.getAbout())?.headline).toBe("Original headline");

    await pool.end();
  });
});
