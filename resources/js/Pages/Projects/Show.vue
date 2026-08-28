<script setup lang="ts">
/**
 * Project detail page. Deliberately smaller than a case-study — a case study
 * is a deep write-up; this page is the "project card" opened up with room for
 * a preview image, description, tool badges, and clear CTAs to visit the
 * live product or read the case study (if one exists at /case-studies/{slug}).
 */
import { computed } from 'vue'
import { Head, Link } from '@inertiajs/vue3'
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-vue-next'
import ResponsiveImage from '@/Components/PortfolioV2/ResponsiveImage.vue'
import ArchitectureDiagram from '@/Components/PortfolioV2/ArchitectureDiagram.vue'
import LiveCodeDemo from '@/Components/PortfolioV2/LiveCodeDemo.vue'

interface Project {
    title: string
    slug: string
    category: string
    description: string
    tools: string[]
    imageUrl: string | null
    videoUrl: string | null
    externalUrl: string | null
}

const props = defineProps<{
    project: Project
    caseStudySlug?: string | null
}>()
const resumeUrl = '/resume/ashish-gupta-resume.pdf'
</script>

<template>
    <Head :title="`${project.title} — Ashish Gupta`" />

    <main class="project-page">
        <div class="project-shell">
            <Link href="/#works" class="project-back">
                <ArrowLeft :size="14" aria-hidden="true" />
                <span>All work</span>
            </Link>

            <header class="project-header">
                <span class="project-category">{{ project.category }}</span>
                <h1 class="project-title">{{ project.title }}</h1>
                <p class="project-description">{{ project.description }}</p>

                <div class="project-actions">
                    <a
                        v-if="project.externalUrl"
                        :href="project.externalUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="project-cta project-cta--primary"
                    >
                        <span>Visit live site</span>
                        <ExternalLink :size="14" aria-hidden="true" />
                    </a>
                    <Link
                        v-if="caseStudySlug"
                        :href="`/case-studies/${caseStudySlug}`"
                        class="project-cta project-cta--ghost"
                    >
                        <span>Read architecture case study</span>
                        <ArrowUpRight :size="14" aria-hidden="true" />
                    </Link>
                    <a
                        href="mailto:ashishgupta1v@gmail.com"
                        class="project-cta project-cta--ghost"
                    >
                        <span>Contact Ashish</span>
                        <ArrowUpRight :size="14" aria-hidden="true" />
                    </a>
                </div>
            </header>

            <section
                v-if="project.imageUrl"
                class="project-media"
                aria-label="Project preview"
            >
                <ResponsiveImage
                    :src="project.imageUrl"
                    :alt="`Preview of ${project.title}`"
                    :width="1200"
                    :height="720"
                    :eager="true"
                    class="project-image"
                />
            </section>

            <ArchitectureDiagram :slug="project.slug" />
            <LiveCodeDemo :slug="project.slug" />

            <section class="project-details">
                <div>
                    <h2 class="project-h2">Stack &amp; tooling</h2>
                    <ul class="project-tools">
                        <li v-for="tool in project.tools" :key="tool" class="project-tool">
                            {{ tool }}
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 class="project-h2">Role &amp; Opportunity</h2>
                    <p class="project-body">
                        Looking for a Senior / Staff Full-Stack Architect who can lead technical initiatives,
                        design scalable systems, and execute end-to-end with high velocity?
                    </p>
                    <p class="project-body">
                        <Link href="/#contact" class="inline-link">Discuss an engineering role</Link>
                        &nbsp;·&nbsp;
                        <Link href="/for-hiring-managers" class="inline-link">For hiring managers</Link>
                        &nbsp;·&nbsp;
                        <a :href="resumeUrl" target="_blank" rel="noopener noreferrer" class="inline-link">Download Résumé</a>
                    </p>
                </div>
            </section>
        </div>
    </main>
</template>

<style scoped>
.project-page {
    min-height: 100vh;
    background: radial-gradient(circle at 20% 15%, var(--section-bg-tint) 0%, var(--section-bg-mid) 55%, var(--section-bg-deep) 100%);
    color: var(--text-heading);
    padding: 5rem 1.5rem 6rem;
}

.project-shell {
    max-width: 62rem;
    margin: 0 auto;
    display: grid;
    gap: 2.5rem;
}

.project-back {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.85rem;
    padding: 0.4rem 0.55rem;
    border-radius: 0.4rem;
    justify-self: start;
    transition: color 160ms cubic-bezier(0.23, 1, 0.32, 1),
                background-color 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

@media (hover: hover) and (pointer: fine) {
    .project-back:hover {
        color: var(--accent);
        background-color: rgba(var(--accent-rgb), 0.08);
    }
}

.project-header {
    display: grid;
    gap: 0.8rem;
}

.project-category {
    color: var(--accent);
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 700;
}

.project-title {
    font-size: clamp(2rem, 5vw, 3.4rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    line-height: 1.05;
    text-wrap: balance;
}

.project-description {
    color: var(--text-body);
    font-size: clamp(1rem, 1.6vw, 1.2rem);
    line-height: 1.7;
    max-width: 42rem;
}

.project-actions {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
}

.project-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition:
        background-color 160ms cubic-bezier(0.23, 1, 0.32, 1),
        border-color 160ms cubic-bezier(0.23, 1, 0.32, 1),
        color 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

.project-cta--primary {
    background: var(--accent);
    color: var(--text-on-accent);
    border: 1px solid transparent;
}
.project-cta--ghost {
    background: transparent;
    color: var(--text-heading);
    border: 1px solid var(--border-strong);
}

@media (hover: hover) and (pointer: fine) {
    .project-cta--primary:hover { background: rgba(var(--accent-rgb), 0.7); }
    .project-cta--ghost:hover {
        background: rgba(var(--accent-rgb), 0.08);
        border-color: rgba(var(--accent-rgb), 0.55);
        color: var(--accent);
    }
}

.project-media {
    border-radius: 0.9rem;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.project-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
}

.project-h2 {
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-muted);
    margin-bottom: 1rem;
}

.project-tools {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding: 0;
    margin: 0;
}
.project-tool {
    padding: 0.28rem 0.7rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-body);
    background: var(--card-bg);
    border: 1px solid var(--border-strong);
    border-radius: 999px;
}

.project-body {
    color: var(--text-body);
    line-height: 1.7;
    margin-bottom: 0.75rem;
}

.inline-link {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

@media (hover: hover) and (pointer: fine) {
    .inline-link:hover { color: rgba(var(--accent-rgb), 0.7); }
}

@media (max-width: 768px) {
    .project-page { padding: 3rem 1rem 4rem; }
}
</style>
