<script setup lang="ts">
import { ref } from 'vue'
import { Link2, Check } from 'lucide-vue-next'

const props = defineProps<{
    url: string
    title: string
    description?: string
}>()

const copied = ref(false)

function shareLinkedIn() {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(props.url)}`
    window.open(shareUrl, '_blank', 'width=600,height=500')
}

function shareTwitter() {
    const text = `${props.title}${props.description ? ' — ' + props.description : ''}`
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(props.url)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
}

async function copyLink() {
    try {
        await navigator.clipboard.writeText(props.url)
        copied.value = true
        setTimeout(() => { copied.value = false }, 2000)
    } catch {
        // Fallback for older browsers
        const input = document.createElement('input')
        input.value = props.url
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
        copied.value = true
        setTimeout(() => { copied.value = false }, 2000)
    }
}
</script>

<template>
    <div class="share-buttons">
        <span class="share-label">Share</span>
        <button class="share-btn" @click="shareLinkedIn" title="Share on LinkedIn" aria-label="Share on LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </button>
        <button class="share-btn" @click="shareTwitter" title="Share on X (Twitter)" aria-label="Share on X">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </button>
        <button class="share-btn" :class="{ copied }" @click="copyLink" :title="copied ? 'Copied!' : 'Copy link'" :aria-label="copied ? 'Link copied' : 'Copy link'">
            <Check v-if="copied" :size="16" />
            <Link2 v-else :size="16" />
        </button>
    </div>
</template>

<style scoped>
.share-buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.share-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
}

.share-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 0.4rem;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

.share-btn:hover {
    color: var(--accent);
    border-color: rgba(var(--accent-rgb), 0.4);
    background: rgba(var(--accent-rgb), 0.06);
}

.share-btn.copied {
    color: #22c55e;
    border-color: rgba(34, 197, 94, 0.4);
}
</style>
