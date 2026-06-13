<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
</script>

<template>
    <Head title="Engagements — Ashish Gupta">
        <meta name="description" content="Work with Ashish Gupta — Senior Full-Stack Architect. Project-based builds, retained advisory, and fractional CTO engagements for growing businesses." />
        <meta property="og:title" content="Engagements — Ashish Gupta" />
        <meta property="og:description" content="Work with Ashish Gupta — Senior Full-Stack Architect. Project-based builds, retained advisory, and fractional CTO engagements for growing businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ashishgupta.dev/engagements" />
        <link rel="canonical" href="https://www.ashishgupta.dev/engagements" />
    </Head>

    <div class="page">
        <!-- Top bar -->
        <header class="topbar">
            <Link href="/" class="brand">Ashish Gupta</Link>
            <nav class="topbar-nav">
                <Link href="/" class="topbar-link">Portfolio</Link>
                <Link href="/case-studies" class="topbar-link">Case Studies</Link>
            </nav>
        </header>

        <!-- Hero -->
        <section class="hero">
            <p class="eyebrow">Engagements</p>
            <h1 class="hero-title">Let's build something<br /><span class="accent">worth shipping</span></h1>
            <p class="hero-sub">
                I work with founders, product leads, and engineering teams who need a senior architect
                that codes — not a consultant who only draws diagrams.
            </p>
            <div class="hero-cta-row">
                <a
                    href="https://wa.me/919087021592?text=Hi%20Ashish%2C%20I%20visited%20your%20engagements%20page%20and%20would%20like%20to%20discuss%20a%20project."
                    class="btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Start a conversation →
                </a>
                <a href="mailto:ashishgupta1v@gmail.com" class="btn-ghost">Send an email</a>
            </div>
        </section>

        <!-- Tiers -->
        <section class="tiers">
            <h2 class="section-title">How we can work together</h2>
            <div class="tiers-grid">

                <!-- Tier 1 -->
                <div class="tier-card">
                    <div class="tier-header">
                        <span class="tier-badge">Project</span>
                        <h3 class="tier-name">Fixed-Scope Build</h3>
                        <p class="tier-price">From ₹80,000</p>
                    </div>
                    <p class="tier-desc">
                        A defined deliverable — a new feature, a module migration, a new product version,
                        or a complete greenfield build. Scoped upfront with clear milestones.
                    </p>
                    <ul class="tier-list">
                        <li>Discovery session + written scope document</li>
                        <li>Milestone-based delivery with review checkpoints</li>
                        <li>Clean, tested code with documentation</li>
                        <li>30-day post-launch support window</li>
                    </ul>
                    <p class="tier-ideal">
                        <strong>Best for:</strong> Startups with a clear feature to build, agencies needing
                        white-label architecture capacity, businesses modernizing a legacy component.
                    </p>
                    <a
                        href="https://wa.me/919087021592?text=Hi%20Ashish%2C%20I%20am%20interested%20in%20a%20fixed-scope%20project%20engagement."
                        class="tier-cta"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Discuss this engagement →
                    </a>
                </div>

                <!-- Tier 2 — Featured -->
                <div class="tier-card tier-featured">
                    <div class="tier-header">
                        <span class="tier-badge tier-badge-accent">Retainer</span>
                        <h3 class="tier-name">Monthly Retained</h3>
                        <p class="tier-price">₹60,000 – ₹1,50,000 / month</p>
                    </div>
                    <p class="tier-desc">
                        Ongoing architecture ownership, code delivery, and technical decision-making.
                        I become part of your team — attending standups, reviewing PRs, unblocking engineers,
                        and shipping features week over week.
                    </p>
                    <ul class="tier-list">
                        <li>40–80 hrs/month (scope agreed upfront)</li>
                        <li>Weekly async progress updates</li>
                        <li>Architecture decisions documented</li>
                        <li>Priority response within 4 business hours</li>
                        <li>Quarterly strategy review</li>
                    </ul>
                    <p class="tier-ideal">
                        <strong>Best for:</strong> Series A/B startups without a full-time CTO, product
                        teams scaling faster than their internal capacity, businesses in active growth phase.
                    </p>
                    <a
                        href="https://wa.me/919087021592?text=Hi%20Ashish%2C%20I%20am%20interested%20in%20a%20monthly%20retainer%20engagement."
                        class="tier-cta"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Discuss this engagement →
                    </a>
                </div>

                <!-- Tier 3 -->
                <div class="tier-card">
                    <div class="tier-header">
                        <span class="tier-badge">Advisory</span>
                        <h3 class="tier-name">Fractional CTO</h3>
                        <p class="tier-price">₹30,000 – ₹60,000 / month</p>
                    </div>
                    <p class="tier-desc">
                        Technical leadership without a full-time hire. I guide architecture decisions,
                        interview and evaluate engineers, set quality standards, and represent the
                        technical function in founder and investor conversations.
                    </p>
                    <ul class="tier-list">
                        <li>2–4 strategy sessions per month</li>
                        <li>Architecture review of existing systems</li>
                        <li>Hiring pipeline guidance and technical interviews</li>
                        <li>Board/investor-ready technical roadmaps</li>
                    </ul>
                    <p class="tier-ideal">
                        <strong>Best for:</strong> Non-technical founders building a technical team,
                        businesses preparing for fundraise or audit, early-stage startups that need a
                        technical co-founder but cannot afford one full-time.
                    </p>
                    <a
                        href="https://wa.me/919087021592?text=Hi%20Ashish%2C%20I%20am%20interested%20in%20a%20fractional%20CTO%20engagement."
                        class="tier-cta"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Discuss this engagement →
                    </a>
                </div>

            </div>
        </section>

        <!-- Process -->
        <section class="process">
            <h2 class="section-title">How every engagement starts</h2>
            <ol class="process-steps">
                <li class="process-step">
                    <span class="step-num">01</span>
                    <div>
                        <strong>Discovery call (30 min)</strong>
                        <p>You explain the problem and context. I ask the questions a senior engineer asks before writing a line of code.</p>
                    </div>
                </li>
                <li class="process-step">
                    <span class="step-num">02</span>
                    <div>
                        <strong>Written scope &amp; proposal</strong>
                        <p>I send a written document covering what we'll build, what we won't build, timeline, and price. No surprises later.</p>
                    </div>
                </li>
                <li class="process-step">
                    <span class="step-num">03</span>
                    <div>
                        <strong>Agreement &amp; kickoff</strong>
                        <p>You approve the scope. We agree on tools, communication cadence, and access. Work starts within 3 business days.</p>
                    </div>
                </li>
                <li class="process-step">
                    <span class="step-num">04</span>
                    <div>
                        <strong>Delivery with visibility</strong>
                        <p>Weekly check-ins, asynchronous updates, and a staging environment you can test before anything goes live.</p>
                    </div>
                </li>
            </ol>
        </section>

        <!-- Proof signals -->
        <section class="proof">
            <h2 class="section-title">What past work has delivered</h2>
            <div class="proof-grid">
                <div class="proof-stat">
                    <span class="proof-num">$1M</span>
                    <span class="proof-label">annual infrastructure savings delivered at Infosys</span>
                </div>
                <div class="proof-stat">
                    <span class="proof-num">−59%</span>
                    <span class="proof-label">order-to-dispatch cycle time reduction (knitwear ERP)</span>
                </div>
                <div class="proof-stat">
                    <span class="proof-num">−30%</span>
                    <span class="proof-label">clinical trial monitoring latency reduction</span>
                </div>
                <div class="proof-stat">
                    <span class="proof-num">9+ yrs</span>
                    <span class="proof-label">across Healthcare, Aviation, Logistics, SaaS</span>
                </div>
            </div>
            <div class="proof-cta">
                <Link href="/case-studies" class="btn-ghost-teal">Read the full case studies →</Link>
            </div>
        </section>

        <!-- Final CTA -->
        <section class="final-cta">
            <h2>Ready to start?</h2>
            <p>Message me on WhatsApp — I respond within a few hours on business days.</p>
            <a
                href="https://wa.me/919087021592?text=Hi%20Ashish%2C%20I%20visited%20your%20engagements%20page%20and%20would%20like%20to%20discuss%20working%20together."
                class="btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
            >
                Message on WhatsApp →
            </a>
            <p class="final-alt">Or email <a href="mailto:ashishgupta1v@gmail.com" class="inline-link">ashishgupta1v@gmail.com</a></p>
        </section>

        <!-- Footer -->
        <footer class="footer">
            <p>© {{ new Date().getFullYear() }} Ashish Gupta · India</p>
        </footer>
    </div>
</template>

<style scoped>
.page {
    min-height: 100vh;
    background:
        radial-gradient(circle at 80% 10%, rgba(94, 234, 212, 0.06), transparent 35%),
        linear-gradient(180deg, #050b14 0%, #080e18 50%, #050a12 100%);
    color: #e2e8f0;
    font-family: 'Inter', system-ui, sans-serif;
}

/* ── Top bar ── */
.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2.5rem;
    max-width: 1200px;
    margin: 0 auto;
}
.brand {
    color: #f8fafc;
    font-size: 0.96rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
}
.brand:hover { color: #5eead4; }
.topbar-nav { display: flex; gap: 1.2rem; }
.topbar-link {
    color: rgba(226, 232, 240, 0.6);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    transition: color 0.25s;
}
.topbar-link:hover { color: #5eead4; }

/* ── Section wrapper ── */
.hero,
.tiers,
.process,
.proof,
.final-cta {
    max-width: 1100px;
    margin: 0 auto;
    padding: 4rem 2rem;
}

/* ── Hero ── */
.eyebrow {
    color: #5eead4;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 1rem;
}
.hero-title {
    font-size: clamp(2.8rem, 6vw, 5.2rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
    color: #f8fafc;
    margin: 0 0 1.4rem;
}
.accent { color: #5eead4; }
.hero-sub {
    max-width: 620px;
    font-size: 1.05rem;
    line-height: 1.75;
    color: rgba(226, 232, 240, 0.7);
    margin-bottom: 2rem;
}
.hero-cta-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

/* ── Buttons ── */
.btn-primary {
    display: inline-block;
    background: #5eead4;
    color: #050b14;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.02em;
    padding: 0.8rem 1.8rem;
    border-radius: 4px;
    text-decoration: none;
    transition: opacity 0.25s;
}
.btn-primary:hover { opacity: 0.88; }
.btn-primary.btn-lg { padding: 1rem 2.4rem; font-size: 1rem; }
.btn-ghost {
    display: inline-block;
    color: rgba(226, 232, 240, 0.7);
    font-size: 0.9rem;
    border: 1px solid rgba(148, 163, 184, 0.25);
    padding: 0.8rem 1.8rem;
    border-radius: 4px;
    text-decoration: none;
    transition: border-color 0.25s, color 0.25s;
}
.btn-ghost:hover { border-color: #5eead4; color: #5eead4; }
.btn-ghost-teal {
    color: #5eead4;
    font-size: 0.9rem;
    text-decoration: none;
    border-bottom: 1px solid rgba(94, 234, 212, 0.3);
    padding-bottom: 2px;
    transition: border-color 0.25s;
}
.btn-ghost-teal:hover { border-color: #5eead4; }

/* ── Section title ── */
.section-title {
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 700;
    color: #f8fafc;
    letter-spacing: -0.03em;
    margin-bottom: 2.5rem;
}

/* ── Tiers ── */
.tiers { padding-top: 1rem; }
.tiers-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}
.tier-card {
    background: rgba(8, 14, 24, 0.9);
    border: 1px solid rgba(148, 163, 184, 0.14);
    border-radius: 8px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: border-color 0.25s;
}
.tier-card:hover { border-color: rgba(94, 234, 212, 0.3); }
.tier-featured {
    border-color: rgba(94, 234, 212, 0.4);
    background: rgba(8, 20, 30, 0.95);
}
.tier-badge {
    display: inline-block;
    background: rgba(148, 163, 184, 0.12);
    color: rgba(226, 232, 240, 0.6);
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.25rem 0.65rem;
    border-radius: 3px;
    margin-bottom: 0.3rem;
}
.tier-badge-accent {
    background: rgba(94, 234, 212, 0.12);
    color: #5eead4;
}
.tier-name {
    font-size: 1.35rem;
    font-weight: 700;
    color: #f8fafc;
    margin: 0;
}
.tier-price {
    color: #5eead4;
    font-size: 0.9rem;
    font-weight: 600;
    margin: 0;
}
.tier-desc {
    color: rgba(226, 232, 240, 0.7);
    font-size: 0.9rem;
    line-height: 1.7;
    margin: 0;
}
.tier-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.tier-list li {
    color: rgba(226, 232, 240, 0.75);
    font-size: 0.85rem;
    padding-left: 1.2rem;
    position: relative;
}
.tier-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #5eead4;
    font-size: 0.75rem;
}
.tier-ideal {
    color: rgba(226, 232, 240, 0.55);
    font-size: 0.82rem;
    line-height: 1.6;
    margin: 0;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(148, 163, 184, 0.1);
}
.tier-ideal strong { color: rgba(226, 232, 240, 0.75); }
.tier-cta {
    display: inline-block;
    color: #5eead4;
    font-size: 0.84rem;
    text-decoration: none;
    margin-top: auto;
    transition: opacity 0.2s;
}
.tier-cta:hover { opacity: 0.7; }

/* ── Process ── */
.process-steps {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
}
.process-step {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
}
.step-num {
    color: #5eead4;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    min-width: 2rem;
    padding-top: 0.15rem;
}
.process-step strong {
    color: #f8fafc;
    font-size: 0.95rem;
    display: block;
    margin-bottom: 0.3rem;
}
.process-step p {
    color: rgba(226, 232, 240, 0.65);
    font-size: 0.88rem;
    line-height: 1.65;
    margin: 0;
}

/* ── Proof ── */
.proof-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
}
.proof-stat {
    background: rgba(8, 14, 24, 0.7);
    border: 1px solid rgba(148, 163, 184, 0.12);
    border-radius: 6px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}
.proof-num {
    color: #5eead4;
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: -0.03em;
}
.proof-label {
    color: rgba(226, 232, 240, 0.6);
    font-size: 0.8rem;
    line-height: 1.5;
}
.proof-cta { text-align: center; }

/* ── Final CTA ── */
.final-cta {
    text-align: center;
    border-top: 1px solid rgba(148, 163, 184, 0.1);
    padding-top: 4rem;
}
.final-cta h2 {
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 700;
    color: #f8fafc;
    margin-bottom: 0.8rem;
}
.final-cta > p {
    color: rgba(226, 232, 240, 0.65);
    font-size: 0.95rem;
    margin-bottom: 1.8rem;
}
.final-alt {
    margin-top: 1rem;
    color: rgba(226, 232, 240, 0.45);
    font-size: 0.85rem;
}
.inline-link {
    color: rgba(226, 232, 240, 0.7);
    text-decoration: underline;
    text-underline-offset: 3px;
}

/* ── Footer ── */
.footer {
    text-align: center;
    padding: 2rem;
    color: rgba(148, 163, 184, 0.35);
    font-size: 0.78rem;
    border-top: 1px solid rgba(148, 163, 184, 0.08);
}

/* ── Responsive ── */
@media (max-width: 1000px) {
    .tiers-grid { grid-template-columns: 1fr; max-width: 520px; }
    .proof-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
    .topbar { padding: 1.2rem 1.2rem; }
    .hero, .tiers, .process, .proof, .final-cta { padding: 2.5rem 1.2rem; }
    .proof-grid { grid-template-columns: 1fr 1fr; gap: 1rem; }
    .hero-cta-row { flex-direction: column; }
    .btn-primary, .btn-ghost { text-align: center; }
}
</style>
