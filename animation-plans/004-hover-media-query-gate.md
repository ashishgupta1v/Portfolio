# 004 — Gate hover motion behind `@media (hover: hover) and (pointer: fine)`

- **Status**: TODO
- **Commit**: `4d69efc`
- **Severity**: MEDIUM
- **Category**: Accessibility (AUDIT §6)
- **Estimated scope**: 3 files, ~10 CSS rules moved into `@media` blocks.

## Problem

On touch devices, tapping an element fires a synthetic `:hover` that persists until the user taps somewhere else. That leaves cards visually "stuck" in a hovered state after a tap, and any transform-based hover motion (like scale-up) plays on every tap.

AUDIT §6: `@media (hover: hover) and (pointer: fine) { .element:hover { … } }` — hover-motion elsewhere is a finding.

Confirmed at:

```css
/* resources/js/Components/PortfolioV2/AboutSection.vue:211-215 — current */
.combo-card.active,
.combo-card:hover {
    border-color: rgba(94, 234, 212, 0.55);
    background: rgba(94, 234, 212, 0.04);
}

/* resources/js/Components/PortfolioV2/ChatWidget.vue:159-163 — current */
.chat-toggle-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 32px rgba(94, 234, 212, 0.5);
}

/* resources/js/Components/PortfolioV2/WorksSection.vue:157-162,174-176,199-201,257-260 — current */
.work-row:hover { /* … */ }
.work-row:hover .work-num { color: rgba(94, 234, 212, 0.3); }
.work-row:hover .work-title { color: #5eead4; }
.work-row:hover .work-tag { /* … */ }

/* resources/js/Components/PortfolioV2/WorksSection.vue:221-226 — current */
.work-live-link:hover { /* … */ }
```

## Target

Wrap each `:hover` selector in the hover media query. `:hover` styles inside the media query are ignored on touch devices, so tapping no longer leaves the card visibly hovered.

Two design decisions:

1. **Color/border changes stay OUT of the media query.** They give useful feedback and don't feel bad when they stick — the `.combo-card.active` path already handles taps, so the `:hover` on `.combo-card` in AUDIT terms is a "sticky visual state on touch = mild finding", not a critical one. But we still gate them, because AUDIT §6 is explicit.
2. **Transform-based hovers MUST be gated.** `.chat-toggle-btn` scales up 5% on hover — this is the loudest offender on touch.

Full targets:

```css
/* target — AboutSection.vue */
.combo-card.active {
    border-color: rgba(94, 234, 212, 0.55);
    background: rgba(94, 234, 212, 0.04);
}

@media (hover: hover) and (pointer: fine) {
    .combo-card:hover {
        border-color: rgba(94, 234, 212, 0.55);
        background: rgba(94, 234, 212, 0.04);
    }
}

/* target — ChatWidget.vue */
@media (hover: hover) and (pointer: fine) {
    .chat-toggle-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 12px 32px rgba(94, 234, 212, 0.5);
    }
}

/* target — WorksSection.vue (wrap all four :hover blocks in ONE media query) */
@media (hover: hover) and (pointer: fine) {
    .work-row:hover {
        background: rgba(94, 234, 212, 0.02);
    }
    .work-row:hover .work-num  { color: rgba(94, 234, 212, 0.3); }
    .work-row:hover .work-title { color: #5eead4; }
    .work-row:hover .work-tag {
        border-color: rgba(94, 234, 212, 0.3);
        color: rgba(226, 232, 240, 0.8);
    }
    .work-live-link:hover {
        background: rgba(94, 234, 212, 0.12);
        border-color: rgba(94, 234, 212, 0.75);
        color: #5eead4;
        transform: translateY(-1px);
    }
}
```

Note the `.work-row:hover` block in the target above omits `padding-left/right/border-radius` because **plan 002** has already removed those. If plan 002 has not run yet, do it first; then run this plan against the post-002 tree.

## Repo conventions to follow

- The existing `@media (max-width: …)` blocks in each component define breakpoints at the file bottom. Place the new `@media (hover: hover) and (pointer: fine)` block immediately **above** the mobile media queries, so it groups with them.
- Do not introduce a fifth breakpoint or reshuffle existing responsive rules.

## Steps

1. **Prerequisite check:** for `WorksSection.vue`, confirm plan 002 has run: `grep -c "padding-left: 1rem" resources/js/Components/PortfolioV2/WorksSection.vue` should be 0 (or only inside `@media (max-width: …)`). If it's still in `.work-row:hover`, stop and run plan 002 first.
2. Open `resources/js/Components/PortfolioV2/AboutSection.vue`. Split the combined `.combo-card.active, .combo-card:hover` block into two: keep `.active` at top level, wrap `:hover` in the media query.
3. Open `resources/js/Components/PortfolioV2/ChatWidget.vue`. Wrap the `.chat-toggle-btn:hover` block in the media query.
4. Open `resources/js/Components/PortfolioV2/WorksSection.vue`. Group all five `:hover` rules under **Target** into one media-query block, placed near the bottom of the file above the `@media (max-width: 900px)` block. Delete the original top-level `:hover` rules.
5. Save each file.

## Boundaries

- Do NOT touch `Pages/Portfolio/Index.vue` — it already has `@media (prefers-reduced-motion: reduce)` handling for the depth hover; the base rule is intentional and out of scope for this plan.
- Do NOT gate `:focus`, `:focus-visible`, `:active`, or `:disabled` states. Only `:hover`.
- Do NOT change any values inside the moved rules. Only the wrapping media query is added.
- Do NOT touch `NavBar.vue` — its `:hover` rules are on desktop-only elements already hidden on mobile.
- Do NOT add polyfills or JS detection for touch. `@media (hover: hover)` is well supported.

## Verification

- **Mechanical:**
  - `grep -n "(hover: hover)" resources/js/Components/PortfolioV2/AboutSection.vue resources/js/Components/PortfolioV2/ChatWidget.vue resources/js/Components/PortfolioV2/WorksSection.vue` → 3 matches, one per file.
  - `npm run build` → exits 0.
- **Feel check:**
  - **Desktop:** hover the chat toggle → scales up 5%. Hover a work row → tint appears. All previous hover behavior preserved.
  - **Mobile (DevTools → Toggle device toolbar, iPhone preset):** tap the chat toggle → opens without a scale-up jump. Tap a work row → row is not left in a highlighted state. Tap the About cards → the tapped card gets the `.active` state (which is what the click handler assigns) but neighbours don't inherit a sticky hover on scroll-tap.
  - Real touch device if possible — the emulator does not perfectly simulate false-hover behaviour.
- **Done when:** hover states behave identically on desktop, and on touch there is no sticky post-tap hover visual.
