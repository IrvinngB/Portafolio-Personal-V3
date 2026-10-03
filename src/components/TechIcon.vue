<template>
  <svg v-if="hasIcon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <use :href="`#${techIconId(name)}`" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { techIcons, techIconId } from '../data/techIcons'

// Renders a reference to a symbol defined once by <TechIconSprite>, so repeated icons cost bytes only once
const props = defineProps<{ name: string }>()
const hasIcon = computed(() => !!techIcons[props.name])
</script>
