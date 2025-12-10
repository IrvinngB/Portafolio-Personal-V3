<script setup lang="ts">
import { ref, computed } from 'vue'
import { Mail, Linkedin, Instagram, Github, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'

const { t, cvData, currentLanguage } = useLanguage()

const contactEmail = computed(() => cvData.value?.email ?? '')

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const formStatus = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const handleSubmit = async () => {
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    formStatus.value = 'error'
    errorMessage.value = currentLanguage.value === 'es' 
      ? 'Por favor completa todos los campos' 
      : 'Please fill in all fields'
    return
  }

  formStatus.value = 'loading'

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
        name: formData.value.name,
        email: formData.value.email,
        message: formData.value.message,
        from_name: 'Portfolio Contact Form',
        subject: `New message from ${formData.value.name}`
      })
    })

    const result = await response.json()

    if (result.success) {
      formStatus.value = 'success'
      formData.value = { name: '', email: '', message: '' }
      setTimeout(() => { formStatus.value = 'idle' }, 5000)
    } else {
      throw new Error(result.message || 'Error sending message')
    }
  } catch {
    formStatus.value = 'error'
    errorMessage.value = currentLanguage.value === 'es'
      ? 'Error al enviar el mensaje. Intenta de nuevo.'
      : 'Error sending message. Please try again.'
  }
}
</script>

<template>
  <section id="contact" class="section py-20 text-gray-900 dark:text-white relative overflow-hidden bg-gradient-to-br from-green-50 to-white dark:from-[#0A3D3D] dark:to-[#3FA35B]">
    <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#3FA35B]/10 dark:bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-[#B4D333]/10 dark:bg-white/10 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">{{ useLanguage().t.value.getInTouch }}</h2>
        <p class="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-gray-600 dark:text-[#B4D333] px-2">
          {{ useLanguage().t.value.contactDescription }}
        </p>
        <div class="w-24 h-1 mx-auto mt-4 bg-[#3FA35B] dark:bg-[#C5D946]"></div>
      </div>

      <div class="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8">
        <!-- Formulario de contacto -->
        <article class="card bg-white dark:bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-8 border border-gray-100 dark:border-white/20 shadow-xl">
          <h3 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
            {{ currentLanguage === 'es' ? 'Envíame un mensaje' : 'Send me a message' }}
          </h3>
          
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ currentLanguage === 'es' ? 'Nombre' : 'Name' }}
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                :placeholder="currentLanguage === 'es' ? 'Tu nombre' : 'Your name'"
                class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3FA35B] focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                :placeholder="currentLanguage === 'es' ? 'tu@email.com' : 'your@email.com'"
                class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3FA35B] focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ currentLanguage === 'es' ? 'Mensaje' : 'Message' }}
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="4"
                :placeholder="currentLanguage === 'es' ? 'Cuéntame sobre tu proyecto...' : 'Tell me about your project...'"
                class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3FA35B] focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>

            <!-- Status messages -->
            <div v-if="formStatus === 'success'" class="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <CheckCircle class="w-5 h-5" />
              <span>{{ currentLanguage === 'es' ? '¡Mensaje enviado correctamente!' : 'Message sent successfully!' }}</span>
            </div>
            
            <div v-if="formStatus === 'error'" class="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <AlertCircle class="w-5 h-5" />
              <span>{{ errorMessage }}</span>
            </div>

            <button
              type="submit"
              :disabled="formStatus === 'loading'"
              class="w-full px-6 py-3 bg-gradient-to-r from-[#3FA35B] to-[#B4D333] text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              <Loader2 v-if="formStatus === 'loading'" class="w-5 h-5 animate-spin" />
              <Send v-else class="w-5 h-5" />
              {{ formStatus === 'loading' 
                ? (currentLanguage === 'es' ? 'Enviando...' : 'Sending...') 
                : (currentLanguage === 'es' ? 'Enviar mensaje' : 'Send message') 
              }}
            </button>
          </form>
        </article>

        <!-- Información de contacto -->
        <article class="card bg-white dark:bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-8 border border-gray-100 dark:border-white/20 shadow-xl">
          <h3 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">{{ t.contactInfo }}</h3>
          
          <div class="space-y-4">
            <a
              :href="`mailto:${contactEmail}`"
              class="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 dark:bg-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group focus:outline-none focus-ring border border-gray-200 dark:border-white/10"
              :aria-label="`Email: ${contactEmail}`"
            >
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#3FA35B] to-[#0A3D3D] flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0">
                <Mail class="h-7 w-7 text-white" aria-hidden="true" strokeWidth="2.5" />
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-white">Email</div>
                <div class="text-gray-600 dark:text-gray-300">{{ contactEmail }}</div>
              </div>
            </a>

            <a
              v-if="cvData?.linkedin"
              :href="cvData.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 dark:bg-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group focus:outline-none focus-ring border border-gray-200 dark:border-white/10"
              :aria-label="`LinkedIn profile of ${cvData?.name}`"
            >
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#0A3D3D] to-[#3FA35B] flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0">
                <Linkedin class="h-7 w-7 text-white" aria-hidden="true" strokeWidth="2.5" />
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-white">LinkedIn</div>
                <div class="text-gray-600 dark:text-gray-300">{{ currentLanguage === 'es' ? 'Ver perfil' : 'View Profile' }}</div>
              </div>
            </a>

            <a
              href="https://github.com/IrvinngB"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 dark:bg-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group focus:outline-none focus-ring border border-gray-200 dark:border-white/10"
              aria-label="GitHub profile"
            >
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#B4D333] to-[#C5D946] flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0">
                <Github class="h-7 w-7 text-white" aria-hidden="true" strokeWidth="2.5" />
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-white">GitHub</div>
                <div class="text-gray-600 dark:text-gray-300">{{ currentLanguage === 'es' ? 'Ver repositorios' : 'View Repositories' }}</div>
              </div>
            </a>

            <a
              href="https://www.instagram.com/_irvin.gg/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 dark:bg-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group focus:outline-none focus-ring border border-gray-200 dark:border-white/10"
              aria-label="Instagram profile @_irvin.gg"
            >
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#C5D946] to-[#3FA35B] flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex-shrink-0">
                <Instagram class="h-7 w-7 text-white" aria-hidden="true" strokeWidth="2.5" />
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-white">Instagram</div>
                <div class="text-gray-600 dark:text-gray-300">@_irvin.gg</div>
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
