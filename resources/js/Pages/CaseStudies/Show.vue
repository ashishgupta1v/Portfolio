<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Head, Link } from '@inertiajs/vue3'
import type { CaseStudyShowPageProps } from '@/types/caseStudies'

const props = defineProps<CaseStudyShowPageProps>()
const whatsappHref = `https://wa.me/919087021592?text=${encodeURIComponent(
    `Hi Ashish, I just read your ${props.caseStudy.title} case study on ashishgupta.dev. I need a similar website, app, dashboard, software improvement, or automation for my business. Please tell me how you can help and what the next step should be.`
)}`

// Reading progress
const readingProgress = ref(0)
function updateProgress() {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    readingProgress.value = docHeight > 0 ? Math.round((window.scrollY / docHeight) * 100) : 0
}
onMounted(() => window.addEventListener('scroll', updateProgress, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', updateProgress))

const articleSchema = computed(() => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.caseStudy.title,
    description: props.caseStudy.seoDescription,
    author: {
        '@type': 'Person',
        name: 'Ashish Gupta',
        url: 'https://www.ashishgupta.dev/',
    },
    publisher: {
        '@type': 'Person',
        name: 'Ashish Gupta',
        url: 'https://www.ashishgupta.dev/',
    },
    datePublished: props.caseStudy.publishedAt,
    url: `https://www.ashishgupta.dev/case-studies/${props.caseStudy.slug}`,
    keywords: props.caseStudy.tags.join(', '),
}))

const breadcrumbSchema = computed(() => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ashishgupta.dev/' },
        { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://www.ashishgupta.dev/case-studies' },
        { '@type': 'ListItem', position: 3, name: props.caseStudy.title, item: `https://www.ashishgupta.dev/case-studies/${props.caseStudy.slug}` },
    ],
}))
</script>

<template>
    <Head :title="caseStudy.seoTitle">
        <meta name="description" :content="caseStudy.seoDescription" />
        <meta property="og:title" :content="caseStudy.seoTitle" />
        <meta property="og:description" :content="caseStudy.seoDescription" />
        <meta property="og:type" content="article" />
        <meta property="og:url" :content="`https://www.ashishgupta.dev/case-studies/${caseStudy.slug}`" />
        <meta property="og:site_name" content="Ashish Gupta" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content="caseStudy.seoTitle" />
        <meta name="twitter:description" :content="caseStudy.seoDescription" />
        <link rel="canonical" :href="`https://www.ashishgupta.dev/case-studies/${caseStudy.slug}`" />
        <component is="script" type="application/ld+json" v-html="articleSchema" />
        <component is="script" type="application/ld+json" v-html="breadcrumbSchema" />
    </Head>

    <div class="case-study-page">
        <!-- Reading progress bar -->
        <div class="reading-progress" :style="{ width: readingProgress + '%' }" aria-hidden="true" />

        <header class="hero-shell page-shell">
            <div class="topbar">
                <Link href="/" class="brand-link">Ashish Gupta</Link>
                <div class="topbar-links">
                    <Link href="/" class="topbar-link">Portfolio</Link>
                    <Link href="/case-studies" class="topbar-link">Case Studies</Link>
                </div>
            </div>

            <div class="hero-grid">
                <div class="hero-copy">
                    <p class="eyebrow">Case Study</p>
                    <h1>{{ caseStudy.title }}</h1>
                    <p class="hero-summary">{{ caseStudy.summary }}</p>
                </div>

                <aside class="hero-aside">
                    <div class="meta-block">
                        <span class="meta-label">Client</span>
                        <span class="meta-value">{{ caseStudy.client }}</span>
                    </div>
                    <div class="meta-block">
                        <span class="meta-label">Role</span>
                        <span class="meta-value">{{ caseStudy.role }}</span>
                    </div>
                    <div class="meta-block">
                        <span class="meta-label">Industry</span>
                        <span class="meta-value">{{ caseStudy.industry }}</span>
                    </div>
                    <div class="meta-block">
                        <span class="meta-label">Timeline</span>
                        <span class="meta-value">{{ caseStudy.timeline }}</span>
                    </div>
                    <div class="meta-block">
                        <span class="meta-label">Reading Time</span>
                        <span class="meta-value">{{ caseStudy.readingTimeMinutes }} min</span>
                    </div>
                </aside>
            </div>

            <div class="signal-band">
                <div>
                    <span class="signal-label">Featured outcome</span>
                    <p>{{ caseStudy.featuredOutcome }}</p>
                </div>
                <div class="signal-stack">
                    <span v-for="item in caseStudy.stack" :key="item" class="stack-chip">{{ item }}</span>
                </div>
            </div>
        </header>

        <main class="page-shell article-shell">
            <article class="article-card">
                <div class="article-prose" v-html="caseStudy.bodyHtml" />
            </article>

            <aside class="article-rail">
                <div class="rail-card">
                    <span class="rail-label">Permission status</span>
                    <p>{{ caseStudy.permissionStatus }}</p>
                </div>
                <div class="rail-card">
                    <span class="rail-label">Tags</span>
                    <div class="tag-grid">
                        <span v-for="tag in caseStudy.tags" :key="tag" class="tag-chip">{{ tag }}</span>
                    </div>
                </div>
                <div class="rail-card cta-card">
                    <span class="rail-label">Need similar work?</span>
                    <p>
                        I build websites, dashboards, SaaS workflows, internal tools, automation, and software
                        upgrades for growing businesses.
                    </p>
                    <a :href="whatsappHref" class="cta-link" target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
                </div>
            </aside>
        </main>
    </div>
</template>

<style scoped>
.reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #5eead4, #38bdf8);
    z-index: 2000;
    transition: width 0.1s linear;
    border-radius: 0 2px 2px 0;
}

.case-study-page {
    min-height: 100vh;
    background:
        radial-gradient(circle at top right, rgba(56, 189, 248, 0.09), transparent 28%),
        linear-gradient(180deg, #081019 0%, #0b1320 42%, #08111a 100%);
    color: #e2e8f0;
}

.page-shell {
    width: min(1180px, calc(100vw - 2.4rem));
    margin: 0 auto;
}

.hero-shell {
    padding: 2rem 0 3rem;
}

.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 3rem;
}

.brand-link,
.topbar-link,
.cta-link {
    text-decoration: none;
}

.brand-link {
    color: #f8fafc;
    font-size: 0.96rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.topbar-links {
    display: flex;
    gap: 1rem;
}

.topbar-link {
    color: rgba(226, 232, 240, 0.72);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.topbar-link:hover,
.brand-link:hover,
.cta-link:hover {
    color: #5eead4;
}

.hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 300px;
    gap: 2rem;
    align-items: start;
}

.eyebrow,
.meta-label,
.signal-label,
.rail-label {
    color: #5eead4;
    font-size: 0.76rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.hero-copy h1 {
    margin: 0.7rem 0 0;
    color: #f8fafc;
    font-size: clamp(2.6rem, 5vw, 4.8rem);
    line-height: 0.95;
    letter-spacing: -0.05em;
    max-width: 12ch;
}

.hero-summary {
    max-width: 720px;
    margin: 1.2rem 0 0;
    color: rgba(226, 232, 240, 0.76);
    font-size: 1.02rem;
    line-height: 1.85;
}

.hero-aside,
.signal-band,
.article-card,
.rail-card {
    border: 1px solid rgba(148, 163, 184, 0.12);
    background: rgba(8, 14, 23, 0.84);
    backdrop-filter: blur(10px);
}

.hero-aside {
    border-radius: 1.2rem;
    padding: 1.2rem;
    display: grid;
    gap: 0.9rem;
}

.meta-block {
    display: grid;
    gap: 0.2rem;
}

.meta-value {
    color: rgba(226, 232, 240, 0.84);
    line-height: 1.6;
}

.signal-band {
    margin-top: 2rem;
    border-radius: 1.2rem;
    padding: 1.2rem 1.3rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.4rem;
    justify-content: space-between;
}

.signal-band p,
.rail-card p {
    margin: 0.55rem 0 0;
    color: rgba(226, 232, 240, 0.74);
    line-height: 1.75;
}

.signal-stack,
.tag-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
}

.stack-chip,
.tag-chip {
    padding: 0.35rem 0.78rem;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.18);
    background: rgba(15, 23, 42, 0.84);
    color: rgba(226, 232, 240, 0.82);
    font-size: 0.72rem;
}

.article-shell {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 280px;
    gap: 1.6rem;
    padding-bottom: 4rem;
}

.article-card {
    border-radius: 1.4rem;
    padding: 1.7rem;
}

:deep(.article-prose h2),
:deep(.article-prose h3) {
    color: #f8fafc;
    letter-spacing: -0.03em;
}

:deep(.article-prose h2) {
    margin-top: 2.2rem;
    font-size: 1.9rem;
}

:deep(.article-prose h3) {
    margin-top: 1.4rem;
    font-size: 1.2rem;
}

:deep(.article-prose p),
:deep(.article-prose li) {
    color: rgba(226, 232, 240, 0.82);
    line-height: 1.9;
    font-size: 1rem;
}

:deep(.article-prose ul) {
    padding-left: 1.2rem;
}

:deep(.article-prose strong) {
    color: #f8fafc;
}

.article-rail {
    display: grid;
    gap: 1rem;
    align-content: start;
}

.rail-card {
    border-radius: 1rem;
    padding: 1.1rem;
}

.cta-link {
    display: inline-flex;
    margin-top: 1rem;
    color: #5eead4;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

@media (max-width: 920px) {
    .hero-grid,
    .article-shell {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 720px) {
    .page-shell {
        width: min(1180px, calc(100vw - 1.2rem));
    }

    .topbar {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.9rem;
    }

    .article-card,
    .hero-aside,
    .signal-band,
    .rail-card {
        padding: 1rem;
    }
}
</style>
