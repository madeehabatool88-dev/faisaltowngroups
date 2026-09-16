const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
];
const attribution: Record<string, string> = {};
for (const key of attributionKeys) {
  try {
    const value = new URLSearchParams(location.search).get(key);
    if (value) sessionStorage.setItem(`ft:${key}`, value);
    const saved = value || sessionStorage.getItem(`ft:${key}`);
    if (saved) attribution[key] = saved;
  } catch {
    /* Storage may be unavailable; navigation must continue. */
  }
}
document.addEventListener("click", (event) => {
  const link =
    event.target instanceof Element
      ? event.target.closest<HTMLAnchorElement>("a[href]")
      : null;
  if (!link) return;
  const events = new Set<string>();
  if (link.href.startsWith("https://wa.me/")) events.add("whatsapp_click");
  if (link.href.startsWith("tel:")) events.add("call_click");
  if (link.dataset.event) events.add(link.dataset.event);
  const parameters = {
    ...attribution,
    page: location.pathname,
    source_section:
      link.dataset.sourceSection ||
      link.dataset.ctaLocation ||
      link.closest("section")?.id ||
      "content",
    cta_label: (link.dataset.ctaLabel || link.textContent || "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 100),
    sector: link.dataset.sector,
    plot_size: link.dataset.plotSize,
    budget_range: link.dataset.budgetRange,
  };
  const analytics = window as typeof window & {
    dataLayer?: { push: (value: unknown) => void };
    gtag?: (...args: unknown[]) => void;
  };
  for (const name of events) {
    try {
      analytics.dataLayer?.push({ event: name, ...parameters });
    } catch {}
    try {
      if (typeof analytics.gtag === "function")
        analytics.gtag("event", name, parameters);
    } catch {}
    window.dispatchEvent(
      new CustomEvent(`faisaltown:${name}`, { detail: parameters }),
    );
  }
});
