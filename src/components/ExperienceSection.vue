<template>
  <section
    id="experience"
    ref="container"
    class="reveal-section section py-12 sm:py-16 lg:py-20 bg-bg relative overflow-hidden"
    aria-labelledby="experience-heading"
  >
    <!-- Sticker -->
    <div class="sticker sticker-float top-20 right-[8%] w-9 h-9" style="animation-delay: 0.6s;">
      <div class="sticker-shape w-full h-full bg-accent-blue rotate-[-20deg]"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <p class="text-label text-accent-pink mb-3">
          {{ currentLanguage === 'es' ? 'Trayectoria' : 'Career' }}
        </p>
        <h2 id="experience-heading" class="text-h1">
          {{ t.workExperience }}
        </h2>
      </div>

      <!-- Timeline -->
      <div class="max-w-4xl mx-auto relative">
        <!-- Timeline line -->
        <div
          class="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 border-l-2 border-border"
          style="border-left-style: solid;"
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
              class="timeline-dot absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-card border-[3px] border-bg bg-accent-yellow z-10 flex items-center justify-center"
              :style="{ animationDelay: `${index * 250}ms` }"
            >
              <Briefcase class="h-4 w-4 sm:h-5 sm:w-5 text-fg" aria-hidden="true" strokeWidth="2.5" />
            </div>

            <!-- Card -->
            <div class="ml-14 sm:ml-16 md:ml-0 md:grid md:grid-cols-2 md:gap-8">
              <div :class="index % 2 === 0 ? 'md:text-right md:pr-10' : 'md:col-start-2 md:pl-10'">
                <div class="brutal-card p-4 sm:p-6">
                  <!-- Role -->
                  <h3 class="text-h2 mb-2">{{ experience.position }}</h3>
                  <!-- Company -->
                  <div class="flex items-center gap-2 mb-2" :class="index % 2 === 0 ? 'md:justify-end' : ''">
                    <Building class="h-4 w-4 text-accent-pink flex-shrink-0" aria-hidden="true" />
                    <span class="text-label text-accent-pink">{{ experience.company }}</span>
                  </div>
                  <!-- Duration -->
                  <div class="flex items-center gap-2 mb-4" :class="index % 2 === 0 ? 'md:justify-end' : ''">
                    <Calendar class="h-4 w-4 text-fg-soft flex-shrink-0" aria-hidden="true" />
                    <time class="text-label text-fg-soft opacity-60">{{ experience.duration }}</time>
                  </div>
                  <!-- Description -->
                  <p class="text-body-md leading-relaxed">{{ experience.description }}</p>
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
  transition: opacity 0.6s ease,
              transform 0.6s ease;
}

/* Sequential dot pulse */
@keyframes dotPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(245, 200, 66, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(245, 200, 66, 0); }
}

.is-visible .timeline-dot {
  animation: dotPulse 1.5s ease forwards;
}

@media (prefers-reduced-motion: reduce) {
  .timeline-dot {
    animation: none !important;
  }
}
</style>
