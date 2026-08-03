<script setup lang="ts">
/**
 * Two small UX affordances bundled together because they share a scroll
 * listener:
 *   1. A thin progress bar pinned to the top of the viewport that tracks
 *      how far the visitor has read down the page.
 *   2. A back-to-top button that appears once the visitor has scrolled
 *      past one viewport height.
 *
 * Sharing one scroll listener keeps this cheap on a long single-page site.
 * Reading progress is a percentage of `scrollHeight - clientHeight` — safe
 * for pages of any length, including the 3× viewport hero.
 */
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const progress = ref(0)
const showBackToTop = ref(false)

function onScroll() {
    const doc = document.documentElement
    const distance = doc.scrollHeight - doc.clientHeight
    // Distance can be 0 on pages shorter than the viewport — clamp so we
    // never divide by zero and the bar sits empty.
    progress.value = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0
    showBackToTop.value = window.scrollY > window.innerHeight
}

function scrollToTop() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })
}

onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
})
</script>

<template>
    <!-- Progress bar. Fixed to the top edge, aria-hidden because the value
         is purely visual — sighted users see it, screen readers already have
         their own scroll-position heuristics. -->
    <div class="scroll-progress" aria-hidden="true">
        <div class="scroll-progress-fill" :style="{ transform: `scaleX(${progress})` }" />
    </div>

    <!-- Back-to-top. Shows below the fold, hides above it. `visibility` +
         opacity so it can transition in/out and become truly untabbable when
         hidden. -->
    <Transition name="btt-fade">
        <button
            v-if="showBackToTop"
            type="button"
            class="back-to-top"
            aria-label="Scroll to top of page"
            @click="scrollToTop"
        >
            <ArrowUp :size="18" aria-hidden="true" />
        </button>
    </Transition>
</template>

<style scoped>
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    z-index: 9999;
    pointer-events: none;
    background: rgba(148, 163, 184, 0.06);
}

.scroll-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #5eead4 0%, #93c5fd 100%);
    transform-origin: left center;
    /* transform is written every scroll frame — no transition, so the bar
       tracks the pointer immediately without lag. */
}

.back-to-top {
    position: fixed;
    right: 1.25rem;
    /* Sits above the chat toggle (which lives bottom-left). Keeps clear of
       iOS home indicator on small screens. */
    bottom: calc(1.25rem + env(safe-area-inset-bottom));
    z-index: 40;

    width: 2.75rem;
    height: 2.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    color: #f8fafc;
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(148, 163, 184, 0.22);
    border-radius: 0.6rem;
    backdrop-filter: blur(8px);
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);

    transition:
        background-color 160ms cubic-bezier(0.23, 1, 0.32, 1),
        border-color 160ms cubic-bezier(0.23, 1, 0.32, 1),
        color 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

@media (hover: hover) and (pointer: fine) {
    .back-to-top:hover {
        background: rgba(94, 234, 212, 0.15);
        border-color: rgba(94, 234, 212, 0.5);
        color: #5eead4;
    }
}

.back-to-top:focus-visible {
    outline: 2px solid #5eead4;
    outline-offset: 2px;
}

/* Vue Transition classes — a brief fade + rise so appearance is not abrupt. */
.btt-fade-enter-active,
.btt-fade-leave-active {
    transition: opacity 220ms cubic-bezier(0.23, 1, 0.32, 1),
                transform 220ms cubic-bezier(0.23, 1, 0.32, 1);
}
.btt-fade-enter-from,
.btt-fade-leave-to {
    opacity: 0;
    transform: translateY(6px);
}

@media (prefers-reduced-motion: reduce) {
    .btt-fade-enter-active,
    .btt-fade-leave-active {
        transition: opacity 160ms ease;
        transform: none;
    }
    .btt-fade-enter-from,
    .btt-fade-leave-to {
        transform: none;
    }
}
</style>
