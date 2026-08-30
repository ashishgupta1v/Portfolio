<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
    compact?: boolean
}>(), {
    compact: false,
})

/**
 * Availability status — currently hardcoded.
 * TODO: Fetch from an API endpoint or site config (e.g. /api/availability)
 * so the owner can toggle status without a redeploy.
 *
 * Shape: { available: boolean, until: string | null }
 *   - available: true  -> green pulsing dot + "Available for Projects"
 *   - available: false -> amber static dot + "Booked until [until]"
 */
const availability = { available: true, until: null as string | null }

const statusText = computed(() => {
    if (availability.available) {
        return props.compact ? 'Open to Roles' : 'Open to Full-Time Remote Roles'
    }
    const until = availability.until ?? 'TBD'
    return props.compact ? `Starting ${until}` : `Starting new role ${until}`
})
</script>

<template>
    <span
        class="availability-badge"
        :class="{ compact }"
        role="status"
        :aria-label="statusText"
    >
        <span
            class="status-dot"
            :class="availability.available ? 'available' : 'booked'"
        />
        <span class="status-text">{{ statusText }}</span>
    </span>
</template>

<style scoped>
.availability-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted, var(--text-3));
    white-space: nowrap;
    user-select: none;
}

.status-dot {
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    flex-shrink: 0;
}

.status-dot.available::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 2px solid #22c55e;
    animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.status-dot.booked {
    background: #f59e0b;
}

@keyframes pulse-ring {
    0% {
        transform: scale(1);
        opacity: 0.6;
    }
    70% {
        transform: scale(1.8);
        opacity: 0;
    }
    100% {
        transform: scale(1.8);
        opacity: 0;
    }
}

/* When compact, hide text on very small viewports */
.compact .status-text {
    display: none;
}

@media (min-width: 1100px) {
    .compact .status-text {
        display: inline;
    }
}

/* ── Light Mode Polish ── */
:global([data-theme="light"]) .availability-badge {
    color: #475569;
}
</style>
