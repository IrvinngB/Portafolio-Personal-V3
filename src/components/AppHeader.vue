<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Globe, Menu, X } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const isMobileMenuOpen = ref(false)
const activeIndex = ref(0)

const { currentLanguage, toggleLanguage } = useLanguage()

const navItems = computed(() => [
  { href: '#projects', label: 'PROYECTOS' },
  { href: '#skills', label: 'STACK' },
  { href: '#contact', label: 'CONTACTO' },
])

const sections = computed(() => ['#projects', '#skills', '#contact'])

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const scrollToSection = (event: Event, href?: string) => {
  event.preventDefault()
  const targetHref = href || (event.currentTarget as HTMLAnchorElement)?.getAttribute('href')
  if (targetHref && targetHref.trim()) {
    const element = document.querySelector(targetHref)
    if (element) {
      const headerOffset = 80
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

let scrollTimeout: ReturnType<typeof setTimeout> | null = null
const handleScroll = () => {
  if (scrollTimeout) return
  scrollTimeout = setTimeout(() => {
    scrollTimeout = null
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
    activeIndex.value = -1
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
    class="sr-only focus:not-sr-only text-phosphor"
  >
    {{ currentLanguage === 'es' ? 'Saltar al contenido principal' : 'Skip to main content' }}
  </a>

  <header
    class="fixed z-50 w-full bg-bg/95 border-b border-phosphor-dim"
    role="banner"
  >
    <nav class="container mx-auto px-4 lg:px-6 py-3" role="navigation" aria-label="Main navigation">
      <div class="flex items-center justify-between">
        <!-- Brand -->
        <div class="flex items-center">
          <a
            href="#"
            @click.prevent="scrollToTop"
            class="text-label text-phosphor crt-link"
            aria-label="Go to home"
          >
            [IRVINCODES.DEV]
          </a>
        </div>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-6">
          <a
            v-for="(item, idx) in navItems"
            :key="item.href"
            :href="item.href"
            @click="scrollToSection"
            :class="[
              'text-label crt-link',
              activeIndex === idx ? 'text-phosphor-bright' : ''
            ]"
            role="menuitem"
          >
            {{ item.label }}
          </a>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-4">
          <!-- Language Toggle -->
          <button
            @click="toggleLanguage"
            class="text-label text-phosphor-dim hover:text-phosphor transition-colors duration-fast focus:outline-none focus-visible:outline-1 focus-visible:outline-phosphor"
            :aria-label="`Switch language, current: ${currentLanguage.toUpperCase()}`"
          >
            <span class="flex items-center gap-1">
              <Globe class="h-3 w-3" aria-hidden="true" />
              {{ currentLanguage.toUpperCase() }}
            </span>
          </button>

          <!-- Mobile Menu Toggle -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden text-label text-phosphor-dim hover:text-phosphor transition-colors duration-fast focus:outline-none focus-visible:outline-1 focus-visible:outline-phosphor"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Toggle mobile menu"
          >
            <Menu v-if="!isMobileMenuOpen" class="h-4 w-4" aria-hidden="true" />
            <X v-else class="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-fast"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-fast"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isMobileMenuOpen" class="lg:hidden mt-3 border-t border-phosphor-dim pt-3">
          <nav class="space-y-2" role="navigation" aria-label="Mobile navigation">
            <a
              v-for="(item, idx) in navItems"
              :key="item.href"
              :href="item.href"
              @click="handleMobileNavClick"
              :class="[
                'block px-3 py-2 text-label crt-link',
                activeIndex === idx ? 'text-phosphor-bright' : ''
              ]"
              role="menuitem"
            >
              {{ item.label }}
            </a>
          </nav>
        </div>
      </Transition>
    </nav>
  </header>
</template>
