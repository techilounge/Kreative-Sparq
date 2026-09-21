'use client';

import { useEffect, useRef } from 'react';

import { TurnstileWidget } from './TurnstileWidget';

/**
 * The honeypot, the timing field, and the Turnstile widget.
 *
 * The honeypot is hidden from people and from assistive technology, and it is
 * excluded from the tab order, so only an automated filler reaches it.
 */
export function SpamControls({
  siteKey,
  resetKey,
}: {
  readonly siteKey: string | null;
  readonly resetKey: number;
}) {
  const startedAtRef = useRef<HTMLInputElement>(null);

  // Written straight to the input. The value is only read by the server, so
  // there is nothing for React to re-render when it is set.
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  return (
    <>
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />
      {siteKey ? <TurnstileWidget siteKey={siteKey} resetKey={resetKey} /> : null}
    </>
  );
}
