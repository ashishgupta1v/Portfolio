<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Link, useForm } from '@inertiajs/vue3'
import type { Profile, SocialLink, Education } from '@/types/portfolio'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight, MessageSquare } from 'lucide-vue-next'
import AvailabilityBadge from '@/Components/PortfolioV2/AvailabilityBadge.vue'
import NewsletterSignup from '@/Components/PortfolioV2/NewsletterSignup.vue'
import ScheduleCall from '@/Components/PortfolioV2/ScheduleCall.vue'

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
    project_type: 'Full-Time Role',
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

// Prefer the server's own confirmation over a hardcoded client string, so the
// success state reflects what actually happened server-side.
const MESSAGE_MAX = 2000
const messageCharCount = computed(() => form.message.length)
const messageNearLimit = computed(() => messageCharCount.value > MESSAGE_MAX * 0.9)

const FALLBACK_SUCCESS = "Message received — I'll get back to you within a business day."
const successMessage = ref(FALLBACK_SUCCESS)

function submitContact() {
    form.post('/contact', {
        preserveScroll: true,
        onSuccess: (page: any) => {
            successMessage.value = page?.props?.flash?.success ?? FALLBACK_SUCCESS
            submitted.value = true
            form.reset()
            form.form_started_at = Date.now()
        },
    })
}

function openAiChat() {
    const chatBtn = document.querySelector('.chat-toggle-btn:not(.is-open)') as HTMLButtonElement | null
    if (chatBtn) chatBtn.click()
}

const whatsappHref = `https://wa.me/919087021592?text=${encodeURIComponent(
    'Hi Ashish, I came across your portfolio at ashishgupta.dev and would like to discuss a potential role or opportunity with you. Let me know a good time to connect.'
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
                <AvailabilityBadge class="contact-availability" />
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
                        Quick chat on WhatsApp
                        <ArrowUpRight :size="14" />
                    </a>

                    <div class="schedule-call-wrap">
                        <ScheduleCall />
                    </div>

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
                    <div class="credit-legal">
                        <Link href="/privacy" class="legal-link">Privacy Policy</Link>
                        <span class="legal-sep">·</span>
                        <Link href="/terms" class="legal-link">Terms of Service</Link>
                    </div>
                    <p class="credit-stack">
                        Built with VILT Stack
                        <br />
                        <span class="stack-detail">Vue 3 · Inertia.js · Laravel 13 · Tailwind CSS</span>
                    </p>
                </div>
            </div>

            <!-- Contact Form -->
            <div class="ct-form-row">
                <h3 class="form-title">Get in touch</h3>
                <div v-if="submitted" class="form-success" role="status" aria-live="polite">
                    <p>{{ successMessage }}</p>
                    <p class="ai-prequalify-hint">
                        <MessageSquare :size="14" class="ai-hint-icon" />
                        While you wait, try the <button type="button" class="ai-hint-btn" @click="openAiChat">AI Assistant</button> to learn more about my experience and stack.
                    </p>
                    <div class="next-steps">
                        <a :href="whatsappHref" target="_blank" rel="noopener noreferrer" class="next-step-link">Chat on WhatsApp</a>
                    </div>
                </div>
                <form v-else class="contact-form" @submit.prevent="submitContact">
                    <p class="form-note">
                        Hiring, collaborating, or just want to connect? Drop me a note and I'll respond within a business day.
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
                                placeholder="you@company.com"
                                autocomplete="email"
                                required
                            />
                            <span v-if="form.errors.email" class="form-error">{{ form.errors.email }}</span>
                        </div>
                    </div>
                    <div class="form-field">
                        <label for="cf-project-type" class="form-label">What brings you here?</label>
                        <select id="cf-project-type" v-model="form.project_type" class="form-input" required>
                            <option value="Full-Time Role">Full-time role</option>
                            <option value="Contract / Freelance">Contract / Freelance</option>
                            <option value="Technical Co-founder">Technical co-founder opportunity</option>
                            <option value="Consulting">Consulting / Advisory</option>
                            <option value="Collaboration">Open-source / Collaboration</option>
                            <option value="Other">Other</option>
                        </select>
                        <span v-if="form.errors.project_type" class="form-error">{{ form.errors.project_type }}</span>
                    </div>
                    <div class="form-field">
                        <label for="cf-message" class="form-label">Message</label>
                        <textarea
                            id="cf-message"
                            v-model="form.message"
                            class="form-input form-textarea"
                            :class="{ 'form-input-error': form.errors.message }"
                            placeholder="Tell me about the role, your team, or what you're building…"
                            rows="4"
                            :maxlength="MESSAGE_MAX"
                            required
                        />
                        <div class="form-field-footer">
                            <span v-if="form.errors.message" class="form-error">{{ form.errors.message }}</span>
                            <span class="char-count" :class="{ 'char-count--warn': messageNearLimit }">
                                {{ messageCharCount }}/{{ MESSAGE_MAX }}
                            </span>
                        </div>
                    </div>
                    <button type="submit" class="form-submit" :disabled="form.processing">
                        {{ form.processing ? 'Sending…' : 'Send message' }}
                        <ArrowUpRight :size="14" />
                    </button>
                    <p class="form-consent-note">
                        By submitting, you agree to direct communication regarding your inquiry per our
                        <Link href="/privacy" class="consent-link">Privacy Policy</Link>.
                    </p>
                </form>
            </div>

            <!-- Newsletter -->
            <div class="ct-newsletter-row">
                <h3 class="nl-title">Stay Updated</h3>
                <p class="nl-desc">Get notified about new articles and projects.</p>
                <NewsletterSignup />
            </div>
        </div>
    </section>
</template>

<style scoped>
.ct-section {
    position: relative;
    background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
    padding: 7rem 1.5rem 4rem;
    border-top: 1px solid var(--border);
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
    color: rgba(var(--accent-rgb), 0.75);
    font-weight: 600;
    margin-bottom: 1.4rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid rgba(var(--accent-rgb), 0.15);
}

/* ── Connect ── */
.ct-email {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 1rem;
    color: var(--text-1);
    text-decoration: none;
    transition: color 0.3s ease;
    margin-bottom: 0.4rem;
}
.ct-email:hover { color: var(--accent); }
.ct-email .arrow { opacity: 0; transition: opacity 0.3s; }
.ct-email:hover .arrow { opacity: 1; }

.ct-phone {
    font-size: 0.88rem;
    color: var(--text-2);
    margin-bottom: 0.25rem;
}

.ct-location {
    font-size: 0.82rem;
    color: var(--text-3);
    margin-bottom: 1rem;
}

.chat-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    margin-bottom: 1.8rem;
    padding: 0.72rem 1rem;
    border: 1px solid rgba(var(--accent-rgb), 0.28);
    border-radius: 999px;
    background: rgba(var(--accent-rgb), 0.08);
    color: var(--text-1);
    text-decoration: none;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: all 0.3s ease;
}

.chat-btn:hover {
    color: var(--text-on-accent);
    background: var(--accent);
    border-color: var(--accent);
}

.schedule-call-wrap {
    margin-bottom: 1.8rem;
}

.edu-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.edu-degree {
    font-size: 0.88rem;
    color: var(--text-2);
    font-weight: 500;
}
.edu-inst {
    font-size: 0.82rem;
    color: var(--text-3);
}
.edu-year {
    font-size: 0.75rem;
    color: rgba(var(--accent-rgb), 0.6);
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
    color: var(--text-2);
    text-decoration: none;
    font-size: 0.88rem;
    transition: color 0.3s ease;
}
.social-link:hover { color: var(--accent); }

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
    color: var(--text-2);
    text-decoration: none;
    padding: 0.5rem 1.2rem;
    border: 1px solid rgba(var(--accent-rgb), 0.25);
    border-radius: 4px;
    transition: all 0.3s ease;
}
.resume-btn:hover {
    color: var(--accent);
    border-color: rgba(var(--accent-rgb), 0.6);
    background: rgba(var(--accent-rgb), 0.06);
}

/* ── Credit ── */
.credit-text {
    font-size: 0.88rem;
    color: var(--text-2);
    line-height: 1.6;
}
.credit-name {
    color: var(--text-1);
    font-weight: 500;
}
.credit-year {
    font-size: 0.82rem;
    color: var(--text-3);
    margin-top: 0.5rem;
}
.credit-legal {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.76rem;
}
.legal-link {
    color: var(--text-3);
    text-decoration: none;
    transition: color 0.2s ease;
}
.legal-link:hover {
    color: var(--accent);
}
.legal-sep {
    color: var(--text-3);
    opacity: 0.5;
}
.credit-stack {
    margin-top: 1.5rem;
    font-size: 0.82rem;
    color: var(--text-3);
    line-height: 1.6;
}
.stack-detail {
    font-size: 0.72rem;
    color: rgba(var(--accent-rgb), 0.5);
    letter-spacing: 0.05em;
}

.form-consent-note {
    font-size: 0.74rem;
    color: var(--text-3);
    line-height: 1.4;
    margin-top: 0.75rem;
}
.consent-link {
    color: var(--accent);
    text-decoration: underline;
}

/* ── Availability badge ── */
.contact-availability {
    margin-top: 1.2rem;
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
    border-top: 1px solid var(--border);
}

.form-title {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(var(--accent-rgb), 0.75);
    font-weight: 600;
    margin-bottom: 1.8rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid rgba(var(--accent-rgb), 0.15);
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    max-width: 700px;
}

.form-note {
    font-size: 0.84rem;
    color: var(--text-2);
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
    color: var(--text-3);
    text-transform: uppercase;
}

.form-input {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-1);
    font-size: 0.9rem;
    font-family: inherit;
    padding: 0.65rem 0.85rem;
    transition: border-color 0.25s, box-shadow 0.25s;
    outline: none;
    width: 100%;
    box-sizing: border-box;
}
.form-input:focus {
    border-color: rgba(var(--accent-rgb), 0.5);
    box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.08);
}
.form-input::placeholder { color: var(--text-3); }
.form-input-error { border-color: rgba(239, 68, 68, 0.5) !important; }
.form-input option { background: var(--bg-secondary); color: var(--text-1); }

.form-textarea { resize: vertical; min-height: 110px; }

.form-field-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 1.2rem;
}

.char-count {
    font-size: 0.72rem;
    color: var(--text-3);
    margin-left: auto;
    font-variant-numeric: tabular-nums;
    transition: color 0.25s;
}
.char-count--warn { color: #f59e0b; }

.form-error {
    font-size: 0.75rem;
    color: #f87171;
    animation: shake 0.3s ease;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
}

.form-success {
    background: rgba(var(--accent-rgb), 0.08);
    border: 1px solid rgba(var(--accent-rgb), 0.25);
    border-radius: 4px;
    padding: 1rem 1.2rem;
    color: var(--accent);
    font-size: 0.9rem;
    max-width: 700px;
}

.next-steps {
    margin-top: 0.9rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
}

.ai-prequalify-hint {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.6rem;
    color: var(--text-body);
    font-size: 0.82rem;
}

.ai-hint-icon {
    flex-shrink: 0;
    color: var(--accent);
}

.ai-hint-btn {
    background: none;
    border: none;
    color: var(--accent);
    font-weight: 700;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 2px;
    font-size: inherit;
    padding: 0;
}

.ai-hint-btn:hover {
    opacity: 0.8;
}

.next-step-link {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: var(--text-on-accent);
    background: var(--accent);
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
    background: var(--accent);
    color: var(--text-on-accent);
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

/* ── Newsletter ── */
.ct-newsletter-row {
    margin-top: 3.5rem;
    padding-top: 2.5rem;
    border-top: 1px solid var(--border);
    max-width: 700px;
}

.nl-title {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(var(--accent-rgb), 0.75);
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.nl-desc {
    font-size: 0.84rem;
    color: var(--text-2);
    line-height: 1.45;
    margin-bottom: 0.2rem;
}
</style>
