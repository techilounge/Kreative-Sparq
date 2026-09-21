import { describe, expect, it } from 'vitest';

import {
  hasPublicContactChannel,
  legalClauses,
  privacyPagePublished,
  replyWindowFragment,
  replyWindowSentence,
  siteSettings,
  termsPagePublished,
} from '@/lib/site-settings';

describe('site settings', () => {
  it('resolves unconfigured placeholders to null rather than placeholder text', () => {
    expect(siteSettings.contactEmail).toBeNull();
    expect(siteSettings.contactPhone).toBeNull();
    expect(siteSettings.responseTime).toBeNull();
    expect(siteSettings.calLink).toBeNull();
    expect(hasPublicContactChannel).toBe(false);
  });

  it('offers no budget bands until approved ones are configured', () => {
    expect(siteSettings.budgetBands).toEqual([]);
  });

  it('drops the reply-window promise when the window has not been verified', () => {
    expect(replyWindowSentence()).not.toContain('within');
    expect(replyWindowFragment()).toBe('as soon as we can');
  });

  it('keeps both legal routes unpublished while counsel clauses are missing', () => {
    expect(Object.values(legalClauses).every((clause) => clause === null)).toBe(true);
    expect(privacyPagePublished).toBe(false);
    expect(termsPagePublished).toBe(false);
  });
});
