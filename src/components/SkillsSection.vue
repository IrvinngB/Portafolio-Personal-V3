<template>
  <section
    id="skills"
    ref="container"
    class="crt-scanlines py-16 sm:py-20 lg:py-28"
    aria-labelledby="skills-heading"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="text-center mb-14 sm:mb-20">
        <h1 id="skills-heading" class="text-h1 glow-pulse">
          [ SISTEMA / STACK ]
        </h1>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div
          v-for="cat in stackCategories"
          :key="cat.key"
          class="reveal-child crt-panel"
          :style="{ transitionDelay: `${cat.delay}ms` }"
        >
          <div class="crt-header">{{ cat.title }}</div>
          <p
            v-for="tech in cat.skills"
            :key="tech"
            class="text-data crt-link py-0.5"
          >
            {{ tech }}
          </p>
        </div>
      </div>

      <!-- Interpersonal Skills -->
      <div
        v-if="interpersonalSkills.length > 0"
        class="reveal-child mt-8 text-center"
        style="transition-delay: 240ms"
      >
        <p class="text-label mb-3">> {{ t.interpersonalSkills?.toUpperCase() }}:</p>
        <div class="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <span
            v-for="skill in interpersonalSkills"
            :key="skill"
            class="text-data text-phosphor-dim"
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

const { t, cvData } = useLanguage()
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
.reveal-child {
  opacity: 0;
}

.is-visible .reveal-child {
  opacity: 1;
  transition: opacity 0.6s ease;
}
</style>
