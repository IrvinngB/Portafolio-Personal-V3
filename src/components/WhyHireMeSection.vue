<template>
  <section id="why-hire-me" ref="container" class="section py-20 relative overflow-hidden bg-gradient-to-br from-green-50 to-white dark:from-[#3FA35B] dark:to-[#0A3D3D]">
    <!-- Background decorativo -->
    <div class="absolute inset-0 opacity-10 pointer-events-none" style="contain: paint;">
      <div class="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#3FA35B] dark:bg-white blur-xl"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#B4D333] blur-xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {{ currentLanguage === 'es' ? '¿Por qué trabajar conmigo?' : 'Why work with me?' }}
        </h2>
        <p class="text-xl text-[#B4D333] max-w-2xl mx-auto">
          {{ currentLanguage === 'es' 
            ? 'No solo escribo código, creo soluciones que generan resultados reales' 
            : 'I don\'t just write code, I create solutions that generate real results' }}
        </p>
        <div class="w-24 h-1 bg-[#C5D946] mx-auto mt-6"></div>
      </div>

      <!-- Cards -->
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Card 1: Entrega Rápida -->
        <article class="card group bg-white dark:bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl dark:hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-white/20">
          <div class="icon-3d mb-6">
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B4D333] to-[#3FA35B] flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
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
              <span class="text-[#3FA35B] dark:text-[#B4D333] mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'Metodología Scrum' : 'Scrum Methodology' }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#3FA35B] dark:text-[#B4D333] mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'CI/CD automatizado' : 'Automated CI/CD' }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#3FA35B] dark:text-[#B4D333] mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'Testing integrado' : 'Integrated Testing' }}</span>
            </li>
          </ul>
        </article>

        <!-- Card 2: Resultados Medibles -->
        <article class="card group bg-white dark:bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl dark:hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-white/20">
          <div class="icon-3d mb-6">
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3FA35B] to-[#0A3D3D] flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
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
              <span class="text-[#3FA35B] dark:text-[#B4D333] mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'Mobile First' : 'Mobile First' }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#3FA35B] dark:text-[#B4D333] mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'SEO optimizado' : 'SEO Optimized' }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#3FA35B] dark:text-[#B4D333] mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'Analytics integrado' : 'Integrated Analytics' }}</span>
            </li>
          </ul>
        </article>

        <!-- Card 3: Comunicación Clara -->
        <article class="card group bg-white dark:bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl dark:hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-white/20">
          <div class="icon-3d mb-6">
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C5D946] to-[#3FA35B] flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
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
              <span class="text-[#3FA35B] dark:text-[#B4D333] mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'Reportes diarios' : 'Daily Reports' }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#3FA35B] dark:text-[#B4D333] mt-1">✓</span>
              <span>{{ currentLanguage === 'es' ? 'Docs técnica completa' : 'Complete Tech Docs' }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#3FA35B] dark:text-[#B4D333] mt-1">✓</span>
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
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Zap, Target, MessageSquare } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useGSAP } from '../composables/useGSAP'

const { currentLanguage } = useLanguage()
const container = ref(null)

useGSAP(container)
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  /* Optimización: Usar will-change solo en hover */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  will-change: transform;
}

/* Efecto shine optimizado - solo opacity y transform */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  transition: transform 0.5s ease;
  z-index: 1;
  /* GPU acceleration */
  transform: translateZ(0);
}

.card:hover::before {
  transform: translateX(200%);
}

/* Efecto 3D optimizado en iconos */
.icon-3d > div {
  /* Reducir sombras de 3 a 1 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  /* GPU acceleration */
  transform: translateZ(0);
}

.icon-3d > div:hover {
  will-change: transform;
}

.card:hover .icon-3d > div {
  /* Simplificar transform - solo scale y rotate 2D */
  transform: scale(1.08) rotate(4deg);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

/* Animación de entrada optimizada */
@keyframes float-in {
  from {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.card {
  animation: float-in 0.5s ease-out backwards;
  /* GPU acceleration */
  transform: translateZ(0);
}

.card:nth-child(1) {
  animation-delay: 0.08s;
}

.card:nth-child(2) {
  animation-delay: 0.16s;
}

.card:nth-child(3) {
  animation-delay: 0.24s;
}
</style>
