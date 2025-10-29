import React from 'react';

export const IconButton = ({ 
  icon: Icon, 
  onClick, 
  title, 
  variant = 'primary',
  className = '' 
}) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    success: 'bg-green-600 hover:bg-green-700',
    danger: 'bg-red-500 hover:bg-red-600',
    purple: 'bg-purple-600 hover:bg-purple-700'
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg text-white transition-colors shadow-lg ${variants[variant]} ${className}`}
      title={title}
    >
      <Icon size={18} />
    </button>
  );
};