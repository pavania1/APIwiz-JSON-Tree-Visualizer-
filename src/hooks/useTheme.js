import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  const theme = {
    bgColor: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    textColor: darkMode ? 'text-gray-100' : 'text-gray-900',
    cardBg: darkMode ? 'bg-gray-800' : 'bg-white',
    inputBg: darkMode ? 'bg-gray-700' : 'bg-gray-50',
    borderColor: darkMode ? 'border-gray-700' : 'border-gray-200'
  };

  return {
    darkMode,
    toggleTheme,
    theme
  };
};