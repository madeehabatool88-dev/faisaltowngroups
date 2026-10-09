// Decodes base64-encoded binary assets from assets-src/ into public/ before
// build/dev, so images can live in git as text (pushable via the GitHub API).
// Supports two layouts:
//   name.ext.b64            -> public/name.ext
//   name.ext.b64.part-01..  -> concatenated, then decoded to public/name.ext
//
// Optional repair layer: for any file F inside assets-src/ or scripts/, a
// sibling file named F.fix is applied to F before use, then deleted. Chains
// are supported (F.fix.fix repairs F.fix) and applied deepest-first, so large
// text assets can be repaired incrementally with tiny fix files.
//
// Fix line format (one op per line; unknown lines are ignored):
//   L<line>|R<col>:<char>   replace char at 0-based col of 1-based line
//   L<line>|I<col>:<char>   insert char before 0-based col
//   L<line>|D<col>          delete char at 0-based col
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'assets-src';
const OUT = 'public';
const FIX_DIRS = [SRC, 'scripts'];

export function applyFix(text, fixText) {
  const opsByLine = new Map();
  for (const raw of fixText.split('\n')) {
    const m = raw.match(/^L(\d{1,6})\|(R|I|D)(\d{1,6})(?::([A-Za-z0-9+/=]))?$/);
    if (!m) continue;
    const [, ls, type, cs, ch] = m;
    if (type !== 'D' && ch == null) continue;
    const line = Number(ls);
    const col = Number(cs);
    if (!opsByLine.has(line)) opsByLine.set(line, []);
    opsByLine.get(line).push({ type, col, ch });
  }
  if (!opsByLine.size) return text;
  const lines = text.split('\n');
  for (const [ln, ops] of opsByLine) {
    if (ln < 1 || ln > lines.length) continue;
    let out = lines[ln - 1];
    let ok = true;
    ops.sort((a, b) => b.col - a.col);
    for (const { type, col, ch } of ops) {
      if (type === 'I') {
        if (col < 0 || col > out.length) { ok = false; break; }
        out = out.slice(0, col) + ch + out.slice(col);
      } else {
        if (col < 0 || col >= out.length) { ok = false; break; }
        out = type === 'R'
          ? out.slice(0, col) + ch + out.slice(col + 1)
          : out.slice(0, col) + out.slice(col + 1);
      }
    }
    if (ok) lines[ln - 1] = out;
  }
  return lines.join('\n');
}

function fixDepth(name) {
  const m = name.match(/(?:\.fix)+$/);
  return m ? m[0].length / 4 : 0;
}

function applyFixFiles() {
  const fixes = [];
  for (const dir of FIX_DIRS) {
    if (!fs.existsSync(dir)) continue;
    (function walk(d) {
      for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (fixDepth(entry.name) > 0) fixes.push(full);
      }
    })(dir);
  }
  fixes.sort((a, b) => fixDepth(path.basename(b)) - fixDepth(path.basename(a)));
  for (const full of fixes) {
    const target = full.replace(/\.fix$/, '');
    if (fs.existsSync(target)) {
      const fixed = applyFix(fs.readFileSync(target, 'utf8'), fs.readFileSync(full, 'utf8'));
      fs.writeFileSync(target, fixed);
    }
    fs.unlinkSync(full);
  }
}

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

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  applyFixFiles();
  if (fs.existsSync(SRC)) walk(SRC);
  if (decoded) console.log(`decode-assets: wrote ${decoded} asset(s) to ${OUT}/`);
}
