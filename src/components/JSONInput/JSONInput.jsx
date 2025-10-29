import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '../UI/Button';
import { SAMPLE_JSON } from '../../utils/constants';

export const JSONInput = ({ onVisualize, onClear, theme }) => {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(SAMPLE_JSON, null, 2));
  const [error, setError] = useState('');

  const handleVisualize = () => {
    const result = onVisualize(jsonInput);
    if (result.success) {
      setError('');
    } else {
      setError(result.error);
    }
  };

  const handleClear = () => {
    setJsonInput('');
    setError('');
    onClear();
  };

  const { cardBg, borderColor, inputBg, textColor } = theme;

  return (
    <div className={`${cardBg} rounded-lg shadow-lg p-6 border ${borderColor}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">JSON Input</h2>
        <button
          onClick={handleClear}
          className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
          title="Clear All"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        className={`w-full h-64 p-3 ${inputBg} rounded-lg border ${borderColor} font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${textColor}`}
        placeholder="Paste your JSON here..."
      />
      
      {error && (
        <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Button 
        onClick={handleVisualize}
        className="w-full mt-4"
      >
        Visualize Tree
      </Button>
    </div>
  );
};