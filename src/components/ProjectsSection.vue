<template>
  <section
    id="projects"
    ref="container"
    class="section py-16 sm:py-20 lg:py-28 overflow-hidden"
    aria-labelledby="projects-heading"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <!-- Section Header — zine-style overline + title -->
      <div class="mb-14 sm:mb-20">
        <span class="text-label-md text-muted block mb-3">
          {{ currentLanguage === 'es' ? '· Trabajo seleccionado ·' : '· Selected work ·' }}
        </span>
        <h2 id="projects-heading" class="text-h1 text-fg">
          {{ t.featuredProjects }}
        </h2>
      </div>

      <!-- Zine Grid -->
      <div class="zine-grid">
        <article
          v-for="(project, idx) in projects"
          :key="project.title"
          class="zine-card group cursor-pointer"
          :class="[
            idx === 0 ? 'zine-featured' : '',
            `zine-rotate-${idx % 4}`
          ]"
          @click="openModal(project)"
        >
          <!-- Giant watermark index -->
          <span class="zine-index" aria-hidden="true">
            {{ String(idx + 1).padStart(2, '0') }}
          </span>

          <!-- Content -->
          <div class="zine-content">
            <!-- Status dot + overline -->
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

            <!-- Title -->
            <h3 class="zine-title">
              {{ project.title }}
            </h3>

            <!-- Description (visible on featured + hover) -->
            <p
              class="text-body-sm text-fg-soft mt-3 zine-desc"
              :class="idx === 0 ? 'zine-desc-visible' : ''"
            >
              {{ project.description }}
            </p>

            <!-- Tags — asymmetric float -->
            <div class="zine-tags">
              <span
                v-for="(tech, tIdx) in (project.technologies || []).slice(0, 4)"
                :key="tech"
                class="zine-tag"
                :style="{ marginTop: tIdx % 2 === 1 ? '4px' : '0' }"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Hover lift line (decorative) -->
          <div class="zine-accent-line"></div>
        </article>
      </div>
    </div>

    <!-- Modal (kept from original, tonal surfaces) -->
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
/* ═══════ Zine Grid — broken editorial layout ═══════ */
.zine-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  background: var(--border);
}

@media (min-width: 768px) {
  .zine-grid {
    grid-template-columns: 2fr 1fr 1fr;
  }
}

/* ═══════ Zine Card ═══════ */
.zine-card {
  position: relative;
  background: var(--surface-container);
  padding: 28px 24px 24px;
  overflow: hidden;
  transition:
    transform 0.4s var(--ease-out),
    background var(--duration-fast);
  cursor: pointer;
}

@media (min-width: 768px) {
  .zine-card {
    padding: 36px 28px 28px;
  }
}

.zine-card:hover {
  transform: rotate(0deg) translateY(-4px) !important;
  background: var(--surface-high);
  z-index: 2;
}

/* ═══ Featured — 2 cols at md+ ═══ */
@media (min-width: 768px) {
  .zine-featured {
    grid-column: span 2;
    padding: 48px 36px 36px;
  }
}

/* ═══ Rotations — alternating for zine rhythm ═══ */
@media (min-width: 768px) {
  .zine-rotate-0 { transform: rotate(-1deg); }
  .zine-rotate-1 { transform: rotate(1.2deg); }
  .zine-rotate-2 { transform: rotate(-0.6deg); }
  .zine-rotate-3 { transform: rotate(0.8deg); }
}

/* ═══ Giant watermark index ═══ */
.zine-index {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(80px, 12vw, 160px);
  font-weight: 800;
  line-height: 0.7;
  color: var(--muted);
  opacity: 0.12;
  position: absolute;
  top: -16px;
  right: 12px;
  pointer-events: none;
  z-index: 0;
  user-select: none;
}

.zine-featured .zine-index {
  font-size: clamp(120px, 16vw, 200px);
  top: -24px;
  right: 16px;
  opacity: 0.1;
}

/* ═══ Content layer — above index ═══ */
.zine-content {
  position: relative;
  z-index: 1;
}

/* ═══ Title — Bricolage editorial ═══ */
.zine-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(18px, 3vw, 24px);
  font-weight: 600;
  line-height: 1.15;
  color: var(--fg);
}

.zine-featured .zine-title {
  font-size: clamp(24px, 4vw, 36px);
  max-width: 70%;
}

/* ═══ Description — hidden by default, visible on featured + card hover ═══ */
.zine-desc {
  display: none;
}

.zine-desc-visible,
.zine-card:hover .zine-desc {
  display: block;
}

/* ═══ Tags — asymmetric float ═══ */
.zine-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}

.zine-tag {
  background: var(--accent-dim);
  color: var(--accent);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-sm);
  padding: 2px 8px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 10px;
  line-height: 1.3;
  font-weight: 500;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

/* ═══ Accent line — appears on hover ═══ */
.zine-accent-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.4s var(--ease-out);
}

.zine-card:hover .zine-accent-line {
  width: 100%;
}

/* ═══ Scroll reveal ═══ */
.reveal-section .reveal-child {
  opacity: 0;
  transform: translateY(16px);
}

.reveal-section.is-visible .reveal-child {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out);
}

/* ═══ Reduced motion ═══ */
@media (prefers-reduced-motion: reduce) {
  .zine-card {
    transform: none !important;
    transition: none !important;
  }
  .zine-card:hover {
    transform: none !important;
  }
}
</style>
