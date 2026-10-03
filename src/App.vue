<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useHead } from '@unhead/vue'
import { useLanguage } from './composables/useLanguage'
import AppHeader from './components/AppHeader.vue'

const AppFooter = defineAsyncComponent(() => import('./components/AppFooter.vue'))
const EasterEgg = defineAsyncComponent(() => import('./components/EasterEgg.vue'))

const { currentLanguage } = useLanguage()

// Per-page title/description/canonical live in each page via usePageSeo
useHead({
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
      <RouterView />
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
