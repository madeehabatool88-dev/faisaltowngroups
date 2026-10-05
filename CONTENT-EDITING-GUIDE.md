# FaisalTownGroups content editing guide

The Pages CMS editors are intentionally kept simple. Edit the page content in the CMS; do not edit generated `dist/` files.

## Property & Project Pages

Each project, sector, map or location page is one record.

Use the fields in this order:

1. **Page Title** — the visible H1.
2. **URL Slug** — keep existing slugs stable.
3. **Status** — published or draft.
4. **SEO Title / Meta Description** — search-result text.
5. **Last Updated / Reviewed Date** — change only when appropriate.
6. **Page Type / Phase** — classification only.
7. **Eyebrow / Introduction** — the short text at the top of the page.
8. **Main Page Image / Main Image Description** — the visible featured image and its alt text.
9. **Quick Answer** — short buyer-focused summary near the top. If blank, the introduction is used.
10. **Key Highlights** — one line per item: `Label | Value`.
11. **Price Table** — one row per line: `Plot Size | Dimensions | Payment | Current Price | Availability`.
12. **Plans & Downloads** — one line per item: `Label | Title | Description | /file.pdf`.
13. **Buyer Checklist** — one line per item: `Title | Description`.
14. **Related Internal Links** — one line per item: `Page Label | /page-path/`.
15. **Frequently Asked Questions** — one line per item: `Question | Answer`.
16. **Page Body** — the main editorial copy. Use `## Heading`, then blank lines between paragraphs.
17. **Buttons / Bottom CTA** — edit the labels and final conversion message.

## Articles & Buyer Guides

The article editor follows the same clean pattern used on the other content site: title and SEO first, then dates, image, quick answer, body, internal links, FAQs and CTA.

For **Article Body**:

- `## Heading` creates a section heading.
- A blank line separates paragraphs.
- `- item` creates a bullet.
- `> note` creates a callout.
- `[Label](/page/)` creates an internal link.
- `[Source](https://example.com/)` creates an external link.

## Price and availability rules

- Sector T currently uses the confirmed PKR 27.90 Lac 5.56 Marla entry where stated in the saved content.
- Sector O, P, Q and R are treated in the saved content as cash-only model blocks.
- Sector S and T are treated in the saved content as installment sectors.
- The master plan and sector plans are layout references, not proof of live availability.
- Keep current prices, availability and payment wording in CMS content rather than hardcoding them in page templates.

## Publishing

Saving in Pages CMS updates the GitHub content source. Use **Check saved content** before deployment when practical, then use **Deploy live website**.
