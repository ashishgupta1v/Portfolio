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
