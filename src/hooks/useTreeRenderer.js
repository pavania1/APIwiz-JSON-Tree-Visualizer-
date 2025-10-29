import { useRef, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import { createD3Tree } from '../utils/treeRenderer';

export const useTreeRenderer = (treeData, highlightedPath, darkMode) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const zoomRef = useRef(null);

  const renderTree = useCallback(() => {
    if (!treeData || !svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const onNodeClick = (nodeData) => {
      navigator.clipboard.writeText(nodeData.path);
      alert(`Path copied: ${nodeData.path}`);
    };

    const { zoom } = createD3Tree(svgRef.current, treeData, {
      width,
      height,
      darkMode,
      highlightPath: highlightedPath,
      onNodeClick
    });

    zoomRef.current = zoom;
  }, [treeData, highlightedPath, darkMode]);

  useEffect(() => {
    renderTree();

    const handleResize = () => renderTree();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderTree]);

  const zoomIn = () => {
    if (zoomRef.current && svgRef.current) {
      d3.select(svgRef.current).transition().call(zoomRef.current.scaleBy, 1.3);
    }
  };

  const zoomOut = () => {
    if (zoomRef.current && svgRef.current) {
      d3.select(svgRef.current).transition().call(zoomRef.current.scaleBy, 0.7);
    }
  };

  const fitView = () => {
    if (zoomRef.current && svgRef.current && containerRef.current) {
      const height = containerRef.current.clientHeight;
      const initialTransform = d3.zoomIdentity.translate(150, height / 2).scale(0.8);
      d3.select(svgRef.current)
        .transition()
        .duration(750)
        .call(zoomRef.current.transform, initialTransform);
    }
  };

  return {
    svgRef,
    containerRef,
    zoomIn,
    zoomOut,
    fitView
  };
};