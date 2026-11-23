/**
 * Rehype plugin: drop the first content <h1> when its text matches the
 * lesson's frontmatter title.
 *
 * The lesson layout already renders the frontmatter title in the page header,
 * so the MDX `# Heading` duplicate is removed at build time.
 *
 * For .mdx the integration strips frontmatter before rehype runs, so the title
 * is read from the source file; .md files get it from vfile data.
 */
import fs from 'node:fs';

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

function readFrontmatterTitle(filePath) {
  if (!filePath) return null;
  let source;
  try {
    source = fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
  const match = FRONTMATTER_RE.exec(source.replace(/^\uFEFF/, ''));
  if (!match) return null;
  const line = match[1]
    .split(/\r?\n/)
    .find((entry) => /^title\s*:/.test(entry));
  if (!line) return null;
  let value = line.slice(line.indexOf(':') + 1).trim();
  const quoted = /^(['"])([\s\S]*)\1$/.exec(value);
  if (quoted) value = quoted[2];
  return value.trim() || null;
}

function textOf(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (!node.children) return '';
  return node.children.map(textOf).join('');
}

function normalize(text) {
  return (text || '').replace(/\s+/g, ' ').trim().toLowerCase();
}

export default function rehypeDropFirstH1() {
  return (tree, file) => {
    const filePath = file?.path ? String(file.path).split('?')[0] : null;
    const astroFrontmatter = file?.data?.astro?.frontmatter || {};
    const title =
      (typeof astroFrontmatter.title === 'string' && astroFrontmatter.title) ||
      readFrontmatterTitle(filePath);
    if (!title) return;

    const children = tree?.children;
    if (!Array.isArray(children)) return;

    for (let index = 0; index < children.length; index++) {
      const node = children[index];
      // Stop at the first h1 in document order.
      if (node.type !== 'element' || node.tagName !== 'h1') continue;
      const heading = normalize(textOf(node));
      const fullTitle = normalize(title);
      // Match the title, or the title minus a leading "Unit: " prefix.
      const matches =
        heading !== '' &&
        (heading === fullTitle || fullTitle.endsWith(': ' + heading));
      if (!matches) return;

      children.splice(index, 1);
      const next = children[index];
      if (next && next.type === 'text' && !(next.value || '').trim()) {
        children.splice(index, 1);
      }
      return;
    }
  };
}
