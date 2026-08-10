<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Link } from '@inertiajs/vue3'
import type { Project } from '@/types/portfolio'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-vue-next'
import ResponsiveImage from '@/Components/PortfolioV2/ResponsiveImage.vue'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{
    projects: Project[]
}>()

const sectionRef = ref<HTMLElement | null>(null)
const hoveredIndex = ref<number | null>(null)
const activeFilter = ref('All')

const categories = computed(() => {
    const cats = [...new Set(props.projects.map(p => p.category))]
    return ['All', ...cats]
})

const filteredProjects = computed(() => {
    if (activeFilter.value === 'All') return props.projects
    return props.projects.filter(p => p.category === activeFilter.value)
})

function pad(n: number): string {
    return String(n + 1).padStart(2, '0')
}

onMounted(() => {
    if (!sectionRef.value) return
    // Use next frame execution after DOM paint
    setTimeout(() => {
        if (!sectionRef.value) return
        
        const q = gsap.utils.selector(sectionRef.value)
        
        const titleWords = q('.section-title-word')
        if (titleWords.length) {
            gsap.fromTo(titleWords, 
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: { trigger: sectionRef.value, start: 'top 85%' },
                    y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out'
                }
            )
        }

        const rows = q('.work-row')
        if (rows.length) {
            gsap.fromTo(rows, 
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: { trigger: sectionRef.value, start: 'top 70%' },
                    y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out'
                }
            )
        }
    }, 150)
})
</script>

<template>
    <section ref="sectionRef" id="work" class="works-section">
        <div class="ws-shell">
            <!-- Heading -->
            <div class="section-header">
                <div class="section-header-wrapper">
                    <h2 class="section-title">
                        <span ref="titleWordRefs" class="section-title-word">My </span>
                        <span ref="titleWordRefs" class="section-title-word accent">Work</span>
                    </h2>
                </div>
                <div class="section-separator" />
            </div>

            <!-- Filter tabs -->
            <div class="filter-tabs">
                <button
                    v-for="cat in categories"
                    :key="cat"
                    class="filter-tab"
                    :class="{ active: activeFilter === cat }"
                    @click="activeFilter = cat"
                >
                    {{ cat }}
                </button>
            </div>

            <!-- Work list -->
            <div class="work-list">
                <article
                    v-for="(project, index) in filteredProjects"
                    :key="`${project.slug}-${index}`"
                    ref="workRowRefs"
                    class="work-row"
                    @mouseenter="hoveredIndex = index"
                    @mouseleave="hoveredIndex = null"
                >
                    <!-- Stretched-link overlay: makes the whole row navigate to
                         /projects/{slug} while leaving nested links (like Live)
                         above it via z-index. -->
                    <Link
                        :href="`/projects/${project.slug}`"
                        class="work-row-stretched-link"
                        :aria-label="`View ${project.title} project`"
                    />

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
                        <ResponsiveImage
                            :src="project.imageUrl"
                            :alt="project.title"
                            :width="520"
                            :height="340"
                            sizes="260px"
                            img-class="work-preview-img"
                        />
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.works-section {
    background: radial-gradient(circle at 15% 20%, var(--section-bg-tint) 0%, var(--section-bg-mid) 45%, var(--section-bg-deep) 100%);
    padding: 7rem 1.5rem 6rem;
    position: relative;
    overflow: hidden;
}

.ws-shell {
    max-width: 1100px;
    margin: 0 auto;
}

/* ── Filter tabs ── */
.filter-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
}

.filter-tab {
    padding: 0.45rem 1rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 200ms cubic-bezier(0.23, 1, 0.32, 1);
}

.filter-tab:hover {
    border-color: rgba(var(--accent-rgb), 0.4);
    color: var(--text-body);
}

.filter-tab.active {
    background: rgba(var(--accent-rgb), 0.12);
    border-color: var(--accent);
    color: var(--accent);
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
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    transition: all 0.35s ease;
    position: relative;
}

.work-row:hover {
    background: rgba(var(--accent-rgb), 0.02);
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.5rem;
}

/* Stretched-link pattern: an <a> with position:absolute inset:0 turns the
   whole article into a click target while nested <a>s stay accessible via
   higher z-index. Screen readers still see the article as an article; the
   overlay carries the aria-label so the accessible name is the project. */
.work-row-stretched-link {
    position: absolute;
    inset: 0;
    z-index: 1;
    /* Keyboard focus ring falls on the overlay itself — it has the same
       bounds as the row, so visually it looks like the row is focused. */
    border-radius: 0.5rem;
    outline: none;
}
.work-row-stretched-link:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
}
/* Any nested actionable element inside the row must sit above the overlay
   so its own click handler wins. */
.work-row .work-live-link,
.work-row .work-preview {
    position: relative;
    z-index: 2;
}

/* ── Number ── */
.work-num {
    font-size: 2.8rem;
    font-weight: 800;
    color: var(--border);
    line-height: 1;
    letter-spacing: -0.04em;
    transition: color 0.3s ease;
}

.work-row:hover .work-num {
    color: rgba(var(--accent-rgb), 0.3);
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
    color: var(--text-1);
    letter-spacing: -0.02em;
    transition: color 0.3s ease;
}

.work-row:hover .work-title {
    color: var(--accent);
}

.work-live-link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(var(--accent-rgb), 0.75);
    border: 1px solid rgba(var(--accent-rgb), 0.28);
    border-radius: 100px;
    padding: 0.22rem 0.65rem;
    text-decoration: none;
    opacity: 1;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
    flex-shrink: 0;
}

.work-live-link:hover {
    background: rgba(var(--accent-rgb), 0.12);
    border-color: rgba(var(--accent-rgb), 0.75);
    color: var(--accent);
    transform: translateY(-1px);
}

.work-tagline {
    font-size: 0.88rem;
    color: var(--text-muted);
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
    border: 1px solid var(--border);
    border-radius: 100px;
    color: var(--text-muted);
    background: var(--card-bg);
    transition: all 0.3s ease;
}

.work-row:hover .work-tag {
    border-color: rgba(var(--accent-rgb), 0.3);
    color: var(--text-body);
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
    border: 1px solid var(--border);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.work-preview.visible {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
}

/* ResponsiveImage renders an outer <span> wrapper; make it fill the preview
   frame the same way the old direct <img> did. */
.work-preview :deep(.responsive-image) {
    width: 100%;
    height: 100%;
}
.work-preview :deep(img) {
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
        color: rgba(var(--accent-rgb), 0.2);
    }
}
</style>
