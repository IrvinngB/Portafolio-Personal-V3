<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import { useGSAP } from './composables/useGSAP'

const AboutMeSection = defineAsyncComponent(() => import('./components/AboutMeSection.vue'))
const ExperienceSection = defineAsyncComponent(() => import('./components/ExperienceSection.vue'))
const ProjectsSection = defineAsyncComponent(() => import('./components/ProjectsSection.vue'))
const SkillsSection = defineAsyncComponent(() => import('./components/SkillsSection.vue'))
const EducationSection = defineAsyncComponent(() => import('./components/EducationSection.vue'))
const CertificationsSection = defineAsyncComponent(() => import('./components/CertificationsSection.vue'))
const WhyHireMeSection = defineAsyncComponent(() => import('./components/WhyHireMeSection.vue'))
const ContactSection = defineAsyncComponent(() => import('./components/ContactSection.vue'))
const AppFooter = defineAsyncComponent(() => import('./components/AppFooter.vue'))
const EasterEgg = defineAsyncComponent(() => import('./components/EasterEgg.vue'))

// Custom hooks should be called at the very top level
useGSAP()

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
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <AppHeader />
    <main role="main" id="main-content">
      <HeroSection />
      <AboutMeSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
    
      <WhyHireMeSection />
      <ContactSection />
    </main>
    <AppFooter />
    <EasterEgg v-if="showEasterEgg" @close="showEasterEgg = false" />
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #f3f4f6;
}

.dark ::-webkit-scrollbar-track {
  background-color: #1f2937;
}

::-webkit-scrollbar-thumb {
  background-color: #3b82f6;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #2563eb;
}

* {
  transition-property: color, background-color, border-color;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

html {
  scroll-behavior: smooth;
}
</style>
