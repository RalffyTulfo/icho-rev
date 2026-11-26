/**
 * The unit registry: the single source of truth for the roadmap, the unit pages and
 * the unit redirects.
 *
 * `number` is the syllabus section number (owner decision 10.1); "foundations" and
 * "practical" have none and keep their names as slugs. `color` names an existing CSS
 * token only - the site ships six unit colours, so the tokens are reused rather than
 * inventing new ones.
 */

export interface Unit {
  /** Syllabus section number, or null for foundations and practical. */
  number: number | null;
  /** URL slug. Immutable once pushed. */
  slug: string;
  /** Full title shown on the unit page and roadmap card. */
  title: string;
  /** Short label for chips and breadcrumbs. */
  short: string;
  /** CSS colour token, without the --color- prefix. */
  color: string;
  /** Display order on the roadmap. */
  order: number;
}

export const UNITS: Unit[] = [
  { number: null, slug: 'foundations', title: 'Foundations', short: 'Foundations', color: 'physical', order: 0 },
  { number: 1, slug: '1-the-atom', title: 'The Atom', short: 'Atom', color: 'inorganic', order: 1 },
  { number: 2, slug: '2-chemical-bonding', title: 'Chemical Bonding', short: 'Bonding', color: 'inorganic', order: 2 },
  { number: 3, slug: '3-chemical-calculations', title: 'Chemical Calculations', short: 'Calculations', color: 'analytical', order: 3 },
  { number: 4, slug: '4-periodic-trends', title: 'Periodic Trends', short: 'Periodic Trends', color: 'inorganic', order: 4 },
  { number: 5, slug: '5-inorganic-chemistry', title: 'Inorganic Chemistry', short: 'Inorganic', color: 'inorganic', order: 5 },
  { number: 6, slug: '6-physical-chemistry', title: 'Physical Chemistry', short: 'Physical', color: 'physical', order: 6 },
  { number: 7, slug: '7-chemical-kinetics', title: 'Chemical Kinetics', short: 'Kinetics', color: 'organic', order: 7 },
  { number: 8, slug: '8-spectroscopy', title: 'Spectroscopy', short: 'Spectroscopy', color: 'analytical', order: 8 },
  { number: 9, slug: '9-organic-chemistry', title: 'Organic Chemistry', short: 'Organic', color: 'organic', order: 9 },
  { number: 10, slug: '10-polymers', title: 'Polymers', short: 'Polymers', color: 'organic', order: 10 },
  { number: 11, slug: '11-biochemistry', title: 'Biochemistry', short: 'Biochemistry', color: 'biochemistry', order: 11 },
  { number: 12, slug: '12-analytical-chemistry', title: 'Analytical Chemistry', short: 'Analytical', color: 'analytical', order: 12 },
  { number: null, slug: 'practical', title: 'Practical', short: 'Practical', color: 'practical', order: 13 },
];

export function unitBySlug(slug: string): Unit | undefined {
  return UNITS.find((unit) => unit.slug === slug);
}

export function unitByNumber(number: number | null | undefined): Unit | undefined {
  if (number === null || number === undefined) return undefined;
  return UNITS.find((unit) => unit.number === number);
}

/** Unit title for a lesson's front matter, used when unitTitle is missing. */
export function unitForLesson(frontmatter: { unitNumber?: number; unitTitle?: string }): Unit | undefined {
  const byNumber = unitByNumber(frontmatter.unitNumber);
  if (byNumber) return byNumber;
  if (frontmatter.unitTitle) {
    return UNITS.find((unit) => unit.title === frontmatter.unitTitle || unit.short === frontmatter.unitTitle);
  }
  return undefined;
}
