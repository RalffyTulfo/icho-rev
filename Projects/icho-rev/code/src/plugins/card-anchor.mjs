/**
 * Card anchors: give every H3 that starts with a card id a stable id of the form
 * c-<card id with dots as hyphens> (owner decision 10.7).
 *
 *   1.2.3        -> c-1-2-3
 *   1.2          -> c-1-2
 *   9.2.5.2.d    -> c-9-2-5-2-d
 *   F.chem.2     -> c-f-chem-2
 *   P.2.1.w1     -> c-p-2-1-w1
 *
 * The id depends only on the card id, never on the title, so renaming a card heading
 * cannot break a link or a stored progress key. Headings that do not start with a card
 * id are left exactly as the markdown pipeline made them.
 */

const CARD_ID = /^\s*((?:[FP]\.)?(?:\d+(?:\.\d+)+(?:\.[A-Za-z][A-Za-z0-9]*)?|[A-Za-z]+\.\d+))\s+/;

export function textOf(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (!node.children) return '';
  return node.children.map(textOf).join('');
}

function anchorFor(cardId) {
  return 'c-' + cardId.toLowerCase().replace(/\./g, '-');
}

export default function cardAnchor() {
  return (tree) => {
    const walk = (node) => {
      if (!node || !node.children) return;
      if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
        const match = textOf(node).match(CARD_ID);
        if (match) {
          node.properties = node.properties || {};
          node.properties.id = anchorFor(match[1]);
        }
      }
      node.children.forEach(walk);
    };
    walk(tree);
  };
}
