export type LandingPage = {
  slug: string;
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
  highlights: Array<[string, string]>;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  bullets: Array<{ title: string; text: string }>;
  downloads?: Array<{ label: string; title: string; text: string; href: string }>;
  faqs: Array<[string, string]>;
  links: Array<[string, string]>;
};

const pageOrder = [
  "faisal-town-phase-2",
  "faisal-town-phase-1",
  "plots-for-sale-faisal-town-islamabad",
  "faisal-town-block-a",
  "faisal-town-block-b",
  "faisal-town-block-c",
  "faisal-town-islamabad-map-location",
  "faisal-town-overseas-block",
  "faisal-town-p-block",
  "faisal-town-r-block",
  "faisal-town-o-block",
  "faisal-town-sector-s",
  "faisal-town-sector-t",
  "house-for-sale-faisal-town-islamabad",
  "house-for-rent-faisal-town-islamabad"
];

const pageModules = import.meta.glob<{ default: LandingPage }>("./pages/*.ts", { eager: true });

export const landingPages: LandingPage[] = Object.values(pageModules)
  .map((module) => module.default)
  .sort((a, b) => {
    const aIndex = pageOrder.indexOf(a.slug);
    const bIndex = pageOrder.indexOf(b.slug);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.slug.localeCompare(b.slug);
  });
