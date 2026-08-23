import "server-only";

interface Bucket {
  count: number;
  windowStart: number;
  lockedUntil: number;
}

// In-memory sliding-window limiter. Sufficient for a solo-admin login route
// on a single instance — resets on cold start, which only ever loosens the
// limit, never bypasses it in a way that matters here.
const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket) {
    buckets.set(key, { count: 1, windowStart: now, lockedUntil: 0 });
    return { allowed: true };
  }

  if (bucket.lockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.lockedUntil - now) / 1000),
    };
  }

  if (now - bucket.windowStart > WINDOW_MS) {
    bucket.count = 1;
    bucket.windowStart = now;
    bucket.lockedUntil = 0;
    return { allowed: true };
  }

  bucket.count += 1;
  if (bucket.count > MAX_ATTEMPTS) {
    bucket.lockedUntil = now + LOCKOUT_MS;
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(LOCKOUT_MS / 1000),
    };
  }

  return { allowed: true };
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
