// resources/js/Components/Scene3D/objects/GlassPanel.ts
import * as THREE from 'three'

export interface GlassPanelObject {
    group: THREE.Group
    update: (elapsed: number) => void
    dispose: () => void
}

export function createGlassPanel(title: string, description: string, index: number): GlassPanelObject {
    const group = new THREE.Group()
    group.name = `GlassPanel_${index}`

    const panelWidth = 2.5
    const panelHeight = 3.2
    const geometry = new THREE.PlaneGeometry(panelWidth, panelHeight, 1, 1)

    const material = new THREE.MeshPhysicalMaterial({
        color: 0x1a2332,
        metalness: 0.0,
        roughness: 0.15,
        transmission: 0.85,
        thickness: 0.5,
        ior: 1.5,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
    })

    const panelMesh = new THREE.Mesh(geometry, material)
    group.add(panelMesh)

    const canvas = document.createElement('canvas')
    canvas.width = 400
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    ctx.clearRect(0, 0, 400, 512)
    ctx.fillStyle = '#5eead4'
    ctx.font = 'bold 32px sans-serif'
    ctx.fillText(title, 24, 60)

    ctx.fillStyle = 'rgba(226, 232, 240, 0.8)'
    ctx.font = '18px sans-serif'
    const words = description.split(' ')
    let line = ''
    let y = 110
    for (const word of words) {
        const test = line + word + ' '
        if (ctx.measureText(test).width > 350) {
            ctx.fillText(line.trim(), 24, y)
            line = word + ' '
            y += 26
        } else {
            line = test
        }
    }
    if (line.trim()) ctx.fillText(line.trim(), 24, y)

    const labelTexture = new THREE.CanvasTexture(canvas)
    labelTexture.colorSpace = THREE.SRGBColorSpace
    const labelMaterial = new THREE.MeshBasicMaterial({
        map: labelTexture,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
    })
    const labelGeometry = new THREE.PlaneGeometry(panelWidth * 0.9, panelHeight * 0.9)
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial)
    labelMesh.position.z = 0.01
    group.add(labelMesh)

    const spacing = 3.2
    const totalWidth = 3 * spacing
    group.position.set(
        (index - 1.5) * spacing,
        0,
        0
    )

    const baseY = group.position.y
    const phaseOffset = index * 0.8

    function update(elapsed: number) {
        group.position.y = baseY + Math.sin(elapsed * 0.5 + phaseOffset) * 0.15
    }

    function dispose() {
        geometry.dispose()
        material.dispose()
        labelGeometry.dispose()
        labelMaterial.dispose()
        labelTexture.dispose()
    }

    return { group, update, dispose }
}
