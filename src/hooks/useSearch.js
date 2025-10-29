import { useState } from 'react';
import { findNodeByPath } from '../utils/treeBuilder';

export const useSearch = (treeData) => {
  const [searchPath, setSearchPath] = useState('');
  const [highlightedPath, setHighlightedPath] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');

  const search = () => {
    if (!searchPath.trim()) {
      setSearchMessage('Please enter a search path');
      return { found: false };
    }

    if (!treeData) {
      setSearchMessage('Please visualize JSON first');
      return { found: false };
    }

    const normalizedSearch = searchPath.trim();
    
    if (findNodeByPath(treeData, normalizedSearch)) {
      setHighlightedPath(normalizedSearch);
      setSearchMessage('Match found!');
      return { found: true, path: normalizedSearch };
    } else {
      setHighlightedPath(null);
      setSearchMessage('No match found');
      return { found: false };
    }
  };

  const clearSearch = () => {
    setSearchPath('');
    setHighlightedPath(null);
    setSearchMessage('');
  };

  return {
    searchPath,
    setSearchPath,
    highlightedPath,
    searchMessage,
    search,
    clearSearch
  };
};