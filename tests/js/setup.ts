import { config } from '@vue/test-utils'

// Stub Inertia components globally
config.global.stubs = {
    Link: { template: '<a><slot /></a>' },
    Head: { template: '<div><slot /></div>' },
}
