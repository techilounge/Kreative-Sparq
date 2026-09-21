import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { defaultSocial } from '@/lib/seo/metadata';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = defaultSocial.imageAlt;

/**
 * The branded default social card: the approved dark-mode logo on Dark Forest,
 * with the tagline set in the display face. The logo is the supplied artwork,
 * not lettering rebuilt in CSS, and no body copy is crammed into the image.
 */
export default async function OpenGraphImage() {
  const logo = await readFile(
    join(process.cwd(), 'public', 'brand', 'kreative-sparq-logo-dark.png'),
  );
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#1A2421',
        padding: '72px 80px',
      }}
    >
      <img src={logoSrc} alt="" height={104} width={250} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            width: 120,
            height: 4,
            backgroundColor: '#F06A3C',
            display: 'flex',
          }}
        />
        <div
          style={{
            color: '#F4F5F2',
            fontSize: 62,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            maxWidth: 900,
            display: 'flex',
          }}
        >
          Ideas that move people. Marketing that moves business.
        </div>
        <div style={{ color: '#B8C0BB', fontSize: 28, display: 'flex' }}>
          Marketing agency in Nigeria
        </div>
      </div>
    </div>,
    size,
  );
}
