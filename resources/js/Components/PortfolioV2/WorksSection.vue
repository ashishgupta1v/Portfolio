<script setup lang="ts">
import WorkSection from '@/Components/Work/WorkSection.vue'
import type { ShowcaseProject } from '@/Data/projects'

defineProps<{
    projects?: ShowcaseProject[] | any[]
}>()
</script>

<template>
    <WorkSection :projects="projects" />
</template>
