# CMS alignment — 24 September 2026

The supplied local folder is now the documented source of truth. Its current homepage, nine project pages, master-plan article and three legal bodies remain in place; no older website files were restored.

## Editor changes

- Populated full project bodies from all existing sections and paragraphs.
- Converted project highlights, buyer checklists, downloads, FAQs and related links to their existing bulk text fields. Price tables remain bulk-editable.
- Populated the article FAQ bulk field from its saved questions and answers.
- Converted legal bodies to one text field per page and connected their templates.
- Retained bulk editing throughout the homepage. Updated outdated future-only instructions to describe working controls, the Sector T featured offer and separate Sector P cash prices.
- Added the article's actual category to the CMS choices.
- Locked collection renaming to discourage accidental URL changes; new entries remain supported.
- Removed stale duplicate arrays so the editor and renderer use one authoritative version of each repeated section.
- Rewrote CONTENT-EDITING-GUIDE.md and PAGES-CMS-SETUP.md; recorded the baseline in AGENTS.md.

## Existing homepage wiring corrected

The price lookup only matched "discounted price", while the saved fact is "discounted listed price". Both forms now work. The featured primary WhatsApp label and secondary details label were swapped; they now use the corresponding saved labels. No price, claim or property text was invented.

## Validation

`npm run check:cms` builds the site and verifies field coverage and bulk-edit behaviour.

- All 32 JSON entries are covered by the CMS schema.
- All 16 current HTML pages build.
- The bulk migration alone produced byte-identical HTML for all 16 pages.
- After the two homepage wiring corrections, all 15 other pages remain byte-identical.
- Bulk body/FAQ/link edits and intentional clearing were verified, including legal bodies.
- Current Sector T price and enquiry/detail actions were verified against the saved content.
- Pre-migration content backups and comparison hashes are in ignored `tmp/cms-alignment/`.

## Publishing state

The supplied folder has no `.git` directory and no `.github/workflows`. CMS workflow-action buttons are omitted locally until the GitHub/deployment connection is restored. No publication has occurred as part of this local conversion. The user was asked whether to reconnect and publish this reduced page set or keep it local.

## Publishing connection restored — 25 September 2026

Git tracking is reconnected to the existing faisaltowngroups repository. The Check saved content and Deploy live website actions are restored in Pages CMS. Every push to main automatically builds, validates the CMS and deploys this local baseline. The workflow checks the current master-plan article, exact version and stylesheet contents. Only generated HTML for the 16 deliberately retired routes is removed; a route recreated later is retained. Earlier notes about missing Git/workflows describe the supplied folder before reconnection.
