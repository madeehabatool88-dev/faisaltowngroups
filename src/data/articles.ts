export type Article = {
  slug: string;
  title: string;
  seoTitle?: string;
  metaDescription?: string;
  description: string;
  intro?: string;
  category: string;
  cluster?: string;
  date: string;
  updated?: string;
  reviewed?: string;
  image: string;
  readTime: string;
  relatedSlugs?: string[];
  cta?: {
    label: string;
    heading: string;
    message: string;
    button: string;
  };
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    callout?: string;
    links?: Array<{ label: string; href: string }>;
  }>;
  faqs?: Array<[string, string]>;
};

const articleOrder = [
  "faisal-town-complete-guide",
  "faisal-town-living",
  "why-choose-faisal-town",
  "faisal-town-phase-1-and-faisal-hills",
  "faisal-town-ii-sector-p-guide",
  "living-near-rawalpindi-ring-road",
  "new-islamabad-living-guide",
  "faisal-town-ii-master-plan",
  "sector-p-prices-explained",
  "faisal-jewels-and-faisal-heights"
];

const articleModules = import.meta.glob<{ default: Article }>("./articles/*.ts", { eager: true });

export const articles: Article[] = Object.values(articleModules)
  .map((module) => module.default)
  .sort((a, b) => {
    const aIndex = articleOrder.indexOf(a.slug);
    const bIndex = articleOrder.indexOf(b.slug);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
