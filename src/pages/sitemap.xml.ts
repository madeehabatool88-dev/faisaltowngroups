import type { APIRoute } from "astro";
import { landingPages } from "../data/landingPages";
import { articles } from "../data/articles";
import { site } from "../data/site";

const staticPages = [
  { path: "/", updated: "2026-08-31" },
  { path: "/articles/", updated: "2026-08-31" },
  { path: "/all-pages/", updated: "2026-08-31" },
  { path: "/privacy-policy/", updated: "2026-08-31" },
  { path: "/disclaimer/", updated: "2026-08-31" },
  { path: "/terms-and-conditions/", updated: "2026-08-31" }
];

const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export const GET: APIRoute = () => {
  const urls = [
    ...staticPages,
    ...landingPages.map((page) => ({ path: `/${page.slug}/`, updated: page.updated })),
    ...articles.map((article) => ({ path: `/articles/${article.slug}/`, updated: article.updated || article.date }))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(({ path, updated }) => `  <url>\n    <loc>${escapeXml(new URL(path, site.domain).toString())}</loc>\n    <lastmod>${escapeXml(updated)}</lastmod>\n  </url>`)
    .join("\n")}\n</urlset>\n`;

  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
