# IChO Curriculum & Prerequisite Architecture

## 1. Prerequisites Graph (Directed Acyclic Graph)

The IChO curriculum is structured as a progressive Directed Acyclic Graph (DAG). Mastery of the **Math & Lab-Skills Toolkit** is required before embarking on deep physical and analytical domains, while physical and inorganic foundations feed directly into organic, biochemical, and practical lab mastery.

```
                    ┌───────────────────────────────────────────────┐
                    │    Math & Lab-Skills Toolkit (TOOLKIT)         │
                    │ (Calculus, Logs, Error Prop, Sig Figs, Units) │
                    └───────────────────────┬───────────────────────┘
                                            │
           ┌────────────────────────────────┼────────────────────────────────┐
           ▼                                ▼                                ▼
┌──────────────────────┐        ┌──────────────────────┐        ┌──────────────────────┐
│  Physical Chemistry  │        │ Analytical Chemistry │        │ Inorganic Chemistry  │
│     Foundations      │        │     Foundations      │        │     Foundations      │
│  (Thermo, Kinetics)  │        │ (Acid-Base, Titr.)   │        │ (Bonding, Trends)    │
└──────────┬───────────┘        └──────────┬───────────┘        └──────────┬───────────┘
           │                               │                               │
           ├───────────────────────────────┴──────────────┬────────────────┘
           ▼                                              ▼
┌──────────────────────┐                       ┌──────────────────────┐
│ Organic Chemistry    │                       │ Coordination & Solid │
│ Mechanisms & Stereo  │                       │ State Chemistry      │
└──────────┬───────────┘                       └──────────┬───────────┘
           │                                              │
           ├───────────────────────────────┬──────────────┘
           ▼                               ▼
┌──────────────────────┐        ┌──────────────────────┐
│ Advanced Synthesis   │        │ Biochemistry &       │
│ & Retrosynthesis     │        │ Enzymatic Mechanisms │
└──────────┬───────────┘        └──────────┬───────────┘
           │                               │
           └───────────────┬───────────────┘
                           ▼
            ┌──────────────────────────────┐
            │ Practical & Laboratory Skills│
            │  (Synthesis, Quant. Analysis)│
            └──────────────────────────────┘
```

---

## 2. Core Toolkit: Math & Lab Skills (`TOOLKIT`)

Every Olympiad candidate must master these foundational mathematical and analytical tools prior to advanced topic study.

### Module T1: Logarithms, Exponentials & Scale Conversions
- **Concepts:** Properties of natural ($\ln$) and base-10 ($\log_{10}$) logarithms, exponential functions, linearization of non-linear data.
- **Applications:**
  - Acid-Base Chemistry: $\text{pH} = -\log_{10}[\text{H}^+]$, $\text{p}K_a = -\log_{10}K_a$, Henderson-Hasselbalch equation derivation.
  - Reaction Kinetics: Arrhenius equation linearization $\ln k = -\frac{E_a}{R}\left(\frac{1}{T}\right) + \ln A$.
  - Electrochemistry: Nernst equation $E = E^\circ - \frac{RT}{nF}\ln Q$.

### Module T2: Algebraic Approximations & Equilibrium ICE Tables
- **Concepts:** Quadratic formula, 5% rule for equilibrium approximations, successive approximations, cubic/higher-order equilibrium expressions.
- **Applications:**
  - Weak acid/base ionization equilibria ($K_a = \frac{x^2}{F - x} \approx \frac{x^2}{F}$).
  - Polyprotic equilibria and speciation calculations.
  - Solubility product calculations with competing complexation reactions.

### Module T3: Calculus for Thermodynamics & Chemical Kinetics
- **Concepts:** Single-variable differentiation and integration, partial derivatives, differential equations, integration of rate laws.
- **Applications:**
  - Kinetics: Derivation of 0th, 1st, 2nd order integrated rate laws ($\ln[A]_t = -kt + \ln[A]_0$, $\frac{1}{[A]_t} = kt + \frac{1}{[A]_0}$).
  - Thermodynamics: Reversible work integrals $W = -\int V \, dP$ and $W = -\int P \, dV$, enthalpy/entropy temperature dependence $\Delta H_T = \Delta H^\circ + \int C_p \, dT$.
  - Steady-State & Pre-Equilibrium Approximations: $\frac{d[\text{Intermediate}]}{dt} \approx 0$.

### Module T4: Significant Figures, Error Analysis & Uncertainty Propagation
- **Concepts:** Absolute vs relative uncertainty, Gaussian error propagation formula for addition/subtraction ($\delta f = \sqrt{(\delta x)^2 + (\delta y)^2}$) and multiplication/division ($\frac{\delta f}{f} = \sqrt{(\frac{\delta x}{x})^2 + (\frac{\delta y}{y})^2}$).
- **Applications:**
  - Reporting experimental volumetric titrations and spectrophotometric measurements.
  - Calculating molar mass uncertainties and stoichiometry error margins.

### Module T5: Dimensional Analysis & Fundamental Constants
- **Concepts:** Unit conversions (SI units, non-SI laboratory units), dimensional consistency checks in multi-step equations.
- **Applications:**
  - Interconverting energy units ($\text{J}, \text{kJ/mol}, \text{cal}, \text{eV}, \text{cm}^{-1}$).
  - Gas constant $R$ variations ($8.314\text{ J/(mol}\cdot\text{K)}, 0.08206\text{ L}\cdot\text{atm/(mol}\cdot\text{K)}$).

---

## 3. Domain Learning Paths

### Domain 1: Physical Chemistry (`PHYS`)

#### PHYS-101: Chemical Thermodynamics & Thermochemistry (Level 1/2)
- **Prerequisites:** `TOOLKIT-T1`, `TOOLKIT-T3`
- **Topics:** First Law ($\Delta U = q + w$), Enthalpy ($\Delta H$), Heat capacities ($C_p, C_v$), Hess's Law, Kirchoff's Law for $\Delta H(T)$, Calorimetry calculations.
- **Key Equation:** $\Delta H_T = \Delta H^\circ_{298} + \int_{298}^{T} \Delta C_p \, dT$

#### PHYS-102: Entropy, Free Energy & Chemical Equilibrium (Level 2)
- **Prerequisites:** `PHYS-101`, `TOOLKIT-T2`
- **Topics:** Second & Third Laws, Entropy ($S$), Gibbs Free Energy ($G$), Spontaneity criteria, Reaction quotient ($Q$) vs Equilibrium constant ($K$), van 't Hoff equation.
- **Key Equation:** $\frac{d\ln K}{dT} = \frac{\Delta H^\circ}{RT^2} \implies \ln \frac{K_2}{K_1} = -\frac{\Delta H^\circ}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)$

#### PHYS-103: Electrochemistry & Galvanic Cells (Level 2)
- **Prerequisites:** `PHYS-102`, `TOOLKIT-T1`
- **Topics:** Standard reduction potentials ($E^\circ$), Cell thermodynamics ($\Delta G^\circ = -nFE^\circ$), Nernst equation, Concentration cells, Electrolysis, Faraday's laws.
- **Key Equation:** $E = E^\circ - \frac{RT}{nF} \ln Q$

#### PHYS-104: Chemical Kinetics & Reaction Mechanisms (Level 2/3)
- **Prerequisites:** `TOOLKIT-T3`, `PHYS-101`
- **Topics:** Differential & integrated rate laws, Half-life ($t_{1/2}$), Reaction order determination, Arrhenius equation & activation energy ($E_a$), Steady-state approximation, Pre-equilibrium kinetics.
- **Key Concept:** $\frac{d[\text{Intermediate}]}{dt} = 0 \implies k_1[A] = (k_{-1} + k_2)[\text{Intermediate}]$

#### PHYS-105: Quantum Chemistry & Atomic/Molecular Spectroscopy (Level 3)
- **Prerequisites:** `TOOLKIT-T3`, `PHYS-104`
- **Topics:** Particle in a 1D box model, Wavefunctions & energy quantization, Electromagnetic spectrum, Rotational, Vibrational (IR), and Electronic (UV-Vis) spectroscopy, Beer-Lambert law.
- **Key Equation:** $E_n = \frac{n^2 h^2}{8mL^2}, \quad A = \varepsilon c l$

---

### Domain 2: Organic Chemistry (`ORG`)

#### ORG-201: Structure, Bonding & Stereochemistry (Level 1/2)
- **Prerequisites:** `TOOLKIT-T1`
- **Topics:** Hybridization ($sp^3, sp^2, sp$), Resonance structures, Dipole moments, Conformational analysis of alkanes & cyclohexanes (chair conformations, 1,3-diaxial interactions), Stereocenters ($R/S$), Enantiomers, Diastereomers, Meso compounds, Optical activity.

#### ORG-202: Nucleophilic Substitution & Elimination Mechanisms (Level 2)
- **Prerequisites:** `ORG-201`
- **Topics:** $S_N1, S_N2, E1, E2$ reaction pathways, Kinetics, Stereochemical outcomes (inversion vs racemization), Substrate effects, Leaving group ability, Solvent effects (polar protic vs polar aprotic), Regioselectivity (Zaitsev vs Hoffmann).

#### ORG-203: Electrophilic Addition & Aromatic Substitution (Level 2)
- **Prerequisites:** `ORG-202`
- **Topics:** Electrophilic additions to alkenes/alkynes (halogenation, hydrohalogenation, hydration, oxymercuration, hydroboration-oxidation), Carbocation stability & rearrangements, Electrophilic Aromatic Substitution (EAS: nitration, sulfonation, halogenation, Friedel-Crafts alkylation/acylation), Activators/Deactivators, $o/p$ vs $m$ directing rules.

#### ORG-204: Carbonyl Chemistry & Enolate Reactions (Level 2/3)
- **Prerequisites:** `ORG-203`
- **Topics:** Nucleophilic addition to aldehydes/ketones (acetals, imines, enamines, Grignard additions), Nucleophilic acyl substitution of carboxylic acid derivatives, Enolates & Enols, Aldol condensation, Claisen/Dieckmann condensation, Michael addition, Robinson annulation, Wittig reaction.

#### ORG-205: Pericyclic Reactions & Advanced Synthetic Strategies (Level 3)
- **Prerequisites:** `ORG-204`
- **Topics:** Frontier Molecular Orbital (FMO) theory, Diels-Alder $[4+2]$ cycloadditions (regioselectivity, endo rule), Electrocyclic reactions (Woodward-Hoffmann rules), Sigmatropic rearrangements (Cope, Claisen), Retrosynthetic analysis, Synthons, Functional group interconversions (FGI), Protecting group strategies (silyl ethers, acetals, Boc, Fmoc).

---

### Domain 3: Inorganic Chemistry (`INORG`)

#### INORG-301: Periodic Trends & Main Group Chemistry (Level 1/2)
- **Prerequisites:** `TOOLKIT-T5`
- **Topics:** Electronegativity, Ionization energy, Electron affinity, Atomic & ionic radii, Valence Shell Electron Pair Repulsion (VSEPR) theory, Chemistry of s- and p-block elements (Group 1, 2, 13-17), Hydrides, Oxides, Halides.

#### INORG-302: Molecular Orbital Theory & Chemical Bonding (Level 2/3)
- **Prerequisites:** `INORG-301`, `PHYS-105`
- **Topics:** Linear Combination of Atomic Orbitals (LCAO-MO), Homonuclear and heteronuclear diatomic MO diagrams ($\text{N}_2, \text{O}_2, \text{CO}, \text{NO}$), Bond orders, Magnetic properties (paramagnetism vs diamagnetism).

#### INORG-303: Coordination Chemistry & Crystal Field Theory (Level 2/3)
- **Prerequisites:** `INORG-301`, `PHYS-102`
- **Topics:** Coordination numbers & geometries, Nomenclature, Isomerism (linkage, geometric, optical), Crystal Field Theory (CFT) in octahedral, tetrahedral, and square planar complexes, Crystal field splitting energy ($\Delta_o, \Delta_t$), Spectrochemical series, High-spin vs low-spin complexes, Magnetic moments ($\mu_{eff} = \sqrt{n(n+2)}$), Jahn-Teller distortion.

#### INORG-304: Solid State Chemistry & Crystallography (Level 2/3)
- **Prerequisites:** `INORG-301`, `TOOLKIT-T5`
- **Topics:** Crystal systems & Bravais lattices, Unit cell calculations (simple cubic, bcc, fcc), Coordination numbers, Atomic packing factors, Radius ratio rules, Bragg's law ($n\lambda = 2d\sin\theta$), Lattice energy, Born-Haber cycles.

#### INORG-305: Organometallic Chemistry & Catalysis (Level 3)
- **Prerequisites:** `INORG-303`, `ORG-203`
- **Topics:** 18-electron rule, Ligand classification ($\sigma$-donors, $\pi$-acceptors), Metal carbonyls, Metallocenes (ferrocene), Fundamental reactions (oxidative addition, reductive elimination, migratory insertion, $\beta$-hydride elimination), Catalytic cycles (Wilkinson's hydrogenation, Heck reaction, olefin metathesis).

---

### Domain 4: Analytical Chemistry (`ANALYT`)

#### ANALYT-401: Advanced Acid-Base & Polyprotic Equilibria (Level 1/2)
- **Prerequisites:** `TOOLKIT-T1`, `TOOLKIT-T2`
- **Topics:** Systematic treatment of equilibrium (charge and mass balances), Monoprotic and polyprotic acid/base titrations, Fraction of species ($\alpha$-plots), Buffer solutions and buffer capacity ($\beta$).

#### ANALYT-402: Complexometric, Gravimetric & Redox Titrations (Level 2)
- **Prerequisites:** `ANALYT-401`, `PHYS-103`
- **Topics:** EDTA titrations & conditional formation constants ($K'_f$), Precipitation titrations & solubility product equilibria ($K_{sp}$), Gravimetric determination, Redox titrations (permanganate, dichromate, iodometry).

#### ANALYT-403: Spectrophotometric & Chromatographic Analysis (Level 2/3)
- **Prerequisites:** `PHYS-105`, `ANALYT-401`
- **Topics:** UV-Vis spectrophotometry, Multi-component spectral analysis, Separation techniques: Thin-Layer Chromatography (TLC), High-Performance Liquid Chromatography (HPLC), Gas Chromatography (GC), Retention factor ($R_f$), Resolution, Column efficiency.

#### ANALYT-404: Structure Elucidation via Spectroscopy (NMR, IR, MS) (Level 2/3)
- **Prerequisites:** `ORG-201`, `PHYS-105`
- **Topics:** ${}^1\text{H}$ and ${}^{13}\text{C}$ NMR spectroscopy (chemical shifts, integration, spin-spin splitting, coupling constants $J$), Infrared (IR) spectroscopy (functional group absorption frequencies), Mass Spectrometry (MS: molecular ion peak, isotopic distributions $M/M+2$, fragmentation mechanisms). Combined spectral problem solving.

---

### Domain 5: Biochemistry (`BIOCHEM`)

#### BIOCHEM-501: Biomolecules: Amino Acids, Peptides & Carbohydrates (Level 2)
- **Prerequisites:** `ORG-201`, `ANALYT-401`
- **Topics:** Structures & stereochemistry of 20 standard amino acids, Isoelectric points ($pI$), Peptide synthesis & primary structure, Secondary ($A$-helix, $\beta$-sheet), tertiary, and quaternary protein structures, Carbohydrate structures (Fisher & Haworth projections, mutarotation, glycosidic linkages).

#### BIOCHEM-502: Enzyme Kinetics & Catalytic Mechanisms (Level 3)
- **Prerequisites:** `BIOCHEM-501`, `PHYS-104`
- **Topics:** Michaelis-Menten kinetics ($V_{max}, K_m, k_{cat}$), Lineweaver-Burk double-reciprocal plots, Enzyme inhibition types (competitive, uncompetitive, non-competitive), Chemical mechanisms of enzyme catalysis (e.g., serine proteases, catalytic triads).

#### BIOCHEM-503: Bioenergetics & Central Metabolism (Level 3)
- **Prerequisites:** `BIOCHEM-502`, `PHYS-102`
- **Topics:** Free energy of hydrolysis of ATP ($\Delta G'^\circ$), Glycolysis pathway & regulation, Citric Acid Cycle (TCA cycle), Electron transport chain & oxidative phosphorylation, Fatty acid $\beta$-oxidation.

---

### Domain 6: Practical & Laboratory Skills (`LAB`)

#### LAB-601: Volumetric Analysis & Precision Titrations (Level 1/2)
- **Prerequisites:** `TOOLKIT-T4`, `ANALYT-401`
- **Topics:** Correct operation of burettes, volumetric flasks, and pipettes, Standardizing solution concentrations, Indicator selection based on titration curve equivalence points, Error propagation in volumetric reporting.

#### LAB-602: Organic Synthesis, Isolation & Purification (Level 2)
- **Prerequisites:** `ORG-202`, `ANALYT-403`
- **Topics:** Reflux assembly, Liquid-liquid extraction with separatory funnels, Drying agents, Gravity and vacuum filtration, Recrystallization technique, Thin-Layer Chromatography (TLC) monitoring, Melting point determination.

#### LAB-603: Quantitative Spectrophotometric Laboratory Analysis (Level 2/3)
- **Prerequisites:** `PHYS-105`, `ANALYT-403`, `TOOLKIT-T4`
- **Topics:** Preparation of standard calibration curves, Spectrophotometer wavelength selection and blanking, Determination of unknown concentration, Spectrophotometric titration of metal-ligand complexes.

#### LAB-604: Laboratory Safety, Chemical Handling & Data Reporting (Level 1/2)
- **Prerequisites:** `TOOLKIT-T4`
- **Topics:** GHS hazard classification & safety data sheets (SDS), Handling hazardous waste, Proper storage of air/water-sensitive reagents, Statistical data treatment (Q-test, Dixon's test, Student's t-test for experimental data).

---

## 4. Recommended Learning Sequences

Candidates preparing for national and international selection should follow one of these two progression tracks:

### Accelerated Track (12-Month Preparation)
1. **Months 1-2:** Complete `TOOLKIT` (T1-T5) + `PHYS-101`, `PHYS-102`, `INORG-301`.
2. **Months 3-5:** Complete `ORG-201`, `ORG-202`, `ORG-203` + `ANALYT-401`, `ANALYT-402`.
3. **Months 6-8:** Complete `PHYS-103`, `PHYS-104` + `INORG-302`, `INORG-303` + `ORG-204`.
4. **Months 9-10:** Complete `ORG-205`, `INORG-304`, `ANALYT-404`, `BIOCHEM-501`, `BIOCHEM-502`.
5. **Months 11-12:** Advanced IChO Prep Problems, `INORG-305`, `BIOCHEM-503`, and Intensive `LAB-601` through `LAB-604` practical training.

---

## What Was Skipped / Risks & Limitations

1. **Skipped / Unchecked:** Detailed specific problem sets from past IChO host country exams were not transcribed to strictly respect IChO copyright regulations (only concept links and syllabus mappings are provided).
2. **Risk Notice:** Host countries for upcoming IChO competitions publish specific Preparatory Problems every January introducing novel Level 3 topics (e.g., specialized natural products, unique quantum models, organic synthesis methods). Students must supplement this core curriculum with the specific host country Prep Problems for their competition year.
