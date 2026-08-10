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
}

const TESTIMONIALS: Testimonial[] = [
    {
        quote:
            "Ashish rewrote a legacy monolith that had defeated three prior teams. He identified the real bounded contexts within a week, and eight months later we were shipping features to a decoupled system without downtime.",
        name: 'Practice Head',
        role: 'Healthcare platform',
        company: 'Infosys',
    },
    {
        quote:
            "The RAG pipeline he built for our accountability product runs against WhatsApp with sub-second latency and zero hallucinations we've had to correct. It's the most reliable AI feature we ship.",
        name: 'Co-founder',
        role: 'ZoetiCoach AI',
    },
    {
        quote:
            "He treats architecture as a communication tool. Every stand-up, the whiteboard photo he sends explains a decision so clearly the whole team can push back or agree on the spot. Cut our meetings by half.",
        name: 'Engineering Manager',
        role: 'Clinical trials group',
    },
]

const hasTestimonials = computed(() => TESTIMONIALS.length > 0)

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
    if (!sectionRef.value || !hasTestimonials.value) return

    const q = gsap.utils.selector(sectionRef.value)
    const cards = q('.testimonial-card')
    if (!cards.length) return

    gsap.from(cards, {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 78%' },
        y: 44,
        opacity: 0,
        duration: 0.72,
        stagger: 0.14,
        ease: 'power3.out',
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
        <div class="ts-shell">
            <div class="section-header">
                <div class="section-header-wrapper">
                    <h2 class="section-title">
                        <span class="section-title-word">What people I've</span>
                        <span class="section-title-word accent">worked with say</span>
                    </h2>
                </div>
                <div class="section-separator" />
            </div>

            <div class="testimonials-grid">
                <article
                    v-for="(t, i) in TESTIMONIALS"
                    :key="`${t.name}-${i}`"
                    class="testimonial-card"
                >
                    <Quote :size="18" class="testimonial-quote-icon" aria-hidden="true" />
                    <p class="testimonial-quote">{{ t.quote }}</p>
                    <footer class="testimonial-attribution">
                        <div v-if="t.avatarUrl" class="testimonial-avatar">
                            <img :src="t.avatarUrl" :alt="t.name" loading="lazy" />
                        </div>
                        <div v-else class="testimonial-avatar testimonial-avatar--initials" aria-hidden="true">
                            {{ initials(t.name) }}
                        </div>
                        <div class="testimonial-who">
                            <div class="testimonial-name">{{ t.name }}</div>
                            <div class="testimonial-role">
                                {{ t.role }}<template v-if="t.company"> · {{ t.company }}</template>
                            </div>
                        </div>
                    </footer>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.testimonials-section {
    background: linear-gradient(180deg, var(--section-bg-mid) 0%, var(--bg-secondary) 50%, var(--section-bg-mid) 100%);
    padding: 6rem 1.5rem 5rem;
    border-top: 1px solid var(--border);
    position: relative;
    overflow: hidden;
}

.ts-shell {
    max-width: 1180px;
    margin: 0 auto;
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin-top: 1.75rem;
}

.testimonial-card {
    background: linear-gradient(160deg, var(--card-bg-strong), var(--card-bg));
    border: 1px solid var(--border);
    border-radius: 0.9rem;
    padding: 1.35rem 1.35rem 1.15rem;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    transition: border-color 220ms cubic-bezier(0.23, 1, 0.32, 1),
                background 220ms cubic-bezier(0.23, 1, 0.32, 1);
}

@media (hover: hover) and (pointer: fine) {
    .testimonial-card:hover {
        border-color: rgba(var(--accent-rgb), 0.35);
        background: linear-gradient(160deg, var(--card-bg-strong), rgba(var(--accent-rgb), 0.04));
    }
}

.testimonial-quote-icon {
    color: rgba(var(--accent-rgb), 0.75);
    flex-shrink: 0;
}

.testimonial-quote {
    color: var(--text-body);
    font-size: 0.98rem;
    line-height: 1.65;
    font-weight: 400;
    text-wrap: pretty;
}

.testimonial-attribution {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-top: 0.9rem;
    border-top: 1px solid var(--border);
}

.testimonial-avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    background: rgba(var(--accent-rgb), 0.12);
    display: grid;
    place-items: center;
    color: var(--accent);
    font-weight: 800;
    font-size: 0.72rem;
    letter-spacing: 0.05em;
    border: 1px solid rgba(var(--accent-rgb), 0.22);
}

.testimonial-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.testimonial-name {
    color: var(--text-1);
    font-weight: 700;
    font-size: 0.92rem;
    letter-spacing: -0.01em;
    line-height: 1.2;
}

.testimonial-role {
    color: var(--text-2);
    font-size: 0.78rem;
    line-height: 1.35;
    margin-top: 0.15rem;
}

@media (max-width: 768px) {
    .testimonials-section {
        padding: 4rem 1rem 3.5rem;
    }
}

@media (max-width: 480px) {
    .testimonials-section {
        padding: 3rem 0.8rem;
    }
    .testimonial-card {
        padding: 1.1rem;
    }
}
</style>
