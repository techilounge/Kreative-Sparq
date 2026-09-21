import { skipLinkLabel } from '@/content/global';

/**
 * Visible only on keyboard focus, and pinned above the sticky header so the
 * header cannot obscure it.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="bg-action text-ink-on-action sr-only rounded-sm px-4 py-3 text-sm font-semibold focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-50"
    >
      {skipLinkLabel}
    </a>
  );
}
