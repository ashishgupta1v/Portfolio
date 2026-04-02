<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Skill } from '@/types/portfolio'
import * as THREE from 'three'
import { useGsap } from '@/Composables/useGsap'

const props = defineProps<{
    skills: Record<string, Skill[]>
}>()

const { gsap, ScrollTrigger } = useGsap()
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isVisible = ref(false)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let spheres: THREE.Mesh[] = []
let animationId: number | null = null
let mouse = { x: 0, y: 0 }

const allSkills = Object.values(props.skills).flat()

// Generate tech logo colors for spheres
const colors = [
    0x5eead4, // accent
    0x22d3ee, // cyan
    0x818cf8, // indigo
    0xf472b6, // pink
    0xfbbf24, // amber
    0x34d399, // emerald
    0xa78bfa, // violet
    0xfb923c, // orange
]

function initScene() {
    if (!canvasRef.value) return

    const rect = canvasRef.value.getBoundingClientRect()

    renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        alpha: true,
        antialias: true,
    })
    renderer.setSize(rect.width, rect.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(45, rect.width / rect.height, 0.1, 100)
    camera.position.z = 15

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
    scene.add(ambientLight)

    const spotLight = new THREE.SpotLight(0x5eead4, 1.5, 50, Math.PI / 4, 0.5, 2)
    spotLight.position.set(5, 10, 10)
    scene.add(spotLight)

    // Create spheres
    const geometry = new THREE.SphereGeometry(0.4, 32, 32)

    for (let i = 0; i < Math.min(allSkills.length, 25); i++) {
        const material = new THREE.MeshPhysicalMaterial({
            color: colors[i % colors.length],
            metalness: 0.3,
            roughness: 0.4,
            clearcoat: 0.5,
            clearcoatRoughness: 0.2,
            transparent: true,
            opacity: 0.85,
        })

        const sphere = new THREE.Mesh(geometry, material)
        sphere.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4,
        )
        sphere.userData = {
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
            ),
            skillName: allSkills[i]?.name || '',
        }

        scene.add(sphere)
        spheres.push(sphere)
    }
}

function animate() {
    if (!renderer || !scene || !camera) return
    animationId = requestAnimationFrame(animate)

    spheres.forEach((sphere) => {
        // Apply velocity
        sphere.position.add(sphere.userData.velocity)

        // Mouse influence
        const dx = mouse.x * 5 - sphere.position.x
        const dy = mouse.y * 3 - sphere.position.y
        sphere.userData.velocity.x += dx * 0.0002
        sphere.userData.velocity.y += dy * 0.0002

        // Damping
        sphere.userData.velocity.multiplyScalar(0.99)

        // Boundary bounce
        if (Math.abs(sphere.position.x) > 6) sphere.userData.velocity.x *= -0.8
        if (Math.abs(sphere.position.y) > 4) sphere.userData.velocity.y *= -0.8
        if (Math.abs(sphere.position.z) > 3) sphere.userData.velocity.z *= -0.8

        // Slow rotation
        sphere.rotation.x += 0.005
        sphere.rotation.y += 0.005
    })

    renderer.render(scene, camera)
}

function onMouseMove(e: MouseEvent) {
    if (!canvasRef.value) return
    const rect = canvasRef.value.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
}

function onResize() {
    if (!canvasRef.value || !renderer || !camera) return
    const rect = canvasRef.value.getBoundingClientRect()
    renderer.setSize(rect.width, rect.height)
    camera.aspect = rect.width / rect.height
    camera.updateProjectionMatrix()
}

onMounted(() => {
    ScrollTrigger.create({
        trigger: '.techstack-section',
        start: 'top 80%',
        onEnter: () => {
            if (!isVisible.value) {
                isVisible.value = true
                initScene()
                animate()
            }
        },
    })

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)
})

onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
    renderer?.dispose()
    scene?.clear()
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
})
</script>

<template>
    <section class="techstack-section">
        <div class="section-container">
            <div class="techstack-content">
                <h2 class="techstack-title">TECH STACK</h2>

                <!-- 3D Canvas -->
                <div class="canvas-wrapper">
                    <canvas ref="canvasRef" class="techstack-canvas" />
                </div>

                <!-- Skills list overlay -->
                <div class="skills-overlay">
                    <div
                        v-for="(skillGroup, category) in skills"
                        :key="category"
                        class="skill-group"
                    >
                        <h4 class="skill-category">{{ category }}</h4>
                        <div class="skill-tags">
                            <span
                                v-for="skill in skillGroup"
                                :key="skill.name"
                                class="skill-tag"
                            >
                                {{ skill.name }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.techstack-section {
    padding: 8rem 0;
    position: relative;
}

.techstack-title {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    color: white;
    margin-bottom: 2rem;
    letter-spacing: -0.02em;
}

.techstack-content {
    position: relative;
}

.canvas-wrapper {
    width: 100%;
    height: 400px;
    position: relative;
    margin-bottom: 3rem;
}

.techstack-canvas {
    width: 100%;
    height: 100%;
    display: block;
}

.skills-overlay {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
}

.skill-category {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 500;
    margin-bottom: 0.75rem;
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.skill-tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.6rem;
    border: 1px solid rgba(94, 234, 212, 0.12);
    color: rgba(255, 255, 255, 0.6);
    transition: all 0.3s ease;
}

.skill-tag:hover {
    border-color: rgba(94, 234, 212, 0.4);
    color: white;
}
</style>
