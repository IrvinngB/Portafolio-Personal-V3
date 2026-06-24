<template>
  <section
    id="projects"
    ref="container"
    class="section py-16 sm:py-20 lg:py-28"
    aria-labelledby="projects-heading"
  >
    <div class="container mx-auto px-6">
      <!-- Header -->
      <div class="mb-14 text-center">
        <div class="rule-thick mb-2 max-w-xs mx-auto"></div>
        <p class="text-kicker mb-3">
          {{ currentLanguage === 'es' ? '· Trabajo seleccionado ·' : '· Selected work ·' }}
        </p>
        <h2 id="projects-heading" class="text-h1">{{ t.featuredProjects }}</h2>
        <div class="rule-thin mt-4 max-w-xs mx-auto"></div>
      </div>

      <!-- Articles -->
      <div class="max-w-5xl mx-auto space-y-6">
        <article
          v-for="(project, idx) in projects"
          :key="project.title"
          class="group cursor-pointer"
          @click="openModal(project)"
        >
          <!-- Featured: full-width noir-card -->
          <div v-if="idx === 0" class="noir-card">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-label">{{ currentLanguage === 'es' ? 'DESTACADO' : 'FEATURED' }}</span>
            </div>
            <div class="rule-thin mb-3"></div>
            <h3 class="text-h1 mb-3">{{ project.title }}</h3>
            <p class="text-deck mb-4">{{ project.description }}</p>
            <p class="text-caption">
              <template v-for="(tech, i) in (project.technologies || [])" :key="tech">
                {{ tech }}<template v-if="i < (project.technologies || []).length - 1"> · </template>
              </template>
            </p>
            <span class="inline-block mt-3 text-label text-ink opacity-0 group-hover:opacity-100 transition-opacity">
              {{ currentLanguage === 'es' ? 'Leer más →' : 'Read more →' }}
            </span>
          </div>

          <!-- Secondary: 2-col grid -->
          <div v-else class="noir-card">
            <div class="rule-thin mb-3"></div>
            <h3 class="text-h2 mb-2">{{ project.title }}</h3>
            <p class="text-body mb-3">{{ project.description }}</p>
            <p class="text-caption">
              <template v-for="(tech, i) in (project.technologies || [])" :key="tech">
                {{ tech }}<template v-if="i < (project.technologies || []).length - 1"> · </template>
              </template>
            </p>
            <span class="inline-block mt-2 text-label text-ink opacity-0 group-hover:opacity-100 transition-opacity">
              {{ currentLanguage === 'es' ? 'Leer más →' : 'Read more →' }}
            </span>
          </div>
        </article>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isModalOpen && selectedProject"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeModal"
        >
          <div class="absolute inset-0 bg-ink/70"></div>
          <div class="relative bg-surface border-2 border-ink max-w-2xl w-full max-h-[85vh] overflow-y-auto" style="box-shadow: var(--shadow-hard-lg);">
            <div class="relative p-6 border-b-2 border-ink">
              <h3 class="text-h2 pr-10">{{ selectedProject.title }}</h3>
              <button
                @click.stop="closeModal"
                class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-ink hover:text-ink-soft transition-colors"
                aria-label="Close modal"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
            <div class="p-6">
              <p class="text-body mb-6">{{ selectedProject.description }}</p>
              <div class="mb-6">
                <h4 class="text-label mb-3">
                  {{ currentLanguage === 'es' ? 'Tecnologías' : 'Technologies' }}
                </h4>
                <p class="text-caption">
                  <template v-for="(tech, i) in (selectedProject.technologies || [])" :key="tech">
                    {{ tech }}<template v-if="i < (selectedProject.technologies || []).length - 1"> · </template>
                  </template>
                </p>
              </div>
              <div class="flex flex-col sm:flex-row gap-3">
                <a
                  v-if="selectedProject.url"
                  :href="selectedProject.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="noir-btn text-center flex-1"
                >
                  {{ currentLanguage === 'es' ? 'Ver Proyecto' : 'View Project' }}
                </a>
                <a
                  v-if="selectedProject.github"
                  :href="selectedProject.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="noir-btn-ghost text-center flex-1"
                >
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
import { ref, computed, onMounted } from 'vue'
import { X } from 'lucide-vue-next'
import type { Project } from '../types'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'

const { t, cvData, currentLanguage } = useLanguage()
const container = ref<HTMLElement>()
const selectedProject = ref<Project | null>(null)
const isModalOpen = ref(false)

const { observe } = useScrollReveal()

const projects = computed(() => cvData.value?.projects ?? [])

onMounted(() => {
  if (container.value) observe(container.value)
})

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
</script>
