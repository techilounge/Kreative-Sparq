# Kreative Sparq design system

Phase 1 design contract, updated through the approved Phase 4 implementation and Phase 5 acceptance review on 22 September 2026. **Status: homepage baseline locked for Phase 5 approval.** Sections 1–8 explain the reference translation; section 9 records the exact implemented choices and takes precedence where an earlier target range differs. Measurements from the 799 × 1967 px composite reference are approximate. The approved copy deck controls all published wording.

## 1. Design intent and authority

- Preserve the reference's editorial serif/sans pairing, asymmetric split hero, image-led service rhythm, thin rules, forest and terracotta relationship, large featured-work moment, numbered process, restrained dark band, and spacious close.
- Exclude the damaged hero and footer colour bands, any export-like noise, all unverified logos/numbers/project claims, and the sample testimonial. Never use the screenshot itself as a page asset.
- Use the exact homepage and global copy in Kreative_Sparq_Website_Copy_Claude_Code.md. The source image supplies composition, not text. Use the Codex master prompt for sequence and gates; use the implementation plan for compatible technical and accessibility requirements.
- Build each section as semantic HTML with Server Components by default in its authorized phase. Meaningful content remains in DOM order and visible without animation.
- The design should still read clearly when every image or animation is unavailable. Typography, rules, spacing, and content hierarchy carry the composition.

## 2. Colour and semantic roles

Do not scatter raw hex values through components. Define the following palette once, then assign semantic theme variables.

| Brand token | Value | Use |
|---|---|---|
| Forest | #2A371B | Light headings, navigation, editorial details |
| Deep Forest | #152011 | High-contrast forest details |
| Terracotta | #CE5129 | Large display accents only where contrast is appropriate |
| Burnt Terracotta | #A63B1C | Light-mode primary actions with white text |
| Charcoal | #242424 | Light body and UI text |
| Soft Sage | #D8DEC9 | Secondary light surfaces and decorative rules |
| Mineral White | #F2F4F0 | Main light background, never beige or cream |
| Pure White | #FFFFFF | Raised light surfaces and form fields |
| Light Border | #D7DDD5 | Light dividers and outlines |
| Dark Forest | #1A2421 | Main dark background, never pure black |
| Dark Surface | #22302C | Dark panels, menus, and forms |
| Dark Raised Surface | #2B3A35 | Selected elevated dark surfaces |
| Dark Primary Text | #F4F5F2 | Dark headings and body text |
| Dark Secondary Text | #B8C0BB | Dark support and metadata |
| Dark Border | #3C4A45 | Dark dividers and outlines |
| Sparq Orange | #F06A3C | Dark interactive accents and logo accent |
| Sparq Orange Hover | #FF8657 | Dark primary-action hover, with Dark Forest text |
| Sparq Orange Pressed | #E66338 | Dark primary-action pressed, with Dark Forest text; contrast about 4.71:1 |

| Semantic role | Light | Dark |
|---|---|---|
| Page background | Mineral White | Dark Forest |
| Main text / heading | Charcoal / Forest | Dark Primary Text |
| Muted text | Charcoal at full opacity with smaller type hierarchy, not low-opacity text | Dark Secondary Text |
| Navigation / panel | Mineral White or Pure White | Dark Surface |
| Raised field | Pure White | Dark Surface or Dark Raised Surface |
| Rule / border | Light Border | Dark Border |
| Primary button | Burnt Terracotta background, Pure White label | Sparq Orange background, Dark Forest label |
| Inline link and active state | Forest text, Burnt Terracotta underline or marker | Dark Primary Text on panels; Sparq Orange on Dark Forest |
| Focus indicator | Deep Forest or Burnt Terracotta with visible offset | Sparq Orange with visible offset |

Computed WCAG contrast for intended key pairs: Forest on Mineral White 11.42:1; Charcoal on Mineral White 14.03:1; white on Burnt Terracotta 6.43:1; Dark Primary Text on Dark Forest 14.56:1; Dark Secondary Text on Dark Forest 8.57:1; Sparq Orange on Dark Forest 5.18:1. Terracotta on Mineral White is 3.93:1, so it is limited to large display text/decorative accents. Sparq Orange on Dark Surface is about 4.47:1, just below 4.5:1; use Dark Primary Text for small links there. Retest rendered states in the UI phases.

Theme behavior: first visit follows the operating system; explicit Light, Dark, or System choice persists; theme applies before first paint; set color-scheme and mode-specific theme-color; use the matching supplied PNG logo. Both logos have transparent padding, so size by the visible mark and inspect at real header size. No inversion filter. Every hover, focus, pressed, disabled, loading, success, and error state needs its own two-theme check.

## 3. Typography

Use Newsreader via next/font for display and Plus Jakarta Sans via next/font for body/UI unless the user supplies an approved replacement. Use only necessary weights. The supplied logo remains an image, never typeset. Values below are CSS pixels at 100% zoom; sizes are targets to refine against browser screenshots.

| Role | 1440 px target | 768–1024 px target | 375–390 px target | Leading / measure |
|---|---:|---:|---:|---|
| Hero H1, Newsreader | 88–104 | 64–76 | 46–54 | 0.96–1.02; desktop 8–10 words/line maximum, mobile 12–16 characters where practical |
| Section H2, Newsreader | 56–72 | 44–56 | 36–44 | 1.00–1.08; 10–14 words/line maximum |
| Editorial statement, Newsreader | 44–60 | 38–48 | 32–40 | 1.06–1.12; no narrow single-word final line |
| Card/service title, Newsreader or Jakarta | 21–26 | 20–24 | 22–26 | 1.12–1.20 |
| Body lead, Jakarta | 20–22 | 18–20 | 18–19 | 1.45–1.55; max 52–60 characters |
| Body, Jakarta | 16–18 | 16–17 | 16 | 1.55–1.65; max 65–72 characters |
| Eyebrow / metadata, Jakarta | 11–12 | 11–12 | 11–12 | 1.3–1.5, tracked 0.12–0.16 em; do not use for essential long copy |
| Navigation / button, Jakarta | 14–16 | 14–15 | 15–16 | 1.2–1.35; never below 14 for main controls |

Use a limited fluid scale with clamp() between the target sizes, then cap each width range. Test the approved hero sentence for line breaks at 375, 390, 768, 1024, 1440, and 1920 px. Do not insert desktop-only hard line breaks in content. If an optional editorial break is used, it must disappear when it creates a widow or awkward mobile line. Body paragraphs remain left aligned. Never set long explanatory copy in display type.

## 4. Grid, spacing, surfaces, and rules

| Width | Container and outer padding | Working grid | Typical section spacing |
|---|---|---|---|
| 360–767 px | 20 px sides | 4-column working rhythm, recomposed section grids | Predominantly 80 px; capability 72 px |
| 768–1023 px | 32 px sides | 8-column working rhythm | Fluid section padding and 2-column service/process layouts |
| 1024–1279 px | 40 px sides | 12-column working rhythm | Fluid section padding and 3-column services |
| 1280–1599 px | 20 px sides | 12-column working rhythm | Fluid section padding and desktop hero split |
| 1600–1920 px | `min(100% - 40px, 1600px)` centered | Content capped at 1600 px | Section maximums 152–176 px by chapter |

Use a 4 px base spacing scale: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160. Keep small vertical rhythm within text blocks and larger changes between editorial chapters. Thin 1 px rules span the intended grid width. Do not use shadows to separate ordinary sections. In dark mode use tonal surfaces and Dark Border before shadows. Surface changes should be deliberate: hero page field, capability strip, service field, featured-work field, process field, editorial band, final CTA, footer.

Radius scale: 0 for images, editorial panels, dividers and service tiles; 4 px for small controls if needed; 8 px for form fields; 12 px for prominent buttons. No blanket pill treatment or rounded-card grid. Buttons, links, and form controls require at least 44 × 44 px hit areas. Focus must remain visible at 200% zoom and not be covered by navigation.

## 5. Images and media

| Slot | Preferred ratio and crop | Art direction |
|---|---|---|
| Supplied hero editorial | Source 4:5; desktop display frame about 0.9–1.0 width:height; mobile display frame 4:5 | Keep face/updo in the upper-right safe area. Anchor toward the right if a narrow frame must crop from the left. The subject is fictional, not agency staff. |
| Supplied six service images | Source and preferred display 4:5 at desktop, tablet, and mobile | Keep the guide's focal elements; avoid a wide mobile crop that cuts hands, faces, screens, or the installation. Use a 4:5 thumbnail or lead image in each divided mobile row. |
| Approved featured case study, if later supplied | Ratio follows real approved media, with about 3:2 landscape as an initial layout target | Show actual approved work. The supplied featured editorial concept is **not** a case-study image and stays out of the Work section. |
| Optional editorial concept / philosophy image | Supplied files 16:9 | Use only as a non-proof brand visual or beside approved agency philosophy, respectively. Never attach a client/project/employee/testimonial identity. |
| Optional insights image | 3:2 with editorial crop | Only for an approved article with image rights, alt text, and a real author. |

Reserve intrinsic dimensions, use responsive sizes and modern formats, preload only the true hero/LCP image, and lazy-load later media. Provide image-specific alt text or empty alt for purely decorative imagery. Do not hotlink. Keep a source, provenance, usage scope, approval, and crop/focal-point record for every production image.

### Supplied homepage package: placement, alt text, and delivery

The active user request supplies and authorizes nine generated editorial assets for implementation. They are not real staff, clients, customers, founders, or testimonial speakers. The 4:5 hero and six service WebPs are now the planned homepage implementation images. The 16:9 editorial concept and philosophy portrait remain optional; neither is evidence. Source masters stay in Kreative_Sparq_Homepage_Image_Assets_v1/originals/. In the later authorized UI phase, copy the optimized files from web/ to public/images/home/ and deliver those WebPs through next/image. Do not ship the PNG masters for normal page use.

| WebP basename | Placement and crop rule from image guide | Descriptive alt-text candidate |
|---|---|
| hero-editorial.webp | Right side of split hero; keep face and braided updo upper-right; when necessary crop left first on mobile. Start with a right-biased focal point and validate at every required width. | Woman in a terracotta suit holding a laptop outside a contemporary office building. |
| service-brand-strategy.webp | Brand Strategy; preserve the hand and central terracotta king. | Hand moving a terracotta chess piece on a dark green chessboard. |
| service-creative-design.webp | Creative Design; preserve both hands, terracotta swatch, and middle of moodboard. | Hands arranging forest-green and terracotta materials on a brand moodboard. |
| service-content-social.webp | Content & Social Media; preserve face, phone, camera, and upper torso. | Woman checking a phone during a city photo walk, with a camera at her side. |
| service-performance-marketing.webp | Performance Marketing; keep abstract laptop display and both hands visible. | Person reviewing abstract charts on a laptop at a desk. |
| service-web-experiences.webp | Web Design & Development; keep the monitor centered and let leaves crop naturally. | Editorial website layout displayed on a monitor in a plant-filled studio. |
| service-campaigns-activations.webp | Campaigns & Activations; preserve the person and terracotta-and-green installation. | Man in dark clothes walking past a terracotta-and-green outdoor installation. |
| featured-editorial-concept.webp | Optional 16:9 brand visual outside Work/case-study sections; subject right, left negative space for approved HTML copy. | Woman in a patterned terracotta headwrap and jacket outside a modern building. |
| brand-philosophy-editorial.webp | Optional 16:9 support for the agency-principle band; subject right of center, left negative space for approved HTML copy. Never use as testimonial portrait. | Man in a dark green shirt standing in a green studio. |

Alt candidates adapt the guide's visible descriptions while removing occupational labels such as “content strategist,” “producer,” and “creative director,” which could imply a real identity. If an image is purely decorative next to equivalent text, use empty alt instead. Never identify a fictional subject by a client, staff, or testimonial role. Keep headings, links, captions, and overlays as HTML, never baked into image files.

All six service WebPs are 800 × 1000 px; the hero WebP is 1122 × 1402 px; the two optional wides are 1599 × 900 px. Set intrinsic width/height and accurate sizes; use object-fit: cover with a **per-image** object-position after visual testing, not one shared crop. Keep source aspect ratios unless a controlled composition requires cropping. Only the hero should receive priority/preload; lazy-load all below-fold images. Apply contrast overlays in CSS without permanently darkening masters. Compare WebP quality at rendered size; use a PNG source master only if a large crop visibly exposes compression and document the exception. Test crops at 390, 768, 1024, 1440, and 1920 px in both themes. Do not add glitch, burn, distortion, chromatic aberration, or artificial damage.

**Other temporary design-review imagery:** An authorized later visual review may use clearly labelled local composition placeholders or separately licensed editorial photographs with documented source and review-use rights. Label those review materials “Composition image — not Kreative Sparq client work or approved production photography” in the review context; do not attach invented client names/results. Keep temporary assets separate from the supplied implementation package and approved production assets. The composite homepage screenshot is never a production asset.

## 6. Components and interaction rules

- **Header:** target visual height 88 px desktop, 76 px tablet, 68–72 px mobile. Logo left, navigation central, theme control and booking action right. Use a thin bottom rule. Start static; consider a restrained sticky state only after browser testing shows navigation benefit without obscuring focus or content. Mobile uses an accessible full-screen or large-sheet menu with Escape close, focus management/restoration, scroll lock, and a visible theme choice.
- **Primary action:** 48–52 px height, 20–24 px horizontal padding, 12 px radius, medium-weight 14–16 px label, optional restrained arrow. Use Burnt Terracotta/white in light and Sparq Orange/Dark Forest in dark. Hover changes tone/border or moves arrow at most 4 px; never depend on colour alone. Disabled/loading states retain readable labels and a real status.
- **Secondary action:** text-led link with persistent underline/rule and small directional arrow; hit target at least 44 px. It should read as secondary without looking inactive. Use descriptive copy-deck labels.
- **Text links:** underline or other non-colour affordance. Keyboard focus gets a 2–3 px high-contrast outline and offset. Preserve focus on theme change and menu close.
- **Fields in later phases:** 48–56 px high, always-visible labels, 8 px radius, 1 px border, clear help/error text and focus outline. Light fields use Pure White; dark fields use Dark Surface/Raised Surface. Error and success require text and accessible status, not colour alone.
- **Motion:** controls 160–220 ms; header/menu 180–240 ms; optional section entrance 450–650 ms and image reveal 600–800 ms. Translate no more than 12–20 px for entrances or 4–6 px on hover. Animate once, do not delay access, do not shift layout, and avoid carousels, marquees, parallax, cursor followers, and decorative loops. Reduced-motion mode shows all content immediately with no spatial animation.

## 7. Homepage composition contract

The reference map and visual acceptance checklist are in VISUAL_QA.md. Each rule below applies to the exact approved copy. “Desktop” means 1280–1920 px, “tablet” means 768–1023 px, and “mobile” means 360–767 px. At 1024–1279 px use the desktop structure only while text and controls fit; otherwise use the tablet composition.

### 01. Global header

- **Desktop:** One light horizontal row over the same clean page field as the hero. Visible mark about 175–205 px wide after accounting for PNG padding; navigation has generous gaps, booking CTA remains distinct, theme control does not crowd the menu.
- **Tablet:** Reduce gaps; preserve all destinations through a menu if the full row cannot fit at 1024 px. Do not shrink link text below 14 px.
- **Mobile:** Logo left, 44 px menu/theme targets right. Open menu provides Services, Work, About, Insights, Contact, theme choices, and Book a strategy call in logical order.
- **Light / dark:** Mineral White with Forest text and Light Border / Dark Surface with Dark Primary Text and Dark Border. Use the supplied matching logo. No damaged top-left overlay, texture, or glitched backdrop.

### 02. Editorial split hero

- **Desktop:** Two near-equal halves (text 49–52%, image 48–51%), with the supplied hero-editorial.webp reaching the right viewport edge. Eyebrow, approved H1, body, primary/secondary actions, then approved supporting note; align left content to container. Aim for a 680–780 px first-chapter height at 1440 px, allowing content growth. Preserve the woman's face and braided updo in the upper-right safe area, with no text baked into the photo.
- **Tablet:** Shift toward 55% text / 45% image only while both remain readable; otherwise stack text then image. Recheck the upper-right focal point when the frame changes. Avoid a narrow headline column and avoid overlaying text on the subject.
- **Mobile:** Single column: header, eyebrow/H1/body/actions, supporting note, then full-width 4:5 image. Action row may wrap/stack; no horizontal scroll. If a narrower crop is required, remove left-side background before the face or updo. Image height follows crop rather than a fixed text section height.
- **Light / dark:** Mineral White, Forest display and limited Terracotta emphasis / Dark Forest, Dark Primary display and limited Sparq Orange emphasis. Dark image receives an art-directed crop/exposure review, not an inversion filter. The top-left burn/glitch and any colour banding are completely excluded in both modes.

### 03. Honest capability strip (replaces metrics and client-logo cloud)

- **Desktop:** A thin-rule chapter directly after the hero. Use the copy deck's “Marketing works better when the pieces agree.” and its approved paragraph as a text-led split, not three numeric blocks or a trademark row. Heading about 4 columns, body about 6 columns, with breathing room.
- **Tablet:** Two-column if each has enough measure; otherwise heading above body. Rules span the container.
- **Mobile:** One column, generous top/bottom space, no empty logo slots or tiny metric labels.
- **Light / dark:** Soft Sage field with Forest text and Light Border rules / Dark Surface field with Dark Primary Text and Dark Border rules. No visual treatment suggesting client endorsement.

### 04. Services overview

- **Desktop:** Approved eyebrow, H2 and intro above an image-led six-service editorial sequence using the six supplied service WebPs in copy-deck order. At 1440 px and wider, six narrow columns may sit in one row if service names remain legible; use thin dividers and aligned image bottoms, not floating cards. Each image is 4:5. At 1280 px, a 3-by-2 sequence is preferable if six columns would compress copy. Distinct focal points and type carry rhythm.
- **Tablet:** Two or three columns depending on actual copy measure; preserve source order and each supplied image's 4:5 ratio where possible. Rules align across the sequence.
- **Mobile:** Six vertical rows with strong dividers, service title/approved short description/link, and a 4:5 image placed above or beside the text according to available width. Preserve the guide's hands, faces, screens, and installation focal points; no six tiny tiles.
- **Light / dark:** Pure White field with Forest headings and Light Border / Dark Forest field with Dark Primary headings and Dark Border. Photography is chosen/reviewed separately for dark surround; no colour inversion.

### 05. Featured work or approved empty state

- **Desktop:** Preserve the reference's large 45/55 editorial split and strong visual weight. With approved work, left has exact heading/body/action and right has genuine case-study media around 3:2. Current truthful state has a type-led right field containing the copy deck's homepage empty-state text and “Start a conversation” CTA. The supplied featured-editorial-concept.webp is **not** used here. No fake project image, name, outcome, or “view case study” link.
- **Tablet:** Balance 50/50 if the right panel fits; otherwise stack heading/body before the empty state or approved media.
- **Mobile:** One column, heading then substantial media/empty-state panel. Keep the section visually important through scale, border, and whitespace rather than a fictional hero image.
- **Light / dark:** Mineral White left with a Pure White right field / Dark Forest left with a Dark Surface right field. Use a clear rule, not a shadow. If real work becomes available, image exposure/crop gets both-theme review.

### 06. Why Kreative Sparq

- **Desktop:** This approved-copy chapter is absent from the reference but required by the homepage narrative. Use a 4/8 asymmetric grid: headline and short body on the narrow side, four text-led principles on the wide side in two rows separated by rules. Avoid a four-card feature grid.
- **Tablet:** Heading/body above a two-column principle list.
- **Mobile:** Single-column list with numbered or ruled items; retain the exact four headings and body copy.
- **Light / dark:** Pure White with Forest headings / Dark Surface with Dark Primary headings. Dividers use the theme border; no decorative icons.

### 07. Four-step process

- **Desktop:** Follow the reference's horizontal numbered rhythm: short heading at left, four equal step columns to the right if width supports them. The approved steps are Discover, Decide, Make, Improve, rather than the reference's alternate names. Numbers use restrained Terracotta; vertical dividers separate steps.
- **Tablet:** Two-by-two sequence with a consistent reading order, or horizontal row only if the body remains legible. Do not shrink text to fit.
- **Mobile:** Four stacked rows, number/title/body in one reading flow and thin horizontal rules; no sideways scroll.
- **Light / dark:** Mineral White with Forest display and Burnt Terracotta numbers / Dark Forest with Dark Primary display and Sparq Orange numbers. Ensure numbered markers do not carry essential meaning by colour alone.

### 08. Audience and sector context

- **Desktop:** Another copy-required addition absent from the screenshot. Pair the approved heading with one controlled-width body column and a large quiet margin. The supplied featured-editorial-concept.webp may be evaluated here as a separate brand visual only if it does not imply a real client, founder, or project; omit it if the association is ambiguous. It must not become a fake client roster.
- **Tablet:** Heading above body with a generous side inset; optional image follows body.
- **Mobile:** Single column and plain text. Sector names remain prose, not decorative badges.
- **Light / dark:** Pure White with Light Border rules / Dark Surface with Dark Border rules. Use typography and space to bridge process into the editorial band.

### 09. Editorial principle band (truthful testimonial replacement)

- **Desktop:** Use the exact approved brand-messaging statement beginning “We do not begin with a list of deliverables.” with the copy deck's “Our point of view” label. Give it the reference's high-contrast scale and split composition without quotation marks, client attribution, carousel dots, or implied endorsement. The optional brand-philosophy-editorial.webp may occupy the image side as a fictional editorial subject, never a quote source.
- **Tablet:** Keep statement measure around 50–60 characters; split only if the supporting label and statement remain balanced.
- **Mobile:** One-column text-led band with sufficient padding and no cut-off lines.
- **Light / dark:** Dark Forest band with Dark Primary Text in light mode / Deep Forest band with Dark Primary Text in dark mode, separated from the page by rules and tone. Sparq Orange is a small marker, not a wash. If this approved principle is removed later, omit the band and rebalance spacing rather than invent a quote.

### 10. Insights, only when publishable

- **Desktop:** The approved section heading/body and up to three real, approved article links may form an editorial list with thin rules and one varied image if licensed. Do not present the three supplied article drafts as published until author, original example, dates, and editorial review exist.
- **Tablet:** Two-column lead/list only if content exists; otherwise no section.
- **Mobile:** Stacked article rows with metadata readable at 16 px body sizes. If there are no approved articles, omit the homepage insights teaser and close the gap between band and CTA.
- **Light / dark:** Mineral White list / Dark Forest list, with theme rules and accessible link treatment.

### 11. Final conversion section

- **Desktop:** Spacious 50/50 split with approved “What are you trying to move?” heading left and body/actions right. The two approved paths are Start a project and Book a strategy call. Use one visually primary action.
- **Tablet:** Preserve split if measure permits, otherwise stack text above actions.
- **Mobile:** Heading, body, then full-width or naturally wrapping actions, each at least 44 px high.
- **Light / dark:** Pure White field with Forest display / Dark Surface field with Dark Primary display. Primary button changes by theme. Do not promise a live booking or form success before those routes are configured.

### 12. Footer

- **Desktop:** Dark, expansive base with approved logo, footer statement, description, grouped navigation, and a long horizontal rule. Contact, social, and newsletter controls appear only when verified and functional. Keep legal links visible when approved legal pages exist.
- **Tablet:** Two or three text columns beneath a full-width brand row; no crowded link cluster.
- **Mobile:** Brand/statement first, then stacked link groups, then verified contact/legal/copyright. Maintain comfortable tap targets and rule spacing.
- **Light / dark:** Dark Forest footer is retained as a deliberate close in light mode; dark mode uses a distinct Deep Forest boundary so the footer is perceivable without black. Use the supplied dark logo when the footer background is dark, regardless of page theme. The damaged, burnt, colour-banded lower edge in the reference is completely excluded; use a clean solid field and a thin rule.

## 8. Deliberate differences and unresolved inputs

| Reference element | Approved design decision |
|---|---|
| Burnt/glitched top-left hero and footer | Remove completely; use clean Mineral White/Dark Forest fields, natural imagery, and thin rules. |
| “100+”, “6+”, “REAL” and recognizable client marks | Replace with the exact copy-led capability statement; no numeric or logo placeholders. |
| Fictional featured fashion project | Use the approved homepage Work empty state in a prominent type-led split until a real case study and rights exist. |
| Sample testimonial, headshot, carousel indicators | Keep the testimonial itself hidden; use the approved agency point-of-view statement in a text-led dark band, without attribution. |
| Reference process wording | Use the copy deck's Discover, Decide, Make, Improve. |
| Reference hero/body/CTA wording | Use the copy deck's H1, paragraph, “Book a strategy call” and “View our work.” |
| Screenshot omits Why, Audience, and Insights | Add Why and Audience from approved homepage copy; add Insights only when articles are publishable. This lengthens the page and requires rhythm control. |
| Screenshot photography | Use the new user-supplied editorial WebPs for hero and six services, with the PNGs retained as masters. Every person is fictional; the two optional wides remain concept/philosophy visuals rather than work or testimonial proof. |

Hero and service imagery are available. The remaining major content gap is approved client work and verified testimonial material; neither can be supplied by the fictional editorial concepts. These are tracked in CONTENT_REQUIREMENTS.md.

## 9. Locked homepage baseline for Phase 5 acceptance, 22 September 2026

This is the reusable contract demonstrated by the approved Light and Dark homepage. It takes precedence over the earlier target ranges above where the finished implementation differs. Future pages should use these proven tokens and behaviours where their content calls for them; the homepage sections remain composed in `app/page.tsx` rather than becoming a speculative section library.

| Decision | Implemented rule |
|---|---|
| Light palette | Mineral White `#F2F4F0` page, Pure White `#FFFFFF` service/quiet fields, Soft Sage `#D8DEC9` capability, Forest `#2A371B` headings and links, Charcoal `#242424` body, Light Border `#D7DDD5` rules. Burnt Terracotta `#A63B1C` carries primary actions and small numbering. |
| Dark palette | Dark Forest `#1A2421` page and major chapters; Dark Surface `#22302C` header, capability, Why, Audience, final CTA, and Work inset; Dark Raised Surface `#2B3A35` for selected media backing; Deep Forest `#152011` point-of-view band and footer; Dark Primary `#F4F5F2`, Dark Secondary `#B8C0BB`, and Dark Border `#3C4A45`. Sparq Orange `#F06A3C` is limited to primary actions, focus, numbering, and small accents; hover is `#FF8657`, pressed `#E66338`. |
| Typography | Newsreader display with `-0.035em` heading tracking and Plus Jakarta Sans body/UI. Hero H1: `clamp(64px, 5.85vw, 94px)` desktop, `clamp(64px, 8vw, 76px)` tablet, `clamp(48px, 13vw, 58px)` mobile, 47 px at 360–399. General H2: `clamp(42px, 4.8vw, 70px)` desktop, `clamp(44px, 6vw, 56px)` tablet, `clamp(38px, 10.5vw, 48px)` mobile; capability and point-of-view statements have smaller caps. Body copy is predominantly 16–18 px at 1.55–1.65 line height; leads reach 20–22 px. Eyebrows use 12 px tracked uppercase; controls are 14–15 px. Text stays left aligned with controlled paragraph widths. |
| Width and grids | `.ks-container` uses 20 px sides through 767, 32 px at 768–1023, 40 px at 1024–1279, then `min(100% - 40px, 1600px)` centered. Desktop hero is 50.5/49.5 with image to the right edge; Work is 45/55; Why 4/8. Services are 6 columns from 1440, 3 columns at 1024–1439, 2 columns at 768–1023, and six divided rows on mobile. Process is 4, 2, then 1 column. |
| Section rhythm | Wide sections use fluid vertical padding around 104–176 px by chapter; mobile major chapters use 80 px, capability 72 px. The hero is a 690–790 px desktop chapter, then stacks copy and a 4:5 image at tablet/mobile. Thin 1 px theme rules separate list entries and text fields. No card shadows or decorative noise. |
| Header and navigation | Static header at 88 px desktop, 76 px tablet, 70 px mobile. Full navigation and integrated theme select appear at 1024 px and wider; below that, a 44 px menu button opens the full-screen native dialog. Escape closes, body scroll locks, and focus returns to the trigger. The theme select stays labelled and has a 44 px minimum target. Footer uses the supplied dark logo in both themes. |
| Actions and links | Primary buttons have 48 px minimum height, 12 px radius, semantic theme colours, a 1 px hover lift, and a distinct pressed tone. Repeated underlined editorial links have a 44 px minimum target, keep the final word and arrow together at narrow widths, move the arrow 2 px on hover/focus, and thicken the underline when pressed. Focus is a visible 3 px semantic outline with offset. Navigation, menu, and footer links have hover/active/focus feedback; colour alone is not the only link cue. |
| Images | Hero and all six services use the supplied optimized WebPs through `next/image`, with intrinsic dimensions, guide-led per-image focal positions, responsive `sizes`, hero preload, and lazy service loading. Hero desktop crop is right-biased (60%/35% Light, 62%/35% Dark); mobile crop is 60%/50% Light, 61%/50% Dark. Service frames remain 4:5 at every width, with natural photographic colour in both themes. PNG source masters remain outside normal delivery. Every depicted person is fictional editorial imagery; no client, staff, project, or testimonial identity is implied. |
| Narrow service rows | At 360–399 px the image occupies 38% of the ruled row with a 16 px gap; at 400–767 px it occupies 42% with a 20 px gap. The text column keeps the exact approved title, body, and link. The last link word and arrow stay together, all links remain at least 44 px high, and images remain legible at 4:5. This adjustment shortened the 360 px Light page by about 73 px against Phase 4 without hiding content. |
| Theme and motion | Light, Dark, and System choices persist and apply before paint; System follows OS preference, and browser theme colour follows the resolved mode. Hero copy enters once over 540 ms with at most 10 px movement; the photo enters once over 720 ms with 1.5% scale. Button transitions are 160 ms, arrow movement 180 ms. Reduced-motion preference removes entrance animations and spatial movement and reveals the complete page immediately. No parallax, marquee, scroll hijack, bouncing, cursor effect, or decorative loop. |

The only extracted homepage-specific component is `HomeTextLink`, proven across the hero, all six services, Work, and final CTA. It centralizes the arrow, wrapping, target, and semantic link pattern. Primary actions remain ordinary `next/link` elements with the shared button class; each chapter remains straightforward semantic markup. No client-proof or testimonial component exists because there is no approved content for one.

**Accepted reference differences:** corrupted hero/footer edges are removed; sample metrics and logos become the truthful capability chapter; Work shows the approved empty state; the quotation area becomes a labelled agency point of view; Why and Audience use approved additional copy; Insights is absent until publication approval. No image is inverted, and no fictional editorial person is identified as an actual client, colleague, or speaker. Phase 5 evidence is recorded in `VISUAL_QA.md` and `IMPLEMENTATION_STATUS.md`.

The approved Light composition and exact copy remain the baseline. Dark mode applies the section surfaces specified above: Dark Forest for hero, services, work, and process; Dark Surface for header, capability, Why, Audience, and final CTA; Deep Forest for the point-of-view band and footer. The Work inner field uses Dark Surface. Dividers use semantic dark borders, and Sparq Orange stays on actions, visible focus, numbered markers, and small accents. The approved dark logo appears on dark header/footer fields. Photographs retain natural exposure and colour; only the hero's focal crop is adjusted for the Dark setting.

At 360–399 px, service entries use the allowed mobile editorial-row composition with a 38% 4:5 image beside each ruled text entry; from 400–767 px the image takes 42%. All six images, headings, bodies, and links stay in order. The 390 px Light full-page capture is about 19% shorter than the Phase 3 stacked-image version. At 768 px services remain 2×3, at 1024 px 3×2, and at wide desktop six columns. The header theme selector has a quiet integrated appearance with a labelled 44 px control and visible focus; the mobile menu keeps its accessible select and focus handling.

Hero copy and image have a single short entrance movement only when the user permits motion. Reduced-motion preference removes the animation and shows all sections immediately. Hover, focus, and pressed feedback stays subtle and functional; no continuous animation or scroll effect is present. The complete page was visually inspected in both themes at 360, 375, 390, 768, 1024, 1440, and 1920 px; the screenshot matrix and findings are in VISUAL_QA.md. A 720 × 450 CSS viewport at device scale 2 verified 200% zoom-equivalent reflow for a 1440 × 900 screen. This is a headless layout-equivalence check, not a GUI zoom inspection.
