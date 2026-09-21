'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

import { bookContent } from '@/content/pages/book';
import { trackEvent } from '@/lib/analytics/events';

type BookingEmbedProps = {
  readonly calLink: string;
  readonly contactEmail: string | null;
};

/**
 * The Cal.com embed, loaded only after the rest of the page is usable.
 *
 * The explanation around it is plain HTML, so the page still answers the
 * visitor's questions if the embed never loads. Height is reserved up front so
 * the arrival of the calendar does not shift the layout.
 */
export function BookingEmbed({ calLink, contactEmail }: BookingEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading');

  useEffect(() => {
    // Booking completion is tracked only from Cal.com's own event, never from a
    // click or a page view, so the conversion count stays truthful.
    function onMessage(event: MessageEvent) {
      if (event.origin !== 'https://cal.com' && event.origin !== 'https://app.cal.com') return;
      const data = event.data as { type?: string } | undefined;
      if (data?.type === 'bookingSuccessful') {
        trackEvent({ name: 'booking_completed' });
        setStatus('ready');
      }
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    if (status !== 'loading') return;
    // If the embed has rendered nothing after fifteen seconds, show the fallback
    // rather than leaving a visitor watching an empty box.
    const timer = setTimeout(() => {
      if (containerRef.current && containerRef.current.childElementCount === 0) {
        setStatus('failed');
      } else {
        setStatus('ready');
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [status]);

  const safeLink = calLink.replace(/[^a-zA-Z0-9/_-]/g, '');

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        data-cal-link={safeLink}
        className="border-line min-h-[620px] rounded-sm border"
      >
        {status === 'loading' ? (
          <p role="status" className="text-ink-muted p-6 text-sm/6">
            {bookContent.states.loading}
          </p>
        ) : null}
      </div>

      {status === 'failed' ? (
        <p className="border-status-error text-ink border-l-2 py-2 pl-4 text-base/7">
          {contactEmail
            ? bookContent.states.unavailableWithEmail(contactEmail)
            : bookContent.states.unavailableWithoutEmail}
        </p>
      ) : null}

      <p className="text-ink-muted text-sm/6">{bookContent.states.noSlots}</p>

      <Script
        id="cal-embed"
        strategy="lazyOnload"
        onError={() => setStatus('failed')}
        dangerouslySetInnerHTML={{
          __html: `(function(C,A,L){let p=function(a,ar){a.q.push(ar)};let d=C.document;C.Cal=C.Cal||function(){let cal=C.Cal;let ar=arguments;if(!cal.loaded){cal.ns={};cal.q=cal.q||[];d.head.appendChild(d.createElement("script")).src=A;cal.loaded=true}if(ar[0]===L){const api=function(){p(api,arguments)};const namespace=ar[1];api.q=api.q||[];if(typeof namespace==="string"){cal.ns[namespace]=cal.ns[namespace]||api;p(cal.ns[namespace],ar);p(cal,["initNamespace",namespace])}else p(cal,ar);return}p(cal,ar)}})(window,"https://app.cal.com/embed/embed.js","init");
Cal("init",{origin:"https://cal.com"});
Cal("inline",{elementOrSelector:'[data-cal-link="${safeLink}"]',calLink:"${safeLink}",layout:"month_view"});`,
        }}
      />
    </div>
  );
}
