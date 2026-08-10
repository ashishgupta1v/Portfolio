<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const count = ref<number | null>(null)

onMounted(async () => {
    try {
        const { data } = await axios.get('/api/visitor-count')
        count.value = data.active ?? null
    } catch {
        // Silent fail — decorative feature
    }
})
</script>

<template>
    <span v-if="count !== null" class="visitor-count" :title="`${count} active visitor${count !== 1 ? 's' : ''}`">
        <span class="vc-dot" />
        <span class="vc-num">{{ count }}</span>
        <span class="vc-label">online</span>
    </span>
</template>

<style scoped>
.visitor-count {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
}

.vc-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22c55e;
    animation: vc-pulse 2.5s ease-in-out infinite;
}

@keyframes vc-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
}

.vc-num {
    color: var(--text-body);
    font-variant-numeric: tabular-nums;
}
</style>
