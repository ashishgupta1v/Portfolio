# 3D Portfolio — "Ashish's Digital Workshop" Design Spec

**Date:** 2026-07-27
**Branch:** `feature/3D-portfolio`
**Author:** Ashish Gupta + Claude

## Overview

Transform ashishgupta.dev from a 2D scroll-driven portfolio into a full immersive 3D experience. A single persistent Three.js canvas renders a scroll-driven camera journey through five zones: a workspace where Ashish codes at his desk, a dive into the digital world showing tech stack, a constellation of floating project cards, capability/career showcases, and a return to the workspace with contact CTA.

## Decision Record

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Keep Vue 3 + Three.js (raw) | Existing VILT stack; no rewrite to React Three Fiber |
| Approach | Full 5-zone scroll journey (Approach B) | Maximum immersive impact; single continuous canvas |
| Animation strategy | Programmatic (code-driven) | Avatar has 24 bones, no fingers; saves ~2-3 MB; interactive |
| Avatar source | User-generated GLB (Avaturn) | Realistic likeness from selfie |
| Workspace source | Sketchfab CC-BY-4.0 | "Modern Desk Setup – Game Ready" by mandeeprao10576 |
| Environment lighting | Poly Haven `studio_small_09` 1K HDR | Clean studio light, CC0 license |
| Mobile strategy | 2D fallback with current PortfolioV2 components | WebGL kills low-end phones |

## Assets (Ready)

| File | Size | Contents |
|---|---|---|
| `public/models/ashish-avatar.glb` | 580 KB | 30K faces, 24-bone skeleton, 1024x1024 JPEG texture, Draco compressed |
| `public/models/workspace-scene.glb` | 1.7 MB | 51K faces, desk+monitor+laptop+keyboard+plant+mug, Draco compressed |
| `public/models/environment.hdr` | 1.6 MB | Poly Haven studio_small_09, 1K resolution |
| `public/draco/*` | existing | Draco WASM decoder (already in repo) |
| **Total** | **3.8 MB** | vs ~15 MB for current 180-frame image sequence |

## Architecture

### Single-Canvas Model

One fullscreen Three.js canvas at `position: fixed; inset: 0; z-index: 0`. An HTML overlay layer at `z-index: 1` holds all text, forms, and interactive UI. A scroll spacer `div` (~600vh) drives GSAP ScrollTrigger progress from 0 to 1.

```
┌───────────────────────────────────────────┐
│  Three.js Canvas (fixed, z-0)             │
│  └── Scene Graph                          │
│      ├── WorkspaceGroup                   │
│      ├── AvatarGroup                      │
│      ├── DigitalWorldGroup                │
│      ├── ProjectCardsGroup                │
│      ├── OfferingGroup                    │
│      ├── AmbientParticles                 │
│      └── Lights + Environment             │
│                                           │
│  HTML Overlay (fixed, z-1)                │
│  └── NavBar, Zone text, Forms, ChatWidget │
│                                           │
│  Scroll Spacer (relative, ~600vh)         │
└───────────────────────────────────────────┘
```

### Master Scroll → Scene State

A single GSAP ScrollTrigger timeline maps normalized scroll progress (0–1) to:
- Camera position + rotation (Vector3/Quaternion keyframes)
- Object group visibility and transforms
- Light intensity/color transitions
- HTML overlay opacity/transform per zone

### Render Pipeline

- `WebGLRenderer` with `ACESFilmicToneMapping`, `SRGBColorSpace`
- `PCFSoftShadowMap` for shadow quality
- Pixel ratio capped at `Math.min(2, devicePixelRatio)`
- Single `setAnimationLoop` render loop
- `PMREMGenerator` for HDR environment processing

## Five Scroll Zones

### Zone 1: "The Workshop" (0–20% scroll)

**Camera:** Starts wide, showing the full workspace. Slowly dollies forward toward the desk.

**3D Content:**
- Workspace GLB (desk, monitor, laptop, keyboard, plant, coffee mug)
- Avatar GLB seated at desk
- Programmatic animations: typing (arm/hand bobbing), idle breathing (spine oscillation), head tracking (mouse → neck/Head bones)
- Desk lamp warm glow + monitor screen emission
- Faint floating dust particle system

**HTML Overlay:**
- "Hello, I'm **Ashish Gupta**" — large cinematic text, fade in
- "Senior Full-Stack Architect" — subtitle
- "Builder. Architect. Father." — second phase text
- Scroll hint indicator at bottom

**Transition:** Camera accelerates toward laptop screen. Screen brightens.

### Zone 2: "Into the Screen" (20–40% scroll)

**Camera:** Zooms INTO the laptop screen. Screen fills viewport.

**3D Content:**
- Workspace fades out (opacity → 0)
- Code matrix / digital particle effect takes over
- Tech stack icons materialize as textured planes orbiting in helix/constellation
- Icons: Vue, Laravel, TypeScript, PostgreSQL, Docker, etc. (from Iconify or pre-rendered textures)

**HTML Overlay:**
- "9+ Years Engineering" heading
- "Vue · Laravel · TypeScript · PostgreSQL" as icons settle
- Capability bullets from current AboutSection data

### Zone 3: "The Constellation" (40–60% scroll)

**Camera:** Pulls back revealing galaxy-like arrangement.

**3D Content:**
- 5 project cards as 3D planes at different Z-depths
- Each card: project screenshot texture + title (Troika SDF text)
- Cards billboard toward camera, subtle float animation
- Connecting particle lines between related projects
- Deep space gradient background

**HTML Overlay:**
- "My Work" section title
- Detail panels slide in per project as scroll progresses: title, description, tools, live link
- Same data as current WorksSection

**Projects:** ZoetiCoach AI, Krishan Balram Gaushala, Habuilt Tracker, Digital Builders, Shaiyra

### Zone 4: "The Offering" (60–80% scroll)

**Camera:** Moves to clean abstract space.

**3D Content:**
- 4 frosted glass panels materialize one by one
- `MeshPhysicalMaterial` with `transmission`, `roughness`, `ior` for glass effect
- Animated gradient / particle field behind panels
- Career timeline as a 3D glowing path with position labels

**HTML Overlay:**
- Capability cards (Modular Monoliths, Semantic Intelligence, High-Perf Infra, Gamification)
- Career timeline (Infosys, Capital Numbers, Logiware, TCS)
- Case study CTA

### Zone 5: "The Return" (80–100% scroll)

**Camera:** Pulls back out, returning to workspace from different angle — frontal, inviting.

**3D Content:**
- Workspace re-appears
- Avatar switches to idle pose, looking toward camera
- Warm lighting intensifies
- Monitor screens show subtle "Let's build together" glow

**HTML Overlay:**
- "Get In Touch" heading
- Contact form (Inertia.js form, existing ContactSection)
- Social links, WhatsApp CTA, Resume download
- Footer credits (including Sketchfab CC-BY-4.0 attribution)

## Programmatic Animation System

All avatar animations are code-driven (no baked animation data):

| Animation | Bones | Technique |
|---|---|---|
| Idle breathing | Spine, Spine01, Spine02 | `sin(time * 1.5) * 0.015` rotation on X |
| Typing motion | LeftArm, LeftForeArm, LeftHand, Right* | Rhythmic Y translation with random offset per hand |
| Head tracking | neck, Head | Lerp toward mouse position (existing in `useCharacterScene.ts`) |
| Greeting wave | RightShoulder → RightHand chain | GSAP tween on Zone 5 entry |
| Body sway | Hips | Very slow `sin(time * 0.3) * 0.008` rotation on Z |

## Mobile Fallback

**Detection:** `useMediaQuery('(max-width: 768px)')` + WebGL2 capability check at mount.

**Desktop (>1024px + WebGL2):** Full 3D experience.
**Tablet (768–1024px):** Simplified 3D — reduced particles, lower-res textures, LOD.
**Mobile (<768px):** Current PortfolioV2 2D components with enhanced GSAP animations. A single rendered still from the 3D scene replaces the image sequence hero.

## File Structure

```
resources/js/
├── Composables/
│   ├── useSceneOrchestrator.ts    # Master scene + camera + scroll management
│   ├── useAssetLoader.ts          # Progressive GLB/HDR/texture loading
│   ├── useScrollZones.ts          # Zone definitions + GSAP timelines
│   ├── useProceduralAnimation.ts  # Bone-driven code animations
│   ├── useDeviceCapability.ts     # WebGL/mobile detection + fallback routing
│   ├── useGsap.ts                 # Existing, enhanced
│   └── useCursor.ts               # Existing
├── Components/
│   ├── Scene3D/
│   │   ├── SceneCanvas.vue        # Fullscreen Three.js canvas + overlay wrapper
│   │   ├── SceneOverlay.vue       # HTML overlay layer with zone text content
│   │   ├── zones/
│   │   │   ├── WorkshopZone.ts    # Zone 1 setup: workspace + avatar + particles
│   │   │   ├── ScreenZone.ts      # Zone 2 setup: digital world + tech icons
│   │   │   ├── ConstellationZone.ts # Zone 3 setup: project cards in space
│   │   │   ├── OfferingZone.ts    # Zone 4 setup: glass panels + timeline
│   │   │   └── ReturnZone.ts      # Zone 5 setup: return workspace + CTA
│   │   └── objects/
│   │       ├── Avatar.ts          # Character load, bone refs, animation hooks
│   │       ├── Workspace.ts       # Desk scene load, screen material refs
│   │       ├── ProjectCard.ts     # 3D project card (texture + text)
│   │       ├── TechIcon.ts        # Tech stack icon (textured plane)
│   │       ├── GlassPanel.ts      # Frosted glass capability card
│   │       └── Particles.ts       # Ambient dust / digital particles
│   └── PortfolioV2/               # Existing — used as mobile fallback
├── Pages/
│   └── Portfolio/
│       └── Index.vue              # Routes to SceneCanvas or PortfolioV2 based on capability
└── Utils/
    └── threeDispose.ts            # Existing disposal utility
public/
├── models/
│   ├── ashish-avatar.glb          # 580 KB — avatar with skeleton
│   ├── workspace-scene.glb        # 1.7 MB — desk setup
│   └── environment.hdr            # 1.6 MB — studio lighting
├── draco/                         # Existing Draco decoder
└── textures/                      # Project screenshots + tech icon textures
    └── projects/
```

## Dependencies

### Already Installed (no changes)
- `three` ^0.183.2
- `@types/three` ^0.183.1
- `three-stdlib` ^2.36.1 (GLTFLoader, DRACOLoader, RGBELoader)
- `gsap` ^3.14.2 (ScrollTrigger)
- `@vueuse/core` ^14.2.1

### New (2 packages)
- `troika-three-text` — SDF 3D text for project titles/labels (~45KB gzipped)
- `postprocessing` — Bloom/vignette/glow effects (~30KB gzipped)

### No longer needed after migration
- `public/sequence/` — 180 image files (90 frames × 2 formats) — removed after 3D replaces hero
- `@ffmpeg-installer/ffmpeg`, `@ffprobe-installer/ffprobe`, `fluent-ffmpeg`, `sharp` — were for frame generation

## Performance Budget

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 85 |
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Total 3D asset payload | < 4 MB |
| Initial JS bundle (gzipped) | < 200 KB |
| 60fps on mid-range laptop | Yes |
| Mobile fallback threshold | < 768px or no WebGL2 |

### Optimization Strategies
- Progressive loading with `LoadingManager` callbacks → existing `InitialLoader.vue`
- Draco compression on all GLBs (already applied)
- Object culling: hide groups not in current scroll zone
- `renderer.setPixelRatio(Math.min(2, devicePixelRatio))`
- Texture atlasing for tech icons
- LOD for workspace objects based on camera distance

## SEO Preservation

All text content lives in the HTML overlay layer with proper semantic HTML:
- `<h1>` for name, `<h2>` for section titles
- Existing structured data (Person schema, WebSite schema) preserved
- `<Head>` meta tags, OG images, canonical URL unchanged
- Contact form remains an Inertia.js form with server-side validation

## Credits & Licenses

- Workspace 3D model: "Modern Desk Setup – Game Ready" by mandeeprao10576 — CC-BY-4.0
- HDR environment: "studio_small_09" from Poly Haven — CC0
- Avatar: User-generated via Avaturn

Attribution in footer: "3D desk model by mandeeprao10576 (CC-BY-4.0)"

## User Dependencies

| Item | Status | Notes |
|---|---|---|
| Avatar GLB | DONE | `public/models/ashish-avatar.glb` — 580 KB, 30K faces, 24 bones |
| Workspace GLB | DONE | `public/models/workspace-scene.glb` — 1.7 MB, Sketchfab |
| Environment HDR | DONE | `public/models/environment.hdr` — 1.6 MB, Poly Haven |
| Draco decoder | DONE | Already in `public/draco/` |
| Project screenshots | NEEDED | 5 screenshots (one per project) for Zone 3 card textures. ~200KB each as WebP. Can be captured from live project URLs. |
| npm install | PENDING | `troika-three-text` + `postprocessing` |

## What's NOT Changing

- Laravel 13 backend, routes, controllers, middleware
- Inertia.js page rendering and data flow
- Contact form submission + lead management
- ChatWidget (OpenAI integration)
- Case Studies pages (`/case-studies`, `/case-studies/{slug}`)
- Engagements page (`/engagements`)
- Admin panel (`/admin/leads`, `/admin/telemetry`)
- Docker deployment setup
- SEO: structured data, meta tags, sitemap
