import media from './generated/media.json';
const plans = media.pdfs as Record<string,{href:string;bytes:number;title:string}>;
export const pdfHref = (href:string) => plans[href]?.href || href;
export const pdfSize = (href:string) => plans[href] ? `${(plans[href].bytes / 1_000_000).toFixed(2)} MB` : '';
export const overviewHref = '/assets/generated/phase-2-overview.pdf';
export const overviewSize = `${(media.overviewBytes / 1_000_000).toFixed(2)} MB`;
