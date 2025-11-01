<template>
  <section id="education" class="section py-20 bg-white dark:bg-[#0A3D3D]">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t.education }}
        </h2>
        <div class="w-24 h-1 mx-auto" style="background-color: #3FA35B;"></div>
      </div>

      <div class="max-w-4xl mx-auto">
        <div
          v-for="(education, index) in cvData.education"
          :key="index"
          class="card education-card bg-gray-50 dark:bg-[#1f2937] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-8"
        >
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="flex items-start md:items-center mb-4 md:mb-0">
              <div class="p-4 rounded-xl mr-4 flex-shrink-0 dark:bg-[#0A3D3D]/50" :style="{ backgroundColor: 'rgba(63, 163, 91, 0.1)' }">
                <GraduationCap class="h-8 w-8 dark:text-[#B4D333]" :style="{ color: '#3FA35B' }" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ education.degree }}
                </h3>
                <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                  <School class="h-4 w-4" />
                  <span>{{ education.institution }}</span>
                </div>
                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Calendar class="h-4 w-4" />
                  <span class="text-sm">{{ education.duration }}</span>
                </div>
              </div>
            </div>
            
            <!-- Progress indicator for current studies -->
            <div v-if="education.duration.includes('2026')" class="flex flex-col items-end">
              <span class="text-sm font-medium mb-2 dark:text-[#B4D333]" :style="{ color: '#3FA35B' }">{{ t.inProgress }}</span>
              <div class="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div class="h-2 rounded-full" :style="{ width: getProgressPercentage(education.duration) + '%', backgroundColor: '#3FA35B' }"></div>
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ getProgressPercentage(education.duration) }}%</span>
            </div>
          </div>
        </div>

        <!-- Additional Education Info -->
        <div class="grid md:grid-cols-3 gap-6 mt-12">
          <div class="card education-card text-center rounded-xl p-6 dark:bg-[#0A3D3D]/20" :style="{ backgroundColor: 'rgba(63, 163, 91, 0.1)' }">
            <Award class="h-12 w-12 mx-auto mb-4 dark:text-[#B4D333]" :style="{ color: '#3FA35B' }" />
            <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ t.academicExcellence }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ t.academicExcellenceDesc }}</p>
          </div>
          
          <div class="card education-card text-center rounded-xl p-6 dark:bg-[#0A3D3D]/20" :style="{ backgroundColor: 'rgba(180, 211, 51, 0.1)' }">
            <BookOpen class="h-12 w-12 mx-auto mb-4 dark:text-[#C5D946]" :style="{ color: '#B4D333' }" />
            <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ t.activeLearning }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ t.activeLearningDesc }}</p>
          </div>
          
          <div class="card education-card text-center rounded-xl p-6 dark:bg-[#0A3D3D]/20" :style="{ backgroundColor: 'rgba(197, 217, 70, 0.1)' }">
            <Users class="h-12 w-12 mx-auto mb-4 dark:text-[#C5D946]" :style="{ color: '#C5D946' }" />
            <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ t.teamwork }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ t.teamworkDesc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { GraduationCap, School, Calendar, Award, BookOpen, Users } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useGSAP } from '../composables/useGSAP'

const { t, cvData } = useLanguage()

// Initialize animations
useGSAP()

const getProgressPercentage = (duration: string): number => {
  // Extract start and end dates from duration string
  const match = duration.match(/(\w+)\s+(\d{4})\s*[–-]\s*(\w+)\s+(\d{4})/)
  if (!match) return 0
  
  const startMonth = match[1]
  const startYear = parseInt(match[2] ?? '0')
  const endMonth = match[3]
  const endYear = parseInt(match[4] ?? '0')
  
  // Convert months to numbers (rough approximation)
  const monthMap: Record<string, number> = {
    'Enero': 1, 'January': 1, 'Marzo': 3, 'March': 3,
    'Abril': 4, 'April': 4, 'Mayo': 5, 'May': 5,
    'Junio': 6, 'June': 6, 'Julio': 7, 'July': 7,
    'Agosto': 8, 'August': 8, 'Septiembre': 9, 'September': 9,
    'Octubre': 10, 'October': 10, 'Noviembre': 11, 'November': 11,
    'Diciembre': 12, 'December': 12
  }

  const safeStartMonth = typeof startMonth === 'string' ? startMonth : ''
  const safeEndMonth = typeof endMonth === 'string' ? endMonth : ''
  
  const startDate = new Date(startYear, (monthMap[safeStartMonth] || 1) - 1)
  const endDate = new Date(endYear, (monthMap[safeEndMonth] || 12) - 1)
  const currentDate = new Date()
  
  const totalDuration = endDate.getTime() - startDate.getTime()
  const elapsedDuration = currentDate.getTime() - startDate.getTime()
  
  const percentage = Math.min(Math.max((elapsedDuration / totalDuration) * 100, 0), 100)
  return Math.round(percentage)
}
</script>