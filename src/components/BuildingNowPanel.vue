<script setup lang="ts">
import { activeProjects } from '../data/cvData'
</script>

<template>
  <div class="flex flex-col gap-4">
    <span class="text-label-md text-muted">Construyendo ahora</span>
    <div
      v-for="project in activeProjects"
      :key="project.title"
      class="flex flex-col gap-1 p-3 rounded-lg bg-surface-container transition-colors duration-fast"
      :class="{ 'border-l-2 border-accent pl-[10px]': project.status === 'building' }"
    >
      <div class="flex items-center gap-2">
        <span
          class="w-2 h-2 rounded-full flex-shrink-0"
          :class="project.status === 'building' ? 'bg-accent' : 'bg-muted'"
        ></span>
        <h3 class="text-h3 text-fg">{{ project.title }}</h3>
      </div>
      <p class="text-body-sm text-fg-soft">{{ project.description }}</p>
    </div>
  </div>
</template>
