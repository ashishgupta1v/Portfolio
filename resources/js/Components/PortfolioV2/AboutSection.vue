<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Profile } from '@/types/portfolio'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Boxes, Brain, ChevronDown, Gauge, Trophy } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

defineProps<{
    profile: Profile
}>()

const sectionRef = ref<HTMLElement | null>(null)
const activeCard = ref<number | null>(0)

const capabilities = [
    {
        icon: Boxes,
        title: 'Engineering Modular Monoliths with DDD',
        description: 'I modernize legacy systems into decoupled modular monoliths with strict bounded contexts and clean domain isolation.',
        details: [
            'Bounded contexts & domain events eliminating tight coupling',
            'Safe strangler-fig refactoring patterns with zero downtime',
            'Independent domain modules with automated boundary testing',
        ],
    },
    {
        icon: Brain,
        title: 'Semantic Intelligence (AI/RAG)',
        description: 'I build intent-aware search and RAG systems that transform generic content into adaptive, meaningful product experiences.',
        details: [
            'pgvector & hybrid lexical-vector embedding pipelines',
            'Multi-stage query classification with prompt injection defense',
            'Real-time streaming agent response generation with fallback safety',
        ],
    },
    {
        icon: Gauge,
        title: 'High-Performance Infrastructure',
        description: 'I optimize throughput, latency, and observability with event-driven architecture, Redis-first patterns, and production resilience.',
        details: [
            'Redis cache-aside, job pipelines, and sub-50ms query optimization',
            'SQLite WAL concurrency & high-throughput PostgreSQL tuning',
            'Proactive OpenTelemetry, error tracking, and automated recovery loops',
        ],
    },
    {
        icon: Trophy,
        title: 'Gamification and Retention Systems',
        description: 'I design transformation engines that convert passive consumption into action through smart loops and behavior-aware systems.',
        details: [
            'Event-sourced discipline & point balance ledgers',
            'WhatsApp-native automated accountability & check-in bots',
            'Streak mechanics, progressive milestone tracking, and user retention loops',
        ],
    },
]

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
        <div class="combo-shell">
            <div class="combo-intro glass">
                <p class="combo-eyebrow">About Me · What I Do</p>
                <h2 class="combo-heading">
                    <span class="combo-heading-line">I Architect Scalable</span>
                    <span class="combo-heading-line accent">Transformation Engines</span>
                </h2>

                <p class="combo-para combo-primary">{{ profile.bio }}</p>
                <p class="combo-para combo-secondary">
                    I thrive in fast-moving teams where ownership matters — taking systems from architecture through
                    production, mentoring engineers along the way, and shipping measurable outcomes.
                </p>
            </div>

            <div class="combo-cards glass">
                <article
                    v-for="(item, i) in capabilities"
                    :key="item.title"
                    class="combo-card"
                    :class="{ active: activeCard === i }"
                    tabindex="0"
                    :aria-expanded="activeCard === i"
                    @mouseenter="activeCard = i"
                    @click="activeCard = activeCard === i ? null : i"
                    @keydown.enter.prevent="activeCard = activeCard === i ? null : i"
                    @keydown.space.prevent="activeCard = activeCard === i ? null : i"
                >
                    <div class="card-icon"><component :is="item.icon" :size="18" /></div>
                    <h3 class="card-title">{{ i + 1 }}. {{ item.title }}</h3>
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
    padding: 7rem 1.5rem 6.5rem;
    overflow: hidden;
}

.combo-shell {
    position: relative;
    max-width: 1180px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.4rem;
}

.bg-cutout {
    width: min(560px, 62vw);
    opacity: 0.3;
    filter: saturate(0.95) contrast(1.05) blur(0.2px) drop-shadow(0 18px 42px rgba(0, 0, 0, 0.45));
    transform: translateY(8px);
}

.glass {
    position: relative;
    z-index: 1;
    background: linear-gradient(135deg, var(--glass-bg), var(--glass-fg));
    border: 1px solid var(--border);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
}

.combo-intro {
    padding: 2rem 2.1rem;
}

.combo-eyebrow {
    color: rgba(var(--accent-rgb), 0.92);
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 0.9rem;
}

.combo-heading {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25rem;
}

.combo-heading-line {
    font-size: clamp(1.9rem, 4.3vw, 3.3rem);
    line-height: 1.06;
    letter-spacing: -0.03em;
    color: var(--text-heading);
    font-style: normal;
    font-weight: 800;
}

.combo-heading-line.accent {
    color: var(--accent);
}

.combo-primary {
    color: var(--text-body);
    font-size: clamp(1rem, 1.55vw, 1.22rem);
    line-height: 1.78;
    margin-bottom: 0.9rem;
}

.combo-secondary {
    color: rgba(226, 232, 240, 0.62);
    font-size: clamp(0.9rem, 1.25vw, 1.03rem);
    line-height: 1.75;
}

.combo-cards {
    padding: 0.8rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
}

.combo-card {
    position: relative;
    border: 1px dashed var(--border-strong);
    border-radius: 0.75rem;
    padding: 1rem 1rem 1rem 0.95rem;
    transition: border-color 0.28s ease, background-color 0.28s ease;
}

.combo-card.active,
.combo-card:hover {
    border-color: rgba(var(--accent-rgb), 0.55);
    background: rgba(var(--accent-rgb), 0.04);
}

.card-icon {
    color: rgba(var(--accent-rgb), 0.72);
    margin-bottom: 0.55rem;
}

.card-title {
    font-size: 1.02rem;
    color: var(--text-1);
    letter-spacing: -0.01em;
    margin-bottom: 0.4rem;
}

.card-text {
    font-size: 0.86rem;
    line-height: 1.6;
    color: var(--text-muted);
    padding-right: 2rem;
}

.card-disclosure {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(var(--accent-rgb), 0.15);
    animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
}

.card-detail-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.card-detail-item {
    display: flex;
    align-items: flex-start;
    gap: 0.45rem;
    font-size: 0.82rem;
    line-height: 1.5;
    color: var(--text-2);
}

.detail-dot {
    color: var(--accent);
    font-weight: 700;
    font-size: 0.95rem;
    line-height: 1.2;
    flex-shrink: 0;
}

.expand-btn {
    position: absolute;
    top: 0.65rem;
    right: 0.65rem;
    width: 1.7rem;
    height: 1.7rem;
    border: 1px solid var(--border-strong);
    background: var(--card-bg);
    color: var(--text-2);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
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
        padding: 4rem 1rem;
    }

    .combo-intro {
        padding: 1.35rem 1.15rem;
    }

    .bg-cutout {
        width: min(420px, 92vw);
        opacity: 0.28;
    }
}

@media (max-width: 480px) {
    .combo-section {
        padding: 3rem 0.8rem;
    }

    .combo-cards {
        padding: 0.6rem;
        gap: 0.6rem;
    }
}
</style>
