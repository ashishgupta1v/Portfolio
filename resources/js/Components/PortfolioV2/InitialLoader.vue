<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
    progress: number
    visible: boolean
}>()

const clampedProgress = computed(() => Math.max(0, Math.min(100, props.progress || 0)))

const pointerX = ref(50)
const pointerY = ref(50)
const activeNode = ref<number | null>(null)

const sparkleSeeds = [
    { x: 10, y: 22, delay: 0.2, dur: 3.2 },
    { x: 22, y: 76, delay: 0.8, dur: 3.8 },
    { x: 31, y: 40, delay: 0.3, dur: 4.4 },
    { x: 44, y: 16, delay: 1.1, dur: 3.6 },
    { x: 58, y: 80, delay: 0.5, dur: 4.1 },
    { x: 66, y: 30, delay: 0.9, dur: 3.4 },
    { x: 74, y: 62, delay: 0.7, dur: 4.6 },
    { x: 82, y: 24, delay: 1.4, dur: 3.9 },
    { x: 88, y: 48, delay: 0.6, dur: 4.2 },
    { x: 93, y: 70, delay: 1.2, dur: 3.5 },
]

const bootPhase = computed(() => {
    const p = clampedProgress.value
    if (p < 20) return 'Booting Experience Core'
    if (p < 45) return 'Loading cinematic frames'
    if (p < 75) return 'Calibrating interaction modules'
    if (p < 99) return 'Stabilizing AG interface'
    return 'System ready'
})

const stageLines = computed(() => {
    const p = clampedProgress.value
    return [
        { label: 'Kernel', done: p >= 10 },
        { label: 'Sequence', done: p >= 38 },
        { label: 'Motion', done: p >= 64 },
        { label: 'Interface', done: p >= 88 },
    ]
})

const panelStyle = computed(() => ({
    '--px': `${pointerX.value}%`,
    '--py': `${pointerY.value}%`,
}) as Record<string, string>)

function handlePointerMove(event: PointerEvent) {
    const target = event.currentTarget as HTMLElement | null
    if (!target) return

    const rect = target.getBoundingClientRect()
    pointerX.value = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100))
    pointerY.value = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100))
}

function handlePointerLeave() {
    pointerX.value = 50
    pointerY.value = 50
}

function activateNode(index: number) {
    activeNode.value = index
    window.setTimeout(() => {
        if (activeNode.value === index) {
            activeNode.value = null
        }
    }, 650)
}
</script>

<template>
    <Transition name="loader-fade">
        <div
            v-if="visible"
            class="initial-loader"
            :style="panelStyle"
            aria-live="polite"
            aria-label="Loading portfolio"
            @pointermove="handlePointerMove"
            @pointerleave="handlePointerLeave"
        >
            <div class="loader-glow" />
            <div class="loader-grid" />
            <div class="loader-sparkles" aria-hidden="true">
                <span
                    v-for="(sparkle, index) in sparkleSeeds"
                    :key="index"
                    class="sparkle"
                    :style="{
                        '--x': sparkle.x + '%',
                        '--y': sparkle.y + '%',
                        '--delay': sparkle.delay + 's',
                        '--dur': sparkle.dur + 's',
                    }"
                />
            </div>

            <div class="loader-core">
                <div class="ag-reactor" aria-hidden="true">
                    <div class="reactor-ring reactor-ring-a" />
                    <div class="reactor-ring reactor-ring-b" />
                    <div class="reactor-center">
                        <span>AG</span>
                    </div>
                </div>

                <div class="loader-label">Booting Experience</div>
                <div class="loader-phase">{{ bootPhase }}</div>
                <div class="loader-progress">{{ clampedProgress }}%</div>
                <div class="loader-track">
                    <div class="loader-fill" :style="{ width: clampedProgress + '%' }" />
                </div>

                <div class="stage-list" aria-hidden="true">
                    <span
                        v-for="stage in stageLines"
                        :key="stage.label"
                        class="stage-pill"
                        :class="{ 'is-done': stage.done }"
                    >
                        {{ stage.label }}
                    </span>
                </div>

                <div class="play-row" aria-label="Interactive boot controls">
                    <button
                        v-for="token in ['A', 'G']"
                        :key="token"
                        type="button"
                        class="play-node"
                        :class="{ 'is-active': activeNode === token.charCodeAt(0) }"
                        @pointerdown="activateNode(token.charCodeAt(0))"
                    >
                        {{ token }}
                    </button>
                </div>

                <p class="loader-hint">Move your cursor to steer the AG core.</p>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.initial-loader {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    place-items: center;
    background:
        radial-gradient(circle at 12% 16%, rgba(94, 234, 212, 0.14), transparent 36%),
        radial-gradient(circle at 82% 72%, rgba(56, 189, 248, 0.12), transparent 40%),
        linear-gradient(180deg, #070d17 0%, #03060f 100%);
    overflow: hidden;
}

.loader-glow {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(
            220px circle at var(--px, 50%) var(--py, 50%),
            rgba(94, 234, 212, 0.22),
            transparent 72%
        );
    transition: background 160ms linear;
}

.loader-grid {
    position: absolute;
    inset: 0;
    opacity: 0.22;
    background-image:
        linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: radial-gradient(circle at 50% 45%, rgba(0, 0, 0, 0.95), transparent 75%);
}

.loader-sparkles {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.sparkle {
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(167, 243, 208, 0.84);
    box-shadow: 0 0 14px rgba(94, 234, 212, 0.45);
    opacity: 0.2;
    animation: sparkle var(--dur) ease-in-out infinite;
    animation-delay: var(--delay);
}

.loader-core {
    position: relative;
    width: min(92vw, 420px);
    padding: 1.6rem 1.4rem 1.2rem;
    border: 1px solid rgba(94, 234, 212, 0.26);
    border-radius: 1.2rem;
    backdrop-filter: blur(10px);
    background: linear-gradient(180deg, rgba(7, 14, 25, 0.85), rgba(8, 14, 23, 0.64));
    box-shadow:
        0 24px 60px rgba(0, 0, 0, 0.45),
        inset 0 1px 0 rgba(255, 255, 255, 0.04);
    text-align: center;
    transform:
        perspective(1000px)
        rotateX(calc((50 - var(--py, 50)) * 0.07deg))
        rotateY(calc((var(--px, 50) - 50) * 0.07deg));
    transition: transform 120ms ease-out;
}

.ag-reactor {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 0.75rem;
}

.reactor-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid rgba(94, 234, 212, 0.3);
}

.reactor-ring-a {
    border-top-color: rgba(94, 234, 212, 0.82);
    border-left-color: rgba(125, 211, 252, 0.78);
    animation: spinA 1.8s linear infinite;
}

.reactor-ring-b {
    inset: 14px;
    border-color: rgba(167, 243, 208, 0.2);
    border-right-color: rgba(147, 197, 253, 0.8);
    border-bottom-color: rgba(94, 234, 212, 0.86);
    animation: spinB 1.1s linear infinite;
}

.reactor-center {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 62px;
    height: 62px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #d1fae5;
    font-size: 1.18rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    gap: 0.16rem;
    grid-auto-flow: column;
    border: 1px solid rgba(167, 243, 208, 0.35);
    background:
        radial-gradient(circle at 35% 25%, rgba(167, 243, 208, 0.3), transparent 42%),
        radial-gradient(circle at 75% 75%, rgba(125, 211, 252, 0.24), transparent 50%),
        linear-gradient(180deg, rgba(10, 20, 33, 0.95), rgba(6, 12, 22, 0.9));
    box-shadow:
        0 0 30px rgba(94, 234, 212, 0.28),
        inset 0 0 18px rgba(16, 185, 129, 0.18);
    animation: pulse 2.3s ease-in-out infinite;
}

.loader-label {
    color: rgba(226, 232, 240, 0.86);
    font-size: 0.8rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
}

.loader-phase {
    margin-top: 0.36rem;
    color: rgba(125, 211, 252, 0.9);
    font-size: 0.82rem;
    letter-spacing: 0.06em;
}

.loader-progress {
    margin-top: 0.58rem;
    color: #5eead4;
    font-size: 1.52rem;
    font-weight: 800;
    letter-spacing: 0.04em;
}

.loader-track {
    margin-top: 0.82rem;
    width: 100%;
    height: 6px;
    border-radius: 999px;
    background: rgba(148, 163, 184, 0.18);
    overflow: hidden;
}

.loader-fill {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #22d3ee, #5eead4, #a3e635);
    box-shadow: 0 0 18px rgba(94, 234, 212, 0.45);
    transition: width 180ms ease;
}

.stage-list {
    margin-top: 0.86rem;
    display: flex;
    gap: 0.4rem;
    justify-content: center;
    flex-wrap: wrap;
}

.stage-pill {
    padding: 0.2rem 0.45rem;
    border-radius: 999px;
    font-size: 0.64rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(148, 163, 184, 0.9);
    border: 1px solid rgba(148, 163, 184, 0.25);
    background: rgba(15, 23, 42, 0.52);
}

.stage-pill.is-done {
    color: rgba(6, 78, 59, 0.95);
    border-color: rgba(110, 231, 183, 0.4);
    background: rgba(110, 231, 183, 0.9);
}

.play-row {
    margin-top: 0.9rem;
    display: flex;
    justify-content: center;
    gap: 0.48rem;
}

.play-node {
    width: 2rem;
    height: 2rem;
    border-radius: 0.65rem;
    border: 1px solid rgba(94, 234, 212, 0.35);
    background: rgba(8, 15, 26, 0.7);
    color: rgba(167, 243, 208, 0.95);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: transform 140ms ease, box-shadow 140ms ease, background 140ms ease;
}

.play-node:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.2);
}

.play-node.is-active {
    background: linear-gradient(135deg, rgba(110, 231, 183, 0.95), rgba(125, 211, 252, 0.9));
    color: #052e2b;
    border-color: rgba(167, 243, 208, 0.7);
    box-shadow: 0 0 20px rgba(94, 234, 212, 0.42);
}

.loader-hint {
    margin-top: 0.66rem;
    font-size: 0.69rem;
    color: rgba(148, 163, 184, 0.9);
    letter-spacing: 0.04em;
}

.loader-fade-enter-active,
.loader-fade-leave-active {
    transition: opacity 420ms ease;
}

.loader-fade-enter-from,
.loader-fade-leave-to {
    opacity: 0;
}

@keyframes spinA {
    to { transform: translateX(-50%) rotate(360deg); }
}

@keyframes spinB {
    to { transform: translateX(-50%) rotate(-360deg); }
}

@keyframes pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-50%, -50%) scale(1.06); }
}

@keyframes sparkle {
    0%, 100% {
        opacity: 0.12;
        transform: translateY(0) scale(0.9);
    }
    50% {
        opacity: 0.92;
        transform: translateY(-8px) scale(1.15);
    }
}

@keyframes spinA {
    to { transform: rotate(360deg); }
}

@keyframes spinB {
    to { transform: rotate(-360deg); }
}

@media (prefers-reduced-motion: reduce) {
    .reactor-ring-a,
    .reactor-ring-b,
    .reactor-center,
    .sparkle {
        animation: none;
    }

    .loader-core,
    .play-node {
        transition: none;
    }
}

@media (max-width: 520px) {
    .loader-core {
        width: min(94vw, 390px);
        padding: 1.45rem 1.1rem 1.1rem;
    }

    .ag-reactor {
        width: 104px;
        height: 104px;
    }

    .reactor-center {
        width: 54px;
        height: 54px;
        font-size: 1.02rem;
    }
}
</style>