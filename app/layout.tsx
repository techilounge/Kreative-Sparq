import type { Metadata, Viewport } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { content } from "@/content";
import "./globals.css";

const displayFont = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://kreativesparq.com",
  ),
  applicationName: "Kreative Sparq",
  title: "Kreative Sparq | Strategy, Creative & Digital Marketing",
  description:
    "Kreative Sparq brings strategy, creative work, digital marketing, websites, and campaigns into one clear plan for ambitious brands.",
  openGraph: {
    title: "Ideas that move people. Marketing that moves business.",
    description:
      "A strategy, creative, and digital marketing agency helping ambitious brands turn attention into meaningful business action.",
    siteName: "Kreative Sparq",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideas that move people. Marketing that moves business.",
    description:
      "A strategy, creative, and digital marketing agency helping ambitious brands turn attention into meaningful business action.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F4F0" },
    { media: "(prefers-color-scheme: dark)", color: "#1A2421" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const globalContent = await content.getGlobalContent();

  return (
    <html lang="en-NG" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <SiteHeader content={globalContent} />
          {children}
          <SiteFooter content={globalContent} />
        </ThemeProvider>
      </body>
    </html>
  );
}
