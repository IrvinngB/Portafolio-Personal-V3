<template>
  <section
    id="experience"
    ref="container"
    class="reveal-section section py-12 sm:py-16 lg:py-20"
    aria-labelledby="experience-heading"
  >
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <div class="rule-thick mb-2 max-w-xs mx-auto"></div>
        <p class="text-kicker mb-3">
          {{ currentLanguage === 'es' ? 'Trayectoria' : 'Career' }}
        </p>
        <h2 id="experience-heading" class="text-h1">{{ t.workExperience }}</h2>
        <div class="rule-thin mt-4 max-w-xs mx-auto"></div>
      </div>

      <!-- Cards -->
      <div class="max-w-3xl mx-auto space-y-6">
        <article
          v-for="(experience, index) in cvData.workExperience"
          :key="index"
          class="reveal-child noir-card"
          :style="{ transitionDelay: `${index * 80}ms` }"
        >
          <div class="rule-thin mb-4"></div>
          <h3 class="text-h2 mb-2">{{ experience.position }}</h3>
          <p class="text-byline mb-4">{{ experience.company }} · {{ experience.duration }}</p>
          <p class="text-body">{{ experience.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
  transition: opacity 0.6s ease, transform 0.6s ease;
}
</style>
