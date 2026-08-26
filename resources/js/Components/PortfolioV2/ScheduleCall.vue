<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { Calendar } from 'lucide-vue-next'

const showModal = ref(false)
const closeBtnRef = ref<HTMLButtonElement | null>(null)
const triggerBtnRef = ref<HTMLButtonElement | null>(null)
const CALENDLY_URL = 'https://calendly.com/ashishgupta1v/30min'

function openScheduler() {
    showModal.value = true
}

function closeModal() {
    showModal.value = false
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && showModal.value) {
        closeModal()
    }
}

watch(showModal, async (isOpen) => {
    if (isOpen) {
        await nextTick()
        closeBtnRef.value?.focus()
    } else {
        triggerBtnRef.value?.focus()
    }
})

onMounted(() => {
    window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
    <div class="schedule-call">
        <button
            ref="triggerBtnRef"
            class="schedule-btn"
            type="button"
            aria-haspopup="dialog"
            :aria-expanded="showModal"
            @click="openScheduler"
        >
            <Calendar :size="16" aria-hidden="true" />
            <span>Schedule a Call</span>
        </button>

        <Teleport to="body">
            <Transition name="modal-fade">
                <div
                    v-if="showModal"
                    class="schedule-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="schedule-modal-title"
                    @click.self="closeModal"
                >
                    <div class="schedule-modal">
                        <div class="schedule-modal-header">
                            <h3 id="schedule-modal-title">Schedule a Call</h3>
                            <button
                                ref="closeBtnRef"
                                class="schedule-close"
                                type="button"
                                aria-label="Close dialog"
                                @click="closeModal"
                            >×</button>
                        </div>
                        <div class="schedule-modal-body">
                            <p class="schedule-info">
                                Pick a time that works for you. I typically respond within a few hours.
                            </p>
                            <a
                                :href="CALENDLY_URL"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="schedule-external-link"
                                @click="closeModal"
                            >
                                <Calendar :size="18" aria-hidden="true" />
                                <span>Open Calendly to book a slot</span>
                            </a>
                            <p class="schedule-alt">
                                Or email <a href="mailto:ashishgupta1v@gmail.com">ashishgupta1v@gmail.com</a> with your preferred times.
                            </p>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
.schedule-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    background: transparent;
    color: var(--text-heading);
    border: 1px solid var(--border-strong);
    border-radius: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 200ms cubic-bezier(0.23, 1, 0.32, 1);
}

.schedule-btn:hover {
    background: rgba(var(--accent-rgb), 0.08);
    border-color: rgba(var(--accent-rgb), 0.55);
    color: var(--accent);
}

.schedule-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.schedule-modal {
    background: var(--card-bg-solid);
    border: 1px solid var(--border);
    border-radius: 1rem;
    max-width: 420px;
    width: 100%;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.schedule-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border);
}

.schedule-modal-header h3 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
}

.schedule-close {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 1.5rem;
    cursor: pointer;
    line-height: 1;
    padding: 0.2rem;
    transition: color 160ms;
}

.schedule-close:hover {
    color: var(--accent);
}

.schedule-modal-body {
    padding: 1.25rem;
    display: grid;
    gap: 1rem;
}

.schedule-info {
    color: var(--text-body);
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
}

.schedule-external-link {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1rem;
    background: var(--accent);
    color: var(--text-on-accent);
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: opacity 200ms;
    justify-content: center;
}

.schedule-external-link:hover {
    opacity: 0.9;
}

.schedule-alt {
    color: var(--text-muted);
    font-size: 0.8rem;
    text-align: center;
    margin: 0;
}

.schedule-alt a {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 2px;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 200ms ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
</style>
