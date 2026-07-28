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
