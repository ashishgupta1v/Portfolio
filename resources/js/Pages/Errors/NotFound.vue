<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { ArrowLeft, ArrowUpRight } from 'lucide-vue-next'

defineProps<{
    /** Path the user requested. Not shown by default — used only if we want to
     *  hint at a near-match later. */
    requestedPath?: string
}>()

const suggestions = [
    { label: 'Case Studies', href: '/case-studies', icon: ArrowUpRight },
    { label: 'For Hiring Managers', href: '/for-hiring-managers', icon: ArrowUpRight },
    { label: 'Get in touch', href: '/#contact', icon: ArrowUpRight },
]
</script>

<template>
    <Head title="404 — Page not found — Ashish Gupta" />

    <main class="err-shell">
        <div class="err-wrap">
            <p class="err-code">404</p>
            <h1 class="err-title">The page you were looking for isn't here.</h1>
            <p class="err-sub">
                It may have moved, been renamed, or never existed.
                Here's where most people go from here:
            </p>

            <ul class="err-suggestions">
                <li v-for="s in suggestions" :key="s.href">
                    <Link :href="s.href" class="err-suggest-link">
                        <span>{{ s.label }}</span>
                        <component :is="s.icon" :size="14" />
                    </Link>
                </li>
            </ul>

            <Link href="/" class="err-back">
                <ArrowLeft :size="14" />
                <span>Back to the home page</span>
            </Link>
        </div>
    </main>
</template>

<style scoped>
.err-shell {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 2rem 1.5rem;
    background: radial-gradient(circle at 30% 25%, var(--section-bg-tint) 0%, var(--section-bg-mid) 55%, var(--section-bg-deep) 100%);
    color: var(--text-heading);
}

.err-wrap {
    max-width: 34rem;
    text-align: center;
}

.err-code {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: clamp(4rem, 12vw, 7rem);
    font-weight: 900;
    letter-spacing: -0.05em;
    color: var(--accent);
    line-height: 1;
    margin-bottom: 0.75rem;
}

.err-title {
    font-size: clamp(1.4rem, 3.6vw, 2rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.2;
    text-wrap: balance;
    margin-bottom: 0.75rem;
}

.err-sub {
    color: var(--text-2);
    line-height: 1.65;
    margin-bottom: 1.75rem;
    text-wrap: pretty;
}

.err-suggestions {
    list-style: none;
    display: grid;
    gap: 0.5rem;
    margin: 0 auto 1.75rem;
    padding: 0;
    max-width: 22rem;
}

.err-suggest-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.7rem 1rem;
    border: 1px solid var(--border-strong);
    border-radius: 0.5rem;
    color: var(--text-heading);
    background: var(--card-bg);
    text-decoration: none;
    font-weight: 600;
    transition: border-color 160ms cubic-bezier(0.23, 1, 0.32, 1),
                background-color 160ms cubic-bezier(0.23, 1, 0.32, 1),
                color 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

@media (hover: hover) and (pointer: fine) {
    .err-suggest-link:hover {
        border-color: rgba(var(--accent-rgb), 0.55);
        color: var(--accent);
        background: rgba(var(--accent-rgb), 0.06);
    }
}

.err-back {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.4rem;
    transition: color 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

@media (hover: hover) and (pointer: fine) {
    .err-back:hover { color: var(--accent); }
}
</style>
