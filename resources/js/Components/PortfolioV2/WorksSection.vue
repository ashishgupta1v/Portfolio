<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Project } from '@/types/portfolio'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps<{
    projects: Project[]
}>()

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
    if (!sectionRef.value) return

    gsap.from('.ws-eyebrow', {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' },
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
    })
    gsap.from('.ws-title', {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 78%' },
        y: 30, opacity: 0, duration: 0.8, delay: 0.1, ease: 'power3.out',
    })
    gsap.from('.work-card', {
        scrollTrigger: { trigger: '.works-grid', start: 'top 78%' },
        y: 60, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
    })
})
</script>

<template>
    <section ref="sectionRef" class="works-section">
        <div class="section-shell">
            <div class="heading-wrap">
                <p class="ws-eyebrow eyebrow">Portfolio</p>
                <h2 class="ws-title title">Selected Works</h2>
            </div>

            <div class="works-grid">
                <article
                    v-for="(project, index) in projects"
                    :key="`${project.slug}-${index}`"
                    class="work-card"
                >
                    <div class="image-layer">
                        <img
                            :src="project.imageUrl || '/images/project-placeholder.svg'"
                            :alt="project.title"
                            loading="lazy"
                        >
                        <div class="shade" />
                    </div>

                    <div class="content-layer">
                        <div class="pill-row">
                            <span class="pill category">{{ project.category }}</span>
                            <span class="pill tools">{{ project.tools.slice(0, 3).join(' · ') }}</span>
                        </div>

                        <h3 class="project-title">{{ project.title }}</h3>
                        <p class="project-description">{{ project.description }}</p>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.works-section {
    background: radial-gradient(circle at 15% 20%, #182537 0%, #0c1119 45%, #080d14 100%);
    padding: 6rem 1.2rem 7rem;
}

.section-shell {
    max-width: 1200px;
    margin: 0 auto;
}

.heading-wrap {
    margin-bottom: 2.4rem;
}

.eyebrow {
    color: rgba(245, 158, 11, 0.95);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 0.73rem;
    margin-bottom: 0.6rem;
}

.title {
    color: #f8fafc;
    font-size: clamp(2rem, 6.5vw, 5rem);
    letter-spacing: -0.03em;
    line-height: 0.95;
}

.works-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
}

.work-card {
    position: relative;
    min-height: 390px;
    border-radius: 1.25rem;
    overflow: hidden;
    border: 1px solid rgba(148, 163, 184, 0.2);
    isolation: isolate;
    transform: translateY(0);
    transition: transform 300ms ease, border-color 300ms ease;
}

.work-card:hover {
    transform: translateY(-6px);
    border-color: rgba(245, 158, 11, 0.55);
}

.image-layer {
    position: absolute;
    inset: 0;
}

.image-layer img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1);
    transition: transform 500ms ease;
}

.work-card:hover .image-layer img {
    transform: scale(1.08);
}

.shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(2, 6, 23, 0.05) 0%, rgba(2, 6, 23, 0.82) 70%, rgba(2, 6, 23, 0.96) 100%);
}

.content-layer {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 390px;
    padding: 1.2rem;
}

.pill-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-bottom: 0.75rem;
}

.pill {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.35rem 0.65rem;
}

.category {
    color: #111827;
    background: #fbbf24;
}

.tools {
    color: #e2e8f0;
    border: 1px solid rgba(226, 232, 240, 0.35);
    background: rgba(15, 23, 42, 0.5);
}

.project-title {
    color: #f8fafc;
    font-size: 1.65rem;
    letter-spacing: -0.02em;
    margin-bottom: 0.4rem;
}

.project-description {
    color: rgba(226, 232, 240, 0.88);
    line-height: 1.5;
}

@media (max-width: 768px) {
    .works-section {
        padding: 3.5rem 1rem 4rem;
    }
    .works-grid {
        grid-template-columns: 1fr;
        gap: 1.2rem;
    }
    .work-card {
        min-height: 320px;
    }
    .content-layer {
        min-height: 320px;
    }
    .project-title {
        font-size: 1.35rem;
    }
}

@media (max-width: 480px) {
    .works-section {
        padding: 2.5rem 0.8rem 3rem;
    }
    .work-card {
        min-height: 280px;
    }
    .content-layer {
        min-height: 280px;
        padding: 1rem;
    }
}
</style>
