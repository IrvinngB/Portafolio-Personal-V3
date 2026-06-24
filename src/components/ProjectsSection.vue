<template>
  <section
    id="projects"
    ref="container"
    class="section py-16 sm:py-20 lg:py-28 bg-bg relative overflow-hidden"
    aria-labelledby="projects-heading"
  >
    <!-- Sticker -->
    <div class="sticker sticker-float top-12 right-[5%] w-10 h-10" style="animation-delay: 0.4s;">
      <div class="sticker-shape w-full h-full bg-accent-yellow rotate-[18deg]"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <!-- Header -->
      <div class="mb-14 sm:mb-20 text-center">
        <span class="text-label text-accent-teal block mb-3">
          {{ currentLanguage === 'es' ? '· Trabajo seleccionado ·' : '· Selected work ·' }}
        </span>
        <h2 id="projects-heading" class="text-h1">
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
          <div class="timeline-card brutal-card relative overflow-hidden p-5 sm:p-7">
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
                  :class="project.status === 'active' ? 'bg-accent-teal' : 'bg-fg-soft opacity-40'"
                ></span>
                <span class="text-label text-fg-soft">
                  {{ project.status === 'active'
                    ? (currentLanguage === 'es' ? 'Activo' : 'Active')
                    : (currentLanguage === 'es' ? 'Completado' : 'Completed') }}
                </span>
              </div>

              <!-- Title -->
              <h3 class="text-h2 mb-2">
                {{ project.title }}
              </h3>

              <!-- Description -->
              <p class="text-body-md mt-3 line-clamp-2">
                {{ project.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mt-4">
                <span
                  v-for="tech in (project.technologies || []).slice(0, 4)"
                  :key="tech"
                  class="brutal-pill bg-surface text-accent-teal"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Read more -->
              <span class="inline-block mt-4 text-label text-accent-yellow opacity-0 group-hover:opacity-100 transition-opacity">
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
        enter-active-class="transition-opacity"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isModalOpen && selectedProject"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeModal"
        >
          <div class="absolute inset-0 bg-black/70"></div>
          <div class="relative brutal-card bg-surface max-w-2xl w-full max-h-[85vh] overflow-y-auto p-0">
            <div class="relative p-4 sm:p-6 border-b-2 border-border">
              <h3 class="text-h2 pr-10">{{ selectedProject.title }}</h3>
              <button
                @click.stop="closeModal"
                class="absolute top-4 right-4 w-10 h-10 border-2 border-border bg-surface hover:bg-accent-yellow flex items-center justify-center transition-colors"
                style="border-radius: 12px;"
                aria-label="Close modal"
              >
                <X class="w-5 h-5 text-fg" />
              </button>
            </div>
            <div class="p-4 sm:p-6">
              <p class="text-body-md mb-6 leading-relaxed">{{ selectedProject.description }}</p>
              <div class="mb-6">
                <h4 class="text-label text-fg-soft mb-3">
                  {{ currentLanguage === 'es' ? 'Tecnologías' : 'Technologies' }}
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in selectedProject.technologies"
                    :key="tech"
                    class="brutal-pill bg-surface text-accent-teal"
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
                  class="btn-primary flex-1 px-6 py-3 text-btn text-center"
                >
                  {{ currentLanguage === 'es' ? 'Ver Proyecto' : 'View Project' }}
                </a>
                <a
                  v-if="selectedProject.github"
                  :href="selectedProject.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-ghost flex-1 px-6 py-3 text-btn text-center"
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
  width: 2px;
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
    opacity 0.6s ease,
    transform 0.6s ease;
}

.timeline-row:last-child {
  margin-bottom: 0;
}

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
}

/* ═══════ Giant Index ═══════ */
.timeline-index {
  position: absolute;
  bottom: -8px;
  right: 8px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(80px, 10vw, 120px);
  font-weight: 800;
  line-height: 0.7;
  color: var(--fg-soft);
  opacity: 0.06;
  pointer-events: none;
  user-select: none;
  z-index: 0;
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
  background: var(--fg-soft);
  opacity: 0.4;
  border: 2px solid var(--surface);
  position: relative;
  z-index: 2;
  transition:
    background 0.15s ease,
    transform 0.3s ease;
}

.timeline-row:hover .timeline-dot {
  background: var(--accent-yellow);
  opacity: 1;
  transform: scale(1.3);
}

.timeline-node-featured .timeline-dot {
  background: var(--accent-yellow);
  opacity: 1;
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
