<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import {
    ArrowUpRight,
    Award,
    Briefcase,
    Calendar,
    CheckCircle2,
    Clock,
    Code2,
    FileText,
    Globe,
    Layers,
    Mail,
    Shield,
    Sparkles,
    Users,
    Zap,
} from 'lucide-vue-next'

defineProps<{
    recruiterBrief?: {
        targetRole?: string
        experience?: string
        availability?: string
        location?: string
        workAuth?: string
        timezoneOverlap?: string
        domains?: string[]
        primaryStack?: string[]
    }
}>()

const resumeUrl = '/resume/ashish-gupta-resume.pdf'
const emailHref = 'mailto:ashishgupta1v@gmail.com'
const linkedinUrl = 'https://www.linkedin.com/in/ashishgupta1v/'
const calendlyUrl = 'https://calendly.com/ashishgupta1v/30min'
const githubUrl = 'https://github.com/ashishgupta1v'

const snapshot = [
    { label: 'Status', value: 'Actively interviewing — open to full-time' },
    { label: 'Target role', value: 'Senior / Staff / Lead Full-Stack Engineer · Architect' },
    { label: 'Availability', value: 'Immediate / Flexible start' },
    { label: 'Location', value: 'India · Remote-first / Open to relocation for top-tier roles' },
    { label: 'Time zone', value: 'IST (UTC+5:30) · 4–6 hrs daily dedicated overlap with US (EST/PST) & full UK/EU overlap' },
    { label: 'Work authorization', value: 'Authorized to work in India · Open to Remote Worldwide & Visa Sponsorship/Relocation' },
    { label: 'Comp', value: 'Open to discuss based on role scope and impact' },
]

const conversationPoints = [
    {
        metric: '$1M/year',
        label: 'Cloud-Infrastructure Savings',
        description: 'Through architectural optimization, query tuning, and cache-aside layers at Infosys.',
    },
    {
        metric: '−30%',
        label: 'Clinical Latency Reduction',
        description: 'Clinical-trial monitoring latency via Redis Queues + real-time sync ($360K saved in 2024).',
    },
    {
        metric: '−59%',
        label: 'Cycle Time Reduction',
        description: 'Order-to-dispatch cycle time improvement through knitwear ERP legacy modernization.',
    },
    {
        metric: '+60%',
        label: 'User Efficiency Gain',
        description: 'Increase in user workflow efficiency modernizing legacy healthcare monoliths with DDD.',
    },
    {
        metric: 'Squad of 7',
        label: 'Engineering Leadership',
        description: 'Led technical squad; enforced Pest/Vitest automated testing standards for 0-defect deployments.',
    },
]

const howIWork = [
    {
        title: 'Domain-Driven Design',
        subtitle: 'Legacy monoliths → decoupled modular monoliths with clean bounded contexts and domain events.',
        icon: Layers,
    },
    {
        title: 'Production AI & Vector RAG',
        subtitle: 'RAG pipelines (OpenAI + pgvector), grounded and hallucination-resistant with prompt-injection defense.',
        icon: Sparkles,
    },
    {
        title: 'Performance & Resilience',
        subtitle: 'Event-driven architecture, Redis-first patterns, zero-downtime Strangler migrations, and Sentry observability.',
        icon: Zap,
    },
    {
        title: 'Team Leadership & Standards',
        subtitle: 'Mentoring engineers, fostering an RFC/code-review culture, and enforcing automated test discipline.',
        icon: Users,
    },
]

const coreStack = {
    languages: 'PHP, JavaScript, TypeScript, Python, SQL',
    frameworks: 'Laravel 13, Vue 3, Inertia.js, Node.js, Nuxt.js, React / Next.js',
    data: 'PostgreSQL, MySQL, Redis, pgvector, SQLite (WAL)',
    cloud: 'AWS (S3, RDS, ECS, CloudFront), Docker, Nginx, Jenkins, GitHub Actions',
    practices: 'DDD, SOLID, Modular Monoliths, RESTful APIs, Event-Driven Systems',
}
</script>

<template>
    <Head title="For Hiring Managers & Recruiters — Ashish Gupta (Senior Full-Stack Architect)">
        <meta name="description" content="9+ years shipping production systems end-to-end — Vue, Laravel, DDD, and AI. Senior Full-Stack Architect open to full-time roles." />
        <meta property="og:title" content="For Hiring Managers & Recruiters — Ashish Gupta" />
        <meta property="og:description" content="9+ years shipping production systems end-to-end — Vue, Laravel, DDD, and AI. Senior Full-Stack Architect open to full-time roles." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ashishgupta.dev/for-hiring-managers" />
        <link rel="canonical" href="https://ashishgupta.dev/for-hiring-managers" />
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
                    <span>RÉSUMÉ (PDF)</span>
                    <ArrowUpRight :size="13" aria-hidden="true" />
                </a>
            </nav>
        </header>

        <main class="content-shell">
            <!-- Hero Section -->
            <section class="brief-hero">
                <div class="brief-badge-row">
                    <span class="brief-pill glow-pill">
                        <Briefcase :size="13" class="pill-icon" />
                        For Hiring Managers &amp; Recruiters
                    </span>
                    <span class="brief-pill glow-pill-violet">
                        <Clock :size="13" class="pill-icon" />
                        Executive Snapshot
                    </span>
                </div>

                <h1 class="hero-title">
                    Senior Full-Stack Architect, <span class="text-gradient">open to full-time roles.</span>
                </h1>
                <p class="hero-subtitle">
                    9+ years shipping production systems end-to-end — Vue, Laravel, DDD, and AI. I modernize legacy monoliths into scalable, domain-driven platforms and own them from architecture through production.
                </p>

                <!-- Primary CTAs -->
                <div class="hero-actions">
                    <a :href="resumeUrl" target="_blank" rel="noopener noreferrer" class="btn-primary glow-pill">
                        <FileText :size="16" />
                        <span>Download Résumé (PDF)</span>
                        <ArrowUpRight :size="14" />
                    </a>
                    <a :href="emailHref" class="btn-secondary">
                        <Mail :size="16" />
                        <span>Email me</span>
                    </a>
                    <a :href="linkedinUrl" target="_blank" rel="noopener noreferrer" class="btn-ghost">
                        <Globe :size="16" />
                        <span>Connect on LinkedIn</span>
                        <ArrowUpRight :size="14" />
                    </a>
                    <a :href="calendlyUrl" target="_blank" rel="noopener noreferrer" class="btn-ghost">
                        <Calendar :size="16" />
                        <span>Book a 20-min call</span>
                        <ArrowUpRight :size="14" />
                    </a>
                </div>
            </section>

            <!-- Snapshot Fact Bar -->
            <section class="snapshot-section">
                <div class="section-heading-row">
                    <h2 class="section-heading">
                        <CheckCircle2 :size="18" class="heading-icon" />
                        Snapshot
                    </h2>
                    <span class="section-heading-hint">A scannable fact bar for recruiting teams</span>
                </div>

                <div class="snapshot-card glass-panel">
                    <table class="snapshot-table">
                        <tbody>
                            <tr v-for="item in snapshot" :key="item.label" class="snapshot-row">
                                <td class="snapshot-label">{{ item.label }}</td>
                                <td class="snapshot-value">{{ item.value }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- What I'm Looking For -->
            <section class="seeking-section">
                <div class="seeking-card glass-panel">
                    <h2 class="seeking-title">
                        <Briefcase :size="20" class="heading-icon" />
                        What I'm looking for
                    </h2>
                    <p class="seeking-body">
                        A senior/staff role where <strong>ownership matters</strong> — taking systems from architecture through production, mentoring engineers, and shipping measurable outcomes. Strongest in <strong>fast-moving product teams</strong> modernizing complex domains (Healthcare, Aviation, Logistics, SaaS).
                    </p>
                </div>
            </section>

            <!-- Why I'm Worth a Conversation -->
            <section class="conversation-section">
                <h2 class="section-heading">
                    <Award :size="18" class="heading-icon" />
                    Why I'm worth a conversation
                </h2>

                <div class="conversation-grid">
                    <div v-for="point in conversationPoints" :key="point.label" class="conv-card glass-panel">
                        <div class="conv-metric text-gradient">{{ point.metric }}</div>
                        <h3 class="conv-label">{{ point.label }}</h3>
                        <p class="conv-desc">{{ point.description }}</p>
                    </div>
                </div>
            </section>

            <!-- How I Work -->
            <section class="how-i-work-section">
                <h2 class="section-heading">
                    <Shield :size="18" class="heading-icon" />
                    How I work
                </h2>

                <div class="how-grid">
                    <div v-for="item in howIWork" :key="item.title" class="how-card glass-panel">
                        <div class="how-header">
                            <component :is="item.icon" :size="20" class="how-icon" />
                            <h3 class="how-title">{{ item.title }}</h3>
                        </div>
                        <p class="how-desc">{{ item.subtitle }}</p>
                    </div>
                </div>
            </section>

            <!-- Core Stack -->
            <section class="stack-section">
                <h2 class="section-heading">
                    <Code2 :size="18" class="heading-icon" />
                    Core stack
                </h2>

                <div class="stack-card glass-panel">
                    <div class="stack-item">
                        <span class="stack-category">Languages</span>
                        <span class="stack-values">{{ coreStack.languages }}</span>
                    </div>
                    <div class="stack-item">
                        <span class="stack-category">Frameworks</span>
                        <span class="stack-values">{{ coreStack.frameworks }}</span>
                    </div>
                    <div class="stack-item">
                        <span class="stack-category">Data</span>
                        <span class="stack-values">{{ coreStack.data }}</span>
                    </div>
                    <div class="stack-item">
                        <span class="stack-category">Cloud / DevOps</span>
                        <span class="stack-values">{{ coreStack.cloud }}</span>
                    </div>
                    <div class="stack-item">
                        <span class="stack-category">Practices</span>
                        <span class="stack-values">{{ coreStack.practices }}</span>
                    </div>
                </div>
            </section>

            <!-- Proof Links -->
            <section class="proof-section">
                <h2 class="section-heading">
                    <Sparkles :size="18" class="heading-icon" />
                    Proof &amp; Systems in Production
                </h2>

                <div class="proof-grid">
                    <Link href="/case-studies" class="proof-card glass-panel">
                        <span class="proof-title">Read the case studies</span>
                        <span class="proof-arrow">→</span>
                    </Link>
                    <a href="/#work" class="proof-card glass-panel">
                        <span class="proof-title">Browse my work</span>
                        <span class="proof-arrow">→</span>
                    </a>
                    <a :href="githubUrl" target="_blank" rel="noopener noreferrer" class="proof-card glass-panel">
                        <span class="proof-title">GitHub</span>
                        <span class="proof-arrow">↗</span>
                    </a>
                    <a :href="resumeUrl" target="_blank" rel="noopener noreferrer" class="proof-card glass-panel proof-card--highlight">
                        <span class="proof-title">Download résumé (PDF)</span>
                        <span class="proof-arrow">↓</span>
                    </a>
                </div>
            </section>

            <!-- References -->
            <section class="references-section">
                <div class="references-card glass-panel">
                    <h2 class="references-title">
                        <Users :size="20" class="heading-icon" />
                        References
                    </h2>
                    <p class="references-body">
                        Recommendations available on <a :href="linkedinUrl" target="_blank" rel="noopener noreferrer" class="inline-link">LinkedIn</a> — plus the manager and engineering quotes featured on the homepage. Happy to arrange reference calls on request.
                    </p>
                </div>
            </section>

            <!-- Close Section -->
            <section class="close-section glass-panel">
                <div class="close-inner">
                    <h2 class="close-title">Let's talk about the role.</h2>
                    <p class="close-body">
                        The fastest way to reach me is email or LinkedIn — I reply within a business day.
                    </p>
                    <div class="close-buttons">
                        <a :href="emailHref" class="btn-primary glow-pill">
                            <Mail :size="16" />
                            <span>Email ashishgupta1v@gmail.com</span>
                            <ArrowUpRight :size="14" />
                        </a>
                        <a :href="linkedinUrl" target="_blank" rel="noopener noreferrer" class="btn-secondary">
                            <Globe :size="16" />
                            <span>LinkedIn</span>
                            <ArrowUpRight :size="14" />
                        </a>
                        <a :href="calendlyUrl" target="_blank" rel="noopener noreferrer" class="btn-ghost">
                            <Calendar :size="16" />
                            <span>Book a call</span>
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
                    <Link href="/privacy" class="footer-link">Privacy Policy</Link>
                    <Link href="/terms" class="footer-link">Terms</Link>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.hiring-page {
    min-height: 100vh;
    background: var(--bg-primary, #090a0f);
    color: var(--text-1, #f8fafc);
    font-family: inherit;
}

/* ── Topbar ── */
.topbar {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.9rem 2rem;
    background: rgba(10, 12, 18, 0.85);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.brand {
    display: flex;
    flex-direction: column;
    text-decoration: none;
}

.brand-name {
    font-weight: 800;
    font-size: 1.05rem;
    letter-spacing: 0.02em;
    color: #ffffff;
}

.brand-role {
    font-size: 0.72rem;
    color: var(--accent, #5eead4);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-weight: 600;
}

.topbar-nav {
    display: flex;
    align-items: center;
    gap: 1.4rem;
}

.topbar-link {
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--text-2, rgba(255, 255, 255, 0.75));
    text-decoration: none;
    transition: color 0.2s ease;
}

.topbar-link:hover {
    color: var(--accent, #5eead4);
}

.topbar-current {
    font-size: 0.84rem;
    font-weight: 700;
    color: var(--accent, #5eead4);
    padding: 0.25rem 0.6rem;
    background: rgba(94, 234, 212, 0.1);
    border-radius: 4px;
}

.topbar-resume {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.38rem 0.85rem;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--accent, #5eead4);
    text-decoration: none;
    border: 1px solid rgba(94, 234, 212, 0.4);
    border-radius: 999px;
    background: rgba(94, 234, 212, 0.08);
    transition: all 0.2s ease;
}

.topbar-resume:hover {
    background: var(--accent, #5eead4);
    color: #03211e;
}

/* ── Content Shell ── */
.content-shell {
    max-width: 980px;
    margin: 0 auto;
    padding: 3.5rem 1.5rem 6rem;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
}

/* ── Brief Hero ── */
.brief-hero {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.brief-badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    align-items: center;
}

.brief-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
}

.pill-icon {
    opacity: 0.9;
}

.hero-title {
    font-size: clamp(2rem, 4vw, 2.9rem);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.025em;
    color: #ffffff;
    margin: 0;
}

.text-gradient {
    background: linear-gradient(135deg, #5eead4 0%, #a78bfa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-subtitle {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--text-2, rgba(255, 255, 255, 0.82));
    max-width: 820px;
    margin: 0;
}

.hero-actions {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    flex-wrap: wrap;
    margin-top: 0.8rem;
}

/* ── Buttons ── */
.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.72rem 1.4rem;
    background: linear-gradient(135deg, #a78bfa 0%, #818cf8 100%);
    color: #0d0f1d;
    font-weight: 800;
    font-size: 0.85rem;
    letter-spacing: 0.03em;
    border-radius: 999px;
    text-decoration: none;
    box-shadow: 0 0 24px rgba(167, 139, 250, 0.45), 0 4px 14px rgba(0, 0, 0, 0.4);
    transition: all 0.24s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 34px rgba(167, 139, 250, 0.65), 0 6px 20px rgba(0, 0, 0, 0.5);
}

.btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.72rem 1.3rem;
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
    font-weight: 700;
    font-size: 0.85rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-decoration: none;
    transition: all 0.24s ease;
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.16);
    border-color: rgba(94, 234, 212, 0.6);
    color: var(--accent, #5eead4);
    transform: translateY(-2px);
}

.btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.72rem 1.1rem;
    background: transparent;
    color: var(--text-2, rgba(255, 255, 255, 0.75));
    font-weight: 600;
    font-size: 0.85rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-decoration: none;
    transition: all 0.24s ease;
}

.btn-ghost:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.25);
    color: #ffffff;
    transform: translateY(-2px);
}

/* ── Glass Panel ── */
.glass-panel {
    background: rgba(16, 18, 27, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 12px;
    backdrop-filter: blur(14px);
}

/* ── Headings ── */
.section-heading-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.2rem;
}

.section-heading {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.3rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: #ffffff;
    margin-bottom: 1.2rem;
}

.section-heading-hint {
    font-size: 0.82rem;
    color: var(--text-3, rgba(255, 255, 255, 0.5));
}

.heading-icon {
    color: var(--accent, #5eead4);
}

/* ── Snapshot Section ── */
.snapshot-card {
    padding: 0.75rem 1.5rem;
    overflow-x: auto;
}

.snapshot-table {
    width: 100%;
    border-collapse: collapse;
}

.snapshot-row {
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.snapshot-row:last-child {
    border-bottom: none;
}

.snapshot-label {
    padding: 0.85rem 1rem 0.85rem 0;
    font-weight: 700;
    font-size: 0.88rem;
    color: var(--accent, #5eead4);
    white-space: nowrap;
    width: 22%;
    vertical-align: top;
}

.snapshot-value {
    padding: 0.85rem 0;
    font-size: 0.92rem;
    line-height: 1.5;
    color: var(--text-1, #f8fafc);
}

/* ── Seeking Section ── */
.seeking-card {
    padding: 1.8rem 2rem;
    border-left: 3px solid var(--accent, #5eead4);
}

.seeking-title {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.2rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 0.75rem;
}

.seeking-body {
    font-size: 1rem;
    line-height: 1.65;
    color: var(--text-2, rgba(255, 255, 255, 0.85));
    margin: 0;
}

.seeking-body strong {
    color: #ffffff;
}

/* ── Why I'm Worth a Conversation ── */
.conversation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.2rem;
}

.conv-card {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    transition: transform 0.2s ease, border-color 0.2s ease;
}

.conv-card:hover {
    transform: translateY(-2px);
    border-color: rgba(94, 234, 212, 0.4);
}

.conv-metric {
    font-size: 1.8rem;
    font-weight: 900;
    letter-spacing: -0.02em;
    line-height: 1.1;
}

.conv-label {
    font-size: 0.95rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
}

.conv-desc {
    font-size: 0.84rem;
    line-height: 1.5;
    color: var(--text-2, rgba(255, 255, 255, 0.75));
    margin: 0;
}

/* ── How I Work ── */
.how-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.2rem;
}

.how-card {
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    transition: transform 0.2s ease, border-color 0.2s ease;
}

.how-card:hover {
    transform: translateY(-2px);
    border-color: rgba(167, 139, 250, 0.4);
}

.how-header {
    display: flex;
    align-items: center;
    gap: 0.65rem;
}

.how-icon {
    color: var(--accent, #5eead4);
    flex-shrink: 0;
}

.how-title {
    font-size: 1rem;
    font-weight: 800;
    color: #ffffff;
    margin: 0;
}

.how-desc {
    font-size: 0.86rem;
    line-height: 1.55;
    color: var(--text-2, rgba(255, 255, 255, 0.78));
    margin: 0;
}

/* ── Core Stack ── */
.stack-card {
    padding: 1.5rem 1.8rem;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
}

.stack-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-bottom: 0.85rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.stack-item:last-child {
    padding-bottom: 0;
    border-bottom: none;
}

.stack-category {
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent, #5eead4);
}

.stack-values {
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--text-1, #f8fafc);
}

/* ── Proof Grid ── */
.proof-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 1rem;
}

.proof-card {
    padding: 1.2rem 1.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.92rem;
    transition: all 0.2s ease;
}

.proof-card:hover {
    transform: translateY(-2px);
    border-color: rgba(94, 234, 212, 0.5);
    background: rgba(94, 234, 212, 0.06);
    color: var(--accent, #5eead4);
}

.proof-card--highlight {
    background: linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(129, 140, 248, 0.15) 100%);
    border-color: rgba(167, 139, 250, 0.35);
}

.proof-card--highlight:hover {
    border-color: rgba(167, 139, 250, 0.6);
    color: #a78bfa;
}

.proof-arrow {
    font-size: 1.1rem;
    transition: transform 0.2s ease;
}

.proof-card:hover .proof-arrow {
    transform: translateX(3px);
}

/* ── References ── */
.references-card {
    padding: 1.8rem 2rem;
}

.references-title {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.2rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 0.75rem;
}

.references-body {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-2, rgba(255, 255, 255, 0.8));
    margin: 0;
}

.inline-link {
    color: var(--accent, #5eead4);
    text-decoration: underline;
    font-weight: 600;
}

/* ── Close Section ── */
.close-section {
    padding: 2.5rem 2rem;
    text-align: center;
    background: linear-gradient(180deg, rgba(16, 18, 27, 0.8) 0%, rgba(24, 28, 42, 0.9) 100%);
    border: 1px solid rgba(167, 139, 250, 0.25);
}

.close-inner {
    max-width: 650px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.close-title {
    font-size: clamp(1.6rem, 3vw, 2.1rem);
    font-weight: 800;
    color: #ffffff;
    margin: 0;
}

.close-body {
    font-size: 1.02rem;
    line-height: 1.55;
    color: var(--text-2, rgba(255, 255, 255, 0.82));
    margin: 0;
}

.close-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.85rem;
    flex-wrap: wrap;
    margin-top: 0.8rem;
}

/* ── Footer ── */
.hiring-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 2rem 1.5rem;
    background: rgba(10, 12, 18, 0.95);
}

.footer-inner {
    max-width: 980px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: 0.82rem;
    color: var(--text-3, rgba(255, 255, 255, 0.5));
}

.footer-links {
    display: flex;
    gap: 1.2rem;
}

.footer-link {
    color: var(--text-2, rgba(255, 255, 255, 0.7));
    text-decoration: none;
    transition: color 0.2s ease;
}

.footer-link:hover {
    color: var(--accent, #5eead4);
}

@media (max-width: 768px) {
    .topbar {
        padding: 0.75rem 1rem;
    }
    .topbar-nav {
        gap: 0.85rem;
    }
    .content-shell {
        padding: 2rem 1rem 4rem;
        gap: 2.8rem;
    }
    .snapshot-label {
        width: 32%;
    }
}
</style>
