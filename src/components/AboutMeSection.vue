<template>
  <section
    id="about-me"
    ref="container"
    class="crt-scanlines py-16 sm:py-20 lg:py-28"
    aria-labelledby="about-heading"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-5xl mx-auto">
        <!-- Main Content -->
        <div class="reveal-child">
          <h1 id="about-heading" class="text-h1 glow-pulse mb-10 text-center">
            [ ACERCA DEL SISTEMA ]
          </h1>

          <div class="space-y-6">
            <div class="crt-panel max-w-3xl mx-auto">
              <div class="crt-header">[SYS_INFO]────────────────────────────────────────────</div>
              <p
                v-for="(paragraph, index) in cvData.aboutMe?.description"
                :key="index"
                class="text-body"
                :class="{ 'mt-4': index > 0 }"
              >
                {{ paragraph }}
              </p>
            </div>

            <!-- Motivation card -->
            <div class="crt-panel max-w-3xl mx-auto">
              <div class="crt-header">[MOTIVACIÓN]──────────────────────────────────────────</div>
              <h2 class="text-h2 mt-2 mb-2">{{ cvData.aboutMe?.motivation.title }}</h2>
              <p class="text-body">{{ cvData.aboutMe?.motivation.description }}</p>
            </div>
          </div>
        </div>

        <!-- Values Column -->
        <div class="reveal-child mt-8 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto" style="transition-delay: 60ms">
          <div
            v-for="(value, index) in cvData.aboutMe?.values"
            :key="index"
            class="crt-panel"
            :style="{ transitionDelay: `${60 + index * 60}ms` }"
          >
            <div class="crt-header">[VALOR #{{ index + 1 }}]──────────────────────────────────────</div>
            <h2 class="text-h2 mt-2 mb-2">{{ value.title }}</h2>
            <p class="text-body">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'

const { cvData } = useLanguage()
const container = ref<HTMLElement>()

const { observe } = useScrollReveal()

onMounted(() => {
  if (container.value) observe(container.value)
})
</script>

<style scoped>
.reveal-child {
  opacity: 0;
}

.is-visible .reveal-child {
  opacity: 1;
  transition: opacity 0.6s ease;
}
</style>
