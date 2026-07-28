// resources/js/Components/Scene3D/objects/Workspace.ts
import * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

export interface WorkspaceObject {
    group: THREE.Group
    screenMesh: THREE.Mesh | null
    dispose: () => void
}

export function createWorkspace(gltf: GLTF): WorkspaceObject {
    const group = new THREE.Group()
    group.name = 'WorkspaceGroup'
    const model = gltf.scene
    group.add(model)

    let screenMesh: THREE.Mesh | null = null

    model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true
            child.receiveShadow = true
            const name = child.name.toLowerCase()
            if (name.includes('screen') || name.includes('monitor') || name.includes('display')) {
                screenMesh = child
            }
        }
    })

    if (import.meta.env.DEV) {
        const meshNames: string[] = []
        model.traverse((child) => {
            if (child instanceof THREE.Mesh) meshNames.push(child.name)
        })
        console.log('[Workspace] Meshes:', meshNames)
        // Cast works around a TS control-flow limitation: `screenMesh` is only ever
        // reassigned inside the traverse() closure above, so TS narrows its type to
        // `never` at this read site instead of widening back to `Mesh | null`.
        console.log('[Workspace] Screen mesh:', (screenMesh as THREE.Mesh | null)?.name ?? 'NOT FOUND')
    }

    return {
        group,
        screenMesh,
        dispose() {
            group.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry?.dispose()
                    const mats = Array.isArray(child.material) ? child.material : [child.material]
                    mats.forEach((m) => m?.dispose())
                }
            })
        },
    }
}
