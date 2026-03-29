<template>
  <section id="why-hire-me" ref="container" class="section py-20 relative overflow-hidden bg-transparent">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="parallax absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl opacity-40 bg-primary/20"></div>
      <div class="parallax absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-40 bg-primary-light/20"></div>
      <div class="absolute top-28 right-28 w-2 h-2 rounded-full animate-pulse bg-primary"></div>
      <div class="absolute bottom-36 left-16 w-1 h-1 rounded-full animate-pulse bg-primary-light" style="animation-delay: 2.2s;"></div>
      <div class="absolute top-1/2 left-28 w-1.5 h-1.5 rounded-full animate-pulse bg-primary-accent" style="animation-delay: 0.7s;"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Header -->
      <div class="text-center mb-16 relative z-10">
        <div class="flex items-center gap-2 justify-center mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
            <Sparkles class="w-5 h-5 text-white" aria-hidden="true" />
          </div>
        </div>
        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
            {{ currentLanguage === 'es' ? '¿Por qué trabajar conmigo?' : 'Why work with me?' }}
          </span>
        </h2>
        <p class="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8 px-2 leading-relaxed">
          {{ currentLanguage === 'es' 
            ? 'No solo escribo código, creo soluciones que generan resultados reales' 
            : 'I don\'t just write code, I create solutions that generate real results' }}
        </p>
      </div>

      <!-- Cards -->
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Card 1: Entrega Rápida -->
        <article class="premium-card group bg-gray-50 dark:bg-[#1f2937] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
          <div class="icon-3d mb-6">
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-light to-primary flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Zap class="w-10 h-10 text-white" strokeWidth="2.5" />
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {{ currentLanguage === 'es' ? 'Entrega Rápida' : 'Fast Delivery' }}
          </h3>
          <p class="text-gray-600 dark:text-gray-200 leading-relaxed mb-4">
            {{ currentLanguage === 'es' 
              ? 'Desarrollo ágil con sprints de 2 semanas. Prototipos funcionales en 48 horas.' 
              : 'Agile development with 2-week sprints. Functional prototypes in 48 hours.' }}
          </p>
          <ul class="space-y-2 text-gray-600 dark:text-gray-200">
            <li class="flex items-start gap-2">
              <span class="text-primary dark:text-primary-light mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'Metodología Scrum' : 'Scrum Methodology' }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary dark:text-primary-light mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'CI/CD automatizado' : 'Automated CI/CD' }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary dark:text-primary-light mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'Testing integrado' : 'Integrated Testing' }}</span>
            </li>
          </ul>
        </article>

        <!-- Card 2: Resultados Medibles -->
        <article class="premium-card group bg-gray-50 dark:bg-[#1f2937] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
          <div class="icon-3d mb-6">
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Target class="w-10 h-10 text-white" strokeWidth="2.5" />
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {{ currentLanguage === 'es' ? 'Resultados Medibles' : 'Measurable Results' }}
          </h3>
          <p class="text-gray-600 dark:text-gray-200 leading-relaxed mb-4">
            {{ currentLanguage === 'es' 
              ? 'No solo código bonito. Optimizo para conversión, SEO y rendimiento real.' 
              : 'Not just pretty code. I optimize for conversion, SEO and real performance.' }}
          </p>
          <ul class="space-y-2 text-gray-600 dark:text-gray-200">
            <li class="flex items-start gap-2">
              <span class="text-primary dark:text-primary-light mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'Mobile First' : 'Mobile First' }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary dark:text-primary-light mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'SEO optimizado' : 'SEO Optimized' }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary dark:text-primary-light mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'Analytics integrado' : 'Integrated Analytics' }}</span>
            </li>
          </ul>
        </article>

        <!-- Card 3: Comunicación Clara -->
        <article class="premium-card group bg-gray-50 dark:bg-[#1f2937] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
          <div class="icon-3d mb-6">
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-accent to-primary flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <MessageSquare class="w-10 h-10 text-white" strokeWidth="2.5" />
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {{ currentLanguage === 'es' ? 'Comunicación Clara' : 'Clear Communication' }}
          </h3>
          <p class="text-gray-600 dark:text-gray-200 leading-relaxed mb-4">
            {{ currentLanguage === 'es' 
              ? 'Updates diarios, documentación completa y disponibilidad en tu zona horaria.' 
              : 'Daily updates, complete documentation and availability in your timezone.' }}
          </p>
          <ul class="space-y-2 text-gray-600 dark:text-gray-200">
            <li class="flex items-start gap-2">
              <span class="text-primary dark:text-primary-light mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'Reportes diarios' : 'Daily Reports' }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary dark:text-primary-light mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'Docs técnica completa' : 'Complete Tech Docs' }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary dark:text-primary-light mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'Respuesta < 24h' : 'Response < 24h' }}</span>
            </li>
          </ul>
        </article>
      </div>

      <!-- CTA Final -->
      <div class="text-center mt-16">
        <p class="text-xl text-gray-900 dark:text-white mb-6">
          {{ currentLanguage === 'es' 
            ? '¿Listo para llevar tu proyecto al siguiente nivel?' 
            : 'Ready to take your project to the next level?' }}
        </p>
        <button
          @click="scrollToContact"
          class="px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          {{ currentLanguage === 'es' ? 'Hablemos' : 'Let\'s Talk' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Zap, Target, MessageSquare, Sparkles } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useGSAP } from '../composables/useGSAP'

const { currentLanguage } = useLanguage()
const container = ref(null)

const scrollToContact = () => {
  const element = document.querySelector('#contact')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

useGSAP(container)
</script>

<style scoped>
/* Icon 3D hover effect */
.icon-3d > div {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateZ(0);
}

.premium-card:hover .icon-3d > div {
  transform: scale(1.08) rotate(4deg);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}
</style>
