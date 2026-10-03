# Exploration: review-and-score-portfolio

Source: sdd-explore report (source read only; build, Lighthouse and browser NOT run, so perf and contrast numbers are estimates). Persisted by the orchestrator because the subagent could not write it.

## Current State
- Vue 3 + vite-ssg + Tailwind 3 + GSAP, 7 sections (hero, about, experience, projects, skills, education, contact); non-hero sections are lazy `defineAsyncComponent`.
- ES/EN via module-level ref in `useLanguage.ts`, plus `translations.ts` and `cvData.ts`.
- No tests, no CI, no lint. Only verification: `vue-tsc -b`.

## Provisional rubric (0-10, weight)
| Category | Weight | Score | Key evidence |
|---|---|---|---|
| Design/UX | 15% | 8.0 | Cohesive editorial identity; odd `hover:bg-surface-high` on primary buttons; "Read more" only on hover (invisible on touch) |
| Accessibility | 15% | 5.0 | Cards not keyboard-focusable; modal lacks role/aria-modal/Esc/focus trap; muted text contrast ~2.4-2.9:1; duplicate h1; no skip link |
| Performance | 10% | 6.5 | Async chunks, SSG; GSAP as `any`, ~60-path inline SVG, render-blocking Fonts CSS (unmeasured) |
| SEO/meta | 12% | 6.5 | No og:image/twitter:image; twitter:card conflict; hreflang all same URL; fake SearchAction; static `lang="es"`; phone/email exposed |
| Responsive/mobile | 10% | 8.0 | clamp() type, 44px targets (commit 9a29e9e); not device-verified |
| i18n ES/EN | 10% | 5.5 | ~27 inline ternaries in components; no persistence/detection; SSG only in ES |
| Code quality | 15% | 5.5 | Dead code (useDarkMode, useTheme, ProjectPlaceholder, BuildingNowPanel, vue.svg); "use client" leftover; zero tests; `@unhead/vue` in devDependencies but used at runtime |
| Content | 13% | 7.0 | Strong RiskTrail narrative; missing IoT.png; generic copy; few demos/screenshots |

Weighted total: ~6.7-6.9 / 10.

## Approaches
1. Static source-based rubric (done) — low effort, estimates only.
2. Source review + measured audits (build, Lighthouse, axe, bundle analysis) — medium effort, defensible numbers.
3. Score + prioritized fix backlog — medium effort, actionable.

## Recommendation
Approach 2 for scoring, plus a short prioritized fix list from 3. Top fixes: (1) og:image + twitter:card, (2) contrast tokens + keyboard-accessible cards/modal, (3) dedupe h1, fix hreflang, set lang at pre-render, (4) delete dead code, fix missing IoT.png, (5) persist/detect language, move ternaries into translations.ts.

## Risks
- Numbers inferred from source, not measured.
- About, Experience, Skills, Education, Contact, Footer, Header, translations.ts and style.css only grep-checked.
- Dead-code status of useDarkMode/useTheme unconfirmed.
- Weights are subjective; contact data exposure is a user-preference call.

## Open questions for the user
(a) one overall number vs per-category scorecard, (b) run live audits (build, Lighthouse)?, (c) report only or also fixes?
