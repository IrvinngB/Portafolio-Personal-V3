<template>
  <footer class="bg-gray-900 dark:bg-[#0A3D3D] text-white py-12 relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div class="absolute -top-20 -right-20 w-40 h-40 bg-[#3FA35B]/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-[#B4D333]/10 rounded-full blur-3xl animate-float-delayed"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="text-center md:text-left">
          <h3 class="text-2xl font-bold mb-2">{{ cvData?.name }}</h3>
          <p class="text-gray-400 text-sm">{{ cvData?.title }}</p>
        </div>

        <div class="flex items-center gap-4">
          <a
            :href="`mailto:${cvData?.email}`"
            class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#3FA35B] transition-all duration-300 transform hover:scale-110"
            aria-label="Email"
          >
            <Mail class="h-5 w-5" />
          </a>
          <a
            :href="cvData?.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#3FA35B] transition-all duration-300 transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin class="h-5 w-5" />
          </a>
          <a
            href="https://github.com/IrvinngB"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#3FA35B] transition-all duration-300 transform hover:scale-110"
            aria-label="GitHub"
          >
            <Github class="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/_irvin.gg/"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#3FA35B] transition-all duration-300 transform hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram class="h-5 w-5" />
          </a>
        </div>
      </div>

      <div class="border-t border-white/10 mt-8 pt-8 text-center">
        <p class="text-gray-400 text-sm flex items-center justify-center gap-2">
          <span> {{ currentYear }} {{ cvData?.name }}.</span>
          <span class="flex items-center gap-1">
            Made with <Heart class="h-4 w-4 text-red-500 inline" /> and <Coffee class="h-4 w-4 text-amber-500 inline" />
          </span>
        </p>
      </div>
    </div>

    <button
      @click="scrollToTop"
      class="fixed bottom-8 right-8 p-3 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 z-50 opacity-80 hover:opacity-100 scroll-top-btn"
      aria-label="Scroll to top"
    >
      <ChevronRight class="h-5 w-5 -rotate-90" />
    </button>
  </footer>
</template>

<script setup lang="ts">


import { 
  ChevronRight,
  Instagram,
  Mail,
  Linkedin,
  Github,
  Heart,
  Coffee
} from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { cvData } = useLanguage()

const currentYear = new Date().getFullYear()





const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  25% {
    transform: translateY(-10px) translateX(5px);
  }
  75% {
    transform: translateY(10px) translateX(-5px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 2s;
}

.scroll-top-btn {
  background-color: #3FA35B;
}

.scroll-top-btn:hover {
  background-color: #0A3D3D;
}
</style>