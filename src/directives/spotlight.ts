import type { Directive } from 'vue'

type SpotlightEl = HTMLElement & { _spotlightMove?: (e: PointerEvent) => void }

// Exposes the pointer position as --mx/--my so CSS can paint a glow under the cursor
export const spotlight: Directive<SpotlightEl> = {
  mounted(el) {
    el.classList.add('spotlight')
    el._spotlightMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      el.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }
    el.addEventListener('pointermove', el._spotlightMove, { passive: true })
  },
  unmounted(el) {
    if (el._spotlightMove) el.removeEventListener('pointermove', el._spotlightMove)
  },
  getSSRProps() {
    return { class: 'spotlight' }
  },
}
