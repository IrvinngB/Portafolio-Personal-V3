/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        fg: {
          DEFAULT: 'var(--fg)',
          soft: 'var(--fg-soft)',
        },
        border: 'var(--border)',
        accent: {
          yellow: 'var(--accent-yellow)',
          pink: 'var(--accent-pink)',
          teal: 'var(--accent-teal)',
          purple: 'var(--accent-purple)',
          blue: 'var(--accent-blue)',
        },
      },
      boxShadow: {
        offset: 'var(--shadow-offset)',
        'offset-hover': 'var(--shadow-offset-hover)',
        sticker: 'var(--shadow-sticker)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
        btn: 'var(--radius-btn)',
        photo: 'var(--radius-photo)',
        pill: 'var(--radius-pill)',
      },
    },
  },
  plugins: [],
}
