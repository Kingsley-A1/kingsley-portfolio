import { describe, expect, it } from "vitest";
import { verifyPortfolioRevalidation } from "./portfolio-revalidation";

const SECRET = "portfolio-sync-secret-with-at-least-32-characters";
const BODY =
  '{"event":"portfolio.updated","projectId":"savemi","occurredAt":"2026-08-30T12:00:00.000Z"}';
const TIMESTAMP = "1788091200000";
const NOW = 1_788_091_200_000;
const SIGNATURE =
  "dca2a8ac7069ee2e94b1c82ccd519ac21f8a171bd95455739863374486779f9b";

describe("portfolio revalidation signatures", () => {
  it("accepts a current request signed by Bespoke", () => {
    expect(
      verifyPortfolioRevalidation({
        body: BODY,
        timestamp: TIMESTAMP,
        signature: SIGNATURE,
        secret: SECRET,
        now: NOW,
      }),
    ).toBe(true);
  });

  it("rejects a forged signature", () => {
    expect(
      verifyPortfolioRevalidation({
        body: BODY,
        timestamp: TIMESTAMP,
        signature: `a${SIGNATURE.slice(1)}`,
        secret: SECRET,
        now: NOW,
      }),
    ).toBe(false);
  });

  it("rejects requests older than five minutes", () => {
    expect(
      verifyPortfolioRevalidation({
        body: BODY,
        timestamp: TIMESTAMP,
        signature: SIGNATURE,
        secret: SECRET,
        now: NOW + 300_001,
      }),
    ).toBe(false);
  });

  it("rejects malformed timestamps and signatures", () => {
    expect(
      verifyPortfolioRevalidation({
        body: BODY,
        timestamp: "not-a-time",
        signature: "not-a-signature",
        secret: SECRET,
        now: NOW,
      }),
    ).toBe(false);
  });

  it("rejects a missing or wrong secret", () => {
    expect(
      verifyPortfolioRevalidation({
        body: BODY,
        timestamp: TIMESTAMP,
        signature: SIGNATURE,
        secret: "",
        now: NOW,
      }),
    ).toBe(false);
    expect(
      verifyPortfolioRevalidation({
        body: BODY,
        timestamp: TIMESTAMP,
        signature: SIGNATURE,
        secret: "wrong-secret-with-at-least-32-characters",
        now: NOW,
      }),
    ).toBe(false);
  });
});
