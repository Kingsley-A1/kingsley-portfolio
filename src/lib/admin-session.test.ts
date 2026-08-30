import { describe, expect, it } from "vitest";
import {
  createSessionToken,
  verifySecretValue,
  verifySessionToken,
} from "./admin-session";

const SECRET = "test-session-secret-with-at-least-32-characters";
const OTHER_SECRET = "other-session-secret-with-at-least-32-characters";
const NOW = Date.UTC(2026, 7, 30, 12, 0, 0);

describe("admin session tokens", () => {
  it("accepts an unexpired token signed with the configured secret", async () => {
    const token = await createSessionToken(SECRET, NOW + 60_000);

    await expect(verifySessionToken(token, SECRET, NOW)).resolves.toBe(true);
  });

  it("rejects a token whose signature was changed", async () => {
    const token = await createSessionToken(SECRET, NOW + 60_000);
    const finalCharacter = token.at(-1) === "a" ? "b" : "a";
    const forged = `${token.slice(0, -1)}${finalCharacter}`;

    await expect(verifySessionToken(forged, SECRET, NOW)).resolves.toBe(false);
  });

  it("rejects malformed tokens", async () => {
    await expect(verifySessionToken("not-a-session", SECRET, NOW)).resolves.toBe(false);
  });

  it("rejects expired tokens", async () => {
    const token = await createSessionToken(SECRET, NOW - 1);

    await expect(verifySessionToken(token, SECRET, NOW)).resolves.toBe(false);
  });

  it("rejects tokens signed with another secret", async () => {
    const token = await createSessionToken(SECRET, NOW + 60_000);

    await expect(verifySessionToken(token, OTHER_SECRET, NOW)).resolves.toBe(false);
  });

  it("fails closed for short secrets", async () => {
    await expect(createSessionToken("too-short", NOW + 60_000)).rejects.toThrow(
      "SESSION_SECRET must contain at least 32 characters.",
    );
    await expect(verifySessionToken("anything", "too-short", NOW)).resolves.toBe(false);
  });
});

describe("secret comparison", () => {
  it("accepts equal non-empty values", () => {
    expect(verifySecretValue("correct horse", "correct horse")).toBe(true);
  });

  it("rejects different or missing values", () => {
    expect(verifySecretValue("wrong", "correct horse")).toBe(false);
    expect(verifySecretValue("", "correct horse")).toBe(false);
    expect(verifySecretValue("correct horse", undefined)).toBe(false);
  });
});
