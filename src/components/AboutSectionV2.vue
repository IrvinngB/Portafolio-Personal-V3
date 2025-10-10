<template>
  <section id="about" class="section py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t.professionalProfile }}
        </h2>
        <div class="w-24 h-1 bg-blue-600 mx-auto"></div>
      </div>

      <div class="max-w-4xl mx-auto">
        <!-- Profile Quote -->
        <div class="text-center mb-16">
          <div class="relative inline-block">
            <div class="absolute -top-4 -left-4 text-6xl text-blue-200 dark:text-blue-800 font-bold">"</div>
            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light italic leading-relaxed px-8">
              {{ cvData.professionalProfile }}
            </p>
            <div class="absolute -bottom-4 -right-4 text-6xl text-blue-200 dark:text-blue-800 font-bold">"</div>
          </div>
        </div>

        <!-- Simple Timeline -->
        <div class="flex flex-col md:flex-row items-center justify-center gap-8">
          <div class="flex items-center gap-4 text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {{ cvData.projects.length }}+
            </div>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">{{ currentLanguage === 'es' ? 'Proyectos' : 'Projects' }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">{{ currentLanguage === 'es' ? 'Completados' : 'Completed' }}</div>
            </div>
          </div>

          <div class="hidden md:block w-12 h-px bg-gradient-to-r from-blue-400 to-purple-400"></div>
          <div class="md:hidden h-12 w-px bg-gradient-to-b from-blue-400 to-purple-400"></div>

          <div class="flex items-center gap-4 text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              2+
            </div>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">{{ currentLanguage === 'es' ? 'Años' : 'Years' }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">{{ currentLanguage === 'es' ? 'Experiencia' : 'Experience' }}</div>
            </div>
          </div>

          <div class="hidden md:block w-12 h-px bg-gradient-to-r from-purple-400 to-green-400"></div>
          <div class="md:hidden h-12 w-px bg-gradient-to-b from-purple-400 to-green-400"></div>

          <div class="flex items-center gap-4 text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              <Heart class="h-6 w-6" />
            </div>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">100%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">{{ currentLanguage === 'es' ? 'Dedicación' : 'Dedication' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { t, cvData, currentLanguage } = useLanguage()
</script>