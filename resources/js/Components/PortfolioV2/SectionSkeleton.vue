<script setup lang="ts">
/**
 * Placeholder shown while an async section chunk is loading. Sized to roughly
 * fill the viewport so the depth-section scroll layout doesn't jitter as
 * chunks resolve. Used via defineAsyncComponent(..., { loadingComponent }).
 *
 * The shimmer only runs when motion is allowed and the section is on-screen
 * — CSS media query gate keeps it visually calm for reduced-motion users.
 */
</script>

<template>
    <div class="section-skeleton" aria-hidden="true">
        <div class="skel-header" />
        <div class="skel-line skel-line-wide" />
        <div class="skel-line skel-line-med" />
        <div class="skel-line skel-line-narrow" />
        <div class="skel-cards">
            <div class="skel-card" />
            <div class="skel-card" />
            <div class="skel-card" />
        </div>
    </div>
</template>

<style scoped>
.section-skeleton {
    min-height: 60vh;
    padding: 6rem 1.5rem 4rem;
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.skel-header {
    width: 40%;
    max-width: 22rem;
    height: 2.75rem;
    border-radius: 0.4rem;
    margin-bottom: 1rem;
}

.skel-line {
    height: 0.75rem;
    border-radius: 0.25rem;
}
.skel-line-wide   { width: 82%; }
.skel-line-med    { width: 68%; }
.skel-line-narrow { width: 44%; }

.skel-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
    margin-top: 1.75rem;
}

.skel-card {
    height: 9rem;
    border-radius: 0.75rem;
}

.skel-header,
.skel-line,
.skel-card {
    /* The gradient is animated by shifting background-position. GPU-friendly:
       no layout, no paint outside the box, no color interpolation on children. */
    background: linear-gradient(
        90deg,
        rgba(148, 163, 184, 0.06) 0%,
        rgba(148, 163, 184, 0.14) 50%,
        rgba(148, 163, 184, 0.06) 100%
    );
    background-size: 200% 100%;
    animation: skel-shimmer 1.6s ease-in-out infinite;
}

@keyframes skel-shimmer {
    0%   { background-position: 100% 0; }
    100% { background-position: -100% 0; }
}

@media (prefers-reduced-motion: reduce) {
    .skel-header,
    .skel-line,
    .skel-card {
        animation: none;
        background: rgba(148, 163, 184, 0.09);
    }
}

@media (max-width: 768px) {
    .section-skeleton {
        padding: 4rem 1rem 3rem;
        min-height: 50vh;
    }
}
</style>
