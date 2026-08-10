import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavBar from '@/Components/PortfolioV2/NavBar.vue'

describe('NavBar', () => {
    const defaultProps = {
        initials: 'AG',
        linkedinUrl: 'https://linkedin.com/in/test',
        socialLinks: [],
        resumeUrl: '/resume.pdf',
    }

    it('renders initials', () => {
        const wrapper = mount(NavBar, { props: defaultProps })
        expect(wrapper.text()).toContain('AG')
    })

    it('renders navigation links', () => {
        const wrapper = mount(NavBar, { props: defaultProps })
        const links = wrapper.findAll('.nav-link')
        expect(links.length).toBeGreaterThan(0)
    })

    it('has hamburger button for mobile', () => {
        const wrapper = mount(NavBar, { props: defaultProps })
        expect(wrapper.find('.hamburger').exists()).toBe(true)
    })
})
