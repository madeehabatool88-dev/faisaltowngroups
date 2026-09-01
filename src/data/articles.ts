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

import article1 from "./articles/faisal-town-complete-guide";
import article2 from "./articles/faisal-town-living";
import article3 from "./articles/why-choose-faisal-town";
import article4 from "./articles/faisal-town-phase-1-and-faisal-hills";
import article5 from "./articles/faisal-town-ii-sector-p-guide";
import article6 from "./articles/living-near-rawalpindi-ring-road";
import article7 from "./articles/new-islamabad-living-guide";
import article8 from "./articles/faisal-town-ii-master-plan";
import article9 from "./articles/sector-p-prices-explained";
import article10 from "./articles/faisal-jewels-and-faisal-heights";

export const articles: Article[] = [
  article1,
  article2,
  article3,
  article4,
  article5,
  article6,
  article7,
  article8,
  article9,
  article10
];
