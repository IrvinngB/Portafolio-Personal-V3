<template>
  <footer class="border-t border-border mt-8">
    <div class="container mx-auto px-4 sm:px-6 max-w-6xl py-12 sm:py-16">
      <div class="grid gap-10 md:grid-cols-12">
        <!-- Brand -->
        <div class="md:col-span-5">
          <div class="flex items-center gap-3">
            <BrandMark class="h-9 w-auto" aria-hidden="true" />
            <p class="footer-name">{{ cvData?.name }}</p>
          </div>
          <p class="text-body-md text-fg-soft mt-2">{{ cvData?.title }} · {{ cvData?.location }}</p>
          <a
            :href="`mailto:${cvData?.email}`"
            class="inline-flex items-center min-h-[44px] mt-2 text-mono text-fg-soft hover:text-accent transition-colors duration-fast"
          >
            {{ cvData?.email }}
          </a>
        </div>

        <!-- Navigation -->
        <nav class="md:col-span-4" :aria-label="currentLanguage === 'es' ? 'Pie de página' : 'Footer'">
          <p class="text-label-md text-muted mb-3">{{ currentLanguage === 'es' ? 'Navegación' : 'Navigation' }}</p>
          <ul class="grid grid-cols-2 gap-x-6">
            <li v-for="item in navItems" :key="item.label">
              <RouterLink :to="item.to" class="footer-link">{{ item.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Socials -->
        <div class="md:col-span-3">
          <p class="text-label-md text-muted mb-3">{{ currentLanguage === 'es' ? 'Redes' : 'Elsewhere' }}</p>
          <ul class="flex gap-2">
            <li v-for="link in socials" :key="link.label">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn"
                :aria-label="link.label"
              >
                <component :is="link.icon" class="w-5 h-5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-12 pt-6 border-t border-border">
        <p class="text-caption text-muted">© {{ year }} {{ cvData?.name }}</p>
        <p class="text-caption text-muted">
          {{ currentLanguage === 'es' ? 'Hecho con Vue, Tailwind y mucho café' : 'Built with Vue, Tailwind and lots of coffee' }}
        </p>
      </div>
    </div>

    <!-- Scroll to top: appears once the hero is out of view -->
    <Transition
      enter-active-class="transition duration-normal ease-out"
      enter-from-class="opacity-0 translate-y-3"
      leave-active-class="transition duration-fast"
      leave-to-class="opacity-0 translate-y-3"
    >
      <button
        v-show="showTop"
        type="button"
        class="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 w-12 h-12 rounded-2xl bg-surface-container border border-border text-fg-soft hover:text-accent hover:border-accent-border shadow-card flex items-center justify-center transition-colors duration-fast"
        :aria-label="currentLanguage === 'es' ? 'Volver arriba' : 'Back to top'"
        @click="scrollToTop"
      >
        <ArrowUp class="h-5 w-5" aria-hidden="true" />
      </button>
    </Transition>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ArrowUp, Github, Linkedin, Instagram } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import BrandMark from './BrandMark.vue'

const { t, cvData, currentLanguage } = useLanguage()

const year = new Date().getFullYear()

const navItems = computed(() => [
  { to: { path: '/', hash: '#about-me' }, label: t.value.about },
  { to: { path: '/', hash: '#projects' }, label: t.value.projects },
  { to: { path: '/', hash: '#experience' }, label: t.value.experience },
  { to: { path: '/', hash: '#skills' }, label: t.value.skills },
  { to: { path: '/', hash: '#contact' }, label: t.value.contact },
  { to: { path: '/freelance' }, label: t.value.freelance },
])

const socials = computed(() => [
  { label: 'GitHub', href: cvData.value?.github, icon: Github },
  { label: 'LinkedIn', href: cvData.value?.linkedin, icon: Linkedin },
  { label: 'Instagram', href: cvData.value?.instagram, icon: Instagram },
].filter(link => !!link.href))

const showTop = ref(false)
const onScroll = () => {
  showTop.value = window.scrollY > window.innerHeight
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer-name {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  line-height: 1.1;
  color: var(--fg);
}

.footer-link {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  color: var(--fg-soft);
  transition: color var(--duration-fast);
}

.footer-link:hover {
  color: var(--accent);
}

.social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  color: var(--fg-soft);
  transition: color var(--duration-fast), border-color var(--duration-fast), transform var(--duration-fast);
}

.social-btn:hover {
  color: var(--accent);
  border-color: var(--accent-border);
  transform: translateY(-2px);
}
</style>
