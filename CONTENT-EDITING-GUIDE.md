# FaisalTownGroups Editing Guide

This website is now organized so future editing is easier.

## Main Content Folders

- Homepage: `src/pages/index.astro`
- Homepage content: `src/content/homepage.json`
- Project, block and sector pages: `src/content/projects/`
- Articles and buyer guides: `src/content/articles/`
- Legal page content: `src/content/legal/`
- Site phone, email and WhatsApp settings: `src/data/site.json`
- Image notes and labels: `src/data/imageMeta.ts`

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

`src/content/projects/`

Examples:

- `src/content/projects/faisal-town-phase-2.json`
- `src/content/projects/faisal-town-p-block.json`
- `src/content/projects/faisal-town-overseas-block.json`
- `src/content/projects/faisal-town-sector-t.json`

To edit a page, open the matching file and update the title, intro, sections, FAQs, downloads or links.

## Adding A New Project Page

1. Copy `docs/templates/new-project-page.json.example`.
2. Save it inside `src/content/projects/` with a clear filename, for example `new-project-name.json`.
3. Change the `slug` to the page URL you want.
4. Add any project images to `public/assets/projects/`.
5. Add plans or PDFs to `public/assets/plans/`.
6. Run the build before uploading.

New project page files are discovered automatically. Use the `order` field to control display order.

## Editing Articles

Article content files live in:

`src/content/articles/`

New article files are discovered automatically. Use the `order`, `status`, `category`, and `cluster` fields to control how they appear on the archive.

## Writing Rules

- Keep text customer-facing.
- Remove internal notes, builder notes, and prompts.
- Do not invent prices, approvals, possession dates, distances or guarantees.
- Every important page should lead toward WhatsApp.
- Use specific CTA text such as "Check Current Availability", "Get Today's Price" or "Arrange a Site Visit".
- When adding a new WhatsApp link, include the website address and the visitor query in the message.
