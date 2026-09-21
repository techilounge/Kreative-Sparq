import 'server-only';

import { siteSettings } from '@/lib/site-settings';

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.CONTACT_FROM_EMAIL;
const toEmail = process.env.CONTACT_TO_EMAIL;

export const emailConfigured = Boolean(resendApiKey && fromEmail && toEmail);

/** Escapes user-controlled text before it is placed in an HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type SendInput = {
  readonly to: string;
  readonly subject: string;
  readonly html: string;
  readonly text: string;
  readonly replyTo?: string;
  /** Resend de-duplicates repeat sends carrying the same key. */
  readonly idempotencyKey?: string;
};

async function send({
  to,
  subject,
  html,
  text,
  replyTo,
  idempotencyKey,
}: SendInput): Promise<boolean> {
  if (!emailConfigured) return false;

  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    };
    if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject,
        html,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Transactional email was rejected', { status: response.status });
      return false;
    }

    return true;
  } catch {
    console.error('Transactional email provider was unreachable');
    return false;
  }
}

function signature(): string {
  const email = siteSettings.contactEmail;
  return ['Regards,', 'Kreative Sparq', email, 'kreativesparq.com']
    .filter((line): line is string => Boolean(line))
    .join('\n');
}

function replyWindowClause(): string {
  const { responseTime, businessHours } = siteSettings;
  if (responseTime && businessHours) {
    return `within ${responseTime} during ${businessHours}`;
  }
  if (responseTime) return `within ${responseTime}`;
  return 'as soon as we can';
}

export async function sendContactConfirmation(input: {
  readonly firstName: string;
  readonly email: string;
  readonly service: string;
}): Promise<boolean> {
  const name = escapeHtml(input.firstName);
  const service = escapeHtml(input.service);
  const clause = replyWindowClause();

  const text = `Hi ${input.firstName},

Thank you for contacting Kreative Sparq. We received your inquiry about ${input.service}.

We will review the details and reply ${clause}. If you need to add useful context, reply to this email. Please do not send passwords, financial details, or other sensitive information.

${signature()}`;

  return send({
    to: input.email,
    subject: 'We received your inquiry | Kreative Sparq',
    text,
    html: `<p>Hi ${name},</p>
<p>Thank you for contacting Kreative Sparq. We received your inquiry about ${service}.</p>
<p>We will review the details and reply ${clause}. If you need to add useful context, reply to this email. Please do not send passwords, financial details, or other sensitive information.</p>
<p>Regards,<br />Kreative Sparq<br />kreativesparq.com</p>`,
  });
}

export async function sendProjectConfirmation(input: {
  readonly firstName: string;
  readonly email: string;
  readonly reference: string | null;
}): Promise<boolean> {
  const name = escapeHtml(input.firstName);
  const clause = replyWindowClause();
  const referenceLine = input.reference ? `Your reference: ${input.reference}` : '';

  const text = `Hi ${input.firstName},

We received your project brief. Thank you for giving us the context behind the request.

Our team will review the business goal, services, timing, and available budget information. We will reply ${clause} with the most useful next step. This may be a short discovery call or a request for one or two missing details.

${referenceLine}

${signature()}`;

  return send({
    to: input.email,
    subject: 'Your project brief is with us | Kreative Sparq',
    text,
    html: `<p>Hi ${name},</p>
<p>We received your project brief. Thank you for giving us the context behind the request.</p>
<p>Our team will review the business goal, services, timing, and available budget information. We will reply ${clause} with the most useful next step. This may be a short discovery call or a request for one or two missing details.</p>
${input.reference ? `<p>Your reference: ${escapeHtml(input.reference)}</p>` : ''}
<p>Regards,<br />Kreative Sparq<br />kreativesparq.com</p>`,
  });
}

/**
 * The internal notification carries only what is needed to review the lead. The
 * full message body is included because the reviewer needs it, but it is escaped
 * and it is never logged.
 */
export async function sendInternalNotification(input: {
  readonly formType: 'Contact inquiry' | 'Project brief';
  readonly company: string;
  readonly primaryService: string;
  readonly summary: readonly (readonly [string, string])[];
  readonly replyTo: string;
  readonly idempotencyKey?: string;
}): Promise<boolean> {
  if (!toEmail) return false;

  const rows = input.summary
    .filter(([, value]) => value.trim().length > 0)
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:4px 12px 4px 0;vertical-align:top">${escapeHtml(
          label,
        )}</th><td style="padding:4px 0">${escapeHtml(value).replace(/\n/g, '<br />')}</td></tr>`,
    )
    .join('');

  const text = input.summary
    .filter(([, value]) => value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');

  return send({
    to: toEmail,
    replyTo: input.replyTo,
    idempotencyKey: input.idempotencyKey,
    subject: `New ${input.formType}: ${input.company} · ${input.primaryService}`,
    text: `New website inquiry\n\n${text}\n\nOpen the lead record in the approved system. Do not forward personal data to unapproved accounts.`,
    html: `<h2>New website inquiry</h2><table>${rows}</table><p style="color:#4c574f;font-size:13px">Open the lead record in the approved system. Do not forward personal data to unapproved accounts.</p>`,
  });
}
