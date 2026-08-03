# Animation audit — ashishgupta.dev

**Audit commit:** `4d69efc`
**Skill:** `improve-animations` (Emil Kowalski bar, from [emilkowalski/skill](https://github.com/emilkowalski/skill))

## Recon

- **Stack:** Vue 3 + Inertia + Tailwind; GSAP + ScrollTrigger only (no Framer/Motion/Spring).
- **Where motion lives:** hand-typed `transition` per component, `@keyframes` in `InitialLoader.vue` + `ScrollySequence.vue`, `gsap.from()/fromTo()` in section components, one rAF physics loop in `TechStackSection.vue`, and a scroll-driven seek in `ScrollySequence.vue`.
- **Existing conventions:** none. Zero shared easing/duration tokens. Every GSAP call uses `power3.out` (good — matches the AUDIT default). Two hand-typed cubic-beziers that differ by 0.02.
- **Personality:** cinematic hero, architectural body copy. Not playful — bounce should stay off the shelf.
- **Frequency map:**
  - **Every mousemove:** `useMouseDepth` writes 6 CSS custom properties to `.v2-page` (root), read by every hovered `article`, `.capability-card`, `.work-row`.
  - **Dozens of times per visit:** card/row hovers, chat toggle, nav open.
  - **Rare:** initial loader, contact submit, scroll-through hero.

## Findings

Ordered by leverage (impact ÷ effort). Verified at file:line before listing.

| # | Severity | Category | Location | Finding | Fix summary |
| --- | --- | --- | --- | --- | --- |
| 001 | **HIGH** | Performance | `useMouseDepth.ts:27-34` + `Index.vue:180-207` | Root sets `--mx --my --depth-*` on every mousemove; hover styles on children read the vars in `transform`. AUDIT §5's exact anti-pattern: recalcs style on every descendant, every mousemove. | Track mouse in JS, set `transform` directly on the hovered card only. Drop the root-level CSS vars entirely. |
| 002 | **HIGH** | Performance | `WorksSection.vue:145-162` | `.work-row` uses `transition: all 0.35s ease` and animates `padding-left/right` on hover — layout properties, reflow every hover. | Transition `transform` + `background` only; use a `translateX` inset instead of padding. |
| 003 | **MEDIUM** | Performance | 10 sites across 5 files | `transition: all` — always a finding per AUDIT §5. Animates unintended properties off-GPU, and the currently-intended property is layout in some cases. | List the properties explicitly: `transform`, `opacity`, `background-color`, `border-color`. |
| 004 | **MEDIUM** | Accessibility | `AboutSection.vue:211-215`, `ChatWidget.vue:159-163`, `WorksSection.vue:157-162` etc. | Bare `:hover` motion. Touch fires a false hover on tap that stays sticky until the user taps elsewhere. AUDIT §6. | Wrap hover motion in `@media (hover: hover) and (pointer: fine)`. |
| 005 | **MEDIUM** | Cohesion / tokens | Repo-wide | No motion tokens. Ten transitions using `0.3s ease`, two near-identical custom beziers (`0.16,1,0.3,1` and `0.22,1,0.36,1`), zero shared curves. AUDIT §7. | Introduce `--ease-out`, `--ease-in-out`, `--dur-fast/med/slow` in `resources/css/app.css`, replace ad-hoc values. |
| 006 | **LOW** | Physicality | `WorksSection.vue:145-162`, `AboutSection.vue:203-215` | Pressable rows/cards have no `:active` press feedback. AUDIT §3. | `transform: scale(0.98)` on `:active`, `transition: transform 160ms var(--ease-out)`. |

### Missed opportunities

- **Inertia page transitions.** Navigating between `/`, `/case-studies`, `/engagements` is a hard cut. A short crossfade (150–200ms) on `<Inertia progress>` would smooth the seam without adding a delay budget. Already tracked in the missing-features list — cross-referenced there.
- **Depth-section reveal snap.** `Pages/Portfolio/Index.vue` scrubs `z: -80 → 0, opacity: 0.3 → 1, rotateX: 2 → 0` on each section. This is fine, but doubles up with `useMouseDepth`'s parent transform and the per-element hover tilt. Reveals settle cleanly, but the section boundary at 90% of viewport can feel abrupt when the section is tall — consider `end: 'top 60%'` for a longer scrub distance. LOW.

## Plans

Written for a fresh executor with zero context. Every value is inlined.

| Plan | Title | Severity | Status |
| --- | --- | --- | --- |
| [001](001-mouse-depth-direct-transform.md) | Set hover-tilt transform directly on the card, not via root CSS vars | HIGH | TODO |
| [002](002-work-row-drop-layout-hover.md) | Stop animating padding in `.work-row:hover` | HIGH | TODO |
| [003](003-transition-all-to-explicit.md) | Replace `transition: all` with explicit property lists | MEDIUM | TODO |
| [004](004-hover-media-query-gate.md) | Gate hover motion behind `@media (hover: hover) and (pointer: fine)` | MEDIUM | TODO |
| [005](005-motion-tokens.md) | Introduce shared easing/duration tokens in `app.css` | MEDIUM | TODO |
| [006](006-press-feedback.md) | Add `:active` press feedback to interactive rows and cards | LOW | TODO |

## Recommended execution order

1. **005 first.** Introduces the tokens the other plans reference. Done alone, no functional change.
2. **003** next — mechanical replacement of `transition: all`, uses the tokens from 005.
3. **004** — cheap, additive `@media` gate. Independent of 001.
4. **002** — small, self-contained, isolates the layout-property hover fix from 001.
5. **001** — largest change. Removes the CSS vars from `useMouseDepth` and rewires the hover tilt to per-element JS. Do this last so the other cleanups don't churn its diff.
6. **006** — polish. Do after everything else so `--ease-out` and `--dur-fast` exist.

Each plan is independent enough that a fresh subagent can execute one without reading the others.
