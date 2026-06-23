<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { computed } from 'vue'

const props = defineProps<{
    title?: string
    description?: string
    image?: string
    url?: string
    type?: 'website' | 'article' | 'profile'
    schema?: Record<string, any>
}>()

const defaultTitle = 'Ashish Gupta | Full Stack & AI Engineer'
const defaultDesc = 'Creative Full Stack Developer specializing in AI, WebGL, and scalable enterprise systems.'
const defaultImage = '/images/og-default.jpg'

const pageTitle = computed(() => props.title ? `${props.title} | ${defaultTitle}` : defaultTitle)
const pageDesc = computed(() => props.description || defaultDesc)
const pageImage = computed(() => props.image || defaultImage)
const pageType = computed(() => props.type || 'website')

const jsonLd = computed(() => {
    if (props.schema) {
        return JSON.stringify(props.schema)
    }
    
    // Default Person schema
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ashish Gupta",
        "jobTitle": "Full Stack Engineer",
        "url": "https://ashishgupta.dev",
        "sameAs": [
            "https://github.com/ashishgupta1v",
            "https://linkedin.com/in/ashishgupta1v"
        ]
    })
})
</script>

<template>
    <Head>
        <title>{{ pageTitle }}</title>
        <meta name="description" :content="pageDesc" />
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" :content="pageType" />
        <meta property="og:title" :content="pageTitle" />
        <meta property="og:description" :content="pageDesc" />
        <meta property="og:image" :content="pageImage" />
        <meta v-if="url" property="og:url" :content="url" />

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" :content="pageTitle" />
        <meta property="twitter:description" :content="pageDesc" />
        <meta property="twitter:image" :content="pageImage" />

        <!-- JSON-LD Structured Data -->
        <script type="application/ld+json" v-html="jsonLd"></script>
    </Head>
</template>
