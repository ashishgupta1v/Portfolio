// resources/js/Components/Scene3D/zones/ConstellationZone.ts
import * as THREE from 'three'
import type { SceneContext, ZoneGroup } from '@/types/scene3d'
import type { Project } from '@/types/portfolio'
import { createProjectCard, type ProjectCardObject } from '../objects/ProjectCard'

export function createConstellationZone(projects: Project[]): ZoneGroup {
    const group = new THREE.Group()
    group.name = 'ConstellationZone'
    group.visible = false

    const cards: ProjectCardObject[] = []

    async function setup(ctx: SceneContext) {
        const displayProjects = projects.slice(0, 5)
        for (let i = 0; i < displayProjects.length; i++) {
            const card = createProjectCard(displayProjects[i], i)
            cards.push(card)
            group.add(card.group)
        }
    }

    function update(delta: number, progress: number) {
        const elapsed = performance.now() / 1000
        for (const card of cards) {
            card.update(elapsed)
        }
    }

    function setVisibility(visible: boolean) {
        group.visible = visible
    }

    function dispose() {
        for (const card of cards) {
            card.dispose()
        }
        cards.length = 0
    }

    return { id: 'constellation', group, setup, update, setVisibility, dispose }
}
