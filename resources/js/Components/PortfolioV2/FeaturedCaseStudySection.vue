<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

const featuredHref = '/case-studies/zoeticoach-ai-whatsapp-accountability-engine'
</script>

<template>
    <section id="case-studies" class="featured-section">
        <div class="featured-ambient-glow" aria-hidden="true" />
        <div class="featured-shell">
            <div class="featured-copy glass-panel">
                <span class="eyebrow glow-pill">Engineering Deep-Dives</span>
                <h2 class="featured-heading">
                    <span class="text-gradient-hero">Architecture decisions</span> with full context.
                </h2>
                <p class="summary">
                    These case studies walk through real production systems I've designed and shipped: the architectural trade-offs, how I handled high concurrency and scale, and measurable business outcomes. The flagship breakdown reveals how ZoetiCoach AI scaled into a WhatsApp-first autonomous accountability engine.
                </p>

                <div class="cta-row">
                    <Link :href="featuredHref" class="primary-cta glow-pill">Read Deep-Dive Breakdown ↗</Link>
                    <Link href="/case-studies" class="secondary-cta">Browse All Case Studies</Link>
                </div>
            </div>

            <aside class="featured-panel glass-panel">
                <div class="panel-card primary-card">
                    <div class="panel-header-row">
                        <span class="panel-label glow-pill">Featured System</span>
                        <div class="metric-badges-row">
                            <span class="feat-metric glow-pill">⚡ 99.8% Bot Uptime</span>
                            <span class="feat-metric glow-pill-violet">✦ Sub-Second RAG</span>
                        </div>
                    </div>
                    <h3>ZoetiCoach AI</h3>
                    <p>
                        A systems deep-dive on engineering a coaching product where the operating surface is WhatsApp, the unit of truth is accountability evidence ledgers, and AI speeds up human review loops with prompt-injection defense.
                    </p>
                </div>

                <div class="signal-grid">
                    <div class="signal-card glass-panel">
                        <span class="signal-kicker">Operating surface</span>
                        <strong>WhatsApp-Native UX</strong>
                    </div>
                    <div class="signal-card glass-panel">
                        <span class="signal-kicker">Architecture</span>
                        <strong>Laravel Events + Vector RAG</strong>
                    </div>
                    <div class="signal-card glass-panel">
                        <span class="signal-kicker">Measured Impact</span>
                        <strong>3.4x Higher Daily Active Retention</strong>
                    </div>
                </div>
            </aside>
        </div>
    </section>
</template>

<style scoped>
.featured-section {
    position: relative;
    padding: 7rem 1.5rem 6.5rem;
    background: linear-gradient(180deg, var(--section-bg-deep) 0%, var(--bg-secondary) 45%, var(--section-bg-mid) 100%);
    overflow: hidden;
}

.featured-ambient-glow {
    position: absolute;
    top: 20%;
    left: 20%;
    width: 600px;
    height: 400px;
    background: radial-gradient(circle, rgba(94, 234, 212, 0.09) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%);
    filter: blur(60px);
    pointer-events: none;
}

.featured-shell {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(340px, 0.95fr);
    gap: 1.8rem;
    align-items: stretch;
    position: relative;
    z-index: 1;
}

.featured-copy,
.featured-panel {
    border-radius: 1.5rem;
    background: var(--card-bg-strong);
    box-shadow: var(--shadow-elevation-1);
}

.featured-copy {
    padding: 2.5rem 2.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.featured-heading {
    margin: 1rem 0 0;
    color: var(--text-1);
    font-size: clamp(2.2rem, 3.8vw, 3.6rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
    font-weight: 850;
}

.eyebrow {
    align-self: flex-start;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.25rem 0.75rem;
}

.panel-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.85rem;
}

.metric-badges-row {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    flex-wrap: wrap;
}

.feat-metric {
    font-size: 0.68rem;
    font-weight: 700;
    padding: 0.2rem 0.55rem;
    letter-spacing: 0.04em;
}

.panel-label,
.signal-kicker {
    color: var(--accent);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.summary {
    max-width: 58ch;
    margin: 1.2rem 0 0;
    color: var(--text-2);
    font-size: 0.98rem;
    line-height: 1.75;
}

.cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1.8rem;
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
    min-height: 2.8rem;
    padding: 0 1.25rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.primary-cta {
    background: linear-gradient(135deg, #5eead4, #2dd4bf);
    color: #03211e;
    box-shadow: 0 0 20px rgba(94, 234, 212, 0.3);
}

.primary-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(94, 234, 212, 0.45);
}

.secondary-cta {
    background: rgba(255, 255, 255, 0.06);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.12);
}

.secondary-cta:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(94, 234, 212, 0.4);
    transform: translateY(-2px);
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