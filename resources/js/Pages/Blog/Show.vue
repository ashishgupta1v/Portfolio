<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Head, Link } from '@inertiajs/vue3'
import type { BlogShowPageProps } from '@/types/blog'

const props = defineProps<BlogShowPageProps>()

function formatDate(value: string): string {
    return new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

// Reading progress
const readingProgress = ref(0)
function updateProgress() {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    readingProgress.value = docHeight > 0 ? Math.round((window.scrollY / docHeight) * 100) : 0
}

onMounted(() => {
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
})

onUnmounted(() => {
    window.removeEventListener('scroll', updateProgress)
})

const articleSchema = computed(() => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.post.title,
    description: props.post.excerpt,
    author: {
        '@type': 'Person',
        name: 'Ashish Gupta',
        url: 'https://ashishgupta.dev/',
    },
    publisher: {
        '@type': 'Person',
        name: 'Ashish Gupta',
        url: 'https://ashishgupta.dev/',
    },
    datePublished: props.post.publishedAt,
    url: `https://ashishgupta.dev/blog/${props.post.slug}`,
    keywords: props.post.tags.join(', '),
}))

const breadcrumbSchema = computed(() => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ashishgupta.dev/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://ashishgupta.dev/blog' },
        { '@type': 'ListItem', position: 3, name: props.post.title, item: `https://ashishgupta.dev/blog/${props.post.slug}` },
    ],
}))
</script>

<template>
    <Head :title="post.title">
        <meta name="description" :content="post.excerpt" />
        <meta property="og:title" :content="post.title" />
        <meta property="og:description" :content="post.excerpt" />
        <meta property="og:type" content="article" />
        <meta property="og:url" :content="`https://ashishgupta.dev/blog/${post.slug}`" />
        <meta property="og:site_name" content="Ashish Gupta" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content="post.title" />
        <meta name="twitter:description" :content="post.excerpt" />
        <link rel="canonical" :href="`https://ashishgupta.dev/blog/${post.slug}`" />
        <component is="script" type="application/ld+json" v-html="articleSchema" />
        <component is="script" type="application/ld+json" v-html="breadcrumbSchema" />
    </Head>

    <div class="blog-post-page">
        <!-- Reading progress bar -->
        <div class="reading-progress" :style="{ width: readingProgress + '%' }" aria-hidden="true" />

        <header class="hero-shell page-shell">
            <div class="topbar">
                <Link href="/" class="brand-link">Ashish Gupta</Link>
                <div class="topbar-links">
                    <Link href="/" class="topbar-link">Portfolio</Link>
                    <Link href="/case-studies" class="topbar-link">Case Studies</Link>
                    <Link href="/blog" class="topbar-link">Blog</Link>
                    <Link href="/engagements" class="topbar-link">Engagements</Link>
                </div>
            </div>

            <div class="hero-grid">
                <div class="hero-copy">
                    <p class="eyebrow">Field Notes</p>
                    <h1>{{ post.title }}</h1>
                    <p class="hero-summary">{{ post.excerpt }}</p>
                </div>

                <aside class="hero-aside">
                    <div class="meta-block">
                        <span class="meta-label">Published</span>
                        <span class="meta-value">{{ formatDate(post.publishedAt) }}</span>
                    </div>
                    <div class="meta-block">
                        <span class="meta-label">Reading Time</span>
                        <span class="meta-value">{{ post.readingTimeMinutes }} min</span>
                    </div>
                    <div class="meta-block">
                        <span class="meta-label">Tags</span>
                        <div class="tag-grid">
                            <span v-for="tag in post.tags" :key="tag" class="tag-chip">{{ tag }}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </header>

        <main class="page-shell article-shell">
            <article class="article-card">
                <div class="article-prose" v-html="post.bodyHtml" />
            </article>

            <aside class="article-rail">
                <div class="rail-card">
                    <span class="rail-label">Back to</span>
                    <p><Link href="/blog" class="rail-link">All posts</Link></p>
                </div>
                <div class="rail-card cta-card">
                    <span class="rail-label">Need work like this?</span>
                    <p>
                        I build websites, dashboards, SaaS workflows, internal tools, automation, and software
                        upgrades for growing businesses.
                    </p>
                    <Link href="/case-studies" class="cta-link">See case studies</Link>
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
    background: linear-gradient(90deg, var(--accent), #93c5fd);
    z-index: 2000;
    transition: width 0.1s linear;
    border-radius: 0 2px 2px 0;
}

.blog-post-page {
    min-height: 100vh;
    background:
        radial-gradient(circle at top right, rgba(56, 189, 248, 0.09), transparent 28%),
        linear-gradient(180deg, var(--section-bg-deep) 0%, var(--section-bg-mid) 42%, var(--section-bg-deep) 100%);
    color: var(--text-body);
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
.cta-link,
.rail-link {
    text-decoration: none;
}

.brand-link {
    color: var(--text-1);
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
    color: var(--text-muted);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.topbar-link:hover,
.brand-link:hover,
.cta-link:hover,
.rail-link:hover {
    color: var(--accent);
}

.hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 300px;
    gap: 2rem;
    align-items: start;
}

.eyebrow,
.meta-label,
.rail-label {
    color: var(--accent);
    font-size: 0.76rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.hero-copy h1 {
    margin: 0.7rem 0 0;
    color: var(--text-1);
    font-size: clamp(2.6rem, 5vw, 4.8rem);
    line-height: 0.95;
    letter-spacing: -0.05em;
    max-width: 14ch;
}

.hero-summary {
    max-width: 720px;
    margin: 1.2rem 0 0;
    color: var(--text-muted);
    font-size: 1.02rem;
    line-height: 1.85;
}

.hero-aside,
.article-card,
.rail-card {
    border: 1px solid var(--border);
    background: var(--glass-bg);
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
    gap: 0.35rem;
}

.meta-value {
    color: var(--text-body);
    line-height: 1.6;
}

.tag-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
}

.tag-chip {
    padding: 0.35rem 0.78rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--card-bg-strong);
    color: var(--text-body);
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
    color: var(--text-1);
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
    color: var(--text-body);
    line-height: 1.9;
    font-size: 1rem;
}

:deep(.article-prose ul),
:deep(.article-prose ol) {
    padding-left: 1.2rem;
}

:deep(.article-prose strong) {
    color: var(--text-1);
}

:deep(.article-prose code) {
    font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
    background: rgba(var(--accent-rgb), 0.1);
    color: var(--accent);
    padding: 0.15rem 0.4rem;
    border-radius: 0.35rem;
    font-size: 0.88em;
}

:deep(.article-prose pre) {
    background: var(--card-bg-solid);
    border: 1px solid var(--border);
    border-radius: 0.6rem;
    padding: 1.25rem;
    overflow-x: auto;
    margin: 1.5rem 0;
}

:deep(.article-prose pre code) {
    font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
    background: transparent;
    color: var(--text-body);
    padding: 0;
    border-radius: 0;
    font-size: 0.85rem;
    line-height: 1.7;
}

:deep(.article-prose a) {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 160ms;
}

:deep(.article-prose a:hover) {
    color: rgba(var(--accent-rgb), 0.7);
}

:deep(.article-prose blockquote) {
    border-left: 3px solid var(--accent);
    padding: 0.5rem 0 0.5rem 1.25rem;
    margin: 1.5rem 0;
    color: var(--text-muted);
    font-style: italic;
}

:deep(.article-prose img) {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
    margin: 1.5rem 0;
}

:deep(.article-prose hr) {
    border: none;
    border-top: 1px solid var(--border);
    margin: 2rem 0;
}

:deep(.article-prose table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.9rem;
    overflow-x: auto;
    display: block;
}

:deep(.article-prose th),
:deep(.article-prose td) {
    padding: 0.6rem 0.8rem;
    border: 1px solid var(--border);
    text-align: left;
}

:deep(.article-prose th) {
    background: var(--glass-bg);
    font-weight: 700;
    color: var(--text-1);
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

.rail-card p {
    margin: 0.55rem 0 0;
    color: var(--text-muted);
    line-height: 1.75;
}

.rail-link {
    color: var(--accent);
    font-weight: 700;
}

.cta-link {
    display: inline-flex;
    margin-top: 1rem;
    color: var(--accent);
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
    .rail-card {
        padding: 1rem;
    }
}
</style>
