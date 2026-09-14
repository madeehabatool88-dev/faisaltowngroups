# FaisalTownGroups Editing Guide

Use Pages CMS when you want to update website text, images, PDFs, articles, project pages, legal pages, phone details, or WhatsApp messages.

## Best Editing Workflow

1. Open the FaisalTownGroups project in Pages CMS.
2. Choose the section you want to edit: Homepage, Projects & Property Pages, Articles & Buyer Guides, Legal Pages, or Site Settings.
3. Make the change.
4. Save the entry.
5. Check the website after the new build is uploaded or deployed.

## Homepage

Open **Main Website → Homepage**. The sections are organized for the planned Phase-2-first homepage:

- 00 - Section Controls
- 01 - SEO & Hero
- 02 - Trust / Authorized Partner
- 03 - Featured Phase 2 Offer
- 04 - Plot Sizes & Prices
- 05 - Find by Budget
- 06 - Phase 2 Sectors
- 07 - Development Updates
- 08 - Master Plan
- 09 - Why Buy Through Us
- 10 - How Buying Works
- 11 - Site Visit / Overseas Buyers
- 12 - FAQs
- 13 - Buyer Guides
- 14 - Final WhatsApp CTA

**This release restructures the CMS only.** The current homepage appearance and order are unchanged. Existing content still controls the page from its new location. New sections, visibility switches, CTA types, per-item status and visibility, extra images, and new contact display options are prepared for the later frontend redesign. They do not change the current layout yet. Each entry explains which controls apply now.

Repeated items use a single bulk text box. Paste all rows using the column order shown below the field, or paste spreadsheet columns without a header row. Reorder by moving lines. Blank lines are ignored. Keep empty optional columns between separators. Use yes/no for Enabled.

- **04 - Plot Sizes & Prices** owns the shared price table. Format: `Dimensions | Marla/Kanal | Original PKR | Current PKR | Availability | Enabled (yes/no) | WhatsApp message`.
- **03 - Featured Phase 2 Offer** owns the feature copy, facts and Sector P plan. It does not have a second price table. Existing prose that mentions a price still needs to be reviewed separately when prices change.
- **06 - Phase 2 Sectors** owns sector names, URLs and descriptions, with additional fields prepared for the redesign.
- **12 - FAQs** accepts `Question | Answer | Enabled (yes/no)`, one FAQ per line. This new homepage section will display after the frontend stage.
- **13 - Buyer Guides** has separate bulk selections for Phase 2 and Phase 1, one article slug per line. Article titles, images and URLs come from the articles collection.

**Main Website → Preserved Homepage Content** keeps Phase 1, Project Choice and the Phase 2 introduction editable. These still appear in their original positions on the current homepage. No Phase 1 content or URLs were removed.

**Site Settings** remains the source for the global company name, domain, phone and WhatsApp number. It now also has fields for email, office address, representative, confirmed partner wording, dealer number, social URLs, Google Maps, business hours, default WhatsApp message and future sticky-contact controls. New fields await frontend wiring. Unknown details are blank; only enter confirmed information. No authorized-partner claim is assumed.

## Projects & Property Pages

Use this collection for project hubs, sectors, blocks, map/location pages, and property-search pages.

Important fields:

- Display Order: lower numbers appear first.
- Status: use Published for live pages and Draft for pages you are still preparing.
- Slug: controls the page URL. Do not change it unless you intentionally want a new URL.
- Page Type: helps you find pages in the CMS list.
- Phase / Area: helps separate Phase 1, Phase 2 and shared pages.
- SEO Title and Meta Description: search result text.
- Page Heading and Intro: the first customer-facing text on the page.
- Featured Image: the main image for the page.
- Full Project Body: paste or edit all sections in one text box. Use `## Heading` before each section and a blank line between paragraphs.
- Buyer Checklist - Bulk Edit: one `Title | Description` per line.
- Downloads - Bulk Edit: one `Label | Title | Description | URL or PDF path` per line.
- Highlights - Bulk Edit: one `Label | Value` per line.
- FAQs - Bulk Edit: one `Question | Answer` per line.
- Related Links - Bulk Edit: one `Link text | URL` per line.

All existing project content is already filled in. You can replace a whole text box at once instead of opening and filling individual rows. For the bulk lists, you can also copy the matching columns from Excel or Google Sheets and paste them directly, without a header row. Blank lines are ignored; clearing a field removes those items. Keep each list item on one line and use `|` only between columns (or paste tab-separated spreadsheet cells). Every column must have a value. Invalid rows stop the build with the page name, field and line number so content is not silently lost.

Example Full Project Body:

```text
## Overview

Your project overview goes here.

A second paragraph goes here.

## Location

Your location information goes here.
```

Example FAQs - Bulk Edit:

```text
How can I check availability? | Ask for current options on WhatsApp.
Can I request a plan? | Ask for the relevant project or sector plan.
```

Keep SEO, heading, image and other page settings in their named fields above the bulk text boxes. These bulk fields edit the content within one project page; save each project page separately.

## Adding A New Project, Block Or Sector Page

1. Open Projects & Property Pages.
2. Create a new entry.
3. Add a clear slug, such as `faisal-town-new-sector`.
4. Set Status to Draft while preparing it.
5. Add SEO title, description, heading, intro and image, then paste the Full Project Body and the bulk lists.
6. Add any relevant PDFs through Master Plans & PDFs, then add the PDF path in Downloads - Bulk Edit.
7. Change Status to Published when ready.

## Articles & Buyer Guides

Use this collection for SEO articles, buyer guides, location guides and price explainers.

Important fields:

- Display Order: lower numbers appear first on article listings.
- Status: use Draft until the article is ready.
- Slug: controls the article URL.
- Article Title: the visible article title.
- SEO Title and Meta Description: search result text.
- Category: choose the closest topic from the dropdown.
- Cluster: choose the broader SEO group from the dropdown.
- Full Article Body: edit or paste the whole article in one place.
- Related Articles - Bulk Edit: paste every related article slug into one text box, one slug per line.
- FAQs - Bulk Edit: paste all questions and answers into one text box, one `Question | Answer` per line. You can also paste two columns from a spreadsheet without a header row.
- Article CTA: the WhatsApp lead box inside the article.

Related article slugs should be simple slugs only, for example `faisal-town-ii-master-plan`.

The bulk fields are prefilled with existing saved content. Blank lines are ignored. Clearing FAQs removes them; clearing Related Articles removes your manual selections (automatic related guides may still appear). Keep each FAQ on one line, with `|` only between the question and answer. Invalid FAQ lines stop the build with the article slug and line number.

Full Article Body supports simple formatting:

- Use `## Heading` for article section headings.
- Use a blank line between paragraphs.
- Use `- Bullet point` for bullet lists.
- Use `> Important note` for a highlighted note.
- Use `[link text](/page-url/)` for internal links.

## Legal Pages

Use Legal Pages for Privacy Policy, Disclaimer, and Terms & Conditions.

These pages are editable but should not be deleted or renamed. Keep the language clear, conservative and relevant to a property information website.

## Images And PDFs

Use the media library folders based on the type of file:

- Website Images: general images.
- Project Images: project and sector images.
- Maps & Location Images: master plans and map previews.
- Article Images: article thumbnails and guide images.
- New Uploads: temporary or newly added images.
- Master Plans & PDFs: downloadable PDF plans.

Use real project images wherever possible. Avoid very small, blurry, cropped or misleading images.

## WhatsApp Messages

WhatsApp is the main lead channel. Each important CTA should use a specific buyer intent, such as:

- Check Current Availability
- Get Today's Price
- Request Payment Plan
- Arrange a Site Visit
- Ask About This Plot

Every WhatsApp message should include the website address and the visitor query.

## SEO Rules

- Keep one clear topic per page.
- Use natural customer language.
- Do not stuff keywords.
- Do not invent prices, approvals, possession dates, development percentages, distances or guarantees.
- If information can change, ask buyers to verify current availability, dues and payment terms.
- Keep internal links useful for buyers.

## Publishing Notes

Pages CMS saves changes into the website repository. Saves to `main` trigger the GitHub deployment workflow once the Hostinger secrets are configured. You can also use **Check saved content** or **Deploy live website** in Pages CMS. Check GitHub Actions for the deployment result. See DEPLOYMENT.md for the one-time hosting connection setup.
