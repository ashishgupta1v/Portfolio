// resources/js/Components/Scene3D/objects/ProjectCard.ts
import * as THREE from 'three'
import type { Project } from '@/types/portfolio'

export interface ProjectCardObject {
    group: THREE.Group
    update: (elapsed: number) => void
    dispose: () => void
}

export function createProjectCard(project: Project, index: number): ProjectCardObject {
    const group = new THREE.Group()
    group.name = `ProjectCard_${project.slug}`

    const cardWidth = 3
    const cardHeight = 2
    const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight)

    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 340
    const ctx = canvas.getContext('2d')!

    ctx.fillStyle = '#0f1729'
    ctx.fillRect(0, 0, 512, 340)

    ctx.strokeStyle = 'rgba(94, 234, 212, 0.3)'
    ctx.lineWidth = 2
    ctx.strokeRect(4, 4, 504, 332)

    ctx.fillStyle = '#5eead4'
    ctx.font = 'bold 28px sans-serif'
    ctx.fillText(project.title, 24, 60)

    ctx.fillStyle = 'rgba(226, 232, 240, 0.7)'
    ctx.font = '16px sans-serif'
    const desc = project.description.length > 80
        ? project.description.slice(0, 77) + '...'
        : project.description
    ctx.fillText(desc, 24, 100)

    ctx.fillStyle = 'rgba(94, 234, 212, 0.6)'
    ctx.font = '14px monospace'
    const tools = project.tools.slice(0, 4).join(' · ')
    ctx.fillText(tools, 24, 140)

    ctx.fillStyle = '#22d3ee'
    ctx.font = 'bold 14px sans-serif'
    ctx.fillText(project.category.toUpperCase(), 24, 300)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 0.95,
    })

    const cardMesh = new THREE.Mesh(geometry, material)
    group.add(cardMesh)

    const angle = (index / 5) * Math.PI * 2
    const radius = 8
    group.position.set(
        Math.cos(angle) * radius,
        (index - 2) * 1.5,
        Math.sin(angle) * radius - 5
    )

    const baseY = group.position.y
    const phaseOffset = index * 1.2

    function update(elapsed: number) {
        group.position.y = baseY + Math.sin(elapsed * 0.4 + phaseOffset) * 0.3
        cardMesh.lookAt(0, group.position.y, 25)
    }

    function dispose() {
        geometry.dispose()
        material.dispose()
        texture.dispose()
    }

    return { group, update, dispose }
}
