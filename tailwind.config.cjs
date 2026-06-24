/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Share Tech Mono', 'VT323', 'monospace'],
        display: ['VT323', 'Share Tech Mono', 'monospace'],
        body: ['Share Tech Mono', 'VT323', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        phosphor: {
          DEFAULT: 'var(--phosphor)',
          dim: 'var(--phosphor-dim)',
          bright: 'var(--phosphor-bright)',
          glow: 'var(--phosphor-glow)',
        },
        amber: {
          DEFAULT: 'var(--amber)',
          dim: 'var(--amber-dim)',
        },
        error: 'var(--error)',
        fg: {
          DEFAULT: 'var(--fg)',
          dim: 'var(--fg-dim)',
        },
        border: {
          DEFAULT: 'var(--border)',
          active: 'var(--border-active)',
        },
      },
      boxShadow: {
        glow: 'var(--box-glow)',
        'glow-amber': 'var(--box-glow-amber)',
      },
      textShadow: {
        glow: 'var(--text-glow)',
        'glow-dim': 'var(--text-glow-dim)',
      },
    },
  },
  plugins: [],
}
