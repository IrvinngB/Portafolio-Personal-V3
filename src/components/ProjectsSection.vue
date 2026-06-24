<template>
  <section
    id="projects"
    ref="container"
    class="section py-16 sm:py-20 lg:py-28"
    aria-labelledby="projects-heading"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="mb-14 sm:mb-20 text-center">
        <span class="text-label-md text-muted block mb-3">
          {{ currentLanguage === 'es' ? '· Trabajo seleccionado ·' : '· Selected work ·' }}
        </span>
        <h2 id="projects-heading" class="text-h1 text-fg">
          {{ t.featuredProjects }}
        </h2>
      </div>

      <!-- Timeline -->
      <div class="timeline">
        <article
          v-for="(project, idx) in projects"
          :key="project.title"
          class="timeline-row group cursor-pointer"
          :class="idx % 2 === 0 ? 'timeline-left' : 'timeline-right'"
          @click="openModal(project)"
        >
          <!-- Card -->
          <div class="timeline-card">
            <!-- Giant index watermark -->
            <span class="timeline-index" aria-hidden="true">
              {{ String(idx + 1).padStart(2, '0') }}
            </span>

            <!-- Content -->
            <div class="relative z-10">
              <!-- Status + overline -->
              <div class="flex items-center gap-2 mb-3">
                <span
                  class="w-2 h-2 rounded-full"
                  :class="project.status === 'active' ? 'bg-accent' : 'bg-muted'"
                ></span>
                <span class="text-label-md text-muted">
                  {{ project.status === 'active'
                    ? (currentLanguage === 'es' ? 'Activo' : 'Active')
                    : (currentLanguage === 'es' ? 'Completado' : 'Completed') }}
                </span>
              </div>

              <!-- Title -->
              <h3 class="timeline-title">
                {{ project.title }}
              </h3>

              <!-- Description -->
              <p class="text-body-sm text-fg-soft mt-3 line-clamp-2">
                {{ project.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 mt-4">
                <span
                  v-for="tech in (project.technologies || []).slice(0, 4)"
                  :key="tech"
                  class="bg-accent-dim text-accent border border-accent-border rounded-sm px-2 py-0.5 text-label-sm"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Read more -->
              <span class="inline-block mt-4 text-btn text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-fast">
                {{ currentLanguage === 'es' ? 'Ver más →' : 'Read more →' }}
              </span>
            </div>
          </div>

          <!-- Node on the line -->
          <div class="timeline-node" :class="idx === 0 ? 'timeline-node-featured' : ''">
            <span class="timeline-dot"></span>
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
            <div class="relative p-4 sm:p-6 border-b border-border">
              <h3 class="text-h2 text-fg pr-10">{{ selectedProject.title }}</h3>
              <button
                @click.stop="closeModal"
                class="absolute top-4 right-4 min-w-[44px] min-h-[44px] bg-surface-high hover:bg-surface-container rounded-full flex items-center justify-center transition-colors duration-fast"
                aria-label="Close modal"
              >
                <X class="w-5 h-5 text-fg-soft" />
              </button>
            </div>
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
                  class="flex-1 bg-accent text-accent-fg rounded-full px-6 py-4 text-btn text-center transition-colors duration-fast hover:bg-surface-high"
                >
                  {{ currentLanguage === 'es' ? 'Ver Proyecto' : 'View Project' }}
                </a>
                <a
                  v-if="selectedProject.github"
                  :href="selectedProject.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="border border-accent text-accent rounded-full px-6 py-4 text-btn text-center transition-colors duration-fast hover:bg-accent hover:text-accent-fg"
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

<style scoped>
/* ═══════ Timeline Structure ═══════ */
.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

/* Central line — hidden on mobile */
.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--border);
  transform: translateX(-50%);
}

/* ═══════ Timeline Row ═══════ */
.timeline-row {
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 48px;
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out);
}

.timeline-row:last-child {
  margin-bottom: 0;
}

/* Revealed by scroll observer */
.is-visible .timeline-row {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger */
.timeline-row:nth-child(2) { transition-delay: 80ms; }
.timeline-row:nth-child(3) { transition-delay: 160ms; }
.timeline-row:nth-child(4) { transition-delay: 240ms; }
.timeline-row:nth-child(5) { transition-delay: 320ms; }

/* Left: card on left, node in center */
.timeline-left {
  flex-direction: row;
}

/* Right: node in center, card on right */
.timeline-right {
  flex-direction: row-reverse;
}

/* ═══════ Card ═══════ */
.timeline-card {
  width: calc(50% - 32px);
  position: relative;
  overflow: hidden;
  background: var(--surface-container);
  border-radius: var(--radius-xl);
  padding: 28px 24px;
  transition:
    background var(--duration-fast),
    transform 0.3s var(--ease-out);
}

.timeline-card:hover {
  background: var(--surface-high);
  transform: translateY(-2px);
}

/* ═══════ Giant Index ═══════ */
.timeline-index {
  position: absolute;
  bottom: -8px;
  right: 8px;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(80px, 10vw, 120px);
  font-weight: 800;
  line-height: 0.7;
  color: var(--muted);
  opacity: 0.08;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

/* ═══════ Title ═══════ */
.timeline-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(18px, 2.5vw, 22px);
  font-weight: 600;
  line-height: 1.15;
  color: var(--fg);
}

/* ═══════ Node (dot on the line) ═══════ */
.timeline-node {
  flex-shrink: 0;
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 28px;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--muted);
  border: 2px solid var(--surface);
  position: relative;
  z-index: 2;
  transition:
    background var(--duration-fast),
    transform 0.3s var(--ease-out);
}

.timeline-row:hover .timeline-dot {
  background: var(--accent);
  transform: scale(1.3);
}

.timeline-node-featured .timeline-dot {
  background: var(--accent);
  width: 14px;
  height: 14px;
}

/* ═══════ Line clamp ═══════ */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ═══════ Mobile — single column, line on left ═══════ */
@media (max-width: 767px) {
  .timeline {
    padding-left: 32px;
  }

  .timeline::before {
    left: 16px;
    transform: none;
  }

  .timeline-row {
    flex-direction: row !important;
    margin-bottom: 36px;
  }

  .timeline-card {
    width: 100%;
    padding: 20px 18px;
  }

  .timeline-node {
    position: absolute;
    left: -32px;
    width: 32px;
    padding-top: 20px;
  }

  .timeline-index {
    font-size: 80px;
    right: 4px;
    bottom: -6px;
  }

  .timeline-title {
    font-size: 18px;
  }
}

/* ═══════ Reduced motion ═══════ */
@media (prefers-reduced-motion: reduce) {
  .timeline-row {
    opacity: 1;
    transform: none;
    transition: none !important;
  }
  .timeline-card:hover {
    transform: none;
  }
}
</style>
