# 005 — Introduce shared easing and duration tokens

- **Status**: TODO
- **Commit**: `4d69efc`
- **Severity**: MEDIUM
- **Category**: Cohesion & tokens (AUDIT §7)
- **Estimated scope**: 1 file (`resources/css/app.css`), ~15 lines added; no other files touched in this plan.

## Problem

Every animated component hand-types its own duration and easing. There are no shared tokens.

Grep against the current tree finds:

- **10 uses of `0.3s ease`** across `ChatWidget.vue`, `ContactSection.vue`, `NavBar.vue`, `WorksSection.vue`.
- **Two custom cubic-beziers that differ by 0.02** and are clearly the same intent:
  - `resources/js/Components/PortfolioV2/ChatWidget.vue:324` — `cubic-bezier(0.16, 1, 0.3, 1)`
  - `resources/js/Components/PortfolioV2/WorksSection.vue:280` — `cubic-bezier(0.22, 1, 0.36, 1)`

This is AUDIT §7's exact consolidation finding: "Five hand-typed cubic-beziers that almost match is a consolidation finding."

This plan **only introduces the tokens** — it does not replace existing usages. Later plans (003, 006) reference them.

## Target

Add the following block to the top of `resources/css/app.css`, immediately after the two `@font-face` rules and before `@tailwind base;`:

```css
/* Motion tokens.
   `--ease-out` is the strong ease-out from AUDIT.md — starts fast, feels responsive.
   `--ease-in-out` is for on-screen movement (morphing, resize).
   Duration budget follows AUDIT.md §2 — UI motion stays under 300ms. */
:root {
    --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
    --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
    --dur-fast: 160ms;
    --dur-med: 220ms;
    --dur-slow: 320ms;
}
```

## Repo conventions to follow

- The existing `:root` block at `resources/css/app.css:32` already holds color tokens (`--accent`, `--bg-primary`, etc.). Do NOT edit that block — the motion tokens go in a **separate** `:root` block placed after `@font-face` and before `@tailwind base`, so they load before Tailwind's reset and are available to every stylesheet.
- Match the existing indentation (4 spaces).

## Steps

1. Open `resources/css/app.css`.
2. Locate the second `@font-face { ... }` block (the `inter-latin-ext-var.woff2` one). Its closing `}` is around line 32.
3. Insert **immediately after** that closing `}` and **before** the `@tailwind base;` directive, a blank line, then the block from **Target** above verbatim.
4. Save the file. Do not modify anything else.

## Boundaries

- Do NOT touch any `.vue` file in this plan. Replacement of existing hand-typed values happens in plans 003 and 006.
- Do NOT edit the existing color `:root` block. Add a second `:root` block instead — CSS merges them, and keeping them separated makes the motion tokens easy to find.
- Do NOT add new dependencies.
- If the file no longer starts with the two `@font-face` blocks (drift since commit `4d69efc`), STOP and report.

## Verification

- **Mechanical:**
  - Run `npm run build`. Expected: exits 0 with no warnings mentioning `app.css`.
  - `grep -c "^\s*--ease-out:" resources/css/app.css` → returns `1`.
  - `grep -c "^\s*--dur-fast:" resources/css/app.css` → returns `1`.
- **Feel check:** none. This plan does not change any observable behavior — it only adds tokens.
- **Done when:** build succeeds, both grep checks return 1, and no `.vue` file has been modified.
