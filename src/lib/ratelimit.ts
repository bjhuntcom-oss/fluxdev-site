import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Check if Upstash credentials are available
const hasUpstashCredentials = 
  process.env.UPSTASH_REDIS_REST_URL && 
  process.env.UPSTASH_REDIS_REST_TOKEN;

// Create Redis client only if credentials exist
const redis = hasUpstashCredentials 
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

// Rate limiters for different actions
export const rateLimiters = {
  // Login: 5 attempts per 15 minutes
  login: hasUpstashCredentials && redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "15 m"),
        analytics: true,
        prefix: "ratelimit:login",
      })
    : null,

  // Register: 3 attempts per hour
  register: hasUpstashCredentials && redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, "1 h"),
        analytics: true,
        prefix: "ratelimit:register",
      })
    : null,

  // Messages: 30 per minute
  message: hasUpstashCredentials && redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30, "1 m"),
        analytics: true,
        prefix: "ratelimit:message",
      })
    : null,

  // Uploads: 10 per minute
  upload: hasUpstashCredentials && redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, "1 m"),
        analytics: true,
        prefix: "ratelimit:upload",
      })
    : null,

  // API: 100 per minute
  api: hasUpstashCredentials && redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(100, "1 m"),
        analytics: true,
        prefix: "ratelimit:api",
      })
    : null,
};

// Type for rate limit actions
export type RateLimitAction = keyof typeof rateLimiters;

// Check rate limit - returns { success, limit, remaining, reset }
export async function checkRateLimitUpstash(
  identifier: string,
  action: RateLimitAction
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const limiter = rateLimiters[action];
  
  // If no Upstash credentials, fall back to allowing (with warning in dev)
  if (!limiter) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[RateLimit] No Upstash credentials - rate limiting disabled for ${action}`);
    }
    return { success: true, limit: 0, remaining: 0, reset: 0 };
  }

  const result = await limiter.limit(identifier);
  
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}

// Helper to get client IP from request
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return "unknown";
}
