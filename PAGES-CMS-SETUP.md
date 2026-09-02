# Pages CMS Setup For FaisalTownGroups

This project now includes a `.pages.yml` file for Pages CMS.

## Repository

Use one GitHub repository for this website, for example:

`faisaltowngroups`

Keep other future websites in their own repositories.

## What Pages CMS Can Edit

The CMS configuration exposes these areas:

- Homepage: `src/pages/index.astro`
- Project, block and sector page index/order: `src/data/landingPages.ts`
- Individual project, block and sector page files: `src/data/pages/`
- Website settings and WhatsApp number: `src/data/site.ts`
- Article content files: `src/data/articles/`
- Articles archive page: `src/pages/articles/index.astro`
- Legal pages:
  - `src/pages/privacy-policy.astro`
  - `src/pages/disclaimer.astro`
  - `src/pages/terms-and-conditions.astro`
- Images and plans:
  - `public/assets/`
  - `public/assets/uploads/`
  - `public/assets/maps/`
  - `public/assets/projects/`
  - `public/assets/articles/`
  - `public/assets/plans/`

## Editing Project, Block And Sector Pages

Each page now has its own file in:

`src/data/pages/`

Examples:

- `src/data/pages/faisal-town-phase-2.ts`
- `src/data/pages/faisal-town-p-block.ts`
- `src/data/pages/faisal-town-overseas-block.ts`
- `src/data/pages/faisal-town-sector-t.ts`

Use these files for normal content updates. New page files are discovered automatically. Use `src/data/landingPages.ts` only when changing page order in generated lists.

## Editing Articles

Each article has its own content file in:

`src/data/articles/`

Each current live article page has a matching folder in:

`src/pages/articles/`

Normally edit the content file, not the small page wrapper.

New article files are discovered automatically, so future article publishing can start from `src/data/articles/`.

## Recommended Workflow

1. Push this project to a GitHub repository.
2. Open Pages CMS.
3. Connect the GitHub repository.
4. Pages CMS will read `.pages.yml`.
5. Edit content from the CMS.
6. Commit changes through Pages CMS.
7. Rebuild and upload/deploy the `dist` folder.

## Important Notes

The current site stores content in Astro and TypeScript files, so the first CMS setup uses safe code editing mode. This avoids breaking the existing website structure.

For a more editor-friendly CMS later, migrate articles and project pages into Markdown, YAML or JSON content files. That would allow form-style fields for title, description, images, sections and FAQs.
