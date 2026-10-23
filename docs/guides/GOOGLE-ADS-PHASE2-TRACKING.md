# Phase 2 Google Ads — tracking setup

This implementation prepares conversion measurement for **Faisal Town Phase 2 plots**; no Google accounts, billing, or ads are created here.

## 1. Container installation

Create a Google Tag Manager **Web** container for `www.faisaltowngroups.com`. Copy its `GTM-XXXXXXX` ID and set `PUBLIC_GTM_ID` in the **production build environment** (GitHub Actions, hosting provider, etc.). Rebuild and redeploy. Astro uses this setting at build time; changing it at runtime won't update already-generated static pages.

The site emits `whatsapp_click`, `call_click`, `site_visit_click` and other data-event values to `window.dataLayer`. Each event includes `page`, `source_section`, and `cta_label`, plus available nonpersonal context and campaign parameters. Attribution persists as one record in sessionStorage for the browser tab. Any nonempty supported attribution parameter starts a replacement record; untagged navigation reuses it. Old per-key records are discarded to prevent mixed click IDs. Storage failures preserve current URL attribution, but cannot guarantee persistence across navigation. A sanitized UTM campaign name may appear in the prefilled WhatsApp message; a click ID is never appended.

## 2. Configure GTM

- Add a **Google tag** using the GA4 measurement ID (`G-XXXXXXXXXX`) from your GA4 Web data stream. Fire on All Pages, subject to applicable consent settings.
- Create a **GA4 Event** tag named `whatsapp_click`; trigger on Custom Event with exact event name `whatsapp_click`. Optional parameters: `page`, `source_section`, `cta_label`, `project_phase` via GTM Data Layer Variables. Do not forward `gclid`, `gbraid`, or `wbraid` as custom event parameters.
- Likewise configure `call_click` if calls matter.
- Add a **Conversion Linker** tag for Google Ads (with appropriate consent settings).
- In Google Ads, create a website conversion action for **WhatsApp button click** and put its supplied Conversion ID and label into a Google Ads Conversion Tracking tag. Trigger it on the `whatsapp_click` custom event. This is a **button-click proxy**, not a verified sent message. Start as a **secondary** conversion to avoid optimizing prematurely for accidental clicks.
- After manually reviewing chat enquiries, measure **qualified WhatsApp conversations** separately; do not tag button clicks as `generate_lead` or `qualify_lead`. A CRM/imported offline conversion flow will be necessary for reliable sales-quality feedback.
- Use **one** WhatsApp click conversion implementation (GTM); do not independently import the same GA4 event as a second primary Google Ads conversion.

## 3. Testing checklist (before spend)

1. Build with a real `PUBLIC_GTM_ID`; inspect site source for GTM head script and noscript iframe. An unset or empty PUBLIC_GTM_ID uses GTM-MRJB3WSF. A nonempty invalid ID disables injection. Set PUBLIC_GTM_ENABLED=false in the production build environment to explicitly disable both snippets; rebuild to apply.
2. GTM Preview / Tag Assistant: visit the homepage using `?utm_source=google&utm_medium=cpc&utm_campaign=phase2_plots`.
3. Click the Phase 2 WhatsApp CTA; confirm exactly one `whatsapp_click` custom event and the correct source section.
4. Confirm prefilled text contains Phase 2 plot request and `Campaign reference: phase2_plots`, never a `gclid`.
5. Confirm correct GA4 real-time event and Google Ads tag firing, with no duplicated GA4 event tag.
6. Check mobile sticky CTA, floating CTA, and normal article/project links; use Tag Assistant on mobile when possible.
7. Follow website privacy disclosure, applicable cookie/consent rules, and configure Google Consent Mode appropriately. Do not use ad personalization/remarketing until privacy setup is reviewed.
8. Verify Google Ads auto-tagging, domain redirects, and conversion status. Test without real ad spend first.

## 4. Campaign starting point

- Search-only, Phase 2 broad project intent; ad groups for `faisal town phase 2 plots`, `faisal town phase 2 prices`, `faisal town phase 2 installments` (not sector-only focus).
- Prefer phrase/exact match initially. Use the homepage or relevant Phase 2 overview URL as final URL.
- Negative keyword starter list: jobs, vacancy, career, pdf download only, logo, wallpaper, map only (review search terms; do not exclude useful buyer research indiscriminately).
- Verify inventory, prices, and independent-agency positioning; avoid “official”/developer claims if unaffiliated.
- Proposed initial 14-day pilot: PKR 1,000/day **only after the advertiser approves**. No payment account/card is configured by code changes.

## Event scope and duplicate prevention

- `project_phase` is explicit CTA/section context: `phase_2`, `phase_1`, or `unspecified`. Hero, homepage sticky, price cards and the Phase 2 floating/mobile CTAs carry Phase 2 context; the Phase 1 section/mobile link carry Phase 1 context. General enquiries remain unspecified; do not infer phase from campaign alone.
- A price/budget/site-visit WhatsApp CTA can intentionally emit both `whatsapp_click` and a descriptive CTA event. Trigger the WhatsApp Ads conversion only on the exact `whatsapp_click` custom event, not on both names or an additional Just Links trigger. For a Phase 2-only conversion, also require `project_phase` equal to `phase_2`.
- Map only approved fields into GA4 tags. Click IDs remain available in the data layer, but must not be copied into custom GA4 parameters. Missing context/attribution fields are explicitly null to clear prior GTM values.
- The handler queues a data-layer event even without the container. Queueing is not delivery. Same-tab WhatsApp handoff must be tested for completed tag requests; no navigation delay is assumed necessary without evidence of loss.
- Campaign references are campaign labels, not unique conversation IDs. Use nonpersonal campaign names. Confirmed/qualified chats need a separate reviewed lead record and a matching/import design before being used as qualified-lead conversions.

## Regression checks

Run `npm ci && npm run test:tracking && npm run check:cms`. Both PR validation and deployment run tracking tests. Tests cover campaign replacement, refresh/navigation, denied storage, legacy records, sanitized/repeated message references, event counts and phase context. They do not verify Google account configuration or real browser/network delivery.

Before spend, test a fresh tagged visit, refresh, internal navigation, a second campaign in the same tab, blocked storage, Android app handoff and desktop WhatsApp. In Tag Assistant require one WhatsApp event and one intended Ads tag per activation; confirm GA4 receipt and correct recipient/message. Synthetic gclid/gbraid/wbraid values test capture only and do not establish actual Ads attribution.
