# Design: Review and Score Portfolio

## Technical Approach
Report-only. Two Markdown deliverables are written from existing evidence (`audit-results.md`, `exploration.md`, source read in full). No tooling reruns except `git status`. Clarify Q1-Q3 are hard constraints: weights 15/15/15/13/12/10/10/10, score = Lighthouse/10 minus itemised deductions, raw Lighthouse numbers unchanged, worse (light) contrast result used, A11y provisional.

## Architecture Decisions

### Decision: Two flat files
**Choice**: `scorecard.md` and `fix-backlog.md` in the change folder; `audit-results.md` stays as the raw-evidence appendix.
**Alternatives**: one report; a `reports/` subfolder.
**Rationale**: one file per spec capability gives 1:1 verification and matches the existing flat layout.

### Decision: Itemised deductions
**Choice**: per category, a table `Deduction | Points | Evidence`. Score = base minus sum, floor 0, one decimal. Bases: Perf 9.4 (mobile median, the worse), A11y 9.6, SEO 10.0; unmeasured categories start at 10. Severity points: High 1.0, Med 0.5, Low 0.25, the same scale as backlog impact.
**Alternatives**: keep exploration estimates; free-form judgement.
**Rationale**: the spec requires points per deduction; any reader can recompute, and scores stay consistent with the backlog.

### Decision: Evidence citations and basis labels
**Choice**: every deduction and backlog item cites `[LH]` (metric, median), `[axe]` (rule, nodes, theme) or `[SRC]` (`path:line`). Each category is labelled measured, partly measured or estimated; Perf, A11y and SEO are never "estimated", and A11y is also "provisional".
**Rationale**: matches the spec labels and lets the owner verify quickly.

### Decision: Mechanical backlog ranking
**Choice**: sort by impact, then effort (S before L), then measured before source-only, then score gain. The rule is stated at the top. Row: rank, title, category, impact, effort, evidence, files, score gain, flag.
**Rationale**: deterministic, satisfies the quick-win and tie-break scenarios.

### Decision: Gaps and live-URL item
**Choice**: "Not audited" lists exactly four: Lighthouse a11y in light theme (not run), live URL, interaction states, ES/EN runs. Perf and SEO are provisional for live-host effects. The backlog's required follow-up item (light-theme Lighthouse plus live URL) is marked "deferred, not scheduled in this change".
**Rationale**: satisfies backlog spec without implying the work was done.

### Decision: Special items
**Choice**: phone/email exposure (`index.html:101-102`, `AppFooter.vue:45-46`) is an "owner decision" with no deduction. `useTheme.ts` goes in a "not confirmed" table (imported at `AppHeader.vue:5`). Dead-code item lists the 4 confirmed files, "no import references found". `@unhead/vue` devDependency is Low impact.
**Rationale**: follows Q4, Q5, Q8 and the spec scenarios.

## Data Flow
```
audit-results.md + exploration.md + source reads + Q1-Q3 rules
        --> scorecard.md (weighted total + unweighted mean)
        --> fix-backlog.md (>=10 ranked rows, each tied to a deduction)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `keel/changes/review-and-score-portfolio/scorecard.md` | Create | Sections: summary (totals, date 2026-10-01); method; build/typecheck (pass after `npm ci`, TS6053 = corrupted install, "use client" warning as finding); Lighthouse 5-run medians (mobile/desktop, LCP/FCP/CLS/TBT); axe by severity (light 8 nodes, dark 5, `text-muted` cause, 2 name mismatches); category table; deduction tables; estimate-vs-measured explanation; Not audited |
| `keel/changes/review-and-score-portfolio/fix-backlog.md` | Create | Ranking rule, 10+ items (about 14 expected), owner decisions, not-confirmed table, deferred follow-up, "no fixes applied" |
| `src/**`, `public/**`, config | None | Read only |

## Interfaces / Contracts
Weighted total = sum(score x weight)/100, shown beside the unweighted mean. Each backlog path is checked with `fd` at write time.

## Testing Strategy

| Layer | What to test | Approach |
|-------|-------------|----------|
| Verify | Weights sum 100; totals recompute; each deduction maps to a backlog item | Manual checklist |
| Verify | At least 10 items, all fields, paths exist | `fd`/`rg` |
| Verify | No source change | `git status` shows only untracked `keel/` |

No test framework exists; none added.

## Migration / Rollout
No migration required.

## Rollback & Reversibility
- Migrations and flags: none.
- Late-revert loss: none. Scratchpad raw JSONs are session-local, so `audit-results.md` is the durable record.
- Revert: delete `scorecard.md` and `fix-backlog.md` (or the change folder, plus transient `dist/`). Verify `git status` shows no tracked changes.

## Observability
- Error paths and jobs: N/A, no runtime code. Report defects surface only in verify.
- Success metric: the verify checklist passes and the owner can recompute the total. Later Lighthouse reruns compare against recorded medians (mobile Perf 94, A11y 96).

## Open Questions
- [ ] None.
