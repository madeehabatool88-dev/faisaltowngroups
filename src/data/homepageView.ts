import controls from "../content/homepage/controls.json";
import trust from "../content/homepage/trust.json";
import budgets from "../content/homepage/budgets.json";
import support from "../content/homepage/buyer-support.json";
import process from "../content/homepage/buying-process.json";
import assistance from "../content/homepage/visit-overseas.json";
import faqs from "../content/homepage/faqs.json";
import guides from "../content/homepage/buyer-guides.json";
import { bulkRows } from "./homepageBulk";
export { controls, trust, budgets, support, process, assistance, faqs, guides };
export const enabled = (row: Record<string, string>) =>
  /^(yes|true)$/i.test(row.enabled);
export const budgetRows = bulkRows(
  budgets.itemsText,
  ["label", "text", "query", "enabled"],
  "Budgets",
).filter(enabled);
export const supportRows = bulkRows(
  support.itemsText,
  ["title", "text", "icon", "enabled"],
  "Buyer support",
).filter(enabled);
export const processRows = bulkRows(
  process.stepsText,
  ["title", "text", "enabled"],
  "Buying process",
).filter(enabled);
export const faqRows = bulkRows(
  faqs.faqsText,
  ["question", "answer", "enabled"],
  "FAQs",
).filter(enabled);
export const amount = (value: string) => Number(value.replace(/[^0-9.]/g, ""));
export const price = (value: string | number) => {
  const number = typeof value === "number" ? value : amount(value);
  return Number.isFinite(number) && number > 0
    ? `PKR ${(number / (number >= 10000000 ? 10000000 : 100000)).toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: number >= 10000000 ? 3 : 2 })} ${number >= 10000000 ? "Crore" : "Lac"}`
    : "Ask for current price";
};
