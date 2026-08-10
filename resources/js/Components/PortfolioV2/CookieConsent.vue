<script setup lang="ts">
/**
 * Minimal privacy notice. The site does not use tracking cookies, but the
 * contact form captures IP, user agent, and UTM parameters for lead
 * qualification — visitors have a right to know before they submit.
 *
 * A single localStorage flag hides it once acknowledged. Deliberately not a
 * cookie: this thing exists to reassure the visitor about tracking, so
 * setting a tracking cookie to acknowledge it would be ironic.
 */
import { onMounted, ref } from 'vue'
import { X } from 'lucide-vue-next'

const STORAGE_KEY = 'privacy-notice-ack-v1'

const visible = ref(false)

function dismiss() {
    try {
        localStorage.setItem(STORAGE_KEY, '1')
    } catch {
        // Storage may be blocked (private windows on Safari, some corporate
        // configs). If it is, the notice re-appears next visit — that's fine.
    }
    visible.value = false
}

onMounted(() => {
    // Delay slightly so it doesn't jump in during the initial paint of the
    // hero — comes in after the loader animation settles.
    setTimeout(() => {
        try {
            visible.value = localStorage.getItem(STORAGE_KEY) !== '1'
        } catch {
            visible.value = true
        }
    }, 1200)
})
</script>

<template>
    <Transition name="notice-fade">
        <div v-if="visible" class="privacy-notice" role="region" aria-label="Privacy notice">
            <div class="privacy-notice-body">
                <p>
                    This site uses no tracking cookies. The contact form captures
                    your IP, user agent, and any UTM parameters in the URL — solely
                    to prioritise and follow up on your enquiry.
                </p>
            </div>
            <button
                type="button"
                class="privacy-notice-close"
                aria-label="Dismiss privacy notice"
                @click="dismiss"
            >
                <X :size="16" aria-hidden="true" />
            </button>
        </div>
    </Transition>
</template>

<style scoped>
.privacy-notice {
    position: fixed;
    left: 1.25rem;
    right: 1.25rem;
    bottom: calc(1.25rem + env(safe-area-inset-bottom));
    z-index: 50;

    max-width: 26rem;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.85rem 0.9rem 0.85rem 1rem;

    color: var(--text-body);
    background: var(--glass-bg);
    border: 1px solid var(--border);
    border-radius: 0.6rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
    font-size: 0.82rem;
    line-height: 1.5;
}

.privacy-notice-body p {
    margin: 0;
    color: var(--text-body);
}

.privacy-notice-close {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.6rem;
    height: 1.6rem;

    color: var(--text-muted);
    background: transparent;
    border: 0;
    border-radius: 0.35rem;
    cursor: pointer;
    transition: color 160ms cubic-bezier(0.23, 1, 0.32, 1),
                background-color 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

@media (hover: hover) and (pointer: fine) {
    .privacy-notice-close:hover {
        color: var(--accent);
        background: rgba(var(--accent-rgb), 0.08);
    }
}

.privacy-notice-close:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}

@media (min-width: 640px) {
    .privacy-notice {
        left: auto;
        right: 1.25rem;
    }
}

.notice-fade-enter-active,
.notice-fade-leave-active {
    transition: opacity 260ms cubic-bezier(0.23, 1, 0.32, 1),
                transform 260ms cubic-bezier(0.23, 1, 0.32, 1);
}
.notice-fade-enter-from,
.notice-fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

@media (prefers-reduced-motion: reduce) {
    .notice-fade-enter-active,
    .notice-fade-leave-active {
        transition: opacity 160ms ease;
    }
    .notice-fade-enter-from,
    .notice-fade-leave-to {
        transform: none;
    }
}
</style>
