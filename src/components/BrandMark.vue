<template>
  <svg viewBox="320 280 380 462" class="brand-mark" role="img" :aria-label="label">
    <circle class="brand-lime" cx="373" cy="335" r="44" />
    <rect class="brand-deep" x="330" y="403" width="84" height="328" rx="5" />
    <rect class="brand-mid" x="442" y="291" width="84" height="440" rx="5" />
    <path class="brand-deep" d="M556 373C640 373 690 405 690 463C690 520 640 553 552 553C600 535 612 400 556 373Z" />
    <path class="brand-mid" d="M556 553C650 553 690 590 690 643C690 700 650 733 556 733C612 715 612 570 556 553Z" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Irvin Benitez' })
</script>

<style scoped>
.brand-mark { display: block; }
.brand-deep { fill: var(--brand-deep); }
.brand-mid { fill: var(--brand-mid); }
.brand-lime { fill: var(--brand-lime); }
</style>
