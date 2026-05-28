export interface CaseStudyCard {
    slug: string
    title: string
    summary: string
    client: string
    industry: string
    timeline: string
    publishedAt: string
    featuredOutcome: string
    tags: string[]
    stack: string[]
    readingTimeMinutes: number
}

export interface CaseStudy extends CaseStudyCard {
    role: string
    permissionStatus: string
    seoTitle: string
    seoDescription: string
    bodyHtml: string
}

export interface CaseStudiesIndexPageProps {
    caseStudies: CaseStudyCard[]
}

export interface CaseStudyShowPageProps {
    caseStudy: CaseStudy
}