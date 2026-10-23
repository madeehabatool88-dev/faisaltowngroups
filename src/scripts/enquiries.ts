import { attributionKeys, captureAttribution, campaignWhatsAppUrl } from "./attribution";

const attribution = captureAttribution(location.search, () => sessionStorage);

document.addEventListener("click", (event) => {
  const link = event.target instanceof Element
    ? event.target.closest<HTMLAnchorElement>("a[href]")
    : null;
  if (!link) return;
  const isWhatsApp = /^https:\/\/(?:wa\.me|api\.whatsapp\.com)\//i.test(link.href);
  const isCall = link.href.startsWith("tel:");
  const events = new Set<string>();
  if (isWhatsApp) events.add("whatsapp_click");
  if (isCall) events.add("call_click");
  if (link.dataset.event) events.add(link.dataset.event);

  if (isWhatsApp) {
    try { link.href = campaignWhatsAppUrl(link.href, attribution.utm_campaign); } catch {}
  }

  const parameters = {
    ...Object.fromEntries(attributionKeys.map((key) => [key, attribution[key] || null])),
    page: location.pathname,
    source_section: link.dataset.sourceSection || link.dataset.ctaLocation || link.closest("section")?.id || "content",
    cta_label: (link.dataset.ctaLabel || link.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100),
    project_phase: link.closest<HTMLElement>("[data-project-phase]")?.dataset.projectPhase || "unspecified",
    sector: link.dataset.sector || null,
    plot_size: link.dataset.plotSize || null,
    budget_range: link.dataset.budgetRange || null,
  };
  const analytics = window as typeof window & {
    dataLayer?: { push: (value: unknown) => void };
  };
  for (const name of events) {
    try { (analytics.dataLayer ||= []).push({ event: name, ...parameters }); } catch {}
    window.dispatchEvent(new CustomEvent(`faisaltown:${name}`, { detail: parameters }));
  }
});
