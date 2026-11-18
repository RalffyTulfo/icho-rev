import React, { useState } from 'react';

export default function CalorimetrySimulator() {
  // Mode: 'pressure' (constant-pressure coffee cup) vs 'bomb' (constant-volume bomb calorimeter)
  const [mode, setMode] = useState('pressure');

  // Simulation inputs
  const [mass, setMass] = useState(100); // grams of water
  const [tempInit, setTempInit] = useState(25); // °C
  const [heatAdded, setHeatAdded] = useState(2000); // Joules added
  const [substance, setSubstance] = useState('water'); // 'water' (4.184) or 'ethanol' (2.44) or 'methanol' (2.53)

  const specificHeat = substance === 'water' ? 4.184 : substance === 'ethanol' ? 2.44 : 2.53;

  // Calorimetry Calculations
  // q = m * c * deltaT => deltaT = q / (m * c)
  const deltaT = heatAdded / (mass * specificHeat);
  const tempFinal = tempInit + deltaT;

  // PV Work simulation for expansion / compression
  // W = -P * deltaV
  const [pressure, setPressure] = useState(1.0); // atm
  const [volInit, setVolInit] = useState(10); // Liters
  const [volFinal, setVolFinal] = useState(25); // Liters

  // 1 L·atm = 101.325 Joules
  const deltaV = volFinal - volInit;
  const workJoules = -pressure * deltaV * 101.325;
  const internalEnergyChange = heatAdded + workJoules;

  return (
    <div className="frosted-glass p-6 rounded-2xl my-6 border border-primary/20 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold">
            Calorimetry & PV-Work Simulator
          </span>
          <h3 className="text-xl font-bold mt-2">Thermodynamic Energy Exchange</h3>
          <p className="text-sm text-foreground/70">Explore heat flow ($q_p$ vs $q_v$) and expansion work ($w = -P\Delta V$).</p>
        </div>

        <div className="flex bg-foreground/10 p-1 rounded-xl">
          <button
            onClick={() => setMode('pressure')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              mode === 'pressure' ? 'bg-primary text-white shadow' : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            Constant-Pressure ($q_p = \Delta H$)
          </button>
          <button
            onClick={() => setMode('bomb')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              mode === 'bomb' ? 'bg-primary text-white shadow' : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            Bomb Calorimeter ($q_v = \Delta U$)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls Column */}
        <div className="space-y-6 bg-foreground/5 p-5 rounded-xl border border-foreground/10">
          <h4 className="text-sm font-bold uppercase tracking-wider text-primary">System Parameters</h4>

          {mode === 'pressure' ? (
            <>
              <div>
                <label className="text-xs font-semibold block mb-1">Substance Liquid</label>
                <select
                  value={substance}
                  onChange={(e) => setSubstance(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-foreground/10 border border-foreground/20 text-sm font-medium"
                >
                  <option value="water">Water (c = 4.184 J/g·°C)</option>
                  <option value="ethanol">Ethanol (c = 2.44 J/g·°C)</option>
                  <option value="methanol">Methanol (c = 2.53 J/g·°C)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Solution Mass ($m$):</span>
                  <span className="font-mono">{mass} g</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </>
          ) : (
            <div className="p-3 bg-secondary/10 rounded-lg text-xs font-medium text-secondary-foreground">
              🛡️ Constant-Volume Bomb Calorimeter: Volume is locked ($V = \text{constant}, \Delta V = 0, w = 0$). All heat released directly alters internal energy ($\Delta U = q_v$).
            </div>
          )}

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Heat Added ($q$):</span>
              <span className="font-mono">{(heatAdded / 1000).toFixed(2)} kJ ({(heatAdded).toFixed(0)} J)</span>
            </div>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={heatAdded}
              onChange={(e) => setHeatAdded(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          {mode === 'pressure' && (
            <div className="pt-4 border-t border-foreground/10 space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-secondary">Expansion Work ($P-V$)</h5>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>External Pressure ($P$):</span>
                  <span className="font-mono">{pressure} atm</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.5"
                  value={pressure}
                  onChange={(e) => setPressure(Number(e.target.value))}
                  className="w-full accent-secondary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold block mb-1">Initial Vol ($V_1$ L)</label>
                  <input
                    type="number"
                    value={volInit}
                    onChange={(e) => setVolInit(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-foreground/10 border border-foreground/20 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Final Vol ($V_2$ L)</label>
                  <input
                    type="number"
                    value={volFinal}
                    onChange={(e) => setVolFinal(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-foreground/10 border border-foreground/20 text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Visualization & Outputs Column */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="bg-primary/10 border border-primary/30 p-6 rounded-2xl flex-1 flex flex-col justify-center">
            <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Real-time Thermodynamic Ledger</h4>

            <div className="space-y-4 font-mono">
              <div className="flex justify-between items-center pb-2 border-b border-primary/20">
                <span className="text-xs font-sans font-semibold text-foreground/70">Initial Temperature ($T_1$)</span>
                <span className="text-lg font-bold">{tempInit.toFixed(1)} °C</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-primary/20">
                <span className="text-xs font-sans font-semibold text-foreground/70">Temperature Change ($\Delta T$)</span>
                <span className="text-lg font-bold text-success">+{deltaT.toFixed(2)} °C</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-primary/20">
                <span className="text-xs font-sans font-semibold text-foreground/70">Final Temperature ($T_2$)</span>
                <span className="text-lg font-bold">{tempFinal.toFixed(1)} °C</span>
              </div>

              {mode === 'pressure' && (
                <>
                  <div className="flex justify-between items-center pb-2 border-b border-primary/20">
                    <span className="text-xs font-sans font-semibold text-foreground/70">Expansion Work ($w = -P\Delta V$)</span>
                    <span className="text-lg font-bold text-secondary">{workJoules.toFixed(1)} J</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-sans font-semibold text-foreground/70">Internal Energy Change ($\Delta U = q + w$)</span>
                    <span className="text-xl font-extrabold text-primary">{internalEnergyChange.toFixed(1)} J</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-foreground/5 border border-foreground/10 text-xs text-foreground/80 leading-relaxed">
            <span className="font-bold text-primary">💡 IChO Insight:</span> In constant-pressure calorimetry ($q_p$), heat equals enthalpy change ($\Delta H$). In bomb calorimetry ($q_v$), volume is fixed so no expansion work occurs, meaning heat equals internal energy change ($\Delta U$).
          </div>
        </div>
      </div>
    </div>
  );
}
