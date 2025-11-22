<script setup lang="ts">
import { computed } from 'vue'
import { Mail, Linkedin, Instagram, Github } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const contactEmail = computed(() => {
  const email = useLanguage().cvData.value?.email
  return email ?? ''
})
</script>

<template>
  <section id="contact" class="section py-20 text-gray-900 dark:text-white relative overflow-hidden bg-gradient-to-br from-green-50 to-white dark:from-[#0A3D3D] dark:to-[#3FA35B]">
    <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#3FA35B]/10 dark:bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-[#B4D333]/10 dark:bg-white/10 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">{{ useLanguage().t.value.getInTouch }}</h2>
        <p class="text-xl max-w-2xl mx-auto text-gray-600 dark:text-[#B4D333]">
          {{ useLanguage().t.value.contactDescription }}
        </p>
        <div class="w-24 h-1 mx-auto mt-4 bg-[#3FA35B] dark:bg-[#C5D946]"></div>
      </div>

      <div class="max-w-4xl mx-auto">
        <article class="card bg-white dark:bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 dark:border-white/20 shadow-xl">
          <h3 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{{ useLanguage().t.value.contactInfo }}</h3>
          
          <div class="grid md:grid-cols-2 gap-4">
            <a
              :href="`mailto:${contactEmail}`"
              class="flex items-center gap-4 p-5 bg-gray-50 dark:bg-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group focus:outline-none focus-ring border border-gray-200 dark:border-white/10"
              :aria-label="`Email: ${contactEmail}`"
            >
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3FA35B] to-[#0A3D3D] flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Mail class="h-7 w-7 text-white" aria-hidden="true" strokeWidth="2.5" />
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-white">Email</div>
                <div class="text-gray-600 dark:text-blue-100">{{ contactEmail }}</div>
              </div>
            </a>

            <a
              v-if="useLanguage().cvData.value?.linkedin"
              :href="useLanguage().cvData.value.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-5 bg-gray-50 dark:bg-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group focus:outline-none focus-ring border border-gray-200 dark:border-white/10"
              :aria-label="`LinkedIn profile of ${useLanguage().cvData.value?.name}`"
            >
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A3D3D] to-[#3FA35B] flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Linkedin class="h-7 w-7 text-white" aria-hidden="true" strokeWidth="2.5" />
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-white">LinkedIn</div>
                <div class="text-gray-600 dark:text-blue-100">View Profile</div>
              </div>
            </a>

            <a
              href="https://github.com/IrvinngB"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-5 bg-gray-50 dark:bg-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group focus:outline-none focus-ring border border-gray-200 dark:border-white/10"
              aria-label="GitHub profile"
            >
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B4D333] to-[#C5D946] flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Github class="h-7 w-7 text-white" aria-hidden="true" strokeWidth="2.5" />
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-white">GitHub</div>
                <div class="text-gray-600 dark:text-blue-100">View Repositories</div>
              </div>
            </a>

            <a
              href="https://www.instagram.com/_irvin.gg/?igsh=dm9waHk2bmdzYmYy"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-5 bg-gray-50 dark:bg-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group focus:outline-none focus-ring border border-gray-200 dark:border-white/10"
              aria-label="Instagram profile @_irvin.gg"
            >
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C5D946] to-[#3FA35B] flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Instagram class="h-7 w-7 text-white" aria-hidden="true" strokeWidth="2.5" />
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-white">Instagram</div>
                <div class="text-gray-600 dark:text-blue-100">@_irvin.gg</div>
              </div>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.focus-ring:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
  border-radius: 8px;
}
</style>
