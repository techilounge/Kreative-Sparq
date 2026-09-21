/**
 * Runtime site settings.
 *
 * Every value here corresponds to a `{{PLACEHOLDER}}` in the approved copy deck.
 * A placeholder that has not been configured resolves to `null`, and the
 * components that would have shown it hide instead. Raw placeholder text is
 * never rendered.
 */

function readString(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : null;
}

function readList(value: string | undefined): string[] {
  const raw = readString(value);
  if (!raw) return [];
  return raw
    .split('|')
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

const rawSiteUrl = readString(process.env.NEXT_PUBLIC_SITE_URL) ?? 'https://kreativesparq.com';

export const siteUrl = rawSiteUrl.replace(/\/$/, '');

export const siteSettings = {
  /** Canonical origin. Always present so metadata and sitemap output stay valid. */
  siteUrl,

  /** Monitored inbox. Hidden everywhere until configured. */
  contactEmail: readString(process.env.NEXT_PUBLIC_CONTACT_EMAIL),

  /** Monitored phone or WhatsApp number. Hidden everywhere until configured. */
  contactPhone: readString(process.env.NEXT_PUBLIC_CONTACT_PHONE),

  /** WhatsApp deep link, only when the number is actively monitored on WhatsApp. */
  whatsappUrl: readString(process.env.NEXT_PUBLIC_WHATSAPP_URL),

  /**
   * Verified reply window, for example "one business day". Sentences that quote
   * it fall back to a version without the promise when it is not configured.
   */
  responseTime: readString(process.env.NEXT_PUBLIC_RESPONSE_TIME),

  /** Verified business hours, for example "09:00 to 17:00 WAT, Monday to Friday". */
  businessHours: readString(process.env.NEXT_PUBLIC_BUSINESS_HOURS),

  /**
   * Approved budget bands, pipe separated. "Not decided yet" is always appended
   * by the form, so it must not be listed here.
   */
  budgetBands: readList(process.env.NEXT_PUBLIC_BUDGET_BANDS),

  /** Approved public social profiles, used for navigation and `sameAs`. */
  socialProfiles: readList(process.env.NEXT_PUBLIC_SOCIAL_PROFILES),

  /** Cal.com link in `user/event` form. The booking embed is hidden without it. */
  calLink: readString(process.env.NEXT_PUBLIC_CAL_LINK),

  /** Cloudflare Turnstile site key. The widget is omitted when absent. */
  turnstileSiteKey: readString(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),

  /** Legal entity details. Legal routes stay unpublished until these resolve. */
  legalBusinessName: readString(process.env.NEXT_PUBLIC_LEGAL_BUSINESS_NAME),
  legalAddress: readString(process.env.NEXT_PUBLIC_LEGAL_ADDRESS),
  privacyEmail: readString(process.env.NEXT_PUBLIC_PRIVACY_EMAIL),
  legalContactEmail: readString(process.env.NEXT_PUBLIC_LEGAL_CONTACT_EMAIL),
  privacyLastUpdated: readString(process.env.NEXT_PUBLIC_PRIVACY_LAST_UPDATED),
  termsLastUpdated: readString(process.env.NEXT_PUBLIC_TERMS_LAST_UPDATED),

  /** Newsletter subscription endpoint. The signup block is hidden without it. */
  newsletterEndpoint: readString(process.env.NEWSLETTER_ENDPOINT),
} as const;

/**
 * Counsel-supplied clauses. Each corresponds to a `[CONTENT REQUIRED]` block in
 * the legal copy. A legal route stays unpublished until all of its clauses and
 * the legal entity details are present.
 */
export const legalClauses = {
  privacyLegalBasis: readString(process.env.LEGAL_PRIVACY_BASIS),
  privacyProviders: readString(process.env.LEGAL_PRIVACY_PROVIDERS),
  privacyRetention: readString(process.env.LEGAL_PRIVACY_RETENTION),
  privacyCookies: readString(process.env.LEGAL_PRIVACY_COOKIES),
  termsLiability: readString(process.env.LEGAL_TERMS_LIABILITY),
  termsIndemnity: readString(process.env.LEGAL_TERMS_INDEMNITY),
  termsGoverningLaw: readString(process.env.LEGAL_TERMS_GOVERNING_LAW),
} as const;

const legalEntityResolved =
  siteSettings.legalBusinessName !== null &&
  siteSettings.legalAddress !== null &&
  siteSettings.privacyEmail !== null;

/**
 * A legal route may only be published once counsel has supplied every clause the
 * copy deck marks as required and the legal entity details are configured. The
 * env flag alone is not enough: a page with an unresolved clause stays
 * unpublished so no gap can reach a visitor.
 */
export const privacyPagePublished =
  legalEntityResolved &&
  legalClauses.privacyLegalBasis !== null &&
  legalClauses.privacyProviders !== null &&
  legalClauses.privacyRetention !== null &&
  legalClauses.privacyCookies !== null &&
  siteSettings.privacyLastUpdated !== null;

export const termsPagePublished =
  legalEntityResolved &&
  siteSettings.legalContactEmail !== null &&
  legalClauses.termsLiability !== null &&
  legalClauses.termsIndemnity !== null &&
  legalClauses.termsGoverningLaw !== null &&
  siteSettings.termsLastUpdated !== null;

/** True when at least one contact channel is monitored and can be shown. */
export const hasPublicContactChannel =
  siteSettings.contactEmail !== null || siteSettings.contactPhone !== null;

/**
 * The copy deck writes "We reply within {{VERIFIED_RESPONSE_TIME}}". Until that
 * value is verified, the sentence must not imply a promise the agency has not
 * made, so callers get a version without the window.
 */
export function replyWindowSentence(): string {
  const { responseTime, businessHours } = siteSettings;
  if (responseTime && businessHours) {
    return `We reply within ${responseTime} during ${businessHours}.`;
  }
  if (responseTime) {
    return `We reply within ${responseTime}.`;
  }
  return 'We review every inquiry and reply with the most useful next step.';
}

/** Inline fragment for sentences shaped like "... reply within X with ...". */
export function replyWindowFragment(): string {
  return siteSettings.responseTime ? `within ${siteSettings.responseTime}` : 'as soon as we can';
}
