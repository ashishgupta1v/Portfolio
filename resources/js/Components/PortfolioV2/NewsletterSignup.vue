<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const loading = ref(false)
const feedback = ref<{ success: boolean; message: string } | null>(null)

async function subscribe() {
    if (!email.value) return

    loading.value = true
    feedback.value = null

    try {
        const { data } = await axios.post('/newsletter/subscribe', {
            email: email.value,
            source: 'website',
        })
        feedback.value = { success: data.success, message: data.message }
        if (data.success) email.value = ''
    } catch (err: any) {
        const msg =
            err.response?.data?.message ??
            'Something went wrong. Please try again.'
        feedback.value = { success: false, message: msg }
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="nl-wrap">
        <form class="nl-form" @submit.prevent="subscribe">
            <input
                id="newsletter-email"
                v-model="email"
                type="email"
                class="nl-input"
                placeholder="your@email.com"
                aria-label="Email address for newsletter"
                required
                :disabled="loading"
            />
            <button type="submit" class="nl-btn" :disabled="loading" aria-label="Subscribe to newsletter">
                {{ loading ? 'Subscribing...' : 'Subscribe' }}
            </button>
        </form>
        <p
            v-if="feedback"
            class="nl-feedback"
            :class="{ 'nl-feedback--error': !feedback.success }"
            role="status"
            aria-live="polite"
        >
            {{ feedback.message }}
        </p>
    </div>
</template>

<style scoped>
.nl-wrap {
    margin-top: 0.6rem;
}

.nl-form {
    display: flex;
    gap: 0.5rem;
    max-width: 420px;
}

.nl-input {
    flex: 1;
    background: var(--surface, var(--glass-bg));
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-1);
    font-size: 0.88rem;
    font-family: inherit;
    padding: 0.55rem 0.75rem;
    outline: none;
    transition: border-color 0.25s;
}

.nl-input:focus {
    border-color: rgba(var(--accent-rgb), 0.5);
}

.nl-input::placeholder {
    color: var(--text-muted, var(--text-3));
}

.nl-btn {
    white-space: nowrap;
    background: var(--accent);
    color: var(--text-on-accent);
    border: none;
    border-radius: 4px;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    padding: 0.55rem 1.1rem;
    cursor: pointer;
    transition: opacity 0.25s;
}

.nl-btn:hover:not(:disabled) {
    opacity: 0.88;
}

.nl-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.nl-feedback {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: var(--accent);
}

.nl-feedback--error {
    color: #f87171;
}
</style>
