# Performance and accessibility follow-up — 28 October 2026

## Changes

- Darker gold text on light backgrounds; corrected homepage footer heading colors and mobile enquiry-button text contrast.
- Additional 240/720-pixel image variants, compact logo/icon derivatives, and accurate hero/poster image sizing hints.
- Preload the lighter 960-pixel decorative inner-page hero preview. Preserve the original images and detailed map PDFs.
- Added a practical fresh-photo and business-information checklist in `docs/guides/FRESH-PHOTO-CHECKLIST.md`.

## Validation

Clean production build and CMS validation passed; five tracking tests passed. Chromium checks covered homepage and Phase 1 at 375, 430, 768, 1024 and 1440 pixels with no horizontal overflow or broken loaded images. Mobile homepage screenshot reviewed.

Local Lighthouse mobile simulation:

| Page / run | Performance | Accessibility | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Homepage before follow-up | 100 | 96 | 100 | 1.5 s | 0 |
| Homepage after contrast/image fixes | 100 | 100 | 100 | 1.5 s | 0 |
| Phase 1 before hero optimization | 90 | 100 | 100 | 3.6 s | 0 |
| Phase 1 after hero optimization | 96 | 100 | 100 | 2.7 s | 0 |

These are single-run local production-build measurements, not live-hosting or real-user scores. Direct live Lighthouse navigation failed in this environment (direct connection failure; certificate trust failure through the environment proxy). The local best-practices score was 96 because the same certificate limitation blocked the external Google Tag Manager request. This does not establish an actual visitor-side tracking failure. No tracking configuration was disabled to improve a score.

An automated accessibility score of 100 is not a complete WCAG certification. Residual image/compression and CSS opportunities are estimates; detailed maps retain their original quality. No field Core Web Vitals are claimed: the connected GSC Wizard account refused access because its subscription/trial is inactive.

## Still dependent on business/source material

Fresh dated site photography, genuine business/representative details, confirmed plot examples and terms, and verified plan versions. Dense CAD-map PDF tagging requires a separate specialist accessibility workflow; metadata and HTML descriptions do not replace it.
