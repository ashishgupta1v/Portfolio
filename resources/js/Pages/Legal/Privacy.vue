<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
</script>

<template>
    <Head title="Privacy Policy — Ashish Gupta">
        <meta name="description" content="Privacy Policy for ashishgupta.dev — details regarding data collection, contact information handling, and local storage usage." />
        <meta property="og:title" content="Privacy Policy — Ashish Gupta" />
        <meta property="og:description" content="Privacy Policy for ashishgupta.dev." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ashishgupta.dev/privacy" />
        <link rel="canonical" href="https://ashishgupta.dev/privacy" />
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
                <p class="eyebrow">Legal &amp; Privacy</p>
                <h1 class="doc-title">Privacy Policy</h1>
                <p class="last-updated">Last Updated: August 2026</p>
            </header>

            <article class="prose-content">
                <section class="section-block">
                    <h2>1. Overview</h2>
                    <p>
                        This Privacy Policy outlines how Ashish Gupta ("I", "me", or "my") operates the personal engineering portfolio website located at <strong>ashishgupta.dev</strong>. I am committed to respecting your privacy and protecting any personal information you provide while browsing this site.
                    </p>
                </section>

                <section class="section-block">
                    <h2>2. Information Collected</h2>
                    <p>
                        I collect minimal personal data necessary to facilitate communication and provide an optimal viewing experience:
                    </p>
                    <ul>
                        <li><strong>Contact Form Inquiries:</strong> When you submit a project inquiry or contact request, I collect your name, email address, inquiry subject/type, and message content. This data is used exclusively to respond to your inquiry and is never sold or shared with third parties.</li>
                        <li><strong>Local Storage:</strong> This website utilizes client-side <code>localStorage</code> solely to persist your theme preference (dark/light) and non-invasive session acknowledgment. No cross-site tracking cookies are deployed.</li>
                        <li><strong>Server Logs &amp; Anonymous Telemetry:</strong> Standard web server access logs (IP address, user agent, requested URLs) are processed for infrastructure security, performance monitoring, and DDOS mitigation. Privacy-focused, cookie-free analytics (e.g., Plausible) may be used to measure aggregate visitor counts without profiling individuals.</li>
                    </ul>
                </section>

                <section class="section-block">
                    <h2>3. Data Retention &amp; Security</h2>
                    <p>
                        Contact inquiries are securely delivered and retained only for as long as needed to conduct business communications. All traffic is encrypted in transit using Transport Layer Security (TLS/HTTPS).
                    </p>
                </section>

                <section class="section-block">
                    <h2>4. Third-Party Services</h2>
                    <p>
                        This website may include links to external websites (e.g., GitHub, LinkedIn, live client platforms). I am not responsible for the privacy practices or content of third-party domains.
                    </p>
                </section>

                <section class="section-block">
                    <h2>5. Your Rights</h2>
                    <p>
                        Under applicable privacy regulations (including GDPR and the India Digital Personal Data Protection Act), you have the right to request access to, rectification of, or deletion of any personal communications you have submitted.
                    </p>
                    <p>
                        To exercise these rights or for any privacy-related inquiries, please contact me directly at:
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

.section-block ul {
    margin: 0.75rem 0 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
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
