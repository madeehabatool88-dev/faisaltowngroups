import heroData from '../content/homepage/hero.json';
import projectChoiceData from '../content/homepage/project-choice.json';
import phase2Data from '../content/homepage/phase-2.json';
import phase1Data from '../content/homepage/phase-1.json';
import contactData from '../content/homepage/contact.json';
import offerData from '../content/homepage/featured-offer.json';
import priceData from '../content/homepage/prices.json';
import sectorData from '../content/homepage/sectors.json';
import developmentData from '../content/homepage/development.json';
import masterPlanData from '../content/homepage/master-plan.json';
import guideData from '../content/homepage/buyer-guides.json';
import { bulkRows, bulkSlugs } from './homepageBulk';

// Compatibility view: CMS content is reorganized, while the current layout stays intact.
export const hero = {
  ...heroData,
  whatsappCard: {
    ...heroData.whatsappCard,
    actions: bulkRows(heroData.whatsappCard.actionsText, ['label', 'query'], '01 Hero WhatsApp actions'),
  },
};
export const projectChoice = {
  ...projectChoiceData,
  cards: bulkRows(projectChoiceData.cardsText, ['label', 'heading', 'text', 'primaryLabel', 'primaryHref', 'secondaryLabel', 'secondaryQuery'], 'Current project choice'),
};
export const phase2 = {
  ...phase2Data,
  masterPlan: masterPlanData,
  sectorsHeading: sectorData.heading,
  sectors: bulkRows(sectorData.sectorsText, ['title', 'href', 'text', 'image', 'alt', 'status', 'query', 'enabled'], '06 Sector cards'),
  sectorP: {
    ...offerData,
    facts: bulkRows(offerData.factsText, ['value', 'label'], '03 Feature facts'),
  },
  priceTable: {
    ...priceData,
    rows: bulkRows(priceData.rowsText, ['size', 'marla', 'actual', 'discount', 'availability', 'enabled', 'query'], '04 Plot offers'),
  },
  sectorPlan: offerData.sectorPlan,
  development: developmentData,
  articleSlugs: bulkSlugs(guideData.phase2SlugsText),
};
export const phase1 = {
  ...phase1Data,
  blocks: bulkRows(phase1Data.blocksText, ['title', 'href', 'text'], 'Phase 1 blocks'),
  articleSlugs: bulkSlugs(guideData.phase1SlugsText),
};
export const contact = {
  ...contactData,
  options: bulkRows(contactData.optionsText, ['label', 'query'], '14 Contact options'),
};
