<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Profile } from '@/types/portfolio'
import gsap from 'gsap'

const props = defineProps<{
    profile: Profile
}>()

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
    // Intro text animation
    gsap.from('.landing-greeting', {
        opacity: 0,
        y: 60,
        duration: 1.2,
        delay: 1,
        ease: 'power3.out',
    })

    gsap.from('.landing-name', {
        opacity: 0,
        y: 80,
        duration: 1.2,
        delay: 1.3,
        ease: 'power3.out',
    })

    gsap.from('.landing-role', {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 1.6,
        ease: 'power3.out',
    })

    gsap.from('.landing-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.9,
        ease: 'power3.out',
    })

    // Continuous text loop animation
    gsap.to('.text-loop-inner', {
        y: '-50%',
        duration: 4,
        ease: 'none',
        repeat: -1,
    })
})
</script>

<template>
    <section ref="sectionRef" class="landing-section">
        <div class="section-container">
            <div class="landing-content">
                <h2 class="landing-greeting">Hello! I'm</h2>
                <h1 class="landing-name">{{ profile.name.toUpperCase() }}</h1>
                <h3 class="landing-role">{{ profile.title }}</h3>
                <div class="landing-subtitle">
                    <div class="text-loop">
                        <div class="text-loop-inner">
                            <span>{{ profile.subtitle }}</span>
                            <span>8+ Years Experience</span>
                            <span>{{ profile.subtitle }}</span>
                            <span>8+ Years Experience</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile character slot -->
            <slot />
        </div>
    </section>
</template>

<style scoped>
.landing-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    padding: 8rem 0 4rem;
}

.landing-content {
    max-width: 600px;
}

.landing-greeting {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: var(--accent);
    font-weight: 400;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
}

.landing-name {
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 700;
    color: white;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
}

.landing-role {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    color: rgba(255, 255, 255, 0.7);
    font-weight: 300;
    margin-bottom: 1.5rem;
}

.landing-subtitle {
    overflow: hidden;
    height: 1.5rem;
}

.text-loop {
    overflow: hidden;
    height: 100%;
}

.text-loop-inner {
    display: flex;
    flex-direction: column;
}

.text-loop-inner span {
    font-size: 0.875rem;
    color: rgba(94, 234, 212, 0.6);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    line-height: 1.5rem;
}

@media (max-width: 1024px) {
    .landing-section {
        flex-direction: column;
        justify-content: flex-start;
        padding-top: 6rem;
    }

    .landing-content {
        text-align: center;
        max-width: 100%;
    }
}
</style>
