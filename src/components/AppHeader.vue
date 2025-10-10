<template>
  <header :class="[
    'fixed top-0 left-0 w-full z-50 transition-all duration-300',
    isScrolled 
      ? 'bg-[#0A3D3D]/95 backdrop-blur-lg shadow-xl border-b border-[#3FA35B]/30 py-2' 
      : 'bg-[#0A3D3D]/80 backdrop-blur-md py-4'
  ]">
    <nav class="container mx-auto px-4 lg:px-6">
      <div class="flex items-center justify-between">
        
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <button 
            @click="scrollToTop" 
            class="flex items-center gap-3 group hover:scale-105 transition-transform duration-200"
          >
            <div class="relative">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300" style="background: linear-gradient(135deg, #3FA35B 0%, #B4D333 100%);">
                <span class="text-white font-bold text-lg">IB</span>
              </div>
              <div class="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" style="background: linear-gradient(135deg, #3FA35B 0%, #B4D333 100%);"></div>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-xl font-bold text-white group-hover:text-[#B4D333] transition-colors duration-300">
                {{ cvData.name }}
              </h1>
              <p class="text-xs text-[#B4D333]/70 -mt-1">
                {{ cvData.title }}
              </p>
            </div>
          </button>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center">
          <nav class="flex items-center bg-[#1f2937]/90 rounded-2xl px-2 py-2 shadow-lg border border-[#3FA35B]/30 backdrop-blur-sm">
            <a
              v-for="(item, idx) in navItems"
              :key="item.href"
              :href="item.href"
              @click="scrollToSection"
              :class="[
                'nav-link px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden group',
                activeIndex === idx 
                  ? 'bg-[#3FA35B] text-white shadow-md' 
                  : 'text-[#B4D333] hover:bg-[#3FA35B]/20 hover:text-white'
              ]"
            >
              <span class="relative z-10 transition-all duration-300">{{ item.label }}</span>
              <div 
                v-if="activeIndex === idx" 
                class="absolute inset-0 bg-[#3FA35B] rounded-xl animate-pulse-glow"
              ></div>
              <div class="absolute inset-0 bg-gradient-to-r from-[#3FA35B] to-[#B4D333] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
            </a>
          </nav>
        </div>

        <!-- Controls (Language, Mobile Menu) -->
        <div class="flex items-center gap-2">
          
          <!-- Language Switcher -->
          <div class="relative">
            <button
              @click="toggleLanguage"
              class="flex items-center gap-2 px-3 py-2 bg-[#1f2937]/80 hover:bg-[#3FA35B]/20 rounded-xl transition-all duration-300 group border border-[#3FA35B]/30"
            >
              <Globe class="h-4 w-4 text-[#B4D333] group-hover:text-[#C5D946] transition-colors" />
              <span class="text-sm font-medium text-[#B4D333] group-hover:text-[#C5D946]">
                {{ currentLanguage.toUpperCase() }}
              </span>
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-2.5 bg-[#1f2937]/80 hover:bg-[#3FA35B]/20 rounded-xl transition-all duration-300 group border border-[#3FA35B]/30"
          >
            <Menu v-if="!isMobileMenuOpen" class="h-5 w-5 text-[#B4D333] group-hover:text-[#C5D946] transition-colors" />
            <X v-else class="h-5 w-5 text-[#B4D333] group-hover:text-red-400 transition-colors" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform -translate-y-2"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-2"
      >
        <div v-if="isMobileMenuOpen" class="lg:hidden mt-4 border-t border-[#3FA35B]/30 pt-4">
          <nav class="space-y-2">
            <a
              v-for="(item, idx) in navItems"
              :key="item.href"
              :href="item.href"
              @click="handleMobileNavClick"
              :class="[
                'mobile-nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300 group',
                activeIndex === idx
                  ? 'bg-[#3FA35B] text-white shadow-md'
                  : 'text-[#B4D333] hover:bg-[#3FA35B]/20 hover:text-white'
              ]"
            >
              <span class="font-medium">{{ item.label }}</span>
              <ChevronRight class="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
            </a>
          </nav>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Globe, Menu, X, ChevronRight } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { currentLanguage, toggleLanguage, t, cvData } = useLanguage()

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeIndex = ref(0)

const navItems = computed(() => [
  { href: '#experience', label: t.value.experience },
  { href: '#projects', label: t.value.projects },
  { href: '#skills', label: t.value.skills },
  { href: '#education', label: t.value.education },
  { href: '#contact', label: t.value.contact }
])

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}



const scrollToSection = (event: Event) => {
  event.preventDefault()
  const target = event.target as HTMLAnchorElement
  const href = target.getAttribute('href')
  if (href) {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
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

// Scrollspy & dynamic header
const sections = ['#experience', '#projects', '#skills', '#education', '#contact']
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

  // Update activeIndex based on scroll position
  for (let i = sections.length - 1; i >= 0; i--) {
    const selector = sections[i] as string
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

onMounted(() => {
  // Set dark mode permanently
  document.documentElement.classList.add('dark')

  // Add scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  // Close mobile menu when clicking outside
  const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement
    if (!target.closest('nav') && isMobileMenuOpen.value) {
      isMobileMenuOpen.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)

  // Cleanup function will be called in onUnmounted
  return () => {
    document.removeEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Header glass effect */
header {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Navigation links */
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

.nav-link.bg-blue-600 {
  box-shadow: 
    0 4px 14px 0 rgba(37, 99, 235, 0.25), 
    0 0 0 1px rgba(37, 99, 235, 0.1);
}

/* Mobile navigation */
.mobile-nav-link {
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover {
  transform: translateX(4px);
}

/* Smooth transitions */
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Focus states for accessibility */
button:focus,
a:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 8px;
}

/* Logo animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
}

.group:hover .logo-float {
  animation: float 2s ease-in-out infinite;
}

/* Gradient border effect */
.gradient-border {
  position: relative;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-radius: inherit;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask-composite: xor;
}

/* Theme button animations */
.theme-btn svg {
  transition: transform 0.3s ease;
}

.theme-btn:hover svg {
  transform: rotate(180deg) scale(1.1);
}

/* Language switcher */
.language-btn {
  transition: all 0.2s ease;
}

.language-btn:hover {
  transform: scale(1.05);
}

/* Custom glow animation */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(63, 163, 91, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(63, 163, 91, 0.8), 0 0 30px rgba(63, 163, 91, 0.6);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
</style>