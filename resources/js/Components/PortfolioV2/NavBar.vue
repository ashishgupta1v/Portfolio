<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import { onMounted, onUnmounted, ref } from 'vue'
import type { SocialLink } from '@/types/portfolio'
import { Github, Linkedin, Mail, Youtube, Instagram, Menu, X } from 'lucide-vue-next'

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
})

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
})
</script>

<template>
    <nav class="nav">
        <div class="nav-inner">
            <!-- Logo / Initials -->
            <button class="nav-logo" @click="scrollToTop">
                {{ initials }}
            </button>

            <span class="nav-spacer" aria-hidden="true" />

            <!-- Right: section links (desktop) -->
            <div class="nav-links">
                <button class="nav-link" @click="scrollTo('about')">ABOUT</button>
                <button class="nav-link" @click="scrollTo('work')">WORK</button>
                <Link href="/case-studies" class="nav-link nav-link-anchor">CASE STUDIES</Link>
                <Link href="/engagements" class="nav-link nav-link-anchor">ENGAGEMENTS</Link>
                <button class="nav-link" @click="scrollTo('contact')">CONTACT</button>
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
                <button class="mobile-link" @click="scrollTo('about')">About</button>
                <button class="mobile-link" @click="scrollTo('work')">Work</button>
                <Link href="/case-studies" class="mobile-link" @click="mobileOpen = false">Case Studies</Link>
                <Link href="/engagements" class="mobile-link" @click="mobileOpen = false">Engagements</Link>
                <button class="mobile-link" @click="scrollTo('contact')">Contact</button>
                <div v-if="socialLinks?.length" class="mobile-socials">
                    <a
                        v-for="link in socialLinks"
                        :key="link.platform"
                        :href="link.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="mobile-social-icon"
                        :title="link.label"
                        @click="mobileOpen = false"
                    >
                        <component :is="iconMap[link.platform] || Mail" :size="20" />
                    </a>
                </div>
                <a v-if="resumeUrl" :href="resumeUrl" target="_blank" rel="noopener noreferrer" class="mobile-resume" @click="mobileOpen = false">Download Resume</a>
            </nav>
        </div>
    </Transition>

    <!-- Left social sidebar -->
    <aside v-if="socialLinks?.length" class="social-sidebar">
        <a
            v-for="link in socialLinks"
            :key="link.platform"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="sidebar-icon"
            :title="link.label"
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
    color: #f8fafc;
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: color 0.3s ease;
}
.nav-logo:hover {
    color: #5eead4;
}

.nav-linkedin {
    color: rgba(226, 232, 240, 0.45);
    font-size: 0.78rem;
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: color 0.3s;
}
.nav-linkedin:hover { color: rgba(226, 232, 240, 0.8); }

.nav-spacer {
    width: 18rem;
    max-width: 34vw;
}

.nav-links {
    display: flex;
    gap: 2.2rem;
}

.nav-link {
    background: none;
    border: none;
    color: rgba(226, 232, 240, 0.7);
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
    transition: color 0.3s ease;
    padding: 0;
}
.nav-link:hover { color: #f8fafc; }

.nav-link-anchor {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
}

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
    background: linear-gradient(to bottom, rgba(148, 163, 184, 0.35), transparent);
    margin-top: 0.5rem;
}

.sidebar-icon {
    color: rgba(226, 232, 240, 0.45);
    transition: all 0.3s ease;
    display: flex;
}
.sidebar-icon:hover {
    color: #5eead4;
    transform: translateY(-2px);
}

/* ── Resume float ── */
.resume-float {
    position: fixed;
    right: 1.5rem;
    bottom: 2rem;
    z-index: 999;
    color: rgba(226, 232, 240, 0.45);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    text-decoration: none;
    writing-mode: vertical-rl;
    transition: color 0.3s ease;
}
.resume-float:hover { color: #5eead4; }

/* ── Hamburger ── */
.hamburger {
    display: none;
    background: none;
    border: none;
    color: rgba(226, 232, 240, 0.8);
    cursor: pointer;
    padding: 0.25rem;
    align-items: center;
    justify-content: center;
    transition: color 0.25s;
    z-index: 1001;
}
.hamburger:hover { color: #5eead4; }

/* ── Mobile overlay ── */
.mobile-overlay {
    position: fixed;
    inset: 0;
    z-index: 998;
    background: rgba(5, 8, 20, 0.5);
    backdrop-filter: blur(4px);
}
.mobile-menu {
    position: absolute;
    top: 0;
    right: 0;
    width: min(320px, 85vw);
    height: 100vh;
    background: #060d1c;
    border-left: 1px solid rgba(148, 163, 184, 0.12);
    display: flex;
    flex-direction: column;
    padding: 5rem 2rem 2.5rem;
    gap: 0.4rem;
}
.mobile-link {
    background: none;
    border: none;
    color: rgba(226, 232, 240, 0.65);
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-align: left;
    text-decoration: none;
    padding: 0.7rem 0;
    border-bottom: 1px solid rgba(148, 163, 184, 0.08);
    cursor: pointer;
    transition: color 0.2s;
    display: block;
}
.mobile-link:hover { color: #5eead4; }
.mobile-socials {
    display: flex;
    gap: 1.2rem;
    padding: 1.5rem 0 0.5rem;
}
.mobile-social-icon {
    color: rgba(226, 232, 240, 0.45);
    display: flex;
    transition: color 0.2s;
}
.mobile-social-icon:hover { color: #5eead4; }
.mobile-resume {
    margin-top: auto;
    color: #5eead4;
    font-size: 0.82rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid rgba(94, 234, 212, 0.3);
    padding: 0.65rem 1rem;
    border-radius: 4px;
    text-align: center;
    transition: background 0.2s;
}
.mobile-resume:hover { background: rgba(94, 234, 212, 0.08); }

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

/* ── Mobile ── */
@media (max-width: 768px) {
    .nav { padding: 0 1rem; height: 3.2rem; }
    .nav-spacer { display: none; }
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .social-sidebar { display: none; }
    .resume-float { display: none; }
    .nav-logo { font-size: 0.95rem; }
}
</style>
