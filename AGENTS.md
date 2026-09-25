# Project Design & Engineering Instructions

## Role

Act as a senior product designer, conversion-focused real-estate UX designer, technical SEO engineer, and senior Astro frontend engineer.

This is a production property-selling website. The website exists to generate qualified WhatsApp inquiries for Faisal Town property buyers.

## Primary Business Goal

Every important page should help a visitor:

1. Understand the project or property being offered.
2. Establish trust.
3. Evaluate location, pricing, availability, map, and development information.
4. Take a clear next action through WhatsApp.

Optimize for clarity, trust, property discovery, and WhatsApp conversion.

## Design Reset Authorization

The existing UI is not a design constraint. Preserve only functionality, SEO value, useful content, assets, data, routing, and business logic.

You may replace weak section layouts, CSS, typography, card patterns, visual hierarchy, and component structure when a cleaner end state is possible.

Do not optimize for minimum diff size. Optimize for the best maintainable end state.

## Visual Direction

The website should feel premium, restrained, architectural, property-focused, credible, spacious, modern, and professional.

Avoid random gradients, decorative blobs, glassmorphism, generic SaaS styling, oversized rounded cards, fake testimonials, invented awards, and filler copy.

Use real project imagery and maps where they help a buyer make a decision.

## Homepage Purpose

The homepage is a conversion landing page, not a directory of every page.

Within the first screen a buyer should understand:

- what Faisal Town project/property information is offered
- where the opportunity sits
- why it is worth reviewing
- what action to take next

Primary CTA: WhatsApp inquiry.

Secondary CTAs may include prices, available plots, location, master plan, project pages, and buyer guides.

## WhatsApp Rules

WhatsApp is the primary lead channel. Use contextual prefilled messages whenever practical.

Each WhatsApp message should include the website address and the visitor's query.

Do not make every CTA say "Contact Us." Prefer specific labels such as:

- Check Current Availability
- Get Today's Price
- Request Payment Plan
- Arrange a Site Visit
- Ask About This Plot
- Talk on WhatsApp

## Responsive Design

Design mobile-first. Do not merely shrink desktop components.

For mobile:

- simplify navigation
- use readable heading sizes
- maintain comfortable tap targets
- prevent horizontal overflow
- keep CTAs visible
- make tables and wide visuals scroll horizontally when needed
- keep spacing coherent

Check important widths around 375px, 430px, 768px, 1024px, and 1440px for substantial UI work.

## SEO And Content

Do not damage existing SEO fundamentals:

- preserve useful URLs
- preserve canonical tags
- maintain clear title/meta descriptions
- use meaningful H1/H2 hierarchy
- keep crawlable text
- use internal links intentionally
- avoid hidden SEO content

Do not invent property facts, prices, approvals, distances, development percentages, ratings, reviews, ROI, or possession dates.

If a fact is unavailable, use existing data or phrase it as something the buyer should verify.

## Definition Of Done

Before declaring substantial frontend work complete:

- the page feels like one coherent design
- mobile layout is intentional
- WhatsApp path is obvious
- hero communicates the offer immediately
- important property information appears early
- typography and spacing are consistent
- no previous-design fragments remain accidentally
- no horizontal overflow
- no obvious placeholder content
- CTAs have contextual WhatsApp messages
- SEO fundamentals remain intact
- Astro production build succeeds

## Current source of truth — 24 September 2026

The user's current `G:\Groupsfaisaltown` folder is authoritative. Preserve its homepage, nine project pages (including Sector Q), single master-plan article and legal pages. Do not restore the earlier 31-page site from remote history without explicit instruction. The cleanup is documented in SITE-CLEANUP-2026-09-24.md.

Keep Pages CMS aligned with the actual local content model. Prefer full-body text fields and bulk text fields for FAQs, related links, highlights, downloads, price rows and repeated homepage content. Bulk text is authoritative, including an intentionally empty field. Do not reintroduce row-by-row-only editors or stale duplicate arrays.

Featured-offer facts supply the current homepage starting price; the Sector P cash-price table is separate. Keep the local data and existing price logic intact when working on the CMS.
