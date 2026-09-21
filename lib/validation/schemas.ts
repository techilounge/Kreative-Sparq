import { z } from 'zod';

import { contactContent } from '@/content/pages/contact';
import { startProjectContent } from '@/content/pages/start-a-project';

const contactFields = contactContent.form.fields;
const projectFields = startProjectContent.fields;

/** Collapses whitespace so a field of spaces cannot pass a length check. */
const trimmed = (max: number) =>
  z
    .string()
    .transform((value) => value.replace(/\s+/g, ' ').trim())
    .pipe(z.string().max(max));

/**
 * Phone numbers arrive in many shapes. The check is deliberately loose: it
 * rejects obvious junk without refusing a valid international number.
 */
const phoneShape = /^[+()\d][\d\s()+.-]{5,23}$/;

export const optionalPhone = trimmed(24)
  .optional()
  .default('')
  .refine((value) => value.length === 0 || phoneShape.test(value), {
    message: contactFields.phone.error,
  });

const consentTrue = z.literal('on', { message: contactFields.consent.error });

/**
 * Shared spam controls. `website` is the honeypot: it is hidden from people and
 * must stay empty. `startedAt` is the millisecond timestamp the form was
 * rendered, used for the timing check on the server.
 */
export const spamControlsSchema = z.object({
  website: z.string().max(0).optional().default(''),
  startedAt: z.coerce.number().int().nonnegative().optional(),
  turnstileToken: z.string().max(2048).optional().default(''),
});

export const contactSchema = z
  .object({
    name: trimmed(120).pipe(z.string().min(1, contactFields.name.error)),
    email: trimmed(200)
      .pipe(z.string().min(1, contactFields.email.errorEmpty))
      .pipe(z.email(contactFields.email.errorInvalid)),
    company: trimmed(160).pipe(z.string().min(1, contactFields.company.error)),
    phone: optionalPhone,
    service: z.enum(contactFields.service.options, {
      message: contactFields.service.error,
    }),
    message: trimmed(4000).pipe(z.string().min(20, contactFields.message.error)),
    consent: consentTrue,
  })
  .extend(spamControlsSchema.shape)
  // Unexpected fields are rejected rather than quietly ignored.
  .strict();

export type ContactInput = z.infer<typeof contactSchema>;

export const projectBriefSchema = z
  .object({
    name: trimmed(120).pipe(z.string().min(1, projectFields.name.error)),
    email: trimmed(200)
      .pipe(z.string().min(1, projectFields.email.errorEmpty))
      .pipe(z.email(projectFields.email.errorInvalid)),
    phone: optionalPhone,
    company: trimmed(160).pipe(z.string().min(1, projectFields.company.error)),
    role: trimmed(120).optional().default(''),
    websiteUrl: trimmed(300).optional().default(''),
    serviceInterests: z
      .array(z.enum(projectFields.serviceInterests.options))
      .min(1, projectFields.serviceInterests.error),
    goal: trimmed(5000).pipe(z.string().min(20, projectFields.goal.error)),
    desiredStart: z.enum(projectFields.desiredStart.options, {
      message: projectFields.desiredStart.error,
    }),
    targetDate: trimmed(160).optional().default(''),
    budgetBand: trimmed(120).optional().default(''),
    decisionMakers: trimmed(300).optional().default(''),
    consent: z.literal('on', { message: projectFields.consent.error }),
    marketingConsent: z.literal('on').optional(),
    landingPage: trimmed(500).optional().default(''),
    referrer: trimmed(500).optional().default(''),
    utmSource: trimmed(120).optional().default(''),
    utmMedium: trimmed(120).optional().default(''),
    utmCampaign: trimmed(160).optional().default(''),
    utmTerm: trimmed(160).optional().default(''),
    utmContent: trimmed(160).optional().default(''),
  })
  .extend(spamControlsSchema.shape)
  .strict();

export type ProjectBriefInput = z.infer<typeof projectBriefSchema>;

/** Flattens Zod issues into a `fieldName -> first message` map for the UI. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !errors[key]) {
      errors[key] = issue.message;
    }
  }
  return errors;
}
