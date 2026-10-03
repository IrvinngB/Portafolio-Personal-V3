<template>
  <section
    id="experience"
    ref="container"
    class="reveal-section section py-16 sm:py-20 lg:py-28"
    aria-labelledby="experience-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
      <SectionHeader
        :eyebrow="currentLanguage === 'es' ? 'Trayectoria' : 'Career'"
        :title="t.workExperience"
        heading-id="experience-heading"
      />

      <ol ref="listRef" class="timeline" :style="{ '--progress': progress }">
        <li
          v-for="(experience, index) in cvData.workExperience"
          :key="index"
          class="reveal-child timeline-item"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <!-- Date (left column on desktop) -->
          <div class="timeline-meta">
            <time class="text-mono text-fg-soft">{{ experience.duration }}</time>
            <span v-if="isCurrent(experience.duration)" class="current-badge">
              {{ currentLanguage === 'es' ? 'Actual' : 'Current' }}
            </span>
          </div>

          <!-- Node -->
          <span class="timeline-node" :class="{ 'timeline-node-current': isCurrent(experience.duration) }" aria-hidden="true"></span>

          <!-- Content -->
          <div v-spotlight class="timeline-card">
            <h3 class="text-h2 text-fg">{{ experience.position }}</h3>
            <p class="flex items-center gap-2 mt-2 text-label-lg text-accent">
              <Building2 class="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              {{ experience.company }}
            </p>
            <p class="text-body-md text-fg-soft mt-4">{{ experience.description }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Building2 } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'
import SectionHeader from './SectionHeader.vue'

const { t, cvData, currentLanguage } = useLanguage()
const container = ref<HTMLElement>()
const listRef = ref<HTMLElement>()
const progress = ref(0)

const { observe } = useScrollReveal()

const isCurrent = (duration: string) => /presente|present/i.test(duration)

// Fill the timeline line as the list scrolls past the middle of the viewport
let raf = 0
const updateProgress = () => {
  raf = 0
  const el = listRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const anchor = window.innerHeight * 0.6
  progress.value = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1)
}
const onScroll = () => {
  if (!raf) raf = requestAnimationFrame(updateProgress)
}

onMounted(() => {
  if (container.value) observe(container.value)
  updateProgress()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<style scoped>
.timeline {
  --rail: 11px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0;
  margin: 0;
  list-style: none;
}

/* Base rail + filled rail */
.timeline::before,
.timeline::after {
  content: '';
  position: absolute;
  left: var(--rail);
  top: 8px;
  bottom: 8px;
  width: 2px;
  border-radius: 2px;
}

.timeline::before {
  background: var(--border);
}

.timeline::after {
  background: linear-gradient(to bottom, var(--accent), var(--accent-alt));
  transform-origin: top;
  transform: scaleY(var(--progress, 0));
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  padding-left: 40px;
  gap: 10px;
}

.timeline-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.timeline-node {
  position: absolute;
  left: calc(var(--rail) - 5px);
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--accent);
  z-index: 1;
}

.timeline-node-current {
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-dim);
}

.timeline-card {
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);
  background: var(--surface-container);
  padding: 20px;
}

.timeline-card:hover {
  border-color: var(--accent-border);
}

.current-badge {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-full);
  padding: 2px 8px;
}

/* Desktop: date column | rail | card */
@media (min-width: 768px) {
  .timeline {
    --rail: calc(220px + 31px); /* centered in the 64px gap */
    gap: 32px;
  }

  .timeline-item {
    grid-template-columns: 220px 1fr;
    gap: 64px;
    padding-left: 0;
  }

  .timeline-meta {
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
    padding-top: 0;
  }

  .timeline-card {
    padding: 24px 28px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .timeline::after {
    transform: scaleY(1);
  }
}
</style>
