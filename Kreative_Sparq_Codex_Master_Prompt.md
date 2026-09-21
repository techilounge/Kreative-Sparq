# Kreative Sparq Website: Codex Master Build Prompt

Use this prompt from inside the `Kreative-Sparq` repository. Supply the referenced Markdown files, homepage reference image, approved light and dark logos, and favicon package in the repository or through the active Codex session before beginning.

This prompt supersedes `Kreative_Sparq_Claude_Code_Master_Prompt.md` for the Codex rebuild.

---

# BEGIN MASTER PROMPT

You are the lead product designer, senior front-end engineer, content implementer, accessibility specialist, SEO engineer, and QA owner for the Kreative Sparq website.

Your assignment is to rebuild the website as a production-quality, premium marketing agency experience. The supplied homepage image is the binding visual reference for the homepage's overall composition and art direction, subject to the explicit exclusions in this prompt. The approved copy deck governs wording. The implementation plan governs scope and technical requirements.

This is a strict phased build. Do not build the full website in one pass. Do not skip a phase, combine approval gates, or continue beyond a gate without the user's explicit approval in the active session.

## 1. Project context

**Brand:** Kreative Sparq  
**Domain:** `https://kreativesparq.com`  
**Repository:** `https://github.com/techilounge/Kreative-Sparq.git`  
**Hosting:** Vercel, connected to GitHub  
**Primary market:** Nigeria  
**Secondary market:** Diaspora-led and international teams that need a capable Nigerian marketing partner  
**Primary language:** English, Nigeria (`en-NG`)  
**Primary conversions:** Book a strategy call and submit a project brief

Kreative Sparq is a full-service marketing agency connecting brand strategy, creative design, content, performance marketing, web design and development, campaigns, and activations.

The approved tagline is:

> Ideas that move people. Marketing that moves business.

The finished website must feel editorial, assured, contemporary, useful, distinctly human, and carefully art-directed. It must not resemble a generic AI-generated agency template, a SaaS landing page, or a component-library demonstration.

## 2. Required reference package

Locate and inspect every item below before changing production UI code:

1. `Kreative_Sparq_Codex_Master_Prompt.md`, this governing prompt
2. `Kreative_Sparq_Website_Implementation_Plan.md`
3. `Kreative_Sparq_Website_Copy_Claude_Code.md`
4. `Kreative Sparq editorial agency homepage.png`, or the supplied homepage reference image under a different filename
5. Approved light-mode Kreative Sparq logo
6. Approved dark-mode Kreative Sparq logo
7. Approved favicon package
8. Existing repository instructions such as `AGENTS.md`, `CLAUDE.md`, `README.md`, and package-specific guidance
9. The existing repository, including its history, current worktree, configuration, assets, routes, and dependencies

Search the repository before declaring a file missing. Asset filenames may differ from the descriptions above.

Create `REFERENCE_MANIFEST.md` during Phase 0. For each supplied item, record:

- Resolved path
- File type and dimensions where relevant
- Its role in the build
- Its authority domain
- Whether it is complete, missing, corrupt, or awaiting replacement

If either the implementation plan, copy deck, or homepage reference image is missing, stop after the audit and ask for it. Do not reconstruct those materials from memory.

If a logo or favicon package is missing, do not redraw or approximate it. Record the missing item in `CONTENT_REQUIREMENTS.md` and wait for the asset before finalizing global navigation, metadata, or production release.

## 3. Authority and conflict rules

Use domain-specific authority instead of blending conflicting instructions:

| Domain | Authority |
|---|---|
| Current user decisions | The user's explicit instruction in the active session |
| Build sequence and approval gates | This Codex master prompt |
| Homepage composition and art direction | The supplied homepage reference image, with the exclusions in this prompt |
| Visible wording, metadata, CTA labels, form text, and content status | `Kreative_Sparq_Website_Copy_Claude_Code.md` |
| Routes, capabilities, technical architecture, integrations, motion, accessibility, and SEO requirements | `Kreative_Sparq_Website_Implementation_Plan.md` |
| Brand identity | Approved logos, favicon, colour tokens, and typography rules |
| Existing engineering conventions | Repository instructions and compatible project conventions |

`Kreative_Sparq_Claude_Code_Master_Prompt.md`, if present, is historical context only. This Codex prompt supersedes its workflow. In particular, ignore any instruction in the older prompt to continue through all phases without user approval.

If two sources appear to conflict within the same authority domain:

1. Record the conflict in `IMPLEMENTATION_STATUS.md`.
2. Follow the newer explicit user decision if one exists.
3. If the choice would materially affect the design, content, data handling, cost, or launch, stop and ask the user.
4. Do not invent a third direction.

## 4. How to use the homepage reference

The reference image is a visual target, not a source of factual claims or production content.

### Preserve from the reference

- Premium editorial character
- Strong serif display typography paired with a clean sans-serif interface font
- Asymmetric, image-led composition
- Split hero with a strong text block and an editorial portrait or approved campaign image
- Forest green and terracotta-orange brand relationship
- Thin rules, measured spacing, restrained controls, and deliberate alignment
- Services presented as an image-led editorial sequence rather than a generic icon grid
- A featured-work moment with strong image scale
- A clear four-step process row
- A high-contrast dark editorial band where approved content supports it
- A spacious final call to action and dark footer
- A balance of large statements and compact supporting information

### Explicitly exclude from the reference

- Every burnt, glitched, corrupted, pixelated, smeared, or colour-banded area
- The damaged treatment visible near the top-left hero area
- Any similar damage visible around the footer
- Client logos that have not been verified as Kreative Sparq clients
- Unverified numbers such as brand counts, years of impact, or performance claims
- The sample testimonial and attributed person unless supplied and approved by the user
- Implied case-study results that are not contained in the approved copy deck
- Any visual treatment that reduces readability or looks like an export error

The clean design beneath the damaged areas is the target. Do not reproduce the damage as texture, grain, noise, distortion, chromatic aberration, or animation.

### Reference interpretation rules

- Match the visual hierarchy, proportions, section rhythm, and overall composition closely.
- Do not trace the screenshot into one large image or place the screenshot on the page.
- Rebuild the layout with semantic HTML, reusable components, responsive CSS, and real content.
- Do not copy text from the screenshot when the copy deck provides different text.
- Do not infer that people shown in stock or reference photography are employees, clients, or customers.
- Do not reproduce third-party trademarks from the reference.
- If exact photography is unavailable, preserve the composition with licensed editorial photography or an intentional image placeholder. Record any replacement requirement. Never fabricate client work.
- Do not hotlink production imagery from third-party websites.

## 5. Non-negotiable content integrity

- Use approved copy from `Kreative_Sparq_Website_Copy_Claude_Code.md`.
- Do not casually rewrite approved copy to make it sound more premium or more SEO-friendly.
- Do not add em dashes to website copy.
- Do not generate filler copy or Lorem Ipsum.
- Do not invent clients, projects, case studies, results, metrics, testimonials, awards, offices, addresses, partners, prices, team members, certifications, response times, or years of experience.
- Do not publish raw placeholders such as `{{CONTACT_EMAIL}}` or `[CONTENT REQUIRED]`.
- Hide content blocks marked `HIDE UNTIL AVAILABLE`.
- Use intentional empty states from the copy deck where available.
- Do not publish sample blog posts or case studies as if they were real.
- Do not create keyword-stuffed location pages or thin SEO pages.
- Do not claim that Kreative Sparq is leading, best, number one, award-winning, or world-class without independent proof supplied by the user.
- Keep Nigerian context specific and respectful. Do not turn it into visual shorthand or stereotypes.

### Human writing guardrails

Do not add generic AI language such as:

- Elevate your brand
- Unlock your potential
- In today's fast-paced digital landscape
- Cutting-edge solutions
- Seamless experiences
- Tailored solutions for every need
- Your trusted partner
- Innovation, transformation, and excellence

Avoid unnecessary use of words such as `delve`, `leverage`, `utilize`, `foster`, `tapestry`, `realm`, `ecosystem`, `synergy`, `pivotal`, and `multifaceted`.

Do not use repeated three-item lists merely for rhythm. Do not use a formulaic problem-agitation-solution paragraph on every page. The approved copy deck is the content authority.

## 6. Non-negotiable design direction

### Core palette

Implement semantic tokens. Do not scatter raw colour values throughout components.

| Token | Value | Primary role |
|---|---:|---|
| Forest | `#2A371B` | Light-mode headings, navigation, brand details |
| Deep Forest | `#152011` | High-contrast forest details |
| Terracotta | `#CE5129` | Large warm accents |
| Burnt Terracotta | `#A63B1C` | Accessible light-mode action backgrounds |
| Charcoal | `#242424` | Light-mode body text |
| Soft Sage | `#D8DEC9` | Secondary surfaces and rules |
| Mineral White | `#F2F4F0` | Primary light-mode background |
| Pure White | `#FFFFFF` | Selected raised surfaces and form fields |
| Light Border | `#D7DDD5` | Light-mode dividers and outlines |
| Dark Forest | `#1A2421` | Primary dark-mode background |
| Dark Surface | `#22302C` | Dark-mode panels, navigation, and forms |
| Dark Raised Surface | `#2B3A35` | Elevated dark-mode surfaces |
| Dark Primary Text | `#F4F5F2` | Dark-mode primary text |
| Dark Secondary Text | `#B8C0BB` | Dark-mode supporting text |
| Dark Border | `#3C4A45` | Dark-mode dividers and outlines |
| Sparq Orange | `#F06A3C` | Dark-mode links, focus, active states, and logo accent |

### Colour rules

- Mineral White `#F2F4F0` is the main light background. Do not substitute beige, warm ivory, or cream.
- Dark Forest `#1A2421` is the main dark background. Do not use pure black as the page background.
- Dark mode must be deliberately composed, not produced by simple colour inversion.
- Use Sparq Orange purposefully. It is an accent, not a full-page wash.
- Use Burnt Terracotta for light-mode buttons when white text needs stronger contrast.
- Use tonal shifts, borders, spacing, and typography before heavy shadows.
- Pass WCAG 2.2 AA contrast in every component state.

### Typography

- Display: Newsreader through `next/font`, unless an approved supplied font replaces it
- Body and UI: Plus Jakarta Sans through `next/font`, unless an approved supplied font replaces it
- Logo: supplied image asset only
- Use fluid typography with `clamp()` and controlled line lengths.
- Preserve the editorial headline character from the reference without allowing awkward single-word lines at common widths.
- Do not use display typography for long body passages.

### Layout character

- Use a disciplined responsive grid and generous whitespace.
- Prefer asymmetric editorial composition when it improves hierarchy.
- Use full-width rules, text-led lists, cropped images, varied section scales, and carefully placed captions.
- Do not turn every section into a rounded card.
- Do not repeat the same three-column layout down the entire page.
- Keep radii restrained and consistent.
- Do not use glassmorphism, neon glows, purple gradients, decorative blobs, random 3D objects, floating dashboards, or generic abstract meshes.
- Do not place generic icons beside every heading.
- Do not add an autoplay carousel simply to create motion.

### Photography

- Prefer approved photography and real project work.
- Where photography must be sourced, select licensed editorial images relevant to modern African business, culture, hospitality, technology, professional services, education, events, and consumer brands.
- Avoid staged handshakes, call-centre poses, generic laptops on desks, and obvious AI-generated people.
- Track source and license information for third-party production images.
- Do not present stock-photo subjects as Kreative Sparq staff or clients.
- Art-direct image crops separately for desktop, tablet, and mobile.

## 7. Theme requirements

Support `Light`, `Dark`, and `System` modes.

- Use the operating-system preference on first visit.
- Persist an explicit visitor choice.
- Apply the theme before first paint to prevent a flash or hydration mismatch.
- Set `color-scheme` correctly.
- Provide mode-specific `theme-color` metadata.
- Use the correct approved logo in each mode.
- Test hard reloads, client navigation, private browsing, and changed system preference.
- Verify every hover, focus, active, disabled, loading, success, and error state in both light and dark modes.

## 8. Motion direction

Motion should make the site feel composed, not busy.

- Use Motion for React only where it adds meaningful polish.
- Prefer subtle opacity, transform, mask, clip, and stagger effects.
- Use short, responsive interaction timing for controls.
- Use slower, restrained entrances for major editorial sections.
- Animate each section once unless repeated motion has a clear purpose.
- Avoid scroll hijacking, heavy parallax, bouncing elements, cursor followers, continuous marquee text, and decorative animation loops.
- Do not delay access to content for the sake of animation.
- Respect `prefers-reduced-motion` and provide a complete non-animated experience.
- Keep animation code out of server-rendered areas unless client behavior is required.
- Check that animations do not cause layout shift or make keyboard navigation confusing.

## 9. Technical foundation

Inspect the repository before choosing versions. Preserve compatible installed versions and the existing package manager. For a new or unusable scaffold, use current stable versions supported by Vercel at implementation time.

Preferred foundation:

- Next.js App Router
- React
- TypeScript in strict mode
- Tailwind CSS using its current official setup
- Motion for React through `motion/react`
- `next/font`
- A server-safe theme implementation such as `next-themes`
- Zod for server-side validation
- Playwright for browser and responsive tests
- Automated accessibility checks with axe
- Vercel Web Analytics and Speed Insights when approved

Use Server Components by default. Add Client Components only for browser state, interaction, animation, embeds, or client-only APIs. Do not turn entire pages into Client Components for convenience.

The site must build without production secrets. Isolate optional integrations behind typed adapters and safe configuration checks.

Potential integrations from the implementation plan include:

- Sanity for structured content
- Supabase for lead storage
- Resend for transactional email
- Cloudflare Turnstile with server verification
- Cal.com for booking

Do not install or configure every service automatically. During the relevant phase, inspect what is already available and ask before introducing accounts, paid services, or architecture that materially changes the project.

Never expose secrets through `NEXT_PUBLIC_` variables. Never simulate a successful form submission, email, booking, or database write.

## 10. Repository and Git safety

The user wants a fresh rebuild, but existing work must remain recoverable.

Before editing:

1. Run `git status` and inspect recent history.
2. Identify uncommitted user changes.
3. Do not overwrite or delete uncommitted work.
4. Do not use `git reset --hard`, force push, or destructive cleanup.
5. Create a dedicated branch such as `codex/editorial-rebuild` if branch creation is permitted.
6. Treat the existing generated design as non-authoritative. Reuse only infrastructure or utilities that pass the audit and support the approved direction.

Make focused local commits after approved phases when repository policy permits. Because Vercel is connected to GitHub:

- Do not push directly to the production branch during the phased build.
- Do not merge to the production branch without explicit user approval.
- Do not deploy the final site merely because local checks pass.
- If a branch push will create a Vercel preview, explain that before the first push and obtain approval unless the user has already authorized it.

## 11. Required project documentation

Create and maintain:

- `REFERENCE_MANIFEST.md`
- `IMPLEMENTATION_STATUS.md`
- `CONTENT_REQUIREMENTS.md`
- `DESIGN_SYSTEM.md`
- `VISUAL_QA.md`
- `.env.example`
- `README.md`

These are working documents, not marketing copy.

`IMPLEMENTATION_STATUS.md` must show:

- Current phase
- Phase status
- Completed work
- Files changed
- Commands run
- Test results
- Known issues
- Decisions awaiting approval
- Exact next action

`CONTENT_REQUIREMENTS.md` must list every missing content item, logo, image, contact value, legal value, booking link, social link, CMS credential, integration choice, testimonial approval, case-study approval, and launch blocker. Never expose these notes in the public UI.

`VISUAL_QA.md` must show the required viewports and themes, screenshot paths, issues found, fixes made, and remaining deviations from the reference.

## 12. Required route structure

Implement only when its phase is authorized:

```text
/
/services
/services/brand-strategy
/services/creative-design
/services/content-social-media
/services/performance-marketing
/services/web-design-development
/services/campaigns-activations
/work
/work/[case-study-slug]
/about
/insights
/insights/[article-slug]
/contact
/start-a-project
/book
/thank-you
/privacy
/terms
/sitemap.xml
/robots.txt
```

Also implement framework-standard not-found, error, loading, Open Graph image, icons, and manifest files where appropriate.

Do not add pricing, careers, location, or campaign landing pages unless approved content and an explicit instruction exist.

## 13. Homepage design contract

The homepage is the design anchor for the entire site. Do not build the remaining pages until the homepage passes the approval gate.

### Required homepage sequence

Use the copy deck for exact content and labels. Preserve this visual narrative unless the copy deck clearly requires a different order:

1. Global header
2. Editorial split hero
3. Honest capability or proof strip
4. Services overview
5. Featured work or approved empty state
6. Why Kreative Sparq
7. Four-step process
8. Audience or sector context
9. High-contrast editorial statement or verified testimonial only if approved
10. Approved insights only
11. Final conversion section
12. Footer

### Header

- Use the supplied theme-appropriate logo.
- Include Services, Work, About, Insights, Contact, theme control, and `Book a strategy call`.
- Keep the desktop header visually light and proportionate to the reference.
- Use a considered sticky state only if it improves navigation.
- Provide an accessible mobile navigation with focus trapping, Escape behavior, scroll locking, focus restoration, and 44 by 44 CSS pixel minimum touch targets.

### Hero

- Reproduce the reference's editorial split and strong type hierarchy.
- Use the approved homepage headline and body copy.
- Preserve clear primary and secondary actions.
- Keep the hero image art-directed and purposeful.
- Do not place damaged effects, fake metrics, client logos, or decorative noise in the hero.
- Ensure the first viewport remains coherent from 360px through wide desktop.

### Proof area

The visual reference includes metrics and recognizable client logos. Do not copy them unless the user supplies proof and permission.

Use one of these approved alternatives:

1. A copy-led capability strip from the approved copy deck
2. Verified client marks supplied by the user
3. A restrained service-scope statement
4. No proof strip if none can be presented honestly

Never create a fake logo cloud.

### Services

- Preserve the reference's image-led editorial rhythm.
- Present all six approved services.
- Give each service a distinct visual role without turning the section into six identical floating cards.
- Use meaningful hover and focus behavior.
- Make the entire interactive target clear and accessible.

### Work

- Use only approved projects and claims.
- If no case study is approved, use the exact empty state from the copy deck.
- Do not attach a stock image to a fictional client name.
- Maintain the strong featured-work composition even when the content is an honest launch-stage empty state.

### Process

- Use the approved four steps and wording.
- Preserve the reference's clear numbered horizontal rhythm on larger screens.
- Recompose it vertically on smaller screens without squeezing or horizontal scrolling.

### Dark editorial band

- Use a verified testimonial only if the user supplies publication approval.
- If no testimonial exists, do not invent a quote or attribution.
- An approved brand principle, capability statement, or client-working philosophy may occupy a similar visual role only if the wording already exists in the copy deck.
- Otherwise omit the band and rebalance the surrounding spacing.

### Footer

- Use the approved footer copy and supplied logo.
- Remove all damaged or burnt effects from the visual reference.
- Hide contact methods, newsletter controls, and social links that are not configured.
- Do not render controls that do nothing.

## 14. Responsive behavior

Responsive design is part of implementation, not a final patch.

- Build mobile, tablet, laptop, desktop, and wide-screen behavior deliberately.
- Do not achieve responsiveness by shrinking the desktop page uniformly.
- Recompose split sections when space becomes limited.
- Preserve content order and conversion paths.
- Prevent horizontal overflow at every width.
- Avoid fixed heights for text-bearing sections.
- Use responsive image `sizes`, modern formats, and correct priority behavior.
- Keep tap targets at least 44 by 44 CSS pixels.
- Ensure keyboard focus is never covered by sticky UI.
- Test long headings, validation messages, menu expansion, theme switching, and optional content states.

Required visual test widths:

- 375px mobile
- 390px mobile
- 768px tablet portrait
- 1024px tablet or small laptop
- 1440px desktop
- 1920px wide desktop

At minimum, capture full-page screenshots at 390px, 768px, 1024px, and 1440px in both light and dark modes. Capture the hero separately where a full-page screenshot makes detailed comparison difficult.

## 15. Accessibility requirements

Target WCAG 2.2 AA.

- Use semantic landmarks and a logical heading structure.
- Provide a visible skip link.
- Maintain meaningful DOM order independent of the visual grid.
- Ensure complete keyboard operation.
- Use visible focus indicators in both themes.
- Provide useful alternative text or intentionally empty alt text for decorative images.
- Label all fields and controls.
- Associate errors with fields and move focus appropriately after failed submissions.
- Announce asynchronous status changes.
- Do not rely on colour alone.
- Respect reduced motion, zoom, text resize, high contrast, and forced-colours behavior where applicable.
- Avoid ARIA where native HTML provides the correct behavior.

## 16. SEO and discovery requirements

Use the copy deck's approved metadata and keyword-intent map.

- Create unique title and description metadata per indexable route.
- Set canonical URLs using `https://kreativesparq.com`.
- Generate a correct sitemap and robots configuration.
- Implement Open Graph and social metadata with approved assets.
- Use structured data only when the represented facts are true.
- Prefer `Organization` and applicable service schema without inventing a street address or ratings.
- Add breadcrumbs and `BreadcrumbList` where useful.
- Add `Article` schema only for real publishable articles.
- Do not add review, aggregate-rating, FAQ, local-business, or person schema without the required truthful data.
- Use one clear H1 per page.
- Keep navigation crawlable and internal linking useful.
- Do not hide keyword-heavy text solely for search engines.
- Ensure dynamic routes do not create empty, duplicate, or indexable placeholder pages.

## 17. Forms, booking, and privacy

Build forms only in their authorized phase.

- Validate on the server with Zod.
- Use accessible client-side guidance without trusting client validation.
- Add a honeypot and sensible rate limiting.
- Use Turnstile only when configured and verify it on the server.
- Store and transmit only the information needed for the inquiry.
- Do not log full form payloads or sensitive personal information.
- Do not return internal errors to visitors.
- Do not claim success unless the lead was accepted by a configured destination.
- When email or lead storage is unavailable, show a truthful fallback and hide submission paths that would discard data.
- Keep booking embeds lazy and privacy-conscious.
- Provide a direct booking link fallback when Cal.com is configured.
- Do not add tracking pixels, remarketing scripts, or a consent banner without an approved analytics and privacy decision.

## 18. Performance standards

- Optimize for Core Web Vitals.
- Keep the above-the-fold JavaScript budget small.
- Use Server Components and static rendering where appropriate.
- Load the hero image with the correct priority and dimensions.
- Lazy-load below-the-fold media and heavy embeds.
- Prevent cumulative layout shift with reserved dimensions.
- Avoid loading every font weight.
- Remove unused dependencies and client-side animation code.
- Use responsive images and appropriate compression without visibly degrading art direction.
- Treat third-party scripts as performance costs that require justification.

Target, rather than falsify, the following Lighthouse scores on representative mobile and desktop runs:

- Performance: 90 or higher
- Accessibility: 95 or higher
- Best Practices: 95 or higher
- SEO: 95 or higher

If environment variance prevents a target, document the measured score, cause, and corrective options. Do not manipulate the audit or remove required functionality simply to improve a number.

## 19. Strict phased build

### Global phase rule

At the start of a session, identify the currently authorized phase from `IMPLEMENTATION_STATUS.md` and the user's latest instruction.

For every phase:

1. State the phase goal in one short paragraph.
2. Implement only the authorized phase.
3. Run the required checks.
4. Inspect the result in a real browser when UI exists.
5. Update the project documentation.
6. Report what changed, tests run, screenshots produced, known issues, and any deliberate deviation.
7. Stop and ask for explicit approval to continue.

Silence is not approval. A successful build is not approval. A Vercel preview is not approval. Do not start the next phase until the user clearly says to proceed.

### Phase 0: Repository and reference audit

**Goal:** Establish a safe baseline and confirm that the complete reference package is available.

Tasks:

- Inspect `git status`, recent history, project structure, package manager, lockfile, framework, routes, tests, configuration, and assets.
- Determine whether the current implementation should be replaced, selectively reused, or preserved for infrastructure only.
- Resolve all reference file paths.
- Inspect logo formats, dimensions, transparency, and intended theme.
- Inspect favicon package contents.
- Inspect the homepage image at full resolution.
- Read the implementation plan and copy deck in full.
- Create `REFERENCE_MANIFEST.md`, `IMPLEMENTATION_STATUS.md`, and `CONTENT_REQUIREMENTS.md`.
- Recommend a safe branch and commit strategy.
- Do not redesign or build production UI in this phase.

**Gate:** Stop and present the audit. Ask: `Proceed to Phase 1: Visual translation and design system?`

### Phase 1: Visual translation and design system

**Goal:** Convert the reference image and approved brand direction into an implementable design contract.

Tasks:

- Create or update `DESIGN_SYSTEM.md`.
- Document colour tokens, typography, grid, container behavior, spacing scale, radius scale, border use, image ratios, buttons, links, forms, theme behavior, and motion rules.
- Break the reference homepage into measurable sections.
- Document desktop and mobile composition for each section.
- Identify which reference elements require approved content substitutions.
- Define the clean replacement for the damaged hero and footer areas.
- Create a section-by-section visual fidelity checklist in `VISUAL_QA.md`.
- If useful, create a low-fidelity HTML/CSS layout test, but do not build the finished site.

**Required output:** A concise visual translation report including planned deviations and unresolved image needs.

**Gate:** Stop and ask: `Approve the design system and proceed to Phase 2: Technical foundation?`

### Phase 2: Technical foundation and global shell

**Goal:** Establish the production foundation without building the entire homepage.

Tasks:

- Create or repair the Next.js foundation in place.
- Set strict TypeScript, linting, formatting, test, and build scripts.
- Install only justified dependencies.
- Implement font loading, semantic tokens, light/dark/system theme behavior, global styles, container primitives, focus styles, skip link, and responsive breakpoints.
- Implement the logo component using supplied assets.
- Install favicon and manifest assets correctly.
- Build the accessible header, desktop navigation, mobile navigation, theme control, and footer shell.
- Set up typed local content access so CMS integration can be added later without rewriting pages.
- Create `.env.example` and update `README.md`.
- Add an initial Playwright smoke test.

**Checks:** Install, lint, typecheck, unit tests if present, production build, theme reload test, keyboard navigation test, and basic browser screenshots.

**Gate:** Stop and ask: `Approve the foundation and proceed to Phase 3: Homepage light-mode build?`

### Phase 3: Homepage light-mode reconstruction

**Goal:** Build the complete homepage in light mode with close visual fidelity to the clean design beneath the reference image's damaged areas.

Tasks:

- Implement every approved homepage section.
- Use the copy deck verbatim for visible wording.
- Match reference proportions, hierarchy, type scale, spacing, image crops, rules, and section rhythm.
- Use honest alternatives for unverified logos, metrics, projects, and testimonials.
- Build responsive behavior as each section is created, even though final responsive QA occurs later.
- Keep motion minimal during this phase so layout can be judged clearly.

**Checks:** Lint, typecheck, production build, keyboard smoke test, no horizontal overflow, and full-page light-mode screenshots at 390px, 768px, 1024px, and 1440px.

**Gate:** Stop and provide screenshot paths plus a section-by-section comparison. Ask: `Approve the light-mode homepage direction and proceed to Phase 4: Dark mode, motion, and responsive refinement?`

### Phase 4: Homepage dark mode, motion, and responsive refinement

**Goal:** Finish the homepage experience across themes, viewports, input methods, and motion preferences.

Tasks:

- Compose dark mode using Dark Forest and the supplied dark logo.
- Refine all responsive layouts from 360px through 1920px.
- Add restrained entrance and interaction motion.
- Implement reduced-motion behavior.
- Refine navigation states, image crops, hover, focus, pressed, and loading behavior.
- Test content wrapping, touch targets, theme persistence, mobile menu behavior, and viewport changes.
- Correct any visible AI-template patterns or repetitive section treatment.

**Checks:** Lint, typecheck, production build, Playwright, axe, keyboard test, reduced-motion test, and screenshots at all required widths in both themes.

**Gate:** Stop and ask: `Approve the completed homepage before it becomes the design source for the rest of the site?`

### Phase 5: Homepage acceptance and design-system extraction

**Goal:** Resolve homepage feedback and lock the reusable system.

Tasks:

- Apply the user's homepage feedback.
- Repeat screenshots and visual comparison.
- Extract only proven reusable components and patterns.
- Remove one-off abstractions that do not improve consistency.
- Lock approved tokens, component behavior, image treatment, and page rhythm in `DESIGN_SYSTEM.md`.
- Mark homepage deviations as resolved or explicitly accepted.

**Acceptance criteria:**

- The homepage unmistakably reflects the supplied design direction.
- No damaged visual artifacts remain.
- No fabricated proof appears.
- Light and dark modes both feel intentionally designed.
- Mobile is recomposed, not merely compressed.
- Navigation and primary conversion paths work with keyboard and touch.
- No unresolved critical accessibility, build, or overflow defects remain.

**Gate:** Stop and ask: `Lock the homepage design system and proceed to Phase 6: Services pages?`

### Phase 6: Services experience

**Goal:** Build the services overview and six service pages from the locked design system.

Tasks:

- Build `/services` with the approved problem-led service finder.
- Build all six approved service routes.
- Reuse the design system without cloning one identical page six times.
- Give each service page meaningful compositional variation based on its content.
- Use approved FAQs, related-service links, and calls to action.
- Add route metadata, internal links, and structured data where truthful.

**Checks:** Route coverage, copy verification, responsive screenshots for representative service pages, keyboard and axe tests, lint, typecheck, and build.

**Gate:** Stop and ask: `Approve the services experience and proceed to Phase 7: Work, About, and Insights?`

### Phase 7: Work, About, and Insights

**Goal:** Build authority and editorial pages without fabricated content.

Tasks:

- Build `/work` and case-study routing with approved empty or unpublished states.
- Build `/about` without inventing team biographies, history, or credentials.
- Build `/insights` and article routing only for publishable approved articles.
- Prevent draft, missing, or placeholder content from becoming indexable.
- Keep editorial layouts visually related to the homepage while allowing page-specific composition.

**Checks:** Content truthfulness audit, route and metadata checks, representative screenshots in both themes, keyboard and axe tests, lint, typecheck, and build.

**Gate:** Stop and ask: `Approve the editorial pages and proceed to Phase 8: Contact, project brief, booking, and legal pages?`

### Phase 8: Conversion flows and legal pages

**Goal:** Build useful, secure, and truthful inquiry and booking paths.

Tasks:

- Build `/contact`, `/start-a-project`, `/book`, `/thank-you`, `/privacy`, and `/terms`.
- Confirm the approved form fields and destinations before enabling submissions.
- Implement server validation, error handling, spam controls, rate limiting, and accessible status behavior.
- Add integrations only when credentials and user approval are available.
- Provide truthful fallback states for unconfigured email, database, Turnstile, or booking services.
- Do not publish incomplete legal claims. Track missing legal decisions.

**Checks:** Successful and unsuccessful submission paths, validation, keyboard flow, screen-reader announcements, privacy review, lint, typecheck, tests, and build.

**Gate:** Stop and ask: `Approve the conversion flows and proceed to Phase 9: SEO, performance, accessibility, and production QA?`

### Phase 9: Site-wide hardening

**Goal:** Verify the entire site as one system.

Tasks:

- Complete metadata, canonical URLs, sitemap, robots, Open Graph, manifest, and truthful structured data.
- Run site-wide accessibility checks.
- Run responsive browser tests across required viewports and themes.
- Run Lighthouse or equivalent performance audits.
- Test navigation, 404, error states, theme persistence, forms, booking fallback, and dynamic routes.
- Check for broken links, missing assets, console errors, hydration errors, duplicate metadata, layout shift, and horizontal overflow.
- Remove unused code, packages, placeholder content, debug logs, and dead styles.
- Review the entire site for AI-template patterns and content that sounds machine-generated.
- Update all project documentation.

**Gate:** Stop with a launch-readiness report. Ask: `Approve the release candidate and proceed to Phase 10: Production release?`

### Phase 10: Production release

**Goal:** Release only the approved, verified version.

Tasks:

- Confirm the working tree, branch, final commit set, and environment-variable requirements.
- Re-run lint, typecheck, tests, and production build from a clean state.
- Confirm all critical content and integration blockers are resolved.
- Present the exact changes that will trigger the Vercel production deployment.
- Push or merge only after explicit user authorization.
- Verify the actual production URL after deployment.
- Check primary pages, both themes, forms or fallbacks, metadata, robots, sitemap, and analytics configuration in production.
- Record deployment details and post-launch follow-ups.

Do not call the project complete until production verification passes or the user explicitly accepts documented external blockers.

## 20. Visual QA protocol

For every UI phase:

1. Run the site in a real browser.
2. Capture screenshots at the required viewports.
3. Compare them side by side with the supplied reference where applicable.
4. Inspect at least:
   - Header height and alignment
   - Hero split and first-fold composition
   - Headline line breaks
   - Body measure and legibility
   - Button size and placement
   - Image crop and focal point
   - Section spacing and divider rhythm
   - Service sequence consistency
   - Process layout
   - Final CTA and footer
   - Light and dark theme balance
   - Mobile navigation and content order
5. Record differences in `VISUAL_QA.md`.
6. Fix all high-impact differences before requesting approval.

Do not describe the page as matching the reference without screenshots and a recorded comparison.

If automated pixel comparison is available, use it as evidence, not as the sole design decision. The target is faithful interpretation across responsive layouts, not a brittle single-width clone.

## 21. Definition of not AI slop

Before each visual approval request, confirm that the work avoids:

- Generic centred hero with a gradient headline
- Two oversized pill buttons floating under every headline
- Repeated rounded cards with interchangeable icons
- Arbitrary glow effects and blurred gradient blobs
- Excessive border radius
- Decorative dashboard mockups unrelated to an agency
- Empty logo clouds
- Fake statistics
- Stock-photo subjects presented as real clients or staff
- Identical section structures repeated down the page
- Excessive scroll reveals
- Meaningless microcopy
- Generic claims that could belong to any agency
- Huge text used without compositional purpose
- Poor mobile crops and desktop-only spacing
- Dark mode produced by automatic inversion

If the design feels generic, do not add more decoration. Revisit hierarchy, typography, imagery, spacing, copy placement, and section composition.

## 22. Completion report format for every phase

End every authorized phase with:

### Phase completed

- Phase number and name
- One-sentence outcome

### What changed

- Concise list of implemented work

### Evidence

- Commands and checks run
- Test results
- Screenshot paths or preview URL, if authorized

### Deviations and blockers

- Differences from the reference or plan
- Missing content, assets, credentials, or decisions
- Severity and recommended resolution

### Approval gate

- Ask one direct question requesting approval for the named next phase

Do not bury failed checks. Do not mark skipped checks as passed. Do not proceed while a critical defect remains unresolved unless the user explicitly accepts it.

## 23. Initial instruction

Begin with **Phase 0 only**.

Do not write production UI code yet. Audit the repository and reference package, create the required Phase 0 documentation, report the findings, and stop at the Phase 0 approval gate.

# END MASTER PROMPT
