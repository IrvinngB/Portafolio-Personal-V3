# Tasks: Review and Score Portfolio

## Review Workload Forecast

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

Estimated changed lines: 250-350 (two new Markdown files) · Delivery strategy: ask-on-risk

Report-only: no edits to `src/`, `public/`, `index.html`, `package.json` or config.

## Phase 1: Foundation

- [x] 1.1 Read in full (locate with `fd`): About, Experience, Skills, Education, Contact sections, `AppHeader.vue`, `AppFooter.vue`, `translations.ts`, `style.css`. Record `path:line` for hardcoded copy and `text-muted` values.
- [x] 1.2 Recount ES/EN inline ternaries (~27 claimed) with `rg`. Fix the i18n, Code and Content deductions to the confirmed count.
- [x] 1.3 Re-verify with `rg`: dead files (useDarkMode.ts, ProjectPlaceholder.vue, BuildingNowPanel.vue, vue.svg), useTheme.ts imported at `AppHeader.vue:5`, `/proyectos/IoT.png` absent.

## Phase 2: Core Implementation

- [x] 2.1 Create `scorecard.md`: summary (weighted total, unweighted mean, 2026-10-01), method, weights 15/15/15/13/12/10/10/10.
- [x] 2.2 In `scorecard.md`: build "pass 2026-10-01 after `npm ci`" (TS6053 = corrupted install), "use client" warning finding, 5-run Lighthouse medians (both form factors, LCP/FCP/CLS/TBT).
- [x] 2.3 In `scorecard.md`: axe by severity (light 8 nodes, dark 5, `text-muted` cause, 2 name mismatches), using the worse light result.
- [x] 2.4 In `scorecard.md`: deduction tables (`Deduction | Points | Evidence`). Bases: Perf 9.4, A11y 9.6, SEO 10.0. Points: High 1.0, Med 0.5, Low 0.25. Basis labels, A11y provisional, estimate-vs-measured explanation.
- [x] 2.5 In `scorecard.md`: "Not audited" with exactly four items: Lighthouse a11y light (not run), live URL, interaction states, ES/EN runs.
- [x] 2.6 Create `fix-backlog.md`: ranking rule, 10+ rows with all seven fields plus score gain, each tied to a scorecard deduction.
- [x] 2.7 In `fix-backlog.md`: dead-code item ("no import references found"), `@unhead/vue` Low, deferred light-theme/live-URL follow-up, phone/email "owner decision" (`index.html:101-102`, `AppFooter.vue:45-46`), useTheme.ts "not confirmed", "no fixes applied".

## Phase 3: Integration / Wiring

- [x] 3.1 Cross-link both files and cite `audit-results.md` without editing it.
- [x] 3.2 Do NOT stage or commit the new files unless the owner asks.

## Phase 4: Testing

- [x] 4.1 Recompute arithmetic: weights sum 100; each score (base minus deductions, one decimal); weighted total; unweighted mean.
- [x] 4.2 Check spec scenarios: medians match (mobile 94/96/100/100, desktop 100/96/100/100), every row has weight, score and basis label, backlog has 10+ complete rows.
- [x] 4.3 Run `fd` on every path cited in both files; all must exist except the deliberately missing `IoT.png`.
- [x] 4.4 Run `git status`: only untracked `keel/` may appear.

## Phase 5: Cleanup

- [x] 5.1 Remove transient `dist/` if rebuilt; tell the owner commit/ignore of `keel/` is theirs to decide.
