<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Boxes, Brain, ChevronDown, Gauge, Trophy } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
    {
        icon: Boxes,
        title: 'Engineering Modular Monoliths with DDD',
        description: 'I specialize in modernizing legacy architectures into decoupled Modular Monoliths using Domain-Driven Design (DDD). By strictly isolating Bounded Contexts (Domain/Application/Infrastructure layers), I eliminate technical debt and ensure systems remain maintainable as they scale to 10k+ requests per second.',
        meta: [
            'Core Stack: Laravel 13, Vue 3 (Strict TypeScript), Inertia.js, Tailwind CSS.',
            'Pattern: Repository Pattern, DTO-driven data contracts, and Hexagonal Architecture.',
        ],
    },
    {
        icon: Brain,
        title: 'Orchestrating Semantic Intelligence (AI/RAG)',
        description: 'I move beyond traditional keyword-based systems to build AI-Native Applications. Utilizing Laravel Prism and Vector-Native Eloquent (pgvector), I engineer semantic search engines and RAG workflows that understand user intent and meaning. My current project, CoachSync AI, is a production RAG pipeline that automates personalized, hallucination-free habit verification directly on WhatsApp for professional coaches.',
        meta: [],
    },
    {
        icon: Gauge,
        title: 'High-Performance Infrastructure Optimization',
        description: 'I treat infrastructure as a first-class citizen. By leveraging Laravel Octane (Swoole/RoadRunner) and high-frequency Redis caching, I deliver enterprise-grade observability and speed. My architectural interventions have reduced annual cloud infrastructure costs by $1M+ while increasing throughput and reliability.',
        meta: [],
    },
    {
        icon: Trophy,
        title: 'Product-Led Gamification & Retention',
        description: 'I design Transformation Engines rather than mere content platforms. I implement complex Gyan Ledger gamification systems and Spaced Repetition (SM-2) algorithms to turn passive information into applied habits, creating high-retention moats for global products.',
        meta: [],
    },
]

const activeCard = ref<number | null>(null)

function toggle(i: number) {
    activeCard.value = activeCard.value === i ? null : i
}

onMounted(() => {
    /* Big heading reveal */
    gsap.from('.wid-title-line', {
        scrollTrigger: { trigger: '.wid-section', start: 'top 78%' },
        y: 60, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
    })

    /* Image entrance */
    gsap.from('.wid-image-wrap', {
        scrollTrigger: { trigger: '.wid-section', start: 'top 68%' },
        x: -40, scale: 0.94, opacity: 0, duration: 1, ease: 'power3.out',
    })

    /* Cards stagger */
    gsap.from('.wid-card', {
        scrollTrigger: { trigger: '.wid-cards', start: 'top 78%' },
        y: 50, opacity: 0, duration: 0.75, stagger: 0.15, ease: 'power3.out',
    })
})
</script>

<template>
    <section class="wid-section">
        <div class="wid-shell">
            <!-- Left side: big text + image -->
            <div class="wid-left">
                <div class="wid-title">
                    <span class="wid-title-line">WHAT</span>
                    <span class="wid-title-line">I <span class="accent">DO</span></span>
                </div>

                <div class="wid-image-wrap">
                    <img
                        src="/images/Edit the provided ph.png"
                        alt="Working"
                        class="wid-image"
                        loading="lazy"
                    />
                </div>
            </div>

            <!-- Right side: capability cards -->
            <div class="wid-cards">
                <article class="wid-intro-card">
                    <h3 class="intro-title">I Architect Scalable Transformation Engines.</h3>
                    <p class="intro-sub">
                        I bridge the gap between complex business requirements and elite-tier engineering.
                        As a Staff Architect, I do not just build features; I design high-concurrency ecosystems
                        that prioritize domain integrity, sub-10ms performance, and measurable business outcomes.
                    </p>
                </article>

                <article
                    v-for="(item, i) in capabilities"
                    :key="item.title"
                    class="wid-card"
                    :class="{ active: activeCard === i }"
                    @mouseenter="activeCard = i"
                    @mouseleave="activeCard = null"
                    @click="toggle(i)"
                >
                    <!-- Dashed border -->
                    <svg class="card-border" viewBox="0 0 400 220" preserveAspectRatio="none">
                        <rect
                            x="1" y="1" width="398" height="218"
                            fill="none"
                            stroke="rgba(94,234,212,0.18)"
                            stroke-width="1"
                            stroke-dasharray="8 4"
                            rx="8"
                        />
                        <!-- corner brackets -->
                        <line x1="1" y1="1" x2="20" y2="1" stroke="rgba(148,163,184,0.5)" stroke-width="1.5"/>
                        <line x1="1" y1="1" x2="1" y2="20" stroke="rgba(148,163,184,0.5)" stroke-width="1.5"/>
                        <line x1="399" y1="1" x2="380" y2="1" stroke="rgba(148,163,184,0.5)" stroke-width="1.5"/>
                        <line x1="399" y1="1" x2="399" y2="20" stroke="rgba(148,163,184,0.5)" stroke-width="1.5"/>
                        <line x1="1" y1="219" x2="20" y2="219" stroke="rgba(148,163,184,0.5)" stroke-width="1.5"/>
                        <line x1="1" y1="219" x2="1" y2="200" stroke="rgba(148,163,184,0.5)" stroke-width="1.5"/>
                        <line x1="399" y1="219" x2="380" y2="219" stroke="rgba(148,163,184,0.5)" stroke-width="1.5"/>
                        <line x1="399" y1="219" x2="399" y2="200" stroke="rgba(148,163,184,0.5)" stroke-width="1.5"/>
                    </svg>

                    <div class="card-inner">
                        <h3 class="card-title">{{ i + 1 }}. {{ item.title }}</h3>
                        <p class="card-sub">{{ item.description }}</p>

                        <div class="card-meta-wrap" :class="{ open: activeCard === i }">
                            <p v-for="(line, lineIndex) in item.meta" :key="lineIndex" class="card-meta">{{ line }}</p>
                        </div>

                        <div class="card-icon main-icon">
                            <component :is="item.icon" :size="20" />
                        </div>

                        <button class="expand-btn" type="button" aria-label="Expand card details">
                            <ChevronDown :size="16" :class="{ open: activeCard === i }" />
                        </button>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.wid-section {
    position: relative;
    background: linear-gradient(175deg, #0b1118 0%, #0a0f17 40%, #0d1521 100%);
    padding: 7rem 1.5rem 7rem;
    overflow: hidden;
}

.wid-shell {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;
}

/* ── Left ── */
.wid-left {
    position: sticky;
    top: 5rem;
}

.wid-title {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-bottom: 2rem;
}

.wid-title-line {
    display: block;
    font-size: clamp(3rem, 8vw, 6.5rem);
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -0.04em;
    color: rgba(248, 250, 252, 0.08);
    -webkit-text-stroke: 1px rgba(248, 250, 252, 0.18);
}

.wid-title-line .accent {
    color: rgba(94, 234, 212, 0.85);
    -webkit-text-stroke: 0;
}

.wid-image-wrap {
    position: relative;
    max-width: 480px;
}

.wid-image {
    width: 100%;
    height: auto;
    border-radius: 0.8rem;
    filter: drop-shadow(0 24px 60px rgba(0, 0, 0, 0.55));
}

/* ── Cards ── */
.wid-cards {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-top: 1rem;
}

.wid-intro-card {
    border: 1px solid rgba(148, 163, 184, 0.2);
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.35));
    backdrop-filter: blur(10px);
    border-radius: 0.6rem;
    padding: 1.35rem 1.4rem;
}

.intro-title {
    color: #f8fafc;
    font-size: clamp(1.2rem, 2.1vw, 1.8rem);
    letter-spacing: -0.02em;
    margin-bottom: 0.55rem;
}

.intro-sub {
    color: rgba(226, 232, 240, 0.72);
    line-height: 1.62;
    font-size: 0.9rem;
}

.wid-card {
    position: relative;
    padding: 1.8rem 1.6rem;
    cursor: pointer;
    transition: all 0.35s ease;
}

.card-border {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.wid-card:hover .card-border rect,
.wid-card.active .card-border rect {
    stroke: rgba(94, 234, 212, 0.45);
}

.wid-card:hover .card-border line,
.wid-card.active .card-border line {
    stroke: rgba(94, 234, 212, 0.7);
}

.card-inner {
    position: relative;
    z-index: 1;
}

.card-title {
    font-size: 1.35rem;
    font-weight: 700;
    color: #f8fafc;
    margin-bottom: 0.5rem;
    letter-spacing: -0.01em;
}

.card-sub {
    font-size: 0.88rem;
    line-height: 1.65;
    color: rgba(226, 232, 240, 0.5);
    font-weight: 300;
    max-width: 36rem;
    transition: color 0.3s ease;
}

.card-meta-wrap {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.card-meta-wrap.open {
    max-height: 140px;
}

.card-meta {
    margin-top: 0.5rem;
    font-size: 0.79rem;
    line-height: 1.55;
    color: rgba(148, 163, 184, 0.86);
}

.wid-card:hover .card-sub,
.wid-card.active .card-sub {
    color: rgba(226, 232, 240, 0.75);
}

.card-icon {
    position: absolute;
    right: 0;
    color: rgba(94, 234, 212, 0.35);
    transition: color 0.3s ease;
}

.main-icon {
    bottom: 0;
}

.expand-btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 1.95rem;
    height: 1.95rem;
    border: 1px solid rgba(148, 163, 184, 0.3);
    background: rgba(15, 23, 42, 0.5);
    color: rgba(226, 232, 240, 0.78);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    transition: all 0.25s ease;
}

.expand-btn:hover {
    border-color: rgba(94, 234, 212, 0.6);
    color: #5eead4;
}

.expand-btn :deep(svg) {
    transition: transform 0.25s ease;
}

.expand-btn :deep(svg.open) {
    transform: rotate(180deg);
}

.wid-card:hover .card-icon { color: rgba(94, 234, 212, 0.8); }

/* ── Mobile ── */
@media (max-width: 900px) {
    .wid-shell {
        grid-template-columns: 1fr;
        gap: 2.5rem;
    }
    .wid-left {
        position: relative;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .wid-title-line {
        font-size: clamp(2.5rem, 10vw, 5rem);
        text-align: center;
    }
    .wid-image-wrap {
        max-width: 360px;
    }
}

@media (max-width: 480px) {
    .wid-section {
        padding: 4rem 1rem;
    }
    .wid-card {
        padding: 1.3rem 1.1rem;
    }
}
</style>
