# Nernst Equation and Electrolysis (Unit 7 Lesson 2)

---
title: Nernst Equation and Electrolysis (Unit 7 Lesson 2)
author: Ralf
proofreader: None
readingTime: 60
unit: Unit 7: Electrochemistry
color: indigo/emerald
cleanModeMapping:
  - path: "1. Nernst Equation"
    clean: true
  - path: "2. Electrolysis"
    clean: false
---

## Terms and Definitions Box
| Term | Definition |
|------|------------|
| **Nernst Equation** | Equation relating cell potential to concentrations and temperature
| **Electrolysis** | Process of using electricity to drive non-spontaneous redox reactions
| **Overpotential** | Additional voltage needed beyond theoretical potential for electrolysis
| **Faraday's Law** | Relationship between electrical charge and amount of substance produced
| **Electrolytic Cell** | Cell that uses external power to drive non-spontaneous reactions
| **Standard Hydrogen Electrode (SHE)** | Reference electrode with $E^	ext{SHE} = 0$ V
| **Reaction Quotient (Q)** | Ratio of product concentrations to reactant concentrations
| **Equilibrium Potential** | Cell potential when $E = 0$ V
| **Electrochemical Series** | Table of standard reduction potentials

## Why does this exist?
Ang mga electrochemical cells ay hindi lamang nagpapakita ng spontaneity, pero mayroon ding mga reaksyon na hindi magiging spontaneous sa natural na kalagayan. Ito ay kung saan ang **electrolysis** ay lumalabas. Ang electrolysis ay ginagamit sa mga industriyal na proseso tulad ng paghuhukay ng mga metal tulad ng aluminum at chlorine, at sa mga aklat ng IChO, ito ay isang mahalagang konsepto na kailangan mong malaman upang matugunan ang mga tanong na nakatuon sa paggawa ng mga non-spontaneous reactions. Sa lesson na ito, tatalakayin natin ang mga sumusunod:

- **Nernst Equation**: Kung paano ang mga konsentrasyon at temperatura ay nagbabago sa cell potential
- **Electrolysis**: Paano ang mga non-spontaneous reactions ay ginagawa sa pamamagitan ng paggamit ng external power
- **Faraday's Laws**: Paano ang mga elektrikal na cargo ay nauugnay sa dami ng mga produkto na ginagawa

## 1. Nernst Equation

### Derivation from First Principles
Ang Nernst Equation ay nagmumula sa thermodynamic relationship sa pagitan ng Gibbs Free Energy ($\Delta G$) at cell potential ($E$):

$$\Delta G = -nFE$$

Sa equilibrium, $\Delta G = 0$ at ang cell potential ay tinatawag na equilibrium potential ($E_{eq}$). Sa mga non-equilibrium na kondisyon, ang Gibbs Free Energy ay nauugnay sa reaction quotient ($Q$) sa pamamagitan ng:

$$\Delta G = \Delta G^	ext{o} + RT \\ln Q$$

Kung saan $\Delta G^	ext{o}$ ay ang standard Gibbs Free Energy change. Kung saan ang $E^	ext{o}$ ay ang standard cell potential, at ang $E$ ay ang actual cell potential, ang Nernst equation ay natatagpuan sa pamamagitan ng paghahati sa mga equation:

$$E = E^	ext{o} - rac{RT}{nF} \ln Q$$

Sa 25°C, ang equation ay maaaring isimplify sa:

$$E = E^	ext{o} - rac{0.0592}{n} \log_{10} Q$$

### Worked Example: Calculating Cell Potential with Non-Standard Conditions
**Problem:**
Ito ay isang concentration cell na may mga half-reactions:

$$	ext{Ag}^+ + e^- ightarrow 	ext{Ag} 	ext{ (}E^	ext{o} = +0.80 	ext{ V)}$$ 

Ang konsentrasyon ng $\text{Ag}^+$ ay 0.01 M sa cathode at 1.0 M sa anode. Ano ang cell potential sa 25°C?

**Solution:**
1. **Write the overall reaction:**
   $$	ext{Ag}^+(	ext{anode, 1.0 M}) ightarrow 	ext{Ag}^+(	ext{cathode, 0.01 M})$$
   
2. **Determine $Q$:**
   $$Q = rac{[	ext{Ag}^+]_{	ext{cathode}}}{[	ext{Ag}^+]_{	ext{anode}}} = rac{0.01}{1.0} = 0.01$$
   
3. **Apply Nernst Equation:**
   $$E = E^	ext{o} - rac{0.0592}{1} \log_{10}(0.01) = 0 - 0.0592 	imes (-2) = 0.1184 	ext{ V}$$

### Common IChO Traps
- **Sign of $Q$:** Ensure $Q$ is correctly written as products over reactants.
- **Temperature:** Always specify if the temperature is not 25°C.
- **Units:** Ensure concentrations are in mol/L and pressures in atm.

### What graders want to see
- Clear identification of anode and cathode based on concentrations.
- Proper application of Nernst Equation with correct signs.
- Verification of calculations using Python code.
- Explanation of how concentration changes affect spontaneity.

## 2. Electrolysis

### Electrolysis Basics
Ang electrolysis ay isang electrochemical process na gumagamit ng external power source upang magawa ang mga non-spontaneous reactions. Ito ay ginagamit sa mga industriyal na proseso tulad ng:
- **Pagpapanatili ng mga metal** (e.g., electroplating of copper, gold, or silver)
- **Paglikha ng mga gas** (e.g., hydrogen and oxygen from water)
- **Pagpapanatili ng mga compounds** (e.g., aluminum production)

### Electrolysis Setup
Ang mga bahagi ng electrolytic cell ay:
- **Anode:** Positive electrode where oxidation occurs
- **Cathode:** Negative electrode where reduction occurs
- **Electrolyte:** Medium na naglalaman ng ions
- **Power Source:** External voltage source

### Faraday's Laws of Electrolysis
Ang mga batas ni Faraday ay naglalaman ng mga sumusunod:

1. **First Law:**
   Ang dami ng mga produkto na ginagawa ay direktang proporsyonal sa electrical charge na ipinasa.
   $$	ext{mass} = rac{M 	imes Q}{nF}$$ 
   kung saan $M$ ay ang molar mass, $Q$ ay ang electrical charge, $n$ ay ang number of electrons transferred, at $F$ ay ang Faraday constant.

2. **Second Law:**
   Ang mga produkto na ginagawa sa parehong electrical charge ay may parehong molar mass.

### Worked Example: Electrolysis of Water
**Problem:**
Ito ay isang electrolytic cell na gumagamit ng platinum electrodes at sulfuric acid electrolyte. Ano ang dami ng oxygen at hydrogen na ginagawa kapag 96,500 coulombs ng electrical charge ay ipinasa?

**Solution:**
1. **Write the half-reactions:**
   - At the cathode: $2	ext{H}_2	ext{O} + 2e^- ightarrow 	ext{H}_2 + 2	ext{OH}^-$ 
   - At the anode: $2	ext{H}_2	ext{O} ightarrow 	ext{O}_2 + 4	ext{H}^+ + 4e^-$

2. **Determine the number of electrons transferred:**
   - For hydrogen: $n = 2$ 
   - For oxygen: $n = 4$

3. **Calculate the mass of hydrogen and oxygen:**
   - For hydrogen: 
     $$	ext{mass of H}_2 = rac{2.016 	ext{ g/mol} 	imes 96500 	ext{ C}}{2 	imes 96485 	ext{ C/mol}} = 1.01 	ext{ g}$$ 
   - For oxygen: 
     $$	ext{mass of O}_2 = rac{32.00 	ext{ g/mol} 	imes 96500 	ext{ C}}{4 	imes 96485 	ext{ C/mol}} = 8.00 	ext{ g}$$ 

### Common IChO Traps
- **Electrode Material:** Ensure the electrode material does not participate in the reaction.
- **Overpotential:** Additional voltage may be needed beyond the theoretical potential.
- **Side Reactions:** Always consider possible side reactions.

### What graders want to see
- Correct identification of anode and cathode in electrolysis.
- Proper application of Faraday's Laws.
- Clear explanation of the role of the power source.
- Verification of calculations using Python code.

## Required Interactives
1. **Nernst Equation Calculator:** Interactive tool na nagbibigay ng cell potential sa mga ibang konsentrasyon at temperatura.
2. **Electrolysis Simulator:** Simulator na nagpapakita ng mga produkto na ginagawa sa mga ibang kondisyon ng electrolysis.

## Warm-up (School Level)
1. Calculate the cell potential for a concentration cell with $[	ext{Cu}^{2+}] = 0.001$ M at the cathode and $[	ext{Cu}^{2+}] = 1.0$ M at the anode.
2. Explain why electrolysis is necessary for the production of aluminum.

## Level-up (National Olympiad)
1. A concentration cell uses $	ext{Fe}^{3+}/	ext{Fe}^{2+}$ half-reaction with $E^	ext{o} = +0.77$ V. The concentration of $	ext{Fe}^{3+}$ is 0.05 M at the cathode and 1.0 M at the anode. Calculate the cell potential.
2. In an electrolytic cell, 500 mA of current is passed for 30 minutes. Calculate the mass of copper deposited on the cathode.

## Boss Fight (IChO-style, multi-part, unfamiliar context)
Given the following setup:
- A cell with $	ext{Ag}^+/	ext{Ag}$ and $	ext{Cu}^{2+}/	ext{Cu}$ electrodes.
- The concentration of $	ext{Ag}^+$ is 0.001 M and $	ext{Cu}^{2+}$ is 0.1 M.
- The cell is connected to an external power source.

### Part 1: Calculate the cell potential using Nernst Equation.
### Part 2: If the cell is used for electrolysis, determine the mass of silver deposited at the cathode when a current of 2.0 A is applied for 10 minutes.
### Part 3: Explain how the concentration changes during electrolysis would affect the cell potential.
### Part 4: Propose a practical application for this setup.

## Quality & QA Standards
- Every calculation must be verified with Python code.
- Every reaction must be checked for atom and charge balance.
- Follow anti-slop rules: no generic templates, no filler copy, no emoji bullet spam.

## Click-to-reveal worked solutions and mark schemes available