<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { 
    Download, 
    Mail, 
    Sparkles, 
    ArrowDown, 
    ArrowUpRight, 
    Bot, 
    Cpu, 
    Database, 
    Layers, 
    ShieldCheck, 
    Terminal, 
    ExternalLink 
} from 'lucide-vue-next'

interface ProductShot {
    title: string
    tag: string
    description: string
    imageUrl: string
    url?: string
}

const props = withDefaults(
    defineProps<{
        name?: string
        title?: string
        subtitle?: string
        resumeUrl?: string | null
        contactEmail?: string | null
        linkedinUrl?: string | null
        githubUrl?: string | null
        avatarUrl?: string | null
        panelMode?: 'architecture' | 'products'
        products?: ProductShot[]
    }>(),
    {
        name: 'Ashish Gupta',
        title: 'Senior Full-Stack Architect & AI Systems Engineer',
        subtitle: 'VILT Stack Specialist · Production AI & RAG Architect',
        resumeUrl: '/resume/ashish-gupta-resume.pdf',
        contactEmail: 'ashishgupta1v@gmail.com',
        linkedinUrl: 'https://www.linkedin.com/in/ashish-gupta-dev/',
        githubUrl: 'https://github.com/ashishgupta1v',
        avatarUrl: '/images/ashish-gupta-avatar.webp',
        panelMode: 'architecture',
        products: () => [
            {
                title: 'ZoetiCoach AI',
                tag: 'Production AI & RAG',
                description: 'WhatsApp-first accountability system with pgvector RAG & event-sourced ledger.',
                imageUrl: '/images/portfolio/zoeticoach.jpg',
                url: 'https://zoeticoach.com',
            },
            {
                title: 'Dhanda Diary',
                tag: 'Multi-Tenant SaaS',
                description: 'Business execution OS built on Laravel 13, Vue 3, Inertia, and SQLite WAL.',
                imageUrl: '/images/portfolio/dhandadiary.jpg',
                url: 'https://dhandadiary.cloud',
            },
            {
                title: 'MyAstrova',
                tag: 'High-Concurrency Platform',
                description: 'Consultation platform with sub-200ms astronomical calculations & live routing.',
                imageUrl: '/images/portfolio/myastrova.jpg',
                url: 'https://myastrova.com',
            },
        ],
    }
)

const emit = defineEmits<{
    (e: 'open-assistant'): void
    (e: 'cta', type: 'resume' | 'contact' | 'linkedin' | 'github' | 'ai'): void
}>()

// Kinetic proof rotator
const proofLines = [
    '▸ Production RAG · LLM Integration · pgvector',
    '▸ Decoupled Monoliths & Domain-Driven Design (DDD)',
    '▸ 10+ Years Experience · $1M/yr Cloud Savings',
    '▸ VILT Stack Specialist (Vue 3, Inertia, Laravel 13, Tailwind)',
]

const currentProofIndex = ref(0)
let proofInterval: number | null = null

// Product montage index
const currentProductIndex = ref(0)
let productInterval: number | null = null

// Avatar fallback detection
const avatarLoaded = ref(true)
function handleAvatarError() {
    avatarLoaded.value = false
}

// Active node in architecture pulse simulation
const activeNodeIndex = ref(0)
let nodeInterval: number | null = null

const archNodes = [
    {
        id: 'ingress',
        label: 'Client Ingress & Messaging',
        sub: 'WhatsApp API · REST · WebSockets',
        icon: Bot,
        color: '#10b981',
    },
    {
        id: 'backend',
        label: 'Laravel 13 Application Core',
        sub: 'Modular Monolith · DDD · Horizon Queues',
        icon: Layers,
        color: '#f43f5e',
    },
    {
        id: 'ai-rag',
        label: 'AI & Vector Intelligence',
        sub: 'OpenAI / Claude · pgvector · Semantic Cache',
        icon: Cpu,
        color: '#8b5cf6',
    },
    {
        id: 'frontend',
        label: 'Reactive Client & Telemetry',
        sub: 'Vue 3 · Inertia.js · Tailwind · sub-50ms',
        icon: Database,
        color: '#06b6d4',
    },
]

function handleCtaClick(type: 'resume' | 'contact' | 'linkedin' | 'github' | 'ai') {
    emit('cta', type)
    if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible('hero_cta', { props: { type } })
    }
    if (type === 'ai') {
        emit('open-assistant')
        window.dispatchEvent(new CustomEvent('open-ai-assistant'))
    }
}

function scrollToContact(e: MouseEvent) {
    e.preventDefault()
    handleCtaClick('contact')
    const target = document.getElementById('contact')
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
    }
}

function scrollToFirstSection(e: MouseEvent) {
    e.preventDefault()
    const target = document.getElementById('main-content') || document.getElementById('about')
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
    }
}

onMounted(() => {
    // Check reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion) {
        proofInterval = window.setInterval(() => {
            currentProofIndex.value = (currentProofIndex.value + 1) % proofLines.length
        }, 3200)

        nodeInterval = window.setInterval(() => {
            activeNodeIndex.value = (activeNodeIndex.value + 1) % archNodes.length
        }, 2200)

        if (props.panelMode === 'products') {
            productInterval = window.setInterval(() => {
                currentProductIndex.value = (currentProductIndex.value + 1) % props.products.length
            }, 4000)
        }
    }
})

onBeforeUnmount(() => {
    if (proofInterval) clearInterval(proofInterval)
    if (nodeInterval) clearInterval(nodeInterval)
    if (productInterval) clearInterval(productInterval)
})
</script>

<template>
    <header class="split-hero" aria-label="Introduction & Architecture Overview">
        <!-- Decorative Ambient Background Grid & Glow -->
        <div class="hero-mesh" aria-hidden="true">
            <div class="glow-orb glow-1"></div>
            <div class="glow-orb glow-2"></div>
            <div class="grid-overlay"></div>
        </div>

        <div class="hero-container">
            <!-- Left Column: Type-Led & Conversion CTAs -->
            <div class="hero-content">
                <!-- Status Badges -->
                <div class="status-row">
                    <span class="status-pill available">
                        <span class="pulse-dot"></span>
                        Open to Full-Time · Senior / Staff Architect
                    </span>
                    <span class="status-pill remote">
                        Remote Worldwide · US/EU Overlap
                    </span>
                </div>

                <!-- Eyebrow -->
                <p class="hero-eyebrow">
                    <span class="eyebrow-line"></span>
                    {{ name.toUpperCase() }}
                </p>

                <!-- Primary H1 Headline -->
                <h1 class="hero-headline">
                    I architect scalable systems <span class="gradient-accent">&amp; production AI.</span>
                </h1>

                <!-- Kinetic Proof Rotator -->
                <div class="rotator-container" aria-live="polite" aria-atomic="true">
                    <transition name="proof-slide" mode="out-in">
                        <p :key="currentProofIndex" class="proof-line">
                            {{ proofLines[currentProofIndex] }}
                        </p>
                    </transition>
                </div>

                <!-- Bio Summary -->
                <p class="hero-bio">
                    Senior Full-Stack &amp; AI Systems Architect with <strong>10+ years</strong> modernizing legacy healthcare and aviation monoliths into decoupled, domain-driven systems and engineering hallucination-resistant RAG platforms.
                </p>

                <!-- Action CTAs Row -->
                <div class="cta-group">
                    <a
                        :href="resumeUrl || undefined"
                        download="Ashish-Gupta-Resume.pdf"
                        class="btn-primary"
                        @click="handleCtaClick('resume')"
                    >
                        <Download class="btn-icon" :size="18" />
                        <span>Download Résumé</span>
                    </a>

                    <a
                        href="#contact"
                        class="btn-secondary"
                        @click="scrollToContact"
                    >
                        <Mail class="btn-icon" :size="18" />
                        <span>Get in touch</span>
                    </a>

                    <button
                        type="button"
                        class="btn-ai"
                        aria-label="Open AI Assistant to ask questions about Ashish"
                        @click="handleCtaClick('ai')"
                    >
                        <Sparkles class="btn-icon text-amber-400" :size="16" />
                        <span>Ask my AI</span>
                        <ArrowUpRight class="btn-icon-sub" :size="14" />
                    </button>
                </div>

                <!-- Social Proof Links -->
                <div class="social-row">
                    <a
                        :href="linkedinUrl || undefined"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-link"
                        aria-label="LinkedIn Profile"
                        @click="handleCtaClick('linkedin')"
                    >
                        <svg class="social-svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                        <span>LinkedIn</span>
                    </a>

                    <a
                        :href="githubUrl || undefined"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-link"
                        aria-label="GitHub Profile"
                        @click="handleCtaClick('github')"
                    >
                        <svg class="social-svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                        </svg>
                        <span>GitHub</span>
                    </a>

                    <a
                        href="/for-hiring-managers"
                        class="social-link highlight"
                    >
                        <span>Hiring Brief ↗</span>
                    </a>
                </div>
            </div>

            <!-- Right Column: Interactive Architecture Panel (Default) or Product Montage -->
            <div class="hero-panel-wrapper">
                <div class="hero-panel" role="region" aria-label="System Architecture Live Demo">
                    <!-- Panel Window Header -->
                    <div class="panel-header">
                        <div class="window-controls">
                            <span class="ctrl ctrl-red"></span>
                            <span class="ctrl ctrl-yellow"></span>
                            <span class="ctrl ctrl-green"></span>
                            <span class="panel-title-tag">system-arch · live telemetry</span>
                        </div>

                        <!-- Tucked Headshot / Monogram Fallback -->
                        <div class="headshot-badge" title="Ashish Gupta">
                            <img
                                v-if="avatarLoaded && avatarUrl"
                                :src="avatarUrl"
                                alt="Ashish Gupta"
                                class="headshot-img"
                                width="36"
                                height="36"
                                @error="handleAvatarError"
                            />
                            <div v-else class="monogram-fallback">
                                AG
                            </div>
                        </div>
                    </div>

                    <!-- Panel Mode: Architecture Diagram (Default) -->
                    <div v-if="panelMode === 'architecture'" class="arch-flow-body">
                        <div class="nodes-container">
                            <div
                                v-for="(node, idx) in archNodes"
                                :key="node.id"
                                class="arch-node-item"
                                :class="{ 'is-active': activeNodeIndex === idx }"
                            >
                                <div class="node-icon-box" :style="{ '--node-color': node.color }">
                                    <component :is="node.icon" class="node-icon" :size="18" />
                                </div>
                                <div class="node-info">
                                    <div class="node-title">{{ node.label }}</div>
                                    <div class="node-sub">{{ node.sub }}</div>
                                </div>
                                <div class="node-status-indicator">
                                    <span class="live-dot"></span>
                                </div>

                                <!-- Connecting data pulse beam between nodes -->
                                <div v-if="idx < archNodes.length - 1" class="node-connector" aria-hidden="true">
                                    <div class="connector-line">
                                        <div class="pulse-traveler" :class="{ 'is-traveling': activeNodeIndex === idx }"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Proof Metrics Strip -->
                        <div class="panel-proof-strip">
                            <div class="proof-chip">
                                <span class="chip-val">$1M/yr</span>
                                <span class="chip-lbl">Cloud Saved</span>
                            </div>
                            <div class="proof-chip">
                                <span class="chip-val">−30%</span>
                                <span class="chip-lbl">Trial Latency</span>
                            </div>
                            <div class="proof-chip">
                                <span class="chip-val">10+ Yrs</span>
                                <span class="chip-lbl">Experience</span>
                            </div>
                            <div class="proof-chip">
                                <span class="chip-val">100/100</span>
                                <span class="chip-lbl">Core Vitals</span>
                            </div>
                        </div>
                    </div>

                    <!-- Panel Mode: Product Montage (Optional) -->
                    <div v-else class="products-montage-body">
                        <transition name="product-fade" mode="out-in">
                            <div :key="currentProductIndex" class="product-slide">
                                <div class="product-image-container">
                                    <img
                                        :src="products[currentProductIndex].imageUrl"
                                        :alt="products[currentProductIndex].title"
                                        class="product-image"
                                        loading="lazy"
                                    />
                                    <div class="product-badge">{{ products[currentProductIndex].tag }}</div>
                                </div>
                                <div class="product-meta">
                                    <h2 class="product-name">{{ products[currentProductIndex].title }}</h2>
                                    <p class="product-desc">{{ products[currentProductIndex].description }}</p>
                                    <a
                                        v-if="products[currentProductIndex].url"
                                        :href="products[currentProductIndex].url"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="product-link"
                                    >
                                        <span>Visit Live System</span>
                                        <ExternalLink :size="14" />
                                    </a>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll Cue -->
        <div class="scroll-cue" aria-hidden="true">
            <a href="#about" class="scroll-link" @click="scrollToFirstSection">
                <span class="scroll-text">SCROLL TO EXPLORE</span>
                <ArrowDown class="scroll-icon animate-bounce" :size="14" />
            </a>
        </div>
    </header>
</template>

<style scoped>
.split-hero {
    position: relative;
    width: 100%;
    min-height: 92vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: calc(var(--nav-height, 4.5rem) + 2rem) 1.5rem 3.5rem;
    background-color: var(--bg-primary, #090e14);
    color: var(--text-1, #f8fafc);
    overflow: hidden;
    box-sizing: border-box;
}

/* Ambient mesh background */
.hero-mesh {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}

.glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.18;
    pointer-events: none;
}

.glow-1 {
    width: 480px;
    height: 480px;
    top: 5%;
    left: -10%;
    background: radial-gradient(circle, var(--accent, #5eead4), transparent 70%);
}

.glow-2 {
    width: 520px;
    height: 520px;
    bottom: 5%;
    right: -10%;
    background: radial-gradient(circle, #6366f1, transparent 70%);
}

.grid-overlay {
    position: absolute;
    inset: 0;
    background-image: 
        linear-gradient(to right, var(--border, rgba(255, 255, 255, 0.05)) 1px, transparent 1px),
        linear-gradient(to bottom, var(--border, rgba(255, 255, 255, 0.05)) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.45;
    mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 0%, transparent 80%);
}

/* 60/40 Grid Container */
.hero-container {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1280px;
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 3.5rem;
    align-items: center;
    margin: 0 auto;
}

/* Left Content Styles */
.hero-content {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.status-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
}

.status-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.85rem;
    border-radius: 9999px;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.2;
    border: 1px solid var(--border, rgba(255, 255, 255, 0.1));
    background: var(--card-bg, rgba(15, 23, 42, 0.6));
    backdrop-filter: blur(8px);
    color: var(--text-2, #94a3b8);
}

.status-pill.available {
    color: var(--text-1, #f8fafc);
    border-color: rgba(94, 234, 212, 0.3);
}

.pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #10b981;
    box-shadow: 0 0 8px #10b981;
    animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-ring {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.3); opacity: 0.7; }
}

.hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: var(--accent, #5eead4);
    margin: 0;
}

.eyebrow-line {
    width: 24px;
    height: 2px;
    background-color: var(--accent, #5eead4);
    border-radius: 1px;
}

.hero-headline {
    font-size: clamp(2.25rem, 4.5vw, 3.75rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.025em;
    color: var(--text-1, #f8fafc);
    margin: 0;
}

.gradient-accent {
    background: linear-gradient(135deg, var(--accent, #5eead4) 0%, #38bdf8 50%, #818cf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
}

/* Proof Rotator */
.rotator-container {
    height: 2rem;
    display: flex;
    align-items: center;
}

.proof-line {
    font-size: 1.0625rem;
    font-weight: 600;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    color: var(--accent, #5eead4);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.proof-slide-enter-active,
.proof-slide-leave-active {
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.proof-slide-enter-from {
    opacity: 0;
    transform: translateY(12px);
}

.proof-slide-leave-to {
    opacity: 0;
    transform: translateY(-12px);
}

.hero-bio {
    font-size: 1.0625rem;
    line-height: 1.65;
    color: var(--text-2, #94a3b8);
    max-width: 580px;
    margin: 0;
}

.hero-bio strong {
    color: var(--text-1, #f8fafc);
    font-weight: 600;
}

/* CTAs Row */
.cta-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.875rem;
    align-items: center;
    margin-top: 0.5rem;
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8125rem 1.4rem;
    border-radius: 0.625rem;
    font-size: 0.9375rem;
    font-weight: 600;
    background-color: var(--accent, #5eead4);
    color: #042f2e;
    text-decoration: none;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 16px rgba(94, 234, 212, 0.25);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(94, 234, 212, 0.35);
    background-color: #2dd4bf;
}

.btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8125rem 1.35rem;
    border-radius: 0.625rem;
    font-size: 0.9375rem;
    font-weight: 600;
    background: var(--card-bg, rgba(15, 23, 42, 0.6));
    color: var(--text-1, #f8fafc);
    border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
    text-decoration: none;
    transition: all 0.2s ease;
    backdrop-filter: blur(8px);
}

.btn-secondary:hover {
    transform: translateY(-2px);
    border-color: var(--text-2, #94a3b8);
    background: var(--border, rgba(255, 255, 255, 0.08));
}

.btn-ai {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.8125rem 1.25rem;
    border-radius: 0.625rem;
    font-size: 0.9375rem;
    font-weight: 600;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15));
    color: var(--text-1, #f8fafc);
    border: 1px solid rgba(168, 85, 247, 0.3);
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(8px);
}

.btn-ai:hover {
    transform: translateY(-2px);
    border-color: rgba(168, 85, 247, 0.6);
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25));
}

/* Social links row */
.social-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.25rem;
    margin-top: 0.25rem;
}

.social-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-2, #94a3b8);
    text-decoration: none;
    transition: color 0.15s ease;
}

.social-link:hover {
    color: var(--accent, #5eead4);
}

.social-link.highlight {
    color: var(--accent, #5eead4);
    font-weight: 600;
}

/* Right Panel Window Styles */
.hero-panel-wrapper {
    position: relative;
    width: 100%;
}

.hero-panel {
    background: var(--card-bg, #0d1520);
    border: 1px solid var(--border, rgba(255, 255, 255, 0.1));
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 
        0 20px 40px -15px rgba(0, 0, 0, 0.5),
        0 0 0 1px var(--border, rgba(255, 255, 255, 0.05));
    backdrop-filter: blur(12px);
    transition: transform 0.3s ease, border-color 0.3s ease;
}

.hero-panel:hover {
    border-color: rgba(94, 234, 212, 0.25);
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: rgba(0, 0, 0, 0.25);
    border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.08));
}

.window-controls {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.ctrl {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.ctrl-red { background-color: #ef4444; }
.ctrl-yellow { background-color: #f59e0b; }
.ctrl-green { background-color: #10b981; }

.panel-title-tag {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.75rem;
    color: var(--text-2, #94a3b8);
    margin-left: 0.5rem;
}

.headshot-badge {
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    border: 1.5px solid var(--accent, #5eead4);
    background: #1e293b;
    display: flex;
    align-items: center;
    justify-content: center;
}

.headshot-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.monogram-fallback {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--accent, #5eead4);
}

/* Architecture flow nodes */
.arch-flow-body {
    padding: 1.25rem 1.25rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
}

.nodes-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.arch-node-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.75rem 0.9rem;
    border-radius: 0.625rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border, rgba(255, 255, 255, 0.06));
    transition: all 0.3s ease;
}

.arch-node-item.is-active {
    background: rgba(94, 234, 212, 0.05);
    border-color: rgba(94, 234, 212, 0.3);
    transform: translateX(4px);
}

.node-icon-box {
    width: 36px;
    height: 36px;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    color: var(--node-color, #5eead4);
    border: 1px solid rgba(255, 255, 255, 0.08);
    flex-shrink: 0;
}

.node-info {
    flex: 1;
    min-width: 0;
}

.node-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-1, #f8fafc);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.node-sub {
    font-size: 0.75rem;
    color: var(--text-2, #94a3b8);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.node-status-indicator {
    flex-shrink: 0;
}

.live-dot {
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #10b981;
    opacity: 0.4;
    transition: all 0.3s ease;
}

.arch-node-item.is-active .live-dot {
    opacity: 1;
    box-shadow: 0 0 8px #10b981;
}

/* Connecting Pulse Beam */
.node-connector {
    position: absolute;
    left: 26px;
    bottom: -10px;
    width: 2px;
    height: 10px;
    z-index: 2;
}

.connector-line {
    position: relative;
    width: 100%;
    height: 100%;
    background: var(--border, rgba(255, 255, 255, 0.1));
}

.pulse-traveler {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: var(--accent, #5eead4);
    opacity: 0;
}

.pulse-traveler.is-traveling {
    animation: travel-down 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    opacity: 1;
}

@keyframes travel-down {
    0% { top: 0; opacity: 1; }
    100% { top: 100%; opacity: 0; }
}

/* Proof metrics strip */
.panel-proof-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border, rgba(255, 255, 255, 0.08));
}

.proof-chip {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0.4rem 0.25rem;
    border-radius: 0.375rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border, rgba(255, 255, 255, 0.04));
}

.chip-val {
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--accent, #5eead4);
    line-height: 1.2;
}

.chip-lbl {
    font-size: 0.6875rem;
    color: var(--text-2, #94a3b8);
    line-height: 1.2;
}

/* Product montage slide */
.products-montage-body {
    padding: 1rem;
}

.product-image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    border-radius: 0.5rem;
    overflow: hidden;
    background: #020617;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-badge {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.25rem 0.6rem;
    border-radius: 9999px;
    font-size: 0.6875rem;
    font-weight: 600;
    background: rgba(0, 0, 0, 0.75);
    color: var(--accent, #5eead4);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.product-meta {
    padding-top: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.product-name {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-1, #f8fafc);
    margin: 0;
}

.product-desc {
    font-size: 0.8125rem;
    color: var(--text-2, #94a3b8);
    margin: 0;
}

.product-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--accent, #5eead4);
    text-decoration: none;
    margin-top: 0.25rem;
}

/* Scroll cue */
.scroll-cue {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}

.scroll-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    text-decoration: none;
    color: var(--text-2, #94a3b8);
    transition: color 0.2s ease;
}

.scroll-link:hover {
    color: var(--accent, #5eead4);
}

.scroll-text {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.15em;
}

.animate-bounce {
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-4px); }
    60% { transform: translateY(-2px); }
}

/* Light theme overrides */
:global([data-theme="light"]) .split-hero {
    background-color: var(--bg-primary, #f8fafc);
    color: var(--text-1, #0f172a);
}

:global([data-theme="light"]) .glow-orb {
    opacity: 0.04;
}

:global([data-theme="light"]) .grid-overlay {
    opacity: 0.12;
}

:global([data-theme="light"]) .hero-headline {
    color: #0f172a !important;
}

:global([data-theme="light"]) .gradient-accent {
    background: linear-gradient(135deg, #0f766e 0%, #0284c7 45%, #6d28d9 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
}

:global([data-theme="light"]) .hero-eyebrow {
    color: #0d9488 !important;
}

:global([data-theme="light"]) .eyebrow-line {
    background-color: #0d9488 !important;
}

:global([data-theme="light"]) .proof-line {
    color: #0f766e !important;
    font-weight: 700 !important;
}

:global([data-theme="light"]) .hero-bio {
    color: #334155 !important;
}

:global([data-theme="light"]) .hero-bio strong {
    color: #0f172a !important;
}

:global([data-theme="light"]) .status-pill {
    background: #ffffff;
    border-color: rgba(15, 23, 42, 0.1);
    color: #475569;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

:global([data-theme="light"]) .status-pill.available {
    color: #0f172a;
    border-color: rgba(13, 148, 136, 0.35);
}

:global([data-theme="light"]) .social-link {
    color: #475569;
}

:global([data-theme="light"]) .social-link:hover,
:global([data-theme="light"]) .social-link.highlight {
    color: #0d9488;
}

:global([data-theme="light"]) .hero-panel {
    background: #ffffff;
    border-color: rgba(15, 23, 42, 0.1);
    box-shadow: 0 20px 48px -12px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.05);
}

:global([data-theme="light"]) .panel-header {
    background: #f8fafc;
    border-color: rgba(15, 23, 42, 0.08);
}

:global([data-theme="light"]) .panel-title-tag {
    color: #64748b;
}

:global([data-theme="light"]) .arch-node-item {
    background: #f8fafc;
    border-color: rgba(15, 23, 42, 0.08);
}

:global([data-theme="light"]) .arch-node-item.is-active {
    background: #f0fdfa;
    border-color: rgba(13, 148, 136, 0.4);
    box-shadow: 0 4px 14px rgba(13, 148, 136, 0.08);
}

:global([data-theme="light"]) .node-icon-box {
    background: #ffffff;
    border-color: rgba(15, 23, 42, 0.1);
}

:global([data-theme="light"]) .node-title {
    color: #0f172a !important;
    font-weight: 700;
}

:global([data-theme="light"]) .node-sub {
    color: #64748b !important;
    font-weight: 500;
}

:global([data-theme="light"]) .btn-primary {
    background-color: #0d9488;
    color: #ffffff;
    box-shadow: 0 4px 16px rgba(13, 148, 136, 0.3);
}

:global([data-theme="light"]) .btn-primary:hover {
    background-color: #0f766e;
    box-shadow: 0 6px 20px rgba(13, 148, 136, 0.45);
}

:global([data-theme="light"]) .btn-secondary {
    background: #ffffff;
    color: #0f172a;
    border-color: rgba(15, 23, 42, 0.15);
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

:global([data-theme="light"]) .btn-secondary:hover {
    background: #f8fafc;
    border-color: #0d9488;
    color: #0d9488;
}

:global([data-theme="light"]) .btn-ai {
    background: #ffffff;
    color: #6366f1;
    border-color: rgba(99, 102, 241, 0.35);
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
}

:global([data-theme="light"]) .btn-ai:hover {
    background: rgba(99, 102, 241, 0.08);
    border-color: #6366f1;
    color: #4f46e5;
}

:global([data-theme="light"]) .proof-chip {
    background: #f8fafc;
    border-color: rgba(15, 23, 42, 0.08);
}

:global([data-theme="light"]) .chip-val {
    color: #0d9488 !important;
    font-weight: 800;
}

:global([data-theme="light"]) .chip-lbl {
    color: #64748b !important;
}

:global([data-theme="light"]) .scroll-link {
    color: #64748b;
}

:global([data-theme="light"]) .scroll-link:hover {
    color: #0d9488;
}

:global([data-theme="light"]) .product-badge {
    background: rgba(255, 255, 255, 0.85);
    border-color: rgba(15, 23, 42, 0.1);
    color: #0f172a;
}

:global([data-theme="light"]) .product-image-container {
    background: #f1f5f9;
    border: 1px solid rgba(15, 23, 42, 0.1);
}

:global([data-theme="light"]) .product-name {
    color: #0f172a !important;
}

:global([data-theme="light"]) .product-desc {
    color: #475569 !important;
}


/* Responsive adjustments */
@media (max-width: 960px) {
    .hero-container {
        grid-template-columns: 1fr;
        gap: 2.5rem;
    }

    .hero-content {
        align-items: flex-start;
    }

    .hero-headline {
        font-size: clamp(2rem, 6.5vw, 2.75rem);
    }

    .panel-proof-strip {
        grid-template-columns: repeat(2, 1fr);
    }

    .split-hero {
        padding-top: calc(var(--nav-height, 4.5rem) + 1.25rem);
        min-height: auto;
    }
}

@media (max-width: 480px) {
    .cta-group {
        width: 100%;
        flex-direction: column;
        align-items: stretch;
    }

    .btn-primary, .btn-secondary, .btn-ai {
        justify-content: center;
    }

    .hero-panel-wrapper {
        margin-top: 0.5rem;
    }
}

/* Reduced-motion handling */
@media (prefers-reduced-motion: reduce) {
    .glow-orb,
    .pulse-dot,
    .animate-bounce,
    .pulse-traveler {
        animation: none !important;
    }

    .proof-slide-enter-active,
    .proof-slide-leave-active {
        transition: none !important;
    }

    .arch-node-item {
        transition: none !important;
        transform: none !important;
    }
}
</style>
