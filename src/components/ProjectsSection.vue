<template>
  <section
    id="projects"
    ref="container"
    class="crt-scanlines py-16 sm:py-20 lg:py-28"
    aria-labelledby="projects-heading"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="mb-14 sm:mb-20 text-center">
        <h1 id="projects-heading" class="text-h1 glow-pulse">
          [ PROYECTOS ]
        </h1>
      </div>

      <div class="max-w-3xl mx-auto space-y-6">
        <article
          v-for="(project, idx) in projects"
          :key="project.title"
          class="reveal-child crt-panel cursor-crosshair"
          :style="{ transitionDelay: `${idx * 80}ms` }"
        >
          <!-- CRT Header -->
          <div class="crt-header">
            [PROCESO #{{ String(idx + 1).padStart(2, '0') }}]─────────────────────────────[STATUS: {{ project.status?.toUpperCase() }}]
          </div>

          <!-- Title -->
          <h2 class="text-h2 mb-3">{{ project.title }}</h2>

          <!-- Description -->
          <p class="text-body mb-3 line-clamp-3">{{ project.description }}</p>

          <!-- Stack -->
          <p class="text-data mt-2">
            > STACK: {{ (project.technologies ?? []).join(' / ') }}
          </p>

          <!-- Actions -->
          <div class="flex flex-wrap gap-4 mt-4">
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="crt-link text-label"
            >
              > GITHUB
            </a>
            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="crt-link text-label"
            >
              > DEMO
            </a>
            <button
              @click="openModal(project)"
              class="crt-link text-label"
            >
              > VER MÁS
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
          <div class="absolute inset-0 bg-black/85"></div>
          <div class="relative crt-panel max-w-2xl w-full max-h-[85vh] overflow-y-auto" style="z-index:1">
            <div class="crt-header flex justify-between items-center">
              <span>[DETALLES DEL PROCESO]─────────────────────────────[{{ selectedProject.status?.toUpperCase() }}]</span>
              <button
                @click.stop="closeModal"
                class="text-phosphor-dim hover:text-phosphor-bright text-label ml-4"
                aria-label="Close modal"
              >
                [X]
              </button>
            </div>
            <h2 class="text-h2 mt-2 mb-4">{{ selectedProject.title }}</h2>
            <p class="text-body mb-6" style="white-space: pre-wrap;">{{ selectedProject.description }}</p>

            <div class="mb-6">
              <p class="text-label mb-2">> TECNOLOGÍAS:</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in selectedProject.technologies"
                  :key="tech"
                  class="text-data text-phosphor-dim border border-phosphor-dim px-2 py-0.5"
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
                class="crt-link text-body text-center py-2 border border-phosphor-dim flex-1"
              >
                > VER PROYECTO
              </a>
              <a
                v-if="selectedProject.github"
                :href="selectedProject.github"
                target="_blank"
                rel="noopener noreferrer"
                class="crt-link text-body text-center py-2 border border-phosphor-dim flex-1"
              >
                > GITHUB
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Project } from '../types'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'

const { cvData } = useLanguage()
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

<style scoped>
.reveal-child {
  opacity: 0;
}

.is-visible .reveal-child {
  opacity: 1;
  transition: opacity var(--ease-out, ease) 0.6s;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
