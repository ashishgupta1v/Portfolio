// resources/js/Components/Scene3D/zones/WorkshopZone.ts
import * as THREE from 'three'
import type { SceneContext, ZoneGroup, SceneTier } from '@/types/scene3d'
import type { LoadedAssets } from '@/Composables/useAssetLoader'
import { createAvatar, type AvatarObject } from '../objects/Avatar'
import { createWorkspace, type WorkspaceObject } from '../objects/Workspace'
import { createParticles, type ParticleSystem } from '../objects/Particles'
import { useProceduralAnimation } from '@/Composables/useProceduralAnimation'

export function createWorkshopZone(
    assets: LoadedAssets,
    tier: SceneTier
): ZoneGroup {
    const group = new THREE.Group()
    group.name = 'WorkshopZone'

    let avatar: AvatarObject | null = null
    let workspace: WorkspaceObject | null = null
    let particles: ParticleSystem | null = null
    let animation: ReturnType<typeof useProceduralAnimation> | null = null

    function onMouseMove(e: MouseEvent) {
        const x = (e.clientX / window.innerWidth) * 2 - 1
        const y = -(e.clientY / window.innerHeight) * 2 + 1
        animation?.setMouseTarget(x, y)
    }

    async function setup(ctx: SceneContext) {
        workspace = createWorkspace(assets.workspace)
        workspace.group.position.set(0, 0, 0)
        workspace.group.scale.setScalar(5)
        group.add(workspace.group)

        avatar = createAvatar(assets.avatar)
        avatar.group.position.set(0, 5.5, 1)
        avatar.group.scale.setScalar(5)
        group.add(avatar.group)

        animation = useProceduralAnimation(avatar.boneRefs)
        animation.setMode('typing')

        if (tier !== 'simplified') {
            particles = createParticles(tier, 'dust')
            particles.group.position.set(0, 10, 0)
            group.add(particles.group)
        }

        window.addEventListener('mousemove', onMouseMove)
    }

    function update(delta: number, progress: number) {
        const elapsed = performance.now() / 1000
        animation?.update(delta, elapsed)
        particles?.update(delta, elapsed)
    }

    function setVisibility(visible: boolean) {
        group.visible = visible
    }

    function dispose() {
        window.removeEventListener('mousemove', onMouseMove)
        avatar?.dispose()
        workspace?.dispose()
        particles?.dispose()
        animation?.dispose()
    }

    return { id: 'workshop', group, setup, update, setVisibility, dispose }
}
