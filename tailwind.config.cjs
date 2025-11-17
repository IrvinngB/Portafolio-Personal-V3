/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3FA35B',
          dark: '#0A3D3D',
          light: '#B4D333',
          accent: '#C5D946'
        }
      }
    },
  },
  plugins: [],
}
