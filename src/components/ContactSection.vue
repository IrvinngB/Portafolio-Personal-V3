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
        :title="t.getInTouch"
        heading-id="contact-heading"
      />

      <div class="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <!-- CTA + direct channels -->
        <div class="reveal-child lg:col-span-5 flex flex-col">
          <p class="contact-cta">
            {{ currentLanguage === 'es' ? 'Hablemos de lo que' : "Let's talk about what" }}
            <span class="text-accent">{{ currentLanguage === 'es' ? 'quieres construir.' : 'you want to build.' }}</span>
          </p>
          <p class="text-body-lg text-fg-soft mt-4">{{ t.contactDescription }}</p>

          <p class="inline-flex items-center gap-2 mt-6 text-label-lg text-fg">
            <span class="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
            </span>
            {{ currentLanguage === 'es' ? 'Disponible para freelance y trabajo remoto' : 'Available for freelance and remote work' }}
          </p>

          <!-- Email with copy -->
          <div class="email-row mt-8">
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

          <!-- Freelance page link -->
          <RouterLink v-if="showFreelanceLink" to="/freelance" class="freelance-link group mt-6">
            <span class="freelance-link-icon">
              <Briefcase class="w-5 h-5" aria-hidden="true" />
            </span>
            <span class="flex-1 min-w-0">
              <span class="block text-label-lg text-fg">
                {{ currentLanguage === 'es' ? '¿Tienes un proyecto freelance?' : 'Have a freelance project?' }}
              </span>
              <span class="block text-body-sm text-fg-soft">
                {{ currentLanguage === 'es' ? 'Mira qué hago y cómo trabajo' : 'See what I do and how I work' }}
              </span>
            </span>
            <ArrowRight class="w-4 h-4 text-accent transition-transform duration-fast group-hover:translate-x-1" aria-hidden="true" />
          </RouterLink>

          <!-- Socials -->
          <ul class="mt-6 border-t border-border">
            <li v-for="link in socials" :key="link.label" class="border-b border-border">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link group"
              >
                <component :is="link.icon" class="w-5 h-5 text-fg-soft group-hover:text-accent transition-colors duration-fast" aria-hidden="true" />
                <span class="text-label-lg text-fg">{{ link.label }}</span>
                <span class="text-body-sm text-muted ml-auto hidden sm:inline">{{ link.handle }}</span>
                <ArrowUpRight class="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-fast" aria-hidden="true" />
              </a>
            </li>
          </ul>
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
import { Mail, Linkedin, Instagram, Github, Send, CheckCircle, AlertCircle, Loader2, Copy, Check, ArrowUpRight, ArrowRight, Briefcase } from 'lucide-vue-next'
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

const socials = computed(() => [
  { label: 'LinkedIn', href: cvData.value?.linkedin, icon: Linkedin, handle: 'irvin-benitez' },
  { label: 'GitHub', href: cvData.value?.github, icon: Github, handle: '@IrvinngB' },
  { label: 'Instagram', href: cvData.value?.instagram, icon: Instagram, handle: '@_irvin.gg' },
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
.contact-cta {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(28px, 4.5vw, 44px);
  font-weight: 600;
  line-height: 1.1;
  color: var(--fg);
}

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

.freelance-link {
  display: flex;
  align-items: center;
  gap: 14px;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);
  background: var(--surface-container);
  padding: 14px 16px;
  transition: border-color var(--duration-fast), background var(--duration-fast);
}

.freelance-link:hover {
  border-color: var(--accent-border);
  background: var(--surface-high);
}

.freelance-link-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  background: var(--accent-dim);
  color: var(--accent);
}

.social-link {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 56px;
  padding-inline: 4px;
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
