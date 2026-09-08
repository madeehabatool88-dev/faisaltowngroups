export type LandingPage = {
  slug: string;
  pageType?: string;
  phase?: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  image: string;
  primaryCta: string;
  secondaryCta: string;
  updated: string;
  reviewed: string;
  highlights: Array<{ label: string; value: string }>;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  bullets: Array<{ title: string; text: string }>;
  downloads?: Array<{ label: string; title: string; text: string; href: string }>;
  faqs: Array<{ question: string; answer: string }>;
  links: Array<{ label: string; href: string }>;
  order?: number;
  status?: "draft" | "published";
};

const pageModules = import.meta.glob<{ default: LandingPage }>("../content/projects/*.json", { eager: true });

export const landingPages: LandingPage[] = Object.values(pageModules)
  .map((module) => module.default)
  .filter((page) => page.status !== "draft")
  .sort((a, b) => {
    const orderCompare = (a.order ?? 999) - (b.order ?? 999);
    if (orderCompare !== 0) return orderCompare;
    return a.slug.localeCompare(b.slug);
  });
