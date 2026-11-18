import React, { useState } from 'react';

export default function FirstLawSimulator() {
  const [q, setQ] = useState(100); // Joules
  const [w, setW] = useState(-50); // Joules
  const [initialU, setInitialU] = useState(1000); // Joules

  const deltaU = q + w;
  const finalU = initialU + deltaU;

  return (
    <div className="frosted-glass p-6 rounded-2xl my-6 border border-primary/20 shadow-lg">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold">
          First Law Simulator
        </span>
        <h3 className="text-xl font-bold mt-2">Energy Balance: $\Delta U = q + w$</h3>
        <p className="text-sm text-foreground/70">Visualize how heat and work contribute to the internal energy change of a system.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 bg-foreground/5 p-5 rounded-xl border border-foreground/10">
          <h4 className="text-sm font-bold uppercase tracking-wider text-primary">Inputs</h4>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Heat added to system ($q$):</span>
              <span className="font-mono text-primary">{q} J</span>
            </div>
            <input
              type="range"
              min="-500"
              max="500"
              step="10"
              value={q}
              onChange={(e) => setQ(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-[10px] text-foreground/50 mt-1">Positive: heat enters. Negative: heat leaves.</p>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Work done ON system ($w$):</span>
              <span className="font-mono text-primary">{w} J</span>
            </div>
            <input
              type="range"
              min="-500"
              max="500"
              step="10"
              value={w}
              onChange={(e) => setW(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-[10px] text-foreground/50 mt-1">Positive: compression. Negative: expansion.</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center p-6 bg-primary/5 rounded-xl border border-primary/20">
          <div className="text-center mb-4">
            <p className="text-xs font-bold uppercase text-foreground/60 mb-1">Internal Energy Change</p>
            <p className={`text-4xl font-black ${deltaU >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {deltaU > 0 ? '+' : ''}{deltaU} J
            </p>
          </div>

          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between border-b border-foreground/10 pb-1">
              <span>Initial $U$</span>
              <span className="font-mono">{initialU} J</span>
            </div>
            <div className="flex justify-between border-b border-foreground/10 pb-1">
              <span>$\Delta U$</span>
              <span className={`font-mono ${deltaU >= 0 ? 'text-green-500' : 'text-red-500'}`}>{deltaU > 0 ? '+' : ''}{deltaU} J</span>
            </div>
            <div className="flex justify-between font-bold pt-1">
              <span>Final $U$</span>
              <span className="font-mono">{finalU} J</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
