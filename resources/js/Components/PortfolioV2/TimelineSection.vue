<script setup lang="ts">
import type { Experience } from '@/types/portfolio'

defineProps<{
    experiences: Experience[]
}>()
</script>

<template>
    <section class="timeline-section">
        <div class="section-shell">
            <div class="heading-wrap">
                <p class="eyebrow">Career</p>
                <h2 class="title">Timeline</h2>
            </div>

            <div class="timeline-column">
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
    border-left: 1px solid rgba(148, 163, 184, 0.35);
    display: grid;
    gap: 2rem;
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
