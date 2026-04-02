<script setup lang="ts">
import { onMounted } from 'vue'
import type { Profile, SocialLink, Education } from '@/types/portfolio'
import { useGsap } from '@/Composables/useGsap'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-vue-next'

const props = defineProps<{
    profile: Profile
    socialLinks: SocialLink[]
    educations: Education[]
}>()

const iconMap: Record<string, any> = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
}

const { gsap } = useGsap()
const currentYear = new Date().getFullYear()

onMounted(() => {
    gsap.from('.contact-column', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
    })
})
</script>

<template>
    <section id="contact" class="contact-section">
        <div class="section-container">
            <div class="contact-grid">
                <!-- Connect Column -->
                <div class="contact-column">
                    <h3 class="column-title">Connect</h3>
                    <a
                        :href="`mailto:${profile.email}`"
                        class="contact-link contact-email"
                        data-cursor="disable"
                    >
                        {{ profile.email }}
                    </a>
                    <p class="contact-phone">{{ profile.phone }}</p>

                    <div class="education-list">
                        <div
                            v-for="edu in educations"
                            :key="edu.institution"
                            class="education-item"
                        >
                            <p class="edu-degree">{{ edu.degree }}</p>
                            <p class="edu-institution">{{ edu.institution }}</p>
                            <p class="edu-year">{{ edu.startYear }} - {{ edu.endYear }}</p>
                        </div>
                    </div>
                </div>

                <!-- Social Column -->
                <div class="contact-column">
                    <h3 class="column-title">Social</h3>
                    <div class="social-list">
                        <a
                            v-for="link in socialLinks"
                            :key="link.platform"
                            :href="link.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="social-link"
                            data-cursor="disable"
                        >
                            <component :is="iconMap[link.platform] || Mail" :size="16" />
                            <span>{{ link.label }}</span>
                            <ExternalLink :size="12" class="external-icon" />
                        </a>
                    </div>
                </div>

                <!-- Credit Column -->
                <div class="contact-column">
                    <h3 class="column-title">Credit</h3>
                    <p class="credit-text">
                        Designed and Developed by
                        <span class="credit-name">{{ profile.name }}</span>
                    </p>
                    <p class="credit-year">&copy; {{ currentYear }}</p>
                    <p class="credit-stack">
                        Built with VILT Stack
                        <br />
                        <span class="stack-detail">Vue 3 &bull; Inertia.js &bull; Laravel 12 &bull; Tailwind CSS</span>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.contact-section {
    padding: 8rem 0 4rem;
    border-top: 1px solid rgba(94, 234, 212, 0.06);
}

.contact-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem;
}

.column-title {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 500;
    margin-bottom: 1.5rem;
}

.contact-email {
    font-size: 1rem;
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
    display: block;
    margin-bottom: 0.5rem;
}

.contact-email:hover {
    color: var(--accent);
}

.contact-phone {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 2rem;
}

.education-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.edu-degree {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
}

.edu-institution {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.4);
}

.edu-year {
    font-size: 0.75rem;
    color: rgba(94, 234, 212, 0.5);
}

.social-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.social-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    font-size: 0.85rem;
    transition: color 0.3s ease;
}

.social-link:hover {
    color: var(--accent);
}

.external-icon {
    opacity: 0;
    transition: opacity 0.3s ease;
    margin-left: auto;
}

.social-link:hover .external-icon {
    opacity: 1;
}

.credit-text {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.6;
}

.credit-name {
    color: white;
    font-weight: 500;
}

.credit-year {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.3);
    margin-top: 0.5rem;
}

.credit-stack {
    margin-top: 1.5rem;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.4);
    line-height: 1.6;
}

.stack-detail {
    font-size: 0.7rem;
    color: rgba(94, 234, 212, 0.4);
    letter-spacing: 0.05em;
}

@media (max-width: 1024px) {
    .contact-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
}
</style>
