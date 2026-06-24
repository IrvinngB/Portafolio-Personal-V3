import { onUnmounted } from 'vue'

export function useScrollReveal() {
  const isClient = typeof window !== 'undefined'

  let observer: IntersectionObserver | null = null

  if (isClient) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('is-visible')
            observer?.unobserve(el)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )
  }

  const observe = (el: HTMLElement, delay?: number) => {
    if (delay !== undefined) {
      el.style.transitionDelay = `${delay}ms`
    }
    observer?.observe(el)
  }

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { observe }
}
