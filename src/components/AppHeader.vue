<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Globe, Menu, X } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeIndex = ref(0)

const { currentLanguage, toggleLanguage, t, cvData } = useLanguage()

const displayName = computed(() => cvData.value?.name ?? 'Portfolio')

const navItems = computed(() => [
  { href: '#projects', label: t.value.projects },
  { href: '#skills', label: t.value.skills },
  { href: '#contact', label: t.value.contact }
])

const sections = computed(() => ['#projects', '#skills', '#contact'])

const toggleMobileMenu = () => { isMobileMenuOpen.value = !isMobileMenuOpen.value }

const scrollToSection = (event: Event, href?: string) => {
  event.preventDefault()
  const targetHref = href || (event.currentTarget as HTMLAnchorElement)?.getAttribute('href')
  if (targetHref) {
    const el = document.querySelector(targetHref!)
    if (el) {
      const pos = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: pos, behavior: 'smooth' })
    }
  }
}

const handleMobileNavClick = (event: Event) => { scrollToSection(event); isMobileMenuOpen.value = false }

const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) }

let scrollTimeout: ReturnType<typeof setTimeout> | null = null
const handleScroll = () => {
  if (scrollTimeout) return
  scrollTimeout = setTimeout(() => {
    scrollTimeout = null
    isScrolled.value = window.scrollY > 50
    for (let i = sections.value.length - 1; i >= 0; i--) {
      const el = document.querySelector(sections.value[i]!) as HTMLElement | null
      if (el && el.getBoundingClientRect().top <= 120) { activeIndex.value = i; return }
    }
    activeIndex.value = -1
  }, 50)
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>

  <header
    class="fixed z-50 w-full transition-colors duration-150"
    :class="isScrolled ? 'bg-bg border-b-2 border-border' : 'bg-transparent'"
    role="banner"
  >
    <nav class="container mx-auto px-4 lg:px-6 py-4" role="navigation">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <button @click="scrollToTop" class="text-h2" style="color: var(--fg);">
          {{ displayName }}
        </button>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-6">
          <a
            v-for="(item, idx) in navItems" :key="item.href"
            :href="item.href" @click="scrollToSection"
            class="text-label transition-colors duration-150"
            :class="activeIndex === idx ? 'underline underline-offset-[6px] decoration-2' : ''"
            style="color: var(--fg);"
            :style="activeIndex === idx ? { textDecorationColor: 'var(--accent-yellow)' } : {}"
          >{{ item.label }}</a>

          <!-- Language -->
          <button @click="toggleLanguage" class="text-label ml-4" style="color: var(--fg-soft);">
            <Globe class="h-4 w-4 inline mr-1" />{{ currentLanguage.toUpperCase() }}
          </button>
        </div>

        <!-- Mobile toggle -->
        <button @click="toggleMobileMenu" class="lg:hidden p-2" style="color: var(--fg);">
          <Menu v-if="!isMobileMenuOpen" class="h-6 w-6" />
          <X v-else class="h-6 w-6" />
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <Transition name="slide">
      <div v-if="isMobileMenuOpen" class="lg:hidden border-t-2 border-border bg-surface">
        <div class="container mx-auto px-4 py-4 flex flex-col gap-3">
          <a v-for="item in navItems" :key="item.href" :href="item.href"
             @click="handleMobileNavClick"
             class="text-label py-2" style="color: var(--fg);">{{ item.label }}</a>
          <button @click="toggleLanguage(); isMobileMenuOpen = false"
                  class="text-label text-left" style="color: var(--fg-soft);">
            {{ currentLanguage.toUpperCase() }}
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.2s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
