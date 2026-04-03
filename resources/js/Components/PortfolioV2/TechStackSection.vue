<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Skill } from '@/types/portfolio'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{
    skills: Record<string, Skill[]>
}>()

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
    if (!sectionRef.value) return

    gsap.from('.ts-eyebrow', {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' },
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
    })
    gsap.from('.ts-title', {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 78%' },
        y: 30, opacity: 0, duration: 0.8, delay: 0.1, ease: 'power3.out',
    })
    gsap.from('.ts-group', {
        scrollTrigger: { trigger: '.ts-grid', start: 'top 78%' },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
    })
    gsap.from('.ts-tag', {
        scrollTrigger: { trigger: '.ts-grid', start: 'top 72%' },
        scale: 0.8, opacity: 0, duration: 0.4, stagger: 0.04, ease: 'back.out(1.5)',
    })
})
</script>

<template>
    <section ref="sectionRef" class="ts-section">
        <div class="ts-shell">
            <div class="heading-wrap">
                <p class="ts-eyebrow">Technologies</p>
                <h2 class="ts-title">Tech Stack</h2>
            </div>

            <div class="ts-grid">
                <div
                    v-for="(skillGroup, category) in skills"
                    :key="String(category)"
                    class="ts-group"
                >
                    <h4 class="ts-category">{{ category }}</h4>
                    <div class="ts-tags">
                        <span
                            v-for="skill in skillGroup"
                            :key="skill.name"
                            class="ts-tag"
                        >
                            {{ skill.name }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.ts-section {
    position: relative;
    background: linear-gradient(180deg, #0d1521 0%, #0b1118 50%, #0a0f17 100%);
    padding: 7rem 1.5rem;
    overflow: hidden;
}

.ts-shell {
    max-width: 1100px;
    margin: 0 auto;
}

.heading-wrap {
    text-align: center;
    margin-bottom: 3.5rem;
}

.ts-eyebrow {
    color: rgba(94, 234, 212, 0.9);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 0.74rem;
    margin-bottom: 0.8rem;
    font-weight: 600;
}

.ts-title {
    color: #f8fafc;
    font-size: clamp(2rem, 6vw, 4.5rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 0.95;
}

.ts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 2.5rem;
}

.ts-group {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.ts-category {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(94, 234, 212, 0.7);
    font-weight: 600;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(94, 234, 212, 0.1);
}

.ts-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.ts-tag {
    display: inline-flex;
    align-items: center;
    font-size: 0.8rem;
    padding: 0.35rem 0.85rem;
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 100px;
    color: rgba(226, 232, 240, 0.7);
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(6px);
    cursor: default;
    transition: all 0.3s ease;
    will-change: transform;
}

.ts-tag:hover {
    border-color: rgba(94, 234, 212, 0.5);
    color: #f8fafc;
    background: rgba(94, 234, 212, 0.08);
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(94, 234, 212, 0.12);
}

/* ── Mobile ── */
@media (max-width: 768px) {
    .ts-section {
        padding: 4rem 1rem;
    }
    .ts-grid {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
}

@media (max-width: 480px) {
    .ts-grid {
        grid-template-columns: 1fr;
    }
    .ts-section {
        padding: 3rem 0.8rem;
    }
}
</style>
