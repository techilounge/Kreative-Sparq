# Phase 9 launch-readiness report

Updated 23 September 2026.

## Decision

**Release blocked. The review build is not production-ready.**

Phase 9 hardening is complete on `codex/editorial-rebuild`, but Phase 8 approved only truthful fallback routes. Contact, project-brief submission, booking, confirmation, final legal policies, email delivery, lead storage, spam protection, rate limiting, and conversion measurement remain unavailable or unresolved. No release or merge to `main` is authorized.

## Verified review baseline

- Seventeen public review routes render statically, plus the approved 404.
- Ten informational routes are indexable: `/`, `/services`, the six approved service detail routes, `/work`, and `/about`.
- Seven unavailable or incomplete routes emit `noindex,follow` and are absent from the sitemap: `/insights`, `/contact`, `/start-a-project`, `/book`, `/thank-you`, `/privacy`, and `/terms`.
- `robots.txt` permits crawling so route-level `noindex` directives can be read; it advertises the sitemap, whose URL set is checked exactly against `content/site-routes.json`.
- Every public route has a unique title, description, canonical URL, truthful Open Graph data, and Twitter-card metadata. A code-generated brand social image avoids fabricated client proof.
- Service detail pages retain truthful `Service` and visible-breadcrumb data. Pages without matching visible or factual content emit no speculative schema.
- Security response headers disable MIME sniffing, framing, camera, microphone, and geolocation and apply a strict-origin referrer policy.
- An enforced Content Security Policy allows only same-origin runtime resources, frames no origin, permits no object or worker source, and contains no wildcard or anticipated-provider domain. Static Next.js hydration currently requires `'unsafe-inline'` for scripts and styles; a nonce or hash-based production policy remains a Phase 10 release blocker.
- Error boundaries and the 404 provide a usable recovery path without exposing technical detail.

## Phase 9 evidence

| Area                        | Result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Responsive and theme matrix | 238 route states passed: all 17 routes at 360, 375, 390, 768, 1024, 1440, and 1920 px in Light and Dark. No horizontal overflow was found.                                                                                                                                                                                                                                                                                                                                                            |
| Accessibility               | 68 axe scans passed with zero reported violations: all 17 routes at 360 and 1440 px in both themes. Keyboard order, visible focus, mobile-menu Escape/focus restoration, and 44 px controls were checked. Automated scanning does not establish complete accessibility conformance.                                                                                                                                                                                                                   |
| Theme and reduced motion    | Theme persistence, System-mode response, and Light/Dark rendering passed. Every route exposes its complete content with reduced motion; the short hero entrance uses transforms without transient text opacity.                                                                                                                                                                                                                                                                                       |
| Runtime quality             | The site-wide validator found no browser page errors, failed assets, unexpected console errors, hydration warnings, broken internal links, or unresolved placeholder syntax. Every linked route returned its expected status.                                                                                                                                                                                                                                                                         |
| Metadata and crawling       | Canonicals, robots directives, unique metadata, Open Graph/Twitter data, schema rules, sitemap membership, and draft-detail 404/noindex behavior passed.                                                                                                                                                                                                                                                                                                                                              |
| Content integrity           | Runtime and source review found no fake client, logo, statistic, testimonial, award, case study, campaign result, team profile, contact detail, legal claim, or success confirmation. Generated people remain fictional editorial subjects.                                                                                                                                                                                                                                                           |
| Visual evidence             | The reproducible full matrix was generated and inspected, then removed from Git. `qa/phase9/representative/` retains 12 review captures covering homepage, service detail, Work, Insights, Contact, Privacy, Terms, and 404 states across both themes and mobile/desktop sizes. Full regeneration writes to ignored `qa/phase9/generated/sitewide/`.                                                                                                                                                  |
| Genuine Lighthouse          | Lighthouse 13.5.0 audited `/`, `/services/brand-strategy`, `/work`, and `/contact` in mobile and desktop profiles. Mobile Performance was 94–98; desktop was 99–100. Accessibility was 100 throughout. Best Practices was 100 except two desktop 96 results from the hidden alternate logo's rounded derivative ratio. SEO was 100 on indexable routes and 69 on the intentionally noindex Contact fallback. Raw LHR JSON, exact configuration, failures, and options are in `qa/phase9/lighthouse/`. |
| Supplemental timing         | `qa/phase9/performance-audit.json` retains the all-route local unthrottled measurements: LCP 56–176 ms, CLS 0.000, total blocking time 0–33 ms, and mobile-menu first paint 34 ms. It is supplemental evidence only, not Lighthouse or field data.                                                                                                                                                                                                                                                    |

## Content Security Policy and external resources

The current browser runtime needs only the site origin. Fonts are self-hosted through `next/font`; all photographs, logos, icons, manifest files, scripts, styles, metadata images, navigation requests, and route data are same-origin. The only stored browser value is the local colour-theme preference. No third-party script, image, frame, form action, or browser API destination is active.

The enforced review policy is: `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'self'; media-src 'self'; frame-src 'none'; worker-src 'none'; manifest-src 'self'`. The validator requires these directives, rejects `*`, and rejects pre-authorization of anticipated domains. Site-wide browser and Lighthouse runs completed under this header without CSP resource failures.

| Anticipated service | Potential domains and CSP effect                                                                                                                                 | Current decision                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Cal.com booking     | Exact approved Cal.com event/embed origins may require `frame-src`, `script-src`, and `connect-src`.                                                             | Unknown and blocked. Do not allow `cal.com` or a wildcard until the integration mode and exact hosts are approved. |
| Turnstile           | `https://challenges.cloudflare.com` may require script, frame, and connection permission.                                                                        | Proposed only. Not allowed.                                                                                        |
| Lead storage        | An exact Supabase project host may require `connect-src` if the browser talks to it; a server-only design would not.                                             | Provider and architecture unresolved. No `*.supabase.co` wildcard.                                                 |
| Transactional email | `https://api.resend.com` would normally be server-to-server and should not enter browser CSP.                                                                    | Provider and destination unresolved. Not allowed.                                                                  |
| Analytics           | Vercel Analytics/Speed Insights may use `va.vercel-scripts.com` and `vitals.vercel-insights.com`; optional GA4 may use Google Tag Manager and Analytics origins. | No measurement provider is approved or installed. No analytics domain is allowed.                                  |
| CMS/media           | Exact Sanity project/API or CDN origins could affect `connect-src` or `img-src`.                                                                                 | No CMS is approved. No Sanity domain is allowed.                                                                   |

Two CSP matters block a final production policy: approved external providers and exact hosts are unknown, and Next's static inline bootstrap currently requires `'unsafe-inline'`. Phase 10 must choose the actual integrations, keep server-only providers out of browser policy, replace inline allowances with nonces or verified hashes where practical, and rerun the complete browser and Lighthouse audits. Broad wildcards must not be introduced.

## Release blockers

### Inquiry and project brief

- Approve a monitored public contact method, receiving mailbox or endpoint, and accountable lead owner.
- Choose the submission and lead-storage destination and document access, retention, deletion, and incident ownership.
- Approve server-side validation, spam protection, rate limiting, failure handling, and visitor-facing error copy.
- Confirm budget bands, response expectations, consent wording, and any required privacy acknowledgement.
- Test successful and failed delivery end to end before either route can become operational or indexable.

### Booking

- Supply and approve the real 30-minute calendar destination, owner, availability rules, timezone behavior, and privacy settings.
- Confirm the booking provider and its data flow in the privacy policy.
- Test successful booking, cancellation, unavailable-slot, embed or redirect failure, keyboard, mobile, and announcement behavior.

### Legal publication

- Confirm the legal business name, public or registered address decision, legal contact, and privacy contact.
- Document the actual providers and data flows, lawful bases, cookies and local storage, international transfers, retention periods, rights process, governing law, dispute position, liability terms, and effective dates.
- Obtain appropriate legal review of final Privacy and Terms text after the production feature set is fixed.

### Measurement and release operations

- Decide whether analytics and conversion tracking will be used, who owns the properties, which events are collected, and what consent or disclosure is required. No analytics or pixels are currently installed.
- Configure production environment ownership, domain and DNS, monitoring, rollback, and post-release verification only in an approved release phase.
- Re-run the complete validation suite against the production candidate after conversion, booking, legal, and any measurement changes.

## Current safe behavior

`/contact`, `/start-a-project`, and `/book` state that their online functions are unavailable. `/thank-you` states that no submission was recorded. `/privacy` and `/terms` disclose review status and only the behavior implemented in this build. `/insights` remains a pre-publication page with no articles, filters, newsletter, or Article structured data. All seven routes are excluded from the sitemap and emit `noindex,follow`.

## Gate

Phase 9 may be approved as a hardening checkpoint while the release remains blocked. Do not merge into `main`, deploy a production release, enable submissions or tracking, or begin Phase 10 without explicit approval and resolution of the applicable blockers above.
