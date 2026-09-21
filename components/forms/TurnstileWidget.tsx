'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          theme: 'light' | 'dark' | 'auto';
          callback: (token: string) => void;
          'expired-callback': () => void;
          'error-callback': () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

/**
 * Renders the Turnstile challenge and writes its token into a hidden field. The
 * token proves nothing on its own: the server verifies it through Siteverify on
 * every submission.
 *
 * `resetKey` changes after each attempt. Turnstile tokens are single-use, so the
 * widget has to be reset before a retry or the next attempt fails as a duplicate.
 */
export function TurnstileWidget({
  siteKey,
  resetKey,
}: {
  readonly siteKey: string;
  readonly resetKey: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [token, setToken] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready || !containerRef.current || widgetIdRef.current) return;
    const turnstile = window.turnstile;
    if (!turnstile) return;

    widgetIdRef.current = turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: 'auto',
      callback: (value) => setToken(value),
      'expired-callback': () => setToken(''),
      'error-callback': () => setToken(''),
    });
  }, [ready, siteKey]);

  useEffect(() => {
    if (resetKey === 0 || !widgetIdRef.current) return;
    setToken('');
    window.turnstile?.reset(widgetIdRef.current);
  }, [resetKey]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onReady={() => setReady(true)}
      />
      {/* Reserved height keeps the widget from shifting the form when it loads. */}
      <div ref={containerRef} className="min-h-[65px]" />
      <input type="hidden" name="turnstileToken" value={token} />
    </>
  );
}
