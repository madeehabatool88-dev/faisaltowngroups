# FaisalTown Groups Astro Production Optimization — 31 Aug 2026

This pass implements the recommendations from the 40-point audit while preserving the existing Astro/static architecture and the current maroon/gold visual direction.

## What changed

1. Kept Phase 1/F-18 and Phase 2/FT-II as separate entities and reinforced that separation in navigation and copy.
2. Preserved the reusable Astro data-driven landing-page architecture; no framework rewrite.
3. Replaced the manually maintained public sitemap with `src/pages/sitemap.xml.ts` generated from landing-page/article data.
4. Canonical URLs remain pathname-driven through `BaseLayout.astro`.
5. Preserved WhatsApp as the primary conversion channel and centralized WhatsApp URL creation in `src/data/site.ts`.
6. Fixed inner-page mobile navigation by creating one shared responsive `SiteHeader.astro` used on home and content pages.
7. Reduced primary navigation choices to Phase 1, Phase 2, Plots, Map and Guides; moved All Pages/policies to the footer.
8. Reduced repetitive landing-page behavior by adding intent-specific inquiry copy for rentals, house sales, plot searches, maps, sector/block pages and project hubs.
9. Preserved entity-specific sector/block content and made the shared template support more differentiated intent instead of adding thin new pages.
10. Removed the repeated H1 from the Quick Answer component and replaced it with intent-specific summary headings.
11. Removed blanket FAQPage schema from commercial landing pages; visible FAQs remain for users.
12. Refined Organization/WebSite schema wording to identify the website as an independent information/buyer-assistance resource rather than an official developer entity.
13. Added a site-wide independent-site/non-affiliation disclosure in the shared footer.
14. Deleted four unreferenced very large PNG source assets and two duplicate Sector P PDFs, reducing `public/assets` from about 94 MB to about 21 MB.
15. Resized/recompressed the homepage hero image from 1672×941 / ~540 KB to 1440×810 / ~361 KB while retaining the same filename and visual purpose.
16. Added a centralized `imageMeta.ts` map and intrinsic image dimensions to high-priority landing/article hero images and shared logo/WhatsApp imagery.
17. Added `width`/`height`, `decoding`, and appropriate eager/lazy/fetchpriority behavior to important shared images.
18. Kept JavaScript minimal; no React/Vue/animation framework was introduced.
19. Cleaned the deliverable so it does not require shipping `node_modules`, `.astro`, `.npm-cache`, temp screenshots or test caches.
20. Preserved the existing money-page architecture rather than merging all intents into the homepage.
21. Kept the homepage as a project gateway and conversion page; dedicated landing pages retain intent ownership.
22. Did not add more SEO sections to the homepage; its role remains entity/project gateway + inquiry landing page.
23. Did not create O1/O2/Model Block thin variants or other unnecessary sector URLs.
24. Preserved Article schema, breadcrumbs, article dates, related guides and safe inline-link rendering.
25. Added a visible article verification/source section linking to the official project source and RDA verification source.
26. Consolidated repeated verification messaging into stronger dedicated verification areas rather than adding more repeated paragraphs.
27. Added property-intent-specific inquiry/checklist prompts for rental, house-sale, map, plot, sector/block and hub pages.
28. Preserved the established visual language; no unnecessary redesign.
29. Reduced the maximum homepage hero H1 size from 5.2rem to 4.65rem for better visual hierarchy.
30. Preserved the project-choice-first flow: hero → Phase 1 vs Phase 2 decision → current availability → deeper information.
31. Added lightweight WhatsApp click instrumentation in `BaseLayout.astro`; it pushes `whatsapp_click`, page, CTA location and CTA text to `dataLayer`, uses `gtag` automatically if present, and dispatches a custom browser event without loading an analytics library.
32. Kept the site WhatsApp-first; no unnecessary email/contact-form/phone-call channel was added.
33. Began stylesheet modularization by separating later landing/production refinements into `src/styles/refinements.css`, imported after the base stylesheet.
34. Extracted reusable `SiteHeader.astro` and `SiteFooter.astro` and added `MobileWhatsApp.astro` for shared CTA behavior.
35. Removed homepage duplication of phone/domain/WhatsApp constants and centralized them in `src/data/site.ts`.
36. Put every landing page's `secondaryCta` to use in the bottom conversion block instead of leaving it dead configuration.
37. Added `updated` and `reviewed` fields to all 15 landing pages; visible review dates and WebPage schema now use the same data source.
38. Automated sitemap generation from the same landing-page/article data, removing manual route maintenance.
39. Sitemap `lastmod` values now come from landing-page `updated` or article `updated/date` data.
40. Added an SVG favicon and stronger baseline metadata/accessibility behavior, including focus-visible styles, Escape/outside-click menu closing and reduced-motion handling.

## Additional technical checks

- Verified all 15 landing-page entries have `updated` and `reviewed` values.
- Checked literal internal route references against the known route set; no missing content routes were found.
- Checked quoted `/assets/...` references in `src`; no referenced assets were missing after cleanup.
- Confirmed the dynamic sitemap route includes static pages, all landing pages and all articles.

## Build-validation note

The uploaded archive contained a non-portable/incomplete `node_modules` tree. Re-running the included Astro CLI in this container reached a missing Rolldown native optional binding (`@rolldown/binding-wasm32-wasi`), which is an environment/package-install issue rather than a source-code error. The final deliverable therefore excludes `node_modules`; run `npm ci` (or a fresh `npm install`) in the target development environment and then `npm run build`.
