<template>
  <div 
    class="w-full h-full flex items-center justify-center relative overflow-hidden"
    :style="{ background: gradientStyle }"
  >
    <!-- Pattern de fondo -->
    <svg class="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>

    <!-- Círculos decorativos -->
    <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
    <div class="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

    <!-- Contenido central -->
    <div class="relative z-10 text-center p-6">
      <!-- Icono principal -->
      <div class="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
        <component :is="mainIcon" class="w-10 h-10 text-white" stroke-width="1.5" />
      </div>

      <!-- Título del proyecto -->
      <h4 class="text-white font-bold text-lg mb-2 drop-shadow-lg">{{ title }}</h4>

      <!-- Tags de tecnologías -->
      <div class="flex flex-wrap justify-center gap-2 mt-3">
        <span 
          v-for="tech in displayTechs" 
          :key="tech"
          class="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full font-medium"
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
  Palette
} from 'lucide-vue-next'

interface Props {
  title: string
  technologies: string[]
  index?: number
}

const props = withDefaults(defineProps<Props>(), {
  index: 0
})

const gradients = [
  'linear-gradient(135deg, #3FA35B 0%, #0A3D3D 100%)',
  'linear-gradient(135deg, #0A3D3D 0%, #3FA35B 100%)',
  'linear-gradient(135deg, #B4D333 0%, #3FA35B 100%)',
  'linear-gradient(135deg, #3FA35B 0%, #B4D333 100%)',
  'linear-gradient(135deg, #C5D946 0%, #0A3D3D 100%)',
]

const gradientStyle = computed(() => {
  return gradients[props.index % gradients.length]
})

const mainIcon = computed(() => {
  const techs = props.technologies.map(t => t.toLowerCase())
  
  if (techs.some(t => t.includes('bot') || t.includes('ai') || t.includes('nlp') || t.includes('gemini'))) {
    return Bot
  }
  if (techs.some(t => t.includes('iot') || t.includes('esp') || t.includes('sensor') || t.includes('arduino'))) {
    return Cpu
  }
  if (techs.some(t => t.includes('react native') || t.includes('mobile') || t.includes('flutter'))) {
    return Smartphone
  }
  if (techs.some(t => t.includes('php') || t.includes('mysql') || t.includes('database') || t.includes('sql'))) {
    return Database
  }
  if (techs.some(t => t.includes('cloud') || t.includes('aws') || t.includes('azure'))) {
    return Cloud
  }
  if (techs.some(t => t.includes('design') || t.includes('figma') || t.includes('ui'))) {
    return Palette
  }
  if (techs.some(t => t.includes('html') || t.includes('css') || t.includes('responsive'))) {
    return Globe
  }
  return Code2
})

const displayTechs = computed(() => {
  return props.technologies.slice(0, 3)
})
</script>
