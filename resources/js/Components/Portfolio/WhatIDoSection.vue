<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Service } from '@/types/portfolio'
import { useGsap } from '@/Composables/useGsap'
import { Layers, Code, Brain } from 'lucide-vue-next'

const props = defineProps<{
    services: Service[]
}>()

const iconMap: Record<string, any> = {
    layers: Layers,
    code: Code,
    brain: Brain,
}

const { charReveal, gsap, ScrollTrigger } = useGsap()
const activeCard = ref<number | null>(null)

function toggleCard(index: number) {
    activeCard.value = activeCard.value === index ? null : index
}

onMounted(() => {
    charReveal('.whatido-title', '.whatido-section')

    // Stagger card animations
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.whatido-section',
            start: 'top 60%',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
    })
})
</script>

<template>
    <section class="whatido-section">
        <div class="section-container">
            <h2 class="whatido-title">WHAT I DO</h2>

            <div class="services-grid">
                <div
                    v-for="(service, index) in services"
                    :key="service.title"
                    class="service-card"
                    :class="{ active: activeCard === index }"
                    @click="toggleCard(index)"
                >
                    <!-- Dashed border SVG -->
                    <svg class="card-border" viewBox="0 0 400 250" preserveAspectRatio="none">
                        <rect
                            x="1" y="1"
                            width="398" height="248"
                            fill="none"
                            stroke="rgba(94, 234, 212, 0.2)"
                            stroke-width="1"
                            stroke-dasharray="8 4"
                            rx="8"
                        />
                    </svg>

                    <div class="card-content">
                        <div class="card-icon">
                            <component :is="iconMap[service.icon ?? 'code']" :size="28" />
                        </div>
                        <h3 class="card-title">{{ service.title }}</h3>
                        <p class="card-description">{{ service.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.whatido-section {
    padding: 8rem 0;
    position: relative;
}

.whatido-title {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    color: white;
    margin-bottom: 4rem;
    letter-spacing: -0.02em;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}

.service-card {
    position: relative;
    padding: 2.5rem 2rem;
    cursor: pointer;
    transition: all 0.4s ease;
}

.card-border {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.service-card:hover .card-border rect,
.service-card.active .card-border rect {
    stroke: rgba(94, 234, 212, 0.5);
    transition: stroke 0.3s ease;
}

.card-content {
    position: relative;
    z-index: 1;
}

.card-icon {
    color: var(--accent);
    margin-bottom: 1.5rem;
}

.card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1rem;
}

.card-description {
    font-size: 0.875rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 300;
}

.service-card:hover .card-description,
.service-card.active .card-description {
    color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 1024px) {
    .services-grid {
        grid-template-columns: 1fr;
        max-width: 500px;
    }
}
</style>
