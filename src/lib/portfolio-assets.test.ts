import { describe, expect, it } from "vitest";
import { resolveBespokeProjectImage } from "./portfolio-assets";

const BASE_URL = "https://www.bespoketech.com.ng";

describe("Bespoke portfolio image resolution", () => {
  it("uses Bespoke's public image endpoint for R2-backed records", () => {
    expect(
      resolveBespokeProjectImage({
        id: "AI workspace",
        imageUrl: "",
        imageKey: "portfolio/ai-workspace.webp",
        baseUrl: BASE_URL,
      }),
    ).toBe("https://www.bespoketech.com.ng/api/portfolio-projects/AI%20workspace/image");
  });

  it("resolves legacy relative paths against Bespoke", () => {
    expect(
      resolveBespokeProjectImage({
        id: "savemi",
        imageUrl: "/projects/savemi.jpg",
        imageKey: null,
        baseUrl: BASE_URL,
      }),
    ).toBe("https://www.bespoketech.com.ng/projects/savemi.jpg");
  });

  it("preserves absolute HTTPS image URLs", () => {
    expect(
      resolveBespokeProjectImage({
        id: "external",
        imageUrl: "https://cdn.example.com/project.webp",
        imageKey: null,
        baseUrl: BASE_URL,
      }),
    ).toBe("https://cdn.example.com/project.webp");
  });

  it("falls back to the canonical Bespoke origin when configured base is invalid", () => {
    expect(
      resolveBespokeProjectImage({
        id: "savemi",
        imageUrl: "/projects/savemi.jpg",
        imageKey: null,
        baseUrl: "not-a-url",
      }),
    ).toBe("https://www.bespoketech.com.ng/projects/savemi.jpg");
  });
});
