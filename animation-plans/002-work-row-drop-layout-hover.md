# 002 — Stop animating padding in `.work-row:hover`

- **Status**: TODO
- **Commit**: `4d69efc`
- **Severity**: HIGH
- **Category**: Performance (AUDIT §5)
- **Estimated scope**: 1 file, ~15 lines.

## Problem

`.work-row` uses `transition: all 0.35s ease` and then, on hover, changes `padding-left`, `padding-right`, `border-radius`, and `background`. Padding is a layout property — every hover triggers reflow of the entire row list underneath the current row. AUDIT §5: "`width`/`height`/`margin`/`padding`/`top`/`left` trigger layout + paint + composite."

```css
/* resources/js/Components/PortfolioV2/WorksSection.vue:145-162 — current */
.work-row {
    display: grid;
    grid-template-columns: 4rem 1fr;
    gap: 2rem;
    align-items: start;
    padding: 2rem 0;
    border-bottom: 1px solid rgba(148, 163, 184, 0.08);
    cursor: pointer;
    transition: all 0.35s ease;
    position: relative;
}

.work-row:hover {
    background: rgba(94, 234, 212, 0.02);
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.5rem;
}
```

## Target

Keep the intended visual — a subtle inset and highlight on hover — but implement it with `transform` and `background-color` only. Use pseudo-elements for the border-radius highlight so no layout property is animated.

```css
/* target */
.work-row {
    display: grid;
    grid-template-columns: 4rem 1fr;
    gap: 2rem;
    align-items: start;
    padding: 2rem 1rem;   /* absorbed the +1rem hover padding into the rest state */
    border-bottom: 1px solid rgba(148, 163, 184, 0.08);
    cursor: pointer;
    position: relative;
    transition:
        background-color var(--dur-med) var(--ease-out);
    border-radius: 0.5rem;
}

.work-row:hover {
    background: rgba(94, 234, 212, 0.02);
}
```

Absorbing the `+1rem` hover padding into the resting state gives the same optical size at rest as the current hovered state, and removes the layout-property tween entirely. The rows become slightly wider all the time — that's the small tradeoff we accept for smooth hover.

If keeping the "insets on hover" motion is important to the feel, a pure-transform alternative is:

```css
/* alternate target — preserves the inset "grow" feeling using transform only */
.work-row {
    /* ... resting styles, keep padding: 2rem 0 as-is ... */
    transition:
        transform var(--dur-med) var(--ease-out),
        background-color var(--dur-med) var(--ease-out);
    transform-origin: center;
}

.work-row:hover {
    transform: scale(1.01);      /* very subtle — 1% inflate reads as "attention" without reflow */
    background: rgba(94, 234, 212, 0.02);
    border-radius: 0.5rem;
}
```

The primary target (padding-absorbed) is preferred — it's simpler and cannot cause sub-pixel row shifting. Use the alternate only if user feedback says the "insets" motion is missed.

## Repo conventions to follow

- Motion tokens (`--ease-out`, `--dur-med`) come from `resources/css/app.css` — verify with `grep "\-\-ease-out:" resources/css/app.css` before starting. Plan 005 is a prerequisite.
- Existing `.work-preview` at `WorksSection.vue:269-289` uses `cubic-bezier(0.22, 1, 0.36, 1)` and `0.4s` — leave it alone; that curve is fine and 0.4s is on the edge of AUDIT's 300ms budget for a large image preview appearing.
- Four-space indentation, same style as surrounding.

## Steps

1. Verify prerequisite: `grep -c "\-\-ease-out:" resources/css/app.css` → 1. If 0, stop.
2. Open `resources/js/Components/PortfolioV2/WorksSection.vue`.
3. Locate `.work-row` at line 145 and `.work-row:hover` at line 157.
4. Replace both blocks with the primary **Target** above.
5. Save the file. Do NOT modify `.work-preview`, `.work-num`, `.work-title`, or any other selector.

## Boundaries

- Do NOT change the hover styles on `.work-num`, `.work-title`, `.work-tag`, or the preview image. They stay untouched.
- Do NOT edit `WorksSection.vue`'s template, GSAP calls, or `<script>` block.
- Do NOT change the mobile/`@media (max-width: …)` overrides for `.work-row` — those don't have hover behavior on touch anyway.
- Do NOT extend this plan to `.combo-card` — plan 004 (hover gating) touches that; do not double-edit.

## Verification

- **Mechanical:**
  - `grep -n "transition: all" resources/js/Components/PortfolioV2/WorksSection.vue` → returns only line 254 (`.work-tag`, owned by plan 003).
  - `grep -n "padding-left\|padding-right" resources/js/Components/PortfolioV2/WorksSection.vue` should NOT show either inside a `:hover` block after the change.
  - `npm run build` → exits 0.
- **Feel check:** open `http://127.0.0.1:8000` and scroll to the Works section.
  - Hover a row → background tints teal, layout underneath does not shift.
  - Open DevTools Performance panel, hover several rows in sequence → no purple "Layout" bars should appear on the flame chart around the hover events (only "Paint" and "Composite").
  - In DevTools Animations panel, slow to 25% → only `background-color` should tween.
  - Toggle `prefers-reduced-motion` → the color tint still appears; there is no movement to disable, so no change is required.
- **Done when:** hover triggers a color change with no layout reflow anywhere in the list.
