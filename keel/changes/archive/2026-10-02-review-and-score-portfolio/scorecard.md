# Portfolio Scorecard

Date: 2026-10-01 · Change: review-and-score-portfolio · Report-only (no source changes)
Companion: [fix-backlog.md](./fix-backlog.md) · Raw evidence: [audit-results.md](./audit-results.md) (not edited)

## 1. Summary

| Metric | Value |
|---|---|
| **Weighted total** | **7.94 / 10 (about 7.9)** |
| Unweighted mean | 8.00 / 10 |
| Lowest category | Accessibility 6.1 (partly measured, provisional) |
| Highest category | Performance 8.9 (measured, provisional) |

The weights are subjective (accepted in clarify Q1). Both numbers are shown so the reader can see the effect of weighting.

## 2. Method

- Weights (sum 100): Design/UX 15, Accessibility 15, Code quality 15, Content 13, SEO/meta 12, Performance 10, Responsive/mobile 10, i18n 10.
- Score = base minus itemised deductions, floor 0, one decimal. Base: Lighthouse score / 10 for measured categories (Perf 9.4 = worse mobile median, A11y 9.6, SEO 10.0); 10 for categories no tool measures.
- Severity points, same scale as backlog impact: High 1.0, Med 0.5, Low 0.25.
- Evidence tags: `[LH]` Lighthouse metric/median, `[axe]` rule/nodes/theme, `[SRC]` `path:line`.
- Raw Lighthouse and axe numbers are reported unchanged. Deductions cover defects the tools miss or under-weight (clarify Q2).
- Deductions must be recomputable: every row below maps to a backlog item (see fix-backlog.md, column "Deduction IDs").

## 3. Build and typecheck (pass, 2026-10-01)

- `npm run build` (`vue-tsc -b && vite-ssg build`): **pass on 2026-10-01 after `rm -rf node_modules && npm ci`**.
- The first run failed with TS6053 (`node_modules/typescript/lib/lib.dom.d.ts` missing). That was a **corrupted install, an environment issue, not a source finding**.
- Warning (a finding, not a failure): `"use client"` directive ignored in `src/composables/useLanguage.ts:1` (backlog item on config hygiene, deduction Q3).
- Largest chunks (raw/gzip): `all-*.js` 258.3/94.9 kB, `app-*.js` 135.7/50.5 kB, gsap CSSPlugin 70.0/27.4 kB, `app.css` 27.2/6.3 kB.

## 4. Lighthouse (median of 5 runs per form factor, Lighthouse 13.5.0, local `vite preview`, built dist)

| Metric | Mobile | Desktop |
|---|---|---|
| Performance | 94 | 100 |
| Accessibility | 96 | 96 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 2.60 s | 0.64 s |
| FCP | 2.27 s | 0.63 s |
| CLS | 0.001 | 0.002 |
| TBT | 0 ms | 0 ms |

5 runs per form factor (at least 3, so not single-run). Mobile Performance ranged 92-94, LCP 2.59-2.85 s. The single-run section of `audit-results.md` is superseded by these medians. Weak audits: render-blocking 300 ms mobile / 220 ms desktop, unused JavaScript about 80 KiB, color-contrast, label-content-name-mismatch.

## 5. Accessibility violations by severity (axe-core 4.13.0)

| Severity | Rule | Light theme | Dark theme | Elements |
|---|---|---|---|---|
| Serious | color-contrast | **8 nodes**, 2.46-2.49:1 | 5 nodes, 2.98:1 | hero location span; eyebrow labels (#experience, #projects, #education); 3 experience `<time>` (light only, 2.46:1); footer `.text-caption.text-muted` |
| Weak (Lighthouse) | label-content-name-mismatch | 2 buttons | 2 buttons | `aria-label="Go to home"` (`AppHeader.vue:110`, visible text "IB" + name); hero CTA with `aria-label` "Go to contact section" vs visible `t.getInTouch` (`HeroSection.vue:40`) |

- Cause: the `text-muted` token (`src/style.css:18` dark `rgba(232,245,240,0.35)`, `src/style.css:52` light `rgba(7,31,31,0.40)`) at 11px (`text-label-md`, `text-caption`, `style.css:68,70`). Needs 4.5:1. One token fix addresses both themes.
- **The Accessibility score uses the worse (light) result.** Lighthouse A11y was not re-run in light theme, so the A11y score is provisional.

## 6. Category scores

| Category | Weight | Base | Deductions | Score | Weighted pts | Basis |
|---|---|---|---|---|---|---|
| Design/UX | 15 | 10.0 | -1.5 | **8.5** | 127.5 | estimated (source review) |
| Accessibility | 15 | 9.6 | -3.5 | **6.1** | 91.5 | partly measured, **provisional** |
| Code quality | 15 | 10.0 | -2.0 | **8.0** | 120.0 | estimated (source review); build/typecheck measured pass |
| Content | 13 | 10.0 | -2.0 | **8.0** | 104.0 | estimated (source review) |
| SEO/meta | 12 | 10.0 | -1.5 | **8.5** | 102.0 | partly measured, provisional (live host unchecked) |
| Performance | 10 | 9.4 | -0.5 | **8.9** | 89.0 | measured, provisional (local serve only) |
| Responsive/mobile | 10 | 10.0 | -1.5 | **8.5** | 85.0 | estimated (source review; mobile emulation in Lighthouse only) |
| i18n ES/EN | 10 | 10.0 | -2.5 | **7.5** | 75.0 | estimated (source review) |
| **Total** | **100** | | | | **794.0 / 100 = 7.94** | unweighted mean 64.0 / 8 = **8.00** |

Arithmetic: 127.5 + 91.5 + 120.0 + 104.0 + 102.0 + 89.0 + 85.0 + 75.0 = 794.0; 794.0 / 100 = 7.94. Scores sum 8.5 + 6.1 + 8.0 + 8.0 + 8.5 + 8.9 + 8.5 + 7.5 = 64.0; 64.0 / 8 = 8.00.

## 7. Deduction tables

### Design/UX (estimated) 10.0 - 1.5 = 8.5

| ID | Deduction | Points | Evidence |
|---|---|---|---|
| D1 | Contact form cannot deliver: `access_key: 'YOUR_WEB3FORMS_ACCESS_KEY'` is a placeholder, so every submit returns the error state | High 1.0 | [SRC] `src/components/ContactSection.vue:222` |
| D2 | Primary buttons turn into a dark surface on hover (`hover:bg-surface-high` on `bg-accent text-accent-fg`), a contrast drop | Med 0.5 | [SRC] `HeroSection.vue:39`, `ContactSection.vue:82`, `ProjectsSection.vue:135` |

### Accessibility (partly measured, provisional) 9.6 - 3.5 = 6.1

| ID | Deduction | Points | Evidence |
|---|---|---|---|
| A1 | Light-theme contrast is worse than the dark result Lighthouse scored: 8 nodes at 2.46-2.49:1 (3 extra timeline dates) | Med 0.5 | [axe] color-contrast, light, 8 nodes; [SRC] `style.css:52` |
| A2 | Project cards are `<article @click>` with no tabindex, role or key handler: not keyboard-operable | High 1.0 | [SRC] `ProjectsSection.vue:21-27` |
| A3 | Modal lacks `role="dialog"`, `aria-modal`, Esc handling, focus trap and focus return | High 1.0 | [SRC] `ProjectsSection.vue:96-100,177-187` |
| A4 | Three `<h1>` elements: two in the hero, one in the header (visible from `sm`) | Med 0.5 | [SRC] `HeroSection.vue:13-14`, `AppHeader.vue:116` |
| A5 | label-content-name-mismatch on 2 buttons | Low 0.25 | [LH] label-content-name-mismatch; [SRC] `AppHeader.vue:110`, `HeroSection.vue:40` |
| A6 | `role="menubar"`/`menuitem` on plain nav links with no menu keyboard model | Low 0.25 | [SRC] `AppHeader.vue:124,138,209` |

Estimate vs measured: the exploration estimated A11y 5.0 from source only. Measured Lighthouse gives 9.6 base, and the itemised deductions for what the tool cannot see (A2, A3, A4, A6) and for the worse light theme (A1) bring it to 6.1. The jump from 5.0 is because Lighthouse showed no contrast failure beyond 5 dark nodes and the "no skip link" claim was disproved (skip link exists at `AppHeader.vue:86-91`). Clarify Q2 guessed roughly 7.0-7.5; applying the stated severity scale mechanically gives 6.1, which is what the recomputation yields. Flagged provisional because Lighthouse a11y in light theme was not run.

### Performance (measured, provisional) 9.4 - 0.5 = 8.9

| ID | Deduction | Points | Evidence |
|---|---|---|---|
| P1 | Mobile LCP median 2.60 s sits above the 2.5 s "good" line; about 80 KiB unused JavaScript (GSAP in the `all-*` chunk) | Low 0.25 | [LH] LCP 2.60 s mobile median; unused-javascript; chunks in section 3 |
| P2 | Render-blocking Google Fonts CSS, 300 ms mobile / 220 ms desktop | Low 0.25 | [LH] render-blocking; [SRC] `index.html:80` |

### SEO/meta (partly measured, provisional) 10.0 - 1.5 = 8.5

| ID | Deduction | Points | Evidence |
|---|---|---|---|
| S1 | No `og:image` / `twitter:image` anywhere | Med 0.5 | [SRC] `index.html:44-57`, `src/App.vue:23-58` (no match) |
| S2 | hreflang `es`, `en` and `x-default` all point to `https://irvincodes.dev/`; EN is not prerendered (SSG renders ES only); shell `<html lang="es">` is static (runtime `lang` is reactive via `App.vue:59-61`) | Med 0.5 | [SRC] `index.html:2,39-41` |
| S3 | `twitter:card` conflict: `summary` in `index.html:53` vs `summary_large_image` at `App.vue:44` | Low 0.25 | [SRC] |
| S4 | JSON-LD `SearchAction` targets `#projects`, but the site has no search | Low 0.25 | [SRC] `index.html:163-167` |

Phone/email in metadata is an **owner decision** (Q8), not deducted.

### Responsive/mobile (estimated) 10.0 - 1.5 = 8.5

| ID | Deduction | Points | Evidence |
|---|---|---|---|
| R1 | Text at 10-12px (`text-label-sm` 10px, `text-caption`/`text-label-md` 11px, `text-body-sm` 12px) is small for mobile | Med 0.5 | [SRC] `style.css:66,68-70` |
| R2 | "Read more" affordance only appears on hover (`opacity-0 group-hover:opacity-100`), invisible on touch | Med 0.5 | [SRC] `ProjectsSection.vue:72` |
| R3 | Fixed scroll-to-top button overlays the footer on small screens | Low 0.25 | [SRC] `AppFooter.vue:56-64` |
| R4 | Layout not verified on real devices or a viewport matrix (only Lighthouse mobile emulation, CLS 0.001) | Low 0.25 | [LH] mobile run; gap in section 9 |

Commit 9a29e9e added `clamp()` type and 44px targets (`style.css:59-62`); that is credited by starting from 10.

### i18n ES/EN (estimated) 10.0 - 2.5 = 7.5

| ID | Deduction | Points | Evidence |
|---|---|---|---|
| L1 | 30 inline ES/EN ternaries in components bypass `translations.ts` (29 copy strings plus the CV-file path at `HeroSection.vue:188`; recount below) | High 1.0 | [SRC] `ContactSection.vue` 13, `ProjectsSection.vue` 6, `HeroSection.vue` 3, `AppFooter.vue` 3, `AboutMeSection.vue:14`, `ExperienceSection.vue:12`, `EducationSection.vue:12`, `SkillsSection.vue:15`, `AppHeader.vue:90` |
| L2 | 13 `translations.ts` keys never read (about, download, viewProject, viewMore, professionalProfile, dataAnalysis, design, methodologies, languages, sendEmail, callMe, madeWith, by) | Low 0.25 | [SRC] `src/data/translations.ts:4,12,14,15,18,29-32,47,48,51,52` (ES block; EN mirrors) |
| L3 | Hardcoded English accessibility/UI strings that never switch language | Med 0.5 | [SRC] `AppHeader.vue:110,151,162,178`, `AppFooter.vue:60`, `ContactSection.vue:44,106,112,124,142,160`, `ProjectsSection.vue:108,146`, `HeroSection.vue:48,60` |
| L4 | No language persistence or detection: always starts `"es"` | Med 0.5 | [SRC] `src/composables/useLanguage.ts:8` |
| L5 | Hero cycling roles ternary has identical ES and EN arrays | Low 0.25 | [SRC] `HeroSection.vue:179-183` |

**Ternary recount (task 1.2).** `rg "=== '(es|en)'"` over `src`: 31 inline ternaries in components (Contact 13, Projects 6, Hero 4, Footer 3, and one each in About, Experience, Education, Skills, Header), against about 27 claimed. 30 translate real copy (L1); the 31st (`HeroSection.vue:180`) has identical branches (L5). Not counted: 6 in `App.vue:20-53` (head metadata, acceptable) and 2 in `useLanguage.ts:16,21` (the mechanism). The exploration undercounted.

### Code quality (estimated; build measured pass) 10.0 - 2.0 = 8.0

| ID | Deduction | Points | Evidence |
|---|---|---|---|
| Q1 | Dead code, no import references found: `src/composables/useDarkMode.ts`, `src/components/ProjectPlaceholder.vue`, `src/components/BuildingNowPanel.vue`, `src/assets/vue.svg` | Med 0.5 | [SRC] `rg` over `src`, `index.html` |
| Q2 | No tests, lint or CI (adding them is out of scope for this change) | Med 0.5 | [SRC] `package.json:6-8` |
| Q3 | Stray `"use client"` directive, a build warning | Low 0.25 | [SRC] `useLanguage.ts:1` |
| Q4 | `@unhead/vue` in devDependencies but imported at runtime (`App.vue:3`); harmless for a static SSG deploy | Low 0.25 | [SRC] `package.json:20` |
| Q5 | Education progress ring hardcodes `'2026'` and a month-name map tied to the data format | Low 0.25 | [SRC] `EducationSection.vue:49,113-128` |
| Q6 | GSAP held as `any` while `gsap` ships its own types; `@types/gsap` is a redundant dependency | Low 0.25 | [SRC] `src/composables/useHeroAnimation.ts:3-5`, `package.json:12` |

Not confirmed: `useTheme.ts` is **not** dead code. It is imported at `AppHeader.vue:5` and used at line 11, so the exploration claim was wrong and no deduction is taken.

### Content (estimated) 10.0 - 2.0 = 8.0

| ID | Deduction | Points | Evidence |
|---|---|---|---|
| T1 | `/proyectos/IoT.png` referenced but missing from `public/proyectos` (only `Chatbot.png`, `Webside.jpg` exist); also no consumer renders it | Low 0.25 | [SRC] `src/data/cvData.ts:54` |
| T2 | Project `image` field is never rendered; no screenshots shown | Med 0.5 | [SRC] `src/types/index.ts:57`; `rg image src/components` returns no match |
| T3 | No live-demo URL on any project (GitHub only) | Med 0.5 | [SRC] `src/data/cvData.ts:39,47,55,62` |
| T4 | Generic filler copy (education highlights, About values with no evidence) | Med 0.5 | [SRC] `translations.ts:36-40`, `cvData.ts:104-116` |
| T5 | Experience entries describe tasks, not measurable outcomes | Low 0.25 | [SRC] `cvData.ts:19,25,31` |

Strength noted (not scored): the RiskTrail narrative is specific and technical.

## 8. Exploration claims re-verified

| Claim | Result |
|---|---|
| `useTheme.ts` dead | **Wrong.** Imported `AppHeader.vue:5`. |
| `useDarkMode.ts`, `ProjectPlaceholder.vue`, `BuildingNowPanel.vue`, `vue.svg` dead | Confirmed, no import references found |
| ~27 ES/EN ternaries | **Corrected: 31** (30 + 1 identical-branch) |
| No skip link | **Wrong.** Exists at `AppHeader.vue:86-91` |
| Static `lang="es"` | Partly wrong: runtime `lang` is reactive (`App.vue:59-61`); only the prerendered shell is static ES |
| Duplicate h1 | Confirmed, three `<h1>` (Hero 2, Header 1) |
| Missing og:image, twitter:card conflict, hreflang one URL, SearchAction | Confirmed |
| Missing `IoT.png` | Confirmed, but nothing renders the image |
| Unreferenced `public/vite.svg`, `src/assets/Sin título.svg`, `public/marca.png`, `marca1.png`, orphan data at `cvData.ts:268-295` | Not confirmed beyond a `src`/`index.html`/manifest search; excluded from deductions |
| Contact form placeholder key | **New finding** (D1), not in exploration |

## 9. Not audited

1. Lighthouse accessibility in light theme (not run; A11y is provisional).
2. Live URL (https://irvincodes.dev/); scores come from a local `vite preview`, so Performance and SEO are provisional.
3. Interaction states (open modal, mobile menu, form states, focus order).
4. ES/EN runs (audits ran in the default ES language; SSG renders ES only).

## 10. Notes

- Nothing under `src/`, `public/`, `index.html`, `package.json` or config was changed. Nothing was staged or committed; `keel/` is untracked and the commit/ignore decision is the owner's.
- Transient `dist/` (gitignored) from the audit builds was left in place; remove it if unwanted.
