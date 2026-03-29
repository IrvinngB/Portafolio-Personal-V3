<template>
  <section 
    class="min-h-screen flex items-center justify-center bg-transparent relative overflow-hidden pt-20"
    aria-label="Hero section - Introduction"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="parallax absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl" style="background-color: rgba(63, 163, 91, 0.1);"></div>
      <div class="parallax absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl" style="background-color: rgba(180, 211, 51, 0.1);"></div>
      <div class="absolute top-20 left-20 w-2 h-2 rounded-full animate-pulse" style="background-color: #3FA35B;"></div>
      <div class="absolute top-40 right-32 w-1 h-1 rounded-full animate-pulse" style="background-color: #B4D333; animation-delay: 1s;"></div>
      <div class="absolute bottom-32 left-32 w-1.5 h-1.5 rounded-full animate-pulse" style="background-color: #C5D946; animation-delay: 2s;"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <!-- Content -->
        <div class="hero-content text-center lg:text-left">
          <div class="mb-8">
            <!-- Saludo inicial -->
            <div class="flex items-center gap-2 justify-center lg:justify-start mb-3">
              <div 
                class="w-10 h-10 rounded-full bg-gradient-to-br from-[#3FA35B] to-[#B4D333] flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
                role="img"
                aria-label="Sparkles icon"
              >
                <Sparkles class="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <p class="text-lg font-semibold text-[#3FA35B] dark:text-[#B4D333] animate-fade-in">
                {{ currentLanguage === 'es' ? 'Hola, soy' : 'Hi, I\'m' }}
              </p>
            </div>
            
            <!-- Nombre más grande -->
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
              {{ cvData.name }}
            </h1>
            
            <!-- Propuesta de valor impactante -->
            <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#3FA35B] dark:text-[#B4D333] mb-6 leading-tight">
              {{ currentLanguage === 'es' 
                ? 'Construyo experiencias web que ' 
                : 'I build web experiences that ' }}
              <span class="relative inline-block">
                <span class="relative z-10">{{ currentLanguage === 'es' ? 'importan' : 'matter' }}</span>
                <span class="absolute bottom-1 left-0 w-full h-3 bg-[#B4D333] opacity-30 -z-0"></span>
              </span>
            </h2>
            
            <!-- Descripción mejorada -->
            <p class="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
              {{ cvData.title }}. 
              {{ currentLanguage === 'es' 
                ? 'Especializado en Vue.js, Node.js y arquitecturas escalables. Transformo ideas en productos digitales de alto rendimiento.' 
                : 'Specialized in Vue.js, Node.js and scalable architectures. I transform ideas into high-performance digital products.' }}
            </p>
            
            <!-- Métricas impactantes -->
            <div class="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start mb-8">
              <div v-for="metric in cvData.metrics" :key="metric.value" class="text-center">
                <div class="text-3xl sm:text-4xl md:text-5xl font-black text-[#3FA35B] dark:text-[#B4D333] mb-1">{{ metric.value }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">{{ currentLanguage === 'es' ? metric.labelEs : metric.labelEn }}</div>
              </div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <button
              @click="scrollToContact"
              class="px-6 sm:px-8 py-3 sm:py-4 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg cta-primary text-sm sm:text-base"
              aria-label="{{ currentLanguage === 'es' ? 'Ir a sección de contacto' : 'Go to contact section' }}"
            >
              {{ t.getInTouch }}
            </button>
            <a
              :href="cvPdfUrl"
              download
              class="px-6 sm:px-8 py-3 sm:py-4 border-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 cta-secondary text-sm sm:text-base"
              :aria-label="`${t.downloadCV} - PDF file`"
            >
              <Download class="h-5 w-5" aria-hidden="true" />
              {{ t.downloadCV }}
            </a>
          </div>

          <!-- Contact Info -->
          <div class="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 justify-center lg:justify-start text-sm sm:text-base">
            <a
              :href="`mailto:${cvData.email}`"
              class="flex items-center gap-2 text-gray-600 dark:text-gray-300 transition-colors contact-link"
              :aria-label="`Send email to ${cvData.email}`"
            >
              <Mail class="h-5 w-5" aria-hidden="true" />
              <span>{{ cvData.email }}</span>
            </a>
            <a
              :href="`tel:${cvData.phone}`"
              class="flex items-center gap-2 text-gray-600 dark:text-gray-300 transition-colors contact-link"
              :aria-label="`Call phone number ${cvData.phone}`"
            >
              <Phone class="h-5 w-5" aria-hidden="true" />
              <span>{{ cvData.phone }}</span>
            </a>
            <div 
              class="flex items-center gap-2 text-gray-600 dark:text-gray-300"
              role="text"
              :aria-label="`Location: ${cvData.location}`"
            >
              <MapPin class="h-5 w-5" aria-hidden="true" />
              <span>{{ cvData.location }}</span>
            </div>
          </div>
        </div>

        <!-- Profile Image -->
        <div class="hero-image flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div class="relative">
            <div class="w-56 sm:w-64 md:w-72 lg:w-80 h-56 sm:h-64 md:h-72 lg:h-80 rounded-full p-1" style="background: linear-gradient(135deg, #3FA35B 0%, #B4D333 100%);">
              <!-- inner container becomes transparent and full-size so SVG can fill the whole radius -->
              <div class="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                <!-- ring wrapper: creates a thin border/background between outer gradient and the avatar (WhatsApp-style) -->
                <div class="w-full h-full rounded-full flex items-center justify-center overflow-hidden p-2 bg-white/10 dark:bg-gray-900/50 border-2 border-white/20 dark:border-white/10 shadow-inner">
                  <div
                    ref="svgRoot"
                    class="w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-transparent"
                    style="clip-path: circle(50% at 50% 50%); -webkit-clip-path: circle(50% at 50% 50%);"
                  >

                  <!-- Inline SVG for foto (inlined to ensure visibility and enable animations) -->
                                    
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 10 211.73 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" stroke-linecap="round" stroke-linejoin="round" class="h-full w-full block">
                    <defs>
                      <clipPath id="background-clip-inline">
                        <path d="M39 153.73s31.57 19.71 77.26 15.21 90.18-37.23 90.36-72.33-8.82-80.28-33.59-86.29C136.84-6.57 114.13-5.82 88-2.82S34.73 11.45 16.71 48.24C-1.5 66.64-4.88 125.2 39 153.73z" fill="none"/>
                      </clipPath>
                    </defs>
                    <path class="bg" d="M39 153.73s31.57 19.71 77.26 15.21 90.18-37.23 90.36-72.33-10.51-57-35.28-63-50.22 17-76.31 20-60.12-15.88-78.32 2.51S-4.88 125.2 39 153.73z" fill="none"/>
                    <g clip-path="url(#background-clip-inline)">
                      <g class="me">
                        <g class="body">
                          <path class="neck" d="M114.26 143.16v-14a9.22 9.22 0 10-18.43 0v14c-15.27 2.84-24.74 15.08-24.74 27.33H139c0-12.24-9.5-24.49-24.74-27.33z" fill="#7c5c38"/>
                          <path class="top" d="M105.61 167c-30.17 0-25.36-40-25.36 15.84h25.35l25-2.14c-.05-55.79 5.17-13.7-24.99-13.7z" stroke="#000000" stroke-width=".5" style="fill: rgb(30, 30, 29);"/>
                          <path class="shoulder" d="M95.82 142.87c-16 1.84-29.37 19.5-29.37 40h29.37z" style="fill: rgb(30, 30, 29);"/>
                          <path class="shoulder" d="M114.23 142.67c15.76 1.85 29 19.6 29 40.2h-29z" style="fill: rgb(30, 30, 29);"/>
                        </g>
                        <path class="shadow" d="M95.82 122.36h18.41v14.31s-10.5 5.54-18.41 0z" fill="#5c4c38"/>

                        <g class="head">
                          <g class="ear-left ear">
                            <path d="M63.52 105.14A8.21 8.21 0 0072 113.2a8.36 8.36 0 008.51-8.1A8.21 8.21 0 0072 97a8.36 8.36 0 00-8.48 8.14z" fill="#7c5c38"/>
                            <path d="M68.54 104.48a17 17 0 014.14.41c1.07.31 1.94 1 3 1.31a.39.39 0 00.43-.57c-1.15-2.38-5.49-1.86-7.58-1.67a.26.26 0 000 .52z" fill="#5c4c38"/>
                          </g>
                          <g class="ear-right ear">
                            <path d="M144.37 105.24a8.2 8.2 0 01-8.37 8.06 8.35 8.35 0 01-8.51-8.1 8.21 8.21 0 018.42-8.06 8.35 8.35 0 018.46 8.1z" fill="#7c5c38"/>
                            <path d="M139.6 104c-2.1-.19-6.43-.72-7.59 1.67a.39.39 0 00.44.57c1.07-.26 1.92-1 3-1.31a17.51 17.51 0 014.15-.41.26.26 0 000-.52z" fill="#5c4c38"/>
                          </g>
                          <g class="face">
                            <rect x="73.99" y="48.26" width="61.54" height="80.49" rx="26.08" transform="rotate(180 104.76 88.5)" fill="#7c5c38"/>
                            <g class="inner-face">
                              <path class="eyebrow-right" d="M120.73 79a9 9 0 00-4-1.22 9.8 9.8 0 00-4.19.87" fill="none" stroke="#1E1E1D" stroke-width="1.04"/>
                              <path class="eyebrow-left" d="M97.12 79.41a9.53 9.53 0 00-4-1.11 10.58 10.58 0 00-4.2.76" fill="none" stroke="#1E1E1D" stroke-width="1.04"/>
                              <path class="mouth" d="M97 107.52s7.06 4.62 14 1.59" fill="none" stroke="#1E1E1D" stroke-width="1.04"/>
                              <path class="oh" opacity="0" d="M105.56,117.06c4-.14,5-2.89,4.7-5.64s-1.88-6.7-4.84-6.62-4.73,4.36-4.9,6.72S101.57,117.19,105.56,117.06Z" fill="#262528"/>
                              <g class="eyes">
                                <path class="eye-left eye" d="M89.48 87.37c-.07 2.08 1.25 3.8 2.94 3.85s3.1-1.59 3.16-3.67-1.25-3.8-2.94-3.85-3.1 1.59-3.16 3.67z" fill="#2b343b"/>
                                <path class="eye-right eye" d="M113.67 87.37c-.07 2.08 1.25 3.8 2.94 3.85s3.1-1.59 3.16-3.67-1.25-3.8-2.94-3.85-3.1 1.59-3.16 3.67z" fill="#2b343b"/>
                                <path class="eye-right-2 eye" d="M114.11 88a5.72 5.72 0 002.48.72 6.46 6.46 0 002.59-.45" opacity="0" fill="none" stroke="#282828" stroke-width="1.04"/>
                                <path class="eye-left-2 eye" d="M89.85 88a5.77 5.77 0 002.56.3 6.48 6.48 0 002.49-.87" fill="none" opacity="0" stroke="#282828" stroke-width="1.04"/>
                              </g>
                              <path class="dizzy dizzy-1" opacity="0" d="M113.61,87.6c.54-2.66,2.66-3.84,4.63-3.37A3.3,3.3,0,0,1,117,90.71a2.53,2.53,0,0,1-2-3,2.48,2.48,0,0,1,2.73-1.92A1.71,1.71,0,0,1,119.32,88a1.59,1.59,0,0,1-1.75,1.34c-.79-.1-1.41-.59-1-1.42s1-.72,1.22-.24" fill="none" stroke="#000" stroke-width="0.75"/>
                              <path class="dizzy dizzy-2" opacity="0" d="M96.15,87.27c-.54-2.66-2.66-3.84-4.63-3.37s-2.89,1.9-2.46,4a3.11,3.11,0,0,0,3.68,2.45,2.53,2.53,0,0,0,2-3A2.49,2.49,0,0,0,92,85.49a1.71,1.71,0,0,0-1.57,2.13A1.57,1.57,0,0,0,92.19,89c.79-.11,1.41-.6,1-1.43s-1-.72-1.22-.23" fill="none" stroke="#000" stroke-width="0.75"/>
                              <path class="nose" d="M102.39 98.13s3.09 1.55 5.78 0" fill="none" stroke="#1E1E1D"/>
                              <path class="glasses" d="M133.54 81.76c-4.7-1.42-15.29-2.42-19.83-.45-5.82 2.17-3.18 1.57-8.55 1.17-5.36.4-2.74 1-8.55-1.18-7.3-2.55-15.58-.24-22.25.72v2.75c2.46.24 1.26 6.78 3.06 10.32 2.13 7.23 12.69 9.55 18.19 5.49 3.9-2 7.08-10.32 7.21-12.86 0-1.64 4.15-2.57 4.61.24.11 2.53 3.42 10.69 7.28 12.62 5.5 4 16 1.74 18.17-5.49 1.8-3.54 1.69-9.92 2.88-10.32s.74-2.67 0-2.75-1.02-.1-2.22-.26zM97.25 97.49C90.94 104.81 79 101.2 78 92.3c-.7-2.62-1-7.3 1.27-9.12s6.88-1.87 9.23-2c11.14-.26 16.62 5.6 8.75 16.31zm35.12-5.19c-3.71 17.2-27.26 7.42-22.09-7.36 1.87-3.11 9.09-3.84 11.55-3.73 8.07-.04 12.7 1.79 10.54 11.09z" fill="#1a1a1a" opacity=".9"/>
                              <path class="blush-left eye" d="M89.9 98.17a2.66 2.66 0 01-1.55-.93 3.73 3.73 0 01-.76-3.12 3 3 0 011-1.56 2 2 0 011.4-.42 3 3 0 012.5 2.72.76.76 0 010 .21 3.19 3.19 0 01.11.91 2.1 2.1 0 01-1.77 2.21 2.07 2.07 0 01-.93-.02zM89.34 96v-.05s-.04.05 0 .05z" fill="#5c4c38" fill-rule="evenodd"/>
                              <path class="blush-right eye" d="M118.93 98.19a2.09 2.09 0 01-1.77-2.19 3.58 3.58 0 01.1-.91v-.21a3 3 0 012.51-2.72 2 2 0 011.4.42 3 3 0 011 1.56 3.73 3.73 0 01-.76 3.12 2.66 2.66 0 01-1.55.93 2.08 2.08 0 01-.93 0zm1.53-2.2v.05c0 .05.05-.04 0-.04z" fill="#5c4c38" fill-rule="evenodd"/>
                            </g>
                          </g>
                        </g>

                        <!-- Hair paths - in front of the face -->
                        <g class="hair-group">
                          <!-- cabello completo, cuenta para izquiera y drecha -->
                          <path class="hair-left" fill="#1E1E1D" opacity="1.000000" stroke="none" d="M 70.747 90.261 C 69.177 87.235 68.449 83.939 68.049 80.603 C 67.234 73.808 67.567 67.078 69.79 60.538 C 71.176 56.462 73.204 52.747 76.162 49.631 C 77.285 48.446 78.663 47.51 80.009 46.445 C 81.816 44.949 83.565 43.449 85.794 42.876 C 88.322 42.228 90.654 41.028 92.589 39.466 C 94.822 37.663 97.175 37.492 99.733 37.449 C 102.254 37.405 104.776 37.153 107.291 37.242 C 109.45 37.319 111.603 37.721 113.747 38.052 C 114.102 38.107 114.406 38.525 114.721 38.791 C 115.096 39.107 115.459 39.439 115.986 39.832 C 117.123 40.196 118.101 40.492 119.08 40.788 C 122.755 41.854 126.18 43.475 129.082 46 C 135.756 51.81 139.105 59.42 140.325 68.095 C 141.311 75.112 140.893 82.031 138.678 88.795 C 138.599 89.035 138.578 89.294 138.456 89.688 C 137.381 91.248 136.379 92.663 135.378 94.079 C 135.05 93.577 135.041 93.245 135.001 92.918 C 134.582 89.579 134.429 86.176 133.67 82.918 C 132.535 78.047 130.183 73.776 126.139 70.665 C 125.777 70.387 125.326 70.225 124.566 69.823 C 124.895 70.906 125.086 71.589 125.31 72.261 C 125.577 73.064 125.243 73.474 124.482 73.354 C 123.62 73.217 122.689 73.076 121.957 72.643 C 119.383 71.116 116.884 69.457 114.349 67.862 C 113.807 67.522 113.229 67.241 112.668 66.932 C 112.592 67.031 112.518 67.132 112.443 67.231 C 112.73 67.622 112.999 68.031 113.31 68.4 C 114.16 69.406 115.067 70.362 115.878 71.397 C 116.69 72.431 116.424 73.143 115.127 73.116 C 113.549 73.085 111.831 73.089 110.431 72.474 C 107.162 71.037 104.03 69.271 100.878 67.573 C 99.637 66.905 98.487 66.065 97.107 65.182 C 97.107 65.681 97.051 65.904 97.115 66.082 C 98.172 69.023 100.618 70.868 102.56 73.158 C 96.628 72.16 92.103 68.716 88.023 64.556 C 87.813 64.718 87.679 64.772 87.625 64.871 C 87.463 65.168 87.32 65.477 87.19 65.791 C 85.684 69.472 83.686 72.782 80.475 75.226 C 77.634 77.392 75.941 80.323 75.028 83.772 C 74.12 87.195 73.981 90.678 74.125 94.19 C 74.137 94.492 74.127 94.795 74.127 95.097 C 73.982 95.151 73.836 95.205 73.691 95.259 C 72.71 93.593 71.729 91.928 70.747 90.261 Z" style="stroke-width: 1px;"/>
                          
                         
                        </g>
                      </g>
                    </g>
                  </svg>

                </div>
                </div>
              </div>
            </div>
            <!-- Floating elements -->
            <div class="absolute -top-4 -right-4 w-8 h-8 rounded-full animate-bounce" style="background-color: #3FA35B;"></div>
            <div class="absolute -bottom-4 -left-4 w-6 h-6 rounded-full animate-bounce" style="background-color: #C5D946; animation-delay: 0.5s;"></div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div 
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        role="img"
        aria-label="Scroll down indicator"
      >
        <ChevronDown class="h-8 w-8 text-gray-400" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Download, Mail, Phone, MapPin, ChevronDown, Sparkles } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { initHeroAnimation } from '../composables/useHeroAnimation'

const { currentLanguage, t, cvData } = useLanguage()

const svgRoot = ref<HTMLElement | null>(null)

const cvPdfUrl = computed(() => {
  // Use Vite's asset URL resolution so the PDFs are bundled and the href
  // points to the correct location in production.
  const relativePath = currentLanguage.value === 'es'
    ? '/files/CV_ES.pdf'
    : '/files/CV_INGLES.pdf'
  return relativePath
})

const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }
}

let stopAnimation: (() => void) | undefined

onMounted(() => {
  stopAnimation = initHeroAnimation(svgRoot.value ?? undefined)
})

onUnmounted(() => {
    if (typeof stopAnimation === 'function') stopAnimation()
})
</script>

<style scoped>
/* New Color Palette Styles */
.cta-primary {
  background-color: var(--color-primary);
}

.cta-primary:hover {
  background-color: var(--color-primary-dark);
}

.cta-secondary {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.cta-secondary:hover {
  background-color: var(--color-primary);
  color: white;
}

.contact-link:hover {
  color: var(--color-primary);
}

.dark .contact-link:hover {
  color: var(--color-primary-light);
}

/* Ensure avatar is always visible and responsive */
.hero-image svg {
  visibility: visible !important;
  opacity: 1 !important;
  display: block !important;
}

.me {
  visibility: visible !important;
  opacity: 1 !important;
  display: block !important;
}

.hair-group {
  transform-origin: center center;
  will-change: transform;
}

.hair-left,
.hair-right {
  transform-origin: center center;
  will-change: transform;
}

/* Smooth animations for hair */
.hair-group,
.hair-left,
.hair-right {
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Ensure proper layering */
.hair-group {
  z-index: 2;
}

.face {
  z-index: 3;
}
</style>
