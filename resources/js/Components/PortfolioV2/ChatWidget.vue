<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { MessageSquare, X, Send, Sparkles } from 'lucide-vue-next'
import axios from 'axios'

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

const sendMessage = async () => {
    if (!input.value.trim()) return
    
    const userMsg = input.value.trim()
    messages.value.push({ role: 'user', content: userMsg })
    input.value = ''
    scrollToBottom()
    
    isTyping.value = true
    
    try {
        const response = await axios.post('/chat', {
            messages: messages.value
        })
        
        messages.value.push({ 
            role: 'assistant', 
            content: response.data.reply 
        })
    } catch (error: any) {
        console.error('Failed to get response from AI assistant:', error)
        
        let errorMessage = "Sorry, I am having trouble connecting to my system. Please try again, or contact Ashish directly at ashishgupta1v@gmail.com!"
        if (error.response?.data?.error) {
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
                        {{ msg.content }}
                    </div>
                    
                    <div v-if="isTyping" class="chat-bubble bubble-assistant typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                </div>
                
                <div class="chat-input-area">
                    <input 
                        v-model="input" 
                        type="text" 
                        placeholder="Ask a question..." 
                        @keyup.enter="sendMessage"
                    />
                    <button @click="sendMessage" :disabled="!input.trim() || isTyping">
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
    background: #0d9488;
}

.chat-toggle-btn.is-open {
    background: #1e293b;
    border: 1px solid rgba(94, 234, 212, 0.3);
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.4);
}

.chat-window {
    position: absolute;
    bottom: 4.5rem;
    left: 0;
    width: 340px;
    height: 480px;
    background: #0f172a;
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.chat-header {
    padding: 1rem;
    background: rgba(30, 41, 59, 0.8);
    display: flex;
    align-items: center;
    gap: 0.8rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.header-icon {
    color: #5eead4;
}

.header-text h3 {
    color: #f8fafc;
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0;
}

.header-text p {
    color: #94a3b8;
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
    background: rgba(148, 163, 184, 0.3);
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
    background: #1e293b;
    color: #e2e8f0;
    border-bottom-left-radius: 0.2rem;
}

.typing-indicator {
    display: flex;
    gap: 0.3rem;
    padding: 1rem;
}

.typing-indicator span {
    width: 6px;
    height: 6px;
    background: #94a3b8;
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
    background: #0f172a;
    border-top: 1px solid rgba(148, 163, 184, 0.1);
    display: flex;
    gap: 0.5rem;
}

.chat-input-area input {
    flex: 1;
    background: #1e293b;
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    color: #f8fafc;
    font-size: 0.85rem;
    outline: none;
    transition: border-color 0.2s;
}

.chat-input-area input:focus {
    border-color: #5eead4;
}

.chat-input-area button {
    background: #5eead4;
    color: #0f172a;
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
