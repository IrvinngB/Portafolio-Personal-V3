<template>
  <section
    id="education"
    ref="container"
    class="crt-scanlines py-16 sm:py-20 lg:py-28"
    aria-labelledby="education-heading"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="text-center mb-14 sm:mb-20">
        <h1 id="education-heading" class="text-h1 glow-pulse">
          [ FORMACIÓN ]
        </h1>
      </div>

      <div class="max-w-3xl mx-auto space-y-6">
        <div
          v-for="(education, index) in cvData.education"
          :key="index"
          class="reveal-child crt-panel"
          :style="{ transitionDelay: `${index * 80}ms` }"
        >
          <div class="crt-header">
            [REGISTRO #{{ index + 1 }}]──────────────────────────[{{ education.duration }}]
          </div>
          <h2 class="text-h2 mt-2 mb-1">{{ education.degree }}</h2>
          <p class="text-data text-phosphor mb-2">> {{ education.institution }}</p>
          <p class="text-data text-phosphor-dim">> DURACIÓN: {{ education.duration }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'

const { cvData } = useLanguage()
const container = ref<HTMLElement>()

const { observe } = useScrollReveal()

onMounted(() => {
  if (container.value) observe(container.value)
})
</script>

<style scoped>
.reveal-child {
  opacity: 0;
}

.is-visible .reveal-child {
  opacity: 1;
  transition: opacity 0.6s ease;
}
</style>
