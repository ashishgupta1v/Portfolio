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
