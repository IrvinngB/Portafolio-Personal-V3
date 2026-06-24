<template>
  <section
    id="education"
    ref="container"
    class="reveal-section section py-12 sm:py-16 lg:py-20 bg-bg relative overflow-hidden"
    aria-labelledby="education-heading"
  >
    <!-- Sticker -->
    <div class="sticker sticker-float top-24 left-[7%] w-9 h-9" style="animation-delay: 1.5s;">
      <div class="sticker-shape w-full h-full bg-accent-teal rotate-[22deg]"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <p class="text-label text-accent-purple mb-3">
          {{ currentLanguage === 'es' ? 'Formación' : 'Background' }}
        </p>
        <h2 id="education-heading" class="text-h1">
          {{ t.education }}
        </h2>
      </div>

      <div class="max-w-4xl mx-auto">
        <!-- Education Card -->
        <div
          v-for="(education, index) in cvData.education"
          :key="index"
          class="reveal-child brutal-card p-5 sm:p-8 mb-8"
          :style="{ transitionDelay: `${index * 60}ms` }"
        >
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="flex items-start md:items-center gap-4 mb-4 md:mb-0">
              <!-- Icon -->
              <div class="w-14 h-14 bg-accent-purple rounded-card flex items-center justify-center flex-shrink-0 border-2 border-border">
                <GraduationCap class="h-7 w-7 text-surface" strokeWidth="2.5" />
              </div>
              <div>
                <h3 class="text-h2 mb-2">{{ education.degree }}</h3>
                <!-- Institution -->
                <div class="flex items-center gap-2 mb-1.5">
                  <School class="h-4 w-4 text-accent-purple" />
                  <span class="text-body-md">{{ education.institution }}</span>
                </div>
                <!-- Duration -->
                <div class="flex items-center gap-2">
                  <Calendar class="h-4 w-4 text-fg-soft opacity-50" />
                  <span class="text-label text-fg-soft opacity-60">{{ education.duration }}</span>
                </div>
              </div>
            </div>

            <!-- Circular progress ring for current studies -->
            <div v-if="education.duration.toLowerCase().includes('2026')" class="flex flex-col items-center gap-2 mt-4 md:mt-0">
              <span class="text-label text-accent-yellow">{{ t.inProgress }}</span>
              <svg viewBox="0 0 36 36" class="w-16 h-16 -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--fg-soft)" stroke-opacity="0.15" stroke-width="2.5" />
                <circle
                  cx="18" cy="18" r="15.5" fill="none" stroke="var(--accent-yellow)" stroke-width="2.5"
                  stroke-linecap="round"
                  :stroke-dasharray="97.4"
                  :stroke-dashoffset="97.4 - (97.4 * getProgressPercentage(education.duration) / 100)"
                  class="transition-all duration-slow"
                />
                <text x="18" y="20" text-anchor="middle" fill="var(--fg)" font-size="8" font-weight="600" font-family="'Space Grotesk', sans-serif" transform="rotate(90 18 18)">
                  {{ getProgressPercentage(education.duration) }}%
                </text>
              </svg>
            </div>
          </div>
        </div>

        <!-- Highlights Grid -->
        <div class="reveal-child grid md:grid-cols-3 gap-4 sm:gap-6 mt-8" style="transition-delay: 80ms">
          <div class="brutal-card p-5 text-center">
            <div class="w-12 h-12 bg-accent-teal rounded-card flex items-center justify-center mx-auto mb-3 border-2 border-border">
              <Award class="h-6 w-6 text-surface" strokeWidth="2.5" />
            </div>
            <h4 class="text-h2 mb-2">{{ t.academicExcellence }}</h4>
            <p class="text-body-md">{{ t.academicExcellenceDesc }}</p>
          </div>
          <div class="brutal-card p-5 text-center">
            <div class="w-12 h-12 bg-accent-pink rounded-card flex items-center justify-center mx-auto mb-3 border-2 border-border">
              <BookOpen class="h-6 w-6 text-surface" strokeWidth="2.5" />
            </div>
            <h4 class="text-h2 mb-2">{{ t.activeLearning }}</h4>
            <p class="text-body-md">{{ t.activeLearningDesc }}</p>
          </div>
          <div class="brutal-card p-5 text-center">
            <div class="w-12 h-12 bg-accent-blue rounded-card flex items-center justify-center mx-auto mb-3 border-2 border-border">
              <Users class="h-6 w-6 text-surface" strokeWidth="2.5" />
            </div>
            <h4 class="text-h2 mb-2">{{ t.teamwork }}</h4>
            <p class="text-body-md">{{ t.teamworkDesc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { GraduationCap, School, Calendar, Award, BookOpen, Users } from 'lucide-vue-next'
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
  transition: opacity 0.6s ease,
              transform 0.6s ease;
}
</style>
