type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const entries = new Map<string, RateLimitEntry>();

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export function consumeContactRateLimit(
  key: string,
  now = Date.now(),
): RateLimitResult {
  if (entries.size > 1000) {
    for (const [entryKey, entry] of entries) {
      if (entry.resetAt <= now) entries.delete(entryKey);
    }
  }

  const current = entries.get(key);

  if (!current || current.resetAt <= now) {
    entries.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function clearContactRateLimits() {
  entries.clear();
}
