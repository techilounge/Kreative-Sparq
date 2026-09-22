# Kreative Sparq

Production foundation for the Kreative Sparq marketing website. The repository is in **Phase 2: technical foundation and global shell**. The homepage sections and route content begin only after the next approval gate. This branch is a review preview, not a release.

## Local setup

- Node.js 24 and pnpm 11.19.0 (`.nvmrc` and `packageManager` are pinned to the tested major/tool version).
- `pnpm install --frozen-lockfile`
- `pnpm dev`
- Open `http://localhost:3000`.

No environment variables or production secrets are needed to build. Copy `.env.example` to `.env.local` only if you need to override the known public site origin during metadata work.

## Checks

| Command             | Purpose                                                                      |
| ------------------- | ---------------------------------------------------------------------------- |
| `pnpm lint`         | Next.js and TypeScript ESLint rules                                          |
| `pnpm typecheck`    | Strict TypeScript check                                                      |
| `pnpm format:check` | Prettier formatting check                                                    |
| `pnpm build`        | Production build without secrets                                             |
| `pnpm test`         | Playwright shell, theme and mobile keyboard smoke tests using Microsoft Edge |

The Playwright smoke test writes review screenshots to `qa/phase2/`. Edge must be installed locally. First run `pnpm build`, then start `pnpm test:server` in a separate terminal, and run `pnpm test` while that server is active.

## Current architecture

- Next.js App Router and Server Components by default. Only theme and mobile menu interactions are Client Components.
- Tailwind CSS 4 is configured through PostCSS. Global semantic tokens and shell styles live in `app/globals.css`; the approved section rules remain in `DESIGN_SYSTEM.md` until their phases.
- Newsreader and Plus Jakarta Sans load through `next/font`.
- Theme is `Light`, `Dark`, or `System` through `next-themes`, with persisted choice and a pre-paint theme attribute. Browser theme colour follows the resolved mode.
- Typed content reads go through `content/index.ts`. Local approved copy is in `content/local.ts`; a later approved CMS can replace the adapter without changing page consumers.
- Approved light and dark logos are served from `public/brand/`. Favicon and web manifest files are copied from the supplied package into `public/`; originals remain in the reference folders.
- Homepage WebPs and PNG masters remain in the supplied image package until Phase 3 image placement. PNG files remain source masters. The subjects are fictional editorial people, not agency staff, clients, or testimonial sources.

The global shell includes planned route links. Routes other than `/` are intentionally unbuilt at this gate and currently render the approved 404 page. Booking, forms, social links, legal pages, articles, client proof, and case studies are not live. See `CONTENT_REQUIREMENTS.md` and `IMPLEMENTATION_STATUS.md` for the release dependencies.

## Git and phase gate

Work is confined to `codex/editorial-rebuild`. Complete phase checkpoints are committed and pushed to that branch for review. No merge to `main` or release is authorized. Phase 3 requires explicit approval.
