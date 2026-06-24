<template>
  <section
    id="experience"
    ref="container"
    class="reveal-section section py-12 sm:py-16 lg:py-20"
    aria-labelledby="experience-heading"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <p class="text-label-md text-muted mb-3">
          {{ currentLanguage === 'es' ? 'Trayectoria' : 'Career' }}
        </p>
        <h2 id="experience-heading" class="text-h1 text-fg">
          {{ t.workExperience }}
        </h2>
      </div>

      <!-- Timeline -->
      <div class="max-w-4xl mx-auto relative">
        <!-- Timeline line -->
        <div
          class="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border"
          aria-hidden="true"
        ></div>

        <div class="space-y-8 sm:space-y-12">
          <article
            v-for="(experience, index) in cvData.workExperience"
            :key="index"
            class="reveal-child relative"
            :style="{ transitionDelay: `${index * 80}ms` }"
          >
            <!-- Timeline dot -->
            <div
              class="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-4 border-bg bg-accent z-10 flex items-center justify-center"
            >
              <Briefcase class="h-4 w-4 sm:h-5 sm:w-5 text-accent-fg" aria-hidden="true" strokeWidth="2.5" />
            </div>

            <!-- Card -->
            <div class="ml-14 sm:ml-16 md:ml-0 md:grid md:grid-cols-2 md:gap-8">
              <div :class="index % 2 === 0 ? 'md:text-right md:pr-10' : 'md:col-start-2 md:pl-10'">
                <div class="bg-surface-container hover:bg-surface-high transition-colors duration-fast rounded-xl sm:rounded-xxl p-4 sm:p-6 border border-border">
                  <!-- Role -->
                  <h3 class="text-h3 text-fg mb-2">{{ experience.position }}</h3>
                  <!-- Company -->
                  <div class="flex items-center gap-2 mb-2" :class="index % 2 === 0 ? 'md:justify-end' : ''">
                    <Building class="h-4 w-4 text-accent flex-shrink-0" aria-hidden="true" />
                    <span class="text-label-lg text-accent">{{ experience.company }}</span>
                  </div>
                  <!-- Duration -->
                  <div class="flex items-center gap-2 text-muted mb-4" :class="index % 2 === 0 ? 'md:justify-end' : ''">
                    <Calendar class="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <time class="text-caption">{{ experience.duration }}</time>
                  </div>
                  <!-- Description -->
                  <p class="text-body-md text-fg-soft leading-relaxed">{{ experience.description }}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Briefcase, Building, Calendar } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'

const { t, cvData, currentLanguage } = useLanguage()
const container = ref<HTMLElement>()

const { observe } = useScrollReveal()

onMounted(() => {
  if (container.value) observe(container.value)
})
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
