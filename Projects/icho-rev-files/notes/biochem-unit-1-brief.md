# Biochemistry Unit 1: Amino Acids, Proteins, and Enzyme Kinetics — Lesson Brief

## Goal
Produce a complete, QA-passed lesson on amino acids, protein structure, and enzyme kinetics for IChO-level biochemistry revision. The lesson must teach the core concepts with Taglish voice, worked examples, three-tier problem sets, and Python-verified calculations.

## Syllabus Coverage
- Amino acid structure, classification, and properties (pKa, isoelectric point).
- Protein structure: primary, secondary, tertiary, quaternary.
- Enzyme kinetics: Michaelis-Menten, Lineweaver-Burk, inhibition types.
- Enzyme regulation and allosteric control.

## Difficulty
- Warm-up: school-level recall and basic calculations.
- Level-up: national olympiad-style problems.
- Boss Fight: IChO-style, multi-part, unfamiliar context.

## Required Problems
1. Calculate pI of a given amino acid from pKa values.
2. Determine Km and Vmax from Lineweaver-Burk plot data.
3. Classify inhibition type from kinetic data.
4. Explain protein folding and denaturation.

## Notation
- LaTeX for all math: $pH = pKa + \log\frac{[A^-]}{[HA]}$, $V = \frac{V_{max}[S]}{K_m + [S]}$.
- Standard IUPAC nomenclature, SI units, clear significant figures.

## Constraints
- Follow STYLE_GUIDE.md exactly: Taglish voice, three-tier problem sets, click-to-reveal solutions.
- Every numerical answer must be recomputed with Python code.
- No guessed or hallucinated data; mark ambiguous claims as "UNVERIFIED".

## Format
- Markdown with frontmatter: `title`, `author`, `proofreader`, `readingTime`, `unit`, `color`, `cleanModeMapping`.
- Terms and Definitions box, "Why does this exist?" motivation, derivations from first principles.
- Worked examples with "Step 0: figure out the path before you compute".
- "Common IChO traps" and "What graders want to see" callouts.
- 2+ real interactives that teach.

## Example from Completed Unit
See `notes/ thermo-unit-1-brief.md` for reference.