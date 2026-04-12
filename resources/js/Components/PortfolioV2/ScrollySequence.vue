<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

/* ───────────────────────────────────────────────
   Types & Props
   ─────────────────────────────────────────────── */
interface HeroStatement {
    title: string
    subtitle: string
    align: 'left' | 'center' | 'right'
    /** scroll-progress window the statement is fully visible */
    start: number
    end: number
}

const props = defineProps<{
    name: string
    title: string
    subtitle: string
    imageUrl?: string | null
    frameCount?: number
}>()

const emit = defineEmits<{
    (e: 'hero-ready'): void
    (e: 'hero-progress', value: number): void
}>()

/* ───────────────────────────────────────────────
   Reactive state
   ─────────────────────────────────────────────── */
const containerRef = ref<HTMLElement | null>(null)
const canvasRef    = ref<HTMLCanvasElement | null>(null)
const progress     = ref(0)
const loadedFrames = ref<(HTMLImageElement | null)[]>([])
const hasSequence  = ref(false)
const seqLoaded    = ref(false)        // true once load attempt finishes
const loadingPct   = ref(0)
const heroReadyEmitted = ref(false)

let rafId: number | null = null

/* ───────────────────────────────────────────────
   Overlay statements — timings tuned to match the
   three-phase cinematic zoom from generate-frames:
     Phase 1  0-30%  : Reveal from dark  → show name/title
     Phase 2  30-65% : Zoom transition   → show "8+ Years" statement
     Phase 3  65-100%: Hero close-up     → show "AI Native" statement
   ─────────────────────────────────────────────── */
const statements = computed<HeroStatement[]>(() => [
    {
        title: `Hello! I'm\n${props.name}`,
        subtitle: props.title,
        align: 'center',
        start: 0.05,
        end: 0.24,
    },
    {
        title: '8+ Years Experience.',
        subtitle: 'Specializing in Vue, Laravel, and Scalable Microservices.',
        align: 'left',
        start: 0.34,
        end: 0.56,
    },
    {
        title: 'Innovating with AI.',
        subtitle: 'Building AI Native Products & Intelligent Automation Systems.',
        align: 'right',
        start: 0.68,
        end: 0.90,
    },
])

const effectiveFrameCount = computed(() => Math.max(1, props.frameCount ?? 90))

/* ───────────────────────────────────────────────
   Helpers
   ─────────────────────────────────────────────── */
function clamp(v: number, lo: number, hi: number) { return Math.min(hi, Math.max(lo, v)) }

function handleResize() {
    const c = canvasRef.value
    if (!c) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    c.width  = Math.floor(window.innerWidth  * dpr)
    c.height = Math.floor(window.innerHeight * dpr)
    c.style.width  = '100%'
    c.style.height = '100%'
    const ctx = c.getContext('2d')
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

/**
 * Draw an image covering the full canvas (object-fit: cover)
 * with optional zoom centered on the face (upper-center).
 */
function drawCover(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    w: number,
    h: number,
    zoom: number = 1,
    panY: number = 0,
) {
    const cR = w / h
    const iR = img.width / img.height
    let dw = w, dh = h, ox = 0, oy = 0
    if (iR > cR) { dw = img.width * (h / img.height); ox = (w - dw) / 2 }
    else          { dh = img.height * (w / img.width); oy = (h - dh) / 2 }

    // Apply zoom around upper-center to keep face stable while scrolling.
    if (zoom !== 1) {
        const cx = w / 2
        const cy = h * 0.41
        const ndw = dw * zoom
        const ndh = dh * zoom
        ox = cx - (cx - ox) * zoom
        oy = cy - (cy - oy) * zoom + panY
        dw = ndw
        dh = ndh
    }

    ctx.drawImage(img, ox, oy, dw, dh)
}

/* ───────────────────────────────────────────────
   Zoom & opacity curves driven by scroll progress
   ─────────────────────────────────────────────── */

/** Smooth zoom tuned for face framing quality: 1.0 → ~1.14 */
function zoomAtProgress(p: number): number {
    const isMobile = window.innerWidth <= 768
    const maxZoom = isMobile ? 1.09 : 1.14
    return 1 + (maxZoom - 1) * easeInOutCubic(p)
}

/** Background opacity: starts dim, becomes fully opaque as you scroll down */
function bgOpacityAtProgress(p: number): number {
    // 0.25 → 1.0  (starts 25% visible, fully visible at bottom)
    return 0.42 + 0.58 * easeInOutCubic(clamp(p * 1.2, 0, 1))
}

function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/* ───────────────────────────────────────────────
   Render loop
   ─────────────────────────────────────────────── */
function render() {
    const cv = canvasRef.value
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const w = window.innerWidth
    const h = window.innerHeight
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#090e14'
    ctx.fillRect(0, 0, w, h)

    if (hasSequence.value && loadedFrames.value.length > 0) {
        const total = loadedFrames.value.length
        const idx = clamp(Math.floor(progress.value * (total - 1)), 0, total - 1)
        
        // Find nearest loaded frame if current isn't loaded yet
        let frame = loadedFrames.value[idx]
        if (!frame) {
            for (let offset = 1; offset < total; offset++) {
                if (idx - offset >= 0 && loadedFrames.value[idx - offset]) {
                    frame = loadedFrames.value[idx - offset]
                    break
                }
                if (idx + offset < total && loadedFrames.value[idx + offset]) {
                    frame = loadedFrames.value[idx + offset]
                    break
                }
            }
        }

        if (frame) {
            const p = progress.value
            const zoom   = zoomAtProgress(p)
            const alpha  = bgOpacityAtProgress(p)
            const panY = -10 * easeInOutCubic(p)

            ctx.save()
            ctx.globalAlpha = alpha
            drawCover(ctx, frame, w, h, zoom, panY)
            ctx.restore()
        }
    }
}

function tick() { render(); rafId = requestAnimationFrame(tick) }

/* ───────────────────────────────────────────────
   Scroll tracking
   ─────────────────────────────────────────────── */
function updateProgress() {
    const el = containerRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const total = Math.max(1, rect.height - window.innerHeight)
    progress.value = clamp(-rect.top / total, 0, 1)
}

/* ───────────────────────────────────────────────
   Frame loading — tries .webp first, falls back to .png
   Batched in groups of 8 for fast parallel loading
   without flooding the browser.
   ─────────────────────────────────────────────── */
async function loadSequence() {
    const total = effectiveFrameCount.value
    const frames: (HTMLImageElement | null)[] = new Array(total).fill(null)
    loadedFrames.value = frames

    // Instant placeholder (base64) so it renders immediately
    const placeholder = new Image()
    placeholder.src = 'data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAACwBACdASogABIAPzmSs+sUAAAzS/rFPJxHKSVI2VuB9sbB2yPkPBjy715okwo52Srolz2VILqC7dT5eyqnhxfs'
    frames[0] = placeholder
    hasSequence.value = true

    let loaded = 0

    // Progressive loading arrays
    const priority1 = [0, 1, 2] // First 3 frames for instant scroll start
    const priority2: number[] = [] // Every 4th frame for rough animation
    const priority3: number[] = [] // Remaining frames for smooth interpolation

    for (let i = 3; i < total; i++) {
        if (i % 4 === 0) priority2.push(i)
        else priority3.push(i)
    }

    async function loadOne(i: number): Promise<void> {
        const id = String(i).padStart(4, '0')
        for (const ext of ['webp', 'png']) {
            const ok = await new Promise<boolean>((resolve) => {
                const img = new Image()
                img.src = `/sequence/${id}.${ext}`
                img.onload  = () => { frames[i] = img; resolve(true) }
                img.onerror = () => resolve(false)
            })
            if (ok) break
        }
        loaded++
        loadingPct.value = Math.round((loaded / total) * 100)
        emit('hero-progress', loadingPct.value)
    }

    async function loadBatch(indices: number[], batchSize = 8) {
        for (let b = 0; b < indices.length; b += batchSize) {
            const slice = indices.slice(b, b + batchSize).map(loadOne)
            await Promise.all(slice)
            loadedFrames.value = [...frames] // Trigger reactivity
        }
    }

    // 1. Load priority 1
    await loadBatch(priority1, 3)

    // Hero is considered ready as soon as first critical frames are loaded.
    if (!heroReadyEmitted.value) {
        heroReadyEmitted.value = true
        emit('hero-ready')
    }
    
    // 2. Load priority 2 (intermediate frames)
    await loadBatch(priority2, 8)
    
    // 3. Load priority 3 (fill the gaps)
    await loadBatch(priority3, 8)

    seqLoaded.value = true
    emit('hero-progress', 100)
}

/* ───────────────────────────────────────────────
   Overlay style per statement
   ─────────────────────────────────────────────── */
function statementStyle(start: number, end: number) {
    const p = progress.value
    const fadeIn  = 0.07   // scroll-fraction for fade-in ramp
    const fadeOut = 0.07

    let opacity = 0
    if (p >= start - fadeIn && p <= start)
        opacity = (p - (start - fadeIn)) / fadeIn
    else if (p > start && p <= end)
        opacity = 1
    else if (p > end && p <= end + fadeOut)
        opacity = 1 - (p - end) / fadeOut

    opacity = clamp(opacity, 0, 1)
    const y = 36 * (1 - opacity)          // slide up as it appears
    const scale = 0.96 + 0.04 * opacity   // subtle scale-in

    return {
        opacity,
        transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
    }
}

/* ───────────────────────────────────────────────
   Scroll indicator opacity (hidden once you begin scrolling)
   ─────────────────────────────────────────────── */
const scrollHintOpacity = computed(() => clamp(1 - progress.value * 12, 0, 1))

/* ───────────────────────────────────────────────
   Lifecycle
   ─────────────────────────────────────────────── */
onMounted(async () => {
    handleResize()
    window.addEventListener('resize',  handleResize, { passive: true })
    window.addEventListener('scroll',  updateProgress, { passive: true })
    updateProgress()

    // Keep first paint responsive: render loop starts immediately,
    // sequence continues loading in background.
    tick()
    void loadSequence()
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('scroll', updateProgress)
    if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
    <section ref="containerRef" class="scrolly-root">
        <div class="scrolly-sticky">
            <canvas ref="canvasRef" class="hero-canvas" />

            <!-- film grain -->
            <div class="grain" />

            <!-- text overlays -->
            <div class="overlay-layer">
                <div
                    v-for="(item, idx) in statements"
                    :key="idx"
                    class="statement"
                    :class="`align-${item.align}`"
                    :style="statementStyle(item.start, item.end)"
                >
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

            <!-- scroll hint at top -->
            <div class="scroll-hint" :style="{ opacity: scrollHintOpacity }">
                <span class="scroll-hint-line" />
                <span class="scroll-hint-text">Scroll</span>
            </div>

            <!-- loading bar while sequence loads -->
            <div v-if="!seqLoaded" class="load-bar-wrap">
                <div class="load-bar" :style="{ width: loadingPct + '%' }" />
            </div>
        </div>
    </section>
</template>

<style scoped>
/* ── Container ────────────────────────────────── */
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
}
.hero-canvas {
    width: 100%;
    height: 100%;
    display: block;
}

/* ── Film grain ───────────────────────────────── */
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

/* ── Overlay layer ────────────────────────────── */
.overlay-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

/* ── Statement cards ──────────────────────────── */
.statement {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.85rem;
    padding: 2rem 3.5rem;
    will-change: transform, opacity;
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

/* ── Scroll hint ──────────────────────────────── */
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

/* ── Loading bar ──────────────────────────────── */
.load-bar-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(255,255,255,0.06);
}
.load-bar {
    height: 100%;
    background: linear-gradient(90deg, #f59e0b, #25ebba);
    transition: width 120ms ease;
}

/* ── Mobile ───────────────────────────────────── */
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
</style>
