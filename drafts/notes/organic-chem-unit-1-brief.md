# Organic Chemistry Unit 1: Nomenclature and Isomerism — Lesson Brief

## Title
Organic Chemistry Unit 1: Nomenclature and Isomerism

## Goal
Produce a complete, QA-passed lesson on organic chemistry nomenclature and isomerism for IChO-level revision. The lesson must teach:
- IUPAC nomenclature for all major functional groups (alkanes, alkenes, alkynes, aromatic compounds, alcohols, aldehydes, ketones, carboxylic acids, esters, amines, amides)
- Stereoisomerism: E/Z, R/S, optical activity, meso compounds
- Conformational isomerism: chair cyclohexane, Newman projections, ring flips
- Spectroscopic clues (IR, NMR) for isomer identification

The lesson must follow Taglish voice, include worked examples, three-tier problem sets, and Python-verified calculations.

## Syllabus Coverage
- IUPAC nomenclature rules for all major functional groups
- Stereoisomerism: E/Z, R/S, optical activity, meso compounds
- Conformational isomerism: chair cyclohexane, Newman projections, ring flips
- Spectroscopic clues (IR, NMR) for isomer identification

## Difficulty
- Warm-up: school-level recall and basic calculations
- Level-up: national olympiad-style problems
- Boss Fight: IChO-style, multi-part, unfamiliar context

## Required Problems
1. Name compounds from structures and draw structures from names
2. Identify all stereoisomers for a given compound
3. Determine R/S configuration and predict optical activity
4. Analyze chair conformations and predict most stable form
5. Use spectroscopic data to distinguish isomers

## Notation
- LaTeX for all math: $pH = pKa + \log\frac{[A^-]}{[HA]}$, $V = \frac{V_{max}[S]}{K_m + [S]}$
- Standard IUPAC nomenclature, SI units, clear significant figures

## Constraints
- Follow STYLE_GUIDE.md exactly: Taglish voice, three-tier problem sets, click-to-reveal solutions
- Every numerical answer must be recomputed with Python code
- No guessed or hallucinated data; mark ambiguous claims as "UNVERIFIED"
- Include 2+ real interactives that teach

## Format
- Markdown with frontmatter: `title`, `author`, `proofreader`, `readingTime`, `unit`, `color`, `cleanModeMapping`
- Terms and Definitions box
- "Why does this exist?" motivation
- Derivations from first principles
- Worked examples with "Step 0: figure out the path before you compute"
- "Common IChO traps" and "What graders want to see" callouts
- Three-tier problem set (Warm-up, Level-up, Boss Fight) with click-to-reveal solutions and mark schemes

## Failure Modes
- Incorrect IUPAC nomenclature (wrong parent chain, wrong numbering, wrong functional group priority)
- Missing stereoisomers (especially meso compounds)
- Incorrect R/S assignment or optical activity prediction
- Incorrect conformational analysis (ignoring steric effects, axial/equatorial preferences)

## Example from Completed Unit
See `notes/briefer-inorganic-2.md` for reference.