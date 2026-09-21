'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

import { THEME_STORAGE_KEY } from '@/lib/theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      storageKey={THEME_STORAGE_KEY}
      // Colour tokens transition on hover and focus. Suppressing that during a
      // theme change avoids a full-page crossfade, which the motion rules forbid.
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
