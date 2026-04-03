<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Service } from '@/types/portfolio'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Layers, Code, Brain, Cpu, Zap, Globe } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{
    services: Service[]
}>()

const iconMap: Record<string, any> = {
    layers: Layers,
    code: Code,
    brain: Brain,
    cpu: Cpu,
    zap: Zap,
    globe: Globe,
}

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

            <!-- Right side: service cards -->
            <div class="wid-cards">
                <article
                    v-for="(svc, i) in services"
                    :key="svc.title"
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
                        <h3 class="card-title">{{ svc.title }}</h3>
                        <p class="card-sub">{{ svc.description }}</p>

                        <div class="card-icon">
                            <component :is="iconMap[svc.icon ?? 'code']" :size="20" />
                        </div>
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

.wid-card:hover .card-sub,
.wid-card.active .card-sub {
    color: rgba(226, 232, 240, 0.75);
}

.card-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    color: rgba(94, 234, 212, 0.35);
    transition: color 0.3s ease;
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
