// Capture attribution on landing and reuse it when visitors browse other pages.
const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"];
const attribution: Record<string, string> = {};
for (const key of attributionKeys) {
  try {
    const value = new URLSearchParams(location.search).get(key);
    if (value) sessionStorage.setItem(`ft:${key}`, value);
    const saved = value || sessionStorage.getItem(`ft:${key}`);
    if (saved) attribution[key] = saved;
  } catch {
    // Storage may be unavailable; enquiries must still work.
  }
}

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

  // Append a human-readable campaign reference to the prefilled WhatsApp message.
  // Do not send unique Google click IDs or personal tracking identifiers to WhatsApp.
  // This runs on the actual anchor before browser navigation, without interrupting it.
  if (isWhatsApp && attribution.utm_campaign) {
    try {
      const url = new URL(link.href);
      const original = url.searchParams.get("text") || "";
      if (!original.includes("Campaign reference:")) {
        const cleanCampaign = attribution.utm_campaign.replace(/[^a-zA-Z0-9 _-]/g, "").slice(0, 60);
        if (cleanCampaign) {
          url.searchParams.set("text", `${original}\nCampaign reference: ${cleanCampaign}`);
          link.href = url.toString();
        }
      }
    } catch {}
  }

  const parameters = {
    ...attribution,
    page: location.pathname,
    source_section: link.dataset.sourceSection || link.dataset.ctaLocation || link.closest("section")?.id || "content",
    cta_label: (link.dataset.ctaLabel || link.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100),
    sector: link.dataset.sector,
    plot_size: link.dataset.plotSize,
    budget_range: link.dataset.budgetRange,
  };
  const analytics = window as typeof window & {
    dataLayer?: { push: (value: unknown) => void };
    gtag?: (...args: unknown[]) => void;
  };
  for (const name of events) {
    try { analytics.dataLayer?.push({ event: name, ...parameters }); } catch {}
    try { if (typeof analytics.gtag === "function") analytics.gtag("event", name, parameters); } catch {}
    window.dispatchEvent(new CustomEvent(`faisaltown:${name}`, { detail: parameters }));
  }
});
