<template>
  <footer class="border-t-2 border-border pt-6 pb-8 bg-bg">
    <div class="container mx-auto px-4 sm:px-6">
      <!-- Single horizontal line -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
        <!-- Availability dot — clickable, scrolls to contact -->
        <button
          @click="scrollToContact"
          class="flex items-center gap-2 group cursor-pointer"
          :aria-label="currentLanguage === 'es' ? 'Disponible para freelance — ir a contacto' : 'Available for freelance — go to contact'"
        >
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-teal"></span>
          </span>
          <span class="text-label text-fg-soft group-hover:text-fg transition-colors">
            {{ currentLanguage === 'es' ? 'Disponible para freelance' : 'Available for freelance' }}
          </span>
        </button>

        <!-- Email -->
        <a
          :href="`mailto:${cvData?.email}`"
          class="text-label text-fg-soft hover:text-accent-yellow transition-colors"
        >
          Irvin.benitezs.26@gmail.com
        </a>

        <!-- Location -->
        <span class="text-label text-accent-teal">
          Panamá Oeste, PA
        </span>
      </div>

      <!-- SEO: Hidden semantic content -->
      <div class="sr-only" aria-hidden="true" role="contentinfo" itemscope itemtype="https://schema.org/Person">
        <span itemprop="name">Irvin Benitez</span>
        <span itemprop="jobTitle">Full Stack Developer</span>
        <span itemprop="description">Desarrollador de Software Full Stack en Panamá. Especializado en Vue.js, Django, React, Laravel, TypeScript, Python, PHP, React Native e Inteligencia Artificial. Disponible para proyectos freelance y trabajo remoto.</span>
        <span itemprop="url">https://irvincodes.dev</span>
        <span itemprop="email">Irvin.benitezs.26@gmail.com</span>
        <span itemprop="telephone">+507 6361-5832</span>
        <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
          <span itemprop="addressLocality">Panamá Oeste</span>,
          <span itemprop="addressCountry">Panamá</span>
        </span>
        <span>Irvin Benitez Software Developer Panama. irvincodes. Desarrollador web. Programador. Best developer Panama. Hire Irvin Benitez.</span>
      </div>
    </div>

    <!-- Scroll to top button -->
    <div class="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
      <button
        @click="scrollToTop"
        class="brutal-card p-3 text-fg-soft hover:text-fg transition-colors"
        style="border-radius: 12px;"
        aria-label="Scroll to top"
      >
        <ChevronUp class="h-6 w-6" strokeWidth="2.5" />
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ChevronUp } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { cvData, currentLanguage } = useLanguage()

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const scrollToContact = () => {
  const el = document.querySelector('#contact')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
