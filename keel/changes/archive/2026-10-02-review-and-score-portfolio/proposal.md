# Proposal: Review and Score Portfolio

## Intent
Replace the estimated, source-only rubric from exploration with measured numbers, and turn it into an actionable plan. Performance, Accessibility and SEO scores are currently inferred; the owner needs defensible scores and a prioritized fix list.

## Scope

### In Scope
- Run `npm run build` and `vue-tsc -b`; record the result and bundle sizes.
- Lighthouse mobile and desktop on the built site (Performance, Accessibility, Best Practices, SEO).
- axe audit (both themes, ES and EN) for accessibility violations.
- Per-category scorecard (8 categories, existing weights); measured values replace estimates for Perf/A11y/SEO, source review stays for the rest.
- Prioritized fix backlog (impact vs effort) with file paths.
- Read the files only grep-checked so far (About, Experience, Skills, Education, Contact, Header, Footer, translations.ts, style.css); confirm dead code.

### Out of Scope
- Any code, content or config changes (report only; fixes only if the user asks later).
- Adding tests, lint or CI.
- Device-lab testing beyond emulated mobile.

## Capabilities

### New Capabilities
- `portfolio-audit-scorecard`: measured per-category scores, methodology and weights.
- `portfolio-fix-backlog`: prioritized, file-referenced list of fixes.

### Modified Capabilities
- None

## Approach
Approach 2 plus 3 from exploration. Build, serve `dist/` locally, run Lighthouse CLI (mobile and desktop) and axe-core via browser. Audit tooling runs through `npx` (no project dependencies added). Combine results with the source review into a scorecard and backlog. Raw outputs go to the change folder only.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `keel/changes/review-and-score-portfolio/` | New | proposal, specs, scorecard, backlog, raw audit outputs |
| `dist/` | New (transient) | build output, already ignorable; not committed |
| `src/**` | None | read only |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Lighthouse variance between runs | Med | 3 runs per form factor, report median |
| Local-serve numbers differ from production | Med | Also audit the deployed URL if available |
| Build fails or `@unhead/vue` devDependency issue surfaces | Low | Record as a finding; do not fix |
| Subjective weights | Med | State weights explicitly; show unweighted scores too |
| Tooling needs downloads (Chrome, npx) | Low | Use npx; flag if blocked |

## Rollback Plan
No source is modified. Revert by deleting `keel/changes/review-and-score-portfolio/` and the transient `dist/` folder (`rm -r`); `git status` should show only the untracked `keel/` directory.

## Dependencies
- Node/npm and network access for `npx lighthouse` and axe-core.
- A local Chrome/Chromium.

## Success Criteria
- [ ] Build and typecheck outcomes recorded.
- [ ] Lighthouse mobile and desktop medians captured for all four categories.
- [ ] axe violations listed by severity, with affected elements.
- [ ] Scorecard shows 8 categories, weights, measured vs estimated flagged, weighted total.
- [ ] Backlog ranks at least the top 10 fixes with effort, impact and file paths.
- [ ] Zero changes under `src/`, `public/` or config files.
