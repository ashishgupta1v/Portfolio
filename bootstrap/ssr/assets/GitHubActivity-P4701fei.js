import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { computed, defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Components/PortfolioV2/GitHubActivity.vue?vue&type=script&setup=true&lang.ts
var GitHubActivity_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "GitHubActivity",
	__ssrInlineRender: true,
	setup(__props) {
		const loading = ref(true);
		const error = ref(false);
		const data = ref(null);
		const statsCards = computed(() => {
			if (!data.value) return [];
			return [
				{
					label: "Public Repos",
					value: data.value.publicRepos || 15
				},
				{
					label: "Primary Focus",
					value: "Full-Stack & AI Architecture"
				},
				{
					label: "Top Languages",
					value: (data.value.topLanguages || [
						"PHP",
						"Vue",
						"TypeScript"
					]).slice(0, 3).join(", ")
				}
			];
		});
		const curatedRepos = computed(() => {
			if (!data.value || !data.value.recentRepos) return [];
			const fallbackDescriptions = {
				Portfolio: "Modern personal engineering portfolio built with Laravel 13, Vue 3, Inertia.js, and Tailwind CSS.",
				DigitalBuilders: "Autonomous AI-assisted agency platform & conversion engine.",
				Habuilt: "High-performance habit tracking and personal accountability engine.",
				JobBot: "Automated job discovery and application workflow tool."
			};
			return data.value.recentRepos.filter((r) => r.name.toLowerCase() !== "ashishgupta1v" && r.name.toLowerCase() !== "ashishgup1").map((r) => ({
				...r,
				description: r.description || fallbackDescriptions[r.name] || "Open-source software component & architecture modules."
			}));
		});
		const languageColors = {
			PHP: "240, 80%",
			Vue: "160, 85%",
			JavaScript: "52, 90%",
			TypeScript: "212, 80%",
			Python: "210, 55%",
			HTML: "14, 85%",
			CSS: "206, 70%",
			Shell: "120, 40%",
			Blade: "355, 75%",
			Go: "190, 65%"
		};
		function langColor(lang) {
			if (!lang) return "var(--text-3)";
			const hsl = languageColors[lang];
			return hsl ? `hsl(${hsl}, 65%)` : "var(--text-2)";
		}
		function timeAgo(dateStr) {
			const diffMs = Date.now() - new Date(dateStr).getTime();
			const days = Math.floor(diffMs / 864e5);
			if (days < 1) return "today";
			if (days === 1) return "1 day ago";
			if (days < 30) return `${days} days ago`;
			const months = Math.floor(days / 30);
			if (months === 1) return "1 month ago";
			if (months < 12) return `${months} months ago`;
			const years = Math.floor(months / 12);
			return years === 1 ? "1 year ago" : `${years} years ago`;
		}
		onMounted(async () => {
			try {
				const res = await fetch("/api/github-stats");
				if (!res.ok) throw new Error("Failed to fetch");
				data.value = await res.json();
			} catch {
				error.value = true;
				data.value = {
					publicRepos: 15,
					followers: 0,
					following: 0,
					totalStars: 0,
					topLanguages: [
						"PHP",
						"Vue",
						"TypeScript",
						"JavaScript",
						"Python"
					],
					recentRepos: [
						{
							name: "Portfolio",
							description: "Full-stack portfolio built with Laravel 13, Vue 3, Inertia.js, and Tailwind CSS.",
							language: "Vue",
							stars: 0,
							url: "https://github.com/ashishgupta1v/Portfolio",
							updatedAt: (/* @__PURE__ */ new Date()).toISOString()
						},
						{
							name: "DigitalBuilders",
							description: "Autonomous agency platform & conversion-optimized client dashboard.",
							language: "PHP",
							stars: 0,
							url: "https://github.com/ashishgupta1v/DigitalBuilders",
							updatedAt: (/* @__PURE__ */ new Date()).toISOString()
						},
						{
							name: "Habuilt",
							description: "High-performance habit tracking & personal accountability web application.",
							language: "TypeScript",
							stars: 0,
							url: "https://github.com/ashishgupta1v/Habuilt",
							updatedAt: (/* @__PURE__ */ new Date()).toISOString()
						},
						{
							name: "JobBot",
							description: "Automated job discovery pipeline and submission tracking utility.",
							language: "JavaScript",
							stars: 0,
							url: "https://github.com/ashishgupta1v/JobBot",
							updatedAt: (/* @__PURE__ */ new Date()).toISOString()
						}
					],
					profileUrl: "https://github.com/ashishgupta1v",
					avatarUrl: null
				};
			} finally {
				loading.value = false;
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "github",
				class: "github-section"
			}, _attrs))} data-v-858afbd4><div class="github-ambient-glow" aria-hidden="true" data-v-858afbd4></div><div class="github-shell" data-v-858afbd4><div class="section-header" data-v-858afbd4><div class="section-header-wrapper" data-v-858afbd4><h2 class="section-title" data-v-858afbd4><span class="section-title-word" data-v-858afbd4>Open Source &amp;</span><span class="section-title-word accent" data-v-858afbd4>Activity</span></h2></div><p class="section-subtitle" data-v-858afbd4> Recent repositories, architecture components, and contributions on GitHub. </p><div class="section-separator" data-v-858afbd4></div></div>`);
			if (loading.value) {
				_push(`<div class="github-skeleton" data-v-858afbd4><div class="skeleton-stats" data-v-858afbd4><!--[-->`);
				ssrRenderList(3, (i) => {
					_push(`<div class="skeleton-card" data-v-858afbd4><div class="skeleton-value" data-v-858afbd4></div><div class="skeleton-label" data-v-858afbd4></div></div>`);
				});
				_push(`<!--]--></div><div class="skeleton-repos" data-v-858afbd4><!--[-->`);
				ssrRenderList(4, (i) => {
					_push(`<div class="skeleton-repo" data-v-858afbd4><div class="skeleton-repo-title" data-v-858afbd4></div><div class="skeleton-repo-desc" data-v-858afbd4></div><div class="skeleton-repo-meta" data-v-858afbd4></div></div>`);
				});
				_push(`<!--]--></div></div>`);
			} else {
				_push(`<div class="github-content" data-v-858afbd4><div class="github-stats" data-v-858afbd4><!--[-->`);
				ssrRenderList(statsCards.value, (stat) => {
					_push(`<div class="stat-card glass-panel" data-v-858afbd4><span class="stat-value text-gradient-accent" data-v-858afbd4>${ssrInterpolate(stat.value)}</span><span class="stat-label" data-v-858afbd4>${ssrInterpolate(stat.label)}</span></div>`);
				});
				_push(`<!--]--></div>`);
				if (curatedRepos.value.length) {
					_push(`<div class="github-repos" data-v-858afbd4><!--[-->`);
					ssrRenderList(curatedRepos.value, (repo) => {
						_push(`<a${ssrRenderAttr("href", repo.url)} target="_blank" rel="noopener noreferrer" class="repo-card glass-panel" data-v-858afbd4><div class="repo-spotlight" aria-hidden="true" data-v-858afbd4></div><div class="repo-top-indicator" style="${ssrRenderStyle({ background: `linear-gradient(90deg, ${langColor(repo.language)}, transparent)` })}" data-v-858afbd4></div><div class="repo-header" data-v-858afbd4><svg class="repo-icon" viewBox="0 0 16 16" fill="currentColor" width="16" height="16" data-v-858afbd4><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" data-v-858afbd4></path></svg><h3 class="repo-name" data-v-858afbd4>${ssrInterpolate(repo.name)}</h3></div><p class="repo-desc" data-v-858afbd4>${ssrInterpolate(repo.description)}</p><div class="repo-meta" data-v-858afbd4>`);
						if (repo.language) _push(`<span class="repo-lang" data-v-858afbd4><span class="lang-dot" style="${ssrRenderStyle({ background: langColor(repo.language) })}" data-v-858afbd4></span> ${ssrInterpolate(repo.language)}</span>`);
						else _push(`<!---->`);
						if (repo.stars) _push(`<span class="repo-stars" data-v-858afbd4><svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14" data-v-858afbd4><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" data-v-858afbd4></path></svg> ${ssrInterpolate(repo.stars)}</span>`);
						else _push(`<!---->`);
						_push(`<span class="repo-updated" data-v-858afbd4> Updated ${ssrInterpolate(timeAgo(repo.updatedAt))}</span></div></a>`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				if (data.value) _push(`<div class="github-cta" data-v-858afbd4><a${ssrRenderAttr("href", data.value.profileUrl)} target="_blank" rel="noopener noreferrer" class="github-profile-link glow-pill" data-v-858afbd4><svg class="gh-logo" viewBox="0 0 16 16" fill="currentColor" width="18" height="18" data-v-858afbd4><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" data-v-858afbd4></path></svg> View GitHub Profile <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" data-v-858afbd4><path d="M7 17L17 7M17 7H7M17 7v10" data-v-858afbd4></path></svg></a></div>`);
				else _push(`<!---->`);
				_push(`</div>`);
			}
			_push(`</div></section>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/GitHubActivity.vue
var _sfc_setup = GitHubActivity_vue_vue_type_script_setup_true_lang_default.setup;
GitHubActivity_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/GitHubActivity.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var GitHubActivity_default = /* @__PURE__ */ _plugin_vue_export_helper_default(GitHubActivity_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-858afbd4"]]);
//#endregion
export { GitHubActivity_default as default };
