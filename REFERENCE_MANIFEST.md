# Reference manifest

Phase 0 audit, updated for Editorial Image Pack v3 on 24 September 2026. Paths are relative to the repository root unless stated otherwise. “Complete” means the supplied file opened and was inspected; it does not turn fictional subjects or concept images into evidence of clients, staff, testimonials, or finished work.

| Supplied item | Resolved path, type and size | Role and authority domain | Status and audit note |
|---|---|---|---|
| Codex master prompt | `Kreative_Sparq_Codex_Master_Prompt.md`, Markdown, 40,913 bytes | Governs build sequence, gates, exclusions, and design constraints | **Complete.** Read in full and tracked in the Phase 1 checkpoint. Supersedes the historical Claude prompt. |
| Implementation plan | `Kreative_Sparq_Website_Implementation_Plan.md`, Markdown, 37,686 bytes | Scope, routes, architecture, integrations, motion, accessibility, and SEO | **Complete.** Read in full. Its older phase numbering does not govern this build. |
| Approved copy deck | `Kreative_Sparq_Website_Copy_Claude_Code.md`, Markdown, 118,633 bytes | Visible wording, metadata, labels, content status, and empty states | **Complete.** Read in full. It contains unresolved business fields and publication conditions recorded in `CONTENT_REQUIREMENTS.md`. |
| Homepage reference | `Kreative Sparq editorial agency homepage.png`, PNG, 799 × 1967 px, RGBA, 2,189,995 bytes | Binding homepage composition and art direction, subject to the master prompt’s exclusions | **Complete as a reference.** Inspected at full resolution and tracked in the Phase 1 checkpoint. Hero and footer contain damaged colour and transparency artefacts. Client marks, numbers, featured project, and testimonial are unverified and excluded from production. |
| Homepage image package | `Kreative_Sparq_Homepage_Image_Assets_v1.zip`, ZIP, 18,394,969 bytes; extracted intact under `Kreative_Sparq_Homepage_Image_Assets_v1/` | User-supplied editorial imagery. The active user request authorizes the optimized WebPs for implementation and the PNGs as retained source masters. `IMAGE_ASSET_GUIDE.md` provides placement, crop, alt-text, and performance details where compatible with the master prompt and user request. `GENERATION_PROMPTS.md` records provenance, not new build instructions. | **Complete.** Archive entries read and safely extracted; all nine WebPs decoded visually, dimensions checked; all nine PNG masters opened. Subjects are fictional. Featured concept is not client work; philosophy portrait is not a testimonial. See inventory below. |
| Editorial Image Pack v3 | `Kreative_Sparq_Editorial_Image_Pack_v3.zip`, ZIP, SHA-256 `8A0546059287C02AFB2BF9A8596CDE682E7C7DD265B29E17D734D40349FCAE2D`; safely extracted under `Kreative_Sparq_Editorial_Image_Pack_v3/` | User-supplied generated editorial photography. The user's 24 September 2026 instruction makes v3 authoritative for non-homepage hero and support-image placement and the Content & Social Media replacement. The attached master prompt and manifests provide implementation detail beneath that user instruction. | **Complete.** Eleven PNG masters remain outside `public/`; eleven optimized WebPs are installed under `public/images/editorial/`. All depicted people are fictional editorial subjects. See the v3 inventory below. |
| Light-mode logo | `Kreative Sparq Logo.png`, PNG, 1944 × 809 px, RGBA with transparency, 318,811 bytes | Approved light brand identity | **Complete.** Visually checked over Mineral White. Forest wordmark, terracotta Sparq, charcoal descriptor. Large transparent margins require careful sizing/crop handling later. No editable/vector logo source supplied. |
| Dark-mode logo | `kreative-sparq-logo-dark-mode.png`, PNG, 1944 × 809 px, RGBA with transparency, 20,641 bytes | Approved dark brand identity | **Complete.** Visually checked over Dark Forest. Light wordmark, orange Sparq, muted descriptor. Large transparent margins require careful sizing/crop handling later. |
| Favicon package | `Favicon/kreative-sparq-favicon-package.zip`, ZIP, 65,627 bytes; extracted package at `Favicon/kreative-sparq-favicon-package/kreative-sparq-favicon-package/` | Approved icon and manifest assets; brand identity and browser metadata | **Complete.** ZIP entries read successfully; extracted raster files opened; SVG parsed as XML and manifest as JSON. See inventory below. |
| Repository guidance | Phase 0 search found no root or ancestor `AGENTS.md`, root `CLAUDE.md`, or `README.md`; Next.js 16 generated root `AGENTS.md` and `CLAUDE.md` when its Phase 2 development server ran | Existing engineering conventions and installed-version Next.js guidance | **Available in Phase 2.** The generated rule points to the installed `node_modules/next/dist/docs/`; its origin was verified in `next/dist/server/lib/generate-agent-files.js`, and the relevant installed guides were read. The historical `Kreative_Sparq_Claude_Code_Master_Prompt.md` remains separately deleted in the user worktree and must not be staged. |
| Existing repository | `.git/` and tracked brand/reference files; commit `79891de` | Existing history and engineering baseline | **Complete for audit.** One initial commit. No app source, `package.json`, lockfile, framework configuration, routes, tests, or installed dependencies. Git history and worktree inspected. |

## Favicon inventory

The ZIP contains an outer folder and 11 files. The extracted copy contains the same 11 files. Within `Favicon/kreative-sparq-favicon-package/kreative-sparq-favicon-package/`:

| File | Type and dimensions | Note |
|---|---|---|
| `favicon.svg` | SVG, 512 × 512 viewBox | Contains light/dark `prefers-color-scheme` rules and an orange accent. SVG is parseable. Its monogram text uses DejaVu font families; rendering should be checked in browser during the UI phase. |
| `favicon.ico` | ICO, largest decoded size 48 × 48 | Opened successfully. |
| `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png` | PNG, 16 × 16, 32 × 32, 48 × 48; RGBA | Opened successfully. |
| `favicon-master-512.png` | PNG, 512 × 512; RGBA | Opened and visually checked. |
| `icon-192.png`, `icon-512.png` | PNG, 192 × 192 and 512 × 512; RGB | Referenced by the valid `site.webmanifest`. |
| `apple-touch-icon.png` | PNG, 180 × 180; RGB | Opened successfully. |
| `README.md`, `site.webmanifest` | Markdown and JSON | Setup notes and manifest inspected. |

There is also `Favicon/kreative-sparq-favicon-package/kreative-sparq-favicon-512.png`, a 512 × 512 RGBA duplicate/alternate outside the nested package. The supplied files remain intact; selected production copies were added to `public/` during Phase 2.

## Homepage image package inventory

The ZIP and extracted folder each contain nine optimized WebPs in `web/`, nine corresponding RGB PNG masters in `originals/`, `IMAGE_ASSET_GUIDE.md`, and `GENERATION_PROMPTS.md`. WebP dimensions were read from the VP8 image headers and the images were visually inspected. PNGs were decoded with their dimensions. All files below are **complete and available**. Preserve the PNG originals; a later authorized implementation phase should copy/use the WebPs, not the PNG masters, for normal page delivery.

| Basename in web/ and originals/ | WebP dimensions and bytes | PNG-master dimensions and bytes | Intended role and authority |
|---|---|---|---|
| `hero-editorial` | 1122 × 1402; 79,472 | 1122 × 1402; 2,080,941 | Homepage split hero; guide crop/focal point and user-supplied visual asset |
| `service-brand-strategy` | 800 × 1000; 51,020 | 1122 × 1402; 2,015,763 | Brand Strategy service image |
| `service-creative-design` | 800 × 1000; 86,212 | 1122 × 1402; 2,566,747 | Creative Design service image |
| `service-content-social` | 800 × 1000; 48,354 | 1122 × 1402; 1,993,979 | Content & Social Media service image |
| `service-performance-marketing` | 800 × 1000; 40,580 | 1122 × 1402; 1,759,932 | Performance Marketing service image |
| `service-web-experiences` | 800 × 1000; 63,130 | 1122 × 1402; 2,013,764 | Web Design & Development service image |
| `service-campaigns-activations` | 800 × 1000; 49,378 | 1122 × 1402; 1,939,973 | Campaigns & Activations service image |
| `featured-editorial-concept` | 1599 × 900; 71,612 | 1672 × 941; 1,931,210 | Optional conceptual brand visual; **never** a client case study or result |
| `brand-philosophy-editorial` | 1599 × 900; 33,618 | 1672 × 941; 1,677,167 | Optional agency philosophy band visual; **never** a testimonial/source portrait |

The package guide says the images were generated for this visual system and the generation-prompts file confirms generated provenance. The active user request explicitly directs implementation with the WebPs while requiring fictional-subject treatment. No subject is to be named or characterized as a real employee, client, founder, customer, or testimonial source. The guide's suggested alt text is adapted to describe visible content without assigning a real-world role; see DESIGN_SYSTEM.md. The archive SHA-256 is `EC5D5EA04A0FA8EF88874628307E828644DB9C8000196F32DF7405FB60A3D546`.

## Phase 2 implementation copies

- `public/brand/kreative-sparq-logo-light-mode.png` and `public/brand/kreative-sparq-logo-dark-mode.png` are unchanged copies of the approved PNG logos above. The source files remain at repository root. Header uses the mode-appropriate variant; footer uses the approved dark-background variant.
- `public/favicon.ico`, `public/favicon.svg`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png`, and `public/site.webmanifest` are unchanged copies from the nested favicon package. The Next.js metadata references these public paths; Playwright confirmed the main icon and manifest URLs return successfully. The supplied package remains intact.
- No homepage editorial images were copied into `public/` during Phase 2. Phase 3 implementation copies are listed below; `Kreative_Sparq_Homepage_Image_Assets_v1/originals/` remains the PNG-master archive.

## Phase 3 homepage implementation copies

The following are unchanged optimized WebP copies from `Kreative_Sparq_Homepage_Image_Assets_v1/web/` into `public/images/home/`. The hero is preloaded; service images are lazy-loaded with their intrinsic dimensions, responsive sizes, descriptive alt text, and per-image focal positions. Their matching PNG masters stay in `Kreative_Sparq_Homepage_Image_Assets_v1/originals/` and are not served by the site.

| Public file | Homepage placement |
|---|---|
| `public/images/home/hero-editorial.webp` | Split hero, fictional editorial subject |
| `public/images/home/service-brand-strategy.webp` | Brand Strategy |
| `public/images/home/service-creative-design.webp` | Creative Design |
| `public/images/home/service-content-social.webp` | Content & Social Media, fictional editorial subject |
| `public/images/home/service-performance-marketing.webp` | Performance Marketing, fictional editorial subject |
| `public/images/home/service-web-experiences.webp` | Web Design & Development |
| `public/images/home/service-campaigns-activations.webp` | Campaigns & Activations, fictional editorial subject |

`featured-editorial-concept.webp` and `brand-philosophy-editorial.webp` remain only in the supplied package. Neither is shown as completed client work, a testimonial, or a real staff portrait. The approved Work empty state and agency point-of-view statement replace the composite reference's fictional proof. Four full-page Chromium screenshots are in `qa/phase3/` and their review findings are in `VISUAL_QA.md`.

## Editorial Image Pack v3 inventory

The pack was supplied and generated on 24 September 2026 as editorial imagery for this website. The source description is “user-supplied generated editorial photography in Kreative Sparq Editorial Image Pack v3.” PNG masters are preserved under `Kreative_Sparq_Editorial_Image_Pack_v3/originals/`; matching WebPs are served through `next/image` from `public/images/editorial/`. Hero images are decorative because adjacent HTML headings identify each route. Supporting images are also decorative in their current compositions.

| Production file | Source dimensions | Route and placement | Role and accessibility treatment |
| --- | ---: | --- | --- |
| `services-overview-hero.webp` | 1672 × 941 | `/services` full hero | Hero; decorative, empty alt and `aria-hidden` |
| `work-hero.webp` | 1672 × 941 | `/work` full hero | Hero; decorative, empty alt and `aria-hidden` |
| `about-hero.webp` | 1672 × 941 | `/about` full hero | Hero; decorative, empty alt and `aria-hidden` |
| `insights-hero.webp` | 1672 × 941 | `/insights` full hero | Hero; decorative, empty alt and `aria-hidden` |
| `contact-hero.webp` | 1672 × 941 | `/contact` full hero | Hero; decorative, empty alt and `aria-hidden` |
| `legal-shared-hero.webp` | 1672 × 941 | Shared by `/privacy` and `/terms` | Hero; decorative, empty alt and `aria-hidden` |
| `work-process-support.webp` | 1448 × 1086 | `/work`, inside the approved empty-state index frame | Support; decorative and never case-study proof |
| `about-relationship-support.webp` | 1536 × 1024 | `/about`, beside “How the relationship works” | Support; decorative |
| `insights-notes-support.webp` | 1122 × 1402 | `/insights`, inside the `00` publication-status panel | Support; decorative and not an article image |
| `contact-collaboration-support.webp` | 1536 × 1024 | `/contact`, beside “What happens next?” | Support; decorative |
| `service-content-social-v2.webp` | 1942 × 809 | `/services` catalogue card and `/services/content-social-media` hero | Capability illustration; descriptive card alt, decorative hero alt |

The five other service-detail heroes reuse their approved service WebPs from `public/images/home/`; each appears once in its hero and is not duplicated in the initial viewport. `service-content-social-v2.webp` replaces the older Content & Social Media image only on the `/services` card and `/services/content-social-media` hero. The homepage intentionally keeps its accepted v1 image and composition.

No v3 image is proof of a staff member, client, partnership, testimonial, case study, campaign result, or completed work. Do not name or identify anyone shown. The Work imagery remains a fictional editorial still life within the truthful “case studies are on the way” state.

## Authority and publication notes

- The user approved Phases 0, 1, and 2 and authorized Phase 3 only. The image-package request updated Phase 1 references and design documentation, then the seven required WebPs were used in Phase 3. The user directs a commit and push of each completed phase to `codex/editorial-rebuild`, while leaving `main` unmerged. The plan’s older phases and Claude workflow remain historical where they disagree with the Codex master prompt.
- The reference image controls composition, not copy or factual claims. The copy deck controls text and content availability. The implementation plan controls technical scope.
- The new package supplies standalone hero and six service visuals for implementation. It also contains two optional concept images. None of these is proof of client work, a real team member, or a testimonial. No approved client case study was supplied. Do not use the composite reference screenshot as production imagery.
- The PNG logos and favicon are present. A vector logo source would improve scaling but is optional unless the user supplies one.
