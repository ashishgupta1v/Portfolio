// resources/js/Composables/useProceduralAnimation.ts
import * as THREE from 'three'
import gsap from 'gsap'
import type { BoneRefs } from '@/types/scene3d'

export type AnimationMode = 'idle' | 'typing'

export function useProceduralAnimation(boneRefs: BoneRefs) {
    let mode: AnimationMode = 'idle'
    let mouseX = 0
    let mouseY = 0
    let waveActive = false
    let waveTween: gsap.core.Timeline | null = null

    const initialRotations: Partial<Record<keyof BoneRefs, THREE.Euler>> = {}
    for (const [key, bone] of Object.entries(boneRefs)) {
        if (bone) {
            initialRotations[key as keyof BoneRefs] = bone.rotation.clone()
        }
    }

    function setMode(newMode: AnimationMode) {
        mode = newMode
    }

    function setMouseTarget(x: number, y: number) {
        mouseX = x
        mouseY = y
    }

    function startWave() {
        if (waveActive || !boneRefs.rightShoulder || !boneRefs.rightArm || !boneRefs.rightForeArm) return
        waveActive = true

        waveTween = gsap.timeline({
            onComplete: () => {
                waveActive = false
            },
        })

        waveTween.to(boneRefs.rightShoulder.rotation, { z: -0.8, duration: 0.4, ease: 'power2.out' })
        waveTween.to(boneRefs.rightArm.rotation, { z: -1.2, duration: 0.3, ease: 'power2.out' }, '<0.1')
        waveTween.to(boneRefs.rightForeArm.rotation, { z: -0.3, x: 0.4, duration: 0.3, ease: 'power2.out' }, '<0.1')

        waveTween.to(boneRefs.rightForeArm.rotation, { x: -0.3, duration: 0.25, ease: 'sine.inOut', yoyo: true, repeat: 3 })

        waveTween.to(boneRefs.rightShoulder.rotation, { z: initialRotations.rightShoulder?.z ?? 0, duration: 0.4, ease: 'power2.inOut' })
        waveTween.to(boneRefs.rightArm.rotation, { z: initialRotations.rightArm?.z ?? 0, duration: 0.3, ease: 'power2.inOut' }, '<0.1')
        waveTween.to(boneRefs.rightForeArm.rotation, { z: initialRotations.rightForeArm?.z ?? 0, x: initialRotations.rightForeArm?.x ?? 0, duration: 0.3, ease: 'power2.inOut' }, '<0.1')
    }

    function updateBreathing(elapsed: number) {
        const breathAmt = Math.sin(elapsed * 1.5) * 0.015
        if (boneRefs.spine) boneRefs.spine.rotation.x = (initialRotations.spine?.x ?? 0) + breathAmt
        if (boneRefs.spine01) boneRefs.spine01.rotation.x = (initialRotations.spine01?.x ?? 0) + breathAmt * 0.7
        if (boneRefs.spine02) boneRefs.spine02.rotation.x = (initialRotations.spine02?.x ?? 0) + breathAmt * 0.4
    }

    function updateBodySway(elapsed: number) {
        if (!boneRefs.hips) return
        const swayAmt = Math.sin(elapsed * 0.3) * 0.008
        boneRefs.hips.rotation.z = (initialRotations.hips?.z ?? 0) + swayAmt
    }

    function updateHeadTracking() {
        if (!boneRefs.head && !boneRefs.neck) return
        const maxRotation = Math.PI / 6
        const targetY = mouseX * maxRotation
        const targetX = -mouseY * maxRotation * 0.5
        const lerp = 0.04

        if (boneRefs.neck) {
            boneRefs.neck.rotation.y += (targetY * 0.4 - (boneRefs.neck.rotation.y - (initialRotations.neck?.y ?? 0))) * lerp
        }
        if (boneRefs.head) {
            boneRefs.head.rotation.y += (targetY * 0.6 - (boneRefs.head.rotation.y - (initialRotations.head?.y ?? 0))) * lerp
            boneRefs.head.rotation.x += (targetX - (boneRefs.head.rotation.x - (initialRotations.head?.x ?? 0))) * lerp
        }
    }

    function updateTyping(elapsed: number) {
        if (mode !== 'typing') return

        const speed = 8
        const amplitude = 0.03

        if (boneRefs.leftHand) {
            boneRefs.leftHand.position.y = (Math.sin(elapsed * speed) * amplitude)
        }
        if (boneRefs.rightHand) {
            boneRefs.rightHand.position.y = (Math.sin(elapsed * speed + 1.5) * amplitude)
        }

        if (boneRefs.leftForeArm) {
            boneRefs.leftForeArm.rotation.x = (initialRotations.leftForeArm?.x ?? 0) + Math.sin(elapsed * speed * 0.5) * 0.02
        }
        if (boneRefs.rightForeArm) {
            boneRefs.rightForeArm.rotation.x = (initialRotations.rightForeArm?.x ?? 0) + Math.sin(elapsed * speed * 0.5 + 1) * 0.02
        }
    }

    function update(delta: number, elapsed: number) {
        updateBreathing(elapsed)
        updateBodySway(elapsed)
        updateHeadTracking()

        if (mode === 'typing' && !waveActive) {
            updateTyping(elapsed)
        }
    }

    function dispose() {
        waveTween?.kill()
    }

    return {
        update,
        setMode,
        setMouseTarget,
        startWave,
        dispose,
    }
}
