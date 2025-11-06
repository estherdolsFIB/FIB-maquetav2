// Quick fixer for mojibake in HTML files (Ã, Â, â€…)
// It rewrites files whose content likely suffered UTF-8 -> Latin1 mis-decoding.
// Usage: node scripts/fix-encoding.js

const fs = require('fs').promises;
const path = require('path');

const root = path.resolve(process.cwd(), 'maquetav2');
const targets = [
  path.join(root, 'index.html'),
  path.join(root, 'pages'),
];

const SUSPECT_RE = /[ÂÃâ€™“”•…]/; // common mojibake glyphs
const LEADING_GARBAGE_RE = /^(?:\uFEFF|\uFFFD|\s)+/; // BOM, replacement char or whitespace before doctype

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...await walk(full));
    } else if (/\.(html?|htm)$/i.test(e.name)) {
      out.push(full);
    }
  }
  return out;
}

async function maybeFix(file) {
  let raw = await fs.readFile(file, 'utf8');
  let changed = false;

  // 1) Drop any garbage before doctype to avoid quirks mode
  if (raw.startsWith('\uFEFF') || raw.startsWith('\uFFFD') || LEADING_GARBAGE_RE.test(raw)) {
    raw = raw.replace(LEADING_GARBAGE_RE, '');
    changed = true;
  }

  // 2) If mojibake markers exist, try Latin1 -> UTF-8 roundtrip
  if (SUSPECT_RE.test(raw)) {
    const converted = Buffer.from(raw, 'latin1').toString('utf8');
    if (converted !== raw) {
      raw = converted;
      changed = true;
    }
  }

  // 3) Strip any ASCII control chars (except TAB/CR/LF) that break HTML parsers
  const withoutCtrl = raw.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
  if (withoutCtrl !== raw) {
    raw = withoutCtrl;
    changed = true;
  }

  // 4) Replace some known stray glyphs seen in mojibake with best-guess Spanish letters
  const charMap = new Map([
    ['\u01ED', 'á'], // ǭ -> á (e.g., mǭs -> más)
    ['\u01F8', 'é'], // Ǹ -> é (e.g., sistǸmica -> sistémica)
    ['\u01E7', 'ú'], // ǧ -> ú (e.g., ǧtiles -> útiles)
  ]);
  let replaced = '';
  for (const ch of raw) {
    replaced += charMap.get(ch) || ch;
  }
  if (replaced !== raw) {
    raw = replaced;
    changed = true;
  }

  // 5) Remove U+FFFD replacement char if any remains
  if (raw.includes('\uFFFD')) {
    raw = raw.replace(/\uFFFD/g, '');
    changed = true;
  }

  // 6) Targeted word/sequence fixes frequently found in pages
  const seqFixes = [
    [/Desempe��o/g, 'Desempeño'],
    [/Acci��n/g, 'Acción'],
    [/Valoraci��n/g, 'Valoración'],
    [/\?MBITOS/g, 'ÁMBITOS'],
    [/ACCIN/g, 'ACCIÓN'],
    [/DIRECCIN/g, 'DIRECCIÓN'],
    [/altima actualizaci��n/gi, 'Última actualización'],
    [/PARTICIPACIN/g, 'PARTICIPACIÓN'],
    [/CAMBRA DE COMER! DE MALLORCA/g, 'CAMBRA DE COMERÇ DE MALLORCA'],
    [/d\"Empreses/g, 'd’Empreses'],
    [/mantra\"/g, 'mantra'],
  ];
  for (const [re, rep] of seqFixes) {
    const next = raw.replace(re, rep);
    if (next !== raw) { raw = next; changed = true; }
  }

  // 7) Generic 'altima/altimas' -> 'última/últimas' with case preservation
  raw = raw.replace(/\b(altimas|altima)\b/gi, (m) => {
    const lower = m.toLowerCase();
    const fixed = lower === 'altimas' ? 'últimas' : 'última';
    return m[0] === 'A' ? fixed[0].toUpperCase() + fixed.slice(1) : fixed;
  });
  changed = true;

  if (!changed) return false;
  await fs.writeFile(file, raw, 'utf8');
  return true;
}

async function main() {
  const files = [];
  for (const t of targets) {
    try {
      const stat = await fs.stat(t);
      if (stat.isDirectory()) files.push(...await walk(t));
      else files.push(t);
    } catch {}
  }
  let changed = 0;
  for (const f of files) {
    const ok = await maybeFix(f).catch(() => false);
    if (ok) changed++;
  }
  console.log(`Checked ${files.length} HTML files. Fixed ${changed}.`);
}

main();
