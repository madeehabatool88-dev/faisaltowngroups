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

## Editable project-page presentation

Projects & Property Pages now exposes the Quick Answer label/heading, verification notice, checklist heading, download heading/button, FAQ heading, related-page heading, bottom CTA text and optional plan-link panel. Existing body, highlights, FAQs and lists remain bulk editors. Empty text stays empty; clearing Plan Link URL removes that panel. Clearing a checklist or related-link list removes that section.

**Hero Background Image** controls the decorative image behind the title; clear it for a plain maroon background. **Main Page / Social Sharing Image** is the uncropped image below the summary and the social preview. **Show Main Page Image** controls whether it appears in the page body; social preview remains available. The Location page starts with this switch off, keeping the large master plan on its dedicated article. Both Updated and Reviewed dates are visible separately.

**Body Section Buttons - Bulk Edit:** one row per button, `Exact body heading | Button label | /page/`. Use the exact text after `##` in Page Body; update the corresponding row if you rename that heading. Clear the field to remove all section buttons. The Home link is now an ordinary editable row in Related Internal Links.

Run `node scripts/check-project-cms-rendering.mjs` while no one else is editing local content to verify copy edits, image controls, dates, links and clearing. It uses temporary local test values and restores the original content in a finally block. Never deploy while this test is running.

## Legal-page editors — 6 October 2026

Expand **Legal Pages** in the sidebar, then open **Privacy Policy**, **Terms and Conditions**, or **Disclaimer** directly. These are explicit file editors for the existing legal JSON files, replacing the collection screen that showed “No entries.” All existing legal copy and URLs are preserved. Edit Full Legal Page - Bulk Edit for the body, then Save. Leave the old `/collection/legal_pages` browser URL and reopen the repository sidebar after refreshing CMS.

## Green and gold homepage layout — 7 October 2026

The homepage now uses the supplied layout with this site's project photographs, sector plans and existing price rows. No stock photographs or sample prices are used.

Under **Main Website → Homepage**, use **00b - Navigation, Labels & Benefits (Bulk)** to paste all navigation links, shared button/section labels or buyer-benefit cards at once. Keep label keys on the left of `|` and edit the wording on the right. Other repeated content stays in its existing bulk editor: featured facts, price rows, budgets, sectors, support cards, buying steps, FAQs and final inquiry options. Empty bulk fields remove the corresponding repeated content. Section controls still switch complete sections on/off.

The hero has separate foreground and background image fields. Sector card images use your existing sector-plan previews; change their image paths in the sector bulk text. All existing legal pages remain individual editors under **Legal Pages**.

Saving content commits to the main branch and starts the production build/deployment. Wait for the Deploy live website action to finish before checking the public site. A failed build does not publish the saved changes.
