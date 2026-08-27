<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Profile } from '@/types/portfolio'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Boxes, Brain, ChevronDown, Gauge, Sparkles, Trophy } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

defineProps<{
    profile: Profile
}>()

const sectionRef = ref<HTMLElement | null>(null)
const activeCard = ref<number | null>(0)

const capabilities = [
    {
        icon: Boxes,
        tag: 'Architecture & DDD',
        title: 'Modular Monoliths & Domain Isolation',
        description: 'I architect decoupled modular monoliths with strict bounded contexts, explicit domain events, and zero-downtime strangler-fig migration patterns.',
        details: [
            'Bounded contexts & domain events eliminating tight coupling',
            'Safe strangler-fig refactoring patterns with zero downtime',
            'Independent domain modules with automated boundary testing',
        ],
    },
    {
        icon: Brain,
        tag: 'AI SaaS & Vectors',
        title: 'Semantic Intelligence & RAG Engines',
        description: 'I build intent-aware retrieval engines, hybrid vector embeddings, and autonomous agent loops with prompt defense and fallback safeguards.',
        details: [
            'pgvector & hybrid lexical-vector embedding pipelines',
            'Multi-stage query classification with prompt injection defense',
            'Real-time streaming agent response generation with fallback safety',
        ],
    },
    {
        icon: Gauge,
        tag: 'Scale & Latency',
        title: 'High-Throughput Distributed Infrastructure',
        description: 'I optimize system throughput and sub-50ms latencies with Redis Horizon queue topologies, SQLite WAL concurrency, and proactive OpenTelemetry observability.',
        details: [
            'Redis cache-aside, job pipelines, and sub-50ms query optimization',
            'SQLite WAL concurrency & high-throughput PostgreSQL tuning',
            'Proactive OpenTelemetry, error tracking, and automated recovery loops',
        ],
    },
    {
        icon: Trophy,
        tag: 'Growth & Retention',
        title: 'Behavioral Loops & Retention Systems',
        description: 'I engineer transformation engines that convert passive consumption into measurable user action through WhatsApp-native bots and event-sourced ledgers.',
        details: [
            'Event-sourced discipline & point balance ledgers',
            'WhatsApp-native automated accountability & check-in bots',
            'Streak mechanics, progressive milestone tracking, and user retention loops',
        ],
    },
]

function handleCardPointerMove(event: PointerEvent) {
    const card = event.currentTarget as HTMLElement | null
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
}

onMounted(() => {
    if (!sectionRef.value) return

    const q = gsap.utils.selector(sectionRef.value)

    const eyebrow = q('.combo-eyebrow')
    if (eyebrow.length) {
        gsap.from(eyebrow, {
            scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' },
            y: 20, opacity: 0, duration: 0.65, ease: 'power3.out',
        })
    }

    const heading = q('.combo-heading-line')
    if (heading.length) {
        gsap.from(heading, {
            scrollTrigger: { trigger: sectionRef.value, start: 'top 78%' },
            y: 48, opacity: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out',
        })
    }

    const paras = q('.combo-para')
    if (paras.length) {
        gsap.from(paras, {
            scrollTrigger: { trigger: sectionRef.value, start: 'top 72%' },
            y: 32, opacity: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out',
        })
    }

    const cards = q('.combo-card')
    const cardsContainer = q('.combo-cards')
    if (cards.length && cardsContainer.length) {
        gsap.from(cards, {
            scrollTrigger: { trigger: cardsContainer, start: 'top 78%' },
            y: 44, opacity: 0, duration: 0.72, stagger: 0.12, ease: 'power3.out',
        })
    }
})
</script>

<template>
    <section ref="sectionRef" id="about" class="combo-section">
        <div class="combo-ambient-glow" aria-hidden="true" />
        <div class="combo-shell">
            <!-- Intro Glass Card -->
            <div class="combo-intro glass-panel">
                <div class="intro-header-row">
                    <span class="combo-eyebrow glow-pill">
                        <Sparkles :size="12" class="eyebrow-icon" />
                        About Me · Core Engineering
                    </span>
                </div>
                <h2 class="combo-heading">
                    <span class="combo-heading-line">I Architect Scalable</span>
                    <span class="combo-heading-line text-gradient-accent">Transformation Engines</span>
                </h2>

                <p class="combo-para combo-primary">{{ profile.bio }}</p>
                <p class="combo-para combo-secondary">
                    I thrive in fast-moving engineering environments where end-to-end technical ownership matters — taking distributed systems from domain modeling through production hardening, mentoring engineers, and shipping measurable business outcomes.
                </p>
            </div>

            <!-- Bento Capabilities Grid -->
            <div class="combo-cards">
                <article
                    v-for="(item, i) in capabilities"
                    :key="item.title"
                    class="combo-card glass-panel"
                    :class="{ active: activeCard === i }"
                    tabindex="0"
                    :aria-expanded="activeCard === i"
                    @pointermove="handleCardPointerMove"
                    @mouseenter="activeCard = i"
                    @click="activeCard = activeCard === i ? null : i"
                    @keydown.enter.prevent="activeCard = activeCard === i ? null : i"
                    @keydown.space.prevent="activeCard = activeCard === i ? null : i"
                >
                    <!-- Spotlight overlay -->
                    <div class="card-spotlight" aria-hidden="true" />
                    
                    <!-- Ghost watermark numeral -->
                    <span class="ghost-numeral" aria-hidden="true">0{{ i + 1 }}</span>

                    <div class="card-top-row">
                        <div class="card-icon-box">
                            <component :is="item.icon" :size="20" />
                        </div>
                        <span class="card-tag">{{ item.tag }}</span>
                    </div>

                    <h3 class="card-title">{{ item.title }}</h3>
                    <p class="card-text">{{ item.description }}</p>

                    <div v-show="activeCard === i" class="card-disclosure">
                        <ul class="card-detail-list">
                            <li v-for="(detail, di) in item.details" :key="di" class="card-detail-item">
                                <span class="detail-dot" aria-hidden="true">›</span>
                                <span>{{ detail }}</span>
                            </li>
                        </ul>
                    </div>

                    <button
                        class="expand-btn"
                        type="button"
                        :aria-expanded="activeCard === i"
                        :aria-label="activeCard === i ? 'Collapse card details' : 'Expand card details'"
                    >
                        <ChevronDown :size="15" :class="{ open: activeCard === i }" aria-hidden="true" />
                    </button>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.combo-section {
    position: relative;
    background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 55%, var(--section-bg-mid) 100%);
    padding: 7.5rem 1.5rem 7rem;
    overflow: hidden;
}

.combo-ambient-glow {
    position: absolute;
    top: 20%;
    left: 50%;
    translate: -50% 0;
    width: min(1000px, 90vw);
    height: 450px;
    background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.09) 0%, rgba(94, 234, 212, 0.08) 45%, transparent 70%);
    filter: blur(50px);
    pointer-events: none;
}

.combo-shell {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    z-index: 1;
}

.combo-intro {
    padding: 2.75rem 2.75rem;
    border-radius: 1.25rem;
    background: var(--card-bg-strong);
}

.intro-header-row {
    margin-bottom: 1.25rem;
}

.combo-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 0.72rem;
    font-weight: 700;
}

.combo-heading {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.4rem;
}

.combo-heading-line {
    font-size: clamp(2.1rem, 4.5vw, 3.5rem);
    line-height: 1.08;
    letter-spacing: -0.035em;
    color: var(--text-heading);
    font-weight: 850;
}

.combo-primary {
    color: var(--text-1);
    font-size: clamp(1.05rem, 1.6vw, 1.26rem);
    line-height: 1.75;
    margin-bottom: 1rem;
    font-weight: 450;
}

.combo-secondary {
    color: var(--text-2);
    font-size: clamp(0.92rem, 1.25vw, 1.05rem);
    line-height: 1.75;
}

/* ── Bento Grid ── */
.combo-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.4rem;
}

.combo-card {
    position: relative;
    border-radius: 1.15rem;
    padding: 1.75rem 1.6rem;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: var(--card-bg);
}

.combo-card.active,
.combo-card:hover {
    border-color: rgba(var(--accent-rgb), 0.4);
    box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.6), 0 0 25px rgba(94, 234, 212, 0.12);
}

/* Spotlight radial shine */
.card-spotlight {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
        400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(94, 234, 212, 0.12),
        transparent 60%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
}

.combo-card:hover .card-spotlight {
    opacity: 1;
}

/* Ghost watermark numeral */
.ghost-numeral {
    position: absolute;
    top: 0.8rem;
    right: 1.2rem;
    font-size: 3.6rem;
    font-weight: 900;
    line-height: 1;
    color: var(--text-3);
    opacity: 0.14;
    user-select: none;
    pointer-events: none;
    font-family: monospace;
}

.card-top-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.card-icon-box {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.65rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(var(--accent-rgb), 0.1);
    border: 1px solid rgba(var(--accent-rgb), 0.25);
    color: var(--accent);
    box-shadow: 0 0 16px rgba(var(--accent-rgb), 0.15);
}

.card-tag {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent-violet);
    background: rgba(var(--accent-violet-rgb), 0.1);
    border: 1px solid rgba(var(--accent-violet-rgb), 0.2);
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
}

.card-title {
    font-size: 1.15rem;
    font-weight: 750;
    color: var(--text-1);
    letter-spacing: -0.02em;
    margin-bottom: 0.6rem;
    padding-right: 1.5rem;
}

.card-text {
    font-size: 0.9rem;
    line-height: 1.65;
    color: var(--text-2);
}

.card-disclosure {
    margin-top: 1.1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
}

.card-detail-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.card-detail-item {
    display: flex;
    align-items: flex-start;
    gap: 0.55rem;
    font-size: 0.85rem;
    line-height: 1.55;
    color: var(--text-2);
}

.detail-dot {
    color: var(--accent);
    font-weight: 800;
    font-size: 1rem;
    line-height: 1.2;
    flex-shrink: 0;
}

.expand-btn {
    position: absolute;
    bottom: 1.25rem;
    right: 1.25rem;
    width: 2rem;
    height: 2rem;
    border: 1px solid var(--border-strong);
    background: rgba(255, 255, 255, 0.04);
    color: var(--text-2);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    transition: all 0.2s ease;
}

.expand-btn:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    border-color: var(--accent);
}

.expand-btn :deep(svg) {
    transition: transform 0.24s ease;
}

.expand-btn :deep(svg.open) {
    transform: rotate(180deg);
}

@media (max-width: 900px) {
    .combo-cards {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .combo-section {
        padding: 4.5rem 1rem;
    }

    .combo-intro {
        padding: 1.8rem 1.4rem;
    }
}
</style>
