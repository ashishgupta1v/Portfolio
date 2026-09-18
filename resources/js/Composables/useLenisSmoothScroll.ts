import { ref } from 'vue'
import type Lenis from 'lenis'

const lenisInstance = ref<Lenis | null>(null)

export function useLenisSmoothScroll() {
    let tickerCallback: ((time: number) => void) | null = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsapInstance: any = null

    async function initLenis() {
        if (typeof window === 'undefined') return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        if (lenisInstance.value) {
            lenisInstance.value.destroy()
        }

        const [{ default: LenisClass }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
            import('lenis'),
            import('gsap'),
            import('gsap/ScrollTrigger'),
        ])

        gsap.registerPlugin(ScrollTrigger)
        gsapInstance = gsap

        const lenis = new LenisClass({
            duration: 1.15,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
            infinite: false,
        })

        lenisInstance.value = lenis

        lenis.on('scroll', ScrollTrigger.update)

        tickerCallback = (time: number) => {
            lenis.raf(time * 1000)
        }

        gsap.ticker.add(tickerCallback)
        gsap.ticker.lagSmoothing(0)
    }

    function destroyLenis() {
        if (tickerCallback && gsapInstance) {
            gsapInstance.ticker.remove(tickerCallback)
            tickerCallback = null
        }
        if (lenisInstance.value) {
            lenisInstance.value.destroy()
            lenisInstance.value = null
        }
    }

    function pauseScroll() {
        lenisInstance.value?.stop()
    }

    function resumeScroll() {
        lenisInstance.value?.start()
    }

    function scrollTo(target: string | HTMLElement | number, options?: Record<string, unknown>) {
        lenisInstance.value?.scrollTo(target, options)
    }

    return {
        lenis: lenisInstance,
        initLenis,
        destroyLenis,
        pauseScroll,
        resumeScroll,
        scrollTo,
    }
}
