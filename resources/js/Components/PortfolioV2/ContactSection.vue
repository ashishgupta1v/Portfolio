<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
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
const submitted = ref(false)

const form = useForm({
    name: '',
    email: '',
    budget: '',
    project_type: 'Website',
    timeline: '',
    message: '',
    company_website: '',
    form_started_at: Date.now(),
    source_page: '',
    referrer_url: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    gclid: '',
    fbclid: '',
})

function submitContact() {
    form.post('/contact', {
        preserveScroll: true,
        onSuccess: () => {
            submitted.value = true
            form.reset()
            form.form_started_at = Date.now()
        },
    })
}

const whatsappHref = `https://wa.me/919087021592?text=${encodeURIComponent(
    'Hi Ashish, I just read your ZoetiCoach AI: Building a WhatsApp-First Accountability Engine for Coaches case study on ashishgupta.dev. I need a similar website, app, dashboard, software improvement, or automation for my business. Please tell me how you can help and what the next step should be.'
)}`

onMounted(() => {
    const params = new URLSearchParams(window.location.search)
    form.source_page = window.location.pathname
    form.referrer_url = document.referrer
    form.utm_source = params.get('utm_source') ?? ''
    form.utm_medium = params.get('utm_medium') ?? ''
    form.utm_campaign = params.get('utm_campaign') ?? ''
    form.utm_term = params.get('utm_term') ?? ''
    form.utm_content = params.get('utm_content') ?? ''
    form.gclid = params.get('gclid') ?? ''
    form.fbclid = params.get('fbclid') ?? ''

    if (!sectionRef.value) return

    const grid = sectionRef.value.querySelector('.ct-grid')
    const columns = sectionRef.value.querySelectorAll('.ct-column')

    if (columns.length > 0 && grid) {
        gsap.from(columns, {
            scrollTrigger: { trigger: grid, start: 'top 78%' },
            y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        })
    }
})
</script>

<template>
    <section ref="sectionRef" id="contact" class="ct-section">
        <div class="ct-shell">
            <div class="section-header">
                <div class="section-header-wrapper">
                    <h2 class="section-title">
                        <span class="section-title-word">Get In</span>
                        <span class="section-title-word accent">Touch</span>
                    </h2>
                </div>
                <div class="section-separator" />
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

                    <a
                        :href="whatsappHref"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="chat-btn"
                    >
                        Chat on WhatsApp
                        <ArrowUpRight :size="14" />
                    </a>

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

            <!-- Contact Form -->
            <div class="ct-form-row">
                <h3 class="form-title">Send a message</h3>
                <div v-if="submitted" class="form-success">
                    <p>Message sent — I'll get back to you within a business day.</p>
                    <div class="next-steps">
                        <a href="/engagements" class="next-step-link">Review Engagement Models</a>
                        <a :href="whatsappHref" target="_blank" rel="noopener noreferrer" class="next-step-link">Chat on WhatsApp</a>
                    </div>
                </div>
                <form v-else class="contact-form" @submit.prevent="submitContact">
                    <p class="form-note">
                        Share a few details so I can reply with a relevant scope, timeline, and next-step recommendation.
                    </p>
                    <div class="honeypot-wrap" aria-hidden="true">
                        <label for="cf-company-website">Company website</label>
                        <input id="cf-company-website" v-model="form.company_website" type="text" tabindex="-1" autocomplete="off" />
                    </div>
                    <div class="form-row">
                        <div class="form-field">
                            <label for="cf-name" class="form-label">Name</label>
                            <input
                                id="cf-name"
                                v-model="form.name"
                                type="text"
                                class="form-input"
                                :class="{ 'form-input-error': form.errors.name }"
                                placeholder="Your name"
                                autocomplete="name"
                                required
                            />
                            <span v-if="form.errors.name" class="form-error">{{ form.errors.name }}</span>
                        </div>
                        <div class="form-field">
                            <label for="cf-email" class="form-label">Email</label>
                            <input
                                id="cf-email"
                                v-model="form.email"
                                type="email"
                                class="form-input"
                                :class="{ 'form-input-error': form.errors.email }"
                                placeholder="you@example.com"
                                autocomplete="email"
                                required
                            />
                            <span v-if="form.errors.email" class="form-error">{{ form.errors.email }}</span>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-field">
                            <label for="cf-project-type" class="form-label">Project type</label>
                            <select id="cf-project-type" v-model="form.project_type" class="form-input" required>
                                <option value="Website">Website</option>
                                <option value="SaaS Product">SaaS Product</option>
                                <option value="Internal Dashboard">Internal Dashboard</option>
                                <option value="Automation Workflow">Automation Workflow</option>
                                <option value="Legacy Modernization">Legacy Modernization</option>
                                <option value="AI Integration">AI Integration</option>
                                <option value="Other">Other</option>
                            </select>
                            <span v-if="form.errors.project_type" class="form-error">{{ form.errors.project_type }}</span>
                        </div>
                        <div class="form-field">
                            <label for="cf-timeline" class="form-label">Preferred start</label>
                            <select id="cf-timeline" v-model="form.timeline" class="form-input">
                                <option value="">Select timeline…</option>
                                <option value="Urgent (within 2 weeks)">Urgent (within 2 weeks)</option>
                                <option value="This month">This month</option>
                                <option value="1-2 months">1-2 months</option>
                                <option value="3+ months">3+ months</option>
                                <option value="Exploring options">Exploring options</option>
                            </select>
                            <span v-if="form.errors.timeline" class="form-error">{{ form.errors.timeline }}</span>
                        </div>
                    </div>
                    <div class="form-field">
                        <label for="cf-budget" class="form-label">Estimated budget (optional)</label>
                        <select id="cf-budget" v-model="form.budget" class="form-input">
                            <option value="">Select a range…</option>
                            <option value="Under ₹50,000">Under ₹50,000</option>
                            <option value="₹50,000 – ₹1,50,000">₹50,000 – ₹1,50,000</option>
                            <option value="₹1,50,000 – ₹5,00,000">₹1,50,000 – ₹5,00,000</option>
                            <option value="₹5,00,000+">₹5,00,000+</option>
                            <option value="Let's discuss">Let's discuss</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <label for="cf-message" class="form-label">Message</label>
                        <textarea
                            id="cf-message"
                            v-model="form.message"
                            class="form-input form-textarea"
                            :class="{ 'form-input-error': form.errors.message }"
                            placeholder="Describe what you need…"
                            rows="4"
                            required
                        />
                        <span v-if="form.errors.message" class="form-error">{{ form.errors.message }}</span>
                    </div>
                    <button type="submit" class="form-submit" :disabled="form.processing">
                        {{ form.processing ? 'Sending…' : 'Send message' }}
                        <ArrowUpRight :size="14" />
                    </button>
                </form>
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
    margin-bottom: 1rem;
}

.chat-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    margin-bottom: 1.8rem;
    padding: 0.72rem 1rem;
    border: 1px solid rgba(94, 234, 212, 0.28);
    border-radius: 999px;
    background: rgba(94, 234, 212, 0.08);
    color: #dffcf6;
    text-decoration: none;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: all 0.3s ease;
}

.chat-btn:hover {
    color: #08111a;
    background: #5eead4;
    border-color: #5eead4;
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

/* ── Contact form ── */
.ct-form-row {
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 1px solid rgba(148, 163, 184, 0.1);
}

.form-title {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(94, 234, 212, 0.7);
    font-weight: 600;
    margin-bottom: 1.8rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid rgba(94, 234, 212, 0.1);
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    max-width: 700px;
}

.form-note {
    font-size: 0.84rem;
    color: rgba(226, 232, 240, 0.6);
    line-height: 1.45;
    max-width: 640px;
}

.honeypot-wrap {
    position: absolute;
    left: -9999px;
    opacity: 0;
    pointer-events: none;
    height: 0;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
}

.form-label {
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    color: rgba(226, 232, 240, 0.55);
    text-transform: uppercase;
}

.form-input {
    background: rgba(8, 14, 24, 0.8);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 4px;
    color: #e2e8f0;
    font-size: 0.9rem;
    font-family: inherit;
    padding: 0.65rem 0.85rem;
    transition: border-color 0.25s;
    outline: none;
    width: 100%;
    box-sizing: border-box;
}
.form-input:focus { border-color: rgba(94, 234, 212, 0.5); }
.form-input::placeholder { color: rgba(148, 163, 184, 0.35); }
.form-input-error { border-color: rgba(239, 68, 68, 0.5) !important; }
.form-input option { background: #060b11; color: #e2e8f0; }

.form-textarea { resize: vertical; min-height: 110px; }

.form-error {
    font-size: 0.75rem;
    color: #f87171;
}

.form-success {
    background: rgba(94, 234, 212, 0.08);
    border: 1px solid rgba(94, 234, 212, 0.25);
    border-radius: 4px;
    padding: 1rem 1.2rem;
    color: #5eead4;
    font-size: 0.9rem;
    max-width: 700px;
}

.next-steps {
    margin-top: 0.9rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
}

.next-step-link {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: #0f172a;
    background: #5eead4;
    border-radius: 999px;
    padding: 0.45rem 0.85rem;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-weight: 700;
}

.form-submit {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    align-self: flex-start;
    background: #5eead4;
    color: #050b14;
    border: none;
    border-radius: 4px;
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    padding: 0.7rem 1.5rem;
    cursor: pointer;
    transition: opacity 0.25s;
}
.form-submit:hover:not(:disabled) { opacity: 0.88; }
.form-submit:disabled { opacity: 0.5; cursor: not-allowed; }

@media (max-width: 640px) {
    .form-row { grid-template-columns: 1fr; }
}
</style>
