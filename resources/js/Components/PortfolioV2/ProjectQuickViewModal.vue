<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Link } from '@inertiajs/vue3'
import { ArrowUpRight, BookOpen, Mail, X } from 'lucide-vue-next'
import type { Project } from '@/types/portfolio'

const props = defineProps<{
    project: Project | null
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const modalContainer = ref<HTMLElement | null>(null)

function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && props.project) {
        emit('close')
    }
}

watch(
    () => props.project,
    (newVal) => {
        if (newVal) {
            document.body.style.overflow = 'hidden'
            setTimeout(() => {
                modalContainer.value?.focus()
            }, 60)
        } else {
            document.body.style.overflow = ''
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
                        <X :size="20" />
                    </button>

                    <!-- Header -->
                    <div class="modal-header">
                        <div class="modal-badge-row">
                            <span v-if="!project.isMobile" class="badge-live">
                                <span class="pulse-dot" />
                                Live Web App
                            </span>
                            <span v-else class="badge-mobile">
                                <span class="pulse-dot mobile" />
                                Mobile App (Android / SQLite)
                            </span>
                            <span v-if="project.category" class="badge-category">
                                {{ project.category }}
                            </span>
                            <span v-if="project.metricBadge" class="badge-metric">
                                ⚡ {{ project.metricBadge }}
                            </span>
                        </div>

                        <h2 id="modal-project-title" class="modal-title">
                            {{ project.title }}
                        </h2>
                        <p v-if="project.positioning" class="modal-positioning">
                            {{ project.positioning }}
                        </p>
                        <p class="modal-description">
                            {{ project.description }}
                        </p>
                    </div>

                    <!-- Live Snapshot Image Preview -->
                    <div v-if="project.imageUrl" class="modal-image-wrapper">
                        <img
                            :src="project.imageUrl"
                            :alt="`${project.title} interface snapshot`"
                            class="modal-image"
                            loading="lazy"
                        />
                        <div class="modal-image-overlay">
                            <span class="modal-image-badge">Production Interface Snapshot</span>
                        </div>
                    </div>

                    <!-- Tech Stack Tags -->
                    <div class="modal-tech-stack">
                        <span
                            v-for="tool in project.tools"
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
                            v-if="project.externalUrl"
                            :href="project.externalUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn-primary"
                        >
                            <span>Visit Live App</span>
                            <ArrowUpRight :size="15" />
                        </a>

                        <Link
                            v-if="project.caseStudySlug"
                            :href="`/case-studies/${project.caseStudySlug}`"
                            class="btn-secondary"
                            @click="emit('close')"
                        >
                            <BookOpen :size="15" />
                            <span>Read Full Case Study</span>
                        </Link>

                        <a
                            href="mailto:ashishgupta1v@gmail.com"
                            class="btn-email"
                        >
                            <Mail :size="15" />
                            <span>Discuss Role</span>
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
    background: rgba(4, 7, 13, 0.85);
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
    border: 1px solid rgba(var(--accent-rgb), 0.25);
    border-radius: 1.5rem;
    padding: 2.25rem;
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.7);
    outline: none;
    color: var(--text-body, #cbd5e1);
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
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: var(--text-muted, #94a3b8);
    cursor: pointer;
    transition: all 0.2s ease;
}

.modal-close-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    transform: rotate(90deg);
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

.badge-live {
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

.badge-mobile {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: rgba(99, 102, 241, 0.12);
    border: 1px solid rgba(99, 102, 241, 0.35);
    color: #818cf8;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.pulse-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: #10b981;
    box-shadow: 0 0 8px #10b981;
    animation: pulse 2s infinite ease-in-out;
}

.pulse-dot.mobile {
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
    color: var(--accent, #60a5fa);
    margin-bottom: 0.6rem;
}

.modal-description {
    font-size: 0.92rem;
    color: var(--text-muted, #94a3b8);
    line-height: 1.6;
    margin-bottom: 1.25rem;
}

/* ── Snapshot ── */
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
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 42px;
    padding: 0.6rem 1.25rem;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--accent, #3b82f6), #6366f1);
    color: #fff;
    font-size: 0.82rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.35);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
}

.btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 42px;
    padding: 0.6rem 1.25rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 0.82rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.2s ease;
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.16);
    border-color: rgba(255, 255, 255, 0.35);
    transform: translateY(-2px);
}

.btn-email {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 42px;
    padding: 0.6rem 1.25rem;
    border-radius: 999px;
    background: rgba(var(--accent-rgb), 0.12);
    border: 1px solid rgba(var(--accent-rgb), 0.4);
    color: var(--accent);
    font-size: 0.82rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.2s ease;
}

.btn-email:hover {
    background: rgba(var(--accent-rgb), 0.22);
    border-color: var(--accent);
    transform: translateY(-2px);
}

.btn-outline {
    display: inline-flex;
    align-items: center;
    min-height: 42px;
    padding: 0.6rem 1.25rem;
    border-radius: 999px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: var(--text-muted, #94a3b8);
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-left: auto;
}

.btn-outline:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
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

/* Light Theme Overrides */
:global([data-theme="light"]) .modal-backdrop {
    background: rgba(248, 250, 252, 0.85);
}
:global([data-theme="light"]) .modal-card {
    background: var(--card-bg-solid, #ffffff);
    border-color: var(--border, rgba(15, 23, 42, 0.1));
    color: var(--text-body, #1e293b);
    box-shadow: 0 25px 70px rgba(15, 23, 42, 0.15);
}
:global([data-theme="light"]) .modal-close-btn {
    background: var(--bg-secondary, #f1f5f9);
    border-color: var(--border, rgba(15, 23, 42, 0.1));
    color: var(--text-muted, #64748b);
}
:global([data-theme="light"]) .modal-close-btn:hover {
    background: var(--border, rgba(15, 23, 42, 0.15));
    color: var(--text-1, #0f172a);
}
:global([data-theme="light"]) .badge-category {
    background: var(--bg-secondary, #f1f5f9);
    border-color: var(--border, rgba(15, 23, 42, 0.1));
    color: var(--text-2, #475569);
}
:global([data-theme="light"]) .modal-title {
    color: var(--text-1, #0f172a);
}
:global([data-theme="light"]) .modal-description {
    color: var(--text-2, #475569);
}
:global([data-theme="light"]) .modal-image-wrapper {
    border-color: var(--border, rgba(15, 23, 42, 0.1));
    background: var(--bg-secondary, #f1f5f9);
}
:global([data-theme="light"]) .modal-image-badge {
    color: var(--text-1, #0f172a);
    background: rgba(255, 255, 255, 0.85);
    border-color: var(--border, rgba(15, 23, 42, 0.1));
}
:global([data-theme="light"]) .modal-tech-tag {
    background: var(--bg-secondary, #f1f5f9);
    border-color: var(--border, rgba(15, 23, 42, 0.1));
    color: var(--text-2, #475569);
}
:global([data-theme="light"]) .modal-problem-box {
    background: var(--bg-secondary, #f1f5f9);
    border-color: var(--border, rgba(15, 23, 42, 0.1));
}
:global([data-theme="light"]) .problem-label {
    color: #ef4444;
}
:global([data-theme="light"]) .challenge-label {
    color: #d97706;
}
:global([data-theme="light"]) .modal-action-item,
:global([data-theme="light"]) .modal-impact-item {
    color: var(--text-2, #475569);
}
:global([data-theme="light"]) .modal-footer {
    border-top-color: var(--border, rgba(15, 23, 42, 0.1));
}
:global([data-theme="light"]) .btn-secondary {
    background: var(--bg-primary, #ffffff);
    border-color: var(--border, rgba(15, 23, 42, 0.15));
    color: var(--text-1, #0f172a);
}
:global([data-theme="light"]) .btn-secondary:hover {
    background: var(--bg-secondary, #f1f5f9);
    border-color: var(--accent, #0d9488);
}
:global([data-theme="light"]) .btn-outline {
    border-color: var(--border, rgba(15, 23, 42, 0.15));
    color: var(--text-2, #475569);
}
:global([data-theme="light"]) .btn-outline:hover {
    background: var(--bg-secondary, #f1f5f9);
    color: var(--text-1, #0f172a);
}
</style>
