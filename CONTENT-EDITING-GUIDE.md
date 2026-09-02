# FaisalTownGroups Editing Guide

This website is now organized so future editing is easier.

## Main Content Folders

- Homepage: `src/pages/index.astro`
- Project, block and sector pages: `src/data/pages/`
- Articles and buyer guides: `src/data/articles/`
- Article page folders: `src/pages/articles/`
- Site phone, email and WhatsApp settings: `src/data/site.ts`
- Image notes and labels: `src/data/imageMeta.ts`
- Legal pages: `src/pages/privacy-policy.astro`, `src/pages/disclaimer.astro`, `src/pages/terms-and-conditions.astro`

## Asset Folders

- General uploads: `public/assets/uploads/`
- Maps and location graphics: `public/assets/maps/`
- Project images: `public/assets/projects/`
- Article images: `public/assets/articles/`
- Master plans and PDFs: `public/assets/plans/`
- Faisal Town II images: `public/assets/faisal-town-ii/`
- Sector P images: `public/assets/sector-p/`
- Completed project images: `public/assets/portfolio/`

## Editing Existing Project Pages

Each project, block, sector or property page has its own file in:

`src/data/pages/`

Examples:

- `src/data/pages/faisal-town-phase-2.ts`
- `src/data/pages/faisal-town-p-block.ts`
- `src/data/pages/faisal-town-overseas-block.ts`
- `src/data/pages/faisal-town-sector-t.ts`

To edit a page, open the matching file and update the title, intro, sections, FAQs, downloads or links.

## Adding A New Project Page

1. Copy `docs/templates/new-project-page.ts.example`.
2. Save it inside `src/data/pages/` with a clear filename, for example `new-project-name.ts`.
3. Change the `slug` to the page URL you want.
4. Add any project images to `public/assets/projects/`.
5. Add plans or PDFs to `public/assets/plans/`.
6. Run the build before uploading.

New project page files are discovered automatically. Use `src/data/landingPages.ts` only when you want to control the order of pages in generated lists.

## Editing Articles

Article content files live in:

`src/data/articles/`

Each current article also has a matching page folder in:

`src/pages/articles/`

Normally, edit the article content file. The page folder is only there so the article has a visible route in the source.

New article files are also discovered automatically. Existing article folders can stay as they are; new article URLs can publish from `src/data/articles/` without extra route work.

## Writing Rules

- Keep text customer-facing.
- Remove internal notes, builder notes, and prompts.
- Do not invent prices, approvals, possession dates, distances or guarantees.
- Every important page should lead toward WhatsApp.
- Use specific CTA text such as "Check Current Availability", "Get Today's Price" or "Arrange a Site Visit".
- When adding a new WhatsApp link, include the website address and the visitor query in the message.
