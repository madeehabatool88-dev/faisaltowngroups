# FaisalTown Groups Website

Astro project for `www.faisaltowngroups.com` — a static site with Pages CMS content editing.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # static output in dist/
npm run preview    # serve the production build locally
npm run check:cms  # build + verify content matches the Pages CMS config
```

## Repository Layout

```
src/
  pages/            # Routes: homepage, project [slug], articles, legal, sitemap
  layouts/          # BaseLayout (SEO/meta/schema) and ContentLayout (hero + chrome)
  components/       # Site-wide components (header, footer, WhatsApp bar)
    home/           # Homepage sections — one component per CMS-controlled section
  data/             # Loaders/normalizers that turn content JSON into typed views
  content/          # Editable content (JSON) — wired to Pages CMS
  scripts/          # Client-side TypeScript (inquiry/attribution tracking)
  styles/           # global.css, homepage.css, refinements.css
public/assets/      # Images, plans and uploads (Pages CMS media folders)
scripts/            # Build/CI utilities (verify-cms.mjs, rendering checks)
docs/
  guides/           # Content-editing, CMS setup and deployment guides
  archive/          # Dated audits, changelogs and cleanup notes
```

## Editing Content

All page content lives in `src/content/**` as JSON and is edited through Pages CMS
(configuration in `.pages.yml`). Bulk text fields are authoritative — see
`docs/guides/CONTENT-EDITING-GUIDE.md` for formats.

## Deployment

The site builds as static output with canonical domain
`https://www.faisaltowngroups.com`. See `docs/guides/DEPLOYMENT.md` and
`.github/workflows/`.
