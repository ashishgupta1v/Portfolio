<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Profile, SocialLink, Education } from '@/types/portfolio'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

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

const currentYear = new Date().getFullYear()
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
    if (!sectionRef.value) return

    gsap.from('.ct-eyebrow', {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' },
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
    })
    gsap.from('.ct-title', {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 78%' },
        y: 30, opacity: 0, duration: 0.8, delay: 0.1, ease: 'power3.out',
    })
    gsap.from('.ct-column', {
        scrollTrigger: { trigger: '.ct-grid', start: 'top 78%' },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
    })
})
</script>

<template>
    <section ref="sectionRef" id="contact" class="ct-section">
        <div class="ct-shell">
            <div class="heading-wrap">
                <p class="ct-eyebrow">Get in Touch</p>
                <h2 class="ct-title">Contact</h2>
            </div>

            <div class="ct-grid">
                <!-- Connect -->
                <div class="ct-column">
                    <h3 class="col-title">Connect</h3>
                    <a
                        :href="`mailto:${profile.email}`"
                        class="ct-email"
                    >
                        {{ profile.email }}
                        <ArrowUpRight :size="14" class="arrow" />
                    </a>
                    <p v-if="profile.phone" class="ct-phone">{{ profile.phone }}</p>
                    <p v-if="profile.location" class="ct-location">{{ profile.location }}</p>

                    <div v-if="educations.length" class="edu-list">
                        <div
                            v-for="edu in educations"
                            :key="edu.institution"
                            class="edu-item"
                        >
                            <p class="edu-degree">{{ edu.degree }}</p>
                            <p class="edu-inst">{{ edu.institution }}</p>
                            <p class="edu-year">{{ edu.startYear }} – {{ edu.endYear }}</p>
                        </div>
                    </div>
                </div>

                <!-- Social -->
                <div class="ct-column">
                    <h3 class="col-title">Social</h3>
                    <div class="social-list">
                        <a
                            v-for="link in socialLinks"
                            :key="link.platform"
                            :href="link.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="social-link"
                        >
                            <component :is="iconMap[link.platform] || Mail" :size="16" />
                            <span>{{ link.label }}</span>
                            <ExternalLink :size="12" class="ext-icon" />
                        </a>
                    </div>

                    <a
                        v-if="profile.resumeUrl"
                        :href="profile.resumeUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="resume-btn"
                    >
                        Resume
                        <ArrowUpRight :size="14" />
                    </a>
                </div>

                <!-- Credit -->
                <div class="ct-column">
                    <h3 class="col-title">Credit</h3>
                    <p class="credit-text">
                        Designed &amp; Developed by
                        <span class="credit-name">{{ profile.name }}</span>
                    </p>
                    <p class="credit-year">&copy; {{ currentYear }}</p>
                    <p class="credit-stack">
                        Built with VILT Stack
                        <br />
                        <span class="stack-detail">Vue 3 · Inertia.js · Laravel 12 · Tailwind CSS</span>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.ct-section {
    position: relative;
    background: linear-gradient(180deg, #0a0f17 0%, #060b11 100%);
    padding: 7rem 1.5rem 4rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.ct-shell {
    max-width: 1100px;
    margin: 0 auto;
}

.heading-wrap {
    text-align: center;
    margin-bottom: 3.5rem;
}

.ct-eyebrow {
    color: rgba(94, 234, 212, 0.9);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 0.74rem;
    margin-bottom: 0.8rem;
    font-weight: 600;
}

.ct-title {
    color: #f8fafc;
    font-size: clamp(2rem, 6vw, 4.5rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 0.95;
}

.ct-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3.5rem;
}

.col-title {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(94, 234, 212, 0.7);
    font-weight: 600;
    margin-bottom: 1.4rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid rgba(94, 234, 212, 0.1);
}

/* ── Connect ── */
.ct-email {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 1rem;
    color: #f8fafc;
    text-decoration: none;
    transition: color 0.3s ease;
    margin-bottom: 0.4rem;
}
.ct-email:hover { color: #5eead4; }
.ct-email .arrow { opacity: 0; transition: opacity 0.3s; }
.ct-email:hover .arrow { opacity: 1; }

.ct-phone {
    font-size: 0.88rem;
    color: rgba(226, 232, 240, 0.5);
    margin-bottom: 0.25rem;
}

.ct-location {
    font-size: 0.82rem;
    color: rgba(226, 232, 240, 0.35);
    margin-bottom: 1.8rem;
}

.edu-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.edu-degree {
    font-size: 0.88rem;
    color: rgba(226, 232, 240, 0.75);
    font-weight: 500;
}
.edu-inst {
    font-size: 0.82rem;
    color: rgba(226, 232, 240, 0.4);
}
.edu-year {
    font-size: 0.75rem;
    color: rgba(94, 234, 212, 0.5);
}

/* ── Social ── */
.social-list {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    margin-bottom: 2rem;
}

.social-link {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    color: rgba(226, 232, 240, 0.6);
    text-decoration: none;
    font-size: 0.88rem;
    transition: color 0.3s ease;
}
.social-link:hover { color: #5eead4; }

.ext-icon {
    opacity: 0;
    margin-left: auto;
    transition: opacity 0.3s ease;
}
.social-link:hover .ext-icon { opacity: 1; }

.resume-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(226, 232, 240, 0.7);
    text-decoration: none;
    padding: 0.5rem 1.2rem;
    border: 1px solid rgba(94, 234, 212, 0.25);
    border-radius: 4px;
    transition: all 0.3s ease;
}
.resume-btn:hover {
    color: #5eead4;
    border-color: rgba(94, 234, 212, 0.6);
    background: rgba(94, 234, 212, 0.06);
}

/* ── Credit ── */
.credit-text {
    font-size: 0.88rem;
    color: rgba(226, 232, 240, 0.5);
    line-height: 1.6;
}
.credit-name {
    color: #f8fafc;
    font-weight: 500;
}
.credit-year {
    font-size: 0.82rem;
    color: rgba(226, 232, 240, 0.3);
    margin-top: 0.5rem;
}
.credit-stack {
    margin-top: 1.5rem;
    font-size: 0.82rem;
    color: rgba(226, 232, 240, 0.4);
    line-height: 1.6;
}
.stack-detail {
    font-size: 0.72rem;
    color: rgba(94, 234, 212, 0.4);
    letter-spacing: 0.05em;
}

/* ── Mobile ── */
@media (max-width: 768px) {
    .ct-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
    }
    .ct-section {
        padding: 4rem 1rem 3rem;
    }
}

@media (max-width: 480px) {
    .ct-section {
        padding: 3rem 0.8rem 2rem;
    }
}
</style>
