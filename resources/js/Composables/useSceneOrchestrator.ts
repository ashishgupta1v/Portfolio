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
