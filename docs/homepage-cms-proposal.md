# Proposed homepage CMS structure

Status: original schema proposal, followed by the CMS-only restructure. See CONTENT-EDITING-GUIDE.md for the implemented editors. The existing homepage rendering is preserved; new sections and visibility controls await the separate frontend stage.

## Scope and staging

Prepare a Phase-2-first homepage content model before redesigning the homepage. Preserve the current frontend and all saved content during this stage. The CMS labels describe the intended future visual order; the current homepage will retain its existing order until the separate frontend implementation.

The current homepage imports hero.json, project-choice.json, phase-2.json, phase-1.json and contact.json directly. Simply splitting or renaming those files would disconnect the current page from its content. Migrate the data and update its import adapter together, preserving the exact existing rendering. Do not leave two editable copies of the same prices or content.

## Navigation and files

All section files below are relative to src/content/homepage/. Each section keeps its own text and display settings. Main Website contains a Homepage group and Site Settings. Projects, articles and legal collections stay available with their current URLs and bulk editors.

| CMS entry | Proposed file | Fields and migration |
| --- | --- | --- |
| 00 - Section Controls | controls.json | Named enable switches for the 14 sections and Phase 1 secondary content. Fixed order initially; no drag ordering needed in this stage. |
| 01 - SEO & Hero | hero.json | Preserve existing SEO, headline, intro, image and alt text. Add starting-price label, price disclaimer, typed primary/secondary CTAs and bulk trust points. Starting price references the shared offers rather than another price field. |
| 02 - Trust / Authorized Partner | trust.json | Heading, partner statement visibility, certificate image/alt and show-image toggle. Reference company identity, authorization wording, dealer number, office and contact details from Site Settings. |
| 03 - Featured Phase 2 Offer | featured-offer.json | Migrate sectorP heading, description, image, facts and CTAs. Add project/sector identifier and status label. References shared offers; no second editable price list. Preserve the existing Sector P plan fields here. |
| 04 - Plot Sizes & Prices | prices.json | Table heading, explanation, reviewed date and disclaimer. Owns the shared ordered offers: stable ID, dimensions, size, price in PKR, optional previous price, property label, availability, enabled, CTA label and WhatsApp message. Migrate the existing seven Sector P price rows without changing amounts. |
| 05 - Find by Budget | budgets.json | Heading, description and ordered budget options with label, description, WhatsApp message and enabled flag. Disabled initially until actual options are supplied. |
| 06 - Phase 2 Sectors | sectors.json | Migrate the six existing sector entries. Each has name, sub-name, description, optional image/alt, status, existing page URL, WhatsApp message and enabled flag. Preserve current order on migration. |
| 07 - Development Updates | development.json | Migrate current development heading, text, image/alt, caption and CTA. Add actual update date, ordered images and optional video URL. Do not invent a newer review or photography date. |
| 08 - Master Plan | master-plan.json | Migrate general Phase 2 master-plan heading, intro, image/alt, caption, PDF and WhatsApp query. Add editable view/download/WhatsApp button labels. |
| 09 - Why Buy Through Us | buyer-support.json | Heading and ordered support cards: title, text, icon from a fixed supported list, enabled. Disabled initially; no invented authorization claims. |
| 10 - How Buying Works | buying-process.json | Heading, intro and ordered steps: title, description, enabled. Numbers derive from order. Disabled initially until content is prepared. |
| 11 - Site Visit / Overseas Buyers | visit-overseas.json | Two independent cards with enabled, heading, text, image/alt and CTA. Disabled initially until content is prepared. |
| 12 - FAQs | faqs.json | Heading and one bulk FAQ editor, using Question | Answer | Enabled per line, with spreadsheet paste supported. Reorder by moving lines. The future renderer and FAQ schema use exactly the same enabled rows. |
| 13 - Buyer Guides | buyer-guides.json | Heading, intro, display limit and bulk selected article slugs, one per line. Resolve titles, images and URLs from the articles collection; exclude drafts. Migrate existing homepage guide selections. |
| 14 - Final WhatsApp CTA | contact.json | Preserve current contact content and options. Add typed main WhatsApp and call CTAs plus optional background image/alt. Phone numbers come from Site Settings. |
| Phase 1 - Secondary Project | phase-1.json | Preserve all Phase 1 content and links. Keep it independently editable for the later secondary placement. |

Retain project-choice.json as legacy content, clearly labelled as controlling the current homepage until the redesign replaces that section. Retain the remaining Phase 2 introduction and CTAs from phase-2.json in a legacy Phase 2 introduction entry. Do not discard fields that fall outside the new section split.

## Bulk editing

FAQs and related guide slugs must remain single-box bulk editors, matching the user's established preference. Prices, budgets, sector cards, support cards and buying steps should offer a bulk text or spreadsheet-paste editor too, rather than making the user fill every item separately. Each dataset has one authoritative editor, not competing row and bulk copies. Document its column order next to the field. Validate malformed rows with the section and line number; blank fields intentionally clear optional lists. Reordering lines determines display order.

## Global Site Settings

Continue using src/data/site.json. Preserve existing name, domain, phoneDisplay, phoneWhatsApp, defaultImage, disclosure and global CTA labels. Add phoneDial, email, officeAddress, representativeName, partnerStatement, dealerNumber, facebookUrl, instagramUrl, googleMapsUrl, businessHours, defaultWhatsAppMessage, stickyWhatsAppEnabled and stickyCallEnabled.

Leave unknown identity/contact fields empty. The current disclosure says this is an independent buyer-assistance site, not the official developer website. Do not replace it with an authorized-partner claim without the user's exact confirmed wording. Certificates are optional and hidden by default until supplied.

Shared CTA shape: label, type (whatsapp / phone / internal), message for WhatsApp and href for an internal destination. Phone and WhatsApp numbers are never copied into section records. The existing whatsappLink helper continues to append the website address to every inquiry.

## Enable controls and rollout

Section controls are the single source for section visibility; item-level enabled flags only hide individual offers or cards. New sections start disabled so empty or unconfirmed content cannot appear. Existing rendered sections remain enabled. Hero stays mandatory on the published homepage to preserve a clear H1 and offer.

Schema additions alone cannot make new sections, sticky toggles or CTA types affect the current page. During the CMS stage, label new-only controls as applying to the upcoming homepage. Wire them during the frontend stage; do not claim they are live before then. Existing content edits must continue to affect their existing sections through the compatibility adapter.

## Proposed code changes for the CMS stage

- .pages.yml: numbered Homepage entries, bulk fields, global settings, legacy entries and clear field descriptions.
- src/content/homepage/: create the section files above and migrate saved values without rewriting property facts.
- src/data/site.json and src/data/site.ts: extend settings with backward-compatible defaults.
- src/data/homepage.ts: normalize bulk text and provide the existing hero/projectChoice/phase2/phase1/contact shapes to the current homepage.
- src/pages/index.astro: import replacement only for migration compatibility; retain existing markup, ordering, styling and text.
- CONTENT-EDITING-GUIDE.md: document each numbered section, bulk formats, shared pricing and which new controls await frontend wiring.

No project/article routes, canonical tags, media files, or saved Phase 1 content are removed. Sector P's project page can consume shared offer data in the later frontend stage; existing prose mentioning prices will need an explicit review because a shared dataset cannot automatically update arbitrary sentences.

## Validation before pushing

Sync the latest CMS edits first. Check every migrated value against its original, validate bulk parsing and empty fields, and compare the built homepage before/after the data split. The CMS-only migration must preserve visible output and links. Run the Astro production build. Keep frontend redesign work separate, and show its proposed changes before implementing it.
