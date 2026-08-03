# 003 — Replace `transition: all` with explicit property lists

- **Status**: TODO
- **Commit**: `4d69efc`
- **Severity**: MEDIUM
- **Category**: Performance (AUDIT §5)
- **Estimated scope**: 5 files, ~10 lines each side of the diff.

## Problem

`transition: all` is AUDIT §5's "always a finding". It animates unintended properties off the GPU and, when a future style change adds a layout property, silently starts animating that too. In this codebase it also picks up layout properties today in a couple of spots (see plan 002 for `.work-row`).

Confirmed at these locations:

```css
/* resources/js/Components/PortfolioV2/ChatWidget.vue:157 — current */
.chat-toggle-btn { /* ... */ transition: all 0.3s ease; }

/* resources/js/Components/PortfolioV2/ChatWidget.vue:324 — current */
.chat-panel { /* ... */ transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }

/* resources/js/Components/PortfolioV2/ContactSection.vue:371 — current */
.form-input, .form-textarea, .form-select { transition: all 0.3s ease; }

/* resources/js/Components/PortfolioV2/ContactSection.vue:438 — current */
.social-chip { transition: all 0.3s ease; }

/* resources/js/Components/PortfolioV2/NavBar.vue:155 — current */
.nav-link { transition: all 0.35s ease; }

/* resources/js/Components/PortfolioV2/NavBar.vue:265 — current */
.mobile-nav-link { transition: all 0.3s ease; }

/* resources/js/Components/PortfolioV2/WorksSection.vue:254 — current */
.work-tag { transition: all 0.3s ease; }
```

`WorksSection.vue:153` (`.work-row`) and `WorksSection.vue:280` (`.work-preview`) are handled by **plan 002** — do NOT touch them in this plan.

## Target

Replace each `transition: all …` with the exact property list the surrounding CSS actually animates on `:hover`, `:focus`, and neighbouring `.is-*` classes, using the motion tokens from **plan 005**:

```css
/* target */
.chat-toggle-btn {
    transition:
        transform var(--dur-fast) var(--ease-out),
        background-color var(--dur-fast) var(--ease-out),
        box-shadow var(--dur-med) var(--ease-out);
}

.chat-panel {
    transition:
        opacity var(--dur-med) var(--ease-out),
        transform var(--dur-med) var(--ease-out);
}

.form-input, .form-textarea, .form-select {
    transition:
        border-color var(--dur-fast) var(--ease-out),
        background-color var(--dur-fast) var(--ease-out),
        box-shadow var(--dur-fast) var(--ease-out);
}

.social-chip {
    transition:
        background-color var(--dur-fast) var(--ease-out),
        border-color var(--dur-fast) var(--ease-out),
        color var(--dur-fast) var(--ease-out),
        transform var(--dur-fast) var(--ease-out);
}

.nav-link {
    transition:
        color var(--dur-med) var(--ease-out),
        background-color var(--dur-med) var(--ease-out);
}

.mobile-nav-link {
    transition:
        color var(--dur-fast) var(--ease-out),
        background-color var(--dur-fast) var(--ease-out);
}

.work-tag {
    transition:
        border-color var(--dur-fast) var(--ease-out),
        color var(--dur-fast) var(--ease-out),
        background-color var(--dur-fast) var(--ease-out);
}
```

For each rule, read the `:hover` / `:focus` / active-state block(s) immediately following it and confirm the property list covers exactly what those blocks change. If a state block changes a property NOT in the list above, add it — do not silently drop it. If a state block changes a layout property (`padding`, `width`, `margin`, `top`, `left`, `height`), STOP — flag it as needing a separate plan; do not include it in the property list.

## Repo conventions to follow

- Motion tokens (`--ease-out`, `--dur-fast`, `--dur-med`, `--dur-slow`) come from `resources/css/app.css`. Confirm they exist before starting (`grep "\-\-ease-out:" resources/css/app.css`) — plan 005 is a prerequisite.
- Existing custom bezier `cubic-bezier(0.16, 1, 0.3, 1)` at `ChatWidget.vue:324` and `cubic-bezier(0.22, 1, 0.36, 1)` at `WorksSection.vue:280` collapse into `var(--ease-out)` (which is `cubic-bezier(0.23, 1, 0.32, 1)`) — the visual difference is imperceptible.
- Match the existing indentation (4 spaces) and line style in each file.

## Steps

1. Verify prerequisite: `grep -c "\-\-ease-out:" resources/css/app.css` → returns 1. If 0, stop and report — plan 005 must run first.
2. For each of the 7 rules listed under **Target**, in file order:
   a. Open the file.
   b. Locate the exact selector.
   c. Read the following `:hover` / `:focus` state blocks to confirm the property list is complete.
   d. Replace the `transition: all …` line with the multi-line `transition:` block from **Target**.
3. Save each file.

## Boundaries

- Do NOT touch `.work-row` (`WorksSection.vue:153`) or `.work-preview` (`WorksSection.vue:280`). Plan 002 owns those.
- Do NOT touch `WhatIDoSection.vue` — that component was deleted in commit `445770d`; if the file still exists, report it and stop.
- Do NOT change durations globally. Only swap `0.3s` for `var(--dur-med)` (220ms) or `var(--dur-fast)` (160ms) as specified above.
- Do NOT touch any `@keyframes` block or any GSAP `.from()/fromTo()` call. Those are out of scope.
- Do NOT change reveal/entrance behavior. Only `:hover` and `:focus` responsiveness is in scope.
- If any state block changes a layout property, STOP.

## Verification

- **Mechanical:**
  - `grep -rn "transition: all" resources/js/Components/PortfolioV2/` → returns 0 lines (excluding files owned by plan 002 if they still have `transition: all` — but 002 removes those anyway).
  - `npm run build` → exits 0 with no warnings.
- **Feel check:** open `http://127.0.0.1:8000`:
  - Hover the chat toggle → button lifts and background shifts. In DevTools Animations panel, only `transform`, `background-color`, and `box-shadow` should tween. `all` should not appear.
  - Hover a nav link → color and background shift only.
  - Focus a contact form input → border and shadow change.
  - Hover the chat panel while it's open — no jitter, entry animation still uses the correct curve (feel-check the chat toggle open: should scale from `bottom-left`).
  - Toggle `prefers-reduced-motion` in DevTools Rendering panel → hovers still show a colour change (opacity/color kept), no `transform` movement remains for `:hover` (that's already handled at the section level in Index.vue).
- **Done when:** grep returns 0, build succeeds, all 4 feel-check hovers behave identically to before but no longer animate unintended properties.
