import { ref, readonly } from 'vue'

export interface Toast {
    id: number
    message: string
    type: 'success' | 'error' | 'info'
    leaving?: boolean
}

const toasts = ref<Toast[]>([])
let nextId = 0

function show(message: string, type: Toast['type'] = 'info', duration = 4000) {
    const id = ++nextId
    toasts.value.push({ id, message, type })

    setTimeout(() => {
        const t = toasts.value.find(t => t.id === id)
        if (t) t.leaving = true
        setTimeout(() => {
            toasts.value = toasts.value.filter(t => t.id !== id)
        }, 220)
    }, duration)
}

export function useToast() {
    return {
        toasts: readonly(toasts),
        success: (msg: string) => show(msg, 'success'),
        error: (msg: string) => show(msg, 'error'),
        info: (msg: string) => show(msg, 'info'),
    }
}
