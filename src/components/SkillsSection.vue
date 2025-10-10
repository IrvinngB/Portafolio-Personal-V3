<template>
  <section id="skills" class="section py-20 bg-gray-50 dark:bg-[#0A3D3D]">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t.technicalSkills }}
        </h2>
        <div class="w-24 h-1 mx-auto" style="background-color: #3FA35B;"></div>
      </div>

      <!-- Technical Skills -->
      <div class="max-w-5xl mx-auto mb-16">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(category, categoryKey) in skillCategories.slice(0, 6)"
            :key="categoryKey"
            class="card bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="flex items-center mb-4">
              <div class="p-2 rounded-lg mr-3 dark:bg-[#0A3D3D]/50" :style="{ backgroundColor: 'rgba(63, 163, 91, 0.1)' }">
                <component :is="category.icon" class="h-5 w-5 dark:text-[#B4D333]" :style="{ color: '#3FA35B' }" />
              </div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                {{ category.title }}
              </h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in category.skills.slice(0, 5)"
                :key="skill"
                class="skill-item px-3 py-1 text-sm rounded-full font-medium transition-all duration-200 cursor-default skill-tag"
              >
                {{ skill }}
              </span>
              <span 
                v-if="category.skills.length > 5" 
                class="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-sm rounded-full font-medium"
              >
                +{{ category.skills.length - 5 }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Interpersonal Skills -->
      <div class="max-w-5xl mx-auto">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
          {{ t.interpersonalSkills }}
        </h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="card bg-white dark:bg-[#1f2937] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center mb-4">
              <div class="p-2 rounded-lg mr-3 dark:bg-[#0A3D3D]/50" :style="{ backgroundColor: 'rgba(180, 211, 51, 0.1)' }">
                <Heart class="h-5 w-5 dark:text-[#C5D946]" :style="{ color: '#B4D333' }" />
              </div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                {{ t.interpersonalSkills }}
              </h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in cvData.interpersonalSkills.slice(0, 5)"
                :key="skill"
                class="skill-item px-3 py-1 text-sm rounded-full font-medium transition-all duration-200 cursor-default interpersonal-tag"
              >
                {{ skill }}
              </span>
              <span 
                v-if="cvData.interpersonalSkills.length > 5" 
                class="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-sm rounded-full font-medium"
              >
                +{{ cvData.interpersonalSkills.length - 5 }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  Monitor, 
  Server, 
  Database, 
  Wrench, 
  BarChart3, 
  Palette, 
  Settings, 
  Globe2,
  Heart
} from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { t, cvData } = useLanguage()

const skillCategories = computed(() => [
  {
    title: t.value.frontend,
    icon: Monitor,
    skills: cvData.value.technicalSkills.frontend
  },
  {
    title: t.value.backend,
    icon: Server,
    skills: cvData.value.technicalSkills.backend
  },
  {
    title: t.value.databases,
    icon: Database,
    skills: cvData.value.technicalSkills.databases
  },
  {
    title: t.value.tools,
    icon: Wrench,
    skills: cvData.value.technicalSkills.tools
  },
  {
    title: t.value.dataAnalysis,
    icon: BarChart3,
    skills: cvData.value.technicalSkills.dataAnalysis
  },
  {
    title: t.value.design,
    icon: Palette,
    skills: cvData.value.technicalSkills.design
  },
  {
    title: t.value.methodologies,
    icon: Settings,
    skills: cvData.value.technicalSkills.methodologies
  },
  {
    title: t.value.languages,
    icon: Globe2,
    skills: cvData.value.technicalSkills.languages
  }
])


</script>

<style scoped>
.skill-tag {
  background-color: rgba(63, 163, 91, 0.15);
  color: #ffffff;
  font-weight: 600;
}

.skill-tag:hover {
  background-color: rgba(63, 163, 91, 0.3);
  transform: translateY(-1px);
}

.interpersonal-tag {
  background-color: rgba(180, 211, 51, 0.15);
  color: #ffffff;
  font-weight: 600;
}

.interpersonal-tag:hover {
  background-color: rgba(180, 211, 51, 0.3);
  transform: translateY(-1px);
}
</style>