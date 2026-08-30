<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Link } from '@inertiajs/vue3'
import { ArrowUpRight, BookOpen, MessageCircle, Sparkles, X } from 'lucide-vue-next'
import type { ShowcaseProject } from '@/Data/projects'

const props = defineProps<{
    project: ShowcaseProject | null
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const modalContainer = ref<HTMLElement | null>(null)
const lastFocusedElement = ref<HTMLElement | null>(null)
const imgFailed = ref(false)

const projectTitle = computed(() => {
    if (!props.project) return 'Project Preview'
    return props.project.name || props.project.title || 'Project'
})

const isMobile = computed(() => {
    if (!props.project) return false
    return Boolean(props.project.isMobile || (props.project.type && props.project.type.includes('Mobile')))
})

const projectType = computed(() => {
    if (!props.project) return 'Live Web App'
    if (props.project.type) return props.project.type
    return isMobile.value ? 'Mobile App (iOS/Android)' : 'Live Web App'
})

const metricDisplay = computed(() => {
    if (!props.project) return ''
    if (props.project.metrics && Array.isArray(props.project.metrics) && props.project.metrics.length > 0) {
        return props.project.metrics.join(' · ')
    }
    if (props.project.metricBadge) {
        return props.project.metricBadge
    }
    return ''
})

const imageSrc = computed(() => {
    if (!props.project) return ''
    return props.project.image || props.project.imageUrl || ''
})

const techList = computed(() => {
    if (!props.project) return []
    const list = props.project.tech || props.project.tools || []
    return Array.isArray(list) ? list : []
})

const liveUrl = computed(() => {
    if (!props.project) return null
    return props.project.liveUrl || props.project.externalUrl || null
})

function handleKeyDown(e: KeyboardEvent) {
    if (!props.project) return

    if (e.key === 'Escape') {
        e.preventDefault()
        emit('close')
        return
    }

    // Focus Trap: Tab / Shift+Tab cycling within modal
    if (e.key === 'Tab' && modalContainer.value) {
        const focusableElements = modalContainer.value.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
            if (document.activeElement === firstElement || document.activeElement === modalContainer.value) {
                e.preventDefault()
                lastElement.focus()
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault()
                firstElement.focus()
            }
        }
    }
}

watch(
    () => props.project,
    (newVal) => {
        imgFailed.value = false
        if (newVal) {
            lastFocusedElement.value = document.activeElement as HTMLElement | null
            document.body.style.overflow = 'hidden'
            nextTick(() => {
                modalContainer.value?.focus()
            })
        } else {
            document.body.style.overflow = ''
            if (lastFocusedElement.value) {
                lastFocusedElement.value.focus()
            }
        }
    }
)

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown)
    document.body.style.overflow = ''
})
</script>

<template>
    <Teleport to="body">
        <Transition name="modal-fade">
            <div
                v-if="project"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-project-title"
                class="modal-backdrop"
                @click.self="emit('close')"
            >
                <div
                    ref="modalContainer"
                    tabindex="-1"
                    class="modal-card"
                >
                    <!-- Close button -->
                    <button
                        type="button"
                        class="modal-close-btn"
                        aria-label="Close project preview modal"
                        @click="emit('close')"
                    >
                        <X :size="20" aria-hidden="true" />
                    </button>

                    <!-- Header -->
                    <div class="modal-header">
                        <div class="modal-badge-row">
                            <span
                                class="badge-type"
                                :class="{ 'badge-type--mobile': isMobile }"
                            >
                                <span class="pulse-dot" />
                                {{ projectType }}
                            </span>
                            <span v-if="project.category" class="badge-category">
                                {{ project.category }}
                            </span>
                            <span v-if="metricDisplay" class="badge-metric">
                                ⚡ {{ metricDisplay }}
                            </span>
                        </div>

                        <h2 id="modal-project-title" class="modal-title">
                            {{ projectTitle }}
                        </h2>
                        <p v-if="project.positioning" class="modal-positioning">
                            {{ project.positioning }}
                        </p>
                        <p class="modal-description">
                            {{ project.description }}
                        </p>
                    </div>

                    <!-- 16:9 Image or Placeholder -->
                    <div class="modal-image-wrapper">
                        <img
                            v-if="imageSrc && !imgFailed"
                            :src="imageSrc"
                            :alt="`${projectTitle} production interface preview`"
                            class="modal-image"
                            loading="lazy"
                            @error="imgFailed = true"
                        />
                        <div v-else class="modal-placeholder" aria-hidden="true">
                            <Sparkles :size="28" class="placeholder-icon" />
                            <span class="placeholder-text">{{ projectTitle }}</span>
                        </div>
                        <div class="modal-image-overlay">
                            <span class="modal-image-badge">Production Interface Snapshot</span>
                        </div>
                    </div>

                    <!-- Tech Stack Tags -->
                    <div v-if="techList.length" class="modal-tech-stack">
                        <span
                            v-for="tool in techList"
                            :key="tool"
                            class="modal-tech-tag"
                        >
                            {{ tool }}
                        </span>
                    </div>

                    <!-- Problem & Challenge Section -->
                    <div v-if="project.problem || project.challenge" class="modal-problem-box">
                        <div v-if="project.problem" class="modal-problem-row">
                            <strong class="problem-label">The Problem: </strong>
                            <span>{{ project.problem }}</span>
                        </div>
                        <div v-if="project.challenge" class="modal-problem-row">
                            <strong class="challenge-label">The Engineering Challenge: </strong>
                            <span>{{ project.challenge }}</span>
                        </div>
                    </div>

                    <!-- Architecture Actions -->
                    <div v-if="project.architectureActions && project.architectureActions.length > 0" class="modal-section-block">
                        <h3 class="modal-section-title">Architectural Solutions & Engineering</h3>
                        <ul class="modal-action-list">
                            <li
                                v-for="(action, idx) in project.architectureActions"
                                :key="idx"
                                class="modal-action-item"
                            >
                                <span class="action-bullet" />
                                <span>{{ action }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Business Impact -->
                    <div v-if="project.businessImpact && project.businessImpact.length > 0" class="modal-section-block">
                        <h3 class="modal-section-title impact">Measurable Business Impact</h3>
                        <ul class="modal-impact-list">
                            <li
                                v-for="(impact, idx) in project.businessImpact"
                                :key="idx"
                                class="modal-impact-item"
                            >
                                <span class="impact-check">✓</span>
                                <span>{{ impact }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Action Footer -->
                    <div class="modal-footer">
                        <a
                            v-if="liveUrl"
                            :href="liveUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn-primary"
                        >
                            <span>Visit Live App</span>
                            <ArrowUpRight :size="15" aria-hidden="true" />
                        </a>
                        <a
                            v-else
                            href="#contact"
                            class="btn-primary"
                            @click="emit('close')"
                        >
                            <span>Request Demo</span>
                            <ArrowUpRight :size="15" aria-hidden="true" />
                        </a>

                        <Link
                            v-if="project.caseStudySlug"
                            :href="`/case-studies/${project.caseStudySlug}`"
                            class="btn-secondary"
                            @click="emit('close')"
                        >
                            <BookOpen :size="15" aria-hidden="true" />
                            <span>Read Full Case Study</span>
                        </Link>

                        <a
                            :href="`https://wa.me/919915234506?text=${encodeURIComponent(`Hi Ashish, I saw your ${projectTitle} project on your portfolio and would like to discuss building something similar.`)}`"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn-whatsapp"
                        >
                            <MessageCircle :size="15" aria-hidden="true" />
                            <span>Discuss Architecture</span>
                        </a>

                        <button
                            type="button"
                            class="btn-outline"
                            @click="emit('close')"
                        >
                            Close Preview
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: rgba(4, 7, 13, 0.88);
    backdrop-filter: blur(12px);
    overflow-y: auto;
}

.modal-card {
    position: relative;
    width: 100%;
    max-width: 820px;
    max-height: 90vh;
    overflow-y: auto;
    background: var(--card-bg, #0d1522);
    border: 1px solid rgba(45, 212, 191, 0.3);
    border-radius: 1.5rem;
    padding: 2.25rem;
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.75);
    outline: none;
    color: var(--text-body, #cbd5e1);
}

.modal-card:focus-visible {
    border-color: var(--work-accent, #2dd4bf);
}

.modal-close-btn {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: var(--surface-raised);
    border: 1px solid var(--border);
    color: var(--text-2);
    cursor: pointer;
    transition: all 0.2s ease;
}

.modal-close-btn:hover {
    background: var(--surface);
    color: var(--text-1);
    border-color: var(--accent);
    transform: rotate(90deg);
}

.modal-close-btn:focus-visible {
    outline: 2px solid var(--work-accent, #2dd4bf);
    outline-offset: 2px;
}

/* ── Badges ── */
.modal-badge-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.8rem;
    padding-right: 3rem;
}

.badge-type {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.35);
    color: #34d399;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.badge-type--mobile {
    background: rgba(99, 102, 241, 0.12);
    border-color: rgba(99, 102, 241, 0.35);
    color: #818cf8;
}

.pulse-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: #10b981;
    box-shadow: 0 0 8px #10b981;
    animation: pulse 2s infinite ease-in-out;
}

.badge-type--mobile .pulse-dot {
    background: #818cf8;
    box-shadow: 0 0 8px #818cf8;
}

@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.85); }
}

.badge-category {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: var(--text-muted, #94a3b8);
}

.badge-metric {
    font-size: 0.75rem;
    font-weight: 700;
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.1);
    border: 1px solid rgba(56, 189, 248, 0.25);
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
}

/* ── Typography ── */
.modal-title {
    font-size: 1.85rem;
    font-weight: 800;
    color: var(--text-1, #f8fafc);
    letter-spacing: -0.02em;
    margin: 0.2rem 0;
}

.modal-positioning {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--work-accent, #2dd4bf);
    margin-bottom: 0.6rem;
}

.modal-description {
    font-size: 0.92rem;
    color: var(--text-muted, #94a3b8);
    line-height: 1.6;
    margin-bottom: 1.25rem;
}

/* ── Snapshot / Placeholder ── */
.modal-image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: #020617;
    margin-bottom: 1.25rem;
}

.modal-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
}

.modal-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
    color: rgba(255, 255, 255, 0.4);
    gap: 0.5rem;
}

.placeholder-icon {
    color: var(--work-accent, #2dd4bf);
}

.placeholder-text {
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: -0.02em;
}

.modal-image-overlay {
    position: absolute;
    bottom: 0.75rem;
    left: 0.75rem;
}

.modal-image-badge {
    font-size: 0.72rem;
    font-weight: 700;
    color: #fff;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    padding: 0.3rem 0.8rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

/* ── Tech Stack ── */
.modal-tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-bottom: 1.5rem;
}

.modal-tech-tag {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.3rem 0.75rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-1, #e2e8f0);
}

/* ── Problem & Challenge Box ── */
.modal-problem-box {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 1.1rem 1.25rem;
    border-radius: 0.9rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 0.86rem;
    line-height: 1.55;
    margin-bottom: 1.5rem;
}

.problem-label {
    color: #f87171;
    font-weight: 700;
}

.challenge-label {
    color: #fbbf24;
    font-weight: 700;
}

/* ── Section Blocks ── */
.modal-section-block {
    margin-bottom: 1.5rem;
}

.modal-section-title {
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #38bdf8;
    margin-bottom: 0.75rem;
}

.modal-section-title.impact {
    color: #34d399;
}

.modal-action-list,
.modal-impact-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
}

.modal-action-item,
.modal-impact-item {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    font-size: 0.88rem;
    line-height: 1.5;
    color: var(--text-body, #cbd5e1);
}

.action-bullet {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: #38bdf8;
    margin-top: 0.45rem;
    flex-shrink: 0;
}

.impact-check {
    color: #34d399;
    font-weight: 800;
    flex-shrink: 0;
}

/* ── Action Footer ── */
.modal-footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    padding-top: 1.5rem;
    margin-top: 1rem;
    border-top: 1px solid var(--border);
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 42px;
    padding: 0.6rem 1.25rem;
    border-radius: 999px;
    background: linear-gradient(135deg, #0284c7 0%, #4f46e5 100%);
    color: #fff;
    font-size: 0.82rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(2, 132, 199, 0.35);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(2, 132, 199, 0.5);
}

.btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 42px;
    padding: 0.6rem 1.25rem;
    border-radius: 999px;
    background: var(--surface-raised);
    border: 1px solid var(--border);
    color: var(--text-1);
    font-size: 0.82rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.2s ease;
}

.btn-secondary:hover {
    background: var(--surface);
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
}

.btn-whatsapp {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 42px;
    padding: 0.6rem 1.25rem;
    border-radius: 999px;
    background: rgba(37, 211, 102, 0.12);
    border: 1px solid rgba(37, 211, 102, 0.35);
    color: #16a34a;
    font-size: 0.82rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.2s ease;
}

.btn-whatsapp:hover {
    background: rgba(37, 211, 102, 0.22);
    transform: translateY(-2px);
}

.btn-outline {
    display: inline-flex;
    align-items: center;
    min-height: 42px;
    padding: 0.6rem 1.25rem;
    border-radius: 999px;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-2);
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-left: auto;
}

.btn-outline:hover {
    background: var(--surface-raised);
    color: var(--text-1);
}

.btn-primary:focus-visible,
.btn-secondary:focus-visible,
.btn-whatsapp:focus-visible,
.btn-outline:focus-visible {
    outline: 2px solid var(--work-accent, #2dd4bf);
    outline-offset: 2px;
}

/* ── Modal Transition ── */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active .modal-card {
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-fade-enter-from .modal-card {
    transform: scale(0.94) translateY(10px);
}

@media (prefers-reduced-motion: reduce) {
    .modal-fade-enter-active,
    .modal-fade-leave-active,
    .modal-card,
    .btn-primary,
    .btn-secondary,
    .btn-whatsapp {
        transition: none !important;
        transform: none !important;
    }
}

@media (max-width: 640px) {
    .modal-card {
        padding: 1.5rem;
        border-radius: 1.2rem;
    }
    .modal-title {
        font-size: 1.45rem;
    }
    .modal-footer {
        flex-direction: column;
        align-items: stretch;
    }
    .btn-outline {
        margin-left: 0;
        justify-content: center;
    }
}

/* ── Light Mode Polish ── */
:global([data-theme="light"]) .modal-card {
    background: #ffffff;
    border-color: rgba(15, 23, 42, 0.1);
    box-shadow: 0 24px 60px -10px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.06);
}

:global([data-theme="light"]) .modal-backdrop {
    background: rgba(15, 23, 42, 0.45);
}

:global([data-theme="light"]) .modal-title {
    color: #0f172a !important;
}

:global([data-theme="light"]) .modal-description {
    color: #475569 !important;
}

:global([data-theme="light"]) .modal-positioning {
    color: #0d9488 !important;
}

:global([data-theme="light"]) .preview-box {
    background: #f1f5f9;
    border-color: rgba(15, 23, 42, 0.08);
}

:global([data-theme="light"]) .badge-category {
    background: #f1f5f9;
    border-color: rgba(15, 23, 42, 0.1);
    color: #475569;
}

:global([data-theme="light"]) .badge-metric {
    background: rgba(2, 132, 199, 0.08);
    border-color: rgba(2, 132, 199, 0.25);
    color: #0284c7;
}

:global([data-theme="light"]) .tech-tag {
    background: #f1f5f9;
    border-color: rgba(15, 23, 42, 0.08);
    color: #0f172a;
}

:global([data-theme="light"]) .problem-box {
    background: #f8fafc;
    border-color: rgba(15, 23, 42, 0.1);
}

:global([data-theme="light"]) .modal-action-item,
:global([data-theme="light"]) .modal-impact-item {
    color: #334155 !important;
}

:global([data-theme="light"]) .modal-footer {
    border-top-color: rgba(15, 23, 42, 0.1);
}

:global([data-theme="light"]) .btn-secondary {
    background: #ffffff;
    border-color: rgba(15, 23, 42, 0.15);
    color: #0f172a;
}

:global([data-theme="light"]) .btn-secondary:hover {
    background: #f1f5f9;
    border-color: #0d9488;
    color: #0d9488;
}

:global([data-theme="light"]) .btn-outline {
    border-color: rgba(15, 23, 42, 0.15);
    color: #475569;
}

:global([data-theme="light"]) .btn-outline:hover {
    background: #f1f5f9;
    color: #0f172a;
}

:global([data-theme="light"]) .modal-close-btn {
    background: #f1f5f9;
    border-color: rgba(15, 23, 42, 0.1);
    color: #64748b;
}

:global([data-theme="light"]) .modal-close-btn:hover {
    background: #e2e8f0;
    color: #0f172a;
}
</style>
