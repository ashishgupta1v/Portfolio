import { ref } from 'vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenisInstance = ref<Lenis | null>(null)

export function useLenisSmoothScroll() {
    let tickerCallback: ((time: number) => void) | null = null

    function initLenis() {
        if (typeof window === 'undefined') return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        if (lenisInstance.value) {
            lenisInstance.value.destroy()
        }

        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
        if (tickerCallback) {
            gsap.ticker.remove(tickerCallback)
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
