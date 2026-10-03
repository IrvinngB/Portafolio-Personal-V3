<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Globe, Menu, X, ChevronRight, Sun, Moon } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useTheme } from '../composables/useTheme'
import BrandMark from './BrandMark.vue'

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeHash = ref<string | null>(null)

const route = useRoute()
const router = useRouter()
const { theme, toggle } = useTheme()
const { currentLanguage, toggleLanguage, t, cvData } = useLanguage()

const displayName = computed(() => cvData.value?.name ?? 'Portfolio')
const displayTitle = computed(() => cvData.value?.title ?? 'Developer')

type NavItem = { label: string; hash?: string; path: string }

const navItems = computed<NavItem[]>(() => [
  { path: '/', hash: '#projects', label: t.value.projects },
  { path: '/', hash: '#experience', label: t.value.experience },
  { path: '/', hash: '#skills', label: t.value.skills },
  { path: '/', hash: '#education', label: t.value.education },
  { path: '/', hash: '#contact', label: t.value.contact },
  { path: '/freelance', label: t.value.freelance },
])

const hrefOf = (item: NavItem) => router.resolve({ path: item.path, hash: item.hash }).href

const isActive = (item: NavItem) =>
  item.hash ? route.path === '/' && activeHash.value === item.hash : route.path === item.path

const scrollToHash = (hash: string) => {
  const element = document.querySelector(hash)
  if (!element) return
  const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 90
  window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
}

const navigate = (event: Event, item: NavItem) => {
  event.preventDefault()
  isMobileMenuOpen.value = false
  if (item.hash && route.path === '/') {
    scrollToHash(item.hash)
    history.replaceState(history.state, '', item.hash)
    return
  }
  router.push({ path: item.path, hash: item.hash })
}

const goHome = () => {
  isMobileMenuOpen.value = false
  if (route.path === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
  else router.push('/')
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Scroll spy for the home page sections
let scrollTimeout: ReturnType<typeof setTimeout> | null = null
const handleScroll = () => {
  if (scrollTimeout) return
  scrollTimeout = setTimeout(() => {
    scrollTimeout = null
    isScrolled.value = window.scrollY > 50
    if (route.path !== '/') {
      activeHash.value = null
      return
    }
    const hashes = navItems.value.filter(i => i.hash).map(i => i.hash as string)
    for (let i = hashes.length - 1; i >= 0; i--) {
      const el = document.querySelector(hashes[i] as string)
      if (el && el.getBoundingClientRect().top <= 120) {
        activeHash.value = hashes[i] as string
        return
      }
    }
    activeHash.value = null
  }, 50)
}

watch(() => route.path, () => handleScroll())

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
            @click="goHome"
            class="flex items-center gap-3 group focus:outline-none focus-visible:outline-3 focus-visible:outline-accent rounded"
            aria-label="Go to home"
          >
            <BrandMark class="h-10 w-auto" />
            <div class="hidden sm:block">
              <span class="block text-h3 text-fg">{{ displayName }}</span>
              <p class="text-caption text-fg-soft -mt-0.5 whitespace-nowrap lg:hidden xl:block">{{ displayTitle }}</p>
            </div>
          </button>
        </div>

        <!-- Desktop Nav Links -->
        <div class="hidden lg:flex items-center">
          <div class="flex items-center gap-1" role="menubar">
            <a
              v-for="item in navItems"
              :key="item.label"
              :href="hrefOf(item)"
              @click="navigate($event, item)"
              :class="[
                'px-4 py-2 rounded-full text-label-md transition-colors duration-fast',
                'focus:outline-none focus-visible:outline-2 focus-visible:outline-accent',
                !item.hash && 'nav-freelance',
                isActive(item)
                  ? 'text-accent'
                  : 'text-fg-soft hover:text-fg'
              ]"
              :aria-current="isActive(item) ? (item.hash ? 'location' : 'page') : undefined"
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
              v-for="item in navItems"
              :key="item.label"
              :href="hrefOf(item)"
              @click="navigate($event, item)"
              :class="[
                'flex items-center px-4 py-3 rounded-xl transition-colors duration-fast',
                'focus:outline-none focus-visible:outline-2 focus-visible:outline-accent',
                isActive(item)
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

<style scoped>
/* Freelance is a separate page: give it a subtle pill so it reads as a destination */
.nav-freelance {
  border: 1px solid var(--accent-border);
  margin-left: 6px;
}
</style>
