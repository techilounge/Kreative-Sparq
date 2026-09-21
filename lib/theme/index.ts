/**
 * Theme storage key. `next-themes` writes the visitor's explicit choice here and
 * injects a blocking script that applies the resolved theme before first paint,
 * which is what prevents a wrong-theme flash and a hydration mismatch.
 *
 * The key is exported so the end-to-end tests can assert persistence directly
 * rather than inferring it from the rendered class.
 */
export const THEME_STORAGE_KEY = 'kreative-sparq-theme';

export type ThemeSetting = 'light' | 'dark' | 'system';

/** Mode-specific `theme-color`, matching the approved surfaces. */
export const themeColors = {
  light: '#F2F4F0',
  dark: '#1A2421',
} as const;
