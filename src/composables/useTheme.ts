import { ref, onMounted } from 'vue'

const isClient = typeof window !== 'undefined'

const theme = ref<'dark' | 'light'>('dark')

export function useTheme() {
  const applyTheme = (mode: 'dark' | 'light') => {
    if (!isClient) return
    theme.value = mode
    document.documentElement.setAttribute('data-theme', mode)
    localStorage.setItem('theme', mode)
  }

  const toggle = () => {
    const next = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme(next)
  }

  const setTheme = (mode: 'dark' | 'light') => {
    applyTheme(mode)
  }

  onMounted(() => {
    if (!isClient) return
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    const initial = saved || 'dark'
    applyTheme(initial)
  })

  return {
    theme,
    toggle,
    setTheme,
  }
}
