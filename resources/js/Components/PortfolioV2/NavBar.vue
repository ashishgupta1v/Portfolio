<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { SocialLink } from '@/types/portfolio'
import { Github, Linkedin, Mail, Youtube, Instagram } from 'lucide-vue-next'

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

function onScroll() {
    scrolled.value = window.scrollY > 60
}

function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
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

            <!-- Right: section links -->
            <div class="nav-links">
                <button class="nav-link" @click="scrollTo('about')">ABOUT</button>
                <button class="nav-link" @click="scrollTo('work')">WORK</button>
                <button class="nav-link" @click="scrollTo('contact')">CONTACT</button>
            </div>
        </div>
    </nav>

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

/* ── Mobile ── */
@media (max-width: 768px) {
    .nav { padding: 0 1rem; height: 3.2rem; }
    .nav-spacer { display: none; }
    .nav-links { gap: 1.2rem; }
    .nav-link { font-size: 0.75rem; }
    .social-sidebar { display: none; }
    .resume-float { display: none; }
    .nav-logo { font-size: 0.95rem; }
}

@media (max-width: 480px) {
    .nav-links { gap: 0.8rem; }
}
</style>
