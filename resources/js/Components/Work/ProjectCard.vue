<script setup lang="ts">
import { computed, ref } from 'vue'
import { Link } from '@inertiajs/vue3'
import { ArrowUpRight, BookOpen, Eye, Sparkles } from 'lucide-vue-next'
import type { ShowcaseProject } from '@/Data/projects'

const props = defineProps<{
    project: ShowcaseProject
}>()

const emit = defineEmits<{
    (e: 'quick-view', project: ShowcaseProject): void
}>()

const imgFailed = ref(false)

const showImage = computed(() => {
    const src = props.project.image || props.project.imageUrl
    return !!src && !imgFailed.value
})

const imageSrc = computed(() => {
    return props.project.image || props.project.imageUrl || ''
})

const monogram = computed(() => {
    const words = (props.project.name || props.project.title || '').trim().split(/\s+/)
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
    return (words[0][0] + words[1][0]).toUpperCase()
})

const metricDisplay = computed(() => {
    if (props.project.metrics && props.project.metrics.length > 0) {
        return props.project.metrics.join(' · ')
    }
    return ''
})

const caseStudyUrl = computed(() => {
    if (props.project.caseStudySlug) {
        return `/case-studies/${props.project.caseStudySlug}`
    }
    return null
})

const liveUrl = computed(() => {
    return props.project.liveUrl || props.project.externalUrl || null
})

function onImageError() {
    imgFailed.value = true
}

function handleQuickView() {
    emit('quick-view', props.project)
}
</script>

<template>
    <article class="work-card">
        <!-- Badges Row -->
        <div class="card-badges">
            <span
                class="badge-type"
                :class="{ 'badge-type--mobile': project.isMobile || project.type.includes('Mobile') }"
            >
                <span class="pulse-dot" />
                {{ project.type }}
            </span>
            <span class="badge-category">
                {{ project.category }}
            </span>
        </div>

        <!-- Positioning Line -->
        <p v-if="project.positioning" class="card-positioning">
            {{ project.positioning }}
        </p>

        <!-- Title -->
        <h3 class="card-title">
            {{ project.name || project.title }}
        </h3>

        <!-- Metric Highlight Strip -->
        <div v-if="metricDisplay" class="card-metric-strip">
            <span class="metric-spark">⚡</span>
            <span>{{ metricDisplay }}</span>
        </div>

        <!-- 16:9 Image Preview OR Branded Placeholder -->
        <div class="preview-container">
            <button
                type="button"
                class="preview-trigger"
                :aria-label="`Open a quick preview of ${project.name || project.title}`"
                @click="handleQuickView"
            >
                <!-- Real Image -->
                <img
                    v-if="showImage"
                    :src="imageSrc"
                    :alt="`${project.name || project.title} live interface preview`"
                    class="preview-image"
                    loading="lazy"
                    decoding="async"
                    @error="onImageError"
                />

                <!-- Branded Monogram Placeholder (when image missing/failed) -->
                <div v-else class="preview-placeholder" aria-hidden="true">
                    <div class="placeholder-glow" />
                    <div class="placeholder-monogram">{{ monogram }}</div>
                    <div class="placeholder-footer">
                        <Sparkles :size="12" />
                        <span>{{ project.name || project.title }}</span>
                    </div>
                </div>

                <!-- Hover Overlay -->
                <div class="preview-overlay">
                    <span class="overlay-badge">
                        {{ showImage ? 'Live UI Snapshot' : 'Architecture Preview' }}
                    </span>
                    <span class="overlay-cta">Click to Expand ↗</span>
                </div>
            </button>
        </div>

        <!-- Description -->
        <p class="card-description">
            {{ project.description }}
        </p>

        <!-- Tech Chips -->
        <div class="card-tech-chips">
            <span
                v-for="tech in (project.tech || project.tools || []).slice(0, 5)"
                :key="tech"
                class="tech-chip"
            >
                {{ tech }}
            </span>
        </div>

        <!-- Solution & Impact Lines -->
        <div class="card-outcomes">
            <div v-if="project.solution" class="outcome-row outcome-row--solution">
                <span class="outcome-label">Solution:</span>
                <span class="outcome-text">{{ project.solution }}</span>
            </div>
            <div v-if="project.impact" class="outcome-row outcome-row--impact">
                <span class="outcome-label">Impact:</span>
                <span class="outcome-text">{{ project.impact }}</span>
            </div>
        </div>

        <!-- Card Actions (Pinned to Bottom) -->
        <div class="card-actions">
            <!-- 1. Live Link OR Request Demo -->
            <a
                v-if="liveUrl"
                :href="liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-action btn-action--primary"
            >
                <span>Visit Live</span>
                <ArrowUpRight :size="13" aria-hidden="true" />
            </a>
            <a
                v-else
                href="#contact"
                class="btn-action btn-action--demo"
            >
                <span>Request Demo</span>
                <ArrowUpRight :size="13" aria-hidden="true" />
            </a>

            <!-- 2. Quick View Button -->
            <button
                type="button"
                class="btn-action btn-action--quickview"
                @click="handleQuickView"
            >
                <Eye :size="13" aria-hidden="true" />
                <span>Quick View</span>
            </button>

            <!-- 3. Case Study Link (Only rendered when caseStudySlug exists) -->
            <Link
                v-if="caseStudyUrl"
                :href="caseStudyUrl"
                class="btn-action btn-action--casestudy"
            >
                <BookOpen :size="13" aria-hidden="true" />
                <span>Case Study</span>
            </Link>
        </div>
    </article>
</template>

<style scoped>
.work-card {
    --card-accent: var(--work-accent, #2dd4bf);
    --card-bg-color: var(--work-card, #0f1621);
    --card-border-color: var(--work-border, rgba(255, 255, 255, 0.08));

    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--card-bg-color);
    border: 1px solid var(--card-border-color);
    border-radius: 1.25rem;
    padding: 1.5rem;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                border-color 0.3s ease,
                box-shadow 0.3s ease;
}

.work-card:hover {
    transform: translateY(-4px);
    border-color: rgba(45, 212, 191, 0.4);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35),
                0 0 25px rgba(45, 212, 191, 0.1);
}

/* ── Badges ── */
.card-badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
}

.badge-type {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #34d399;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.badge-type--mobile {
    background: rgba(99, 102, 241, 0.12);
    border-color: rgba(99, 102, 241, 0.3);
    color: #818cf8;
}

.pulse-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: #10b981;
    box-shadow: 0 0 6px #10b981;
    animation: pulse 2s infinite ease-in-out;
}

.badge-type--mobile .pulse-dot {
    background: #818cf8;
    box-shadow: 0 0 6px #818cf8;
}

@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.35; transform: scale(0.85); }
}

.badge-category {
    font-size: 0.68rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-muted, #94a3b8);
}

/* ── Positioning & Title ── */
.card-positioning {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--card-accent);
    margin-bottom: 0.25rem;
    line-height: 1.35;
}

.card-title {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--text-1, #f8fafc);
    letter-spacing: -0.02em;
    margin: 0 0 0.65rem;
    line-height: 1.25;
}

/* ── Metric Strip ── */
.card-metric-strip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.73rem;
    font-weight: 700;
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.08);
    border: 1px solid rgba(56, 189, 248, 0.2);
    border-radius: 0.5rem;
    padding: 0.3rem 0.7rem;
    margin-bottom: 0.9rem;
    align-self: flex-start;
    line-height: 1.3;
}

.metric-spark {
    color: #fbbf24;
}

/* ── 16:9 Preview Container ── */
.preview-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 0.85rem;
    overflow: hidden;
    background: #060a12;
    border: 1px solid rgba(255, 255, 255, 0.08);
    margin-bottom: 1rem;
}

.preview-trigger {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    position: relative;
    display: block;
    text-align: left;
    outline: none;
}

.preview-trigger:focus-visible {
    outline: 2px solid var(--card-accent);
    outline-offset: 2px;
}

.preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.preview-trigger:hover .preview-image {
    transform: scale(1.05);
}

/* ── Branded Placeholder ── */
.preview-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0b1320 0%, #030712 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.placeholder-glow {
    position: absolute;
    width: 180px;
    height: 180px;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(45, 212, 191, 0.18) 0%, transparent 70%);
    pointer-events: none;
}

.placeholder-monogram {
    font-size: 2.8rem;
    font-weight: 900;
    letter-spacing: -0.04em;
    color: rgba(255, 255, 255, 0.15);
    z-index: 1;
    transition: color 0.3s ease, transform 0.3s ease;
}

.preview-trigger:hover .placeholder-monogram {
    color: rgba(45, 212, 191, 0.4);
    transform: scale(1.08);
}

.placeholder-footer {
    position: absolute;
    bottom: 0.6rem;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.68rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.4);
    z-index: 1;
}

/* ── Hover Overlay ── */
.preview-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.15) 50%, transparent 100%);
    opacity: 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0.75rem;
    transition: opacity 0.25s ease;
}

.preview-trigger:hover .preview-overlay {
    opacity: 1;
}

.overlay-badge {
    font-size: 0.68rem;
    font-weight: 700;
    color: #fff;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(6px);
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.15);
}

.overlay-cta {
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--card-accent);
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(6px);
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    border: 1px solid rgba(45, 212, 191, 0.3);
}

/* ── Description ── */
.card-description {
    font-size: 0.86rem;
    color: var(--text-muted, #94a3b8);
    line-height: 1.55;
    margin-bottom: 0.9rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* ── Tech Chips ── */
.card-tech-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-bottom: 1rem;
}

.tech-chip {
    font-size: 0.68rem;
    font-weight: 600;
    padding: 0.2rem 0.5rem;
    border-radius: 0.35rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.07);
    color: var(--text-1, #e2e8f0);
}

/* ── Outcomes (Solution & Impact) ── */
.card-outcomes {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    margin-bottom: 1.25rem;
    margin-top: auto;
}

.outcome-row {
    font-size: 0.78rem;
    line-height: 1.45;
    padding-left: 0.65rem;
    border-left: 2px solid rgba(255, 255, 255, 0.12);
}

.outcome-row--solution {
    border-left-color: rgba(56, 189, 248, 0.5);
}

.outcome-row--impact {
    border-left-color: var(--card-accent);
}

.outcome-label {
    font-weight: 700;
    margin-right: 0.35rem;
}

.outcome-row--solution .outcome-label {
    color: #38bdf8;
}

.outcome-row--impact .outcome-label {
    color: var(--card-accent);
}

.outcome-text {
    color: var(--text-body, #cbd5e1);
}

/* ── Actions ── */
.card-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.btn-action {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    min-height: 36px;
    padding: 0.4rem 0.85rem;
    border-radius: 999px;
    font-size: 0.74rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;
}

.btn-action:focus-visible {
    outline: 2px solid var(--card-accent);
    outline-offset: 2px;
}

.btn-action--primary {
    background: linear-gradient(135deg, #0284c7 0%, #4f46e5 100%);
    color: #fff;
    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
}

.btn-action--primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(2, 132, 199, 0.45);
}

.btn-action--demo {
    background: rgba(99, 102, 241, 0.15);
    border-color: rgba(99, 102, 241, 0.35);
    color: #a5b4fc;
}

.btn-action--demo:hover {
    background: rgba(99, 102, 241, 0.25);
    color: #fff;
    transform: translateY(-2px);
}

.btn-action--quickview {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
    color: var(--text-body, #e2e8f0);
}

.btn-action--quickview:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.25);
    color: #fff;
    transform: translateY(-2px);
}

.btn-action--casestudy {
    background: transparent;
    border-color: rgba(45, 212, 191, 0.3);
    color: var(--card-accent);
    margin-left: auto;
}

.btn-action--casestudy:hover {
    background: rgba(45, 212, 191, 0.1);
    border-color: var(--card-accent);
    transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
    .work-card,
    .btn-action,
    .preview-image,
    .placeholder-monogram,
    .pulse-dot {
        animation: none !important;
        transition: none !important;
        transform: none !important;
    }
}

@media (max-width: 480px) {
    .card-actions {
        flex-direction: column;
        align-items: stretch;
    }
    .btn-action--casestudy {
        margin-left: 0;
        justify-content: center;
    }
    .btn-action--primary,
    .btn-action--demo,
    .btn-action--quickview {
        justify-content: center;
    }
}
</style>
