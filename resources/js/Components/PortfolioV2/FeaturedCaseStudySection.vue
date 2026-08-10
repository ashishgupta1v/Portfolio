<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

const featuredHref = '/case-studies/zoeticoach-ai-whatsapp-accountability-engine'
</script>

<template>
    <section id="case-studies" class="featured-section">
        <div class="featured-shell">
            <div class="featured-copy">
                <p class="eyebrow">Engineering Deep-Dives</p>
                <h2>Architecture decisions with full context, not just outcomes.</h2>
                <p class="summary">
                    These case studies walk through real systems I've designed and shipped: the trade-offs behind each
                    architecture choice, how I handled scale, and what I'd do differently. The first piece breaks down
                    how ZoetiCoach AI moved from fragile follow-up into a WhatsApp-first accountability engine.
                </p>

                <div class="cta-row">
                    <Link :href="featuredHref" class="primary-cta">Read a real project breakdown</Link>
                    <Link href="/case-studies" class="secondary-cta">Browse all case studies</Link>
                </div>
            </div>

            <aside class="featured-panel">
                <div class="panel-card primary-card">
                    <span class="panel-label">Featured now</span>
                    <h3>ZoetiCoach AI</h3>
                    <p>
                        A systems case study on designing a coaching product where the operating surface is WhatsApp,
                        the unit of truth is accountability evidence, and AI speeds up review instead of pretending to
                        replace it.
                    </p>
                </div>

                <div class="signal-grid">
                    <div class="signal-card">
                        <span class="signal-kicker">Operating surface</span>
                        <strong>WhatsApp-native UX</strong>
                    </div>
                    <div class="signal-card">
                        <span class="signal-kicker">Architecture</span>
                        <strong>Laravel + events + AI review loops</strong>
                    </div>
                    <div class="signal-card">
                        <span class="signal-kicker">Takeaway</span>
                        <strong>How I scope, decide, and ship under real constraints</strong>
                    </div>
                </div>
            </aside>
        </div>
    </section>
</template>

<style scoped>
.featured-section {
    padding: 6.5rem 1.5rem;
    background:
        radial-gradient(circle at 85% 18%, rgba(56, 189, 248, 0.12), transparent 24%),
        radial-gradient(circle at 10% 82%, rgba(20, 184, 166, 0.12), transparent 24%),
        linear-gradient(180deg, var(--section-bg-deep) 0%, var(--bg-secondary) 45%, var(--section-bg-mid) 100%);
}

.featured-shell {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
    gap: 1.6rem;
    align-items: stretch;
}

.featured-copy,
.featured-panel {
    border: 1px solid var(--border);
    background: var(--card-bg-strong);
    backdrop-filter: blur(12px);
}

.featured-copy {
    border-radius: 1.8rem;
    padding: 2rem;
}

.eyebrow,
.panel-label,
.signal-kicker {
    color: var(--accent);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.featured-copy h2 {
    margin: 0.8rem 0 0;
    max-width: 10ch;
    color: var(--text-1);
    font-size: clamp(2.4rem, 4vw, 4.2rem);
    line-height: 0.95;
    letter-spacing: -0.05em;
}

.summary {
    max-width: 58ch;
    margin: 1.2rem 0 0;
    color: var(--text-muted);
    font-size: 1rem;
    line-height: 1.85;
}

.cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.9rem;
    margin-top: 1.6rem;
}

.primary-cta,
.secondary-cta,
.signal-link {
    text-decoration: none;
}

.primary-cta,
.secondary-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    padding: 0 1rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.primary-cta {
    background: var(--accent);
    color: var(--text-on-accent);
}

.primary-cta:hover,
.secondary-cta:hover,
.signal-link:hover {
    transform: translateY(-1px);
}

.secondary-cta {
    border: 1px solid rgba(var(--accent-rgb), 0.28);
    color: var(--text-1);
    background: var(--card-bg);
}

.secondary-cta:hover {
    border-color: rgba(var(--accent-rgb), 0.7);
    color: var(--accent);
}

.featured-panel {
    border-radius: 1.8rem;
    padding: 1.2rem;
    display: grid;
    gap: 0.9rem;
}

.primary-card,
.signal-card {
    border: 1px solid var(--border);
    background: var(--card-bg-strong);
}

.primary-card {
    border-radius: 1.25rem;
    padding: 1.25rem;
}

.primary-card h3 {
    margin: 0.65rem 0 0;
    color: var(--text-1);
    font-size: 1.55rem;
    letter-spacing: -0.03em;
}

.primary-card p {
    margin: 0.85rem 0 0;
    color: var(--text-muted);
    line-height: 1.75;
}

.signal-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.9rem;
}

.signal-card {
    min-height: 8.5rem;
    border-radius: 1.1rem;
    padding: 1rem;
    display: grid;
    align-content: start;
    gap: 0.55rem;
}

.signal-card strong {
    color: var(--text-1);
    font-size: 0.95rem;
    line-height: 1.55;
}

.signal-link {
    color: var(--accent);
    font-size: 0.88rem;
    font-weight: 700;
    line-height: 1.5;
}

@media (max-width: 940px) {
    .featured-shell {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 720px) {
    .featured-section {
        padding: 4.5rem 1rem;
    }

    .featured-copy,
    .featured-panel {
        border-radius: 1.3rem;
        padding: 1rem;
    }

    .signal-grid {
        grid-template-columns: 1fr;
    }
}
</style>