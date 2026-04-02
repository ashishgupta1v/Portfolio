<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
    progress: number
    name: string
    title: string
}>()

const emit = defineEmits<{
    complete: []
}>()

const isReady = ref(false)
const displayProgress = ref(0)
const containerRef = ref<HTMLElement | null>(null)

watch(
    () => props.progress,
    (val) => {
        gsap.to(displayProgress, {
            value: val,
            duration: 0.5,
            ease: 'power2.out',
        })
    },
)

function handleEnter() {
    if (props.progress < 100) return
    isReady.value = true

    gsap.to(containerRef.value, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => emit('complete'),
    })
}

onMounted(() => {
    // Auto-complete after 3 seconds if no model to load
    setTimeout(() => {
        if (displayProgress.value === 100) {
            handleEnter()
        }
    }, 3000)

    // Auto-trigger if already at 100%
    if (props.progress >= 100) {
        setTimeout(handleEnter, 1500)
    }
})

watch(
    () => props.progress,
    (val) => {
        if (val >= 100) {
            setTimeout(handleEnter, 1500)
        }
    },
)
</script>

<template>
    <div ref="containerRef" class="loading-screen">
        <div class="loading-content">
            <!-- Marquee Text -->
            <div class="marquee-container">
                <div class="marquee-track">
                    <span v-for="i in 6" :key="i" class="marquee-text">
                        {{ title }} &nbsp;&bull;&nbsp;
                    </span>
                </div>
            </div>

            <!-- Loader Animation -->
            <div class="loader-grid">
                <div
                    v-for="i in 27"
                    :key="i"
                    class="loader-line"
                    :style="{ animationDelay: `${i * 0.05}s` }"
                />
                <div class="loader-ball" />
            </div>

            <!-- Progress Button -->
            <button
                class="progress-btn"
                :class="{ ready: progress >= 100 }"
                @click="handleEnter"
            >
                <span v-if="progress < 100">Loading {{ Math.round(displayProgress) }}%</span>
                <span v-else>Welcome</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.loading-screen {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #0a0e17;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
}

.marquee-container {
    width: 100vw;
    overflow: hidden;
    opacity: 0.15;
}

.marquee-track {
    display: flex;
    white-space: nowrap;
    animation: marquee 20s linear infinite;
}

.marquee-text {
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #5eead4;
}

@keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

.loader-grid {
    position: relative;
    display: flex;
    gap: 3px;
    height: 80px;
    align-items: flex-end;
}

.loader-line {
    width: 2px;
    height: 100%;
    background: linear-gradient(to top, transparent, #5eead4);
    animation: loaderPulse 1.5s ease-in-out infinite alternate;
    transform-origin: bottom;
}

@keyframes loaderPulse {
    0% { transform: scaleY(0.2); opacity: 0.3; }
    100% { transform: scaleY(1); opacity: 1; }
}

.loader-ball {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #5eead4;
    border-radius: 50%;
    bottom: 0;
    animation: ballBounce 2s ease-in-out infinite;
}

@keyframes ballBounce {
    0%, 100% { left: 0; transform: translateY(0); }
    50% { left: calc(100% - 8px); transform: translateY(-60px); }
}

.progress-btn {
    padding: 0.75rem 2rem;
    border: 1px solid rgba(94, 234, 212, 0.3);
    background: transparent;
    color: #5eead4;
    font-size: 0.875rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: default;
    transition: all 0.3s ease;
    border-radius: 0;
}

.progress-btn.ready {
    cursor: pointer;
    border-color: #5eead4;
    background: rgba(94, 234, 212, 0.05);
}

.progress-btn.ready:hover {
    background: rgba(94, 234, 212, 0.1);
    transform: scale(1.02);
}
</style>
