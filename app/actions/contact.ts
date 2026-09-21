'use server';

import { contactContent } from '@/content/pages/contact';
import { sendContactConfirmation, sendInternalNotification } from '@/lib/email';
import { leadDestinationConfigured } from '@/lib/lead-destination';
import { leadStoreConfigured, storeLead } from '@/lib/lead-store';
import { checkRateLimit } from '@/lib/rate-limit';
import { clientIdentifier } from '@/lib/request-context';
import { siteSettings } from '@/lib/site-settings';
import { verifyTurnstile } from '@/lib/turnstile';
import { contactSchema, fieldErrors } from '@/lib/validation/schemas';

import type { FormState } from './types';

/** A form completed in under three seconds was almost certainly not typed. */
const MINIMUM_FILL_MS = 3000;

function serverErrorMessage(): string {
  const email = siteSettings.contactEmail;
  return email
    ? `We could not send your inquiry. Your message has not been lost from the form. Please try again or email us at ${email}.`
    : 'We could not send your inquiry. Your message has not been lost from the form. Please try again.';
}

function successMessage(): string {
  const { responseTime } = siteSettings;
  return responseTime
    ? `Your inquiry has been sent. We will reply within ${responseTime}.`
    : 'Your inquiry has been sent. We will reply with the most useful next step.';
}

export async function submitContactForm(
  previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const attempt = previous.attempt + 1;

  if (!leadDestinationConfigured) {
    // Nothing would receive the message, so it is never accepted.
    return { status: 'error', message: serverErrorMessage(), attempt };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: 'error',
      message: contactContent.form.validationSummaryHeading,
      fieldErrors: fieldErrors(parsed.error),
      attempt,
    };
  }

  const input = parsed.data;

  // Honeypot and timing. Both are answered with the generic spam message so a
  // bot learns nothing about which control caught it.
  const tooFast = input.startedAt !== undefined && Date.now() - input.startedAt < MINIMUM_FILL_MS;
  if (input.website.length > 0 || tooFast) {
    return { status: 'error', message: contactContent.form.spamError, attempt };
  }

  const identifier = await clientIdentifier();
  const rateLimit = await checkRateLimit(`contact:${identifier}`);
  if (!rateLimit.allowed) {
    return { status: 'error', message: contactContent.form.rateLimitError, attempt };
  }

  const turnstile = await verifyTurnstile(input.turnstileToken, identifier);
  if (!turnstile.ok) {
    return { status: 'error', message: contactContent.form.spamError, attempt };
  }

  const now = new Date().toISOString();
  const firstName = input.name.split(' ')[0] ?? input.name;

  let stored = false;
  if (leadStoreConfigured) {
    const result = await storeLead({
      lead_type: 'contact',
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      company: input.company,
      role: null,
      website_url: null,
      service_interests: [input.service],
      goal_or_challenge: input.message,
      budget_band: null,
      desired_start: null,
      target_date: null,
      referral_source: null,
      landing_page: null,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      consent_at: now,
      marketing_consent: false,
      marketing_consent_at: null,
      internal_status: 'new',
    });

    // Storage is configured, so a failure here means the lead would be lost.
    if (!result.ok) {
      return { status: 'error', message: serverErrorMessage(), attempt };
    }
    stored = true;
  }

  const notified = await sendInternalNotification({
    formType: 'Contact inquiry',
    company: input.company,
    primaryService: input.service,
    replyTo: input.email,
    idempotencyKey: `contact:${input.email}:${input.message.slice(0, 64)}`,
    summary: [
      ['Name', input.name],
      ['Company', input.company],
      ['Email', input.email],
      ['Phone', input.phone],
      ['Service', input.service],
      ['Goal', input.message],
    ],
  });

  // Without the lead store, the notification email is the only destination.
  if (!stored && !notified) {
    return { status: 'error', message: serverErrorMessage(), attempt };
  }

  // The visitor confirmation is best effort: the lead is already safe, so a mail
  // failure must not tell the visitor their inquiry was lost.
  await sendContactConfirmation({
    firstName,
    email: input.email,
    service: input.service,
  });

  return { status: 'success', message: successMessage(), attempt };
}
