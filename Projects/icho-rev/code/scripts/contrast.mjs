// Computes WCAG contrast for the text-on-surface token pairs used by the site.
// Usage: node scripts/contrast.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(resolve(here, '../src/styles/global.css'), 'utf8').replace(
  /\/\*[\s\S]*?\*\//g,
  '',
);

const SURFACES = ['background', 'surface', 'surface-2', 'surface-3', 'card'];
const TEXT = ['text', 'muted'];

function parseColor(value) {
  const v = value.trim();
  const hex = v.match(/^#([0-9a-f]{3,8})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: 1,
    };
  }
  const rgba = v.match(/^rgba?\(([^)]+)\)$/i);
  if (rgba) {
    const parts = rgba[1].split(',').map((p) => parseFloat(p));
    return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
  }
  return null;
}

function over(fg, bg) {
  const a = fg.a;
  return {
    r: fg.r * a + bg.r * (1 - a),
    g: fg.g * a + bg.g * (1 - a),
    b: fg.b * a + bg.b * (1 - a),
    a: 1,
  };
}

function luminance(c) {
  const channel = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(c.r) + 0.7152 * channel(c.g) + 0.0722 * channel(c.b);
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

// Collect token blocks in file order; later blocks win.
const themes = { light: {}, dark: {} };
const blockRe = /(:root[^{]*|\[data-theme="[^"]+"\][^{]*)\{([^}]*)\}/g;
let match;
while ((match = blockRe.exec(css))) {
  const selector = match[1];
  const body = match[2];
  if (!/--color-/.test(body)) continue;
  const theme = selector.includes('[data-theme="dark"]') ? 'dark' : 'light';
  const decls = body.matchAll(/(--color-[\w-]+)\s*:\s*([^;]+);/g);
  for (const [, name, value] of decls) themes[theme][name.trim()] = value.trim();
}

let failures = 0;
for (const theme of ['light', 'dark']) {
  const tokens = themes[theme];
  const bg = parseColor(tokens['--color-background'] || '#888');
  const rows = [];
  for (const surface of SURFACES) {
    const raw = parseColor(tokens[`--color-${surface}`] || tokens['--color-background']);
    if (!raw) continue;
    const surfaceColor = over(raw, bg);
    for (const text of TEXT) {
      const fgRaw = parseColor(tokens[`--color-${text}`] || '#000');
      if (!fgRaw) continue;
      const ratio = contrast(over(fgRaw, surfaceColor), surfaceColor);
      const pass = ratio >= 4.5;
      if (!pass) failures++;
      rows.push({ pair: `${text} on ${surface}`, ratio: ratio.toFixed(2), pass });
    }
    // Links use the accent colors; they are body-sized text, so they need 4.5:1.
    for (const accent of ['primary', 'secondary']) {
      const accentRaw = parseColor(tokens[`--color-${accent}`] || '#000');
      if (!accentRaw) continue;
      const ratio = contrast(over(accentRaw, surfaceColor), surfaceColor);
      const pass = ratio >= 4.5;
      if (!pass) failures++;
      rows.push({ pair: `${accent} on ${surface}`, ratio: ratio.toFixed(2), pass });
    }
  }
  console.log(`\n${theme.toUpperCase()} theme`);
  for (const row of rows) {
    console.log(`  ${row.pass ? 'ok  ' : 'FAIL'} ${row.ratio.padStart(5)}:1  ${row.pair}`);
  }
}

console.log(`\n${failures === 0 ? 'All pairs pass.' : failures + ' pair(s) below the target.'}`);
process.exit(failures === 0 ? 0 : 1);
