<template>
  <section
    id="about-me"
    ref="container"
    class="reveal-section section py-12 sm:py-16 lg:py-20"
    aria-labelledby="about-heading"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <!-- Main Content -->
          <div class="reveal-child order-2 lg:order-1">
            <h2 id="about-heading" class="text-h1 text-fg mb-6">
              {{ currentLanguage === 'es' ? 'Más allá del código' : 'Beyond the code' }}
            </h2>

            <div class="space-y-4 text-body-lg text-fg-soft leading-relaxed">
              <p v-for="(paragraph, index) in cvData.aboutMe?.description" :key="index">
                {{ paragraph }}
              </p>
            </div>

            <!-- Motivation card -->
            <div class="mt-8 p-6 rounded-xxl bg-surface-container border border-border">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-accent-dim text-accent flex items-center justify-center flex-shrink-0">
                  <Lightbulb class="w-6 h-6" strokeWidth="2.5" />
                </div>
                <div>
                  <h3 class="text-h3 text-fg mb-2">
                    {{ cvData.aboutMe?.motivation.title }}
                  </h3>
                  <p class="text-body-md text-fg-soft">
                    {{ cvData.aboutMe?.motivation.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Values Column -->
          <div class="reveal-child order-1 lg:order-2 space-y-4" style="transition-delay: 60ms">
            <div
              v-for="(value, index) in cvData.aboutMe?.values"
              :key="index"
              class="bg-surface-container hover:bg-surface-high transition-colors duration-fast rounded-xxl p-5 sm:p-6 border border-border"
              :style="{ transitionDelay: `${60 + index * 60}ms` }"
            >
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-accent-dim text-accent flex items-center justify-center flex-shrink-0">
                  <component :is="iconMap[value.icon as keyof typeof iconMap]" class="w-6 h-6" strokeWidth="2.5" />
                </div>
                <div>
                  <h4 class="text-h3 text-fg mb-2">{{ value.title }}</h4>
                  <p class="text-body-md text-fg-soft">{{ value.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Lightbulb, Rocket, Target, Users } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'

const { cvData, currentLanguage } = useLanguage()
const container = ref<HTMLElement>()

const { observe } = useScrollReveal()

onMounted(() => {
  if (container.value) observe(container.value)
})

const iconMap = {
  Rocket,
  Target,
  Users,
  Lightbulb
}
</script>

<style scoped>
.reveal-section .reveal-child {
  opacity: 0;
  transform: translateY(16px);
}

.reveal-section.is-visible .reveal-child {
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}
</style>
