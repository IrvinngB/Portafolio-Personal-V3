<template>
  <section
    id="projects"
    ref="container"
    class="reveal-section section py-12 sm:py-16 lg:py-20"
    aria-labelledby="projects-heading"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <h2 id="projects-heading" class="text-h1 text-fg mb-4">
          {{ t.featuredProjects }}
        </h2>
        <p class="text-body-lg text-fg-soft max-w-2xl mx-auto">
          {{ currentLanguage === 'es'
            ? 'Proyectos que combinan diseño, rendimiento y experiencia de usuario'
            : 'Projects that combine design, performance and user experience' }}
        </p>
      </div>

      <!-- Featured Project (asymmetric grid) -->
      <div
        v-if="featuredProject"
        class="reveal-child grid lg:grid-cols-[1.6fr_1fr] gap-1 bg-border mb-1"
      >
        <article
          class="bg-surface-container hover:bg-surface-high transition-colors duration-fast p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <!-- Index -->
            <span class="text-mono text-muted mb-4 block">01</span>
            <!-- Title -->
            <h3 class="text-h2 text-fg mb-3">{{ featuredProject.title }}</h3>
            <!-- Description -->
            <p class="text-body-md text-fg-soft mb-6 line-clamp-3">{{ featuredProject.description }}</p>
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="tech in featuredProject.technologies"
                :key="tech"
                class="bg-accent-dim text-accent border border-accent-border rounded-sm px-2 py-0.5 text-label-sm"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          <!-- Actions -->
          <div class="flex gap-3">
            <a
              v-if="featuredProject.url"
              :href="featuredProject.url"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-accent text-accent-fg rounded-full px-5 py-2.5 text-btn transition-colors duration-fast hover:bg-surface-high"
            >
              {{ currentLanguage === 'es' ? 'Ver Proyecto' : 'View Project' }}
            </a>
            <a
              v-if="featuredProject.github"
              :href="featuredProject.github"
              target="_blank"
              rel="noopener noreferrer"
              class="border border-accent text-accent rounded-full px-5 py-2.5 text-btn transition-colors duration-fast hover:bg-accent hover:text-accent-fg"
            >
              GitHub
            </a>
            <button
              @click="openModal(featuredProject)"
              class="text-accent text-btn hover:underline ml-auto self-center"
            >
              {{ currentLanguage === 'es' ? 'Ver más' : 'Read more' }}
            </button>
          </div>
        </article>

        <!-- Featured image placeholder -->
        <div class="bg-surface-high flex items-center justify-center min-h-[240px] lg:min-h-0">
          <div class="text-muted text-center p-8">
            <span class="text-mono block mb-2 text-accent">{{ featuredProject.title }}</span>
            <span class="text-caption">{{ currentLanguage === 'es' ? 'Proyecto destacado' : 'Featured project' }}</span>
          </div>
        </div>
      </div>

      <!-- Secondary Projects (2-column grid) -->
      <div
        v-if="secondaryProjects.length > 0"
        class="reveal-child grid grid-cols-1 sm:grid-cols-2 gap-1 bg-border"
      >
        <article
          v-for="(project, idx) in secondaryProjects"
          :key="project.title"
          class="bg-surface-container hover:bg-surface-high transition-colors duration-fast p-5 sm:p-6 flex flex-col"
          :style="{ transitionDelay: `${idx * 60}ms` }"
        >
          <!-- Index -->
          <span class="text-mono text-muted mb-3 block">
            {{ String(idx + 2).padStart(2, '0') }}
          </span>
          <!-- Title -->
          <h4 class="text-h3 text-fg mb-2">{{ project.title }}</h4>
          <!-- Description -->
          <p class="text-body-md text-fg-soft mb-4 line-clamp-2 flex-grow">{{ project.description }}</p>
          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span
              v-for="tech in (project.technologies || []).slice(0, 4)"
              :key="tech"
              class="bg-accent-dim text-accent border border-accent-border rounded-sm px-2 py-0.5 text-label-sm"
            >
              {{ tech }}
            </span>
          </div>
          <!-- Actions -->
          <div class="flex gap-2">
            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-accent text-btn hover:underline"
            >
              {{ currentLanguage === 'es' ? 'Ver' : 'Visit' }}
            </a>
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted text-btn hover:text-accent transition-colors duration-fast"
            >
              GitHub
            </a>
            <button
              @click="openModal(project)"
              class="text-muted text-btn hover:text-accent transition-colors duration-fast ml-auto"
            >
              {{ currentLanguage === 'es' ? 'Detalles' : 'Details' }}
            </button>
          </div>
        </article>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-fast"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-fast"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isModalOpen && selectedProject"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeModal"
        >
          <div class="absolute inset-0 bg-black/70"></div>
          <div class="relative bg-surface rounded-xl sm:rounded-xxl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-card-hover border border-border">
            <!-- Header -->
            <div class="relative p-4 sm:p-6 border-b border-border">
              <h3 class="text-h2 text-fg pr-10">{{ selectedProject.title }}</h3>
              <button
                @click.stop="closeModal"
                @touchend.stop.prevent="closeModal"
                class="absolute top-4 right-4 w-10 h-10 min-w-[44px] min-h-[44px] bg-surface-high hover:bg-surface-container rounded-full flex items-center justify-center transition-colors duration-fast touch-manipulation cursor-pointer"
                aria-label="Close modal"
                type="button"
              >
                <X class="w-5 h-5 text-fg-soft" />
              </button>
            </div>
            <!-- Body -->
            <div class="p-4 sm:p-6">
              <p class="text-body-md text-fg-soft mb-6 leading-relaxed">{{ selectedProject.description }}</p>
              <div class="mb-6">
                <h4 class="text-label-md text-muted mb-3">
                  {{ currentLanguage === 'es' ? 'Tecnologías' : 'Technologies' }}
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in selectedProject.technologies"
                    :key="tech"
                    class="bg-accent-dim text-accent border border-accent-border rounded-sm px-2 py-1 text-label-sm"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row gap-3">
                <a
                  v-if="selectedProject.url"
                  :href="selectedProject.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 bg-accent text-accent-fg rounded-full px-6 py-3 text-btn text-center transition-colors duration-fast hover:bg-surface-high"
                >
                  {{ currentLanguage === 'es' ? 'Ver Proyecto' : 'View Project' }}
                </a>
                <a
                  v-if="selectedProject.github"
                  :href="selectedProject.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="border border-accent text-accent rounded-full px-6 py-3 text-btn text-center transition-colors duration-fast hover:bg-accent hover:text-accent-fg"
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

const featuredProject = computed(() => {
  const projects = cvData.value.projects
  return projects.length > 0 ? projects[0] : null
})

const secondaryProjects = computed(() => {
  const projects = cvData.value.projects
  return projects.slice(1)
})
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

.line-clamp-2,
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.line-clamp-3 {
  -webkit-line-clamp: 3;
  line-clamp: 3;
}
</style>
