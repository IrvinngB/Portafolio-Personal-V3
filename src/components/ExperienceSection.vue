<script setup lang="ts">
import { Briefcase, Building, Calendar } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { t, cvData, currentLanguage } = useLanguage()
</script>

<template>
  <section id="experience" class="section py-20 relative overflow-hidden bg-transparent">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="parallax absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-40 bg-primary/20"></div>
      <div class="parallax absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-40 bg-primary-light/20"></div>
      <div class="absolute top-32 right-20 w-1.5 h-1.5 rounded-full animate-pulse bg-primary"></div>
      <div class="absolute bottom-40 left-24 w-1 h-1 rounded-full animate-pulse bg-primary-light" style="animation-delay: 1.5s;"></div>
      <div class="absolute top-1/2 right-40 w-2 h-2 rounded-full animate-pulse bg-primary-accent" style="animation-delay: 0.8s;"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <div class="text-center mb-12 sm:mb-16 relative">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary dark:text-primary-light mb-3">
          {{ currentLanguage === 'es' ? 'Trayectoria' : 'Career' }}
        </p>
        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display text-gray-900 dark:text-white mb-4 tracking-tight">
          {{ t.workExperience }}
        </h2>
        <div class="section-divider"></div>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="relative">
          <div class="absolute left-6 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 dark:bg-primary bg-primary/30" aria-hidden="true"></div>

          <div class="space-y-12">
            <article
              v-for="(experience, index) in cvData.workExperience"
              :key="index"
              class="card relative"
            >
              <div class="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border-4 border-white dark:border-[#0A3D3D] shadow-2xl flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark hover:scale-110 transition-transform duration-300" style="transform-style: preserve-3d;">
                <Briefcase class="h-4 w-4 sm:h-6 sm:w-6 text-white" aria-hidden="true" strokeWidth="2.5" />
              </div>

              <div class="ml-14 sm:ml-16 md:ml-0 md:grid md:grid-cols-2 md:gap-8">
                <div :class="index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:col-start-2 md:pl-8'">
                  <div class="premium-card bg-gray-50 dark:bg-[#1f2937] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                    <div class="mb-4">
                      <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {{ experience.position }}
                      </h3>
                      <div class="flex items-center gap-2 mb-2 flex-wrap">
                        <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-primary/10 dark:bg-primary-light/10 flex items-center justify-center flex-shrink-0">
                          <Building class="h-3 w-3 sm:h-4 sm:w-4 text-primary dark:text-primary-light" aria-hidden="true" />
                        </div>
                        <span class="font-medium text-primary dark:text-primary-light text-sm sm:text-base">{{ experience.company }}</span>
                      </div>
                      <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                          <Calendar class="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                        </div>
                        <time class="text-xs sm:text-sm font-medium">{{ experience.duration }}</time>
                      </div>
                    </div>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
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
