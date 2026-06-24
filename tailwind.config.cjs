/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Source Serif 4', 'serif'],
        mono: ['Special Elite', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        'bg-dark': 'var(--bg-dark)',
        surface: 'var(--surface)',
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
          faint: 'var(--ink-faint)',
        },
        paper: 'var(--paper)',
        accent: {
          DEFAULT: 'var(--accent)',
          dim: 'var(--accent-dim)',
        },
        border: 'var(--border)',
      },
      boxShadow: {
        hard: 'var(--shadow-hard)',
        'hard-lg': 'var(--shadow-hard-lg)',
      },
    },
  },
  plugins: [],
}
