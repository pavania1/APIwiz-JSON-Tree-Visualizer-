/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
        },
        success: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        danger: {
          DEFAULT: '#EF4444',
          dark: '#DC2626',
        }
      }
    },
  },
  plugins: [],
}