<script setup lang="ts">
import { ref, onMounted, provide, nextTick } from 'vue'
import { Head } from '@inertiajs/vue3'
import type { PortfolioPageProps } from '@/types/portfolio'
import LoadingScreen from '@/Components/Portfolio/LoadingScreen.vue'
import MainContainer from '@/Components/Portfolio/MainContainer.vue'
import CustomCursor from '@/Components/Portfolio/CustomCursor.vue'

const props = defineProps<PortfolioPageProps>()

const isLoading = ref(true)
const loadProgress = ref(0)

provide('portfolioData', props)

function onLoadingComplete() {
    isLoading.value = false
}

function updateProgress(percent: number) {
    loadProgress.value = percent
}
</script>

<template>
    <Head :title="profile.name + ' — ' + profile.title" />

    <LoadingScreen
        v-if="isLoading"
        :progress="loadProgress"
        :name="profile.name"
        :title="profile.subtitle"
        @complete="onLoadingComplete"
    />

    <div
        :class="['main-body', { 'main-active': !isLoading }]"
    >
        <CustomCursor />
        <MainContainer
            :profile="profile"
            :experiences="experiences"
            :projects="projects"
            :skills="skills"
            :social-links="socialLinks"
            :educations="educations"
            :services="services"
            @progress="updateProgress"
        />
    </div>
</template>

<style>
.main-body {
    opacity: 0;
    transition: opacity 0.6s ease;
}

.main-active {
    opacity: 1;
}
</style>
