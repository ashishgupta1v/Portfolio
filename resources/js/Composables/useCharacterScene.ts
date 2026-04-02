import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three-stdlib'
import { DRACOLoader } from 'three-stdlib'
import { RGBELoader } from 'three-stdlib'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CharacterSceneOptions {
    canvas: Ref<HTMLCanvasElement | null>
    modelPath?: string
    hdrPath?: string
    onProgress?: (percent: number) => void
    onReady?: () => void
}

export function useCharacterScene(options: CharacterSceneOptions) {
    const isLoaded = ref(false)
    const loadProgress = ref(0)

    let renderer: THREE.WebGLRenderer | null = null
    let scene: THREE.Scene | null = null
    let camera: THREE.PerspectiveCamera | null = null
    let mixer: THREE.AnimationMixer | null = null
    let character: THREE.Object3D | null = null
    let headBone: THREE.Bone | null = null
    let clock = new THREE.Clock()
    let animationId: number | null = null
    let mouse = { x: 0, y: 0 }
    let interpolation = { x: 0.04, y: 0.04 }
    const triggers: ScrollTrigger[] = []

    function initScene() {
        if (!options.canvas.value) return

        const canvas = options.canvas.value
        const rect = canvas.getBoundingClientRect()

        // Renderer
        renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
        })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(rect.width, rect.height)
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap

        // Scene
        scene = new THREE.Scene()

        // Camera
        camera = new THREE.PerspectiveCamera(14.5, rect.width / rect.height, 0.1, 1000)
        camera.position.set(0, 13.1, 24.7)
        camera.zoom = 1.1
        camera.updateProjectionMatrix()

        // Lighting
        setupLighting()

        // Load Model
        if (options.modelPath) {
            loadCharacter(options.modelPath)
        } else {
            // No model — render empty scene with placeholder
            isLoaded.value = true
            loadProgress.value = 100
            options.onProgress?.(100)
            options.onReady?.()
        }

        // Events
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('touchmove', onTouchMove)
        window.addEventListener('resize', onResize)

        // Start render loop
        animate()
    }

    function setupLighting() {
        if (!scene) return

        // Directional light (accent color)
        const dirLight = new THREE.DirectionalLight(0x5eead4, 0)
        dirLight.position.set(-0.47, -0.32, -1).normalize()
        dirLight.castShadow = true
        dirLight.shadow.mapSize.set(1024, 1024)
        scene.add(dirLight)

        // Point light
        const pointLight = new THREE.PointLight(0x22d3ee, 0, 100, 3)
        pointLight.position.set(3, 12, 4)
        scene.add(pointLight)

        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
        scene.add(ambientLight)

        // Turn on lights with animation
        gsap.to(dirLight, {
            intensity: 1,
            duration: 2,
            ease: 'power2.inOut',
            delay: 1,
        })

        gsap.to(pointLight, {
            intensity: 2,
            duration: 2,
            ease: 'power2.inOut',
            delay: 1.5,
        })

        // Load HDR environment
        if (options.hdrPath) {
            const rgbeLoader = new RGBELoader()
            rgbeLoader.load(options.hdrPath, (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping
                if (scene) {
                    scene.environment = texture
                    scene.environmentIntensity = 0
                    gsap.to(scene, {
                        environmentIntensity: 0.64,
                        duration: 2,
                        ease: 'power2.inOut',
                        delay: 1,
                    })
                }
            })
        }
    }

    function loadCharacter(path: string) {
        const loader = new GLTFLoader()
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')
        loader.setDRACOLoader(dracoLoader)

        loader.load(
            path,
            (gltf) => {
                if (!scene || !renderer) return

                character = gltf.scene
                scene.add(character)

                // Log skeleton info for debugging
                if (import.meta.env.DEV) {
                    const bones: string[] = []
                    character.traverse((child) => {
                        if (child instanceof THREE.Bone) bones.push(child.name)
                    })
                    console.log('[Character] Bones found:', bones)
                    console.log('[Character] Animations:', gltf.animations.map(a => a.name))
                }

                // Setup animations
                if (gltf.animations.length > 0) {
                    mixer = new THREE.AnimationMixer(character)
                    gltf.animations.forEach((clip) => {
                        const action = mixer!.clipAction(clip)
                        action.play()
                    })
                }

                // Find head bone — supports multiple rig conventions:
                // Blender Rigify: 'spine006' | Mixamo: 'mixamorig:Head' | RPM/Standard: 'Head'
                const headBoneNames = ['spine006', 'Head', 'head', 'mixamorig:Head', 'mixamorig_Head']
                character.traverse((child) => {
                    if (
                        child instanceof THREE.Bone &&
                        !headBone &&
                        headBoneNames.includes(child.name)
                    ) {
                        headBone = child
                    }
                    if (child instanceof THREE.Mesh) {
                        child.castShadow = true
                        child.receiveShadow = true
                    }
                })

                if (import.meta.env.DEV) {
                    console.log('[Character] Head bone:', headBone?.name ?? 'NOT FOUND')
                }

                // Compile shaders
                renderer.compile(scene, camera!)

                // Setup scroll triggers
                setupScrollTimeline()

                dracoLoader.dispose()

                isLoaded.value = true
                loadProgress.value = 100
                options.onProgress?.(100)
                options.onReady?.()
            },
            (xhr) => {
                if (xhr.total > 0) {
                    const pct = Math.round((xhr.loaded / xhr.total) * 100)
                    loadProgress.value = pct
                    options.onProgress?.(pct)
                }
            },
            (error) => {
                console.error('Error loading character model:', error)
            },
        )
    }

    function setupScrollTimeline() {
        if (!character || !camera) return

        // Landing section: rotate character and zoom out
        const tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: '.landing-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
        })
        tl1.to(character.rotation, { y: 0.7, duration: 1 })
        tl1.to(camera.position, { z: 22, duration: 1 }, '<')

        triggers.push(tl1.scrollTrigger as ScrollTrigger)

        // About section: camera moves
        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top center',
                end: 'bottom center',
                scrub: 1,
            },
        })
        tl2.to(camera.position, { z: 75, y: 8.4, duration: 6 })
        if (character) {
            tl2.to(character.rotation, { y: 0.92, x: 0.12, duration: 3 }, '<')
        }

        triggers.push(tl2.scrollTrigger as ScrollTrigger)
    }

    function onMouseMove(e: MouseEvent) {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    function onTouchMove(e: TouchEvent) {
        if (e.touches.length > 0) {
            mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
            mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1
        }
    }

    function onResize() {
        if (!renderer || !camera || !options.canvas.value) return
        const rect = options.canvas.value.getBoundingClientRect()
        renderer.setSize(rect.width, rect.height)
        camera.aspect = rect.width / rect.height
        camera.updateProjectionMatrix()
    }

    function updateHeadRotation() {
        if (!headBone) return
        const maxRotation = Math.PI / 6
        const targetY = mouse.x * maxRotation
        const targetX = -mouse.y * maxRotation * 0.5

        headBone.rotation.y += (targetY - headBone.rotation.y) * interpolation.y
        headBone.rotation.x += (targetX - headBone.rotation.x) * interpolation.x
    }

    function animate() {
        animationId = requestAnimationFrame(animate)

        const delta = clock.getDelta()
        if (mixer) mixer.update(delta)

        updateHeadRotation()

        if (renderer && scene && camera) {
            renderer.render(scene, camera)
        }
    }

    function dispose() {
        if (animationId) cancelAnimationFrame(animationId)
        triggers.forEach((t) => t.kill())
        triggers.length = 0
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('resize', onResize)
        renderer?.dispose()
        scene?.clear()
    }

    onMounted(initScene)
    onUnmounted(dispose)

    return {
        isLoaded,
        loadProgress,
    }
}
