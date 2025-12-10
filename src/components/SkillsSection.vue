<script setup lang="ts">
import { ref, computed } from 'vue'
import { Code2, Server, Database, Wrench } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useGSAP } from '../composables/useGSAP'

const container = ref(null)

// Initialize animations.
useGSAP(container)
 
const { t, cvData, currentLanguage } = useLanguage()

const technicalSkills = computed(() => {
  const skills = cvData.value?.technicalSkills
  const details = cvData.value?.skillsDetails
  
  if (!skills || !details) return []
  
  return [
    { 
      key: 'frontend',
      title: t.value.frontend, 
      icon: Code2, 
      skills: skills.frontend || [],
      color: '#3FA35B',
      description: details.descriptions.frontend,
      label: details.labels.frontend
    },
    { 
      key: 'backend',
      title: t.value.backend, 
      icon: Server, 
      skills: skills.backend || [],
      color: '#B4D333',
      description: details.descriptions.backend,
      label: details.labels.backend
    },
    { 
      key: 'databases',
      title: t.value.databases, 
      icon: Database, 
      skills: skills.databases || [],
      color: '#C5D946',
      description: details.descriptions.databases,
      label: details.labels.databases
    },
    { 
      key: 'tools',
      title: t.value.tools, 
      icon: Wrench, 
      skills: [...(skills.tools || []), ...(skills.design || []), ...(skills.methodologies || [])],
      color: '#3FA35B',
      description: details.descriptions.tools,
      label: details.labels.tools
    }
  ].filter(category => category.skills.length > 0)
})

const getMoreText = () => {
  return currentLanguage.value === 'es' ? 'más' : 'more'
}
</script>

<template>
  <section id="skills" ref="container" class="section py-20 bg-gray-50 dark:bg-[#0A3D3D]">
    <div class="container mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t.technicalSkills }}
        </h2>
        <div class="w-24 h-1 mx-auto bg-[#3FA35B]"></div>
      </div>

      <!-- Technical Skills -->
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          <article
            v-for="category in technicalSkills"
            :key="category.title"
            class="card group bg-white dark:bg-[#1f2937] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 text-center border border-gray-100 dark:border-gray-700 hover:border-[#3FA35B]/30"
          >
            <!-- Icon Circle 3D -->
            <div class="flex justify-center mb-3 sm:mb-6">
              <div class="icon-3d-container">
                <div 
                  class="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                  :style="{ background: `linear-gradient(135deg, ${category.color} 0%, #0A3D3D 100%)` }"
                >
                  <component 
                    :is="category.icon" 
                    class="h-7 w-7 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" 
                    strokeWidth="2.5"
                  />
                </div>
              </div>
            </div>
            
            <!-- Title -->
            <h4 class="text-base sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 group-hover:text-[#3FA35B] dark:group-hover:text-[#B4D333] transition-colors">
              {{ category.title }}
            </h4>
            
            <!-- Description -->
            <p class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-3 sm:mb-6 leading-relaxed hidden sm:block">
              {{ category.description }}
            </p>
            
            <!-- Skills List -->
            <div class="space-y-3">
              <div class="text-left">
                <h5 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  {{ category.label }}:
                </h5>
                <div class="space-y-1">
                  <div
                    v-for="skill in category.skills.slice(0, 8)"
                    :key="skill"
                    class="text-sm text-gray-700 dark:text-gray-300 py-1"
                  >
                    {{ skill }}
                  </div>
                  <div 
                    v-if="category.skills.length > 8" 
                    class="text-xs text-gray-500 dark:text-gray-400 pt-2"
                  >
                    +{{ category.skills.length - 8 }} {{ getMoreText() }}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  position: relative;
  overflow: hidden;
  /* GPU acceleration */
  transform: translateZ(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dark .card {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
}

.card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transform: translate3d(0, -10px, 0);
  will-change: transform;
}

.dark .card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

/* Efecto 3D optimizado en iconos */
.icon-3d-container > div {
  /* Reducir sombras múltiples a una sola */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  /* GPU acceleration */
  transform: translateZ(0);
}

.card:hover .icon-3d-container > div {
  /* Simplificar: solo scale y rotate 2D */
  transform: scale(1.08) rotate(4deg);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  will-change: transform;
}

/* Efecto shine optimizado */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: transform 0.5s ease;
  z-index: 1;
  transform: translateZ(0);
}

.card:hover::before {
  transform: translateX(200%);
}
</style>
