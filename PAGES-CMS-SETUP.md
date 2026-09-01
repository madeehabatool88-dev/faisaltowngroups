# Pages CMS Setup For FaisalTownGroups

This project now includes a `.pages.yml` file for Pages CMS.

## Repository

Use one GitHub repository for this website, for example:

`faisaltowngroups`

Keep other future websites in their own repositories.

## What Pages CMS Can Edit

The CMS configuration exposes these areas:

- Homepage: `src/pages/index.astro`
- Project, block and sector page data: `src/data/landingPages.ts`
- Website settings and WhatsApp number: `src/data/site.ts`
- Article content files: `src/data/articles/`
- Articles archive page: `src/pages/articles/index.astro`
- Legal pages:
  - `src/pages/privacy-policy.astro`
  - `src/pages/disclaimer.astro`
  - `src/pages/terms-and-conditions.astro`
- Images and plans:
  - `public/assets/`
  - `public/assets/plans/`

## Editing Articles

Each article has its own content file in:

`src/data/articles/`

Each live article page has a matching folder in:

`src/pages/articles/`

Normally edit the content file, not the small page wrapper.

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
