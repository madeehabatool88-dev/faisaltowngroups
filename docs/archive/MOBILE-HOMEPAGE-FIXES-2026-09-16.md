# Mobile homepage refinements — 16 September 2026

Applied after reviewing the live mobile screenshots.

## Changes

- Kept the new CMS-driven Phase 2 homepage architecture intact.
- Tightened the mobile header and removed duplicate header Call/WhatsApp buttons on small screens; the configured sticky WhatsApp action remains the persistent conversion control.
- Reduced mobile H1/H2/H3 scale and vertical spacing so headings do not consume full phone screens.
- Forced plot-price, sector, budget, buyer-support and process grids to one column on narrow phones to prevent the horizontal-card behaviour visible on the current live homepage.
- Made mobile CTAs full-width, larger tap targets and centered for easier one-handed use.
- Cropped the development image to a 4:3 mobile presentation instead of allowing an excessively tall image.
- Tightened hero spacing and image ratio for a faster first-screen conversion path.
- Made the Phase 1 homepage cross-link more compact and secondary to the Phase 2 funnel; no Phase 1 routes or content were removed.
- Clarified the hero image alt text as an aerial rendering.

## Intentionally unchanged

- CMS schema and section controls.
- Sector P prices and price source.
- URLs, routes, PDFs, article slugs, sitemap and deployment workflow.
- Trust / authorization section remains disabled.
- Sticky Call remains controlled by Site Settings and is currently off.
- All existing analytics hooks remain unchanged.

## Validation available in this environment

- Updated JSON content parses successfully.
- File-level code changes are limited to homepage CSS and two existing homepage CMS content files.
- A production Astro build could not be rerun here because node_modules were not included in the uploaded ZIP and package installation was unavailable.
- The uploaded project contains the prior implementation report stating all 31 pages built successfully before these CSS/content refinements.

## Local verification — 17 September 2026
The current project was rebuilt successfully: all 31 pages passed. The deployment workflow now checks the exact published version and live stylesheets.
