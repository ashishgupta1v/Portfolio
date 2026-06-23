import * as THREE from 'three'

export function disposeThreeResource(resource: any) {
    if (!resource) return

    if (resource instanceof THREE.Object3D) {
        resource.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (child.geometry) {
                    child.geometry.dispose()
                }

                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach((mat) => disposeMaterial(mat))
                    } else {
                        disposeMaterial(child.material)
                    }
                }
            }
        })
    } else if (resource instanceof THREE.Scene) {
        resource.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (child.geometry) child.geometry.dispose()
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach((mat) => disposeMaterial(mat))
                    } else {
                        disposeMaterial(child.material)
                    }
                }
            }
        })
        if (resource.environment) {
            resource.environment.dispose()
        }
        resource.clear()
    }
}

function disposeMaterial(material: THREE.Material) {
    material.dispose()

    // Dispose of textures attached to the material
    for (const key of Object.keys(material)) {
        const value = (material as any)[key]
        if (value && typeof value === 'object' && 'minFilter' in value) {
            value.dispose()
        }
    }
}
