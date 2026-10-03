# Portfolio Fix Backlog Specification

## Purpose
Define a prioritized, actionable list of fixes derived from the audit findings, so the owner can decide what to change and in what order. The backlog is a report; it does not apply fixes.

## Requirements

### Requirement: Minimum backlog size and fields
The backlog MUST contain at least 10 ranked items. Each item MUST include rank, title, category affected, impact (High/Med/Low), effort (S/M/L), the evidence source (Lighthouse, axe, or source review), and the file path(s) involved.

#### Scenario: Complete item
- GIVEN any backlog item
- WHEN it is read
- THEN all seven fields are present
- AND file paths exist in the repository at audit time

#### Scenario: Too few findings
- GIVEN fewer than 10 distinct findings exist
- WHEN the backlog is published
- THEN it states the actual count and why

### Requirement: Ranking by impact versus effort
Items MUST be ordered so higher impact and lower effort come first, and the ordering rule MUST be stated.

#### Scenario: Quick win ranks above large work
- GIVEN a High-impact S-effort item and a High-impact L-effort item
- WHEN ranked
- THEN the S-effort item appears first

#### Scenario: Tie-break
- GIVEN two items with equal impact and effort
- WHEN ranked
- THEN the one with measured evidence ranks above the source-review-only one

### Requirement: Measured findings included
The backlog MUST include every measured failure: the muted text contrast violation (8 nodes in light, 5 in dark), the 2 label-content-name mismatches, render-blocking resources, and unused JavaScript.

#### Scenario: Contrast fix item
- GIVEN the axe contrast violation
- WHEN the backlog is read
- THEN one item targets the muted text token and the expected result is at least 4.5:1 in both themes

#### Scenario: Name mismatch item
- GIVEN the label-content-name-mismatch audit
- WHEN the backlog is read
- THEN an item covers both buttons, so the accessible name includes the visible text

### Requirement: Source-review findings included
The backlog MUST include the source-review issues from the exploration: missing og:image/twitter:image and twitter:card conflict, hreflang pointing to one URL, duplicate h1, static `lang`, keyboard-inaccessible cards and modal semantics, language persistence and inline ternaries, dead code, missing IoT image, and the runtime dependency listed as a devDependency.

#### Scenario: Dead code confirmed
- GIVEN a file is listed as dead code
- WHEN the backlog is published
- THEN the item states that no import references it was found
- AND the confirmed dead files are useDarkMode.ts, ProjectPlaceholder.vue, BuildingNowPanel.vue and vue.svg

#### Scenario: useTheme is not dead code
- GIVEN the exploration listed useTheme.ts as dead code
- WHEN the backlog is published
- THEN useTheme.ts is excluded or marked "not confirmed", because AppHeader.vue:5 imports it

#### Scenario: Finding disproved
- GIVEN reading the full source shows an earlier finding was wrong
- WHEN the backlog is published
- THEN the item is dropped or marked "not confirmed" with the reason

### Requirement: Light theme and live URL follow-up
The backlog MUST include an item to audit the light theme and the deployed URL, since neither was measured.

#### Scenario: Follow-up item present
- GIVEN the coverage gaps in the scorecard
- WHEN the backlog is read
- THEN an audit-follow-up item lists light theme and live URL

### Requirement: Score impact and non-application
Each item SHOULD state the category score it is expected to improve. The backlog MUST NOT be applied as part of this change, and personal-data exposure items MUST be marked as owner decisions.

#### Scenario: Owner decision
- GIVEN phone and email appear in page metadata
- WHEN the item is listed
- THEN it is labelled "owner decision" rather than a defect

#### Scenario: No code changes
- GIVEN the backlog is delivered
- WHEN the working tree is inspected
- THEN no files under `src/`, `public/` or configuration changed
