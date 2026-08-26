<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { SHOWCASE_PROJECTS, type ShowcaseProject } from '@/Data/projects'
import ProjectCard from '@/Components/Work/ProjectCard.vue'
import ProjectQuickViewModal from '@/Components/Work/ProjectQuickViewModal.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = withDefaults(
    defineProps<{
        projects?: ShowcaseProject[]
    }>(),
    {
        projects: () => SHOWCASE_PROJECTS,
    }
)

const allProjects = computed<ShowcaseProject[]>(() => {
    if (props.projects && props.projects.length > 0) {
        return props.projects
    }
    return SHOWCASE_PROJECTS
})

const sectionRef = ref<HTMLElement | null>(null)
const activeCategory = ref<string>('All')
const quickViewProject = ref<ShowcaseProject | null>(null)

const categories = computed(() => {
    const rawCategories = [...new Set(allProjects.value.map((p) => p.category))]
    const list = [
        { label: 'All', count: allProjects.value.length },
        ...rawCategories.map((cat) => ({
            label: cat,
            count: allProjects.value.filter((p) => p.category === cat).length,
        })),
    ]
    return list
})

const filteredProjects = computed(() => {
    if (activeCategory.value === 'All') {
        return allProjects.value
    }
    return allProjects.value.filter((p) => p.category === activeCategory.value)
})

function handleQuickView(project: ShowcaseProject) {
    quickViewProject.value = project
}

function handleCloseModal() {
    quickViewProject.value = null
}

onMounted(() => {
    if (!sectionRef.value) return
    setTimeout(() => {
        if (!sectionRef.value) return
        const q = gsap.utils.selector(sectionRef.value)
        const headerEls = q('.section-header, .filter-fieldset')
        if (headerEls.length) {
            gsap.fromTo(
                headerEls,
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: { trigger: sectionRef.value, start: 'top 85%' },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                }
            )
        }

        const cards = q('.work-grid-item')
        if (cards.length) {
            gsap.fromTo(
                cards,
                { y: 35, opacity: 0 },
                {
                    scrollTrigger: { trigger: sectionRef.value, start: 'top 75%' },
                    y: 0,
                    opacity: 1,
                    duration: 0.65,
                    stagger: 0.08,
                    ease: 'power3.out',
                }
            )
        }
    }, 150)
})
</script>

<template>
    <section ref="sectionRef" id="work" class="work-section">
        <div class="work-shell">
            <!-- Header -->
            <header class="section-header">
                <p class="section-eyebrow">Delivered Work & Case Studies</p>
                <h2 class="section-title">
                    <span>Production </span>
                    <span class="accent">Applications</span>
                </h2>
                <p class="section-subtitle">
                    Explore live web platforms, cloud SaaS engines, and enterprise systems engineered with clean domain boundaries and zero technical debt.
                </p>
                <div class="section-separator" aria-hidden="true" />
            </header>

            <!-- Category Filter Pills (Lint-clean fieldset/legend) -->
            <fieldset class="filter-fieldset">
                <legend class="sr-only">Filter projects by category</legend>
                <div class="filter-pills">
                    <button
                        v-for="cat in categories"
                        :key="cat.label"
                        type="button"
                        class="filter-pill"
                        :class="{ 'filter-pill--active': activeCategory === cat.label }"
                        :aria-pressed="activeCategory === cat.label"
                        @click="activeCategory = cat.label"
                    >
                        <span class="pill-label">{{ cat.label }}</span>
                        <span class="pill-count">{{ cat.count }}</span>
                    </button>
                </div>
            </fieldset>

            <!-- Projects Grid -->
            <div v-if="filteredProjects.length > 0" class="work-grid">
                <div
                    v-for="project in filteredProjects"
                    :key="project.slug"
                    class="work-grid-item"
                >
                    <ProjectCard
                        :project="project"
                        @quick-view="handleQuickView"
                    />
                </div>
            </div>

            <!-- Empty State Fallback -->
            <div v-else class="work-empty-state">
                <p>No projects found in this category.</p>
                <button
                    type="button"
                    class="btn-reset-filter"
                    @click="activeCategory = 'All'"
                >
                    View All Projects
                </button>
            </div>
        </div>

        <!-- Quick View Lightbox Modal -->
        <ProjectQuickViewModal
            :project="quickViewProject"
            @close="handleCloseModal"
        />
    </section>
</template>

<style scoped>
.work-section {
    --work-accent: var(--accent, #2dd4bf);
    --work-card: var(--card-bg, #0f1621);
    --work-border: var(--border, rgba(255, 255, 255, 0.08));

    background: radial-gradient(circle at 15% 20%, var(--section-bg-tint) 0%, var(--section-bg-mid) 45%, var(--section-bg-deep) 100%);
    padding: 6rem 1.25rem 6rem;
    position: relative;
    overflow: hidden;
}

.work-shell {
    max-width: 76rem;
    margin: 0 auto;
}

/* ── Section Header ── */
.section-header {
    margin-bottom: 2.5rem;
}

.section-eyebrow {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--work-accent);
    margin: 0 0 0.5rem;
}

.section-title {
    font-size: clamp(2rem, 5vw, 3.25rem);
    font-weight: 900;
    letter-spacing: -0.035em;
    color: var(--text-1, #f8fafc);
    margin: 0 0 0.85rem;
    line-height: 1.1;
}

.section-title .accent {
    color: var(--work-accent);
}

.section-subtitle {
    font-size: 0.98rem;
    color: var(--text-muted, #94a3b8);
    max-width: 44rem;
    line-height: 1.6;
    margin: 0 0 1.5rem;
}

.section-separator {
    width: 3.5rem;
    height: 3px;
    background: var(--work-accent);
    border-radius: 999px;
}

/* ── Filter Fieldset & Pills ── */
.filter-fieldset {
    border: none;
    padding: 0;
    margin: 0 0 2.5rem;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.filter-pills {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.55rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--work-border);
}

.filter-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 1rem;
    border: 1px solid var(--work-border);
    border-radius: 999px;
    background: var(--work-card);
    color: var(--text-muted, #94a3b8);
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);
}

.filter-pill:hover {
    border-color: rgba(45, 212, 191, 0.5);
    color: var(--text-body, #e2e8f0);
    transform: translateY(-1px);
}

.filter-pill:focus-visible {
    outline: 2px solid var(--work-accent);
    outline-offset: 2px;
}

.filter-pill--active {
    background: linear-gradient(135deg, rgba(45, 212, 191, 0.2), rgba(99, 102, 241, 0.2));
    border-color: var(--work-accent);
    color: var(--work-accent);
    box-shadow: 0 4px 15px rgba(45, 212, 191, 0.15);
}

.pill-label {
    letter-spacing: 0.02em;
}

.pill-count {
    font-size: 0.7rem;
    font-weight: 800;
    padding: 0.15rem 0.45rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    color: var(--text-muted, #94a3b8);
}

.filter-pill--active .pill-count {
    background: var(--work-accent);
    color: #030712;
}

/* ── Responsive 3-Column Grid ── */
.work-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

@media (min-width: 640px) {
    .work-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .work-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

.work-grid-item {
    display: flex;
}

/* ── Empty State ── */
.work-empty-state {
    text-align: center;
    padding: 4rem 1rem;
    background: var(--work-card);
    border: 1px dashed var(--work-border);
    border-radius: 1rem;
    color: var(--text-muted, #94a3b8);
}

.btn-reset-filter {
    margin-top: 1rem;
    padding: 0.5rem 1.25rem;
    border-radius: 999px;
    background: var(--work-accent);
    color: #030712;
    font-weight: 700;
    font-size: 0.82rem;
    border: none;
    cursor: pointer;
}

@media (prefers-reduced-motion: reduce) {
    .filter-pill {
        transition: none !important;
        transform: none !important;
    }
}

@media (max-width: 640px) {
    .work-section {
        padding: 4rem 1rem 4rem;
    }
}
</style>
