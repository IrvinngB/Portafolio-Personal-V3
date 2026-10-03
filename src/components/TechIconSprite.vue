<template>
  <svg width="0" height="0" class="absolute" aria-hidden="true" focusable="false">
    <symbol v-for="name in uniqueNames" :id="techIconId(name)" :key="name" viewBox="0 0 24 24">
      <path :d="techIcons[name]" />
    </symbol>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { techIcons, techIconId } from '../data/techIcons'

const props = defineProps<{ names: string[] }>()
const uniqueNames = computed(() => [...new Set(props.names)].filter(n => techIcons[n]))
</script>
