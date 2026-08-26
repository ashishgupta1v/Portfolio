<script setup lang="ts">
import { ref, computed } from 'vue'

interface DiagramNode {
    id: string
    label: string
    tech: string
    x: number
    y: number
    color: string
}

interface DiagramEdge {
    from: string
    to: string
    label?: string
}

interface ArchitectureData {
    title: string
    nodes: DiagramNode[]
    edges: DiagramEdge[]
}

const props = defineProps<{
    slug: string
}>()

const activeNode = ref<string | null>(null)

const architectures: Record<string, ArchitectureData> = {
    'zoeticoach-ai': {
        title: 'ZoetiCoach AI Architecture',
        nodes: [
            { id: 'wa', label: 'WhatsApp API', tech: 'Webhook', x: 50, y: 30, color: '#25D366' },
            { id: 'api', label: 'Laravel API', tech: 'Laravel 13', x: 200, y: 30, color: '#FF2D20' },
            { id: 'ai', label: 'AI Engine', tech: 'OpenAI + pgvector', x: 350, y: 30, color: '#10a37f' },
            { id: 'db', label: 'Database', tech: 'PostgreSQL', x: 200, y: 130, color: '#336791' },
            { id: 'queue', label: 'Queue Worker', tech: 'Redis / Horizon', x: 350, y: 130, color: '#DC382D' },
            { id: 'ui', label: 'Dashboard', tech: 'Vue 3 + Inertia', x: 50, y: 130, color: '#42b883' },
        ],
        edges: [
            { from: 'wa', to: 'api', label: 'Webhook' },
            { from: 'api', to: 'ai', label: 'Prompt' },
            { from: 'api', to: 'db', label: 'CRUD' },
            { from: 'api', to: 'queue', label: 'Dispatch' },
            { from: 'ui', to: 'api', label: 'Inertia' },
            { from: 'queue', to: 'db', label: 'Process' },
        ],
    },
    'digital-builders': {
        title: 'Digital Builders Architecture',
        nodes: [
            { id: 'client', label: 'Client Portal', tech: 'Vue 3', x: 50, y: 30, color: '#42b883' },
            { id: 'api', label: 'API Gateway', tech: 'Laravel', x: 200, y: 30, color: '#FF2D20' },
            { id: 'agents', label: 'AI Agents', tech: 'Autonomous', x: 350, y: 30, color: '#a855f7' },
            { id: 'db', label: 'Database', tech: 'PostgreSQL', x: 120, y: 130, color: '#336791' },
            { id: 'deploy', label: 'CI/CD', tech: 'GitHub Actions', x: 280, y: 130, color: '#2088FF' },
        ],
        edges: [
            { from: 'client', to: 'api', label: 'REST' },
            { from: 'api', to: 'agents', label: 'Orchestrate' },
            { from: 'api', to: 'db', label: 'Store' },
            { from: 'agents', to: 'deploy', label: 'Ship' },
        ],
    },
}

const diagram = computed(() => architectures[props.slug] || null)

function getNodeById(id: string) {
    return diagram.value?.nodes.find(n => n.id === id)
}
</script>

<template>
    <div v-if="diagram" class="arch-diagram">
        <h4 class="arch-title">{{ diagram.title }}</h4>
        <svg class="arch-svg" viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Edges -->
            <g v-for="edge in diagram.edges" :key="`${edge.from}-${edge.to}`">
                <line
                    v-if="getNodeById(edge.from) && getNodeById(edge.to)"
                    :x1="getNodeById(edge.from)!.x + 50"
                    :y1="getNodeById(edge.from)!.y + 25"
                    :x2="getNodeById(edge.to)!.x + 50"
                    :y2="getNodeById(edge.to)!.y + 25"
                    class="arch-edge"
                    :class="{ highlighted: activeNode === edge.from || activeNode === edge.to }"
                />
                <text
                    v-if="getNodeById(edge.from) && getNodeById(edge.to) && edge.label"
                    :x="(getNodeById(edge.from)!.x + getNodeById(edge.to)!.x) / 2 + 50"
                    :y="(getNodeById(edge.from)!.y + getNodeById(edge.to)!.y) / 2 + 20"
                    class="arch-edge-label"
                >{{ edge.label }}</text>
            </g>

            <!-- Nodes -->
            <g
                v-for="node in diagram.nodes"
                :key="node.id"
                class="arch-node-group"
                :class="{ active: activeNode === node.id }"
                @mouseenter="activeNode = node.id"
                @mouseleave="activeNode = null"
            >
                <rect
                    :x="node.x"
                    :y="node.y"
                    width="100"
                    height="50"
                    rx="8"
                    class="arch-node-rect"
                    :style="{ '--node-color': node.color }"
                />
                <text :x="node.x + 50" :y="node.y + 20" class="arch-node-label">{{ node.label }}</text>
                <text :x="node.x + 50" :y="node.y + 36" class="arch-node-tech">{{ node.tech }}</text>
            </g>
        </svg>
    </div>
</template>

<style scoped>
.arch-diagram {
    margin: 1.5rem 0;
    padding: 1.25rem;
    background: var(--glass-bg);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
}

.arch-title {
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin: 0 0 1rem 0;
}

.arch-svg {
    width: 100%;
    max-width: 100%;
    height: auto;
}

.arch-edge {
    stroke: var(--border-strong);
    stroke-width: 1.5;
    stroke-dasharray: 4 3;
    transition: stroke 200ms, stroke-width 200ms;
}

.arch-edge.highlighted {
    stroke: var(--accent);
    stroke-width: 2;
    stroke-dasharray: none;
}

.arch-edge-label {
    fill: var(--text-muted);
    font-size: 8px;
    text-anchor: middle;
    font-weight: 600;
}

.arch-node-rect {
    fill: var(--card-bg-solid);
    stroke: var(--border);
    stroke-width: 1.5;
    cursor: pointer;
    transition: stroke 200ms, fill 200ms;
}

.arch-node-group.active .arch-node-rect {
    stroke: var(--node-color, var(--accent));
    stroke-width: 2;
    fill: rgba(var(--accent-rgb), 0.06);
}

.arch-node-label {
    fill: var(--text-heading);
    font-size: 10px;
    font-weight: 700;
    text-anchor: middle;
    pointer-events: none;
}

.arch-node-tech {
    fill: var(--text-muted);
    font-size: 8px;
    text-anchor: middle;
    pointer-events: none;
}
</style>
