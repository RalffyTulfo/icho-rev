import React, { useState } from 'react';

const QualitativeAnalysisInteractive = () => {
  const [selectedIon, setSelectedIon] = useState(null);
  const [flameTestResult, setFlameTestResult] = useState(null);
  const [precipitationTestResult, setPrecipitationTestResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const ions = [
    { name: 'Na+', flameColor: 'yellow', precipitation: 'white' },
    { name: 'K+', flameColor: 'lilac', precipitation: 'white' },
    { name: 'Ca2+', flameColor: 'brick red', precipitation: 'white' },
    { name: 'Cu2+', flameColor: 'blue-green', precipitation: 'blue' },
    { name: 'Fe2+', flameColor: 'green', precipitation: 'green' },
    { name: 'Fe3+', flameColor: 'yellow-orange', precipitation: 'brown' }
  ];

  const handleIonSelect = (ion) => {
    setSelectedIon(ion);
    setFlameTestResult(null);
    setPrecipitationTestResult(null);
    setShowResults(false);
  };

  const performFlameTest = () => {
    if (selectedIon) {
      setFlameTestResult(selectedIon.flameColor);
    }
  };

  const performPrecipitationTest = () => {
    if (selectedIon) {
      setPrecipitationTestResult(selectedIon.precipitation);
    }
  };

  const checkResults = () => {
    setShowResults(true);
  };

  return (
    <div className="qualitative-analysis-interactive p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Qualitative Analysis Interactive</h2>

      <div className="mb-4">
        <p className="mb-2">Select an unknown ion to analyze:</p>
        <div className="flex flex-wrap gap-2">
          {ions.map((ion) => (
            <button
              key={ion.name}
              onClick={() => handleIonSelect(ion)}
              className={`px-3 py-1 rounded ${selectedIon?.name === ion.name ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {ion.name}
            </button>
          ))}
        </div>
      </div>

      {selectedIon && (
        <div className="mb-4">
          <p className="mb-2">Selected ion: {selectedIon.name}</p>

          <div className="flex gap-4 mb-4">
            <button
              onClick={performFlameTest}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Perform Flame Test
            </button>

            <button
              onClick={performPrecipitationTest}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Perform Precipitation Test
            </button>
          </div>

          {flameTestResult && (
            <div className="mb-2">
              <p>Flame test result: <span className={`font-bold ${flameTestResult === selectedIon.flameColor ? 'text-green-600' : 'text-red-600'}`}>{flameTestResult}</span></p>
            </div>
          )}

          {precipitationTestResult && (
            <div className="mb-2">
              <p>Precipitation test result: <span className={`font-bold ${precipitationTestResult === selectedIon.precipitation ? 'text-green-600' : 'text-red-600'}`}>{precipitationTestResult}</span></p>
            </div>
          )}

          {(flameTestResult || precipitationTestResult) && (
            <button
              onClick={checkResults}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Check Results
            </button>
          )}
        </div>
      )}

      {showResults && selectedIon && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold mb-2">Analysis Results</h3>
          <p>Flame test: {flameTestResult === selectedIon.flameColor ? '✅ Correct' : '❌ Incorrect'}</p>
          <p>Precipitation test: {precipitationTestResult === selectedIon.precipitation ? '✅ Correct' : '❌ Incorrect'}</p>
          <p className="mt-2">The unknown ion is: <span className="font-bold">{selectedIon.name}</span></p>
        </div>
      )}
    </div>
  );
};

export default QualitativeAnalysisInteractive;