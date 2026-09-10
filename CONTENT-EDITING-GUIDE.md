# FaisalTownGroups Editing Guide

Use Pages CMS when you want to update website text, images, PDFs, articles, project pages, legal pages, phone details, or WhatsApp messages.

## Best Editing Workflow

1. Open the FaisalTownGroups project in Pages CMS.
2. Choose the section you want to edit: Homepage, Projects & Property Pages, Articles & Buyer Guides, Legal Pages, or Site Settings.
3. Make the change.
4. Save the entry.
5. Check the website after the new build is uploaded or deployed.

## Homepage

The homepage is split into five smaller CMS screens so you do not have to edit one very long page.

Use these entries:

- Homepage - Hero & SEO: search title, meta description, top strip, hero image, main heading, intro and hero WhatsApp buttons.
- Homepage - Project Choice: the two project choice cards near the top.
- Homepage - Phase 2: Phase 2, master plan, sectors, Sector P, price rows, plan, development and related Phase 2 articles.
- Homepage - Phase 1: Phase 1 heading, block cards, feature image and related Phase 1 articles.
- Homepage - Contact: final WhatsApp lead section.

Useful fields:

- SEO Title: the title Google may show in search results.
- Meta Description: the short search result description.
- Hero Image: the main first-screen image.
- H1 Heading: the main visible heading on the homepage.
- Primary CTA and Secondary CTA: the main action buttons.
- WhatsApp Card: the lead-focused box near the hero.
- Related Article Slugs: controls which articles appear inside the Phase 1 or Phase 2 homepage sections.

Keep homepage text customer-facing. Do not add internal notes, builder notes, task comments, or reminders for yourself.

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
- Related Article Slugs: add one related article slug per row.
- FAQs: optional article FAQs.
- Article CTA: the WhatsApp lead box inside the article.

Related article slugs should be simple slugs only, for example `faisal-town-ii-master-plan`.

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

Pages CMS saves changes into the website repository. After changes are saved, the site still needs to be built and uploaded or deployed before visitors see the update.
