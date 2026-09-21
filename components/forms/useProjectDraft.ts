'use client';

import { useCallback, useState, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'kreative-sparq-project-brief';
/** Drafts older than two hours are treated as expired and cleared. */
const MAX_AGE_MS = 2 * 60 * 60 * 1000;

/** Never persisted: consent decisions and spam-control values are re-entered. */
const EXCLUDED = new Set(['consent', 'marketingConsent', 'website', 'startedAt', 'turnstileToken']);

type Draft = {
  readonly savedAt: number;
  readonly step: number;
  readonly values: Record<string, string | string[]>;
};

export type DraftState = 'none' | 'offered' | 'restored' | 'expired';

type Snapshot = {
  readonly raw: string | null;
  readonly draft: Draft | null;
  readonly expired: boolean;
};

const EMPTY_SNAPSHOT: Snapshot = { raw: null, draft: null, expired: false };
const SERVER_SNAPSHOT: Snapshot = EMPTY_SNAPSHOT;

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emit() {
  for (const listener of listeners) listener();
}

/**
 * `getSnapshot` has to return the same object while the stored value has not
 * changed, so the parsed draft and the expiry decision are cached against the
 * raw string. Age is evaluated here, inside the store read, rather than in the
 * component body where a clock read would make rendering impure.
 */
let cached: Snapshot = EMPTY_SNAPSHOT;

function getSnapshot(): Snapshot {
  let raw: string | null = null;
  try {
    raw = window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    // Private browsing or a blocked storage API. The form still works.
    raw = null;
  }

  if (raw === cached.raw) return cached;

  if (raw === null) {
    cached = EMPTY_SNAPSHOT;
    return cached;
  }

  let draft: Draft | null = null;
  try {
    draft = JSON.parse(raw) as Draft;
  } catch {
    draft = null;
  }

  const expired = draft !== null && Date.now() - draft.savedAt > MAX_AGE_MS;
  if (expired) {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to do if storage is unavailable.
    }
    cached = { raw: null, draft: null, expired: true };
    return cached;
  }

  cached = { raw, draft, expired: false };
  return cached;
}

/**
 * Keeps the brief on the visitor's own device for the session, which is what the
 * "Your progress is saved on this device for this session" line promises.
 *
 * Storage is `sessionStorage`, so the draft does not outlive the browser tab,
 * and consent is excluded so a stored draft can never pre-tick it.
 */
export function useProjectDraft(formRef: React.RefObject<HTMLFormElement | null>) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);
  const [handled, setHandled] = useState(false);

  const draftState: DraftState = handled
    ? 'restored'
    : snapshot.expired
      ? 'expired'
      : snapshot.draft
        ? 'offered'
        : 'none';

  const save = useCallback(
    (step: number) => {
      const form = formRef.current;
      if (!form) return;

      const values: Record<string, string | string[]> = {};
      const data = new FormData(form);
      for (const key of new Set(data.keys())) {
        if (EXCLUDED.has(key)) continue;
        const all = data.getAll(key).filter((value): value is string => typeof value === 'string');
        if (all.length === 0) continue;
        values[key] = all.length > 1 || key === 'serviceInterests' ? all : (all[0] ?? '');
      }

      try {
        window.sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ savedAt: Date.now(), step, values } satisfies Draft),
        );
      } catch {
        // Storage may be unavailable. Losing the draft is acceptable; failing
        // the submission would not be.
      }
      // Saving while the form is being filled must not re-offer the draft.
      setHandled(true);
    },
    [formRef],
  );

  const restore = useCallback((): number => {
    const form = formRef.current;
    const draft = snapshot.draft;
    if (!form || !draft) return 0;

    for (const [name, value] of Object.entries(draft.values)) {
      if (Array.isArray(value)) {
        const nodes = form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`);
        nodes.forEach((node) => {
          node.checked = value.includes(node.value);
        });
        continue;
      }

      const element = form.querySelector<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >(`[name="${name}"]`);
      if (element) element.value = value;
    }

    setHandled(true);
    return draft.step;
  }, [snapshot.draft, formRef]);

  const discard = useCallback(() => {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to do if storage is unavailable.
    }
    setHandled(true);
    emit();
  }, []);

  return { draftState, save, restore, discard };
}
