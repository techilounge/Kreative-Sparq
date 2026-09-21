'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { headerCta, mobileMenu, primaryNavigation } from '@/content/global';
import { cx } from '@/lib/utils';

import { ThemeSwitcher } from './ThemeSwitcher';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * A full-screen sheet. While it is open the background cannot scroll, focus is
 * trapped inside, Escape closes it, and focus returns to the trigger.
 */
export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const headingId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== 'Tab' || !panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null,
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        className="border-line-strong text-ink hover:border-action inline-flex min-h-11 min-w-11 items-center gap-2 rounded-sm border px-3 text-sm font-medium transition-colors duration-200"
      >
        <span aria-hidden className="flex flex-col gap-[3px]">
          <span className="bg-ink block h-px w-4" />
          <span className="bg-ink block h-px w-4" />
          <span className="bg-ink block h-px w-4" />
        </span>
        {mobileMenu.openLabel}
      </button>

      {open ? (
        <div
          id={panelId}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          className="bg-background fixed inset-0 z-50 flex flex-col overflow-y-auto"
        >
          <div className="container-editorial flex min-h-16 items-center justify-between py-4">
            <h2 id={headingId} className="font-display text-xl font-normal">
              {mobileMenu.heading}
            </h2>
            <button
              type="button"
              onClick={close}
              className="border-line-strong text-ink hover:border-action inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border px-3 text-sm font-medium transition-colors duration-200"
            >
              {mobileMenu.closeLabel}
            </button>
          </div>

          <nav aria-label="Primary" className="container-editorial flex-1 py-4">
            <ul className="border-line flex flex-col border-t">
              {primaryNavigation.map((link) => {
                const active =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href} className="border-line border-b">
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      // Closing here rather than on a pathname change keeps the
                      // menu from re-rendering the whole tree after navigation,
                      // and it also closes when the current route is re-selected.
                      onClick={() => setOpen(false)}
                      className={cx(
                        'text-display-sm font-display flex min-h-14 items-center py-3 font-normal transition-colors duration-200',
                        active ? 'text-action' : 'text-ink-heading',
                      )}
                    >
                      {link.label}
                      {active ? <span className="sr-only"> (current page)</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="container-editorial border-line flex flex-col gap-5 border-t py-6">
            <Link
              href={headerCta.href}
              onClick={() => setOpen(false)}
              className="bg-action text-ink-on-action hover:bg-action-hover inline-flex min-h-12 items-center justify-center rounded-sm px-5 text-[0.9375rem] font-semibold transition-colors duration-200"
            >
              {mobileMenu.cta}
            </Link>
            <ThemeSwitcher />
          </div>
        </div>
      ) : null}
    </div>
  );
}
