<template>
  <section
    id="contact"
    ref="container"
    class="reveal-section section py-12 sm:py-16 lg:py-20 bg-bg relative overflow-hidden"
    aria-labelledby="contact-heading"
  >
    <!-- Sticker -->
    <div class="sticker sticker-float bottom-16 left-[5%] w-10 h-10" style="animation-delay: 0.9s;">
      <div class="sticker-shape w-full h-full bg-accent-pink rotate-[-16deg]"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <h2 id="contact-heading" class="text-h1 mb-4">
          {{ t.getInTouch }}
        </h2>
        <p class="text-body-lg text-fg-soft max-w-2xl mx-auto">
          {{ t.contactDescription }}
        </p>
      </div>

      <div class="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8">
        <!-- Contact Form -->
        <article class="reveal-child brutal-card p-5 sm:p-8">
          <h3 class="text-h2 mb-6">
            {{ currentLanguage === 'es' ? 'Envíame un mensaje' : 'Send me a message' }}
          </h3>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label for="name" class="block text-label text-fg-soft mb-2">
                {{ currentLanguage === 'es' ? 'Nombre' : 'Name' }}
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                :placeholder="currentLanguage === 'es' ? 'Tu nombre' : 'Your name'"
                class="w-full px-4 py-3 border-2 border-border rounded-btn bg-surface text-fg placeholder:text-fg-soft placeholder:opacity-40 focus:outline-none focus:border-accent-yellow transition-colors"
              />
            </div>

            <div>
              <label for="email" class="block text-label text-fg-soft mb-2">
                Email
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                :placeholder="currentLanguage === 'es' ? 'tu@email.com' : 'your@email.com'"
                class="w-full px-4 py-3 border-2 border-border rounded-btn bg-surface text-fg placeholder:text-fg-soft placeholder:opacity-40 focus:outline-none focus:border-accent-yellow transition-colors"
              />
            </div>

            <div>
              <label for="message" class="block text-label text-fg-soft mb-2">
                {{ currentLanguage === 'es' ? 'Mensaje' : 'Message' }}
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="4"
                :placeholder="currentLanguage === 'es' ? 'Cuéntame sobre tu proyecto...' : 'Tell me about your project...'"
                class="w-full px-4 py-3 border-2 border-border rounded-btn bg-surface text-fg placeholder:text-fg-soft placeholder:opacity-40 focus:outline-none focus:border-accent-yellow transition-colors resize-none"
              ></textarea>
            </div>

            <!-- Status messages -->
            <div v-if="formStatus === 'success'" class="flex items-center gap-2 text-fg bg-accent-yellow border-2 border-border p-3 rounded-btn">
              <CheckCircle class="w-5 h-5" />
              <span class="text-body-md font-semibold">{{ currentLanguage === 'es' ? '¡Mensaje enviado correctamente!' : 'Message sent successfully!' }}</span>
            </div>

            <div v-if="formStatus === 'error'" class="flex items-center gap-2 text-surface bg-accent-pink border-2 border-border p-3 rounded-btn">
              <AlertCircle class="w-5 h-5" />
              <span class="text-body-md font-semibold">{{ errorMessage }}</span>
            </div>

            <button
              type="submit"
              :disabled="formStatus === 'loading'"
              class="btn-primary w-full px-6 py-3 text-btn flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

        <!-- Contact Info -->
        <article
          class="reveal-child brutal-card p-5 sm:p-8"
          style="transition-delay: 60ms"
        >
          <h3 class="text-h2 mb-6">{{ t.contactInfo }}</h3>

          <div class="space-y-3">
            <!-- Email -->
            <a
              :href="`mailto:${contactEmail}`"
              class="flex items-center gap-3 p-4 rounded-card border-2 border-border bg-bg hover:bg-surface transition-colors"
              :aria-label="`Email: ${contactEmail}`"
            >
              <div class="w-10 h-10 bg-accent-pink rounded-btn flex items-center justify-center flex-shrink-0 border-2 border-border">
                <Mail class="h-5 w-5 text-surface" aria-hidden="true" strokeWidth="2" />
              </div>
              <div>
                <div class="text-label text-fg">Email</div>
                <div class="text-body-md">{{ contactEmail }}</div>
              </div>
            </a>

            <!-- LinkedIn -->
            <a
              v-if="cvData?.linkedin"
              :href="cvData.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-4 rounded-card border-2 border-border bg-bg hover:bg-surface transition-colors"
              :aria-label="`LinkedIn profile of ${cvData?.name}`"
            >
              <div class="w-10 h-10 bg-accent-blue rounded-btn flex items-center justify-center flex-shrink-0 border-2 border-border">
                <Linkedin class="h-5 w-5 text-surface" aria-hidden="true" strokeWidth="2" />
              </div>
              <div>
                <div class="text-label text-fg">LinkedIn</div>
                <div class="text-body-md">{{ currentLanguage === 'es' ? 'Ver perfil' : 'View Profile' }}</div>
              </div>
            </a>

            <!-- GitHub -->
            <a
              v-if="cvData?.github"
              :href="cvData.github"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-4 rounded-card border-2 border-border bg-bg hover:bg-surface transition-colors"
              aria-label="GitHub profile"
            >
              <div class="w-10 h-10 bg-fg rounded-btn flex items-center justify-center flex-shrink-0 border-2 border-border">
                <Github class="h-5 w-5 text-surface" aria-hidden="true" strokeWidth="2" />
              </div>
              <div>
                <div class="text-label text-fg">GitHub</div>
                <div class="text-body-md">{{ currentLanguage === 'es' ? 'Ver repositorios' : 'View Repositories' }}</div>
              </div>
            </a>

            <!-- Instagram -->
            <a
              v-if="cvData?.instagram"
              :href="cvData.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-4 rounded-card border-2 border-border bg-bg hover:bg-surface transition-colors"
              aria-label="Instagram profile"
            >
              <div class="w-10 h-10 bg-accent-pink rounded-btn flex items-center justify-center flex-shrink-0 border-2 border-border">
                <Instagram class="h-5 w-5 text-surface" aria-hidden="true" strokeWidth="2" />
              </div>
              <div>
                <div class="text-label text-fg">Instagram</div>
                <div class="text-body-md">@_irvin.gg</div>
              </div>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Mail, Linkedin, Instagram, Github, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'

const { t, cvData, currentLanguage } = useLanguage()
const container = ref<HTMLElement>()

const { observe } = useScrollReveal()

onMounted(() => {
  if (container.value) observe(container.value)
})

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

<style scoped>
.reveal-section .reveal-child {
  opacity: 0;
  transform: translateY(16px);
}

.reveal-section.is-visible .reveal-child {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease,
              transform 0.6s ease;
}
</style>
