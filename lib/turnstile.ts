import 'server-only';

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export const turnstileEnabled = Boolean(
  process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
);

export type TurnstileOutcome =
  | { readonly ok: true }
  | { readonly ok: false; readonly reason: 'missing' | 'expired' | 'duplicate' | 'failed' };

/**
 * Every token is verified here, on the server. A client-side success callback is
 * not validation: it proves nothing about the request that actually arrived.
 *
 * Tokens are short-lived and single-use, so timeout and reuse are reported
 * separately from a plain failure and the widget can be reset for a retry.
 */
export async function verifyTurnstile(token: string, remoteIp?: string): Promise<TurnstileOutcome> {
  if (!turnstileEnabled) return { ok: true };
  if (!token) return { ok: false, reason: 'missing' };

  const body = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY ?? '',
    response: token,
  });
  if (remoteIp) body.set('remoteip', remoteIp);

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      body,
      cache: 'no-store',
    });

    const result = (await response.json()) as {
      success: boolean;
      'error-codes'?: string[];
    };

    if (result.success) return { ok: true };

    const codes = result['error-codes'] ?? [];
    if (codes.includes('timeout-or-duplicate')) {
      return { ok: false, reason: 'duplicate' };
    }
    if (codes.includes('invalid-input-response')) {
      return { ok: false, reason: 'expired' };
    }
    return { ok: false, reason: 'failed' };
  } catch {
    console.warn('Turnstile siteverify was unreachable');
    return { ok: false, reason: 'failed' };
  }
}
