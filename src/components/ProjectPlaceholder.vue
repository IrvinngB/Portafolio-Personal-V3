<template>
  <div
    class="w-full h-full flex items-center justify-center bg-surface-container hover:bg-surface-high transition-colors duration-fast border border-border/50"
  >
    <div class="text-center p-6">
      <!-- Icon -->
      <div class="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent-dim text-muted flex items-center justify-center">
        <component :is="mainIcon" class="w-8 h-8" stroke-width="1.5" />
      </div>

      <!-- Title -->
      <h4 class="text-label-lg text-fg mb-3">{{ title }}</h4>

      <!-- Tech tags -->
      <div class="flex flex-wrap justify-center gap-1.5">
        <span
          v-for="tech in displayTechs"
          :key="tech"
          class="bg-accent-dim text-accent border border-accent-border rounded-sm px-2 py-0.5 text-label-sm"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Bot,
  Cpu,
  Globe,
  Code2,
  Smartphone,
  Database,
  Cloud,
  Palette,
} from 'lucide-vue-next'

interface Props {
  title: string
  technologies: string[]
  index?: number
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
})

const mainIcon = computed(() => {
  const techs = props.technologies.map((t) => t.toLowerCase())

  if (techs.some((t) => t.includes('bot') || t.includes('ai') || t.includes('nlp') || t.includes('gemini'))) {
    return Bot
  }
  if (techs.some((t) => t.includes('iot') || t.includes('esp') || t.includes('sensor') || t.includes('arduino'))) {
    return Cpu
  }
  if (techs.some((t) => t.includes('react native') || t.includes('mobile') || t.includes('flutter'))) {
    return Smartphone
  }
  if (techs.some((t) => t.includes('php') || t.includes('mysql') || t.includes('database') || t.includes('sql'))) {
    return Database
  }
  if (techs.some((t) => t.includes('cloud') || t.includes('aws') || t.includes('azure'))) {
    return Cloud
  }
  if (techs.some((t) => t.includes('design') || t.includes('figma') || t.includes('ui'))) {
    return Palette
  }
  if (techs.some((t) => t.includes('html') || t.includes('css') || t.includes('responsive'))) {
    return Globe
  }
  return Code2
})

const displayTechs = computed(() => {
  return props.technologies.slice(0, 3)
})
</script>
