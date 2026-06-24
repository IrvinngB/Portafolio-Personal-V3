<template>
  <section
    id="education"
    ref="container"
    class="reveal-section section py-12 sm:py-16 lg:py-20"
    aria-labelledby="education-heading"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <p class="text-label-md text-muted mb-3">
          {{ currentLanguage === 'es' ? 'Formación' : 'Background' }}
        </p>
        <h2 id="education-heading" class="text-h1 text-fg">
          {{ t.education }}
        </h2>
      </div>

      <div class="max-w-4xl mx-auto">
        <!-- Education Card -->
        <div
          v-for="(education, index) in cvData.education"
          :key="index"
          class="reveal-child bg-surface-container hover:bg-surface-high transition-colors duration-fast rounded-xxl p-5 sm:p-8 mb-8 border border-border"
          :style="{ transitionDelay: `${index * 60}ms` }"
        >
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="flex items-start md:items-center gap-4 mb-4 md:mb-0">
              <!-- Icon -->
              <div class="w-14 h-14 rounded-xl bg-accent-dim text-accent flex items-center justify-center flex-shrink-0">
                <GraduationCap class="h-7 w-7" strokeWidth="2.5" />
              </div>
              <div>
                <h3 class="text-h2 text-fg mb-2">{{ education.degree }}</h3>
                <!-- Institution -->
                <div class="flex items-center gap-2 mb-1.5">
                  <School class="h-4 w-4 text-accent" />
                  <span class="text-body-md text-fg-soft">{{ education.institution }}</span>
                </div>
                <!-- Duration -->
                <div class="flex items-center gap-2 text-muted">
                  <Calendar class="h-4 w-4" />
                  <span class="text-caption">{{ education.duration }}</span>
                </div>
              </div>
            </div>

            <!-- Progress for current studies -->
            <div v-if="education.duration.toLowerCase().includes('2026')" class="flex flex-col items-end">
              <span class="text-label-sm text-accent mb-2">{{ t.inProgress }}</span>
              <div class="w-32 bg-surface-high rounded-full h-1.5">
                <div
                  class="h-1.5 rounded-full bg-accent transition-all duration-slow"
                  :style="{ width: getProgressPercentage(education.duration) + '%' }"
                ></div>
              </div>
              <span class="text-caption text-muted mt-1">{{ getProgressPercentage(education.duration) }}%</span>
            </div>
          </div>
        </div>

        <!-- Highlights Grid -->
        <div class="reveal-child grid md:grid-cols-3 gap-4 sm:gap-6 mt-8" style="transition-delay: 80ms">
          <div class="bg-surface-container hover:bg-surface-high transition-colors duration-fast rounded-xl p-5 text-center border border-border">
            <div class="w-12 h-12 rounded-xl bg-accent-dim text-accent flex items-center justify-center mx-auto mb-3">
              <Award class="h-6 w-6" strokeWidth="2.5" />
            </div>
            <h4 class="text-h3 text-fg mb-2">{{ t.academicExcellence }}</h4>
            <p class="text-body-sm text-fg-soft">{{ t.academicExcellenceDesc }}</p>
          </div>
          <div class="bg-surface-container hover:bg-surface-high transition-colors duration-fast rounded-xl p-5 text-center border border-border">
            <div class="w-12 h-12 rounded-xl bg-accent-dim text-accent flex items-center justify-center mx-auto mb-3">
              <BookOpen class="h-6 w-6" strokeWidth="2.5" />
            </div>
            <h4 class="text-h3 text-fg mb-2">{{ t.activeLearning }}</h4>
            <p class="text-body-sm text-fg-soft">{{ t.activeLearningDesc }}</p>
          </div>
          <div class="bg-surface-container hover:bg-surface-high transition-colors duration-fast rounded-xl p-5 text-center border border-border">
            <div class="w-12 h-12 rounded-xl bg-accent-dim text-accent flex items-center justify-center mx-auto mb-3">
              <Users class="h-6 w-6" strokeWidth="2.5" />
            </div>
            <h4 class="text-h3 text-fg mb-2">{{ t.teamwork }}</h4>
            <p class="text-body-sm text-fg-soft">{{ t.teamworkDesc }}</p>
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
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}
</style>
