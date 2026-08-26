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
        target: 9,
        prefix: '',
        suffix: '+',
        label: 'Years of Engineering Experience',
        description: 'Healthcare, Aviation, Logistics, SaaS',
    },
]

const sectionRef = ref<HTMLElement | null>(null)

/** Reactive counters displayed inside each card */
const counters = ref<number[]>(METRICS.map(() => 0))

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
                start: 'top 80%',
            },
            y: 52,
            opacity: 0,
            duration: 0.72,
            stagger: 0.12,
            ease: 'power3.out',
        })
    }

    // ── Number count-up ────────────────────────────────────────────────
    // Individual scalar keys, not an array-valued "values" prop — GSAP 3.14.2
    // reserves that name internally and throws `t.values.map is not a
    // function`, silently killing the tween before onUpdate ever fires.
    const proxy: Record<string, number> = {}
    METRICS.forEach((_, i) => { proxy[`n${i}`] = 0 })

    const tweenVars: Record<string, unknown> = {
        duration: 1.8,
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
        start: 'top 75%',
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
        <div class="metrics-shell">
            <div class="section-header">
                <div class="section-header-wrapper">
                    <h2 class="section-title">
                        <span class="section-title-word">Impact &amp;</span>
                        <span class="section-title-word accent">Results</span>
                    </h2>
                </div>
                <p class="section-subtitle">Quantified outcomes from real production systems.</p>
                <div class="section-separator" />
            </div>

            <div class="metrics-grid">
                <article
                    v-for="(metric, i) in METRICS"
                    :key="metric.label"
                    class="metric-card"
                >
                    <span class="metric-number" :aria-label="`${metric.prefix}${metric.target}${metric.suffix} ${metric.label}`">
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
    padding: 6rem 1.5rem 5rem;
    border-top: 1px solid var(--border);
    overflow: hidden;
}

.metrics-shell {
    max-width: 1180px;
    margin: 0 auto;
}

/* ── Grid ─────────────────────────────────────────────────────────── */

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
    margin-top: 1.75rem;
}

/* ── Card ─────────────────────────────────────────────────────────── */

.metric-card {
    background: var(--glass-bg);
    border: 1px solid var(--border);
    border-radius: 0.9rem;
    padding: 2rem 1.5rem 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    transition:
        border-color 220ms cubic-bezier(0.23, 1, 0.32, 1),
        background 220ms cubic-bezier(0.23, 1, 0.32, 1);
}

@media (hover: hover) and (pointer: fine) {
    .metric-card:hover {
        border-color: rgba(var(--accent-rgb), 0.35);
        background: linear-gradient(160deg, var(--card-bg-strong, var(--glass-bg)), rgba(var(--accent-rgb), 0.04));
    }
}

/* ── Number ────────────────────────────────────────────────────────── */

.metric-number {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 900;
    color: var(--accent);
    line-height: 1.1;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
}

/* ── Label ─────────────────────────────────────────────────────────── */

.metric-label {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-1);
    line-height: 1.3;
    margin: 0;
}

/* ── Description ───────────────────────────────────────────────────── */

.metric-desc {
    font-size: 0.84rem;
    color: var(--text-muted, var(--text-2));
    line-height: 1.45;
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
        padding: 4rem 1rem 3.5rem;
    }
}

@media (max-width: 480px) {
    .metrics-section {
        padding: 3rem 0.8rem;
    }

    .metrics-grid {
        grid-template-columns: 1fr;
    }

    .metric-card {
        padding: 1.5rem 1.25rem 1.35rem;
    }
}

/* ── Reduced motion ────────────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
    .metric-card {
        transition: none;
    }
}
</style>
