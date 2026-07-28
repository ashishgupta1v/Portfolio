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
