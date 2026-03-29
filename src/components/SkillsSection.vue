<script setup lang="ts">
import { ref, computed } from 'vue'
import { Code2, Server, Database, Wrench, Layers, Palette, GitBranch, Globe, Sparkles } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useGSAP } from '../composables/useGSAP'

const container = ref(null)
useGSAP(container)

const { t, cvData, currentLanguage } = useLanguage()
const activeCategory = ref(0)

const categories = computed(() => {
  const skills = cvData.value?.technicalSkills
  const details = cvData.value?.skillsDetails
  if (!skills || !details) return []

  return [
    {
      key: 'frontend',
      title: t.value.frontend,
      icon: Code2,
      skills: skills.frontend || [],
      description: details.descriptions.frontend,
      gradient: 'from-primary to-primary-light'
    },
    {
      key: 'backend',
      title: t.value.backend,
      icon: Server,
      skills: skills.backend || [],
      description: details.descriptions.backend,
      gradient: 'from-primary-dark to-primary'
    },
    {
      key: 'databases',
      title: t.value.databases,
      icon: Database,
      skills: skills.databases || [],
      description: details.descriptions.databases,
      gradient: 'from-primary-light to-primary-accent'
    },
    {
      key: 'tools',
      title: t.value.tools,
      icon: Wrench,
      skills: skills.tools || [],
      description: details.descriptions.tools,
      gradient: 'from-primary-accent to-primary'
    }
  ].filter(c => c.skills.length > 0)
})

const secondarySkills = computed(() => {
  const skills = cvData.value?.technicalSkills
  if (!skills) return []

  return [
    { icon: Palette, items: skills.design || [], label: t.value.design },
    { icon: GitBranch, items: skills.methodologies || [], label: t.value.methodologies },
    { icon: Layers, items: skills.dataAnalysis || [], label: t.value.dataAnalysis },
    { icon: Globe, items: skills.languages || [], label: t.value.languages }
  ].filter(s => s.items.length > 0)
})

const interpersonalSkills = computed(() => cvData.value?.interpersonalSkills || [])

const selectCategory = (index: number) => {
  activeCategory.value = index
}
</script>

<template>
  <section id="skills" ref="container" class="section relative py-20 bg-transparent overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="parallax absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-40 bg-primary/20"></div>
      <div class="parallax absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-40 bg-primary-light/20"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16 relative">
        <div class="flex items-center gap-2 justify-center mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
            <Sparkles class="w-5 h-5 text-white" aria-hidden="true" />
          </div>
        </div>
        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
          {{ currentLanguage === 'es' ? 'Mi ' : 'My ' }}
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
            {{ currentLanguage === 'es' ? 'Stack Técnico' : 'Tech Stack' }}
          </span>
        </h2>
        <p class="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed">
          {{ currentLanguage === 'es'
            ? 'Una colección de tecnologías con las que trabajo para construir productos digitales escalables y de alto rendimiento.'
            : 'A collection of technologies I use to build scalable and high-performance digital products.' }}
        </p>
      </div>

      <!-- Main Skills — Premium Tab Navigation -->
      <div class="max-w-5xl mx-auto">
        <!-- Tab Navigation — Premium pill-style -->
        <div class="flex justify-center mb-10">
          <div class="inline-flex bg-gray-100 dark:bg-white/5 rounded-2xl p-1.5 border border-gray-200 dark:border-white/10">
            <button
              v-for="(cat, idx) in categories"
              :key="cat.key"
              @click="selectCategory(idx)"
              :class="[
                'relative flex items-center gap-2 px-5 sm:px-7 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300',
                activeCategory === idx
                  ? 'bg-gradient-to-r ' + cat.gradient + ' text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              ]"
              :aria-pressed="activeCategory === idx"
            >
              <component :is="cat.icon" class="w-4 h-4 sm:w-5 sm:h-5" :strokeWidth="2.5" />
              <span class="hidden sm:inline">{{ cat.title }}</span>
            </button>
          </div>
        </div>

        <!-- Active Category Detail — Premium Card -->
        <div
          v-for="(cat, idx) in categories"
          :key="cat.key + '-detail'"
          v-show="activeCategory === idx"
          class="skill-panel"
        >
          <div class="premium-card group bg-gray-50 dark:bg-[#1f2937] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <!-- Panel Header -->
            <div class="flex items-center gap-4 p-6 sm:p-8 border-b border-gray-100 dark:border-gray-700">
              <div :class="'w-16 h-16 rounded-2xl bg-gradient-to-br ' + cat.gradient + ' flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300'">
                <component :is="cat.icon" class="w-8 h-8 text-white" :strokeWidth="2" />
              </div>
              <div>
                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{{ cat.title }}</h3>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">{{ cat.description }}</p>
              </div>
            </div>

            <!-- Skills Grid -->
            <div class="p-6 sm:p-8">
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <div
                  v-for="skill in cat.skills"
                  :key="skill"
                  class="skill-chip group/chip flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 hover:border-primary dark:hover:border-primary-light transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <span class="w-2 h-2 rounded-full bg-gradient-to-r shrink-0 transition-transform duration-300 group-hover/chip:scale-125" :class="cat.gradient"></span>
                  <span class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{{ skill }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Secondary Skills Row — Premium Cards -->
        <div class="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div
            v-for="group in secondarySkills"
            :key="group.label"
            class="premium-card group bg-gray-50 dark:bg-[#1f2937] rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-md transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <component :is="group.icon" class="w-4 h-4 text-white" :strokeWidth="2.5" />
              </div>
              <h4 class="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">{{ group.label }}</h4>
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="item in group.items"
                :key="item"
                class="text-xs px-2 py-1 bg-white dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-md border border-gray-100 dark:border-white/10"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>

        <!-- Interpersonal Skills -->
        <div class="mt-8 sm:mt-12">
          <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {{ t.interpersonalSkills }}
          </h3>
          <div class="flex flex-wrap justify-center gap-3">
            <span
              v-for="skill in interpersonalSkills"
              :key="skill"
              class="soft-skill-tag px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium border border-primary/20 dark:border-primary-light/20 hover:border-primary dark:hover:border-primary-light transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skill-panel {
  animation: panelIn 0.35s ease-out;
}

@keyframes panelIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skill-chip {
  transform: translateZ(0);
}

.soft-skill-tag {
  transform: translateZ(0);
}

@media (prefers-reduced-motion: reduce) {
  .skill-panel {
    animation: none;
  }
}
</style>
