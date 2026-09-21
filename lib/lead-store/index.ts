import 'server-only';

/**
 * Lead storage through Supabase Postgres.
 *
 * The request is made server side with the secret key, which never reaches the
 * browser. `supabase/migrations` creates the table with row-level security that
 * denies every anonymous read and write, so a browser cannot reach lead records
 * even if a key leaked.
 */
export type LeadType = 'contact' | 'project';

export type LeadRecord = {
  readonly lead_type: LeadType;
  readonly name: string;
  readonly email: string;
  readonly phone: string | null;
  readonly company: string | null;
  readonly role: string | null;
  readonly website_url: string | null;
  readonly service_interests: string[];
  readonly goal_or_challenge: string;
  readonly budget_band: string | null;
  readonly desired_start: string | null;
  readonly target_date: string | null;
  readonly referral_source: string | null;
  readonly landing_page: string | null;
  readonly utm_source: string | null;
  readonly utm_medium: string | null;
  readonly utm_campaign: string | null;
  readonly utm_term: string | null;
  readonly utm_content: string | null;
  readonly consent_at: string;
  readonly marketing_consent: boolean;
  readonly marketing_consent_at: string | null;
  readonly internal_status: 'new';
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

export const leadStoreConfigured = Boolean(supabaseUrl && supabaseSecretKey);

export type StoreResult =
  { readonly ok: true; readonly reference: string } | { readonly ok: false };

/**
 * A short public reference the visitor can quote. It is random, so it reveals
 * nothing about how many leads exist and is not a database identifier.
 */
function publicReference(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return `KS-${Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('')}`;
}

export async function storeLead(record: LeadRecord): Promise<StoreResult> {
  if (!leadStoreConfigured) return { ok: false };

  const reference = publicReference();

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: supabaseSecretKey ?? '',
        Authorization: `Bearer ${supabaseSecretKey ?? ''}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ ...record, public_reference: reference }),
      cache: 'no-store',
    });

    if (!response.ok) {
      // The body may echo submitted values, so only the status is logged.
      console.error('Lead store rejected the insert', { status: response.status });
      return { ok: false };
    }

    return { ok: true, reference };
  } catch {
    console.error('Lead store was unreachable');
    return { ok: false };
  }
}
