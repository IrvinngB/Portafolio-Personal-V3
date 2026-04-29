<template>
  <section id="about-me" ref="container" class="section py-20 bg-transparent relative overflow-hidden">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Contenido Principal -->
          <div class="order-2 lg:order-1">
            <div class="mb-6">
              <h2 class="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6">
                {{ currentLanguage === 'es' ? 'Más allá del código' : 'Beyond the code' }}
              </h2>
            </div>

            <div class="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p v-for="(paragraph, index) in cvData.aboutMe?.description" :key="index">
                {{ paragraph }}
              </p>
            </div>

            <!-- Lo que me motiva -->
            <div
              class="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-light/10 border border-primary/20 dark:border-primary-light/20">
              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Lightbulb class="w-6 h-6 text-white" strokeWidth="2.5" />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {{ cvData.aboutMe?.motivation.title }}
                  </h3>
                  <p class="text-gray-700 dark:text-gray-300">
                    {{ cvData.aboutMe?.motivation.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Valores y Fortalezas -->
          <div class="order-1 lg:order-2">
            <div class="space-y-6">
              <div v-for="(value, index) in cvData.aboutMe?.values" :key="index"
                class="group premium-card bg-gray-50 dark:bg-[#1f2937] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div class="flex items-start gap-4">
                  <div
                    class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <component :is="iconMap[value.icon as keyof typeof iconMap]" class="w-7 h-7 text-white"
                      strokeWidth="2.5" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {{ value.title }}
                    </h4>
                    <p class="text-gray-700 dark:text-gray-300">
                      {{ value.description }}
                    </p>
                  </div>
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
import { ref } from 'vue'
import { Lightbulb, Rocket, Target, Users } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useGSAP } from '../composables/useGSAP'

const { cvData, currentLanguage } = useLanguage()
const container = ref(null)

useGSAP(container)

const iconMap = {
  Rocket,
  Target,
  Users,
  Lightbulb
}
</script>
