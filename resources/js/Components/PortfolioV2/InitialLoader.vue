<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    progress: number
    visible: boolean
}>()

const clampedProgress = computed(() => Math.max(0, Math.min(100, props.progress || 0)))
</script>

<template>
    <Transition name="loader-fade">
        <div v-if="visible" class="initial-loader" aria-live="polite" aria-label="Loading portfolio">
            <div class="loader-grid" />
            <div class="loader-core">
                <div class="loader-orbit" />
                <div class="loader-orbit loader-orbit-b" />
                <div class="loader-label">Booting Experience</div>
                <div class="loader-progress">{{ clampedProgress }}%</div>
                <div class="loader-track">
                    <div class="loader-fill" :style="{ width: clampedProgress + '%' }" />
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.initial-loader {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    place-items: center;
    background:
        radial-gradient(circle at 20% 20%, rgba(94, 234, 212, 0.13), transparent 34%),
        radial-gradient(circle at 80% 75%, rgba(34, 211, 238, 0.1), transparent 42%),
        linear-gradient(180deg, #070d17 0%, #040812 100%);
    overflow: hidden;
}

.loader-grid {
    position: absolute;
    inset: 0;
    opacity: 0.22;
    background-image:
        linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: radial-gradient(circle at 50% 45%, rgba(0, 0, 0, 0.95), transparent 75%);
}

.loader-core {
    position: relative;
    width: min(92vw, 380px);
    padding: 2.1rem 1.5rem 1.3rem;
    border: 1px solid rgba(94, 234, 212, 0.22);
    border-radius: 1rem;
    backdrop-filter: blur(8px);
    background: linear-gradient(180deg, rgba(9, 16, 28, 0.72), rgba(8, 14, 23, 0.5));
    box-shadow:
        0 24px 60px rgba(0, 0, 0, 0.45),
        inset 0 1px 0 rgba(255, 255, 255, 0.04);
    text-align: center;
}

.loader-orbit {
    position: absolute;
    top: -34px;
    left: 50%;
    width: 68px;
    height: 68px;
    border-radius: 50%;
    border: 2px solid rgba(94, 234, 212, 0.45);
    border-top-color: transparent;
    border-left-color: rgba(147, 197, 253, 0.72);
    transform: translateX(-50%);
    animation: spinA 1.8s linear infinite;
}

.loader-orbit-b {
    width: 46px;
    height: 46px;
    top: -23px;
    border-color: rgba(147, 197, 253, 0.4);
    border-right-color: transparent;
    border-bottom-color: rgba(94, 234, 212, 0.8);
    animation: spinB 1.1s linear infinite;
}

.loader-label {
    margin-top: 0.8rem;
    color: rgba(226, 232, 240, 0.82);
    font-size: 0.84rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.loader-progress {
    margin-top: 0.45rem;
    color: #5eead4;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 0.04em;
}

.loader-track {
    margin-top: 0.85rem;
    width: 100%;
    height: 6px;
    border-radius: 999px;
    background: rgba(148, 163, 184, 0.18);
    overflow: hidden;
}

.loader-fill {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #22d3ee, #5eead4, #a3e635);
    box-shadow: 0 0 18px rgba(94, 234, 212, 0.45);
    transition: width 180ms ease;
}

.loader-fade-enter-active,
.loader-fade-leave-active {
    transition: opacity 420ms ease;
}

.loader-fade-enter-from,
.loader-fade-leave-to {
    opacity: 0;
}

@keyframes spinA {
    to { transform: translateX(-50%) rotate(360deg); }
}

@keyframes spinB {
    to { transform: translateX(-50%) rotate(-360deg); }
}

@media (prefers-reduced-motion: reduce) {
    .loader-orbit,
    .loader-orbit-b {
        animation: none;
    }
}
</style>