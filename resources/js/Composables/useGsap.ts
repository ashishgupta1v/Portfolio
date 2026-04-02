import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsap() {
    const triggers: ScrollTrigger[] = []

    function scrollTo(target: string) {
        const el = document.querySelector(target)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    function splitTextReveal(selector: string, triggerSelector?: string) {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => {
            const text = el.textContent || ''
            const words = text.split(' ')
            el.innerHTML = words
                .map((word) => `<span class="inline-block overflow-hidden"><span class="split-word inline-block translate-y-full opacity-0">${word}</span></span>`)
                .join(' ')

            const wordSpans = el.querySelectorAll('.split-word')
            const trigger = ScrollTrigger.create({
                trigger: triggerSelector || el,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(wordSpans, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.02,
                        ease: 'power3.out',
                    })
                },
                once: true,
            })
            triggers.push(trigger)
        })
    }

    function charReveal(selector: string, triggerSelector?: string) {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => {
            const text = el.textContent || ''
            el.innerHTML = text
                .split('')
                .map((char) => {
                    if (char === ' ') return ' '
                    return `<span class="inline-block overflow-hidden"><span class="split-char inline-block translate-y-full opacity-0">${char}</span></span>`
                })
                .join('')

            const charSpans = el.querySelectorAll('.split-char')
            const trigger = ScrollTrigger.create({
                trigger: triggerSelector || el,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(charSpans, {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.03,
                        ease: 'power2.inOut',
                    })
                },
                once: true,
            })
            triggers.push(trigger)
        })
    }

    function fadeIn(selector: string, options: gsap.TweenVars = {}) {
        gsap.from(selector, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out',
            ...options,
        })
    }

    function cleanup() {
        triggers.forEach((t) => t.kill())
        triggers.length = 0
    }

    onUnmounted(cleanup)

    return {
        gsap,
        ScrollTrigger,
        scrollTo,
        splitTextReveal,
        charReveal,
        fadeIn,
        cleanup,
    }
}
