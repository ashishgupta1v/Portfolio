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
    },
    {
        icon: Brain,
        title: 'Semantic Intelligence (AI/RAG)',
        description: 'I build intent-aware search and RAG systems that transform generic content into adaptive, meaningful product experiences.',
    },
    {
        icon: Gauge,
        title: 'High-Performance Infrastructure',
        description: 'I optimize throughput, latency, and observability with event-driven architecture, Redis-first patterns, and production resilience.',
    },
    {
        icon: Trophy,
        title: 'Gamification and Retention Systems',
        description: 'I design transformation engines that convert passive consumption into action through smart loops and behavior-aware systems.',
    },
]

onMounted(() => {
    if (!sectionRef.value) return

    gsap.from('.combo-eyebrow', {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' },
        y: 20, opacity: 0, duration: 0.65, ease: 'power3.out',
    })

    gsap.from('.combo-heading-line', {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 78%' },
        y: 48, opacity: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out',
    })

    gsap.from('.combo-para', {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 72%' },
        y: 32, opacity: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out',
    })

    gsap.from('.combo-card', {
        scrollTrigger: { trigger: '.combo-cards', start: 'top 78%' },
        y: 44, opacity: 0, duration: 0.72, stagger: 0.12, ease: 'power3.out',
    })
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
                    I bridge complex business requirements and elite-tier engineering by building high-concurrency ecosystems
                    focused on domain integrity, performance, and measurable outcomes.
                </p>
            </div>

            <div class="combo-cards glass">
                <article
                    v-for="(item, i) in capabilities"
                    :key="item.title"
                    class="combo-card"
                    :class="{ active: activeCard === i }"
                    @mouseenter="activeCard = i"
                    @click="activeCard = activeCard === i ? null : i"
                >
                    <div class="card-icon"><component :is="item.icon" :size="18" /></div>
                    <h3 class="card-title">{{ i + 1 }}. {{ item.title }}</h3>
                    <p class="card-text">{{ item.description }}</p>
                    <button class="expand-btn" type="button" aria-label="Expand">
                        <ChevronDown :size="15" :class="{ open: activeCard === i }" />
                    </button>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.combo-section {
    position: relative;
    background: linear-gradient(180deg, #090e14 0%, #0c1521 55%, #0b1118 100%);
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
    background: linear-gradient(135deg, rgba(9, 14, 20, 0.75), rgba(15, 23, 42, 0.52));
    border: 1px solid rgba(148, 163, 184, 0.18);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
}

.combo-intro {
    padding: 2rem 2.1rem;
}

.combo-eyebrow {
    color: rgba(94, 234, 212, 0.92);
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
    color: #e2e8f0;
    font-style: normal;
    font-weight: 800;
}

.combo-heading-line.accent {
    color: #5eead4;
}

.combo-primary {
    color: rgba(226, 232, 240, 0.9);
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
    border: 1px dashed rgba(148, 163, 184, 0.32);
    border-radius: 0.75rem;
    padding: 1rem 1rem 1rem 0.95rem;
    transition: border-color 0.28s ease, background-color 0.28s ease;
}

.combo-card.active,
.combo-card:hover {
    border-color: rgba(94, 234, 212, 0.55);
    background: rgba(94, 234, 212, 0.04);
}

.card-icon {
    color: rgba(94, 234, 212, 0.72);
    margin-bottom: 0.55rem;
}

.card-title {
    font-size: 1.02rem;
    color: #f8fafc;
    letter-spacing: -0.01em;
    margin-bottom: 0.4rem;
}

.card-text {
    font-size: 0.86rem;
    line-height: 1.6;
    color: rgba(226, 232, 240, 0.62);
    padding-right: 2rem;
}

.expand-btn {
    position: absolute;
    top: 0.65rem;
    right: 0.65rem;
    width: 1.7rem;
    height: 1.7rem;
    border: 1px solid rgba(148, 163, 184, 0.32);
    background: rgba(15, 23, 42, 0.5);
    color: rgba(226, 232, 240, 0.75);
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
