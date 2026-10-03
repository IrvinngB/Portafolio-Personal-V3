# Clarifications: Review and Score Portfolio

Open questions: 3 BLOCKER, 6 non-blocking.

## BLOCKER — must answer before design

### Q1: Which concrete weights and scoring rule will the 8 categories use (keep exploration weights 15/15/10/12/10/10/15/13, or change)?
- Targets: Requirement "Eight-category weighted scorecard" (portfolio-audit-scorecard/spec.md); proposal says "existing weights".
- Risk if guessed wrong: the weighted total is the headline number; subjective weights change it by up to ~0.5. The spec only requires "sum to 100%" and "unweighted mean also shown".
- Recommended default: keep the exploration weights (they sum to 100) and state they are subjective. Always show the unweighted mean next to the weighted total. Add a measured-category rule: Lighthouse score / 10 is the starting point, then source-review deductions are applied (spec requires keyboard/modal/og:image/hreflang to still count) with each deduction listed in points.

### Q2: Does Lighthouse label-content-name-mismatch count toward the A11y score, and what is the A11y/SEO score formula?
- Targets: Requirements "Accessibility violations by severity" and "Measured score overrides prior estimate" (scorecard spec).
- Facts: Lighthouse A11y is 96 with the audit failing. In Lighthouse 13 this audit is informational/low-weight for the number, but the spec says it MUST be listed as a finding. SEO 100 is at odds with real defects (no og:image, hreflang all the same URL, twitter:card "summary" in index.html vs "summary_large_image" in App.vue:44, fake SearchAction at index.html:164).
- Risk if guessed wrong: A11y/SEO scored 9.6/10 from the tool, while the exploration estimated 5.0/6.5. A reader sees an unexplained jump, or the score hides real issues.
- Recommended default: it does NOT change the Lighthouse number, but is a deducted finding in the category score. Method: A11y = Lighthouse 9.6 minus source-review deductions (keyboard-inaccessible cards, modal without role/aria-modal/Esc/focus trap, 3 h1 elements, light-theme contrast on 8 nodes, 2 name mismatches), giving roughly 7.0-7.5 and labelled "partly measured". SEO the same (100 minus og:image, hreflang, twitter:card conflict, fake SearchAction), roughly 7.5-8. State the deductions explicitly.

### Q3: Is the light theme (and the unrun Lighthouse A11y in light) a scored surface or an excluded one?
- Targets: Requirement "Coverage gaps disclosed" and the "Contrast violation" scenario (it only describes dark: 5 nodes at 2.98:1). The newer audit data shows light: 8 nodes at ~2.46-2.49:1, which the spec scenarios do not reflect.
- Risk if guessed wrong: the spec scenario and the audit data conflict, so a verifier would fail the scorecard either way. Also the spec's "Not audited" scenario says light theme is unaudited, which is now false.
- Recommended default: update the specs before design: light theme is audited via axe (8 nodes), Lighthouse A11y in light remains "not run" and A11y is flagged provisional. The score uses the worse (light) result. Run one Lighthouse light-theme pass if cheap; otherwise keep it listed under "Not audited".

## Non-blocking (proceeding with default)

### Q4: Are the dead-code claims correct?
- Targets: Requirement "Source-review findings included" (portfolio-fix-backlog/spec.md); exploration lists useDarkMode, useTheme, ProjectPlaceholder, BuildingNowPanel, vue.svg.
- VERIFIED by search (no import references outside the file itself): useDarkMode.ts, ProjectPlaceholder.vue, BuildingNowPanel.vue (commit 8c4c72b removed its use), src/assets/vue.svg. Also likely unreferenced: public/vite.svg, src/assets/"Sin título.svg", public/marca.png/marca1.png (unchecked, verify before listing).
- DISPROVED: useTheme.ts is NOT dead; it is imported at src/components/AppHeader.vue:5 and used at line 11. The exploration claim is wrong; drop it or mark "not confirmed" (spec scenario "Finding disproved").
- Default: the backlog dead-code item lists the 4 confirmed files with "no import references found". Still read About, Experience, Skills, Education, Contact, Footer, translations.ts and style.css fully before finalising the ~27 ternary count and the i18n/Content scores.

### Q5: Can the backlog reach 10 items without padding?
- Targets: Requirement "Minimum backlog size and fields".
- Assumption: yes. Distinct confirmed findings: contrast token (8 nodes, both themes), 2 name mismatches, render-blocking fonts, unused JS (~80 KiB), og:image/twitter:card conflict, hreflang, 3 h1 (HeroSection.vue:13-14 plus AppHeader.vue:116), static lang, keyboard cards/modal, language persistence/ternaries, dead code, missing /proyectos/IoT.png (cvData.ts:54, confirmed absent from public/proyectos), @unhead/vue in devDependencies (package.json:20, imported at App.vue:3 and run at SSG time), "use client" warning, light/live audit follow-up. That is 14+ items; no padding needed. The i18n and ternary count must be confirmed by reading files.
- Note: @unhead/vue is only needed at build (vite-ssg) so devDependency may be harmless for a static deploy. Mark impact Low and say so rather than a defect.

### Q6: Is the "5 runs" median acceptable against spec wording?
- Targets: Lighthouse requirement; proposal Risks says "3 runs"; spec says "run count" stated and a single-run caveat for <3.
- Assumed: yes, 5 satisfies "at least 3". Evidence: audit-results.md section "Lighthouse median of 5 runs". Mobile Performance range 92-94, LCP 2.60s median (2.59-2.85). Section 2 of the audit file (first single run) should be marked superseded to avoid duplicated or contradictory tables (it shows LCP 2.6, FCP 2.3 vs median 2.27).

### Q7: Local-serve versus production and Spanish/English runs
- Targets: Requirement "Coverage gaps disclosed", scenario "Live URL audited later".
- Assumed: live URL https://irvincodes.dev/ not audited in this change (no network guarantee); only local `vite preview`, ES default language, 1 prerendered page (SSG only in ES). Provisional flag on Performance and SEO (canonical/hreflang/sitemap behaviour on the live host not checked). Add a backlog follow-up item.
- Default: do not block; if the user wants production numbers, run Lighthouse against the live URL (compression, CDN and HTTP/2 may change the 2.6s LCP).

### Q8: Contact data exposure (phone, email in JSON-LD and footer)
- Targets: Requirement "Score impact and non-application", scenario "Owner decision".
- Evidence: index.html:101-102 (JSON-LD email/telephone) and AppFooter.vue:45-46 (itemprop microdata). Both are visible in page source.
- Default: label as "owner decision", not a defect; do not deduct from SEO or Content scores. Note that a portfolio normally wants contact info visible; the trade-off is spam scraping.

### Q9: Is the exploration "score drop" in Code quality fair when type-check passes?
- Targets: Requirement "Build and typecheck outcome".
- Assumed: type-check/build now PASS after `npm ci` (audit-results.md "Update: type-check"); the first TS6053 failure is an environment issue, not a source finding. Warning "use client" in src/composables/useLanguage.ts is listed as a finding. No tests/lint/CI stays an estimated deduction; the project scope explicitly excludes adding them.
- Note: the spec scenario "Clean install passes" requires the date (2026-10-01) to be written in the scorecard.

## Resolved
- Q1 (2026-10-01, user): ACCEPTED default. Keep exploration weights (Design 15, A11y 15, Code 15, Content 13, SEO 12, Perf 10, Responsive 10, i18n 10 = 100), show unweighted mean too, category score = Lighthouse score minus itemised source-review deductions.
- Q2 (2026-10-01, user): ACCEPTED default. Report raw Lighthouse numbers as-is; category score carries itemised deductions for defects the tool misses (keyboard cards, modal semantics, og:image, hreflang, label-content-name-mismatch). Expected A11y ~7-7.5, SEO ~7.5-8, flagged "partly measured".
- Q3 (2026-10-01, user): ACCEPTED default. Patch both specs: score contrast from the worse (light theme) result, flag A11y provisional, keep "Lighthouse a11y in light theme: not run" as a disclosed gap. Mark audit-results.md single-run section superseded by the 5-run median.
- A11y score (2026-10-02, user delegated): KEEP mechanical 6.1 (severity scale High 1.0 / Med 0.5 / Low 0.25). Contrast fails in both themes; the earlier ~7-7.5 was a pre-computation estimate, not a rule. Provisional until Lighthouse a11y runs in light theme.
