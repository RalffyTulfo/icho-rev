import React, { useState } from 'react';

const QuantitativeAnalysisInteractive = () => {
  const [sampleMass, setSampleMass] = useState(0.5);
  const [precipitateMass, setPrecipitateMass] = useState(0);
  const [calculatedPercentage, setCalculatedPercentage] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const calculatePercentage = () => {
    // AgNO3 + NaCl → AgCl + NaNO3
    // Molar mass of AgCl: 143.32 g/mol
    // Molar mass of NaCl: 58.44 g/mol

    const molesAgCl = precipitateMass / 143.32;
    const molesNaCl = molesAgCl; // 1:1 stoichiometry
    const massNaCl = molesNaCl * 58.44;
    const percentageNaCl = (massNaCl / sampleMass) * 100;

    setCalculatedPercentage(percentageNaCl.toFixed(1));
    setShowResults(true);
  };

  return (
    <div className="quantitative-analysis-interactive p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Quantitative Analysis Interactive</h2>

      <div className="mb-4">
        <p className="mb-2">Enter the mass of the sample (g):</p>
        <input
          type="number"
          value={sampleMass}
          onChange={(e) => setSampleMass(parseFloat(e.target.value))}
          className="w-20 px-2 py-1 border rounded"
          step="0.01"
        />
      </div>

      <div className="mb-4">
        <p className="mb-2">Enter the mass of the precipitate (g):</p>
        <input
          type="number"
          value={precipitateMass}
          onChange={(e) => setPrecipitateMass(parseFloat(e.target.value))}
          className="w-20 px-2 py-1 border rounded"
          step="0.01"
        />
      </div>

      <button
        onClick={calculatePercentage}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Calculate Percentage
      </button>

      {showResults && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold mb-2">Results</h3>
          <p>The calculated percentage of NaCl in the sample is: <span className="font-bold">{calculatedPercentage}%</span></p>
          <p className="mt-2">This interactive demonstrates the gravimetric analysis technique used in quantitative chemistry.</p>
        </div>
      )}
    </div>
  );
};

export default QuantitativeAnalysisInteractive;