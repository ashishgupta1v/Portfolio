<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Experience } from '@/types/portfolio'
import { useGsap } from '@/Composables/useGsap'

const props = defineProps<{
    experiences: Experience[]
}>()

const { gsap, ScrollTrigger, splitTextReveal } = useGsap()
const timelineRef = ref<HTMLElement | null>(null)

onMounted(() => {
    splitTextReveal('.career-company', '.career-section')

    // Timeline line grow animation
    gsap.to('.timeline-progress', {
        scrollTrigger: {
            trigger: '.career-section',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
        },
        scaleY: 1,
        duration: 1,
    })

    // Staggered entry info
    gsap.from('.career-item', {
        scrollTrigger: {
            trigger: '.career-section',
            start: 'top 60%',
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
    })
})
</script>

<template>
    <section class="career-section">
        <div class="section-container">
            <div class="career-grid">
                <div class="career-label">
                    <span class="section-label">CAREER</span>
                </div>

                <div class="career-timeline" ref="timelineRef">
                    <!-- Timeline line -->
                    <div class="timeline-line">
                        <div class="timeline-progress" />
                    </div>

                    <!-- Career items -->
                    <div
                        v-for="(exp, index) in experiences"
                        :key="exp.company"
                        class="career-item"
                    >
                        <div class="timeline-dot" />

                        <div class="career-content">
                            <div class="career-header">
                                <h3 class="career-company">{{ exp.company }}</h3>
                                <span class="career-date">{{ exp.dateRange }}</span>
                            </div>
                            <p class="career-role">{{ exp.role }}</p>
                            <span class="career-location">{{ exp.location }}</span>

                            <ul class="career-highlights">
                                <li
                                    v-for="(highlight, i) in exp.highlights"
                                    :key="i"
                                    class="career-highlight"
                                >
                                    {{ highlight }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.career-section {
    padding: 8rem 0;
}

.career-grid {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 4rem;
}

.section-label {
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 500;
    position: sticky;
    top: 8rem;
}

.career-timeline {
    position: relative;
    padding-left: 3rem;
}

.timeline-line {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(94, 234, 212, 0.1);
}

.timeline-progress {
    width: 100%;
    height: 100%;
    background: var(--accent);
    transform-origin: top;
    transform: scaleY(0);
}

.career-item {
    position: relative;
    margin-bottom: 4rem;
}

.career-item:last-child {
    margin-bottom: 0;
}

.timeline-dot {
    position: absolute;
    left: -3rem;
    top: 0.5rem;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--bg-primary);
    border: 2px solid var(--accent);
    transform: translateX(-50%);
    z-index: 1;
}

.career-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.25rem;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.career-company {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
}

.career-date {
    font-size: 0.8rem;
    color: var(--accent);
    letter-spacing: 0.05em;
    white-space: nowrap;
}

.career-role {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 400;
    margin-bottom: 0.25rem;
}

.career-location {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.35);
    letter-spacing: 0.05em;
}

.career-highlights {
    margin-top: 1.25rem;
    list-style: none;
    padding: 0;
}

.career-highlight {
    font-size: 0.85rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0.5rem;
    padding-left: 1rem;
    position: relative;
}

.career-highlight::before {
    content: '○';
    position: absolute;
    left: 0;
    color: rgba(94, 234, 212, 0.4);
    font-size: 0.6rem;
    top: 0.15rem;
}

@media (max-width: 1024px) {
    .career-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
}
</style>
