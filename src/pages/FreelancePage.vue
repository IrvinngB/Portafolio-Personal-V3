<template>
  <div>
    <!-- Page hero -->
    <section class="page-hero" aria-labelledby="freelance-heading">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div class="lg:col-span-7">
            <span class="availability intro" style="--d: 0ms">
              <span class="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              {{ copy.availability }}
            </span>

            <h1 id="freelance-heading" class="page-title intro" style="--d: 100ms">
              {{ copy.titleStart }}
              <span class="text-accent">{{ copy.titleAccent }}</span>
            </h1>

            <p class="text-body-lg text-fg-soft mt-6 max-w-xl intro" style="--d: 200ms">{{ copy.description }}</p>

            <div class="flex flex-wrap gap-3 mt-8 intro" style="--d: 300ms">
              <a href="#contact" class="btn-primary group" @click.prevent="scrollTo('#contact')">
                {{ copy.ctaPrimary }}
                <ArrowRight class="w-4 h-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <RouterLink :to="{ path: '/', hash: '#projects' }" class="btn-secondary">
                {{ copy.ctaSecondary }}
              </RouterLink>
            </div>
          </div>

          <!-- Quick facts -->
          <dl class="lg:col-span-5 facts intro" style="--d: 400ms">
            <div v-for="fact in facts" :key="fact.label" class="fact">
              <dt class="text-label-md text-muted">{{ fact.label }}</dt>
              <dd class="text-body-lg text-fg mt-1">{{ fact.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section ref="servicesRef" class="reveal-section section py-16 sm:py-20" aria-labelledby="services-heading">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <SectionHeader :eyebrow="copy.servicesEyebrow" :title="copy.servicesTitle" heading-id="services-heading" />
        <div class="grid md:grid-cols-3 gap-4 sm:gap-5">
          <article
            v-for="(service, i) in copy.services"
            :key="service.title"
            v-spotlight
            class="reveal-child card"
            :style="{ transitionDelay: `${i * 80}ms` }"
          >
            <span class="icon-box">
              <component :is="service.icon" class="w-5 h-5" aria-hidden="true" />
            </span>
            <h3 class="card-title">{{ service.title }}</h3>
            <p class="text-body-md text-fg-soft mt-2">{{ service.description }}</p>
            <p class="text-mono text-muted mt-auto pt-6">{{ service.stack.join(' · ') }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Proof: real projects behind the services -->
    <section ref="proofRef" class="reveal-section section py-16 sm:py-20" aria-labelledby="proof-heading">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <SectionHeader
          :eyebrow="copy.proofEyebrow"
          :title="copy.proofTitle"
          heading-id="proof-heading"
          :description="copy.proofDescription"
        />
        <ul class="case-list">
          <li
            v-for="(project, i) in proofProjects"
            :key="project.title"
            class="reveal-child case-row"
            :style="{ transitionDelay: `${i * 80}ms` }"
          >
            <h3 class="case-title">{{ shortTitle(project.title) }}</h3>
            <p class="text-body-md text-fg-soft">{{ project.problem }}</p>
            <a
              :href="project.url ?? project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="case-link"
              :aria-label="`${project.url ? copy.seeDemo : copy.seeCode}: ${shortTitle(project.title)}`"
            >
              {{ project.url ? copy.seeDemo : copy.seeCode }}
              <ArrowUpRight class="w-4 h-4" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- Process -->
    <section ref="processRef" class="reveal-section section py-16 sm:py-20" aria-labelledby="process-heading">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <SectionHeader :eyebrow="copy.processEyebrow" :title="copy.processTitle" heading-id="process-heading" />
        <ol class="process">
          <li
            v-for="(step, i) in copy.steps"
            :key="step.title"
            class="reveal-child process-step"
            :style="{ transitionDelay: `${i * 120}ms` }"
          >
            <span class="process-dot" aria-hidden="true"></span>
            <h3 class="text-h3 text-fg process-title">{{ step.title }}</h3>
            <p class="text-body-md text-fg-soft mt-2">{{ step.description }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- FAQ -->
    <section ref="faqRef" class="reveal-section section py-16 sm:py-20" aria-labelledby="faq-heading">
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <SectionHeader :eyebrow="copy.faqEyebrow" :title="copy.faqTitle" heading-id="faq-heading" />
        <div class="reveal-child faq">
          <details v-for="item in copy.faq" :key="item.q" class="faq-item">
            <summary class="faq-question">
              <span>{{ item.q }}</span>
              <Plus class="faq-icon w-5 h-5" aria-hidden="true" />
            </summary>
            <p class="text-body-md text-fg-soft pb-6 pr-10">{{ item.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <ContactSection :show-freelance-link="false" subject="Freelance" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import {
  AppWindow,
  ServerCog,
  BotMessageSquare,
  ArrowRight,
  ArrowUpRight,
  Plus,
} from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'
import { usePageSeo, absoluteUrl } from '../composables/usePageSeo'
import SectionHeader from '../components/SectionHeader.vue'

const ContactSection = defineAsyncComponent(() => import('../components/ContactSection.vue'))

const { cvData, currentLanguage } = useLanguage()
const { observe } = useScrollReveal()

const servicesRef = ref<HTMLElement>()
const proofRef = ref<HTMLElement>()
const processRef = ref<HTMLElement>()
const faqRef = ref<HTMLElement>()

onMounted(() => {
  ;[servicesRef, proofRef, processRef, faqRef].forEach(r => r.value && observe(r.value))
})


const scrollTo = (hash: string) => {
  const el = document.querySelector(hash)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
}

const shortTitle = (title: string) => title.split(' — ')[0] ?? title

const proofProjects = computed(() => cvData.value.projects.filter(p => p.problem))

const facts = computed(() => {
  const es = currentLanguage.value === 'es'
  return [
    { label: es ? 'Ubicación' : 'Location', value: `${cvData.value.location} · GMT-5` },
    { label: es ? 'Modalidad' : 'Format', value: es ? 'Remoto' : 'Remote' },
    { label: es ? 'Idiomas' : 'Languages', value: cvData.value.technicalSkills.languages.join(' · ') },
  ]
})

const copy = computed(() => currentLanguage.value === 'es'
  ? {
      availability: 'Aceptando proyectos',
      titleStart: 'Software a medida para',
      titleAccent: 'tu negocio.',
      description: 'Trabajo con negocios y equipos que necesitan software a medida: desde la idea hasta que está en producción y lo usan personas reales.',
      ctaPrimary: 'Cuéntame tu proyecto',
      ctaSecondary: 'Ver mi trabajo',
      servicesEyebrow: 'Servicios',
      servicesTitle: 'En qué te puedo ayudar',
      services: [
        {
          icon: AppWindow,
          title: 'Sitios y aplicaciones web',
          description: 'Landing pages, paneles de administración y sistemas internos que tu equipo puede usar desde el primer día.',
          stack: ['Vue.js', 'React', 'Laravel'],
        },
        {
          icon: ServerCog,
          title: 'APIs y backends',
          description: 'La lógica de tu negocio, tus datos y las integraciones con otros servicios, ordenadas y listas para crecer.',
          stack: ['Django', 'FastAPI', 'PostgreSQL'],
        },
        {
          icon: BotMessageSquare,
          title: 'Automatización e IA',
          description: 'Chatbots de WhatsApp y flujos automáticos que atienden y responden a tus clientes sin que estés pendiente.',
          stack: ['Python', 'WhatsApp API', 'Gemini AI'],
        },
      ],
      proofEyebrow: 'Casos',
      proofTitle: 'Problemas que ya resolví',
      proofDescription: 'Cada servicio tiene detrás un proyecto real. Este es el problema del que partió cada uno.',
      problemLabel: 'El problema',
      seeDemo: 'Ver demo',
      seeCode: 'Ver código',
      processEyebrow: 'Proceso',
      processTitle: 'Cómo trabajo',
      steps: [
        { title: 'Conversamos', description: 'Una llamada corta para entender el problema, a quién va dirigido y qué significa "terminado" para ti.' },
        { title: 'Propuesta clara', description: 'Te envío por escrito el alcance, los entregables, los tiempos y el costo. Sin letra pequeña.' },
        { title: 'Construimos', description: 'Avanzo en iteraciones cortas y te comparto avances que puedes ver y probar.' },
        { title: 'Entrega y soporte', description: 'Despliegue, documentación y acompañamiento después del lanzamiento.' },
      ],
      faqEyebrow: 'Preguntas',
      faqTitle: 'Preguntas frecuentes',
      faq: [
        { q: '¿Qué necesito tener listo para empezar?', a: 'Solo una idea clara del problema que quieres resolver. Si el alcance todavía no está definido, lo trabajamos juntos en la primera conversación.' },
        { q: '¿Cómo se define el costo?', a: 'Depende del alcance. Después de conversar te envío una propuesta con el costo y lo que incluye antes de empezar cualquier trabajo.' },
        { q: '¿Cómo me entero de cómo va el proyecto?', a: 'Te comparto avances durante el desarrollo para que puedas probarlos y dar feedback antes de la entrega final.' },
        { q: '¿Qué pasa después de la entrega?', a: 'Te entrego el código y la documentación. Si necesitas soporte o mejoras después del lanzamiento, lo acordamos en la propuesta.' },
      ],
    }
  : {
      availability: 'Taking on projects',
      titleStart: 'Custom software for',
      titleAccent: 'your business.',
      description: 'I work with businesses and teams that need custom software: from the first idea until it is in production and used by real people.',
      ctaPrimary: 'Tell me about your project',
      ctaSecondary: 'See my work',
      servicesEyebrow: 'Services',
      servicesTitle: 'What I can help with',
      services: [
        {
          icon: AppWindow,
          title: 'Websites and web apps',
          description: 'Landing pages, admin panels and internal tools your team can use from day one.',
          stack: ['Vue.js', 'React', 'Laravel'],
        },
        {
          icon: ServerCog,
          title: 'APIs and backends',
          description: 'Your business logic, data and third-party integrations, well-structured and ready to grow.',
          stack: ['Django', 'FastAPI', 'PostgreSQL'],
        },
        {
          icon: BotMessageSquare,
          title: 'Automation and AI',
          description: 'WhatsApp chatbots and automated flows that answer your customers without you having to be there.',
          stack: ['Python', 'WhatsApp API', 'Gemini AI'],
        },
      ],
      proofEyebrow: 'Cases',
      proofTitle: "Problems I've already solved",
      proofDescription: 'Every service is backed by a real project. This is the problem each one started from.',
      problemLabel: 'The problem',
      seeDemo: 'Live demo',
      seeCode: 'View code',
      processEyebrow: 'Process',
      processTitle: 'How I work',
      steps: [
        { title: "Let's talk", description: 'A short call to understand the problem, who it is for and what "done" means to you.' },
        { title: 'Clear proposal', description: 'You get scope, deliverables, timeline and cost in writing. No fine print.' },
        { title: 'We build', description: 'I work in short iterations and share progress you can see and try.' },
        { title: 'Launch and support', description: 'Deployment, documentation and support after launch.' },
      ],
      faqEyebrow: 'Questions',
      faqTitle: 'Frequently asked questions',
      faq: [
        { q: 'What do I need to get started?', a: "Just a clear idea of the problem you want to solve. If the scope isn't defined yet, we'll work it out together in the first conversation." },
        { q: 'How is the cost defined?', a: 'It depends on the scope. After we talk, I send you a proposal with the cost and what it includes before any work starts.' },
        { q: 'How do I know how the project is going?', a: 'I share progress during development so you can try it and give feedback before the final delivery.' },
        { q: 'What happens after delivery?', a: 'You get the code and documentation. If you need support or improvements after launch, we agree on it in the proposal.' },
      ],
    })

// Must run after `copy` exists: unhead evaluates these getters immediately on the client
usePageSeo({
  path: '/freelance',
  title: () => currentLanguage.value === 'es'
    ? 'Desarrollador freelance en Panamá — Irvin Benitez'
    : 'Freelance developer in Panama — Irvin Benitez',
  description: () => currentLanguage.value === 'es'
    ? 'Desarrollo web a medida en Panamá: aplicaciones web, APIs y automatizaciones con IA. Cuéntame tu proyecto y te envío una propuesta clara.'
    : 'Custom web development from Panama: web apps, APIs and AI automations. Tell me about your project and get a clear proposal.',
  schema: () => [
    {
      '@type': 'ProfessionalService',
      '@id': absoluteUrl('/freelance#service'),
      name: 'Irvin Benitez — Desarrollo web freelance',
      url: absoluteUrl('/freelance'),
      image: absoluteUrl('/og-image.png'),
      email: cvData.value.email,
      founder: { '@id': absoluteUrl('/#person') },
      address: { '@type': 'PostalAddress', addressLocality: 'Panamá Oeste', addressCountry: 'PA' },
      areaServed: [{ '@type': 'Country', name: 'Panamá' }, 'Remote'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: copy.value.servicesTitle,
        itemListElement: copy.value.services.map(service => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: service.title, description: service.description },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: copy.value.faq.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Freelance', item: absoluteUrl('/freelance') },
      ],
    },
  ],
})
</script>

<style scoped>
/* ═══════ Page hero ═══════ */
.page-hero {
  padding-top: clamp(120px, 18vh, 180px);
  padding-bottom: clamp(48px, 8vh, 96px);
  background: radial-gradient(80% 60% at 85% 0%, var(--accent-dim), transparent 70%);
}

.page-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(40px, 7vw, 76px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--fg);
  margin-top: 24px;
}

.intro {
  animation: introUp 0.9s var(--ease-out) both;
  animation-delay: var(--d, 0ms);
}

@keyframes introUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
}

.availability {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-full);
  padding: 8px 16px;
}

.facts {
  border-top: 1px solid var(--border);
}

.fact {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
}

/* ═══════ Cards ═══════ */
.card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);
  background: var(--surface-container);
  padding: 24px;
}

.card:hover {
  border-color: var(--accent-border);
}

.card-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--fg);
}

.icon-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  color: var(--accent);
  margin-bottom: 20px;
}

.case-list {
  border-top: 1px solid var(--border);
}

.case-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
  padding: 22px 0;
  border-bottom: 1px solid var(--border);
}

@media (min-width: 768px) {
  .case-row {
    grid-template-columns: 220px 1fr auto;
    gap: 32px;
    align-items: baseline;
  }
}

.case-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 19px;
  font-weight: 600;
  line-height: 1.25;
  color: var(--fg);
}

.case-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--accent);
  white-space: nowrap;
}

.case-link:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* ═══════ Process ═══════ */
.process {
  position: relative;
  display: grid;
  gap: 32px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.process::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 20px;
  bottom: 20px;
  width: 1px;
  background: linear-gradient(to bottom, var(--accent), var(--accent-border));
  transform-origin: top;
  transform: scaleY(0);
  transition: transform 1.2s var(--ease-out) 0.2s;
}

.is-visible .process::before {
  transform: scaleY(1);
}

.process-step {
  position: relative;
  padding-left: 64px;
}

.process-dot {
  position: absolute;
  left: 14px;
  top: 14px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 5px var(--bg);
  z-index: 1;
}

.process-title {
  margin-top: 8px;
}

@media (min-width: 1024px) {
  .process {
    grid-template-columns: repeat(4, 1fr);
  }

  .process::before {
    top: 20px;
    right: 20px;
    bottom: auto;
    width: auto;
    height: 1px;
    background: linear-gradient(to right, var(--accent), var(--accent-border));
    transform-origin: left;
    transform: scaleX(0);
  }

  .is-visible .process::before {
    transform: scaleX(1);
  }

  .process-step {
    padding-left: 0;
  }

  .process-dot {
    position: relative;
    display: block;
    left: 14px;
    top: 14px;
  }

  .process-title {
    margin-top: 36px;
  }
}

/* ═══════ FAQ ═══════ */
.faq {
  border-top: 1px solid var(--border);
}

.faq-item {
  border-bottom: 1px solid var(--border);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 64px;
  padding: 16px 0;
  cursor: pointer;
  list-style: none;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(16px, 2vw, 19px);
  font-weight: 500;
  color: var(--fg);
  transition: color var(--duration-fast);
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-question:hover {
  color: var(--accent);
}

.faq-question:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}

.faq-icon {
  flex-shrink: 0;
  color: var(--accent);
  transition: transform var(--duration-normal) var(--ease-out);
}

.faq-item[open] .faq-icon {
  transform: rotate(45deg);
}

/* ═══════ Buttons ═══════ */
.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 22px;
  border-radius: var(--radius-full);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  transition: background var(--duration-fast), border-color var(--duration-fast);
}

.btn-primary {
  background: var(--accent);
  color: var(--accent-fg);
}

.btn-primary:hover {
  background: var(--accent-alt);
}

.btn-secondary {
  border: 1px solid var(--accent-border);
  color: var(--accent);
}

.btn-secondary:hover {
  border-color: var(--accent);
  background: var(--accent-dim);
}

@media (prefers-reduced-motion: reduce) {
  .process::before {
    transform: none !important;
  }
}
</style>
