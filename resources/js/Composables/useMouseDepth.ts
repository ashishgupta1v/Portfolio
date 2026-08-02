import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useMouseDepth(strength: number = 1) {
    const mx = ref(0)
    const my = ref(0)
    const enabled = ref(true)

    function onMove(e: MouseEvent) {
        if (!enabled.value) return
        mx.value = (e.clientX / window.innerWidth - 0.5) * 2
        my.value = (e.clientY / window.innerHeight - 0.5) * 2
    }

    function checkReducedMotion() {
        enabled.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }

    onMounted(() => {
        checkReducedMotion()
        window.addEventListener('mousemove', onMove, { passive: true })
    })

    onUnmounted(() => {
        window.removeEventListener('mousemove', onMove)
    })

    const depthVars = computed(() => ({
        '--mx': mx.value.toFixed(4),
        '--my': my.value.toFixed(4),
        '--depth-rx': `${(-my.value * strength * 2).toFixed(3)}deg`,
        '--depth-ry': `${(mx.value * strength * 2).toFixed(3)}deg`,
        '--depth-tx': `${(mx.value * strength * 8).toFixed(2)}px`,
        '--depth-ty': `${(my.value * strength * 8).toFixed(2)}px`,
    }) as Record<string, string>)

    return { mx, my, depthVars, enabled }
}
