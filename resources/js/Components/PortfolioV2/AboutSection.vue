<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { Profile } from '@/types/portfolio'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps<{
    profile: Profile
}>()

const sectionRef = ref<HTMLElement | null>(null)
const imageWrap  = ref<HTMLElement | null>(null)

onMounted(() => {
    if (!sectionRef.value) return

    /* ── Image parallax on mouse move ── */
    const img = imageWrap.value
    if (img) {
        const onMove = (e: MouseEvent) => {
            const rect = sectionRef.value!.getBoundingClientRect()
            const cx = (e.clientX - rect.left) / rect.width  - 0.5  // -0.5 → 0.5
            const cy = (e.clientY - rect.top)  / rect.height - 0.5
            gsap.to(img, {
                x: cx * 18,
                y: cy * 14,
                rotateY: cx * 4,
                rotateX: -cy * 3,
                duration: 0.8,
                ease: 'power2.out',
            })
        }
        sectionRef.value.addEventListener('mousemove', onMove, { passive: true })
    }

    /* ── Heading reveal ── */
    gsap.from('.about-eyebrow', {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 78%' },
        y: 20, opacity: 0, duration: 0.7, ease: 'power3.out',
    })
    gsap.from('.about-heading', {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 76%' },
        y: 30, opacity: 0, duration: 0.85, delay: 0.1, ease: 'power3.out',
    })

    /* ── Paragraph stagger ── */
    gsap.from('.about-para', {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 68%' },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'power3.out',
    })

    /* ── Image float-in ── */
    gsap.from('.about-image-wrap', {
        scrollTrigger: { trigger: sectionRef.value, start: 'top 72%' },
        x: -60, opacity: 0, scale: 0.92, duration: 1.1, ease: 'power3.out',
    })

    /* ── Glow pulse ── */
    gsap.to('.about-glow', {
        scale: 1.15, opacity: 0.7, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut',
    })
})
</script>

<template>
    <section ref="sectionRef" id="about" class="about-section">
        <div class="about-shell">
            <!-- Left: cutout image with motion -->
            <div ref="imageWrap" class="about-image-wrap">
                <div class="about-glow" />
                <img
                    :src="profile.avatarUrl || '/images/Edit the existing po.png'"
                    :alt="profile.name"
                    class="about-image"
                    loading="lazy"
                />
            </div>

            <!-- Right: text content -->
            <div class="about-text">
                <p class="about-eyebrow">About Me</p>
                <h2 class="about-heading">{{ profile.name }}</h2>

                <p class="about-para about-bio">
                    {{ profile.bio }}
                </p>
                <p class="about-para about-bio-secondary">
                    Deep expertise in designing high-availability systems, leading squads of 7+ engineers,
                    and driving CI/CD automation. Modernizing legacy healthcare monoliths using Domain-Driven Design
                    and shipping AI-native products end to end.
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped>
.about-section {
    position: relative;
    background: linear-gradient(180deg, #090e14 0%, #0c1521 50%, #0b1118 100%);
    padding: 8rem 1.5rem 7rem;
    overflow: hidden;
}

.about-shell {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 4rem;
    align-items: center;
}

/* ── Image ── */
.about-image-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    perspective: 800px;
    will-change: transform;
}

.about-glow {
    position: absolute;
    width: 70%;
    aspect-ratio: 1;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    background: radial-gradient(circle, rgba(94, 234, 212, 0.22) 0%, transparent 70%);
    filter: blur(50px);
    pointer-events: none;
    z-index: 0;
}

.about-image {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 420px;
    height: auto;
    border-radius: 1.2rem;
    object-fit: cover;
    filter: drop-shadow(0 20px 60px rgba(0, 0, 0, 0.5));
}

/* ── Text ── */
.about-text {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.about-eyebrow {
    color: rgba(94, 234, 212, 0.9);
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-size: 0.78rem;
    margin-bottom: 1rem;
    font-weight: 600;
}

.about-heading {
    color: #f8fafc;
    font-size: clamp(2rem, 4vw, 3.4rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 1.8rem;
}

.about-bio {
    color: rgba(226, 232, 240, 0.88);
    font-size: clamp(1rem, 1.6vw, 1.25rem);
    line-height: 1.75;
    font-weight: 400;
    margin-bottom: 1.2rem;
}

.about-bio-secondary {
    color: rgba(226, 232, 240, 0.55);
    font-size: clamp(0.9rem, 1.3vw, 1.05rem);
    line-height: 1.75;
    font-weight: 300;
}

/* ── Mobile ── */
@media (max-width: 900px) {
    .about-shell {
        grid-template-columns: 1fr;
        gap: 2.5rem;
        text-align: center;
    }
    .about-image-wrap {
        order: -1;
    }
    .about-image {
        max-width: 320px;
    }
    .about-text {
        align-items: center;
    }
    .about-bio,
    .about-bio-secondary {
        max-width: 38rem;
    }
}

@media (max-width: 480px) {
    .about-section {
        padding: 4rem 1rem 4rem;
    }
    .about-image {
        max-width: 260px;
    }
}
</style>
