# Pages CMS Setup For FaisalTownGroups

This project now includes a `.pages.yml` file for Pages CMS.

## Repository

Use one GitHub repository for this website, for example:

`faisaltowngroups`

Keep other future websites in their own repositories.

## What Pages CMS Can Edit

The CMS configuration exposes these areas:

- Homepage: `src/pages/index.astro`
- Homepage content: `src/content/homepage.json`
- Individual project, block and sector page files: `src/content/projects/`
- Website settings and WhatsApp number: `src/data/site.json`
- Article content files: `src/content/articles/`
- Legal page content files: `src/content/legal/`
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

`src/content/projects/`

Examples:

- `src/content/projects/faisal-town-phase-2.json`
- `src/content/projects/faisal-town-p-block.json`
- `src/content/projects/faisal-town-overseas-block.json`
- `src/content/projects/faisal-town-sector-t.json`

Use these files for normal content updates. New page files are discovered automatically. Use each page's `order` field when changing page order in generated lists.

## Editing Articles

Each article has its own content file in:

`src/content/articles/`

New article files are discovered automatically, so future article publishing can start from `src/content/articles/`.

## Recommended Workflow

1. Push this project to a GitHub repository.
2. Open Pages CMS.
3. Connect the GitHub repository.
4. Pages CMS will read `.pages.yml`.
5. Edit content from the CMS.
6. Commit changes through Pages CMS.
7. Rebuild and upload/deploy the `dist` folder.

## Important Notes

The day-to-day editable content now lives in JSON files. Astro files remain as templates and should normally be edited only when changing layout, components or design behavior.
