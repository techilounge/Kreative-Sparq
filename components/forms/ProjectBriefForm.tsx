'use client';

import { useActionState, useEffect, useRef, useState } from 'react';

import { submitProjectBrief } from '@/app/actions/project';
import { initialFormState } from '@/app/actions/types';
import { startProjectContent } from '@/content/pages/start-a-project';
import { trackEvent } from '@/lib/analytics/events';
import { Button } from '@/components/ui/Button';
import { CheckboxField, SelectField, TextAreaField, TextField } from '@/components/ui/Field';
import { FieldError } from '@/components/ui/FieldError';
import { useIsClient } from '@/lib/use-is-client';
import { cx } from '@/lib/utils';

import { AttributionFields } from './AttributionFields';
import { SpamControls } from './SpamControls';
import { useProjectDraft } from './useProjectDraft';

const fields = startProjectContent.fields;
const steps = startProjectContent.steps;
const nav = startProjectContent.navigation;

/** Which field belongs to which step, so an error can send the visitor back. */
const stepFields: readonly (readonly string[])[] = [
  ['name', 'email', 'phone', 'company', 'role', 'websiteUrl'],
  ['serviceInterests'],
  ['goal'],
  ['desiredStart', 'targetDate', 'budgetBand', 'decisionMakers'],
  ['consent', 'marketingConsent'],
];

export function ProjectBriefForm({
  turnstileSiteKey,
  budgetBands,
}: {
  readonly turnstileSiteKey: string | null;
  readonly budgetBands: readonly string[];
}) {
  const [state, formAction, pending] = useActionState(submitProjectBrief, initialFormState);
  const [stepIndex, setStepIndex] = useState(0);
  const scripted = useIsClient();
  const [started, setStarted] = useState(false);
  const [handledAttempt, setHandledAttempt] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { draftState, save, restore, discard } = useProjectDraft(formRef);

  // Steps only exist once JavaScript is running. Without it every fieldset is
  // visible and the form submits in one pass, so the brief is never unreachable.

  useEffect(() => {
    if (!scripted || stepIndex === 0) return;
    headingRef.current?.focus();
  }, [stepIndex, scripted]);

  // A server-side validation error returns the visitor to the earliest step that
  // holds a failing field, with their answers still in place. This is derived
  // during render rather than in an effect, so there is no second render pass.
  if (state.attempt !== handledAttempt) {
    setHandledAttempt(state.attempt);
    if (state.status === 'error' && state.fieldErrors) {
      const failing = Object.keys(state.fieldErrors);
      const target = stepFields.findIndex((group) =>
        group.some((field) => failing.includes(field)),
      );
      if (target >= 0 && target !== stepIndex) setStepIndex(target);
    }
  }

  // Moving attention to the summary is a DOM effect, not a state change.
  useEffect(() => {
    if (state.status === 'error') summaryRef.current?.focus();
  }, [state.status, state.attempt]);

  function handleChange() {
    if (!started) {
      setStarted(true);
      trackEvent({ name: 'project_brief_started' });
    }
    save(stepIndex);
  }

  const errors = state.fieldErrors ?? {};
  const errorEntries = Object.entries(errors);
  const isLastStep = stepIndex === steps.length - 1;
  const currentStep = steps[stepIndex];

  const budgetOptions = [...budgetBands, fields.budgetBand.permanentOption];

  return (
    <form
      ref={formRef}
      action={(formData) => {
        trackEvent({ name: 'project_brief_submitted' });
        discard();
        formAction(formData);
      }}
      noValidate
      onChange={handleChange}
      className="relative flex flex-col gap-8"
    >
      {draftState === 'offered' ? (
        <div className="border-line-strong flex flex-col gap-3 border-l-2 py-3 pl-4">
          <p className="text-ink text-base/7">{nav.restoreMessage}</p>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={() => {
                const step = restore();
                setStepIndex(Math.min(step, steps.length - 1));
              }}
            >
              {nav.restoreContinue}
            </Button>
            <Button type="button" variant="secondary" onClick={discard}>
              {nav.restoreStartAgain}
            </Button>
          </div>
        </div>
      ) : null}

      {draftState === 'expired' ? (
        <p className="border-line-strong text-ink-muted border-l-2 py-2 pl-4 text-sm/6">
          {nav.sessionExpiry}
        </p>
      ) : null}

      {scripted ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-4">
            <p className="eyebrow" aria-live="polite">
              {startProjectContent.progressLabel(stepIndex + 1)}
            </p>
            <p className="text-ink-muted text-sm/6">{currentStep?.name}</p>
          </div>
          <div
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={steps.length}
            aria-valuenow={stepIndex + 1}
            aria-label={startProjectContent.progressLabel(stepIndex + 1)}
            className="bg-line h-0.5 w-full"
          >
            <div
              className="bg-action h-full transition-[width] duration-200"
              style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      ) : null}

      <div aria-live="polite" ref={summaryRef} tabIndex={-1} className="focus-visible:outline-none">
        {state.status === 'error' ? (
          errorEntries.length > 0 ? (
            <div className="border-status-error border-l-2 py-3 pl-4">
              <p className="text-ink font-semibold">{nav.validationSummaryHeading}</p>
              <ul className="mt-2 flex flex-col gap-1">
                {errorEntries.map(([field, message]) => (
                  <li key={field}>
                    <a
                      href={`#project-${field}`}
                      className="text-status-error text-sm/6 underline underline-offset-4"
                    >
                      {message}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="border-status-error border-l-2 py-3 pl-4">
              <p className="text-status-error text-sm/6">{state.message}</p>
            </div>
          )
        ) : null}
      </div>

      {steps.map((step, index) => {
        const hidden = scripted && index !== stepIndex;

        return (
          <fieldset key={step.id} hidden={hidden} className="flex flex-col gap-6 border-0 p-0">
            <legend className="sr-only">{step.name}</legend>

            <div className="flex flex-col gap-2">
              <h2
                ref={index === stepIndex ? headingRef : undefined}
                tabIndex={-1}
                className="text-display-sm font-display font-normal focus-visible:outline-none"
              >
                {step.heading}
              </h2>
              {step.body ? <p className="text-ink-muted measure text-base/7">{step.body}</p> : null}
            </div>

            {index === 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                <TextField
                  id="project-name"
                  name="name"
                  label={fields.name.label}
                  autoComplete="name"
                  required
                  error={errors['name']}
                />
                <TextField
                  id="project-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  label={fields.email.label}
                  autoComplete="email"
                  required
                  error={errors['email']}
                />
                <TextField
                  id="project-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  label={fields.phone.label}
                  optionalSuffix={fields.phone.optionalSuffix}
                  autoComplete="tel"
                  error={errors['phone']}
                />
                <TextField
                  id="project-company"
                  name="company"
                  label={fields.company.label}
                  autoComplete="organization"
                  required
                  error={errors['company']}
                />
                <TextField
                  id="project-role"
                  name="role"
                  label={fields.role.label}
                  optionalSuffix={fields.role.optionalSuffix}
                  autoComplete="organization-title"
                  error={errors['role']}
                />
                <TextField
                  id="project-websiteUrl"
                  name="websiteUrl"
                  type="url"
                  inputMode="url"
                  label={fields.websiteUrl.label}
                  optionalSuffix={fields.websiteUrl.optionalSuffix}
                  autoComplete="url"
                  error={errors['websiteUrl']}
                />
              </div>
            ) : null}

            {index === 1 ? (
              <div id="project-serviceInterests" className="flex flex-col gap-3">
                <ul className="border-line grid border-t sm:grid-cols-2 sm:gap-x-10">
                  {fields.serviceInterests.options.map((option) => (
                    <li key={option} className="border-line border-b">
                      <label className="flex min-h-12 cursor-pointer items-center gap-3 py-2">
                        <input
                          type="checkbox"
                          name="serviceInterests"
                          value={option}
                          className="border-line-strong accent-action size-5 shrink-0 rounded-xs border"
                        />
                        <span className="text-ink text-base/7">{option}</span>
                      </label>
                    </li>
                  ))}
                </ul>
                <FieldError
                  id="project-serviceInterests-error"
                  message={errors['serviceInterests']}
                />
              </div>
            ) : null}

            {index === 2 ? (
              <TextAreaField
                id="project-goal"
                name="goal"
                label={step.heading}
                placeholder={fields.goal.placeholder}
                help={fields.goal.help}
                rows={8}
                required
                error={errors['goal']}
              />
            ) : null}

            {index === 3 ? (
              <div className="flex flex-col gap-6">
                <SelectField
                  id="project-desiredStart"
                  name="desiredStart"
                  label={fields.desiredStart.label}
                  options={fields.desiredStart.options}
                  defaultValue=""
                  placeholder="Select an option"
                  required
                  error={errors['desiredStart']}
                />
                <TextField
                  id="project-targetDate"
                  name="targetDate"
                  label={fields.targetDate.label}
                  help={fields.targetDate.help}
                  error={errors['targetDate']}
                />
                {/* Budget bands are never invented. Until approved bands are
                    configured, the only option offered is "Not decided yet". */}
                <SelectField
                  id="project-budgetBand"
                  name="budgetBand"
                  label={fields.budgetBand.label}
                  options={budgetOptions}
                  defaultValue={fields.budgetBand.permanentOption}
                  error={errors['budgetBand']}
                />
                <TextField
                  id="project-decisionMakers"
                  name="decisionMakers"
                  label={fields.decisionMakers.label}
                  help={fields.decisionMakers.help}
                  error={errors['decisionMakers']}
                />
              </div>
            ) : null}

            {index === 4 ? (
              <div className="flex flex-col gap-6">
                <CheckboxField
                  id="project-consent"
                  name="consent"
                  label={fields.consent.label}
                  required
                  error={errors['consent']}
                />
                <CheckboxField
                  id="project-marketingConsent"
                  name="marketingConsent"
                  label={fields.marketingConsent.label}
                />
                <AttributionFields />
                <SpamControls siteKey={turnstileSiteKey} resetKey={state.attempt} />
              </div>
            ) : null}
          </fieldset>
        );
      })}

      <div className="border-line flex flex-wrap items-center gap-3 border-t pt-6">
        {scripted && stepIndex > 0 ? (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              const next = stepIndex - 1;
              setStepIndex(next);
              save(next);
            }}
          >
            {nav.back}
          </Button>
        ) : null}

        {scripted && !isLastStep ? (
          <Button
            type="button"
            onClick={() => {
              const next = stepIndex + 1;
              setStepIndex(next);
              save(next);
            }}
          >
            {currentStep?.button}
          </Button>
        ) : (
          <Button type="submit" loading={pending} loadingLabel={startProjectContent.submitting}>
            {steps[steps.length - 1]?.button}
          </Button>
        )}
      </div>

      <p className={cx('text-ink-muted text-sm/6', !scripted && 'hidden')}>{nav.savedState}</p>
    </form>
  );
}
