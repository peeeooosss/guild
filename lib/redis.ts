import { Redis } from '@upstash/redis';

const hasRedisVars = !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis = hasRedisVars
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

export async function incrementAndCheckLimit(
  userId: string,
  agentType: string,
  maxLimit = 30,
): Promise<{ count: number; limited: boolean }> {
  if (!redis) {
    return { count: 0, limited: false };
  }

  const today = new Date().toISOString().slice(0, 10);
  const redisKey = `rate_limit:${userId}:all:${today}`;

  const count = await redis.incr(redisKey);
  if (count === 1) {
    await redis.expire(redisKey, 86400);
  }

  return { count, limited: count > maxLimit };
}
