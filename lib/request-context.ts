import 'server-only';

import { headers } from 'next/headers';

/**
 * The client IP, used only as a rate-limit key. It is never stored on the lead
 * record and never logged.
 */
export async function clientIdentifier(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get('x-forwarded-for');
  const realIp = headerList.get('x-real-ip');
  const ip = forwarded?.split(',')[0]?.trim() || realIp || 'unknown';
  return ip;
}
