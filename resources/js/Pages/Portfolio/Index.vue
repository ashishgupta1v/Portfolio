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
const TechStackSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/TechStackSection.vue'))
const ContactSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/ContactSection.vue'))

const props = defineProps<PortfolioPageProps>()

const linkedinLink = props.socialLinks.find(l => l.platform === 'linkedin')

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
        <link rel="preload" as="image" href="/sequence/0000.webp" fetchpriority="high" />
        <link rel="preload" as="image" href="/sequence/0001.webp" fetchpriority="high" />
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
        <TechStackSection :skills="skills" />
        <ContactSection
            :profile="profile"
            :social-links="socialLinks"
            :educations="educations"
        />
    </div>
</template>

<style scoped>
.v2-page {
    min-height: 100vh;
    background: #090e14;
}
</style>
