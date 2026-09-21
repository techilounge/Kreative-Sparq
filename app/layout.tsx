import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SkipLink } from '@/components/layout/SkipLink';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { newsreader, plusJakartaSans } from '@/lib/fonts';
import { siteUrl } from '@/lib/site-settings';
import { defaultSocial } from '@/lib/seo/metadata';
import { themeColors } from '@/lib/theme';

import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultSocial.title,
    template: '%s',
  },
  description: defaultSocial.description,
  applicationName: defaultSocial.siteName,
  openGraph: {
    siteName: defaultSocial.siteName,
    locale: defaultSocial.locale,
    type: 'website',
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: themeColors.light },
    { media: '(prefers-color-scheme: dark)', color: themeColors.dark },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html
      lang="en-NG"
      // next-themes sets `class` and `style` on this element before hydration.
      suppressHydrationWarning
      className={`no-js ${newsreader.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        {/* The reveal animation writes its starting state (transparent, offset)
            into the server-rendered markup, so without this class the content
            would stay invisible when scripting is unavailable. Removing the
            class here runs before first paint, so nobody sees a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.remove('no-js')",
          }}
        />
      </head>
      <body className="bg-background text-ink min-h-dvh antialiased">
        <ThemeProvider>
          <MotionProvider>
            <SkipLink />
            <SiteHeader />
            <main id="main" tabIndex={-1} className="focus-visible:outline-none">
              {children}
            </main>
            <SiteFooter />
          </MotionProvider>
        </ThemeProvider>
        {/* Both read the search parameters, which makes them opt out of server
            rendering. Without a boundary of their own that opt-out applies to
            the whole document, so every page would arrive as an empty shell
            that only scripting can fill. */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <Suspense fallback={null}>
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  );
}
