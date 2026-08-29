import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useMouseDepth(strength: number = 1) {
    const mx = ref(0)
    const my = ref(0)
    const enabled = ref(true)
    let rafId: number | null = null
    let latestClientX = 0
    let latestClientY = 0

    function updateCoordinates() {
        if (!enabled.value) return
        mx.value = parseFloat(((latestClientX / window.innerWidth - 0.5) * 2).toFixed(3))
        my.value = parseFloat(((latestClientY / window.innerHeight - 0.5) * 2).toFixed(3))
        rafId = null
    }

    function onMove(e: MouseEvent) {
        if (!enabled.value) return
        latestClientX = e.clientX
        latestClientY = e.clientY
        if (!rafId) {
            rafId = requestAnimationFrame(updateCoordinates)
        }
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
        if (rafId) cancelAnimationFrame(rafId)
    })

    const depthVars = computed(() => ({
        '--mx': `${mx.value}`,
        '--my': `${my.value}`,
        '--depth-rx': `${(-my.value * strength * 2).toFixed(2)}deg`,
        '--depth-ry': `${(mx.value * strength * 2).toFixed(2)}deg`,
        '--depth-tx': `${(mx.value * strength * 8).toFixed(1)}px`,
        '--depth-ty': `${(my.value * strength * 8).toFixed(1)}px`,
    }) as Record<string, string>)

    return { mx, my, depthVars, enabled }
}
