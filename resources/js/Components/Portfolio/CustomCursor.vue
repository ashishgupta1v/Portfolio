<script setup lang="ts">
import { useCursor } from '@/Composables/useCursor'
import { useIsDesktop } from '@/Composables/useMediaQuery'

const { cursorX, cursorY, cursorScale, cursorVisible } = useCursor()
const isDesktop = useIsDesktop()
</script>

<template>
    <div
        v-if="isDesktop"
        class="custom-cursor"
        :class="{ visible: cursorVisible }"
        :style="{
            transform: `translate(${cursorX}px, ${cursorY}px) scale(${cursorScale})`,
        }"
    >
        <div class="cursor-dot" />
        <div class="cursor-ring" />
    </div>
</template>

<style scoped>
.custom-cursor {
    position: fixed;
    top: -10px;
    left: -10px;
    z-index: 99999;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    mix-blend-mode: difference;
}

.custom-cursor.visible {
    opacity: 1;
}

.cursor-dot {
    width: 6px;
    height: 6px;
    background: #5eead4;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.cursor-ring {
    width: 20px;
    height: 20px;
    border: 1px solid rgba(94, 234, 212, 0.5);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
}
</style>
