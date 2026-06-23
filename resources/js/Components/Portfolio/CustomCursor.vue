<script setup lang="ts">
import { useCursor } from '@/Composables/useCursor'
import { useIsDesktop } from '@/Composables/useMediaQuery'

const { dotX, dotY, ringX, ringY, cursorScale, cursorVisible } = useCursor()
const isDesktop = useIsDesktop()
</script>

<template>
    <div
        v-if="isDesktop"
        class="custom-cursor"
        :class="{ visible: cursorVisible }"
    >
        <!-- The dot moves instantly to feel perfectly responsive -->
        <div 
            class="cursor-dot" 
            :style="{
                transform: `translate(${dotX}px, ${dotY}px) scale(${cursorScale})`,
            }"
        />
        <!-- The ring trails smoothly behind -->
        <div 
            class="cursor-ring" 
            :style="{
                transform: `translate(${ringX}px, ${ringY}px) scale(${cursorScale})`,
            }"
        />
    </div>
</template>

<style scoped>
.custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
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
    position: fixed;
    top: 0;
    left: 0;
    margin-top: -3px;
    margin-left: -3px;
}

.cursor-ring {
    width: 20px;
    height: 20px;
    border: 1px solid rgba(94, 234, 212, 0.5);
    border-radius: 50%;
    position: fixed;
    top: 0;
    left: 0;
    margin-top: -10px;
    margin-left: -10px;
    transition: width 0.3s ease, height 0.3s ease;
}
</style>
