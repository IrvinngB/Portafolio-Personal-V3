<template>
  <footer class="border-t border-phosphor-dim py-3 px-4">
    <div class="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-data">
      <!-- Status dot -->
      <span class="text-phosphor blink">●</span>

      <!-- System info -->
      <span>SYS: ONLINE | {{ currentDate }}</span>

      <!-- Location -->
      <span>LAT: 8.9936° N | LON: 79.5197° W</span>
    </div>

    <!-- SEO: Hidden semantic content -->
    <div class="sr-only" aria-hidden="true" role="contentinfo" itemscope itemtype="https://schema.org/Person">
      <span itemprop="name">Irvin Benitez</span>
      <span itemprop="jobTitle">Full Stack Developer</span>
      <span itemprop="description">Desarrollador de Software Full Stack en Panamá. Especializado en Vue.js, Django, React, Laravel, TypeScript, Python, PHP, React Native e Inteligencia Artificial. Disponible para proyectos freelance y trabajo remoto.</span>
      <span itemprop="url">https://irvincodes.dev</span>
      <span itemprop="email">Irvin.benitezs.26@gmail.com</span>
      <span itemprop="telephone">+507 6361-5832</span>
      <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
        <span itemprop="addressLocality">Panamá Oeste</span>,
        <span itemprop="addressCountry">Panamá</span>
      </span>
      <span>Irvin Benitez Software Developer Panama. irvincodes. Desarrollador web. Programador. Best developer Panama. Hire Irvin Benitez.</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useLanguage } from '../composables/useLanguage'

useLanguage()

const now = ref(new Date())
const currentDate = computed(() => {
  const dd = String(now.value.getDate()).padStart(2, '0')
  const mm = String(now.value.getMonth() + 1).padStart(2, '0')
  const yyyy = now.value.getFullYear()
  const hh = String(now.value.getHours()).padStart(2, '0')
  const min = String(now.value.getMinutes()).padStart(2, '0')
  const ss = String(now.value.getSeconds()).padStart(2, '0')
  return `${dd}-${mm}-${yyyy} | ${hh}:${min}:${ss}`
})

let dateInterval: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  dateInterval = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (dateInterval) clearInterval(dateInterval)
})
</script>
