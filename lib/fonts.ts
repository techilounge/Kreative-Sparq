import { Newsreader, Plus_Jakarta_Sans } from 'next/font/google';

/**
 * Display face. Only the weights the type scale actually uses are loaded.
 */
export const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
});

/**
 * Body and UI face. 400 for copy, 500 for labels, 600 for buttons and eyebrows.
 */
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
});
