<template>
  <section
    id="projects"
    ref="container"
    class="reveal-section section py-16 sm:py-20 lg:py-28"
    aria-labelledby="projects-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
      <SectionHeader
        :eyebrow="currentLanguage === 'es' ? 'Trabajo seleccionado' : 'Selected work'"
        :title="t.featuredProjects"
        heading-id="projects-heading"
      >
        <a
          v-if="cvData?.github"
          :href="cvData.github"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-btn text-fg-soft hover:text-accent transition-colors duration-fast min-h-[44px]"
        >
          <Github class="w-4 h-4" aria-hidden="true" />
          {{ currentLanguage === 'es' ? 'Todos en GitHub' : 'All on GitHub' }}
          <ArrowUpRight class="w-4 h-4" aria-hidden="true" />
        </a>
      </SectionHeader>

      <!-- Featured project -->
      <article
        v-if="featured"
        v-spotlight
        class="reveal-child featured-card"
        :aria-labelledby="`project-${featured.index}`"
      >
        <div class="grid lg:grid-cols-5 gap-8 lg:gap-12 relative z-10">
          <!-- Left: story -->
          <div class="lg:col-span-3 flex flex-col">
            <div class="flex flex-wrap items-center gap-3 mb-5">
              <span class="project-icon project-icon-lg">
                <component :is="categoryIcon(featured.project.category)" class="w-6 h-6" aria-hidden="true" />
              </span>
              <span class="text-label-md text-accent">
                {{ currentLanguage === 'es' ? 'Proyecto destacado' : 'Featured project' }}
              </span>
              <StatusBadge :status="featured.project.status" :lang="currentLanguage" />
            </div>

            <h3 :id="`project-${featured.index}`" class="featured-title">
              {{ featured.project.title }}
            </h3>

            <div v-if="featured.project.problem" class="case-block mt-6">
              <p class="text-label-md text-muted">{{ currentLanguage === 'es' ? 'El problema' : 'The problem' }}</p>
              <p class="text-body-lg text-fg mt-1.5">{{ featured.project.problem }}</p>
            </div>
            <div class="case-block mt-5">
              <p class="text-label-md text-muted">{{ currentLanguage === 'es' ? 'La solución' : 'The solution' }}</p>
              <p class="text-body-md text-fg-soft mt-1.5">{{ featured.project.description }}</p>
            </div>
            <div v-if="featured.project.outcome" class="case-block case-block-accent mt-5">
              <p class="text-label-md text-accent">{{ currentLanguage === 'es' ? 'El resultado' : 'The outcome' }}</p>
              <p class="text-body-md text-fg mt-1.5">{{ featured.project.outcome }}</p>
            </div>

            <div class="flex flex-wrap gap-3 mt-auto pt-8">
              <a
                v-if="featured.project.url"
                :href="featured.project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary"
              >
                {{ currentLanguage === 'es' ? 'Ver demo' : 'Live demo' }}
                <ArrowUpRight class="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                v-if="featured.project.github"
                :href="featured.project.github"
                target="_blank"
                rel="noopener noreferrer"
                :class="featured.project.url ? 'btn-secondary' : 'btn-primary'"
              >
                <Github class="w-4 h-4" aria-hidden="true" />
                {{ currentLanguage === 'es' ? 'Ver código' : 'View code' }}
              </a>
            </div>
          </div>

          <!-- Right: highlights + stack -->
          <div class="lg:col-span-2 flex flex-col gap-6">
            <div v-if="featured.project.highlights?.length">
              <h4 class="text-label-md text-muted mb-4">
                {{ currentLanguage === 'es' ? 'Lo que resuelve' : 'What it does' }}
              </h4>
              <ul class="space-y-3">
                <li
                  v-for="item in featured.project.highlights"
                  :key="item"
                  class="flex gap-3 text-body-md text-fg"
                >
                  <Check class="w-4 h-4 mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="text-label-md text-muted mb-3">Stack</h4>
              <ul class="flex flex-wrap gap-2" :aria-label="currentLanguage === 'es' ? 'Tecnologías' : 'Technologies'">
                <li v-for="tech in featured.project.technologies" :key="tech" class="tech-chip">
                  {{ tech }}
                </li>
              </ul>
            </div>
          </div>
        </div>

      </article>

      <!-- Rest of the projects: compact, expandable -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-4 sm:mt-5 items-start">
        <article
          v-for="(item, i) in others"
          :key="item.project.title"
          v-spotlight
          class="reveal-child project-card"
          :class="{ 'is-open': isOpen(item.index) }"
          :style="{ transitionDelay: `${(i + 1) * 80}ms` }"
          :aria-labelledby="`project-${item.index}`"
        >
          <div class="flex items-center gap-3 mb-4">
            <span class="project-icon">
              <component :is="categoryIcon(item.project.category)" class="w-5 h-5" aria-hidden="true" />
            </span>
            <StatusBadge :status="item.project.status" :lang="currentLanguage" />
          </div>

          <h3 :id="`project-${item.index}`" class="project-title">
            {{ item.project.title }}
          </h3>

          <p class="text-body-md text-fg-soft mt-2">
            {{ item.project.problem ?? item.project.description }}
          </p>

          <ul class="flex flex-wrap gap-1.5 mt-4" :aria-label="currentLanguage === 'es' ? 'Tecnologías' : 'Technologies'">
            <li
              v-for="tech in isOpen(item.index) ? item.project.technologies : item.project.technologies?.slice(0, 3)"
              :key="tech"
              class="tech-chip tech-chip-sm"
            >
              {{ tech }}
            </li>
            <li
              v-if="!isOpen(item.index) && (item.project.technologies?.length ?? 0) > 3"
              class="tech-chip tech-chip-sm"
            >
              +{{ (item.project.technologies?.length ?? 0) - 3 }}
            </li>
          </ul>

          <!-- Details: animates open with grid-template-rows 0fr -> 1fr -->
          <div :id="`project-details-${item.index}`" class="details" :inert="!isOpen(item.index) || undefined">
            <div class="details-inner">
              <p class="text-label-md text-muted mt-5">{{ currentLanguage === 'es' ? 'La solución' : 'The solution' }}</p>
              <p class="text-body-md text-fg-soft mt-1.5">{{ item.project.description }}</p>

              <p v-if="item.project.outcome" class="text-body-md text-fg mt-4">
                <span class="text-accent">→</span> {{ item.project.outcome }}
              </p>

              <div class="flex flex-wrap gap-x-5 gap-y-1 mt-4">
                <a
                  v-if="item.project.github"
                  :href="item.project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="card-link"
                  :aria-label="`${currentLanguage === 'es' ? 'Código de' : 'Source code for'} ${item.project.title}`"
                >
                  <Github class="w-4 h-4" aria-hidden="true" />
                  {{ currentLanguage === 'es' ? 'Código' : 'Code' }}
                </a>
                <a
                  v-if="item.project.url"
                  :href="item.project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="card-link"
                  :aria-label="`${t.viewProject}: ${item.project.title}`"
                >
                  Demo
                  <ArrowUpRight class="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="toggle"
            :aria-expanded="isOpen(item.index)"
            :aria-controls="`project-details-${item.index}`"
            @click="toggle(item.index)"
          >
            {{ isOpen(item.index)
              ? (currentLanguage === 'es' ? 'Ver menos' : 'Show less')
              : (currentLanguage === 'es' ? 'Ver detalles' : 'View details') }}
            <ChevronDown class="toggle-icon w-4 h-4" aria-hidden="true" />
          </button>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h, type FunctionalComponent } from 'vue'
import { ArrowUpRight, Github, Check, Mountain, BotMessageSquare, Cpu, Globe, ChevronDown } from 'lucide-vue-next'
import type { Project, ProjectCategory } from '../types'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'
import SectionHeader from './SectionHeader.vue'

const { t, cvData, currentLanguage } = useLanguage()
const container = ref<HTMLElement>()
const { observe } = useScrollReveal()

onMounted(() => {
  if (container.value) observe(container.value)
})

// Keep the original index so numbering and ids stay stable across layouts
const indexed = computed(() =>
  (cvData.value?.projects ?? []).map((project, index) => ({ project, index }))
)
const featured = computed(() => indexed.value.find(p => p.project.featured) ?? indexed.value[0])
const others = computed(() => indexed.value.filter(p => p !== featured.value))

const openCards = ref(new Set<number>())
const isOpen = (index: number) => openCards.value.has(index)
const toggle = (index: number) => {
  const next = new Set(openCards.value)
  if (next.has(index)) next.delete(index)
  else next.add(index)
  openCards.value = next
}

const ICONS: Record<ProjectCategory, typeof Globe> = {
  geo: Mountain,
  ai: BotMessageSquare,
  iot: Cpu,
  web: Globe,
}
const categoryIcon = (category?: ProjectCategory) => (category ? ICONS[category] : Globe)

const StatusBadge: FunctionalComponent<{ status?: Project['status']; lang: string }> = ({ status, lang }) => {
  const active = status === 'active'
  const label = active
    ? (lang === 'es' ? 'En desarrollo' : 'In progress')
    : (lang === 'es' ? 'Completado' : 'Completed')
  return h('span', { class: ['status-badge', active && 'status-badge-active'] }, [
    h('span', { class: 'status-dot', 'aria-hidden': 'true' }),
    label,
  ])
}
</script>

<style scoped>
/* ═══════ Featured ═══════ */
.featured-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xxl);
  border: 1px solid var(--accent-border);
  background:
    radial-gradient(120% 140% at 100% 0%, var(--accent-dim) 0%, transparent 55%),
    var(--surface-container);
  padding: clamp(24px, 4vw, 48px);
}

.featured-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(24px, 3.5vw, 36px);
  font-weight: 600;
  line-height: 1.1;
  color: var(--fg);
}

/* ═══════ Cards ═══════ */
.project-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);
  background: var(--surface-container);
  padding: 24px;
}

.project-card:hover {
  background: var(--surface-high);
  border-color: var(--accent-border);
}

.case-block {
  border-left: 2px solid var(--border);
  padding-left: 16px;
}

.case-block-accent {
  border-left-color: var(--accent);
}

.details {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--duration-normal) var(--ease-out);
}

.details-inner {
  overflow: hidden;
  min-height: 0;
}

.is-open .details {
  grid-template-rows: 1fr;
}

.toggle {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  min-height: 44px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--fg-soft);
  transition: color var(--duration-fast);
}

.toggle:hover {
  color: var(--accent);
}

.toggle-icon {
  transition: transform var(--duration-normal) var(--ease-out);
}

.is-open .toggle-icon {
  transform: rotate(180deg);
}

.project-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(18px, 2.2vw, 20px);
  font-weight: 600;
  line-height: 1.2;
  color: var(--fg);
}

.project-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  color: var(--accent);
}

.project-icon-lg {
  width: 48px;
  height: 48px;
}

/* ═══════ Status ═══════ */
:deep(.status-badge) {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: var(--muted);
}

:deep(.status-dot) {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--muted);
}

:deep(.status-badge-active) {
  color: var(--accent);
}

:deep(.status-badge-active .status-dot) {
  background: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dim);
}

/* ═══════ Chips & links ═══════ */
.tech-chip {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: var(--fg);
  background: var(--surface-high);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  padding: 4px 12px;
}

.tech-chip-sm {
  font-size: 11px;
  padding: 3px 10px;
  color: var(--fg-soft);
}

.project-card:hover .tech-chip-sm {
  background: var(--surface-container);
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--fg-soft);
  transition: color var(--duration-fast);
}

.card-link:hover {
  color: var(--accent);
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 22px;
  border-radius: var(--radius-full);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  transition: background var(--duration-fast), color var(--duration-fast), border-color var(--duration-fast);
}

.btn-primary {
  background: var(--accent);
  color: var(--accent-fg);
}

.btn-primary:hover {
  background: var(--accent-alt);
}

.btn-secondary {
  border: 1px solid var(--accent-border);
  color: var(--accent);
}

.btn-secondary:hover {
  border-color: var(--accent);
  background: var(--accent-dim);
}

</style>
