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

const stackSkills: BubbleSkill[] = [
    { name: 'PHP 8.4+', size: 1.2, hue: 184 },
    { name: 'Laravel 12', size: 1.28, hue: 192 },
    { name: 'MySQL Perf Tuning', size: 1.12, hue: 200 },
    { name: 'Redis', size: 1.05, hue: 176 },
    { name: 'Vue 3', size: 1.22, hue: 170 },
    { name: 'Inertia.js', size: 1.02, hue: 186 },
    { name: 'Livewire', size: 0.97, hue: 196 },
    { name: 'Alpine.js', size: 0.95, hue: 204 },
    { name: 'Tailwind CSS', size: 1.07, hue: 178 },
    { name: 'TypeScript', size: 1.03, hue: 210 },
    { name: 'DDD', size: 1.08, hue: 188 },
    { name: 'Event-Driven', size: 1.12, hue: 170 },
    { name: 'SOLID', size: 0.95, hue: 198 },
    { name: 'Microservices', size: 1.0, hue: 182 },
    { name: 'REST API', size: 0.98, hue: 198 },
    { name: 'Pest PHP', size: 0.95, hue: 184 },
    { name: 'PHPStan', size: 0.93, hue: 192 },
    { name: 'PHPInsights', size: 0.93, hue: 178 },
    { name: 'Pulse/Telescope', size: 1.0, hue: 205 },
    { name: 'Docker', size: 0.97, hue: 198 },
    { name: 'Git', size: 0.92, hue: 210 },
    { name: 'Cursor', size: 0.92, hue: 172 },
    { name: 'Claude 3.5', size: 1.03, hue: 182 },
    { name: 'AWS EC2', size: 0.93, hue: 196 },
    { name: 'AWS S3', size: 0.92, hue: 190 },
    { name: 'AWS Vapor', size: 0.97, hue: 184 },
    { name: 'GitHub Actions', size: 1.02, hue: 176 },
    { name: 'CI/CD', size: 0.92, hue: 202 },
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

    // Responsive grid — all bubbles visible, comfortable spacing
    const cols = Math.max(1, Math.floor(w / 106))
    const rows = Math.ceil(count / cols)
    const cellW = w / cols
    // Cell height: square-ish cells, minimum 88px
    const cellH = Math.max(cellW * 0.9, 88)

    // Dynamically expand the field to fit all rows
    const neededH = rows * cellH + 24
    field.style.minHeight = `${neededH}px`

    const topPad = 12

    state.length = 0
    for (let i = 0; i < count; i++) {
        const col = i % cols
        const row = Math.floor(i / cols)
        const homeX = cellW * (col + 0.5)
        const homeY = topPad + cellH * (row + 0.5)
        const r = 33 * stackSkills[i].size

        state.push({
            x: homeX + (Math.random() - 0.5) * 8,
            y: homeY + (Math.random() - 0.5) * 8,
            vx: 0,
            vy: 0,
            homeX,
            homeY,
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

        // Per-bubble idle float: gentle, unique sine wave (golden ratio phase spread)
        const phase = i * 1.618
        const floatX = mouse.active ? 0 : Math.cos(t * 0.32 + phase) * 3.0
        const floatY = mouse.active ? 0 : Math.sin(t * 0.45 + phase * 0.77) * 5.0
        const targetX = b.homeX + floatX
        const targetY = b.homeY + floatY

        // Very soft spring toward float target
        let ax = (targetX - b.x) * 0.006
        let ay = (targetY - b.y) * 0.006

        if (mouse.active) {
            const dx = b.x - mouse.x
            const dy = b.y - mouse.y
            const dist = Math.hypot(dx, dy) || 0.001
            const range = 130

            if (dist < range) {
                // Quadratic falloff — very gentle push close to cursor
                const t2 = 1 - dist / range
                const force = t2 * t2 * 1.8
                ax += (dx / dist) * force
                ay += (dy / dist) * force
            }
        }

        // High damping: bubbles glide and settle, never jitter
        b.vx = (b.vx + ax) * 0.965
        b.vy = (b.vy + ay) * 0.965

        // Hard velocity cap: max 2.5px/frame keeps motion visually smooth
        const spd = Math.hypot(b.vx, b.vy)
        if (spd > 2.5) {
            b.vx = (b.vx / spd) * 2.5
            b.vy = (b.vy / spd) * 2.5
        }

        b.x += b.vx
        b.y += b.vy

        // Soft wall: minimal rebound so bubbles ease back from edges
        if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.08 }
        if (b.x > w - b.r) { b.x = w - b.r; b.vx = -Math.abs(b.vx) * 0.08 }
        if (b.y < b.r) { b.y = b.r; b.vy = Math.abs(b.vy) * 0.08 }
        if (b.y > h - b.r) { b.y = h - b.r; b.vy = -Math.abs(b.vy) * 0.08 }
    }

    // Positional-only separation — no velocity transfer prevents cascade jitter
    for (let i = 0; i < state.length; i++) {
        for (let j = i + 1; j < state.length; j++) {
            const a = state[i]
            const b = state[j]
            const dx = b.x - a.x
            const dy = b.y - a.y
            const d = Math.hypot(dx, dy) || 0.001
            const minD = a.r + b.r + 5

            if (d < minD) {
                const push = (minD - d) * 0.38
                const nx = dx / d
                const ny = dy / d
                a.x -= nx * push
                a.y -= ny * push
                b.x += nx * push
                b.y += ny * push
                // Tiny velocity damping at contact to prevent oscillation
                a.vx *= 0.98
                a.vy *= 0.98
                b.vx *= 0.98
                b.vy *= 0.98
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
    position: absolute;
    width: calc(4.1rem * var(--s));
    height: calc(4.1rem * var(--s));
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
        width: calc(3.4rem * var(--s));
        height: calc(3.4rem * var(--s));
        min-width: 2.75rem;
        min-height: 2.75rem;
    }

    .bubble-text {
        font-size: calc(0.44rem * var(--s) + 0.26rem);
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
