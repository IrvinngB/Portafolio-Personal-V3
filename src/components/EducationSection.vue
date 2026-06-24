<template>
  <section
    id="education"
    ref="container"
    class="reveal-section section py-12 sm:py-16 lg:py-20"
    aria-labelledby="education-heading"
  >
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <div class="rule-thick mb-2 max-w-xs mx-auto"></div>
        <p class="text-kicker mb-3">
          {{ currentLanguage === 'es' ? 'Formación' : 'Background' }}
        </p>
        <h2 id="education-heading" class="text-h1">{{ t.education }}</h2>
        <div class="rule-thin mt-4 max-w-xs mx-auto"></div>
      </div>

      <div class="max-w-3xl mx-auto">
        <!-- Education Cards -->
        <div
          v-for="(education, index) in cvData.education"
          :key="index"
          class="reveal-child noir-card mb-6"
          :style="{ transitionDelay: `${index * 60}ms` }"
        >
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="flex items-start gap-4 mb-4 md:mb-0">
              <GraduationCap class="w-6 h-6 text-ink flex-shrink-0 mt-0.5" strokeWidth="2" />
              <div>
                <div class="rule-thin mb-3"></div>
                <h3 class="text-h2 mb-2">{{ education.degree }}</h3>
                <p class="text-byline mb-1">{{ education.institution }}</p>
                <p class="text-caption">{{ education.duration }}</p>
              </div>
            </div>

            <!-- Circular progress ring for current studies -->
            <div v-if="education.duration.toLowerCase().includes('2026')" class="flex flex-col items-center gap-2 mt-4 md:mt-0">
              <span class="text-label">{{ t.inProgress }}</span>
              <svg viewBox="0 0 36 36" class="w-16 h-16 -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--ink-faint)" stroke-width="2" />
                <circle
                  cx="18" cy="18" r="15.5" fill="none" stroke="var(--ink)" stroke-width="2"
                  stroke-linecap="round"
                  :stroke-dasharray="97.4"
                  :stroke-dashoffset="97.4 - (97.4 * getProgressPercentage(education.duration) / 100)"
                  class="transition-all duration-slow"
                />
                <text x="18" y="20" text-anchor="middle" fill="var(--ink)" font-size="7" font-weight="700" font-family="var(--font-headline)" transform="rotate(90 18 18)">
                  {{ getProgressPercentage(education.duration) }}%
                </text>
              </svg>
            </div>
          </div>
        </div>

        <!-- Highlights Grid -->
        <div class="reveal-child grid md:grid-cols-3 gap-4 mt-8" style="transition-delay: 80ms">
          <div class="noir-card text-center">
            <Award class="w-6 h-6 text-ink mx-auto mb-3" strokeWidth="2" />
            <div class="rule-thin mb-3"></div>
            <h4 class="text-h2 mb-2 text-base">{{ t.academicExcellence }}</h4>
            <p class="text-body text-sm">{{ t.academicExcellenceDesc }}</p>
          </div>
          <div class="noir-card text-center">
            <BookOpen class="w-6 h-6 text-ink mx-auto mb-3" strokeWidth="2" />
            <div class="rule-thin mb-3"></div>
            <h4 class="text-h2 mb-2 text-base">{{ t.activeLearning }}</h4>
            <p class="text-body text-sm">{{ t.activeLearningDesc }}</p>
          </div>
          <div class="noir-card text-center">
            <Users class="w-6 h-6 text-ink mx-auto mb-3" strokeWidth="2" />
            <div class="rule-thin mb-3"></div>
            <h4 class="text-h2 mb-2 text-base">{{ t.teamwork }}</h4>
            <p class="text-body text-sm">{{ t.teamworkDesc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { GraduationCap, Award, BookOpen, Users } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'

const { t, cvData, currentLanguage } = useLanguage()
const container = ref<HTMLElement>()

const { observe } = useScrollReveal()

onMounted(() => {
  if (container.value) observe(container.value)
})

const getProgressPercentage = (duration: string): number => {
  const match = duration.match(/(\w+)\s+(\d{4})\s*[–-]\s*(\w+)\s+(\d{4})/)
  if (!match) return 0

  const startMonth = match[1] ?? ''
  const startYear = parseInt(match[2] ?? '0')
  const endMonth = match[3] ?? ''
  const endYear = parseInt(match[4] ?? '0')

  const monthMap: Record<string, number> = {
    'Enero': 1, 'January': 1, 'Marzo': 3, 'March': 3,
    'Abril': 4, 'April': 4, 'Mayo': 5, 'May': 5,
    'Junio': 6, 'June': 6, 'Julio': 7, 'July': 7,
    'Agosto': 8, 'August': 8, 'Septiembre': 9, 'September': 9,
    'Octubre': 10, 'October': 10, 'Noviembre': 11, 'November': 11,
    'Diciembre': 12, 'December': 12
  }

  const startDate = new Date(startYear, (monthMap[startMonth] || 1) - 1)
  const endDate = new Date(endYear, (monthMap[endMonth] || 12) - 1)
  const currentDate = new Date()

  const totalDuration = endDate.getTime() - startDate.getTime()
  const elapsedDuration = currentDate.getTime() - startDate.getTime()

  const percentage = Math.min(Math.max((elapsedDuration / totalDuration) * 100, 0), 100)
  return Math.round(percentage)
}
</script>

<style scoped>
.reveal-section .reveal-child {
  opacity: 0;
  transform: translateY(16px);
}

.reveal-section.is-visible .reveal-child {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
</style>
