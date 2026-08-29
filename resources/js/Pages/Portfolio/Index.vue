<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref, nextTick } from 'vue'
import { Head } from '@inertiajs/vue3'
import type { PortfolioPageProps } from '@/types/portfolio'
import { useMouseDepth } from '@/Composables/useMouseDepth'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from '@/Components/Portfolio/CustomCursor.vue'
import NavBar from '@/Components/PortfolioV2/NavBar.vue'
import InitialLoader from '@/Components/PortfolioV2/InitialLoader.vue'

gsap.registerPlugin(ScrollTrigger)

import SectionSkeleton from '@/Components/PortfolioV2/SectionSkeleton.vue'
import SplitHero from '@/Components/PortfolioV2/SplitHero.vue'

// Each async section shares the same skeleton placeholder while its chunk
// loads. `delay` prevents a flash of skeleton on fast connections — nothing
// shows for the first 200ms, so a chunk that resolves quickly never blinks.
// `timeout` gives up after 12s and lets `errorComponent` render (we reuse
// the skeleton silently rather than showing a scary error box).
const asyncOpts = { loadingComponent: SectionSkeleton, delay: 200, timeout: 12_000 } as const

const AboutSection = defineAsyncComponent({ loader: () => import('@/Components/PortfolioV2/AboutSection.vue'), ...asyncOpts })
const TimelineSection = defineAsyncComponent({ loader: () => import('@/Components/PortfolioV2/TimelineSection.vue'), ...asyncOpts })
const WorksSection = defineAsyncComponent({ loader: () => import('@/Components/PortfolioV2/WorksSection.vue'), ...asyncOpts })
const MetricsSection = defineAsyncComponent({ loader: () => import('@/Components/PortfolioV2/MetricsSection.vue'), ...asyncOpts })
const TestimonialsSection = defineAsyncComponent({ loader: () => import('@/Components/PortfolioV2/TestimonialsSection.vue'), ...asyncOpts })
const FeaturedCaseStudySection = defineAsyncComponent({ loader: () => import('@/Components/PortfolioV2/FeaturedCaseStudySection.vue'), ...asyncOpts })
const TechStackSection = defineAsyncComponent({ loader: () => import('@/Components/PortfolioV2/TechStackSection.vue'), ...asyncOpts })
const GitHubActivity = defineAsyncComponent({ loader: () => import('@/Components/PortfolioV2/GitHubActivity.vue'), ...asyncOpts })
const ContactSection = defineAsyncComponent({ loader: () => import('@/Components/PortfolioV2/ContactSection.vue'), ...asyncOpts })
import ChatWidget from '@/Components/PortfolioV2/ChatWidget.vue'
import ScrollUtilities from '@/Components/PortfolioV2/ScrollUtilities.vue'
import CommandPalette from '@/Components/PortfolioV2/CommandPalette.vue'
import TerminalMode from '@/Components/PortfolioV2/TerminalMode.vue'
import ToastContainer from '@/Components/PortfolioV2/ToastContainer.vue'
import { useKeyboardShortcuts } from '@/Composables/useKeyboardShortcuts'

import { useLenisSmoothScroll } from '@/Composables/useLenisSmoothScroll'

const props = defineProps<PortfolioPageProps>()

const { depthVars } = useMouseDepth(1)
const depthRef = ref<HTMLElement | null>(null)
const { initLenis, destroyLenis } = useLenisSmoothScroll()

// Keyboard shortcuts: digits jump between sections, `g h` returns to top,
// `/` scrolls to and focuses the contact form. Never fires while typing.
useKeyboardShortcuts()

const linkedinLink = props.socialLinks.find(l => l.platform === 'linkedin')
const githubLink = props.socialLinks.find(l => l.platform === 'github')

function handleOpenAiAssistant() {
    window.dispatchEvent(new CustomEvent('open-ai-assistant'))
}

function handleTrackCta(type: string) {
    if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible('hero_cta', { props: { type } })
    }
}

// Person and WebSite JSON-LD now come from PortfolioController::seo() and are
// emitted server-side, where crawlers can actually read them.

const heroReady = ref(true)
const pageReady = ref(false)
const heroProgress = ref(100)
const minLoaderElapsed = ref(false)
let minTimer: number | null = null

const isAlreadyBooted = typeof window !== 'undefined' && Boolean(sessionStorage.getItem('ag_portfolio_booted'))
const skippedLoader = ref(isAlreadyBooted)

const showInitialLoader = computed(() => {
    if (skippedLoader.value) return false
    return !(heroReady.value && pageReady.value && minLoaderElapsed.value)
})

function handleSkipLoader() {
    skippedLoader.value = true
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('ag_portfolio_booted', 'true')
    }
}

function handleHeroReady() {
    heroReady.value = true
}

function handleHeroProgress(value: number) {
    heroProgress.value = value
}

function handlePageLoaded() {
    pageReady.value = true
}

function initScrollDepth() {
    // Keep sections crisp and fully opaque without low-contrast scrub dimming
    if (!depthRef.value) return
    const sections = depthRef.value.querySelectorAll(':scope > *')
    sections.forEach((section) => {
        gsap.set(section, { opacity: 1, z: 0, rotateX: 0, clearProps: 'opacity,transform' })
    })
}

onMounted(() => {
    initLenis()

    minTimer = window.setTimeout(() => {
        minLoaderElapsed.value = true
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('ag_portfolio_booted', 'true')
        }
    }, 700)

    if (document.readyState === 'complete') {
        pageReady.value = true
    } else {
        window.addEventListener('load', handlePageLoaded, { once: true })
    }

    setTimeout(() => nextTick(initScrollDepth), 150)
})

onUnmounted(() => {
    destroyLenis()
    if (minTimer) clearTimeout(minTimer)
    window.removeEventListener('load', handlePageLoaded)
})
</script>

<template>
    <!--
        og:/twitter:/canonical/JSON-LD are rendered server-side by
        resources/views/partials/seo.blade.php instead of here. Tags declared in
        this component are only applied once Vue hydrates, so no social crawler
        ever saw them. Only the title stays, so client-side navigation keeps the
        browser tab in sync.
    -->
    <Head :title="profile.name + ' — ' + profile.title" />

    <div class="v2-page" :style="depthVars">
        <InitialLoader
            :visible="showInitialLoader"
            :progress="heroProgress"
            @skip="handleSkipLoader"
        />

        <CustomCursor />
        <ToastContainer />

        <NavBar
            :initials="profile.name.split(' ').map(w => w[0]).join('')"
            :linkedin-url="linkedinLink?.url"
            :social-links="socialLinks"
            :resume-url="profile.resumeUrl"
        />

        <SplitHero
            :name="profile.name"
            :title="profile.title"
            :subtitle="profile.subtitle"
            :resume-url="profile.resumeUrl"
            :contact-email="profile.email"
            :linkedin-url="linkedinLink?.url"
            :github-url="githubLink?.url"
            :avatar-url="profile.avatarUrl"
            panel-mode="architecture"
            @open-assistant="handleOpenAiAssistant"
            @cta="handleTrackCta"
        />

        <main id="main-content" ref="depthRef" class="depth-sections" role="main">
            <AboutSection :profile="profile" />
            <TimelineSection :experiences="experiences" />
            <WorksSection :projects="projects" />
            <MetricsSection />
            <TestimonialsSection />
            <FeaturedCaseStudySection />
            <TechStackSection :skills="skills" />
            <GitHubActivity />
            <ContactSection
                :profile="profile"
                :social-links="socialLinks"
                :educations="educations"
            />
        </main>

        <ChatWidget />
        <ScrollUtilities />
        <CommandPalette />
        <TerminalMode />
    </div>
</template>

<style scoped>
.v2-page {
    min-height: 100vh;
    background: var(--bg-primary);
}

.depth-sections {
    position: relative;
    z-index: 1;
    perspective: 1200px;
    perspective-origin: 50% 0%;
}

.depth-sections :deep(> *) {
    transform-style: preserve-3d;
    will-change: transform, opacity;
}

.depth-sections :deep(article),
.depth-sections :deep(.capability-card),
.depth-sections :deep(.work-row),
.depth-sections :deep(.timeline-node) {
    transition: transform 0.3s ease;
}

.depth-sections :deep(article:hover),
.depth-sections :deep(.capability-card:hover),
.depth-sections :deep(.work-row:hover) {
    transform:
        perspective(800px)
        rotateX(calc(var(--my, 0) * -1.5deg))
        rotateY(calc(var(--mx, 0) * 1.5deg))
        translateZ(12px);
}

@media (min-width: 1024px) {
    .v2-page,
    .v2-page * {
        cursor: none;
    }
}

@media (prefers-reduced-motion: reduce) {
    .depth-sections :deep(article:hover),
    .depth-sections :deep(.capability-card:hover),
    .depth-sections :deep(.work-row:hover) {
        transform: none;
    }
}
</style>
