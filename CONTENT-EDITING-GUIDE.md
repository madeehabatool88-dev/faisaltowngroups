# FaisalTownGroups editing guide

The working site in `G:\Groupsfaisaltown` is the source of truth as of 24 September 2026. Pages CMS reads the content files used by these pages. Do not restore the older homepage or removed page collection when syncing this folder.

## Edit whole sections at once

**Projects & Property Pages:** open a page and edit **Full Project Body** in one box. Use `## Heading`, then a blank line and the paragraph. Separate paragraphs with blank lines. The current nine pages are already populated in this format.

```text
## First section heading

First paragraph.

Second paragraph.

## Next section heading

Next paragraph.
```

Project and legal bodies support headings and paragraphs. Articles additionally support `- bullet`, `> callout` and `[Link label](/internal-path/)`. Do not paste HTML or JSON into body fields.

Other project sections are bulk boxes too:

| Field | One line per item |
| --- | --- |
| FAQs | Question \| Answer |
| Related links | Label \| /page-path/ |
| Highlights | Label \| Value |
| Buyer checklist | Title \| Description |
| Downloads | Label \| Title \| Description \| /assets/plans/file.pdf |
| Price table | Plot size \| Dimensions \| Payment \| Current price \| Availability |

Paste every row at once. You can paste tab-separated spreadsheet cells instead of pipes. Do not include a header row. Move lines to reorder entries. Clear a box to remove its content. Keep each repeated item on one line. If content includes a literal pipe, use tab-separated cells.

**Articles & Buyer Guides:** the full article body, all FAQs and related article slugs are each editable in a single box. Related article slugs use one slug per line, without `/articles/`. Clearing manually selected related articles still allows the existing automatic related-article suggestions where other published articles are available.

**Legal Pages:** the full body is now one text box using the same `## Heading` and paragraph format as projects.

## Homepage

Open **Main Website → Homepage**. The numbered entries match the current homepage sections. **00 - Section Controls** switches sections on or off immediately on the next build; the switches are not placeholders.

- **01 - SEO & Hero:** title, description, headline, introduction, image, disclaimer, CTA actions and bulk trust points.
- **03 - Featured Offer (currently Sector T):** feature copy, image, buttons, sector plan and bulk facts. The hero starting price comes from the fact labelled `discounted listed price` (the renderer matches `discounted price`). Keep the price fact, heading and WhatsApp message consistent. Sector identity comes from the beginning of the heading, such as `Sector T`.
- **04 - Sector P Cash Prices:** a separate bulk price table. It does not change the Sector T starting price. Columns: `Dimensions | Marla/Kanal | Original PKR | Current PKR | Availability | Enabled | WhatsApp message`.
- **05 - Find by Budget:** all budget options and their WhatsApp messages in one box.
- **06 - Phase 2 Sectors:** all current sector cards in one box. The featured offer's matching page link sorts first. Preserve the existing O/P/Q/R/S/T page URLs.
- **07 / 08 - Development and Master Plan:** current text, images, PDF links and enquiries.
- **09 / 10 - Buyer Support and Buying Process:** bulk cards and steps.
- **11 - Site Visit / Overseas Buyers:** each card has its own enabled switch, text and action.
- **12 - FAQs:** `Question | Answer | yes`, one FAQ per line. Change yes to no to hide an entry.
- **13 - Buyer Guides:** all selected slugs in one box; the current display limit is one.
- **14 - Final WhatsApp CTA:** closing copy and bulk quick enquiry options.

Each bulk field shows its precise column order. Preserve empty optional columns between separators. Homepage row switches use `yes` or `no`.

The featured offer's primary button uses `primaryCta` with the stored WhatsApp message (`secondaryQuery`). The secondary button uses `secondaryCta` and the internal details link (`primaryHref`). Those historical field names are retained so the current page continues to work.

**Preserved Homepage Content** contains the secondary Phase 1 content and older saved fields. Phase 1 remains controlled by its homepage switch; old Project Choice and Phase 2 introduction entries are retained but are not standalone sections in the current homepage. The old hero WhatsApp-card fields are also retained data, not the current final enquiry section.

**Site Settings** controls global contact details and sticky-contact switches. Optional business fields do not automatically create new visible sections. Trust remains hidden while its section switch is off.

## Current folder and publishing

This folder has nine project pages, one master-plan article, the homepage, article index, all-pages index and three legal pages: 16 built HTML pages in total. Sector Q is included. The earlier 31-page version is not this baseline.

When this copy was supplied, `.git` and `.github/workflows` were absent. The local CMS configuration therefore does not offer non-working workflow action buttons. GitHub connection and deployment workflows must be restored before publishing. No website content was fetched over these local edits.

After publishing the configuration and content together, reload Pages CMS and reopen the entry. Existing unsaved browser forms may still contain the older data; copy any unsaved edits before reloading.

## Publishing connection restored — 25 September 2026

Git tracking is reconnected to the existing faisaltowngroups repository. The Check saved content and Deploy live website actions are restored in Pages CMS. Every push to main automatically builds, validates the CMS and deploys this local baseline. The workflow checks the current master-plan article, exact version and stylesheet contents. Only generated HTML for the 16 deliberately retired routes is removed; a route recreated later is retained. Earlier notes about missing Git/workflows describe the supplied folder before reconnection.
