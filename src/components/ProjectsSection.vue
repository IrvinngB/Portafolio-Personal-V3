<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ExternalLink, Github, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { t, cvData } = useLanguage()
const currentSlide = ref(0)
const isAutoPlaying = ref(true)
const autoPlayInterval = ref<number | null>(null)

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})

// State and computed properties AFTER hooks
const slidesPerView = computed(() => 1)
const slideWidth = computed(() => 100 / slidesPerView.value)
const maxSlides = computed(() => Math.max(0, cvData.value.projects.length - slidesPerView.value + 1))

// Functions
const nextSlide = () => {
  if (currentSlide.value < maxSlides.value - 1) {
    currentSlide.value++
  } else {
    currentSlide.value = 0
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = maxSlides.value - 1
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const toggleAutoPlay = () => {
  isAutoPlaying.value = !isAutoPlaying.value
  isAutoPlaying.value ? startAutoPlay() : stopAutoPlay()
}

const startAutoPlay = () => {
  if (autoPlayInterval.value) return
  autoPlayInterval.value = setInterval(() => {
    nextSlide()
  }, 4000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}
</script>

<template>
  <section id="projects" class="section py-20 bg-white dark:bg-[#0A3D3D] overflow-hidden">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t.featuredProjects }}
        </h2>
        <div class="w-24 h-1 mx-auto" style="background-color: #3FA35B;"></div>
      </div>

      <div class="relative max-w-6xl mx-auto">
        <button
          @click="prevSlide"
          class="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-[#1f2937] shadow-lg rounded-full hover:bg-gray-50 dark:hover:bg-[#374151] transition-all duration-200 group focus:outline-none focus-ring"
          :disabled="currentSlide === 0"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
          aria-label="Previous project"
        >
          <ChevronLeft class="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-[#3FA35B]" aria-hidden="true" />
        </button>
        
        <button
          @click="nextSlide"
          class="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-[#1f2937] shadow-lg rounded-full hover:bg-gray-50 dark:hover:bg-[#374151] transition-all duration-200 group focus:outline-none focus-ring"
          :disabled="currentSlide >= maxSlides - 1"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide >= maxSlides - 1 }"
          aria-label="Next project"
        >
          <ChevronRight class="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-[#3FA35B]" aria-hidden="true" />
        </button>

        <div class="overflow-hidden rounded-xl mx-8 md:mx-0">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * slideWidth}%)` }"
            role="region"
            aria-label="Projects carousel"
            aria-live="polite"
          >
            <div
              v-for="(project, index) in cvData.projects"
              :key="index"
              class="flex-shrink-0 px-4"
              :style="{ width: slideWidth + '%' }"
            >
              <article class="card group bg-gray-50 dark:bg-[#1f2937] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 h-full max-w-2xl mx-auto">
                <div class="h-64 relative overflow-hidden">
                  <img 
                    :src="project.image" 
                    :alt="project.title"
                    loading="lazy"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <div class="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {{ index + 1 }}
                  </div>
                  <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                <div class="p-6 flex flex-col h-full">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#3FA35B] dark:group-hover:text-[#B4D333] transition-colors">
                    {{ project.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                    {{ project.description }}
                  </p>

                  <div v-if="project.technologies" class="mb-6">
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="tech in project.technologies.slice(0, 4)"
                        :key="tech"
                        class="px-3 py-1 bg-[#3FA35B]/15 dark:bg-[#3FA35B]/25 text-[#3FA35B] dark:text-[#B4D333] text-sm rounded-full font-medium transition-colors cursor-default"
                      >
                        {{ tech }}
                      </span>
                      <span v-if="project.technologies.length > 4" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full font-medium">
                        +{{ project.technologies.length - 4 }}
                      </span>
                    </div>
                  </div>

                  <div class="flex gap-3 mt-auto">
                    <button class="flex-1 px-4 py-2 bg-[#3FA35B] hover:bg-[#0A3D3D] text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 focus:outline-none focus-ring">
                      <ExternalLink class="h-4 w-4" aria-hidden="true" />
                      {{ t.viewProject }}
                    </button>
                    <button class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus-ring" aria-label="View on GitHub">
                      <Github class="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-8 space-x-2">
          <button
            v-for="index in maxSlides"
            :key="index"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus-ring"
            :class="currentSlide === index ? 'scale-125' : 'bg-gray-300 dark:bg-gray-600 hover:bg-[#B4D333]'"
            :style="currentSlide === index ? { backgroundColor: '#3FA35B' } : {}"
            :aria-label="`Go to project ${index}`"
          ></button>
        </div>

        <div class="flex justify-center mt-4">
          <button
            @click="toggleAutoPlay"
            class="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-[#3FA35B] dark:hover:text-[#B4D333] transition-colors focus:outline-none focus-ring rounded"
          >
            <Play v-if="!isAutoPlaying" class="h-4 w-4" aria-hidden="true" />
            <Pause v-else class="h-4 w-4" aria-hidden="true" />
            {{ isAutoPlaying ? 'Pause' : 'Play' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.focus-ring:focus {
  outline: 2px solid #3FA35B;
  outline-offset: 2px;
  border-radius: 8px;
}
</style>
