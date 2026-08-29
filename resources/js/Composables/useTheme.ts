import { ref, onMounted } from 'vue'

export type ThemePreference = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

const theme = ref<ThemePreference>('system')
const resolvedTheme = ref<ResolvedTheme>('dark')

let mediaQuery: MediaQueryList | null = null
let initialized = false

function applyResolvedTheme(resolved: ResolvedTheme) {
    resolvedTheme.value = resolved
    if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', resolved)
    }
}

function applyThemeSettings(pref: ThemePreference) {
    if (typeof window === 'undefined') return
    const systemPrefersDark = mediaQuery ? mediaQuery.matches : window.matchMedia('(prefers-color-scheme: dark)').matches
    const resolved: ResolvedTheme = pref === 'system' ? (systemPrefersDark ? 'dark' : 'light') : pref
    applyResolvedTheme(resolved)
}

function initTheme() {
    if (initialized || typeof window === 'undefined') return
    initialized = true

    const stored = localStorage.getItem('theme')
    theme.value = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system'

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
        if (theme.value === 'system') {
            applyResolvedTheme(e.matches ? 'dark' : 'light')
        }
    })

    applyThemeSettings(theme.value)
}

export function useTheme() {
    onMounted(() => {
        initTheme()
    })

    function setTheme(next: ThemePreference) {
        theme.value = next
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('theme', next)
        }
        applyThemeSettings(next)
    }

    return {
        theme,
        resolvedTheme,
        setTheme,
    }
}
