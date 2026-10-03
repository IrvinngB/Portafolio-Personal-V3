<template>
  <section
    id="about-me"
    ref="container"
    class="reveal-section section py-16 sm:py-20 lg:py-28"
    aria-labelledby="about-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
      <SectionHeader
        :eyebrow="currentLanguage === 'es' ? 'Sobre mí' : 'About me'"
        :title="currentLanguage === 'es' ? 'Más allá del código' : 'Beyond the code'"
        heading-id="about-heading"
      />

      <div class="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <!-- Story -->
        <div class="reveal-child lg:col-span-7">
          <p v-if="lead" class="about-lead">{{ lead }}</p>
          <div class="space-y-4 text-body-lg text-fg-soft mt-6">
            <p v-for="(paragraph, index) in rest" :key="index">{{ paragraph }}</p>
          </div>

        </div>

        <!-- Values + motivation -->
        <div class="lg:col-span-5 flex flex-col gap-4">
          <article
            v-for="(value, index) in cvData.aboutMe?.values"
            :key="value.title"
            v-spotlight
            class="reveal-child value-card"
            :style="{ transitionDelay: `${80 + index * 80}ms` }"
          >
            <span class="value-icon">
              <component :is="iconMap[value.icon as keyof typeof iconMap]" class="w-5 h-5" aria-hidden="true" />
            </span>
            <div>
              <h3 class="text-h3 text-fg mb-1.5">{{ value.title }}</h3>
              <p class="text-body-md text-fg-soft">{{ value.description }}</p>
            </div>
          </article>

        </div>
      </div>

      <!-- Pull quote -->
      <figure v-if="cvData.aboutMe?.motivation" class="reveal-child pull-quote" style="transition-delay: 320ms">
        <blockquote>
          <p>{{ cvData.aboutMe.motivation.description }}</p>
        </blockquote>
        <figcaption class="text-label-md text-accent mt-6">— {{ cvData.aboutMe.motivation.title }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Lightbulb, Rocket, Target, Users } from 'lucide-vue-next'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'
import SectionHeader from './SectionHeader.vue'

const { cvData, currentLanguage } = useLanguage()
const container = ref<HTMLElement>()
const { observe } = useScrollReveal()

onMounted(() => {
  if (container.value) observe(container.value)
})

const iconMap = { Rocket, Target, Users, Lightbulb }

const lead = computed(() => cvData.value.aboutMe?.description[0])
const rest = computed(() => cvData.value.aboutMe?.description.slice(1) ?? [])

</script>

<style scoped>
.about-lead {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(20px, 2.6vw, 26px);
  font-weight: 400;
  line-height: 1.4;
  color: var(--fg);
}

.value-card {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);
  background: var(--surface-container);
  padding: 20px;
}

.value-card:hover {
  border-color: var(--accent-border);
}

.value-icon {
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
}

.pull-quote {
  position: relative;
  margin: clamp(48px, 8vw, 96px) 0 0;
  padding-top: 40px;
  border-top: 1px solid var(--border);
  max-width: 56rem;
}

.pull-quote p {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(22px, 3.2vw, 34px);
  font-weight: 300;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--fg);
}

.pull-quote p::before {
  content: '“';
  color: var(--accent);
  margin-right: 0.08em;
}

.pull-quote p::after {
  content: '”';
  color: var(--accent);
  margin-left: 0.04em;
}
</style>
