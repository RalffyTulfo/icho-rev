# Biochemistry Unit 1: Amino Acids, Proteins, and Enzyme Kinetics

---

**title**: Amino Acids, Proteins, and Enzyme Kinetics
**author**: Claude
**proofreader**: [Your Name]
**readingTime**: 45 minutes
**unit**: Biochemistry
**color**: #FF6B6B
**cleanModeMapping**: {
  "banter": false,
  "slang": false,
  "emoji": false
}

---

## Terms and Definitions

- **Amino Acid**: Organic molecule containing an amino group, a carboxyl group, and a unique side chain (R-group).
- **Peptide Bond**: Covalent bond formed between the carboxyl group of one amino acid and the amino group of another.
- **Protein**: Polypeptide chain with biological function.
- **Enzyme**: Biological catalyst that accelerates chemical reactions.
- **Substrate**: Molecule that binds to an enzyme's active site.
- **Active Site**: Region of an enzyme where substrate binding occurs.
- **Km**: Michaelis constant, the substrate concentration at half Vmax.
- **Vmax**: Maximum reaction velocity.

## Why does this exist?

This unit exists because understanding amino acids, proteins, and enzyme kinetics is fundamental to biochemistry. It provides the foundation for studying more complex biological processes, from cellular respiration to signal transduction.

## Derivations from First Principles

### Protein Structure

1. **Primary Structure**: Linear sequence of amino acids.
2. **Secondary Structure**: Localized folding patterns (alpha helices, beta sheets).
3. **Tertiary Structure**: Overall 3D shape of a single polypeptide chain.
4. **Quaternary Structure**: Assembly of multiple protein subunits.

### Enzyme Kinetics

The Michaelis-Menten equation describes enzyme kinetics:

$$ V = \frac{V_{max}[S]}{K_m + [S]} $$

Where:
- V = reaction velocity
- Vmax = maximum reaction velocity
- Km = Michaelis constant
- [S] = substrate concentration

## Worked Examples

### Example 1: Calculating pI of an Amino Acid

Given:
- pKa1 = 2.34 (carboxyl group)
- pKa2 = 9.69 (amino group)

Step 0: Figure out the path before you compute.

The isoelectric point (pI) is the pH at which the amino acid has no net charge. It is calculated as the average of the two pKa values:

$$ pI = \frac{pKa1 + pKa2}{2} = \frac{2.34 + 9.69}{2} = 6.015 $$

### Example 2: Determining Km and Vmax from Lineweaver-Burk Plot

Given data points:
- [S] = 0.1 mM, V = 0.2 mM/s
- [S] = 0.2 mM, V = 0.3 mM/s
- [S] = 0.3 mM, V = 0.35 mM/s

Step 0: Plot the data and fit a line to determine the intercepts.

Using the Lineweaver-Burk equation:

$$ \frac{1}{V} = \frac{K_m}{V_{max}} \frac{1}{[S]} + \frac{1}{V_{max}} $$

From the plot:
- x-intercept = -1/Km
- y-intercept = 1/Vmax

Calculated values:
- Km = 0.1 mM
- Vmax = 0.4 mM/s

## Common IChO Traps

1. **Confusing Km with affinity**: Km is not always equal to the dissociation constant (Kd) of the enzyme-substrate complex.
2. **Ignoring environmental factors**: Enzyme activity depends on pH, temperature, and ionic strength.
3. **Overlooking protein denaturation**: Heat or extreme pH can unfold proteins, destroying their function.

## What Graders Want to See

1. Clear understanding of amino acid structure and properties.
2. Accurate calculation of pI and enzyme kinetics parameters.
3. Ability to interpret Lineweaver-Burk plots and classify inhibition types.
4. Explanation of protein folding and denaturation.

## Interactives

1. **Protein Folding Simulation**: Interactive tool to visualize the folding of a protein chain.
2. **Enzyme Kinetics Calculator**: Tool to compute Km and Vmax from experimental data.

## Problem Sets

### Warm-up (School)

1. Calculate the pI of an amino acid with pKa1 = 1.83 and pKa2 = 10.60.
2. Determine the Km and Vmax from the following data:
   - [S] = 0.05 mM, V = 0.1 mM/s
   - [S] = 0.1 mM, V = 0.15 mM/s
   - [S] = 0.15 mM, V = 0.175 mM/s

### Level-up (National Olympiad)

1. Explain the difference between competitive and noncompetitive inhibition.
2. Calculate the pI of an amino acid with pKa1 = 2.19 and pKa2 = 8.95.
3. Determine the Km and Vmax from the following data:
   - [S] = 0.01 mM, V = 0.02 mM/s
   - [S] = 0.02 mM, V = 0.03 mM/s
   - [S] = 0.03 mM, V = 0.035 mM/s

### Boss Fight (IChO-style)

1. Design an experiment to investigate the effect of a competitive inhibitor on enzyme activity.
2. Calculate the pI of an amino acid with pKa1 = 1.99 and pKa2 = 9.60.
3. Determine the Km and Vmax from the following data:
   - [S] = 0.005 mM, V = 0.01 mM/s
   - [S] = 0.01 mM, V = 0.015 mM/s
   - [S] = 0.015 mM, V = 0.0175 mM/s

## Solutions

### Warm-up Solutions

1. pI = (1.83 + 10.60)/2 = 6.215
2. Km = 0.05 mM, Vmax = 0.2 mM/s

### Level-up Solutions

1. Competitive inhibition: Inhibitor binds to the active site, increasing Km but not Vmax.
   Noncompetitive inhibition: Inhibitor binds elsewhere, decreasing Vmax but not Km.
2. pI = (2.19 + 8.95)/2 = 5.57
3. Km = 0.01 mM, Vmax = 0.04 mM/s

### Boss Fight Solutions

1. Experiment design: Vary substrate concentration and measure initial velocity in the presence and absence of the inhibitor.
2. pI = (1.99 + 9.60)/2 = 5.8
3. Km = 0.005 mM, Vmax = 0.02 mM/s

---