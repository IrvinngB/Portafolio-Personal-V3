<template>
  <section
    class="crt-scanlines min-h-screen flex items-center bg-transparent relative overflow-hidden pt-20 pb-12"
    aria-label="Hero section - Boot sequence"
    itemscope
    itemtype="https://schema.org/Person"
  >
    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <!-- System bar at top -->
      <div class="text-data mb-8 text-phosphor-dim">
        [IRVINCODES.DEV v1.0]────────────────────────────────────────[{{ currentDate }}]
      </div>

      <div class="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-start">
        <!-- Left Column: Boot Sequence -->
        <div class="text-center lg:text-left pt-8 lg:pt-16">
          <!-- Boot step -->
          <p v-if="bootStep" class="text-label blink mb-4">{{ bootStep }}</p>

          <!-- Name -->
          <h1 class="text-system glow-pulse" itemprop="name">IRVIN BENITEZ</h1>

          <!-- System info panel -->
          <div class="crt-panel mt-6 inline-block text-left">
            <p class="crt-prompt text-body">ROL: {{ cvData.title?.toUpperCase() }}</p>
            <p class="crt-prompt text-body">UBICACIÓN: PANAMÁ CITY, PAN</p>
            <p class="crt-prompt text-body blink">STATUS: DISPONIBLE_</p>
          </div>

          <meta itemprop="url" content="https://irvincodes.dev" />
          <meta itemprop="jobTitle" :content="cvData.title" />

          <!-- System data readout -->
          <div class="crt-panel mt-6 text-left">
            <p class="text-data">> STACK ACTIVO: VUE.JS / TYPESCRIPT / NODE.JS / PYTHON</p>
            <p class="text-data">> PROYECTOS ACTIVOS: {{ cvData.projects?.length ?? 0 }}</p>
            <p class="text-data">> SYS_TEMP: {{ sysTemp }}°C | MEM: {{ sysMem }}MB/16GB</p>
            <p class="text-data">> UPTIME: {{ uptimeStr }} | LAT: 8.9936° N LON: 79.5197° W</p>
          </div>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
            <a href="#contact" class="crt-link text-prompt">> CONTRATAR</a>
            <a :href="cvPdfUrl" class="crt-link text-prompt">> DESCARGAR CV</a>
          </div>

          <!-- Contact info -->
          <div class="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 mt-6 justify-center lg:justify-start">
            <a
              :href="`mailto:${cvData.email}`"
              class="crt-link text-data"
              :aria-label="`Send email to ${cvData.email}`"
            >
              {{ cvData.email }}
            </a>
            <a
              :href="`tel:${cvData.phone}`"
              class="crt-link text-data"
              :aria-label="`Call phone number ${cvData.phone}`"
            >
              {{ cvData.phone }}
            </a>
            <span class="text-data text-phosphor-dim" :aria-label="`Location: ${cvData.location}`">
              {{ cvData.location }}
            </span>
          </div>
        </div>

        <!-- Right Column: Avatar + Building Now -->
        <div class="flex flex-col items-center lg:items-end gap-8 mt-8 lg:mt-0">
          <!-- SVG Avatar — wrapped in crt-panel -->
          <div class="crt-panel w-64 sm:w-72 md:w-80 lg:w-96 p-3">
            <div class="w-full aspect-square flex items-center justify-center overflow-hidden">
              <div
                ref="svgRoot"
                class="w-full h-full bg-transparent"
              >
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
                      <path class="hair-left" fill="#1E1E1D" opacity="1.000000" stroke="none" d="M 70.747 90.261 C 69.177 87.235 68.449 83.939 68.049 80.603 C 67.234 73.808 67.567 67.078 69.79 60.538 C 71.176 56.462 73.204 52.747 76.162 49.631 C 77.285 48.446 78.663 47.51 80.009 46.445 C 81.816 44.949 83.565 43.449 85.794 42.876 C 88.322 42.228 90.654 41.028 92.589 39.466 C 94.822 37.663 97.175 37.492 99.733 37.449 C 102.254 37.405 104.776 37.153 107.291 37.242 C 109.45 37.319 111.603 37.721 113.747 38.052 C 114.102 38.107 114.406 38.525 114.721 38.791 C 115.096 39.107 115.459 39.439 115.986 39.832 C 117.123 40.196 118.101 40.492 119.08 40.788 C 122.755 41.854 126.18 43.475 129.082 46 C 135.756 51.81 139.105 59.42 140.325 68.095 C 141.311 75.112 140.893 82.031 138.678 88.795 C 138.599 89.035 138.578 89.294 138.456 89.688 C 137.381 91.248 136.379 92.663 135.378 94.079 C 135.05 93.577 135.041 93.245 135.001 92.918 C 134.582 89.579 134.429 86.176 133.67 82.918 C 132.535 78.047 130.183 73.776 126.139 70.665 C 125.777 70.387 125.326 70.225 124.566 69.823 C 124.895 70.906 125.086 71.589 125.31 72.261 C 125.577 73.064 125.243 73.474 124.482 73.354 C 123.62 73.217 122.689 73.076 121.957 72.643 C 119.383 71.116 116.884 69.457 114.349 67.862 C 113.807 67.522 113.229 67.241 112.668 66.932 C 112.592 67.031 112.518 67.132 112.443 67.231 C 112.73 67.622 112.999 68.031 113.31 68.4 C 114.16 69.406 115.067 70.362 115.878 71.397 C 116.69 72.431 116.424 73.143 115.127 73.116 C 113.549 73.085 111.831 73.089 110.431 72.474 C 107.162 71.037 104.03 69.271 100.878 67.573 C 99.637 66.905 98.487 66.065 97.107 65.182 C 97.107 65.681 97.051 65.904 97.115 66.082 C 98.172 69.023 100.618 70.868 102.56 73.158 C 96.628 72.16 92.103 68.716 88.023 64.556 C 87.813 64.718 87.679 64.772 87.625 64.871 C 87.463 65.168 87.32 65.477 87.19 65.791 C 85.684 69.472 83.686 72.782 80.475 75.226 C 77.634 77.392 75.941 80.323 75.028 83.772 C 74.12 87.195 73.981 90.678 74.125 94.19 C 74.137 94.492 74.127 94.795 74.101 95.098 C 73.999 95.028 74.099 93.486 73.712 92.682 C 72.695 90.531 72.098 88.181 71.614 85.886 C 71.482 85.259 71.169 84.681 71.222 83.741 C 71.234 83.527 71.253 83.504 70.761 83.143 C 70.581 83.605 70.392 84.07 70.286 84.552 C 69.988 85.793 69.910 87.099 70.213 88.357 C 70.238 88.46 70.261 88.564 70.292 88.665 C 71.076 87.144 71.149 89.12 70.747 90.261 Z"/>
                      <path class="hair-right" fill="#1E1E1D" opacity="1.000000" stroke="none" d="M 136.182 89.878 C 136.216 89.516 136.238 89.153 136.248 88.789 C 136.585 85.496 136.213 82.193 134.743 79.155 C 133.436 76.451 131.498 74.103 129.195 72.191 C 128.088 71.269 126.818 70.552 125.668 69.629 C 124.234 68.478 123.045 67.043 121.701 65.806 C 120.459 64.663 119.196 63.54 117.844 62.52 C 115.433 60.699 112.675 59.412 109.762 58.732 C 106.878 58.059 103.992 57.446 101.035 57.408 C 98.06 57.369 95.157 58.138 92.464 59.387 C 90.698 60.192 88.964 61.075 87.334 62.129 C 86.627 62.587 86.196 63.122 85.311 63.718 C 84.18 64.486 83.081 65.199 81.982 65.912 C 78.57 68.127 75.418 70.843 72.957 74.114 C 67.818 81.096 65.589 89.567 67.317 98.014 C 67.476 98.832 67.619 99.654 67.845 100.461 C 67.889 100.384 67.933 100.307 67.978 100.23 C 68.177 99.886 68.362 99.537 68.59 99.212 C 70.144 96.987 72.113 95.092 74.499 93.704 C 77.285 92.083 79.876 90.156 81.684 87.571 C 83.188 85.436 84.051 82.936 84.909 80.485 C 85.366 79.18 85.925 77.908 86.553 76.634 C 87.49 76.921 88.574 77.15 89.393 77.516 C 93.008 79.125 96.456 81.097 99.948 82.993 C 102.554 84.409 105.32 85.54 108.116 86.474 C 109.434 86.921 110.778 87.306 112.103 87.713 C 112.271 87.579 112.429 87.437 112.598 87.307 C 106.67 82.503 104.597 73.607 108.035 67.529 C 108.358 66.951 108.776 66.423 109.142 65.891 C 108.783 66.077 108.436 66.281 108.067 66.446 C 107.15 66.861 106.226 67.263 105.301 67.665 C 103.39 68.498 101.494 69.357 99.576 70.178 C 97.269 71.17 94.913 72.064 92.578 73.01 C 89.355 74.304 85.384 75.571 82.92 78.658 C 90.055 76.565 95.437 78.307 102.011 73.363 C 102.666 72.872 103.237 72.282 103.847 71.735 C 104.003 71.595 104.147 71.44 104.295 71.291 C 104.19 71.114 104.081 70.94 103.978 70.761 C 100.38 63.86 94.445 67.015 87.008 68.521 C 84.748 68.974 82.564 69.633 80.559 70.795 C 79.145 71.615 77.872 72.655 76.612 73.708 C 75.139 74.894 73.647 76.052 72.385 77.458 C 70.751 79.281 69.758 81.515 69.072 83.847 C 68.753 82.749 68.518 81.619 68.403 80.489 C 67.954 78.615 67.752 76.702 67.719 74.789 C 67.691 73.132 67.817 71.467 68.026 69.817 C 68.137 68.85 68.284 67.883 68.447 66.922 C 69.016 63.999 80.088 64.632 88.529 62.826 C 89.5 62.625 90.48 62.303 91.41 61.859 C 99.257 57.913 104.693 53.895 111.355 48.511 C 112.783 47.353 114.471 47.372 116.07 46.663 C 117.845 45.87 119.535 44.403 121.058 43.196 C 123.528 41.206 125.994 39.824 128.859 39.23 C 129.832 38.999 130.814 38.631 131.82 38.799 C 133.79 39.126 134.947 39.891 135.728 40.812 C 138.423 43.852 138.263 46.251 136.919 49.787 C 136.104 52.684 135.049 55.488 133.888 58.251 C 133.232 59.735 132.897 61.477 132.966 63.174 C 133.056 64.478 133.598 65.743 133.992 67.245 C 134.476 68.07 134.918 68.912 135.397 69.731 C 137.6 73.61 138.064 77.72 137.403 82.007 C 136.986 84.945 136.717 87.812 136.182 89.878 Z"/>
                    </g>
                  </g>
                </g>
              </svg>
              </div>
            </div>
          </div>

          <!-- Building Now Panel -->
          <BuildingNowPanel />
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        role="img"
        aria-label="Scroll down indicator"
      >
        <span class="text-data blink">▼</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { initHeroAnimation } from '../composables/useHeroAnimation'
import BuildingNowPanel from './BuildingNowPanel.vue'

const { cvData } = useLanguage()

const svgRoot = ref<HTMLElement | null>(null)

// Boot sequence
const bootMessages = [
  'IRVINCODES.DEV v1.0 — INICIANDO...',
  'VERIFICANDO SISTEMA...',
  'MEMORIA: OK | DISCO: OK | RED: OK',
  'CARGANDO MÓDULOS DEL NÚCLEO...',
  'INICIANDO INTERFAZ DE USUARIO...',
  'CARGANDO PERFIL: IRVIN BENITEZ...',
  'SISTEMA LISTO_',
]
const bootStep = ref(bootMessages[0])
let bootInterval: ReturnType<typeof setInterval> | undefined
let bootIndex = 0

// Current date
const currentDate = computed(() => {
  const now = new Date()
  const dd = String(now.getDate()).padStart(2, '0')
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const yyyy = now.getFullYear()
  const hh = String(now.getHours()).padStart(2, '0')
  const min = String(now.getMinutes()).padStart(2, '0')
  const ss = String(now.getSeconds()).padStart(2, '0')
  return `${dd}-${mm}-${yyyy} | ${hh}:${min}:${ss}`
})

// System readout data
const sysTemp = ref(42)
const sysMem = ref(847)

// Uptime since page load
const loadTime = ref(Date.now())
const uptimeStr = ref('0:00:00')

const cvPdfUrl = computed(() => {
  const relativePath = '/files/CV_INGLES.pdf'
  return relativePath
})

let stopAnimation: (() => void) | undefined
let uptimeInterval: ReturnType<typeof setInterval> | undefined
let dataInterval: ReturnType<typeof setInterval> | undefined

onMounted(async () => {
  stopAnimation = await initHeroAnimation(svgRoot.value ?? undefined)

  // Boot sequence animation
  bootInterval = setInterval(() => {
    bootIndex++
    if (bootIndex < bootMessages.length) {
      bootStep.value = bootMessages[bootIndex]
    } else {
      bootStep.value = ''
      if (bootInterval) clearInterval(bootInterval)
    }
  }, 400)

  // Uptime counter
  uptimeInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - loadTime.value) / 1000)
    const h = Math.floor(elapsed / 3600)
    const m = Math.floor((elapsed % 3600) / 60)
    const s = elapsed % 60
    uptimeStr.value = `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }, 1000)

  // System data updates
  dataInterval = setInterval(() => {
    sysTemp.value = Math.floor(Math.random() * 9 + 39)
    sysMem.value = Math.floor(Math.random() * 800 + 400)
  }, 3000)
})

onUnmounted(() => {
  if (typeof stopAnimation === 'function') stopAnimation()
  if (bootInterval) clearInterval(bootInterval)
  if (uptimeInterval) clearInterval(uptimeInterval)
  if (dataInterval) clearInterval(dataInterval)
})
</script>

<style scoped>
/* SVG layering */
.me {
  visibility: visible !important;
  opacity: 1 !important;
  display: block !important;
}

.hair-group,
.hair-left,
.hair-right {
  transform-origin: center center;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.hair-group {
  z-index: 2;
}

.face {
  z-index: 3;
}
</style>
