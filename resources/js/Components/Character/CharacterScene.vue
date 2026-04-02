<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCharacterScene } from '@/Composables/useCharacterScene'

const emit = defineEmits<{
    progress: [number]
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

// Generator-agnostic config via env:
// VITE_CHARACTER_MODEL_URL="/models/character.glb"
// VITE_CHARACTER_HDR_URL="/models/environment.hdr"
const MODEL_PATH = import.meta.env.VITE_CHARACTER_MODEL_URL || null
const HDR_PATH = import.meta.env.VITE_CHARACTER_HDR_URL || null

const hasModel = computed(() => MODEL_PATH !== null)

const { isLoaded, loadProgress } = useCharacterScene({
    canvas: canvasRef,
    modelPath: MODEL_PATH ?? undefined,
    hdrPath: HDR_PATH ?? undefined,
    onProgress: (percent) => emit('progress', percent),
    onReady: () => emit('progress', 100),
})
</script>

<template>
    <div class="character-scene">
        <canvas ref="canvasRef" class="character-canvas" />

        <!-- Stylized placeholder when no model -->
        <div v-if="!hasModel" class="character-placeholder">
            <!-- Animated rings -->
            <div class="placeholder-rings">
                <div class="ring ring-1" />
                <div class="ring ring-2" />
                <div class="ring ring-3" />
            </div>

            <!-- Silhouette glow -->
            <div class="placeholder-silhouette">
                <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="silhouette-svg">
                    <!-- Head -->
                    <circle cx="60" cy="40" r="24" fill="url(#headGrad)" opacity="0.4" />
                    <!-- Neck -->
                    <rect x="52" y="62" width="16" height="12" rx="4" fill="url(#bodyGrad)" opacity="0.25" />
                    <!-- Shoulders & Body -->
                    <path d="M20 90 Q20 74 52 74 L68 74 Q100 74 100 90 L100 140 Q100 160 80 160 L40 160 Q20 160 20 140 Z"
                          fill="url(#bodyGrad)" opacity="0.2" />
                </svg>
                <svg width="0" height="0">
                    <defs>
                        <radialGradient id="headGrad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="rgba(94, 234, 212, 0.6)" />
                            <stop offset="100%" stop-color="rgba(94, 234, 212, 0)" />
                        </radialGradient>
                        <linearGradient id="bodyGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                            <stop offset="0%" stop-color="rgba(94, 234, 212, 0.4)" />
                            <stop offset="100%" stop-color="rgba(94, 234, 212, 0)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <p class="placeholder-label">3D Model</p>
            <p class="placeholder-hint">Set VITE_CHARACTER_MODEL_URL in .env</p>
        </div>
    </div>
</template>

<style scoped>
.character-scene {
    width: 100%;
    height: 100%;
    position: relative;
}

.character-canvas {
    width: 100%;
    height: 100%;
    display: block;
}

/* Placeholder */
.character-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}

/* Animated rings */
.placeholder-rings {
    position: absolute;
    width: 260px;
    height: 260px;
}

.ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid rgba(94, 234, 212, 0.06);
}

.ring-1 {
    animation: ring-spin 12s linear infinite;
    border-top-color: rgba(94, 234, 212, 0.15);
    border-left-color: rgba(94, 234, 212, 0.1);
}

.ring-2 {
    inset: 20px;
    animation: ring-spin 8s linear infinite reverse;
    border-bottom-color: rgba(94, 234, 212, 0.12);
    border-right-color: rgba(94, 234, 212, 0.08);
}

.ring-3 {
    inset: 40px;
    animation: ring-spin 15s linear infinite;
    border-top-color: rgba(94, 234, 212, 0.08);
}

@keyframes ring-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* Silhouette */
.placeholder-silhouette {
    position: relative;
    width: 120px;
    height: 200px;
    animation: silhouette-float 4s ease-in-out infinite;
}

.silhouette-svg {
    width: 100%;
    height: 100%;
    filter: blur(1px);
}

@keyframes silhouette-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
}

.placeholder-label {
    font-size: 0.75rem;
    color: rgba(94, 234, 212, 0.25);
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-top: 1rem;
    position: relative;
}

.placeholder-hint {
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.15);
    margin-top: 0.25rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    position: relative;
}
</style>
