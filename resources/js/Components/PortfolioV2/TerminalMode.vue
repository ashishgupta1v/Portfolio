<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

/* ------------------------------------------------------------------ */
/*  Konami code detector                                              */
/* ------------------------------------------------------------------ */
const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

const isOpen = ref(false)
const inputText = ref('')
const history = ref<{ type: 'input' | 'output'; text: string }[]>([])
const commandHistory = ref<string[]>([])
const historyIndex = ref(-1)
const outputEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)

let konamiPos = 0

const PROMPT = 'visitor@ashish.dev:~$ '

/* ------------------------------------------------------------------ */
/*  Commands                                                          */
/* ------------------------------------------------------------------ */

const COMMANDS: Record<string, () => string> = {
  help: () =>
    [
      'Available commands:',
      '',
      '  help             Show this help message',
      '  ls [projects]    List portfolio projects',
      '  cat about.md     About me',
      '  cat skills.txt   Technical skills',
      '  cat contact.json Contact information',
      '  whoami           Who are you?',
      '  hire --urgent    Hire me!',
      '  sudo hire        Try it and see',
      '  clear            Clear terminal',
      '  exit             Close terminal',
      '',
    ].join('\n'),

  ls: () =>
    [
      'drwxr-xr-x  projects/',
      '',
      '  ZoetiCoach AI',
      '  Krishan Balram Gaushala',
      '  Habuilt Tracker',
      '  Digital Builders',
      '  shaiyra',
      '',
    ].join('\n'),

  'cat about.md': () =>
    [
      '# Ashish Gupta',
      '',
      'Full-stack engineer who ships polished products end-to-end.',
      'I build with Laravel, Vue 3, TypeScript, and Node.js --',
      'turning complex problems into clean, performant experiences.',
      '',
      'Currently open to new opportunities.',
      '',
    ].join('\n'),

  'cat skills.txt': () =>
    [
      'LANGUAGES    TypeScript / JavaScript / PHP / SQL / HTML / CSS',
      'FRONTEND     Vue 3 / React / Tailwind CSS / GSAP / Three.js',
      'BACKEND      Laravel / Node.js / Express / REST APIs',
      'DATABASE     PostgreSQL / MySQL / Redis / MongoDB',
      'DEVOPS       Docker / CI-CD / AWS / Vercel / Nginx',
      'TOOLS        Git / Figma / Vite / Webpack / Linux',
      '',
    ].join('\n'),

  'cat contact.json': () =>
    JSON.stringify(
      {
        email: 'ashishgupta1v@gmail.com',
        phone: '+91-9087021592',
        linkedin: 'https://www.linkedin.com/in/ashish-gupta-dev/',
        website: 'https://ashishgupta.dev',
      },
      null,
      2,
    ) + '\n',

  whoami: () => 'visitor (anonymous)\n',

  'hire --urgent': () =>
    [
      '',
      "Opening WhatsApp... Just kidding! But seriously, reach out at",
      'ashishgupta1v@gmail.com or WhatsApp +91-9087021592',
      '',
    ].join('\n'),

  'sudo hire': () => "Permission denied. Try 'hire --urgent' instead ;)\n",
}

/* ------------------------------------------------------------------ */
/*  Execution                                                         */
/* ------------------------------------------------------------------ */

function execute(raw: string) {
  const cmd = raw.trim()
  if (!cmd) return

  // push to visible history
  history.value.push({ type: 'input', text: PROMPT + cmd })

  // push to command recall buffer
  commandHistory.value.push(cmd)
  historyIndex.value = commandHistory.value.length

  if (cmd === 'clear') {
    history.value = []
    return
  }

  if (cmd === 'exit') {
    isOpen.value = false
    return
  }

  // Normalize: `ls projects` and `ls` both hit the same handler
  const normalizedCmd = cmd === 'ls projects' ? 'ls' : cmd

  const handler = COMMANDS[normalizedCmd]
  if (handler) {
    history.value.push({ type: 'output', text: handler() })
  } else {
    history.value.push({
      type: 'output',
      text: `command not found: ${cmd}. Type 'help' for available commands.\n`,
    })
  }
}

function handleSubmit() {
  execute(inputText.value)
  inputText.value = ''
  nextTick(scrollToBottom)
}

function scrollToBottom() {
  if (outputEl.value) {
    outputEl.value.scrollTop = outputEl.value.scrollHeight
  }
}

/* ------------------------------------------------------------------ */
/*  Keyboard handling                                                 */
/* ------------------------------------------------------------------ */

function onGlobalKeydown(e: KeyboardEvent) {
  // Skip if user is typing in a form field (but not our terminal input)
  const tag = (e.target as HTMLElement)?.tagName
  if (!isOpen.value && (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT')) {
    return
  }

  // Konami detection (only when terminal is closed)
  if (!isOpen.value) {
    const expected = KONAMI[konamiPos]
    if (e.key === expected || e.key.toLowerCase() === expected) {
      konamiPos++
      if (konamiPos === KONAMI.length) {
        konamiPos = 0
        openTerminal()
      }
    } else {
      konamiPos = 0
    }
    return
  }

  // Terminal is open -- handle Escape
  if (e.key === 'Escape') {
    isOpen.value = false
    return
  }
}

function onTerminalKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (historyIndex.value > 0) {
      historyIndex.value--
      inputText.value = commandHistory.value[historyIndex.value]
    }
    return
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (historyIndex.value < commandHistory.value.length - 1) {
      historyIndex.value++
      inputText.value = commandHistory.value[historyIndex.value]
    } else {
      historyIndex.value = commandHistory.value.length
      inputText.value = ''
    }
    return
  }
}

/* ------------------------------------------------------------------ */
/*  Open / close helpers                                              */
/* ------------------------------------------------------------------ */

function openTerminal() {
  history.value = [
    {
      type: 'output',
      text: "Welcome to ashish.dev terminal v1.0.0\nType 'help' for available commands.\n",
    },
  ]
  commandHistory.value = []
  historyIndex.value = 0
  inputText.value = ''
  isOpen.value = true
}

watch(isOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    nextTick(() => inputEl.value?.focus())
  } else {
    document.body.style.overflow = ''
  }
})

/* ------------------------------------------------------------------ */
/*  Lifecycle                                                         */
/* ------------------------------------------------------------------ */

onMounted(() => {
  window.addEventListener('keydown', onGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="terminal">
      <div
        v-if="isOpen"
        class="terminal-overlay"
        @click.self="isOpen = false"
      >
        <div class="terminal-window" @click="inputEl?.focus()">
          <!-- Scanlines -->
          <div class="scanlines" aria-hidden="true" />

          <!-- Title bar -->
          <div class="terminal-titlebar">
            <span class="terminal-dot terminal-dot--red" />
            <span class="terminal-dot terminal-dot--yellow" />
            <span class="terminal-dot terminal-dot--green" />
            <span class="terminal-titlebar__text">visitor@ashish.dev: ~</span>
            <button
              class="terminal-close"
              aria-label="Close terminal"
              @click.stop="isOpen = false"
            >
              &times;
            </button>
          </div>

          <!-- Output area -->
          <div ref="outputEl" class="terminal-output">
            <div
              v-for="(line, i) in history"
              :key="i"
              :class="['terminal-line', `terminal-line--${line.type}`]"
            >
              <pre>{{ line.text }}</pre>
            </div>
          </div>

          <!-- Input line -->
          <form class="terminal-input-line" @submit.prevent="handleSubmit">
            <span class="terminal-prompt">{{ PROMPT }}</span>
            <input
              ref="inputEl"
              v-model="inputText"
              class="terminal-input"
              type="text"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              aria-label="Terminal input"
              @keydown="onTerminalKeydown"
            />
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ------------------------------------------------------------------ */
/*  Overlay                                                           */
/* ------------------------------------------------------------------ */
.terminal-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
}

/* ------------------------------------------------------------------ */
/*  Window                                                            */
/* ------------------------------------------------------------------ */
.terminal-window {
  position: relative;
  width: min(96vw, 900px);
  height: min(80vh, 600px);
  display: flex;
  flex-direction: column;
  background: #0a0e14;
  border: 1px solid #1a1f2b;
  border-radius: 8px;
  box-shadow: 0 0 60px rgba(34, 197, 94, 0.08), 0 0 2px rgba(34, 197, 94, 0.3);
  overflow: hidden;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #22c55e;
}

/* ------------------------------------------------------------------ */
/*  CRT scanline effect                                               */
/* ------------------------------------------------------------------ */
.scanlines {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 2;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
}

/* ------------------------------------------------------------------ */
/*  Title bar                                                         */
/* ------------------------------------------------------------------ */
.terminal-titlebar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: #111620;
  border-bottom: 1px solid #1a1f2b;
  user-select: none;
  flex-shrink: 0;
}

.terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-dot--red { background: #ff5f57; }
.terminal-dot--yellow { background: #febc2e; }
.terminal-dot--green { background: #28c840; }

.terminal-titlebar__text {
  flex: 1;
  text-align: center;
  font-size: 0.75rem;
  color: #5a6270;
}

.terminal-close {
  background: none;
  border: none;
  color: #5a6270;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  transition: color 0.15s;
}

.terminal-close:hover {
  color: #ff5f57;
}

/* ------------------------------------------------------------------ */
/*  Output area                                                       */
/* ------------------------------------------------------------------ */
.terminal-output {
  flex: 1;
  overflow-y: auto;
  padding: 12px 14px;
  scrollbar-width: thin;
  scrollbar-color: #1a1f2b transparent;
}

.terminal-output::-webkit-scrollbar {
  width: 6px;
}

.terminal-output::-webkit-scrollbar-thumb {
  background: #1a1f2b;
  border-radius: 3px;
}

.terminal-line pre {
  margin: 0;
  font: inherit;
  white-space: pre-wrap;
  word-break: break-word;
}

.terminal-line--input pre {
  color: #e0e0e0;
}

.terminal-line--output pre {
  color: #22c55e;
}

/* ------------------------------------------------------------------ */
/*  Input line                                                        */
/* ------------------------------------------------------------------ */
.terminal-input-line {
  display: flex;
  align-items: center;
  padding: 8px 14px 12px;
  border-top: 1px solid #1a1f2b;
  flex-shrink: 0;
}

.terminal-prompt {
  color: #22c55e;
  white-space: nowrap;
  flex-shrink: 0;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #e0e0e0;
  font: inherit;
  caret-color: #22c55e;
  padding: 0;
  margin: 0;
}

/* Blinking cursor via caret-color animation */
@keyframes blink-caret {
  0%, 49% { caret-color: #22c55e; }
  50%, 100% { caret-color: transparent; }
}

.terminal-input:focus {
  animation: blink-caret 1s step-end infinite;
}

/* ------------------------------------------------------------------ */
/*  Transitions                                                       */
/* ------------------------------------------------------------------ */
.terminal-enter-active {
  transition: opacity 0.2s ease;
}
.terminal-leave-active {
  transition: opacity 0.15s ease;
}
.terminal-enter-from,
.terminal-leave-to {
  opacity: 0;
}

.terminal-enter-active .terminal-window {
  animation: terminal-in 0.25s ease-out;
}
.terminal-leave-active .terminal-window {
  animation: terminal-out 0.15s ease-in forwards;
}

@keyframes terminal-in {
  from {
    transform: scale(0.95) translateY(10px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

@keyframes terminal-out {
  from {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  to {
    transform: scale(0.95) translateY(10px);
    opacity: 0;
  }
}

/* ------------------------------------------------------------------ */
/*  Reduced motion                                                    */
/* ------------------------------------------------------------------ */
@media (prefers-reduced-motion: reduce) {
  .terminal-enter-active,
  .terminal-leave-active {
    transition: none;
  }
  .terminal-enter-active .terminal-window,
  .terminal-leave-active .terminal-window {
    animation: none;
  }
  .scanlines {
    display: none;
  }
  .terminal-input:focus {
    animation: none;
    caret-color: #22c55e;
  }
}
</style>
