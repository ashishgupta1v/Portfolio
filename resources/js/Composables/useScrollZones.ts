// resources/js/Composables/useScrollZones.ts
import { ref, onUnmounted } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ZoneId, ZoneGroup } from '@/types/scene3d'

gsap.registerPlugin(ScrollTrigger)

interface CameraKeyframe {
    position: [number, number, number]
    lookAt: [number, number, number]
    fov: number
}

const ZONE_CAMERAS: Record<ZoneId, { start: CameraKeyframe; end: CameraKeyframe }> = {
    workshop: {
        start: { position: [0, 13.1, 24.7], lookAt: [0, 10, 0], fov: 14.5 },
        end: { position: [0, 12, 8], lookAt: [0, 10, 0], fov: 20 },
    },
    screen: {
        start: { position: [0, 11.5, 5], lookAt: [0, 10, 0], fov: 30 },
        end: { position: [0, 8, 0], lookAt: [0, 8, 0], fov: 50 },
    },
    constellation: {
        start: { position: [0, 8, 20], lookAt: [0, 5, 0], fov: 35 },
        end: { position: [5, 6, 15], lookAt: [0, 4, -5], fov: 40 },
    },
    offering: {
        start: { position: [0, 5, 12], lookAt: [0, 3, 0], fov: 35 },
        end: { position: [0, 4, 10], lookAt: [0, 3, 0], fov: 30 },
    },
    return: {
        start: { position: [3, 12, 20], lookAt: [0, 10, 0], fov: 18 },
        end: { position: [0, 13, 22], lookAt: [0, 10, 0], fov: 16 },
    },
}

const ZONE_ORDER: ZoneId[] = ['workshop', 'screen', 'constellation', 'offering', 'return']

export function useScrollZones(
    camera: THREE.PerspectiveCamera,
    zones: ZoneGroup[],
    scrollContainer: HTMLElement
) {
    const currentZone = ref<ZoneId>('workshop')
    const scrollProgress = ref(0)
    const triggers: ScrollTrigger[] = []
    let masterTimeline: gsap.core.Timeline | null = null

    function init() {
        masterTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: scrollContainer,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    scrollProgress.value = self.progress

                    const zoneIndex = Math.min(
                        Math.floor(self.progress * ZONE_ORDER.length),
                        ZONE_ORDER.length - 1
                    )
                    const newZone = ZONE_ORDER[zoneIndex]

                    if (newZone !== currentZone.value) {
                        currentZone.value = newZone

                        for (const zone of zones) {
                            zone.setVisibility(zone.id === newZone ||
                                (newZone === 'return' && zone.id === 'workshop'))
                        }
                    }

                    const zoneProgress = (self.progress * ZONE_ORDER.length) - zoneIndex
                    const zoneId = ZONE_ORDER[zoneIndex]
                    const cam = ZONE_CAMERAS[zoneId]

                    camera.position.set(
                        THREE.MathUtils.lerp(cam.start.position[0], cam.end.position[0], zoneProgress),
                        THREE.MathUtils.lerp(cam.start.position[1], cam.end.position[1], zoneProgress),
                        THREE.MathUtils.lerp(cam.start.position[2], cam.end.position[2], zoneProgress),
                    )

                    const lookTarget = new THREE.Vector3(
                        THREE.MathUtils.lerp(cam.start.lookAt[0], cam.end.lookAt[0], zoneProgress),
                        THREE.MathUtils.lerp(cam.start.lookAt[1], cam.end.lookAt[1], zoneProgress),
                        THREE.MathUtils.lerp(cam.start.lookAt[2], cam.end.lookAt[2], zoneProgress),
                    )
                    camera.lookAt(lookTarget)

                    camera.fov = THREE.MathUtils.lerp(cam.start.fov, cam.end.fov, zoneProgress)
                    camera.updateProjectionMatrix()

                    const activeZone = zones.find(z => z.id === zoneId)
                    activeZone?.update(0.016, zoneProgress)
                },
            },
        })

        triggers.push(masterTimeline.scrollTrigger as ScrollTrigger)
    }

    function dispose() {
        triggers.forEach(t => t.kill())
        triggers.length = 0
        masterTimeline?.kill()
    }

    onUnmounted(dispose)

    return {
        currentZone,
        scrollProgress,
        init,
        dispose,
    }
}
