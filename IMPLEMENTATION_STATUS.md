# Implementation status

Updated 24 September 2026.

## Current checkpoint: lean launch candidate with Editorial Image Pack v3

The user approved Phase 9 and its final positioning correction, then replaced the former integration-heavy Phase 10 plan with an email-only lean launch. On 24 September 2026, the user supplied Editorial Image Pack v3 and made it authoritative over earlier imagery instructions. The lean candidate and v3 imagery checkpoint are implemented on `codex/editorial-rebuild` and await final visual approval. They have not been merged to `main` or promoted to production.

### Editorial Image Pack v3

- Added image-led heroes to `/services`, all six service details, `/work`, `/about`, `/insights`, `/contact`, `/privacy`, and `/terms`. The five non-Content service details reuse their existing approved WebPs as single hero backgrounds.
- Installed `services-overview-hero.webp`, `work-hero.webp`, `about-hero.webp`, `insights-hero.webp`, `contact-hero.webp`, `legal-shared-hero.webp`, `work-process-support.webp`, `about-relationship-support.webp`, `insights-notes-support.webp`, `contact-collaboration-support.webp`, and `service-content-social-v2.webp` under `public/images/editorial/`.
- Replaced the old phone-led Content & Social Media image on the `/services` catalogue and `/services/content-social-media` hero with the camera-led v2 asset. The locked homepage still uses its accepted v1 image and composition.
- Added one reusable optimized hero-media layer, independent desktop/mobile focal positions, semantic Light/Dark overlays, and four route-specific support placements. Hero images preload at quality 80; support images remain lazy. No image-specific animation was added.
- All depicted people remain fictional editorial subjects. No image is presented as staff, client work, a testimonial, a partnership, a case study, a campaign result, or completed work.
- PNG source masters remain under `Kreative_Sparq_Editorial_Image_Pack_v3/originals/`; they are not served by the website.

### Contact and route behavior

- `/contact` is a complete, indexable public page sourced from the approved copy deck. It displays a prominent `mailto:hello@kreativesparq.com` action and states a response expectation of within two business days.
- The site has no contact form, project form, lead store, notification service, spam tool, calendar, or submission-success flow.
- `/start-a-project` and `/book` return permanent HTTP 308 redirects to `/contact`.
- `/thank-you` has been removed and returns the standard noindex 404.
- Every public navigation and call to action links directly to a valid public route. Booking language and unavailable-status language are absent.

### Privacy and Terms

`/privacy` and `/terms` are complete, indexable pages generated from chapters 23 and 24 of `Kreative_Sparq_Website_Copy_Claude_Code.md`. Both use `legal@kreativesparq.com` and an effective date of 23 September 2026.

The Privacy Policy accurately covers the current site: voluntary email correspondence, local theme preference, limited hosting request/security processing, external links, security, rights, updates, and contact. The Terms accurately cover informational use, content ownership, permitted and prohibited use, third-party links, information limitations, no automatic client relationship, reasonable liability limits, Nigerian law, updates, and contact. Neither page invents an address, registration, provider, or unused data flow.

### Search, metadata, and security

`content/site-routes.json` defines thirteen indexable routes and one noindex route. Contact, Privacy, and Terms are in the sitemap. Insights remains `noindex,follow` and outside the sitemap while zero articles are public. Redirect and removed routes do not enter the sitemap.

The static site retains its same-origin CSP and security headers. No Supabase, Resend, Turnstile, Cal.com, analytics, advertising, consent, or CMS dependency was added. Public email audit rules accept only the `kreativesparq.com` domain.

`vercel.json` pins the project framework to Next.js. This corrects the existing Vercel project's “Other” preset, which otherwise completed the build but deployed only static files from `public/` and returned a platform 404 for application routes.

### Design and content integrity

The approved homepage, Services, Work, About, and Insights design direction remains unchanged. Launch work is limited to the conversion/legal routes, direct contact links, route metadata, validation, and documentation. No damaged reference effect, fake client, logo, statistic, testimonial, award, case study, campaign result, team profile, guarantee, or unsupported claim was added. All people in supplied imagery remain fictional editorial subjects.

## Launch validation

The final run records exact command results here after implementation QA completes.

| Check                                         | Result                                                                                                                                             |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lint, TypeScript, formatting, copy extraction | Passed: ESLint, strict TypeScript, Prettier, and all three source-deck drift checks                                                                |
| Production build                              | Passed: 20 static outputs; Contact, Privacy, and Terms prerendered; no legacy conversion page generated                                            |
| Playwright and route checks                   | Passed: 39 browser tests plus Services, editorial, lean-launch, site-wide, and performance validators                                              |
| Axe accessibility                             | Passed: 56 site-wide scans, 28 Services scans, 12 editorial scans, and 12 launch-route scans with zero reported violations                         |
| Responsive Light/Dark review                  | Passed: existing 14 routes × 7 widths × 2 themes = 196 site-wide states; v3 matrix adds 13 changed routes × 5 widths × 2 themes = 130 states, with 14 retained representative captures |
| Broken links, redirects, email-domain audit   | Passed: all internal links valid; legacy CTA links absent; two HTTP 308 redirects; `/thank-you` 404/noindex; public emails use `kreativesparq.com` |
| Lighthouse mobile and desktop                 | Passed after v3: Performance 94–99 mobile and 100 desktop; Accessibility 100; SEO 100; Best Practices 100 except the unchanged desktop 96 logo-ratio findings on Work and Contact |
| Vercel preview                                | Ready and route-verified at `https://kreative-sparq-git-codex-editorial-cc483f-techilounges-projects.vercel.app/`                                  |

Editorial imagery evidence is retained in `qa/editorial-imagery/`: representative screenshots, `capture-report.json`, and genuine throttled Lighthouse reports. The reproducible 130-capture matrix remains excluded from Git. The pre-v3 Lighthouse baseline is retained in `qa/phase10/lighthouse/`; the post-v3 comparison is in `qa/editorial-imagery/lighthouse/`:

| Route | Mobile Performance before → after | Desktop Performance | Accessibility / SEO | Note |
| --- | ---: | ---: | ---: | --- |
| `/` | 98 → 99 | 100 → 100 | 100 / 100 | Homepage code and imagery unchanged; ordinary lab variance |
| `/services/brand-strategy` | 95 → 95 | 100 → 100 | 100 / 100 | Existing service image moved into the hero background |
| `/work` | 99 → 94 | 100 → 100 | 100 / 100 | New hero and one lazy support image; mobile LCP 3.0 s |
| `/contact` | 95 → 95 | 100 → 100 | 100 / 100 | New hero and one lazy support image; mobile LCP 3.0 s |

All post-v3 Lighthouse runs report CLS 0. The two desktop Best Practices scores of 96 are caused by the existing hidden dark-logo derivative rounding from 1944 × 809 to 256 × 107; this is unchanged from the pre-v3 baseline and does not involve the editorial images.

## Approved phase baseline

- Phase 1: visual translation and design system
- Phase 2: technical foundation and global shell
- Phase 3: homepage Light mode
- Phase 4: Dark mode, motion, and responsive refinement
- Phase 5: homepage acceptance and design-system extraction
- Phase 6: Services overview and six service routes
- Phase 7: Work, About, Insights, and corrected zero-publication state
- Phase 8: truthful fallback routes, superseded here by the approved lean contact/legal release
- Phase 9: site-wide hardening, realistic Lighthouse evidence, CSP, QA artifact reduction, and geography-neutral positioning

Earlier phase evidence remains in the corresponding `qa/phaseN/` directories and Git history. The current launch decisions in `CONTENT_REQUIREMENTS.md` and `LAUNCH_READINESS.md` supersede earlier unresolved integration plans.

## Gate

Stop after the preview, commit, and push. Final visual approval is required before merging into `main` or promoting the deployment to production.
