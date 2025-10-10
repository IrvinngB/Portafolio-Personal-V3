<template>
  <section id="projects" class="section py-20 bg-white dark:bg-[#0A3D3D] overflow-hidden">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t.featuredProjects }}
        </h2>
        <div class="w-24 h-1 mx-auto" style="background-color: #3FA35B;"></div>
      </div>

      <!-- Carousel Container -->
      <div class="relative max-w-6xl mx-auto">
        <!-- Navigation Buttons -->
        <button
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-[#1f2937] shadow-lg rounded-full hover:bg-gray-50 dark:hover:bg-[#374151] transition-all duration-200 group"
          :disabled="currentSlide === 0"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
        >
          <ChevronLeft class="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-[#3FA35B]" />
        </button>
        
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-[#1f2937] shadow-lg rounded-full hover:bg-gray-50 dark:hover:bg-[#374151] transition-all duration-200 group"
          :disabled="currentSlide >= maxSlides - 1"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide >= maxSlides - 1 }"
        >
          <ChevronRight class="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-[#3FA35B]" />
        </button>

        <!-- Carousel Content -->
        <div class="overflow-hidden rounded-xl">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * slideWidth}%)` }"
          >
            <div
              v-for="(project, index) in cvData.projects"
              :key="index"
              class="flex-shrink-0 px-4"
              :style="{ width: slideWidth + '%' }"
            >
              <div class="card group bg-gray-50 dark:bg-[#1f2937] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 h-full max-w-2xl mx-auto">
                <!-- Project Image -->
                <div class="h-64 relative overflow-hidden">
                  <img 
                    :src="project.image" 
                    :alt="project.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <!-- Overlay effects -->
                  <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <!-- Project number -->
                  <div class="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {{ index + 1 }}
                  </div>
                  <!-- Gradient overlay -->
                  <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                <!-- Project Content -->
                <div class="p-6 flex flex-col h-full">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {{ project.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                    {{ project.description }}
                  </p>

                  <!-- Technologies -->
                  <div v-if="project.technologies" class="mb-6">
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="tech in project.technologies.slice(0, 4)"
                        :key="tech"
                        class="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors cursor-default"
                      >
                        {{ tech }}
                      </span>
                      <span v-if="project.technologies.length > 4" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full font-medium">
                        +{{ project.technologies.length - 4 }}
                      </span>
                    </div>
                  </div>

                  <!-- Project Links -->
                  <div class="flex gap-3 mt-auto">
                    <button class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105">
                      <ExternalLink class="h-4 w-4" />
                      {{ t.viewProject }}
                    </button>
                    <button class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 transform hover:scale-105">
                      <Github class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dots Indicator -->
        <div class="flex justify-center mt-8 space-x-2">
          <button
            v-for="index in maxSlides"
            :key="index"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full transition-all duration-200"
            :class="currentSlide === index ? 'scale-125' : 'bg-gray-300 dark:bg-gray-600 hover:bg-[#B4D333]'"
            :style="currentSlide === index ? { backgroundColor: '#3FA35B' } : {}"
          ></button>
        </div>

        <!-- Auto-play indicator -->
        <div class="flex justify-center mt-4">
          <button
            @click="toggleAutoPlay"
            class="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Play v-if="!isAutoPlaying" class="h-4 w-4" />
            <Pause v-else class="h-4 w-4" />
            {{ isAutoPlaying ? 'Pausar' : 'Reproducir' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ExternalLink, Github, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { t, cvData } = useLanguage()

// Carousel state
const currentSlide = ref(0)
const isAutoPlaying = ref(true)
const autoPlayInterval = ref<number | null>(null)

// Responsive slides per view
const slidesPerView = ref(1)
const slideWidth = computed(() => 100 / slidesPerView.value)
const maxSlides = computed(() => Math.max(0, cvData.value.projects.length - slidesPerView.value + 1))

// Carousel methods
const nextSlide = () => {
  if (currentSlide.value < maxSlides.value - 1) {
    currentSlide.value++
  } else {
    currentSlide.value = 0 // Loop back to start
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = maxSlides.value - 1 // Loop to end
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const toggleAutoPlay = () => {
  isAutoPlaying.value = !isAutoPlaying.value
  if (isAutoPlaying.value) {
    startAutoPlay()
  } else {
    stopAutoPlay()
  }
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

// Responsive handling
const handleResize = () => {
  // Always show 1 slide at a time for better focus
  slidesPerView.value = 1
  
  // Adjust current slide if needed
  if (currentSlide.value >= maxSlides.value) {
    currentSlide.value = Math.max(0, maxSlides.value - 1)
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  startAutoPlay()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  stopAutoPlay()
})
</script>