type BulkArticle = {
  slug: string;
  relatedSlugs?: string[];
  relatedSlugsText?: string;
  faqs?: Array<{ question: string; answer: string }>;
  faqsText?: string;
};

export function normalizeArticle<T extends BulkArticle>(article: T) {
  const relatedSlugs = typeof article.relatedSlugsText === 'string'
    ? article.relatedSlugsText.split(/\r?\n/).map(line => line.trim()).filter(Boolean)
    : article.relatedSlugs;
  const faqs = typeof article.faqsText === 'string'
    ? article.faqsText.split(/\r?\n/).flatMap((line, index) => {
        if (!line.trim()) return [];
        const cells = line.split(line.includes('\t') ? '\t' : '|').map(cell => cell.trim());
        if (cells.length !== 2 || cells.some(cell => !cell)) {
          throw new Error(`${article.slug}: FAQs line ${index + 1} needs Question | Answer (or two spreadsheet columns).`);
        }
        return [{ question: cells[0], answer: cells[1] }];
      })
    : article.faqs;
  return { ...article, relatedSlugs, faqs };
}
