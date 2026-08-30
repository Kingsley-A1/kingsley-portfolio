import { createHmac, timingSafeEqual } from "node:crypto";

const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000;
const SIGNATURE_PATTERN = /^[a-f0-9]{64}$/;

interface VerificationInput {
  body: string;
  timestamp: string | null;
  signature: string | null;
  secret: string | undefined;
  now?: number;
}

export function verifyPortfolioRevalidation({
  body,
  timestamp,
  signature,
  secret,
  now = Date.now(),
}: VerificationInput): boolean {
  if (
    !secret ||
    secret.length < 32 ||
    !timestamp ||
    !signature ||
    !SIGNATURE_PATTERN.test(signature)
  ) {
    return false;
  }
  const requestTime = Number(timestamp);
  if (!Number.isSafeInteger(requestTime)) return false;
  if (Math.abs(now - requestTime) > MAX_CLOCK_SKEW_MS) return false;

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest();
  const supplied = Buffer.from(signature, "hex");
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}
