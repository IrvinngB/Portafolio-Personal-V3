<template>
  <section 
    id="projects" 
    ref="container"
    class="section py-20 relative overflow-hidden bg-transparent"
    aria-labelledby="projects-heading"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="parallax absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30 bg-primary/20"></div>
      <div class="parallax absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30 bg-primary-light/20"></div>
      <div class="absolute top-24 left-16 w-2 h-2 rounded-full animate-pulse bg-primary"></div>
      <div class="absolute bottom-32 right-24 w-1 h-1 rounded-full animate-pulse bg-primary-accent" style="animation-delay: 1.2s;"></div>
      <div class="absolute top-1/3 right-16 w-1.5 h-1.5 rounded-full animate-pulse bg-primary-light" style="animation-delay: 2.5s;"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <div class="text-center mb-16 relative">
        <h2 
          id="projects-heading"
          class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display text-gray-900 dark:text-white mb-4 tracking-tight"
        >
          <span class="text-gradient">
            {{ t.featuredProjects }}
          </span>
        </h2>
        <p class="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8 px-2 leading-relaxed">
          {{ currentLanguage === 'es' 
            ? 'Proyectos que combinan diseño, rendimiento y experiencia de usuario' 
            : 'Projects that combine design, performance and user experience' }}
        </p>
      </div>

      <!-- Filtros de Tecnología -->
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2">
        <button
          @click="selectedFilter = 'all'"
          :class="[
            'px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-sm sm:text-base',
            selectedFilter === 'all'
              ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg'
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
            'px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-sm sm:text-base',
            selectedFilter === tech
              ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg'
              : 'bg-gray-100 dark:bg-[#1f2937] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
        >
          {{ tech }}
        </button>
      </div>

      <!-- Grid de Proyectos -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
        <article
          v-for="(project, index) in filteredProjects"
          :key="index"
          class="premium-card project-card group bg-gray-50 dark:bg-[#1f2937] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 dark:border-gray-700"
          :class="{ 'stagger-item': true }"
        >
          <!-- Imagen o Placeholder -->
          <div class="relative h-44 sm:h-52 lg:h-56 overflow-hidden">
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
            <div class="absolute top-4 left-4 px-3 py-1 text-white text-xs font-bold rounded-full flex items-center gap-1"
              :class="{
                'bg-primary': project.status === 'active',
                'bg-gray-500': project.status === 'completed',
                'bg-gray-400': project.status === 'archived'
              }"
            >
              <span v-if="project.status === 'active'" class="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              {{ project.status === 'active'
                ? (currentLanguage === 'es' ? 'Activo' : 'Live')
                : project.status === 'completed'
                  ? (currentLanguage === 'es' ? 'Completado' : 'Completed')
                  : (currentLanguage === 'es' ? 'Archivado' : 'Archived')
              }}
            </div>

            <!-- Quick actions overlay -->
            <div v-if="project.url || project.github" class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              <a 
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all transform hover:scale-110"
                :aria-label="`View ${project.title} demo`"
              >
                <ExternalLink class="w-5 h-5 text-white" />
              </a>
              <a 
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all transform hover:scale-110"
                :aria-label="`View ${project.title} code`"
              >
                <Github class="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <!-- Contenido -->
          <div class="p-4 sm:p-6">
            <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
              {{ project.title }}
            </h3>
            
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
              {{ project.description }}
            </p>
            <button 
              @click="openModal(project)"
              class="text-primary dark:text-primary-light text-xs font-medium hover:underline mb-3 flex items-center gap-1"
            >
              {{ currentLanguage === 'es' ? 'Ver más' : 'Read more' }}
              <ChevronRight class="w-3 h-3" />
            </button>



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
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                :class="[
                  'px-4 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 flex-1'
                ]"
                :aria-label="`View ${project.title} live demo`"
              >
                <ExternalLink class="w-4 h-4" />
                {{ currentLanguage === 'es' ? 'Ver Proyecto' : 'View Project' }}
              </a>
              <a 
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                :class="[
                  'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2',
                  !project.url ? 'flex-1 px-4 py-2.5' : 'px-4 py-2.5'
                ]"
                :aria-label="`View ${project.title} code on GitHub`"
              >
                <Github class="w-4 h-4" />
                <span v-if="!project.url">GitHub</span>
              </a>
            </div>
          </div>
        </article>
      </div>

    </div>

    <!-- Modal de proyecto -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="isModalOpen && selectedProject" 
          class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          @click.self="closeModal"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          
          <!-- Modal content -->
          <div class="relative bg-white dark:bg-[#1f2937] rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
            <!-- Header con imagen -->
            <div class="relative h-36 sm:h-48">
              <ProjectPlaceholder 
                :title="selectedProject.title"
                :technologies="selectedProject.technologies || []"
                :index="0"
                class="w-full h-full rounded-t-2xl"
              />
              <button 
                @click.stop="closeModal"
                @touchend.stop.prevent="closeModal"
                class="absolute top-2 right-2 sm:top-4 sm:right-4 w-11 h-11 min-w-[44px] min-h-[44px] bg-black/60 hover:bg-black/80 active:bg-black/90 rounded-full flex items-center justify-center transition-colors touch-manipulation cursor-pointer z-10"
                aria-label="Close modal"
                type="button"
              >
                <X class="w-6 h-6 text-white pointer-events-none" />
              </button>
            </div>

            <!-- Contenido -->
            <div class="p-4 sm:p-6">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                {{ selectedProject.title }}
              </h3>
              
              <p class="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {{ selectedProject.description }}
              </p>

              <!-- Tecnologías -->
              <div class="mb-4 sm:mb-6">
                <h4 class="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 sm:mb-3 uppercase tracking-wide">
                  {{ currentLanguage === 'es' ? 'Tecnologías' : 'Technologies' }}
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in selectedProject.technologies"
                    :key="tech"
                    class="px-2 sm:px-3 py-1 sm:py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-xs sm:text-sm rounded-lg font-medium"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Botones -->
              <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <a 
                  v-if="selectedProject.url"
                  :href="selectedProject.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <ExternalLink class="w-4 h-4 sm:w-5 sm:h-5" />
                  {{ currentLanguage === 'es' ? 'Ver Proyecto' : 'View Project' }}
                </a>
                <a 
                  v-if="selectedProject.github"
                  :href="selectedProject.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  :class="[
                    'px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2 text-sm sm:text-base',
                    !selectedProject.url ? 'flex-1' : ''
                  ]"
                >
                  <Github class="w-4 h-4 sm:w-5 sm:h-5" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ExternalLink, Github, ChevronRight, X } from 'lucide-vue-next'
import type { Project } from '../types'
import { useLanguage } from '../composables/useLanguage'
import { useGSAP } from '../composables/useGSAP'
import ProjectPlaceholder from './ProjectPlaceholder.vue'

const { t, cvData, currentLanguage } = useLanguage()
const selectedFilter = ref('all')
const container = ref(null)
const selectedProject = ref<Project | null>(null)
const isModalOpen = ref(false)

const openModal = (project: Project) => {
  selectedProject.value = project
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  selectedProject.value = null
  document.body.style.overflow = ''
}

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
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-primary) 10%, transparent), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
  z-index: 1;
  will-change: transform;
}

.project-card:hover::before {
  transform: translateX(100%);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
