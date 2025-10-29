import { useState } from 'react';
import { parseJSON } from '../utils/jsonParser';
import { buildTreeData } from '../utils/treeBuilder';

export const useJSONParser = () => {
  const [treeData, setTreeData] = useState(null);
  const [error, setError] = useState('');

  const visualize = (jsonInput) => {
    const result = parseJSON(jsonInput);
    
    if (result.success) {
      const tree = buildTreeData(result.data);
      setTreeData(tree);
      setError('');
      return { success: true, tree };
    } else {
      setTreeData(null);
      setError(result.error);
      return { success: false, error: result.error };
    }
  };

  const clear = () => {
    setTreeData(null);
    setError('');
  };

  return {
    treeData,
    error,
    visualize,
    clear
  };
};