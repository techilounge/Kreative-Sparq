import 'server-only';

/**
 * Rate limiting is only claimed when a durable provider is configured.
 *
 * Vercel runs each request on one of many instances, so an in-memory counter
 * cannot limit anything reliably. It is still kept as a best-effort guard
 * against a burst hitting the same instance, but it is reported honestly: when
 * no provider is configured, `durable` is false and the honeypot, timing check,
 * and Turnstile carry the real load.
 */
export type RateLimitResult = {
  readonly allowed: boolean;
  readonly durable: boolean;
};

const WINDOW_SECONDS = 600;
const MAX_REQUESTS = 5;

const providerUrl = process.env.RATE_LIMIT_PROVIDER_URL;
const providerToken = process.env.RATE_LIMIT_PROVIDER_TOKEN;

export const rateLimiterIsDurable = Boolean(providerUrl && providerToken);

const localCounters = new Map<string, { count: number; resetAt: number }>();

function checkLocal(key: string): boolean {
  const now = Date.now();
  const entry = localCounters.get(key);

  if (!entry || entry.resetAt < now) {
    localCounters.set(key, { count: 1, resetAt: now + WINDOW_SECONDS * 1000 });
    return true;
  }

  entry.count += 1;
  return entry.count <= MAX_REQUESTS;
}

/**
 * Durable path speaks the Upstash Redis REST protocol: `INCR` then `EXPIRE` on
 * first use. Any other REST-compatible provider can be pointed at the same two
 * variables, which is why the names are provider neutral.
 */
async function checkDurable(key: string): Promise<boolean> {
  try {
    const response = await fetch(`${providerUrl}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${providerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, String(WINDOW_SECONDS), 'NX'],
      ]),
      cache: 'no-store',
    });

    if (!response.ok) {
      // A limiter outage must not take the form down with it.
      console.warn('Rate limit provider returned', response.status);
      return checkLocal(key);
    }

    const payload = (await response.json()) as { result?: number }[];
    const count = payload[0]?.result ?? 0;
    return count <= MAX_REQUESTS;
  } catch {
    console.warn('Rate limit provider unreachable, falling back to the local counter');
    return checkLocal(key);
  }
}

export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  const key = `kreative-sparq:rate-limit:${identifier}`;

  if (rateLimiterIsDurable) {
    return { allowed: await checkDurable(key), durable: true };
  }

  return { allowed: checkLocal(key), durable: false };
}
