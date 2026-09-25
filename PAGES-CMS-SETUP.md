# Pages CMS — current local setup

Source of truth: `G:\Groupsfaisaltown`, supplied 24 September 2026.

The schema is `.pages.yml`. Current project, article, homepage, legal and site-settings JSON fields are all exposed. Bodies and repeated groups use bulk text boxes, populated from the supplied content. All 16 HTML pages render identically before and after migration.

See [CONTENT-EDITING-GUIDE.md](CONTENT-EDITING-GUIDE.md) for formats and homepage price relationships.

The supplied copy has no Git metadata or `.github/workflows` directory. Publishing requires reconnecting the existing repository and restoring an appropriate workflow without overwriting this folder's updated content. CMS action buttons have been omitted until that workflow exists.

## Publishing connection restored — 25 September 2026

Git tracking is reconnected to the existing faisaltowngroups repository. The Check saved content and Deploy live website actions are restored in Pages CMS. Every push to main automatically builds, validates the CMS and deploys this local baseline. The workflow checks the current master-plan article, exact version and stylesheet contents. Only generated HTML for the 16 deliberately retired routes is removed; a route recreated later is retained. Earlier notes about missing Git/workflows describe the supplied folder before reconnection.
