<script setup lang="ts">
import { computed } from 'vue'
import { SunMedium, Moon, Monitor } from 'lucide-vue-next'
import { useTheme, type ThemePreference } from '@/Composables/useTheme'

const { theme, setTheme } = useTheme()

const order: ThemePreference[] = ['system', 'light', 'dark']

const icon = computed(() => {
    if (theme.value === 'light') return SunMedium
    if (theme.value === 'dark') return Moon
    return Monitor
})

const label = computed(() => {
    if (theme.value === 'light') return 'Light theme — click for dark'
    if (theme.value === 'dark') return 'Dark theme — click for system'
    return 'System theme — click for light'
})

function cycleTheme() {
    const next = order[(order.indexOf(theme.value) + 1) % order.length]
    setTheme(next)
}
</script>

<template>
    <!-- Theme toggle switch hidden by default (dark mode is primary) -->
</template>

<style scoped>
.theme-toggle {
    display: none !important;
}
</style>
