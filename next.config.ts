import type { NextConfig } from 'next';

const isProduction = process.env.VERCEL_ENV === 'production';

/**
 * Origins are listed only for tools that are actually wired up. Each entry is
 * gated on its environment variable so the policy stays as narrow as the
 * deployment's real configuration.
 */
function contentSecurityPolicy(): string {
  const calEnabled = Boolean(process.env.NEXT_PUBLIC_CAL_LINK);
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  const sanityEnabled = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

  const scriptSrc = ["'self'", "'unsafe-inline'"];
  const frameSrc = ["'self'"];
  const connectSrc = ["'self'"];
  const imgSrc = ["'self'", 'data:', 'blob:'];

  // Vercel Analytics and Speed Insights serve their scripts from the site origin
  // via a rewrite, but beacons are posted to vitals.vercel-insights.com.
  connectSrc.push('https://vitals.vercel-insights.com');

  if (calEnabled) {
    frameSrc.push('https://cal.com', 'https://app.cal.com');
    scriptSrc.push('https://app.cal.com');
    connectSrc.push('https://api.cal.com', 'https://app.cal.com');
  }

  if (turnstileEnabled) {
    scriptSrc.push('https://challenges.cloudflare.com');
    frameSrc.push('https://challenges.cloudflare.com');
  }

  if (sanityEnabled) {
    imgSrc.push('https://cdn.sanity.io');
    connectSrc.push('https://*.api.sanity.io', 'https://*.apicdn.sanity.io');
  }

  if (!isProduction) {
    // Next.js dev and preview tooling needs eval for fast refresh and overlays.
    scriptSrc.push("'unsafe-eval'");
    connectSrc.push('ws:', 'wss:');
  }

  return [
    "default-src 'self'",
    `script-src ${scriptSrc.join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src ${imgSrc.join(' ')}`,
    "font-src 'self' data:",
    `connect-src ${connectSrc.join(' ')}`,
    `frame-src ${frameSrc.join(' ')}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ');
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy() },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Canonical host handling lives in vercel.json so the redirect happens at
      // the edge before the application is invoked.
    ];
  },
};

export default nextConfig;
