<template>
  <section
    id="contact"
    ref="container"
    class="reveal-section section py-12 sm:py-16 lg:py-20"
    aria-labelledby="contact-heading"
  >
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <div class="rule-thick mb-2 max-w-xs mx-auto"></div>
        <h2 id="contact-heading" class="text-h1 mb-4">{{ t.getInTouch }}</h2>
        <p class="text-deck max-w-2xl mx-auto">{{ t.contactDescription }}</p>
        <div class="rule-thin mt-4 max-w-xs mx-auto"></div>
      </div>

      <div class="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6">
        <!-- Contact Form -->
        <article class="reveal-child noir-card">
          <div class="rule-thin mb-6"></div>
          <h3 class="text-h2 mb-6">
            {{ currentLanguage === 'es' ? 'Envíame un mensaje' : 'Send me a message' }}
          </h3>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label for="name" class="block text-label mb-2">
                {{ currentLanguage === 'es' ? 'Nombre' : 'Name' }}
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                :placeholder="currentLanguage === 'es' ? 'Tu nombre' : 'Your name'"
                class="w-full py-3 bg-transparent border-b-2 border-ink text-ink placeholder:text-ink-faint focus:outline-none font-body text-base"
              />
            </div>

            <div>
              <label for="email" class="block text-label mb-2">Email</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                :placeholder="currentLanguage === 'es' ? 'tu@email.com' : 'your@email.com'"
                class="w-full py-3 bg-transparent border-b-2 border-ink text-ink placeholder:text-ink-faint focus:outline-none font-body text-base"
              />
            </div>

            <div>
              <label for="message" class="block text-label mb-2">
                {{ currentLanguage === 'es' ? 'Mensaje' : 'Message' }}
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="4"
                :placeholder="currentLanguage === 'es' ? 'Cuéntame sobre tu proyecto...' : 'Tell me about your project...'"
                class="w-full py-3 bg-transparent border-b-2 border-ink text-ink placeholder:text-ink-faint focus:outline-none font-body text-base resize-none"
              ></textarea>
            </div>

            <!-- Status messages -->
            <div v-if="formStatus === 'success'" class="flex items-center gap-2 p-3 border-2 border-ink">
              <CheckCircle class="w-5 h-5 text-ink" />
              <span class="text-body text-sm">{{ currentLanguage === 'es' ? '¡Mensaje enviado correctamente!' : 'Message sent successfully!' }}</span>
            </div>

            <div v-if="formStatus === 'error'" class="flex items-center gap-2 p-3 border-2 border-ink">
              <AlertCircle class="w-5 h-5 text-ink" />
              <span class="text-body text-sm">{{ errorMessage }}</span>
            </div>

            <button
              type="submit"
              :disabled="formStatus === 'loading'"
              class="noir-btn w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Loader2 v-if="formStatus === 'loading'" class="w-4 h-4 animate-spin" />
              <Send v-else class="w-4 h-4" />
              {{ formStatus === 'loading'
                ? (currentLanguage === 'es' ? 'Enviando...' : 'Sending...')
                : (currentLanguage === 'es' ? 'Enviar mensaje' : 'Send message')
              }}
            </button>
          </form>
        </article>

        <!-- Contact Info -->
        <article
          class="reveal-child noir-card"
          style="transition-delay: 60ms"
        >
          <div class="rule-thin mb-6"></div>
          <h3 class="text-h2 mb-6">{{ t.contactInfo }}</h3>

          <div class="space-y-3">
            <!-- Email -->
            <a
              :href="`mailto:${contactEmail}`"
              class="flex items-center gap-3 p-3 border-2 border-ink hover:bg-ink hover:text-paper transition-colors group"
              :aria-label="`Email: ${contactEmail}`"
            >
              <Mail class="w-5 h-5 flex-shrink-0 text-ink group-hover:text-paper" strokeWidth="2" />
              <div>
                <div class="text-label">Email</div>
                <div class="text-caption text-ink group-hover:text-paper">{{ contactEmail }}</div>
              </div>
            </a>

            <!-- LinkedIn -->
            <a
              v-if="cvData?.linkedin"
              :href="cvData.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-3 border-2 border-ink hover:bg-ink hover:text-paper transition-colors group"
              :aria-label="`LinkedIn profile of ${cvData?.name}`"
            >
              <Linkedin class="w-5 h-5 flex-shrink-0 text-ink group-hover:text-paper" strokeWidth="2" />
              <div>
                <div class="text-label">LinkedIn</div>
                <div class="text-caption text-ink group-hover:text-paper">{{ currentLanguage === 'es' ? 'Ver perfil' : 'View Profile' }}</div>
              </div>
            </a>

            <!-- GitHub -->
            <a
              v-if="cvData?.github"
              :href="cvData.github"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-3 border-2 border-ink hover:bg-ink hover:text-paper transition-colors group"
              aria-label="GitHub profile"
            >
              <Github class="w-5 h-5 flex-shrink-0 text-ink group-hover:text-paper" strokeWidth="2" />
              <div>
                <div class="text-label">GitHub</div>
                <div class="text-caption text-ink group-hover:text-paper">{{ currentLanguage === 'es' ? 'Ver repositorios' : 'View Repositories' }}</div>
              </div>
            </a>

            <!-- Instagram -->
            <a
              v-if="cvData?.instagram"
              :href="cvData.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-3 border-2 border-ink hover:bg-ink hover:text-paper transition-colors group"
              aria-label="Instagram profile"
            >
              <Instagram class="w-5 h-5 flex-shrink-0 text-ink group-hover:text-paper" strokeWidth="2" />
              <div>
                <div class="text-label">Instagram</div>
                <div class="text-caption text-ink group-hover:text-paper">@_irvin.gg</div>
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
  transition: opacity 0.6s ease, transform 0.6s ease;
}
</style>
