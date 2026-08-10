import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CommandPalette from '@/Components/PortfolioV2/CommandPalette.vue'

describe('CommandPalette', () => {
    it('is hidden by default', () => {
        const wrapper = mount(CommandPalette)
        expect(wrapper.find('.cp-overlay').exists()).toBe(false)
    })
})
