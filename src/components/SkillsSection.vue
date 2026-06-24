<template>
  <section
    id="skills"
    ref="container"
    class="reveal-section section py-12 sm:py-16 lg:py-20"
    aria-labelledby="skills-heading"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <h2 id="skills-heading" class="text-h1 text-fg mb-4">
          {{ t.technicalSkills }}
        </h2>
        <p class="text-body-lg text-fg-soft max-w-2xl mx-auto">
          {{ currentLanguage === 'es'
            ? 'Tecnologías con las que construyo productos digitales escalables y de alto rendimiento.'
            : 'Technologies I use to build scalable and high-performance digital products.' }}
        </p>
      </div>

      <!-- 4-Column Stack Bar -->
      <div
        ref="stackBar"
        class="reveal-child grid grid-cols-2 sm:grid-cols-4 gap-1 bg-border max-w-5xl mx-auto"
      >
        <div
          v-for="cat in stackCategories"
          :key="cat.key"
          class="bg-surface-container hover:bg-surface-high transition-colors duration-fast p-5 sm:p-6"
          :style="{ transitionDelay: `${cat.delay}ms` }"
        >
          <!-- Category Label -->
          <h3 class="text-label-md text-muted mb-4">{{ cat.title }}</h3>
          <!-- Tech Names -->
          <ul class="space-y-2">
            <li
              v-for="tech in cat.skills"
              :key="tech"
              class="text-label-lg text-fg hover:text-accent transition-colors duration-fast"
            >
              {{ tech }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Interpersonal Skills -->
      <div
        v-if="interpersonalSkills.length > 0"
        class="reveal-child mt-10 text-center"
        style="transition-delay: 240ms"
      >
        <h3 class="text-label-md text-muted mb-4">{{ t.interpersonalSkills }}</h3>
        <div class="flex flex-wrap justify-center gap-2">
          <span
            v-for="skill in interpersonalSkills"
            :key="skill"
            class="text-label-lg text-fg-soft hover:text-accent transition-colors duration-fast after:content-['·'] after:text-muted after:ml-2 last:after:content-none"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'

const { t, cvData, currentLanguage } = useLanguage()
const container = ref<HTMLElement>()

const { observe } = useScrollReveal()

onMounted(() => {
  if (container.value) observe(container.value)
})

const stackCategories = computed(() => {
  const skills = cvData.value?.technicalSkills
  if (!skills) return []

  return [
    { key: 'frontend', title: t.value.frontend, skills: skills.frontend || [], delay: 0 },
    { key: 'backend', title: t.value.backend, skills: skills.backend || [], delay: 60 },
    { key: 'databases', title: t.value.databases, skills: skills.databases || [], delay: 120 },
    { key: 'tools', title: t.value.tools, skills: skills.tools || [], delay: 180 },
  ].filter(c => c.skills.length > 0)
})

const interpersonalSkills = computed(() => cvData.value?.interpersonalSkills || [])
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
