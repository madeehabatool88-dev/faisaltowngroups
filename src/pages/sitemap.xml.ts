import type { APIRoute } from "astro";
import { landingPages } from "../data/landingPages";
import { articles } from "../data/articles";
import { site } from "../data/site";

const homeContent = Object.values(import.meta.glob("../content/homepage/*.json", { eager: true, import: "default" })) as { updated?: string }[];
const legalContent = import.meta.glob("../content/legal/*.json", { eager: true, import: "default" }) as Record<string, { updated?: string }>;
const latest = (values: (string | undefined)[]) => values.filter((v): v is string => Boolean(v && /^\d{4}-\d{2}-\d{2}$/.test(v))).sort().at(-1);
const homeUpdated = latest(homeContent.map(p => p.updated));
const articleUpdated = latest(articles.map(p => p.updated || p.date));
const staticPages = [
  { path: "/", updated: homeUpdated },
  { path: "/articles/", updated: latest([articleUpdated, "2026-10-28"]) },
  { path: "/all-pages/", updated: latest([homeUpdated, articleUpdated, ...landingPages.map(p => p.updated)]) },
  ...Object.entries(legalContent).map(([file, data]) => ({path: `/${file.split("/").at(-1)!.replace(".json", "")}/`, updated: data.updated}))
];

const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export const GET: APIRoute = () => {
  const urls = [
    ...staticPages,
    ...landingPages.map((page) => ({ path: `/${page.slug}/`, updated: page.updated })),
    ...articles.map((article) => ({ path: `/articles/${article.slug}/`, updated: article.updated || article.date }))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(({ path, updated }) => `  <url>\n    <loc>${escapeXml(new URL(path, site.domain).toString())}</loc>\n    ${updated ? `<lastmod>${escapeXml(updated)}</lastmod>` : ""}\n  </url>`)
    .join("\n")}\n</urlset>\n`;

  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
