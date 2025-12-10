<template>
  <section 
    id="projects" 
    ref="container"
    class="section py-20 bg-white dark:bg-[#0A3D3D] overflow-hidden"
    aria-labelledby="projects-heading"
  >
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 
          id="projects-heading"
          class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          {{ t.featuredProjects }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          {{ currentLanguage === 'es' 
            ? 'Proyectos que combinan diseño, rendimiento y experiencia de usuario' 
            : 'Projects that combine design, performance and user experience' }}
        </p>
        <div class="w-24 h-1 mx-auto bg-gradient-to-r from-[#3FA35B] to-[#B4D333]"></div>
      </div>

      <!-- Filtros de Tecnología -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          @click="selectedFilter = 'all'"
          :class="[
            'px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105',
            selectedFilter === 'all'
              ? 'bg-gradient-to-r from-[#3FA35B] to-[#B4D333] text-white shadow-lg'
              : 'bg-gray-100 dark:bg-[#1f2937] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
        >
          {{ currentLanguage === 'es' ? 'Todos' : 'All' }}
        </button>
        <button
          v-for="tech in uniqueTechnologies"
          :key="tech"
          @click="selectedFilter = tech"
          :class="[
            'px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105',
            selectedFilter === tech
              ? 'bg-gradient-to-r from-[#3FA35B] to-[#B4D333] text-white shadow-lg'
              : 'bg-gray-100 dark:bg-[#1f2937] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
        >
          {{ tech }}
        </button>
      </div>

      <!-- Grid de Proyectos -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <article
          v-for="(project, index) in filteredProjects"
          :key="index"
          class="project-card group bg-gray-50 dark:bg-[#1f2937] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 dark:border-gray-700"
          :class="{ 'stagger-item': true }"
        >
          <!-- Imagen o Placeholder -->
          <div class="relative h-56 overflow-hidden">
            <ProjectPlaceholder 
              :title="project.title"
              :technologies="project.technologies || []"
              :index="index"
              class="w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <!-- Badge de número -->
            <div class="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              {{ index + 1 }}
            </div>

            <!-- Status badge -->
            <div class="absolute top-4 left-4 px-3 py-1 bg-[#3FA35B] text-white text-xs font-bold rounded-full flex items-center gap-1">
              <span class="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              {{ currentLanguage === 'es' ? 'Activo' : 'Live' }}
            </div>

            <!-- Quick actions overlay -->
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              <button 
                class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all transform hover:scale-110"
                :aria-label="`View ${project.title} demo`"
              >
                <ExternalLink class="w-5 h-5 text-white" />
              </button>
              <button 
                class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all transform hover:scale-110"
                :aria-label="`View ${project.title} code`"
              >
                <Github class="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <!-- Contenido -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#3FA35B] dark:group-hover:text-[#B4D333] transition-colors">
              {{ project.title }}
            </h3>
            
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
              {{ project.description }}
            </p>



            <!-- Tecnologías -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in (project.technologies || []).slice(0, 3)"
                :key="tech"
                class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md font-medium"
              >
                {{ tech }}
              </span>
              <span 
                v-if="(project.technologies || []).length > 3" 
                class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md font-medium"
              >
                +{{ (project.technologies || []).length - 3 }}
              </span>
            </div>

            <!-- Botones de acción -->
            <div class="flex gap-2">
              <a 
                :href="project.url || '#'"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#3FA35B] to-[#B4D333] text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                :aria-label="`View ${project.title} live demo`"
              >
                <ExternalLink class="w-4 h-4" />
                {{ currentLanguage === 'es' ? 'Ver Proyecto' : 'View Project' }}
              </a>
              <a 
                :href="project.github || '#'"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-105 flex items-center justify-center"
                :aria-label="`View ${project.title} code on GitHub`"
              >
                <Github class="w-4 h-4" />
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- Estadísticas generales -->
      <div class="mt-20 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div class="text-center p-6 bg-gradient-to-br from-[#3FA35B]/10 to-[#B4D333]/10 rounded-2xl border border-[#3FA35B]/20">
          <div class="text-4xl font-black text-[#3FA35B] dark:text-[#B4D333] mb-2">{{ cvData.projects.length }}+</div>
          <div class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ currentLanguage === 'es' ? 'Proyectos' : 'Projects' }}</div>
        </div>

        <div class="text-center p-6 bg-gradient-to-br from-[#C5D946]/10 to-[#3FA35B]/10 rounded-2xl border border-[#C5D946]/20">
          <div class="text-4xl font-black text-[#3FA35B] dark:text-[#B4D333] mb-2">100%</div>
          <div class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ currentLanguage === 'es' ? 'Satisfacción' : 'Satisfaction' }}</div>
        </div>
        <div class="text-center p-6 bg-gradient-to-br from-[#3FA35B]/10 to-[#0A3D3D]/10 rounded-2xl border border-[#3FA35B]/20">
          <div class="text-4xl font-black text-[#3FA35B] dark:text-[#B4D333] mb-2">2+</div>
          <div class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{ currentLanguage === 'es' ? 'Años Exp.' : 'Years Exp.' }}</div>
        </div>
      </div>

    
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ExternalLink, Github } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useGSAP } from '../composables/useGSAP'
import ProjectPlaceholder from './ProjectPlaceholder.vue'

const { t, cvData, currentLanguage } = useLanguage()
const selectedFilter = ref('all')
const container = ref(null)

useGSAP(container)

const uniqueTechnologies = computed(() => {
  const allTechs = cvData.value.projects.flatMap(p => p.technologies || [])
  const unique = [...new Set(allTechs)]
  return unique.slice(0, 5)
})

const filteredProjects = computed(() => {
  if (selectedFilter.value === 'all') {
    return cvData.value.projects
  }
  return cvData.value.projects.filter(project => 
    project.technologies?.includes(selectedFilter.value)
  )
})
</script>

<style scoped>
.project-card {
  position: relative;
  overflow: hidden;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(63, 163, 91, 0.1), transparent);
  transition: left 0.5s;
  z-index: 1;
}

.project-card:hover::before {
  left: 100%;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
