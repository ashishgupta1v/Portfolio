// resources/js/Composables/useDeviceCapability.ts
import { ref, onMounted } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import type { SceneTier } from '@/types/scene3d'

export function useDeviceCapability() {
    const canRun3D = ref(false)
    const tier = ref<SceneTier>('fallback')
    const isMobile = useMediaQuery('(max-width: 767px)')
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)')

    function checkWebGL2(): boolean {
        try {
            const canvas = document.createElement('canvas')
            const gl = canvas.getContext('webgl2')
            if (!gl) return false
            const ext = gl.getExtension('WEBGL_lose_context')
            if (ext) ext.loseContext()
            return true
        } catch {
            return false
        }
    }

    function checkCapability() {
        const hasWebGL2 = checkWebGL2()
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (!hasWebGL2 || isMobile.value || prefersReducedMotion) {
            canRun3D.value = false
            tier.value = 'fallback'
        } else if (isTablet.value) {
            canRun3D.value = true
            tier.value = 'simplified'
        } else {
            canRun3D.value = true
            tier.value = 'full'
        }
    }

    onMounted(checkCapability)

    return {
        canRun3D,
        tier,
        isMobile,
        checkCapability,
    }
}
