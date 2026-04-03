<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import type { PortfolioPageProps } from '@/types/portfolio'
import CustomCursor from '@/Components/Portfolio/CustomCursor.vue'
import ScrollySequence from '@/Components/PortfolioV2/ScrollySequence.vue'
import TimelineSection from '@/Components/PortfolioV2/TimelineSection.vue'
import WorksSection from '@/Components/PortfolioV2/WorksSection.vue'

defineProps<PortfolioPageProps>()
</script>

<template>
    <Head :title="profile.name + ' — ' + profile.title" />

    <div class="v2-page">
        <CustomCursor />

        <ScrollySequence
            :name="profile.name"
            :title="profile.title"
            :subtitle="profile.subtitle"
            :image-url="profile.avatarUrl"
        />

        <TimelineSection :experiences="experiences" />
        <WorksSection :projects="projects" />

        <footer class="v2-footer">
            <p>{{ profile.email }}</p>
            <p>© {{ new Date().getFullYear() }} {{ profile.name }}</p>
        </footer>
    </div>
</template>

<style scoped>
.v2-page {
    min-height: 100vh;
    background: #090e14;
}

.v2-footer {
    padding: 2.8rem 1rem 3.3rem;
    text-align: center;
    color: rgba(226, 232, 240, 0.7);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    background: #060b11;
    display: grid;
    gap: 0.45rem;
    font-size: 0.85rem;
}

@media (max-width: 768px) {
    .v2-footer {
        padding: 2rem 1rem 2.4rem;
        font-size: 0.8rem;
    }
}
</style>
