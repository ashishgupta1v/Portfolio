<script setup lang="ts">
import { ref, computed } from 'vue'
import { Play, RotateCcw } from 'lucide-vue-next'

interface DemoConfig {
    title: string
    description: string
    html: string
    css: string
    js: string
}

const props = defineProps<{
    slug: string
}>()

const demos: Record<string, DemoConfig> = {
    'zoeticoach-ai': {
        title: 'WhatsApp Message Flow',
        description: 'Interactive demo of the accountability check-in message flow.',
        html: `<div class="wa-chat">
  <div class="wa-msg bot">👋 Hey! Time for your daily check-in. How are you progressing on your goal?</div>
  <div class="wa-msg user" id="reply" style="display:none">I completed 2 out of 3 tasks today!</div>
  <div class="wa-msg bot" id="response" style="display:none">🎉 Great progress! You're 67% done. Keep pushing — consistency beats perfection. See you tomorrow!</div>
  <button class="wa-btn" id="sendBtn" onclick="sendReply()">Send Reply</button>
</div>`,
        css: `.wa-chat { max-width: 320px; margin: 0 auto; font-family: system-ui; }
.wa-msg { padding: 8px 12px; border-radius: 8px; margin: 6px 0; font-size: 14px; line-height: 1.5; }
.wa-msg.bot { background: #1a2e1a; color: #dcfce7; margin-right: 40px; }
.wa-msg.user { background: #065f46; color: #d1fae5; margin-left: 40px; }
.wa-btn { background: #25D366; color: white; border: none; padding: 8px 20px; border-radius: 20px; cursor: pointer; font-weight: 600; margin-top: 8px; width: 100%; }
.wa-btn:hover { opacity: 0.9; }
.wa-btn:disabled { opacity: 0.5; cursor: not-allowed; }`,
        js: `function sendReply() {
  document.getElementById('reply').style.display = 'block';
  document.getElementById('sendBtn').disabled = true;
  document.getElementById('sendBtn').textContent = 'Sending...';
  setTimeout(() => {
    document.getElementById('response').style.display = 'block';
    document.getElementById('sendBtn').textContent = '✓ Delivered';
  }, 1200);
}`,
    },
}

const demo = computed(() => demos[props.slug] || null)
const running = ref(false)

const srcDoc = computed(() => {
    if (!demo.value || !running.value) {
        return `<!DOCTYPE html><html><head><style>body { margin: 0; background: #0f1419; }</style></head><body></body></html>`
    }
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { padding: 18px 16px; background: #0f1419; color: #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    ${demo.value.css}
  </style>
</head>
<body>
  ${demo.value.html}
  <script>
    ${demo.value.js}
  <\/script>
</body>
</html>`
})

function runDemo() {
    if (!demo.value) return
    running.value = true
}

function resetDemo() {
    running.value = false
}
</script>

<template>
    <div v-if="demo" class="code-demo">
        <div class="demo-header">
            <h4 class="demo-title">{{ demo.title }}</h4>
            <p class="demo-desc">{{ demo.description }}</p>
        </div>
        <div class="demo-preview">
            <iframe
                class="demo-iframe"
                :srcdoc="srcDoc"
                sandbox="allow-scripts"
                title="Interactive demo"
            />
            <div
                v-if="!running"
                class="demo-overlay"
                role="button"
                tabindex="0"
                aria-label="Run interactive demo"
                @click="runDemo"
                @keydown.enter.prevent="runDemo"
                @keydown.space.prevent="runDemo"
            >
                <Play :size="32" class="demo-play-icon" aria-hidden="true" />
                <span>Run Demo</span>
            </div>
        </div>
        <div class="demo-controls">
            <button class="demo-btn" type="button" @click="runDemo">
                <Play :size="14" aria-hidden="true" />
                Run
            </button>
            <button class="demo-btn demo-btn--ghost" type="button" @click="resetDemo">
                <RotateCcw :size="14" aria-hidden="true" />
                Reset
            </button>
        </div>
    </div>
</template>

<style scoped>
.code-demo {
    margin: 1.5rem 0;
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    overflow: hidden;
    background: var(--card-bg-solid);
}

.demo-header {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border);
}

.demo-title {
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin: 0 0 0.3rem;
}

.demo-desc {
    color: var(--text-body);
    font-size: 0.85rem;
    margin: 0;
}

.demo-preview {
    position: relative;
    height: 280px;
    background: #0f1419;
}

.demo-iframe {
    width: 100%;
    height: 100%;
    border: none;
    background: #0f1419;
}

.demo-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: rgba(15, 20, 25, 0.85);
    color: var(--accent);
    cursor: pointer;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    transition: background 200ms;
}

.demo-overlay:hover {
    background: rgba(15, 20, 25, 0.7);
}

.demo-play-icon {
    opacity: 0.8;
}

.demo-controls {
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-top: 1px solid var(--border);
}

.demo-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.4rem 0.8rem;
    background: var(--accent);
    color: var(--text-on-accent);
    border: none;
    border-radius: 0.4rem;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 160ms;
}

.demo-btn:hover { opacity: 0.9; }

.demo-btn--ghost {
    background: transparent;
    color: var(--text-muted);
    border: 1px solid var(--border);
}

.demo-btn--ghost:hover {
    color: var(--text-body);
    border-color: var(--border-strong);
}
</style>
