import { ref, computed, onMounted } from 'vue'

const isDark = ref(false)

const isClient = typeof window !== 'undefined'

export function useDarkMode() {
  const initTheme = () => {
    if (!isClient) return
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)

    if (isDark.value) {
      document.documentElement.classList.add('dark')
    }
  }

  const toggleDarkMode = () => {
    if (!isClient) return
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  onMounted(() => {
    initTheme()
  })

  return {
    isDark: computed(() => isDark.value),
    toggleDarkMode,
  }
}

