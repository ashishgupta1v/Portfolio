<script setup lang="ts">
import { useToast } from '@/Composables/useToast'

const { toasts } = useToast()
</script>

<template>
    <Teleport to="body">
        <div class="toast-container" aria-live="polite" aria-atomic="true">
            <div
                v-for="toast in toasts"
                :key="toast.id"
                class="toast"
                :class="[`toast--${toast.type}`, { 'toast-out': toast.leaving }]"
                role="status"
            >
                {{ toast.message }}
            </div>
        </div>
    </Teleport>
</template>
