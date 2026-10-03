# Audit results (real runs, 2026-10-01)

Raw outputs: /private/tmp/claude-501/-Users-Irvinng-Developer-Proyectos-Portafolio-Personal-V3/32a6386f-2d5c-40b0-8059-a49072c61ce4/scratchpad (build.txt, build-vitessg.txt, lh-mobile.json, lh-desktop.json, axe.json, axe.log)

## 1. Build
- `npm run build` FAILED at `vue-tsc -b`: TS6053 `node_modules/typescript/lib/lib.dom.d.ts` not found. Local node_modules is corrupted (file missing). Not a source error; fix = reinstall (rm -rf node_modules && npm ci). I did not do this (deletion blocked / read-only audit), so type-check is NOT verified.
- `npx vite-ssg build` (second half of the script) OK in ~1.7s, 1 page prerendered (index.html 74 KiB / 13.5 kB reported client shell). Only warning: "use client" directive ignored in src/composables/useLanguage.ts.
- Chunks (raw / gzip): all-*.js 258.3 kB / 94.9 (largest, likely lucide/gsap), app-*.js 135.7 / 50.5, CSSPlugin (gsap) 70.0 / 27.4, ContactSection 9.4 / 3.4, EducationSection 6.3 / 2.5, ProjectsSection 4.7 / 2.0, others < 4 kB. app.css 27.2 / 6.3.

## 2. Lighthouse (v from npx, headless Chrome, vite preview :4173)
> SUPERSEDED: this single-run section is replaced by "Lighthouse median of 5 runs" below. Do not cite these values (e.g. FCP 2.3 s vs median 2.27 s).

| | Mobile | Desktop |
|---|---|---|
| Performance | 94 | 100 |
| Accessibility | 96 | 96 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 2.6 s | 0.6 s |
| FCP | 2.3 s | 0.6 s |
| CLS | 0.001 | 0.002 |
| TBT | 0 ms | 0 ms |
| Speed Index | 2.3 s | 0.6 s |

Failing/weak audits (both): color-contrast (5 nodes), label-content-name-mismatch (2 buttons: aria-label="Go to home" and the CTA button with aria-label not containing visible text), unused-javascript (~80 KiB), render-blocking (300 ms mobile / 220 ms desktop), network-dependency-tree. Mobile only: FCP 0.75, LCP 0.88 scores. Informational agentic category 50: llms-txt and ard-schema missing (not core scores).

## 3. axe-core 4.13.0
1 violation: color-contrast [serious], 5 nodes (same as Lighthouse):
- Location span (hero, "Location: Panamá Oeste, Panamá")
- #experience eyebrow label (p.text-label-md.text-muted)
- #projects eyebrow label (span.text-label-md.text-muted)
- #education eyebrow label (p.text-label-md.text-muted)
- footer span.text-caption.text-muted
Cause: `text-muted` = #566a68 on #071f1f = 2.98:1 at 11px (needs 4.5:1). Single token fix. Checked in dark theme only (default); light theme not audited.

## Not run / caveats
- Type-check not verified (broken node_modules).
- Single page, default theme only; no interaction states audited.
- Preview server stopped.

## Update: type-check
After `rm -rf node_modules && npm ci`, `npm run build` passes (vue-tsc -b + vite-ssg). The earlier TS6053 was a corrupted install, not a source error.

## Lighthouse median of 5 runs

Lighthouse 13.5.0, headless Chrome, `vite preview` on localhost:4173 (built dist). Raw JSONs: scratchpad `lh-{mobile,desktop}-{1..5}.json`. Desktop uses 1350x940, no CPU slowdown, 40 ms RTT / 10 Mbps.

### mobile

| Metric | R1 | R2 | R3 | R4 | R5 | Median | Min | Max |
|---|---|---|---|---|---|---|---|---|
| Performance | 92 | 94 | 94 | 94 | 94 | **94** | 92 | 94 |
| Accessibility | 96 | 96 | 96 | 96 | 96 | **96** | 96 | 96 |
| Best Practices | 100 | 100 | 100 | 100 | 100 | **100** | 100 | 100 |
| SEO | 100 | 100 | 100 | 100 | 100 | **100** | 100 | 100 |
| LCP (s) | 2.85 | 2.59 | 2.59 | 2.60 | 2.60 | **2.60** | 2.59 | 2.85 |
| FCP (s) | 2.43 | 2.27 | 2.27 | 2.28 | 2.27 | **2.27** | 2.27 | 2.43 |
| CLS | 0.001 | 0.001 | 0.001 | 0.001 | 0.001 | **0.001** | 0.001 | 0.001 |
| TBT (ms) | 0 | 0 | 0 | 0 | 0 | **0** | 0 | 0 |

### desktop

| Metric | R1 | R2 | R3 | R4 | R5 | Median | Min | Max |
|---|---|---|---|---|---|---|---|---|
| Performance | 100 | 100 | 100 | 100 | 100 | **100** | 100 | 100 |
| Accessibility | 96 | 96 | 96 | 96 | 96 | **96** | 96 | 96 |
| Best Practices | 100 | 100 | 100 | 100 | 100 | **100** | 100 | 100 |
| SEO | 100 | 100 | 100 | 100 | 100 | **100** | 100 | 100 |
| LCP (s) | 0.64 | 0.64 | 0.65 | 0.64 | 0.64 | **0.64** | 0.64 | 0.65 |
| FCP (s) | 0.63 | 0.63 | 0.64 | 0.62 | 0.63 | **0.63** | 0.62 | 0.64 |
| CLS | 0.002 | 0.002 | 0.002 | 0.002 | 0.002 | **0.002** | 0.002 | 0.002 |
| TBT (ms) | 0 | 0 | 0 | 0 | 0 | **0** | 0 | 0 |

### axe-core 4.13.0, LIGHT theme (desktop 1350x940, full page scrolled to trigger reveals)

1 violation: color-contrast [serious], 8 nodes (raw: scratchpad `axe-light.json`):
- Location span (hero): 2.49:1 (#95a29c on #f4faf0, 11px)
- #experience, #education eyebrow labels and one more `.block.mb-3.text-muted` (projects eyebrow): 2.49:1
- 3 timeline `<time>` elements (experience cards): 2.46:1 (#8f9e95 on #eaf3e4)
- Footer `.text-caption.text-muted`: 2.49:1
Cause: same `text-muted` token, worse in light theme (about 2.5:1 vs 2.98:1 in dark; needs 4.5:1). Fix the token in both themes. Light theme also adds the 3 timeline dates not flagged in dark.
Not run: Lighthouse a11y was not re-run in light theme.
