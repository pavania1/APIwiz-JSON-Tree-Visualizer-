import React from 'react';

export const Input = ({ 
  value, 
  onChange, 
  placeholder, 
  onKeyPress,
  className = '',
  theme = {}
}) => {
  const { inputBg = 'bg-gray-50', borderColor = 'border-gray-200', textColor = 'text-gray-900' } = theme;

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      className={`flex-1 px-3 py-2 ${inputBg} rounded-lg border ${borderColor} text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${textColor} ${className}`}
      placeholder={placeholder}
    />
  );
};