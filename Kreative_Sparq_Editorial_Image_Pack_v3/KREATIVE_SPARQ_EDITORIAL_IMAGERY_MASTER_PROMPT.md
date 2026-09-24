# Kreative Sparq Editorial Imagery Master Prompt

## Role

You are working in the Kreative Sparq website repository on the current editorial rebuild branch. Implement the approved editorial-imagery enhancement as a controlled visual checkpoint. Preserve the existing launch candidate, design system, content positioning, accessibility, SEO, responsive behavior, and theme support.

Do not merge into `main` or promote a deployment to production without explicit approval.

## Authoritative materials

Read these repository files in full before changing code:

1. `DESIGN_SYSTEM.md`
2. `VISUAL_QA.md`
3. `REFERENCE_MANIFEST.md`
4. `CONTENT_REQUIREMENTS.md`
5. `IMPLEMENTATION_STATUS.md`

Then read these supplied pack files:

6. `IMAGE_PLACEMENT_MANIFEST.md`
7. `MARKDOWN_DOCUMENTATION_UPDATES.md`
8. Every image in `web/`

For this imagery checkpoint, this prompt and the two pack documents supersede earlier image-placement instructions. In particular, do not follow any older instruction to reuse the previous Content & Social Media image.

If a genuine conflict remains after applying this source order, stop and report it before implementation.

## Objective

Add premium editorial imagery to every public page hero except the homepage. Introduce four supporting images where the current layouts have intentional but visually empty editorial frames. Replace the existing Content & Social Media service image with the new camera-led production image.

The result should feel like a considered international creative-agency website. Photography must support the message without turning the site into a generic photo template.

## Strict scope

This is an imagery and layout-integration pass.

Do not:

- Change the homepage
- Rewrite approved page copy
- Change positioning, service descriptions, routes, metadata, structured data, forms, legal text, or contact details
- Add client logos, testimonials, staff biographies, metrics, or case-study claims
- Describe fictional image subjects as Kreative Sparq staff, clients, partners, founders, authors, testimonial speakers, or project participants
- Present any generated image as evidence of completed client work
- Add a CMS or third-party content system
- Add parallax, Ken Burns movement, autoplay video, background video, scroll-jacking, or continuous motion
- Replace working shared components without a clear implementation need
- Merge into `main` or promote to production

## Asset installation

Copy the optimized WebP assets from the supplied `web/` directory to:

`public/images/editorial/`

Install these exact production files:

- `services-overview-hero.webp`
- `work-hero.webp`
- `about-hero.webp`
- `insights-hero.webp`
- `contact-hero.webp`
- `legal-shared-hero.webp`
- `work-process-support.webp`
- `about-relationship-support.webp`
- `insights-notes-support.webp`
- `contact-collaboration-support.webp`
- `service-content-social-v2.webp`

Do not place the PNG masters in the public delivery directory.

## Shared implementation approach

Use `next/image`, not CSS `background-image`.

A restrained shared component such as `EditorialHeroMedia` is appropriate if it removes repeated image, overlay, focal-point, and theme logic. Do not over-engineer a generic media framework.

Hero media should be an absolutely positioned layer inside the existing hero. Keep breadcrumbs, eyebrow text, headings, copy, links, and buttons as real HTML above the media with an explicit stacking context.

Preserve the existing section order and responsive typography unless a small layout adjustment is needed to prevent text from crossing the image subject.

## Route-to-image map

| Route | Required hero image |
| --- | --- |
| `/services` | `services-overview-hero.webp` |
| `/work` | `work-hero.webp` |
| `/about` | `about-hero.webp` |
| `/insights` | `insights-hero.webp` |
| `/contact` | `contact-hero.webp` |
| `/privacy` | `legal-shared-hero.webp` |
| `/terms` | `legal-shared-hero.webp` |
| `/services/content-social-media` | `service-content-social-v2.webp` |

The remaining five service-detail heroes should reuse their existing approved service images:

- `/services/brand-strategy`
- `/services/creative-design`
- `/services/performance-marketing`
- `/services/web-design-development`
- `/services/campaigns-activations`

If a service-detail page already displays its hero image as a separate adjacent image, restructure that composition so the same image is not repeated twice in the initial viewport.

## Content & Social Media replacement

Replace the older Content & Social Media image in both of these placements:

1. The Content & Social Media catalogue card on `/services`
2. The hero on `/services/content-social-media`

Use only:

`/images/editorial/service-content-social-v2.webp`

The photograph shows a fictional African creative team producing campaign photography with a professional camera, set styling, and live image review. It illustrates photography, video, social content, and campaign production.

Implementation requirements:

- Do not retain the old image on the catalogue card while using the new one on the detail page
- Do not show the new image twice within the initial viewport
- Preserve the calm negative space on the left for hero copy
- Keep the camera, stylist, and image-review monitor visible where possible
- Begin desktop testing near `object-position: 72% 50%`
- Tune mobile cropping independently
- Do not add a caption identifying the people or describing a real assignment
- Use concise service-card alt text only if the existing card pattern treats its images as informative; otherwise use empty alt text consistently

## Supporting-image placements

### Work

Place `work-process-support.webp` inside the current empty ruled or index frame near “Approved case studies are on the way.” Treat it as atmospheric process imagery, not a case study.

### About

Place `about-relationship-support.webp` near the “How the relationship works” section or as an editorial break immediately before it. Do not identify the people as the Kreative Sparq team.

### Insights

Place `insights-notes-support.webp` inside the current publication-status or `00` panel. Retain the status meaning and ensure the number remains legible if it stays over the image.

### Contact

Place `contact-collaboration-support.webp` alongside or immediately before “What happens next?” Keep the email address and response expectation as the primary conversion information.

Do not introduce additional photographs merely to fill space. These four supporting placements are the approved scope.

## Light-mode treatment

For Services, About, Contact, and the Content & Social Media detail hero, begin with a light surface-to-transparent directional overlay so Dark Forest text remains readable.

Suggested starting point:

```css
linear-gradient(
  90deg,
  rgb(245 246 241 / 0.98) 0%,
  rgb(245 246 241 / 0.92) 43%,
  rgb(245 246 241 / 0.48) 66%,
  rgb(245 246 241 / 0.08) 100%
)
```

Adjust from rendered screenshots. Do not treat these values as fixed if they weaken contrast or obscure the photograph.

For Work, Insights, Privacy, and Terms, use white or appropriate light copy over a Dark Forest directional overlay.

Suggested starting point:

```css
linear-gradient(
  90deg,
  rgb(18 31 24 / 0.96) 0%,
  rgb(18 31 24 / 0.90) 46%,
  rgb(18 31 24 / 0.46) 72%,
  rgb(18 31 24 / 0.12) 100%
)
```

## Dark-mode treatment

Every changed route must work in dark mode.

- Use a stronger Dark Forest overlay with light text
- Preserve natural skin tones and image detail
- Do not apply a flat opacity reduction that makes the entire image muddy
- Keep the burnt-orange accent restrained and consistent with existing buttons and links
- Verify that theme changes do not cause a flash, image jump, or unreadable intermediate state

## Cropping and responsive behavior

Test at minimum:

- 390 px
- 768 px
- 1024 px
- 1440 px
- 1920 px

For people-based page heroes, begin near `82% 50%` on desktop and `72% 50%` on mobile, except the Content & Social Media image, which should begin near `72% 50%` on desktop because its working group extends farther toward the center. Tune each route from screenshots.

Requirements:

- Do not crop through faces
- Do not place headings or buttons over faces
- Keep important hands, cameras, notebooks, screens, and working materials visible where practical
- Never stretch images
- Protect button tap targets and breadcrumbs
- Prevent horizontal overflow
- Do not force the desktop split layout onto narrow screens
- On mobile, strengthen the overlay before hiding the photograph
- The image should remain perceptible but secondary to the message

## Performance

- Use `next/image`
- Use `fill` where appropriate for hero media
- Set accurate `sizes`
- Preload or prioritize only the current route's above-the-fold hero image
- Lazy-load supporting images
- Begin around image quality 80 and adjust only if visual inspection requires it
- Reserve stable aspect ratios or dimensions for supporting images
- Prevent cumulative layout shift
- Do not globally import or preload every hero image
- Do not use JavaScript for effects CSS can handle

Measure representative image-heavy routes before and after implementation. Investigate material Lighthouse regressions rather than accepting them as the price of imagery.

## Accessibility

Hero images are decorative because adjacent HTML provides the page meaning. Use:

```tsx
alt=""
aria-hidden="true"
```

For supporting images, add concise alt text only if it communicates information not already provided nearby. Otherwise use an empty alt attribute.

Verify:

- WCAG AA contrast against the rendered photograph in both themes
- Existing focus indicators remain visible
- Images cannot cover navigation, controls, headings, or links
- Important information is never embedded only in an image
- Reduced-motion preferences are respected

An optional first-load reveal may use only a subtle 300 to 450 ms opacity transition. Disable it under `prefers-reduced-motion`. Do not delay content visibility while waiting for animation.

## Content integrity

All people shown in the supplied imagery are fictional editorial subjects.

They must not be described as:

- Kreative Sparq employees or founders
- Clients or partners
- Testimonial authors
- Project participants
- Evidence of delivered work or results

The Work imagery is decorative process imagery. It does not replace approved case studies. The Content & Social Media image demonstrates a capability, not a documented client engagement.

## Required Markdown updates

Apply every change specified in `MARKDOWN_DOCUMENTATION_UPDATES.md` to the existing repository files:

- `REFERENCE_MANIFEST.md`
- `CONTENT_REQUIREMENTS.md`
- `DESIGN_SYSTEM.md`
- `VISUAL_QA.md`
- `IMPLEMENTATION_STATUS.md`

Update the existing documents in place. Do not create competing copies with suffixes such as `-new`, `-updated`, or `(1)`.

## Validation

Run every existing project check, including where available:

- Formatting
- Lint
- Type checking
- Copy validation
- Production build
- Playwright tests
- Accessibility checks
- Route and asset-reference checks

Capture light-mode and dark-mode screenshots for every changed route at representative mobile, tablet, desktop, and wide-desktop widths.

Manually verify:

- The homepage is unchanged
- Every required hero loads
- The new Content & Social Media image appears on both approved placements
- The old Content & Social Media image no longer appears in those placements
- No image is repeated within the same initial viewport
- No text crosses a face, camera, hand, or important object
- No broken images, stretching, overflow, or layout shifts
- Breadcrumbs and buttons remain readable and usable
- Dark mode is fully designed rather than mechanically dimmed
- No imagery implies unverified staff, client, testimonial, or case-study claims

Run Lighthouse on representative image-heavy routes in mobile and desktop modes. Record performance, accessibility, best-practices, and SEO results. Address any meaningful regression before requesting approval.

## Git and approval gate

Work only on the current editorial rebuild branch. Preserve unrelated user changes. Commit and push the completed checkpoint to that branch only.

Then stop and provide:

1. Commit SHA
2. Preview deployment URL
3. Complete file-change list
4. Final route-to-image map
5. Confirmation that the Content & Social Media image was replaced in both locations
6. Light and dark screenshots
7. Test and production-build results
8. Lighthouse results
9. Documentation files updated
10. Any deviations, regressions, or remaining concerns

Do not merge into `main` and do not promote the deployment to production until explicit approval is given.
