# Phase 9 Lighthouse audit

Generated 23 September 2026 with Lighthouse 13.5.0 against the local Next.js production build and Playwright's bundled Chromium. Raw Lighthouse Result (LHR) JSON files and the consolidated `summary.json` are retained beside this report.

## Configuration

| Profile | Emulation                                                                | Network                                                              | CPU         |
| ------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------- | ----------- |
| Mobile  | 390 × 844 CSS px, device scale 2, mobile user agent and scoring          | Lighthouse simulated throttling: 150 ms RTT, 1,638.4 Kbps throughput | 4× slowdown |
| Desktop | 1440 × 900 CSS px, device scale 1, Lighthouse desktop preset and scoring | Lighthouse simulated throttling: 40 ms RTT, 10,240 Kbps throughput   | 2× slowdown |

Each run audited Performance, Accessibility, Best Practices, and SEO. Full-page screenshot capture was disabled to keep the reports compact. These are genuine Lighthouse lab runs with realistic simulated throttling. They are not field Core Web Vitals and may vary with host hardware.

## Scores and metrics

| Route                      | Profile | Performance | Accessibility | Best Practices | SEO |   FCP |   LCP |    TBT | CLS | Speed Index |
| -------------------------- | ------- | ----------: | ------------: | -------------: | --: | ----: | ----: | -----: | --: | ----------: |
| `/`                        | Mobile  |          93 |           100 |            100 | 100 | 0.9 s | 3.2 s | 70 ms |   0 |       0.9 s |
| `/`                        | Desktop |         100 |           100 |            100 | 100 | 0.3 s | 0.6 s | 10 ms |   0 |       0.3 s |
| `/services/brand-strategy` | Mobile  |          96 |           100 |            100 | 100 | 0.9 s | 2.8 s | 30 ms |   0 |       0.9 s |
| `/services/brand-strategy` | Desktop |         100 |           100 |            100 | 100 | 0.3 s | 0.7 s | 50 ms |   0 |       0.4 s |
| `/work`                    | Mobile  |          99 |           100 |            100 | 100 | 0.9 s | 2.1 s | 70 ms |   0 |       0.9 s |
| `/work`                    | Desktop |         100 |           100 |             96 | 100 | 0.3 s | 0.6 s | 10 ms |   0 |       0.3 s |
| `/contact`                 | Mobile  |          96 |           100 |            100 |  69 | 0.9 s | 2.8 s | 50 ms |   0 |       0.9 s |
| `/contact`                 | Desktop |         100 |           100 |             96 |  69 | 0.3 s | 0.6 s | 60 ms |   0 |       0.3 s |

## Findings and corrective options

### Performance

- The slowest measured mobile LCP is 3.2 seconds on the homepage. The mobile scores are 93–99, with no layout shift and 30–70 ms total blocking time. The homepage score is lower than the prior local run, illustrating normal lab-run variance; it remains an optimization candidate rather than field evidence.
- Lighthouse identifies the two route CSS files as render blocking, with about 300 ms estimated mobile savings. A later optimization may test carefully inlined critical CSS or route-level CSS reduction. Any change must preserve the locked theme and avoid duplicating CSS in HTML.
- Lighthouse reports about 14 KiB of legacy JavaScript and about 27 KiB of potentially unused framework/client JavaScript. Corrective work may further limit client components and retest after Next.js browser-target changes. The current interactive theme and menu shell already confines client code to proven interactions.
- The Phase 9 correction added responsive `sizes` values to the shared logo. The earlier audit had downloaded a 1944 px image for a 180–225 px mark and estimated 93–118 KiB of waste; the final reports no longer flag image-delivery savings.

### Best Practices

- The desktop Work and Contact runs score 96 because `image-aspect-ratio` flags the hidden dark-mode logo. The rendered node is `display:none` at 0 × 0, and Lighthouse compares its 1944 × 809 source ratio with Next's rounded 256 × 107 derivative. No visible logo is distorted. Corrective options are an approved vector logo, a dedicated small raster whose exact dimensions survive optimizer rounding, or a theme-loading approach that does not place the inactive image in the DOM.
- Lighthouse's informative CSP audit passes but reports that `script-src 'unsafe-inline'` weakens XSS protection. Next's statically generated hydration and theme bootstrap currently require inline scripts. A nonce or hash-based production policy is a Phase 10 release blocker.

### SEO

- Homepage, service detail, and Work score 100 in both profiles.
- `/contact` scores 69 because Lighthouse correctly detects `noindex,follow`. This is intentional while no monitored destination, storage, spam protection, rate limiting, or approved response process exists. Removing `noindex` merely to raise the score would be misleading. Re-audit after the operational flow and legal disclosures are approved.

### Accessibility

All eight Lighthouse accessibility categories score 100. This supplements, but does not replace, the site-wide axe, keyboard, focus, zoom-equivalence, reduced-motion, and responsive checks.

## Raw evidence

- `home-{mobile,desktop}.report.json`
- `brand-strategy-{mobile,desktop}.report.json`
- `work-{mobile,desktop}.report.json`
- `contact-{mobile,desktop}.report.json`
- `summary.json`

The separate `qa/phase9/performance-audit.json` is retained only as supplemental local, unthrottled timing evidence.
