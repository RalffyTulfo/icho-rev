# Brief for Unit 3: Inorganic Chemistry, Lesson 3

## Title
Crystal Field Theory and Electronic Spectra

## Goal
Create a lesson that teaches students the d-orbital splitting patterns in octahedral, tetrahedral, and square planar fields, and how these explain color (electronic spectra/UV-Vis) and magnetism (spin states).

## Syllabus Coverage
- **Crystal Field Theory (CFT)**: Electrostatic model for d-orbital degeneracy lifting in $O_h$, $T_d$, and square planar environments.
- **Crystal Field Splitting Energy (CFSE)**: Numerical calculation (Barycenter rule), pairing energy ($P$), and deciding high-spin vs. low-spin configurations ($d^4$ to $d^7$).
- **Spectrochemical Series**: I- < Br- < S2- < SCN- < Cl- < NO3- < F- < OH- < ox2- < H2O < NCS- < edta4- < NH3 < en < bpy < phen < NO2- < PPh3 < CN- < CO.
- **Electronic Spectra**: $d-d$ transitions, $E = \frac{hc}{\lambda}$, color prediction using the color wheel (complementary colors).
- **Selection Rules**: Why transitions are Laporte forbidden (in centers of inversion) and spin forbidden (changing multiplicity), explaining why octahedral complexes have pale colors vs tetrahedral ones.

## Difficulty
Advanced (IChO level).

## Format (Follow STYLE_GUIDE.md)
- **Voice**: Taglish ("Bakit colorful ang transition metals?", "Lowkey confusing yung pairing energy pero logic lang 'yan").
- **Header**: Standard metadata (Ralf as author, indigo/emerald color theme).
- **Terms and Definitions box**: CFSE, $\Delta_o$, $\Delta_t$, Barycenter, Pairing Energy.
- **Worked Examples**: 
    - Predicting High/Low spin for $\text{[Fe(H}_2\text{O)}_6]^{2+}$ vs $\text{[Fe(CN)}_6]^{4-}$.
    - Calculating $\lambda_{\text{max}}$ from $\Delta_o$.
- **Callouts**:
    - **Trap**: $d^0$ (e.g. $\text{Sc}^{3+}$) and $d^{10}$ (e.g. $\text{Zn}^{2+}$) being colorless.
    - **Graders want**: Explicit mention of $t_{2g}$ vs $e_g$ notation and correct units (e.g. $\text{cm}^{-1}$ or $\text{kJ/mol}$).
- **2+ Interactives**:
    - **Orbital Splitting Sim**: Interactive d-orbital diagram where users drag ligands closer to see $\Delta$ increase.
    - **Color-Splitting Matcher**: User picks a ligand field strength and predicts the visible color.

## Required Problems
1. **Warm-up**: Draw splitting diagrams for $d^5$ high-spin and low-spin.
2. **Level-up**: Calculate CFSE in terms of $\Delta_o$ and $P$ for an octahedral $\text{Co}^{3+}$ complex.
3. **Boss Fight**: Given the absorption spectrum of $\text{[Ni(H}_2\text{O)}_6]^{2+}$ and $\text{[Ni(en)}_3]^{2+}$, calculate the shift in splitting energy and explain the color change based on the spectrochemical series.

## Constraints
- **Technical**: Use $1 \text{ cm}^{-1} \approx 0.01196 \text{ kJ/mol}$ for conversions.
- **QA**: Every numerical result must be Python-verified.
