<template>
  <section
    id="projects"
    ref="container"
    class="section py-16 sm:py-20 lg:py-28"
    aria-labelledby="projects-heading"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="mb-10 sm:mb-14">
        <span class="text-label-md text-muted block mb-3">
          {{ currentLanguage === 'es' ? '· Trabajo seleccionado ·' : '· Selected work ·' }}
        </span>
        <h2 id="projects-heading" class="text-h1 text-fg">
          {{ t.featuredProjects }}
        </h2>
      </div>
    </div>

    <!-- Desktop: horizontal scroll track -->
    <div
      class="hidden md:block"
      @wheel.passive="onWheel"
    >
      <div
        ref="trackRef"
        class="scroll-track flex gap-[1px] overflow-x-auto snap-x snap-mandatory"
        :class="{ 'scrolling': isScrolling }"
      >
        <div
          v-for="(project, idx) in projects"
          :key="project.title"
          class="scroll-card snap-start shrink-0 cursor-pointer group flex flex-col justify-between relative overflow-hidden"
          :class="idx === 0 ? 'w-[520px] lg:w-[600px]' : 'w-[340px] lg:w-[380px]'"
          style="background: var(--surface-container);"
          @click="openModal(project)"
        >
          <!-- Giant index -->
          <span
            class="absolute -bottom-4 -right-2 pointer-events-none select-none z-0"
            style="font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(100px, 14vw, 180px); font-weight: 800; line-height: 0.7; color: var(--muted); opacity: 0.1;"
            aria-hidden="true"
          >
            {{ String(idx + 1).padStart(2, '0') }}
          </span>

          <!-- Top: status + title -->
          <div class="relative z-10 p-6 sm:p-8 pb-4">
            <div class="flex items-center gap-2 mb-3">
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="project.status === 'active' ? 'bg-accent' : 'bg-muted'"
              ></span>
              <span class="text-label-md text-muted">
                {{ project.status === 'active'
                  ? (currentLanguage === 'es' ? 'Activo' : 'Active')
                  : (currentLanguage === 'es' ? 'Completado' : 'Completed') }}
              </span>
            </div>

            <h3
              style="font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(22px, 3vw, 28px); font-weight: 600; line-height: 1.15; color: var(--fg);"
              :class="idx === 0 ? 'max-w-[65%]' : ''"
            >
              {{ project.title }}
            </h3>

            <p class="text-body-sm text-fg-soft mt-3 line-clamp-2">
              {{ project.description }}
            </p>
          </div>

          <!-- Bottom: tags -->
          <div class="relative z-10 p-6 sm:p-8 pt-0">
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tech in (project.technologies || []).slice(0, 4)"
                :key="tech"
                class="bg-accent-dim text-accent border border-accent-border rounded-sm px-2 py-0.5 text-label-sm"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Hover surface change + accent line -->
          <div
            class="absolute inset-0 transition-colors duration-fast z-[1]"
            :class="idx === 0 ? '' : ''"
            style="background: transparent;"
          ></div>
          <div
            class="absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ease-out"
            :style="{ width: '0%' }"
            style="z-index: 10;"
          ></div>

          <!-- Hover overlay handled by group-hover on parent -->
        </div>
      </div>
    </div>

    <!-- Mobile: vertical stack -->
    <div class="md:hidden container mx-auto px-4 sm:px-6">
      <div class="flex flex-col gap-[1px]" style="background: var(--border);">
        <article
          v-for="(project, idx) in projects"
          :key="project.title"
          class="relative overflow-hidden cursor-pointer group p-5 sm:p-6 flex flex-col gap-3"
          style="background: var(--surface-container);"
          @click="openModal(project)"
        >
          <!-- Giant index behind -->
          <span
            class="absolute -bottom-2 right-2 pointer-events-none select-none z-0"
            style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 120px; font-weight: 800; line-height: 0.7; color: var(--muted); opacity: 0.08;"
            aria-hidden="true"
          >
            {{ String(idx + 1).padStart(2, '0') }}
          </span>

          <div class="relative z-10">
            <div class="flex items-center gap-2 mb-2">
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="project.status === 'active' ? 'bg-accent' : 'bg-muted'"
              ></span>
              <span class="text-label-md text-muted">
                {{ project.status === 'active'
                  ? (currentLanguage === 'es' ? 'Activo' : 'Active')
                  : (currentLanguage === 'es' ? 'Completado' : 'Completed') }}
              </span>
            </div>
            <h3
              style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 22px; font-weight: 600; line-height: 1.15; color: var(--fg);"
            >
              {{ project.title }}
            </h3>
            <p class="text-body-sm text-fg-soft mt-2 line-clamp-2">
              {{ project.description }}
            </p>
          </div>

          <div class="relative z-10 flex flex-wrap gap-1.5">
            <span
              v-for="tech in (project.technologies || []).slice(0, 4)"
              :key="tech"
              class="bg-accent-dim text-accent border border-accent-border rounded-sm px-2 py-0.5 text-label-sm"
            >
              {{ tech }}
            </span>
          </div>

          <div
            class="absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ease-out"
            style="width: 0%; z-index: 10;"
          ></div>
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
                class="absolute top-4 right-4 w-10 h-10 bg-surface-high hover:bg-surface-container rounded-full flex items-center justify-center transition-colors duration-fast"
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'
import type { Project } from '../types'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'

const { t, cvData, currentLanguage } = useLanguage()
const container = ref<HTMLElement>()
const trackRef = ref<HTMLElement>()
const selectedProject = ref<Project | null>(null)
const isModalOpen = ref(false)
const isScrolling = ref(false)

const { observe } = useScrollReveal()

const projects = computed(() => cvData.value?.projects ?? [])

let scrollTimer: ReturnType<typeof setTimeout> | null = null

const onWheel = (e: WheelEvent) => {
  if (!trackRef.value) return
  // Convert vertical scroll to horizontal when in the track
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    e.preventDefault()
    trackRef.value.scrollLeft += e.deltaY
  }
  isScrolling.value = true
  if (scrollTimer) clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    isScrolling.value = false
  }, 150)
}

onMounted(() => {
  if (container.value) observe(container.value)
  // Passive: false needed to call preventDefault in wheel handler
  trackRef.value?.addEventListener('wheel', onWheel as any, { passive: false })
})

onUnmounted(() => {
  trackRef.value?.removeEventListener('wheel', onWheel as any)
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
/* ═══════ Scroll Track ═══════ */
.scroll-track {
  scrollbar-width: thin;
  scrollbar-color: var(--accent) var(--surface);
  scroll-behavior: smooth;
}

.scroll-track::-webkit-scrollbar {
  height: 6px;
}

.scroll-track::-webkit-scrollbar-track {
  background: var(--surface);
}

.scroll-track::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 9999px;
}

.scroll-track::-webkit-scrollbar-thumb:hover {
  background: var(--surface-high);
}

/* Hover effects on cards */
.scroll-card:hover {
  background: var(--surface-high) !important;
}

.scroll-card:hover > div[class*="absolute bottom-0 left-0"] {
  width: 100% !important;
}

/* Mobile card hover */
article:hover {
  background: var(--surface-high) !important;
}

article:hover > div[class*="absolute bottom-0 left-0"] {
  width: 100% !important;
}

/* ═══════ Reduced motion ═══════ */
@media (prefers-reduced-motion: reduce) {
  .scroll-track {
    scroll-behavior: auto;
  }
}

/* ═══════ Line clamp ═══════ */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
