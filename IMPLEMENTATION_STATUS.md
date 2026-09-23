# Implementation status

Updated 23 September 2026.

## Phase 8: Conversion and legal-route fallbacks — complete, awaiting approval

Phase 8 adds `/contact`, `/start-a-project`, `/book`, `/thank-you`, `/privacy`, and `/terms` without changing the accepted homepage or the Phase 6–7 routes. Chapters 19–24 of `Kreative_Sparq_Website_Copy_Claude_Code.md` are extracted to `content/conversion.json`; `pnpm copy:check` fails if that structured source drifts from the deck. Each route has unique, truthful metadata, a canonical URL, Open Graph fields, `noindex,follow`, and a visible breadcrumb with matching BreadcrumbList data.

The required receiving mailbox, lead owner, submission destination, approved budget bands, verified response window, Cal.com event URL, legal entity, legal contacts, provider/data-flow details, retention rules, policy dates, and legal review remain unresolved. The six routes therefore use the approved safe fallback mode: contact and project pages explain that online submissions are unavailable; booking explains that no calendar is connected; the thank-you route states that no submission was recorded; and Privacy and Terms publish status/current-operation summaries instead of incomplete legal clauses. No form control, submit action, calendar iframe, success claim, contact placeholder, legal placeholder, secret, or unapproved integration is rendered.

The `/thank-you` page is safe under direct access and ignores success-like query parameters. Privacy and Terms describe only the implementation that exists today: no inquiry storage, booking embed, analytics, marketing pixels, newsletter, payment, or client-service transaction; the local theme preference is disclosed. Footer navigation now includes the two real legal-route links. All six fallback routes remain out of search indexes until their content and function are approved for release.

**Fresh evidence:** `qa/phase8/conversion/` contains 84 complete screenshots: all six routes at 360, 375, 390, 768, 1024, 1440, and 1920 px in Light and Dark. Capture waits for the route heading, resolved theme, visible images, and fonts; returns to the top; rejects horizontal overflow; and then writes the full page. Visual review covered every route and each breakpoint family. A 1024 px footer overflow exposed by the first browser run was corrected by keeping its four link groups below the brand statement until 1280 px.

| Phase 8 check | Result |
|---|---|
| `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm copy:check` | Passed in final verification. |
| `pnpm build` | Passed; all six Phase 8 routes are statically generated without secrets or provider configuration. |
| `pnpm test` | Passed 28 Playwright tests and all Services, editorial, and conversion validators. The conversion validator checks all six routes at 360/768/1440 in both themes, metadata, schema, no overflow, internal links, keyboard focus, mobile-menu behavior, and direct thank-you access. |
| Axe | Phase 8 adds 24 zero-violation scans: every conversion/legal route at 360 and 1440 px in both themes. |
| Safe fallback paths | Tests reject forms, input/select/textarea controls, submit buttons, calendar iframes, unresolved placeholder syntax, false success copy, and unapproved schema. The thank-you route does not echo query values or claim a recorded submission. |
| Screenshots | `pnpm screenshots:conversion` completed 84/84 captures and exited cleanly. |

**Intentional deviations:** The deck describes future enabled forms, calendar, success flow, and policy drafts. Publishing those now would either discard visitor data or publish unresolved legal claims. Route-level status headings and availability explanations are factual implementation copy held in `content/conversion.ts`; they do not replace or silently alter the extracted source deck. The project-brief outline shows the approved future questions as read-only editorial content so visitors can understand what will be requested without being offered a nonfunctional form.

**Remaining release blockers:** approve and configure a monitored contact mailbox and owner; select the submission/storage destination and spam/rate-limit approach; approve budget bands and a response window; supply the 30-minute booking URL; confirm the legal entity, public/legal/privacy contacts, address decision, actual providers and data flows, retention rules, rights process, applicable law, policy dates, and legal review. These block enabling conversions and publishing final legal policies, but they do not block review of the truthful Phase 8 fallback experience.

**Scope and gate:** No Phase 9 SEO/performance/release work, analytics, CMS, live submission, booking integration, or legal publication was added. Commit and push only to `codex/editorial-rebuild`; do not merge into `main`. Stop and ask: **Approve the conversion flows and proceed to Phase 9: SEO, performance, accessibility, and production QA?**

## Phase 7 correction record: Insights pre-publication state — complete and approved

Phase 7 adds three static public editorial routes: `/work`, `/about`, and `/insights`. Each uses the approved chapter from `Kreative_Sparq_Website_Copy_Claude_Code.md`, with unique metadata, canonical URL, Open Graph fields, theme treatment, responsive composition, and internal links. `pnpm copy:check` now verifies these editorial chapters as well as all Services copy.

`/work` publishes the approved case-study empty state, results-integrity note, and calls to action without a project card, client, outcome, date, quote, or project image. No `/work/[slug]` route exists. `/about` publishes the approved agency point of view, beliefs, audiences, working relationship, service area, and CTA; the unresolved Team section is absent. `/insights` now publishes the approved pre-publication status from the amended source deck. Its hero has no action while zero articles are public, and its metadata is `noindex,follow`. Categories, filter copy, featured article, newsletter form, and article cards are absent because no article is publication-ready and no newsletter integration exists. No `/insights/[slug]` route exists.

The three supplied article drafts remain unpublished because their author fields, original examples, update dates, and editorial approvals are unresolved. Known draft slugs and guessed Work/Insights slugs return the approved 404 with no Article or CaseStudy data. The optional editorial images remain in the reference package: omitting them avoids implying that a fictional subject is staff, a client, an author, or a case-study participant.

**Phase 6 follow-ups:** Phase 5 is now recorded as approved. Every Services route now verifies that the mobile menu opens, exposes its dialog, locks body scrolling, has no open-menu overflow, closes with Escape, and restores focus to its trigger. The expanded Services validation passed before Phase 7 implementation and again in the final suite.

**Fresh correction evidence:** `qa/phase7/editorial/` contains 42 complete full-page captures: Work, About, and Insights at 360, 375, 390, 768, 1024, 1440, and 1920 px in Light and Dark. The 14 Insights files were regenerated after the correction. Capture waits for the heading, resolved theme, visible images, and fonts, checks horizontal overflow, and then writes the full page.

| Phase 7 check | Result |
|---|---|
| `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm copy:check` | Passed in final verification. |
| `pnpm build` | Passed; `/work`, `/about`, and `/insights` are statically generated. No case-study or article detail route is generated. |
| `pnpm test` | Passed 28 existing Playwright tests, all 7 Services routes, and all 3 editorial routes. The editorial validator covers 3 widths, both themes, keyboard order, visible focus, mobile-menu behavior, images, links, metadata, schema, and HTTP status. Insights-specific checks require the new state, reject browse/filter copy and Article data, require `noindex,follow`, and verify article 404s are `noindex`. |
| Axe | Services retained 28 zero-violation scans. Phase 7 added 12 zero-violation scans: every editorial route at 360 and 1440 px in both themes. |
| Unpublished protection | Six representative guessed/draft detail URLs return 404; all known and guessed article URLs emit `noindex`; public-page HTML contains no link to them and no Article or CaseStudy structured data. No sitemap exists; the validator will reject `/insights` if a future sitemap includes it while zero articles are public. |
| Screenshots | `pnpm screenshots:editorial` completed 42/42 captures and exited cleanly. |

**Publication-state distinction:** Pre-publication applies while zero articles are approved and uses the dedicated review-in-progress copy with no hero action, filters, cards, or newsletter form. The separate filter-empty copy remains in the source deck for a future populated index with functional category controls; it is not rendered today. The Team chapter is omitted rather than showing placeholders. Work and Insights publish BreadcrumbList data because a matching visible breadcrumb is present; Insights publishes no Article data, and About adds no structured data.

**Phase 9 follow-ups:** evaluate detail-page hero-image preload and LCP; decide whether the Services overview should show a visible breadcrumb or drop its BreadcrumbList data; complete actual browser zoom testing when a suitable GUI environment is available.

**Phase 7 approval record:** The corrected Insights state was approved before Phase 8 began. At that checkpoint the conversion and legal routes still returned the approved 404; their later implementation is recorded above.

## Phase 6 record: Services experience — complete and approved

Phase 6 adds the Services overview and all six approved service routes while keeping the accepted homepage unchanged. `/services` contains the approved problem-led service finder, service catalogue, engagement models, and calls to action. The detail routes are `/services/brand-strategy`, `/services/creative-design`, `/services/content-social-media`, `/services/performance-marketing`, `/services/web-design-development`, and `/services/campaigns-activations`.

The visible content is generated from chapters 7–13 of `Kreative_Sparq_Website_Copy_Claude_Code.md`. `pnpm copy:check` regenerates the structured source in memory and fails if `content/services.json` differs, so route copy remains tied to the approved deck. Each route has a unique title, description, canonical URL, Open Graph values, breadcrumb structured data, and truthful `Service` data on detail pages. Existing service WebPs are used as editorial illustrations with neutral alt text. No image is represented as client work, staff photography, campaign proof, or a testimonial.

The shared detail-page parts are limited to patterns proven across the six routes: breadcrumb, hero, chapter introductions, lists, process steps, FAQs, related services, and closing calls to action. The content controls the composition: image side, hero surface, chapter sequence, grid count, and statement treatment vary by service. The overview finder and detail-page rules are recorded in section 10 of `DESIGN_SYSTEM.md`.

**Fresh evidence:** `qa/phase6/services/` contains 42 complete full-page captures for the overview, Brand Strategy, and Performance Marketing at 360, 375, 390, 768, 1024, 1440, and 1920 px in Light and Dark modes. All were regenerated after implementation, after visible images and fonts loaded, and checked for horizontal overflow. The overview, a light editorial detail page, and a dark-led performance page provide meaningfully different compositions. Every route, including the four without a full screenshot matrix, received responsive, copy, image, keyboard, menu, link, metadata, structured-data, and accessibility checks.

| Phase 6 check | Result |
|---|---|
| `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm copy:check` | Passed in final verification. |
| `pnpm build` | Passed; the overview is static and all six service detail routes are statically generated. |
| `pnpm test` | Passed 28 existing Playwright tests, then validated 7 Services routes at 360/768/1440 in both themes. The portable runner starts or reuses the production server and has a bounded Windows Chromium teardown guard. |
| Axe | Zero reported violations in 28 scans: every Services route at 360 and 1440 px in both themes, using WCAG 2 A/AA, 2.1 A/AA, and 2.2 AA tags. Automated scanning remains one part of accessibility review. |
| Screenshots | `pnpm screenshots:services` completed 42/42 captures and exited cleanly. |

**Integrity and scope:** No damaged reference effect, fake client, logo, metric, result, award, testimonial, case study, staff profile, guarantee, or unsupported claim was added. Calls to `/book`, `/contact`, `/start-a-project`, and `/work` remain planned links that reach the approved 404 until their later phases. Work, About, Insights, booking, contact/project intake, CMS, analytics, and legal work remain outside Phase 6.

**Gate:** Commit and push this checkpoint only to `codex/editorial-rebuild`; do not merge into `main`. Stop and ask: **Approve the services experience and proceed to Phase 7: Work, About, and Insights?**

## Phase 5 record: Homepage acceptance and design-system extraction — complete and approved

The user approved Phase 4 and authorized Phase 5 only. The Light and Dark homepage baseline remains intact: no approved copy, image, section order, photography direction, or hero/section composition was replaced. The small accepted refinements are confined to narrow service rows and interaction QA. At 360–399 px, a 38% image column gives service text more room while preserving the 4:5 WebPs and all content. Repeated editorial links now keep their last word and arrow together and maintain a minimum 44 px target. The 360/375 Light pages are 73/46 px shorter than their Phase 4 captures, and the 390 Light page is only 5 px taller.

`HomeTextLink` is the one extracted homepage component, justified by its nine repeated uses across hero, services, Work, and final CTA. The remaining page chapters stay semantic markup. Dark pressed-button orange was adjusted to `#E66338` for about 4.71:1 contrast against its Dark Forest label; the background no longer animates during a theme switch, avoiding a transient low-contrast mix. The approved tokens, typography, grids, spacing, header/menu, controls, image crops, theme, motion, reduced-motion and keyboard states are locked in section 9 of `DESIGN_SYSTEM.md`.

**Fresh evidence:** `qa/phase5/home-{light,dark}-{360,375,390,768,1024,1440,1920}.png` holds 14 complete full-page captures. `qa/phase5/services-detail-{light,dark}-{360,375}.png` holds four 1:1 narrow-service review crops. The full-page capture test scrolls all nine images into view, waits for natural size and decode (including the footer logo), then waits for fonts. All seven widths and both themes were inspected against the approved baseline; width-by-width findings and accepted differences are in `VISUAL_QA.md`.

| Phase 5 check | Result |
|---|---|
| `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm build` | Passed in final verification. |
| `pnpm test` | Passed 28/28 bundled-Chromium tests and exited cleanly. The runner now uses two workers, a compact reporter, and a 180-second global timeout so a stalled suite cannot wait indefinitely. |
| Axe and keyboard | Zero reported violations for WCAG 2 A/AA, 2.1 A/AA, and 2.2 AA tags in desktop, closed mobile, and open mobile-menu scans in both themes. Theme persistence, menu Escape/focus return, reduced motion, and all specified hover/focus/active/pressed checks passed. Automated axe scope is limited. |
| Narrow service rows | All six images keep 4:5 frames at least 115 px wide at 360/375, links are at least 44 px high and remain inside the rows, and the full pages have no horizontal overflow. |
| 200% browser zoom | Actual GUI zoom was attempted in the in-app browser and headed Chrome, but the keyboard shortcuts did not change the measured CSS viewport or device scale. No true 200% GUI zoom result is claimed. The separate 720 × 450 CSS px/device-scale-2 CDP reflow-equivalence test passed in both themes. |

**Integrity:** The page contains none of the reference's damaged hero/footer effects, fake metrics/logos, unsupported client or campaign proof, fictional case study, or attributed testimonial. Hero and service people remain fictional editorial subjects; the optional concept/portrait files remain outside the page. Planned destination routes still show the approved 404 and are not live conversion paths.

**Files in this checkpoint:** `app/globals.css`, `app/home.css`, `app/page.tsx`, new `components/home-text-link.tsx`, `playwright.config.ts`, the renamed/expanded `tests/home-acceptance.spec.ts`, `DESIGN_SYSTEM.md`, `VISUAL_QA.md`, `README.md`, this status, and the 18 `qa/phase5/` images. The pre-existing deletion of `Kreative_Sparq_Claude_Code_Master_Prompt.md` remains unstaged and uncommitted.

**Gate:** Stop after committing and pushing only `codex/editorial-rebuild`. Do not merge into `main` or begin Services pages, other secondary routes, booking/contact integrations, CMS, analytics, or Phase 6 work. Ask: **Lock the homepage design system and proceed to Phase 6: Services pages?**

## Phase 4 record: Dark mode, motion, and responsive refinement — complete and approved

The user approved Phase 3 and authorized Phase 4 only. The approved homepage copy, sequence, hero and six service WebPs, and light-mode editorial composition remain intact. Every section now has its specified Dark Forest treatment, with the approved dark logo, semantic surface and border tokens, and restrained orange action, focus, and numbering accents. Photographs retain their natural colour; the dark hero crop is art-directed for the subject. The damaged reference effects remain absent.

The header theme control is visually integrated while retaining a labelled select, a 44 px target, and visible keyboard focus. Buttons, links, menu controls, and navigation have reviewed hover, focus, and pressed feedback in both themes. The only entrance motion is a short hero copy/image reveal; `prefers-reduced-motion: reduce` removes it and exposes the full page immediately. No looping, parallax, marquee, cursor, or scroll effects were added.

At 360–767 px, the six services use ruled, side-by-side image/text rows with controlled 4:5 image frames. This preserves all approved content and service order while reducing the 390 px full-page capture from 13,135 px in Phase 3 to 10,635 px in Phase 4 (about 19% shorter). Wider grids, the reference-led hero split, and the desktop section rhythm remain. The full visual comparison is in `VISUAL_QA.md`.

**Evidence:** `qa/phase4/home-{light,dark}-{360,375,390,768,1024,1440,1920}.png` contains 14 complete full-page Chromium/Windows captures from 22 September 2026. Before each screenshot, Playwright scrolls every visible image into view, waits for natural dimensions and decode, verifies the footer logo, and waits for fonts. Viewport heights are 844 px below 600 width, 1024 px at 768, and 900 px from 1024 upward; device scale is 1. Both themes were visually inspected at all seven widths. No horizontal overflow was detected.

| Phase 4 check | Result |
|---|---|
| `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm build` | Passed in final verification. |
| `pnpm test` | Passed: 28 Chromium tests, including all 14 screenshot widths/themes, shell checks, theme persistence, image loading, keyboard/menu checks, and horizontal overflow. |
| Axe (`@axe-core/playwright`) | No reported violations for WCAG 2 A/AA, 2.1 A/AA, and 2.2 AA tags in Light/Dark desktop, closed mobile page, and open mobile menu scans. Automated scans do not replace a full manual accessibility audit. |
| Reduced motion and states | Both themes passed immediate-content, no-animation, hover, focus, pressed, and secondary-link checks. |
| 200% zoom-equivalent | Both themes passed a 720 × 450 CSS viewport at device scale 2, representing a 1440 × 900 screen at 200% zoom for layout reflow. Chromium headless keyboard zoom did not change the zoom level, so this is a CDP layout-equivalence test, not a claim of GUI zoom inspection. |

**Files in this checkpoint:** `app/globals.css`, `app/home.css`, `tests/home.spec.ts`, new `tests/phase4.spec.ts`, `package.json`, `pnpm-lock.yaml`, 14 `qa/phase4/` screenshots, `DESIGN_SYSTEM.md`, `VISUAL_QA.md`, `CONTENT_REQUIREMENTS.md`, `README.md`, and this status. The pre-existing deletion of `Kreative_Sparq_Claude_Code_Master_Prompt.md` remains unstaged and uncommitted.

**Scope and next gate:** Homepage design is complete for review. Planned secondary destinations still show the approved 404, and booking, project intake, contact, legal, CMS, and articles remain for separately approved phases. Do not begin those or merge into `main`. Stop at: **Approve the completed homepage before it becomes the design source for the rest of the site?**

## Phase 3 record: light-mode homepage — complete and approved

The user approved Phase 2 and authorized Phase 3 only. The complete approved homepage sequence is implemented in light mode: split hero; truthful capability chapter in place of fake metrics/client logos; six image-led services; prominent Work empty state in place of a fictional case study; Why; four-step Process; Audience; labelled agency point of view in place of a fake testimonial; final CTA; and the existing global footer. Insights is omitted because no article is approved for publication. The damaged hero and footer effects are absent. The optional featured concept and philosophy portrait are not used, so no fictional person appears as a client, staff member, or speaker.

The seven required WebPs are copied to `public/images/home/` and rendered through `next/image`; all PNG source masters remain in the supplied `originals/` folder. Hero is preloaded; the six service images are lazy-loaded with 4:5 frames, intrinsic dimensions, responsive `sizes`, visual alt text, and individual focal positions. The approved copy is unchanged. The Work section omits the normal case-study description and “See all work” action because the exact approved homepage empty state is active; this is a documented conditional-copy choice, not a rewrite.

The Playwright foundation correction is complete: bundled Chromium is the default. `pnpm browser:install` installs it, `pnpm test` starts or reuses a production test server on port 3100 after `pnpm build`, and `pnpm test:edge` is optional. The runner cleans up only a server it started. The standard Chromium command passed in both reuse and self-start modes. `qa/phase3/home-light-{390,768,1024,1440}.png` are full-page screenshots from Chromium/Windows on 21 September 2026, with viewport heights 844, 1024, 768, and 900 px respectively. The section comparison and deviations are recorded in `VISUAL_QA.md`.

| Phase 3 check | Result |
|---|---|
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| `pnpm format:check` | Passed after final formatting |
| `pnpm build` | Passed; homepage statically generated |
| `pnpm test` | Passed: 6 Chromium tests, including four required widths, image loading, keyboard/theme shell smoke, and horizontal-overflow checks. Both server modes verified. |

**Files in this checkpoint:** `app/page.tsx`, `app/home.css`, `content/local.ts`, `content/types.ts`, `components/brand-logo.tsx`, `public/images/home/` (seven WebPs), `playwright.config.ts`, `scripts/run-browser-tests.mjs`, `tests/home.spec.ts`, `tests/shell.spec.ts`, `package.json`, `.gitignore`, `README.md`, `IMPLEMENTATION_STATUS.md`, `VISUAL_QA.md`, `REFERENCE_MANIFEST.md`, `CONTENT_REQUIREMENTS.md`, and four `qa/phase3/` screenshots. The pre-existing deletion of `Kreative_Sparq_Claude_Code_Master_Prompt.md` remains unstaged and uncommitted.

**Limits and next gate:** Secondary destinations still show the approved 404, and the booking/project/contact paths are not integrated. Dark-mode visual refinement, finished motion, broader responsive/axe/zoom testing, secondary routes, and integrations belong to later approved phases. Stop at: **Approve the light-mode homepage direction and proceed to Phase 4: Dark mode, motion, and responsive refinement?** No merge into `main` is authorized.

## Phase 2 record (historical)

### Phase 2 approval state

**Phase 2: Technical foundation and global shell — completed and approved before Phase 3.** At that time, the user had approved Phase 1 and authorized Phase 2 only. Homepage reconstruction and supplied image placement followed in Phase 3; secondary route content, conversion integrations, and release remain outside it. The branch is `codex/editorial-rebuild`; the historical Claude prompt deletion remains a separate, unstaged user worktree change. Each completed phase is to be committed and pushed to this branch, with no merge into `main`.

## Completed work

- Created a Next.js 16 App Router foundation in place with React 19, strict TypeScript, Tailwind CSS 4/PostCSS, ESLint, Prettier, pnpm 11 lockfile, Node 24 engine, and scripts for development, build, lint, typecheck, formatting, and Playwright. The chosen Node major is supported by Vercel. The project builds without secrets.
- Added Newsreader and Plus Jakarta Sans through `next/font`, semantic palette and theme variables, responsive container and spacing primitives, visible focus styles, a skip link, reduced-motion behavior, and light/dark/system handling. The selected mode persists; system mode responds to an OS-preference change. The resolved mode updates browser theme-color metadata.
- Added a typed local content source behind `content/index.ts`, allowing a later approved CMS adapter to replace the source without changing page consumers. All displayed brand, navigation, footer, and introductory wording comes from the approved copy deck.
- Copied the supplied light and dark PNG logos to `public/brand/` and used them by theme. Copied the supplied favicon ICO, SVG, PNG sizes, apple-touch icon, manifest, and manifest icons to `public/`. Source assets remain in their reference locations.
- Built the global header, desktop navigation, theme selector, accessible native-dialog mobile menu, and dark footer shell. The mobile menu has Escape closing, focus restoration, modal focus handling, scroll lock, a visible theme selector, and 44 px controls. Added the approved 404 state for routes that are not yet built.
- Added a minimal home content slot with approved introductory copy so the shell can be reviewed and tested. It is deliberately not the Phase 3 homepage hero or section composition. No homepage editorial WebPs or PNG masters are used in this phase.
- Added `.env.example`, a root `README.md`, and Playwright browser tests with review screenshots. There is no booking integration, form, CMS, analytics, or other paid service configuration.
- Next.js generated `AGENTS.md` and a referencing `CLAUDE.md` during the Phase 2 development-server run. Their origin was verified in the installed Next.js source, and the relevant bundled App Router guides were read. These are distinct from the historical Claude master prompt slated for deletion in the user worktree.

## Files changed

- New foundation/configuration: `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `.nvmrc`, `.gitignore`, `.prettierignore`, `.env.example`, `tsconfig.json`, `next-env.d.ts`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `playwright.config.ts`, `README.md`, and Next.js-generated `AGENTS.md`/`CLAUDE.md`.
- New app and shell: `app/`, `components/`, `content/`, `public/brand/`, and approved favicon/manifest copies in `public/`.
- New test and screenshot evidence: `tests/shell.spec.ts` and `qa/phase2/`.
- Updated `IMPLEMENTATION_STATUS.md`, `VISUAL_QA.md`, and `REFERENCE_MANIFEST.md` for the new phase and asset placements.
- The deleted `Kreative_Sparq_Claude_Code_Master_Prompt.md` is **not** part of Phase 2 changes and must not be staged.

## Commands run and results

| Check | Result |
|---|---|
| `pnpm install --offline` after dependency download and an explicit `unrs-resolver` build allowlist | Passed; 358 packages installed from the lockfile. An initial sandboxed registry request was blocked, and the first install was retried with approved network access. |
| `pnpm lint` | Passed after removing two React effect-state lint violations. |
| `pnpm typecheck` | Passed with strict TypeScript. |
| `pnpm format:check` | Passed after formatting Phase 2 source and README. |
| `pnpm build` | Passed; `/` and the 404 route are statically generated. A sandboxed build could not fetch Google fonts; the approved network build succeeded. |
| `pnpm test` against `pnpm test:server` | Passed: 2 Edge/Windows Playwright smoke tests. Theme selection/reload/system changes, metadata/icon responses, skip link, menu focus and Escape, scroll lock, and no horizontal overflow at 390, 768, and 1024 px were checked. |

Playwright screenshots are under `qa/phase2/`. The browser test initially caught a closed mobile dialog being displayed by an author CSS rule; the rule was corrected and the tests passed. The test server is started separately because Playwright's managed web server did not exit cleanly on this Windows host despite both tests passing. The separate-server command exits cleanly with a test summary.

## Known issues and limits

1. **Planned navigation destinations:** Header/footer links are wired to their planned paths, but secondary routes are not part of Phase 2. They currently show the approved 404 page. The booking CTA is likewise not a live calendar; it cannot be treated as a working conversion path or released until the approved route/fallback is built and tested.
2. **Launch dependencies:** Contact values, a monitored inquiry destination, booking URL/fallback, legal details, policies, and publication approval for proof, case studies, testimonials, team profiles, and articles remain unresolved in `CONTENT_REQUIREMENTS.md`.
3. **Imagery is deferred by gate:** The supplied hero and six service WebPs are available but intentionally absent from the Phase 2 shell. Their PNG source masters remain preserved. The optional concept images are not client work or testimonial evidence.
4. **Visual scope:** Phase 2 screenshots confirm the shell and typography only. Full homepage fidelity, image crops, light/dark treatment of each homepage section, 360/375/1920 px sweeps, and axe/200% zoom checks belong to the later UI/QA phases. The favicon assets returned successfully; multi-browser tab-icon rendering remains a later visual QA item.
5. **Git state:** The historical Claude prompt deletion is pre-existing and must remain unstaged and uncommitted. The completed Phase 2 checkpoint is to be committed and pushed only to `codex/editorial-rebuild`; do not merge into `main`.

## Decisions awaiting approval

- Phase 2 gate, now approved: **Approve the foundation and proceed to Phase 3: Homepage light-mode build?**
- Later content, conversion, legal, integration, and publication decisions stay in `CONTENT_REQUIREMENTS.md`; this gate does not approve them or release.

## Phase 2 next action at the time

Commit and push the verified Phase 2 checkpoint to `codex/editorial-rebuild`, leaving the Claude prompt deletion unstaged. Stop at the Phase 2 gate. If the user explicitly approves, begin Phase 3 homepage light-mode reconstruction using the approved design system, copy deck, and supplied WebPs with their guide-led crops and fictional-subject restrictions.
