import { ref, watch, onMounted } from 'vue'
import gsap from 'gsap'

const reduceMotion = ref(false)

export function useA11y() {
    onMounted(() => {
        // Check system preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        reduceMotion.value = mediaQuery.matches || localStorage.getItem('reduceMotion') === 'true'

        // Listen for system changes
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('reduceMotion')) {
                reduceMotion.value = e.matches
            }
        })

        applyMotionSettings(reduceMotion.value)
    })

    watch(reduceMotion, (val) => {
        localStorage.setItem('reduceMotion', String(val))
        applyMotionSettings(val)
    })

    function toggleMotion() {
        reduceMotion.value = !reduceMotion.value
    }

    function applyMotionSettings(reduce: boolean) {
        if (reduce) {
            // Globally disable GSAP animations
            gsap.globalTimeline.timeScale(1000) // Fast-forward all animations
            document.documentElement.style.setProperty('--scroll-behavior', 'auto')
            document.body.classList.add('reduce-motion')
        } else {
            // Restore GSAP animations
            gsap.globalTimeline.timeScale(1)
            document.documentElement.style.setProperty('--scroll-behavior', 'smooth')
            document.body.classList.remove('reduce-motion')
        }
    }

    return {
        reduceMotion,
        toggleMotion
    }
}
