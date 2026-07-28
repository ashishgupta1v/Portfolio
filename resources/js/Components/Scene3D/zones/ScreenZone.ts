// resources/js/Components/Scene3D/zones/ScreenZone.ts
import * as THREE from 'three'
import type { SceneContext, ZoneGroup, SceneTier } from '@/types/scene3d'
import { createParticles, type ParticleSystem } from '../objects/Particles'
import { createTechIcon, type TechIconObject } from '../objects/TechIcon'

const TECH_STACK = [
    { name: 'Vue', hue: 140 },
    { name: 'Laravel', hue: 0 },
    { name: 'TypeScript', hue: 210 },
    { name: 'PostgreSQL', hue: 220 },
    { name: 'Docker', hue: 200 },
    { name: 'Redis', hue: 0 },
    { name: 'Tailwind', hue: 190 },
    { name: 'Three.js', hue: 0 },
    { name: 'GSAP', hue: 120 },
    { name: 'Inertia', hue: 260 },
    { name: 'Python', hue: 50 },
    { name: 'AWS', hue: 30 },
]

export function createScreenZone(tier: SceneTier): ZoneGroup {
    const group = new THREE.Group()
    group.name = 'ScreenZone'
    group.visible = false

    let particles: ParticleSystem | null = null
    const techIcons: TechIconObject[] = []

    async function setup(ctx: SceneContext) {
        particles = createParticles(tier, 'digital')
        group.add(particles.group)

        for (let i = 0; i < TECH_STACK.length; i++) {
            const icon = createTechIcon(TECH_STACK[i].name, TECH_STACK[i].hue, i)
            techIcons.push(icon)
            group.add(icon.mesh)
        }
    }

    function update(delta: number, progress: number) {
        const elapsed = performance.now() / 1000
        particles?.update(delta, elapsed)
        for (const icon of techIcons) {
            icon.update(elapsed)
        }
    }

    function setVisibility(visible: boolean) {
        group.visible = visible
    }

    function dispose() {
        particles?.dispose()
        for (const icon of techIcons) {
            icon.dispose()
        }
        techIcons.length = 0
    }

    return { id: 'screen', group, setup, update, setVisibility, dispose }
}
