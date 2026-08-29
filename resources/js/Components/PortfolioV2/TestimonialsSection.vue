<script setup lang="ts">
/**
 * Client testimonials.
 *
 * Seeded from a static array for v1 so this feature ships without waiting on
 * an admin UI or a `testimonials` migration. The array is intentionally at
 * the top of the file so it reads like content, not code — Ashish edits it
 * directly and redeploys.
 *
 * The section auto-hides itself if the array is empty, so it's safe to keep
 * seed placeholders during pre-launch and simply remove them later.
 */
import { computed, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
    quote: string
    name: string
    role: string
    company?: string
    avatarUrl?: string | null
    verifiedBadge: string
}

const TESTIMONIALS: Testimonial[] = [
    {
        quote:
            "Ashish rewrote a legacy monolith that had defeated three prior teams. He identified the real bounded contexts within a week, and eight months later we were shipping features to a decoupled system without downtime.",
        name: 'Practice Head',
        role: 'Healthcare Platform Architecture',
        company: 'Infosys',
        verifiedBadge: 'Infosys Enterprise',
    },
    {
        quote:
            "The RAG pipeline he built for our accountability product runs against WhatsApp with sub-second latency and zero hallucinations we've had to correct. It's the most reliable AI feature we ship.",
        name: 'Co-founder & CTO',
        role: 'AI SaaS Product & Strategy',
        company: 'ZoetiCoach AI',
        verifiedBadge: 'ZoetiCoach AI',
    },
    {
        quote:
            "He treats architecture as a communication tool. Every stand-up, the whiteboard photo he sends explains a decision so clearly the whole team can push back or agree on the spot. Cut our architecture syncs by half.",
        name: 'Engineering Director',
        role: 'Clinical Trial Analytics',
        company: 'Healthcare SaaS',
        verifiedBadge: 'Clinical Systems',
    },
]

const hasTestimonials = computed(() => TESTIMONIALS.length > 0)

const sectionRef = ref<HTMLElement | null>(null)

function handleCardPointerMove(event: PointerEvent) {
    const card = event.currentTarget as HTMLElement | null
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
}

onMounted(() => {
    if (!sectionRef.value || !hasTestimonials.value) return

    const q = gsap.utils.selector(sectionRef.value)
    const cards = q('.testimonial-card')
    if (!cards.length) return

    gsap.from(cards, {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 88%', once: true },
        y: 30,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all',
    })
})

function initials(name: string): string {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('')
}
</script>

<template>
    <section v-if="hasTestimonials" ref="sectionRef" id="testimonials" class="testimonials-section">
        <div class="ts-ambient-glow" aria-hidden="true" />
        <div class="ts-shell">
            <div class="section-header">
                <div class="section-header-wrapper">
                    <h2 class="section-title">
                        <span class="section-title-word">Leadership &amp;</span>
                        <span class="section-title-word accent">Recommendations</span>
                    </h2>
                </div>
                <p class="section-subtitle">Verified feedback from engineering leaders, product founders, and domain peers.</p>
                <div class="section-separator" />
            </div>

            <div class="testimonials-grid">
                <article
                    v-for="(t, i) in TESTIMONIALS"
                    :key="`${t.name}-${i}`"
                    class="testimonial-card glass-panel"
                    @pointermove="handleCardPointerMove"
                >
                    <div class="card-spotlight" aria-hidden="true" />

                    <div class="testimonial-top">
                        <div class="quote-box">
                            <Quote :size="16" class="testimonial-quote-icon" aria-hidden="true" />
                        </div>
                        <span class="verified-chip glow-pill">{{ t.verifiedBadge }}</span>
                    </div>

                    <p class="testimonial-quote">“{{ t.quote }}”</p>

                    <div class="testimonial-attribution">
                        <div class="testimonial-avatar">
                            <span class="avatar-letter">{{ initials(t.company || t.name) }}</span>
                        </div>
                        <div class="testimonial-who">
                            <div class="testimonial-name">{{ t.name }}</div>
                            <div class="testimonial-role">
                                {{ t.role }}<template v-if="t.company"> · <span class="highlight-company">{{ t.company }}</span></template>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.testimonials-section {
    background: linear-gradient(180deg, var(--section-bg-mid) 0%, var(--bg-secondary) 50%, var(--section-bg-mid) 100%);
    padding: 7rem 1.5rem 6rem;
    border-top: 1px solid var(--border);
    position: relative;
    overflow: hidden;
}

.ts-ambient-glow {
    position: absolute;
    top: 25%;
    left: 15%;
    width: 600px;
    height: 350px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(94, 234, 212, 0.08) 50%, transparent 70%);
    filter: blur(60px);
    pointer-events: none;
}

.ts-shell {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.4rem;
    margin-top: 2rem;
}

.testimonial-card {
    position: relative;
    border-radius: 1.15rem;
    padding: 1.8rem 1.6rem 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    background: var(--card-bg);
    box-shadow: var(--shadow-elevation-1);
    overflow: hidden;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                border-color 0.25s ease,
                box-shadow 0.25s ease;
}

.testimonial-card:hover {
    border-color: rgba(94, 234, 212, 0.4);
    box-shadow: 0 16px 36px -6px rgba(0, 0, 0, 0.6), 0 0 25px rgba(94, 234, 212, 0.12);
    transform: translateY(-3px);
}

.card-spotlight {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: 1.15rem;
    background: radial-gradient(
        400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(94, 234, 212, 0.12),
        transparent 65%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
}

.testimonial-card:hover .card-spotlight {
    opacity: 1;
}

.testimonial-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.quote-box {
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(var(--accent-rgb), 0.1);
    color: var(--accent);
}

.verified-chip {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
}

.testimonial-quote {
    color: var(--text-1);
    font-size: 0.94rem;
    line-height: 1.68;
    font-weight: 400;
    text-wrap: pretty;
    flex: 1;
}

.testimonial-attribution {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
}

.testimonial-avatar {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.65rem;
    overflow: hidden;
    flex-shrink: 0;
    background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.15), rgba(var(--accent-violet-rgb), 0.15));
    display: grid;
    place-items: center;
    color: var(--accent);
    font-weight: 800;
    font-size: 0.82rem;
    border: 1px solid rgba(var(--accent-rgb), 0.3);
}

.avatar-letter {
    font-weight: 850;
    letter-spacing: 0.05em;
}

.testimonial-name {
    color: var(--text-1);
    font-weight: 750;
    font-size: 0.94rem;
    letter-spacing: -0.01em;
    line-height: 1.2;
}

.testimonial-role {
    color: var(--text-2);
    font-size: 0.78rem;
    line-height: 1.35;
    margin-top: 0.2rem;
}

.highlight-company {
    color: var(--accent);
    font-weight: 600;
}

@media (max-width: 1024px) {
    .testimonials-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .testimonials-section {
        padding: 4.5rem 1rem 3.5rem;
    }
}

@media (max-width: 480px) {
    .testimonials-section {
        padding: 3rem 0.8rem;
    }
    .testimonial-card {
        padding: 1.25rem 1.15rem;
    }
}

/* ── Light Mode Polish ── */
:global([data-theme="light"]) .testimonial-card {
    background: #ffffff;
    border-color: rgba(15, 23, 42, 0.08);
    box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 0 0 1px rgba(15, 23, 42, 0.04);
}

:global([data-theme="light"]) .testimonial-card:hover {
    border-color: rgba(13, 148, 136, 0.4);
    box-shadow: 0 16px 36px -6px rgba(15, 23, 42, 0.1), 0 0 24px rgba(13, 148, 136, 0.12);
}
</style>
