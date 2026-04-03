<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Project } from '@/types/portfolio'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

defineProps<{
    projects: Project[]
}>()

const sectionRef = ref<HTMLElement | null>(null)
const hoveredIndex = ref<number | null>(null)

function pad(n: number): string {
    return String(n + 1).padStart(2, '0')
}

onMounted(() => {
    if (!sectionRef.value) return

    const titleLines = sectionRef.value.querySelectorAll('.ws-title-line')
    gsap.from(titleLines, {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' },
        y: 50, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
    })

    const workRows = sectionRef.value.querySelectorAll('.work-row')
    const workList = sectionRef.value.querySelector('.work-list')
    if (workRows.length && workList) {
        gsap.from(workRows, {
            scrollTrigger: { trigger: workList, start: 'top 78%' },
            y: 40, opacity: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
        })
    }
})
</script>

<template>
    <section ref="sectionRef" id="work" class="works-section">
        <div class="ws-shell">
            <!-- Heading -->
            <div class="section-header">
                <div class="section-header-wrapper">
                    <h2 class="section-title">
                        <span class="section-title-word">My </span>
                        <span class="section-title-word accent">Work</span>
                    </h2>
                </div>
                <div class="section-separator" />
            </div>

            <!-- Work list -->
            <div class="work-list">
                <article
                    v-for="(project, index) in projects"
                    :key="`${project.slug}-${index}`"
                    class="work-row"
                    @mouseenter="hoveredIndex = index"
                    @mouseleave="hoveredIndex = null"
                >
                    <!-- Number -->
                    <span class="work-num">{{ pad(index) }}</span>

                    <!-- Content -->
                    <div class="work-info">
                        <div class="work-title-row">
                            <h3 class="work-title">{{ project.title }}</h3>
                            <a
                                v-if="project.externalUrl"
                                :href="project.externalUrl"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="work-live-link"
                                @click.stop
                            >
                                Live <ArrowUpRight :size="13" />
                            </a>
                        </div>
                        <p class="work-tagline">{{ project.description }}</p>
                        <div class="work-tags">
                            <span
                                v-for="tool in project.tools.slice(0, 4)"
                                :key="tool"
                                class="work-tag"
                            >
                                {{ tool }}
                            </span>
                            <span v-if="project.category" class="work-tag category-tag">
                                {{ project.category }}
                            </span>
                        </div>
                    </div>

                    <!-- Hover image preview -->
                    <div
                        v-if="project.imageUrl"
                        class="work-preview"
                        :class="{ visible: hoveredIndex === index }"
                    >
                        <img :src="project.imageUrl" :alt="project.title" loading="lazy" />
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.works-section {
    background: radial-gradient(circle at 15% 20%, #182537 0%, #0c1119 45%, #080d14 100%);
    padding: 7rem 1.5rem 6rem;
    position: relative;
    overflow: hidden;
}

.ws-shell {
    max-width: 1100px;
    margin: 0 auto;
}

/* ── Work list ── */
.work-list {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.work-row {
    display: grid;
    grid-template-columns: 4rem 1fr;
    gap: 2rem;
    align-items: start;
    padding: 2rem 0;
    border-bottom: 1px solid rgba(148, 163, 184, 0.08);
    cursor: pointer;
    transition: all 0.35s ease;
    position: relative;
}

.work-row:hover {
    background: rgba(94, 234, 212, 0.02);
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.5rem;
}

/* ── Number ── */
.work-num {
    font-size: 2.8rem;
    font-weight: 800;
    color: rgba(148, 163, 184, 0.1);
    line-height: 1;
    letter-spacing: -0.04em;
    transition: color 0.3s ease;
}

.work-row:hover .work-num {
    color: rgba(94, 234, 212, 0.3);
}

/* ── Info ── */
.work-info {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.work-title-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.work-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #f8fafc;
    letter-spacing: -0.02em;
    transition: color 0.3s ease;
}

.work-row:hover .work-title {
    color: #5eead4;
}

.work-live-link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(94, 234, 212, 0.75);
    border: 1px solid rgba(94, 234, 212, 0.28);
    border-radius: 100px;
    padding: 0.22rem 0.65rem;
    text-decoration: none;
    opacity: 1;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
    flex-shrink: 0;
}

.work-live-link:hover {
    background: rgba(94, 234, 212, 0.12);
    border-color: rgba(94, 234, 212, 0.75);
    color: #5eead4;
    transform: translateY(-1px);
}

.work-tagline {
    font-size: 0.88rem;
    color: rgba(226, 232, 240, 0.55);
    line-height: 1.5;
    max-width: 600px;
    font-weight: 300;
}

.work-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.4rem;
}

.work-tag {
    display: inline-flex;
    padding: 0.25rem 0.65rem;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 100px;
    color: rgba(226, 232, 240, 0.6);
    background: rgba(15, 23, 42, 0.4);
    transition: all 0.3s ease;
}

.work-row:hover .work-tag {
    border-color: rgba(94, 234, 212, 0.3);
    color: rgba(226, 232, 240, 0.8);
}

.category-tag {
    background: rgba(245, 158, 11, 0.15);
    border-color: rgba(245, 158, 11, 0.3);
    color: #fbbf24;
}

/* ── Hover preview ── */
.work-preview {
    position: absolute;
    right: -1rem;
    top: 50%;
    transform: translateY(-50%) translateX(10px);
    width: 260px;
    height: 170px;
    border-radius: 0.75rem;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    z-index: 10;
    border: 1px solid rgba(148, 163, 184, 0.15);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.work-preview.visible {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
}

.work-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* ── Mobile ── */
@media (max-width: 900px) {
    .work-preview {
        display: none;
    }
}

@media (max-width: 768px) {
    .works-section {
        padding: 4rem 1rem 4rem;
    }

    .ws-title {
        flex-direction: row;
    }

    .work-row {
        grid-template-columns: 2.5rem 1fr;
        gap: 1rem;
        padding: 1.4rem 0;
    }

    .work-num {
        font-size: 1.8rem;
    }

    .work-title {
        font-size: 1.25rem;
    }
}

@media (max-width: 480px) {
    .works-section {
        padding: 3rem 0.8rem 3rem;
    }
    .work-row {
        grid-template-columns: 1fr;
        gap: 0.3rem;
    }
    .work-num {
        font-size: 1.4rem;
        color: rgba(94, 234, 212, 0.2);
    }
}
</style>
