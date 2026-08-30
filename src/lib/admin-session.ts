import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const MINIMUM_SECRET_LENGTH = 32;

interface SessionPayload {
  exp: number;
  nonce: string;
}

function requireSecret(secret: string): void {
  if (secret.length < MINIMUM_SECRET_LENGTH) {
    throw new Error("SESSION_SECRET must contain at least 32 characters.");
  }
}

function signature(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export async function createSessionToken(
  secret: string,
  expiresAt: number,
): Promise<string> {
  requireSecret(secret);
  const payload = Buffer.from(
    JSON.stringify({ exp: expiresAt, nonce: randomBytes(16).toString("base64url") }),
  ).toString("base64url");
  return `${payload}.${signature(payload, secret)}`;
}

export async function verifySessionToken(
  token: string,
  secret: string,
  now = Date.now(),
): Promise<boolean> {
  if (secret.length < MINIMUM_SECRET_LENGTH) return false;
  const [payload, suppliedSignature, extra] = token.split(".");
  if (!payload || !suppliedSignature || extra) return false;

  const expectedSignature = signature(payload, secret);
  const supplied = Buffer.from(suppliedSignature);
  const expected = Buffer.from(expectedSignature);
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return false;
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as Partial<SessionPayload>;
    return (
      typeof decoded.exp === "number" &&
      Number.isFinite(decoded.exp) &&
      decoded.exp > now &&
      typeof decoded.nonce === "string" &&
      decoded.nonce.length > 0
    );
  } catch {
    return false;
  }
}

export function verifySecretValue(
  supplied: string,
  expected: string | undefined,
): boolean {
  if (!supplied || !expected) return false;
  const suppliedDigest = createHash("sha256").update(supplied).digest();
  const expectedDigest = createHash("sha256").update(expected).digest();
  return timingSafeEqual(suppliedDigest, expectedDigest);
}
