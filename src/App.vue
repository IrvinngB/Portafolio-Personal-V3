<script setup lang="ts">
// Custom hooks and utilities are auto-imported in Nuxt 3 (including components and GSAP)
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
      <LazyAboutMeSection />
      <LazyExperienceSection />
      <LazyProjectsSection />
      <LazySkillsSection />
      <LazyEducationSection />
    
      <LazyWhyHireMeSection />
      <LazyContactSection />
    </main>
    <AppFooter />
    <LazyEasterEgg v-if="showEasterEgg" @close="showEasterEgg = false" />
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
