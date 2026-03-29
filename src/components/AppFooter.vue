<template>
  <footer class="relative overflow-hidden bg-white dark:bg-[#141c2c] border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 mt-10">
    <!-- Background dots -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div class="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-primary-light/10 rounded-full blur-3xl"></div>
      <div class="absolute top-8 left-24 w-1.5 h-1.5 rounded-full animate-pulse bg-primary"></div>
      <div class="absolute bottom-12 right-20 w-1 h-1 rounded-full animate-pulse bg-primary-light" style="animation-delay: 1.4s;"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <!-- Top Row: Brand + Social -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-8">
        <!-- Brand identity -->
        <div class="text-center md:text-left">
          <div class="flex items-center gap-3 justify-center md:justify-start mb-2">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-lg">IB</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ cvData?.name }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 -mt-0.5 font-medium">{{ cvData?.title }}</p>
            </div>
          </div>
        </div>

        <!-- Social links — premium circles -->
        <div class="flex items-center gap-3">
          <a
            :href="`mailto:${cvData?.email}`"
            class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-primary hover:to-primary-dark text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-gray-200 dark:border-white/10 hover:border-transparent hover:shadow-lg"
            aria-label="Email"
          >
            <Mail class="h-5 w-5" />
          </a>
          <a
            :href="cvData?.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-primary hover:to-primary-dark text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-gray-200 dark:border-white/10 hover:border-transparent hover:shadow-lg"
            aria-label="LinkedIn"
          >
            <Linkedin class="h-5 w-5" />
          </a>
          <a
            :href="cvData?.github"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-primary hover:to-primary-dark text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-gray-200 dark:border-white/10 hover:border-transparent hover:shadow-lg"
            aria-label="GitHub"
          >
            <Github class="h-5 w-5" />
          </a>
          <a
            :href="cvData?.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-primary hover:to-primary-dark text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-gray-200 dark:border-white/10 hover:border-transparent hover:shadow-lg"
            aria-label="Instagram"
          >
            <Instagram class="h-5 w-5" />
          </a>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 dark:border-white/10 mt-10 pt-6">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            &copy; {{ currentYear }} {{ cvData?.name }}.
            {{ currentLanguage === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.' }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm flex items-center gap-1.5">
            {{ currentLanguage === 'es' ? 'Diseñado y construido con' : 'Designed & built with' }}
            <Heart class="h-3.5 w-3.5 text-primary" />
            {{ currentLanguage === 'es' ? 'por' : 'by' }}
            <span class="font-semibold text-gray-700 dark:text-gray-200">{{ cvData?.name?.split(' ')[0] }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Scroll to top button -->
    <div class="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
      <button
        @click="scrollToTop"
        class="p-3 premium-card bg-gray-50 dark:bg-[#1f2937] border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light rounded-2xl shadow-lg flex items-center justify-center group focus:outline-none"
        aria-label="Scroll to top"
      >
        <ChevronUp class="h-6 w-6 transform group-hover:-translate-y-1 transition-transform duration-300" strokeWidth="2.5" />
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  ChevronUp,
  Instagram,
  Mail,
  Linkedin,
  Github,
  Heart
} from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { cvData, currentLanguage } = useLanguage()

const currentYear = new Date().getFullYear()

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>