# 006 — Add `:active` press feedback to interactive rows and cards

- **Status**: TODO
- **Commit**: `4d69efc`
- **Severity**: LOW
- **Category**: Physicality (AUDIT §3)
- **Estimated scope**: 3 files, one CSS rule per file.

## Problem

`.work-row`, `.combo-card`, and `.chat-toggle-btn` all have `cursor: pointer` and are click targets, but none give a press affordance when actually pressed. AUDIT §3 recommends `transform: scale(0.97)` on `:active` for pressable elements, transition of `160ms ease-out`. Without it, a click feels weightless — the row's hover state is the only tactile feedback.

Confirmed via grep at commit `4d69efc`:

- `grep -n ":active" resources/js/Components/PortfolioV2/WorksSection.vue` → 0 matches.
- `grep -n ":active" resources/js/Components/PortfolioV2/AboutSection.vue` → 0 matches.
- `grep -n ":active" resources/js/Components/PortfolioV2/ChatWidget.vue` → 0 matches.

## Target

Add press feedback using tokens from plan 005. The scale is subtle (0.98 not 0.95, since these are large cards, not small buttons):

```css
/* target — WorksSection.vue */
.work-row:active {
    transform: scale(0.995);      /* very subtle for a wide row */
    transition: transform var(--dur-fast) var(--ease-out);
}

/* target — AboutSection.vue */
.combo-card:active {
    transform: scale(0.985);
    transition: transform var(--dur-fast) var(--ease-out);
}

/* target — ChatWidget.vue */
.chat-toggle-btn:active {
    transform: scale(0.96);       /* button-scale press, standard 0.95–0.98 */
    transition: transform var(--dur-fast) var(--ease-out);
}
```

The transition on `:active` handles the release only — the press itself needs to feel instant (browsers apply `:active` on `mousedown`, which is already immediate).

For `.work-row`: the row's other hover transitions (background-color) already exist and don't conflict, because they animate a different property.

## Repo conventions to follow

- Motion tokens (`--ease-out`, `--dur-fast`) come from plan 005 in `resources/css/app.css`. Verify: `grep "\-\-ease-out:" resources/css/app.css` → 1.
- 4-space indentation.
- Place each `:active` rule directly after the corresponding `:hover` rule for readability. If plan 004 has wrapped `:hover` in `@media (hover: hover)`, place `:active` **outside** that media query — press feedback should fire on touch AND mouse.

## Steps

1. Prerequisite: `grep -c "\-\-ease-out:" resources/css/app.css` → 1. Plans 005 and 004 should ideally be applied first; if 004 is not applied, this plan still works — just place `:active` below the ungated `:hover`.
2. Open `resources/js/Components/PortfolioV2/WorksSection.vue`. Locate `.work-row:hover` (or the hover media query if plan 004 landed). Add the `.work-row:active` block from **Target** below it, at the top level (NOT inside any media query).
3. Open `resources/js/Components/PortfolioV2/AboutSection.vue`. Locate `.combo-card.active` — this is a click-driven class, NOT a `:active` pseudo, so it's separate. Add the `.combo-card:active` block from **Target** near the other `.combo-card` rules.
4. Open `resources/js/Components/PortfolioV2/ChatWidget.vue`. Locate `.chat-toggle-btn:hover` (or the hover media query wrapping it if plan 004 landed). Add the `.chat-toggle-btn:active` block from **Target** at the top level below.
5. `npm run build` → exits 0.

## Boundaries

- Do NOT alter any `:hover`, `:focus`, `:disabled`, or `.active` (the class, not the pseudo) rule.
- Do NOT change the underlying `cursor: pointer`, `@click` handler, or template markup.
- Do NOT extend press feedback to non-pressable elements (headings, images, static text).
- Do NOT add `:active` inside a `@media (hover: hover)` block — press must fire on touch too.
- Keep scale between 0.95 and 0.995. A stronger squash reads as broken.

## Verification

- **Mechanical:**
  - `grep -n ":active" resources/js/Components/PortfolioV2/WorksSection.vue` → returns 1 line with `transform: scale(`.
  - Same check for `AboutSection.vue` and `ChatWidget.vue`.
  - `npm run build` → exits 0.
- **Feel check:** open `http://127.0.0.1:8000`.
  - Click and hold a work row → row briefly shrinks by ~0.5%; release → springs back over ~160ms.
  - Click and hold a capability card in About → card shrinks by ~1.5%; release settles smoothly.
  - Click and hold the chat toggle → button shrinks by ~4%; release scales back up.
  - Toggle `prefers-reduced-motion` → press scale still triggers (small feedback stays), but the transition duration is fine at 160ms (well within reduced-motion tolerance for feedback).
- **Done when:** each of the three targets shows a subtle press-down on mouse/touch, releases smoothly, and no other hover behavior is disrupted.
