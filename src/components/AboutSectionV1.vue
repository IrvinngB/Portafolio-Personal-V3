<template>
  <section id="about" class="section py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t.professionalProfile }}
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
      </div>

      <div class="max-w-6xl mx-auto">
        <!-- Main Content Card -->
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700 mb-12">
          <div class="flex items-center justify-center mb-8">
            <div class="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
              <User class="h-8 w-8 text-white" />
            </div>
          </div>
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
            {{ cvData.professionalProfile }}
          </p>
        </div>

        <!-- Enhanced Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Projects Stat -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div class="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between mb-4">
                <div class="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                  <FolderOpen class="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div class="text-right">
                  <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{{ cvData.projects.length }}+</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">{{ currentLanguage === 'es' ? 'Proyectos Completados' : 'Completed Projects' }}</div>
                </div>
              </div>
              <div class="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" style="width: 100%"></div>
              </div>
            </div>
          </div>

          <!-- Experience Stat -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div class="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between mb-4">
                <div class="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                  <Clock class="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div class="text-right">
                  <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">2+</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">{{ currentLanguage === 'es' ? 'Años de Experiencia' : 'Years Experience' }}</div>
                </div>
              </div>
              <div class="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" style="width: 85%"></div>
              </div>
            </div>
          </div>

          <!-- Dedication Stat -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div class="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between mb-4">
                <div class="p-3 bg-green-100 dark:bg-green-900/50 rounded-xl">
                  <Target class="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div class="text-right">
                  <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">100%</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">{{ currentLanguage === 'es' ? 'Dedicación' : 'Dedication' }}</div>
                </div>
              </div>
              <div class="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-green-600 to-blue-600 rounded-full" style="width: 100%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { User, FolderOpen, Clock, Target } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { t, cvData, currentLanguage } = useLanguage()
</script>