<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

interface Repo {
    name: string
    description: string | null
    language: string | null
    stars: number
    url: string
    updatedAt: string
}

interface GitHubStats {
    publicRepos: number
    followers: number
    following: number
    totalStars: number
    topLanguages: string[]
    recentRepos: Repo[]
    profileUrl: string
    avatarUrl: string | null
}

const loading = ref(true)
const error = ref(false)
const data = ref<GitHubStats | null>(null)

const statsCards = computed(() => {
    if (!data.value) return []
    return [
        { label: 'Public Repos', value: data.value.publicRepos },
        { label: 'Stars Earned', value: data.value.totalStars },
        { label: 'Top Languages', value: data.value.topLanguages.slice(0, 3).join(', ') },
    ]
})

const languageColors: Record<string, string> = {
    PHP: '240, 80%',
    Vue: '160, 85%',
    JavaScript: '52, 90%',
    TypeScript: '212, 80%',
    Python: '210, 55%',
    HTML: '14, 85%',
    CSS: '206, 70%',
    Shell: '120, 40%',
    Blade: '355, 75%',
    Go: '190, 65%',
}

function langColor(lang: string | null): string {
    if (!lang) return 'var(--text-3)'
    const hsl = languageColors[lang]
    return hsl ? `hsl(${hsl}, 65%)` : 'var(--text-2)'
}

function timeAgo(dateStr: string): string {
    const now = Date.now()
    const then = new Date(dateStr).getTime()
    const diffMs = now - then
    const days = Math.floor(diffMs / 86400000)
    if (days < 1) return 'today'
    if (days === 1) return '1 day ago'
    if (days < 30) return `${days} days ago`
    const months = Math.floor(days / 30)
    if (months === 1) return '1 month ago'
    if (months < 12) return `${months} months ago`
    const years = Math.floor(months / 12)
    return years === 1 ? '1 year ago' : `${years} years ago`
}

onMounted(async () => {
    try {
        const res = await fetch('/api/github-stats')
        if (!res.ok) throw new Error('Failed to fetch')
        data.value = await res.json()
    } catch {
        error.value = true
        data.value = {
            publicRepos: 15,
            followers: 0,
            following: 0,
            totalStars: 0,
            topLanguages: ['PHP', 'Vue', 'TypeScript', 'JavaScript', 'Python'],
            recentRepos: [],
            profileUrl: 'https://github.com/ashishgup1',
            avatarUrl: null,
        }
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <section id="github" class="github-section">
        <div class="github-shell">
            <div class="section-header">
                <div class="section-header-wrapper">
                    <h2 class="section-title">
                        <span class="section-title-word">Open</span>
                        <span class="section-title-word accent">Source</span>
                    </h2>
                    <p class="section-subtitle">
                        Recent work and contributions on GitHub.
                    </p>
                </div>
                <div class="section-separator" />
            </div>

            <!-- Loading skeleton -->
            <div v-if="loading" class="github-skeleton">
                <div class="skeleton-stats">
                    <div v-for="i in 3" :key="i" class="skeleton-card">
                        <div class="skeleton-value" />
                        <div class="skeleton-label" />
                    </div>
                </div>
                <div class="skeleton-repos">
                    <div v-for="i in 4" :key="i" class="skeleton-repo">
                        <div class="skeleton-repo-title" />
                        <div class="skeleton-repo-desc" />
                        <div class="skeleton-repo-meta" />
                    </div>
                </div>
            </div>

            <!-- Loaded content -->
            <div v-else class="github-content">
                <div class="github-stats">
                    <div
                        v-for="stat in statsCards"
                        :key="stat.label"
                        class="stat-card"
                    >
                        <span class="stat-value">{{ stat.value }}</span>
                        <span class="stat-label">{{ stat.label }}</span>
                    </div>
                </div>

                <div
                    v-if="data && data.recentRepos.length"
                    class="github-repos"
                >
                    <a
                        v-for="repo in data.recentRepos"
                        :key="repo.name"
                        :href="repo.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="repo-card"
                    >
                        <div class="repo-header">
                            <svg class="repo-icon" viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
                            </svg>
                            <h3 class="repo-name">{{ repo.name }}</h3>
                        </div>
                        <p v-if="repo.description" class="repo-desc">
                            {{ repo.description }}
                        </p>
                        <p v-else class="repo-desc repo-desc--empty">
                            No description provided.
                        </p>
                        <div class="repo-meta">
                            <span
                                v-if="repo.language"
                                class="repo-lang"
                            >
                                <span
                                    class="lang-dot"
                                    :style="{ background: langColor(repo.language) }"
                                />
                                {{ repo.language }}
                            </span>
                            <span v-if="repo.stars" class="repo-stars">
                                <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                                </svg>
                                {{ repo.stars }}
                            </span>
                            <span class="repo-updated">
                                Updated {{ timeAgo(repo.updatedAt) }}
                            </span>
                        </div>
                    </a>
                </div>

                <div v-if="data" class="github-cta">
                    <a
                        :href="data.profileUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="github-profile-link"
                    >
                        <svg class="gh-logo" viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
                            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
                        </svg>
                        View GitHub Profile
                        <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.github-section {
    position: relative;
    background: linear-gradient(
        180deg,
        var(--section-bg-mid) 0%,
        var(--bg-secondary) 50%,
        var(--section-bg-deep) 100%
    );
    padding: 4.2rem 1.2rem 4.4rem;
    overflow: hidden;
}

.github-shell {
    max-width: 1180px;
    margin: 0 auto;
    position: relative;
}

/* ---------- Stats grid ---------- */
.github-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}

.stat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    padding: 1.5rem 1rem;
    border-radius: 0.75rem;
    background: var(--glass-bg);
    border: 1px solid var(--border);
    backdrop-filter: blur(12px);
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.stat-card:hover {
    border-color: rgba(var(--accent-rgb), 0.35);
    box-shadow: 0 4px 24px rgba(var(--accent-rgb), 0.08);
}

.stat-value {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--accent);
    letter-spacing: -0.02em;
    line-height: 1;
}

.stat-label {
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--text-2);
    text-transform: uppercase;
    letter-spacing: 0.06em;
}

/* ---------- Repos grid ---------- */
.github-repos {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}

.repo-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.25rem 1.35rem;
    border-radius: 0.75rem;
    background: var(--card-bg);
    border: 1px solid var(--border);
    text-decoration: none;
    color: inherit;
    transition:
        border-color 0.25s ease,
        box-shadow 0.25s ease,
        transform 0.25s ease;
}

.repo-card:hover {
    border-color: rgba(var(--accent-rgb), 0.3);
    box-shadow: 0 8px 32px rgba(var(--accent-rgb), 0.06);
    transform: translateY(-2px);
}

.repo-header {
    display: flex;
    align-items: center;
    gap: 0.45rem;
}

.repo-icon {
    color: var(--text-3);
    flex-shrink: 0;
}

.repo-name {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--accent);
    line-height: 1.3;
    word-break: break-word;
}

.repo-desc {
    font-size: 0.82rem;
    color: var(--text-2);
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
}

.repo-desc--empty {
    font-style: italic;
    color: var(--text-3);
}

.repo-meta {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    font-size: 0.75rem;
    color: var(--text-3);
    margin-top: auto;
    padding-top: 0.35rem;
}

.repo-lang {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-weight: 500;
}

.lang-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
}

.repo-stars {
    display: flex;
    align-items: center;
    gap: 0.2rem;
}

.repo-updated {
    margin-left: auto;
}

/* ---------- CTA link ---------- */
.github-cta {
    display: flex;
    justify-content: center;
}

.github-profile-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.6rem;
    border-radius: 999px;
    border: 1px solid rgba(var(--accent-rgb), 0.3);
    background: rgba(var(--accent-rgb), 0.06);
    color: var(--accent);
    font-size: 0.88rem;
    font-weight: 600;
    text-decoration: none;
    transition:
        background 0.25s ease,
        border-color 0.25s ease,
        transform 0.15s ease;
}

.github-profile-link:hover {
    background: rgba(var(--accent-rgb), 0.14);
    border-color: rgba(var(--accent-rgb), 0.5);
    transform: translateY(-1px);
}

.gh-logo {
    flex-shrink: 0;
}

.arrow-icon {
    flex-shrink: 0;
    transition: transform 0.2s ease;
}

.github-profile-link:hover .arrow-icon {
    transform: translate(2px, -2px);
}

/* ---------- Skeleton ---------- */
.skeleton-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}

.skeleton-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    padding: 1.5rem 1rem;
    border-radius: 0.75rem;
    background: var(--glass-bg);
    border: 1px solid var(--border);
}

.skeleton-value {
    width: 3.5rem;
    height: 1.5rem;
    border-radius: 0.4rem;
    background: linear-gradient(
        90deg,
        var(--card-bg) 25%,
        rgba(var(--accent-rgb), 0.08) 50%,
        var(--card-bg) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.8s ease-in-out infinite;
}

.skeleton-label {
    width: 5rem;
    height: 0.75rem;
    border-radius: 0.3rem;
    background: linear-gradient(
        90deg,
        var(--card-bg) 25%,
        rgba(var(--accent-rgb), 0.06) 50%,
        var(--card-bg) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.8s ease-in-out infinite 0.1s;
}

.skeleton-repos {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.skeleton-repo {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 1.25rem 1.35rem;
    border-radius: 0.75rem;
    background: var(--card-bg);
    border: 1px solid var(--border);
}

.skeleton-repo-title {
    width: 60%;
    height: 0.95rem;
    border-radius: 0.3rem;
    background: linear-gradient(
        90deg,
        var(--card-bg-strong) 25%,
        rgba(var(--accent-rgb), 0.08) 50%,
        var(--card-bg-strong) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.8s ease-in-out infinite 0.2s;
}

.skeleton-repo-desc {
    width: 90%;
    height: 0.7rem;
    border-radius: 0.3rem;
    background: linear-gradient(
        90deg,
        var(--card-bg-strong) 25%,
        rgba(var(--accent-rgb), 0.06) 50%,
        var(--card-bg-strong) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.8s ease-in-out infinite 0.3s;
}

.skeleton-repo-meta {
    width: 40%;
    height: 0.6rem;
    border-radius: 0.3rem;
    background: linear-gradient(
        90deg,
        var(--card-bg-strong) 25%,
        rgba(var(--accent-rgb), 0.05) 50%,
        var(--card-bg-strong) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.8s ease-in-out infinite 0.4s;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

/* ---------- Responsive ---------- */
@media (max-width: 768px) {
    .github-section {
        padding: 3.2rem 1rem 3.4rem;
    }

    .github-stats {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }

    .stat-card {
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem 1.2rem;
    }

    .skeleton-stats {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }

    .skeleton-card {
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem 1.2rem;
    }

    .github-repos {
        grid-template-columns: 1fr;
    }

    .skeleton-repos {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .github-section {
        padding: 2.8rem 0.8rem;
    }
}
</style>
