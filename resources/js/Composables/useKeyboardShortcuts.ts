import { onMounted, onUnmounted } from 'vue'

/**
 * Registers portfolio-wide keyboard shortcuts.
 *
 * Contract: shortcuts NEVER fire while the user is typing into an input,
 * textarea, contenteditable, or an interactive element. That would be
 * hostile — someone drafting a contact message shouldn't have the '1' key
 * jump them to About. We check `event.target` before dispatching.
 *
 * Also skipped when any modifier key is pressed (Cmd/Ctrl/Alt/Meta), so
 * browser shortcuts and copy/paste keep working normally.
 *
 * Shortcuts:
 *   1 → About         g h → Home (top)
 *   2 → Career        g c → Contact (also 6)
 *   3 → Work          ?   → Show help (currently a console.info stub)
 *   4 → Tech
 *   5 → (unused, reserved for future)
 *   6 → Contact
 *   /  → Scroll to contact and focus the message textarea
 */

const SECTION_IDS: Record<string, string | 'top'> = {
    '1': 'about',
    '2': 'career',
    '3': 'work',
    '4': 'tech',
    '6': 'contact',
    'h': 'top',
    'c': 'contact',
}

function isEditableContext(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false
    const tag = target.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
    if (target.isContentEditable) return true
    // A button that opens something (like the chat toggle) is fine — key
    // presses should still work with focus there.
    return false
}

function scrollToSection(id: string) {
    if (id === 'top') {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })
        return
    }
    const el = document.getElementById(id)
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
}

let awaitingGSequence = false
let gTimeout: number | null = null

export function useKeyboardShortcuts() {
    function onKeydown(event: KeyboardEvent) {
        if (event.altKey || event.ctrlKey || event.metaKey) return
        if (isEditableContext(event.target)) return

        // The '/' key focuses the contact message textarea. Prevent default
        // so Firefox's quick-find doesn't steal it.
        if (event.key === '/') {
            event.preventDefault()
            scrollToSection('contact')
            // After the scroll starts, hand focus to the textarea. `setTimeout`
            // waits long enough that the smooth scroll animation is already
            // underway — the field ends up scrolled into view AND focused.
            setTimeout(() => {
                document.getElementById('cf-message')?.focus()
            }, 400)
            return
        }

        // Two-key 'g' prefix: g-then-h = home, g-then-c = contact.
        if (event.key === 'g' && !event.shiftKey) {
            awaitingGSequence = true
            if (gTimeout) window.clearTimeout(gTimeout)
            gTimeout = window.setTimeout(() => {
                awaitingGSequence = false
                gTimeout = null
            }, 900)
            return
        }

        if (awaitingGSequence) {
            const target = SECTION_IDS[event.key]
            if (target) {
                scrollToSection(target)
            }
            awaitingGSequence = false
            if (gTimeout) window.clearTimeout(gTimeout)
            gTimeout = null
            return
        }

        // Single-digit / single-letter shortcuts.
        const target = SECTION_IDS[event.key]
        if (target) {
            scrollToSection(target)
        }
    }

    onMounted(() => {
        window.addEventListener('keydown', onKeydown)
    })

    onUnmounted(() => {
        window.removeEventListener('keydown', onKeydown)
        if (gTimeout) window.clearTimeout(gTimeout)
    })
}
