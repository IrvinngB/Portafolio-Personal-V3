<template>
  <!-- Geometry from public/icons/logo-ib/ib-simbolo.svg; colors come from --brand-* tokens per theme -->
  <svg viewBox="15 14 70 70" class="brand-mark" role="img" :aria-label="label">
    <circle class="brand-dot" cx="27" cy="28" r="8" />
    <rect class="brand-shape" x="20" y="44" width="14" height="36" rx="7" />
    <rect class="brand-shape" x="44" y="18" width="14" height="62" rx="7" />
    <path
      class="brand-shape"
      fill-rule="evenodd"
      d="M44 62a18 18 0 1 0 36 0a18 18 0 1 0-36 0ZM55 62a7 7 0 1 0 14 0a7 7 0 1 0-14 0Z"
    />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Irvin Benitez' })
</script>

<style scoped>
.brand-mark { display: block; }
.brand-dot { fill: var(--brand-dot); }
.brand-shape { fill: var(--brand-shape); }
</style>
