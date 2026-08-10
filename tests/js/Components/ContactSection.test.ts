import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactSection from '@/Components/PortfolioV2/ContactSection.vue'

// Mock GSAP
vi.mock('gsap', () => ({
    default: { registerPlugin: vi.fn(), from: vi.fn() },
    gsap: { registerPlugin: vi.fn(), from: vi.fn() },
}))
vi.mock('gsap/ScrollTrigger', () => ({
    ScrollTrigger: {},
}))

describe('ContactSection', () => {
    const defaultProps = {
        profile: {
            name: 'Test User',
            email: 'test@example.com',
            phone: '+1234567890',
            location: 'Test City',
            avatarUrl: null,
            title: 'Developer',
            subtitle: 'Test',
            bio: 'Test bio',
            resumeUrl: '/resume.pdf',
        },
        socialLinks: [
            { platform: 'github', url: 'https://github.com/test', label: 'GitHub' },
        ],
        educations: [
            { degree: 'BS CS', institution: 'Test Uni', startYear: '2020', endYear: '2024' },
        ],
    }

    it('renders the contact form', () => {
        const wrapper = mount(ContactSection, { props: defaultProps })
        expect(wrapper.find('.contact-form').exists()).toBe(true)
        expect(wrapper.find('#cf-name').exists()).toBe(true)
        expect(wrapper.find('#cf-email').exists()).toBe(true)
    })

    it('renders profile email', () => {
        const wrapper = mount(ContactSection, { props: defaultProps })
        expect(wrapper.text()).toContain('test@example.com')
    })

    it('renders education info', () => {
        const wrapper = mount(ContactSection, { props: defaultProps })
        expect(wrapper.text()).toContain('BS CS')
        expect(wrapper.text()).toContain('Test Uni')
    })
})
