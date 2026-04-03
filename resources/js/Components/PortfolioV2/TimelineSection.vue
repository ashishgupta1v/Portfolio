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

function formatDateRange(exp: Experience): string {
    if (!exp.endDate || exp.endDate.toLowerCase() === 'present') return 'WORKING'
    const start = new Date(exp.startDate).getFullYear()
    const end = new Date(exp.endDate).getFullYear()
    if (start === end) return String(start)
    return `${start}–${String(end).slice(2)}`
}

onMounted(() => {
    if (!sectionRef.value) return

    const titleWords = sectionRef.value.querySelectorAll('.tl-title-word')
    gsap.from(titleWords, {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' },
        y: 60, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
    })

    /* Center line grows */
    const progressEl = sectionRef.value.querySelector('.center-progress')
    const gridEl = sectionRef.value.querySelector('.timeline-grid')
    if (progressEl && gridEl) {
        gsap.to(progressEl, {
            scrollTrigger: {
                trigger: gridEl,
                start: 'top 70%',
                end: 'bottom 40%',
                scrub: 1,
            },
            scaleY: 1,
        })
    }

    /* Row stagger */
    const rows = sectionRef.value.querySelectorAll('.tl-row')
    if (rows.length && gridEl) {
        gsap.from(rows, {
            scrollTrigger: { trigger: gridEl, start: 'top 72%' },
            y: 40, opacity: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out',
        })
    }
})
</script>

<template>
    <section ref="sectionRef" id="career" class="timeline-section">
        <div class="tl-shell">
            <!-- Big heading -->
            <div class="section-header">
                <div class="section-header-wrapper">
                    <h2 class="section-title">
                        <span class="section-title-word">My career &</span>
                        <span class="section-title-word accent">experience</span>
                    </h2>
                </div>
                <div class="section-separator" />
            </div>
            <!-- Timeline grid -->
            <div class="timeline-grid">
                <!-- Center progress line -->
                <div class="center-line">
                    <div class="center-progress" />
                </div>

                <article
                    v-for="(exp, index) in experiences"
                    :key="`${exp.company}-${index}`"
                    class="tl-row"
                >
                    <div class="tl-left">
                        <span class="tl-date">{{ formatDateRange(exp) }}</span>
                        <span v-if="!exp.endDate" class="now-pill">NOW</span>
                    </div>

                    <div class="tl-center">
                        <h3 class="tl-role">{{ exp.role }}</h3>
                        <p class="tl-company">{{ exp.company }} <span v-if="exp.location" class="tl-location">· {{ exp.location }}</span></p>
                        <ul class="tl-list">
                            <li v-for="(point, i) in exp.highlights.slice(0, 3)" :key="i">{{ point }}</li>
                        </ul>
                    </div>
                </article>

                <!-- Bottom dot -->
                <div class="bottom-dot" />
            </div>
        </div>
    </section>
</template>

<style scoped>
.timeline-section {
    background: linear-gradient(180deg, #0b1118 0%, #0d1521 50%, #0b1118 100%);
    padding: 7rem 1.5rem 5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
}

.tl-shell {
    max-width: 1100px;
    margin: 0 auto;
}

/* ── Timeline Grid ── */
.timeline-grid {
    position: relative;
    display: grid;
    gap: 0;
}

.tl-row {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 1.25rem;
    align-items: start;
    padding: 1.65rem 0;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.tl-row:first-of-type {
    border-top: 1px solid rgba(148, 163, 184, 0.06);
}

/* ── Left column ── */
.tl-left {
    text-align: left;
    padding-right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.45rem;
}

.tl-role {
    font-size: 1.35rem;
    font-weight: 800;
    color: #f8fafc;
    letter-spacing: -0.01em;
    line-height: 1.25;
    margin-bottom: 0.35rem;
}

.tl-company {
    font-size: 1rem;
    color: #5eead4;
    font-weight: 600;
    margin-bottom: 0.55rem;
}

.tl-location {
    font-size: 0.82rem;
    color: rgba(226, 232, 240, 0.55);
}

/* ── Center column ── */
.tl-center {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    min-width: 0;
    padding-left: 1.25rem;
}

.tl-date {
    font-size: clamp(1.15rem, 2.2vw, 1.5rem);
    font-weight: 800;
    color: rgba(226, 232, 240, 0.9);
    letter-spacing: -0.02em;
    line-height: 1;
    white-space: nowrap;
}

.now-pill {
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #0b1118;
    background: #5eead4;
    font-weight: 800;
    padding: 0.22rem 0.45rem;
    border-radius: 999px;
}

/* ── Center progress line ── */
.center-line {
    position: absolute;
    left: 150px;
    top: 0;
    bottom: 0;
    width: 2px;
    transform: translateX(0);
    background: rgba(148, 163, 184, 0.1);
    z-index: 0;
}

.center-progress {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #5eead4, #93c5fd);
    transform-origin: top;
    transform: scaleY(0);
}

.bottom-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: #5eead4;
    box-shadow: 0 0 20px rgba(94, 234, 212, 0.6);
    margin: 1.5rem auto 0;
    position: relative;
    z-index: 2;
}

/* ── Right column ── */
.tl-desc {
    font-size: 0.98rem;
    line-height: 1.7;
    color: rgba(226, 232, 240, 0.82);
    font-weight: 400;
    max-width: 100%;
}

.tl-list {
    list-style: none;
    display: grid;
    gap: 0.45rem;
    padding: 0;
    margin: 0;
}

.tl-list li {
    position: relative;
    padding-left: 1rem;
    color: rgba(226, 232, 240, 0.82);
    line-height: 1.65;
    font-size: 0.95rem;
}

.tl-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.6em;
    width: 0.38rem;
    height: 0.38rem;
    border-radius: 50%;
    background: rgba(94, 234, 212, 0.75);
}

/* ── Mobile ── */
@media (max-width: 768px) {
    .timeline-section {
        padding: 4rem 1rem;
    }

    .tl-heading {
        margin-bottom: 2.5rem;
    }

    .tl-row {
        grid-template-columns: 1fr;
        gap: 0.6rem;
        padding: 1.2rem 0;
        text-align: left;
    }

    .tl-left {
        text-align: left;
        padding-right: 0;
    }

    .tl-center {
        justify-content: flex-start;
        padding-left: 0;
    }

    .tl-date {
        font-size: 1.4rem;
        color: rgba(94, 234, 212, 0.6);
    }

    .center-line {
        display: none;
    }

    .bottom-dot {
        display: none;
    }
}

@media (max-width: 480px) {
    .timeline-section {
        padding: 3rem 0.8rem;
    }
    .tl-role {
        font-size: 1.1rem;
    }
}
</style>
