// Decodes base64-encoded binary assets from assets-src/ into public/ before
// build/dev, so images can live in git as text (pushable via the GitHub API).
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'assets-src';
const OUT = 'public';

if (!fs.existsSync(SRC)) process.exit(0);

let decoded = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!entry.name.endsWith('.b64')) continue;
    const rel = path.relative(SRC, full).replace(/\.b64$/, '');
    const target = path.join(OUT, rel);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    const current = fs.existsSync(target) ? fs.readFileSync(target) : null;
    const next = Buffer.from(fs.readFileSync(full, 'utf8').trim(), 'base64');
    if (!current || !current.equals(next)) {
      fs.writeFileSync(target, next);
      decoded++;
    }
  }
}

walk(SRC);
if (decoded) console.log(`decode-assets: wrote ${decoded} asset(s) to ${OUT}/`);
