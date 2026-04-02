<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Profile } from '@/types/portfolio'
import { useGsap } from '@/Composables/useGsap'

const props = defineProps<{
    profile: Profile
}>()

const { splitTextReveal } = useGsap()
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
    splitTextReveal('.about-text', '.about-section')
})
</script>

<template>
    <section id="about" ref="sectionRef" class="about-section">
        <div class="section-container">
            <div class="about-grid">
                <div class="about-label">
                    <span class="section-label">ABOUT</span>
                </div>
                <div class="about-content">
                    <p class="about-text">
                        {{ profile.bio }}
                    </p>
                    <p class="about-text about-text-secondary">
                        Deep expertise in designing high-availability systems, leading squads of 7+ engineers, and driving CI/CD automation. Currently at Infosys, modernizing legacy healthcare monoliths using Domain-Driven Design.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.about-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 8rem 0;
}

.about-grid {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 4rem;
    align-items: start;
}

.section-label {
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 500;
    position: sticky;
    top: 8rem;
}

.about-content {
    max-width: 650px;
}

.about-text {
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 300;
    margin-bottom: 2rem;
}

.about-text-secondary {
    font-size: clamp(0.95rem, 1.5vw, 1.1rem);
    color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 1024px) {
    .about-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
}
</style>
