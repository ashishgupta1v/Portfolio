<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { SocialLink } from '@/types/portfolio'
import HoverLink from '@/Components/Portfolio/HoverLink.vue'
import { useGsap } from '@/Composables/useGsap'

const props = defineProps<{
    name: string
    socialLinks: SocialLink[]
}>()

const { scrollTo, fadeIn } = useGsap()
const navRef = ref<HTMLElement | null>(null)

function getInitials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').toUpperCase()
}

const linkedIn = props.socialLinks.find(l => l.platform === 'linkedin')

function navigateTo(section: string) {
    scrollTo(`#${section}`)
}

onMounted(() => {
    fadeIn('.nav-header', { delay: 1.5 })
    fadeIn('.nav-links', { delay: 1.7 })
})
</script>

<template>
    <header ref="navRef" class="nav-header">
        <div class="nav-inner">
            <!-- Logo -->
            <div class="nav-logo">
                <a
                    v-if="linkedIn"
                    :href="linkedIn.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="disable"
                    class="logo-link"
                >
                    {{ getInitials(name) }}
                </a>
                <span v-else class="logo-link">{{ getInitials(name) }}</span>
            </div>

            <!-- Nav Links -->
            <nav class="nav-links">
                <HoverLink text="ABOUT" @click="navigateTo('about')" />
                <HoverLink text="WORK" @click="navigateTo('work')" />
                <HoverLink text="CONTACT" @click="navigateTo('contact')" />
            </nav>
        </div>

        <!-- Decorative elements -->
        <div class="nav-fade" />
    </header>
</template>

<style scoped>
.nav-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 1.5rem 2.5rem;
}

.nav-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: var(--container-max);
    margin: 0 auto;
}

.nav-logo .logo-link {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--accent);
    text-decoration: none;
    letter-spacing: 0.05em;
    border: 1px solid rgba(94, 234, 212, 0.3);
    padding: 0.4rem 0.8rem;
    transition: all 0.3s ease;
}

.nav-logo .logo-link:hover {
    border-color: var(--accent);
    background: rgba(94, 234, 212, 0.05);
}

.nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.nav-fade {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, var(--bg-primary), transparent);
    z-index: -1;
    pointer-events: none;
}

@media (max-width: 768px) {
    .nav-header {
        padding: 1rem 1.25rem;
    }

    .nav-links {
        gap: 1rem;
    }
}
</style>
