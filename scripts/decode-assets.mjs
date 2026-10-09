// Decodes base64-encoded binary assets from assets-src/ into public/ before
// build/dev, so images can live in git as text (pushable via the GitHub API).
// Supports two layouts:
//   name.ext.b64            -> public/name.ext
//   name.ext.b64.part-01..  -> concatenated, then decoded to public/name.ext
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'assets-src';
const OUT = 'public';

if (!fs.existsSync(SRC)) process.exit(0);

let decoded = 0;
function writeDecoded(rel, b64) {
  const target = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const next = Buffer.from(b64.trim(), 'base64');
  const current = fs.existsSync(target) ? fs.readFileSync(target) : null;
  if (!current || !current.equals(next)) {
    fs.writeFileSync(target, next);
    decoded++;
  }
}

function walk(dir) {
  const groups = new Map(); // rel -> [partFile...]
  const singles = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    const partMatch = entry.name.match(/^(.*\.b64)\.part-(\d+)$/);
    if (partMatch) {
      const rel = path.join(path.relative(SRC, dir), partMatch[1]).replace(/\.b64$/, '');
      if (!groups.has(rel)) groups.set(rel, []);
      groups.get(rel).push({ full, index: Number(partMatch[2]) });
      continue;
    }
    if (entry.name.endsWith('.b64')) {
      singles.push(full);
    }
  }
  for (const full of singles) {
    const rel = path.relative(SRC, full).replace(/\.b64$/, '');
    writeDecoded(rel, fs.readFileSync(full, 'utf8'));
  }
  for (const [rel, parts] of groups) {
    parts.sort((a, b) => a.index - b.index);
    const joined = parts.map((p) => fs.readFileSync(p.full, 'utf8').trim()).join('');
    writeDecoded(rel, joined);
  }
}

walk(SRC);
if (decoded) console.log(`decode-assets: wrote ${decoded} asset(s) to ${OUT}/`);
