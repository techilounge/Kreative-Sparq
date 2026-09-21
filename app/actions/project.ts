'use server';

import { redirect } from 'next/navigation';

import { contactContent } from '@/content/pages/contact';
import { startProjectContent } from '@/content/pages/start-a-project';
import { sendInternalNotification, sendProjectConfirmation } from '@/lib/email';
import { leadDestinationConfigured } from '@/lib/lead-destination';
import { leadStoreConfigured, storeLead } from '@/lib/lead-store';
import { checkRateLimit } from '@/lib/rate-limit';
import { clientIdentifier } from '@/lib/request-context';
import { siteSettings } from '@/lib/site-settings';
import { verifyTurnstile } from '@/lib/turnstile';
import { fieldErrors, projectBriefSchema } from '@/lib/validation/schemas';

import type { FormState } from './types';

const MINIMUM_FILL_MS = 3000;

function serverErrorMessage(): string {
  const email = siteSettings.contactEmail;
  return email
    ? `We could not send the brief. Your answers are still here. Check your connection and try again, or email us at ${email}.`
    : startProjectContent.navigation.networkError;
}

export async function submitProjectBrief(
  previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const attempt = previous.attempt + 1;

  if (!leadDestinationConfigured) {
    return { status: 'error', message: serverErrorMessage(), attempt };
  }

  const raw: Record<string, unknown> = Object.fromEntries(formData.entries());
  // Checkbox groups arrive as repeated entries.
  raw['serviceInterests'] = formData.getAll('serviceInterests');

  const parsed = projectBriefSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: 'error',
      message: startProjectContent.navigation.validationSummaryHeading,
      fieldErrors: fieldErrors(parsed.error),
      attempt,
    };
  }

  const input = parsed.data;

  const tooFast = input.startedAt !== undefined && Date.now() - input.startedAt < MINIMUM_FILL_MS;
  if (input.website.length > 0 || tooFast) {
    return { status: 'error', message: contactContent.form.spamError, attempt };
  }

  const identifier = await clientIdentifier();
  const rateLimit = await checkRateLimit(`project:${identifier}`);
  if (!rateLimit.allowed) {
    return { status: 'error', message: contactContent.form.rateLimitError, attempt };
  }

  const turnstile = await verifyTurnstile(input.turnstileToken, identifier);
  if (!turnstile.ok) {
    return { status: 'error', message: contactContent.form.spamError, attempt };
  }

  const now = new Date().toISOString();
  const firstName = input.name.split(' ')[0] ?? input.name;
  const marketingConsent = input.marketingConsent === 'on';

  let reference: string | null = null;
  let stored = false;

  if (leadStoreConfigured) {
    const result = await storeLead({
      lead_type: 'project',
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      company: input.company,
      role: input.role || null,
      website_url: input.websiteUrl || null,
      service_interests: [...input.serviceInterests],
      goal_or_challenge: input.goal,
      budget_band: input.budgetBand || null,
      desired_start: input.desiredStart,
      target_date: input.targetDate || null,
      referral_source: input.referrer || null,
      landing_page: input.landingPage || null,
      utm_source: input.utmSource || null,
      utm_medium: input.utmMedium || null,
      utm_campaign: input.utmCampaign || null,
      utm_term: input.utmTerm || null,
      utm_content: input.utmContent || null,
      consent_at: now,
      marketing_consent: marketingConsent,
      marketing_consent_at: marketingConsent ? now : null,
      internal_status: 'new',
    });

    if (!result.ok) {
      return { status: 'error', message: serverErrorMessage(), attempt };
    }
    stored = true;
    reference = result.reference;
  }

  const notified = await sendInternalNotification({
    formType: 'Project brief',
    company: input.company,
    primaryService: input.serviceInterests[0] ?? 'Not sure yet',
    replyTo: input.email,
    idempotencyKey: `project:${input.email}:${input.goal.slice(0, 64)}`,
    summary: [
      ['Name', input.name],
      ['Company', input.company],
      ['Email', input.email],
      ['Phone', input.phone],
      ['Role', input.role],
      ['Website', input.websiteUrl],
      ['Services', input.serviceInterests.join(', ')],
      ['Goal', input.goal],
      ['Desired start', input.desiredStart],
      ['Target date', input.targetDate],
      ['Budget band', input.budgetBand],
      ['Decision makers', input.decisionMakers],
      ['Landing page', input.landingPage],
      ['Referrer', input.referrer],
      ['UTM source', input.utmSource],
      ['UTM medium', input.utmMedium],
      ['UTM campaign', input.utmCampaign],
      ['UTM term', input.utmTerm],
      ['UTM content', input.utmContent],
      ['Reference', reference ?? ''],
    ],
  });

  if (!stored && !notified) {
    return { status: 'error', message: serverErrorMessage(), attempt };
  }

  await sendProjectConfirmation({ firstName, email: input.email, reference });

  redirect(startProjectContent.successRedirect);
}
