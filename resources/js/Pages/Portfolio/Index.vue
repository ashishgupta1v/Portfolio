<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref, nextTick } from 'vue'
import { Head } from '@inertiajs/vue3'
import type { PortfolioPageProps } from '@/types/portfolio'
import { useMouseDepth } from '@/Composables/useMouseDepth'
import NavBar from '@/Components/PortfolioV2/NavBar.vue'

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

// Below-the-fold auxiliary widgets and modals are loaded asynchronously
const InitialLoader = defineAsyncComponent(() => import('@/Components/PortfolioV2/InitialLoader.vue'))
const ChatWidget = defineAsyncComponent(() => import('@/Components/PortfolioV2/ChatWidget.vue'))
const ScrollUtilities = defineAsyncComponent(() => import('@/Components/PortfolioV2/ScrollUtilities.vue'))
const CommandPalette = defineAsyncComponent(() => import('@/Components/PortfolioV2/CommandPalette.vue'))
const TerminalMode = defineAsyncComponent(() => import('@/Components/PortfolioV2/TerminalMode.vue'))
const ToastContainer = defineAsyncComponent(() => import('@/Components/PortfolioV2/ToastContainer.vue'))
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
const pageReady = ref(true)
const heroProgress = ref(100)
const minLoaderElapsed = ref(true)

const showInitialLoader = ref(false)

function handleSkipLoader() {
    showInitialLoader.value = false
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

function initScrollDepth() {
    // Keep sections crisp and fully opaque without low-contrast scrub dimming
    if (!depthRef.value) return
    const sections = depthRef.value.querySelectorAll(':scope > *')
    sections.forEach((section) => {
        const el = section as HTMLElement
        el.style.opacity = '1'
        el.style.transform = 'none'
    })
}

onMounted(() => {
    pageReady.value = true

    if (typeof window !== 'undefined') {
        sessionStorage.setItem('ag_portfolio_booted', 'true')

        // Defer Lenis smooth scroll until idle or first interaction to keep FCP sub-second
        const scheduleLenis = () => {
            window.removeEventListener('scroll', scheduleLenis)
            window.removeEventListener('pointerdown', scheduleLenis)
            window.removeEventListener('keydown', scheduleLenis)
            initLenis()
        }
        window.addEventListener('scroll', scheduleLenis, { passive: true, once: true })
        window.addEventListener('pointerdown', scheduleLenis, { passive: true, once: true })
        window.addEventListener('keydown', scheduleLenis, { passive: true, once: true })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ('requestIdleCallback' in window) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).requestIdleCallback(() => initLenis(), { timeout: 2500 })
        } else {
            setTimeout(initLenis, 1500)
        }
    }

    setTimeout(() => nextTick(initScrollDepth), 100)
})

onUnmounted(() => {
    destroyLenis()
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
