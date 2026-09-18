/**
 * Analytics utility for Plausible event tracking.
 * Safe for SSR and client-side execution.
 */

declare global {
    interface Window {
        plausible?: (event: string, options?: { props?: Record<string, unknown>; callback?: () => void }) => void
    }
}

export function trackEvent(eventName: string, props?: Record<string, unknown>): void {
    if (typeof window === 'undefined') return

    if (typeof window.plausible === 'function') {
        window.plausible(eventName, props ? { props } : undefined)
    } else {
        // Fallback for queued events if script is still loading
        const plausibleQueue = (window as unknown as { plausible?: { q?: unknown[] } }).plausible
        if (plausibleQueue && Array.isArray(plausibleQueue.q)) {
            plausibleQueue.q.push([eventName, props ? { props } : undefined])
        }
    }
}

/**
 * 5 Core Conversion Events
 */

export function trackResumeDownload(source = 'general'): void {
    trackEvent('Resume Download', { source })
}

export function trackCalendlyOpen(trigger = 'button'): void {
    trackEvent('Calendly Open', { trigger })
}

export function trackContactSubmit(projectType: string): void {
    trackEvent('Contact Submit', { type: projectType })
}

export function trackAiAssistantOpen(source = 'widget'): void {
    trackEvent('AI Assistant Open', { source })
}

export function trackHiringPageView(): void {
    trackEvent('Hiring Page View')
}
