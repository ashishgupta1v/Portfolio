<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import type { CaseStudiesIndexPageProps } from '@/types/caseStudies'

defineProps<CaseStudiesIndexPageProps>()
</script>

<template>
    <Head title="Case Studies">
        <meta
            name="description"
            content="Deep architecture and delivery case studies from Ashish Gupta. Canonical long-form proof of systems thinking, execution quality, and product outcomes."
        />
        <link rel="canonical" href="https://www.ashishgupta.dev/case-studies" />
    </Head>

    <div class="case-studies-page">
        <header class="hero-shell">
            <div class="topbar">
                <Link href="/" class="brand-link">Ashish Gupta</Link>
                <div class="topbar-links">
                    <Link href="/" class="topbar-link">Portfolio</Link>
                    <span class="topbar-current">Case Studies</span>
                </div>
            </div>

            <div class="hero-copy">
                <p class="eyebrow">Canonical Library</p>
                <h1>Case studies that prove portfolio depth, not vanity metrics.</h1>
                <p class="hero-text">
                    This library is the long-form evidence layer behind ashishgupta.dev: named systems,
                    architectural trade-offs, delivery choices, and measurable outcomes that a recruiter
                    or founder can assess in minutes.
                </p>
            </div>
        </header>

        <main class="library-shell">
            <article v-for="study in caseStudies" :key="study.slug" class="study-card">
                <div class="study-meta-row">
                    <span class="study-client">{{ study.client }}</span>
                    <span class="study-reading">{{ study.readingTimeMinutes }} min read</span>
                </div>

                <h2 class="study-title">
                    <Link :href="`/case-studies/${study.slug}`" class="study-title-link">
                        {{ study.title }}
                    </Link>
                </h2>

                <p class="study-summary">{{ study.summary }}</p>

                <div class="study-highlight">
                    <span class="highlight-label">Featured outcome</span>
                    <p>{{ study.featuredOutcome }}</p>
                </div>

                <div class="study-detail-row">
                    <span>{{ study.industry }}</span>
                    <span>{{ study.timeline }}</span>
                    <span>{{ study.publishedAt }}</span>
                </div>

                <div class="tag-row">
                    <span v-for="tag in study.tags" :key="tag" class="tag-chip">{{ tag }}</span>
                </div>

                <Link :href="`/case-studies/${study.slug}`" class="read-link">Read case study</Link>
            </article>
        </main>
    </div>
</template>

<style scoped>
.case-studies-page {
    min-height: 100vh;
    background:
        radial-gradient(circle at top left, rgba(94, 234, 212, 0.12), transparent 30%),
        linear-gradient(180deg, #081019 0%, #0a111b 48%, #071018 100%);
    color: #e2e8f0;
}

.hero-shell,
.library-shell {
    width: min(1120px, calc(100vw - 2.5rem));
    margin: 0 auto;
}

.hero-shell {
    padding: 2rem 0 3.5rem;
}

.topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 3.5rem;
}

.brand-link,
.topbar-link,
.read-link,
.study-title-link {
    text-decoration: none;
}

.brand-link {
    color: #f8fafc;
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.topbar-links {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.topbar-link,
.topbar-current {
    color: rgba(226, 232, 240, 0.7);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.topbar-current {
    color: #5eead4;
}

.eyebrow {
    margin: 0 0 1rem;
    color: #5eead4;
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
}

.hero-copy h1 {
    margin: 0;
    max-width: 11ch;
    color: #f8fafc;
    font-size: clamp(2.8rem, 6vw, 5rem);
    line-height: 0.95;
    letter-spacing: -0.05em;
}

.hero-text {
    max-width: 700px;
    margin: 1.4rem 0 0;
    color: rgba(226, 232, 240, 0.74);
    font-size: 1.02rem;
    line-height: 1.8;
}

.library-shell {
    display: grid;
    gap: 1.5rem;
    padding-bottom: 4rem;
}

.study-card {
    padding: 1.7rem 1.8rem;
    border: 1px solid rgba(148, 163, 184, 0.12);
    border-radius: 1.25rem;
    background: rgba(11, 18, 30, 0.82);
    backdrop-filter: blur(10px);
}

.study-meta-row,
.study-detail-row,
.tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
}

.study-meta-row,
.study-detail-row {
    justify-content: space-between;
}

.study-client,
.study-reading,
.study-detail-row span,
.highlight-label {
    font-size: 0.76rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.study-client,
.highlight-label {
    color: #5eead4;
}

.study-reading,
.study-detail-row span {
    color: rgba(226, 232, 240, 0.56);
}

.study-title {
    margin: 1rem 0 0.8rem;
}

.study-title-link {
    color: #f8fafc;
    font-size: clamp(1.6rem, 3vw, 2.3rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
}

.study-title-link:hover,
.read-link:hover {
    color: #5eead4;
}

.study-summary,
.study-highlight p {
    margin: 0;
    color: rgba(226, 232, 240, 0.72);
    line-height: 1.8;
}

.study-highlight {
    margin: 1.2rem 0;
    padding: 1rem 1.1rem;
    border-radius: 1rem;
    background: rgba(94, 234, 212, 0.06);
    border: 1px solid rgba(94, 234, 212, 0.14);
}

.tag-row {
    margin-top: 1rem;
}

.tag-chip {
    padding: 0.36rem 0.78rem;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(148, 163, 184, 0.2);
    color: rgba(226, 232, 240, 0.78);
    font-size: 0.72rem;
}

.read-link {
    display: inline-flex;
    margin-top: 1.2rem;
    color: #5eead4;
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

@media (max-width: 720px) {
    .hero-shell,
    .library-shell {
        width: min(1120px, calc(100vw - 1.4rem));
    }

    .topbar {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        padding-bottom: 2.5rem;
    }

    .study-meta-row,
    .study-detail-row {
        justify-content: flex-start;
    }
}
</style>