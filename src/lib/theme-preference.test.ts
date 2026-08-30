import { describe, expect, it } from "vitest";
import { normalizeTheme, THEME_BOOTSTRAP_SCRIPT } from "./theme-preference";

describe("normalizeTheme", () => {
  it.each([null, "", "system", "sepia", "DARK"])(
    "defaults %s to light",
    (value) => {
      expect(normalizeTheme(value)).toBe("light");
    },
  );

  it("preserves an explicit dark preference", () => {
    expect(normalizeTheme("dark")).toBe("dark");
  });

  it("preserves an explicit light preference", () => {
    expect(normalizeTheme("light")).toBe("light");
  });
});

describe("THEME_BOOTSTRAP_SCRIPT", () => {
  it("does not consult operating-system colour preference", () => {
    expect(THEME_BOOTSTRAP_SCRIPT).not.toContain("matchMedia");
    expect(THEME_BOOTSTRAP_SCRIPT).toContain("theme === 'dark'");
  });
});
