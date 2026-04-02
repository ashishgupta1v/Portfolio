<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { SocialLink } from '@/types/portfolio'
import { Github, Linkedin, Mail } from 'lucide-vue-next'

const props = defineProps<{
    links: SocialLink[]
}>()

const iconMap: Record<string, any> = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
}

const iconsRef = ref<HTMLElement | null>(null)
let mouseX = 0
let mouseY = 0
let currentX = 0
let currentY = 0
let rafId: number | null = null

function onMouseMove(e: MouseEvent) {
    mouseX = e.clientX
    mouseY = e.clientY
}

function updateIcons() {
    if (!iconsRef.value) return
    const icons = iconsRef.value.querySelectorAll<HTMLElement>('.social-icon-wrapper')
    icons.forEach((icon) => {
        const rect = icon.getBoundingClientRect()
        const relX = ((mouseX - rect.left) / rect.width) * 100
        const relY = ((mouseY - rect.top) / rect.height) * 100
        icon.style.setProperty('--si-left', `${relX}%`)
        icon.style.setProperty('--si-top', `${relY}%`)
    })
    rafId = requestAnimationFrame(updateIcons)
}

onMounted(() => {
    window.addEventListener('mousemove', onMouseMove)
    updateIcons()
})

onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
    <div ref="iconsRef" class="social-icons" data-cursor="icons">
        <a
            v-for="link in links"
            :key="link.platform"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon-wrapper"
            :aria-label="link.label"
        >
            <component
                :is="iconMap[link.platform] || Mail"
                :size="18"
                class="social-icon"
            />
        </a>
    </div>
</template>

<style scoped>
.social-icons {
    position: fixed;
    right: 2.5rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.social-icon-wrapper {
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(94, 234, 212, 0.15);
    border-radius: 50%;
    color: rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
    overflow: hidden;
    background: transparent;
}

.social-icon-wrapper::before {
    content: '';
    position: absolute;
    width: 150%;
    height: 150%;
    background: radial-gradient(circle at var(--si-left, 50%) var(--si-top, 50%), rgba(94, 234, 212, 0.1), transparent 70%);
    pointer-events: none;
}

.social-icon-wrapper:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: scale(1.1);
}

.social-icon {
    position: relative;
    z-index: 1;
}

@media (max-width: 1024px) {
    .social-icons {
        display: none;
    }
}
</style>
