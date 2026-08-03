import { ref, watch, onMounted } from 'vue'

export type ThemePreference = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

const theme = ref<ThemePreference>('system')
const resolvedTheme = ref<ResolvedTheme>('dark')

let mediaQuery: MediaQueryList | null = null

export function useTheme() {
    onMounted(() => {
        const stored = localStorage.getItem('theme')
        theme.value = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system'

        mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        // Listen for system changes
        mediaQuery.addEventListener('change', (e) => {
            if (theme.value === 'system') {
                applyResolvedTheme(e.matches ? 'dark' : 'light')
            }
        })

        applyThemeSettings(theme.value)
    })

    watch(theme, (val) => {
        localStorage.setItem('theme', val)
        applyThemeSettings(val)
    })

    function setTheme(next: ThemePreference) {
        theme.value = next
    }

    function applyThemeSettings(pref: ThemePreference) {
        const systemPrefersDark = mediaQuery ? mediaQuery.matches : window.matchMedia('(prefers-color-scheme: dark)').matches
        const resolved: ResolvedTheme = pref === 'system' ? (systemPrefersDark ? 'dark' : 'light') : pref
        applyResolvedTheme(resolved)
    }

    function applyResolvedTheme(resolved: ResolvedTheme) {
        resolvedTheme.value = resolved
        document.documentElement.setAttribute('data-theme', resolved)
    }

    return {
        theme,
        resolvedTheme,
        setTheme
    }
}
