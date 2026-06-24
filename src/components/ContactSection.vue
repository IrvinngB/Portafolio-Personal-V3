<template>
  <section
    id="contact"
    ref="container"
    class="crt-scanlines py-16 sm:py-20 lg:py-28"
    aria-labelledby="contact-heading"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="text-center mb-14 sm:mb-20">
        <h1 id="contact-heading" class="text-h1 glow-pulse">
          [ INICIAR COMUNICACIÓN ]
        </h1>
      </div>

      <div class="max-w-4xl mx-auto grid lg:grid-cols-2 gap-6">
        <!-- Contact Form -->
        <div class="reveal-child crt-panel">
          <div class="crt-header">[FORMULARIO DE CONTACTO]─────────────────────</div>

          <form @submit.prevent="handleSubmit" class="space-y-5 mt-4">
            <div>
              <label for="name" class="crt-prompt text-label block mb-2">> NOMBRE:</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                :placeholder="currentLanguage === 'es' ? 'Tu nombre' : 'Your name'"
                class="bg-transparent border-b border-phosphor-dim text-phosphor w-full py-2 font-mono focus:border-phosphor focus:outline-none placeholder:text-phosphor-dim/50"
              />
            </div>

            <div>
              <label for="email" class="crt-prompt text-label block mb-2">> EMAIL:</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                :placeholder="currentLanguage === 'es' ? 'tu@email.com' : 'your@email.com'"
                class="bg-transparent border-b border-phosphor-dim text-phosphor w-full py-2 font-mono focus:border-phosphor focus:outline-none placeholder:text-phosphor-dim/50"
              />
            </div>

            <div>
              <label for="message" class="crt-prompt text-label block mb-2">> MENSAJE:</label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="4"
                :placeholder="currentLanguage === 'es' ? 'Cuéntame sobre tu proyecto...' : 'Tell me about your project...'"
                class="bg-transparent border-b border-phosphor-dim text-phosphor w-full py-2 font-mono resize-none focus:border-phosphor focus:outline-none placeholder:text-phosphor-dim/50"
              ></textarea>
            </div>

            <!-- Status messages -->
            <div v-if="formStatus === 'success'" class="crt-panel border-phosphor">
              <p class="crt-prompt text-body">> MENSAJE ENVIADO CORRECTAMENTE.</p>
            </div>

            <div v-if="formStatus === 'error'" class="crt-panel" style="border-color: var(--error); box-shadow: 0 0 8px rgba(255,51,51,0.2);">
              <p class="text-body" style="color: var(--error);">> ERROR: {{ errorMessage }}</p>
            </div>

            <button
              type="submit"
              :disabled="formStatus === 'loading'"
              class="crt-link text-label mt-4 focus:outline-none focus-visible:outline-1 focus-visible:outline-phosphor disabled:opacity-50"
            >
              > {{ formStatus === 'loading'
                ? (currentLanguage === 'es' ? 'ENVIANDO...' : 'SENDING...')
                : (currentLanguage === 'es' ? 'ENVIAR MENSAJE' : 'SEND MESSAGE')
              }}
            </button>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="reveal-child crt-panel" style="transition-delay: 60ms">
          <div class="crt-header">[INFORMACIÓN DE CONTACTO]─────────────────────</div>

          <div class="space-y-3 mt-4">
            <p class="crt-prompt text-data">> EMAIL: {{ contactEmail }}</p>
            <p v-if="cvData?.linkedin" class="text-data crt-link">
              > LINKEDIN: {{ cvData.linkedin }}
            </p>
            <p v-if="cvData?.github" class="text-data crt-link">
              > GITHUB: {{ cvData.github }}
            </p>
            <p v-if="cvData?.instagram" class="text-data crt-link">
              > INSTAGRAM: {{ cvData.instagram }}
            </p>
            <p class="text-data text-phosphor-dim">> TEL: {{ cvData?.phone }}</p>
            <p class="text-data text-phosphor-dim">> LOC: {{ cvData?.location }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'

const { cvData, currentLanguage } = useLanguage()
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
.reveal-child {
  opacity: 0;
}

.is-visible .reveal-child {
  opacity: 1;
  transition: opacity 0.6s ease;
}
</style>
