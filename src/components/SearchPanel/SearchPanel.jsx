import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { SEARCH_EXAMPLES } from '../../utils/constants';

export const SearchPanel = ({ 
  searchPath, 
  setSearchPath, 
  onSearch, 
  searchMessage,
  theme 
}) => {
  const { inputBg, borderColor } = theme;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Search by Path</h3>
      <div className="flex gap-2">
        <Input
          value={searchPath}
          onChange={(e) => setSearchPath(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          placeholder="e.g., $.user.address.city"
          theme={theme}
        />
        <Button 
          onClick={onSearch}
          variant="success"
        >
          <Search size={18} />
        </Button>
      </div>
      
      {searchMessage && (
        <div className={`mt-2 p-2 rounded-lg text-sm ${
          searchMessage.includes('found!') 
            ? 'bg-green-100 text-green-700 border border-green-400' 
            : 'bg-yellow-100 text-yellow-700 border border-yellow-400'
        }`}>
          {searchMessage}
        </div>
      )}

      <div className="mt-4">
        <p className="font-semibold mb-2 text-sm">Click to try these examples:</p>
        <div className="space-y-2">
          {SEARCH_EXAMPLES.map((example, index) => (
            <button
              key={index}
              onClick={() => setSearchPath(example.path)}
              className={`block w-full text-left px-3 py-2 ${inputBg} rounded border ${borderColor} text-xs hover:bg-blue-50 transition-colors`}
            >
              <span className="font-mono">{example.path}</span>
              <span className="text-gray-500 ml-2">→ {example.description}</span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs opacity-70">
         <strong> Path syntax:</strong> Start with <code className="bg-gray-200 px-1 rounded text-black">$</code>, 
          use <code className="bg-gray-200 px-1 rounded text-black">.</code> for objects, 
          <code className="bg-gray-200 px-1 rounded text-black">[index]</code> for arrays
        </p>
      </div>
    </div>
  );
};