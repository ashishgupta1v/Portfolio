import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

export function useCursor() {
    const dotX = ref(0)
    const dotY = ref(0)
    const ringX = ref(0)
    const ringY = ref(0)
    const cursorScale = ref(1)
    const cursorVisible = ref(true)

    let rafId: number | null = null
    let targetX = 0
    let targetY = 0

    function onMouseMove(e: MouseEvent) {
        targetX = e.clientX
        targetY = e.clientY

        // Update dot position instantly to match the hardware cursor speed
        dotX.value = targetX
        dotY.value = targetY

        const target = e.target as HTMLElement
        const cursorType = target?.closest('[data-cursor]')?.getAttribute('data-cursor')

        if (cursorType === 'disable') {
            cursorScale.value = 0.3
        } else if (cursorType === 'icons') {
            cursorScale.value = 2
        } else {
            cursorScale.value = 1
        }
    }

    function onMouseLeave() {
        cursorVisible.value = false
    }

    function onMouseEnter() {
        cursorVisible.value = true
    }

    function updatePosition() {
        // Smoothly interpolate the cursor ring
        ringX.value += (targetX - ringX.value) * 0.15
        ringY.value += (targetY - ringY.value) * 0.15
        rafId = requestAnimationFrame(updatePosition)
    }

    onMounted(() => {
        window.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseleave', onMouseLeave)
        document.addEventListener('mouseenter', onMouseEnter)
        updatePosition()
    })

    onUnmounted(() => {
        window.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseleave', onMouseLeave)
        document.removeEventListener('mouseenter', onMouseEnter)
        if (rafId) cancelAnimationFrame(rafId)
    })

    return { dotX, dotY, ringX, ringY, cursorScale, cursorVisible }
}
