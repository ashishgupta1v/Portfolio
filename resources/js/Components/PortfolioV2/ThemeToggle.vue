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
    <button class="theme-toggle" type="button" @click="cycleTheme" :title="label">
        <component :is="icon" :size="16" />
        <span class="sr-only">Toggle theme</span>
    </button>
</template>

<style scoped>
.theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    transition: color 0.3s ease;
}
.theme-toggle:hover {
    color: var(--accent);
}
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}
</style>
