# 001 — Move hover-tilt from root CSS vars to per-card transform

- **Status**: TODO
- **Commit**: `4d69efc`
- **Severity**: HIGH
- **Category**: Performance (AUDIT §5)
- **Estimated scope**: 2 files, ~40 lines net.

## Problem

The current architecture writes 6 CSS custom properties on the page root on every `mousemove`, and every hovered card reads those variables inside its `transform`:

```ts
// resources/js/Composables/useMouseDepth.ts:27-34 — current
const depthVars = computed(() => ({
    '--mx': mx.value.toFixed(4),
    '--my': my.value.toFixed(4),
    '--depth-rx': `${(-my.value * strength * 2).toFixed(3)}deg`,
    '--depth-ry': `${(mx.value * strength * 2).toFixed(3)}deg`,
    '--depth-tx': `${(mx.value * strength * 8).toFixed(2)}px`,
    '--depth-ty': `${(my.value * strength * 8).toFixed(2)}px`,
}) as Record<string, string>)
```

```vue
<!-- resources/js/Pages/Portfolio/Index.vue:136 — current -->
<div class="v2-page" :style="depthVars">
```

```css
/* resources/js/Pages/Portfolio/Index.vue:199-207 — current */
.depth-sections :deep(article:hover),
.depth-sections :deep(.capability-card:hover),
.depth-sections :deep(.work-row:hover) {
    transform:
        perspective(800px)
        rotateX(calc(var(--my, 0) * -1.5deg))
        rotateY(calc(var(--mx, 0) * 1.5deg))
        translateZ(12px);
}
```

Two problems compound:

1. **AUDIT §5 exact anti-pattern:** "Don't drive child transforms via a CSS variable on the parent — it recalcs styles for all children. Set `transform` directly on the element." Every mousemove triggers a style recalc for every descendant of `.v2-page`, which is the entire page.
2. **The `--mx`/`--my` values don't even change while hovering.** They track the mouse over the whole viewport; the tilt effect is meant to react to hover, not viewport position. The current geometry means a card hovered near the top-right always tilts the same way regardless of where the pointer sits *on* the card — which is not what the intent was.

## Target

Track pointer position **per card**, in JS, and write a single `transform` string to that card's inline style. Drop the CSS var machinery entirely.

New composable:

```ts
// resources/js/Composables/useTiltOnHover.ts — new file
import { onMounted, onUnmounted } from 'vue'

/**
 * Applies a pseudo-3D tilt to elements matching `selector` inside `root`,
 * driven by the pointer's position over each hovered element.
 *
 * Sets `transform` directly on the hovered element (no CSS custom properties,
 * no parent-driven recalc). Respects `prefers-reduced-motion` — when reduced
 * motion is preferred, no listeners are attached and no transform is written.
 */
export function useTiltOnHover(
    root: () => HTMLElement | null,
    selector: string,
    opts: { maxTiltDeg?: number; translateZpx?: number } = {},
) {
    const maxTilt = opts.maxTiltDeg ?? 1.5
    const liftZ = opts.translateZpx ?? 12

    let cleanup: Array<() => void> = []
    let currentTarget: HTMLElement | null = null

    function onMove(event: PointerEvent) {
        if (!currentTarget) return
        const rect = currentTarget.getBoundingClientRect()
        // Normalize pointer offset within the element to [-1, 1].
        const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1
        const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1
        // Y drives rotateX inverted (tilt away from cursor), X drives rotateY.
        currentTarget.style.transform =
            `perspective(800px) rotateX(${(-ny * maxTilt).toFixed(3)}deg) ` +
            `rotateY(${(nx * maxTilt).toFixed(3)}deg) translateZ(${liftZ}px)`
    }

    function onEnter(event: PointerEvent) {
        currentTarget = event.currentTarget as HTMLElement
        currentTarget.style.willChange = 'transform'
    }

    function onLeave() {
        if (!currentTarget) return
        currentTarget.style.transform = ''
        currentTarget.style.willChange = ''
        currentTarget = null
    }

    onMounted(() => {
        // Bail entirely on touch or reduced motion.
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const el = root()
        if (!el) return

        const targets = Array.from(el.querySelectorAll<HTMLElement>(selector))
        targets.forEach((t) => {
            t.addEventListener('pointerenter', onEnter)
            t.addEventListener('pointerleave', onLeave)
            t.addEventListener('pointermove', onMove, { passive: true })
            cleanup.push(() => {
                t.removeEventListener('pointerenter', onEnter)
                t.removeEventListener('pointerleave', onLeave)
                t.removeEventListener('pointermove', onMove)
            })
        })
    })

    onUnmounted(() => {
        cleanup.forEach((fn) => fn())
        cleanup = []
    })
}
```

Wire it up in `Pages/Portfolio/Index.vue`:

```vue
<!-- target: replace the useMouseDepth import + `:style="depthVars"` binding -->
<script setup lang="ts">
// ... existing imports ...
import { useTiltOnHover } from '@/Composables/useTiltOnHover'
// REMOVE: import { useMouseDepth } from '@/Composables/useMouseDepth'

// REMOVE: const { depthVars } = useMouseDepth(1)
const depthRef = ref<HTMLElement | null>(null)

useTiltOnHover(
    () => depthRef.value,
    'article, .capability-card, .work-row',
)
</script>

<template>
    <!-- remove :style="depthVars" from the root div -->
    <div class="v2-page">
```

And drop the CSS `:hover` transform, since the JS composable now writes `transform` directly:

```css
/* target: remove these blocks entirely from Index.vue */
/*
.depth-sections :deep(article:hover),
.depth-sections :deep(.capability-card:hover),
.depth-sections :deep(.work-row:hover) {
    transform: … var(--mx) … var(--my) …;
}

@media (prefers-reduced-motion: reduce) {
    .depth-sections :deep(article:hover), ... {
        transform: none;
    }
}
*/
```

The `prefers-reduced-motion` guard is now inside the composable — it never attaches listeners.

Keep the `transition: transform 0.3s ease` on those selectors (the one that already exists in Index.vue for smooth return-to-rest). Change the easing to the token:

```css
/* target: keep this rule, swap ease → var(--ease-out) */
.depth-sections :deep(article),
.depth-sections :deep(.capability-card),
.depth-sections :deep(.work-row),
.depth-sections :deep(.timeline-node) {
    transition: transform var(--dur-med) var(--ease-out);
}
```

## Repo conventions to follow

- Composables live in `resources/js/Composables/*.ts`. The two existing ones (`useMouseDepth.ts`, `useA11y.ts`) both use `onMounted`/`onUnmounted` and check `prefers-reduced-motion` via `window.matchMedia`. Match that shape.
- 4-space indentation, single quotes, no semicolons at end of statements (per the existing style in `useMouseDepth.ts`).
- Motion tokens (`--ease-out`, `--dur-med`) live in `resources/css/app.css` (added by plan 005 — verify with `grep "\-\-ease-out:" resources/css/app.css`).

## Steps

1. **Prerequisite checks:**
   - `grep -c "\-\-ease-out:" resources/css/app.css` → 1. If 0, run plan 005 first.
   - Confirm plans 002–004 have already landed; this plan diffs against the post-004 tree.
2. Create `resources/js/Composables/useTiltOnHover.ts` with the code above.
3. Open `resources/js/Pages/Portfolio/Index.vue`.
4. In `<script setup>`:
   - Remove the `import { useMouseDepth } from '@/Composables/useMouseDepth'` line.
   - Remove the `const { depthVars } = useMouseDepth(1)` line.
   - Add `import { useTiltOnHover } from '@/Composables/useTiltOnHover'`.
   - After `const depthRef = ref<HTMLElement | null>(null)`, add the `useTiltOnHover(() => depthRef.value, '...')` call as shown in **Target**.
5. In `<template>`: remove the `:style="depthVars"` binding from the `.v2-page` div.
6. In `<style scoped>`:
   - Remove the `.depth-sections :deep(article:hover), … { transform: … }` block (the one using `var(--mx)/var(--my)`).
   - Remove the `@media (prefers-reduced-motion: reduce) { .depth-sections :deep(...) :hover { transform: none } }` block.
   - Change the existing `transition: transform 0.3s ease` line (in the non-hover `.depth-sections :deep(article)` block) to `transition: transform var(--dur-med) var(--ease-out);`.
7. **Do not delete `useMouseDepth.ts`.** Grep first: `grep -rn "useMouseDepth" resources/js/`. If Index.vue is the only consumer, delete the file. If anything else uses it, leave it and just remove the Index.vue import.
8. `npm run build` → 0 errors.

## Boundaries

- Do NOT change the depth-section reveal (`gsap.fromTo(section, { z: -80, opacity: 0.3, rotateX: 2 }, …)`). That is unrelated and works fine.
- Do NOT change `ScrollySequence.vue`'s scroll-driven hero. Out of scope.
- Do NOT add tilt to elements outside the current selector list (`article`, `.capability-card`, `.work-row`). Keep the set identical to what the current CSS `:hover` targets.
- Do NOT introduce a new library.
- If `grep "useMouseDepth" resources/js/` finds consumers other than `Index.vue`, leave the file — but ensure the removed root binding does not break them (their CSS reads may just fall back to `0`, which is fine).

## Verification

- **Mechanical:**
  - `grep -rn "useMouseDepth" resources/js/Pages/Portfolio/Index.vue` → 0 lines.
  - `grep -rn "depthVars" resources/js/Pages/Portfolio/Index.vue` → 0 lines.
  - `grep -rn "var(--mx" resources/js/Pages/Portfolio/Index.vue` → 0 lines.
  - `npx vue-tsc --noEmit` → 0 errors.
  - `npm run build` → exits 0.
- **Feel check:** open `http://127.0.0.1:8000` on a laptop or desktop.
  - Move the mouse across the page WITHOUT hovering any card — no tilting on anything, no jitter, no console errors.
  - Hover a `.combo-card` (About Me), a `.work-row` (Work), a `.tl-row` if that has `article` — the card tilts *based on where the pointer is inside that specific card*. Move the pointer to different corners of the same card and the tilt should change accordingly.
  - Open DevTools → Performance panel and record a 3-second capture while sweeping the mouse across the page NOT hovering anything. Confirm the flame chart has **no** "Recalculate Style" bars firing on `mousemove` — before this plan, they would fire continuously.
  - Toggle `prefers-reduced-motion` (Rendering panel) → cards should not tilt on hover at all. No listener attached.
  - On a touch device or mobile emulation → no tilt (pointer:fine gate).
- **Done when:** hover tilt reacts to pointer position **within** each hovered card, style recalc no longer fires on mousemove over empty page area, and `prefers-reduced-motion` + touch both disable it cleanly.
