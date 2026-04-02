<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Project } from '@/types/portfolio'
import { useGsap } from '@/Composables/useGsap'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-vue-next'

const props = defineProps<{
    projects: Project[]
}>()

const { gsap } = useGsap()
const currentIndex = ref(0)
const isAnimating = ref(false)

function prev() {
    if (isAnimating.value || currentIndex.value <= 0) return
    isAnimating.value = true
    currentIndex.value--
    setTimeout(() => (isAnimating.value = false), 500)
}

function next() {
    if (isAnimating.value || currentIndex.value >= props.projects.length - 1) return
    isAnimating.value = true
    currentIndex.value++
    setTimeout(() => (isAnimating.value = false), 500)
}

onMounted(() => {
    gsap.from('.work-header', {
        scrollTrigger: {
            trigger: '.work-section',
            start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
    })
})
</script>

<template>
    <section id="work" class="work-section">
        <div class="section-container">
            <div class="work-header">
                <h2 class="work-title">WORK</h2>
                <div class="work-nav">
                    <button
                        class="nav-arrow"
                        :disabled="currentIndex === 0"
                        data-cursor="disable"
                        @click="prev"
                    >
                        <ArrowLeft :size="20" />
                    </button>
                    <span class="work-counter">
                        {{ String(currentIndex + 1).padStart(2, '0') }}
                        /
                        {{ String(projects.length).padStart(2, '0') }}
                    </span>
                    <button
                        class="nav-arrow"
                        :disabled="currentIndex === projects.length - 1"
                        data-cursor="disable"
                        @click="next"
                    >
                        <ArrowRight :size="20" />
                    </button>
                </div>
            </div>

            <!-- Carousel -->
            <div class="work-carousel">
                <div
                    class="work-track"
                    :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
                >
                    <div
                        v-for="project in projects"
                        :key="project.slug"
                        class="work-slide"
                    >
                        <div class="project-card">
                            <!-- Project Image -->
                            <div class="project-image">
                                <div v-if="!project.imageUrl" class="project-placeholder">
                                    <span class="placeholder-text">{{ project.title }}</span>
                                </div>
                                <img
                                    v-else
                                    :src="project.imageUrl"
                                    :alt="project.title"
                                    class="project-img"
                                />
                                <a
                                    v-if="project.externalUrl"
                                    :href="project.externalUrl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="project-link"
                                    data-cursor="disable"
                                >
                                    <ExternalLink :size="18" />
                                </a>
                            </div>

                            <!-- Project Info -->
                            <div class="project-info">
                                <span class="project-category">{{ project.category }}</span>
                                <h3 class="project-title">{{ project.title }}</h3>
                                <p class="project-description">{{ project.description }}</p>
                                <div class="project-tools">
                                    <span
                                        v-for="tool in project.tools"
                                        :key="tool"
                                        class="tool-tag"
                                    >
                                        {{ tool }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.work-section {
    padding: 8rem 0;
}

.work-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
}

.work-title {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    color: white;
    letter-spacing: -0.02em;
}

.work-nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.nav-arrow {
    background: none;
    border: 1px solid rgba(94, 234, 212, 0.2);
    color: white;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 0;
}

.nav-arrow:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--accent);
}

.nav-arrow:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.work-counter {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
}

.work-carousel {
    overflow: hidden;
}

.work-track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}

.work-slide {
    min-width: 100%;
    padding-right: 2rem;
}

.project-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
}

.project-image {
    position: relative;
    aspect-ratio: 16/10;
    background: rgba(94, 234, 212, 0.03);
    border: 1px solid rgba(94, 234, 212, 0.08);
    overflow: hidden;
}

.project-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(94, 234, 212, 0.05), rgba(94, 234, 212, 0.02));
}

.placeholder-text {
    font-size: 2rem;
    font-weight: 700;
    color: rgba(94, 234, 212, 0.15);
    letter-spacing: -0.02em;
}

.project-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.project-link {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(94, 234, 212, 0.3);
    color: var(--accent);
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;
}

.project-link:hover {
    background: rgba(94, 234, 212, 0.1);
    border-color: var(--accent);
}

.project-category {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 500;
}

.project-title {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 700;
    color: white;
    margin: 0.5rem 0 1rem;
}

.project-description {
    font-size: 0.9rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 1.5rem;
}

.project-tools {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tool-tag {
    font-size: 0.7rem;
    letter-spacing: 0.05em;
    padding: 0.3rem 0.75rem;
    border: 1px solid rgba(94, 234, 212, 0.15);
    color: rgba(255, 255, 255, 0.6);
    white-space: nowrap;
}

@media (max-width: 1024px) {
    .project-card {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
}
</style>
