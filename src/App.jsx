import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { JSONInput } from './components/JSONInput/JSONInput';
import { SearchPanel } from './components/SearchPanel/SearchPanel';
import { TreeVisualization } from './components/TreeVisualization/TreeVisualization';
import { Legend } from './components/Legend/Legend';
import { useJSONParser } from './hooks/useJSONParser';
import { useSearch } from './hooks/useSearch';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { darkMode, toggleTheme, theme } = useTheme();
  const { treeData, visualize, clear } = useJSONParser();
  const { 
    searchPath, 
    setSearchPath, 
    highlightedPath, 
    searchMessage, 
    search,
    clearSearch 
  } = useSearch(treeData);

  const handleClear = () => {
    clear();
    clearSearch();
  };

  return (
    <div className={`min-h-screen ${theme.bgColor} ${theme.textColor} transition-colors duration-200`}>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">JSON Tree Visualizer</h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${theme.cardBg} border ${theme.borderColor} hover:opacity-80 transition-opacity`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="lg:col-span-1 space-y-4 sm:space-y-0">
            <JSONInput 
              onVisualize={visualize}
              onClear={handleClear}
              theme={theme}
            />
            <SearchPanel
              searchPath={searchPath}
              setSearchPath={setSearchPath}
              onSearch={search}
              searchMessage={searchMessage}
              theme={theme}
            />
          </div>

          <div className="lg:col-span-2">
            <TreeVisualization
              treeData={treeData}
              highlightedPath={highlightedPath}
              darkMode={darkMode}
              theme={theme}
            />
          </div>
        </div>

        <Legend theme={theme} />
      </div>
    </div>
  );
}