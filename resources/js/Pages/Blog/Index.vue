<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import type { BlogIndexPageProps } from '@/types/blog'

defineProps<BlogIndexPageProps>()

function formatDate(value: string): string {
    return new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}
</script>

<template>
    <Head title="Blog">
        <meta
            name="description"
            content="Notes on domain-driven architecture, Laravel, Vue, and building production systems that hold up under real load — from Ashish Gupta."
        />
        <link rel="canonical" href="https://www.ashishgupta.dev/blog" />
    </Head>

    <div class="blog-page">
        <header class="hero-shell">
            <div class="topbar">
                <Link href="/" class="brand-link">Ashish Gupta</Link>
                <div class="topbar-links">
                    <Link href="/" class="topbar-link">Portfolio</Link>
                    <Link href="/case-studies" class="topbar-link">Case Studies</Link>
                    <span class="topbar-current">Blog</span>
                </div>
            </div>

            <div class="hero-copy">
                <p class="eyebrow">Field Notes</p>
                <h1>Writing on architecture, Laravel, and shipping systems that last.</h1>
                <p class="hero-text">
                    Longer-form notes on the same craft behind the case studies: domain boundaries,
                    delivery trade-offs, and the decisions that hold up once a system meets real load.
                </p>
            </div>
        </header>

        <main class="library-shell">
            <p v-if="posts.length === 0" class="empty-state">No posts published yet. Check back soon.</p>

            <article v-for="post in posts" :key="post.slug" class="post-card">
                <div class="post-meta-row">
                    <span class="post-date">{{ formatDate(post.publishedAt) }}</span>
                    <span class="post-reading">{{ post.readingTimeMinutes }} min read</span>
                </div>

                <h2 class="post-title">
                    <Link :href="`/blog/${post.slug}`" class="post-title-link">
                        {{ post.title }}
                    </Link>
                </h2>

                <p class="post-excerpt">{{ post.excerpt }}</p>

                <div class="tag-row">
                    <span v-for="tag in post.tags" :key="tag" class="tag-chip">{{ tag }}</span>
                </div>

                <Link :href="`/blog/${post.slug}`" class="read-link">Read post</Link>
            </article>
        </main>
    </div>
</template>

<style scoped>
.blog-page {
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
.post-title-link {
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
    max-width: 13ch;
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

.empty-state {
    color: rgba(226, 232, 240, 0.6);
    font-size: 0.95rem;
}

.post-card {
    padding: 1.7rem 1.8rem;
    border: 1px solid rgba(148, 163, 184, 0.12);
    border-radius: 1.25rem;
    background: rgba(11, 18, 30, 0.82);
    backdrop-filter: blur(10px);
}

.post-meta-row,
.tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
}

.post-meta-row {
    justify-content: space-between;
}

.post-date,
.post-reading {
    font-size: 0.76rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.post-date {
    color: #5eead4;
}

.post-reading {
    color: rgba(226, 232, 240, 0.56);
}

.post-title {
    margin: 1rem 0 0.8rem;
}

.post-title-link {
    color: #f8fafc;
    font-size: clamp(1.6rem, 3vw, 2.3rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
}

.post-title-link:hover,
.read-link:hover {
    color: #5eead4;
}

.post-excerpt {
    margin: 0;
    color: rgba(226, 232, 240, 0.72);
    line-height: 1.8;
}

.tag-row {
    margin-top: 1.2rem;
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

    .post-meta-row {
        justify-content: flex-start;
    }
}
</style>
