export interface Profile {
    name: string
    title: string
    subtitle: string
    bio: string
    email: string
    phone: string
    location: string
    avatarUrl: string | null
    resumeUrl: string | null
}

export interface Experience {
    company: string
    role: string
    location: string
    startDate: string
    endDate: string | null
    dateRange: string
    highlights: string[]
}

export interface Project {
    title: string
    slug: string
    category: string
    description: string
    tools: string[]
    imageUrl: string | null
    videoUrl: string | null
    externalUrl: string | null
}

export interface Skill {
    name: string
    category: string
    iconUrl: string | null
}

export interface SocialLink {
    platform: string
    url: string
    label: string
}

export interface Education {
    institution: string
    degree: string
    location: string
    startYear: string
    endYear: string
    courses: string[]
}

export interface Service {
    title: string
    description: string
    icon: string | null
}

export interface PortfolioPageProps {
    profile: Profile
    experiences: Experience[]
    projects: Project[]
    skills: Record<string, Skill[]>
    socialLinks: SocialLink[]
    educations: Education[]
    services: Service[]
}
