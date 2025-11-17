<template>
  <section id="about-me" class="section py-20 bg-white dark:bg-[#1f2937]">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Contenido Principal -->
          <div class="order-2 lg:order-1">
            <div class="mb-6">
              <span class="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 text-[#3FA35B] dark:text-[#B4D333] bg-[#3FA35B]/10 dark:bg-[#B4D333]/10">
                {{ currentLanguage === 'es' ? 'Sobre Mí' : 'About Me' }}
              </span>
              <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {{ currentLanguage === 'es' 
                  ? 'Más allá del código' 
                  : 'Beyond the code' }}
              </h2>
            </div>

            <div class="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                {{ currentLanguage === 'es'
                  ? 'Soy un desarrollador Full Stack apasionado por crear soluciones que realmente importen. No solo escribo código, construyo experiencias digitales que resuelven problemas reales y mejoran la vida de las personas.'
                  : 'I\'m a Full Stack developer passionate about creating solutions that truly matter. I don\'t just write code, I build digital experiences that solve real problems and improve people\'s lives.' }}
              </p>
              
              <p>
                {{ currentLanguage === 'es'
                  ? 'Mi enfoque va más allá de la implementación técnica: me preocupo por el rendimiento, la accesibilidad, la escalabilidad y la experiencia del usuario. Cada proyecto es una oportunidad para aprender algo nuevo y superar los límites de lo posible.'
                  : 'My approach goes beyond technical implementation: I care about performance, accessibility, scalability and user experience. Every project is an opportunity to learn something new and push the boundaries of what\'s possible.' }}
              </p>

              <p>
                {{ currentLanguage === 'es'
                  ? 'Cuando no estoy programando, me encontrarás explorando nuevas tecnologías, trabajando en proyectos personales o escuchando música.'
                  : 'When I\'m not coding, you\'ll find me exploring new technologies, working on personal projects, or listening to music.' }}
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
                    {{ currentLanguage === 'es' ? 'Lo que me motiva' : 'What drives me' }}
                  </h3>
                  <p class="text-gray-700 dark:text-gray-300">
                    {{ currentLanguage === 'es'
                      ? 'Ver cómo mi código mejora la vida de las personas. Cada línea que escribo es una oportunidad para hacer el mundo digital un poco mejor, más rápido y más accesible.'
                      : 'Seeing how my code improves people\'s lives. Every line I write is an opportunity to make the digital world a little better, faster and more accessible.' }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Valores y Fortalezas -->
          <div class="order-1 lg:order-2">
            <div class="space-y-6">
              <!-- Valor 1 -->
              <div class="group card bg-gray-50 dark:bg-[#0A3D3D] rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div class="flex items-start gap-4">
                  <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3FA35B] to-[#B4D333] flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Rocket class="w-7 h-7 text-white" strokeWidth="2.5" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {{ currentLanguage === 'es' ? 'Innovación Constante' : 'Constant Innovation' }}
                    </h4>
                    <p class="text-gray-700 dark:text-gray-300">
                      {{ currentLanguage === 'es'
                        ? 'Siempre explorando nuevas tecnologías y mejores prácticas. Me mantengo actualizado con las últimas tendencias del desarrollo web.'
                        : 'Always exploring new technologies and best practices. I stay updated with the latest web development trends.' }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Valor 2 -->
              <div class="group card bg-gray-50 dark:bg-[#0A3D3D] rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div class="flex items-start gap-4">
                  <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B4D333] to-[#C5D946] flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Target class="w-7 h-7 text-white" strokeWidth="2.5" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {{ currentLanguage === 'es' ? 'Orientado a Resultados' : 'Results Oriented' }}
                    </h4>
                    <p class="text-gray-700 dark:text-gray-300">
                      {{ currentLanguage === 'es'
                        ? 'El código debe resolver problemas, no crearlos. Me enfoco en entregar soluciones que generen valor real y medible.'
                        : 'Code should solve problems, not create them. I focus on delivering solutions that generate real and measurable value.' }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Valor 3 -->
              <div class="group card bg-gray-50 dark:bg-[#0A3D3D] rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div class="flex items-start gap-4">
                  <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C5D946] to-[#3FA35B] flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Users class="w-7 h-7 text-white" strokeWidth="2.5" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {{ currentLanguage === 'es' ? 'Trabajo en Equipo' : 'Teamwork' }}
                    </h4>
                    <p class="text-gray-700 dark:text-gray-300">
                      {{ currentLanguage === 'es'
                        ? 'Colaboración y comunicación clara son clave. Disfruto trabajar con equipos multidisciplinarios y compartir conocimiento.'
                        : 'Collaboration and clear communication are key. I enjoy working with multidisciplinary teams and sharing knowledge.' }}
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
import { Lightbulb, Rocket, Target, Users } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useGSAP } from '../composables/useGSAP'

const { currentLanguage } = useLanguage()

useGSAP()
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
