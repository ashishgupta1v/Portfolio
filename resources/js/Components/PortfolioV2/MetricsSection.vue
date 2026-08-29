<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Metric {
    /** Raw target number (sign-agnostic — prefix/suffix handle presentation) */
    target: number
    /** Characters before the number, e.g. "$" or "-" */
    prefix: string
    /** Characters after the number, e.g. "%", "+" */
    suffix: string
    label: string
    description: string
}

const METRICS: Metric[] = [
    {
        target: 1,
        prefix: '$',
        suffix: 'M+',
        label: 'Annual Cloud Infrastructure Savings',
        description: 'Architectural optimization at Infosys',
    },
    {
        target: 30,
        prefix: '-',
        suffix: '%',
        label: 'Clinical Trial Monitoring Latency',
        description: 'Redis Queues + real-time sync',
    },
    {
        target: 59,
        prefix: '-',
        suffix: '%',
        label: 'Order-to-Dispatch Cycle Time',
        description: 'Knitwear ERP modernization',
    },
    {
        target: 10,
        prefix: '',
        suffix: '+',
        label: 'Years of Engineering Experience',
        description: 'Healthcare, Aviation, Logistics, SaaS',
    },
]

const sectionRef = ref<HTMLElement | null>(null)

/** Reactive counters displayed inside each card (initialized to targets for instant SSR/deep-link accuracy) */
const counters = ref<number[]>(METRICS.map((m) => m.target))

let triggers: ScrollTrigger[] = []

onMounted(() => {
    if (!sectionRef.value) return

    const q = gsap.utils.selector(sectionRef.value)
    const cards = q('.metric-card')

    // ── Card entrance stagger ──────────────────────────────────────────
    if (cards.length) {
        gsap.from(cards, {
            scrollTrigger: {
                trigger: sectionRef.value,
                start: 'top 90%',
                once: true,
            },
            y: 30,
            opacity: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'all',
        })
    }

    // ── Number count-up ────────────────────────────────────────────────
    const proxy: Record<string, number> = {}
    METRICS.forEach((_, i) => { proxy[`n${i}`] = 0 })

    const tweenVars: Record<string, unknown> = {
        duration: 1.6,
        ease: 'power2.out',
        paused: true,
        onUpdate() {
            counters.value = METRICS.map((_, i) => Math.round(proxy[`n${i}`]))
        },
    }
    METRICS.forEach((m, i) => { tweenVars[`n${i}`] = m.target })

    const tween = gsap.to(proxy, tweenVars)

    const st = ScrollTrigger.create({
        trigger: sectionRef.value,
        start: 'top 90%',
        once: true,
        onEnter() {
            tween.play()
        },
    })

    triggers.push(st)
})

onUnmounted(() => {
    triggers.forEach((st) => st.kill())
    triggers = []
})

function formatMetric(index: number): string {
    const m = METRICS[index]
    return `${m.prefix}${counters.value[index]}${m.suffix}`
}
</script>

<template>
    <section ref="sectionRef" id="metrics" class="metrics-section">
        <div class="metrics-ambient-glow" aria-hidden="true" />
        <div class="metrics-shell">
            <div class="section-header">
                <div class="section-header-wrapper">
                    <h2 class="section-title">
                        <span class="section-title-word">Impact &amp;</span>
                        <span class="section-title-word accent">Outcomes</span>
                    </h2>
                </div>
                <p class="section-subtitle">Quantified business and architectural outcomes from high-scale production systems.</p>
                <div class="section-separator" />
            </div>

            <div class="metrics-grid">
                <article
                    v-for="(metric, i) in METRICS"
                    :key="metric.label"
                    class="metric-card glass-panel"
                    :class="{ 'metric-card--featured': i === 0 }"
                >
                    <div class="metric-top-bar">
                        <span class="metric-chip glow-pill">
                            <span v-if="i === 0">Enterprise Scale</span>
                            <span v-else-if="i === 1">Performance</span>
                            <span v-else-if="i === 2">Efficiency</span>
                            <span v-else>Experience</span>
                        </span>
                    </div>
                    <span
                        class="metric-number"
                        :class="{ 'text-gradient-hero': i === 0 }"
                        :aria-label="`${metric.prefix}${metric.target}${metric.suffix} ${metric.label}`"
                    >
                        {{ formatMetric(i) }}
                    </span>
                    <h3 class="metric-label">{{ metric.label }}</h3>
                    <p class="metric-desc">{{ metric.description }}</p>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.metrics-section {
    position: relative;
    background: linear-gradient(
        180deg,
        var(--section-bg-tint) 0%,
        var(--section-bg-mid) 50%,
        var(--section-bg-deep) 100%
    );
    padding: 7rem 1.5rem 6rem;
    border-top: 1px solid var(--border);
    overflow: hidden;
}

.metrics-ambient-glow {
    position: absolute;
    top: 30%;
    right: 15%;
    width: 600px;
    height: 350px;
    background: radial-gradient(circle, rgba(94, 234, 212, 0.1) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%);
    filter: blur(60px);
    pointer-events: none;
}

.metrics-shell {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

/* ── Grid ─────────────────────────────────────────────────────────── */

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.4rem;
    margin-top: 2rem;
}

/* ── Card ─────────────────────────────────────────────────────────── */

.metric-card {
    border-radius: 1.15rem;
    padding: 2.2rem 1.6rem 1.8rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: var(--card-bg);
}

.metric-card--featured {
    background: linear-gradient(135deg, var(--card-bg-strong), rgba(94, 234, 212, 0.06));
    border-color: rgba(94, 234, 212, 0.35);
    box-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.6), 0 0 25px rgba(94, 234, 212, 0.12);
}

.metric-top-bar {
    margin-bottom: 0.25rem;
}

.metric-chip {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
}

/* ── Number ────────────────────────────────────────────────────────── */

.metric-number {
    font-size: clamp(2.6rem, 4.5vw, 4.2rem);
    font-weight: 900;
    color: var(--accent);
    line-height: 1.05;
    letter-spacing: -0.04em;
    font-variant-numeric: tabular-nums;
}

/* ── Label ─────────────────────────────────────────────────────────── */

.metric-label {
    font-size: 1.05rem;
    font-weight: 750;
    color: var(--text-1);
    line-height: 1.35;
    margin: 0;
    letter-spacing: -0.01em;
}

/* ── Description ───────────────────────────────────────────────────── */

.metric-desc {
    font-size: 0.86rem;
    color: var(--text-2);
    line-height: 1.5;
    margin: 0;
}

/* ── Responsive ────────────────────────────────────────────────────── */

@media (max-width: 1024px) {
    .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .metrics-section {
        padding: 4.5rem 1rem 3.5rem;
    }
}

@media (max-width: 480px) {
    .metrics-section {
        padding: 3.5rem 0.8rem;
    }

    .metrics-grid {
        grid-template-columns: 1fr;
    }

    .metric-card {
        padding: 1.6rem 1.4rem;
    }
}

/* ── Light Mode Polish ── */
:global([data-theme="light"]) .metric-card {
    background: #ffffff;
    border-color: rgba(15, 23, 42, 0.08);
    box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 0 0 1px rgba(15, 23, 42, 0.04);
}

:global([data-theme="light"]) .metric-card--featured {
    background: linear-gradient(135deg, #ffffff, rgba(13, 148, 136, 0.05));
    border-color: rgba(13, 148, 136, 0.35);
    box-shadow: 0 16px 36px -6px rgba(15, 23, 42, 0.1), 0 0 24px rgba(13, 148, 136, 0.12);
}

:global([data-theme="light"]) .metric-number {
    color: #0d9488;
}
</style>
