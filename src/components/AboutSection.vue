<template>
  <section id="about" class="section py-20 bg-white dark:bg-gray-900">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t.professionalProfile }}
        </h2>
        <div class="w-24 h-1 bg-blue-600 mx-auto"></div>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg">
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
            {{ cvData.professionalProfile }}
          </p>
          
          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
           
           
            <div class="text-center card bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{{ cvData.projects.length }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Proyectos Completados</div>
            </div>
            <div class="text-center card bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Dedicación</div>
            </div>
            <div class="text-center card bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2+</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Años de Experiencia</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLanguage } from '../composables/useLanguage'

const { t, cvData } = useLanguage()
</script>