<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Globe, Menu, X, ChevronRight, Sun, Moon } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useTheme } from '../composables/useTheme'

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeIndex = ref(0)

const { theme, toggle } = useTheme()
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

const scrollToSection = (event: Event, href?: string) => {
  event.preventDefault()
  const targetHref = href || (event.currentTarget as HTMLAnchorElement)?.getAttribute('href')
  if (targetHref && targetHref.trim()) {
    const element = document.querySelector(targetHref)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
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

let scrollTimeout: ReturnType<typeof setTimeout> | null = null
const handleScroll = () => {
  if (scrollTimeout) return
  scrollTimeout = setTimeout(() => {
    scrollTimeout = null
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
  }, 50)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only"
  >
    {{ currentLanguage === 'es' ? 'Saltar al contenido principal' : 'Skip to main content' }}
  </a>

  <header
    :class="[
      'fixed z-50 w-full transition-colors',
      'duration-fast',
      isScrolled
        ? 'bg-bg border-b border-border/50'
        : 'bg-transparent'
    ]"
    role="banner"
  >
    <nav class="container mx-auto px-4 lg:px-6 py-3" role="navigation" aria-label="Main navigation">
      <div class="flex items-center justify-between">
        <!-- Logo / Brand -->
        <div class="flex items-center">
          <button
            @click="scrollToTop"
            class="flex items-center gap-3 group focus:outline-none focus-visible:outline-3 focus-visible:outline-accent rounded"
            aria-label="Go to home"
          >
            <div class="w-10 h-10 rounded-full bg-accent text-accent-fg flex items-center justify-center">
              <span class="text-label-lg">IB</span>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-h3 text-fg">{{ displayName }}</h1>
              <p class="text-caption text-fg-soft -mt-0.5">{{ displayTitle }}</p>
            </div>
          </button>
        </div>

        <!-- Desktop Nav Links -->
        <div class="hidden lg:flex items-center">
          <div class="flex items-center gap-1" role="menubar">
            <a
              v-for="(item, idx) in navItems"
              :key="item.href"
              :href="item.href"
              @click="scrollToSection"
              :class="[
                'px-4 py-2 rounded-full text-label-md transition-colors duration-fast',
                'focus:outline-none focus-visible:outline-2 focus-visible:outline-accent',
                activeIndex === idx
                  ? 'text-accent'
                  : 'text-fg-soft hover:text-fg'
              ]"
              :aria-current="activeIndex === idx ? 'page' : undefined"
              role="menuitem"
            >
              {{ item.label }}
            </a>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-2">
          <!-- Language Toggle -->
          <button
            @click="toggleLanguage"
            class="flex items-center gap-2 px-4 py-3 rounded-full transition-colors duration-fast bg-surface-container hover:bg-surface-high text-fg-soft hover:text-fg focus:outline-none focus-visible:outline-2 focus-visible:outline-accent"
            :aria-label="`Switch language, current: ${currentLanguage.toUpperCase()}`"
          >
            <Globe class="h-4 w-4" aria-hidden="true" />
            <span class="text-label-md">{{ currentLanguage.toUpperCase() }}</span>
          </button>

          <!-- Theme Toggle -->
          <button
            @click="toggle"
            class="relative w-16 h-10 rounded-full transition-colors duration-fast focus:outline-none focus-visible:outline-2 focus-visible:outline-accent"
            :class="theme === 'dark' ? 'bg-accent' : 'bg-muted'"
            :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <div
              class="absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-fast flex items-center justify-center"
              :class="theme === 'dark' ? 'translate-x-6' : 'translate-x-0'"
            >
              <Moon v-if="theme === 'dark'" class="w-4 h-4 text-accent" />
              <Sun v-else class="w-4 h-4 text-fg-soft" />
            </div>
          </button>

          <!-- Mobile Menu Toggle -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-3 rounded-full transition-colors duration-fast bg-surface-container hover:bg-surface-high text-fg-soft hover:text-fg focus:outline-none focus-visible:outline-2 focus-visible:outline-accent"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Toggle mobile menu"
          >
            <Menu v-if="!isMobileMenuOpen" class="h-5 w-5" aria-hidden="true" />
            <X v-else class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-fast ease-out"
        enter-from-class="opacity-0 transform -translate-y-2"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-fast ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-2"
      >
        <div v-if="isMobileMenuOpen" class="lg:hidden mt-4 border-t border-border pt-4">
          <nav class="space-y-1" role="navigation" aria-label="Mobile navigation">
            <a
              v-for="(item, idx) in navItems"
              :key="item.href"
              :href="item.href"
              @click="handleMobileNavClick"
              :class="[
                'flex items-center px-4 py-3 rounded-xl transition-colors duration-fast',
                'focus:outline-none focus-visible:outline-2 focus-visible:outline-accent',
                activeIndex === idx
                  ? 'text-accent bg-accent-dim'
                  : 'text-fg-soft hover:text-fg hover:bg-surface-container'
              ]"
              role="menuitem"
            >
              <span class="text-label-md">{{ item.label }}</span>
              <ChevronRight class="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-fast transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </Transition>
    </nav>
  </header>
</template>
