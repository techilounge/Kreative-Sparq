# Kreative Sparq

Lean production launch candidate for the Kreative Sparq marketing website. The candidate remains on `codex/editorial-rebuild` for final visual approval; it has not been merged to `main` or promoted to production.

## Local setup

- Node.js 24 and pnpm 11.19.0
- `pnpm install --frozen-lockfile`
- `pnpm dev`
- Open `http://localhost:3000`

No secret or provider credential is required. `NEXT_PUBLIC_SITE_URL` may override the production metadata origin during review.

## Validation commands

| Command                     | Purpose                                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `pnpm lint`                 | Next.js and TypeScript ESLint rules                                                                             |
| `pnpm typecheck`            | Strict TypeScript check                                                                                         |
| `pnpm format:check`         | Prettier formatting check                                                                                       |
| `pnpm copy:check`           | Verify all source-deck extractions                                                                              |
| `pnpm build`                | Static production build                                                                                         |
| `pnpm test`                 | Start or reuse the production server and run Chromium, route, axe, metadata, content, security, and link checks |
| `pnpm browser:install`      | Install Playwright's bundled Chromium                                                                           |
| `pnpm test:edge`            | Optional additional Microsoft Edge run                                                                          |
| `pnpm screenshots:launch`   | Capture representative 390 and 1440 px Light/Dark launch evidence                                               |
| `pnpm screenshots:sitewide` | Regenerate the ignored complete responsive matrix                                                               |
| `pnpm audit:lighthouse`     | Run representative mobile and desktop Lighthouse audits with realistic throttling                               |

For a fresh checkout, run `pnpm browser:install`, `pnpm build`, and `pnpm test`. The standard browser runner starts or reuses `http://127.0.0.1:3100` and stops only a server it started.

## Architecture and launch behavior

- Next.js App Router with Server Components by default. Client code is limited to the theme selector and mobile navigation.
- Newsreader and Plus Jakarta Sans are self-hosted through `next/font`.
- Content is repository-local. Source-deck extraction creates typed Services, editorial, contact, Privacy, and Terms content.
- Light, Dark, and System themes use semantic design tokens and store only the selected theme preference locally.
- The restrictive CSP permits same-origin runtime resources and no external provider domain.
- No form, booking provider, lead database, newsletter, account, payment, marketing analytics, advertising pixel, or external CMS is installed.
- `/contact` publishes `hello@kreativesparq.com` and a two-business-day response expectation.
- `/privacy` and `/terms` describe the current site and use `legal@kreativesparq.com`.
- `/start-a-project` and `/book` permanently redirect to `/contact`; `/thank-you` returns the standard 404.
- `/insights` remains `noindex,follow` and outside the sitemap until articles are approved. All other current public pages are indexable.

All public email addresses use `kreativesparq.com`. The imagery governance and truthful proof restrictions are documented in `CONTENT_REQUIREMENTS.md`; launch status and test evidence are in `IMPLEMENTATION_STATUS.md` and `LAUNCH_READINESS.md`.

## Git and release gate

Commit and push this checkpoint only to `codex/editorial-rebuild`. Final visual approval is required before any merge to `main` or production promotion.
