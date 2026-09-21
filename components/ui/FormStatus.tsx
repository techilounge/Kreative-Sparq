import { cx } from '@/lib/utils';

type FormStatusProps = {
  readonly tone: 'success' | 'error';
  readonly message: string;
  readonly heading?: string;
};

/**
 * Submission outcomes are announced to screen readers as they appear. The
 * wrapper renders even when empty so the announcement is not missed and the
 * layout does not shift when a message arrives.
 */
export function FormStatus({ tone, message, heading }: FormStatusProps) {
  return (
    <div
      className={cx(
        'border-l-2 py-3 pl-4',
        tone === 'error' ? 'border-status-error' : 'border-status-success',
      )}
    >
      {heading ? <p className="text-ink font-semibold">{heading}</p> : null}
      <p className={cx('text-sm/6', tone === 'error' ? 'text-status-error' : 'text-ink')}>
        {message}
      </p>
    </div>
  );
}

export function FormStatusRegion({ children }: { readonly children?: React.ReactNode }) {
  return (
    <div aria-live="polite" role="status" className="min-h-0">
      {children}
    </div>
  );
}
