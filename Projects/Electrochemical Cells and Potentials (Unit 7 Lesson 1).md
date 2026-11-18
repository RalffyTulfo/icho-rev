# Electrochemical Cells and Potentials (Unit 7 Lesson 1)

---
title: Electrochemical Cells and Potentials (Unit 7 Lesson 1)
author: Ralf
proofreader: None
readingTime: 45
unit: Unit 7: Electrochemistry
color: indigo/emerald
cleanModeMapping:
  - path: "1. Electrochemical Cell Basics"
    clean: true
  - path: "2. Standard Reduction Potentials"
    clean: false
---

# Electrochemical Cells and Potentials
## Terms and Definitions Box
| Term | Definition |
|------|------------|
| **Anode** | Electrode where oxidation occurs; electrons are released |
| **Cathode** | Electrode where reduction occurs; electrons are accepted |
| **Electrolyte** | Medium that conducts ions between anode and cathode |
| **Salt Bridge** | Porous barrier allowing ion flow to maintain neutrality |
| **Galvanic Cell** | Spontaneous cell converting chemical to electrical energy |
| **Electrolytic Cell** | Non-spontaneous cell converting electrical to chemical energy |
| **Concentration Cell** | Cell where emf arises from concentration differences |
| **Electromotive Force (EMF)** | Potential difference between electrodes |
| **Standard Reduction Potential ($E^\circ$) | Reduction potential under standard conditions |
| **Cell Reaction** | Overall redox reaction in the cell |
| **Cell Notation** | Compact representation of cell components |
## Why does this exist?
Bakit mahalaga ang electrochemical cells? This is why: they're literally everywhere in our daily lives and competitive exams! Think about the phone you're using right now - batteries are just galvanic cells quietly powering everything. But the chemistry behind these cells? That's where the real magic happens, and that's what IChO loves to test you on. Electrochemical cells are the bridge between chemistry and electricity, and understanding them means you can predict everything from battery performance to corrosion, from electroplating to fuel cells. If you can't explain why a zinc-copper cell generates 0.76V or why adding salt increases current, you're basically failing the entire electrochemical section. So buckle up, we're covering everything from basic cell setup to solving complex potential calculations that'll make you feel like a chemistry detective.
## 1. Electrochemical Cell Basics
### Cell Notation and Structure
An electrochemical cell is represented in standard notation like:
$$\text{Zn}(s) | \text{Zn}^{2+}(aq) || \text{Cu}^{2+}(aq) | \text{Cu}(s)$$
**Left side (anode):** Oxidation occurs
$$\text{Zn}(s) \rightarrow \text{Zn}^{2+}(aq) + 2e^-$$
**Right side (cathode):** Reduction occurs
$$\text{Cu}^{2+}(aq) + 2e^- \rightarrow \text{Cu}(s)$$
**Cell reaction:**
$$\text{Zn}(s) + \text{Cu}^{2+}(aq) \rightarrow \text{Zn}^{2+}(aq) + \text{Cu}(s)$$
### Why does the cell generate electricity?
Think of oxidation and reduction as two sides of the same coin. At the anode, we lose electrons (oxidation), while at the cathode, we gain electrons (reduction). This electron flow creates an electrical current. The driving force is the difference in chemical potential energy between reactants and products.
### Standard Cell Potential
The standard cell potential ($E^\circ_\text{cell}$) is calculated as:
$$E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode}$$
For the zinc-copper cell:
$$E^\circ_\text{cell} = (+0.34 \text{V}) - (-0.76 \text{V}) = +1.10 \text{V}$$
### Key IChO Traps
- **Remember:** Anode is always oxidation, cathode is always reduction (not positive/negative electrode)
- **Never mix:** Oxidation numbers in cell notation - they're already there in the half-reactions!
- **Critical:** Standard potentials are intensive properties - no scaling when multiplying reactions
### What graders want to see
- Correct identification of anode/cathode
- Proper cell notation
- Accurate half-reaction balancing
- Clear calculation of $E^\circ_\text{cell}$
- Explanation of electron flow direction
## 2. Standard Reduction Potentials
### Building a Standard Potential Table
The table of standard reduction potentials is your chemical superpower toolkit. Here are the most important ones for IChO:
| Half-reaction | $E^\circ$ (V) |
|---------------|---------------|
| $\text{F}_2 + 2e^- \rightarrow 2\text{F}^-$ | +2.87 |
| $\text{MnO}_4^- + 8\text{H}^+ + 5e^- \rightarrow \text{Mn}^{2+} + 4\text{H}_2\text{O}$ | +1.51 |
| $\text{Cl}_2 + 2e^- \rightarrow 2\text{Cl}^-$ | +1.36 |
| $\text{O}_2 + 4\text{H}^+ + 4e^- \rightarrow 2\text{H}_2\text{O}$ | +1.23 |
| $\text{Cr}_2\text{O}_7^{2-} + 14\text{H}^+ + 6e^- \rightarrow 2\text{Cr}^{3+} + 7\text{H}_2\text{O}$ | +1.00 |
| $\text{Fe}^{3+} + e^- \rightarrow \text{Fe}^{2+}$ | +0.77 |
| $\text{Zn}^{2+} + 2e^- \rightarrow \text{Zn}$ | -0.76 |
| $\text{Mg}^{2+} + 2e^- \rightarrow \text{Mg}$ | -2.87 |
### Predict which metal forms spontaneous cell
**Example:** Ag vs Cu
- Ag: $\text{Ag}^+ + e^- \rightarrow \text{Ag}$ ($E^\circ = +0.80$)
- Cu: $\text{Cu}^{2+} + 2e^- \rightarrow \text{Cu}$ ($E^\circ = +0.34$)
Which forms spontaneous cell?
$$E^\circ_\text{cell} = +0.80 - (+0.34) = +0.46 \text{V}$$
Yes, Ag forms a spontaneous cell because $E^\circ_\text{cell} = +0.46 \text{V} > 0$.
**Work Step  idagot potential with more positive value → cathode (reduction)
**Work Step 1:** Identify potential with less positive value → anode (oxidation)
**Work Step 2:** Calculate difference: $E^\circ_\text{cathode} - E^\circ_\text{anode}$
### Unverified Note
Some sources give slightly different values for standard potentials - use those from your textbook or exam materials.
## Required Interactives
1. **Electrochemical Cell Builder**: Interactive tool where users drag different electrodes and electrolytes to build spontaneous and non-spontaneous cells.
2. **Cell Potential Calculator**: Tool that takes half-reactions and predicts cell potential, electron flow direction, and spontaneity.
## Warm-up (School Level)
1. Write the cell notation for: Iron-silver cell.
2. Calculate the cell potential using standard potentials.
3. Explain why this cell would be spontaneous or non-spontaneous.
## Level-up (National Olympiad)
1. Given: $\text{Pb}^{2+} + 2e^- \rightarrow \text{Pb}$ ($E^\circ = -0.13$) and $\text{Cu}^{2+} + 2e^- \rightarrow \text{Cu}$ ($E^\circ = +0.34$)
   a) Write the cell notation and half-reactions for a spontaneous lead-copper cell.
   b) Calculate $E^\circ_\text{cell}$.
   c) Determine electron flow direction and spontaneity.
2. Balance these half-reactions and arrange them in a spontaneous cell:
   a) $\text{Cr}^{3+} + 3e^- \rightarrow \text{Cr}$ ($E^\circ = -0.48$)
   b) $\text{Al}^{3+} + 3e^- \rightarrow \\text{Al}$ ($E^\circ = -1.66$)
## Boss Fight (IChO-style, multi-part, unfamiliar context)
Given this electrochemical setup:
$$\text{Mg}(s) | \text{Mg}^{2+}(aq) || \text{Cu}^{2+}(aq) | \text{Cu}(s)$$
### Nernst Equation for Non-Standard Conditions
When concentrations deviate from 1 M, use the Nernst equation:
$$E = E^\circ - \frac{RT}{nF} \ln Q$$
At 25°C, this simplifies to:
$$E = E^\circ - \frac{0.0592}{n} \log_{10} Q$$
where $Q$ is the reaction quotient and $n$ is the number veter transferred.
**Worked Example: Mg-Cu Cell**
- Half-reactions: $\text{Mg}^{2+} + 2e^- \rightarrow \text{Mg}$ ($E^\circ = -2.37$ V), $\text{Cu}^{2+} + 2e^- \rightarrow \text{Cu}$ ($E^\circ = +0.34$ V)
- $E^\circ_\text{cell} = +0.34 - (-2.37) = +2.71$ V
- Overall reaction: $\text{Mg}(s) + \text{Cu}^{2+}(aq) \rightarrow \text{Mg}^{2+}(aq) + \text{Cu}(s)$, so $Q = \frac{[\text{Mg}^{2+}]}{[\text{Cu}^{2+}]}$
- $n = 2$, $[\text{Mg}^{2+}] = 0.1$ M, $[\text{Cu}^{2+}] = 0.5$ M
- $E = 2.71 - \frac{0.0592}{2} \log_{10}\left(\frac{0.1}{0.5}\right) = 2.�ำลัง - 0.0296 \times (-0.699) = 2.71 + 0.0207 = 2.73$ V
Now solve the problem:
   a) Calculate $E^\circ_\text{cell}$ using standard potentials.
   b) Write the overall cell reaction.
   c) If concentration of $\text{Mg}^{2+}$ is 0.1 M and $\text{Cu}^{2+}$ is 0.5 M, calculate actual cell potential using Nernst equation at 25°C.
   d) Explain how changing concentrations affects spontaneity.
   e) Propose a practical application for this magnesium-copper cell.
### Click-to-reveal worked solutions and mark schemes available
- Focus on numerical calculations, clear step-by-step reasoning, dan proper notation
- Every numerical answer must be verified with Python code
- Answer ALL sub-parts in detail
## Quality & QA Standards
Every reaction checked for atom and charge balance. Every numerical answer recomputed with Python code. Mark ambiguous claims as "UNVERIFIED". Follow anti-slop rules: no generic templates, no filler copy, no emoji bullet spam-  = 2.71 - rac{0.0592}{2} \log_{10}\left(rac{0.1}{0.5}ight) = 2.71 - 0.0296 	imes (-0.699) = 2.71 + 0.0207 = 2.7396 pprox 2.74$ V.