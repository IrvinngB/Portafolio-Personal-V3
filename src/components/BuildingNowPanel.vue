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
  <div class="flex flex-col gap-4 w-full">
    <span class="text-label text-phosphor-dim">> CONSTRUYENDO AHORA</span>
    <div
      v-for="project in activeProjects"
      :key="project.title"
      class="crt-panel w-full"
    >
      <div class="crt-header">
        [STATUS: {{ project.status?.toUpperCase() }}]
      </div>
      <h3 class="text-h2 mt-1 mb-1">{{ project.title }}</h3>
      <p class="text-body">{{ project.description }}</p>
      <span v-if="project.lastUpdated" class="text-data text-phosphor-dim mt-2 block">
        > {{ project.status === 'building' ? 'Actualizado' : 'Planificado' }} {{ timeAgo(project.lastUpdated) }}
      </span>
    </div>
  </div>
</template>
