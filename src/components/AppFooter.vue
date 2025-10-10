<template>
  <footer class="relative text-white overflow-hidden" style="background: linear-gradient(135deg, #0A3D3D 0%, #1f2937 50%, #0A3D3D 100%);">
    <!-- Background Elements -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
    </div>
    
    <!-- Floating geometric shapes -->
    <div class="absolute top-10 left-10 w-20 h-20 rounded-full animate-float" style="background-color: rgba(63, 163, 91, 0.1);"></div>
    <div class="absolute top-32 right-20 w-12 h-12 rounded-full animate-float-delayed" style="background-color: rgba(180, 211, 51, 0.1);"></div>
    <div class="absolute bottom-20 left-32 w-16 h-16 rounded-full animate-float" style="background-color: rgba(197, 217, 70, 0.1);"></div>

    <div class="container mx-auto px-6 py-16 relative z-10">
      <!-- Main Content -->
      <div class="text-center mb-12">
        <p class="text-gray-300 max-w-2xl mx-auto mb-8">
          Desarrollador Full Stack apasionado por crear experiencias digitales excepcionales.
        </p>
        
        <!-- Social Links -->
        <div class="flex justify-center items-center gap-6 mb-8">
          <a
            :href="cvData.email"
            class="group p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          >
            <Mail class="h-5 w-5 transition-colors" style="color: #B4D333;" />
          </a>
          <a
            :href="cvData.linkedin"
            target="_blank"
            class="group p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          >
            <Linkedin class="h-5 w-5 transition-colors" style="color: #B4D333;" />
          </a>
          <a
            href="https://github.com/IrvinngB"
            target="_blank"
            class="group p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          >
            <Github class="h-5 w-5 transition-colors" style="color: #B4D333;" />
          </a>
          <a
            href="https://www.instagram.com/_irvin.gg/?igsh=dm9waHk2bmdzYmYy"
            target="_blank"
            class="group p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          >
            <Instagram class="h-5 w-5 transition-colors" style="color: #C5D946;" />
          </a>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-white/10 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- Copyright -->
          <div class="text-gray-400 text-sm text-center md:text-left">
            © {{ currentYear }}. Todos los derechos reservados.
          </div>
          
          <!-- Made with love -->
          <div class="text-gray-400 text-sm flex items-center gap-2">
            Hecho con
            <Heart class="h-4 w-4 text-red-400 animate-pulse" />
            y ☕
          </div>
          
          <!-- Tech Stack -->
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <span class="px-2 py-1 bg-white/5 rounded">Vue.js</span>
            <span class="px-2 py-1 bg-white/5 rounded">Tailwind</span>
            <span class="px-2 py-1 bg-white/5 rounded">GSAP</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll to Top Button -->
    <button
      @click="scrollToTop"
      class="fixed bottom-8 right-8 p-3 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 z-50 opacity-80 hover:opacity-100 scroll-top-btn"
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
  Heart
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