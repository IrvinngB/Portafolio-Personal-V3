<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useHead } from '@unhead/vue'
import { useLanguage } from './composables/useLanguage'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'

const AboutMeSection = defineAsyncComponent(() => import('./components/AboutMeSection.vue'))
const ExperienceSection = defineAsyncComponent(() => import('./components/ExperienceSection.vue'))
const ProjectsSection = defineAsyncComponent(() => import('./components/ProjectsSection.vue'))
const SkillsSection = defineAsyncComponent(() => import('./components/SkillsSection.vue'))
const EducationSection = defineAsyncComponent(() => import('./components/EducationSection.vue'))
const ContactSection = defineAsyncComponent(() => import('./components/ContactSection.vue'))
const AppFooter = defineAsyncComponent(() => import('./components/AppFooter.vue'))
const EasterEgg = defineAsyncComponent(() => import('./components/EasterEgg.vue'))

const { currentLanguage } = useLanguage()

useHead({
  title: () => currentLanguage.value === 'es'
    ? 'Irvin Benitez — Desarrollador Full Stack | Vue.js, Django, React | Panamá'
    : 'Irvin Benitez — Full Stack Developer | Vue.js, Django, React | Panama',
  meta: [
    {
      name: 'description',
      content: () => currentLanguage.value === 'es'
        ? 'Portafolio de Irvin Benitez, desarrollador Full Stack en Panamá. Especializado en Vue.js, Django, Laravel, React Native, TypeScript e Inteligencia Artificial. Transformo ideas en productos digitales de alto rendimiento.'
        : 'Portfolio of Irvin Benitez, Full Stack Developer from Panama. Specialized in Vue.js, Django, Laravel, React Native, TypeScript and Artificial Intelligence. I transform ideas into high-performance digital products.'
    },
    {
      property: 'og:title',
      content: () => currentLanguage.value === 'es'
        ? 'Irvin Benitez — Desarrollador Full Stack | Panamá'
        : 'Irvin Benitez — Full Stack Developer | Panama'
    },
    {
      property: 'og:description',
      content: () => currentLanguage.value === 'es'
        ? 'Explora mis proyectos de software y arquitectura web. Vue.js, Django, Laravel, React, IA. Portafolio profesional.'
        : 'Explore my software projects and web architecture. Vue.js, Django, Laravel, React, AI. Professional portfolio.'
    },
    { property: 'og:url', content: 'https://irvincodes.dev' },
    { property: 'og:site_name', content: 'Irvin Benitez — Full Stack Developer' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: () => currentLanguage.value === 'es'
        ? 'Irvin Benitez — Desarrollador Full Stack'
        : 'Irvin Benitez — Full Stack Developer'
    },
    {
      name: 'twitter:description',
      content: () => currentLanguage.value === 'es'
        ? 'Vue.js, Django, React & IA. Desarrollo web profesional desde Panamá.'
        : 'Vue.js, Django, React & AI. Professional web development from Panama.'
    },
    { name: 'twitter:creator', content: '@irvin_dev' }
  ],
  htmlAttrs: {
    lang: () => currentLanguage.value
  }
})

// Lifecycle hooks should be right after custom hooks
onMounted(() => {
  document.documentElement.style.scrollBehavior = 'smooth'
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})

// State declarations AFTER all hooks
const showEasterEgg = ref(false)
const konamiCode = ref<string[]>([])
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

// Handle keypress for Easter egg
const handleKeyPress = (event: KeyboardEvent) => {
  konamiCode.value.push(event.key)
  if (konamiCode.value.length > konamiSequence.length) {
    konamiCode.value.shift()
  }
  
  if (konamiCode.value.join(',') === konamiSequence.join(',')) {
    showEasterEgg.value = true
    konamiCode.value = []
  }
}
</script>

<template>
  <div class="min-h-screen bg-bg text-fg transition-colors duration-300 editorial-grain">
    <AppHeader />
    <main role="main" id="main-content">
      <HeroSection />
      <AboutMeSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </main>
    <AppFooter />
    <EasterEgg v-if="showEasterEgg" @close="showEasterEgg = false" />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
