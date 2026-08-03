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

const ScrollySequence = defineAsyncComponent(() => import('@/Components/PortfolioV2/ScrollySequence.vue'))
const AboutSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/AboutSection.vue'))
const TimelineSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/TimelineSection.vue'))
const WorksSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/WorksSection.vue'))
const FeaturedCaseStudySection = defineAsyncComponent(() => import('@/Components/PortfolioV2/FeaturedCaseStudySection.vue'))
const TechStackSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/TechStackSection.vue'))
const ContactSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/ContactSection.vue'))
import ChatWidget from '@/Components/PortfolioV2/ChatWidget.vue'
import ScrollUtilities from '@/Components/PortfolioV2/ScrollUtilities.vue'
import CookieConsent from '@/Components/PortfolioV2/CookieConsent.vue'
import { useKeyboardShortcuts } from '@/Composables/useKeyboardShortcuts'

const props = defineProps<PortfolioPageProps>()

const { depthVars } = useMouseDepth(1)
const depthRef = ref<HTMLElement | null>(null)

// Keyboard shortcuts: digits jump between sections, `g h` returns to top,
// `/` scrolls to and focuses the contact form. Never fires while typing.
useKeyboardShortcuts()

const linkedinLink = props.socialLinks.find(l => l.platform === 'linkedin')

// Person and WebSite JSON-LD now come from PortfolioController::seo() and are
// emitted server-side, where crawlers can actually read them.

const heroReady = ref(false)
const pageReady = ref(false)
const heroProgress = ref(0)
const minLoaderElapsed = ref(false)
let minTimer: number | null = null

const showInitialLoader = computed(() => {
    return !(heroReady.value && pageReady.value && minLoaderElapsed.value)
})

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
    if (!depthRef.value) return
    const sections = depthRef.value.querySelectorAll(':scope > *')
    sections.forEach((section, i) => {
        gsap.fromTo(section,
            { z: -80, opacity: 0.3, rotateX: 2 },
            {
                z: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section as Element,
                    start: 'top 90%',
                    end: 'top 40%',
                    scrub: 0.8,
                },
            }
        )
    })
}

onMounted(() => {
    minTimer = window.setTimeout(() => {
        minLoaderElapsed.value = true
    }, 700)

    if (document.readyState === 'complete') {
        pageReady.value = true
    } else {
        window.addEventListener('load', handlePageLoaded, { once: true })
    }

    setTimeout(() => nextTick(initScrollDepth), 300)
})

onUnmounted(() => {
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
        <InitialLoader :visible="showInitialLoader" :progress="heroProgress" />

        <CustomCursor />

        <NavBar
            :initials="profile.name.split(' ').map(w => w[0]).join('')"
            :linkedin-url="linkedinLink?.url"
            :social-links="socialLinks"
            :resume-url="profile.resumeUrl"
        />

        <ScrollySequence
            :name="profile.name"
            :title="profile.title"
            :subtitle="profile.subtitle"
            :image-url="profile.avatarUrl"
            @hero-ready="handleHeroReady"
            @hero-progress="handleHeroProgress"
        />

        <div ref="depthRef" class="depth-sections">
            <AboutSection :profile="profile" />
            <TimelineSection :experiences="experiences" />
            <WorksSection :projects="projects" />
            <FeaturedCaseStudySection />
            <TechStackSection :skills="skills" />
            <ContactSection
                :profile="profile"
                :social-links="socialLinks"
                :educations="educations"
            />
        </div>

        <ChatWidget />
        <ScrollUtilities />
        <CookieConsent />
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
