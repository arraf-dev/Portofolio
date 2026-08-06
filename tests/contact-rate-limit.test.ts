import { beforeEach, describe, expect, it } from "vitest";
import {
  clearContactRateLimits,
  consumeContactRateLimit,
} from "@/lib/contact-rate-limit";

describe("contact rate limit", () => {
  beforeEach(() => clearContactRateLimits());

  it("membatasi request keenam dalam satu jendela waktu", () => {
    const now = 1_000_000;

    for (let index = 0; index < 5; index += 1) {
      expect(consumeContactRateLimit("visitor", now).allowed).toBe(true);
    }

    const blocked = consumeContactRateLimit("visitor", now);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("membuka batas setelah jendela waktu berakhir", () => {
    const first = consumeContactRateLimit("visitor", 1_000_000);
    const later = consumeContactRateLimit("visitor", 1_700_001);

    expect(first.allowed).toBe(true);
    expect(later.allowed).toBe(true);
  });
});
