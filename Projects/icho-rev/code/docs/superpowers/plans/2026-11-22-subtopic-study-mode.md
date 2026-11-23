# Subtopic-Based Study Deck & Statistics Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement an Apple-dark-mode subtopic study deck and real-time statistics panel on lesson pages that presents complete numbered subtopics (1.1, 1.2, etc.) as full study cards with persistent localStorage tracking and 3 integrated view modes (`Scroll View`, `Study Mode`, `All Cards`).

**Architecture:** A client-side TypeScript module (`src/scripts/study-mode.ts`) parses MDX H2 categories and H3 subtopic sections into Subtopic Card DOM objects on load, manages Study Mode state (active card, mastery status, category filtering, shuffle), updates the statistics UI panel, and persists progress to `localStorage`. `ViewToggle.astro` is extended to support switching between the three views seamlessly.

**Tech Stack:** Astro, HTML/DOM, Vanilla TypeScript, Tailwind CSS, KaTeX.

**Spec:** `docs/superpowers/specs/2026-11-22-subtopic-study-mode-design.md`

## Global Constraints

- **No content truncation:** Flashcards contain 100% of subtopic content (definitions, equations, physical meanings, Taglish notes).
- **No Q&A flip structure:** Cards display full subtopics directly; no front/back flip interaction.
- **Apple Dark Mode Aesthetics:** Deep dark backgrounds (`#0B0D12` / `#12141C`), glassmorphism, accent icon badges (Mastered `#34D399`, In Progress `#FBBF24`, Not Started `#A78BFA`, Total `#60A5FA`).
- **3 View Modes:** `Scroll View` (default), `Study Mode` (1 card + stats panel), `All Cards` (vertical grid of all cards).
- **Persistence:** LocalStorage key `icho-rev-progress-[slug]`.

---

### Task 1: DOM Extractor & Study Mode Engine Core

**Files:**
- Create: `src/scripts/study-mode.ts`
- Modify: `src/pages/lessons/[slug].astro`

- [ ] **Step 1: Create `src/scripts/study-mode.ts` with Subtopic Parser & State Manager**

Write `initStudyMode()` that:
1. Queries `.lesson-content-cards` to find all H2 headings (Categories) and H3 headings (Subtopics).
2. Groups all sibling nodes under each H3 into a structured subtopic card container.
3. Assigns unique subtopic IDs (e.g. `1.1-energy`, `1.2-internal-energy-u`).
4. Implements status management (`not-started`, `in-progress`, `mastered`) with `localStorage` persistence.
5. Implements navigation (`nextCard`, `prevCard`, `shuffleCards`, `filterCategory`, `hideMastered`).

- [ ] **Step 2: Add Study Mode HTML Container into `[slug].astro`**

Inject the Study Mode UI wrapper next to the main content stream in `src/pages/lessons/[slug].astro`, including:
- Top controls bar (Category Filter `<select>`, `Hide Mastered` checkbox, `Shuffle` button).
- Central study card display area.
- Bottom navigation controls (`< Previous`, `Card X of Y`, `I Know This`, `Reset Progress`, `Next >`).
- Right-hand Study Statistics panel (Total, Mastered, In Progress, Not Started).

- [ ] **Step 3: Test and Verify Build**

Run: `npm run build`
Expected: Build succeeds with no Astro or TypeScript errors.

- [ ] **Step 4: Commit Task 1**

```bash
git add src/scripts/study-mode.ts src/pages/lessons/[slug].astro
git commit -m "feat(study-mode): implement DOM subtopic parser, study deck engine, and layout container"
```

---

### Task 2: 3-Way View Toggle & Apple Dark Mode Styling

**Files:**
- Modify: `src/components/ViewToggle.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update `ViewToggle.astro` for 3 View Modes**

Update buttons and script to support:
- `btn-scroll`: Scroll View
- `btn-study`: Study Mode
- `btn-all-cards`: All Cards

- [ ] **Step 2: Add Apple Dark Mode Glassmorphic CSS Rules to `global.css`**

Define CSS classes and dark mode tokens for:
- `.study-mode-container`, `.study-card-active`, `.stat-card`
- Glassmorphism backdrop-blur, subtle borders (`rgba(255,255,255,0.1)`), and glow highlights.
- Metric badge styling (`.badge-mastered`, `.badge-in-progress`, `.badge-not-started`, `.badge-total`).

- [ ] **Step 3: Test Local Build & Verify Interactivity**

Run: `npm run build`
Expected: Build completes cleanly.

- [ ] **Step 4: Commit Task 2**

```bash
git add src/components/ViewToggle.astro src/styles/global.css
git commit -m "feat(ui): update ViewToggle for 3-way view mode and add Apple dark mode study mode styling"
```

---

### Task 3: Local Verification & GitHub Push

**Files:**
- Test/Verify built output on GitHub Pages / preview build

- [ ] **Step 1: Run Full Astro Build**

Run: `npm run build`
Expected: 39 pages built in ~8 seconds without errors.

- [ ] **Step 2: Commit and Push to GitHub**

```bash
git add .
git commit -m "feat(study-mode): complete subtopic study deck, statistics dashboard, and 3-way view toggle"
git push
```
