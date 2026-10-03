<template>
  <HeroSection />
  <ProjectsSection />
  <AboutMeSection />
  <ExperienceSection />
  <SkillsSection />
  <EducationSection />
  <ContactSection />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import { useLanguage } from '../composables/useLanguage'
import { usePageSeo, absoluteUrl } from '../composables/usePageSeo'

const AboutMeSection = defineAsyncComponent(() => import('../components/AboutMeSection.vue'))
const ProjectsSection = defineAsyncComponent(() => import('../components/ProjectsSection.vue'))
const ExperienceSection = defineAsyncComponent(() => import('../components/ExperienceSection.vue'))
const SkillsSection = defineAsyncComponent(() => import('../components/SkillsSection.vue'))
const EducationSection = defineAsyncComponent(() => import('../components/EducationSection.vue'))
const ContactSection = defineAsyncComponent(() => import('../components/ContactSection.vue'))

const { cvData, currentLanguage } = useLanguage()

usePageSeo({
  path: '/',
  title: () => currentLanguage.value === 'es'
    ? 'Irvin Benitez — Desarrollador Full Stack en Panamá'
    : 'Irvin Benitez — Full Stack Developer in Panama',
  description: () => currentLanguage.value === 'es'
    ? 'Irvin Benitez, desarrollador Full Stack en Panamá. Construyo aplicaciones web con Vue, Django y PostgreSQL. Proyectos, experiencia y contacto.'
    : 'Irvin Benitez, Full Stack Developer in Panama. I build web applications with Vue, Django and PostgreSQL. Projects, experience and contact.',
  schema: () => [
    {
      '@type': 'ProfilePage',
      '@id': absoluteUrl('/#profile'),
      url: absoluteUrl('/'),
      name: 'Irvin Benitez',
      isPartOf: { '@id': absoluteUrl('/#website') },
      mainEntity: { '@id': absoluteUrl('/#person') },
      dateModified: '2026-10-03',
    },
    {
      '@type': 'ItemList',
      name: currentLanguage.value === 'es' ? 'Proyectos de Irvin Benitez' : 'Projects by Irvin Benitez',
      itemListElement: cvData.value.projects.map((project, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'SoftwareSourceCode',
          name: project.title,
          description: project.description,
          codeRepository: project.github,
          url: project.url ?? project.github,
          programmingLanguage: project.technologies,
          author: { '@id': absoluteUrl('/#person') },
        },
      })),
    },
  ],
})
</script>
