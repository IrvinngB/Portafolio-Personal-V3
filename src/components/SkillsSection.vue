<template>
  <section
    id="skills"
    ref="container"
    class="reveal-section section py-16 sm:py-20 lg:py-28"
    aria-labelledby="skills-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
      <SectionHeader
        :eyebrow="currentLanguage === 'es' ? 'Caja de herramientas' : 'Toolbox'"
        :title="t.technicalSkills"
        heading-id="skills-heading"
        :description="currentLanguage === 'es'
          ? 'Tecnologías con las que construyo productos digitales escalables y de alto rendimiento.'
          : 'Technologies I use to build scalable and high-performance digital products.'"
      />

      <TechIconSprite :names="marqueeItems" />

      <!-- Infinite stack marquee -->
      <div class="reveal-child marquee mb-10 sm:mb-12" aria-hidden="true">
        <div class="marquee-track">
          <span v-for="(tech, i) in [...marqueeItems, ...marqueeItems]" :key="i" class="marquee-item">
            <TechIcon :name="tech" class="marquee-icon" />
            {{ tech }}
          </span>
        </div>
      </div>

      <!-- Core stack: 4 primary categories -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <article
          v-for="(cat, i) in coreCategories"
          :key="cat.key"
          v-spotlight
          class="reveal-child skill-card"
          :style="{ transitionDelay: `${i * 60}ms` }"
        >
          <div class="flex items-center gap-3 mb-4">
            <span class="skill-icon">
              <component :is="cat.icon" class="w-5 h-5" aria-hidden="true" />
            </span>
            <h3 class="text-h3 text-fg">{{ cat.title }}</h3>
            <span class="ml-auto text-mono text-muted">{{ cat.skills.length }}</span>
          </div>
          <p v-if="cat.description" class="text-body-sm text-fg-soft mb-5">
            {{ cat.description }}
          </p>
          <ul class="flex flex-wrap gap-2 mt-auto">
            <li v-for="tech in cat.skills" :key="tech" class="skill-chip">
              <TechIcon :name="tech" class="w-3.5 h-3.5 shrink-0" />
              {{ tech }}
            </li>
          </ul>
        </article>
      </div>

      <!-- Secondary categories -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-4 sm:mt-5">
        <article
          v-for="(cat, i) in extraCategories"
          :key="cat.key"
          class="reveal-child skill-card skill-card-compact"
          :style="{ transitionDelay: `${240 + i * 60}ms` }"
        >
          <div class="flex items-center gap-2 mb-3">
            <component :is="cat.icon" class="w-4 h-4 text-accent" aria-hidden="true" />
            <h3 class="text-label-md text-muted">{{ cat.title }}</h3>
          </div>
          <ul class="space-y-1.5">
            <li v-for="tech in cat.skills" :key="tech" class="text-label-lg text-fg">
              {{ tech }}
            </li>
          </ul>
        </article>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  LayoutTemplate,
  ServerCog,
  Database,
  Wrench,
  ChartColumn,
  PenTool,
  Workflow,
  Languages,
} from 'lucide-vue-next'
import type { TechnicalSkills } from '../types'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'
import SectionHeader from './SectionHeader.vue'
import TechIcon from './TechIcon.vue'
import TechIconSprite from './TechIconSprite.vue'

const { t, cvData, currentLanguage } = useLanguage()
const container = ref<HTMLElement>()

const { observe } = useScrollReveal()

onMounted(() => {
  if (container.value) observe(container.value)
})

type SkillKey = keyof TechnicalSkills

const CORE: { key: SkillKey; icon: typeof Database }[] = [
  { key: 'frontend', icon: LayoutTemplate },
  { key: 'backend', icon: ServerCog },
  { key: 'databases', icon: Database },
  { key: 'tools', icon: Wrench },
]

const EXTRA: { key: SkillKey; icon: typeof Database }[] = [
  { key: 'dataAnalysis', icon: ChartColumn },
  { key: 'design', icon: PenTool },
  { key: 'methodologies', icon: Workflow },
  { key: 'languages', icon: Languages },
]

const toCategories = (defs: typeof CORE) => {
  const skills = cvData.value?.technicalSkills
  const descriptions = cvData.value?.skillsDetails?.descriptions as Partial<Record<SkillKey, string>> | undefined
  if (!skills) return []

  return defs
    .map(({ key, icon }) => ({
      key,
      icon,
      title: t.value[key],
      description: descriptions?.[key],
      skills: skills[key] ?? [],
    }))
    .filter(c => c.skills.length > 0)
}

const coreCategories = computed(() => toCategories(CORE))
const extraCategories = computed(() => toCategories(EXTRA))

const marqueeItems = computed(() => [...new Set(coreCategories.value.flatMap(c => c.skills))])

</script>

<style scoped>
.skill-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);
  background: var(--surface-container);
  padding: 24px;
}

.skill-card:hover {
  border-color: var(--accent-border);
  background: var(--surface-high);
}

.skill-card-compact {
  background: transparent;
  padding: 20px;
}

.skill-card-compact:hover {
  background: var(--surface-container);
}

.skill-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  color: var(--accent);
}

.skill-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: var(--fg);
  background: var(--surface-high);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  padding: 4px 12px;
  transition: color var(--duration-fast), border-color var(--duration-fast);
}

.skill-chip:hover {
  color: var(--accent);
  border-color: var(--accent-border);
}

.skill-card:hover .skill-chip {
  background: var(--surface-container);
}

/* ═══════ Marquee ═══════ */
.marquee {
  overflow: hidden;
  border-block: 1px solid var(--border);
  padding-block: 14px;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  gap: 40px;
  animation: marquee 40s linear infinite;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(18px, 2.4vw, 24px);
  font-weight: 300;
  color: var(--fg-soft);
  white-space: nowrap;
}

.marquee-icon {
  width: 0.95em;
  height: 0.95em;
  color: var(--accent);
  flex-shrink: 0;
}

@keyframes marquee {
  to { transform: translateX(calc(-50% - 20px)); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
    flex-wrap: wrap;
    width: auto;
  }
}
</style>
