// resources/js/Components/Scene3D/zones/ReturnZone.ts
import * as THREE from 'three'
import type { SceneContext, ZoneGroup } from '@/types/scene3d'

export function createReturnZone(): ZoneGroup {
    const group = new THREE.Group()
    group.name = 'ReturnZone'
    group.visible = false

    let warmLight: THREE.PointLight | null = null

    async function setup(ctx: SceneContext) {
        warmLight = new THREE.PointLight(0xffd4a0, 0, 50, 2)
        warmLight.position.set(0, 12, 2)
        group.add(warmLight)
    }

    function update(delta: number, progress: number) {
        if (warmLight) {
            warmLight.intensity = progress * 3
        }
    }

    function setVisibility(visible: boolean) {
        group.visible = visible
        if (warmLight) {
            warmLight.intensity = visible ? 1 : 0
        }
    }

    function dispose() {
        warmLight?.dispose()
    }

    return { id: 'return', group, setup, update, setVisibility, dispose }
}
