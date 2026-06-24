/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Lora', 'serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['Cascadia Code', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        surface: {
          DEFAULT: 'var(--surface)',
          container: 'var(--surface-container)',
          high: 'var(--surface-high)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          dim: 'var(--accent-dim)',
          border: 'var(--accent-border)',
          fg: 'var(--accent-fg)',
        },
        fg: {
          DEFAULT: 'var(--fg)',
          soft: 'var(--fg-soft)',
        },
        muted: 'var(--muted)',
        border: {
          DEFAULT: 'var(--border)',
          soft: 'var(--border-soft)',
        },
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        xxl: 'var(--radius-xxl)',
        full: 'var(--radius-full)',
      },
      transitionTimingFunction: {
        'ease-out': 'var(--ease-out)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
      },
    },
  },
  plugins: [],
}
