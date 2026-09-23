# Phase 10 Lighthouse evidence

Generated 23 September 2026 with Lighthouse 13.5.0 and Playwright's bundled Chromium against the local Next.js production build.

## Configuration

- Mobile: 390 × 844 CSS pixels, device scale factor 2, simulated 150 ms RTT, 1,638.4 Kbps throughput, and 4× CPU slowdown.
- Desktop: 1440 × 900 CSS pixels, device scale factor 1, simulated 40 ms RTT, 10,240 Kbps throughput, and 2× CPU slowdown.
- Categories: Performance, Accessibility, Best Practices, and SEO.
- Routes: homepage, Brand Strategy, Work, and the public Contact page.

## Scores

| Route | Profile | Performance | Accessibility | Best Practices | SEO |
| --- | --- | ---: | ---: | ---: | ---: |
| `/` | Mobile | 98 | 100 | 100 | 100 |
| `/` | Desktop | 100 | 100 | 100 | 100 |
| `/services/brand-strategy` | Mobile | 95 | 100 | 100 | 100 |
| `/services/brand-strategy` | Desktop | 100 | 100 | 100 | 100 |
| `/work` | Mobile | 99 | 100 | 100 | 100 |
| `/work` | Desktop | 100 | 100 | 96 | 100 |
| `/contact` | Mobile | 95 | 100 | 100 | 100 |
| `/contact` | Desktop | 100 | 100 | 96 | 100 |

## Findings and options

All eight runs scored 100 for Accessibility and SEO. Performance was 95–99 on mobile and 100 on desktop. The desktop Work and Contact runs scored 96 for Best Practices because Lighthouse reports the responsive logo derivative's rounded dimensions as an aspect-ratio mismatch. The image remains visually undistorted in the inspected screenshots and is correctly described; serving the full-size source unoptimized or adding a purpose-sized logo asset would remove the derivative rounding at a bandwidth or asset-maintenance cost. That optional asset refinement is not required for this static launch.

Lighthouse also reports typical lab opportunities around render-blocking styles, framework JavaScript, request dependency chains, and occasional forced reflow. No run showed layout shift above 0.001, and the measured mobile LCP values remained within the range represented by the 95–99 scores. Corrective options include further reducing shared client JavaScript and creating purpose-sized brand assets; these should be measured against the current small interactive footprint before changing the approved design.

`summary.json` contains the exact configuration, scores, metrics, and non-perfect audits. The eight `*.report.json` files are the unabridged machine-readable Lighthouse results. These are local lab measurements rather than field Core Web Vitals and may vary slightly across runs.
