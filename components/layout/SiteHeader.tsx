'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { headerCta } from '@/content/global';
import { DesktopNavigation } from '@/components/navigation/DesktopNavigation';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';
import { ThemeSwitcher } from '@/components/navigation/ThemeSwitcher';
import { Logo } from '@/components/ui/Logo';
import { cx } from '@/lib/utils';

/**
 * The header sits on the page background at the top of a document and settles
 * onto a surface with a rule once the visitor scrolls.
 *
 * It does not start transparent: the hero is text-led, so there is no artwork to
 * sit over and a transparent bar would only reduce legibility.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // A sentinel observed once beats a scroll listener that runs on every frame.
    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;height:1px;width:1px;';
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry?.isIntersecting), {
      threshold: 0,
    });
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <header
      className={cx(
        'sticky top-0 z-40 transition-colors duration-200',
        scrolled ? 'bg-surface border-line border-b' : 'bg-background border-b border-transparent',
      )}
    >
      <div className="container-editorial flex min-h-16 items-center justify-between gap-4 py-3 md:min-h-18">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center"
          aria-label="Kreative Sparq, home"
        >
          <Logo height={32} priority />
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <DesktopNavigation />
          <ThemeSwitcher className="hidden md:flex" />
          <Link
            href={headerCta.href}
            className="bg-action text-ink-on-action hover:bg-action-hover hidden min-h-11 items-center rounded-sm px-4 text-[0.9375rem] font-semibold transition-colors duration-200 md:inline-flex"
          >
            {headerCta.label}
          </Link>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
