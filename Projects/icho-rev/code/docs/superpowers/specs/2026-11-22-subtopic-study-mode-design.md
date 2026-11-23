# Subtopic-Based Study Deck & Statistics Dashboard Design Spec

- **Date:** 2026-11-22
- **Target:** IChO Rev Lesson Pages (`/lessons/[slug]`)
- **Reference:** `reference/UI PROMPT.md` & `reference/lesson ui format.jpg`

## 1. Objectives & Key Requirements

1. **Subtopic Cards (NOT Q&A Flip Cards):**
   - Each flashcard represents 1 COMPLETE numbered subtopic section (e.g., `1.1 Energy`, `1.2 Internal Energy (U)`).
   - Contains 100% of the original MDX content (IUPAC definitions, KaTeX equations, physical interpretations, Taglish intuition notes, nested lists). No truncation or shortening.
2. **3 Integrated View Modes:**
   - **Scroll View:** Original continuous reading view.
   - **Study Mode:** Single-card study interface with central card, navigation controls, and right-hand statistics panel.
   - **All Cards:** Browsable, multi-card layout displaying all complete subtopic cards.
3. **Study Statistics & Persistence:**
   - Tracks 4 metrics: Total Cards, Mastered, In Progress, Not Started.
   - `I Know This` marks active card as Mastered.
   - `Reset Progress` returns active card to Not Started.
   - Saved in `localStorage` under `icho-rev-progress-[slug]`.
4. **Apple Dark Mode Aesthetics:**
   - Page background: `#0B0D12` / `#12141C`
   - Surfaces: `#171A23` / `#1C202B` with frosted glass borders (`rgba(255,255,255,0.1)`)
   - Accent icons/badges: Mastered (`#34D399`), In Progress (`#FBBF24`), Not Started (`#A78BFA`), Total (`#60A5FA`).

## 2. Technical Architecture

- **DOM Extraction Engine (`src/scripts/study-mode.ts`):**
  - Parses rendered MDX DOM inside `.lesson-content-cards`.
  - Groups content under each `H3` into a Subtopic Card object linked to its parent `H2` category.
- **UI Container (`src/components/StudyMode.astro`):**
  - Injects top control bar, central active card container, bottom action buttons, and side statistics panel.
- **Enhanced View Toggle (`src/components/ViewToggle.astro`):**
  - Swapping tabs between `Scroll`, `Study Mode`, and `All Cards`.
