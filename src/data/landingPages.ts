import { normalizeProject } from './projectBulk';

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
  imageAlt?: string;
  heroBackgroundImage?: string;
  showMainImage?: boolean;
  imageCaption?: string;
  quickAnswerLabel?: string;
  quickAnswerHeading?: string;
  verificationLabel?: string;
  verificationText?: string;
  checklistLabel?: string;
  checklistHeading?: string;
  downloadsLabel?: string;
  downloadsHeading?: string;
  downloadButtonLabel?: string;
  faqLabel?: string;
  faqHeading?: string;
  relatedLabel?: string;
  relatedHeading?: string;
  sectionLinksText?: string;
  planCalloutLabel?: string;
  planCalloutHeading?: string;
  planCalloutButton?: string;
  planCalloutHref?: string;
  sectionLinks?: Array<{ heading: string; label: string; href: string }>;
  quickAnswer?: string;
  ctaEyebrow?: string;
  ctaHeading?: string;
  ctaText?: string;
  primaryCta: string;
  secondaryCta: string;
  updated: string;
  reviewed: string;
  highlights: Array<{ label: string; value: string }>;
  priceTableHeading?: string;
  priceTableNote?: string;
  priceTableRows?: Array<{
    size: string;
    dimensions: string;
    payment: string;
    price: string;
    availability: string;
  }>;
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
  .map((module) => normalizeProject(module.default) as LandingPage)
  .filter((page) => page.status !== "draft")
  .sort((a, b) => {
    const orderCompare = (a.order ?? 999) - (b.order ?? 999);
    if (orderCompare !== 0) return orderCompare;
    return a.slug.localeCompare(b.slug);
  });
