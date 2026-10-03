<template>
  <section
    id="contact"
    ref="container"
    class="reveal-section section py-16 sm:py-20 lg:py-28"
    aria-labelledby="contact-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
      <SectionHeader
        :eyebrow="t.contact"
        :title="heading"
        heading-id="contact-heading"
      />

      <div class="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <!-- CTA + direct channels -->
        <div class="reveal-child lg:col-span-5 flex flex-col">
          <p class="text-body-lg text-fg-soft">{{ t.contactDescription }}</p>

          <!-- Primary channel: email with copy -->
          <p class="text-label-md text-muted mt-8 mb-3">
            {{ currentLanguage === 'es' ? 'Escríbeme directo' : 'Email me directly' }}
          </p>
          <div class="email-row">
            <a :href="`mailto:${contactEmail}`" class="email-link">
              <Mail class="w-5 h-5 text-accent flex-shrink-0" aria-hidden="true" />
              <span class="truncate">{{ contactEmail }}</span>
            </a>
            <button
              type="button"
              class="copy-btn"
              :aria-label="currentLanguage === 'es' ? 'Copiar email' : 'Copy email'"
              @click="copyEmail"
            >
              <Check v-if="copied" class="w-4 h-4 text-accent" aria-hidden="true" />
              <Copy v-else class="w-4 h-4" aria-hidden="true" />
            </button>
            <span class="sr-only" aria-live="polite">
              {{ copied ? (currentLanguage === 'es' ? 'Email copiado' : 'Email copied') : '' }}
            </span>
          </div>

          <!-- Secondary channels as plain text links -->
          <ul class="flex flex-wrap gap-x-6 gap-y-1 mt-6">
            <li v-for="link in socials" :key="link.label">
              <a :href="link.href" target="_blank" rel="noopener noreferrer" class="text-link">
                {{ link.label }}
                <ArrowUpRight class="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </li>
          </ul>

          <RouterLink v-if="showFreelanceLink" to="/freelance" class="freelance-link group">
            {{ currentLanguage === 'es' ? '¿Proyecto freelance? Mira cómo trabajo' : 'Freelance project? See how I work' }}
            <ArrowRight class="w-4 h-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden="true" />
          </RouterLink>
        </div>

        <!-- Contact Form -->
        <article
          class="reveal-child lg:col-span-7 bg-surface-container rounded-xxl p-5 sm:p-8 border border-border"
          style="transition-delay: 80ms"
        >
          <h3 class="text-h2 text-fg mb-6">
            {{ currentLanguage === 'es' ? 'Envíame un mensaje' : 'Send me a message' }}
          </h3>

          <form @submit.prevent="handleSubmit" class="space-y-5" novalidate>
            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label for="name" class="block text-label-md text-fg-soft mb-2">
                  {{ currentLanguage === 'es' ? 'Nombre' : 'Name' }}
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                  :placeholder="currentLanguage === 'es' ? 'Tu nombre' : 'Your name'"
                  class="field"
                />
              </div>

              <div>
                <label for="email" class="block text-label-md text-fg-soft mb-2">Email</label>
                <input
                  id="email"
                  v-model="formData.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  :placeholder="currentLanguage === 'es' ? 'tu@email.com' : 'your@email.com'"
                  class="field"
                />
              </div>
            </div>

            <div>
              <label for="message" class="block text-label-md text-fg-soft mb-2">
                {{ currentLanguage === 'es' ? 'Mensaje' : 'Message' }}
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                name="message"
                rows="5"
                required
                :placeholder="currentLanguage === 'es' ? 'Cuéntame sobre tu proyecto...' : 'Tell me about your project...'"
                class="field resize-none"
              ></textarea>
            </div>

            <!-- Status messages -->
            <div aria-live="polite">
              <div v-if="formStatus === 'success'" class="flex items-center gap-2 text-accent bg-accent-dim p-3 rounded-lg">
                <CheckCircle class="w-5 h-5" aria-hidden="true" />
                <span class="text-body-sm">{{ currentLanguage === 'es' ? '¡Mensaje enviado correctamente!' : 'Message sent successfully!' }}</span>
              </div>

              <div v-if="formStatus === 'error'" class="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg">
                <AlertCircle class="w-5 h-5" aria-hidden="true" />
                <span class="text-body-sm">{{ errorMessage }}</span>
              </div>
            </div>

            <button
              type="submit"
              :disabled="formStatus === 'loading'"
              class="submit-btn group"
            >
              <Loader2 v-if="formStatus === 'loading'" class="w-5 h-5 animate-spin" aria-hidden="true" />
              <Send v-else class="w-5 h-5 transition-transform duration-fast group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
              {{ formStatus === 'loading'
                ? (currentLanguage === 'es' ? 'Enviando...' : 'Sending...')
                : (currentLanguage === 'es' ? 'Enviar mensaje' : 'Send message')
              }}
            </button>
          </form>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Mail, Send, CheckCircle, AlertCircle, Loader2, Copy, Check, ArrowUpRight, ArrowRight } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'
import SectionHeader from './SectionHeader.vue'

const props = withDefaults(defineProps<{
  showFreelanceLink?: boolean
  subject?: string
}>(), {
  showFreelanceLink: true,
  subject: undefined,
})

const { t, cvData, currentLanguage } = useLanguage()
const container = ref<HTMLElement>()

const { observe } = useScrollReveal()

onMounted(() => {
  if (container.value) observe(container.value)
})

const contactEmail = computed(() => cvData.value?.email ?? '')

const heading = computed(() => currentLanguage.value === 'es'
  ? 'Hablemos de lo que quieres construir.'
  : "Let's talk about what you want to build.")

const socials = computed(() => [
  { label: 'LinkedIn', href: cvData.value?.linkedin },
  { label: 'GitHub', href: cvData.value?.github },
  { label: 'Instagram', href: cvData.value?.instagram },
].filter(link => !!link.href))

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(contactEmail.value)
    copied.value = true
    clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => { copied.value = false }, 2000)
  } catch {
    window.location.href = `mailto:${contactEmail.value}`
  }
}

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

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
  if (!accessKey) {
    formStatus.value = 'error'
    errorMessage.value = currentLanguage.value === 'es'
      ? 'El formulario no está disponible por ahora. Escríbeme por correo.'
      : 'The form is unavailable right now. Please email me instead.'
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
        access_key: accessKey,
        name: formData.value.name,
        email: formData.value.email,
        message: formData.value.message,
        from_name: 'Portfolio Contact Form',
        subject: props.subject
          ? `[${props.subject}] ${formData.value.name}`
          : `New message from ${formData.value.name}`
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
.email-row {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: var(--radius-xl);
  border: 1px solid var(--accent-border);
  background: var(--accent-dim);
  padding: 6px 6px 6px 16px;
}

.email-link {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
  min-height: 44px;
  font-family: 'Cascadia Code', 'Fira Code', ui-monospace, monospace;
  font-size: 14px;
  color: var(--fg);
}

.email-link:hover {
  color: var(--accent);
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  background: var(--surface-container);
  color: var(--fg-soft);
  transition: background var(--duration-fast), color var(--duration-fast);
}

.copy-btn:hover {
  background: var(--surface-high);
  color: var(--accent);
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 44px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--fg-soft);
  transition: color var(--duration-fast);
}

.text-link:hover {
  color: var(--accent);
}

.freelance-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding-top: 32px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--accent);
}

.field {
  width: 100%;
  padding: 12px 16px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--fg);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  transition: border-color var(--duration-fast), box-shadow var(--duration-fast);
}

.field::placeholder {
  color: var(--muted);
}

.field:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dim);
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 52px;
  border-radius: var(--radius-full);
  background: var(--accent);
  color: var(--accent-fg);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  transition: background var(--duration-fast);
}

.submit-btn:hover:not(:disabled) {
  background: var(--accent-alt);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
