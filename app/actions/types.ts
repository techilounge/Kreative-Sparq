export type FormState = {
  readonly status: 'idle' | 'success' | 'error';
  readonly message?: string;
  readonly fieldErrors?: Record<string, string>;
  /** Bumped on every submission so the client can reset the Turnstile widget. */
  readonly attempt: number;
};

export const initialFormState: FormState = { status: 'idle', attempt: 0 };
