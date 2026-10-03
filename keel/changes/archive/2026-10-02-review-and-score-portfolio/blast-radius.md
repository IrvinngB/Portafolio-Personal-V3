# Blast Radius: Review and Score Portfolio

Change is report-only: creates `scorecard.md` and `fix-backlog.md` in `keel/changes/review-and-score-portfolio/`. Searches run 2026-10-01.

| Surface | Consumers found | Class | Locations | Required handling |
|---------|----------------|-------|-----------|-------------------|
| `src/**`, `public/**`, `index.html`, `package.json` | Read only; no write in design File Changes | INTERNAL | design.md "File Changes" | Verify `git status` shows only untracked `keel/` |
| Build (`vite.config.ts`, `tsconfig*.json`, `package.json`) | `rg "keel"` over src, public, index.html, package.json, vite.config.* returns no match; no `.md` globs | none | n/a | None |
| `.git/hooks` (commit-guard) | Only `*.sample` files present; no husky/lefthook/commitlint, no `.claude/` dir | none | `.git/hooks` | None |
| `.gitignore` | No `keel` entry; `git check-ignore keel` empty; `git ls-files keel` empty (untracked) | AFFECTED | `.gitignore` | New files appear as untracked, not committed; commit/ignore decision stays with the owner |
| `state.yaml` | Tracks phase (`current_phase: design`); not auto-derived from files | INTERNAL | `keel/changes/review-and-score-portfolio/state.yaml` | Orchestrator updates phase; deliverables do not |
| Sibling artifacts (`audit-results.md`, `exploration.md`, specs) | Deliverables cite them as evidence | INTERNAL | same folder | Do not edit; cite only |
| `keel/steering/*`, `keel/config.yaml` | No reference to change outputs | none | `keel/` | None |
| Dev/prod output (`dist/`) | Gitignored; `dist` is transient | none | `.gitignore` | Remove transient `dist/` if build was rerun |

## Must-handle list
- AFFECTED: `keel/` is untracked and not ignored, so the two new files will show in `git status`. Tasks should state that they are not to be staged or committed unless the owner asks.
- Verification task: `git status` must show only untracked `keel/`; `src/`, `public/`, `package.json`, `index.html` unchanged.
- Backlog paths are checked with `fd` at write time (design contract). Cited files must exist.

## Published surfaces & compatibility
None. No API, package export, webhook, or deployed asset consumes these files.

## Verdict: CONTAINED
