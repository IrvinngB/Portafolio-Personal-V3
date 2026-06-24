<script setup lang="ts">
import { activeProjects } from '../data/cvData'

const timeAgo = (dateStr?: string): string => {
  if (!dateStr) return ''
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffDays = Math.floor((now - then) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'hoy'
  if (diffDays === 1) return 'ayer'
  if (diffDays < 7) return `hace ${diffDays} días`
  if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} sem`
  return `hace ${Math.floor(diffDays / 30)} mes${Math.floor(diffDays / 30) > 1 ? 'es' : ''}`
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="text-label">Construyendo ahora</p>
    <div
      v-for="project in activeProjects"
      :key="project.title"
      class="noir-card py-3 px-4"
    >
      <div class="flex items-center gap-2 mb-1">
        <span
          class="w-2 h-2 inline-block flex-shrink-0"
          :style="{ background: project.status === 'building' ? 'var(--ink)' : 'var(--ink-faint)' }"
        ></span>
        <h3 class="text-h2 text-base">{{ project.title }}</h3>
      </div>
      <p class="text-body text-sm">{{ project.description }}</p>
      <span v-if="project.lastUpdated" class="text-caption mt-1 block">
        {{ project.status === 'building' ? 'Actualizado' : 'Planificado' }} {{ timeAgo(project.lastUpdated) }}
      </span>
    </div>
  </div>
</template>
