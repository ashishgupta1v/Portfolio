<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import type { PortfolioPageProps } from '@/types/portfolio'
import CustomCursor from '@/Components/Portfolio/CustomCursor.vue'
import NavBar from '@/Components/PortfolioV2/NavBar.vue'
import ScrollySequence from '@/Components/PortfolioV2/ScrollySequence.vue'
import AboutSection from '@/Components/PortfolioV2/AboutSection.vue'
import WhatIDoSection from '@/Components/PortfolioV2/WhatIDoSection.vue'
import TimelineSection from '@/Components/PortfolioV2/TimelineSection.vue'
import WorksSection from '@/Components/PortfolioV2/WorksSection.vue'
import TechStackSection from '@/Components/PortfolioV2/TechStackSection.vue'
import ContactSection from '@/Components/PortfolioV2/ContactSection.vue'

const props = defineProps<PortfolioPageProps>()

const linkedinLink = props.socialLinks.find(l => l.platform === 'linkedin')
</script>

<template>
    <Head :title="profile.name + ' — ' + profile.title" />

    <div class="v2-page">
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
        />

        <AboutSection :profile="profile" />
        <WhatIDoSection :services="services" />
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
