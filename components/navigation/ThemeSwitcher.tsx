'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

import { themeControl } from '@/content/global';
import type { ThemeSetting } from '@/lib/theme';
import { useIsClient } from '@/lib/use-is-client';
import { cx } from '@/lib/utils';

/**
 * A three-option segmented control, exposed as a radio group so the options read
 * as one setting rather than three unrelated buttons.
 *
 * Until the client has mounted, `next-themes` cannot know which option is
 * active. The control renders at full size from the first paint so nothing
 * shifts, and only the checked state waits for mount.
 */
export function ThemeSwitcher({ className }: { readonly className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useIsClient();
  const [announcement, setAnnouncement] = useState('');
  const announcementTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (announcementTimer.current) clearTimeout(announcementTimer.current);
    },
    [],
  );

  function choose(value: ThemeSetting, label: string) {
    setTheme(value);
    setAnnouncement(themeControl.announcement(label));
    if (announcementTimer.current) clearTimeout(announcementTimer.current);
    // Clearing the message lets the same choice be announced again later.
    announcementTimer.current = setTimeout(() => setAnnouncement(''), 2000);
  }

  return (
    <div className={cx('flex items-center', className)}>
      <div
        role="radiogroup"
        aria-label={themeControl.label}
        className="border-line-strong flex items-center gap-0.5 rounded-sm border p-0.5"
      >
        {themeControl.options.map((option) => {
          const checked = mounted && theme === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={mounted ? checked : false}
              onClick={() => choose(option.value as ThemeSetting, option.label)}
              className={cx(
                'min-h-9 rounded-xs px-2.5 text-[0.8125rem] font-medium transition-colors duration-200',
                checked
                  ? 'bg-action text-ink-on-action'
                  : 'text-ink-muted hover:text-ink hover:bg-surface-raised',
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </div>
  );
}
