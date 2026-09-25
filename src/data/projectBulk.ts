// Text fields are authoritative when present, including an intentionally empty field.
export const rowFields = {
  bullets: ['title', 'text'],
  downloads: ['label', 'title', 'text', 'href'],
  highlights: ['label', 'value'],
  priceTableRows: ['size', 'dimensions', 'payment', 'price', 'availability'],
  faqs: ['question', 'answer'],
  links: ['label', 'href'],
} as const;

export function parseProjectBody(body: string) {
  const sections: Array<{ heading: string; paragraphs: string[] }> = [];
  for (const block of body.replace(/\r\n?/g, '\n').trim().split(/\n\s*\n|\n(?=## )/)) {
    if (!block.trim()) continue;
    if (block.startsWith('## ')) {
      const [heading, ...rest] = block.slice(3).split('\n');
      sections.push({ heading: heading.trim(), paragraphs: rest.join('\n').trim() ? [rest.join('\n').trim()] : [] });
    } else {
      if (!sections.length) sections.push({ heading: 'Overview', paragraphs: [] });
      sections.at(-1)!.paragraphs.push(block.trim());
    }
  }
  return sections;
}

export function normalizeProject<T extends { slug: string }>(page: T) {
  const result: Record<string, any> = { ...page };
  if (typeof result.body === 'string') result.sections = parseProjectBody(result.body);
  result.sections ??= [];
  for (const [field, keys] of Object.entries(rowFields)) {
    const text = result[`${field}Text`];
    if (typeof text === 'string') {
      result[field] = text.split(/\r?\n/).flatMap((line: string, index: number) => {
        if (!line.trim()) return [];
        // Accept pasted spreadsheet cells as well as human-readable pipe separators.
        const cells = line.split(line.includes('\t') ? '\t' : '|').map(cell => cell.trim());
        if (cells.length !== keys.length || cells.some(cell => !cell)) {
          throw new Error(`${page.slug}: ${field} line ${index + 1} needs ${keys.length} non-empty values separated by | or tabs.`);
        }
        const row = Object.fromEntries(keys.map((key, i) => [key, cells[i]]));
        if ('href' in row && !/^(\/(?!\/)|https?:\/\/)/i.test(row.href)) {
          throw new Error(`${page.slug}: ${field} line ${index + 1} needs a /path or an http(s) URL.`);
        }
        return [row];
      });
    }
    result[field] ??= [];
  }
  return result;
}
