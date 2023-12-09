/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      
    },
    colors: {
      white: '#ffffff',
      
      'silvergray-50': '#f9fafb',
      'silvergray-100': '#f3f4f6',
      'silvergray-200': '#e5e7eb',
      'silvergray-300': '#E1E1E6',
      'silvergray-400': '#C4C4CC',
      'silvergray-500': '#8D8D99',
      'silvergray-600': '#7C7C8A',
  
      'blueApp-700': '#3b82f6',
      'blueApp-600': '#60a5fa',
      'blueApp-500': '#93c5fd',
    },
  },
  
  plugins: [],
}
