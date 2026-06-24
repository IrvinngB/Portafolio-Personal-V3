<template>
  <section
    class="min-h-screen flex items-center bg-transparent relative overflow-hidden pt-20 pb-12"
    aria-label="Hero section"
    itemscope itemtype="https://schema.org/Person"
  >
    <!-- ═══ Stickers flotantes — firma del estilo ═══ -->
    <!-- Pink triangle top-right -->
    <div class="sticker sticker-float top-16 right-8 sm:right-20" style="animation-delay: 0s;">
      <div class="w-16 h-16 sticker-shape" style="background: var(--accent-pink); clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"></div>
    </div>
    <!-- Teal circle top-left -->
    <div class="sticker sticker-float top-32 left-4 sm:left-12" style="animation-delay: 0.8s;">
      <div class="w-12 h-12 rounded-full sticker-shape" style="background: var(--accent-teal);"></div>
    </div>
    <!-- Yellow squircle mid-right -->
    <div class="sticker sticker-float top-[45%] right-2 sm:right-8 hidden lg:block" style="animation-delay: 1.6s;">
      <div class="w-20 h-20 sticker-shape" style="background: var(--accent-yellow); border-radius: 35%;"></div>
    </div>
    <!-- Purple blob bottom-left -->
    <div class="sticker sticker-float bottom-24 left-8 sm:left-20" style="animation-delay: 2.4s;">
      <div class="w-14 h-14 rounded-full sticker-shape" style="background: var(--accent-purple);"></div>
    </div>

    <!-- ═══ Name pill — top right corner ═══ -->
    <div class="absolute top-6 right-6 sm:top-10 sm:right-10 z-30">
      <span class="brutal-pill" style="background: var(--accent-blue); color: var(--surface);">
        IRVIN BENITEZ
      </span>
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <div class="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-16 items-center">
        
        <!-- ═══ Left: Text ═══ -->
        <div class="text-center lg:text-left pt-8 lg:pt-16">
          <!-- Eyebrow -->
          <p class="text-label mb-4" style="color: var(--accent-pink);">
            {{ currentLanguage === 'es' ? '· Full Stack Developer ·' : '· Full Stack Developer ·' }}
          </p>

          <!-- Hero headline — 2-3 lines, uppercase, ultra bold -->
          <h1 class="text-hero" itemprop="name" style="max-width: 600px; margin: 0 auto 0 0;">
            {{ currentLanguage === 'es' 
              ? 'Construyo productos digitales que importan'
              : 'I build digital products that matter' }}
          </h1>

          <!-- Description -->
          <p class="text-body-lg mt-6 max-w-lg mx-auto lg:mx-0" itemprop="description" style="color: var(--fg-soft);">
            {{ currentLanguage === 'es'
              ? 'Vue.js, Node.js, TypeScript. Diseño y desarrollo de aplicaciones web escalables con identidad visual propia.'
              : 'Vue.js, Node.js, TypeScript. Design and development of scalable web applications with a strong visual identity.' }}
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
            <button
              @click="scrollToContact"
              class="btn-primary px-8 py-3.5 text-btn"
            >
              {{ t.getInTouch }}
            </button>
            <a
              :href="cvPdfUrl"
              download
              class="btn-ghost px-8 py-3.5 text-btn flex items-center justify-center gap-2"
            >
              <Download class="h-5 w-5" aria-hidden="true" />
              {{ t.downloadCV }}
            </a>
          </div>

          <!-- Contact row -->
          <div class="flex flex-wrap gap-4 sm:gap-6 mt-6 justify-center lg:justify-start">
            <a :href="`mailto:${cvData.email}`" class="text-label hover:underline" style="color: var(--fg-soft);">
              {{ cvData.email }}
            </a>
            <span class="text-label" style="color: var(--accent-teal);">
              {{ cvData.location }}
            </span>
          </div>
        </div>

        <!-- ═══ Right: Photo/avatar + badge ═══ -->
        <div class="flex flex-col items-center lg:items-end gap-6 mt-8 lg:mt-0">
          <!-- Badge "disponible" — floating over photo -->
          <div class="relative z-20 -mb-4 mr-0 lg:mr-4">
            <span class="brutal-pill flex items-center gap-2" style="background: var(--surface); color: var(--fg);">
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style="background: var(--accent-teal);"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5" style="background: var(--accent-teal);"></span>
              </span>
              {{ currentLanguage === 'es' ? 'DISPONIBLE PARA FREELANCE' : 'AVAILABLE FOR FREELANCE' }}
            </span>
          </div>

          <!-- SVG Avatar on pink block -->
          <div 
            class="w-56 sm:w-64 md:w-72 lg:w-80 h-56 sm:h-64 md:h-72 lg:h-80 brutal-photo flex items-center justify-center p-2 relative"
            style="background: var(--accent-pink);"
          >
            <div ref="svgRoot" class="w-full h-full bg-transparent">
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
                      <g class="ear-left ear"><path d="M63.52 105.14A8.21 8.21 0 0072 113.2a8.36 8.36 0 008.51-8.1A8.21 8.21 0 0072 97a8.36 8.36 0 00-8.48 8.14z" fill="#7c5c38"/><path d="M68.54 104.48a17 17 0 014.14.41c1.07.31 1.94 1 3 1.31a.39.39 0 00.43-.57c-1.15-2.38-5.49-1.86-7.58-1.67a.26.26 0 000 .52z" fill="#5c4c38"/></g>
                      <g class="ear-right ear"><path d="M144.37 105.24a8.2 8.2 0 01-8.37 8.06 8.35 8.35 0 01-8.51-8.1 8.21 8.21 0 018.42-8.06 8.35 8.35 0 018.46 8.1z" fill="#7c5c38"/><path d="M139.6 104c-2.1-.19-6.43-.72-7.59 1.67a.39.39 0 00.44.57c1.07-.26 1.92-1 3-1.31a17.51 17.51 0 014.15-.41.26.26 0 000-.52z" fill="#5c4c38"/></g>
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
                          </g>
                          <path class="nose" d="M102.39 98.13s3.09 1.55 5.78 0" fill="none" stroke="#1E1E1D"/>
                          <path class="glasses" d="M133.54 81.76c-4.7-1.42-15.29-2.42-19.83-.45-5.82 2.17-3.18 1.57-8.55 1.17-5.36.4-2.74 1-8.55-1.18-7.3-2.55-15.58-.24-22.25.72v2.75c2.46.24 1.26 6.78 3.06 10.32 2.13 7.23 12.69 9.55 18.19 5.49 3.9-2 7.08-10.32 7.21-12.86 0-1.64 4.15-2.57 4.61.24.11 2.53 3.42 10.69 7.28 12.62 5.5 4 16 1.74 18.17-5.49 1.8-3.54 1.69-9.92 2.88-10.32s.74-2.67 0-2.75-1.02-.1-2.22-.26z" fill="#1a1a1a" opacity=".9"/>
                        </g>
                      </g>
                    </g>
                    <g class="hair-group">
                      <path class="hair-left" fill="#1E1E1D" d="M 70.747 90.261 C 69.177 87.235 68.449 83.939 68.049 80.603 C 67.234 73.808 67.567 67.078 69.79 60.538 C 71.176 56.462 73.204 52.747 76.162 49.631 C 77.285 48.446 78.663 47.51 80.009 46.445 C 81.816 44.949 83.565 43.449 85.794 42.876 C 88.322 42.228 90.654 41.028 92.589 39.466 C 94.822 37.663 97.175 37.492 99.733 37.449 C 102.254 37.405 104.776 37.153 107.291 37.242 C 109.45 37.319 111.603 37.721 113.747 38.052 C 114.102 38.107 114.406 38.525 114.721 38.791 C 115.096 39.107 115.459 39.439 115.986 39.832 C 117.123 40.196 118.101 40.492 119.08 40.788 C 122.755 41.854 126.18 43.475 129.082 46 C 135.756 51.81 139.105 59.42 140.325 68.095 C 141.311 75.112 140.893 82.031 138.678 88.795"/>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ChevronDown class="h-8 w-8" style="color: var(--fg); opacity: 0.4;" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Download, ChevronDown } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { initHeroAnimation } from '../composables/useHeroAnimation'

const { currentLanguage, t, cvData } = useLanguage()
const svgRoot = ref<HTMLElement | null>(null)

const cvPdfUrl = computed(() => 
  currentLanguage.value === 'es' ? '/files/CV_ES.pdf' : '/files/CV_INGLES.pdf'
)

const scrollToContact = () => {
  const el = document.querySelector('#contact')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

let stopAnimation: (() => void) | undefined

onMounted(async () => {
  stopAnimation = await initHeroAnimation(svgRoot.value ?? undefined)
})

onUnmounted(() => {
  if (typeof stopAnimation === 'function') stopAnimation()
})
</script>

<style scoped>
.me {
  visibility: visible !important;
  opacity: 1 !important;
  display: block !important;
}
.hair-group {
  transform-origin: center center;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 2;
}
.face { z-index: 3; }
</style>
