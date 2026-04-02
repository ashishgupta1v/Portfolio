<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { PortfolioPageProps } from '@/types/portfolio'
import { useIsDesktop } from '@/Composables/useMediaQuery'
import NavBar from '@/Components/Portfolio/NavBar.vue'
import SocialIcons from '@/Components/Portfolio/SocialIcons.vue'
import LandingSection from '@/Components/Portfolio/LandingSection.vue'
import AboutSection from '@/Components/Portfolio/AboutSection.vue'
import WhatIDoSection from '@/Components/Portfolio/WhatIDoSection.vue'
import CareerSection from '@/Components/Portfolio/CareerSection.vue'
import WorkSection from '@/Components/Portfolio/WorkSection.vue'
import TechStackSection from '@/Components/Portfolio/TechStackSection.vue'
import ContactSection from '@/Components/Portfolio/ContactSection.vue'
import CharacterScene from '@/Components/Character/CharacterScene.vue'

const props = defineProps<PortfolioPageProps & { onProgress?: (p: number) => void }>()
const emit = defineEmits<{ progress: [number] }>()

const isDesktop = useIsDesktop()

function onCharacterProgress(percent: number) {
    emit('progress', percent)
}
</script>

<template>
    <div class="portfolio-container">
        <NavBar :name="profile.name" :social-links="socialLinks" />
        <SocialIcons :links="socialLinks" />

        <!-- 3D Character (Desktop: side, Mobile: in landing) -->
        <CharacterScene
            v-if="isDesktop"
            class="character-desktop"
            @progress="onCharacterProgress"
        />

        <div id="smooth-wrapper">
            <div id="smooth-content">
                <LandingSection :profile="profile">
                    <CharacterScene
                        v-if="!isDesktop"
                        class="character-mobile"
                        @progress="onCharacterProgress"
                    />
                </LandingSection>

                <AboutSection :profile="profile" />
                <WhatIDoSection :services="services" />
                <CareerSection :experiences="experiences" />
                <WorkSection :projects="projects" />
                <TechStackSection v-if="isDesktop" :skills="skills" />
                <ContactSection
                    :profile="profile"
                    :social-links="socialLinks"
                    :educations="educations"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.portfolio-container {
    position: relative;
    min-height: 100vh;
    background: var(--bg-primary);
    overflow: hidden;
}

.character-desktop {
    position: fixed;
    top: 0;
    right: 0;
    width: 50%;
    height: 100vh;
    z-index: 10;
    pointer-events: none;
}

.character-mobile {
    width: 100%;
    height: 50vh;
}

#smooth-wrapper {
    position: relative;
    z-index: 5;
}
</style>
