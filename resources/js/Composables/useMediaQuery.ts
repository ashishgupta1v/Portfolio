import { ref, onMounted, onUnmounted } from 'vue'

export function useMediaQuery(query: string) {
    const matches = ref(false)
    let mediaQuery: MediaQueryList | null = null

    function update() {
        if (mediaQuery) {
            matches.value = mediaQuery.matches
        }
    }

    onMounted(() => {
        mediaQuery = window.matchMedia(query)
        matches.value = mediaQuery.matches
        mediaQuery.addEventListener('change', update)
    })

    onUnmounted(() => {
        mediaQuery?.removeEventListener('change', update)
    })

    return matches
}

export function useIsDesktop() {
    return useMediaQuery('(min-width: 1024px)')
}
