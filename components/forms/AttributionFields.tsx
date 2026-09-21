'use client';

import { useEffect, useRef } from 'react';

const UTM_KEYS = ['source', 'medium', 'campaign', 'term', 'content'] as const;

const FIELD_NAMES = [
  'landingPage',
  'referrer',
  'utmSource',
  'utmMedium',
  'utmCampaign',
  'utmTerm',
  'utmContent',
] as const;

/**
 * Campaign attribution travels with the lead record, not with analytics. Only
 * the approved UTM parameters, the landing path, and the referring origin are
 * captured: the full referring URL could carry someone else's query string.
 *
 * The values are written straight into the hidden inputs. Nothing on the page
 * displays them, so holding them in React state would only cost a render.
 */
export function AttributionFields() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const params = new URLSearchParams(window.location.search);

    let referrer = '';
    try {
      referrer = document.referrer ? new URL(document.referrer).origin : '';
    } catch {
      referrer = '';
    }

    const values: Record<(typeof FIELD_NAMES)[number], string> = {
      landingPage: window.location.pathname,
      referrer,
      utmSource: params.get(`utm_${UTM_KEYS[0]}`)?.slice(0, 160) ?? '',
      utmMedium: params.get(`utm_${UTM_KEYS[1]}`)?.slice(0, 160) ?? '',
      utmCampaign: params.get(`utm_${UTM_KEYS[2]}`)?.slice(0, 160) ?? '',
      utmTerm: params.get(`utm_${UTM_KEYS[3]}`)?.slice(0, 160) ?? '',
      utmContent: params.get(`utm_${UTM_KEYS[4]}`)?.slice(0, 160) ?? '',
    };

    for (const name of FIELD_NAMES) {
      const input = container.querySelector<HTMLInputElement>(`input[name="${name}"]`);
      if (input) input.value = values[name];
    }
  }, []);

  return (
    <div ref={containerRef} hidden>
      {FIELD_NAMES.map((name) => (
        <input key={name} type="hidden" name={name} defaultValue="" />
      ))}
    </div>
  );
}
