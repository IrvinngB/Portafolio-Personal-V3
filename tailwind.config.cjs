/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
          accent: 'var(--color-accent)'
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)'
        }
      }
    },
  },
  plugins: [],
}
