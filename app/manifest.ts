import type { MetadataRoute } from 'next';

import { themeColors } from '@/lib/theme';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kreative Sparq',
    short_name: 'Kreative Sparq',
    description:
      'Strategy, creative, digital marketing, websites, and campaigns for brands ready to move with purpose.',
    start_url: '/',
    display: 'standalone',
    background_color: themeColors.light,
    theme_color: themeColors.dark,
    lang: 'en-NG',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
