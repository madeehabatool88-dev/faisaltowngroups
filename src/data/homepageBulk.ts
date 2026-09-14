// A single bulk editor owns each list. Optional cells can be left blank.
export function bulkRows(text: string, keys: readonly string[], context: string): Record<string, string>[] {
  return text.split(/\r?\n/).flatMap((line, index) => {
    if (!line.trim()) return [];
    const cells = line.split(line.includes('\t') ? '\t' : '|').map(cell => cell.trim());
    if (cells.length !== keys.length) {
      throw new Error(`${context}: line ${index + 1} needs ${keys.length} columns: ${keys.join(' | ')}.`);
    }
    return [Object.fromEntries(keys.map((key, i) => [key, cells[i]]))];
  });
}

export const bulkSlugs = (text: string) => text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
