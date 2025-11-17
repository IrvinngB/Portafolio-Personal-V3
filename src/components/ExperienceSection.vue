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
              <div class="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-12 h-12 rounded-2xl border-4 border-white dark:border-[#0A3D3D] shadow-2xl flex items-center justify-center bg-gradient-to-br from-[#3FA35B] to-[#0A3D3D] hover:scale-110 transition-transform duration-300" style="transform-style: preserve-3d;">
                <Briefcase class="h-6 w-6 text-white" aria-hidden="true" strokeWidth="2.5" />
              </div>

              <div class="ml-12 md:ml-0 md:grid md:grid-cols-2 md:gap-8">
                <div :class="index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:col-start-2 md:pl-8'">
                  <div class="bg-white dark:bg-[#1f2937] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                    <div class="mb-4">
                      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {{ experience.position }}
                      </h3>
                      <div class="flex items-center gap-2 mb-2">
                        <div class="w-8 h-8 rounded-lg bg-[#3FA35B]/10 dark:bg-[#B4D333]/10 flex items-center justify-center">
                          <Building class="h-4 w-4 text-[#3FA35B] dark:text-[#B4D333]" aria-hidden="true" />
                        </div>
                        <span class="font-medium text-[#3FA35B] dark:text-[#B4D333]">{{ experience.company }}</span>
                      </div>
                      <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <Calendar class="h-4 w-4" aria-hidden="true" />
                        </div>
                        <time class="text-sm font-medium">{{ experience.duration }}</time>
                      </div>
                    </div>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
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
