import React, { useState } from 'react';

// Predefined multi-step reaction problems for Hess's Law
const PROBLEMS = [
  {
    id: 'carbon-co',
    title: 'Formation of Carbon Monoxide (C + ½O₂ → CO)',
    description: 'Combine the combustion of carbon and carbon monoxide to find the enthalpy of formation of CO.',
    targetReaction: 'C(s) + 1/2 O₂(g) → CO(g)',
    targetDeltaH: -110.5,
    steps: [
      { id: 's1', eq: 'C(s) + O₂(g) → CO₂(g)', deltaH: -393.5, multiplier: 1, reversed: false },
      { id: 's2', eq: 'CO(g) + 1/2 O₂(g) → CO₂(g)', deltaH: -283.0, multiplier: 1, reversed: true }
    ]
  },
  {
    id: 'haber-nh3',
    title: 'Formation of Ammonia (N₂ + 3H₂ → 2NH₃)',
    description: 'Synthesize ammonia enthalpy from stepwise reactions.',
    targetReaction: 'N₂(g) + 3H₂(g) → 2NH₃(g)',
    targetDeltaH: -91.8,
    steps: [
      { id: 's1', eq: 'N₂H₄(l) + H₂(g) → 2NH₃(g)', deltaH: -187.6, multiplier: 1, reversed: false },
      { id: 's2', eq: 'N₂H₄(l) + O₂(g) → N₂(g) + 2H₂O(l)', deltaH: -622.2, multiplier: 1, reversed: false },
      { id: 's3', eq: 'H₂(g) + 1/2 O₂(g) → H₂O(l)', deltaH: -285.8, multiplier: 2, reversed: false }
    ]
  }
];

export default function HessBuilder() {
  const [selectedProb, setSelectedProb] = useState(0);
  const prob = PROBLEMS[selectedProb];

  // Track multipliers and reversed state for each step
  const [state, setState] = useState(
    prob.steps.reduce((acc, s) => ({ ...acc, [s.id]: { mult: s.multiplier, rev: s.reversed } }), {})
  );

  const handleProbChange = (idx) => {
    setSelectedProb(idx);
    const p = PROBLEMS[idx];
    setState(
      p.steps.reduce((acc, s) => ({ ...acc, [s.id]: { mult: s.multiplier, rev: s.reversed } }), {})
    );
  };

  const toggleReverse = (id) => {
    setState(prev => ({
      ...prev,
      [id]: { ...prev[id], rev: !prev[id].rev }
    }));
  };

  const changeMult = (id, delta) => {
    setState(prev => ({
      ...prev,
      [id]: { ...prev[id], mult: Math.max(0.5, Number((prev[id].mult + delta).toFixed(1))) }
    }));
  };

  // Calculate sum of enthalpy
  const currentDeltaH = prob.steps.reduce((sum, s) => {
    const sState = state[s.id] || { mult: 1, rev: false };
    const factor = sState.rev ? -sState.mult : sState.mult;
    return sum + (s.deltaH * factor);
  }, 0);

  const isCorrect = Math.abs(currentDeltaH - prob.targetDeltaH) < 1.0;

  return (
    <div className="frosted-glass p-6 rounded-2xl my-6 border border-primary/20 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold">
            Interactive Hess's Law Builder
          </span>
          <h3 className="text-xl font-bold mt-2">{prob.title}</h3>
          <p className="text-sm text-foreground/70">{prob.description}</p>
        </div>
        <div className="flex gap-2">
          {PROBLEMS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => handleProbChange(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedProb === idx
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
              }`}
            >
              Problem {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Target Box */}
      <div className="bg-primary/10 border border-primary/30 p-4 rounded-xl mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-xs font-bold text-primary uppercase">Target Reaction</span>
          <div className="font-mono text-lg font-bold">{prob.targetReaction}</div>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-primary uppercase">Target ΔH°</span>
          <div className="font-mono text-lg font-bold">{prob.targetDeltaH} kJ/mol</div>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/60">Available Given Reactions (Manipulate below)</h4>
        {prob.steps.map((s) => {
          const sState = state[s.id] || { mult: 1, rev: false };
          const stepDeltaH = (s.deltaH * (sState.rev ? -1 : 1) * sState.mult).toFixed(1);

          return (
            <div key={s.id} className="p-4 rounded-xl bg-foreground/5 border border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="font-mono text-base flex-1">
                {sState.rev ? (
                  <span className="text-primary font-semibold">[Reversed] </span>
                ) : null}
                {sState.mult !== 1 ? (
                  <span className="text-secondary font-semibold">({sState.mult}×) </span>
                ) : null}
                {s.eq}
              </div>

              <div className="flex items-center gap-4">
                <div className="font-mono text-sm font-semibold">
                  ΔH = {stepDeltaH} kJ
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleReverse(s.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      sState.rev ? 'bg-primary text-white' : 'bg-foreground/10 hover:bg-foreground/20'
                    }`}
                    title="Reverse reaction direction (- sign)"
                  >
                    Reverse ⇄
                  </button>

                  <div className="flex items-center bg-foreground/10 rounded-lg overflow-hidden">
                    <button
                      onClick={() => changeMult(s.id, -0.5)}
                      className="px-2.5 py-1 text-xs font-bold hover:bg-foreground/20 transition"
                      title="Decrease stoichiometric multiplier"
                    >
                      -
                    </button>
                    <span className="px-2 text-xs font-mono font-bold">{sState.mult}×</span>
                    <button
                      onClick={() => changeMult(s.id, 0.5)}
                      className="px-2.5 py-1 text-xs font-bold hover:bg-foreground/20 transition"
                      title="Increase stoichiometric multiplier"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Sum */}
      <div className={`p-5 rounded-2xl border flex flex-col md:flex-row justify-between items-center gap-4 transition-all ${
        isCorrect
          ? 'bg-success/20 border-success text-success-foreground'
          : 'bg-foreground/5 border-foreground/10'
      }`}>
        <div>
          <span className="text-xs uppercase tracking-wider font-bold opacity-80">Calculated Net Enthalpy Change (Σ ΔH)</span>
          <div className="font-mono text-2xl font-extrabold mt-1">
            {currentDeltaH.toFixed(1)} kJ/mol
          </div>
        </div>

        <div>
          {isCorrect ? (
            <div className="flex items-center gap-2 bg-success text-white px-4 py-2 rounded-xl text-sm font-bold shadow animate-bounce">
              <span>🎉 Correct Hess's Law Cancellation!</span>
            </div>
          ) : (
            <div className="text-xs text-foreground/70 font-medium">
              Adjust coefficients & reverse reactions until sum matches target ΔH°.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
