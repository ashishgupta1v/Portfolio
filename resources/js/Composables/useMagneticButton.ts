import { type Ref, onBeforeUnmount, onMounted } from 'vue'

export function useMagneticButton(elementRef: Ref<HTMLElement | null>, strength: number = 0.3) {
    function handleMouseMove(e: MouseEvent) {
        const el = elementRef.value
        if (!el) return

        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength

        el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`
    }

    function handleMouseLeave() {
        const el = elementRef.value
        if (!el) return
        el.style.transform = 'translate3d(0px, 0px, 0)'
        el.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
    }

    function handleMouseEnter() {
        const el = elementRef.value
        if (!el) return
        el.style.transition = 'none'
    }

    onMounted(() => {
        const el = elementRef.value
        if (!el) return
        el.addEventListener('mousemove', handleMouseMove)
        el.addEventListener('mouseleave', handleMouseLeave)
        el.addEventListener('mouseenter', handleMouseEnter)
    })

    onBeforeUnmount(() => {
        const el = elementRef.value
        if (!el) return
        el.removeEventListener('mousemove', handleMouseMove)
        el.removeEventListener('mouseleave', handleMouseLeave)
        el.removeEventListener('mouseenter', handleMouseEnter)
    })
}
