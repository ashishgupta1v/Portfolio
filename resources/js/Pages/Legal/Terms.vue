<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
</script>

<template>
    <Head title="Terms of Service — Ashish Gupta">
        <meta name="description" content="Terms of Service for ashishgupta.dev — personal portfolio and architectural advisory terms." />
        <meta property="og:title" content="Terms of Service — Ashish Gupta" />
        <meta property="og:description" content="Terms of Service for ashishgupta.dev." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ashishgupta.dev/terms" />
        <link rel="canonical" href="https://ashishgupta.dev/terms" />
    </Head>

    <div class="page">
        <!-- Top bar -->
        <header class="topbar">
            <Link href="/" class="brand">Ashish Gupta</Link>
            <nav class="topbar-nav">
                <Link href="/" class="topbar-link">Portfolio</Link>
                <Link href="/case-studies" class="topbar-link">Case Studies</Link>
                <Link href="/engagements" class="topbar-link">Engagements</Link>
                <Link href="/blog" class="topbar-link">Blog</Link>
            </nav>
        </header>

        <main class="content-shell">
            <header class="doc-header">
                <p class="eyebrow">Legal &amp; Terms</p>
                <h1 class="doc-title">Terms of Service</h1>
                <p class="last-updated">Last Updated: August 2026</p>
            </header>

            <article class="prose-content">
                <section class="section-block">
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By accessing or using the website at <strong>ashishgupta.dev</strong>, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please discontinue use of this site.
                    </p>
                </section>

                <section class="section-block">
                    <h2>2. Intellectual Property</h2>
                    <p>
                        Unless otherwise noted, all content, design layouts, articles, code samples, graphics, and architectural documentation presented on this site are the intellectual property of Ashish Gupta.
                    </p>
                    <p>
                        Client logos, trademarked names, and third-party brands referenced in case studies remain the property of their respective owners and are mentioned strictly for identification and portfolio demonstration purposes.
                    </p>
                </section>

                <section class="section-block">
                    <h2>3. Advisory &amp; Estimates</h2>
                    <p>
                        The case studies, performance benchmarks, and pricing estimates shown on this website (including on the <Link href="/engagements" class="accent-link">Engagements page</Link>) are indicative and illustrative. Official engineering engagements and deliverables are governed exclusively by formal, written Statement of Work (SOW) agreements.
                    </p>
                </section>

                <section class="section-block">
                    <h2>4. Limitation of Liability</h2>
                    <p>
                        This website and its content are provided on an "as is" and "as available" basis without warranties of any kind. Ashish Gupta shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this website.
                    </p>
                </section>

                <section class="section-block">
                    <h2>5. Contact Information</h2>
                    <p>
                        For any questions regarding these terms, please reach out directly:
                        <br />
                        <a href="mailto:ashishgupta1v@gmail.com" class="accent-link">ashishgupta1v@gmail.com</a>
                    </p>
                </section>
            </article>

            <footer class="doc-footer">
                <Link href="/" class="btn-back">← Back to Portfolio</Link>
            </footer>
        </main>
    </div>
</template>

<style scoped>
.page {
    min-height: 100vh;
    background: var(--bg-primary);
    color: var(--text-1);
    font-family: inherit;
    padding-bottom: 5rem;
}

.topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 2rem;
    max-width: 1100px;
    margin: 0 auto;
    border-bottom: 1px solid var(--border);
}

.brand {
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-1);
    text-decoration: none;
    letter-spacing: 0.04em;
}

.topbar-nav {
    display: flex;
    gap: 1.5rem;
}

.topbar-link {
    color: var(--text-2);
    font-size: 0.85rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
}

.topbar-link:hover {
    color: var(--accent);
}

.content-shell {
    max-width: 820px;
    margin: 3.5rem auto 0;
    padding: 0 1.5rem;
}

.doc-header {
    margin-bottom: 2.5rem;
    border-bottom: 1px solid var(--border);
    padding-bottom: 1.5rem;
}

.eyebrow {
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--accent);
    margin-bottom: 0.5rem;
}

.doc-title {
    font-size: clamp(2rem, 4vw, 2.75rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--text-1);
    margin-bottom: 0.5rem;
}

.last-updated {
    font-size: 0.84rem;
    color: var(--text-3);
}

.prose-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    line-height: 1.7;
    color: var(--text-body);
    font-size: 0.96rem;
}

.section-block h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-1);
    margin-bottom: 0.75rem;
}

.section-block p {
    margin-bottom: 0.85rem;
}

.accent-link {
    color: var(--accent);
    text-decoration: underline;
    font-weight: 600;
}

.doc-footer {
    margin-top: 4rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
}

.btn-back {
    display: inline-flex;
    align-items: center;
    padding: 0.55rem 1.2rem;
    border-radius: 999px;
    background: var(--surface-raised);
    border: 1px solid var(--border);
    color: var(--text-1);
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
}

.btn-back:hover {
    border-color: var(--accent);
    color: var(--accent);
}

@media (max-width: 640px) {
    .topbar {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
        padding: 1rem 1.25rem;
    }
}
</style>
