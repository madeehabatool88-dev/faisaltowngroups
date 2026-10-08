# CMS homepage frontend implementation

Implemented 15 September 2026. The CMS schema, saved content, existing routes, article slugs, Phase 1 pages, PDFs, robots, sitemap, and deployment workflow are unchanged.

## Rendering

The homepage reads its hero, trust, featured offer, price offers, budgets, sectors, development, master plan, buyer support, process, assistance, FAQs, guides, and final enquiry section from the existing CMS. Every section control is respected. Enabled rows and individual assistance cards are filtered. Phase 1 links remain in a compact secondary section before the final enquiry.

Trust is currently off. No partner claim was added. Development has no date, so no date is invented. Blank assistance images do not render. Guide cards use the configured limit (currently three). FAQs and FAQPage structured data share the same eight enabled entries.

Sector P's existing WhatsApp query maps to the primary availability button; its existing page URL maps to the secondary details button. Saved CTA fields are unchanged. Both starting-price displays derive from the enabled shared offers, rather than the older hardcoded headline/fact. Prices use Lac/Crore formatting. If no eligible priced offer remains, starting prices disappear.

The mobile contact bar follows Site Settings: WhatsApp is enabled and sticky Call is currently disabled. Header and final-section Call actions remain available. Enable sticky Call in Site Settings to show both bottom actions.

## Files

- `src/pages/index.astro`: homepage sections, navigation, accessible FAQ buttons, section visibility and FAQ schema.
- `src/styles/homepage.css`: isolated homepage styles and mobile contact bar, including scoped footer colours.
- `src/components/HomeCta.astro`: consistent actions, global phone/WhatsApp settings and tracking attributes.
- `src/components/HomeImage.astro`: CMS alt text, intrinsic dimensions, hero loading priority and lazy loading.
- `src/data/homepageView.ts`: enabled bulk rows and Pakistani currency formatting.
- `src/scripts/enquiries.ts`: shared safe event dispatch and session attribution.
- `src/layouts/BaseLayout.astro`: optional body class and replacement of the previous WhatsApp listener to avoid duplicate events.
- `.gitignore`: local headless testing output exclusions.

## Measurement

Events: `whatsapp_click`, `call_click`, `sector_p_click`, `budget_click`, `site_visit_click`, `master_plan_click`, `price_enquiry_click`.

Each specialised WhatsApp interaction emits its specialised event and one generic WhatsApp event. Parameters include source section, CTA label and, where applicable, sector, plot size and budget range. Events go to an existing dataLayer and/or gtag; no analytics IDs are installed. Missing or throwing analytics callbacks cannot prevent contact navigation.

UTM source, medium, campaign, term, content and gclid are retained in sessionStorage when available and included in event parameters. No attribution values are added to visible content or WhatsApp messages. WhatsApp messages continue to include the website address and contextual query through the existing central URL builder.

## Validation

- Production build: all 31 pages succeed.
- Headless local checks at 360, 375, 390, 430, 768, 1024 and 1440px: no horizontal overflow, one H1 and contact/FAQ controls at least 44px tall.
- Mobile menu opens, closes on Escape and restores focus. FAQ buttons toggle by keyboard.
- Sticky contact bar appears only at mobile/small tablet widths and clears the footer at the bottom of the page.
- All homepage internal links, images and PDFs resolve in the build output.
- All WhatsApp links use the global number and encoded website/context messages. Call links use the global dial number.
- All section switches OFF removes all controlled sections and FAQ schema. Trust ON works independently. Disabling rows, FAQs and both assistance cards removes those entries. No eligible offers removes the shared starting price. Original CMS files were restored byte-for-byte after these tests.
- FAQ schema matches eight rendered FAQs; three guide cards render; trust remains hidden with current settings.
- Tested absent analytics, simulated throwing analytics callbacks, all seven event types, and campaign attribution persistence across navigation. No page errors.
- Mobile and desktop screenshots reviewed, including hero, prices, development, map and footer. No live user browser activity was used.

No additional information is needed to use this frontend. Actual measurement requires your own analytics installation; the hooks are ready. These checks do not prove live hosting deployment or WhatsApp message delivery.
