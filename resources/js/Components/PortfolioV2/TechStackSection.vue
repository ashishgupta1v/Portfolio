<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<{ skills: Record<string, unknown[]> }>()

type BubbleSkill = {
    name: string
    size: number
    hue: number
}

type BubbleState = {
    x: number
    y: number
    vx: number
    vy: number
    homeX: number
    homeY: number
    r: number
}

const BUBBLE_SCALE = 1.1

const stackSkills: BubbleSkill[] = [
    { name: 'Vue 3', hue: 160, size: 1.24 },
    { name: 'Laravel', hue: 8, size: 1.28 },
    { name: 'JavaScript', hue: 52, size: 1.32 },
    { name: 'PHP', hue: 240, size: 1.26 },
    { name: 'PostgreSQL', hue: 205, size: 1.4 },
    { name: 'Inertia.js', hue: 258, size: 1.3 },
    { name: 'TypeScript', hue: 212, size: 1.24 },
    { name: 'Tailwind CSS', hue: 190, size: 1.18 },
    { name: 'Domain Driven Design', hue: 210, size: 1.12 },
    { name: 'Node.js', hue: 120, size: 1.08 },
    { name: 'MySQL', hue: 200, size: 1.04 },
    { name: 'HTML5', hue: 14, size: 1 },
    { name: 'CSS3', hue: 206, size: 0.98 },
    { name: 'Nuxt.js', hue: 152, size: 0.95 },
    { name: 'Vite', hue: 238, size: 0.92 },
    { name: 'SOLID', hue: 164, size: 0.89 },
    { name: 'Microservices', hue: 222, size: 0.96 },
    { name: 'RESTful API Design', hue: 2, size: 0.94 },
    { name: 'NPM', hue: 355, size: 0.82 },
    { name: 'Docker', hue: 204, size: 0.9 },
    { name: 'AWS', hue: 38, size: 0.88 },
    { name: 'Apache', hue: 355, size: 0.76 },
    { name: 'Nginx', hue: 134, size: 0.74 },
    { name: 'Jenkins', hue: 8, size: 0.72 },
    { name: 'Cursor', hue: 220, size: 0.8 },
    { name: 'Claude Code', hue: 36, size: 0.88 },
    { name: 'OpenClaw', hue: 262, size: 0.86 },
]

const sectionRef = ref<HTMLElement | null>(null)
const bubbleFieldRef = ref<HTMLElement | null>(null)

const bubbleRefs: HTMLElement[] = []
const state: BubbleState[] = []

let rafId: number | null = null
let startTime = 0

const mouse = {
    x: 0,
    y: 0,
    active: false,
}

function setBubbleRef(el: Element | object | null, index: number) {
    if (!el) return
    bubbleRefs[index] = el as HTMLElement
}

function initCluster() {
    const field = bubbleFieldRef.value
    if (!field) return

    const w = field.clientWidth
    const count = stackSkills.length

    // Set fixed central area for cluster
    const neededH = 500
    field.style.minHeight = `${neededH}px`

    const centerX = w / 2
    const centerY = neededH / 2

    state.length = 0
    for (let i = 0; i < count; i++) {
        // Base width calculation: 4.1rem is roughly 65.6px root -> r is half
        const r = 32.8 * stackSkills[i].size * BUBBLE_SCALE
        const homeX = centerX + (Math.random() - 0.5) * 50
        const homeY = centerY + (Math.random() - 0.5) * 50

        state.push({
            x: homeX,
            y: homeY,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            homeX: centerX,
            homeY: centerY,
            r,
        })
    }

    startTime = Date.now()
}

function animate() {
    const field = bubbleFieldRef.value
    if (!field) return

    const w = field.clientWidth
    const h = field.clientHeight
    const t = (Date.now() - startTime) / 1000

    for (let i = 0; i < state.length; i++) {
        const b = state[i]

        // Center console logic
        const centerX = w / 2
        const centerY = h / 2

        // Soft pull to the center to group them together
        const pullStrength = mouse.active ? 0.0005 : 0.003
        let ax = (centerX - b.x) * pullStrength
        let ay = (centerY - b.y) * pullStrength

        // Expand behavior on hover
        if (mouse.active) {
            const dx = b.x - mouse.x
            const dy = b.y - mouse.y
            const dist = Math.hypot(dx, dy) || 0.001
            const range = 260 // Larger range for striking expansion

            if (dist < range) {
                // Aggressive quadratic falloff for outward push
                const t2 = 1 - dist / range
                const force = t2 * t2 * 4.5
                ax += (dx / dist) * force
                ay += (dy / dist) * force
            }
        }

        // Bouncy damping (less dampened than before to allow expansion fluidly)
        b.vx = (b.vx + ax) * 0.94
        b.vy = (b.vy + ay) * 0.94

        // Increased speed cap for snappy expands
        const spd = Math.hypot(b.vx, b.vy)
        if (spd > 5.8) {
            b.vx = (b.vx / spd) * 5.8
            b.vy = (b.vy / spd) * 5.8
        }

        b.x += b.vx
        b.y += b.vy

        // Walls
        if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.3 }
        if (b.x > w - b.r) { b.x = w - b.r; b.vx = -Math.abs(b.vx) * 0.3 }
        if (b.y < b.r) { b.y = b.r; b.vy = Math.abs(b.vy) * 0.3 }
        if (b.y > h - b.r) { b.y = h - b.r; b.vy = -Math.abs(b.vy) * 0.3 }
    }

    // Positional-only separation — no velocity transfer prevents cascade jitter
    for (let i = 0; i < state.length; i++) {
        for (let j = i + 1; j < state.length; j++) {
            const a = state[i]
            const b = state[j]
            const dx = b.x - a.x
            const dy = b.y - a.y
            const d = Math.hypot(dx, dy) || 0.001
            // Tight packing (less space in between)
            const minD = a.r + b.r + 3 // 3px of padding for very tight clusters

            if (d < minD) {
                const push = (minD - d) * 0.45 // Harder separation force
                const nx = dx / d
                const ny = dy / d
                a.x -= nx * push
                a.y -= ny * push
                b.x += nx * push
                b.y += ny * push
                
                a.vx *= 0.96
                a.vy *= 0.96
                b.vx *= 0.96
                b.vy *= 0.96
            }
        }
    }

    for (let i = 0; i < state.length; i++) {
        const el = bubbleRefs[i]
        const b = state[i]
        if (!el || !b) continue
        el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)`
    }

    rafId = requestAnimationFrame(animate)
}

function onMouseMove(e: MouseEvent) {
    const field = bubbleFieldRef.value
    if (!field) return
    const rect = field.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
    mouse.active = true
}

function onMouseLeave() {
    mouse.active = false
}

function onResize() {
    initCluster()
}

onMounted(() => {
    initCluster()
    animate()
    window.addEventListener('resize', onResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', onResize)
    if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
    <section ref="sectionRef" class="ts-section">
        <div class="ts-shell">
            <div class="section-header">
                <div class="section-header-wrapper">
                    <h2 class="section-title">
                        <span class="section-title-word">Tech</span>
                        <span class="section-title-word accent">Stack</span>
                    </h2>
                </div>
                <div class="section-separator" />
            </div>

            <div
                ref="bubbleFieldRef"
                class="bubble-field"
                @mousemove="onMouseMove"
                @mouseleave="onMouseLeave"
            >
                <div
                    v-for="(skill, index) in stackSkills"
                    :key="`${skill.name}-${index}`"
                    class="bubble-wrapper"
                    :ref="(el) => setBubbleRef(el, index)"
                    :style="{
                        '--size': skill.size,
                        '--hue': skill.hue,
                    }"
                >
                    <div class="bubble">
                        <span class="bubble-text">{{ skill.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.ts-section {
    position: relative;
    background: linear-gradient(180deg, #0b1320 0%, #0a111c 52%, #090f17 100%);
    padding: 4.2rem 1.2rem 4.4rem;
    overflow: hidden;
}

.ts-shell {
    max-width: 1180px;
    margin: 0 auto;
    position: relative;
}

.bubble-field {
    position: relative;
    width: 100%;
    min-height: 540px;
    border: 1px solid rgba(148, 163, 184, 0.14);
    border-radius: 1rem;
    background:
        radial-gradient(circle at 50% 46%, rgba(94, 234, 212, 0.1), transparent 46%),
        linear-gradient(180deg, rgba(10, 18, 29, 0.8), rgba(8, 14, 23, 0.9));
    overflow: hidden;
}

.bubble-wrapper {
    --s: calc(var(--size, 1) * 1);
    --bubble-scale: 1.1;
    position: absolute;
    width: calc(4.1rem * var(--s) * var(--bubble-scale));
    height: calc(4.1rem * var(--s) * var(--bubble-scale));
    min-width: 3.2rem;
    min-height: 3.2rem;
    will-change: transform, opacity;
    left: 0;
    top: 0;
}

.bubble {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: radial-gradient(ellipse at 30% 30%,
        hsla(var(--hue, 190), 92%, 88%, 0.26) 0%,
        hsla(var(--hue, 190), 75%, 70%, 0.14) 42%,
        rgba(15, 23, 42, 0.4) 100%);
    border: 1px solid hsla(var(--hue, 190), 72%, 78%, 0.28);
    backdrop-filter: blur(6px);
    cursor: default;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    will-change: transform;
    box-shadow:
        inset 0 -4px 12px rgba(0, 0, 0, 0.2),
        0 8px 24px rgba(0, 0, 0, 0.22);
}

.bubble:hover {
    transform: scale(1.08);
    border-color: hsla(var(--hue, 190), 90%, 74%, 0.65);
    box-shadow:
        inset 0 -4px 12px rgba(0, 0, 0, 0.08),
        0 10px 32px rgba(94, 234, 212, 0.22);
}

.bubble-text {
    font-size: calc(0.48rem * var(--s) + 0.3rem);
    font-weight: 700;
    color: rgba(248, 250, 252, 0.95);
    text-align: center;
    line-height: 1.2;
    padding: 0.22rem;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
    user-select: none;
    overflow-wrap: anywhere;
}

@media (max-width: 768px) {
    .ts-section {
        padding: 3.2rem 1rem 3.4rem;
    }

    .ts-title {
        font-size: 1.18rem;
        letter-spacing: 0.07em;
    }

    .ts-subtitle {
        font-size: 0.8rem;
        padding: 0 0.3rem;
    }

    .bubble-field {
        min-height: 420px;
    }

    .bubble-wrapper {
        width: calc(3.4rem * var(--s) * var(--bubble-scale));
        height: calc(3.4rem * var(--s) * var(--bubble-scale));
        min-width: 2.75rem;
        min-height: 2.75rem;
    }

    .bubble-text {
        font-size: calc(0.44rem * var(--s) + 0.36rem);   
    }
}

@media (max-width: 480px) {
    .ts-section {
        padding: 2.8rem 0.8rem;
    }

    .bubble-field {
        min-height: 360px;
    }
}
</style>
