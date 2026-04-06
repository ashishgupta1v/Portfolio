# Personal Portfolio — Ashish Gupta

> **A cinematic, scroll-driven developer portfolio** built with Laravel 13, Vue 3, Inertia.js, Three.js, and GSAP — deployed serverlessly on Vercel.

[![Live Demo](https://img.shields.io/badge/Live-Portfolio-5eead4?style=for-the-badge&logo=vercel)](https://your-portfolio-url.vercel.app)
[![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel)](https://laravel.com)
[![Vue](https://img.shields.io/badge/Vue-3-42b883?style=for-the-badge&logo=vue.js)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

---

## Table of Contents

- [Overview](#overview)
- [Live Features](#live-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Problem-Solving Approach](#problem-solving-approach)
- [Key Technical Decisions](#key-technical-decisions)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

---

## Overview

This portfolio is not a simple static site — it is a **full-stack, server-rendered SPA** that demonstrates the same engineering standards I apply on production systems. Every visual effect, animation, and interaction is a deliberate showcase of a specific technical capability.

The site features a **cinematic scroll-driven hero** with frame-by-frame image sequences rendered on a Canvas element, physics-based interactive tech-stack bubbles, scroll-triggered GSAP animations, and a DDD-structured Laravel backend serving all data through a single Inertia page-share.

---

## Live Features

| Section | Technique |
|---|---|
| **Hero (ScrollySequence)** | 90-frame WebP sequence rendered via Canvas API with scroll-driven playback, zoom curves, and fade statements |
| **Tech Stack Bubbles** | Particle physics engine: mouse-driven repulsion, collision detection, center-gravity, RAF animation loop |
| **What I Do** | Expandable capability cards with GSAP ScrollTrigger entrance animations and SVG dashed-border hover effects |
| **Timeline** | Career history with scroll-triggered stagger reveals |
| **Works** | Project showcase with hover states |
| **Contact** | Social links pulled dynamically from backend |
| **Custom Cursor** | Global cursor composable tracking mouse position with smooth lag effect |

---

## Tech Stack

### Backend
| Technology | Version | Role |
|---|---|---|
| **PHP** | 8.3+ | Runtime |
| **Laravel** | 13 | Framework — routing, DI, data serving |
| **Inertia.js (server)** | 2.0 | SPA bridge — shares typed data to Vue without an API |
| **Laravel Sanctum** | 4.0 | Auth scaffolding (extendable) |
| **Ziggy** | 2.0 | Named route helpers in TypeScript |

### Frontend
| Technology | Version | Role |
|---|---|---|
| **Vue 3** | 3.4+ | Reactive UI with Composition API + `<script setup>` |
| **TypeScript** | 5.6 | Strict typing across all Vue components |
| **Inertia.js (client)** | 2.0 | Seamless page transitions without a REST API |
| **GSAP** | 3.14 | Scroll-triggered animations, entrance effects |
| **Three.js** | 0.183 | 3D rendering capability (character scene composable) |
| **Tailwind CSS** | 3→4 | Utility-first styling base |
| **Lucide Vue Next** | 1.0 | Consistent icon system |
| **VueUse** | 14 | Composable utilities (`useMediaQuery`, etc.) |

### Build & Tooling
| Technology | Role |
|---|---|
| **Vite 8** | HMR dev server, production bundler |
| **vue-tsc** | TypeScript type checking for `.vue` files |
| **Sharp** | Server-side WebP compression for image sequences |
| **FFmpeg / FFprobe** | Frame extraction pipeline for scroll sequences |

### Infrastructure
| Technology | Role |
|---|---|
| **Vercel** | Serverless PHP runtime + static asset CDN |
| **vercel-php** | PHP 8.3 serverless adapter |
| **SQLite** | Zero-config local database |

---

## Project Architecture

### 1. Full-Stack Pattern: Laravel + Inertia.js (Not a REST API)

The most important architectural choice is using **Inertia.js** as the glue between Laravel and Vue. There is no separate REST API. When a user visits the portfolio URL:

```
Browser Request
      │
      ▼
Vercel Edge (api/index.php)
      │
      ▼
Laravel Router (routes/web.php)
      │
      ▼
PortfolioController
      │   Reads data via Application Service
      ▼
Inertia::render('Portfolio/Index', $pageProps)
      │   Serializes typed PHP DTOs → JSON
      ▼
Vue 3 SPA hydrates with full typed props
(no additional network roundtrips)
```

**Why this matters:** The entire page — profile, experiences, projects, tech skills, social links, education — arrives in a single HTML response as a JSON blob. Vue hydrates it instantly. No loading spinners, no API calls, no flash of empty content.

### 2. Domain-Driven Design (DDD) Backend Structure

The Laravel backend follows a strict **layered architecture** to keep business logic isolated from infrastructure:

```
app/
├── Domain/
│   └── Portfolio/
│       ├── Entities/          # Core business objects (Profile, Project, Experience…)
│       ├── ValueObjects/      # Immutable primitives (Url, DateRange…)
│       ├── Enums/             # Domain enumerations
│       └── Repositories/     # Interfaces — the domain defines the contract
│
├── Application/               # Use cases / Application Services
│   └── Portfolio/             # Orchestrates domain objects
│
├── Infrastructure/            # Concrete implementations of repository interfaces
│   └── Portfolio/             # SQLite/Eloquent adapters, file-system readers
│
└── Http/
    ├── Controllers/           # Thin: delegate to Application Services, return Inertia responses
    ├── Requests/              # Form request validation
    └── Middleware/            # Cross-cutting concerns
```

This structure means the domain layer has **zero knowledge of Laravel, Eloquent, or HTTP** — it is pure PHP. Infrastructure details (database, files) are injected at runtime via Laravel's service container.

### 3. Frontend Component Architecture

The frontend is organized into two generations of components:

```
resources/js/
├── Components/
│   ├── Portfolio/         # V1 components (retained for reference)
│   └── PortfolioV2/       # Current production components
│       ├── ScrollySequence.vue   # Cinematic hero (Canvas + frame sequence)
│       ├── TechStackSection.vue  # Physics bubble engine
│       ├── WhatIDoSection.vue    # GSAP ScrollTrigger cards
│       ├── TimelineSection.vue   # Career timeline
│       ├── WorksSection.vue      # Project grid
│       ├── ContactSection.vue    # Contact + social
│       └── NavBar.vue            # Sticky transparent nav
│
├── Composables/
│   ├── useCharacterScene.ts  # Three.js 3D scene setup
│   ├── useCursor.ts          # Custom magnetic cursor
│   ├── useGsap.ts            # GSAP animation helpers
│   ├── useMediaQuery.ts      # Responsive breakpoint detection
│   └── useMousePosition.ts   # Reactive mouse coordinates
│
├── Pages/
│   └── Portfolio/Index.vue   # Single Inertia page — assembles all sections
│
├── Data/                     # Static typed data constants
├── Utils/                    # Pure utility functions
└── types/                    # TypeScript type definitions (portfolio.d.ts)
```

---

## Problem-Solving Approach

### Problem 1: Cinematic Hero with 90-Frame Image Sequence

**Challenge:** Display a smooth, high-quality scroll-driven image sequence (like Apple's iPhone product pages) without destroying page performance or causing layout shift.

**Naive approach:** Stack 90 `<img>` tags and toggle `display:none`. This loads all images simultaneously, causes massive memory usage, and creates visible frame-skip.

**Solution — Progressive batched loading on a Canvas element:**

```typescript
// Priority 1: frames 0-2 (first 3 for immediate scroll feedback)
// Priority 2: every 4th frame (rapid skeleton animation)
// Priority 3: remaining frames (smooth interpolation fill-in)
async function loadSequence() {
    const priority1 = [0, 1, 2]
    const priority2 = [] // every 4th frame
    const priority3 = [] // the rest

    await loadBatch(priority1, 3)   // fast start
    await loadBatch(priority2, 8)   // rough animation
    await loadBatch(priority3, 8)   // smooth fill
}
```

The render loop uses `requestAnimationFrame` to draw only the frame corresponding to the current scroll progress. If a frame hasn't loaded yet, it finds the nearest available neighbor — eliminating flicker:

```typescript
// Nearest-frame fallback prevents blank canvas during loading
let frame = loadedFrames.value[idx]
if (!frame) {
    for (let offset = 1; offset < total; offset++) {
        if (loadedFrames.value[idx - offset]) { frame = ...; break }
        if (loadedFrames.value[idx + offset]) { frame = ...; break }
    }
}
```

Zoom is driven by a custom `easeInOutCubic` curve so the face stays centered as the camera "pulls back."

---

### Problem 2: Interactive Physics Bubbles Without a Library

**Challenge:** Display the tech stack as floating, collision-aware bubbles that cluster together until the user hovers — then explode outward — without importing a heavy physics library (Matter.js adds ~200kb).

**Solution — Custom particle simulation with two-pass physics:**

```
Frame N:
  Pass 1: Per-bubble forces
    - Soft gravity pull toward center (homeX, homeY)
    - Mouse repulsion (quadratic falloff, range: 260px)
    - Velocity damped by 0.94 each tick (natural decay)
    - Wall collisions with energy loss (0.3x rebound)

  Pass 2: O(n²) positional separation
    - For every pair (i, j): push apart if overlap < minDist
    - Positional correction only — no velocity transfer
      (prevents cascade jitter that ruins tight clusters)

  Apply: translate3d() via direct DOM style mutations
  (no Vue reactivity overhead in the hot render path)
```

The key insight is **separating positional correction from velocity transfer**. Naive implementations transfer velocity when bubbles collide, causing cascading shockwaves that make tight clusters impossible. Positional-only separation keeps the cluster calm while still preventing overlap.

---

### Problem 3: Deploying a Stateful Laravel App Serverlessly on Vercel

**Challenge:** Vercel's serverless runtime has a **read-only filesystem** (`/var/task`). Laravel writes compiled views, session files, caches, and logs to `storage/` and `bootstrap/cache/` — which fail silently on first boot.

**Solution — Runtime path remapping to `/tmp/`:**

```php
// api/index.php — runs on every cold start
$tmpDirs = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/logs',
    '/tmp/bootstrap/cache'
];

// Ensure directories exist regardless of cold-start order
foreach ($tmpDirs as $dir) {
    if (!is_dir($dir)) mkdir($dir, 0777, true);
}

// Override Laravel's internal path resolution BEFORE boot
$app->useStoragePath('/tmp/storage');
$app->useBootstrapPath('/tmp/bootstrap');
putenv('VIEW_COMPILED_PATH=/tmp/storage/framework/views');

$app->handleRequest(Request::capture());
```

Static assets (WebP sequence, images, 3D models, Draco decoders) are served via Vercel's CDN — completely bypassing the PHP runtime. The `vercel.json` routing table maps asset paths directly to static files, routing everything else to the PHP function.

---

### Problem 4: Frame Sequence Asset Optimization

**Challenge:** 90 uncompressed PNG frames from a professional photo shoot = ~300MB. Bundling the raw frames is not viable.

**Solution — Two-step pipeline:**

1. **FFmpeg frame extraction** (`compress_seq.cjs`) pulls frames from a source video at the target resolution.
2. **Sharp re-encoding** compresses each frame to WebP at quality 65 — achieving ~4-7x size reduction with imperceptible quality loss at motion speed.

```javascript
// compress_seq.cjs
await sharp(file)
    .webp({ quality: 65 })
    .toFile(temp)
// Result: 300MB PNG → ~18MB WebP (stored in /public/sequence/)
```

Vercel serves these from its edge CDN with automatic `Cache-Control` headers, so repeat visitors load everything from memory.

---

## Key Technical Decisions

| Decision | Rationale |
|---|---|
| **Inertia.js over REST API** | Eliminates the client-side data-fetching layer entirely. The page loads with all data pre-hydrated — no loading states, no race conditions. |
| **DDD backend structure** | The portfolio data model (projects, experiences, skills) has real domain rules. DDD makes that logic portable, testable in isolation, and not tied to Eloquent. |
| **Canvas over `<img>` for frame sequences** | Single DOM element, zero layout thrash, full control over zoom/pan/blend compositing. The grain overlay and opacity curves are impossible with plain `<img>` tags. |
| **RAF loop with direct DOM mutations for bubbles** | Vue's reactive system adds overhead on every tick. Physics loops need 60fps — direct `el.style.transform` mutations bypass the virtual DOM. |
| **WebP over PNG/JPEG for sequences** | 65% smaller filesize, hardware-decoded in all modern browsers, supports transparency without GIF artifacts. |
| **TypeScript strict mode throughout** | All Inertia page props are typed end-to-end via `PortfolioPageProps`. Component props, composable return types, and domain entity shapes are all enforced at compile time. |
| **GSAP ScrollTrigger for entrance animations** | GSAP's ScrollTrigger is battle-tested at 60fps, handles `requestAnimationFrame` scheduling internally, and cleanly integrates with Vue's `onMounted`/`onUnmounted` lifecycle. |

---

## Local Development

### Prerequisites

- PHP 8.3+
- Composer
- Node.js 20+
- npm

### One-command setup

```bash
composer setup
```

This runs: `composer install` → `.env` copy → `key:generate` → `migrate` → `npm install` → `npm run build`.

### Development server (all services concurrent)

```bash
composer dev
```

This starts four concurrent processes:
- `php artisan serve` — Laravel HTTP server
- `php artisan queue:listen` — background job processing
- `php artisan pail` — real-time log tailing
- `npm run dev` — Vite HMR

Visit `http://localhost:8000`.

### Running tests

```bash
composer test
```

---

## Deployment

The project deploys automatically to Vercel via `vercel.json`.

**Build configuration:**
- `api/index.php` → `vercel-php@0.6.2` (PHP 8.3 serverless function)
- `public/**` → `@vercel/static` (CDN-served assets)

**Routing strategy:**
```json
/build/*   → CDN (Vite build output)
/sequence/* → CDN (WebP frame sequence)
/images/*   → CDN (static images)
/models/*   → CDN (Three.js GLTF models)
/draco/*    → CDN (Draco decoder WASM)
/*          → PHP serverless function
```

**Environment variables required on Vercel:**
```
APP_KEY=base64:...
APP_ENV=production
APP_DEBUG=false
```

---

## Project Structure

```
portfolio/
├── api/
│   └── index.php              # Vercel serverless PHP entry point
├── app/
│   ├── Domain/Portfolio/      # Entities, ValueObjects, Enums, Repository interfaces
│   ├── Application/Portfolio/ # Use cases / Application Services
│   ├── Infrastructure/        # Eloquent/file repository implementations
│   └── Http/                  # Controllers, Middleware, Requests
├── resources/js/
│   ├── Components/
│   │   ├── Portfolio/         # V1 components
│   │   └── PortfolioV2/       # Production components (current)
│   ├── Composables/           # Reusable Vue composition functions
│   ├── Pages/Portfolio/       # Inertia page (single entry point)
│   ├── Data/                  # Static typed constants
│   ├── Utils/                 # Pure utility functions
│   └── types/                 # TypeScript declarations
├── public/
│   ├── sequence/              # 90× WebP animation frames (0000-0089.webp)
│   ├── images/                # Static images
│   ├── models/                # Three.js GLTF 3D models
│   └── draco/                 # Draco geometry decoder WASM
├── routes/
│   └── web.php                # Single portfolio route
├── compress_seq.cjs           # Frame compression pipeline (Sharp + FFmpeg)
├── vercel.json                # Vercel deployment configuration
├── vite.config.js             # Vite + Laravel plugin
├── tailwind.config.js         # Tailwind configuration
└── tsconfig.json              # TypeScript compiler options
```

---

## Author

**Ashish Gupta** · Staff Software Architect · 8+ Years Building Scalable Systems

Specializing in Vue 3, Laravel, Domain-Driven Design, and AI-Native product development.
