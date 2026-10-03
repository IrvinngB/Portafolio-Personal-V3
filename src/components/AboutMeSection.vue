<template>
  <section
    id="about-me"
    ref="container"
    class="reveal-section section py-16 sm:py-20 lg:py-28"
    aria-labelledby="about-heading"
  >
    <div class="container mx-auto px-4 sm:px-6 max-w-5xl">
      <div class="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
        <!-- Portrait -->
        <div class="reveal-child md:col-span-5">
          <div class="portrait">
            <img
              v-if="about?.photo"
              :src="about.photo"
              :alt="cvData.name"
              width="480"
              height="600"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover"
            />
            <TopoArt v-else />
          </div>
        </div>

        <!-- Story -->
        <div class="reveal-child md:col-span-7" style="transition-delay: 100ms">
          <p class="flex items-center gap-3 text-label-md text-accent mb-3">
            <span class="eyebrow-rule" aria-hidden="true"></span>
            {{ currentLanguage === 'es' ? 'Sobre mí' : 'About me' }}
          </p>
          <h2 id="about-heading" class="text-h1 text-fg">
            {{ currentLanguage === 'es' ? 'Un poco sobre mí' : 'A bit about me' }}
          </h2>

          <div class="mt-6 space-y-4">
            <p
              v-for="(paragraph, i) in about?.description"
              :key="i"
              :class="i === 0 ? 'bio-lead' : 'text-body-lg text-fg-soft'"
            >
              {{ paragraph }}
            </p>
          </div>

          <p class="facts-line mt-8">
            <span v-for="fact in facts" :key="fact">{{ fact }}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { useScrollReveal } from '../composables/useScrollReveal'
import TopoArt from './TopoArt.vue'

const { cvData, currentLanguage } = useLanguage()
const container = ref<HTMLElement>()
const { observe } = useScrollReveal()

onMounted(() => {
  if (container.value) observe(container.value)
})

const about = computed(() => cvData.value.aboutMe)

const facts = computed(() => [
  cvData.value.location,
  cvData.value.technicalSkills.languages.join(' · '),
])
</script>

<style scoped>
.portrait {
  position: relative;
  aspect-ratio: 4 / 5;
  max-width: 420px;
  margin-inline: auto;
  border-radius: var(--radius-xxl);
  border: 1px solid var(--border);
  background:
    radial-gradient(90% 70% at 30% 20%, var(--accent-dim), transparent 70%),
    var(--surface-container);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bio-lead {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(19px, 2.2vw, 22px);
  font-weight: 400;
  line-height: 1.5;
  color: var(--fg);
}

.facts-line {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 0;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  color: var(--muted);
}

.facts-line span:not(:last-child)::after {
  content: '·';
  margin: 0 10px;
}
</style>
