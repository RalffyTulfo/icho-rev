# IChO Revision Content Style Guide

## Lesson Structure & Anatomy
1. **Header**: Frontmatter with `title`, `author`, `proofreader`, `readingTime`, `unit`, `color`, and `cleanModeMapping`.
2. **Content Sections**:
   - Terms and Definitions box.
   - "Why does this exist?" motivation.
   - Derivations from first principles.
   - Worked examples with sanity checks ("Step 0: figure out the path before you compute").
   - "Common IChO traps" and "What graders want to see" callouts.
   - 2+ real interactives that teach.
3. **Problem Sets**:
   - Three-tier problem set: Warm-up (school), Level-up (national olympiad), Boss Fight (IChO-style, multi-part, unfamiliar context).
   - Click-to-reveal worked solutions with mark schemes.

## Voice & Tone
- Taglish: English for technical terms, Tagalog for explanations and banter ("para mas madali na buhay natin", "assume muna na...", "oo nga noh").
- Casual, funny, honest, deflating openers, rhetorical questions answered plainly.
- Absurd, memorable problem scenarios hiding real chemistry.
- Slang and mild cursing in moderation (lowkey, icl, idfk, yk, ts, gng, damn, hell, basic ass), with a "Clean mode" toggle.

## Technical & Notation Conventions
- SI units, clear significant figures, standard IUPAC nomenclature.
- LaTeX for all math ($A = \varepsilon b c$).
- Verified constants and references. No guessed or hallucinated data.

## Quality & QA Standards
- Every reaction checked for atom and charge balance.
- Recompute every numerical answer with Python code.
- Mark ambiguous claims as "UNVERIFIED" or remove them.
- Follow anti-slop rules: no generic templates, no filler copy, no emoji bullet spam.
