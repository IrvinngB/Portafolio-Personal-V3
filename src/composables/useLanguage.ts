"use client"

import { ref, computed, watch } from "vue"
import type { Language } from "../types"
import { translations } from "../data/translations"
import { cvDataES, cvDataEN } from "../data/cvData"

const currentLanguage = ref<Language>("es")

export function useLanguage() {
  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang
  }

  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === "es" ? "en" : "es"
  }

  // Keep <html lang> in sync with the active language
  watch(currentLanguage, (lang) => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = lang
    }
  }, { immediate: true })

  const t = computed(() => translations[currentLanguage.value])

  const cvData = computed(() => (currentLanguage.value === "es" ? cvDataES : cvDataEN))

  return {
    currentLanguage: computed(() => currentLanguage.value),
    setLanguage,
    toggleLanguage,
    t,
    cvData,
  }
}

