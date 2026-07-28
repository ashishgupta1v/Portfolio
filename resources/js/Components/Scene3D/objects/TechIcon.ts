// resources/js/Components/Scene3D/objects/TechIcon.ts
import * as THREE from 'three'

export interface TechIconObject {
    mesh: THREE.Mesh
    update: (elapsed: number) => void
    dispose: () => void
}

export function createTechIcon(name: string, hue: number, index: number): TechIconObject {
    const size = 0.8
    const geometry = new THREE.PlaneGeometry(size, size)

    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = `hsl(${hue}, 70%, 15%)`
    ctx.fillRect(0, 0, 128, 128)
    ctx.fillStyle = `hsl(${hue}, 80%, 70%)`
    ctx.font = 'bold 24px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const abbreviation = name.length <= 3 ? name : name.slice(0, 3).toUpperCase()
    ctx.fillText(abbreviation, 64, 54)
    ctx.font = '12px monospace'
    ctx.fillText(name, 64, 82)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 0.9,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = `TechIcon_${name}`

    const angle = (index / 12) * Math.PI * 2
    const radius = 6 + Math.random() * 4
    mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 6,
        Math.sin(angle) * radius
    )

    const baseY = mesh.position.y
    const phaseOffset = Math.random() * Math.PI * 2
    const floatSpeed = 0.5 + Math.random() * 0.5

    function update(elapsed: number) {
        mesh.position.y = baseY + Math.sin(elapsed * floatSpeed + phaseOffset) * 0.3
        mesh.rotation.y = elapsed * 0.2 + phaseOffset
    }

    function dispose() {
        geometry.dispose()
        material.dispose()
        texture.dispose()
    }

    return { mesh, update, dispose }
}
