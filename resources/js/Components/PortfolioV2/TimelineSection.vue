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

function parseYear(value: string | null | undefined): number | null {
    if (!value) return null

    const text = value.trim()
    if (!text || /^present$/i.test(text)) return null

    const yearMatch = text.match(/\b(19|20)\d{2}\b/)
    if (yearMatch) return Number(yearMatch[0])

    const parsed = Date.parse(text)
    if (!Number.isNaN(parsed)) return new Date(parsed).getUTCFullYear()

    return null
}

function isOngoing(endDate: string | null): boolean {
    return !endDate || endDate.trim().toLowerCase() === 'present'
}

function formatDateRange(exp: Experience): string {
    const start = parseYear(exp.startDate)

    if (isOngoing(exp.endDate)) {
        return start ? `${start}–Present` : 'Present'
    }

    const end = parseYear(exp.endDate)

    if (start === null || end === null) return exp.dateRange

    if (start === end) return String(start)
    return `${start}–${String(end).slice(2)}`
}

onMounted(() => {
    if (!sectionRef.value) return

    const q = gsap.utils.selector(sectionRef.value)

    const titleWords = q('.section-title-word')
    if (titleWords.length) {
        gsap.from(titleWords, {
            scrollTrigger: { trigger: sectionRef.value, start: 'top 92%', once: true },
            y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', clearProps: 'all',
        })
    }

    /* Center line grows */
    const progressEl = q('.center-progress')
    const gridEl = q('.timeline-grid')
    if (progressEl.length && gridEl.length) {
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
    const rows = q('.tl-row')
    if (rows.length && gridEl.length) {
        gsap.from(rows, {
            scrollTrigger: { trigger: gridEl, start: 'top 90%', once: true },
            y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', clearProps: 'all',
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
                <div class="center-line" aria-hidden="true">
                    <div class="center-progress" />
                </div>

                <article
                    v-for="(exp, index) in experiences"
                    :key="`${exp.company}-${index}`"
                    class="tl-row glass-panel"
                >
                    <div class="tl-left">
                        <span class="tl-date">{{ formatDateRange(exp) }}</span>
                        <span v-if="isOngoing(exp.endDate)" class="now-pill glow-pill">CURRENT ROLE</span>
                    </div>

                    <!-- Milestone Node Indicator -->
                    <div class="tl-node" aria-hidden="true">
                        <span class="node-dot" :class="{ 'is-now': isOngoing(exp.endDate) }" />
                    </div>

                    <div class="tl-center">
                        <div class="role-header">
                            <h3 class="tl-role">{{ exp.role }}</h3>
                            <div class="company-badge-wrap">
                                <span class="tl-company">{{ exp.company }}</span>
                                <span v-if="exp.location" class="tl-location">· {{ exp.location }}</span>
                            </div>
                        </div>
                        <ul class="tl-list">
                            <li v-for="(point, i) in exp.highlights.slice(0, 3)" :key="i">
                                <span class="tl-bullet-dot" aria-hidden="true">◆</span>
                                <span>{{ point }}</span>
                            </li>
                        </ul>
                    </div>
                </article>

                <!-- Bottom dot -->
                <div class="bottom-dot" aria-hidden="true" />
            </div>
        </div>
    </section>
</template>

<style scoped>
.timeline-section {
    background: linear-gradient(180deg, var(--section-bg-mid) 0%, var(--bg-secondary) 50%, var(--section-bg-mid) 100%);
    padding: 7.5rem 1.5rem 6rem;
    border-top: 1px solid var(--border);
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
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-left: 2rem;
}

/* ── Progress line ── */
.center-line {
    position: absolute;
    left: 0.75rem;
    top: 1rem;
    bottom: 1rem;
    width: 2px;
    background: var(--border-strong);
    z-index: 0;
}

.center-progress {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, var(--accent) 0%, var(--accent-violet) 50%, #38bdf8 100%);
    box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.5);
    transform-origin: top;
    transform: scaleY(0);
}

.tl-row {
    position: relative;
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 1.8rem;
    align-items: start;
    padding: 1.8rem 2rem;
    border-radius: 1.15rem;
    z-index: 1;
}

.tl-row:hover {
    border-color: rgba(var(--accent-rgb), 0.45);
    box-shadow: var(--shadow-elevation-2);
}

/* Node indicator */
.tl-node {
    position: absolute;
    left: calc(-2rem + 0.75rem - 6px);
    top: 2.2rem;
    width: 14px;
    height: 14px;
    border-radius: 999px;
    background: var(--bg-primary);
    border: 2px solid var(--accent);
    box-shadow: 0 0 12px rgba(94, 234, 212, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
}

.node-dot.is-now {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--accent);
    animation: pulse 2s infinite;
}

/* ── Left column ── */
.tl-left {
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
}

.tl-date {
    font-size: clamp(1.15rem, 2vw, 1.4rem);
    font-weight: 800;
    color: var(--text-1);
    letter-spacing: -0.02em;
    line-height: 1.1;
    white-space: nowrap;
}

.now-pill {
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    font-weight: 800;
    padding: 0.22rem 0.55rem;
}

/* ── Center column ── */
.tl-center {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    min-width: 0;
}

.role-header {
    margin-bottom: 0.85rem;
}

.tl-role {
    font-size: 1.28rem;
    font-weight: 800;
    color: var(--text-1);
    letter-spacing: -0.02em;
    line-height: 1.25;
    margin-bottom: 0.3rem;
}

.company-badge-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.tl-company {
    font-size: 0.95rem;
    color: var(--accent);
    font-weight: 700;
}

.tl-location {
    font-size: 0.82rem;
    color: var(--text-3);
}

.tl-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
}

.tl-list li {
    display: flex;
    align-items: flex-start;
    gap: 0.55rem;
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--text-2);
}

.tl-bullet-dot {
    color: var(--accent-violet);
    font-size: 0.65rem;
    margin-top: 0.2rem;
    flex-shrink: 0;
}

.bottom-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 20px rgba(94, 234, 212, 0.6);
    margin: 1.5rem auto 0;
    position: relative;
    z-index: 2;
}

/* ── Right column ── */
.tl-desc {
    font-size: 0.98rem;
    line-height: 1.7;
    color: var(--text-body);
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
    color: var(--text-body);
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
    background: var(--accent);
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
        color: var(--accent);
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
    .tl-row {
        padding: 1.1rem 0.85rem;
    }
    .tl-role {
        font-size: 1.08rem;
    }
    .tl-date {
        font-size: 1.2rem;
    }
    .tl-list li {
        font-size: 0.84rem;
        line-height: 1.5;
    }
}

@media (max-width: 360px) {
    .timeline-section {
        padding: 2.5rem 0.6rem;
    }
    .tl-row {
        padding: 0.95rem 0.65rem;
    }
    .tl-role {
        font-size: 1rem;
    }
    .company-badge-wrap {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.2rem;
    }
}

/* ── Light Mode Polish ── */
:global([data-theme="light"]) .tl-row {
    background: #ffffff;
    border-color: rgba(15, 23, 42, 0.08);
    box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 0 0 1px rgba(15, 23, 42, 0.04);
}

:global([data-theme="light"]) .tl-row:hover {
    border-color: rgba(13, 148, 136, 0.4);
    box-shadow: 0 16px 36px -6px rgba(15, 23, 42, 0.1), 0 0 24px rgba(13, 148, 136, 0.12);
}

:global([data-theme="light"]) .tl-node {
    background: #ffffff;
    border-color: #0d9488;
    box-shadow: 0 0 10px rgba(13, 148, 136, 0.4);
}

:global([data-theme="light"]) .tl-date {
    color: #0f172a !important;
}

:global([data-theme="light"]) .tl-role {
    color: #0f172a !important;
}

:global([data-theme="light"]) .tl-company {
    color: #0d9488 !important;
}

:global([data-theme="light"]) .tl-location {
    color: #64748b !important;
}

:global([data-theme="light"]) .tl-desc {
    color: #334155 !important;
}

:global([data-theme="light"]) .tl-list li {
    color: #475569 !important;
}

:global([data-theme="light"]) .center-line {
    background: rgba(15, 23, 42, 0.12);
}
</style>
