/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sidebar: '#0b2b5c',
        'sidebar-hover': '#123a73',
        'sidebar-active': '#1e63d6',
        page: '#f1f5f9',
      },
    },
  },
  plugins: [],
};