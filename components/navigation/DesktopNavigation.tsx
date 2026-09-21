'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { primaryNavigation } from '@/content/global';
import { cx } from '@/lib/utils';

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {primaryNavigation.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cx(
                  'relative inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-medium transition-colors duration-200',
                  // The active route is marked with an underline as well as a
                  // colour change, so it does not rely on colour alone.
                  active
                    ? 'text-ink after:bg-action after:absolute after:inset-x-3 after:bottom-2 after:h-px after:content-[""]'
                    : 'text-ink-muted hover:text-ink',
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
