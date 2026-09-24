# Required Repository Documentation Updates

These documentation changes are part of the editorial-imagery implementation. Update the existing repository documents in place. Do not create duplicate replacement documents if the named files already exist.

## `REFERENCE_MANIFEST.md`

Add an editorial-image inventory containing:

- Each production filename from `public/images/editorial/`
- Its intended route and placement
- Whether it is a hero or supporting image
- Whether it is decorative
- A statement that all depicted people are fictional editorial subjects
- A statement that no image is proof of staff, clients, partnerships, testimonials, case studies, or completed work
- A note that `service-content-social-v2.webp` replaces the older Content & Social Media image on the `/services` card and `/services/content-social-media` hero
- The image-generation date and source description already used for generated assets in the repository

## `CONTENT_REQUIREMENTS.md`

Record these restrictions:

- Do not name or identify anyone shown in the generated photographs
- Do not add staff, client, testimonial, project-result, or portfolio captions to the images
- Do not use the Work images as substitutes for approved case studies
- The camera-led Content & Social Media image illustrates capability only
- Real staff photography, client approvals, and verified case studies remain future content requirements

## `DESIGN_SYSTEM.md`

Add or update the editorial-imagery rules:

- Image palette: Dark Forest, warm cream, muted sage, charcoal, and restrained burnt terracotta
- Directional hero overlays must protect text contrast in both themes
- Text may not overlap faces, cameras, hands, or essential working materials
- Desktop and mobile crops must be tuned independently
- No parallax, Ken Burns movement, background video, scroll-jacking, or continuous image animation
- Supporting imagery should create editorial rhythm rather than appear in every section
- The camera-led Content & Social Media image is the approved visual for its card and detail hero

## `VISUAL_QA.md`

Add checks for:

- Every changed route at 390, 768, 1024, 1440, and 1920 pixels
- Light and dark modes
- No text crossing a face or important object
- No repeated image in the same initial viewport
- No broken images, stretching, horizontal overflow, or unexpected layout shifts
- The new camera-led Content & Social Media image appears on both approved placements
- The old Content & Social Media image is absent from those placements
- Image overlays maintain WCAG AA text contrast
- Homepage appearance remains unchanged

## `IMPLEMENTATION_STATUS.md`

Record:

- The editorial imagery checkpoint and its scope
- Routes changed
- Production filenames installed
- The Content & Social Media replacement decision
- Validation commands and results
- Screenshot locations
- Lighthouse results before and after the change
- Preview deployment URL and commit SHA
- Any deviations or remaining concerns

## Completion rule

Documentation updates must be committed with the implementation. A code-only change is incomplete.
