# Brief for Practical Chemistry Unit 1: Lab Safety, Glassware, and Titration Techniques

## Title
Practical Chemistry Unit 1: Lab Safety, Glassware, and Titration Techniques

## Goal
Teach students fundamental laboratory safety protocols, proper glassware identification and usage, and titration techniques with emphasis on error prevention and IChO-style practical assessment preparation.

## Syllabus Coverage
- **Lab Safety**: PPE requirements, hazard symbols, emergency procedures (spill cleanup, eye wash, fire extinguisher), risk assessment, SDS (Safety Data Sheets), fume hood usage, gas cylinder safety.
- **Laboratory Glassware**: Identification and proper use of beakers, Erlenmeyer flasks, graduated cylinders, pipettes (volumetric, graduated, Pasteur), burettes, pipette fillers, funnels, watch glasses, watch glasses, condensers. Glassware care, cleaning, and storage. Reading meniscus correctly. Significant figures in volume measurements.
- **Titration Techniques**: Primary standard substances (potassium hydrogen phthalate, sodium carbonate), standard solution preparation and standardization, indicator selection (phenolphthalein, methyl orange), endpoint detection, titration setup, burette reading and error minimization, calculation of concentration from titration results, dilution calculations (M1V1 = M2V2).
- **Error Analysis**: Systematic vs random errors, gross error detection, precision and accuracy, uncertainty propagation in titration calculations.

## Difficulty
Beginner-Intermediate (school level, foundation for national olympiad practicals). Assumes no prior lab experience but rigourous treatment of error analysis.

## Format (Follow STYLE_GUIDE.md)
- **Header**: Standard metadata with title, author (Ralf), proofreader, readingTime, unit="Practical Chemistry 1", color=orange (warm, attention-grabbing for safety theme), cleanModeMapping to toggle slang/cursing.
- **Voice**: Taglish ("Wag kang mag-alala sa hazard symbols, malamang alam na 'yan. Para mas ligaya tayo sa lab."). English for technical terms (burette, meniscus, endpoint, standardization), Tagalog for explanations and safety culture ("alagang-lab", "safe tayo").
- **Terms and Definitions box**: Safety goggles, fume hood, SDS, meniscus, endpoint, standardization, primary standard, indicator, burette, titration error, precision, accuracy.
- **Why does this exist?**: Motivation - "Hindi lang yan assignment; ito ang difference between a successful experiment at the IChO and a trip to the emergency room. Lab safety ngalang buhay."
- **Derivations from first principles**: Standardization calculations from first principles, dilution theory, titration equilibrium.
- **Worked examples with sanity checks ("Step 0: figure out the path before you compute")**:
    1. Reading a meniscus correctly (determine volume with proper significant figures).
    2. Calculating concentration from titration data: "Step 0: Identify the knowns (mass, volume, stoichiometry) before computing."
    3. Dilution calculation: M1V1 = M2V2 practice.
    4. Determining the limiting reagent in a titration with excess titrant.
- **Callouts**:
    - **Common IChO traps**: Assuming endpoint = equivalence point; not accounting for indicator error; incorrect meniscus reading (meniscus at eye level, wrong meniscus for clear vs colored solutions).
    - **What graders want to see**: Explicit statement of the reaction stoichiometry before calculation; proper significant figures (usually 3 sf for school level); correct units throughout; showing the balanced equation first.
- **2+ real interactives that teach**:
    1. **Glassware Identification Interactive**: Drag-and-drop matching of glassware names to images, with tooltip descriptions of proper use and error-prone scenarios.
    2. **Virtual Titration Lab**: Simulated titration where students adjust burette volume, select indicator, add titrant dropwise, observe color change, and calculate concentration with feedback on error sources.
    3. (optional) **Safety Scenario Decision Tree**: Present a lab accident scenario ("You notice fumes coming from the fume hood... what do you do?") with branching choices and correct/incorrect outcomes.

## Required Problems
1. **Warm-up (school)**: 
   - Identify 5 pieces of laboratory glassware from images and state their correct use.
   - Read the meniscus of a 25 mL graduated cylinder containing water; report volume with proper significant figures.
   - Name the appropriate PPE for handling acids in the laboratory.

2. **Level-up (national olympiad)**: 
   - A student standardizes a 0.1 M NaOH solution using KHP (potassium hydrogen phthalate, mass = 0.8521 g, molar mass = 204.23 g/mol, average titration volume = 23.45 mL). Calculate the exact NaOH concentration. Show all steps including the balanced reaction.
   - A 25.00 mL sample of HCl is titrated with the standardized NaOH from Q1. The average burette reading is 34.12 mL. Calculate the HCl concentration.
   - Identify the systematic error if the student forgot to zero the burette before titration.

3. **Boss Fight (IChO-style, multi-part, unfamiliar context)**: 
   - A sodium carbonate (Na2CO3) solution is prepared by dissolving 1.598 g of Na2CO3 (molar mass = 105.99 g/mol) in water and diluting to 250.0 mL. 25.00 mL of this solution is titrated with 0.112 M HCl using methyl orange indicator. The average burette reading is 22.45 mL. 
     a) Write the balanced ionic equation for the reaction.
     b) Calculate the actual concentration of the Na2CO3 solution.
     c) The student realizes the methyl orange endpoint may not be ideal for Na2CO3 titration and switches to phenolphthalein, which gives an average reading of 28.70 mL. Calculate the concentration using this second endpoint. 
     d) Explain which indicator gives a more appropriate endpoint for Na2CO3 and why, referencing the pH at each endpoint and the pKa of the indicators.
     e) Calculate the percentage discrepancy between the two endpoints and discuss possible reasons.

## Constraints
- **QA**: Every numerical result must be Python-verified. Use Python to recompute every answer.
- **Technical**: Use verified constants (R = 8.314 J mol⁻¹ K⁻¹, T = 298 K for any gas law connections; appropriate pKa values for indicators: phenolphthalein pKa ≈ 9.0, methyl orange pKa ≈ 3.7). No guessed or hallucinated data.
- **Anti-slop**: No generic templates, no filler copy, no emoji bullet spam.
- **Voice**: Follow the Taglish, humorous, rigorous, interactive style from STYLE_GUIDE.md.
- **Click-to-reveal**: All worked solutions and problem set answers must be click-to-reveal with mark schemes visible only upon interaction.

## Example from Completed Unit
- Inorganic Chemistry Lesson 3: Crystal Field Theory and Electronic Spectra
- Key elements: Clear definitions, step-by-step reasoning, and a problem set with solutions.

## Python Verification Template
```python
# Verify titration calculation
# Na2CO3 + 2HCl → 2NaCl + CO2 + H2O
# M1V1(n=1) = M2V2(n=2) for diprotic base
mass_Na2CO3 = 1.598  # g
M_molar_Na2CO3 = 105.99  # g/mol
V_diluted = 250.0  # mL
V_titrated = 25.00  # mL
C_HCl = 0.112  # mol/L
V_HCl_1 = 22.45  # mL
V_HCl_2 = 28.70  # mL

n_Na2CO3_initial = mass_Na2CO3 / M_molar_Na2CO3  # mol
C_Na2CO3_diluted = n_Na2CO3_initial / (V_diluted / 1000)  # mol/L
n_HCl_1 = C_HCl * (V_HCl_1 / 1000)  # mol
n_HCl_2 = C_HCl * (V_HCl_2 / 1000)  # mol

# From balanced equation: 1 Na2CO3 : 2 HCl
C_Na2CO3_from_1 = n_HCl_1 / 2 / (V_titrated / 1000)  # mol/L
C_Na2CO3_from_2 = n_HCl_2 / 2 / (V_titrated / 1000)  # mol/L

print(f"Concentration from methyl orange endpoint: {C_Na2CO3_from_1:.5f} mol/L")
print(f"Concentration from phenolphthalein endpoint: {C_Na2CO3_from_2:.5f} mol/L")
print(f"% discrepancy: {abs(C_Na2CO3_from_1 - C_Na2CO3_from_2) / ((C_Na2CO3_from_1 + C_Na2CO3_from_2) / 2) * 100:.1f}%")
```