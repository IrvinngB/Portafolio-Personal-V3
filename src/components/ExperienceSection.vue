<script setup lang="ts">
import { Briefcase, Building, Calendar } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { t, cvData } = useLanguage()
</script>

<template>
  <section id="experience" class="section py-20 bg-gray-50 dark:bg-[#0A3D3D]">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t.workExperience }}
        </h2>
        <div class="w-24 h-1 mx-auto" style="background-color: #3FA35B;"></div>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="relative">
          <div class="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 dark:bg-[#3FA35B]" style="background-color: rgba(63, 163, 91, 0.3);" aria-hidden="true"></div>

          <div class="space-y-12">
            <article
              v-for="(experience, index) in cvData.workExperience"
              :key="index"
              class="card relative"
            >
              <div class="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full border-4 border-white dark:border-[#0A3D3D] shadow-lg flex items-center justify-center" style="background-color: #3FA35B;">
                <Briefcase class="h-4 w-4 text-white" aria-hidden="true" />
              </div>

              <div class="ml-12 md:ml-0 md:grid md:grid-cols-2 md:gap-8">
                <div :class="index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:col-start-2 md:pl-8'">
                  <div class="bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div class="mb-4">
                      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {{ experience.position }}
                      </h3>
                      <div class="flex items-center gap-2 mb-2 dark:text-[#B4D333]" :style="{ color: '#3FA35B' }">
                        <Building class="h-4 w-4" aria-hidden="true" />
                        <span class="font-medium">{{ experience.company }}</span>
                      </div>
                      <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Calendar class="h-4 w-4" aria-hidden="true" />
                        <time class="text-sm">{{ experience.duration }}</time>
                      </div>
                    </div>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {{ experience.description }}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
