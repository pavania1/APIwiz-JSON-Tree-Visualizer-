import React from 'react';
import { NODE_COLORS } from '../../utils/constants';

export const Legend = ({ theme }) => {
  const { cardBg, borderColor } = theme;

  const legendItems = [
    { color: NODE_COLORS.object, label: 'Object' },
    { color: NODE_COLORS.array, label: 'Array' },
    { color: NODE_COLORS.primitive, label: 'Primitive' },
    { color: NODE_COLORS.highlight, label: 'Highlighted (Search Result)' }
  ];

  return (
    <div className={`${cardBg} rounded-lg shadow-lg p-6 border ${borderColor}`}>
      <h3 className="text-lg font-semibold mb-3">Legend & Controls</h3>
      <div className="flex flex-wrap gap-4 mb-4">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
      <p className="text-sm opacity-70">
        💡 Tip: Click any node to copy its JSON path • Drag to pan • Use zoom controls
      </p>
    </div>
  );
};