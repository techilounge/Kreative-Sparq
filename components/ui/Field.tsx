import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

import { cx } from '@/lib/utils';

import { FieldError } from './FieldError';

const control =
  'w-full min-h-11 rounded-sm border bg-surface px-3.5 py-2.5 text-base text-ink transition-colors duration-200 placeholder:text-ink-muted/75 focus-visible:border-action';

type FieldShellProps = {
  readonly id: string;
  readonly label: string;
  readonly optionalSuffix?: string;
  readonly help?: string;
  readonly error?: string;
  readonly children: (props: {
    readonly id: string;
    readonly describedBy: string | undefined;
    readonly invalid: boolean;
    readonly className: string;
  }) => ReactNode;
};

export function FieldShell({ id, label, optionalSuffix, help, error, children }: FieldShellProps) {
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-ink text-sm/6 font-medium">
        {label}
        {optionalSuffix ? (
          <span className="text-ink-muted font-normal"> {optionalSuffix}</span>
        ) : null}
      </label>
      {help ? (
        <p id={helpId} className="text-ink-muted text-sm/6">
          {help}
        </p>
      ) : null}
      {children({
        id,
        describedBy,
        invalid: Boolean(error),
        className: cx(control, error ? 'border-status-error' : 'border-line-strong'),
      })}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

type TextFieldProps = {
  readonly id: string;
  readonly label: string;
  readonly optionalSuffix?: string;
  readonly help?: string;
  readonly error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'>;

export function TextField({ id, label, optionalSuffix, help, error, ...rest }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} optionalSuffix={optionalSuffix} help={help} error={error}>
      {({ describedBy, invalid, className }) => (
        <input
          id={id}
          name={rest.name ?? id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={className}
          {...rest}
        />
      )}
    </FieldShell>
  );
}

type TextAreaFieldProps = {
  readonly id: string;
  readonly label: string;
  readonly help?: string;
  readonly error?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'className'>;

export function TextAreaField({ id, label, help, error, ...rest }: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} help={help} error={error}>
      {({ describedBy, invalid, className }) => (
        <textarea
          id={id}
          name={rest.name ?? id}
          rows={rest.rows ?? 6}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={cx(className, 'min-h-36 resize-y')}
          {...rest}
        />
      )}
    </FieldShell>
  );
}

type SelectFieldProps = {
  readonly id: string;
  readonly label: string;
  readonly help?: string;
  readonly error?: string;
  readonly placeholder?: string;
  readonly options: readonly string[];
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'className' | 'children'>;

export function SelectField({
  id,
  label,
  help,
  error,
  placeholder,
  options,
  ...rest
}: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} help={help} error={error}>
      {({ describedBy, invalid, className }) => (
        <select
          id={id}
          name={rest.name ?? id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={className}
          {...rest}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  );
}

export function CheckboxField({
  id,
  label,
  error,
  ...rest
}: {
  readonly id: string;
  readonly label: string;
  readonly error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type' | 'className'>) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={rest.name ?? id}
          type="checkbox"
          aria-describedby={errorId}
          aria-invalid={Boolean(error) || undefined}
          className="border-line-strong accent-action mt-0.5 size-5 shrink-0 rounded-xs border"
          {...rest}
        />
        <label htmlFor={id} className="text-ink measure text-sm/6">
          {label}
        </label>
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
