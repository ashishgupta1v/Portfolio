<script setup lang="ts">
defineProps<{
    text: string
}>()
</script>

<template>
    <button class="hover-link" data-cursor="disable" @click="$emit('click')">
        <div class="hover-link-inner">
            <span class="hover-text-top">{{ text }}</span>
            <span class="hover-text-bottom">{{ text }}</span>
        </div>
    </button>
</template>

<style scoped>
.hover-link {
    background: none;
    border: none;
    cursor: pointer;
    overflow: hidden;
    padding: 0;
}

.hover-link-inner {
    display: flex;
    flex-direction: column;
    transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1);
}

.hover-text-top,
.hover-text-bottom {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6);
    transition: color 0.3s ease;
    line-height: 1.5;
}

.hover-link:hover .hover-link-inner {
    transform: translateY(-100%);
}

.hover-link:hover .hover-text-bottom {
    color: var(--accent);
}
</style>
