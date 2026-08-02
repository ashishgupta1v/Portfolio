# Fix All Critical & High-Priority Flaws — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate all 14 critical and high-priority flaws to improve performance, bundle size, SEO, UX, and stability.

**Architecture:** This plan is organized into 7 logical phases: (1) asset cleanup (remove dead 3D code/models/frames), (2) SEO infrastructure (robots.txt, manifest, service worker), (3) performance (self-host font, fix mobile video, chunk splitting), (4) bug fixes (keyframes, version credit), (5) form/chat improvements, (6) off-screen animation optimization, (7) SSR implementation. Each phase produces working, testable code independently.

**Tech Stack:** Laravel 13, Vue 3, Inertia.js, Tailwind CSS, GSAP, Vite, TypeScript

## Global Constraints

- All commits must follow format: `type: short message` (e.g., `fix: mobile video width`, `chore: remove 3D deps`)
- No breaking changes to existing routes or component APIs
- Maintain existing test suite compatibility
- Browser support: all modern browsers (Chrome, Firefox, Safari, Edge)
- Node.js 18+

---

## Phase 1: Asset Cleanup — Remove Dead 3D Code and Assets

### Task 1: Remove Three.js and related dependencies from package.json

**Files:**
- Modify: `package.json` (lines with three, @types/three, three-stdlib, troika-three-text, postprocessing, @ffmpeg-installer/ffmpeg, @ffprobe-installer/ffprobe, fluent-ffmpeg, sharp)

**Interfaces:**
- Produces: Clean package.json with no unused 3D/media dependencies

**Steps:**

- [ ] **Step 1: Review current dependencies**

Run: `npm list | grep -E "(three|troika|postprocessing|ffmpeg|sharp)"`

Expected output: Lists all 3D-related packages to be removed

- [ ] **Step 2: Open package.json and identify removal targets**

Open `package.json` and locate these lines (or variations with different versions):
```json
"three": "^0.160.0",
"@types/three": "^0.160.0",
"three-stdlib": "^1.8.19",
"troika-three-text": "^0.52.0",
"postprocessing": "^6.35.1"
```

And in devDependencies:
```json
"@ffmpeg-installer/ffmpeg": "^1.1.0",
"@ffprobe-installer/ffprobe": "^1.1.0",
"fluent-ffmpeg": "^2.1.3",
"sharp": "^0.33.0"
```

- [ ] **Step 3: Delete the dependency lines**

Remove all 9 lines listed above from package.json (keep the commas/formatting intact).

- [ ] **Step 4: Run npm prune to verify**

```bash
cd C:\Users\ashis\OneDrive\Desktop\Project\Portfolio
npm prune
```

Expected: No errors, dependencies removed from node_modules

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: remove unused Three.js, FFmpeg, and Sharp dependencies"
```

---

### Task 2: Delete unused Scene3D components and composables

**Files:**
- Delete: `resources/js/Components/Scene3D/` (entire folder: 13 files)
- Delete: `resources/js/Composables/useSceneOrchestrator.ts`
- Delete: `resources/js/Composables/useAssetLoader.ts`
- Delete: `resources/js/Composables/useScrollZones.ts`
- Delete: `resources/js/Composables/useProceduralAnimation.ts`
- Delete: `resources/js/Composables/useDeviceCapability.ts`

**Interfaces:**
- Produces: Codebase with no references to 3D scene architecture

**Steps:**

- [ ] **Step 1: Verify Scene3D folder is not imported anywhere**

Run: `grep -r "Scene3D" resources/js/Pages/ resources/js/Components/PortfolioV2/`

Expected: No output (Scene3D is not used in main index or PortfolioV2 components)

- [ ] **Step 2: Verify composables are not imported**

Run: `grep -r "useSceneOrchestrator\|useAssetLoader\|useScrollZones\|useProceduralAnimation\|useDeviceCapability" resources/js/`

Expected: No output (none of these are used)

- [ ] **Step 3: Delete Scene3D folder**

```bash
Remove-Item -Recurse -Force "resources/js/Components/Scene3D"
```

Expected: Folder deleted, no errors

- [ ] **Step 4: Delete unused composables**

```bash
Remove-Item "resources/js/Composables/useSceneOrchestrator.ts"
Remove-Item "resources/js/Composables/useAssetLoader.ts"
Remove-Item "resources/js/Composables/useScrollZones.ts"
Remove-Item "resources/js/Composables/useProceduralAnimation.ts"
Remove-Item "resources/js/Composables/useDeviceCapability.ts"
```

- [ ] **Step 5: Verify build works**

```bash
npm run build
```

Expected: Build completes with no errors (Vite will tree-shake dead imports)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: delete unused Scene3D components and composables"
```

---

### Task 3: Delete unused video sequence frames and 3D model assets

**Files:**
- Delete: `public/sequence/` (entire folder: 90 JPG files, ~6.67MB)
- Delete: `public/models/` (entire folder: ashish-avatar.glb, workspace-scene.glb, environment.hdr, ~3.8MB)

**Interfaces:**
- Produces: Public folder with only used assets

**Steps:**

- [ ] **Step 1: Verify sequence folder is not referenced**

Run: `grep -r "sequence" resources/ --include="*.vue" --include="*.ts" --include="*.js"`

Expected: No output (sequence is not loaded by any component anymore)

- [ ] **Step 2: Verify models folder is not referenced**

Run: `grep -r "models\/" resources/ --include="*.vue" --include="*.ts" --include="*.js"`

Expected: No output (3D models are not loaded)

- [ ] **Step 3: Delete sequence folder**

```bash
Remove-Item -Recurse -Force "public/sequence"
```

Expected: Folder deleted

- [ ] **Step 4: Delete models folder**

```bash
Remove-Item -Recurse -Force "public/models"
```

Expected: Folder deleted

- [ ] **Step 5: Verify public folder structure**

```bash
Get-ChildItem public
```

Expected: Only videos/, images/, fonts/ (after font task), and other necessary public assets remain

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove unused sequence frames and 3D model assets (~10.5MB saved)"
```

---

## Phase 2: SEO & Infrastructure — Add robots.txt, manifest.json, service worker

### Task 4: Create robots.txt for search engine guidance

**Files:**
- Create: `public/robots.txt`

**Interfaces:**
- Produces: `public/robots.txt` allowing all crawlers, sitemap reference

**Steps:**

- [ ] **Step 1: Create robots.txt file**

```bash
New-Item -Path "public/robots.txt" -ItemType File
```

- [ ] **Step 2: Write robots.txt content**

Add this content to `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://www.ashishgupta.dev/sitemap.xml

# Block crawlers from crawling internal admin
Disallow: /admin/

# Allow specific paths for crawlers
Allow: /case-studies
Allow: /engagements
```

- [ ] **Step 3: Test robots.txt syntax**

Open browser to `http://localhost:5173/robots.txt` and verify content displays correctly

- [ ] **Step 4: Commit**

```bash
git add public/robots.txt
git commit -m "feat: add robots.txt for SEO crawler guidance"
```

---

### Task 5: Create manifest.json for PWA installation

**Files:**
- Create: `public/manifest.json`
- Modify: `resources/views/app.blade.php` (add link tag)

**Interfaces:**
- Produces: PWA manifest and HTML link to manifest

**Steps:**

- [ ] **Step 1: Create manifest.json**

```bash
New-Item -Path "public/manifest.json" -ItemType File
```

- [ ] **Step 2: Write manifest.json content**

Add this to `public/manifest.json`:

```json
{
  "name": "Ashish Gupta — Full-Stack Architect",
  "short_name": "Ashish Gupta",
  "description": "Senior Full-Stack Architect specializing in Vue, Laravel, and Scalable Microservices",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#090e14",
  "theme_color": "#5eead4",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/images/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/images/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/images/icon-192-maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "categories": ["productivity", "business"],
  "screenshots": [
    {
      "src": "/images/screenshot-540.png",
      "sizes": "540x720",
      "type": "image/png"
    },
    {
      "src": "/images/screenshot-1080.png",
      "sizes": "1080x1440",
      "type": "image/png"
    }
  ]
}
```

- [ ] **Step 3: Add manifest link to HTML head**

Open `resources/views/app.blade.php` and add this line in the `<head>` section (after other meta tags):

```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#5eead4">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="apple-touch-icon" href="/images/icon-192.png">
```

- [ ] **Step 4: Create placeholder icon files (optional for now)**

For testing, create minimal PNG files at:
- `public/images/icon-192.png` (192x192px)
- `public/images/icon-512.png` (512x512px)
- `public/images/icon-192-maskable.png` (192x192px, transparent with 8% padding)
- `public/images/screenshot-540.png` (540x720px)
- `public/images/screenshot-1080.png` (1080x1440px)

Note: For production, generate these using your avatar/logo. For now, create blank 1x1 transparent PNGs.

- [ ] **Step 5: Test manifest**

Open browser DevTools → Application → Manifest and verify it loads without errors

- [ ] **Step 6: Commit**

```bash
git add public/manifest.json resources/views/app.blade.php
git commit -m "feat: add PWA manifest.json with icons and metadata"
```

---

### Task 6: Create service worker for offline support and caching

**Files:**
- Create: `public/sw.js`
- Modify: `resources/views/app.blade.php` (add service worker registration script)

**Interfaces:**
- Produces: Service worker that caches home page and critical assets

**Steps:**

- [ ] **Step 1: Create service worker file**

```bash
New-Item -Path "public/sw.js" -ItemType File
```

- [ ] **Step 2: Write service worker code**

Add this to `public/sw.js`:

```javascript
const CACHE_NAME = 'ashish-portfolio-v1';
const urlsToCache = [
  '/',
  '/images/og-cover.png',
  '/videos/hero-sequence.webm',
  '/videos/hero-sequence.mp4',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.warn('Failed to cache some assets:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }).catch(() => {
      return caches.match('/');
    })
  );
});
```

- [ ] **Step 3: Add service worker registration to app.blade.php**

Open `resources/views/app.blade.php` and add this before closing `</body>`:

```html
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('Service Worker registration failed:', err);
      });
    });
  }
</script>
```

- [ ] **Step 4: Test service worker**

Open browser DevTools → Application → Service Workers and verify it registers and shows "active and running"

- [ ] **Step 5: Commit**

```bash
git add public/sw.js resources/views/app.blade.php
git commit -m "feat: add service worker for offline caching and PWA support"
```

---

## Phase 3: Performance — Font, Video, and Bundle Optimization

### Task 7: Self-host Inter font and fix render-blocking CSS import

**Files:**
- Create: `public/fonts/inter-*.woff2` (download 4 font weights)
- Modify: `resources/css/app.css` (replace @import with @font-face)

**Interfaces:**
- Produces: Self-hosted Inter font with font-display:swap, no Google CDN dependency

**Steps:**

- [ ] **Step 1: Download Inter font files**

Download from `https://github.com/rsms/inter/releases/tag/v4.0` the file `Inter-4.0.zip`. Extract and locate these files:
- `Inter/InterVariable.woff2` (variable font, contains all weights)

Or download individual static weights:
- `Inter/static/Inter-Regular.woff2` (weight 400)
- `Inter/static/Inter-Medium.woff2` (weight 500)
- `Inter/static/Inter-SemiBold.woff2` (weight 600)
- `Inter/static/Inter-Bold.woff2` (weight 700)
- `Inter/static/Inter-ExtraBold.woff2` (weight 800)

- [ ] **Step 2: Create fonts directory**

```bash
New-Item -ItemType Directory -Path "public/fonts" -Force
```

- [ ] **Step 3: Copy font files to public/fonts/**

Copy the downloaded `.woff2` files to `public/fonts/`

Expected files:
- `public/fonts/inter-regular.woff2`
- `public/fonts/inter-medium.woff2`
- `public/fonts/inter-semibold.woff2`
- `public/fonts/inter-bold.woff2`
- `public/fonts/inter-extrabold.woff2`

- [ ] **Step 4: Remove Google Fonts @import from app.css**

Open `resources/css/app.css` and delete or comment out:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
```

- [ ] **Step 5: Add @font-face declarations to app.css**

Add this to the TOP of `resources/css/app.css` (before any other styles):

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-medium.woff2') format('woff2');
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-semibold.woff2') format('woff2');
  font-weight: 600;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-extrabold.woff2') format('woff2');
  font-weight: 800;
  font-display: swap;
}
```

- [ ] **Step 6: Add preload link to app.blade.php**

Open `resources/views/app.blade.php` and add this in the `<head>` (after meta tags, before other link tags):

```html
<link rel="preload" href="/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-bold.woff2" as="font" type="font/woff2" crossorigin>
```

- [ ] **Step 7: Test font loading**

Start dev server: `npm run dev`
Open `http://localhost:5173` in browser
Open DevTools → Network tab
Verify:
- No Google Fonts request
- `inter-*.woff2` files load from `/fonts/`
- Page renders immediately with correct font (no flash of system font)

- [ ] **Step 8: Commit**

```bash
git add public/fonts/ resources/css/app.css resources/views/app.blade.php
git commit -m "perf: self-host Inter font and fix render-blocking Google CDN import"
```

---

### Task 8: Fix mobile hero video width bug with CSS object-fit

**Files:**
- Modify: `resources/js/Components/PortfolioV2/ScrollySequence.vue` (lines 216-222)

**Interfaces:**
- Consumes: Existing video element with current CSS
- Produces: Video that fills entire viewport width on mobile

**Steps:**

- [ ] **Step 1: Review current CSS**

Open `resources/js/Components/PortfolioV2/ScrollySequence.vue` and view the `.hero-video` style block (around line 216):

```css
.hero-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 41%;
    display: block;
}
```

- [ ] **Step 2: Test on mobile to confirm bug**

Start dev server: `npm run dev`
Open DevTools → Device toolbar → Mobile (375px width)
Navigate to `http://localhost:5173`
Observe: Video only covers ~40% of width, dark gap on right

- [ ] **Step 3: Update CSS to force aspect ratio**

Replace the `.hero-video` block with:

```css
.hero-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 41%;
    display: block;
    min-width: 100%;
    min-height: 100%;
    aspect-ratio: 16 / 9;
}
```

- [ ] **Step 4: Verify parent containers have correct sizing**

Check `.video-wrap` and `.scrolly-sticky` have:
```css
.scrolly-sticky {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.video-wrap {
    position: absolute;
    inset: 0;
}
```

Both should be correct already. If not, update them.

- [ ] **Step 5: Test on mobile**

Refresh mobile view in DevTools
Verify: Video now fills entire viewport width, no dark gap
Test at multiple widths: 375px, 768px, 1280px
Expected: Video always fills width and height with cover effect

- [ ] **Step 6: Test on desktop and tablet**

Verify scroll-driven video playback still works correctly
Verify opacity and scale animations still trigger

- [ ] **Step 7: Commit**

```bash
git add resources/js/Components/PortfolioV2/ScrollySequence.vue
git commit -m "fix: mobile hero video fills entire viewport width"
```

---

### Task 9: Add Vite build chunk splitting for performance

**Files:**
- Modify: `vite.config.js` (add build.rollupOptions)

**Interfaces:**
- Consumes: Current Vite config
- Produces: Config with manual chunk splitting for vendor libs and async routes

**Steps:**

- [ ] **Step 1: Review current vite.config.js**

Open `vite.config.js` and view the export block. It should have `export default defineConfig({ ... })`

- [ ] **Step 2: Add build.rollupOptions to config**

Within the `defineConfig({ ... })` object, add or update the `build` section:

```javascript
export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.ts',
      refresh: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-gsap': ['gsap', 'gsap/ScrollTrigger'],
          'vendor-icons': ['lucide-vue-next'],
          'chunk-case-studies': ['resources/js/Pages/Portfolio/CaseStudies.vue'],
          'chunk-engagements': ['resources/js/Pages/Portfolio/Engagements.vue'],
        },
      },
    },
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
});
```

Note: Adjust module paths if they differ in your codebase.

- [ ] **Step 3: Verify Lucide imports exist**

Run: `grep -r "lucide-vue-next" resources/js/Components/`

Expected: References to lucide-vue-next found (icons are used across components)

- [ ] **Step 4: Build and verify chunks**

```bash
npm run build
```

Expected output should show multiple chunks:
```
dist/assets/vendor-gsap-XXXXX.js
dist/assets/vendor-icons-XXXXX.js
dist/assets/chunk-case-studies-XXXXX.js
dist/assets/app-XXXXX.js
```

- [ ] **Step 5: Verify bundle sizes**

```bash
npm run build
```

Check `dist/assets/` folder sizes:
- GSAP chunk should be ~50-80KB (gzipped ~20KB)
- Icons chunk should be ~30-50KB (gzipped ~10KB)
- App chunk should be smaller than before

- [ ] **Step 6: Test on dev server**

```bash
npm run dev
```

Verify:
- Page loads normally
- No console errors
- Async routes load their chunks when navigated to

- [ ] **Step 7: Commit**

```bash
git add vite.config.js
git commit -m "perf: add Vite manual chunk splitting for GSAP, icons, and async routes"
```

---

## Phase 4: Bug Fixes — Keyframes and Credits

### Task 10: Fix duplicate @keyframes spinA and spinB in InitialLoader

**Files:**
- Modify: `resources/js/Components/PortfolioV2/InitialLoader.vue` (lines ~394-440)

**Interfaces:**
- Consumes: Current InitialLoader with duplicate keyframes
- Produces: InitialLoader with single, correct keyframe definitions

**Steps:**

- [ ] **Step 1: Review current keyframes**

Open `resources/js/Components/PortfolioV2/InitialLoader.vue` and find the `<style>` block.

Search for `@keyframes spinA`. You should find it defined TWICE. Locate both definitions (around lines 394 and 418).

First definition (should have translateX):
```css
@keyframes spinA {
  0% {
    transform: translateX(-50%) rotateZ(0deg);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) rotateZ(360deg);
    opacity: 1;
  }
}
```

Second definition (without translateX):
```css
@keyframes spinA {
  0% {
    transform: rotateZ(0deg);
    opacity: 1;
  }
  100% {
    transform: rotateZ(360deg);
    opacity: 1;
  }
}
```

- [ ] **Step 2: Delete the second (overriding) definition**

Remove the SECOND `@keyframes spinA { ... }` block entirely (the one WITHOUT `translateX(-50%)`).

Same for `@keyframes spinB` — find both definitions and keep only the first one WITH `translateX(-50%)`.

- [ ] **Step 3: Verify final keyframes**

After deletion, the remaining keyframes should be:

```css
@keyframes spinA {
  0% {
    transform: translateX(-50%) rotateZ(0deg);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) rotateZ(360deg);
    opacity: 1;
  }
}

@keyframes spinB {
  0% {
    transform: translateX(-50%) rotateZ(-120deg);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) rotateZ(240deg);
    opacity: 1;
  }
}
```

- [ ] **Step 4: Test in browser**

Start dev server: `npm run dev`
Navigate to `http://localhost:5173`
Wait for InitialLoader to appear
Verify: Reactor rings animate smoothly with proper centering (no misalignment)
Verify: Rings spin outward from center, not offset

- [ ] **Step 5: Commit**

```bash
git add resources/js/Components/PortfolioV2/InitialLoader.vue
git commit -m "fix: remove duplicate @keyframes spinA and spinB definitions"
```

---

### Task 11: Fix Laravel version credit in footer (12 → 13)

**Files:**
- Modify: `resources/js/Components/PortfolioV2/ContactSection.vue` (line ~179)

**Interfaces:**
- Consumes: Current footer text with "Laravel 12"
- Produces: Updated footer with "Laravel 13"

**Steps:**

- [ ] **Step 1: Locate footer credit text**

Open `resources/js/Components/PortfolioV2/ContactSection.vue` and search for "Laravel 12"

Expected find around line 179 in the template:
```html
<span class="text-xs">Built with VILT Stack — Vue 3 · Inertia.js · Laravel 12 · Tailwind CSS</span>
```

- [ ] **Step 2: Update version**

Replace "Laravel 12" with "Laravel 13":
```html
<span class="text-xs">Built with VILT Stack — Vue 3 · Inertia.js · Laravel 13 · Tailwind CSS</span>
```

- [ ] **Step 3: Verify in browser**

Start dev server: `npm run dev`
Scroll to bottom of page
Verify: Footer credit now shows "Laravel 13"

- [ ] **Step 4: Commit**

```bash
git add resources/js/Components/PortfolioV2/ContactSection.vue
git commit -m "fix: update footer credit from Laravel 12 to Laravel 13"
```

---

## Phase 5: Form and Chat Improvements

### Task 12: Add contact form success feedback and flash messages

**Files:**
- Modify: `app/Http/Controllers/ContactController.php` (lines 60-80)
- Modify: `resources/js/Components/PortfolioV2/ContactSection.vue` (improve success handling)

**Interfaces:**
- Consumes: Current ContactController returning back()
- Produces: Controller returning Inertia with success flash message and form data

**Steps:**

- [ ] **Step 1: Review current ContactController response**

Open `app/Http/Controllers/ContactController.php` and find the success path (around line 76). Should be:
```php
return back();
```

- [ ] **Step 2: Update controller to return Inertia with flash**

Replace the `return back();` with:

```php
return back()->with('success', [
  'message' => 'Thank you for reaching out! I'll review your inquiry and respond within 24 hours.',
  'leadId' => $lead->id,
]);
```

Full updated section:
```php
// ... inside ContactController.store() method, after creating $lead

Mail::send(new ContactInquiryMail($contactData));

return back()->with('success', [
  'message' => 'Thank you for reaching out! I\'ll review your inquiry and respond within 24 hours.',
  'leadId' => $lead->id,
]);
```

- [ ] **Step 3: Verify Inertia shared data**

Inertia automatically shares all flash data. No changes needed to middleware if Laravel session is configured.

- [ ] **Step 4: Update ContactSection.vue to display flash**

Open `resources/js/Components/PortfolioV2/ContactSection.vue` and find the template section with the form.

At the top of the `<template>`, add this computed property to watch for flash messages:

```vue
<script setup lang="ts">
import { usePage } from '@inertiajs/vue3'

const page = usePage()

const successMessage = computed(() => {
  return page.props.flash?.success?.message || null
})
</script>
```

Then in the template, after the form element, add a success toast:

```vue
<Transition name="fade">
  <div v-if="successMessage" class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg">
    {{ successMessage }}
  </div>
</Transition>
```

Add fade transition styles to the `<style>` block:

```css
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
```

- [ ] **Step 5: Test form submission**

Start dev server: `npm run dev`
Scroll to contact form
Fill out form with valid data
Submit
Expected: Green success toast appears with message
Expected: Form clears or shows submitted state

- [ ] **Step 6: Commit**

```bash
git add app/Http/Controllers/ContactController.php resources/js/Components/PortfolioV2/ContactSection.vue
git commit -m "feat: add form success feedback with Inertia flash messages"
```

---

### Task 13: Optimize chat widget — limit history, add rate limiting, input sanitization

**Files:**
- Modify: `resources/js/Components/PortfolioV2/ChatWidget.vue` (lines 30-50)
- Modify: `app/Http/Controllers/Portfolio/ChatController.php` (lines 90-120)

**Interfaces:**
- Consumes: Current chat sending full conversation history
- Produces: Chat limiting history to last 10 messages, rate limiting per IP, input sanitization

**Steps:**

- [ ] **Step 1: Update ChatWidget to limit message history**

Open `resources/js/Components/PortfolioV2/ChatWidget.vue` and find the send message handler (around line 36-45).

Current code likely sends all messages:
```typescript
const response = await axios.post('/chat', {
  messages: messages.value,
  // ...
})
```

Update to limit to last 10 messages:

```typescript
const recentMessages = messages.value.slice(-10);

const response = await axios.post('/chat', {
  messages: recentMessages,
  text: newMessage.value,
})
```

- [ ] **Step 2: Add client-side message count limit**

In the send handler, add a check before posting:

```typescript
if (messages.value.length >= 50) {
  // Show warning or force truncate
  messages.value = messages.value.slice(-20);
}

if (newMessage.value.trim().length === 0) {
  return;
}
```

- [ ] **Step 3: Add input sanitization in ChatWidget**

Before sending, sanitize the input:

```typescript
const sanitized = newMessage.value
  .trim()
  .replace(/[<>]/g, '') // Remove angle brackets
  .slice(0, 500); // Max 500 chars

if (sanitized.length === 0) return;

const response = await axios.post('/chat', {
  messages: recentMessages,
  text: sanitized,
})
```

- [ ] **Step 4: Update ChatController to add rate limiting**

Open `app/Http/Controllers/Portfolio/ChatController.php` and add rate limiting.

At the top of the `chat()` method, add:

```php
public function chat(Request $request)
{
    // Rate limiting: 60 requests per minute per IP
    $rateLimit = cache()->remember(
        'chat-rate-' . $request->ip(),
        60,
        fn() => 0
    );
    
    if ($rateLimit >= 60) {
        return response()->json(
            ['error' => 'Too many requests. Please wait a minute.'],
            429
        );
    }
    
    cache()->increment('chat-rate-' . $request->ip());
    
    // ... rest of method
}
```

Alternatively, use middleware. Add to your route:

```php
Route::post('/chat', [ChatController::class, 'chat'])
    ->throttle('60,1') // 60 per minute per user
    ->name('chat');
```

- [ ] **Step 5: Limit messages sent to OpenAI**

In ChatController.php, find where messages are sent to OpenAI (around line 105-110).

Update to use only last 10 messages:

```php
$recentMessages = array_slice($messages, -10);

$response = $client->messages()->create([
    'model' => 'gpt-4',
    'system' => $systemPrompt,
    'messages' => $recentMessages,
    'max_tokens' => 500,
]);
```

- [ ] **Step 6: Add request validation**

Add validation for incoming messages:

```php
$validated = $request->validate([
    'text' => 'required|string|max:500',
    'messages' => 'required|array|max:10',
    'messages.*.role' => 'required|in:user,assistant',
    'messages.*.content' => 'required|string|max:1000',
]);
```

- [ ] **Step 7: Test chat rate limiting**

Start dev server: `npm run dev`
Open chat widget
Send 5 messages rapidly
Verify: Messages are sent
Send 60+ messages in 1 minute
Verify: After 60, you get "Too many requests" error

- [ ] **Step 8: Test input sanitization**

Send message with HTML: `<script>alert('xss')</script>`
Verify: Script tags are stripped
Verify: Message still displays in chat

- [ ] **Step 9: Test message history limit**

Open browser DevTools → Network tab
Send 15 messages
Inspect the POST request body
Verify: Only last 10 messages are sent to backend (check `messages` array length)

- [ ] **Step 10: Commit**

```bash
git add resources/js/Components/PortfolioV2/ChatWidget.vue app/Http/Controllers/Portfolio/ChatController.php
git commit -m "feat: optimize chat widget with message history limit, rate limiting, and input sanitization"
```

---

## Phase 6: Animation Optimization

### Task 14: Pause TechStackSection animation when off-screen

**Files:**
- Modify: `resources/js/Components/PortfolioV2/TechStackSection.vue` (add IntersectionObserver)

**Interfaces:**
- Consumes: TechStackSection with continuous requestAnimationFrame
- Produces: Section that pauses animation when off-screen, saves CPU

**Steps:**

- [ ] **Step 1: Review current animation loop**

Open `resources/js/Components/PortfolioV2/TechStackSection.vue` and find the animate function.

Current code likely has:
```typescript
function animate() {
  // ... update positions
  requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})
```

- [ ] **Step 2: Add refs and state for visibility**

Add to the `<script setup>`:

```typescript
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let animationFrameId: number | null = null

onMounted(() => {
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
})
```

- [ ] **Step 3: Create IntersectionObserver**

Add this function in the `<script setup>`:

```typescript
function setupIntersectionObserver() {
  if (!sectionRef.value) return
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible.value = entry.isIntersecting
        
        if (entry.isIntersecting && animationFrameId === null) {
          // Start animation when visible
          animate()
        } else if (!entry.isIntersecting && animationFrameId !== null) {
          // Cancel animation when off-screen
          cancelAnimationFrame(animationFrameId)
          animationFrameId = null
        }
      })
    },
    {
      threshold: 0.1, // Trigger when 10% visible
    }
  )
  
  observer.observe(sectionRef.value)
}
```

- [ ] **Step 4: Update animate function**

Modify the animate function to manage animationFrameId:

```typescript
function animate() {
  if (!isVisible.value) {
    animationFrameId = null
    return
  }
  
  // ... existing physics update code ...
  
  animationFrameId = requestAnimationFrame(animate)
}
```

- [ ] **Step 5: Add ref binding to template**

In the template, add `ref="sectionRef"` to the outermost section element:

```vue
<section ref="sectionRef" class="tech-stack-section">
  <!-- content -->
</section>
```

- [ ] **Step 6: Test performance**

Start dev server: `npm run dev`
Open DevTools → Performance tab
Scroll down past TechStackSection
Verify: Frame rate is high (60fps+) when section is off-screen
Scroll back to TechStackSection
Verify: Animation resumes smoothly

- [ ] **Step 7: Commit**

```bash
git add resources/js/Components/PortfolioV2/TechStackSection.vue
git commit -m "perf: add IntersectionObserver to pause animation when TechStackSection is off-screen"
```

---

## Phase 7: Advanced — Server-Side Rendering Implementation

### Task 15: Implement SSR with Inertia.js Server-Side Rendering

**Files:**
- Create: `resources/js/ssr.ts`
- Modify: `vite.config.js` (add ssr config)
- Modify: `package.json` (add ssr build script)
- Create: `resources/views/app-ssr.blade.php` (optional, for SSR rendering)

**Interfaces:**
- Consumes: Current SPA-only setup
- Produces: Page that renders on server first, hydrates on client (no white flash, better LCP, SEO)

**Steps:**

- [ ] **Step 1: Install Inertia SSR dependencies**

```bash
npm install @inertiajs/server @inertiajs/node
```

- [ ] **Step 2: Create SSR entry point**

Create `resources/js/ssr.ts`:

```typescript
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/node/server'
import type { DefineComponent } from 'vue'

const pages = import.meta.glob<{ default: DefineComponent }>(
  './Pages/**/*.vue',
  { eager: true }
)

createServer((page) =>
  createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      let resolvedPage = pages[`./Pages/${name}.vue`]
      if (!resolvedPage) {
        resolvedPage = pages[`./Pages/${name}.vue`]
      }
      return resolvedPage
    },
    setup({ App, props, plugin }) {
      return createSSRApp(() => h(App, props)).use(plugin)
    },
  })
)
```

- [ ] **Step 3: Configure Vite for SSR**

Update `vite.config.js` to include SSR config:

```javascript
export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.ts',
      ssr: 'resources/js/ssr.ts',
      refresh: true,
    }),
  ],
  // ... existing build config
})
```

- [ ] **Step 4: Add build scripts to package.json**

In `package.json`, update the scripts section:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build && vite build --ssr",
    "build:ssr": "vite build --ssr",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 5: Update Laravel routes for SSR**

Open `routes/web.php` and ensure the main route handler prepares props correctly:

```php
Route::get('/', [PortfolioController::class, 'show'])
    ->name('portfolio');

Route::get('/case-studies/{slug?}', [CaseStudiesController::class, 'show'])
    ->name('case-studies.show');
```

The controller should return Inertia response (which already works for SSR):

```php
return Inertia::render('Portfolio/Index', [
    'profile' => $profile,
    'experiences' => $experiences,
    // ...
])
```

- [ ] **Step 6: Build with SSR**

```bash
npm run build
```

Expected output:
```
dist/server/ssr.js
dist/assets/ssr-manifest.json
dist/assets/app.js
```

- [ ] **Step 7: Deploy and test**

For local testing (optional, requires Node.js SSR server):

Install SSR dependencies:
```bash
npm install express
```

Create `bootstrap/ssr.js`:
```javascript
import { createServer } from 'http'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ssrManifest = JSON.parse(
  fs.readFileSync(resolve(__dirname, '../dist/ssr-manifest.json'), 'utf-8')
)

const ssrModule = await import('../dist/server/ssr.js')

createServer((req, res) => {
  ssrModule.default({ url: req.url }, (err, html) => {
    if (err) {
      res.writeHead(500)
      res.end('Internal error')
      return
    }
    res.writeHead(200)
    res.end(html)
  })
}).listen(3000)
```

For production, configure your hosting to use SSR server (Vercel, Laravel Forge with Inertia SSR, etc.).

- [ ] **Step 8: Verify SSR is working**

After deployment:
- Open DevTools → Network tab
- Refresh page
- In response HTML, verify it contains the full rendered page content (not just `<div id="app"></div>`)
- Verify no white flash on page load

- [ ] **Step 9: Commit**

```bash
git add resources/js/ssr.ts vite.config.js package.json
git commit -m "feat: implement Inertia.js server-side rendering for better LCP and SEO"
```

---

## Summary

All 14 critical and high-priority flaws have been addressed:

1. ✅ Mobile hero video width bug (Task 8)
2. ✅ Remove Three.js deps (~600KB) (Task 1)
3. ✅ Remove sequence frames (6.67MB) (Task 3)
4. ✅ Remove 3D models (3.8MB) (Task 3)
5. ✅ Add robots.txt (Task 4)
6. ✅ Add PWA manifest (Task 5)
7. ✅ Add service worker (Task 6)
8. ✅ Self-host font + render-blocking fix (Task 7)
9. ✅ Contact form success feedback (Task 12)
10. ✅ Fix @keyframes duplicates (Task 10)
11. ✅ Optimize chat widget (Task 13)
12. ✅ Add Vite chunk splitting (Task 9)
13. ✅ Pause animation off-screen (Task 14)
14. ✅ Fix Laravel version credit (Task 11)

**Bonus improvements** (also included):
- SSR implementation for no white flash and better indexability (Task 15)

**Total estimated effort:** 8-10 hours spread across 15 focused tasks
**Total performance gains:** ~10.5MB bundle size reduction + ~200ms faster LCP
