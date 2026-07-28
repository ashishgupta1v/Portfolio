// resources/js/Components/Scene3D/objects/Particles.ts
import * as THREE from 'three'
import type { SceneTier } from '@/types/scene3d'

export type ParticleType = 'dust' | 'digital'

export interface ParticleSystem {
    group: THREE.Group
    update: (delta: number, elapsed: number) => void
    dispose: () => void
}

export function createParticles(tier: SceneTier, type: ParticleType = 'dust'): ParticleSystem {
    const group = new THREE.Group()
    group.name = `Particles_${type}`

    const count = tier === 'full' ? (type === 'dust' ? 200 : 500) : (type === 'dust' ? 80 : 200)
    const spread = type === 'dust' ? 20 : 40

    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread

        velocities[i * 3] = (Math.random() - 0.5) * 0.02
        velocities[i * 3 + 1] = Math.random() * 0.01 + 0.005
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02

        sizes[i] = Math.random() * (type === 'dust' ? 0.05 : 0.08) + 0.02
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
        color: type === 'dust' ? 0xa7f3d0 : 0x22d3ee,
        size: type === 'dust' ? 0.04 : 0.06,
        transparent: true,
        opacity: type === 'dust' ? 0.4 : 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    group.add(points)

    function update(delta: number, elapsed: number) {
        const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
        const arr = posAttr.array as Float32Array
        const halfSpread = spread / 2

        for (let i = 0; i < count; i++) {
            arr[i * 3] += velocities[i * 3] * delta * 60
            arr[i * 3 + 1] += velocities[i * 3 + 1] * delta * 60
            arr[i * 3 + 2] += velocities[i * 3 + 2] * delta * 60

            if (arr[i * 3 + 1] > halfSpread) {
                arr[i * 3 + 1] = -halfSpread
            }
            if (Math.abs(arr[i * 3]) > halfSpread) {
                arr[i * 3] = -arr[i * 3] * 0.5
            }
            if (Math.abs(arr[i * 3 + 2]) > halfSpread) {
                arr[i * 3 + 2] = -arr[i * 3 + 2] * 0.5
            }
        }

        posAttr.needsUpdate = true

        if (type === 'digital') {
            material.opacity = 0.4 + Math.sin(elapsed * 2) * 0.2
        }
    }

    function dispose() {
        geometry.dispose()
        material.dispose()
    }

    return { group, update, dispose }
}
