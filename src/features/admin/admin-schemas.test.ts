import { describe, expect, it } from "vitest";
import {
  aboutUpdateSchema,
  collaborationCreateSchema,
  collaborationUpdateSchema,
  experienceCreateSchema,
  graphicsCreateSchema,
  graphicsUpdateSchema,
} from "./admin-schemas";

describe("admin write schemas", () => {
  it("accepts and trims a bounded about payload", () => {
    const result = aboutUpdateSchema.parse({
      headline: "  Building useful systems  ",
      bio: "Short bio",
      extendedBio: "Longer bio",
      interests: ["Engineering"],
      socialLinks: { github: "https://github.com/kingsley-a1" },
      photoUrl: "/profile.jpg",
    });

    expect(result.headline).toBe("Building useful systems");
  });

  it.each([
    [graphicsCreateSchema, { title: "A", category: "Branding", imageUrl: "/a.png", year: "2026", injectedColumn: true }],
    [collaborationCreateSchema, { partnerName: "A", projectName: "B", description: "C", role: "D", year: "2026", createdAt: "now" }],
    [experienceCreateSchema, { company: "A", role: "B", description: "C", startDate: "2025", owner: "attacker" }],
  ])("rejects unknown write keys", (schema, payload) => {
    expect(schema.safeParse(payload).success).toBe(false);
  });

  it("requires real values for graphic creation", () => {
    expect(
      graphicsCreateSchema.safeParse({
        title: "",
        category: "Branding",
        imageUrl: "javascript:alert(1)",
        year: "26",
      }).success,
    ).toBe(false);
  });

  it("requires at least one allowed update field", () => {
    expect(graphicsUpdateSchema.safeParse({}).success).toBe(false);
    expect(collaborationUpdateSchema.safeParse({}).success).toBe(false);
  });

  it("normalizes the end date of a current role", () => {
    const result = experienceCreateSchema.parse({
      company: "Bespoke Technologies",
      role: "Engineer",
      description: "Builds products",
      startDate: "Jan 2025",
      endDate: "Aug 2026",
      isCurrent: true,
    });

    expect(result.endDate).toBeNull();
  });
});
