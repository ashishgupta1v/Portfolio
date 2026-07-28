<!-- resources/js/Components/Scene3D/SceneOverlay.vue -->
<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { ZoneId } from '@/types/scene3d'
import type { Profile, Project, Experience, SocialLink, Education } from '@/types/portfolio'

const ContactSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/ContactSection.vue'))

const props = defineProps<{
    currentZone: ZoneId
    scrollProgress: number
    profile: Profile
    projects: Project[]
    experiences: Experience[]
    socialLinks: SocialLink[]
    educations: Education[]
}>()

const zoneOpacity = computed(() => {
    const zoneIndex = ['workshop', 'screen', 'constellation', 'offering', 'return'].indexOf(props.currentZone)
    const zoneProgress = (props.scrollProgress * 5) - zoneIndex
    if (zoneProgress < 0.05) return 0
    if (zoneProgress < 0.15) return (zoneProgress - 0.05) * 10
    if (zoneProgress > 0.85) return (0.95 - zoneProgress) * 10
    return 1
})

const displayedProjects = computed(() => props.projects.slice(0, 5))
</script>

<template>
    <div class="scene-overlay" aria-hidden="false">
        <!-- Zone 1: Workshop -->
        <section
            v-show="currentZone === 'workshop'"
            class="overlay-zone zone-workshop"
            :style="{ opacity: currentZone === 'workshop' ? zoneOpacity : 0 }"
        >
            <div class="zone-content">
                <h1 class="hero-title">
                    Hello, I'm <span class="text-teal">{{ profile.name }}</span>
                </h1>
                <p class="hero-subtitle">{{ profile.title }}</p>
                <p class="hero-tagline">Builder. Architect. Father.</p>
                <div class="scroll-hint" aria-label="Scroll to explore">
                    <span class="scroll-arrow" />
                </div>
            </div>
        </section>

        <!-- Zone 2: Into the Screen -->
        <section
            v-show="currentZone === 'screen'"
            class="overlay-zone zone-screen"
            :style="{ opacity: currentZone === 'screen' ? zoneOpacity : 0 }"
        >
            <div class="zone-content">
                <h2 class="section-title">9+ Years Engineering</h2>
                <p class="section-subtitle">Vue &middot; Laravel &middot; TypeScript &middot; PostgreSQL</p>
                <div class="capability-grid">
                    <div class="capability-card">
                        <h3>Modular Monoliths</h3>
                        <p>Domain-Driven Design</p>
                    </div>
                    <div class="capability-card">
                        <h3>Semantic Intelligence</h3>
                        <p>AI / RAG Pipelines</p>
                    </div>
                    <div class="capability-card">
                        <h3>High-Perf Infra</h3>
                        <p>Sub-100ms APIs</p>
                    </div>
                    <div class="capability-card">
                        <h3>Gamification</h3>
                        <p>Engagement Mechanics</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Zone 3: Constellation -->
        <section
            v-show="currentZone === 'constellation'"
            class="overlay-zone zone-constellation"
            :style="{ opacity: currentZone === 'constellation' ? zoneOpacity : 0 }"
        >
            <div class="zone-content">
                <h2 class="section-title">My Work</h2>
                <div class="project-list">
                    <div
                        v-for="project in displayedProjects"
                        :key="project.slug"
                        class="project-item"
                    >
                        <h3>{{ project.title }}</h3>
                        <p>{{ project.description }}</p>
                        <div class="project-tools">
                            <span v-for="tool in project.tools.slice(0, 4)" :key="tool" class="tool-tag">{{ tool }}</span>
                        </div>
                        <a v-if="project.externalUrl" :href="project.externalUrl" target="_blank" rel="noopener" class="project-link">
                            View Live
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Zone 4: Offering -->
        <section
            v-show="currentZone === 'offering'"
            class="overlay-zone zone-offering"
            :style="{ opacity: currentZone === 'offering' ? zoneOpacity : 0 }"
        >
            <div class="zone-content">
                <h2 class="section-title">What I Build</h2>
                <div class="timeline-strip">
                    <div v-for="exp in experiences" :key="exp.company" class="timeline-node">
                        <span class="timeline-company">{{ exp.company }}</span>
                        <span class="timeline-role">{{ exp.role }}</span>
                        <span class="timeline-date">{{ exp.dateRange }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Zone 5: Return -->
        <section
            v-show="currentZone === 'return'"
            class="overlay-zone zone-return"
            :style="{ opacity: currentZone === 'return' ? zoneOpacity : 0 }"
        >
            <div class="zone-content zone-content--full">
                <h2 class="section-title">Get In Touch</h2>
                <ContactSection
                    :profile="profile"
                    :social-links="socialLinks"
                    :educations="educations"
                />
                <footer class="scene-footer">
                    <p>3D desk model by <a href="https://sketchfab.com/mandeeprao10576" target="_blank" rel="noopener">mandeeprao10576</a> (CC-BY-4.0)</p>
                </footer>
            </div>
        </section>
    </div>
</template>

<style scoped>
.scene-overlay {
    position: fixed;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
}

.overlay-zone {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
}

.zone-content {
    max-width: 800px;
    padding: 2rem;
    pointer-events: auto;
}

.zone-content--full {
    max-width: 1200px;
    width: 100%;
}

.hero-title {
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 800;
    color: #e2e8f0;
    line-height: 1.1;
    margin: 0;
}

.text-teal {
    color: #5eead4;
}

.hero-subtitle {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    color: rgba(148, 163, 184, 0.9);
    margin-top: 0.75rem;
}

.hero-tagline {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: rgba(125, 211, 252, 0.8);
    margin-top: 0.5rem;
    letter-spacing: 0.08em;
}

.scroll-hint {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
}

.scroll-arrow {
    width: 24px;
    height: 24px;
    border-right: 2px solid rgba(94, 234, 212, 0.6);
    border-bottom: 2px solid rgba(94, 234, 212, 0.6);
    transform: rotate(45deg);
    animation: scrollBounce 2s ease-in-out infinite;
}

@keyframes scrollBounce {
    0%, 100% { transform: rotate(45deg) translateY(0); opacity: 0.6; }
    50% { transform: rotate(45deg) translateY(8px); opacity: 1; }
}

.section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: #e2e8f0;
    margin: 0 0 1.5rem;
}

.section-subtitle {
    font-size: 1.1rem;
    color: rgba(94, 234, 212, 0.8);
    letter-spacing: 0.12em;
}

.capability-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 1.5rem;
}

.capability-card {
    padding: 1.25rem;
    border: 1px solid rgba(94, 234, 212, 0.2);
    border-radius: 0.75rem;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(8px);
}

.capability-card h3 {
    color: #5eead4;
    font-size: 1rem;
    margin: 0 0 0.25rem;
}

.capability-card p {
    color: rgba(148, 163, 184, 0.8);
    font-size: 0.85rem;
    margin: 0;
}

.project-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.project-item {
    padding: 1.25rem;
    border: 1px solid rgba(94, 234, 212, 0.15);
    border-radius: 0.75rem;
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(8px);
}

.project-item h3 {
    color: #e2e8f0;
    font-size: 1.15rem;
    margin: 0 0 0.5rem;
}

.project-item p {
    color: rgba(148, 163, 184, 0.8);
    font-size: 0.85rem;
    margin: 0 0 0.75rem;
}

.project-tools {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
}

.tool-tag {
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    font-size: 0.7rem;
    color: rgba(94, 234, 212, 0.9);
    border: 1px solid rgba(94, 234, 212, 0.25);
    background: rgba(94, 234, 212, 0.08);
}

.project-link {
    display: inline-block;
    margin-top: 0.5rem;
    color: #22d3ee;
    font-size: 0.85rem;
    text-decoration: none;
}

.project-link:hover {
    text-decoration: underline;
}

.timeline-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
}

.timeline-node {
    padding: 1rem;
    border: 1px solid rgba(94, 234, 212, 0.2);
    border-radius: 0.75rem;
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(8px);
    min-width: 160px;
}

.timeline-company {
    display: block;
    color: #5eead4;
    font-weight: 600;
    font-size: 0.9rem;
}

.timeline-role {
    display: block;
    color: rgba(226, 232, 240, 0.8);
    font-size: 0.8rem;
    margin-top: 0.2rem;
}

.timeline-date {
    display: block;
    color: rgba(148, 163, 184, 0.6);
    font-size: 0.72rem;
    margin-top: 0.2rem;
}

.scene-footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(148, 163, 184, 0.15);
    text-align: center;
}

.scene-footer p {
    color: rgba(148, 163, 184, 0.5);
    font-size: 0.72rem;
}

.scene-footer a {
    color: rgba(94, 234, 212, 0.6);
    text-decoration: none;
}

@media (max-width: 768px) {
    .capability-grid {
        grid-template-columns: 1fr;
    }
}
</style>
