<template>
  <div class="reveal-child mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
    <div class="max-w-2xl">
      <p class="flex items-center gap-3 text-label-md text-accent mb-3">
        <span class="eyebrow-rule" aria-hidden="true"></span>
        {{ eyebrow }}
      </p>
      <h2 :id="headingId" class="text-h1 text-fg">{{ title }}</h2>
      <p v-if="description" class="text-body-lg text-fg-soft mt-4">{{ description }}</p>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  headingId: string
  description?: string
}>()
</script>
