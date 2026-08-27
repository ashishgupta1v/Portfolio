<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { MessageSquare, X, Send, Sparkles } from 'lucide-vue-next'
import axios from 'axios'

/**
 * Renders a small, whitelisted subset of Markdown to HTML.
 *
 * Deliberately not a real Markdown library: the input comes from an LLM whose
 * output can be prompt-injected, so we HTML-escape first and only then apply
 * transformations for a fixed set of patterns. That means no <script> tag,
 * event handler, or arbitrary HTML can survive from the model's reply — even
 * if the model tries. Supported: **bold**, *italic*, `code`, [text](url) with
 * an http(s) URL, single-level bullet and numbered lists, paragraph breaks.
 */
function renderChatMarkdown(input: string): string {
    const escaped = input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')

    const lines = escaped.split(/\r?\n/)
    const out: string[] = []
    let listMode: 'ul' | 'ol' | null = null

    function closeList() {
        if (listMode) {
            out.push(`</${listMode}>`)
            listMode = null
        }
    }

    for (const raw of lines) {
        const line = raw.trimEnd()
        const bullet = line.match(/^\s*[-*]\s+(.*)$/)
        const numbered = line.match(/^\s*\d+\.\s+(.*)$/)

        if (bullet) {
            if (listMode !== 'ul') { closeList(); out.push('<ul>'); listMode = 'ul' }
            out.push(`<li>${inline(bullet[1])}</li>`)
        } else if (numbered) {
            if (listMode !== 'ol') { closeList(); out.push('<ol>'); listMode = 'ol' }
            out.push(`<li>${inline(numbered[1])}</li>`)
        } else if (line === '') {
            closeList()
            out.push('')
        } else {
            closeList()
            out.push(`<p>${inline(line)}</p>`)
        }
    }
    closeList()
    return out.join('')
}

function inline(text: string): string {
    return text
        // Inline code first, so ** inside `` is treated as code.
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Links — only http/https, and the URL is re-escaped for quotes.
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
            (_m, label, url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`)
        // Bold before italic so **word** doesn't consume as italic-in-italic.
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
}

const isOpen = ref(false)
const input = ref('')
const messages = ref<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: 'Hi! I am Ashish\'s AI assistant. Ask me about his tech stack, work experience, or how to contact him.' }
])
const isTyping = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const toggleChat = () => {
    isOpen.value = !isOpen.value
}

const scrollToBottom = async () => {
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

// Mirrors the server-side caps in ChatController.
const MAX_HISTORY = 10
const MAX_INPUT_LENGTH = 1000

const sendMessage = async () => {
    // Guard re-entry: without this, a fast double-submit fires two requests
    // and interleaves two replies into the transcript.
    if (isTyping.value) return

    const userMsg = input.value.trim().slice(0, MAX_INPUT_LENGTH)
    if (!userMsg) return

    messages.value.push({ role: 'user', content: userMsg })
    input.value = ''
    scrollToBottom()

    isTyping.value = true

    try {
        const response = await axios.post('/chat', {
            // Send only the trailing turns. The server caps this too, but
            // there is no reason to put the whole transcript on the wire.
            messages: messages.value.slice(-MAX_HISTORY)
        })

        messages.value.push({ 
            role: 'assistant', 
            content: response.data.reply 
        })
    } catch (error: any) {
        console.error('Failed to get response from AI assistant:', error)

        let errorMessage = "Sorry, I am having trouble connecting to my system. Please try again, or contact Ashish directly at ashishgupta1v@gmail.com!"

        if (error.response?.status === 429) {
            // Laravel's throttle middleware replies with `message`, not `error`,
            // so this would otherwise surface as a generic connection failure.
            errorMessage = "That's a lot of questions at once! Give me a moment and try again."
        } else if (error.response?.data?.error) {
            errorMessage = error.response.data.error
        }


        messages.value.push({
            role: 'assistant',
            content: errorMessage
        })
    } finally {
        isTyping.value = false
        scrollToBottom()
    }
}
</script>

<template>
    <div class="chat-widget-wrapper">
        <!-- Chat Button -->
        <button 
            @click="toggleChat" 
            class="chat-toggle-btn"
            :class="{ 'is-open': isOpen }"
            aria-label="Toggle AI Assistant"
        >
            <X v-if="isOpen" :size="24" />
            <MessageSquare v-else :size="24" />
        </button>

        <!-- Chat Window -->
        <Transition name="slide-up">
            <div v-if="isOpen" class="chat-window">
                <div class="chat-header">
                    <Sparkles :size="18" class="header-icon" />
                    <div class="header-text">
                        <h3>AI Assistant</h3>
                        <p>Ask anything about my work</p>
                    </div>
                </div>
                
                <div class="chat-messages" ref="messagesContainer">
                    <div
                        v-for="(msg, idx) in messages"
                        :key="idx"
                        class="chat-bubble"
                        :class="msg.role === 'user' ? 'bubble-user' : 'bubble-assistant'"
                    >
                        <!-- User input stays plain text (no HTML escape needed, Vue does it).
                             Assistant replies pass through the whitelist renderer so lists,
                             links, bold and inline code from the model render correctly. -->
                        <template v-if="msg.role === 'user'">{{ msg.content }}</template>
                        <div v-else class="bubble-md" v-html="renderChatMarkdown(msg.content)" />
                    </div>
                    
                    <div v-if="isTyping" class="chat-bubble bubble-assistant typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                </div>
                
                <div class="chat-input-area">
                    <input
                        v-model="input"
                        type="text"
                        :maxlength="MAX_INPUT_LENGTH"
                        :disabled="isTyping"
                        placeholder="Ask a question..."
                        aria-label="Ask Ashish's AI assistant a question"
                        @keyup.enter="sendMessage"
                    />
                    <button @click="sendMessage" :disabled="!input.trim() || isTyping" aria-label="Send message to AI assistant">
                        <Send :size="18" />
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.chat-widget-wrapper {
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    z-index: 1000;
}

.chat-toggle-btn {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: #14b8a6;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(20, 184, 166, 0.4);
    transition: all 0.3s ease;
}

.chat-toggle-btn:hover {
    transform: scale(1.05);
    background: var(--accent);
}

.chat-toggle-btn.is-open {
    background: var(--card-bg-solid);
    border: 1px solid rgba(var(--accent-rgb), 0.3);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
}

.chat-window {
    position: absolute;
    bottom: 4.5rem;
    left: 0;
    width: 340px;
    height: 480px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.chat-header {
    padding: 1rem;
    background: var(--card-bg-strong);
    display: flex;
    align-items: center;
    gap: 0.8rem;
    border-bottom: 1px solid var(--border);
}

.header-icon {
    color: var(--accent);
}

.header-text h3 {
    color: var(--text-1);
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0;
}

.header-text p {
    color: var(--text-2);
    font-size: 0.75rem;
    margin: 0;
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.chat-messages::-webkit-scrollbar {
    width: 4px;
}

.chat-messages::-webkit-scrollbar-thumb {
    background: var(--border-strong);
    border-radius: 4px;
}

.chat-bubble {
    max-width: 85%;
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    font-size: 0.85rem;
    line-height: 1.5;
}

.bubble-user {
    align-self: flex-end;
    background: #14b8a6;
    color: white;
    border-bottom-right-radius: 0.2rem;
}

.bubble-assistant {
    align-self: flex-start;
    background: var(--card-bg-solid);
    color: var(--text-heading);
    border-bottom-left-radius: 0.2rem;
}

/* Markdown-rendered assistant replies. Kept tight so a short reply doesn't
   grow tall from block spacing that a chat bubble does not need. */
.bubble-md :deep(p) { margin: 0; }
.bubble-md :deep(p + p) { margin-top: 0.5rem; }
.bubble-md :deep(ul),
.bubble-md :deep(ol) { margin: 0.4rem 0 0.4rem 1.1rem; padding: 0; display: grid; gap: 0.2rem; }
.bubble-md :deep(li) { line-height: 1.45; }
.bubble-md :deep(strong) { color: var(--text-1); font-weight: 700; }
.bubble-md :deep(em) { font-style: italic; color: var(--text-2); }
.bubble-md :deep(code) {
    font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
    font-size: 0.82em;
    padding: 0.08rem 0.32rem;
    border-radius: 0.28rem;
    background: var(--card-bg);
    color: var(--accent);
}
.bubble-md :deep(a) {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 2px;
}
.bubble-md :deep(a:hover) { color: rgba(var(--accent-rgb), 0.7); }

.typing-indicator {
    display: flex;
    gap: 0.3rem;
    padding: 1rem;
}

.typing-indicator span {
    width: 6px;
    height: 6px;
    background: var(--text-2);
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
}

.chat-input-area {
    padding: 1rem;
    background: var(--bg-elevated);
    border-top: 1px solid var(--border);
    display: flex;
    gap: 0.5rem;
}

.chat-input-area input {
    flex: 1;
    background: var(--card-bg-solid);
    border: 1px solid var(--border);
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    color: var(--text-1);
    font-size: 0.85rem;
    outline: none;
    transition: border-color 0.2s;
}

.chat-input-area input:focus {
    border-color: var(--accent);
}

.chat-input-area button {
    background: var(--accent);
    color: var(--text-on-accent);
    border: none;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
}

.chat-input-area button:hover:not(:disabled) {
    background: #14b8a6;
}

.chat-input-area button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    transform-origin: bottom left;
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
}

@media (max-width: 480px) {
    .chat-widget-wrapper {
        bottom: 1rem;
        left: 1rem;
    }
    .chat-window {
        width: calc(100vw - 2rem);
        height: 400px;
    }
}
</style>
