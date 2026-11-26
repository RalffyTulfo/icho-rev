/**
 * Card ids as they appear at the start of a card heading.
 *
 * Accepted forms (owner decision 10.7 / step 8):
 *   1.2          9.2.5.2.d      7.2.4.4.a      F.chem.2      P.2.1.w1
 * A heading that does not start with an id ("Prerequisites", "End of Lesson") returns null.
 * The id is the progress key, so it must be read from the text, never from the title.
 *
 * Plain ESM with JSDoc types (types in card-id.d.ts) because package.json is commonjs and
 * the Node fixture test loads this file directly.
 */

const CARD_ID = /^((?:[FP]\.)?(?:\d+(?:\.\d+)+(?:\.[A-Za-z][A-Za-z0-9]*)?|[A-Za-z]+\.\d+))\b/;

/** @param {string} text @returns {string | null} */
export function parseCardId(text) {
  const match = (text || '').trim().match(CARD_ID);
  return match ? match[1] : null;
}

/** @param {string} cardId @returns {string} */
export function cardAnchorId(cardId) {
  return 'c-' + cardId.toLowerCase().replace(/\./g, '-');
}
