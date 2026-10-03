# Fix Backlog

Date: 2026-10-01 · Companion: [scorecard.md](./scorecard.md) · Evidence: [audit-results.md](./audit-results.md) (not edited)

**No fixes applied.** This is a report. Nothing under `src/`, `public/` or configuration was changed.

Count: 29 ranked items (more than the 10 required; all backed by distinct findings, so no padding). Two further entries are owner decisions or not confirmed and are listed separately.

## Ranking rule

Sort by (1) impact High > Med > Low (same scale as scorecard deduction points: High 1.0, Med 0.5, Low 0.25); (2) effort S before M before L; (3) measured evidence (Lighthouse/axe) before source-review only; (4) larger weighted score gain (points x category weight); (5) scorecard category order. Quick wins therefore rank above large work of equal impact.

Evidence: `LH` Lighthouse, `axe`, `SRC` source review. Score gain is the category score recovered if the deduction is fully removed (weighted gain in brackets is points x weight / 100 on the total).

## Ranked items

| Rank | Title | Category | Impact | Effort | Evidence | Files | Score gain | Deduction IDs |
|---|---|---|---|---|---|---|---|---|
| 1 | Replace placeholder Web3Forms key so the contact form delivers (use env var) | Design/UX | High | S | SRC | `src/components/ContactSection.vue:222` | Design +1.0 (+0.15) | D1 |
| 2 | Make project cards keyboard-operable (button or tabindex + Enter/Space) | Accessibility | High | S | SRC | `src/components/ProjectsSection.vue:21-27` | A11y +1.0 (+0.15) | A2 |
| 3 | Add modal semantics: `role="dialog"`, `aria-modal`, Esc, focus trap, focus return | Accessibility | High | M | SRC | `src/components/ProjectsSection.vue:96-100,177-187` | A11y +1.0 (+0.15) | A3 |
| 4 | Move 30 inline ES/EN ternaries into `translations.ts` | i18n | High | M | SRC | `src/components/ContactSection.vue`, `ProjectsSection.vue`, `HeroSection.vue`, `AppFooter.vue`, `AboutMeSection.vue`, `ExperienceSection.vue`, `EducationSection.vue`, `SkillsSection.vue`, `AppHeader.vue`, `src/data/translations.ts` | i18n +1.0 (+0.10) | L1 |
| 5 | Fix `text-muted` token to reach at least 4.5:1 in both themes (8 nodes light, 5 dark) | Accessibility | Med | S | axe | `src/style.css:18,52` | A11y +0.5 (+0.075) | A1 |
| 6 | Stop primary buttons turning dark on hover (use an accent variant) | Design/UX | Med | S | SRC | `src/components/HeroSection.vue:39`, `ContactSection.vue:82`, `ProjectsSection.vue:135` | Design +0.5 (+0.075) | D2 |
| 7 | Keep one `<h1>`; demote the header brand and second hero line | Accessibility | Med | S | SRC | `src/components/HeroSection.vue:13-14`, `src/components/AppHeader.vue:116` | A11y +0.5 (+0.075) | A4 |
| 8 | Delete confirmed dead code: `useDarkMode.ts`, `ProjectPlaceholder.vue`, `BuildingNowPanel.vue`, `vue.svg` (no import references found) | Code quality | Med | S | SRC | `src/composables/useDarkMode.ts`, `src/components/ProjectPlaceholder.vue`, `src/components/BuildingNowPanel.vue`, `src/assets/vue.svg` | Code +0.5 (+0.075) | Q1 |
| 9 | Add live-demo URLs (or state "no public demo") on projects | Content | Med | S | SRC | `src/data/cvData.ts:39,47,55,62` | Content +0.5 (+0.065) | T3 |
| 10 | Raise the smallest type sizes (10-12px) to 12-14px on mobile | Responsive | Med | S | SRC | `src/style.css:66,68-70` | Responsive +0.5 (+0.05) | R1 |
| 11 | Show the "Read more" cue without hover (always visible on touch) | Responsive | Med | S | SRC | `src/components/ProjectsSection.vue:72` | Responsive +0.5 (+0.05) | R2 |
| 12 | Persist the language choice and detect `navigator.language` | i18n | Med | S | SRC | `src/composables/useLanguage.ts:8` | i18n +0.5 (+0.05) | L4 |
| 13 | Render project screenshots (use the `image` field) | Content | Med | M | SRC | `src/components/ProjectsSection.vue`, `src/data/cvData.ts:46`, `src/types/index.ts:57` | Content +0.5 (+0.065) | T2 |
| 14 | Replace generic filler copy with concrete evidence | Content | Med | M | SRC | `src/data/translations.ts:36-40`, `src/data/cvData.ts:104-116` | Content +0.5 (+0.065) | T4 |
| 15 | Add `og:image` and `twitter:image` (1200x630) | SEO/meta | Med | M | SRC | `index.html:44-57`, `src/App.vue:23-58` | SEO +0.5 (+0.06) | S1 |
| 16 | Translate hardcoded English aria-labels and UI strings | i18n | Med | M | SRC | `src/components/AppHeader.vue:110,151,162,178`, `AppFooter.vue:60`, `ContactSection.vue:44,106,124,142,160`, `ProjectsSection.vue:108,146`, `HeroSection.vue:48,60` | i18n +0.5 (+0.05) | L3 |
| 17 | Add minimal tests, lint and CI (needs owner approval; out of scope for this change) | Code quality | Med | L | SRC | `package.json:6-8` | Code +0.5 (+0.075) | Q2 |
| 18 | Give EN its own prerendered URL; point hreflang `en` and `x-default` correctly; set `lang` per page | SEO/meta | Med | L | SRC | `index.html:2,39-41`, `src/App.vue:59-61`, `src/main.ts` | SEO +0.5 (+0.06) | S2 |
| 19 | Fix label-content-name-mismatch: accessible names must contain the visible text (both buttons) | Accessibility | Low | S | LH | `src/components/AppHeader.vue:110`, `src/components/HeroSection.vue:40` | A11y +0.25 (+0.0375) | A5 |
| 20 | Load fonts without blocking render (preload + `font-display: swap`, or self-host) | Performance | Low | S | LH | `index.html:78-83` | Perf +0.25 (+0.025) | P2 |
| 21 | Config hygiene: remove stray `"use client"`, move/justify `@unhead/vue` (Low; harmless for static SSG), drop redundant `@types/gsap` | Code quality | Low | S | SRC | `src/composables/useLanguage.ts:1`, `package.json:12,20` | Code +0.75 (+0.1125) | Q3, Q4, Q6 |
| 22 | Content nits: add or remove `IoT.png`, add outcomes to experience entries | Content | Low | S | SRC | `src/data/cvData.ts:54,19,25,31`, `public/proyectos` | Content +0.5 (+0.065) | T1, T5 |
| 23 | Meta cleanup: unify `twitter:card`; remove the fake `SearchAction` | SEO/meta | Low | S | SRC | `index.html:53,163-167`, `src/App.vue:44` | SEO +0.5 (+0.06) | S3, S4 |
| 24 | Remove dead translation keys; collapse the identical-branch roles ternary | i18n | Low | S | SRC | `src/data/translations.ts`, `src/components/HeroSection.vue:179-183` | i18n +0.5 (+0.05) | L2, L5 |
| 25 | Replace `role="menubar"`/`menuitem` with plain nav links | Accessibility | Low | S | SRC | `src/components/AppHeader.vue:124,138,209` | A11y +0.25 (+0.0375) | A6 |
| 26 | Replace hardcoded `'2026'` and month map in the progress ring with data fields | Code quality | Low | S | SRC | `src/components/EducationSection.vue:49,113-128` | Code +0.25 (+0.0375) | Q5 |
| 27 | Keep the fixed scroll-to-top button clear of footer content on small screens | Responsive | Low | S | SRC | `src/components/AppFooter.vue:56-64` | Responsive +0.25 (+0.025) | R3 |
| 28 | Follow-up audit (deferred, not scheduled in this change): Lighthouse a11y in light theme, the live URL https://irvincodes.dev/, real-device viewports, interaction states, EN run | Accessibility, Performance, SEO, Responsive | Low | S | n/a (gap) | n/a, audit task only | Removes provisional flags; Responsive +0.25 (R4) | R4, scorecard "Not audited" |
| 29 | Reduce LCP below 2.5 s and unused JS (about 80 KiB): lazy-load GSAP hero animation, trim `all-*` chunk | Performance | Low | M | LH | `src/composables/useHeroAnimation.ts:3-14`, `vite.config.ts` | Perf +0.25 (+0.025) | P1 |

Ordering note: ranks 19-20 (Low, S, measured) precede ranks 21-28 (Low, S, source). Rank 29 is Low/M measured, so it sorts after the Low/S rows by the effort rule. Rank 28 is a deferred follow-up with no code change.

Sum check: recovering every deduction gives the cap of 10 per category. Total possible weighted gain: 15 x 1.5 + 15 x 3.5 + 15 x 2.0 + 13 x 2.0 + 12 x 1.5 + 10 x 0.5 + 10 x 1.5 + 10 x 2.5 = 22.5 + 52.5 + 30 + 26 + 18 + 5 + 15 + 25 = 194.0 over 100 = +1.94, taking 7.94 to 9.88 (A11y caps at 9.6 and Performance at 9.4 because those are the Lighthouse bases).

## Owner decisions (no deduction, no score gain)

| Item | Category | Evidence | Files | Note |
|---|---|---|---|---|
| Phone and email exposed in page metadata: **owner decision**, not a defect | SEO/Content | SRC | `index.html:101-102`, `src/components/AppFooter.vue:45-46` | A portfolio normally wants contact info visible; trade-off is spam scraping. Not deducted (clarify Q8). |

## Not confirmed

| Claim | Why dropped | Evidence |
|---|---|---|
| `useTheme.ts` is dead code | **Not confirmed.** It is imported at `src/components/AppHeader.vue:5` and used at line 11 | `src/components/AppHeader.vue:5`, `src/composables/useTheme.ts` |
| "No skip link" | Disproved: skip link exists | `src/components/AppHeader.vue:86-91` |
| "Static `lang`" as a full defect | Partly disproved: runtime `lang` is reactive; only the prerendered shell is static ES (folded into rank 18) | `src/App.vue:59-61`, `index.html:2` |
| Unreferenced `public/vite.svg`, `src/assets/Sin título.svg`, `public/marca.png`, `public/marca1.png` | Not confirmed: only searched `src`, `index.html` and manifests; no references found, but not verified in deployed assets | `public/vite.svg`, `src/assets/Sin título.svg`, `public/marca.png`, `public/marca1.png` |

## Notes

- Every ranked row ties to a scorecard deduction ID (scorecard section 7).
- Nothing was staged or committed. Whether to commit or ignore `keel/` is the owner's decision.
