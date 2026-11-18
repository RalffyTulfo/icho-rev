import React, { useState } from 'react';

export default function EntropySimulator() {
  const [h, setH] = useState(100); // kJ/mol
  const [s, setS] = useState(200); // J/mol*K
  const [t, setT] = useState(298); // K

  const sKJ = s / 1000;
  const g = h - (t * sKJ);
  const isSpontaneous = g < 0;

  return (
    <div className="frosted-glass p-6 rounded-2xl my-6 border border-primary/20 shadow-lg">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold">
          Spontaneity Simulator
        </span>
        <h3 className="text-xl font-bold mt-2">Gibbs Free Energy: $\Delta G = \Delta H - T\Delta S$</h3>
        <p className="text-sm text-foreground/70">Observe how enthalpy, entropy, and temperature dictate the direction of chemical change.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 bg-foreground/5 p-5 rounded-xl border border-foreground/10">
          <h4 className="text-sm font-bold uppercase tracking-wider text-primary">Parameters</h4>
          
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>$\Delta H$ (Enthalpy Change):</span>
              <span className="font-mono text-primary">{h} kJ/mol</span>
            </div>
            <input
              type="range"
              min="-300"
              max="300"
              step="5"
              value={h}
              onChange={(e) => setH(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-[10px] text-foreground/50 mt-1">Positive: endothermic. Negative: exothermic.</p>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>$\Delta S$ (Entropy Change):</span>
              <span className="font-mono text-primary">{s} J/mol·K</span>
            </div>
            <input
              type="range"
              min="-500"
              max="500"
              step="10"
              value={s}
              onChange={(e) => setS(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-[10px] text-foreground/50 mt-1">Positive: increasing disorder. Negative: decreasing disorder.</p>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Temperature ($T$):</span>
              <span className="font-mono text-primary">{t} K</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={t}
              onChange={(e) => setT(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-[10px] text-foreground/50 mt-1">{t - 273} °C</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center p-6 bg-primary/5 rounded-xl border border-primary/20">
          <div className="text-center mb-6">
            <p className="text-xs font-bold uppercase text-foreground/60 mb-1">Calculated $\Delta G$</p>
            <p className={`text-4xl font-black ${isSpontaneous ? 'text-green-500' : 'text-red-500'}`}>
              {g.toFixed(2)} kJ/mol
            </p>
          </div>

          <div className={`px-6 py-3 rounded-2xl text-lg font-bold text-center ${isSpontaneous ? 'bg-green-500/20 text-green-600 border border-green-500/30' : 'bg-red-500/20 text-red-600 border border-red-500/30'}`}>
            {isSpontaneous ? '✅ SPONTANEOUS' : '❌ NON-SPONTANEOUS'}
          </div>

          <div className="mt-6 text-[10px] text-center text-foreground/60 leading-relaxed italic">
            Spontaneity occurs when $\Delta G &lt; 0$. This depends on the balance between "heat release" and "disorder increase."
          </div>
        </div>
      </div>
    </div>
  );
}
