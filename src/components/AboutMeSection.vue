<template>
  <section
    id="about-me"
    ref="container"
    class="reveal-section section py-12 sm:py-16 lg:py-20"
    aria-labelledby="about-heading"
  >
    <div class="container mx-auto px-6">
      <div class="max-w-5xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <!-- Main Content -->
          <div class="reveal-child order-2 lg:order-1">
            <div class="rule-thick mb-4 max-w-xs"></div>
            <h2 id="about-heading" class="text-h1 mb-6">
              {{ currentLanguage === 'es' ? 'Más allá del código' : 'Beyond the code' }}
            </h2>

            <div class="editorial-cols text-body mb-8">
              <p v-for="(paragraph, index) in cvData.aboutMe?.description" :key="index" class="mb-3">
                {{ paragraph }}
              </p>
            </div>

            <!-- Motivation card -->
            <div class="noir-card mt-6">
              <div class="flex items-start gap-4">
                <Lightbulb class="w-6 h-6 text-ink flex-shrink-0 mt-0.5" strokeWidth="2" />
                <div>
                  <h3 class="text-h2 mb-2 text-lg">{{ cvData.aboutMe?.motivation.title }}</h3>
                  <p class="text-body text-sm">{{ cvData.aboutMe?.motivation.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Values Column -->
          <div class="reveal-child order-1 lg:order-2 space-y-4" style="transition-delay: 60ms">
            <div
              v-for="(value, index) in cvData.aboutMe?.values"
              :key="index"
              class="noir-card"
              :style="{ transitionDelay: `${60 + index * 60}ms` }"
            >
              <div class="flex items-start gap-4">
                <component :is="iconMap[value.icon as keyof typeof iconMap]" class="w-6 h-6 text-ink flex-shrink-0 mt-0.5" strokeWidth="2" />
                <div>
                  <h4 class="text-h2 mb-2 text-lg">{{ value.title }}</h4>
                  <p class="text-body text-sm">{{ value.description }}</p>
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
  transition: opacity 0.6s ease, transform 0.6s ease;
}
</style>
