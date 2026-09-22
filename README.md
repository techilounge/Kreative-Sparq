# Kreative Sparq

Review implementation for the Kreative Sparq marketing website. **Phase 6: Services experience** is complete and awaiting approval. This branch is a review preview, not a release.

## Local setup

- Node.js 24 and pnpm 11.19.0 (`.nvmrc` and `packageManager` are pinned to the tested major/tool version).
- `pnpm install --frozen-lockfile`
- `pnpm dev`
- Open `http://localhost:3000`.

No environment variables or production secrets are needed to build. Copy `.env.example` to `.env.local` only if you need to override the known public site origin during metadata work.

## Checks

| Command                     | Purpose                                                                 |
| --------------------------- | ----------------------------------------------------------------------- |
| `pnpm lint`                 | Next.js and TypeScript ESLint rules                                     |
| `pnpm typecheck`            | Strict TypeScript check                                                 |
| `pnpm format:check`         | Prettier formatting check                                               |
| `pnpm build`                | Production build without secrets                                        |
| `pnpm browser:install`      | Install Playwright’s bundled Chromium on a new machine                  |
| `pnpm copy:check`           | Verify Services content matches the approved copy-deck extraction       |
| `pnpm test`                 | Start or reuse the server; run Chromium, route, axe, and content checks |
| `pnpm test:edge`            | Optional additional run with locally installed Microsoft Edge           |
| `pnpm screenshots:services` | Capture the 42-image Services review matrix with bundled Chromium       |

For a fresh checkout, run `pnpm browser:install`, `pnpm build`, then `pnpm test`. The standard test command starts a production server at `http://127.0.0.1:3100` when needed or reuses one already running there. It stops only the server it started. The optional `pnpm test:server` command remains available for manual preview. Chromium does not require Edge. The locked homepage captures remain in `qa/phase5/`. Phase 6 captures are in `qa/phase6/services/{overview,brand-strategy,performance-marketing}-{light,dark}-{360,375,390,768,1024,1440,1920}.png`. The suite runs homepage acceptance checks plus all seven Services routes across responsive widths and themes, 28 Services axe scans, exact copy checks, metadata and structured-data checks, keyboard order, mobile-menu behavior, image loading, links, and overflow.

## Current architecture

- Next.js App Router and Server Components by default. Only theme and mobile menu interactions are Client Components.
- Tailwind CSS 4 is configured through PostCSS. Global semantic tokens and shell styles live in `app/globals.css`; both homepage themes, responsive layouts, and restrained motion live in `app/home.css` and follow `DESIGN_SYSTEM.md`.
- Newsreader and Plus Jakarta Sans load through `next/font`.
- Theme is `Light`, `Dark`, or `System` through `next-themes`, with persisted choice and a pre-paint theme attribute. Browser theme colour follows the resolved mode.
- Typed content reads go through `content/index.ts`. Local approved copy is in `content/local.ts`; a later approved CMS can replace the adapter without changing page consumers.
- Services copy is generated from the approved deck by `scripts/extract-services.mjs`, typed in `content/services.ts`, and verified by `pnpm copy:check`.
- Approved light and dark logos are served from `public/brand/`. Favicon and web manifest files are copied from the supplied package into `public/`; originals remain in the reference folders.
- The hero and six service WebPs are copied from the supplied package into `public/images/home/` for implementation. The original PNG files remain source masters in the package’s `originals/` folder. All depicted people are fictional editorial subjects, never agency staff, clients, or testimonial sources. The optional featured editorial concept is not shown as client work.

The global shell includes planned route links. `/services` and all six approved service details are live review routes. `/book`, `/contact`, `/start-a-project`, `/work`, `/about`, and `/insights` remain planned and currently render the approved 404 page. Booking, forms, social links, legal pages, articles, client proof, and case studies are not live. See `CONTENT_REQUIREMENTS.md` and `IMPLEMENTATION_STATUS.md` for the release dependencies.

## Git and phase gate

Work is confined to `codex/editorial-rebuild`. Complete phase checkpoints are committed and pushed to that branch for review. No merge to `main` or release is authorized. Phase 7 and all conversion or integration work require explicit approval after the Services experience is accepted.
