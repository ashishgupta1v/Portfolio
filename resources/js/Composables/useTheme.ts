import { ref, onMounted } from 'vue'

export type ThemePreference = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

const theme = ref<ThemePreference>('dark')
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
    applyResolvedTheme('dark')
}

function initTheme() {
    if (initialized || typeof window === 'undefined') return
    initialized = true
    theme.value = 'dark'
    applyResolvedTheme('dark')
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
