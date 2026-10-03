# Structure
Last refreshed: 2026-10-01
- src/main.ts, App.vue: entry and root.
- src/components/*Section.vue: page sections; AppHeader/AppFooter, EasterEgg.
- src/composables/: useDarkMode, useTheme, useLanguage, useScrollReveal, useHeroAnimation.
- src/data/: cvData.ts, translations.ts (all content and i18n strings).
- src/types/index.ts: shared types. src/style.css: global styles.
- Config: vite.config.ts, tailwind.config.cjs, postcss.config.cjs, tsconfig.{app,node}.json.
- Dead files (no imports): composables/useDarkMode.ts, components/ProjectPlaceholder.vue, components/BuildingNowPanel.vue, assets/vue.svg. useTheme.ts is live (AppHeader.vue:5). Do not build on the dead ones.
- New UI copy goes in src/data/translations.ts, not inline ES/EN ternaries (31 exist today, flagged as debt).
- Audit/change artifacts live in keel/ (untracked).
