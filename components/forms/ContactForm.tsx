'use client';

import { useActionState, useEffect, useRef } from 'react';

import { submitContactForm } from '@/app/actions/contact';
import { initialFormState } from '@/app/actions/types';
import { contactContent } from '@/content/pages/contact';
import { trackEvent } from '@/lib/analytics/events';
import { CheckboxField, SelectField, TextAreaField, TextField } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { FormStatus } from '@/components/ui/FormStatus';

import { SpamControls } from './SpamControls';

const fields = contactContent.form.fields;

export function ContactForm({ turnstileSiteKey }: { readonly turnstileSiteKey: string | null }) {
  const [state, formAction, pending] = useActionState(submitContactForm, initialFormState);
  const statusRef = useRef<HTMLDivElement>(null);
  const trackedAttempt = useRef(0);

  useEffect(() => {
    if (state.status === 'idle') return;
    // Move attention to the outcome so a keyboard or screen-reader visitor is not
    // left at the bottom of the form wondering what happened.
    statusRef.current?.focus();

    if (state.status === 'success' && state.attempt !== trackedAttempt.current) {
      trackedAttempt.current = state.attempt;
      trackEvent({ name: 'contact_form_submitted' });
    }
  }, [state]);

  const errors = state.fieldErrors ?? {};
  const errorEntries = Object.entries(errors);

  if (state.status === 'success') {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border-rule flex flex-col gap-3 border-l-2 py-2 pl-5 focus-visible:outline-none"
      >
        <h3 className="text-display-sm font-display font-normal">Inquiry sent</h3>
        <p className="text-ink measure text-base/7">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="relative flex flex-col gap-6">
      <div aria-live="polite" ref={statusRef} tabIndex={-1} className="focus-visible:outline-none">
        {state.status === 'error' ? (
          errorEntries.length > 0 ? (
            <div className="border-status-error border-l-2 py-3 pl-4">
              <p className="text-ink font-semibold">
                {contactContent.form.validationSummaryHeading}
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {errorEntries.map(([field, message]) => (
                  <li key={field}>
                    <a
                      href={`#contact-${field}`}
                      className="text-status-error text-sm/6 underline underline-offset-4"
                    >
                      {message}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <FormStatus tone="error" message={state.message ?? ''} />
          )
        ) : null}
      </div>

      <TextField
        id="contact-name"
        name="name"
        label={fields.name.label}
        placeholder={fields.name.placeholder}
        autoComplete="name"
        required
        error={errors['name']}
      />

      <TextField
        id="contact-email"
        name="email"
        type="email"
        inputMode="email"
        label={fields.email.label}
        placeholder={fields.email.placeholder}
        autoComplete="email"
        required
        error={errors['email']}
      />

      <TextField
        id="contact-company"
        name="company"
        label={fields.company.label}
        placeholder={fields.company.placeholder}
        autoComplete="organization"
        required
        error={errors['company']}
      />

      <TextField
        id="contact-phone"
        name="phone"
        type="tel"
        inputMode="tel"
        label={fields.phone.label}
        help={fields.phone.help}
        autoComplete="tel"
        error={errors['phone']}
      />

      <SelectField
        id="contact-service"
        name="service"
        label={fields.service.label}
        placeholder={fields.service.placeholder}
        options={fields.service.options}
        defaultValue=""
        required
        error={errors['service']}
      />

      <TextAreaField
        id="contact-message"
        name="message"
        label={fields.message.label}
        placeholder={fields.message.placeholder}
        help={fields.message.help}
        required
        error={errors['message']}
      />

      <CheckboxField
        id="contact-consent"
        name="consent"
        label={fields.consent.label}
        required
        error={errors['consent']}
      />

      <SpamControls siteKey={turnstileSiteKey} resetKey={state.attempt} />

      <div>
        <Button type="submit" loading={pending} loadingLabel={contactContent.form.submitting}>
          {contactContent.form.submit}
        </Button>
      </div>
    </form>
  );
}
