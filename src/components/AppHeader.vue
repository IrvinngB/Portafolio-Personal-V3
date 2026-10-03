<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Globe, Menu, X, ArrowRight, Sun, Moon } from 'lucide-vue-next'
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

// Mobile panel lists every home section (desktop keeps the shorter list); Freelance is its own CTA
const mobileItems = computed<NavItem[]>(() => [
  { path: '/', hash: '#about-me', label: t.value.about },
  ...navItems.value.filter(item => item.hash),
])
const freelanceItem = computed(() => navItems.value.find(item => !item.hash) as NavItem)

// Lock page scroll behind the open panel, close on Escape or when the viewport grows to desktop
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') isMobileMenuOpen.value = false
}
const onResize = () => {
  if (window.innerWidth >= 1024) isMobileMenuOpen.value = false
}
watch(isMobileMenuOpen, open => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
  if (open) document.addEventListener('keydown', onKeydown)
  else document.removeEventListener('keydown', onKeydown)
})
watch(() => route.fullPath, () => { isMobileMenuOpen.value = false })

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
  window.addEventListener('resize', onResize, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', onResize)
  document.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
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
      isScrolled || isMobileMenuOpen
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
          <!-- Language + theme live in the mobile panel below lg -->
          <div class="hidden lg:flex items-center gap-2">
            <button
              @click="toggleLanguage"
              class="flex items-center gap-2 px-4 py-3 rounded-full transition-colors duration-fast bg-surface-container hover:bg-surface-high text-fg-soft hover:text-fg focus:outline-none focus-visible:outline-2 focus-visible:outline-accent"
              :aria-label="`Switch language, current: ${currentLanguage.toUpperCase()}`"
            >
              <Globe class="h-4 w-4" aria-hidden="true" />
              <span class="text-label-md">{{ currentLanguage.toUpperCase() }}</span>
            </button>

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
          </div>

          <!-- Mobile Menu Toggle -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden w-11 h-11 flex items-center justify-center rounded-full transition-colors duration-fast bg-surface-container hover:bg-surface-high text-fg focus:outline-none focus-visible:outline-2 focus-visible:outline-accent"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="mobile-menu"
            :aria-label="isMobileMenuOpen
              ? (currentLanguage === 'es' ? 'Cerrar menú' : 'Close menu')
              : (currentLanguage === 'es' ? 'Abrir menú' : 'Open menu')"
          >
            <Menu v-if="!isMobileMenuOpen" class="h-5 w-5" aria-hidden="true" />
            <X v-else class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu: full-height panel under the header bar -->
    <Transition name="panel">
      <div
        v-if="isMobileMenuOpen"
        id="mobile-menu"
        class="mobile-panel lg:hidden"
      >
        <nav class="container mx-auto px-4 flex flex-col h-full" :aria-label="currentLanguage === 'es' ? 'Navegación móvil' : 'Mobile navigation'">
          <ul class="pt-4">
            <li
              v-for="(item, i) in mobileItems"
              :key="item.label"
              class="mobile-item"
              :style="{ '--i': i }"
            >
              <a
                :href="hrefOf(item)"
                @click="navigate($event, item)"
                class="mobile-link"
                :class="{ 'is-active': isActive(item) }"
                :aria-current="isActive(item) ? 'location' : undefined"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>

          <a
            :href="hrefOf(freelanceItem)"
            @click="navigate($event, freelanceItem)"
            class="mobile-cta mobile-item"
            :style="{ '--i': mobileItems.length }"
            :aria-current="isActive(freelanceItem) ? 'page' : undefined"
          >
            {{ currentLanguage === 'es' ? 'Trabajemos juntos · Freelance' : "Let's work together · Freelance" }}
            <ArrowRight class="w-4 h-4" aria-hidden="true" />
          </a>

          <div class="mobile-controls mobile-item" :style="{ '--i': mobileItems.length + 1 }">
            <button type="button" class="control-btn" @click="toggleLanguage">
              <Globe class="h-4 w-4" aria-hidden="true" />
              {{ currentLanguage === 'es' ? 'English' : 'Español' }}
            </button>
            <button type="button" class="control-btn" @click="toggle">
              <Sun v-if="theme === 'dark'" class="h-4 w-4" aria-hidden="true" />
              <Moon v-else class="h-4 w-4" aria-hidden="true" />
              {{ theme === 'dark'
                ? (currentLanguage === 'es' ? 'Tema claro' : 'Light theme')
                : (currentLanguage === 'es' ? 'Tema oscuro' : 'Dark theme') }}
            </button>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* Freelance is a separate page: give it a subtle pill so it reads as a destination */
.nav-freelance {
  border: 1px solid var(--accent-border);
  margin-left: 6px;
}

/* ═══════ Mobile panel ═══════ */
.mobile-panel {
  position: fixed;
  inset: 68px 0 0 0;
  background: var(--bg);
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-bottom: max(24px, env(safe-area-inset-bottom));
}

.mobile-link {
  display: flex;
  align-items: center;
  min-height: 56px;
  border-bottom: 1px solid var(--border);
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(24px, 7vw, 30px);
  font-weight: 500;
  color: var(--fg-soft);
  transition: color var(--duration-fast);
}

.mobile-link:hover,
.mobile-link.is-active {
  color: var(--fg);
}

.mobile-link.is-active::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  margin-right: 12px;
}

.mobile-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 52px;
  margin-top: 28px;
  padding: 0 22px;
  border-radius: var(--radius-full);
  background: var(--accent);
  color: var(--accent-fg);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
}

.mobile-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: auto;
  padding-top: 28px;
}

.control-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
  background: var(--surface-container);
  color: var(--fg-soft);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
}

/* Items rise in one after another when the panel opens */
.panel-enter-active .mobile-item {
  animation: itemIn 0.45s var(--ease-out) both;
  animation-delay: calc(60ms + var(--i) * 40ms);
}

@keyframes itemIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}

.panel-enter-active,
.panel-leave-active {
  transition: opacity var(--duration-normal) var(--ease-out), transform var(--duration-normal) var(--ease-out);
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
