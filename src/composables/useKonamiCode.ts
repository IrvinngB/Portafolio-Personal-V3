import { ref, onMounted, onUnmounted } from 'vue'

export function useKonamiCode() {
    const showEasterEgg = ref(false)
    const konamiCode = ref<string[]>([])
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

    const handleKeyPress = (event: KeyboardEvent) => {
        konamiCode.value.push(event.key)
        if (konamiCode.value.length > konamiSequence.length) {
            konamiCode.value.shift()
        }

        if (konamiCode.value.join(',') === konamiSequence.join(',')) {
            showEasterEgg.value = true
            konamiCode.value = [] // Reset
        }
    }

    const closeEasterEgg = () => {
        showEasterEgg.value = false
    }

    onMounted(() => {
        window.addEventListener('keydown', handleKeyPress)
    })

    onUnmounted(() => {
        window.removeEventListener('keydown', handleKeyPress)
    })

    return {
        showEasterEgg,
        closeEasterEgg
    }
}
