import React from 'react';

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white'
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};