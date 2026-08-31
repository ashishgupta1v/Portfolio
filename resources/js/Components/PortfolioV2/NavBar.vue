<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import { onMounted, onUnmounted, ref } from 'vue'
import type { SocialLink } from '@/types/portfolio'
import { Github, Linkedin, Mail, Youtube, Instagram, Menu, X, ArrowUpRight } from 'lucide-vue-next'
import ThemeToggle from '@/Components/PortfolioV2/ThemeToggle.vue'

const props = defineProps<{
    initials: string
    linkedinUrl?: string
    socialLinks?: SocialLink[]
    resumeUrl?: string | null
}>()

const iconMap: Record<string, any> = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
    youtube: Youtube,
    instagram: Instagram,
}

const scrolled = ref(false)
const mobileOpen = ref(false)
const activeSection = ref('')

const SECTION_IDS = ['about', 'career', 'work', 'metrics', 'tech', 'contact']
let sectionObserver: IntersectionObserver | null = null

function onScroll() {
    scrolled.value = window.scrollY > 60
}

function scrollTo(id: string) {
    mobileOpen.value = false
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function scrollToTop() {
    mobileOpen.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    router.on('navigate', () => { mobileOpen.value = false })

    sectionObserver = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    activeSection.value = entry.target.id
                }
            }
        },
        { rootMargin: '-30% 0px -60% 0px' },
    )

    function observeSections() {
        for (const id of SECTION_IDS) {
            const el = document.getElementById(id)
            if (el) sectionObserver!.observe(el)
        }
    }

    // Async sections may not be in the DOM yet when NavBar mounts.
    // Retry until they appear, then stop.
    let attempts = 0
    const poll = setInterval(() => {
        observeSections()
        attempts++
        if (attempts >= 10) clearInterval(poll)
    }, 500)
})

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    sectionObserver?.disconnect()
})
</script>

<template>
    <nav class="nav" :class="{ scrolled }" aria-label="Main navigation">
        <div class="nav-inner">
            <!-- Logo / Initials -->
            <button class="nav-logo" @click="scrollToTop">
                {{ initials }}
            </button>

            <span class="nav-spacer" aria-hidden="true" />

            <!-- Right: section links (desktop) -->
            <div class="nav-links">
                <button class="nav-link" :class="{ active: activeSection === 'about' }" @click="scrollTo('about')">ABOUT</button>
                <button class="nav-link" :class="{ active: activeSection === 'career' }" @click="scrollTo('career')">EXPERIENCE</button>
                <button class="nav-link" :class="{ active: activeSection === 'work' }" @click="scrollTo('work')">WORK</button>
                <Link href="/case-studies" class="nav-link nav-link-anchor">CASE STUDIES</Link>
                <Link href="/for-hiring-managers" class="nav-link nav-link-anchor nav-link-highlight">FOR HIRING</Link>
                <Link href="/blog" class="nav-link nav-link-anchor">BLOG</Link>
                <button class="nav-link" :class="{ active: activeSection === 'contact' }" @click="scrollTo('contact')">CONTACT</button>
                
                <a
                    v-if="resumeUrl"
                    :href="resumeUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="nav-resume-pill glow-pill"
                    aria-label="Download Ashish Gupta's Résumé (PDF)"
                >
                    <span>RÉSUMÉ</span>
                    <ArrowUpRight :size="12" aria-hidden="true" />
                </a>

                <ThemeToggle class="nav-link a11y-toggle" />
            </div>

            <!-- Hamburger button (mobile) -->
            <button class="hamburger" :aria-expanded="mobileOpen" aria-label="Toggle menu" @click="mobileOpen = !mobileOpen">
                <X v-if="mobileOpen" :size="22" />
                <Menu v-else :size="22" />
            </button>
        </div>
    </nav>

    <!-- Mobile overlay menu -->
    <Transition name="mobile-menu">
        <div v-if="mobileOpen" class="mobile-overlay" @click.self="mobileOpen = false">
            <nav class="mobile-menu">
                <button class="mobile-link" :class="{ active: activeSection === 'about' }" @click="scrollTo('about')">About</button>
                <button class="mobile-link" :class="{ active: activeSection === 'career' }" @click="scrollTo('career')">Experience</button>
                <button class="mobile-link" :class="{ active: activeSection === 'work' }" @click="scrollTo('work')">Work</button>
                <Link href="/case-studies" class="mobile-link" @click="mobileOpen = false">Case Studies</Link>
                <Link href="/for-hiring-managers" class="mobile-link mobile-link-highlight" @click="mobileOpen = false">For Hiring Managers</Link>
                <Link href="/blog" class="mobile-link" @click="mobileOpen = false">Blog</Link>
                <button class="mobile-link" :class="{ active: activeSection === 'contact' }" @click="scrollTo('contact')">Contact</button>
                <div v-if="socialLinks?.length" class="mobile-socials">
                    <a
                        v-for="link in socialLinks"
                        :key="link.platform"
                        :href="link.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="mobile-social-icon"
                        :title="link.label"
                        :aria-label="link.label || link.platform"
                        @click="mobileOpen = false"
                    >
                        <component :is="iconMap[link.platform] || Mail" :size="20" />
                    </a>
                </div>
                <a v-if="resumeUrl" :href="resumeUrl" target="_blank" rel="noopener noreferrer" class="mobile-resume" @click="mobileOpen = false">Download Résumé (PDF)</a>
            </nav>
        </div>
    </Transition>

    <!-- Left social sidebar -->
    <aside v-if="socialLinks?.length" class="social-sidebar" aria-label="Social media links">
        <a
            v-for="link in socialLinks"
            :key="link.platform"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="sidebar-icon"
            :title="link.label"
            :aria-label="link.label || link.platform"
        >
            <component :is="iconMap[link.platform] || Mail" :size="18" />
        </a>
    </aside>

    <!-- Bottom-right resume link -->
    <a
        v-if="resumeUrl"
        :href="resumeUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="resume-float"
    >
        RESUME
    </a>
</template>

<style scoped>
/* ── Navbar ── */
.nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 0 2rem;
    height: 3.8rem;
    display: flex;
    align-items: center;
    transition: all 0.35s ease;
    background: transparent;
}

.nav.scrolled {
    background: var(--nav-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--nav-border, var(--border));
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.nav .nav-logo {
    color: var(--text-1);
}

.nav .nav-link {
    color: var(--text-2);
}

.nav .nav-link:hover {
    color: var(--text-1);
}

.nav .nav-link.active {
    color: var(--accent);
}

.nav .hamburger {
    color: var(--text-1);
}

.nav-inner {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav-logo {
    background: none;
    border: none;
    padding: 0;
    color: var(--text-1);
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: color 0.3s ease;
}
.nav-logo:hover {
    color: var(--accent);
}

.nav-linkedin {
    color: var(--text-3);
    font-size: 0.78rem;
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: color 0.3s;
}
.nav-linkedin:hover { color: var(--text-2); }

.nav-spacer {
    flex: 1;
    min-width: 1rem;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: clamp(1rem, 1.4vw, 2rem);
}

.nav-link {
    background: none;
    border: none;
    color: var(--text-2);
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
    transition: color 0.3s ease;
    padding: 0;
}
.nav-link:hover { color: var(--text-1); }
.nav-link.active { color: var(--accent); }

.nav-link-anchor {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
}

.nav-link-highlight {
    color: var(--accent);
    font-weight: 600;
}

.nav-resume-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.35rem 0.75rem;
    font-size: 0.72rem;
    font-weight: 750;
    letter-spacing: 0.06em;
    color: var(--text-on-accent);
    background: var(--accent);
    border-radius: 999px;
    text-decoration: none;
    transition: transform 0.2s, opacity 0.2s;
}

.nav-resume-pill:hover {
    opacity: 0.9;
    transform: translateY(-1px);
}

.mobile-link-highlight {
    color: var(--accent);
    font-weight: 700;
}

.a11y-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.a11y-toggle:hover { color: var(--accent); }

/* ── Social sidebar ── */
.social-sidebar {
    position: fixed;
    left: 1.5rem;
    bottom: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
}

.social-sidebar::after {
    content: '';
    display: block;
    width: 1px;
    height: 5rem;
    background: linear-gradient(to bottom, var(--border-strong), transparent);
    margin-top: 0.5rem;
}

.sidebar-icon {
    color: var(--text-3);
    transition: all 0.3s ease;
    display: flex;
}
.sidebar-icon:hover {
    color: var(--accent);
    transform: translateY(-2px);
}

/* ── Resume float ── */
.resume-float {
    position: fixed;
    right: 1.5rem;
    bottom: 2rem;
    z-index: 999;
    color: var(--text-3);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    text-decoration: none;
    writing-mode: vertical-rl;
    transition: color 0.3s ease;
}
.resume-float:hover { color: var(--accent); }

/* ── Hamburger ── */
.hamburger {
    display: none;
    background: none;
    border: none;
    color: var(--text-2);
    cursor: pointer;
    padding: 0.5rem;
    min-width: 44px;
    min-height: 44px;
    align-items: center;
    justify-content: center;
    transition: color 0.25s;
    z-index: 1001;
}
.hamburger:hover { color: var(--accent); }

/* ── Mobile overlay ── */
.mobile-overlay {
    position: fixed;
    inset: 0;
    z-index: 998;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
}
.mobile-menu {
    position: absolute;
    top: 0;
    right: 0;
    width: min(320px, 85vw);
    height: 100vh;
    height: 100dvh;
    background: var(--bg-elevated);
    border-left: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: calc(4.5rem + env(safe-area-inset-top, 0px)) 1.5rem calc(2rem + env(safe-area-inset-bottom, 0px));
    gap: 0.4rem;
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
}
.mobile-link {
    background: none;
    border: none;
    color: var(--text-2);
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-align: left;
    text-decoration: none;
    padding: 0.7rem 0;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    transition: color 0.2s;
    display: block;
}
.mobile-link:hover { color: var(--accent); }
.mobile-link.active { color: var(--accent); }
.mobile-socials {
    display: flex;
    gap: 1.2rem;
    padding: 1.5rem 0 0.5rem;
}
.mobile-social-icon {
    color: var(--text-3);
    display: flex;
    transition: color 0.2s;
}
.mobile-social-icon:hover { color: var(--accent); }
.mobile-resume {
    margin-top: auto;
    color: var(--accent);
    font-size: 0.82rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid rgba(var(--accent-rgb), 0.3);
    padding: 0.65rem 1rem;
    border-radius: 4px;
    text-align: center;
    transition: background 0.2s;
}
.mobile-resume:hover { background: rgba(var(--accent-rgb), 0.08); }

/* Transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: opacity 0.25s ease;
}
.mobile-menu-enter-active .mobile-menu,
.mobile-menu-leave-active .mobile-menu {
    transition: transform 0.25s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
    opacity: 0;
}
.mobile-menu-enter-from .mobile-menu,
.mobile-menu-leave-to .mobile-menu {
    transform: translateX(100%);
}

/* ── Mobile Responsive Breakpoint ── */
@media (max-width: 1024px) {
    .nav { padding: 0 1.25rem; height: 3.6rem; }
    .nav-spacer { display: none; }
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .social-sidebar { display: none; }
    .resume-float { display: none; }
    .nav-logo { font-size: 1rem; }
}

/* ── Light Mode Polish ── */
:global([data-theme="light"]) .nav {
    color: #0f172a;
}

:global([data-theme="light"]) .nav-logo {
    color: #0f172a;
}

:global([data-theme="light"]) .nav-logo:hover {
    color: #0d9488;
}

:global([data-theme="light"]) .nav-link {
    color: #334155;
}

:global([data-theme="light"]) .nav-link:hover {
    color: #0f172a;
}

:global([data-theme="light"]) .nav-link.active {
    color: #0d9488;
}

:global([data-theme="light"]) .nav-linkedin {
    color: #64748b;
}

:global([data-theme="light"]) .nav-linkedin:hover {
    color: #0d9488;
}

:global([data-theme="light"]) .sidebar-icon {
    color: #64748b;
}

:global([data-theme="light"]) .sidebar-icon:hover {
    color: #0d9488;
}

:global([data-theme="light"]) .resume-float {
    color: #64748b;
}

:global([data-theme="light"]) .resume-float:hover {
    color: #0d9488;
}

:global([data-theme="light"]) .hamburger {
    color: #0f172a;
}

:global([data-theme="light"]) .nav.scrolled {
    background: rgba(255, 255, 255, 0.94);
    border-bottom-color: rgba(15, 23, 42, 0.08);
    box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
}

:global([data-theme="light"]) .mobile-menu {
    background: #ffffff;
    border-left-color: rgba(15, 23, 42, 0.1);
    box-shadow: -8px 0 32px rgba(15, 23, 42, 0.08);
}

:global([data-theme="light"]) .mobile-link {
    color: #334155;
    border-bottom-color: rgba(15, 23, 42, 0.08);
}

:global([data-theme="light"]) .mobile-link:hover,
:global([data-theme="light"]) .mobile-link.active {
    color: #0d9488;
}

:global([data-theme="light"]) .mobile-theme-label {
    color: #334155;
}

:global([data-theme="light"]) .mobile-resume {
    background: #0d9488;
    color: #ffffff;
    border-color: #0d9488;
}
</style>
