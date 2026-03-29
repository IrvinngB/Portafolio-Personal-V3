<template>
  <section id="certifications" ref="container" class="section py-20 relative overflow-hidden bg-transparent">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="parallax absolute top-0 right-10 w-80 h-80 rounded-full blur-3xl opacity-40 bg-primary/20"></div>
      <div class="parallax absolute bottom-0 left-10 w-80 h-80 rounded-full blur-3xl opacity-40 bg-primary-light/20"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="text-center mb-16 relative z-10">
        <div class="flex items-center gap-2 justify-center mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
            <Sparkles class="w-5 h-5 text-white" aria-hidden="true" />
          </div>
        </div>
        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
            {{ currentLanguage === 'es' ? 'Certificaciones & Logros' : 'Certifications & Achievements' }}
          </span>
        </h2>
        <p class="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8 px-2 leading-relaxed">
          {{ currentLanguage === 'es' 
            ? 'Credenciales y logros que validan mi experiencia profesional' 
            : 'Credentials and achievements that validate my professional experience' }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <!-- Certificación 1 -->
        <article class="premium-card group bg-gray-50 dark:bg-[#1f2937] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0">
              <Award class="w-8 h-8 text-white" strokeWidth="2.5" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
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
            <span class="text-xs font-semibold text-primary dark:text-primary-light">2024</span>
            <button class="text-xs font-medium text-primary dark:text-primary-light hover:underline flex items-center gap-1">
              <ExternalLink class="w-3 h-3" />
              {{ currentLanguage === 'es' ? 'Ver credencial' : 'View credential' }}
            </button>
          </div>
        </article>

        <!-- Certificación 2 -->
        <article class="premium-card group bg-gray-50 dark:bg-[#1f2937] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-light to-primary-accent flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0">
              <Shield class="w-8 h-8 text-white" strokeWidth="2.5" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
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
            <span class="text-xs font-semibold text-primary dark:text-primary-light">2023</span>
            <button class="text-xs font-medium text-primary dark:text-primary-light hover:underline flex items-center gap-1">
              <ExternalLink class="w-3 h-3" />
              {{ currentLanguage === 'es' ? 'Ver credencial' : 'View credential' }}
            </button>
          </div>
        </article>

        <!-- Certificación 3 -->
        <article class="premium-card group bg-gray-50 dark:bg-[#1f2937] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-accent to-primary flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0">
              <Code class="w-8 h-8 text-white" strokeWidth="2.5" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
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
            <span class="text-xs font-semibold text-primary dark:text-primary-light">2024</span>
            <button class="text-xs font-medium text-primary dark:text-primary-light hover:underline flex items-center gap-1">
              <ExternalLink class="w-3 h-3" />
              {{ currentLanguage === 'es' ? 'Ver credencial' : 'View credential' }}
            </button>
          </div>
        </article>

        <!-- Badge 1: GitHub Contributions -->
        <article class="premium-card group bg-gradient-to-br from-primary/10 to-primary-light/10 dark:from-primary/20 dark:to-primary-light/20 rounded-2xl p-6 border-2 border-primary/30 hover:border-primary transition-all duration-300 transform hover:-translate-y-2">
          <div class="text-center">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-300">
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
        <article class="premium-card group bg-gradient-to-br from-primary-light/10 to-primary-accent/10 dark:from-primary-light/20 dark:to-primary-accent/20 rounded-2xl p-6 border-2 border-primary-light/30 hover:border-primary-light transition-all duration-300 transform hover:-translate-y-2">
          <div class="text-center">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-light to-primary-accent flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-300">
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
import { Award, Shield, Code, ExternalLink, Github, CheckCircle, Sparkles } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useGSAP } from '../composables/useGSAP'

const { currentLanguage } = useLanguage()
const container = ref(null)

useGSAP(container)
</script>


