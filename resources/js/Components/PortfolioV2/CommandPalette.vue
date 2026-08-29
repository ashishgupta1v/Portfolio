<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, nextTick, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import {
    Search,
    User,
    Briefcase,
    FolderOpen,
    Cpu,
    Mail,
    ArrowUp,
    BookOpen,
    Layers,
    Handshake,
    SunMoon,
    FileDown,
    Command,
} from 'lucide-vue-next'
import { useTheme } from '@/Composables/useTheme'

const { theme, setTheme } = useTheme()

// ─── State ────────────────────────────────────────────────────────────
const open = ref(false)
const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

// ─── Action definitions ───────────────────────────────────────────────
interface PaletteAction {
    id: string
    label: string
    group: 'Navigation' | 'Pages' | 'Actions'
    icon: any
    hint: string
    execute: () => void
}

const actions: PaletteAction[] = [
    // Navigation
    {
        id: 'nav-about',
        label: 'Go to About',
        group: 'Navigation',
        icon: User,
        hint: '1',
        execute: () => scrollToSection('about'),
    },
    {
        id: 'nav-work',
        label: 'Go to Work',
        group: 'Navigation',
        icon: FolderOpen,
        hint: '3',
        execute: () => scrollToSection('work'),
    },
    {
        id: 'nav-career',
        label: 'Go to Career',
        group: 'Navigation',
        icon: Briefcase,
        hint: '2',
        execute: () => scrollToSection('career'),
    },
    {
        id: 'nav-tech',
        label: 'Go to Tech Stack',
        group: 'Navigation',
        icon: Cpu,
        hint: '4',
        execute: () => scrollToSection('tech'),
    },
    {
        id: 'nav-contact',
        label: 'Go to Contact',
        group: 'Navigation',
        icon: Mail,
        hint: '6',
        execute: () => scrollToSection('contact'),
    },
    {
        id: 'nav-top',
        label: 'Go to Top',
        group: 'Navigation',
        icon: ArrowUp,
        hint: 'g h',
        execute: () => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        },
    },
    // Pages
    {
        id: 'page-blog',
        label: 'Open Blog',
        group: 'Pages',
        icon: BookOpen,
        hint: '',
        execute: () => router.visit('/blog'),
    },
    {
        id: 'page-case-studies',
        label: 'Open Case Studies',
        group: 'Pages',
        icon: Layers,
        hint: '',
        execute: () => router.visit('/case-studies'),
    },
    {
        id: 'page-hiring',
        label: 'For Hiring Managers',
        group: 'Pages',
        icon: Handshake,
        hint: '',
        execute: () => router.visit('/for-hiring-managers'),
    },
    // Actions
    {
        id: 'action-theme',
        label: 'Toggle Theme',
        group: 'Actions',
        icon: SunMoon,
        hint: '',
        execute: () => {
            const next = theme.value === 'dark' ? 'light' : 'dark'
            setTheme(next)
        },
    },
    {
        id: 'action-resume',
        label: 'Download Resume',
        group: 'Actions',
        icon: FileDown,
        hint: '',
        execute: () => {
            window.open('/resume/ashish-gupta-resume.pdf', '_blank')
        },
    },
]

// ─── Filtered + grouped results ──────────────────────────────────────
const filteredActions = computed(() => {
    const q = query.value.toLowerCase().trim()
    if (!q) return actions
    return actions.filter(
        (a) =>
            a.label.toLowerCase().includes(q) ||
            a.group.toLowerCase().includes(q),
    )
})

const groupedActions = computed(() => {
    const groups: { name: string; items: PaletteAction[] }[] = []
    const order: PaletteAction['group'][] = ['Navigation', 'Pages', 'Actions']

    for (const g of order) {
        const items = filteredActions.value.filter((a) => a.group === g)
        if (items.length) groups.push({ name: g, items })
    }
    return groups
})

// Reset active index when filter changes
watch(filteredActions, () => {
    activeIndex.value = 0
})

// ─── Section scroll helper ───────────────────────────────────────────
function scrollToSection(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ─── Open / close ────────────────────────────────────────────────────
function openPalette() {
    open.value = true
    query.value = ''
    activeIndex.value = 0
    nextTick(() => inputRef.value?.focus())
}

function closePalette() {
    open.value = false
}

function executeAction(action: PaletteAction) {
    closePalette()
    // Small delay so the overlay fades before scrolling starts
    requestAnimationFrame(() => action.execute())
}

// ─── Keyboard navigation inside the palette ──────────────────────────
function onInputKeydown(event: KeyboardEvent) {
    const count = filteredActions.value.length

    if (event.key === 'ArrowDown') {
        event.preventDefault()
        activeIndex.value = (activeIndex.value + 1) % count
        scrollActiveIntoView()
    } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        activeIndex.value = (activeIndex.value - 1 + count) % count
        scrollActiveIntoView()
    } else if (event.key === 'Enter') {
        event.preventDefault()
        const action = filteredActions.value[activeIndex.value]
        if (action) executeAction(action)
    } else if (event.key === 'Escape') {
        event.preventDefault()
        closePalette()
    }
}

function scrollActiveIntoView() {
    nextTick(() => {
        const el = document.querySelector('.cp-item--active')
        if (el) el.scrollIntoView({ block: 'nearest' })
    })
}

// ─── Global Cmd/Ctrl+K listener ──────────────────────────────────────
function isEditableTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false
    const tag = target.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
    if (target.isContentEditable) return true
    return false
}

function onGlobalKeydown(event: KeyboardEvent) {
    // Cmd+K (Mac) or Ctrl+K (Windows/Linux)
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        // Never fire inside editable fields
        if (isEditableTarget(event.target)) return
        event.preventDefault()
        if (open.value) {
            closePalette()
        } else {
            openPalette()
        }
    }

    // Close on Escape when open
    if (event.key === 'Escape' && open.value) {
        event.preventDefault()
        closePalette()
    }
}

onMounted(() => {
    window.addEventListener('keydown', onGlobalKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', onGlobalKeydown)
})

// ─── Platform detection (for shortcut hint) ──────────────────────────
const isMac = ref(false)
onMounted(() => {
    isMac.value = navigator.platform?.toUpperCase().includes('MAC') ?? false
})
</script>

<template>
    <Teleport to="body">
        <Transition name="cp-fade">
            <div
                v-if="open"
                class="cp-overlay"
                @mousedown.self="closePalette"
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
            >
                <div class="cp-card">
                    <!-- Search input -->
                    <div class="cp-header">
                        <Search :size="18" class="cp-search-icon" aria-hidden="true" />
                        <input
                            ref="inputRef"
                            v-model="query"
                            class="cp-input"
                            type="text"
                            placeholder="Type a command or search..."
                            aria-label="Search actions, projects, and pages"
                            autocomplete="off"
                            spellcheck="false"
                            @keydown="onInputKeydown"
                        />
                    </div>

                    <!-- Results list -->
                    <div class="cp-list" role="listbox">
                        <template v-if="filteredActions.length">
                            <template
                                v-for="group in groupedActions"
                                :key="group.name"
                            >
                                <div class="cp-group-label">{{ group.name }}</div>
                                <button
                                    v-for="(action, i) in group.items"
                                    :key="action.id"
                                    class="cp-item"
                                    :class="{
                                        'cp-item--active':
                                            filteredActions.indexOf(action) === activeIndex,
                                    }"
                                    role="option"
                                    :aria-selected="
                                        filteredActions.indexOf(action) === activeIndex
                                    "
                                    @click="executeAction(action)"
                                    @mouseenter="activeIndex = filteredActions.indexOf(action)"
                                >
                                    <component
                                        :is="action.icon"
                                        :size="16"
                                        class="cp-item-icon"
                                        aria-hidden="true"
                                    />
                                    <span class="cp-item-label">{{ action.label }}</span>
                                    <kbd v-if="action.hint" class="cp-kbd">{{ action.hint }}</kbd>
                                </button>
                            </template>
                        </template>
                        <div v-else class="cp-empty">No results found</div>
                    </div>

                    <!-- Footer -->
                    <div class="cp-footer">
                        <span class="cp-footer-hint">
                            <kbd class="cp-kbd cp-kbd--sm">&uarr;</kbd>
                            <kbd class="cp-kbd cp-kbd--sm">&darr;</kbd>
                            navigate
                        </span>
                        <span class="cp-footer-hint">
                            <kbd class="cp-kbd cp-kbd--sm">&crarr;</kbd>
                            select
                        </span>
                        <span class="cp-footer-hint">
                            <kbd class="cp-kbd cp-kbd--sm">esc</kbd>
                            close
                        </span>
                        <span class="cp-footer-shortcut">
                            <kbd class="cp-kbd cp-kbd--sm">{{ isMac ? '⌘' : 'Ctrl' }}+K</kbd>
                        </span>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
/* ─── Overlay ──────────────────────────────────────────────────────── */
.cp-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: min(20vh, 160px);
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

/* ─── Card ─────────────────────────────────────────────────────────── */
.cp-card {
    width: 100%;
    max-width: 560px;
    margin: 0 1rem;
    background: var(--card-bg-solid);
    border: 1px solid var(--border-strong);
    border-radius: 0.75rem;
    box-shadow:
        0 24px 64px rgba(0, 0, 0, 0.4),
        0 0 0 1px var(--border);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: min(70vh, 480px);
}

/* ─── Header / search ─────────────────────────────────────────────── */
.cp-header {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--border);
}

.cp-search-icon {
    flex-shrink: 0;
    color: var(--text-muted);
}

.cp-input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: var(--text-1);
    font-size: 0.95rem;
    font-family: inherit;
    line-height: 1.5;
}

.cp-input::placeholder {
    color: var(--text-muted);
}

/* ─── Results list ─────────────────────────────────────────────────── */
.cp-list {
    flex: 1;
    overflow-y: auto;
    padding: 0.35rem 0;
    overscroll-behavior: contain;
}

.cp-group-label {
    padding: 0.55rem 1rem 0.3rem;
    font-size: 0.68rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    user-select: none;
}

.cp-item {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    width: 100%;
    padding: 0.55rem 1rem;
    background: none;
    border: none;
    border-left: 2px solid transparent;
    color: var(--text-1);
    font-size: 0.875rem;
    font-family: inherit;
    line-height: 1.4;
    cursor: pointer;
    text-align: left;
    transition:
        background-color 120ms ease,
        border-color 120ms ease;
}

.cp-item:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
}

.cp-item--active {
    background: rgba(var(--accent-rgb), 0.1);
    border-left-color: var(--accent);
}

.cp-item-icon {
    flex-shrink: 0;
    color: var(--text-muted);
    transition: color 120ms ease;
}

.cp-item--active .cp-item-icon {
    color: var(--accent);
}

.cp-item-label {
    flex: 1;
    min-width: 0;
}

/* ─── Keyboard shortcut badges ─────────────────────────────────────── */
.cp-kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.4rem;
    height: 1.3rem;
    padding: 0 0.35rem;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 0.25rem;
    color: var(--text-muted);
    font-family: inherit;
    font-size: 0.7rem;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
}

.cp-kbd--sm {
    min-width: 1.2rem;
    height: 1.1rem;
    font-size: 0.65rem;
    padding: 0 0.25rem;
}

/* ─── Empty state ──────────────────────────────────────────────────── */
.cp-empty {
    padding: 1.5rem 1rem;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.85rem;
}

/* ─── Footer ───────────────────────────────────────────────────────── */
.cp-footer {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.55rem 1rem;
    border-top: 1px solid var(--border);
    font-size: 0.7rem;
    color: var(--text-muted);
}

.cp-footer-hint {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
}

.cp-footer-shortcut {
    margin-left: auto;
}

/* ─── Transition ───────────────────────────────────────────────────── */
.cp-fade-enter-active {
    transition: opacity 180ms cubic-bezier(0.23, 1, 0.32, 1);
}
.cp-fade-enter-active .cp-card {
    transition:
        opacity 180ms cubic-bezier(0.23, 1, 0.32, 1),
        transform 180ms cubic-bezier(0.23, 1, 0.32, 1);
}
.cp-fade-leave-active {
    transition: opacity 140ms ease;
}
.cp-fade-leave-active .cp-card {
    transition:
        opacity 140ms ease,
        transform 140ms ease;
}
.cp-fade-enter-from {
    opacity: 0;
}
.cp-fade-enter-from .cp-card {
    opacity: 0;
    transform: scale(0.97) translateY(-8px);
}
.cp-fade-leave-to {
    opacity: 0;
}
.cp-fade-leave-to .cp-card {
    opacity: 0;
    transform: scale(0.97) translateY(-8px);
}

/* ─── Reduced motion ──────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
    .cp-fade-enter-active,
    .cp-fade-leave-active,
    .cp-fade-enter-active .cp-card,
    .cp-fade-leave-active .cp-card {
        transition: opacity 120ms ease;
    }
    .cp-fade-enter-from .cp-card,
    .cp-fade-leave-to .cp-card {
        transform: none;
    }
}

/* ─── Scrollbar styling ───────────────────────────────────────────── */
.cp-list::-webkit-scrollbar {
    width: 4px;
}
.cp-list::-webkit-scrollbar-track {
    background: transparent;
}
.cp-list::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 2px;
}

/* ── Light Mode Polish ── */
:global([data-theme="light"]) .cp-overlay {
    background: rgba(15, 23, 42, 0.4);
}

:global([data-theme="light"]) .cp-card {
    background: #ffffff;
    border-color: rgba(15, 23, 42, 0.12);
    box-shadow: 0 24px 64px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(15, 23, 42, 0.06);
}

:global([data-theme="light"]) .cp-header {
    background: #f8fafc;
    border-bottom-color: rgba(15, 23, 42, 0.08);
}

:global([data-theme="light"]) .cp-footer {
    background: #f8fafc;
    border-top-color: rgba(15, 23, 42, 0.08);
}

:global([data-theme="light"]) .cp-kbd {
    background: #f1f5f9;
    color: #334155;
    border-color: rgba(15, 23, 42, 0.12);
}
</style>
