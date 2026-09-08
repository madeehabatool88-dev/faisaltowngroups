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
  faqs?: Array<{ question: string; answer: string }>;
  order?: number;
  status?: "draft" | "published";
};

const articleModules = import.meta.glob<{ default: Article }>("../content/articles/*.json", { eager: true });

export const articles: Article[] = Object.values(articleModules)
  .map((module) => module.default)
  .filter((article) => article.status !== "draft")
  .sort((a, b) => {
    const orderCompare = (a.order ?? 999) - (b.order ?? 999);
    if (orderCompare !== 0) return orderCompare;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
