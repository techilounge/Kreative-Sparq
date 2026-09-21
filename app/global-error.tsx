'use client';

import { errorContent } from '@/content/pages/states';

/**
 * Renders when the root layout itself fails, so it cannot rely on any provider,
 * font variable, or token defined there. The colours are the approved values,
 * written inline for that reason.
 */
export default function GlobalError({ reset }: { readonly reset: () => void }) {
  return (
    <html lang="en-NG">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#F2F4F0',
          color: '#242424',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <main style={{ maxWidth: '40rem', padding: '0 1.25rem' }}>
          <h1 style={{ color: '#2A371B', fontSize: '2rem', lineHeight: 1.15 }}>
            {errorContent.h1}
          </h1>
          <p style={{ lineHeight: 1.7 }}>{errorContent.bodyWithoutEmail}</p>
          <button
            type="button"
            onClick={reset}
            style={{
              minHeight: '2.75rem',
              padding: '0 1.25rem',
              border: 0,
              borderRadius: 4,
              backgroundColor: '#A63B1C',
              color: '#FFFFFF',
              fontSize: '0.9375rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {errorContent.primaryCta}
          </button>
        </main>
      </body>
    </html>
  );
}
