<template>
  <section id="certifications" ref="container" class="section py-20 bg-gradient-to-br from-gray-50 to-white dark:from-[#0A3D3D] dark:to-[#1f2937]">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ currentLanguage === 'es' ? 'Certificaciones & Logros' : 'Certifications & Achievements' }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ currentLanguage === 'es' 
            ? 'Credenciales y logros que validan mi experiencia profesional' 
            : 'Credentials and achievements that validate my professional experience' }}
        </p>
        <div class="w-24 h-1 mx-auto mt-4 bg-gradient-to-r from-[#3FA35B] to-[#B4D333]"></div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <!-- Certificación 1 -->
        <article class="cert-card group bg-white dark:bg-[#1f2937] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3FA35B] to-[#0A3D3D] flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0">
              <Award class="w-8 h-8 text-white" strokeWidth="2.5" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#3FA35B] dark:group-hover:text-[#B4D333] transition-colors">
                Vue.js Certified Developer
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Vue School</p>
            </div>
          </div>
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
            {{ currentLanguage === 'es' 
              ? 'Certificación avanzada en Vue 3, Composition API y mejores prácticas.' 
              : 'Advanced certification in Vue 3, Composition API and best practices.' }}
          </p>
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-[#3FA35B] dark:text-[#B4D333]">2024</span>
            <button class="text-xs font-medium text-[#3FA35B] dark:text-[#B4D333] hover:underline flex items-center gap-1">
              <ExternalLink class="w-3 h-3" />
              {{ currentLanguage === 'es' ? 'Ver credencial' : 'View credential' }}
            </button>
          </div>
        </article>

        <!-- Certificación 2 -->
        <article class="cert-card group bg-white dark:bg-[#1f2937] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B4D333] to-[#C5D946] flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0">
              <Shield class="w-8 h-8 text-white" strokeWidth="2.5" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#3FA35B] dark:group-hover:text-[#B4D333] transition-colors">
                Node.js Professional
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">OpenJS Foundation</p>
            </div>
          </div>
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
            {{ currentLanguage === 'es' 
              ? 'Desarrollo backend escalable con Node.js, Express y arquitecturas RESTful.' 
              : 'Scalable backend development with Node.js, Express and RESTful architectures.' }}
          </p>
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-[#3FA35B] dark:text-[#B4D333]">2023</span>
            <button class="text-xs font-medium text-[#3FA35B] dark:text-[#B4D333] hover:underline flex items-center gap-1">
              <ExternalLink class="w-3 h-3" />
              {{ currentLanguage === 'es' ? 'Ver credencial' : 'View credential' }}
            </button>
          </div>
        </article>

        <!-- Certificación 3 -->
        <article class="cert-card group bg-white dark:bg-[#1f2937] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C5D946] to-[#3FA35B] flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0">
              <Code class="w-8 h-8 text-white" strokeWidth="2.5" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#3FA35B] dark:group-hover:text-[#B4D333] transition-colors">
                TypeScript Advanced
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Microsoft Learn</p>
            </div>
          </div>
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
            {{ currentLanguage === 'es' 
              ? 'Tipos avanzados, generics, decoradores y patrones de diseño en TypeScript.' 
              : 'Advanced types, generics, decorators and design patterns in TypeScript.' }}
          </p>
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-[#3FA35B] dark:text-[#B4D333]">2024</span>
            <button class="text-xs font-medium text-[#3FA35B] dark:text-[#B4D333] hover:underline flex items-center gap-1">
              <ExternalLink class="w-3 h-3" />
              {{ currentLanguage === 'es' ? 'Ver credencial' : 'View credential' }}
            </button>
          </div>
        </article>

        <!-- Badge 1: GitHub Contributions -->
        <article class="cert-card group bg-gradient-to-br from-[#3FA35B]/10 to-[#B4D333]/10 dark:from-[#3FA35B]/20 dark:to-[#B4D333]/20 rounded-2xl p-6 border-2 border-[#3FA35B]/30 hover:border-[#3FA35B] transition-all duration-300 transform hover:-translate-y-2">
          <div class="text-center">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#3FA35B] to-[#B4D333] flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-300">
              <Github class="w-10 h-10 text-white" strokeWidth="2.5" />
            </div>
            <h3 class="text-2xl font-black text-gray-900 dark:text-white mb-2">500+</h3>
            <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {{ currentLanguage === 'es' ? 'Contribuciones en GitHub' : 'GitHub Contributions' }}
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {{ currentLanguage === 'es' ? 'Último año' : 'Last year' }}
            </p>
          </div>
        </article>

        <!-- Badge 2: Projects Completed -->
        <article class="cert-card group bg-gradient-to-br from-[#B4D333]/10 to-[#C5D946]/10 dark:from-[#B4D333]/20 dark:to-[#C5D946]/20 rounded-2xl p-6 border-2 border-[#B4D333]/30 hover:border-[#B4D333] transition-all duration-300 transform hover:-translate-y-2">
          <div class="text-center">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#B4D333] to-[#C5D946] flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-300">
              <CheckCircle class="w-10 h-10 text-white" strokeWidth="2.5" />
            </div>
            <h3 class="text-2xl font-black text-gray-900 dark:text-white mb-2">15+</h3>
            <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {{ currentLanguage === 'es' ? 'Proyectos Completados' : 'Projects Completed' }}
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {{ currentLanguage === 'es' ? 'Con éxito' : 'Successfully' }}
            </p>
          </div>
        </article>


      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Award, Shield, Code, ExternalLink, Github, CheckCircle } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useGSAP } from '../composables/useGSAP'

const { currentLanguage } = useLanguage()
const container = ref(null)

useGSAP(container)
</script>

<style scoped>
.cert-card {
  position: relative;
  overflow: hidden;
}

.cert-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(63, 163, 91, 0.1), transparent);
  transition: left 0.5s;
  z-index: 1;
}

.cert-card:hover::before {
  left: 100%;
}
</style>
