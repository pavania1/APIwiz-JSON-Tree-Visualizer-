import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, Download } from 'lucide-react';
import { IconButton } from '../UI/IconButton';
import { useTreeRenderer } from '../../hooks/useTreeRenderer';
import { downloadAsPNG } from '../../services/exportService';

export const TreeVisualization = ({ 
  treeData, 
  highlightedPath, 
  darkMode,
  theme 
}) => {
  const { svgRef, containerRef, zoomIn, zoomOut, fitView } = useTreeRenderer(
    treeData,
    highlightedPath,
    darkMode
  );

  const handleDownload = () => {
    downloadAsPNG(svgRef.current, darkMode);
  };

  const { cardBg, borderColor } = theme;

  return (
    <div 
      className={`${cardBg} rounded-lg shadow-lg border ${borderColor} relative`} 
 style={{ height: '700px' }}
    >
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <IconButton icon={ZoomIn} onClick={zoomIn} title="Zoom In" />
        <IconButton icon={ZoomOut} onClick={zoomOut} title="Zoom Out" />
        <IconButton icon={Maximize2} onClick={fitView} title="Fit View" />
        <IconButton 
          icon={Download} 
          onClick={handleDownload} 
          title="Download as Image" 
          variant="purple"
        />
      </div>

      <div ref={containerRef} className="w-full h-full">
        <svg 
          ref={svgRef} 
          style={{ background: darkMode ? '#1F2937' : '#F9FAFB' }}
        />
      </div>

      {!treeData && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-gray-400 text-lg">
            Enter JSON and click "Visualize Tree" to begin
          </p>
        </div>
      )}
    </div>
  );
};