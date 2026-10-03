# Apply Progress: review-and-score-portfolio

Mode: standard (report-only, no TDD; no test framework). Date: 2026-10-01.

## Completed tasks
All of Phases 1-5 (1.1-1.3, 2.1-2.7, 3.1-3.2, 4.1-4.3, 4.4, 5.1) marked `[x]` in tasks.md.

## Files created
- `keel/changes/review-and-score-portfolio/scorecard.md`
- `keel/changes/review-and-score-portfolio/fix-backlog.md`
- `keel/changes/review-and-score-portfolio/apply-progress.md`
(`tasks.md` only had checkboxes updated.) No change to `src/`, `public/`, `index.html`, `package.json` or config.

## Result
Weighted total 7.94 / 10; unweighted mean 8.00. Scores: Design 8.5, A11y 6.1 (provisional), Code 8.0, Content 8.0, SEO 8.5, Perf 8.9, Responsive 8.5, i18n 7.5. Weights sum 100; weighted points 794.0.

## Corrections to exploration (found by reading source)
- `useTheme.ts` is NOT dead (`AppHeader.vue:5,11`).
- Inline ES/EN ternaries: 31 in components (not ~27): 30 deducted + 1 identical-branch (`HeroSection.vue:180`); excludes 6 in `App.vue` head and 2 in `useLanguage.ts`.
- "No skip link" is wrong (`AppHeader.vue:86-91`).
- "Static lang" partly wrong (reactive at `App.vue:59-61`).
- New finding: contact form uses placeholder key `YOUR_WEB3FORMS_ACCESS_KEY` (`ContactSection.vue:222`).
- 13 unused translation keys; project `image` field never rendered (IoT.png missing but unused).

## Deviations
- A11y computes to 6.1 by the stated severity scale; clarify Q2 expected roughly 7.0-7.5. Explained in scorecard section 7.
- Backlog has 29 rows (design expected about 14) because rows are one per distinct deduction group; none padded.
- Task 5.1: transient `dist/` (gitignored, from audit builds) left in place, not deleted; owner can remove.

## Verification (Phase 4)
- 4.1 arithmetic recomputed: weights 15+15+15+13+12+10+10+10=100; 127.5+91.5+120+104+102+89+85+75=794.0; mean 64.0/8=8.00.
- 4.2 medians match spec (mobile 94/96/100/100, desktop 100/96/100/100); all rows have weight, score, basis; backlog 29 rows with all fields.
- 4.3 `fd` on every cited path: all exist except the deliberately missing `public/proyectos/IoT.png`.
- 4.4 `git status`: only `?? keel/`.

## Remaining
None. next_recommended: sdd-verify. Not staged or committed.
