<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useVisitorPersonalization } from '@/Composables/useVisitorPersonalization'

interface HeroStatement {
    title: string
    subtitle: string
    align: 'left' | 'center' | 'right'
    start: number
    end: number
    z: number
}

const props = defineProps<{
    name: string
    title: string
    subtitle: string
    imageUrl?: string | null
    frameCount?: number
}>()

const { context: visitorContext } = useVisitorPersonalization()

const emit = defineEmits<{
    (e: 'hero-ready'): void
    (e: 'hero-progress', value: number): void
}>()

const containerRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const progress = ref(0)
const videoReady = ref(false)
const heroReadyEmitted = ref(false)

function clamp(v: number, lo: number, hi: number) { return Math.min(hi, Math.max(lo, v)) }

function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const statements = computed<HeroStatement[]>(() => [
    {
        title: `Hello! I'm\n${props.name}`,
        subtitle: props.title,
        align: 'center',
        start: 0.05,
        end: 0.24,
        z: 60,
    },
    {
        title: '9+ Years Shipping.',
        subtitle: 'Vue, Laravel, DDD — from legacy modernization to greenfield at scale.',
        align: 'left',
        start: 0.34,
        end: 0.56,
        z: 40,
    },
    {
        title: 'Building with AI.',
        subtitle: 'Production RAG pipelines, intelligent automation, and AI-native products.',
        align: 'right',
        start: 0.68,
        end: 0.90,
        z: 50,
    },
])

function updateProgress() {
    const el = containerRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const total = Math.max(1, rect.height - window.innerHeight)
    progress.value = clamp(-rect.top / total, 0, 1)

    if (videoRef.value && videoReady.value && videoRef.value.duration) {
        videoRef.value.currentTime = progress.value * videoRef.value.duration
    }
}

function statementStyle(stmt: HeroStatement) {
    const p = progress.value
    const fadeIn = 0.07
    const fadeOut = 0.07

    let opacity = 0
    if (p >= stmt.start - fadeIn && p <= stmt.start)
        opacity = (p - (stmt.start - fadeIn)) / fadeIn
    else if (p > stmt.start && p <= stmt.end)
        opacity = 1
    else if (p > stmt.end && p <= stmt.end + fadeOut)
        opacity = 1 - (p - stmt.end) / fadeOut

    opacity = clamp(opacity, 0, 1)
    const y = 36 * (1 - opacity)
    const scale = 0.96 + 0.04 * opacity
    const z = stmt.z * opacity

    return {
        opacity,
        transform: `translate3d(calc(var(--depth-tx, 0px) * ${stmt.z / 50}), ${y}px, ${z}px) scale(${scale})`,
    }
}

const videoOpacity = computed(() => {
    return 0.42 + 0.58 * easeInOutCubic(clamp(progress.value * 1.2, 0, 1))
})

// Tracked as reactive state rather than read inline in the computed below:
// `window.innerWidth` is not reactive, so the zoom factor was resolved once
// and then cached — rotating a phone or resizing never updated it. Defaulting
// to false also keeps this render-safe where `window` does not exist.
const isNarrowViewport = ref(false)

function updateViewport() {
    isNarrowViewport.value = window.innerWidth <= 768
}

const videoScale = computed(() => {
    const maxZoom = isNarrowViewport.value ? 1.09 : 1.14
    return 1 + (maxZoom - 1) * easeInOutCubic(progress.value)
})

const scrollHintOpacity = computed(() => clamp(1 - progress.value * 12, 0, 1))

function onVideoCanPlay() {
    videoReady.value = true
    if (!heroReadyEmitted.value) {
        heroReadyEmitted.value = true
        emit('hero-ready')
        emit('hero-progress', 100)
    }
}

function onVideoError() {
    if (!heroReadyEmitted.value) {
        heroReadyEmitted.value = true
        emit('hero-ready')
        emit('hero-progress', 100)
    }
}

onMounted(() => {
    updateViewport()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateViewport, { passive: true })
    updateProgress()
})

onUnmounted(() => {
    window.removeEventListener('scroll', updateProgress)
    window.removeEventListener('resize', updateViewport)
})
</script>

<template>
    <section ref="containerRef" class="scrolly-root">
        <div class="scrolly-sticky">
            <div
                class="video-wrap"
                :style="{
                    opacity: videoOpacity,
                    transform: `scale(${videoScale})`,
                }"
            >
                <video
                    ref="videoRef"
                    muted
                    playsinline
                    preload="auto"
                    class="hero-video"
                    @canplaythrough="onVideoCanPlay"
                    @error="onVideoError"
                >
                    <source src="/videos/hero-sequence.webm" type="video/webm">
                    <source src="/videos/hero-sequence.mp4" type="video/mp4">
                </video>
            </div>

            <div class="grain" />

            <div class="overlay-layer">
                <div
                    v-for="(item, idx) in statements"
                    :key="idx"
                    class="statement"
                    :class="`align-${item.align}`"
                    :style="statementStyle(item)"
                >
                    <Transition name="greeting-fade">
                        <span v-if="idx === 0 && visitorContext.greeting" class="hero-greeting">
                            {{ visitorContext.greeting }}
                        </span>
                    </Transition>
                    <h1 class="statement-title">
                        <template v-for="(line, li) in item.title.split('\n')" :key="li">
                            <span v-if="li === 0 && item.title.includes('\n')" class="greeting-line">{{ line }}</span>
                            <span v-else class="name-line">{{ line }}</span>
                            <br v-if="li < item.title.split('\n').length - 1" />
                        </template>
                    </h1>
                    <p class="statement-subtitle">{{ item.subtitle }}</p>
                </div>
            </div>

            <div class="scroll-hint" :style="{ opacity: scrollHintOpacity }">
                <span class="scroll-hint-line" />
                <span class="scroll-hint-text">Scroll</span>
            </div>
        </div>
    </section>
</template>

<style scoped>
.scrolly-root {
    height: 520vh;
    position: relative;
}

.scrolly-sticky {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #090e14;
    perspective: 800px;
    perspective-origin: 50% 50%;
}

.video-wrap {
    position: absolute;
    inset: 0;
    will-change: transform, opacity;
    transform-origin: 50% 41%;
}

.hero-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 41%;
    display: block;
}

.grain {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.18;
    mix-blend-mode: soft-light;
    background-image:
        radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0);
    background-size: 3px 3px;
}

.overlay-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    transform-style: preserve-3d;
}

.statement {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.85rem;
    padding: 2rem 3.5rem;
    will-change: transform, opacity;
    transform-style: preserve-3d;
}

.align-left   { align-items: flex-start; text-align: left; }
.align-center  { align-items: center;    text-align: center; }
.align-right   { align-items: flex-end;  text-align: right; }

.statement-title {
    color: #f8fafc;
    font-size: clamp(2.2rem, 6vw, 5.2rem);
    line-height: 0.95;
    font-weight: 800;
    letter-spacing: -0.035em;
    text-shadow:
        0 4px 30px rgba(0, 0, 0, 0.6),
        0 1px 4px rgba(0, 0, 0, 0.45);
}

.statement-subtitle {
    color: rgba(226, 232, 240, 0.88);
    font-size: clamp(0.95rem, 2vw, 1.45rem);
    max-width: 48rem;
    line-height: 1.5;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
}

.greeting-line {
    display: block;
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    font-weight: 400;
    color: #5eead4;
    letter-spacing: 0.06em;
    margin-bottom: 0.3rem;
}

.name-line {
    display: inline;
}

.hero-greeting {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent, #14b8a6);
    background: rgba(20, 184, 166, 0.1);
    border: 1px solid rgba(20, 184, 166, 0.2);
    border-radius: 999px;
    margin-bottom: 0.5rem;
}
.greeting-fade-enter-active { transition: opacity 0.6s ease 0.8s; }
.greeting-fade-leave-active { transition: opacity 0.3s ease; }
.greeting-fade-enter-from, .greeting-fade-leave-to { opacity: 0; }

.scroll-hint {
    position: absolute;
    bottom: 2.2rem;
    left: 50%;
    translate: -50% 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    pointer-events: none;
    transition: opacity 200ms ease;
}

.scroll-hint-line {
    width: 1px;
    height: 38px;
    background: linear-gradient(to bottom, transparent, rgba(248,250,252,0.55));
    animation: scrollPulse 1.8s ease-in-out infinite;
}

.scroll-hint-text {
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(226, 232, 240, 0.5);
}

@keyframes scrollPulse {
    0%, 100% { opacity: 0.35; transform: scaleY(0.85); }
    50%      { opacity: 1;    transform: scaleY(1); }
}

@media (max-width: 768px) {
    .statement {
        padding: 1.2rem 1.4rem;
        gap: 0.6rem;
    }
    .statement-title {
        font-size: clamp(1.6rem, 8vw, 2.8rem);
    }
    .statement-subtitle {
        font-size: clamp(0.85rem, 3.5vw, 1.1rem);
        max-width: 100%;
    }
    .scroll-hint { bottom: 1.4rem; }
    .scroll-hint-line { height: 28px; }
}

@media (max-width: 480px) {
    .scrolly-root { height: 480vh; }
    .statement { padding: 1rem 1rem; }
}

@media (prefers-reduced-motion: reduce) {
    .scroll-hint-line { animation: none; }
    .statement { transition: none; }
}
</style>
