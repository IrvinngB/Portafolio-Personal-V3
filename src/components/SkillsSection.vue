<script setup lang="ts">
import { computed } from 'vue'
import { Code2, Server, Database, Wrench } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useGSAP } from '../composables/useGSAP'

// Initialize animations
useGSAP()

const { t, cvData, currentLanguage } = useLanguage()

const technicalSkills = computed(() => {
  const skills = cvData.value?.technicalSkills
  if (!skills) return []
  
  return [
    { 
      title: t.value.frontend, 
      icon: Code2, 
      skills: skills.frontend || [],
      color: '#3FA35B'
    },
    { 
      title: t.value.backend, 
      icon: Server, 
      skills: skills.backend || [],
      color: '#B4D333'
    },
    { 
      title: t.value.databases, 
      icon: Database, 
      skills: skills.databases || [],
      color: '#C5D946'
    },
    { 
      title: t.value.tools, 
      icon: Wrench, 
      skills: [...(skills.tools || []), ...(skills.design || []), ...(skills.methodologies || [])],
      color: '#3FA35B'
    }
  ].filter(category => category.skills.length > 0)
})

const getDescription = (categoryTitle: string) => {
  const descriptions = {
    es: {
      [t.value.frontend]: "Me encanta crear interfaces interactivas y llevar ideas a la vida en el navegador.",
      [t.value.backend]: "Disfruto construyendo la lógica del servidor y arquitecturas robustas.",
      [t.value.databases]: "Experto en diseño y optimización de bases de datos eficientes.",
      [t.value.tools]: "Domino herramientas modernas para desarrollo y diseño profesional."
    },
    en: {
      [t.value.frontend]: "I love creating interactive interfaces and bringing ideas to life in the browser.",
      [t.value.backend]: "I enjoy building server logic and robust architectures.",
      [t.value.databases]: "Expert in designing and optimizing efficient databases.",
      [t.value.tools]: "I master modern tools for professional development and design."
    }
  }
  
  return descriptions[currentLanguage.value as keyof typeof descriptions][categoryTitle] || ''
}

const getCategoryLabel = (categoryTitle: string) => {
  const labels = {
    es: {
      [t.value.frontend]: "Tecnologías que uso",
      [t.value.backend]: "Lenguajes que domino", 
      [t.value.databases]: "Bases de datos",
      [t.value.tools]: "Herramientas favoritas"
    },
    en: {
      [t.value.frontend]: "Technologies I use",
      [t.value.backend]: "Languages I master",
      [t.value.databases]: "Databases",
      [t.value.tools]: "Favorite tools"
    }
  }
  
  return labels[currentLanguage.value as keyof typeof labels][categoryTitle] || ''
}

const getMoreText = () => {
  return currentLanguage.value === 'es' ? 'más' : 'more'
}
</script>

<template>
  <section id="skills" class="section py-20 bg-gray-50 dark:bg-[#0A3D3D]">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t.technicalSkills }}
        </h2>
        <div class="w-24 h-1 mx-auto bg-[#3FA35B]"></div>
      </div>

      <!-- Technical Skills -->
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <article
            v-for="category in technicalSkills"
            :key="category.title"
            class="card group bg-white dark:bg-[#1f2937] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 text-center border border-gray-100 dark:border-gray-700 hover:border-[#3FA35B]/30"
          >
            <!-- Icon Circle 3D -->
            <div class="flex justify-center mb-6">
              <div class="icon-3d-container">
                <div 
                  class="w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                  :style="{ background: `linear-gradient(135deg, ${category.color} 0%, #0A3D3D 100%)` }"
                >
                  <component 
                    :is="category.icon" 
                    class="h-12 w-12 text-white" 
                    strokeWidth="2.5"
                  />
                </div>
              </div>
            </div>
            
            <!-- Title -->
            <h4 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#3FA35B] dark:group-hover:text-[#B4D333] transition-colors">
              {{ category.title }}
            </h4>
            
            <!-- Description -->
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {{ getDescription(category.title) }}
            </p>
            
            <!-- Skills List -->
            <div class="space-y-3">
              <div class="text-left">
                <h5 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  {{ getCategoryLabel(category.title) }}:
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
