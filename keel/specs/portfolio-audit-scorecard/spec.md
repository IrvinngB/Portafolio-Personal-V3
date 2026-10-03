# Portfolio Audit Scorecard Specification

## Purpose
Define a defensible per-category score: measured results replace estimates where a tool can measure; the rest is source review with stated basis.

## Requirements

### Requirement: Build and typecheck outcome
The scorecard MUST record the typecheck and production build outcome, and MUST state that a failure from a corrupted install is an environment issue, not a source finding.

#### Scenario: Clean install passes
- GIVEN dependencies were reinstalled from the lockfile
- WHEN typecheck and build run
- THEN both pass and the scorecard records "pass" with the date
- AND the earlier TS6053 failure is noted as a corrupted install

#### Scenario: Build warnings
- GIVEN the build emits warnings (e.g. ignored "use client")
- WHEN the outcome is recorded
- THEN each warning is a finding, not a failure

### Requirement: Measured Lighthouse scores
The scorecard MUST report Lighthouse Performance, Accessibility, Best Practices and SEO for mobile and desktop, stating the run count and that values are medians.

#### Scenario: Reported values
- GIVEN the audited build served locally, 5 runs per form factor
- WHEN the scorecard is read
- THEN mobile shows Performance 94, A11y 96, Best Practices 100, SEO 100
- AND desktop shows Performance 100, A11y 96, Best Practices 100, SEO 100
- AND LCP, FCP, CLS and TBT are listed per form factor
- AND the 5-run median satisfies "median of runs"

- AND fewer than 3 runs would be flagged single-run

### Requirement: Accessibility violations by severity
The scorecard MUST list axe violations by severity with affected elements and cause.

#### Scenario: Contrast violation
- GIVEN both themes were audited with axe
- WHEN violations are listed
- THEN light theme shows 8 nodes at about 2.46-2.49:1 and dark theme shows 5 nodes at 2.98:1
- AND the cause is the muted text token
- AND the Accessibility score MUST use the worse (light) result

#### Scenario: Weak Lighthouse audits
- GIVEN label-content-name-mismatch on 2 buttons
- WHEN findings are listed
- THEN they are included as accessibility findings

### Requirement: Eight-category weighted scorecard
The scorecard MUST score Design/UX, Accessibility, Performance, SEO/meta, Responsive/mobile, i18n, Code quality and Content, each with weight, 0-10 score and evidence basis. It MUST show the weighted total and the unweighted mean.

#### Scenario: Weights and rule
- GIVEN the accepted, subjective weights: Design 15, Accessibility 15, Code 15, Content 13, SEO 12, Performance 10, Responsive 10, i18n 10
- WHEN they are added
- THEN the total equals 100%
- AND a measured category score equals the Lighthouse score divided by 10 minus itemised source-review deductions, each listed in points

#### Scenario: Basis and provisional flags
- GIVEN each category row
- WHEN a score is shown
- THEN it is labelled "measured", "partly measured" or "estimated (source review)"
- AND Performance, Accessibility and SEO are not "estimated"
- AND Accessibility is "partly measured" and flagged provisional, because Lighthouse a11y was not run in light theme

#### Scenario: Measured score overrides estimate
- GIVEN measured results disagree with the exploration estimates (A11y 5.0, SEO 6.5)
- WHEN scores are set
- THEN the change is explained
- AND tool-invisible problems (keyboard access, modal semantics, og:image, hreflang) are still deducted

### Requirement: Coverage gaps disclosed
The scorecard MUST state what was not audited and MUST list only real gaps.

#### Scenario: Unaudited surfaces
- GIVEN axe covered both themes and Lighthouse the default theme, locally
- WHEN the scorecard is read
- THEN "Not audited" lists exactly: Lighthouse a11y in light theme (not run), live URL, interaction states, ES/EN runs
- AND scores depending on them are marked provisional

### Requirement: Read-only audit
The audit MUST NOT change files under `src/`, `public/` or configuration.

#### Scenario: Working tree check
- GIVEN the audit is complete
- WHEN git status is checked
- THEN only untracked `keel/` differs
