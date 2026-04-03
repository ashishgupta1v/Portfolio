<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Experience } from '@/types/portfolio'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps<{
    experiences: Experience[]
}>()

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
    if (!sectionRef.value) return

    /* Heading reveal */
    gsap.from('.tl-eyebrow', {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' },
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
    })
    gsap.from('.tl-title', {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 78%' },
        y: 30, opacity: 0, duration: 0.8, delay: 0.1, ease: 'power3.out',
    })

    /* Timeline progress line grows as you scroll */
    gsap.to('.timeline-progress', {
        scrollTrigger: {
            trigger: '.timeline-column',
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 1,
        },
        scaleY: 1,
    })

    /* Items stagger in */
    gsap.from('.timeline-item', {
        scrollTrigger: { trigger: '.timeline-column', start: 'top 72%' },
        x: -30, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
    })

    /* Dots glow pulse */
    gsap.to('.dot', {
        boxShadow: '0 0 24px rgba(94,234,212,0.8)',
        duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut',
    })
})
</script>

<template>
    <section ref="sectionRef" id="career" class="timeline-section">
        <div class="section-shell">
            <div class="heading-wrap">
                <p class="tl-eyebrow eyebrow">Career</p>
                <h2 class="tl-title title">Timeline</h2>
            </div>

            <div class="timeline-column">
                <div class="timeline-line">
                    <div class="timeline-progress" />
                </div>
                <article v-for="(item, index) in experiences" :key="`${item.company}-${index}`" class="timeline-item">
                    <div class="dot" />
                    <p class="period">{{ item.dateRange }}</p>
                    <h3 class="company">{{ item.company }}</h3>
                    <p class="role">{{ item.role }} · {{ item.location }}</p>
                    <ul class="highlights">
                        <li v-for="(point, pIndex) in item.highlights.slice(0, 3)" :key="`${index}-${pIndex}`">{{ point }}</li>
                    </ul>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.timeline-section {
    background: linear-gradient(180deg, #0b1118 0%, #0d1521 100%);
    padding: 6rem 1.2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.section-shell {
    max-width: 1100px;
    margin: 0 auto;
}

.heading-wrap {
    text-align: center;
    margin-bottom: 3.6rem;
}

.eyebrow {
    color: rgba(94, 234, 212, 0.9);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 0.74rem;
    margin-bottom: 0.8rem;
}

.title {
    color: #f8fafc;
    font-size: clamp(2rem, 6vw, 4.7rem);
    letter-spacing: -0.03em;
    line-height: 0.95;
}

.timeline-column {
    position: relative;
    margin-left: 0.8rem;
    padding-left: 2rem;
    display: grid;
    gap: 2rem;
}

.timeline-line {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(148, 163, 184, 0.15);
}

.timeline-progress {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #5eead4, #93c5fd);
    transform-origin: top;
    transform: scaleY(0);
}

.timeline-item {
    position: relative;
    background: rgba(15, 23, 42, 0.45);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 1rem;
    padding: 1.3rem 1.2rem;
    backdrop-filter: blur(10px);
}

.dot {
    position: absolute;
    left: -2.5rem;
    top: 1.2rem;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background: #5eead4;
    box-shadow: 0 0 18px rgba(94, 234, 212, 0.5);
}

.period {
    color: #93c5fd;
    font-size: 0.72rem;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    margin-bottom: 0.45rem;
}

.company {
    color: #e2e8f0;
    font-size: 1.5rem;
    margin-bottom: 0.2rem;
}

.role {
    color: rgba(226, 232, 240, 0.72);
    margin-bottom: 0.85rem;
}

.highlights {
    margin: 0;
    padding-left: 1rem;
    display: grid;
    gap: 0.42rem;
    color: rgba(226, 232, 240, 0.85);
    line-height: 1.55;
}

@media (max-width: 768px) {
    .timeline-section {
        padding: 3.5rem 1rem;
    }
    .heading-wrap {
        margin-bottom: 2.4rem;
    }
    .timeline-column {
        margin-left: 0.4rem;
        padding-left: 1.4rem;
        gap: 1.4rem;
    }
    .company {
        font-size: 1.2rem;
    }
    .dot {
        left: -1.85rem;
        width: 0.55rem;
        height: 0.55rem;
    }
}

@media (max-width: 480px) {
    .timeline-section {
        padding: 2.5rem 0.8rem;
    }
    .timeline-item {
        padding: 1rem;
    }
}
</style>
