<script setup lang="ts">
/**
 * A lightweight image wrapper that fixes the two things every raw <img> gets
 * wrong on a portfolio: cumulative layout shift and no perceived-performance
 * placeholder while the image is downloading.
 *
 * Contract:
 *   - `src` and `alt` are required. Alt="" is allowed for decorative images
 *     but must be explicit.
 *   - `width` / `height` are required so the browser can reserve the box
 *     before the bytes arrive. Aspect ratio is derived from them.
 *   - `sizes` is optional; when set together with `srcset`, browsers pick
 *     the best candidate. If neither is provided, we render a plain <img>.
 *   - `srcset` accepts the raw string form, e.g.
 *       "img-400.webp 400w, img-800.webp 800w, img-1200.webp 1200w"
 *   - `webpSrc` and `webpSrcset` opt into a <picture> element with a WebP
 *     source ahead of the fallback — the browser picks WebP where supported.
 *
 * The wrapper itself is `position: relative` with the intrinsic aspect ratio
 * applied, so it always occupies the correct block size even before the
 * image loads. The shimmer runs only while `isLoaded` is false and is off
 * for reduced-motion users.
 */
import { ref } from 'vue'

const props = defineProps<{
    src: string
    alt: string
    width: number
    height: number
    sizes?: string
    srcset?: string
    webpSrc?: string
    webpSrcset?: string
    /** When true, priority-hint above the fold. */
    eager?: boolean
    /** Extra classes forwarded onto the <img>. */
    imgClass?: string
}>()

const isLoaded = ref(false)
const hasError = ref(false)

function onLoad() {
    isLoaded.value = true
}
function onError() {
    hasError.value = true
    // Still hide the shimmer — no point animating a broken image.
    isLoaded.value = true
}
</script>

<template>
    <span
        class="responsive-image"
        :class="{ 'is-loaded': isLoaded, 'has-error': hasError }"
        :style="{
            aspectRatio: `${width} / ${height}`,
        }"
    >
        <picture v-if="webpSrc || webpSrcset">
            <source
                type="image/webp"
                :srcset="webpSrcset ?? webpSrc"
                :sizes="sizes"
            />
            <img
                :src="src"
                :srcset="srcset"
                :sizes="sizes"
                :alt="alt"
                :width="width"
                :height="height"
                :loading="eager ? 'eager' : 'lazy'"
                :fetchpriority="eager ? 'high' : 'auto'"
                decoding="async"
                :class="imgClass"
                @load="onLoad"
                @error="onError"
            />
        </picture>
        <img
            v-else
            :src="src"
            :srcset="srcset"
            :sizes="sizes"
            :alt="alt"
            :width="width"
            :height="height"
            :loading="eager ? 'eager' : 'lazy'"
            :fetchpriority="eager ? 'high' : 'auto'"
            decoding="async"
            :class="imgClass"
            @load="onLoad"
            @error="onError"
        />
    </span>
</template>

<style scoped>
.responsive-image {
    position: relative;
    display: block;
    overflow: hidden;
    background: rgba(148, 163, 184, 0.08);
}

.responsive-image :deep(img) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 260ms cubic-bezier(0.23, 1, 0.32, 1);
}

.responsive-image.is-loaded :deep(img) {
    opacity: 1;
}

/* Shimmer placeholder while loading. Uses a pseudo-element so it doesn't
   affect layout and can be removed cleanly on load. */
.responsive-image:not(.is-loaded)::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
        90deg,
        rgba(148, 163, 184, 0.05) 0%,
        rgba(148, 163, 184, 0.15) 50%,
        rgba(148, 163, 184, 0.05) 100%
    );
    background-size: 200% 100%;
    animation: img-shimmer 1.6s ease-in-out infinite;
}

.responsive-image.has-error::before {
    animation: none;
    background: rgba(148, 163, 184, 0.08);
}

@keyframes img-shimmer {
    0%   { background-position: 100% 0; }
    100% { background-position: -100% 0; }
}

@media (prefers-reduced-motion: reduce) {
    .responsive-image:not(.is-loaded)::before {
        animation: none;
        background: rgba(148, 163, 184, 0.09);
    }
    .responsive-image :deep(img) {
        transition: opacity 160ms ease;
    }
}
</style>
