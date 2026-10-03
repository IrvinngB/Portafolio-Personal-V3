# Tech
Last refreshed: 2026-10-01
- Vue 3.5 + TypeScript 5.9, Vite 7, vite-ssg (static build), Tailwind 3.4 + PostCSS, GSAP 3, lucide-vue-next, @vueuse/core, @unhead/vue.
- Scripts: `npm run dev` (vite), `npm run build` (vue-tsc -b && vite-ssg build), `npm run preview`.
- Typecheck only via vue-tsc (part of build). No tests, lint, formatter, or CI. strict_tdd=false.
- Conventions: conventional commits; code/comments in English.
- Note: `@unhead/vue` sits in devDependencies but is imported at runtime (App.vue); `@types/gsap` is redundant (gsap ships types, GSAP typed as `any` in useHeroAnimation).
- Build verified 2026-10-01 (`npm ci` then `npm run build` passes; first failure was a corrupted node_modules, not source). Warning: stray `"use client"` in useLanguage.ts.
- Lighthouse medians of 5 (local preview): mobile 94/96/100/100, desktop 100/96/100/100 (Perf/A11y/BP/SEO). Mobile LCP 2.60 s.
- Known gap: `text-muted` token (style.css:18,52) fails contrast 4.5:1 in both themes.
- SSG prerenders ES only; hreflang all point to one URL.
