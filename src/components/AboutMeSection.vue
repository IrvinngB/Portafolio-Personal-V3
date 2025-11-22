<template>
  <section id="about-me" ref="container" class="section py-20 bg-white dark:bg-[#1f2937]">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Contenido Principal -->
          <div class="order-2 lg:order-1">
            <div class="mb-6">
              <span class="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 text-[#3FA35B] dark:text-[#B4D333] bg-[#3FA35B]/10 dark:bg-[#B4D333]/10">
                {{ t.about }}
              </span>
              <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {{ currentLanguage === 'es' ? 'Más allá del código' : 'Beyond the code' }}
              </h2>
            </div>

            <div class="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p v-for="(paragraph, index) in cvData.aboutMe?.description" :key="index">
                {{ paragraph }}
              </p>
            </div>

            <!-- Lo que me motiva -->
            <div class="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#3FA35B]/10 to-[#B4D333]/10 border border-[#3FA35B]/20 dark:border-[#B4D333]/20">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3FA35B] to-[#0A3D3D] flex items-center justify-center flex-shrink-0 shadow-lg">
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
              <div 
                v-for="(value, index) in cvData.aboutMe?.values" 
                :key="index"
                class="group card bg-gray-50 dark:bg-[#0A3D3D] rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              >
                <div class="flex items-start gap-4">
                  <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3FA35B] to-[#B4D333] flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <component :is="iconMap[value.icon as keyof typeof iconMap]" class="w-7 h-7 text-white" strokeWidth="2.5" />
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

const { t, cvData, currentLanguage } = useLanguage()
const container = ref(null)

useGSAP(container)

const iconMap = {
  Rocket,
  Target,
  Users,
  Lightbulb
}
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  /* GPU acceleration */
  transform: translateZ(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  will-change: transform;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(63, 163, 91, 0.1), transparent);
  transition: transform 0.5s ease;
  z-index: 1;
  transform: translateZ(0);
}

.card:hover::before {
  transform: translateX(200%);
}
</style>
