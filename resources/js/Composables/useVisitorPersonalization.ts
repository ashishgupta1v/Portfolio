import { ref, onMounted } from 'vue'

interface VisitorContext {
    isReturning: boolean
    visitCount: number
    source: string | null
    medium: string | null
    campaign: string | null
    referrer: string | null
    firstVisit: string | null
    greeting: string
}

const STORAGE_KEY = 'visitor-context-v1'

export function useVisitorPersonalization() {
    const context = ref<VisitorContext>({
        isReturning: false,
        visitCount: 1,
        source: null,
        medium: null,
        campaign: null,
        referrer: null,
        firstVisit: null,
        greeting: ''
    })

    onMounted(() => {
        const params = new URLSearchParams(window.location.search)
        const source = params.get('utm_source')
        const medium = params.get('utm_medium')
        const campaign = params.get('utm_campaign')
        const referrer = document.referrer || null

        let stored: Partial<VisitorContext> = {}
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (raw) stored = JSON.parse(raw)
        } catch {}

        const visitCount = (stored.visitCount || 0) + 1
        const isReturning = visitCount > 1
        const firstVisit = stored.firstVisit || new Date().toISOString()

        let greeting = ''
        if (isReturning) {
            greeting = 'Welcome back!'
        } else if (source === 'linkedin') {
            greeting = 'Hello from LinkedIn!'
        } else if (source === 'github') {
            greeting = 'Hey, fellow developer!'
        } else if (source === 'twitter' || source === 'x') {
            greeting = 'Thanks for checking things out!'
        } else if (medium === 'email') {
            greeting = 'Thanks for clicking through!'
        } else {
            greeting = ''
        }

        context.value = {
            isReturning,
            visitCount,
            source: source || stored.source || null,
            medium: medium || stored.medium || null,
            campaign: campaign || stored.campaign || null,
            referrer: referrer || stored.referrer || null,
            firstVisit,
            greeting,
        }

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(context.value))
        } catch {}
    })

    return { context }
}
