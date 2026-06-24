<template>
  <section
    id="skills"
    ref="container"
    class="reveal-section section py-12 sm:py-16 lg:py-20"
    aria-labelledby="skills-heading"
  >
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <div class="rule-thick mb-2 max-w-xs mx-auto"></div>
        <h2 id="skills-heading" class="text-h1 mb-4">{{ t.technicalSkills }}</h2>
        <p class="text-deck max-w-2xl mx-auto">
          {{ currentLanguage === 'es'
            ? 'Tecnologías con las que construyo productos digitales escalables y de alto rendimiento.'
            : 'Technologies I use to build scalable and high-performance digital products.' }}
        </p>
        <div class="rule-thin mt-4 max-w-xs mx-auto"></div>
      </div>

      <!-- Skills Grid -->
      <div class="reveal-child grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <div
          v-for="cat in stackCategories"
          :key="cat.key"
          class="noir-card"
          :style="{ transitionDelay: `${cat.delay}ms` }"
        >
          <div class="rule-thin mb-4"></div>
          <h3 class="text-h2 mb-3 text-lg">{{ cat.title }}</h3>
          <ul class="space-y-1">
            <li
              v-for="tech in cat.skills"
              :key="tech"
              class="text-body text-sm"
            >
              {{ tech }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Interpersonal Skills -->
      <div
        v-if="interpersonalSkills.length > 0"
        class="reveal-child mt-8 text-center"
        style="transition-delay: 240ms"
      >
        <h3 class="text-label mb-4">{{ t.interpersonalSkills }}</h3>
        <div class="flex flex-wrap justify-center gap-x-3 gap-y-1">
          <span
            v-for="skill in interpersonalSkills"
            :key="skill"
            class="text-caption"
          >
            {{ skill }}
            <span class="text-ink-faint mx-1" v-if="interpersonalSkills.indexOf(skill) < interpersonalSkills.length - 1">·</span>
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
  transition: opacity 0.6s ease, transform 0.6s ease;
}
</style>
