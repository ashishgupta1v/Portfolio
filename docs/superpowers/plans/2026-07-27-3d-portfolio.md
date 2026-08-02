# 3D Portfolio — "Ashish's Digital Workshop" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform ashishgupta.dev from a 2D scroll portfolio into a full 5-zone scroll-driven 3D experience using a single persistent Three.js canvas, GSAP ScrollTrigger driving camera/scene state, and HTML overlay for all text/forms.

**Architecture:** Single fullscreen Three.js canvas (`position: fixed; inset: 0; z-index: 0`) renders the entire 3D scene. An HTML overlay (`z-index: 1`) holds all text, forms, and interactive UI. A `~600vh` scroll spacer drives GSAP ScrollTrigger progress 0–1, which maps to camera position/rotation keyframes, object group visibility, and overlay transitions across 5 zones. Mobile (<768px or no WebGL2) falls back to existing PortfolioV2 2D components.

**Tech Stack:** Vue 3 + Three.js (raw, not R3F) + GSAP ScrollTrigger + Inertia.js + Tailwind CSS + troika-three-text + postprocessing

## Global Constraints

- Vue 3 Composition API with `<script setup lang="ts">` — no Options API
- Three.js ^0.183.2 — raw usage, no React Three Fiber
- GSAP ^3.14.2 with ScrollTrigger plugin — single master timeline
- All GLBs Draco-compressed — decoder at `/draco/`
- Pixel ratio capped at `Math.min(2, devicePixelRatio)`
- Total 3D asset payload < 4 MB (currently 3.8 MB)
- Initial JS bundle (gzipped) < 200 KB
- Lighthouse Performance >= 85, LCP < 2.5s, FID < 100ms, CLS < 0.1
- 60fps on mid-range laptop — object culling per zone
- Mobile fallback for <768px or no WebGL2
- SEO: all text in HTML overlay with semantic tags (`<h1>`, `<h2>`, etc.)
- CC-BY-4.0 attribution for workspace model in footer
- No XR/AR features (removed from existing `useCharacterScene.ts`)
- Existing `disposeThreeResource()` in `Utils/threeDispose.ts` used for all cleanup

---

## File Structure

```
resources/js/
├── Composables/
│   ├── useDeviceCapability.ts     # WebGL2/mobile detection, returns { canRun3D, tier }
│   ├── useAssetLoader.ts          # Progressive GLB/HDR loading with progress callbacks
│   ├── useSceneOrchestrator.ts    # Renderer, scene, camera, lights, render loop, resize, dispose
│   ├── useScrollZones.ts          # Master GSAP ScrollTrigger timeline, zone progress mapping
│   ├── useProceduralAnimation.ts  # Bone-driven idle/typing/head-tracking/wave animations
│   ├── useGsap.ts                 # Existing — unchanged
│   └── useCursor.ts               # Existing — unchanged
├── Components/
│   ├── Scene3D/
│   │   ├── SceneCanvas.vue        # Fullscreen canvas + scroll spacer + overlay wrapper
│   │   ├── SceneOverlay.vue       # HTML overlay layer — zone text, headings, scroll hint
│   │   ├── zones/
│   │   │   ├── WorkshopZone.ts    # Zone 1: workspace + avatar + particles
│   │   │   ├── ScreenZone.ts      # Zone 2: digital world + tech icons
│   │   │   ├── ConstellationZone.ts # Zone 3: project cards in space
│   │   │   ├── OfferingZone.ts    # Zone 4: glass panels + career timeline
│   │   │   └── ReturnZone.ts      # Zone 5: return workspace + CTA
│   │   └── objects/
│   │       ├── Avatar.ts          # Load avatar GLB, expose bone refs, shadow setup
│   │       ├── Workspace.ts       # Load workspace GLB, expose screen mesh refs
│   │       ├── ProjectCard.ts     # 3D project card: plane + texture + troika text
│   │       ├── TechIcon.ts        # Tech stack icon: textured plane
│   │       ├── GlassPanel.ts      # Frosted glass MeshPhysicalMaterial card
│   │       └── Particles.ts       # Dust/digital particle system (BufferGeometry + Points)
│   └── PortfolioV2/               # Existing — used as mobile fallback (unchanged)
├── Pages/
│   └── Portfolio/
│       └── Index.vue              # Modified: routes to SceneCanvas or PortfolioV2 fallback
├── Utils/
│   └── threeDispose.ts            # Existing — unchanged
└── types/
    ├── portfolio.ts               # Existing — unchanged
    └── scene3d.ts                 # New: TypeScript interfaces for 3D scene system
```

---

### Task 1: Install Dependencies and Create Type Definitions

**Files:**
- Modify: `package.json`
- Create: `resources/js/types/scene3d.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `SceneTier`, `ZoneId`, `ZoneConfig`, `CameraKeyframe`, `BoneRefs`, `AssetManifest`, `LoadProgress` types used by all subsequent tasks

- [ ] **Step 1: Install new npm packages**

```bash
npm install troika-three-text postprocessing
```

- [ ] **Step 2: Verify installation**

```bash
node -e "require('troika-three-text'); console.log('troika OK')"
node -e "require('postprocessing'); console.log('postprocessing OK')"
```

Expected: Both print OK without errors.

- [ ] **Step 3: Create scene3d.ts type definitions**

```typescript
// resources/js/types/scene3d.ts
import type * as THREE from 'three'

export type SceneTier = 'full' | 'simplified' | 'fallback'

export type ZoneId = 'workshop' | 'screen' | 'constellation' | 'offering' | 'return'

export interface CameraKeyframe {
    position: THREE.Vector3Tuple
    rotation: THREE.Vector3Tuple
    fov?: number
    zoom?: number
}

export interface ZoneConfig {
    id: ZoneId
    scrollStart: number
    scrollEnd: number
    cameraStart: CameraKeyframe
    cameraEnd: CameraKeyframe
}

export interface BoneRefs {
    hips: THREE.Bone | null
    spine: THREE.Bone | null
    spine01: THREE.Bone | null
    spine02: THREE.Bone | null
    neck: THREE.Bone | null
    head: THREE.Bone | null
    leftShoulder: THREE.Bone | null
    leftArm: THREE.Bone | null
    leftForeArm: THREE.Bone | null
    leftHand: THREE.Bone | null
    rightShoulder: THREE.Bone | null
    rightArm: THREE.Bone | null
    rightForeArm: THREE.Bone | null
    rightHand: THREE.Bone | null
}

export interface AssetManifest {
    avatar: string
    workspace: string
    environment: string
}

export interface LoadProgress {
    total: number
    loaded: number
    percent: number
    phase: 'avatar' | 'workspace' | 'environment' | 'done'
}

export interface SceneContext {
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    clock: THREE.Clock
}

export interface ZoneGroup {
    id: ZoneId
    group: THREE.Group
    setup: (ctx: SceneContext) => Promise<void>
    update: (delta: number, progress: number) => void
    setVisibility: (visible: boolean) => void
    dispose: () => void
}
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json resources/js/types/scene3d.ts
git commit -m "feat: install troika-three-text + postprocessing, add 3D scene type definitions"
```

---

### Task 2: Device Capability Detection

**Files:**
- Create: `resources/js/Composables/useDeviceCapability.ts`

**Interfaces:**
- Consumes: `SceneTier` from `types/scene3d.ts`
- Produces: `useDeviceCapability()` returning `{ canRun3D: Ref<boolean>, tier: Ref<SceneTier>, isMobile: Ref<boolean>, checkCapability(): void }`

- [ ] **Step 1: Implement useDeviceCapability composable**

```typescript
// resources/js/Composables/useDeviceCapability.ts
import { ref, onMounted } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import type { SceneTier } from '@/types/scene3d'

export function useDeviceCapability() {
    const canRun3D = ref(false)
    const tier = ref<SceneTier>('fallback')
    const isMobile = useMediaQuery('(max-width: 767px)')
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)')

    function checkWebGL2(): boolean {
        try {
            const canvas = document.createElement('canvas')
            const gl = canvas.getContext('webgl2')
            if (!gl) return false
            const ext = gl.getExtension('WEBGL_lose_context')
            if (ext) ext.loseContext()
            return true
        } catch {
            return false
        }
    }

    function checkCapability() {
        const hasWebGL2 = checkWebGL2()
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (!hasWebGL2 || isMobile.value || prefersReducedMotion) {
            canRun3D.value = false
            tier.value = 'fallback'
        } else if (isTablet.value) {
            canRun3D.value = true
            tier.value = 'simplified'
        } else {
            canRun3D.value = true
            tier.value = 'full'
        }
    }

    onMounted(checkCapability)

    return {
        canRun3D,
        tier,
        isMobile,
        checkCapability,
    }
}
```

- [ ] **Step 2: Verify the composable compiles**

```bash
npx vue-tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add resources/js/Composables/useDeviceCapability.ts
git commit -m "feat: add useDeviceCapability composable for WebGL2/mobile detection"
```

---

### Task 3: Asset Loader Composable

**Files:**
- Create: `resources/js/Composables/useAssetLoader.ts`

**Interfaces:**
- Consumes: `AssetManifest`, `LoadProgress` from `types/scene3d.ts`
- Produces: `useAssetLoader()` returning `{ loadAll(manifest, scene): Promise<{ avatar, workspace, envMap }>`, `progress: Ref<LoadProgress> }`

- [ ] **Step 1: Implement useAssetLoader composable**

```typescript
// resources/js/Composables/useAssetLoader.ts
import { ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader, DRACOLoader, RGBELoader } from 'three-stdlib'
import type { GLTF } from 'three-stdlib'
import type { AssetManifest, LoadProgress } from '@/types/scene3d'

export interface LoadedAssets {
    avatar: GLTF
    workspace: GLTF
    envMap: THREE.Texture
}

export function useAssetLoader() {
    const progress = ref<LoadProgress>({
        total: 3,
        loaded: 0,
        percent: 0,
        phase: 'avatar',
    })

    let dracoLoader: DRACOLoader | null = null

    function createGLTFLoader(): GLTFLoader {
        const loader = new GLTFLoader()
        dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')
        loader.setDRACOLoader(dracoLoader)
        return loader
    }

    function loadGLTF(loader: GLTFLoader, url: string): Promise<GLTF> {
        return new Promise((resolve, reject) => {
            loader.load(url, resolve, undefined, reject)
        })
    }

    function loadHDR(url: string): Promise<THREE.Texture> {
        return new Promise((resolve, reject) => {
            const rgbeLoader = new RGBELoader()
            rgbeLoader.load(url, (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping
                resolve(texture)
            }, undefined, reject)
        })
    }

    function updateProgress(phase: LoadProgress['phase'], loaded: number) {
        const percent = Math.round((loaded / 3) * 100)
        progress.value = { total: 3, loaded, percent, phase }
    }

    async function loadAll(manifest: AssetManifest): Promise<LoadedAssets> {
        const gltfLoader = createGLTFLoader()

        updateProgress('avatar', 0)
        const avatar = await loadGLTF(gltfLoader, manifest.avatar)
        updateProgress('workspace', 1)

        const workspace = await loadGLTF(gltfLoader, manifest.workspace)
        updateProgress('environment', 2)

        const envMap = await loadHDR(manifest.environment)
        updateProgress('done', 3)

        dracoLoader?.dispose()
        dracoLoader = null

        return { avatar, workspace, envMap }
    }

    function dispose() {
        dracoLoader?.dispose()
        dracoLoader = null
    }

    return {
        progress,
        loadAll,
        dispose,
    }
}
```

- [ ] **Step 2: Verify the composable compiles**

```bash
npx vue-tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add resources/js/Composables/useAssetLoader.ts
git commit -m "feat: add useAssetLoader composable for progressive GLB/HDR loading"
```

---

### Task 4: Scene Orchestrator Composable

**Files:**
- Create: `resources/js/Composables/useSceneOrchestrator.ts`

**Interfaces:**
- Consumes: `SceneContext`, `SceneTier` from `types/scene3d.ts`; `disposeThreeResource()` from `Utils/threeDispose.ts`
- Produces: `useSceneOrchestrator()` returning `{ init(canvas): SceneContext, setEnvironment(envMap), addToScene(obj), onFrame(callback), dispose() }`

- [ ] **Step 1: Implement useSceneOrchestrator composable**

This refactors the renderer/scene/camera/lights/loop from the existing `useCharacterScene.ts` into a standalone orchestrator with no model-loading responsibility.

```typescript
// resources/js/Composables/useSceneOrchestrator.ts
import { onUnmounted } from 'vue'
import * as THREE from 'three'
import { disposeThreeResource } from '@/Utils/threeDispose'
import type { SceneContext, SceneTier } from '@/types/scene3d'

type FrameCallback = (delta: number, elapsed: number) => void

export function useSceneOrchestrator(tier: SceneTier = 'full') {
    let renderer: THREE.WebGLRenderer | null = null
    let scene: THREE.Scene | null = null
    let camera: THREE.PerspectiveCamera | null = null
    let clock: THREE.Clock | null = null
    let pmremGenerator: THREE.PMREMGenerator | null = null
    const frameCallbacks: FrameCallback[] = []

    function init(canvas: HTMLCanvasElement): SceneContext {
        renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: tier === 'full',
            powerPreference: tier === 'full' ? 'high-performance' : 'default',
        })
        renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
        renderer.setSize(canvas.clientWidth, canvas.clientHeight)
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1
        renderer.shadowMap.enabled = tier === 'full'
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.outputColorSpace = THREE.SRGBColorSpace

        scene = new THREE.Scene()

        camera = new THREE.PerspectiveCamera(
            14.5,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        )
        camera.position.set(0, 13.1, 24.7)
        camera.updateProjectionMatrix()

        clock = new THREE.Clock()

        setupLighting()

        window.addEventListener('resize', onResize)

        renderer.setAnimationLoop(renderLoop)

        return { renderer, scene, camera, clock }
    }

    function setupLighting() {
        if (!scene) return

        const dirLight = new THREE.DirectionalLight(0x5eead4, 1)
        dirLight.position.set(-2, 4, 3)
        dirLight.castShadow = tier === 'full'
        if (dirLight.castShadow) {
            dirLight.shadow.mapSize.set(1024, 1024)
            dirLight.shadow.camera.near = 0.1
            dirLight.shadow.camera.far = 50
        }
        scene.add(dirLight)

        const pointLight = new THREE.PointLight(0x22d3ee, 2, 100, 3)
        pointLight.position.set(3, 12, 4)
        scene.add(pointLight)

        const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
        scene.add(ambientLight)
    }

    function setEnvironment(envMap: THREE.Texture) {
        if (!scene || !renderer) return
        pmremGenerator = new THREE.PMREMGenerator(renderer)
        pmremGenerator.compileEquirectangularShader()
        const envTexture = pmremGenerator.fromEquirectangular(envMap).texture
        scene.environment = envTexture
        scene.environmentIntensity = 0.64
        envMap.dispose()
        pmremGenerator.dispose()
    }

    function addToScene(object: THREE.Object3D) {
        scene?.add(object)
    }

    function removeFromScene(object: THREE.Object3D) {
        scene?.remove(object)
    }

    function onFrame(callback: FrameCallback) {
        frameCallbacks.push(callback)
        return () => {
            const idx = frameCallbacks.indexOf(callback)
            if (idx !== -1) frameCallbacks.splice(idx, 1)
        }
    }

    function renderLoop() {
        if (!renderer || !scene || !camera || !clock) return
        const delta = clock.getDelta()
        const elapsed = clock.getElapsedTime()

        for (const cb of frameCallbacks) {
            cb(delta, elapsed)
        }

        renderer.render(scene, camera)
    }

    function onResize() {
        if (!renderer || !camera) return
        const canvas = renderer.domElement
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
    }

    function getCamera(): THREE.PerspectiveCamera | null {
        return camera
    }

    function getScene(): THREE.Scene | null {
        return scene
    }

    function dispose() {
        window.removeEventListener('resize', onResize)
        frameCallbacks.length = 0
        if (scene) disposeThreeResource(scene)
        renderer?.setAnimationLoop(null)
        renderer?.dispose()
        renderer = null
        scene = null
        camera = null
        clock = null
    }

    onUnmounted(dispose)

    return {
        init,
        setEnvironment,
        addToScene,
        removeFromScene,
        onFrame,
        getCamera,
        getScene,
        dispose,
    }
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx vue-tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add resources/js/Composables/useSceneOrchestrator.ts
git commit -m "feat: add useSceneOrchestrator composable — renderer, scene, camera, render loop"
```

---

### Task 5: Avatar and Workspace 3D Objects

**Files:**
- Create: `resources/js/Components/Scene3D/objects/Avatar.ts`
- Create: `resources/js/Components/Scene3D/objects/Workspace.ts`

**Interfaces:**
- Consumes: `GLTF` from three-stdlib; `BoneRefs` from `types/scene3d.ts`
- Produces: `createAvatar(gltf): { group, boneRefs, dispose() }`; `createWorkspace(gltf): { group, screenMesh, dispose() }`

- [ ] **Step 1: Implement Avatar object**

```typescript
// resources/js/Components/Scene3D/objects/Avatar.ts
import * as THREE from 'three'
import type { GLTF } from 'three-stdlib'
import type { BoneRefs } from '@/types/scene3d'

export interface AvatarObject {
    group: THREE.Group
    boneRefs: BoneRefs
    dispose: () => void
}

const BONE_MAP: Record<keyof BoneRefs, string[]> = {
    hips: ['Hips'],
    spine: ['Spine'],
    spine01: ['Spine01'],
    spine02: ['Spine02'],
    neck: ['neck'],
    head: ['Head', 'head', 'spine006', 'mixamorig:Head', 'mixamorig_Head'],
    leftShoulder: ['LeftShoulder'],
    leftArm: ['LeftArm'],
    leftForeArm: ['LeftForeArm'],
    leftHand: ['LeftHand'],
    rightShoulder: ['RightShoulder'],
    rightArm: ['RightArm'],
    rightForeArm: ['RightForeArm'],
    rightHand: ['RightHand'],
}

export function createAvatar(gltf: GLTF): AvatarObject {
    const group = new THREE.Group()
    group.name = 'AvatarGroup'
    const model = gltf.scene
    group.add(model)

    const boneRefs: BoneRefs = {
        hips: null, spine: null, spine01: null, spine02: null,
        neck: null, head: null,
        leftShoulder: null, leftArm: null, leftForeArm: null, leftHand: null,
        rightShoulder: null, rightArm: null, rightForeArm: null, rightHand: null,
    }

    model.traverse((child) => {
        if (child instanceof THREE.Bone) {
            for (const [key, names] of Object.entries(BONE_MAP)) {
                if (names.includes(child.name) && boneRefs[key as keyof BoneRefs] === null) {
                    boneRefs[key as keyof BoneRefs] = child
                }
            }
        }
        if (child instanceof THREE.Mesh) {
            child.castShadow = true
            child.receiveShadow = true
        }
    })

    if (import.meta.env.DEV) {
        const found = Object.entries(boneRefs)
            .filter(([, v]) => v !== null)
            .map(([k]) => k)
        console.log('[Avatar] Bones mapped:', found)
    }

    return {
        group,
        boneRefs,
        dispose() {
            group.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry?.dispose()
                    const mats = Array.isArray(child.material) ? child.material : [child.material]
                    mats.forEach((m) => m?.dispose())
                }
            })
        },
    }
}
```

- [ ] **Step 2: Implement Workspace object**

```typescript
// resources/js/Components/Scene3D/objects/Workspace.ts
import * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

export interface WorkspaceObject {
    group: THREE.Group
    screenMesh: THREE.Mesh | null
    dispose: () => void
}

export function createWorkspace(gltf: GLTF): WorkspaceObject {
    const group = new THREE.Group()
    group.name = 'WorkspaceGroup'
    const model = gltf.scene
    group.add(model)

    let screenMesh: THREE.Mesh | null = null

    model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true
            child.receiveShadow = true
            const name = child.name.toLowerCase()
            if (name.includes('screen') || name.includes('monitor') || name.includes('display')) {
                screenMesh = child
            }
        }
    })

    if (import.meta.env.DEV) {
        const meshNames: string[] = []
        model.traverse((child) => {
            if (child instanceof THREE.Mesh) meshNames.push(child.name)
        })
        console.log('[Workspace] Meshes:', meshNames)
        console.log('[Workspace] Screen mesh:', screenMesh?.name ?? 'NOT FOUND')
    }

    return {
        group,
        screenMesh,
        dispose() {
            group.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry?.dispose()
                    const mats = Array.isArray(child.material) ? child.material : [child.material]
                    mats.forEach((m) => m?.dispose())
                }
            })
        },
    }
}
```

- [ ] **Step 3: Verify both compile**

```bash
npx vue-tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 4: Commit**

```bash
git add resources/js/Components/Scene3D/objects/Avatar.ts resources/js/Components/Scene3D/objects/Workspace.ts
git commit -m "feat: add Avatar and Workspace 3D object factories with bone/mesh extraction"
```

---

### Task 6: Particles System

**Files:**
- Create: `resources/js/Components/Scene3D/objects/Particles.ts`

**Interfaces:**
- Consumes: `SceneTier` from `types/scene3d.ts`
- Produces: `createParticles(tier, type): { group, update(delta), dispose() }` where type is `'dust' | 'digital'`

- [ ] **Step 1: Implement Particles object**

```typescript
// resources/js/Components/Scene3D/objects/Particles.ts
import * as THREE from 'three'
import type { SceneTier } from '@/types/scene3d'

export type ParticleType = 'dust' | 'digital'

export interface ParticleSystem {
    group: THREE.Group
    update: (delta: number, elapsed: number) => void
    dispose: () => void
}

export function createParticles(tier: SceneTier, type: ParticleType = 'dust'): ParticleSystem {
    const group = new THREE.Group()
    group.name = `Particles_${type}`

    const count = tier === 'full' ? (type === 'dust' ? 200 : 500) : (type === 'dust' ? 80 : 200)
    const spread = type === 'dust' ? 20 : 40

    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread

        velocities[i * 3] = (Math.random() - 0.5) * 0.02
        velocities[i * 3 + 1] = Math.random() * 0.01 + 0.005
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02

        sizes[i] = Math.random() * (type === 'dust' ? 0.05 : 0.08) + 0.02
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
        color: type === 'dust' ? 0xa7f3d0 : 0x22d3ee,
        size: type === 'dust' ? 0.04 : 0.06,
        transparent: true,
        opacity: type === 'dust' ? 0.4 : 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    group.add(points)

    function update(delta: number, elapsed: number) {
        const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
        const arr = posAttr.array as Float32Array
        const halfSpread = spread / 2

        for (let i = 0; i < count; i++) {
            arr[i * 3] += velocities[i * 3] * delta * 60
            arr[i * 3 + 1] += velocities[i * 3 + 1] * delta * 60
            arr[i * 3 + 2] += velocities[i * 3 + 2] * delta * 60

            if (arr[i * 3 + 1] > halfSpread) {
                arr[i * 3 + 1] = -halfSpread
            }
            if (Math.abs(arr[i * 3]) > halfSpread) {
                arr[i * 3] = -arr[i * 3] * 0.5
            }
            if (Math.abs(arr[i * 3 + 2]) > halfSpread) {
                arr[i * 3 + 2] = -arr[i * 3 + 2] * 0.5
            }
        }

        posAttr.needsUpdate = true

        if (type === 'digital') {
            material.opacity = 0.4 + Math.sin(elapsed * 2) * 0.2
        }
    }

    function dispose() {
        geometry.dispose()
        material.dispose()
    }

    return { group, update, dispose }
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add resources/js/Components/Scene3D/objects/Particles.ts
git commit -m "feat: add Particles system with dust and digital modes"
```

---

### Task 7: Procedural Animation Composable

**Files:**
- Create: `resources/js/Composables/useProceduralAnimation.ts`

**Interfaces:**
- Consumes: `BoneRefs` from `types/scene3d.ts`
- Produces: `useProceduralAnimation(boneRefs): { update(delta, elapsed), setMode(mode), startWave(), setMouseTarget(x, y), dispose() }` where mode is `'idle' | 'typing'`

- [ ] **Step 1: Implement useProceduralAnimation composable**

```typescript
// resources/js/Composables/useProceduralAnimation.ts
import * as THREE from 'three'
import gsap from 'gsap'
import type { BoneRefs } from '@/types/scene3d'

export type AnimationMode = 'idle' | 'typing'

export function useProceduralAnimation(boneRefs: BoneRefs) {
    let mode: AnimationMode = 'idle'
    let mouseX = 0
    let mouseY = 0
    let waveActive = false
    let waveTween: gsap.core.Tween | null = null

    const initialRotations: Partial<Record<keyof BoneRefs, THREE.Euler>> = {}
    for (const [key, bone] of Object.entries(boneRefs)) {
        if (bone) {
            initialRotations[key as keyof BoneRefs] = bone.rotation.clone()
        }
    }

    function setMode(newMode: AnimationMode) {
        mode = newMode
    }

    function setMouseTarget(x: number, y: number) {
        mouseX = x
        mouseY = y
    }

    function startWave() {
        if (waveActive || !boneRefs.rightShoulder || !boneRefs.rightArm || !boneRefs.rightForeArm) return
        waveActive = true

        const tl = gsap.timeline({
            onComplete: () => {
                waveActive = false
            },
        })

        tl.to(boneRefs.rightShoulder.rotation, { z: -0.8, duration: 0.4, ease: 'power2.out' })
        tl.to(boneRefs.rightArm.rotation, { z: -1.2, duration: 0.3, ease: 'power2.out' }, '<0.1')
        tl.to(boneRefs.rightForeArm.rotation, { z: -0.3, x: 0.4, duration: 0.3, ease: 'power2.out' }, '<0.1')

        tl.to(boneRefs.rightForeArm.rotation, { x: -0.3, duration: 0.25, ease: 'sine.inOut', yoyo: true, repeat: 3 })

        tl.to(boneRefs.rightShoulder.rotation, { z: initialRotations.rightShoulder?.z ?? 0, duration: 0.4, ease: 'power2.inOut' })
        tl.to(boneRefs.rightArm.rotation, { z: initialRotations.rightArm?.z ?? 0, duration: 0.3, ease: 'power2.inOut' }, '<0.1')
        tl.to(boneRefs.rightForeArm.rotation, { z: initialRotations.rightForeArm?.z ?? 0, x: initialRotations.rightForeArm?.x ?? 0, duration: 0.3, ease: 'power2.inOut' }, '<0.1')
    }

    function updateBreathing(elapsed: number) {
        const breathAmt = Math.sin(elapsed * 1.5) * 0.015
        if (boneRefs.spine) boneRefs.spine.rotation.x = (initialRotations.spine?.x ?? 0) + breathAmt
        if (boneRefs.spine01) boneRefs.spine01.rotation.x = (initialRotations.spine01?.x ?? 0) + breathAmt * 0.7
        if (boneRefs.spine02) boneRefs.spine02.rotation.x = (initialRotations.spine02?.x ?? 0) + breathAmt * 0.4
    }

    function updateBodySway(elapsed: number) {
        if (!boneRefs.hips) return
        const swayAmt = Math.sin(elapsed * 0.3) * 0.008
        boneRefs.hips.rotation.z = (initialRotations.hips?.z ?? 0) + swayAmt
    }

    function updateHeadTracking() {
        if (!boneRefs.head && !boneRefs.neck) return
        const maxRotation = Math.PI / 6
        const targetY = mouseX * maxRotation
        const targetX = -mouseY * maxRotation * 0.5
        const lerp = 0.04

        if (boneRefs.neck) {
            boneRefs.neck.rotation.y += (targetY * 0.4 - (boneRefs.neck.rotation.y - (initialRotations.neck?.y ?? 0))) * lerp
        }
        if (boneRefs.head) {
            boneRefs.head.rotation.y += (targetY * 0.6 - (boneRefs.head.rotation.y - (initialRotations.head?.y ?? 0))) * lerp
            boneRefs.head.rotation.x += (targetX - (boneRefs.head.rotation.x - (initialRotations.head?.x ?? 0))) * lerp
        }
    }

    function updateTyping(elapsed: number) {
        if (mode !== 'typing') return

        const speed = 8
        const amplitude = 0.03

        if (boneRefs.leftHand) {
            boneRefs.leftHand.position.y = (Math.sin(elapsed * speed) * amplitude)
        }
        if (boneRefs.rightHand) {
            boneRefs.rightHand.position.y = (Math.sin(elapsed * speed + 1.5) * amplitude)
        }

        if (boneRefs.leftForeArm) {
            boneRefs.leftForeArm.rotation.x = (initialRotations.leftForeArm?.x ?? 0) + Math.sin(elapsed * speed * 0.5) * 0.02
        }
        if (boneRefs.rightForeArm) {
            boneRefs.rightForeArm.rotation.x = (initialRotations.rightForeArm?.x ?? 0) + Math.sin(elapsed * speed * 0.5 + 1) * 0.02
        }
    }

    function update(delta: number, elapsed: number) {
        updateBreathing(elapsed)
        updateBodySway(elapsed)
        updateHeadTracking()

        if (mode === 'typing' && !waveActive) {
            updateTyping(elapsed)
        }
    }

    function dispose() {
        waveTween?.kill()
    }

    return {
        update,
        setMode,
        setMouseTarget,
        startWave,
        dispose,
    }
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add resources/js/Composables/useProceduralAnimation.ts
git commit -m "feat: add useProceduralAnimation composable — breathing, typing, head-tracking, wave"
```

---

### Task 8: TechIcon and ProjectCard 3D Objects

**Files:**
- Create: `resources/js/Components/Scene3D/objects/TechIcon.ts`
- Create: `resources/js/Components/Scene3D/objects/ProjectCard.ts`

**Interfaces:**
- Consumes: `Project` from `types/portfolio.ts`
- Produces: `createTechIcon(name, color): { mesh, dispose() }`; `createProjectCard(project, index): { group, update(delta), dispose() }`

- [ ] **Step 1: Implement TechIcon object**

```typescript
// resources/js/Components/Scene3D/objects/TechIcon.ts
import * as THREE from 'three'

export interface TechIconObject {
    mesh: THREE.Mesh
    update: (elapsed: number) => void
    dispose: () => void
}

export function createTechIcon(name: string, hue: number, index: number): TechIconObject {
    const size = 0.8
    const geometry = new THREE.PlaneGeometry(size, size)

    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = `hsl(${hue}, 70%, 15%)`
    ctx.fillRect(0, 0, 128, 128)
    ctx.fillStyle = `hsl(${hue}, 80%, 70%)`
    ctx.font = 'bold 24px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const abbreviation = name.length <= 3 ? name : name.slice(0, 3).toUpperCase()
    ctx.fillText(abbreviation, 64, 54)
    ctx.font = '12px monospace'
    ctx.fillText(name, 64, 82)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 0.9,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = `TechIcon_${name}`

    const angle = (index / 12) * Math.PI * 2
    const radius = 6 + Math.random() * 4
    mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 6,
        Math.sin(angle) * radius
    )

    const baseY = mesh.position.y
    const phaseOffset = Math.random() * Math.PI * 2
    const floatSpeed = 0.5 + Math.random() * 0.5

    function update(elapsed: number) {
        mesh.position.y = baseY + Math.sin(elapsed * floatSpeed + phaseOffset) * 0.3
        mesh.rotation.y = elapsed * 0.2 + phaseOffset
    }

    function dispose() {
        geometry.dispose()
        material.dispose()
        texture.dispose()
    }

    return { mesh, update, dispose }
}
```

- [ ] **Step 2: Implement ProjectCard object**

```typescript
// resources/js/Components/Scene3D/objects/ProjectCard.ts
import * as THREE from 'three'
import type { Project } from '@/types/portfolio'

export interface ProjectCardObject {
    group: THREE.Group
    update: (elapsed: number) => void
    dispose: () => void
}

export function createProjectCard(project: Project, index: number): ProjectCardObject {
    const group = new THREE.Group()
    group.name = `ProjectCard_${project.slug}`

    const cardWidth = 3
    const cardHeight = 2
    const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight)

    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 340
    const ctx = canvas.getContext('2d')!

    ctx.fillStyle = '#0f1729'
    ctx.fillRect(0, 0, 512, 340)

    ctx.strokeStyle = 'rgba(94, 234, 212, 0.3)'
    ctx.lineWidth = 2
    ctx.strokeRect(4, 4, 504, 332)

    ctx.fillStyle = '#5eead4'
    ctx.font = 'bold 28px sans-serif'
    ctx.fillText(project.title, 24, 60)

    ctx.fillStyle = 'rgba(226, 232, 240, 0.7)'
    ctx.font = '16px sans-serif'
    const desc = project.description.length > 80
        ? project.description.slice(0, 77) + '...'
        : project.description
    ctx.fillText(desc, 24, 100)

    ctx.fillStyle = 'rgba(94, 234, 212, 0.6)'
    ctx.font = '14px monospace'
    const tools = project.tools.slice(0, 4).join(' · ')
    ctx.fillText(tools, 24, 140)

    ctx.fillStyle = '#22d3ee'
    ctx.font = 'bold 14px sans-serif'
    ctx.fillText(project.category.toUpperCase(), 24, 300)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 0.95,
    })

    const cardMesh = new THREE.Mesh(geometry, material)
    group.add(cardMesh)

    const angle = (index / 5) * Math.PI * 2
    const radius = 8
    group.position.set(
        Math.cos(angle) * radius,
        (index - 2) * 1.5,
        Math.sin(angle) * radius - 5
    )

    const baseY = group.position.y
    const phaseOffset = index * 1.2

    function update(elapsed: number) {
        group.position.y = baseY + Math.sin(elapsed * 0.4 + phaseOffset) * 0.3
        cardMesh.lookAt(0, group.position.y, 25)
    }

    function dispose() {
        geometry.dispose()
        material.dispose()
        texture.dispose()
    }

    return { group, update, dispose }
}
```

- [ ] **Step 3: Verify both compile**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add resources/js/Components/Scene3D/objects/TechIcon.ts resources/js/Components/Scene3D/objects/ProjectCard.ts
git commit -m "feat: add TechIcon and ProjectCard 3D object factories"
```

---

### Task 9: GlassPanel 3D Object

**Files:**
- Create: `resources/js/Components/Scene3D/objects/GlassPanel.ts`

**Interfaces:**
- Consumes: nothing (standalone factory)
- Produces: `createGlassPanel(title, description, index): { group, update(elapsed), dispose() }`

- [ ] **Step 1: Implement GlassPanel object**

```typescript
// resources/js/Components/Scene3D/objects/GlassPanel.ts
import * as THREE from 'three'

export interface GlassPanelObject {
    group: THREE.Group
    update: (elapsed: number) => void
    dispose: () => void
}

export function createGlassPanel(title: string, description: string, index: number): GlassPanelObject {
    const group = new THREE.Group()
    group.name = `GlassPanel_${index}`

    const panelWidth = 2.5
    const panelHeight = 3.2
    const geometry = new THREE.PlaneGeometry(panelWidth, panelHeight, 1, 1)

    const material = new THREE.MeshPhysicalMaterial({
        color: 0x1a2332,
        metalness: 0.0,
        roughness: 0.15,
        transmission: 0.85,
        thickness: 0.5,
        ior: 1.5,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
    })

    const panelMesh = new THREE.Mesh(geometry, material)
    group.add(panelMesh)

    const canvas = document.createElement('canvas')
    canvas.width = 400
    canvas.height = 512
    const ctx = canvas.getContext('2d')!

    ctx.clearRect(0, 0, 400, 512)
    ctx.fillStyle = '#5eead4'
    ctx.font = 'bold 32px sans-serif'
    ctx.fillText(title, 24, 60)

    ctx.fillStyle = 'rgba(226, 232, 240, 0.8)'
    ctx.font = '18px sans-serif'
    const words = description.split(' ')
    let line = ''
    let y = 110
    for (const word of words) {
        const test = line + word + ' '
        if (ctx.measureText(test).width > 350) {
            ctx.fillText(line.trim(), 24, y)
            line = word + ' '
            y += 26
        } else {
            line = test
        }
    }
    if (line.trim()) ctx.fillText(line.trim(), 24, y)

    const labelTexture = new THREE.CanvasTexture(canvas)
    labelTexture.colorSpace = THREE.SRGBColorSpace
    const labelMaterial = new THREE.MeshBasicMaterial({
        map: labelTexture,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
    })
    const labelGeometry = new THREE.PlaneGeometry(panelWidth * 0.9, panelHeight * 0.9)
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial)
    labelMesh.position.z = 0.01
    group.add(labelMesh)

    const spacing = 3.2
    const totalWidth = 3 * spacing
    group.position.set(
        (index - 1.5) * spacing,
        0,
        0
    )

    const baseY = group.position.y
    const phaseOffset = index * 0.8

    function update(elapsed: number) {
        group.position.y = baseY + Math.sin(elapsed * 0.5 + phaseOffset) * 0.15
    }

    function dispose() {
        geometry.dispose()
        material.dispose()
        labelGeometry.dispose()
        labelMaterial.dispose()
        labelTexture.dispose()
    }

    return { group, update, dispose }
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add resources/js/Components/Scene3D/objects/GlassPanel.ts
git commit -m "feat: add GlassPanel 3D object with MeshPhysicalMaterial transmission"
```

---

### Task 10: Zone Implementations — Workshop, Screen, Constellation, Offering, Return

**Files:**
- Create: `resources/js/Components/Scene3D/zones/WorkshopZone.ts`
- Create: `resources/js/Components/Scene3D/zones/ScreenZone.ts`
- Create: `resources/js/Components/Scene3D/zones/ConstellationZone.ts`
- Create: `resources/js/Components/Scene3D/zones/OfferingZone.ts`
- Create: `resources/js/Components/Scene3D/zones/ReturnZone.ts`

**Interfaces:**
- Consumes: `ZoneGroup`, `SceneContext`, `ZoneId` from `types/scene3d.ts`; `createAvatar()`, `createWorkspace()`, `createParticles()`, `createTechIcon()`, `createProjectCard()`, `createGlassPanel()` from objects; `useProceduralAnimation()` from composable; `LoadedAssets` from `useAssetLoader`; `Project` from `types/portfolio.ts`
- Produces: Each zone factory returns `ZoneGroup` with `{ id, group, setup(), update(), setVisibility(), dispose() }`

- [ ] **Step 1: Implement WorkshopZone**

```typescript
// resources/js/Components/Scene3D/zones/WorkshopZone.ts
import * as THREE from 'three'
import type { SceneContext, ZoneGroup, SceneTier } from '@/types/scene3d'
import type { LoadedAssets } from '@/Composables/useAssetLoader'
import { createAvatar, type AvatarObject } from '../objects/Avatar'
import { createWorkspace, type WorkspaceObject } from '../objects/Workspace'
import { createParticles, type ParticleSystem } from '../objects/Particles'
import { useProceduralAnimation } from '@/Composables/useProceduralAnimation'

export function createWorkshopZone(
    assets: LoadedAssets,
    tier: SceneTier
): ZoneGroup {
    const group = new THREE.Group()
    group.name = 'WorkshopZone'

    let avatar: AvatarObject | null = null
    let workspace: WorkspaceObject | null = null
    let particles: ParticleSystem | null = null
    let animation: ReturnType<typeof useProceduralAnimation> | null = null

    function onMouseMove(e: MouseEvent) {
        const x = (e.clientX / window.innerWidth) * 2 - 1
        const y = -(e.clientY / window.innerHeight) * 2 + 1
        animation?.setMouseTarget(x, y)
    }

    async function setup(ctx: SceneContext) {
        workspace = createWorkspace(assets.workspace)
        workspace.group.position.set(0, 0, 0)
        workspace.group.scale.setScalar(5)
        group.add(workspace.group)

        avatar = createAvatar(assets.avatar)
        avatar.group.position.set(0, 5.5, 1)
        avatar.group.scale.setScalar(5)
        group.add(avatar.group)

        animation = useProceduralAnimation(avatar.boneRefs)
        animation.setMode('typing')

        if (tier !== 'simplified') {
            particles = createParticles(tier, 'dust')
            particles.group.position.set(0, 10, 0)
            group.add(particles.group)
        }

        window.addEventListener('mousemove', onMouseMove)
    }

    function update(delta: number, progress: number) {
        const elapsed = performance.now() / 1000
        animation?.update(delta, elapsed)
        particles?.update(delta, elapsed)
    }

    function setVisibility(visible: boolean) {
        group.visible = visible
    }

    function dispose() {
        window.removeEventListener('mousemove', onMouseMove)
        avatar?.dispose()
        workspace?.dispose()
        particles?.dispose()
        animation?.dispose()
    }

    return { id: 'workshop', group, setup, update, setVisibility, dispose }
}
```

- [ ] **Step 2: Implement ScreenZone**

```typescript
// resources/js/Components/Scene3D/zones/ScreenZone.ts
import * as THREE from 'three'
import type { SceneContext, ZoneGroup, SceneTier } from '@/types/scene3d'
import { createParticles, type ParticleSystem } from '../objects/Particles'
import { createTechIcon, type TechIconObject } from '../objects/TechIcon'

const TECH_STACK = [
    { name: 'Vue', hue: 140 },
    { name: 'Laravel', hue: 0 },
    { name: 'TypeScript', hue: 210 },
    { name: 'PostgreSQL', hue: 220 },
    { name: 'Docker', hue: 200 },
    { name: 'Redis', hue: 0 },
    { name: 'Tailwind', hue: 190 },
    { name: 'Three.js', hue: 0 },
    { name: 'GSAP', hue: 120 },
    { name: 'Inertia', hue: 260 },
    { name: 'Python', hue: 50 },
    { name: 'AWS', hue: 30 },
]

export function createScreenZone(tier: SceneTier): ZoneGroup {
    const group = new THREE.Group()
    group.name = 'ScreenZone'
    group.visible = false

    let particles: ParticleSystem | null = null
    const techIcons: TechIconObject[] = []

    async function setup(ctx: SceneContext) {
        particles = createParticles(tier, 'digital')
        group.add(particles.group)

        for (let i = 0; i < TECH_STACK.length; i++) {
            const icon = createTechIcon(TECH_STACK[i].name, TECH_STACK[i].hue, i)
            techIcons.push(icon)
            group.add(icon.mesh)
        }
    }

    function update(delta: number, progress: number) {
        const elapsed = performance.now() / 1000
        particles?.update(delta, elapsed)
        for (const icon of techIcons) {
            icon.update(elapsed)
        }
    }

    function setVisibility(visible: boolean) {
        group.visible = visible
    }

    function dispose() {
        particles?.dispose()
        for (const icon of techIcons) {
            icon.dispose()
        }
        techIcons.length = 0
    }

    return { id: 'screen', group, setup, update, setVisibility, dispose }
}
```

- [ ] **Step 3: Implement ConstellationZone**

```typescript
// resources/js/Components/Scene3D/zones/ConstellationZone.ts
import * as THREE from 'three'
import type { SceneContext, ZoneGroup } from '@/types/scene3d'
import type { Project } from '@/types/portfolio'
import { createProjectCard, type ProjectCardObject } from '../objects/ProjectCard'

export function createConstellationZone(projects: Project[]): ZoneGroup {
    const group = new THREE.Group()
    group.name = 'ConstellationZone'
    group.visible = false

    const cards: ProjectCardObject[] = []

    async function setup(ctx: SceneContext) {
        const displayProjects = projects.slice(0, 5)
        for (let i = 0; i < displayProjects.length; i++) {
            const card = createProjectCard(displayProjects[i], i)
            cards.push(card)
            group.add(card.group)
        }
    }

    function update(delta: number, progress: number) {
        const elapsed = performance.now() / 1000
        for (const card of cards) {
            card.update(elapsed)
        }
    }

    function setVisibility(visible: boolean) {
        group.visible = visible
    }

    function dispose() {
        for (const card of cards) {
            card.dispose()
        }
        cards.length = 0
    }

    return { id: 'constellation', group, setup, update, setVisibility, dispose }
}
```

- [ ] **Step 4: Implement OfferingZone**

```typescript
// resources/js/Components/Scene3D/zones/OfferingZone.ts
import * as THREE from 'three'
import type { SceneContext, ZoneGroup } from '@/types/scene3d'
import { createGlassPanel, type GlassPanelObject } from '../objects/GlassPanel'

const CAPABILITIES = [
    { title: 'Modular Monoliths', description: 'Domain-driven design with bounded contexts. Laravel modules that scale without microservice overhead.' },
    { title: 'Semantic Intelligence', description: 'AI/RAG pipelines that understand context. Embedding search, vector stores, LLM orchestration.' },
    { title: 'High-Perf Infrastructure', description: 'Redis caching, queue optimization, CDN strategy. Sub-100ms API responses at scale.' },
    { title: 'Gamification', description: 'Engagement mechanics that drive retention. Points, streaks, leaderboards, achievement systems.' },
]

export function createOfferingZone(): ZoneGroup {
    const group = new THREE.Group()
    group.name = 'OfferingZone'
    group.visible = false

    const panels: GlassPanelObject[] = []

    async function setup(ctx: SceneContext) {
        for (let i = 0; i < CAPABILITIES.length; i++) {
            const panel = createGlassPanel(CAPABILITIES[i].title, CAPABILITIES[i].description, i)
            panels.push(panel)
            group.add(panel.group)
        }
    }

    function update(delta: number, progress: number) {
        const elapsed = performance.now() / 1000
        for (const panel of panels) {
            panel.update(elapsed)
        }
    }

    function setVisibility(visible: boolean) {
        group.visible = visible
    }

    function dispose() {
        for (const panel of panels) {
            panel.dispose()
        }
        panels.length = 0
    }

    return { id: 'offering', group, setup, update, setVisibility, dispose }
}
```

- [ ] **Step 5: Implement ReturnZone**

This zone shares the WorkshopZone's avatar/workspace but shows them from a different angle. Rather than duplicating geometry, it signals the WorkshopZone to reappear and triggers the wave animation. It holds only a warm-light group of its own.

```typescript
// resources/js/Components/Scene3D/zones/ReturnZone.ts
import * as THREE from 'three'
import type { SceneContext, ZoneGroup } from '@/types/scene3d'

export function createReturnZone(): ZoneGroup {
    const group = new THREE.Group()
    group.name = 'ReturnZone'
    group.visible = false

    let warmLight: THREE.PointLight | null = null

    async function setup(ctx: SceneContext) {
        warmLight = new THREE.PointLight(0xffd4a0, 0, 50, 2)
        warmLight.position.set(0, 12, 2)
        group.add(warmLight)
    }

    function update(delta: number, progress: number) {
        if (warmLight) {
            warmLight.intensity = progress * 3
        }
    }

    function setVisibility(visible: boolean) {
        group.visible = visible
        if (warmLight) {
            warmLight.intensity = visible ? 1 : 0
        }
    }

    function dispose() {
        warmLight?.dispose()
    }

    return { id: 'return', group, setup, update, setVisibility, dispose }
}
```

- [ ] **Step 6: Verify all zones compile**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 7: Commit**

```bash
git add resources/js/Components/Scene3D/zones/
git commit -m "feat: add all 5 scroll zone implementations — Workshop, Screen, Constellation, Offering, Return"
```

---

### Task 11: Scroll Zones Composable — Master GSAP ScrollTrigger Timeline

**Files:**
- Create: `resources/js/Composables/useScrollZones.ts`

**Interfaces:**
- Consumes: `ZoneId`, `ZoneConfig`, `CameraKeyframe` from `types/scene3d.ts`; GSAP ScrollTrigger
- Produces: `useScrollZones(camera, zones, scrollContainer): { currentZone: Ref<ZoneId>, scrollProgress: Ref<number>, dispose() }`

- [ ] **Step 1: Implement useScrollZones composable**

```typescript
// resources/js/Composables/useScrollZones.ts
import { ref, onUnmounted } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ZoneId, ZoneGroup } from '@/types/scene3d'

gsap.registerPlugin(ScrollTrigger)

interface CameraKeyframe {
    position: [number, number, number]
    lookAt: [number, number, number]
    fov: number
}

const ZONE_CAMERAS: Record<ZoneId, { start: CameraKeyframe; end: CameraKeyframe }> = {
    workshop: {
        start: { position: [0, 13.1, 24.7], lookAt: [0, 10, 0], fov: 14.5 },
        end: { position: [0, 12, 8], lookAt: [0, 10, 0], fov: 20 },
    },
    screen: {
        start: { position: [0, 11.5, 5], lookAt: [0, 10, 0], fov: 30 },
        end: { position: [0, 8, 0], lookAt: [0, 8, 0], fov: 50 },
    },
    constellation: {
        start: { position: [0, 8, 20], lookAt: [0, 5, 0], fov: 35 },
        end: { position: [5, 6, 15], lookAt: [0, 4, -5], fov: 40 },
    },
    offering: {
        start: { position: [0, 5, 12], lookAt: [0, 3, 0], fov: 35 },
        end: { position: [0, 4, 10], lookAt: [0, 3, 0], fov: 30 },
    },
    return: {
        start: { position: [3, 12, 20], lookAt: [0, 10, 0], fov: 18 },
        end: { position: [0, 13, 22], lookAt: [0, 10, 0], fov: 16 },
    },
}

const ZONE_ORDER: ZoneId[] = ['workshop', 'screen', 'constellation', 'offering', 'return']

export function useScrollZones(
    camera: THREE.PerspectiveCamera,
    zones: ZoneGroup[],
    scrollContainer: HTMLElement
) {
    const currentZone = ref<ZoneId>('workshop')
    const scrollProgress = ref(0)
    const triggers: ScrollTrigger[] = []
    let masterTimeline: gsap.core.Timeline | null = null

    function init() {
        masterTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: scrollContainer,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    scrollProgress.value = self.progress

                    const zoneIndex = Math.min(
                        Math.floor(self.progress * ZONE_ORDER.length),
                        ZONE_ORDER.length - 1
                    )
                    const newZone = ZONE_ORDER[zoneIndex]

                    if (newZone !== currentZone.value) {
                        currentZone.value = newZone

                        for (const zone of zones) {
                            zone.setVisibility(zone.id === newZone ||
                                (newZone === 'return' && zone.id === 'workshop'))
                        }
                    }

                    const zoneProgress = (self.progress * ZONE_ORDER.length) - zoneIndex
                    const zoneId = ZONE_ORDER[zoneIndex]
                    const cam = ZONE_CAMERAS[zoneId]

                    camera.position.set(
                        THREE.MathUtils.lerp(cam.start.position[0], cam.end.position[0], zoneProgress),
                        THREE.MathUtils.lerp(cam.start.position[1], cam.end.position[1], zoneProgress),
                        THREE.MathUtils.lerp(cam.start.position[2], cam.end.position[2], zoneProgress),
                    )

                    const lookTarget = new THREE.Vector3(
                        THREE.MathUtils.lerp(cam.start.lookAt[0], cam.end.lookAt[0], zoneProgress),
                        THREE.MathUtils.lerp(cam.start.lookAt[1], cam.end.lookAt[1], zoneProgress),
                        THREE.MathUtils.lerp(cam.start.lookAt[2], cam.end.lookAt[2], zoneProgress),
                    )
                    camera.lookAt(lookTarget)

                    camera.fov = THREE.MathUtils.lerp(cam.start.fov, cam.end.fov, zoneProgress)
                    camera.updateProjectionMatrix()

                    const activeZone = zones.find(z => z.id === zoneId)
                    activeZone?.update(0.016, zoneProgress)
                },
            },
        })

        triggers.push(masterTimeline.scrollTrigger as ScrollTrigger)
    }

    function dispose() {
        triggers.forEach(t => t.kill())
        triggers.length = 0
        masterTimeline?.kill()
    }

    onUnmounted(dispose)

    return {
        currentZone,
        scrollProgress,
        init,
        dispose,
    }
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add resources/js/Composables/useScrollZones.ts
git commit -m "feat: add useScrollZones composable — master GSAP ScrollTrigger timeline with camera keyframes"
```

---

### Task 12: SceneOverlay Vue Component — HTML Overlay Layer

**Files:**
- Create: `resources/js/Components/Scene3D/SceneOverlay.vue`

**Interfaces:**
- Consumes: `ZoneId` from `types/scene3d.ts`; `Profile`, `Project`, `Experience`, `SocialLink`, `Education` from `types/portfolio.ts`; existing `ContactSection.vue`
- Produces: `<SceneOverlay>` component with slot-based zone content; emits `zone-enter(ZoneId)`

- [ ] **Step 1: Implement SceneOverlay component**

```vue
<!-- resources/js/Components/Scene3D/SceneOverlay.vue -->
<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { ZoneId } from '@/types/scene3d'
import type { Profile, Project, Experience, SocialLink, Education } from '@/types/portfolio'

const ContactSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/ContactSection.vue'))

const props = defineProps<{
    currentZone: ZoneId
    scrollProgress: number
    profile: Profile
    projects: Project[]
    experiences: Experience[]
    socialLinks: SocialLink[]
    educations: Education[]
}>()

const zoneOpacity = computed(() => {
    const zoneIndex = ['workshop', 'screen', 'constellation', 'offering', 'return'].indexOf(props.currentZone)
    const zoneProgress = (props.scrollProgress * 5) - zoneIndex
    if (zoneProgress < 0.05) return 0
    if (zoneProgress < 0.15) return (zoneProgress - 0.05) * 10
    if (zoneProgress > 0.85) return (0.95 - zoneProgress) * 10
    return 1
})

const displayedProjects = computed(() => props.projects.slice(0, 5))
</script>

<template>
    <div class="scene-overlay" aria-hidden="false">
        <!-- Zone 1: Workshop -->
        <section
            v-show="currentZone === 'workshop'"
            class="overlay-zone zone-workshop"
            :style="{ opacity: currentZone === 'workshop' ? zoneOpacity : 0 }"
        >
            <div class="zone-content">
                <h1 class="hero-title">
                    Hello, I'm <span class="text-teal">{{ profile.name }}</span>
                </h1>
                <p class="hero-subtitle">{{ profile.title }}</p>
                <p class="hero-tagline">Builder. Architect. Father.</p>
                <div class="scroll-hint" aria-label="Scroll to explore">
                    <span class="scroll-arrow" />
                </div>
            </div>
        </section>

        <!-- Zone 2: Into the Screen -->
        <section
            v-show="currentZone === 'screen'"
            class="overlay-zone zone-screen"
            :style="{ opacity: currentZone === 'screen' ? zoneOpacity : 0 }"
        >
            <div class="zone-content">
                <h2 class="section-title">9+ Years Engineering</h2>
                <p class="section-subtitle">Vue &middot; Laravel &middot; TypeScript &middot; PostgreSQL</p>
                <div class="capability-grid">
                    <div class="capability-card">
                        <h3>Modular Monoliths</h3>
                        <p>Domain-Driven Design</p>
                    </div>
                    <div class="capability-card">
                        <h3>Semantic Intelligence</h3>
                        <p>AI / RAG Pipelines</p>
                    </div>
                    <div class="capability-card">
                        <h3>High-Perf Infra</h3>
                        <p>Sub-100ms APIs</p>
                    </div>
                    <div class="capability-card">
                        <h3>Gamification</h3>
                        <p>Engagement Mechanics</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Zone 3: Constellation -->
        <section
            v-show="currentZone === 'constellation'"
            class="overlay-zone zone-constellation"
            :style="{ opacity: currentZone === 'constellation' ? zoneOpacity : 0 }"
        >
            <div class="zone-content">
                <h2 class="section-title">My Work</h2>
                <div class="project-list">
                    <div
                        v-for="project in displayedProjects"
                        :key="project.slug"
                        class="project-item"
                    >
                        <h3>{{ project.title }}</h3>
                        <p>{{ project.description }}</p>
                        <div class="project-tools">
                            <span v-for="tool in project.tools.slice(0, 4)" :key="tool" class="tool-tag">{{ tool }}</span>
                        </div>
                        <a v-if="project.externalUrl" :href="project.externalUrl" target="_blank" rel="noopener" class="project-link">
                            View Live
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Zone 4: Offering -->
        <section
            v-show="currentZone === 'offering'"
            class="overlay-zone zone-offering"
            :style="{ opacity: currentZone === 'offering' ? zoneOpacity : 0 }"
        >
            <div class="zone-content">
                <h2 class="section-title">What I Build</h2>
                <div class="timeline-strip">
                    <div v-for="exp in experiences" :key="exp.company" class="timeline-node">
                        <span class="timeline-company">{{ exp.company }}</span>
                        <span class="timeline-role">{{ exp.role }}</span>
                        <span class="timeline-date">{{ exp.dateRange }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Zone 5: Return -->
        <section
            v-show="currentZone === 'return'"
            class="overlay-zone zone-return"
            :style="{ opacity: currentZone === 'return' ? zoneOpacity : 0 }"
        >
            <div class="zone-content zone-content--full">
                <h2 class="section-title">Get In Touch</h2>
                <ContactSection
                    :profile="profile"
                    :social-links="socialLinks"
                    :educations="educations"
                />
                <footer class="scene-footer">
                    <p>3D desk model by <a href="https://sketchfab.com/mandeeprao10576" target="_blank" rel="noopener">mandeeprao10576</a> (CC-BY-4.0)</p>
                </footer>
            </div>
        </section>
    </div>
</template>

<style scoped>
.scene-overlay {
    position: fixed;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
}

.overlay-zone {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
}

.zone-content {
    max-width: 800px;
    padding: 2rem;
    pointer-events: auto;
}

.zone-content--full {
    max-width: 1200px;
    width: 100%;
}

.hero-title {
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 800;
    color: #e2e8f0;
    line-height: 1.1;
    margin: 0;
}

.text-teal {
    color: #5eead4;
}

.hero-subtitle {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    color: rgba(148, 163, 184, 0.9);
    margin-top: 0.75rem;
}

.hero-tagline {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: rgba(125, 211, 252, 0.8);
    margin-top: 0.5rem;
    letter-spacing: 0.08em;
}

.scroll-hint {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
}

.scroll-arrow {
    width: 24px;
    height: 24px;
    border-right: 2px solid rgba(94, 234, 212, 0.6);
    border-bottom: 2px solid rgba(94, 234, 212, 0.6);
    transform: rotate(45deg);
    animation: scrollBounce 2s ease-in-out infinite;
}

@keyframes scrollBounce {
    0%, 100% { transform: rotate(45deg) translateY(0); opacity: 0.6; }
    50% { transform: rotate(45deg) translateY(8px); opacity: 1; }
}

.section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: #e2e8f0;
    margin: 0 0 1.5rem;
}

.section-subtitle {
    font-size: 1.1rem;
    color: rgba(94, 234, 212, 0.8);
    letter-spacing: 0.12em;
}

.capability-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 1.5rem;
}

.capability-card {
    padding: 1.25rem;
    border: 1px solid rgba(94, 234, 212, 0.2);
    border-radius: 0.75rem;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(8px);
}

.capability-card h3 {
    color: #5eead4;
    font-size: 1rem;
    margin: 0 0 0.25rem;
}

.capability-card p {
    color: rgba(148, 163, 184, 0.8);
    font-size: 0.85rem;
    margin: 0;
}

.project-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.project-item {
    padding: 1.25rem;
    border: 1px solid rgba(94, 234, 212, 0.15);
    border-radius: 0.75rem;
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(8px);
}

.project-item h3 {
    color: #e2e8f0;
    font-size: 1.15rem;
    margin: 0 0 0.5rem;
}

.project-item p {
    color: rgba(148, 163, 184, 0.8);
    font-size: 0.85rem;
    margin: 0 0 0.75rem;
}

.project-tools {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
}

.tool-tag {
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    font-size: 0.7rem;
    color: rgba(94, 234, 212, 0.9);
    border: 1px solid rgba(94, 234, 212, 0.25);
    background: rgba(94, 234, 212, 0.08);
}

.project-link {
    display: inline-block;
    margin-top: 0.5rem;
    color: #22d3ee;
    font-size: 0.85rem;
    text-decoration: none;
}

.project-link:hover {
    text-decoration: underline;
}

.timeline-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
}

.timeline-node {
    padding: 1rem;
    border: 1px solid rgba(94, 234, 212, 0.2);
    border-radius: 0.75rem;
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(8px);
    min-width: 160px;
}

.timeline-company {
    display: block;
    color: #5eead4;
    font-weight: 600;
    font-size: 0.9rem;
}

.timeline-role {
    display: block;
    color: rgba(226, 232, 240, 0.8);
    font-size: 0.8rem;
    margin-top: 0.2rem;
}

.timeline-date {
    display: block;
    color: rgba(148, 163, 184, 0.6);
    font-size: 0.72rem;
    margin-top: 0.2rem;
}

.scene-footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(148, 163, 184, 0.15);
    text-align: center;
}

.scene-footer p {
    color: rgba(148, 163, 184, 0.5);
    font-size: 0.72rem;
}

.scene-footer a {
    color: rgba(94, 234, 212, 0.6);
    text-decoration: none;
}

@media (max-width: 768px) {
    .capability-grid {
        grid-template-columns: 1fr;
    }
}
</style>
```

- [ ] **Step 2: Verify it compiles**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add resources/js/Components/Scene3D/SceneOverlay.vue
git commit -m "feat: add SceneOverlay component — HTML overlay with zone-specific text content"
```

---

### Task 13: SceneCanvas Vue Component — Main 3D Wrapper

**Files:**
- Create: `resources/js/Components/Scene3D/SceneCanvas.vue`

**Interfaces:**
- Consumes: `useDeviceCapability()`, `useAssetLoader()`, `useSceneOrchestrator()`, `useScrollZones()`; zone factories from `zones/`; `SceneOverlay.vue`; `PortfolioPageProps` from `types/portfolio.ts`
- Produces: `<SceneCanvas>` component; emits `scene-ready`, `scene-progress(number)`

- [ ] **Step 1: Implement SceneCanvas component**

```vue
<!-- resources/js/Components/Scene3D/SceneCanvas.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { PortfolioPageProps } from '@/types/portfolio'
import type { AssetManifest, ZoneGroup } from '@/types/scene3d'
import { useSceneOrchestrator } from '@/Composables/useSceneOrchestrator'
import { useAssetLoader } from '@/Composables/useAssetLoader'
import { useScrollZones } from '@/Composables/useScrollZones'
import { createWorkshopZone } from './zones/WorkshopZone'
import { createScreenZone } from './zones/ScreenZone'
import { createConstellationZone } from './zones/ConstellationZone'
import { createOfferingZone } from './zones/OfferingZone'
import { createReturnZone } from './zones/ReturnZone'
import SceneOverlay from './SceneOverlay.vue'

const props = defineProps<PortfolioPageProps & { tier: 'full' | 'simplified' }>()

const emit = defineEmits<{
    'scene-ready': []
    'scene-progress': [percent: number]
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const scrollRef = ref<HTMLElement | null>(null)
const isReady = ref(false)

const orchestrator = useSceneOrchestrator(props.tier)
const { progress, loadAll } = useAssetLoader()
const zones: ZoneGroup[] = []

let scrollZones: ReturnType<typeof useScrollZones> | null = null

const ASSET_MANIFEST: AssetManifest = {
    avatar: '/models/ashish-avatar.glb',
    workspace: '/models/workspace-scene.glb',
    environment: '/models/environment.hdr',
}

onMounted(async () => {
    if (!canvasRef.value || !scrollRef.value) return

    const ctx = orchestrator.init(canvasRef.value)

    try {
        const assets = await loadAll(ASSET_MANIFEST)
        emit('scene-progress', progress.value.percent)

        orchestrator.setEnvironment(assets.envMap)

        const workshopZone = createWorkshopZone(assets, props.tier)
        const screenZone = createScreenZone(props.tier)
        const constellationZone = createConstellationZone(props.projects)
        const offeringZone = createOfferingZone()
        const returnZone = createReturnZone()

        zones.push(workshopZone, screenZone, constellationZone, offeringZone, returnZone)

        for (const zone of zones) {
            await zone.setup(ctx)
            orchestrator.addToScene(zone.group)
        }

        workshopZone.setVisibility(true)
        screenZone.setVisibility(false)
        constellationZone.setVisibility(false)
        offeringZone.setVisibility(false)
        returnZone.setVisibility(false)

        scrollZones = useScrollZones(ctx.camera, zones, scrollRef.value)
        scrollZones.init()

        orchestrator.onFrame((delta, elapsed) => {
            const activeZoneId = scrollZones?.currentZone.value ?? 'workshop'
            const activeZone = zones.find(z => z.id === activeZoneId)
            activeZone?.update(delta, scrollZones?.scrollProgress.value ?? 0)
        })

        isReady.value = true
        emit('scene-ready')
    } catch (error) {
        console.error('[SceneCanvas] Failed to initialize 3D scene:', error)
    }
})

onUnmounted(() => {
    for (const zone of zones) {
        zone.dispose()
    }
    zones.length = 0
    scrollZones?.dispose()
})
</script>

<template>
    <div class="scene-wrapper">
        <canvas
            ref="canvasRef"
            class="scene-canvas"
        />

        <SceneOverlay
            v-if="isReady && scrollZones"
            :current-zone="scrollZones.currentZone.value"
            :scroll-progress="scrollZones.scrollProgress.value"
            :profile="profile"
            :projects="projects"
            :experiences="experiences"
            :social-links="socialLinks"
            :educations="educations"
        />

        <div ref="scrollRef" class="scroll-spacer" />
    </div>
</template>

<style scoped>
.scene-wrapper {
    position: relative;
    width: 100%;
}

.scene-canvas {
    position: fixed;
    inset: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
}

.scroll-spacer {
    position: relative;
    height: 600vh;
    z-index: -1;
}
</style>
```

- [ ] **Step 2: Verify it compiles**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add resources/js/Components/Scene3D/SceneCanvas.vue
git commit -m "feat: add SceneCanvas component — fullscreen Three.js canvas with zone orchestration"
```

---

### Task 14: Integrate into Index.vue — Capability-Based Routing

**Files:**
- Modify: `resources/js/Pages/Portfolio/Index.vue`

**Interfaces:**
- Consumes: `useDeviceCapability()`, `SceneCanvas.vue`, existing PortfolioV2 components, `InitialLoader.vue`
- Produces: Updated `Index.vue` that renders `SceneCanvas` for capable devices or falls back to existing 2D layout

- [ ] **Step 1: Update Index.vue to add 3D/2D routing**

Replace the entire `<script setup>` and `<template>` blocks in `resources/js/Pages/Portfolio/Index.vue`:

```vue
<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'
import { Head } from '@inertiajs/vue3'
import type { PortfolioPageProps } from '@/types/portfolio'
import { useDeviceCapability } from '@/Composables/useDeviceCapability'
import CustomCursor from '@/Components/Portfolio/CustomCursor.vue'
import NavBar from '@/Components/PortfolioV2/NavBar.vue'
import InitialLoader from '@/Components/PortfolioV2/InitialLoader.vue'

const SceneCanvas = defineAsyncComponent(() => import('@/Components/Scene3D/SceneCanvas.vue'))

const ScrollySequence = defineAsyncComponent(() => import('@/Components/PortfolioV2/ScrollySequence.vue'))
const AboutSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/AboutSection.vue'))
const TimelineSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/TimelineSection.vue'))
const WorksSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/WorksSection.vue'))
const FeaturedCaseStudySection = defineAsyncComponent(() => import('@/Components/PortfolioV2/FeaturedCaseStudySection.vue'))
const TechStackSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/TechStackSection.vue'))
const ContactSection = defineAsyncComponent(() => import('@/Components/PortfolioV2/ContactSection.vue'))
import ChatWidget from '@/Components/PortfolioV2/ChatWidget.vue'

const props = defineProps<PortfolioPageProps>()

const { canRun3D, tier } = useDeviceCapability()

const linkedinLink = props.socialLinks.find(l => l.platform === 'linkedin')

const personSchema = computed(() => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: props.profile.name,
    url: 'https://www.ashishgupta.dev/',
    jobTitle: props.profile.title,
    description: props.profile.bio,
    email: props.profile.email,
    sameAs: props.socialLinks.map(l => l.url).filter(u => !u.startsWith('mailto:')),
    knowsAbout: Object.values(props.skills).flat().map((s: any) => s.name),
    worksFor: { '@type': 'Organization', name: 'Infosys' },
}))

const websiteSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://www.ashishgupta.dev/',
    name: 'Ashish Gupta',
    description: 'Senior Full-Stack Architect — VILT Stack Specialist',
})

const heroReady = ref(false)
const pageReady = ref(false)
const heroProgress = ref(0)
const minLoaderElapsed = ref(false)
let minTimer: number | null = null

const showInitialLoader = computed(() => {
    return !(heroReady.value && pageReady.value && minLoaderElapsed.value)
})

function handleHeroReady() {
    heroReady.value = true
}

function handleHeroProgress(value: number) {
    heroProgress.value = value
}

function handleSceneReady() {
    heroReady.value = true
    heroProgress.value = 100
}

function handleSceneProgress(percent: number) {
    heroProgress.value = percent
}

function handlePageLoaded() {
    pageReady.value = true
}

onMounted(() => {
    minTimer = window.setTimeout(() => {
        minLoaderElapsed.value = true
    }, 700)

    if (document.readyState === 'complete') {
        pageReady.value = true
    } else {
        window.addEventListener('load', handlePageLoaded, { once: true })
    }
})

onUnmounted(() => {
    if (minTimer) clearTimeout(minTimer)
    window.removeEventListener('load', handlePageLoaded)
})
</script>

<template>
    <Head :title="profile.name + ' — ' + profile.title">
        <meta name="description" :content="profile.bio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ashishgupta.dev/" />
        <meta :property="'og:title'" :content="profile.name + ' — ' + profile.title" />
        <meta property="og:description" :content="profile.bio" />
        <meta property="og:image" content="https://www.ashishgupta.dev/images/og-cover.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Ashish Gupta" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content="profile.name + ' — ' + profile.title" />
        <meta name="twitter:description" :content="profile.bio" />
        <meta name="twitter:image" content="https://www.ashishgupta.dev/images/og-cover.png" />
        <link rel="canonical" href="https://www.ashishgupta.dev/" />
        <component is="script" type="application/ld+json" v-html="personSchema" />
        <component is="script" type="application/ld+json" v-html="websiteSchema" />
    </Head>

    <div class="v2-page">
        <InitialLoader :visible="showInitialLoader" :progress="heroProgress" />

        <CustomCursor />

        <NavBar
            :initials="profile.name.split(' ').map(w => w[0]).join('')"
            :linkedin-url="linkedinLink?.url"
            :social-links="socialLinks"
            :resume-url="profile.resumeUrl"
        />

        <!-- 3D Experience for capable devices -->
        <template v-if="canRun3D">
            <SceneCanvas
                v-bind="props"
                :tier="tier === 'fallback' ? 'full' : tier"
                @scene-ready="handleSceneReady"
                @scene-progress="handleSceneProgress"
            />
        </template>

        <!-- 2D Fallback for mobile / no WebGL2 -->
        <template v-else>
            <ScrollySequence
                :name="profile.name"
                :title="profile.title"
                :subtitle="profile.subtitle"
                :image-url="profile.avatarUrl"
                @hero-ready="handleHeroReady"
                @hero-progress="handleHeroProgress"
            />

            <AboutSection :profile="profile" />
            <TimelineSection :experiences="experiences" />
            <WorksSection :projects="projects" />
            <FeaturedCaseStudySection />
            <TechStackSection :skills="skills" />
            <ContactSection
                :profile="profile"
                :social-links="socialLinks"
                :educations="educations"
            />
        </template>

        <ChatWidget />
    </div>
</template>

<style scoped>
.v2-page {
    min-height: 100vh;
    background: #090e14;
}

@media (min-width: 1024px) {
    .v2-page,
    .v2-page * {
        cursor: none;
    }
}
</style>
```

- [ ] **Step 2: Verify it compiles**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 3: Start dev server and test in browser**

```bash
npm run dev
```

Open `http://localhost:5173` in a desktop browser. Verify:
1. InitialLoader appears and shows progress
2. 3D canvas renders with workspace + avatar
3. Scrolling transitions through zones with camera movement
4. HTML overlay text appears/disappears per zone
5. Avatar typing animation plays in Zone 1
6. Head tracks mouse cursor
7. Resize the window — canvas resizes without distortion

- [ ] **Step 4: Test mobile fallback**

Open browser DevTools, toggle device emulation to a mobile viewport (<768px). Reload. Verify:
1. Existing 2D ScrollySequence renders (not the 3D canvas)
2. All PortfolioV2 sections appear normally
3. ChatWidget still works

- [ ] **Step 5: Commit**

```bash
git add resources/js/Pages/Portfolio/Index.vue
git commit -m "feat: integrate 3D scene into Index.vue with capability-based 3D/2D routing"
```

---

### Task 15: Visual Tuning and Performance Validation

**Files:**
- Possibly modify: `resources/js/Composables/useScrollZones.ts` (camera keyframe tuning)
- Possibly modify: `resources/js/Components/Scene3D/zones/WorkshopZone.ts` (avatar/workspace position/scale)
- Possibly modify: `resources/js/Components/Scene3D/SceneOverlay.vue` (text styling)

**Interfaces:**
- Consumes: Everything from prior tasks
- Produces: Polished visual output matching the design spec

This task is interactive and iterative. No pre-written code — the implementer must run the dev server, view the scene in the browser, and tune values until the experience looks right.

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Tune avatar and workspace positioning**

Open the browser, scroll through each zone. Adjust the following until the avatar appears seated at the desk naturally:
- `WorkshopZone.ts`: `avatar.group.position`, `avatar.group.scale`, `workspace.group.position`, `workspace.group.scale`
- Use browser console to check the workspace mesh names and find the actual chair position

- [ ] **Step 3: Tune camera keyframes per zone**

In `useScrollZones.ts`, adjust the `ZONE_CAMERAS` object for each zone until camera transitions feel smooth and cinematic. Key checks:
- Zone 1→2: Camera should accelerate toward the laptop screen
- Zone 2→3: Camera should pull back revealing galaxy-like space
- Zone 3→4: Smooth transition to abstract space
- Zone 4→5: Return to workspace from frontal angle

- [ ] **Step 4: Check 60fps performance**

Open browser DevTools → Performance panel → Record while scrolling through all zones. Verify:
- Frame rate stays at or above 55fps (target 60)
- No major GC pauses
- GPU memory stays reasonable

If frames drop:
- Reduce particle count in `Particles.ts`
- Lower shadow map resolution in `useSceneOrchestrator.ts`
- Ensure zone visibility culling is working (only active zone's group is visible)

- [ ] **Step 5: Run Lighthouse audit**

```bash
npx lighthouse http://localhost:5173 --output json --quiet
```

Check Performance score >= 85. If not, investigate LCP and FID.

- [ ] **Step 6: Commit tuned values**

```bash
git add -A
git commit -m "style: tune camera keyframes, avatar positioning, and zone transitions"
```

---

### Task 16: Cleanup Legacy Assets

**Files:**
- Delete: `resources/js/Composables/useCharacterScene.ts`
- Delete: `resources/js/Components/Character/CharacterScene.vue`

**Interfaces:**
- Consumes: nothing
- Produces: Cleaner codebase with no dead code

- [ ] **Step 1: Verify no imports reference the old composable**

```bash
grep -r "useCharacterScene" resources/js/ --include="*.ts" --include="*.vue"
grep -r "CharacterScene" resources/js/ --include="*.ts" --include="*.vue"
```

Expected: No results (or only the files themselves).

- [ ] **Step 2: Delete the old files**

```bash
rm resources/js/Composables/useCharacterScene.ts
rm -rf resources/js/Components/Character/
```

- [ ] **Step 3: Verify build succeeds**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove legacy useCharacterScene and CharacterScene — replaced by 3D scene system"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Zone 1 (Workshop): workspace + avatar + typing + head tracking + particles *(Tasks 5, 6, 7, 10)*
- [x] Zone 2 (Into the Screen): digital particles + tech icons *(Tasks 6, 8, 10)*
- [x] Zone 3 (Constellation): project cards *(Tasks 8, 10)*
- [x] Zone 4 (Offering): glass panels + career timeline *(Tasks 9, 10, 12)*
- [x] Zone 5 (Return): warm light + contact form + CC-BY-4.0 attribution *(Tasks 10, 12)*
- [x] Single canvas architecture *(Task 13)*
- [x] GSAP ScrollTrigger master timeline *(Task 11)*
- [x] Programmatic animation (breathing, typing, head tracking, wave, sway) *(Task 7)*
- [x] Mobile fallback routing *(Tasks 2, 14)*
- [x] Progressive asset loading with InitialLoader *(Task 3, 14)*
- [x] HDR environment + PMREMGenerator *(Task 4)*
- [x] SEO preservation (semantic HTML overlay) *(Task 12)*
- [x] New deps: troika-three-text + postprocessing *(Task 1)*
- [x] Performance validation *(Task 15)*
- [x] Legacy cleanup *(Task 16)*

**Placeholder scan:** No TBD, TODO, or "implement later" found.

**Type consistency:** `ZoneGroup`, `BoneRefs`, `SceneTier`, `LoadedAssets`, `AssetManifest` names match across all tasks.

**Note:** `troika-three-text` is installed (Task 1) but not yet used in the `ProjectCard.ts` — canvas-based text is used as a simpler initial approach. Troika can replace canvas text in a follow-up iteration for sharper SDF rendering if needed. Similarly, `postprocessing` is installed but bloom/vignette are deferred to the visual tuning pass (Task 15).
