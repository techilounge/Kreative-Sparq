# Implementation status

Updated 21 September 2026.

## Current phase and approval state

**Phase 2: Technical foundation and global shell — complete, awaiting the Phase 2 approval gate.** The user approved Phase 1 and authorized Phase 2 only. The homepage reconstruction, supplied homepage image placement, secondary route content, conversion integrations, and release remain outside this phase. The branch is `codex/editorial-rebuild`; the historical Claude prompt deletion remains a separate, unstaged user worktree change. Each completed phase is to be committed and pushed to this branch, with no merge into `main`.

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

- Current gate: **Approve the foundation and proceed to Phase 3: Homepage light-mode build?**
- Later content, conversion, legal, integration, and publication decisions stay in `CONTENT_REQUIREMENTS.md`; this gate does not approve them or release.

## Exact next action

Commit and push the verified Phase 2 checkpoint to `codex/editorial-rebuild`, leaving the Claude prompt deletion unstaged. Stop at the Phase 2 gate. If the user explicitly approves, begin Phase 3 homepage light-mode reconstruction using the approved design system, copy deck, and supplied WebPs with their guide-led crops and fictional-subject restrictions.
