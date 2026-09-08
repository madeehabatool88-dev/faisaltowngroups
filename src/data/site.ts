import siteSettings from "./site.json";

export const site = siteSettings;

export const whatsappLink = (query: string) =>
  `https://wa.me/${site.phoneWhatsApp}?text=${encodeURIComponent(`Website: ${site.domain}\nQuery: ${query}`)}`;
