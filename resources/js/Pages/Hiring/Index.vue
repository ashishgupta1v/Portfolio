<script setup lang="ts">
import { ref } from 'vue'
import { Head, Link } from '@inertiajs/vue3'
import {
    ArrowUpRight,
    Award,
    Bot,
    Briefcase,
    Calendar,
    CheckCircle2,
    Clock,
    Code2,
    Cpu,
    Database,
    FileText,
    Globe,
    Layers,
    Mail,
    Menu,
    Shield,
    ShieldCheck,
    Sparkles,
    Users,
    X,
    Zap,
} from 'lucide-vue-next'
import ThemeToggle from '@/Components/PortfolioV2/ThemeToggle.vue'

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

const mobileOpen = ref(false)

const resumeUrl = '/resume/ashish-gupta-resume.pdf'
const emailHref = 'mailto:ashishgupta1v@gmail.com'
const linkedinUrl = 'https://www.linkedin.com/in/ashish-gupta-dev/'
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

const aiEngineeringPillars = [
    {
        title: 'RAG & Vector Search',
        description: 'Production Retrieval-Augmented Generation with pgvector embeddings and semantic search; grounded answers over real business data.',
        icon: Database,
    },
    {
        title: 'LLM Integration',
        description: 'OpenAI & Claude APIs with function-calling/structured outputs and streaming, wired into Laravel/Vue product workflows (e.g., WhatsApp-native AI).',
        icon: Cpu,
    },
    {
        title: 'AI Safety & Guardrails',
        description: 'Prompt-injection defense, hallucination mitigation, and scope-limited assistants (the assistant on this site refuses jailbreaks by design).',
        icon: ShieldCheck,
    },
    {
        title: 'Agentic Automation',
        description: 'Autonomous, tool-using agents that offload repetitive business logic and review work.',
        icon: Bot,
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
    aiEngineering: 'RAG Pipelines, pgvector, Vector Embeddings (OpenAI), Tool Use / Function Calling, Prompt Injection Defense, Autonomous Agents',
    frameworks: 'Laravel 13, Vue 3, Inertia.js, Node.js, Nuxt.js, React / Next.js',
    data: 'PostgreSQL, MySQL, Redis, pgvector, SQLite (WAL)',
    cloud: 'AWS (S3, RDS, ECS, CloudFront), Docker, Nginx, Jenkins, GitHub Actions',
    practices: 'DDD, SOLID, Modular Monoliths, RESTful APIs, Event-Driven Systems',
}
</script>

<template>
    <Head title="For Hiring Managers & Recruiters — Ashish Gupta (Senior Full-Stack Architect)">
        <meta name="description" content="10+ years shipping production systems end-to-end — Vue, Laravel, DDD, and AI. Senior Full-Stack Architect open to full-time roles." />
        <meta property="og:title" content="For Hiring Managers & Recruiters — Ashish Gupta" />
        <meta property="og:description" content="10+ years shipping production systems end-to-end — Vue, Laravel, DDD, and AI. Senior Full-Stack Architect open to full-time roles." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ashishgupta.dev/for-hiring-managers" />
        <link rel="canonical" href="https://ashishgupta.dev/for-hiring-managers" />
    </Head>

    <div class="hiring-page">
        <!-- Top bar navigation -->
        <header class="topbar">
            <div class="topbar-inner">
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
                    <ThemeToggle class="topbar-link topbar-theme-btn" />
                </nav>

                <!-- Mobile Hamburger Button -->
                <button
                    class="hamburger-btn"
                    :aria-expanded="mobileOpen"
                    aria-label="Toggle mobile menu"
                    @click="mobileOpen = !mobileOpen"
                >
                    <X v-if="mobileOpen" :size="22" />
                    <Menu v-else :size="22" />
                </button>
            </div>
        </header>

        <!-- Mobile Drawer Overlay -->
        <Transition name="mobile-drawer">
            <div v-if="mobileOpen" class="mobile-overlay" @click.self="mobileOpen = false">
                <nav class="mobile-drawer" aria-label="Mobile navigation">
                    <div class="mobile-drawer-header">
                        <span class="drawer-title">Navigation</span>
                        <button class="drawer-close" aria-label="Close menu" @click="mobileOpen = false">
                            <X :size="20" />
                        </button>
                    </div>
                    <div class="mobile-links-list">
                        <Link href="/" class="mobile-link" @click="mobileOpen = false">Home</Link>
                        <Link href="/case-studies" class="mobile-link" @click="mobileOpen = false">Case Studies</Link>
                        <Link href="/blog" class="mobile-link" @click="mobileOpen = false">Blog</Link>
                        <span class="mobile-link mobile-link--current">For Hiring Managers</span>
                    </div>

                    <div class="mobile-actions">
                        <div class="mobile-theme-row">
                            <span class="mobile-theme-label">Theme</span>
                            <ThemeToggle class="mobile-theme-toggle" />
                        </div>

                        <a
                            :href="resumeUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="mobile-resume-btn glow-pill"
                            @click="mobileOpen = false"
                        >
                            <FileText :size="16" />
                            <span>Download Résumé (PDF)</span>
                            <ArrowUpRight :size="14" />
                        </a>
                    </div>
                </nav>
            </div>
        </Transition>

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
                    10+ years shipping production systems end-to-end — Vue, Laravel, DDD, and AI. I modernize legacy monoliths into scalable, domain-driven platforms and own them from architecture through production.
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

            <!-- AI Engineering Section -->
            <section class="ai-section">
                <div class="section-heading-row">
                    <h2 class="section-heading">
                        <Sparkles :size="18" class="heading-icon accent-icon" />
                        AI Engineering — production systems, not demos
                    </h2>
                </div>
                <p class="section-subtext">
                    I build LLM features that survive real users — grounded in retrieval, guarded against failure, and shipped inside products people already use.
                </p>

                <div class="ai-grid">
                    <div v-for="pillar in aiEngineeringPillars" :key="pillar.title" class="ai-card glass-panel">
                        <div class="ai-header">
                            <component :is="pillar.icon" :size="20" class="ai-icon" />
                            <h3 class="ai-title">{{ pillar.title }}</h3>
                        </div>
                        <p class="ai-desc">{{ pillar.description }}</p>
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
                        <span class="stack-category">AI Engineering &amp; LLMs</span>
                        <span class="stack-values">{{ coreStack.aiEngineering }}</span>
                    </div>
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
        <footer class="hiring-footer" role="contentinfo">
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
    background: var(--bg-primary);
    color: var(--text-1);
    font-family: inherit;
    overflow-x: hidden;
}

/* ── Topbar ── */
.topbar {
    position: sticky;
    top: 0;
    z-index: 50;
    background: var(--nav-bg);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--nav-border);
    transition: background 0.3s ease, border-color 0.3s ease;
}

.topbar-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.9rem 1.5rem;
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
    color: var(--text-1);
    transition: color 0.2s ease;
}

.brand-role {
    font-size: 0.72rem;
    color: var(--accent);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-weight: 700;
}

.topbar-nav {
    display: flex;
    align-items: center;
    gap: 1.3rem;
}

.topbar-link {
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--text-2);
    text-decoration: none;
    transition: color 0.2s ease;
}

.topbar-link:hover {
    color: var(--accent);
}

.topbar-current {
    font-size: 0.84rem;
    font-weight: 700;
    color: var(--accent);
    padding: 0.25rem 0.6rem;
    background: rgba(var(--accent-rgb), 0.12);
    border-radius: 6px;
    border: 1px solid rgba(var(--accent-rgb), 0.25);
}

.topbar-resume {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.38rem 0.85rem;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--accent);
    text-decoration: none;
    border: 1px solid rgba(var(--accent-rgb), 0.4);
    border-radius: 999px;
    background: rgba(var(--accent-rgb), 0.08);
    transition: all 0.2s ease;
}

.topbar-resume:hover {
    background: var(--accent);
    color: #ffffff;
}

.topbar-theme-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--text-2);
    transition: color 0.2s ease;
}

.topbar-theme-btn:hover {
    color: var(--accent);
}

/* ── Mobile Hamburger Button ── */
.hamburger-btn {
    display: none;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-1);
    padding: 0.4rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.hamburger-btn:hover {
    color: var(--accent);
    border-color: var(--accent);
}

/* ── Mobile Drawer Overlay ── */
.mobile-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: flex-end;
}

.mobile-drawer {
    width: min(320px, 85vw);
    height: 100%;
    background: var(--surface, var(--bg-elevated, #0c1521));
    border-left: 1px solid var(--border);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: -8px 0 30px rgba(0, 0, 0, 0.4);
}

.mobile-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
}

.drawer-title {
    font-weight: 800;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
}

.drawer-close {
    background: none;
    border: none;
    color: var(--text-2);
    cursor: pointer;
    padding: 0.3rem;
}

.drawer-close:hover {
    color: var(--text-1);
}

.mobile-links-list {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 1.5rem 0;
}

.mobile-link {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-1);
    text-decoration: none;
    transition: color 0.2s ease;
}

.mobile-link:hover {
    color: var(--accent);
}

.mobile-link--current {
    color: var(--accent);
    font-weight: 800;
}

.mobile-actions {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding-top: 1.2rem;
    border-top: 1px solid var(--border);
}

.mobile-theme-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-2);
}

.mobile-resume-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: var(--accent);
    color: #ffffff;
    font-weight: 700;
    font-size: 0.85rem;
    border-radius: 8px;
    text-decoration: none;
}

/* ── Content Shell ── */
.content-shell {
    max-width: 980px;
    margin: 0 auto;
    padding: 3.5rem 1.5rem 6rem;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    box-sizing: border-box;
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

.glow-pill {
    background: rgba(var(--accent-rgb, 94, 234, 212), 0.12);
    border: 1px solid rgba(var(--accent-rgb, 94, 234, 212), 0.35);
    color: var(--accent);
}

.glow-pill-violet {
    background: rgba(var(--accent-violet-rgb, 124, 58, 237), 0.12);
    border: 1px solid rgba(var(--accent-violet-rgb, 124, 58, 237), 0.35);
    color: var(--accent-violet);
}

.pill-icon {
    opacity: 0.9;
}

.hero-title {
    font-size: clamp(2rem, 4vw, 2.9rem);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.025em;
    color: var(--text-1);
    margin: 0;
}

.text-gradient {
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-subtitle {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--text-2);
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
    background: var(--accent-gradient);
    color: #ffffff;
    font-weight: 800;
    font-size: 0.85rem;
    letter-spacing: 0.03em;
    border-radius: 999px;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15), var(--shadow-glow-violet);
    transition: all 0.24s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), var(--shadow-glow-violet);
}

.btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.72rem 1.3rem;
    background: var(--card-bg);
    color: var(--text-1);
    font-weight: 700;
    font-size: 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    text-decoration: none;
    transition: all 0.24s ease;
}

.btn-secondary:hover {
    background: var(--surface-raised);
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
}

.btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.72rem 1.1rem;
    background: transparent;
    color: var(--text-2);
    font-weight: 600;
    font-size: 0.85rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    text-decoration: none;
    transition: all 0.24s ease;
}

.btn-ghost:hover {
    background: var(--surface-raised);
    border-color: var(--border-strong);
    color: var(--text-1);
    transform: translateY(-2px);
}

/* ── Glass Panel ── */
.glass-panel {
    background: var(--card-bg, var(--glass-bg));
    border: 1px solid var(--border);
    border-radius: 12px;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: var(--shadow-elevation-1);
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
    color: var(--text-1);
    margin-bottom: 1.2rem;
}

.section-heading-hint {
    font-size: 0.82rem;
    color: var(--text-3);
}

.heading-icon {
    color: var(--accent);
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
    border-bottom: 1px solid var(--border);
}

.snapshot-row:last-child {
    border-bottom: none;
}

.snapshot-label {
    padding: 0.85rem 1rem 0.85rem 0;
    font-weight: 700;
    font-size: 0.88rem;
    color: var(--accent);
    white-space: nowrap;
    width: 22%;
    vertical-align: top;
}

.snapshot-value {
    padding: 0.85rem 0;
    font-size: 0.92rem;
    line-height: 1.5;
    color: var(--text-1);
}

/* ── Seeking Section ── */
.seeking-card {
    padding: 1.8rem 2rem;
    border-left: 3px solid var(--accent);
}

.seeking-title {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--text-1);
    margin-bottom: 0.75rem;
}

.seeking-body {
    font-size: 1rem;
    line-height: 1.65;
    color: var(--text-2);
    margin: 0;
}

.seeking-body strong {
    color: var(--text-1);
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
    border-color: var(--accent);
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
    color: var(--text-1);
    margin: 0;
}

.conv-desc {
    font-size: 0.84rem;
    line-height: 1.5;
    color: var(--text-2);
    margin: 0;
}

/* ── Section Subtext ── */
.section-subtext {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-2);
    margin: -0.6rem 0 1.2rem;
    max-width: 780px;
}

/* ── AI Engineering Section ── */
.ai-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.2rem;
}

.ai-card {
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.ai-card:hover {
    transform: translateY(-2px);
    border-color: var(--accent);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 0 20px rgba(var(--accent-rgb), 0.1);
}

.ai-header {
    display: flex;
    align-items: center;
    gap: 0.65rem;
}

.ai-icon {
    color: var(--accent);
    flex-shrink: 0;
}

.ai-title {
    font-size: 1rem;
    font-weight: 800;
    color: var(--text-1);
    margin: 0;
}

.ai-desc {
    font-size: 0.84rem;
    line-height: 1.55;
    color: var(--text-2);
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
    border-color: var(--accent-violet);
}

.how-header {
    display: flex;
    align-items: center;
    gap: 0.65rem;
}

.how-icon {
    color: var(--accent);
    flex-shrink: 0;
}

.how-title {
    font-size: 1rem;
    font-weight: 800;
    color: var(--text-1);
    margin: 0;
}

.how-desc {
    font-size: 0.86rem;
    line-height: 1.55;
    color: var(--text-2);
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
    border-bottom: 1px solid var(--border);
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
    color: var(--accent);
}

.stack-values {
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--text-1);
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
    color: var(--text-1);
    font-weight: 700;
    font-size: 0.92rem;
    transition: all 0.2s ease;
}

.proof-card:hover {
    transform: translateY(-2px);
    border-color: var(--accent);
    background: rgba(var(--accent-rgb), 0.08);
    color: var(--accent);
}

.proof-card--highlight {
    background: rgba(var(--accent-violet-rgb), 0.1);
    border-color: rgba(var(--accent-violet-rgb), 0.35);
}

.proof-card--highlight:hover {
    border-color: var(--accent-violet);
    color: var(--accent-violet);
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
    color: var(--text-1);
    margin-bottom: 0.75rem;
}

.references-body {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-2);
    margin: 0;
}

.inline-link {
    color: var(--accent);
    text-decoration: underline;
    font-weight: 600;
}

/* ── Close Section ── */
.close-section {
    padding: 2.5rem 2rem;
    text-align: center;
    background: var(--card-bg-strong, var(--glass-bg));
    border: 1px solid var(--border-strong, var(--border));
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
    color: var(--text-1);
    margin: 0;
}

.close-body {
    font-size: 1.02rem;
    line-height: 1.55;
    color: var(--text-2);
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
    border-top: 1px solid var(--border);
    padding: 2rem 1.5rem;
    background: var(--bg-secondary);
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
    color: var(--text-3);
}

.footer-links {
    display: flex;
    gap: 1.2rem;
}

.footer-link {
    color: var(--text-2);
    text-decoration: none;
    transition: color 0.2s ease;
}

.footer-link:hover {
    color: var(--accent);
}

/* ── Mobile Transitions ── */
.mobile-drawer-enter-active,
.mobile-drawer-leave-active {
    transition: opacity 0.3s ease;
}

.mobile-drawer-enter-active .mobile-drawer,
.mobile-drawer-leave-active .mobile-drawer {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-drawer-enter-from,
.mobile-drawer-leave-to {
    opacity: 0;
}

.mobile-drawer-enter-from .mobile-drawer,
.mobile-drawer-leave-to .mobile-drawer {
    transform: translateX(100%);
}

@media (max-width: 768px) {
    .topbar-inner {
        padding: 0.75rem 1rem;
    }
    .topbar-nav {
        display: none;
    }
    .hamburger-btn {
        display: inline-flex;
    }
    .content-shell {
        padding: 2rem 1rem 4rem;
        gap: 2.8rem;
    }
    .snapshot-card {
        padding: 0.75rem 1rem;
    }
    .snapshot-label {
        width: 35%;
    }
}

/* ── Light Mode Polish ── */
:global([data-theme="light"]) .hiring-page {
    background: var(--bg-primary, #f8fafc);
}

:global([data-theme="light"]) .hiring-topbar {
    background: rgba(255, 255, 255, 0.92);
    border-bottom-color: rgba(15, 23, 42, 0.08);
}

:global([data-theme="light"]) .mobile-drawer {
    background: #ffffff;
    border-left-color: rgba(15, 23, 42, 0.1);
}

:global([data-theme="light"]) .snapshot-card,
:global([data-theme="light"]) .proof-card,
:global([data-theme="light"]) .ai-card,
:global([data-theme="light"]) .how-card,
:global([data-theme="light"]) .stack-card,
:global([data-theme="light"]) .comp-table-wrap,
:global([data-theme="light"]) .contact-card {
    background: #ffffff;
    border-color: rgba(15, 23, 42, 0.08);
    box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 0 0 1px rgba(15, 23, 42, 0.04);
}

:global([data-theme="light"]) .comp-head-col,
:global([data-theme="light"]) .comp-col-ashish {
    background: rgba(13, 148, 136, 0.06);
}

:global([data-theme="light"]) .callout-card {
    background: linear-gradient(135deg, rgba(13, 148, 136, 0.08), rgba(124, 58, 237, 0.06));
    border-color: rgba(13, 148, 136, 0.25);
}
</style>
