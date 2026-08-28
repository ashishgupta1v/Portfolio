<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import {
    ArrowDown,
    ArrowUpRight,
    Award,
    Briefcase,
    Calendar,
    CheckCircle2,
    Clock,
    Code2,
    Database,
    FileText,
    Globe,
    Layers,
    Mail,
    MapPin,
    Shield,
    Sparkles,
    Zap,
} from 'lucide-vue-next'

defineProps<{
    recruiterBrief: {
        targetRole: string
        experience: string
        availability: string
        location: string
        workAuth: string
        timezoneOverlap: string
        domains: string[]
        primaryStack: string[]
    }
}>()

const resumeUrl = '/resume/ashish-gupta-resume.pdf'
const calendlyUrl = 'https://calendly.com/ashishgupta1v/30min'

const skillGroups = [
    {
        category: 'Core Languages & Runtimes',
        icon: Code2,
        skills: ['TypeScript', 'JavaScript (ESNext)', 'PHP 8.4+', 'Python 3.12+', 'SQL (PostgreSQL / MySQL)', 'HTML5 / Modern CSS'],
    },
    {
        category: 'Frontend & Full-Stack UI',
        icon: Layers,
        skills: ['Vue 3 (Composition API / script setup)', 'Inertia.js', 'Tailwind CSS', 'Vite', 'Nuxt.js', 'React / Next.js', 'State Management (Pinia/Zustand)'],
    },
    {
        category: 'Backend & System Architecture',
        icon: Zap,
        skills: ['Laravel 13 Ecosystem', 'Domain-Driven Design (DDD)', 'Modular Monoliths', 'Event-Driven Architecture', 'Strangler Fig Refactoring', 'RESTful & GraphQL APIs', 'Webhook Pipelines'],
    },
    {
        category: 'Data, Vectors & Caching',
        icon: Database,
        skills: ['PostgreSQL & pgvector', 'MySQL & SQLite (WAL)', 'Redis & Redis Horizon', 'Elasticsearch', 'Query Optimization & Indexing', 'Database Migrations'],
    },
    {
        category: 'Cloud, DevOps & Observability',
        icon: Globe,
        skills: ['AWS (S3, RDS, ECS, CloudFront)', 'Docker & Containerization', 'Nginx & Linux Administration', 'GitHub Actions / CI/CD', 'OpenTelemetry & Sentry', 'Zero-Downtime Deployments'],
    },
    {
        category: 'AI Engineering & Tooling',
        icon: Sparkles,
        skills: ['RAG Pipeline Architecture', 'Vector Embeddings & Semantic Search', 'Prompt Injection Defense', 'OpenAI & Anthropic APIs', 'Claude Code / Cursor AI Workflows'],
    },
]

const impacts = [
    {
        metric: '$1M+',
        label: 'Annual Cloud Savings',
        description: 'Engineered query optimization, Redis cache-aside tiers, and container sizing across enterprise monoliths at Infosys.',
    },
    {
        metric: '-30%',
        label: 'Clinical Latency Reduction',
        description: 'Decoupled monolithic bottlenecks into domain-driven modules for healthcare platforms handling sensitive patient records.',
    },
    {
        metric: '99.98%',
        label: 'High-Volume Reliability',
        description: 'Architected event-sourced ledger and WhatsApp Cloud API pipelines with zero hallucination and robust state machines.',
    },
    {
        metric: '9+ Yrs',
        label: 'Production Delivery',
        description: 'Continuous technical leadership from seed startups to enterprise scale across Healthcare, Aviation, and SaaS.',
    },
]

const principles = [
    {
        title: 'Domain-Driven Architecture First',
        description: 'I design bounded contexts and domain events that reflect actual business logic. Code stays modular, testable, and maintainable as team size and complexity grow.',
    },
    {
        title: 'Zero-Downtime Modernization',
        description: 'Experienced in incremental Strangler-Fig migrations — modernizing legacy monolithic codebases into high-performance VILT modules without pausing business operations.',
    },
    {
        title: 'Async Leadership & Clear RFCs',
        description: 'I articulate technical trade-offs through written RFCs and architecture decision records, aligning cross-functional teams and accelerating developer velocity.',
    },
    {
        title: 'Product & Business Alignment',
        description: 'Engineering excellence exists to solve customer problems. I balance technical purity with rapid time-to-market and measurable ROI.',
    },
]
</script>

<template>
    <Head title="For Hiring Managers — Ashish Gupta | Senior Full-Stack Architect">
        <meta name="description" content="Recruiter briefing, target role specifications, availability, timezone overlap, and architectural credentials for Ashish Gupta." />
        <meta property="og:title" content="For Hiring Managers — Ashish Gupta" />
        <meta property="og:description" content="Recruiter briefing, target role specifications, availability, timezone overlap, and architectural credentials for Ashish Gupta." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ashishgupta.dev/hiring" />
        <link rel="canonical" href="https://ashishgupta.dev/hiring" />
    </Head>

    <div class="hiring-page">
        <!-- Top bar navigation -->
        <header class="topbar">
            <Link href="/" class="brand">
                <span class="brand-name">Ashish Gupta</span>
                <span class="brand-role">Senior Full-Stack Architect</span>
            </Link>
            <nav class="topbar-nav" aria-label="Page navigation">
                <Link href="/" class="topbar-link">Home</Link>
                <Link href="/case-studies" class="topbar-link">Case Studies</Link>
                <Link href="/blog" class="topbar-link">Blog</Link>
                <span class="topbar-current">For Hiring Managers</span>
                <a :href="resumeUrl" target="_blank" rel="noopener noreferrer" class="topbar-resume glow-pill">
                    <span>Résumé (PDF)</span>
                    <ArrowUpRight :size="13" aria-hidden="true" />
                </a>
            </nav>
        </header>

        <main class="content-shell">
            <!-- Hero Briefing -->
            <section class="brief-hero">
                <div class="brief-badge-row">
                    <span class="brief-pill glow-pill">
                        <Briefcase :size="13" class="pill-icon" />
                        Recruiter &amp; Hiring Briefing
                    </span>
                    <span class="brief-pill glow-pill-violet">
                        <Clock :size="13" class="pill-icon" />
                        60-Second Overview
                    </span>
                </div>

                <h1 class="hero-title">
                    Senior Full-Stack Architect &amp;
                    <span class="text-gradient">Engineering Leader</span>
                </h1>
                <p class="hero-subtitle">
                    9+ years architecting high-throughput distributed systems, modernizing enterprise monoliths, and shipping production AI applications.
                </p>

                <!-- Action CTA Row -->
                <div class="hero-actions">
                    <a :href="resumeUrl" target="_blank" rel="noopener noreferrer" class="btn-primary glow-pill">
                        <FileText :size="16" />
                        <span>Download ATS Résumé (PDF)</span>
                        <ArrowUpRight :size="14" />
                    </a>
                    <a href="mailto:ashishgupta1v@gmail.com" class="btn-secondary">
                        <Mail :size="16" />
                        <span>Email Ashish Directly</span>
                    </a>
                    <a :href="calendlyUrl" target="_blank" rel="noopener noreferrer" class="btn-ghost">
                        <Calendar :size="16" />
                        <span>Schedule 15-Min Intro Call</span>
                    </a>
                </div>
            </section>

            <!-- Recruiter Fast-Scan Matrix -->
            <section class="fast-scan-section">
                <h2 class="section-heading">
                    <CheckCircle2 :size="18" class="heading-icon" />
                    Hiring Parameters &amp; Availability
                </h2>

                <div class="grid-parameters">
                    <div class="param-card glass-panel">
                        <div class="param-icon-box">
                            <Briefcase :size="18" />
                        </div>
                        <div class="param-content">
                            <span class="param-label">Target Role &amp; Seniority</span>
                            <strong class="param-value">Senior / Staff Full-Stack Architect · Lead Engineer</strong>
                            <p class="param-desc">Individual Contributor or Lead with end-to-end technical ownership and team mentorship.</p>
                        </div>
                    </div>

                    <div class="param-card glass-panel">
                        <div class="param-icon-box">
                            <Clock :size="18" />
                        </div>
                        <div class="param-content">
                            <span class="param-label">Availability &amp; Notice Period</span>
                            <strong class="param-value">Immediately Available · Flexible Start</strong>
                            <p class="param-desc">Ready to onboard quickly or accommodate standard transition timelines.</p>
                        </div>
                    </div>

                    <div class="param-card glass-panel">
                        <div class="param-icon-box">
                            <Globe :size="18" />
                        </div>
                        <div class="param-content">
                            <span class="param-label">Work Authorization &amp; Relocation</span>
                            <strong class="param-value">India (Citizen) · Remote Worldwide · Relocation Open</strong>
                            <p class="param-desc">Fully equipped for global remote roles. Open to visa sponsorship and relocation for exceptional opportunities.</p>
                        </div>
                    </div>

                    <div class="param-card glass-panel">
                        <div class="param-icon-box">
                            <MapPin :size="18" />
                        </div>
                        <div class="param-content">
                            <span class="param-label">Timezone &amp; Overlap</span>
                            <strong class="param-value">IST (UTC+5:30) · 4+ Hrs US Overlap · Full UK/EU Overlap</strong>
                            <p class="param-desc">Extensive track record working synchronously with US East/West Coast, UK/European, and APAC teams.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Quantified Impact -->
            <section class="impact-section">
                <h2 class="section-heading">
                    <Award :size="18" class="heading-icon" />
                    Quantified Engineering Impact
                </h2>

                <div class="impacts-grid">
                    <div v-for="item in impacts" :key="item.label" class="impact-card glass-panel">
                        <span class="impact-metric text-gradient">{{ item.metric }}</span>
                        <h3 class="impact-label">{{ item.label }}</h3>
                        <p class="impact-desc">{{ item.description }}</p>
                    </div>
                </div>
            </section>

            <!-- ATS Scannable Skills Matrix -->
            <section class="skills-section">
                <div class="section-header-row">
                    <div>
                        <h2 class="section-heading">
                            <Code2 :size="18" class="heading-icon" />
                            Technical &amp; Architectural Mastery
                        </h2>
                        <p class="section-sub">Scannable, keyword-matched matrix of production proficiencies.</p>
                    </div>
                </div>

                <div class="skills-grid">
                    <div v-for="group in skillGroups" :key="group.category" class="skill-group-card glass-panel">
                        <div class="group-header">
                            <component :is="group.icon" :size="18" class="group-icon" />
                            <h3 class="group-title">{{ group.category }}</h3>
                        </div>
                        <div class="skill-badges">
                            <span v-for="skill in group.skills" :key="skill" class="skill-badge">
                                {{ skill }}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Architectural Philosophy -->
            <section class="philosophy-section">
                <h2 class="section-heading">
                    <Shield :size="18" class="heading-icon" />
                    How I Lead &amp; Ship Systems
                </h2>

                <div class="principles-grid">
                    <div v-for="item in principles" :key="item.title" class="principle-card glass-panel">
                        <h3 class="principle-title">{{ item.title }}</h3>
                        <p class="principle-desc">{{ item.description }}</p>
                    </div>
                </div>
            </section>

            <!-- Contact & Next Steps -->
            <section class="bottom-cta-section glass-panel">
                <div class="cta-inner">
                    <h2 class="cta-title">Ready to Discuss an Engineering Role?</h2>
                    <p class="cta-subtitle">
                        Let's connect to discuss how I can contribute to your engineering organization, accelerate system reliability, and lead full-stack initiatives.
                    </p>
                    <div class="cta-buttons">
                        <a :href="resumeUrl" target="_blank" rel="noopener noreferrer" class="btn-primary glow-pill">
                            <FileText :size="16" />
                            <span>View Full Résumé</span>
                            <ArrowUpRight :size="14" />
                        </a>
                        <a href="mailto:ashishgupta1v@gmail.com" class="btn-secondary">
                            <Mail :size="16" />
                            <span>ashishgupta1v@gmail.com</span>
                        </a>
                        <a href="https://www.linkedin.com/in/ashishgupta1v/" target="_blank" rel="noopener noreferrer" class="btn-ghost">
                            <Globe :size="16" />
                            <span>LinkedIn Profile</span>
                            <ArrowUpRight :size="14" />
                        </a>
                    </div>
                </div>
            </section>
        </main>

        <!-- Minimal Footer -->
        <footer class="hiring-footer">
            <div class="footer-inner">
                <span>© {{ new Date().getFullYear() }} Ashish Gupta · Senior Full-Stack Architect</span>
                <div class="footer-links">
                    <Link href="/" class="footer-link">Portfolio</Link>
                    <Link href="/case-studies" class="footer-link">Case Studies</Link>
                    <Link href="/privacy" class="footer-link">Privacy</Link>
                    <Link href="/terms" class="footer-link">Terms</Link>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.hiring-page {
    min-height: 100vh;
    background: var(--bg-primary);
    color: var(--text-1);
    font-family: inherit;
}

/* ── Topbar ── */
.topbar {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: rgba(9, 14, 20, 0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
}

.brand {
    display: flex;
    flex-direction: column;
    text-decoration: none;
}

.brand-name {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-1);
}

.brand-role {
    font-size: 0.72rem;
    color: var(--accent);
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.topbar-nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.topbar-link {
    color: var(--text-2);
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s;
}

.topbar-link:hover {
    color: var(--accent);
}

.topbar-current {
    color: var(--accent);
    font-size: 0.85rem;
    font-weight: 700;
}

.topbar-resume {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.45rem 0.9rem;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--text-on-accent);
    background: var(--accent);
    border-radius: 999px;
    text-decoration: none;
    transition: opacity 0.2s;
}

.topbar-resume:hover {
    opacity: 0.9;
}

/* ── Content Shell ── */
.content-shell {
    max-width: 1140px;
    margin: 0 auto;
    padding: 4rem 1.5rem 6rem;
    display: flex;
    flex-direction: column;
    gap: 4.5rem;
}

/* ── Hero Brief ── */
.brief-hero {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
}

.brief-badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.brief-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.9rem;
    font-size: 0.78rem;
    font-weight: 600;
    border-radius: 999px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.pill-icon {
    flex-shrink: 0;
}

.hero-title {
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 850;
    line-height: 1.15;
    color: var(--text-heading);
    letter-spacing: -0.02em;
    margin: 0;
}

.hero-subtitle {
    font-size: 1.15rem;
    color: var(--text-2);
    line-height: 1.6;
    max-width: 780px;
    margin: 0;
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    margin-top: 0.8rem;
}

/* ── Buttons ── */
.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.8rem 1.6rem;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-light, #2dd4bf) 100%);
    color: #03211e;
    font-size: 0.88rem;
    font-weight: 750;
    border-radius: 999px;
    text-decoration: none;
    box-shadow: 0 0 20px rgba(94, 234, 212, 0.35);
    transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 28px rgba(94, 234, 212, 0.5);
}

.btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.8rem 1.4rem;
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-1);
    font-size: 0.88rem;
    font-weight: 650;
    border: 1px solid var(--border-strong);
    border-radius: 999px;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
}

.btn-secondary:hover {
    background: rgba(var(--accent-rgb), 0.08);
    border-color: rgba(var(--accent-rgb), 0.4);
    color: var(--accent);
}

.btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.8rem 1.2rem;
    background: transparent;
    color: var(--text-2);
    font-size: 0.88rem;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s;
}

.btn-ghost:hover {
    color: var(--accent);
}

/* ── Section Structure ── */
.section-heading {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 1.35rem;
    font-weight: 750;
    color: var(--text-heading);
    margin: 0 0 1.5rem;
    letter-spacing: -0.01em;
}

.heading-icon {
    color: var(--accent);
}

.section-sub {
    color: var(--text-3);
    font-size: 0.9rem;
    margin-top: -1rem;
    margin-bottom: 1.5rem;
}

/* ── Parameter Grid ── */
.grid-parameters {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
}

.param-card {
    display: flex;
    align-items: flex-start;
    gap: 1.2rem;
    padding: 1.6rem;
    border-radius: 1rem;
}

.param-icon-box {
    width: 42px;
    height: 42px;
    border-radius: 0.75rem;
    background: rgba(var(--accent-rgb), 0.1);
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.param-content {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.param-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-3);
    font-weight: 600;
}

.param-value {
    font-size: 1rem;
    color: var(--text-1);
    font-weight: 700;
    line-height: 1.35;
}

.param-desc {
    font-size: 0.84rem;
    color: var(--text-2);
    line-height: 1.45;
    margin: 0.2rem 0 0;
}

/* ── Impacts Grid ── */
.impacts-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
}

.impact-card {
    padding: 1.8rem 1.5rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.impact-metric {
    font-size: 2.2rem;
    font-weight: 900;
    line-height: 1;
    font-variant-numeric: tabular-nums;
}

.impact-label {
    font-size: 0.95rem;
    font-weight: 750;
    color: var(--text-heading);
    margin: 0.3rem 0 0;
}

.impact-desc {
    font-size: 0.82rem;
    color: var(--text-2);
    line-height: 1.45;
    margin: 0;
}

/* ── Skills Grid ── */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
}

.skill-group-card {
    padding: 1.6rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.group-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

.group-icon {
    color: var(--accent);
}

.group-title {
    font-size: 0.95rem;
    font-weight: 750;
    color: var(--text-heading);
    margin: 0;
}

.skill-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.skill-badge {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-1);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    padding: 0.35rem 0.75rem;
    border-radius: 0.5rem;
    transition: border-color 0.2s, background 0.2s;
}

.skill-badge:hover {
    border-color: rgba(var(--accent-rgb), 0.4);
    background: rgba(var(--accent-rgb), 0.06);
    color: var(--accent);
}

/* ── Principles ── */
.principles-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
}

.principle-card {
    padding: 1.8rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.principle-title {
    font-size: 1.05rem;
    font-weight: 750;
    color: var(--text-heading);
    margin: 0;
}

.principle-desc {
    font-size: 0.88rem;
    color: var(--text-2);
    line-height: 1.55;
    margin: 0;
}

/* ── Bottom CTA ── */
.bottom-cta-section {
    padding: 3rem 2.5rem;
    border-radius: 1.25rem;
    text-align: center;
}

.cta-inner {
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.cta-title {
    font-size: clamp(1.6rem, 3.5vw, 2.2rem);
    font-weight: 800;
    color: var(--text-heading);
    margin: 0;
}

.cta-subtitle {
    font-size: 1rem;
    color: var(--text-2);
    line-height: 1.6;
    margin: 0 0 0.8rem;
}

.cta-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

/* ── Footer ── */
.hiring-footer {
    border-top: 1px solid var(--border);
    padding: 2rem 1.5rem;
    background: rgba(9, 14, 20, 0.95);
}

.footer-inner {
    max-width: 1140px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.82rem;
    color: var(--text-3);
}

.footer-links {
    display: flex;
    gap: 1.5rem;
}

.footer-link {
    color: var(--text-3);
    text-decoration: none;
    transition: color 0.2s;
}

.footer-link:hover {
    color: var(--accent);
}

/* ── Responsive ── */
@media (max-width: 900px) {
    .grid-parameters,
    .skills-grid,
    .principles-grid {
        grid-template-columns: 1fr;
    }

    .impacts-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 640px) {
    .topbar {
        padding: 0.8rem 1rem;
    }

    .topbar-nav {
        display: none;
    }

    .content-shell {
        padding: 2rem 1rem 4rem;
        gap: 3rem;
    }

    .impacts-grid {
        grid-template-columns: 1fr;
    }

    .footer-inner {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
}
</style>
