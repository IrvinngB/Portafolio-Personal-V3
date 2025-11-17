<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Globe, Menu, X, ChevronRight, Sun, Moon } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeIndex = ref(0)
const isDark = ref(false)

const { currentLanguage, toggleLanguage, t, cvData } = useLanguage()

const displayName = computed(() => cvData.value?.name ?? 'Portfolio')
const displayTitle = computed(() => cvData.value?.title ?? 'Developer')

const navItems = computed(() => [
  { href: '#experience', label: t.value.experience },
  { href: '#projects', label: t.value.projects },
  { href: '#skills', label: t.value.skills },
  { href: '#education', label: t.value.education },
  { href: '#contact', label: t.value.contact }
])

const sections = computed(() => ['#experience', '#projects', '#skills', '#education', '#contact'])

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const scrollToSection = (event: Event) => {
  event.preventDefault()
  const target = event.target as HTMLAnchorElement
  const href = target.getAttribute('href')
  if (href && href.trim()) {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

const handleMobileNavClick = (event: Event) => {
  scrollToSection(event)
  isMobileMenuOpen.value = false
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  for (let i = sections.value.length - 1; i >= 0; i--) {
    const selector = sections.value[i]
    if (!selector) continue
    const el = document.querySelector(selector) as HTMLElement | null
    if (!el) continue
    const rect = el.getBoundingClientRect()
    if (rect.top <= 120) {
      activeIndex.value = i
      return
    }
  }
  activeIndex.value = 0
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isDark.value = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- Skip to main content link -->
  <a 
    href="#main-content" 
    class="sr-only focus:not-sr-only"
  >
    {{ currentLanguage === 'es' ? 'Saltar al contenido principal' : 'Skip to main content' }}
  </a>

  <header 
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-[#0A3D3D]/95 shadow-xl border-b border-[#3FA35B]/30 py-2' 
        : 'bg-[#0A3D3D]/80 py-4'
    ]"
    role="banner"
  >
    <nav class="container mx-auto px-4 lg:px-6" role="navigation" aria-label="Main navigation">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <button 
            @click="scrollToTop" 
            class="flex items-center gap-3 group hover:scale-105 transition-transform duration-200 focus:outline-none focus-ring"
            aria-label="Go to home"
          >
            <div class="relative">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300" style="background: linear-gradient(135deg, #3FA35B 0%, #B4D333 100%);">
                <span class="text-white font-bold text-lg">IB</span>
              </div>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-xl font-bold text-white group-hover:text-[#B4D333] transition-colors duration-300">
                {{ displayName }}
              </h1>
              <p class="text-xs text-[#B4D333]/70 -mt-1">
                {{ displayTitle }}
              </p>
            </div>
          </button>
        </div>

        <div class="hidden lg:flex items-center">
          <nav class="flex items-center bg-[#1f2937]/90 rounded-2xl px-2 py-2 shadow-lg border border-[#3FA35B]/30 backdrop-blur-sm" role="menubar">
            <a
              v-for="(item, idx) in navItems"
              :key="item.href"
              :href="item.href"
              @click="scrollToSection"
              :class="[
                'nav-link px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden group focus:outline-none focus-ring',
                activeIndex === idx 
                  ? 'bg-[#3FA35B] text-white shadow-md' 
                  : 'text-[#B4D333] hover:bg-[#3FA35B]/20 hover:text-white'
              ]"
              :aria-current="activeIndex === idx ? 'page' : undefined"
              role="menuitem"
            >
              <span class="relative z-10 transition-all duration-300">{{ item.label }}</span>
            </a>
          </nav>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="toggleLanguage"
            class="flex items-center gap-2 px-3 py-2 bg-[#1f2937]/80 hover:bg-[#3FA35B]/20 rounded-xl transition-all duration-300 group border border-[#3FA35B]/30 focus:outline-none focus-ring"
            :aria-label="`Switch language, current: ${currentLanguage.toUpperCase()}`"
          >
            <Globe class="h-4 w-4 text-[#B4D333] group-hover:text-[#C5D946] transition-colors" aria-hidden="true" />
            <span class="text-sm font-medium text-[#B4D333] group-hover:text-[#C5D946]">
              {{ currentLanguage.toUpperCase() }}
            </span>
          </button>

          <button
            @click="toggleDarkMode"
            class="relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus-ring"
            :class="isDark ? 'bg-[#3FA35B]' : 'bg-gray-300'"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <div 
              class="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center"
              :class="isDark ? 'translate-x-7' : 'translate-x-0'"
            >
              <Moon v-if="isDark" class="w-4 h-4 text-[#3FA35B]" />
              <Sun v-else class="w-4 h-4 text-gray-600" />
            </div>
          </button>

          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-2.5 bg-[#1f2937]/80 hover:bg-[#3FA35B]/20 rounded-xl transition-all duration-300 group border border-[#3FA35B]/30 focus:outline-none focus-ring"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Toggle mobile menu"
          >
            <Menu v-if="!isMobileMenuOpen" class="h-5 w-5 text-[#B4D333] group-hover:text-[#C5D946] transition-colors" aria-hidden="true" />
            <X v-else class="h-5 w-5 text-[#B4D333] group-hover:text-red-400 transition-colors" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform -translate-y-2"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-2"
      >
        <div v-if="isMobileMenuOpen" class="lg:hidden mt-4 border-t border-[#3FA35B]/30 pt-4">
          <nav class="space-y-2" role="navigation" aria-label="Mobile navigation">
            <a
              v-for="(item, idx) in navItems"
              :key="item.href"
              :href="item.href"
              @click="handleMobileNavClick"
              :class="[
                'mobile-nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 group focus:outline-none focus-ring',
                activeIndex === idx
                  ? 'bg-[#3FA35B] text-white shadow-md'
                  : 'text-[#B4D333] hover:bg-[#3FA35B]/20 hover:text-white'
              ]"
              role="menuitem"
            >
              <span class="font-medium">{{ item.label }}</span>
              <ChevronRight class="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<style scoped>
header {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.nav-link {
  position: relative;
  overflow: hidden;
  font-weight: 600;
  letter-spacing: -0.025em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover {
  transform: translateY(-1px);
}

.mobile-nav-link {
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover {
  transform: translateX(4px);
}

.v-enter-active, .v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

button:focus, a:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 8px;
}

.focus-ring:focus {
  outline: 2px solid #3FA35B;
  outline-offset: 2px;
  border-radius: 8px;
}
</style>
