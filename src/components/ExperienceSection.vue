<template>
  <section
    id="experience"
    ref="container"
    class="crt-scanlines py-16 sm:py-20 lg:py-28"
    aria-labelledby="experience-heading"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="text-center mb-14 sm:mb-20">
        <h1 id="experience-heading" class="text-h1 glow-pulse">
          [ LOG DE OPERACIONES ]
        </h1>
      </div>

      <div class="max-w-3xl mx-auto space-y-6">
        <article
          v-for="(exp, idx) in cvData.workExperience"
          :key="idx"
          class="reveal-child crt-panel"
          :style="{ transitionDelay: `${idx * 100}ms` }"
        >
          <div class="crt-header">
            [ENTRY #{{ String(idx + 1).padStart(2, '0') }}]──────────────────────────[{{ exp.duration }}]
          </div>
          <h2 class="text-h2 mt-2 mb-1">{{ exp.position }}</h2>
          <p class="text-data text-phosphor mb-3">> {{ exp.company }}</p>
          <p class="text-body">{{ exp.description }}</p>
        </article>
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
