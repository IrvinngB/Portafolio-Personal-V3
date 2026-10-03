<template>
  <section
    id="education"
    ref="container"
    class="reveal-section section py-16 sm:py-20 lg:py-28"
    aria-labelledby="education-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
      <SectionHeader
        :eyebrow="currentLanguage === 'es' ? 'Formación' : 'Background'"
        :title="t.education"
        heading-id="education-heading"
      />

      <article
        v-for="(education, index) in cvData.education"
        :key="index"
        v-spotlight
        class="reveal-child edu-card"
        :style="{ transitionDelay: `${index * 80}ms` }"
      >
        <div class="flex flex-col md:flex-row md:items-start gap-6">
          <span class="edu-icon">
            <GraduationCap class="h-7 w-7" aria-hidden="true" />
          </span>

          <div class="flex-1 min-w-0">
            <h3 class="text-h2 text-fg">{{ education.degree }}</h3>
            <p class="flex items-center gap-2 mt-2 text-label-lg text-accent">
              <School class="h-4 w-4" aria-hidden="true" />
              {{ education.institution }}
            </p>

            <!-- Progress through the degree -->
            <div v-if="isOngoing(education.duration)" class="mt-8">
              <div class="flex items-baseline justify-between gap-4 mb-3">
                <span class="text-label-md text-muted">{{ t.inProgress }}</span>
                <span class="progress-value">{{ shown[index] ?? 0 }}%</span>
              </div>
              <div
                class="progress-track"
                role="progressbar"
                :aria-valuenow="progress[index] ?? 0"
                aria-valuemin="0"
                aria-valuemax="100"
                :aria-label="t.inProgress"
              >
                <div class="progress-fill" :style="{ transform: `scaleX(${(shown[index] ?? 0) / 100})` }"></div>
              </div>
              <div class="flex justify-between mt-3 text-mono text-muted">
                <span>{{ startOf(education.duration) }}</span>
                <span>{{ endOf(education.duration) }}</span>
              </div>
            </div>
            <p v-else class="text-mono text-muted mt-4">{{ education.duration }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { GraduationCap, School } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'
import SectionHeader from './SectionHeader.vue'

const { t, cvData, currentLanguage } = useLanguage()
const container = ref<HTMLElement>()
const { observe } = useScrollReveal()

const MONTHS: Record<string, number> = {
  enero: 1, january: 1, febrero: 2, february: 2, marzo: 3, march: 3,
  abril: 4, april: 4, mayo: 5, may: 5, junio: 6, june: 6,
  julio: 7, july: 7, agosto: 8, august: 8, septiembre: 9, september: 9,
  octubre: 10, october: 10, noviembre: 11, november: 11, diciembre: 12, december: 12,
}

const parts = (duration: string) => duration.split(/\s*[–-]\s*/)
const startOf = (duration: string) => parts(duration)[0] ?? ''
const endOf = (duration: string) => parts(duration)[1] ?? ''

const toDate = (label: string, fallbackMonth: number) => {
  const match = label.match(/([A-Za-zÁÉÍÓÚáéíóú]+)?\s*(\d{4})/)
  if (!match) return null
  const month = MONTHS[(match[1] ?? '').toLowerCase()] ?? fallbackMonth
  return new Date(Number(match[2]), month - 1)
}

const isOngoing = (duration: string) => {
  const end = toDate(endOf(duration), 12)
  return !!end && end.getTime() > Date.now()
}

const percentage = (duration: string) => {
  const start = toDate(startOf(duration), 1)
  const end = toDate(endOf(duration), 12)
  if (!start || !end) return 0
  const pct = ((Date.now() - start.getTime()) / (end.getTime() - start.getTime())) * 100
  return Math.round(Math.min(Math.max(pct, 0), 100))
}

// Depends on "now", so it's computed on the client only to keep SSR output stable
const progress = ref<number[]>([])
const shown = ref<number[]>([])

let raf = 0
let io: IntersectionObserver | null = null

const animate = () => {
  const start = performance.now()
  const tick = (now: number) => {
    const p = Math.min((now - start) / 1400, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    shown.value = progress.value.map(v => Math.round(v * eased))
    if (p < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  progress.value = cvData.value.education.map(e => percentage(e.duration))
  if (!container.value) return
  observe(container.value)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shown.value = [...progress.value]
    return
  }

  io = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      animate()
      io?.disconnect()
    }
  }, { threshold: 0.4 })
  io.observe(container.value)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  io?.disconnect()
})
</script>

<style scoped>
.edu-card {
  border-radius: var(--radius-xxl);
  border: 1px solid var(--border);
  background: var(--surface-container);
  padding: clamp(20px, 4vw, 40px);
}

.edu-card + .edu-card {
  margin-top: 20px;
}

.edu-card:hover {
  border-color: var(--accent-border);
}

.edu-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  color: var(--accent);
}

.progress-value {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  line-height: 1;
  color: var(--fg);
  font-variant-numeric: tabular-nums;
}

.progress-track {
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--surface-high);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent), var(--accent-alt));
  transform-origin: left;
}
</style>
