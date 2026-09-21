import { loadingLabels } from '@/content/global';

/**
 * Scoped to the one route that is rendered per request. A loading boundary at
 * the root would put every prerendered page behind it, so the served HTML
 * would carry this message instead of the page, and anything without
 * JavaScript would never see past it.
 *
 * Deliberately minimal: a skeleton would imply a shape the page may not have,
 * so the route announces the wait instead of drawing a fake layout.
 */
export default function Loading() {
  return (
    <div className="container-editorial py-24">
      <p role="status" className="text-ink-muted text-sm/6">
        {loadingLabels.page}
      </p>
    </div>
  );
}
