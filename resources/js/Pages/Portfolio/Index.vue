<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'
import { Head } from '@inertiajs/vue3'
import type { PortfolioPageProps } from '@/types/portfolio'
import CustomCursor from '@/Components/Portfolio/CustomCursor.vue'
import NavBar from '@/Components/PortfolioV2/NavBar.vue'
import ScrollySequence from '@/Components/PortfolioV2/ScrollySequence.vue'
import InitialLoader from '@/Components/PortfolioV2/InitialLoader.vue'

const AboutSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/AboutSection.vue'))
const TimelineSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/TimelineSection.vue'))
const WorksSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/WorksSection.vue'))
const FeaturedCaseStudySection = defineAsyncComponent(() => import('@/Components/PortfolioV2/FeaturedCaseStudySection.vue'))
const TechStackSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/TechStackSection.vue'))
const ContactSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/ContactSection.vue'))
import ChatWidget from '@/Components/PortfolioV2/ChatWidget.vue'

const props = defineProps<PortfolioPageProps>()

const linkedinLink = props.socialLinks.find(l => l.platform === 'linkedin')

const personSchema = computed(() => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: props.profile.name,
    url: 'https://www.ashishgupta.dev/',
    jobTitle: props.profile.title,
    description: props.profile.bio,
    email: props.profile.email,
    sameAs: props.socialLinks.map(l => l.url).filter(u => !u.startsWith('mailto:')),
    knowsAbout: Object.values(props.skills).flat().map((s: any) => s.name),
    worksFor: { '@type': 'Organization', name: 'Infosys' },
}))

const websiteSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://www.ashishgupta.dev/',
    name: 'Ashish Gupta',
    description: 'Senior Full-Stack Architect — VILT Stack Specialist',
})

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

onMounted(() => {
    minTimer = window.setTimeout(() => {
        minLoaderElapsed.value = true
    }, 700)

    if (document.readyState === 'complete') {
        pageReady.value = true
    } else {
        window.addEventListener('load', handlePageLoaded, { once: true })
    }

})

onUnmounted(() => {
    if (minTimer) clearTimeout(minTimer)
    window.removeEventListener('load', handlePageLoaded)
})
</script>

<template>
    <Head :title="profile.name + ' — ' + profile.title">
        <meta name="description" :content="profile.bio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ashishgupta.dev/" />
        <meta :property="'og:title'" :content="profile.name + ' — ' + profile.title" />
        <meta property="og:description" :content="profile.bio" />
        <meta property="og:image" content="https://www.ashishgupta.dev/images/og-cover.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Ashish Gupta" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content="profile.name + ' — ' + profile.title" />
        <meta name="twitter:description" :content="profile.bio" />
        <meta name="twitter:image" content="https://www.ashishgupta.dev/images/og-cover.png" />
        <link rel="canonical" href="https://www.ashishgupta.dev/" />
        <component is="script" type="application/ld+json" v-html="personSchema" />
        <component is="script" type="application/ld+json" v-html="websiteSchema" />
    </Head>

    <div class="v2-page">
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
        
        <ChatWidget />
    </div>
</template>

<style scoped>
.v2-page {
    min-height: 100vh;
    background: #090e14;
}

@media (min-width: 1024px) {
    .v2-page,
    .v2-page * {
        cursor: none;
    }
}
</style>
