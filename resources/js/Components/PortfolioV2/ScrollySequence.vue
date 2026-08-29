<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
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
        align: 'left',
        start: 0.04,
        end: 0.26,
        z: 60,
    },
    {
        title: '10+ Years Shipping.',
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

const isNarrowViewport = ref(false)

function updateViewport() {
    isNarrowViewport.value = window.innerWidth <= 768
}

const videoScale = computed(() => {
    const maxZoom = isNarrowViewport.value ? 1.09 : 1.14
    return 1 + (maxZoom - 1) * easeInOutCubic(progress.value)
})

const scrollHintOpacity = computed(() => {
    return clamp(1 - progress.value * 14, 0, 1)
})

function onVideoCanPlay() {
    videoReady.value = true
    if (!heroReadyEmitted.value) {
        heroReadyEmitted.value = true
        emit('hero-ready')
    }
}

function onVideoError() {
    if (!heroReadyEmitted.value) {
        heroReadyEmitted.value = true
        emit('hero-ready')
    }
}

let timer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
    updateViewport()
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateViewport, { passive: true })

    timer = setTimeout(() => {
        if (!heroReadyEmitted.value) {
            heroReadyEmitted.value = true
            emit('hero-ready')
        }
    }, 1800)
})

onBeforeUnmount(() => {
    if (timer) clearTimeout(timer)
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
                    preload="metadata"
                    poster="/images/ashish-gupta-avatar.webp"
                    class="hero-video"
                    @canplaythrough="onVideoCanPlay"
                    @loadedmetadata="onVideoCanPlay"
                    @error="onVideoError"
                >
                    <source src="/videos/hero-sequence.webm" type="video/webm">
                    <source src="/videos/hero-sequence.mp4" type="video/mp4">
                </video>
            </div>

            <!-- Atmospheric Lighting & Textures -->
            <div class="hero-ambient-glow" aria-hidden="true" />
            <div class="hero-vignette" aria-hidden="true" />
            <div class="grain" aria-hidden="true" />

            <div class="overlay-layer">
                <div
                    v-for="(item, idx) in statements"
                    :key="idx"
                    class="statement"
                    :class="[`align-${item.align}`, { 'is-primary-hero': idx === 0 }]"
                    :style="statementStyle(item)"
                >
                    <div class="statement-card">
                        <div class="statement-scrim" aria-hidden="true" />
                        
                        <!-- Recruiter Signal Badge Row -->
                        <div v-if="idx === 0" class="hero-signal-row">
                            <span v-if="visitorContext.greeting" class="hero-greeting glow-pill">
                                {{ visitorContext.greeting }}
                            </span>
                            <span class="hero-signal-badge glow-pill">
                                💼 Open to Full-Time Senior / Staff Roles
                            </span>
                            <span class="hero-signal-badge glow-pill-violet">
                                ⚡ Available Immediately · Remote Worldwide
                            </span>
                        </div>

                        <component :is="idx === 0 ? 'h1' : 'h2'" class="statement-title">
                            <template v-if="idx === 0">
                                <span class="hero-kicker-line">Hello! I'm </span>
                                <span class="name-line">Ashish <span class="name-surname">Gupta</span></span>
                            </template>
                            <template v-else>
                                <template v-for="(line, li) in item.title.split('\n')" :key="li">
                                    <span v-if="li === 0 && item.title.includes('\n')" class="greeting-line">{{ line }} </span>
                                    <span v-else class="title-line">{{ line }}</span>
                                    <br v-if="li < item.title.split('\n').length - 1" />
                                </template>
                            </template>
                        </component>
                        <p class="statement-subtitle">{{ item.subtitle }}</p>

                        <!-- Above-the-fold Hero Action Row -->
                        <div v-if="idx === 0" class="hero-actions-container">
                            <div class="hero-actions">
                                <a href="/resume/ashish-gupta-resume.pdf" target="_blank" rel="noopener noreferrer" class="hero-btn hero-btn--resume glow-pill" aria-label="Download Ashish Gupta's Résumé (PDF)">
                                    <span>Download Résumé</span>
                                    <span class="hero-btn-arrow" aria-hidden="true">↗</span>
                                </a>
                                <a href="#contact" class="hero-btn hero-btn--outline">
                                    <span>Get in touch</span>
                                    <span class="hero-btn-arrow" aria-hidden="true">↓</span>
                                </a>
                            </div>

                            <div class="hero-secondary-links">
                                <a href="https://www.linkedin.com/in/ashish-gupta-dev/" target="_blank" rel="noopener noreferrer" class="hero-sec-link">
                                    <span>LinkedIn</span>
                                    <span class="hero-sec-arrow">↗</span>
                                </a>
                                <span class="hero-sec-dot">·</span>
                                <a href="mailto:ashishgupta1v@gmail.com" class="hero-sec-link">
                                    <span>Email</span>
                                </a>
                                <span class="hero-sec-dot">·</span>
                                <a href="https://github.com/ashishgupta1v" target="_blank" rel="noopener noreferrer" class="hero-sec-link">
                                    <span>GitHub</span>
                                    <span class="hero-sec-arrow">↗</span>
                                </a>
                                <span class="hero-sec-dot">·</span>
                                <a href="/for-hiring-managers" class="hero-sec-link hero-sec-link--highlight">
                                    <span>For Hiring Managers</span>
                                    <span class="hero-sec-arrow">→</span>
                                </a>
                            </div>

                            <p class="hero-microcopy">
                                Senior Full-Stack Architect · 10+ years · Open to full-time remote roles.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="scroll-hint" :style="{ opacity: scrollHintOpacity }">
                <span class="scroll-hint-line" />
                <span class="scroll-hint-text">Scroll to explore</span>
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
    left: 0;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-primary);
}

.video-wrap {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    will-change: transform, opacity;
}

.hero-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 38%;
}

/* Ambient glow & atmospheric textures */
.hero-ambient-glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        radial-gradient(ellipse 65% 55% at 30% 65%, rgba(94, 234, 212, 0.12) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 75% 35%, rgba(139, 92, 246, 0.14) 0%, transparent 65%);
    mix-blend-mode: screen;
}

.hero-vignette {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at center, transparent 35%, rgba(9, 14, 20, 0.72) 100%);
}

.grain {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.18;
    mix-blend-mode: soft-light;
    background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0);
    background-size: 3px 3px;
}

.overlay-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    transform-style: preserve-3d;
    max-width: var(--container-max, 1300px);
    margin: 0 auto;
}

.statement {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 3.5rem;
    will-change: transform, opacity;
    transform-style: preserve-3d;
}

.statement.is-primary-hero {
    justify-content: flex-end;
    padding-bottom: 7.5rem;
}

.align-left   { align-items: flex-start; text-align: left; }
.align-center  { align-items: center;    text-align: center; }
.align-right   { align-items: flex-end;  text-align: right; }

.statement-card {
    position: relative;
    max-width: 54rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem 1.6rem;
    border-radius: 1.25rem;
    z-index: 1;
}

.statement-scrim {
    position: absolute;
    inset: 0;
    border-radius: 1.4rem;
    background: radial-gradient(ellipse at 25% 50%, rgba(6, 10, 18, 0.88) 0%, rgba(9, 14, 24, 0.65) 70%, rgba(9, 14, 24, 0.25) 100%);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.65);
    z-index: -1;
}

.statement-title {
    color: #ffffff;
    font-size: clamp(2.6rem, 6.6vw, 5.8rem);
    line-height: 0.95;
    font-weight: 900;
    letter-spacing: -0.04em;
    text-shadow: 0 4px 32px rgba(0, 0, 0, 0.9);
}

.statement-subtitle {
    color: rgba(226, 232, 240, 0.94);
    font-size: clamp(1rem, 2.2vw, 1.42rem);
    max-width: 46rem;
    line-height: 1.5;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.8);
}

.greeting-line,
.hero-kicker-line {
    display: block;
    font-size: clamp(0.9rem, 2vw, 1.25rem);
    font-weight: 700;
    color: var(--accent, #5eead4);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
}

.name-line {
    display: inline-block;
    color: #ffffff;
    font-weight: 900;
    letter-spacing: -0.04em;
    text-shadow: 0 4px 32px rgba(0, 0, 0, 0.95), 0 0 60px rgba(94, 234, 212, 0.25);
}

.name-surname {
    color: #5eead4;
    background: linear-gradient(135deg, #5eead4 25%, #c4b5fd 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 25px rgba(94, 234, 212, 0.3));
}

.title-line {
    display: inline-block;
    color: #ffffff;
}

.hero-signal-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.3rem;
}

.hero-signal-badge {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 0.35rem 0.8rem;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
}

.hero-actions-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.85rem;
}

.hero-actions {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    flex-wrap: wrap;
}

.hero-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.68rem 1.4rem;
    font-size: 0.84rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    border-radius: 999px;
    text-decoration: none;
    transition: all 0.24s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
}

.hero-btn--resume {
    background: linear-gradient(135deg, #a78bfa 0%, #818cf8 100%);
    color: #0d0f1d;
    font-weight: 800;
    box-shadow: 0 0 22px rgba(167, 139, 250, 0.45), 0 4px 14px rgba(0, 0, 0, 0.4);
}

.hero-btn--resume:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 32px rgba(167, 139, 250, 0.65), 0 6px 20px rgba(0, 0, 0, 0.5);
}

.hero-btn--outline {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(8px);
}

.hero-btn--outline:hover {
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(94, 234, 212, 0.6);
    color: var(--accent, #5eead4);
    transform: translateY(-2px);
}

.hero-secondary-links {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    flex-wrap: wrap;
    font-size: 0.78rem;
    color: var(--text-3, rgba(255, 255, 255, 0.6));
}

.hero-sec-link {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    color: var(--text-2, rgba(255, 255, 255, 0.8));
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
}

.hero-sec-link:hover {
    color: var(--accent, #5eead4);
}

.hero-sec-link--highlight {
    color: var(--accent, #5eead4);
    font-weight: 600;
}

.hero-sec-arrow {
    font-size: 0.75rem;
    opacity: 0.8;
}

.hero-sec-dot {
    color: rgba(255, 255, 255, 0.25);
}

.hero-microcopy {
    font-size: 0.75rem;
    color: var(--text-3, rgba(255, 255, 255, 0.55));
    letter-spacing: 0.02em;
    margin: 0;
}

.hero-btn--ghost {
    background: transparent;
    color: var(--text-2);
    padding-left: 0.6rem;
    padding-right: 0.6rem;
}

.hero-btn--ghost:hover {
    color: var(--accent);
}

.hero-btn-arrow {
    font-size: 0.95rem;
    transition: transform 0.2s ease;
}

.hero-btn:hover .hero-btn-arrow {
    transform: translateY(2px);
}

.hero-greeting {
    display: inline-block;
    padding: 0.3rem 0.85rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent, #5eead4);
    background: rgba(94, 234, 212, 0.12);
    border: 1px solid rgba(94, 234, 212, 0.25);
    border-radius: 999px;
    margin-bottom: 0.35rem;
    box-shadow: 0 0 16px rgba(94, 234, 212, 0.18);
}

.greeting-fade-enter-active { transition: opacity 0.6s ease 0.8s; }
.greeting-fade-leave-active { transition: opacity 0.3s ease; }
.greeting-fade-enter-from, .greeting-fade-leave-to { opacity: 0; }

.scroll-hint {
    position: absolute;
    bottom: 2.4rem;
    left: 50%;
    translate: -50% 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    pointer-events: none;
    transition: opacity 200ms ease;
    z-index: 10;
}

.scroll-hint-line {
    width: 1.5px;
    height: 40px;
    background: linear-gradient(to bottom, transparent, var(--accent, #5eead4), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
}

.scroll-hint-text {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 700;
    color: rgba(226, 232, 240, 0.7);
}

@keyframes scrollPulse {
    0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
    50%      { opacity: 1;   transform: scaleY(1.1); }
}

@media (max-width: 768px) {
    .statement {
        padding: 1.2rem 1.2rem;
    }
    .statement.is-primary-hero {
        padding-bottom: 5rem;
    }
    .statement-card {
        padding: 0.9rem 1.1rem;
    }
    .statement-title {
        font-size: clamp(1.8rem, 8.5vw, 3.2rem);
    }
    .statement-subtitle {
        font-size: clamp(0.9rem, 3.8vw, 1.15rem);
        max-width: 100%;
    }
    .scroll-hint { bottom: 1.2rem; }
    .scroll-hint-line { height: 26px; }
}

@media (max-width: 480px) {
    .scrolly-root { height: 480vh; }
    .statement { padding: 1rem 0.8rem; }
}

@media (prefers-reduced-motion: reduce) {
    .scroll-hint-line { animation: none; }
    .statement { transition: none; }
}
</style>
