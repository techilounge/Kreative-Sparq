import { describe, expect, it, vi } from 'vitest';

vi.mock('@vercel/analytics', () => ({ track: vi.fn() }));

const { track } = await import('@vercel/analytics');
const { trackEvent } = await import('@/lib/analytics/events');

describe('analytics events', () => {
  it('sends the approved event name with no personal data attached', () => {
    trackEvent({ name: 'contact_form_submitted' });
    expect(track).toHaveBeenCalledWith('contact_form_submitted', undefined);
  });

  it('sends only categorical properties', () => {
    trackEvent({ name: 'service_viewed', properties: { service: 'brand-strategy' } });
    expect(track).toHaveBeenCalledWith('service_viewed', { service: 'brand-strategy' });

    const payloads = vi
      .mocked(track)
      .mock.calls.flatMap((call) => Object.values(call[1] ?? {}).map(String));
    for (const value of payloads) {
      expect(value).not.toMatch(/@/);
      expect(value).not.toMatch(/\+?\d{7,}/);
    }
  });
});
