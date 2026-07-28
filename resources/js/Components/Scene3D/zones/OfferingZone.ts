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
