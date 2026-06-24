<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Globe, Menu, X } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeIndex = ref(0)

const { currentLanguage, toggleLanguage, t } = useLanguage()

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
    class="fixed z-50 w-full bg-bg/95 border-b-2 border-ink py-3"
    role="banner"
  >
    <nav class="container mx-auto px-6" role="navigation" aria-label="Main navigation">
      <div class="flex items-center justify-between">
        <!-- Logo / Brand -->
        <button
          @click="scrollToTop"
          class="text-label text-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-ink"
          aria-label="Go to home"
        >
          IRVINCODES.DEV
        </button>

        <!-- Desktop Nav Links -->
        <div class="hidden lg:flex items-center gap-6">
          <a
            v-for="(item, idx) in navItems"
            :key="item.href"
            :href="item.href"
            @click="scrollToSection"
            :class="[
              'noir-nav-link',
              activeIndex === idx ? 'active' : ''
            ]"
            :aria-current="activeIndex === idx ? 'page' : undefined"
          >
            {{ item.label }}
          </a>

          <!-- Language Toggle -->
          <button
            @click="toggleLanguage"
            class="text-label text-ink-soft hover:text-ink transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-ink flex items-center gap-1"
            :aria-label="`Switch language, current: ${currentLanguage.toUpperCase()}`"
          >
            <Globe class="h-3.5 w-3.5" aria-hidden="true" />
            <span>{{ currentLanguage.toUpperCase() }}</span>
          </button>
        </div>

        <!-- Mobile Menu Toggle -->
        <button
          @click="toggleMobileMenu"
          class="lg:hidden text-ink hover:text-ink-soft transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-ink"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle mobile menu"
        >
          <Menu v-if="!isMobileMenuOpen" class="h-5 w-5" aria-hidden="true" />
          <X v-else class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="isMobileMenuOpen" class="lg:hidden mt-4 border-t-2 border-ink pt-4">
          <nav class="flex flex-col gap-2" role="navigation" aria-label="Mobile navigation">
            <a
              v-for="(item, idx) in navItems"
              :key="item.href"
              :href="item.href"
              @click="handleMobileNavClick"
              :class="[
                'noir-nav-link py-2 block',
                activeIndex === idx ? 'active' : ''
              ]"
            >
              {{ item.label }}
            </a>
            <button
              @click="toggleLanguage"
              class="text-label text-ink-soft hover:text-ink transition-colors focus:outline-none flex items-center gap-1 mt-2"
            >
              <Globe class="h-3.5 w-3.5" />
              <span>{{ currentLanguage.toUpperCase() }}</span>
            </button>
          </nav>
        </div>
      </Transition>
    </nav>
  </header>
</template>
