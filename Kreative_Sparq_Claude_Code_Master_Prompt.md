# Kreative Sparq Website: Claude Code Master Build Prompt

Copy everything below this line into Claude Code from inside the `Kreative-Sparq` repository.

---

You are the lead product designer, front-end engineer, content implementer, accessibility specialist, SEO engineer, and QA owner for the Kreative Sparq website.

Your job is to build the complete production-ready website in the current repository, verify it thoroughly, and leave the project ready for Vercel deployment. Do not produce another plan instead of building. Inspect the repository, decide the safest implementation path, then execute phase by phase until the site is complete or a genuine external dependency blocks further work.

## 1. Project context

**Brand:** Kreative Sparq  
**Domain:** `https://kreativesparq.com`  
**Repository:** `https://github.com/techilounge/Kreative-Sparq.git`  
**Hosting:** Vercel, already connected to GitHub  
**Market:** Nigeria, with remote collaboration for diaspora and international teams  
**Primary language:** English, Nigeria (`en-NG`)  
**Primary conversions:** Book a strategy call and submit a project brief

Kreative Sparq is a marketing agency in Nigeria that connects strategy, creative work, content, performance marketing, web design, and campaign execution. The website must feel premium, editorial, confident, useful, and specific to the agency. It must not resemble a generic AI-generated SaaS landing page or a stock marketing template.

The approved tagline is:

> Ideas that move people. Marketing that moves business.

## 2. Required source files

Before changing code, locate and read these files in full:

1. `Kreative_Sparq_Website_Implementation_Plan.md`
2. `Kreative_Sparq_Website_Copy_Claude_Code.md`
3. Every existing repository instruction file, including `CLAUDE.md`, `AGENTS.md`, `README.md`, or equivalent
4. The approved light-mode logo asset
5. The approved dark-mode logo asset
6. The approved favicon package

Search the repository before concluding that an asset is absent. Logo or favicon filenames may differ from the descriptions above.

If either of the first two Markdown source files is missing, stop and ask for it. Do not regenerate the implementation plan or website copy from memory. If a logo or favicon is missing, continue with the code and record the missing asset in `CONTENT_REQUIREMENTS.md`, but do not redraw or approximate the logo in CSS.

### Authority order

Use this order when instructions appear to conflict:

1. The user's explicit instruction in the active session
2. `Kreative_Sparq_Website_Copy_Claude_Code.md` for wording, metadata, calls to action, form text, and content status
3. `Kreative_Sparq_Website_Implementation_Plan.md` for information architecture, design direction, technical architecture, motion, SEO, accessibility, and acceptance criteria
4. Existing repository instructions and compatible project conventions
5. Current official documentation for the installed tools

Do not silently resolve a material conflict by inventing a third direction. Record the conflict and choose the option highest in this order.

## 3. Non-negotiable rules

### Content integrity

- Use the approved website copy verbatim.
- Do not rewrite it to sound more polished, concise, exciting, premium, or SEO-friendly.
- Do not add em dashes.
- Do not generate filler copy.
- Do not invent clients, case studies, results, metrics, testimonials, awards, offices, addresses, partners, team members, certifications, prices, response times, or years of experience.
- Keep all unresolved values as tracked requirements. Never expose raw placeholders such as `{{CONTACT_EMAIL}}` in production UI.
- Hide blocks marked `HIDE UNTIL AVAILABLE`.
- Do not publish articles or case studies that still require an author, firsthand example, client approval, or verified result.
- Do not add keyword-stuffed location pages.
- Do not create thin pages for search variations.

### Design integrity

- Use the Claude Design Skill before building any visual interface.
- Treat the project's approved design tokens and `DESIGN_SYSTEM.md` as stronger constraints than generic Design Skill suggestions.
- Do not introduce beige, cream, warm ivory, purple gradients, unrelated accent colours, neon glows, glassmorphism, random blobs, fake 3D objects, or generic dashboard graphics.
- Do not use a centered gradient headline, two oversized pill buttons, a floating product screenshot, and a logo cloud as the default hero pattern.
- Do not turn every section into a rounded card.
- Do not put every service into the same icon-card layout.
- Do not use oversized pill-shaped controls unless the component's function genuinely calls for it.
- Do not add generic icons where typography, a divider, number, or image communicates more clearly.
- Do not recreate logo lettering with web fonts or CSS.
- Do not use AI-generated people in final client-facing pages.
- Do not use Lorem Ipsum.

### Engineering integrity

- Inspect the current repository and `git status` before editing.
- Preserve unrelated work and user changes.
- Determine the package manager from the lockfile and use it consistently.
- Preserve compatible installed versions. Do not run a blanket dependency upgrade.
- Add only packages that have a clear role in the approved architecture.
- Prefer Server Components. Use Client Components only where browser state, interaction, animation, or third-party embeds require them.
- Do not make an entire page a Client Component for convenience.
- Keep secrets server-side. Never expose private keys through `NEXT_PUBLIC_` variables.
- Do not weaken TypeScript, lint, test, or security settings to make a build pass.
- Do not disable accessibility rules to silence findings.
- Do not push, merge, or deploy until all available local checks pass.
- Push to the connected production branch only when the user has explicitly authorised deployment in the active session. Otherwise leave verified commits ready and provide the exact next command.

## 4. Working method

Work autonomously through the phases below. Do not pause for routine choices already covered by the source files. Ask the user only when a missing decision would materially change the result and cannot be handled with an approved hidden or empty state.

Create and maintain these project files:

- `IMPLEMENTATION_STATUS.md`: phases, completed work, test results, blockers, and next action
- `CONTENT_REQUIREMENTS.md`: every unresolved content, contact, legal, CMS, booking, or asset requirement
- `DESIGN_SYSTEM.md`: the approved visual tokens, component rules, responsive behaviour, motion rules, and AI-pattern guardrails
- `.env.example`: all required variables with safe empty values and comments
- `README.md`: local setup, scripts, content workflow, environment configuration, testing, and deployment

At the end of each phase:

1. Run the checks relevant to that phase.
2. Review the result in both light and dark modes where UI exists.
3. Update `IMPLEMENTATION_STATUS.md`.
4. Fix discovered problems before moving forward.
5. Make a focused local commit if repository policy permits. Do not push yet.

If tools support screenshots or browser automation, use them. If they do not, add Playwright screenshot checks for the required viewports and report where manual visual review remains necessary.

## 5. Repository reconnaissance

Before implementation:

1. Inspect the file tree, package files, lockfile, framework configuration, TypeScript configuration, existing routes, styles, tests, and Vercel configuration.
2. Inspect `git status` and recent commits without changing history.
3. Run the existing install and validation commands where safe.
4. Identify whether this is an empty repository, a scaffold, or an active project.
5. Inventory all supplied brand assets and record their pixel dimensions, format, alpha channel, and intended mode.
6. Check whether any environment variables, CMS schemas, database migrations, or service adapters already exist.
7. Note any difference between the current repository and the approved plan.

If the repository is empty, scaffold the application in place. Do not create a nested project directory.

## 6. Technical foundation

Use the repository's compatible versions where present. For a new project, use current stable versions supported by Vercel at implementation time:

- Next.js App Router
- React
- TypeScript with strict mode
- Tailwind CSS using its current official Next.js/PostCSS setup
- Motion for React, imported through `motion/react`
- `next/font` for self-hosted fonts
- A server-safe theme solution such as `next-themes`, or an equivalent implementation that prevents an incorrect-theme flash
- Zod for server-side form validation
- Sanity for structured services, work, insights, testimonials, people, and global settings when credentials are available
- Supabase Postgres for lead storage when configured
- Resend for transactional email when configured
- Cloudflare Turnstile, verified on the server through Siteverify
- Cal.com for the strategy-call embed
- Vercel Web Analytics and Speed Insights
- Playwright for end-to-end and responsive tests
- axe integration for automated accessibility checks

Pin exact installed versions in the lockfile. Set `.nvmrc` and `package.json` engines to a currently supported Vercel Node.js LTS version. Do not guess a version if the Vercel project or repository already specifies one.

### Graceful configuration

The site must build successfully without production secrets.

- Public marketing pages must use typed local content as the safe baseline.
- Keep the content access layer isolated so Sanity can be enabled without rewriting page components.
- If Sanity is configured, follow the current official Next.js App Router integration. Preview and visual-editing code must not increase normal production requests unnecessarily.
- If Supabase, Resend, Turnstile, or Cal.com is not configured, provide a clear development warning and a safe user-facing fallback. Do not simulate a successful submission or booking.
- Do not expose an active form that discards inquiries.

## 7. Required route structure

Build these routes:

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

Also implement framework-standard not-found, error, loading, Open Graph image, icon, and manifest files where appropriate.

Do not create location pages, pricing pages, careers pages, or extra landing pages unless approved source content exists.

## 8. Suggested code organisation

Adapt to the existing repository if it already has a sound structure. Otherwise use:

```text
app/
  (marketing)/
    page.tsx
    services/
      page.tsx
      [slug]/page.tsx
    work/
      page.tsx
      [slug]/page.tsx
    about/page.tsx
    insights/
      page.tsx
      [slug]/page.tsx
    contact/page.tsx
    start-a-project/page.tsx
    book/page.tsx
    thank-you/page.tsx
    privacy/page.tsx
    terms/page.tsx
  api/
  layout.tsx
  manifest.ts
  robots.ts
  sitemap.ts
  not-found.tsx
  error.tsx
components/
  layout/
  navigation/
  sections/
  forms/
  motion/
  seo/
  ui/
content/
  global.ts
  pages/
  services/
  articles/
lib/
  analytics/
  content/
  email/
  lead-store/
  rate-limit/
  seo/
  theme/
  validation/
public/
  brand/
  images/
sanity/
styles/
tests/
```

Use typed content objects or schemas. Do not bury production copy across JSX files.

## 9. Design system

Create semantic design tokens rather than scattering raw colour values through components.

### Core palette

| Token | Value | Use |
|---|---:|---|
| Forest | `#2A371B` | Light-mode brand headings and navigation |
| Deep Forest | `#152011` | High-contrast forest details |
| Terracotta | `#CE5129` | Large brand accents |
| Burnt Terracotta | `#A63B1C` | Accessible light-mode action backgrounds |
| Charcoal | `#242424` | Light-mode body text |
| Soft Sage | `#D8DEC9` | Secondary surfaces and rules |
| Mineral White | `#F2F4F0` | Main light-mode background |
| Pure White | `#FFFFFF` | Selected raised surfaces and forms |
| Light Border | `#D7DDD5` | Light-mode dividers and field outlines |
| Dark Forest | `#1A2421` | Main dark-mode background |
| Dark Surface | `#22302C` | Dark-mode panels, menus, and forms |
| Dark Raised Surface | `#2B3A35` | Hovered or elevated dark surfaces |
| Dark Primary Text | `#F4F5F2` | Dark-mode primary text |
| Dark Secondary Text | `#B8C0BB` | Dark-mode supporting text |
| Dark Border | `#3C4A45` | Dark-mode rules and outlines |
| Sparq Orange | `#F06A3C` | Dark-mode links, focus, active states, and logo accent |

### Colour rules

- Use Mineral White, not warm ivory or beige, as the primary light background.
- Use Dark Forest, not pure black, as the dark background.
- Do not create dark mode by inverting the page.
- Use Burnt Terracotta for light-mode buttons with white text when contrast requires it.
- Use Sparq Orange for small interactive accents on Dark Forest.
- Do not use white text on Terracotta for small essential copy without a verified contrast pass.
- Use borders and tonal surface changes more than large shadows in dark mode.
- Test every text and control state against WCAG 2.2 AA contrast requirements.

### Theme behaviour

- Support `Light`, `Dark`, and `System` settings.
- Use the operating-system preference on first visit.
- Persist an explicit visitor choice.
- Set the theme before first paint to prevent a flash or hydration mismatch.
- Set `color-scheme` and mode-specific `theme-color` metadata.
- Use the correct approved logo asset for each mode.
- Test hard reloads, client navigation, private browsing, and a changed system preference.

### Typography

- Display: Newsreader through `next/font`
- Body and UI: Plus Jakarta Sans through `next/font`
- Logo: approved image asset only

Use a restrained fluid type scale with `clamp()`. Build clear hierarchy through size, weight, width, line height, alignment, and whitespace. Do not use display typography for long body passages. Avoid loading unnecessary font weights.

### Layout

- Use a disciplined responsive grid with generous whitespace.
- Use asymmetric editorial composition where it improves hierarchy.
- Vary section alignment and scale intentionally. Do not repeat the same centered three-column rhythm down every page.
- Use full-width rules, text-led lists, image sequences, and editorial panels before reaching for cards.
- Keep body text at a readable measure.
- Use restrained corner radii. Define a small radius scale and use it consistently.
- Create visual emphasis through composition and typography before effects.

### Imagery

- Use approved project work and real photography when available.
- Prioritise imagery relevant to Nigerian founders, teams, professional services, hospitality, culture, education, events, consumer brands, and real working environments.
- Never substitute fake client work.
- When approved imagery is unavailable, use a deliberate text-led layout, colour field, cropped brand asset, or labelled content requirement. Do not use random stock handshakes or generated faces.
- Store alt text as content.

## 10. Component system

Build composable, typed components. The expected inventory includes:

- `SiteHeader`
- `DesktopNavigation`
- `MobileNavigation`
- `ThemeSwitcher`
- `Logo`
- `HeroEditorial`
- `ProofStrip`
- `ServiceIndex`
- `ServiceListItem`
- `FeaturedCaseStudy`
- `WorkGrid`
- `ProcessSteps`
- `TestimonialFeature`
- `InsightCard`
- `BookingCTA`
- `ProjectBriefForm`
- `ContactForm`
- `BookingEmbed`
- `SiteFooter`
- `MotionReveal`
- `ResponsiveImage`
- `Breadcrumbs`
- `JsonLd`
- `EmptyState`
- `FieldError`
- `FormStatus`

Do not create a generic component abstraction before at least two real uses prove it is needed. Do not create dozens of cosmetic variants that bypass the token system.

### Interaction states

Every interactive component must have intentional:

- Default
- Hover
- Keyboard focus
- Active or pressed
- Disabled
- Loading
- Success
- Error

Review these states in both themes. Focus must remain visible and must not be hidden by sticky headers or overlays.

## 11. Navigation and global shell

### Header

- Start transparent only where the hero artwork supports legibility.
- Transition to Mineral White in light mode or Dark Surface in dark mode after scrolling.
- Include the theme-appropriate logo, primary navigation, theme control, and `Book a strategy call` CTA.
- Keep the active route clear without relying only on colour.
- Do not make the header excessively tall.

### Mobile navigation

- Use an accessible full-screen or large-sheet menu.
- Lock background scroll while open.
- Trap focus appropriately and restore it to the trigger on close.
- Close on Escape and route navigation.
- Keep the theme control and booking CTA accessible.
- Ensure every touch target is at least 44 by 44 CSS pixels as the project standard.

### Footer

Implement the exact footer copy and groups from the copy deck. Hide unconfigured contact methods and social links. Do not render an empty newsletter form if its subscription destination is not configured.

## 12. Page implementation

Use the page order and exact copy from the approved files.

### Home

Build a coherent editorial narrative:

1. Header
2. Hero with primary booking CTA and secondary work CTA
3. Capability statement or proof strip
4. Services overview
5. Featured work or approved empty state
6. Why Kreative Sparq
7. Four-step process
8. Audience or sector context
9. Verified testimonial only when available
10. Insights with only publishable articles
11. Final dual-path CTA
12. Footer

The hero must feel like an agency, not a software product. Do not add fake client logos or metrics to fill space.

### Services overview

Use the approved problem-led service finder and the six service groups. The page should help a visitor identify the relevant route without presenting a wall of equal cards.

### Six service pages

Implement every service page independently with its approved:

- Outcome-led hero
- Problem context
- Capabilities or deliverables
- Process
- Fit and limits
- FAQs
- Related services
- Primary and secondary CTA

Do not turn the pages into identical layouts with swapped headings. Reuse components while allowing meaningful compositional differences.

### Work

- Use approved case studies only.
- If no case studies are publishable, render the approved empty state and keep the page visually intentional.
- Hide filters that would produce empty categories.
- Case studies require challenge, objective, strategy, execution, verified results with source and period, gallery rights, and client approval.
- Draft and incomplete case studies must be `noindex` and absent from public listings and sitemap output.

### About

- Use the approved point of view, beliefs, working relationship, service area, and CTA copy.
- Do not invent a founding story.
- Hide the team section until real profiles and approved photographs exist.

### Insights

- Build index filtering and article templates.
- Treat the three supplied launch articles as drafts until their author details, editorial review, and required firsthand examples are complete.
- Do not publish thin placeholder posts to make the grid look populated.
- Show publish and substantive update dates accurately.

### Contact

- Render only monitored contact channels.
- Use the approved form labels, help text, validation messages, and response expectation.
- Provide the booking route as an alternative.

### Start a Project

- Build the five-step project brief exactly as defined.
- Preserve entered values during back and forward navigation.
- Show clear progress.
- Validate at each step and again on the server.
- Use the approved restore, expiry, network, and validation messages.
- Do not invent budget bands. Until configured, either omit that input safely or show only `Not decided yet` and record the requirement.

### Book

- Lazy-load the Cal.com embed after the surrounding page is usable.
- Keep the approved explanation visible without the embed.
- Provide an accessible email or contact fallback when the embed fails.
- Track booking completion only from a reliable Cal.com event.

### Legal, thank-you, error, and not-found pages

- Use the supplied copy.
- Do not publish unresolved legal placeholders. Keep the route blocked from production or replace the placeholder with counsel-approved content.
- Thank-you pages must be `noindex` and must not echo private form values.
- Error and not-found pages must provide a useful route back without decorative clutter.

## 13. Motion system

Motion should clarify hierarchy, state, and navigation. It must not be the source of the site's personality.

Use CSS transitions for simple hover and colour changes. Use Motion for React only for orchestrated reveals, layout transitions, and interactions that benefit from its APIs.

### Timing guidance

- Text reveal: 450 to 650 ms
- Stagger: 40 to 70 ms
- Image reveal: 600 to 800 ms
- Hover movement: no more than 4 to 6 px
- Button feedback: 160 to 220 ms
- Navigation transitions: 180 to 240 ms

### Motion rules

- Wrap appropriate client-side motion with `MotionConfig reducedMotion="user"`.
- Use `useReducedMotion` for video, parallax, and custom motion decisions.
- Replace large transforms with opacity or immediate state changes for reduced-motion users.
- Do not use scroll hijacking.
- Do not use continuous parallax on mobile.
- Do not animate every section the same way.
- Section reveals should run once.
- Pause autoplaying media outside the viewport.
- Avoid large animated background video on mobile.
- The layout must still feel complete with animation disabled.

## 14. Responsive implementation

Build mobile-first and test the real approved copy at:

- 360 to 479 px
- 480 to 767 px
- 768 to 1023 px
- 1024 to 1279 px
- 1280 to 1535 px
- 1536 px and above

Mandatory screenshot widths:

- 375 px
- 768 px
- 1024 px
- 1440 px

Test portrait and landscape phone layouts, 200 percent browser zoom, long headings, keyboard focus, and both themes.

There must be:

- No horizontal page scrolling
- No clipped logo, navigation, heading, form, or CTA
- No text embedded in images when HTML would work
- Correct responsive image sizing and art direction
- Comfortable reading measure
- Touch-friendly controls
- Forms that use the correct input type and autocomplete token
- A mobile CTA only if it does not cover content or compete with the form

## 15. Content architecture

### Typed local baseline

Create typed content structures for:

- Global settings
- Navigation and footer
- Static page metadata and copy
- Services
- Case studies
- Articles
- People
- Testimonials
- FAQs

The approved copy file is the initial source. Convert it carefully into content objects without paraphrasing. Add automated checks that required fields exist and route slugs are unique.

### CMS adapter

Create a content adapter boundary so page components do not care whether data comes from local files or Sanity.

If Sanity credentials are available:

- Implement schemas for service, case study, article, person, testimonial, and global settings.
- Configure preview or draft mode using the current official App Router approach.
- Protect preview routes and tokens.
- Require image alt text and SEO fields where appropriate.
- Use references between services, work, and articles.
- Do not render live-content tooling during ordinary production requests unless current official guidance requires it.

If credentials are unavailable:

- Keep local content active.
- Complete the schemas and adapter if practical.
- Document the exact setup steps without blocking the public build.

### Publishability rules

Model content status explicitly, for example `draft`, `review`, and `published`.

- Public listings return only `published` records.
- Sitemap output includes only canonical published records.
- Draft records use `noindex` in preview and cannot leak into production collections.
- Case-study results require a value, label, period, source, and context.
- Testimonials require quote, name, role, organisation, and approval.
- Articles require author, publish date, editorial review, and substantive content.

## 16. Forms and lead handling

Use progressive enhancement and Server Actions or route handlers that follow the current official Next.js security model.

### Validation

- Define shared Zod schemas for contact and project forms.
- Validate, trim, normalise, and length-limit all fields on the server.
- Treat client validation as convenience, not security.
- Reject unexpected fields.
- Use accessible field errors and an error summary.
- Preserve non-sensitive entries after recoverable errors.
- Never log full inquiry text or sensitive personal data.

### Spam and abuse protection

- Add a honeypot with safe timing checks.
- Integrate Cloudflare Turnstile when configured.
- Verify every Turnstile token on the server through Siteverify. Client success alone is not validation.
- Tokens are short-lived and single-use. Handle timeout and duplicate errors clearly.
- Add a rate-limiter abstraction backed by a durable provider when available. Do not pretend an in-memory limiter is reliable across Vercel instances.
- Document any Vercel Firewall or external rate-limit configuration required outside the repository.

### Lead storage

When Supabase is configured, store successful submissions in a server-only `leads` table. Include only fields justified by the approved form and measurement plan:

- `id`
- `created_at`
- `lead_type`
- `name`
- `email`
- `phone`
- `company`
- `role`
- `website_url`
- `service_interests`
- `goal_or_challenge`
- `budget_band`
- `desired_start`
- `target_date`
- `referral_source`
- `landing_page`
- UTM fields
- consent timestamps
- marketing consent
- internal status

The public client must never receive a service-role or secret key. Use a server-only database client. Add a migration and row-level security appropriate to the chosen access pattern. Do not let a browser read lead records.

### Email

When Resend is configured:

- Send the approved confirmation email to the visitor.
- Send an internal notification containing only the information needed to review the lead.
- Use a verified sender domain.
- Escape or safely render all user input.
- Handle email failure separately from database success so the lead is not silently lost.
- Use idempotency or another duplicate-protection strategy where supported.

If storage succeeds and email fails, keep the lead, log a privacy-safe error, and show a truthful confirmation. If storage fails, do not claim the inquiry was received.

## 17. SEO implementation

Follow the metadata and search instructions in the copy deck.

### Required implementation

- Set `<html lang="en-NG">`.
- Use Next.js metadata APIs for unique titles, descriptions, canonicals, robots, Open Graph, and social metadata.
- Generate `sitemap.xml` from public canonical routes and published content.
- Generate `robots.txt` with correct production and preview behaviour.
- Redirect the non-canonical `www` or apex hostname consistently through Vercel configuration.
- Use one visible H1 per page.
- Maintain logical heading order.
- Keep important content in rendered HTML.
- Use descriptive internal links.
- Use clean lowercase slugs.
- Add permanent redirects for changed slugs.
- Add useful alt text and blank alt text for decorative images.
- Create branded Open Graph images without cramming body copy into them.

### Structured data

- `Organization` on the home page with verified fields only
- `BreadcrumbList` on services, case studies, and articles
- `Article` or `BlogPosting` on published insights with accurate author and date fields
- `ProfessionalService` or a local-business subtype only after a real public address and operating details are approved

Do not add fabricated ratings, self-serving reviews, invented addresses, unsupported service areas, FAQ schema solely to chase a rich result, or structured data that does not match visible copy.

Do not add special AI-search markup, `ai.txt`, or invented “GEO schema.” Current Google guidance applies the same technical and people-first foundations to AI features.

### Index controls

Use `noindex, follow` for:

- Thank-you pages
- Draft content previews
- Incomplete legal pages
- Internal search or filter result URLs when separate URLs exist
- Parameter variants that should not become search results

## 18. Accessibility

Target WCAG 2.2 AA and go beyond the minimum where the design system already specifies a stronger standard.

Required:

- Skip-to-content link
- Semantic landmarks
- Keyboard-complete navigation
- Visible focus styles in both themes
- Focus not obscured by sticky UI
- Correct dialog and mobile-menu focus management
- 44 by 44 CSS pixel project-standard touch targets
- Form labels, descriptions, errors, and error summary
- No colour-only meaning
- Sufficient text and non-text contrast
- Captions and transcripts for meaningful media
- Reduced-motion support
- Correct accessible names for controls and icons
- Descriptive link labels
- Screen-reader announcements for form status, filters, and theme changes
- Sensible heading order
- No positive `tabindex`

Test with automated axe checks and manual keyboard review. Where available, perform a screen-reader smoke test for navigation, theme switching, contact submission, project form progression, and booking fallback.

## 19. Performance

Targets for key templates:

- Mobile Lighthouse Performance: 90 or higher
- Accessibility: 95 or higher
- Best Practices: 95 or higher
- SEO: 95 or higher
- LCP: 2.5 seconds or less at the 75th percentile target
- INP: 200 ms or less at the 75th percentile target
- CLS: 0.1 or less at the 75th percentile target

Controls:

- Prefer static generation and Server Components for marketing content.
- Keep client bundles small and local to interactive features.
- Use `next/image` with explicit dimensions and accurate `sizes`.
- Use AVIF or WebP output where appropriate.
- Preload only the true LCP asset and critical fonts.
- Lazy-load the booking embed, non-critical video, and below-fold media.
- Reserve space for images, forms, status messages, and embeds.
- Avoid autoplaying background video on mobile.
- Avoid expensive continuous scroll listeners.
- Use CSS for simple effects.
- Analyse the production bundle before launch.
- Test on throttled mobile conditions, not only local desktop Wi-Fi.

## 20. Analytics and measurement

Integrate Vercel Web Analytics and Speed Insights using their current official Next.js packages and setup.

Track these events once per valid action:

- `book_call_click`
- `booking_completed`
- `project_brief_started`
- `project_brief_submitted`
- `contact_form_submitted`
- `service_viewed`
- `case_study_viewed`
- `case_study_cta_clicked`
- `email_click`
- `whatsapp_click`

Capture landing page and approved UTM values with the lead record. Do not send message bodies, names, email addresses, phone numbers, or other personal data to analytics.

Do not install GA4 unless it is explicitly required and the consent and privacy implementation has been approved.

## 21. Security and privacy

- Keep secrets in Vercel environment variables.
- Maintain `.env.example` with empty safe values.
- Validate and normalise form input on the server.
- Escape user-controlled content in email and admin views.
- Use safe headers and a Content Security Policy after inventorying required origins.
- Restrict `frame-src`, `connect-src`, `script-src`, and image sources to the actual tools in use.
- Account for Cal.com, Sanity preview, Turnstile, Vercel Analytics, and Speed Insights only when enabled.
- Prevent open redirects.
- Do not expose stack traces or internal identifiers to visitors.
- Use generic public references rather than database IDs.
- Keep preview tokens, CMS write tokens, database secret keys, Resend keys, and Turnstile secrets server-only.
- Add dependency and secret scanning to CI where available.
- Do not collect more lead data than the approved forms require.
- Do not ship Privacy or Terms pages with raw legal placeholders.

## 22. Testing strategy

Use the repository's test tools if they are already sound. Add the minimum needed to cover the following.

### Static checks

- TypeScript strict check
- Lint
- Formatting check
- Production build
- Broken internal-link check
- Missing metadata check
- Duplicate slug and title check
- Placeholder scan for `{{`, `CONTENT REQUIRED`, `HIDE UNTIL AVAILABLE`, Lorem Ipsum, sample clients, and dummy metrics in publicly rendered content
- Secret scan

### Unit and integration tests

- Content schemas and adapters
- Zod validation
- Metadata generation
- Sitemap inclusion and exclusion
- Robots rules
- Publishability filters
- Lead handler success and failure branches
- Turnstile verification handling
- Email and storage adapter behaviour
- Analytics event payloads without personal data

### Playwright tests

- Header navigation and mobile menu
- Theme setting, persistence, System mode, and hard reload
- No incorrect-theme flash where testable
- Service navigation
- Work and Insights approved empty states
- Contact validation and safe error recovery
- Project form progression, back navigation, preserved entries, and validation
- Booking embed fallback
- Thank-you privacy behaviour
- 404 route
- Keyboard-only navigation
- Reduced-motion mode
- No horizontal overflow at required widths
- Automated axe scan on the home page, services, one service page, About, Contact, Start a Project, Book, Privacy, and Terms

### Visual checks

Capture and inspect full-page screenshots at 375, 768, 1024, and 1440 pixels in both light and dark modes for:

- Home
- Services
- One representative service page
- Work
- About
- Insights
- Contact
- Start a Project
- Book

Inspect real rendered copy, not skeletons. Correct collisions, awkward line breaks, sparse sections, overlong measures, unbalanced empty states, theme inconsistencies, and repeated template patterns.

### Lighthouse

Run production-mode Lighthouse or Lighthouse CI on:

- Home
- Services
- One service page
- Contact or Start a Project
- One published article when available

Record results in `IMPLEMENTATION_STATUS.md`. Fix material failures before deployment. Do not manipulate the audit by removing required functionality only during tests.

## 23. Implementation phases

### Phase 0: Audit and content inventory

Tasks:

- Complete repository reconnaissance.
- Read the two approved source files in full.
- Inventory brand assets and current code.
- Create `IMPLEMENTATION_STATUS.md` and `CONTENT_REQUIREMENTS.md`.
- Record unresolved contact, business, team, case-study, legal, CMS, booking, and budget-band information.
- Decide which sections must be hidden at first launch.

Gate:

- The current repository state is understood.
- No existing user work has been overwritten.
- All approved content sources and available assets are accounted for.

### Phase 1: Application foundation

Tasks:

- Scaffold or repair the Next.js App Router project.
- Configure strict TypeScript, lint, formatting, scripts, Node version, and lockfile.
- Add the route skeleton, global layout, metadata base, error files, and test foundation.
- Configure Tailwind using the current official setup.
- Add `.env.example` and README setup sections.
- Ensure a minimal build succeeds.

Gate:

- Install, lint, typecheck, test foundation, and production build run successfully.
- The Vercel-compatible project root is correct.

### Phase 2: Design system and theme

Tasks:

- Use Claude Design Skill with the locked visual constraints.
- Create `DESIGN_SYSTEM.md`.
- Implement semantic light and dark tokens.
- Configure Newsreader and Plus Jakarta Sans through `next/font`.
- Implement the theme initializer, `Light`, `Dark`, and `System` selector, persistence, and mode-specific metadata.
- Implement the logo switcher and favicon assets.
- Build core buttons, links, fields, labels, dividers, container, grid, typography, surface, and status components.
- Build an internal style-review route if useful, excluded from production indexing.

Gate:

- No theme flash in tested paths.
- Core components pass contrast, focus, keyboard, and responsive checks in both themes.
- The system does not contain unapproved colours or decorative patterns.

### Phase 3: Site shell and global content

Tasks:

- Build header, desktop navigation, mobile navigation, theme switcher, skip link, footer, global CTA, breadcrumbs, and motion provider.
- Add global content objects and settings.
- Implement default metadata, manifest, favicon, Open Graph baseline, robots, sitemap foundation, Analytics, and Speed Insights.

Gate:

- Navigation is keyboard-complete.
- Mobile menu focus is correct.
- Header and footer work at all required widths in both themes.

### Phase 4: Core marketing pages

Tasks:

- Build Home.
- Build Services overview.
- Build all six service pages.
- Build About.
- Use approved hidden and empty states.
- Add route metadata, internal links, breadcrumbs, and structured data where specified.

Gate:

- Every page uses exact approved copy.
- There is one H1 per page.
- No fabricated proof appears.
- Pages are compositionally related but not identical templates.
- Responsive and theme screenshots pass review.

### Phase 5: Work and Insights

Tasks:

- Implement typed local content and the CMS adapter.
- Add Sanity schemas and preview support when configured.
- Build Work index and case-study template.
- Build Insights index, filtering, article template, author block, dates, related content, and article structured data.
- Add the three supplied launch articles as non-public drafts until all editorial requirements are met.

Gate:

- Draft content cannot enter public listings, sitemap, or production metadata.
- Empty states remain polished and honest.
- No sample client or result is present.

### Phase 6: Contact, project brief, and booking

Tasks:

- Build Contact.
- Build the five-step Start a Project flow.
- Build Book with lazy Cal.com embed and fallback.
- Add Server Actions or route handlers, Zod, honeypot, Turnstile adapter, durable rate-limit adapter, Supabase lead-store adapter, Resend email adapter, confirmation states, and privacy-safe logging.
- Build Thank You variants without exposing submitted data.
- Add conversion events.

Gate:

- Forms cannot claim success when persistence fails.
- Test submissions store correctly when configured.
- Confirmation and internal email paths are verified.
- Spam controls include mandatory server-side Turnstile verification when enabled.
- Private keys never reach the client bundle.

### Phase 7: Legal, SEO, accessibility, performance, and security

Tasks:

- Implement Privacy and Terms only with resolved, reviewed content. Otherwise keep them blocked from production and record the blocker.
- Complete metadata, canonical, sitemap, robots, redirects, structured data, Open Graph images, and social previews.
- Run accessibility review and correct findings.
- Add security headers and review external origins.
- Complete performance work and bundle analysis.
- Verify analytics events and personal-data exclusions.

Gate:

- Key templates meet agreed audit targets or every exception is documented with evidence.
- Structured data validates and matches visible content.
- No unresolved placeholder is visible on a public route.

### Phase 8: Full QA and deployment readiness

Tasks:

- Run all static, unit, integration, Playwright, axe, responsive, theme, reduced-motion, performance, and production-build checks.
- Inspect screenshots in both themes.
- Run link and placeholder scans.
- Review browser console and server logs for actionable warnings.
- Verify environment-variable documentation.
- Confirm Vercel project settings, canonical domain plan, and deployment commands.
- Update `IMPLEMENTATION_STATUS.md`, `CONTENT_REQUIREMENTS.md`, and README.

Gate:

- All available automated checks pass.
- Remaining blockers depend on information, credentials, approvals, or external configuration the user must supply.
- Deployment is safe and reversible.

### Phase 9: Commit and deploy

Only after explicit deployment authorisation:

1. Confirm the intended branch and remote.
2. Confirm no unrelated changes are staged.
3. Create focused commits with clear messages.
4. Push the authorised branch.
5. Watch the Vercel build and deployment status.
6. If the deployment fails, inspect logs, correct the cause, rerun local checks, and push a focused fix.
7. Verify the production or preview URL, routes, forms, theme, metadata, sitemap, robots, analytics, and Core Web Vitals instrumentation.

Do not force-push. Do not rewrite shared history. Do not bypass failed checks merely to trigger a deployment.

## 24. Required environment variables

Create `.env.example` using clear comments and safe empty values. Use only variables required by the implemented adapters.

```text
NEXT_PUBLIC_SITE_URL=https://kreativesparq.com

# Booking
NEXT_PUBLIC_CAL_LINK=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
SANITY_PREVIEW_SECRET=

# Email
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=

# Lead storage
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=

# Spam protection
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Optional durable rate limiting, only if selected
RATE_LIMIT_PROVIDER_URL=
RATE_LIMIT_PROVIDER_TOKEN=
```

If current official providers use different variable names, update this example and document the reason. Never retain obsolete public or secret key conventions simply because they appeared in an older plan.

## 25. AI-pattern design audit

Before accepting each page, answer these questions and fix any weak result:

- Does this look like a marketing agency or a generic SaaS template?
- Is the hierarchy coming from composition and typography, or from effects?
- Are there too many cards, pills, gradients, glows, icons, or floating shapes?
- Does each section have a reason for its layout?
- Are several consecutive sections using the same alignment and column pattern?
- Is any animation compensating for a weak static design?
- Would the page still feel designed with motion disabled?
- Does the real approved copy fit naturally, or does the layout appear designed around placeholder lengths?
- Does the page show fake proof, implied scale, or unearned authority?
- Are light and dark modes both intentional?
- Could this page be confused with a default AI website from another agency?

Use Claude Design Skill to critique the implemented screenshots, not to replace the locked brand direction. Record material design changes in `IMPLEMENTATION_STATUS.md`.

## 26. Definition of done

The website is complete only when:

- Every required route exists and uses approved copy.
- Light, Dark, and System themes work without a first-paint mismatch.
- Approved logo and favicon assets are used correctly.
- All required widths are usable and visually reviewed.
- Navigation, controls, forms, and embeds are keyboard-accessible.
- Reduced-motion preferences are respected.
- No fabricated client, result, person, quote, award, address, price, or credential appears.
- No unresolved placeholder appears in public UI, metadata, email, structured data, or sitemap output.
- Work and Insights handle missing publishable content honestly.
- Contact and project forms either work end to end or are clearly disabled with a monitored fallback.
- Server-side validation and spam checks are active where configured.
- Secrets are server-only.
- Metadata, canonicals, sitemap, robots, Open Graph, and structured data are correct.
- Analytics records approved actions without personal data.
- Tests, lint, typecheck, and production build pass.
- Performance, accessibility, and SEO targets are met or exceptions are documented with evidence.
- README, `.env.example`, content requirements, and implementation status are current.
- The Vercel deployment succeeds when authorised.

## 27. Final response format

When work is complete, provide a concise handoff with:

1. **Outcome:** What is built and whether it is deployed
2. **Routes:** Completed pages and any intentionally hidden routes
3. **Design:** Theme, responsive, motion, and asset status
4. **Integrations:** CMS, lead storage, email, spam protection, booking, analytics
5. **Verification:** Exact commands and results for lint, typecheck, tests, build, accessibility, Lighthouse, and screenshots
6. **Content requirements:** Only unresolved facts, approvals, assets, credentials, and legal items
7. **Deployment:** Branch, commit, Vercel status, canonical URL, and any manual dashboard actions
8. **Next action:** The single most useful next step for the user

Do not say “everything is production-ready” unless the evidence above supports it. Do not hide skipped tests or unresolved production dependencies.

## 28. Official implementation references

Use the current versions of these official sources when repository behaviour or package APIs differ from older examples:

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js forms with Server Actions](https://nextjs.org/docs/app/guides/forms)
- [Next.js metadata APIs](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [Motion for React](https://motion.dev/docs/react)
- [Motion accessibility](https://motion.dev/docs/react-accessibility)
- [Vercel Web Analytics](https://vercel.com/docs/analytics)
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights)
- [Sanity with Next.js](https://www.sanity.io/docs/nextjs)
- [Sanity visual editing with the App Router](https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js-app-router)
- [Supabase with Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)
- [Resend with Next.js](https://resend.com/nextjs)
- [Cloudflare Turnstile server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Cal.com embeds](https://cal.com/embed)
- [WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/)

## 29. Begin now

Start with repository reconnaissance and the full source-file read. Then execute the phases in order. Keep the build working as you go, use the approved empty states instead of fabrication, and continue until the definition of done is met or an external requirement genuinely blocks further work.
