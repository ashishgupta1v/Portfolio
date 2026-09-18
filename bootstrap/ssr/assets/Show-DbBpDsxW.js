import { i as link_default, r as head_default } from "./vendor-inertia-Bgi69XOP.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { t as ThemeToggle_default } from "./ThemeToggle-Dz9Scuuz.js";
import { computed, createBlock, createTextVNode, createVNode, defineComponent, onMounted, onUnmounted, openBlock, ref, resolveDynamicComponent, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderVNode } from "vue/server-renderer";
//#region resources/js/Pages/Blog/Show.vue?vue&type=script&setup=true&lang.ts
var Show_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Show",
	__ssrInlineRender: true,
	props: { post: {} },
	setup(__props) {
		const props = __props;
		function formatDate(value) {
			return new Date(value).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric"
			});
		}
		const readingProgress = ref(0);
		function updateProgress() {
			const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			readingProgress.value = docHeight > 0 ? Math.round(window.scrollY / docHeight * 100) : 0;
		}
		onMounted(() => {
			window.addEventListener("scroll", updateProgress, { passive: true });
			updateProgress();
		});
		onUnmounted(() => {
			window.removeEventListener("scroll", updateProgress);
		});
		const articleSchema = computed(() => JSON.stringify({
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: props.post.title,
			description: props.post.excerpt,
			author: {
				"@type": "Person",
				name: "Ashish Gupta",
				url: "https://ashishgupta.dev/"
			},
			publisher: {
				"@type": "Person",
				name: "Ashish Gupta",
				url: "https://ashishgupta.dev/"
			},
			datePublished: props.post.publishedAt,
			url: `https://ashishgupta.dev/blog/${props.post.slug}`,
			keywords: props.post.tags.join(", ")
		}));
		const breadcrumbSchema = computed(() => JSON.stringify({
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: "https://ashishgupta.dev/"
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "Blog",
					item: "https://ashishgupta.dev/blog"
				},
				{
					"@type": "ListItem",
					position: 3,
					name: props.post.title,
					item: `https://ashishgupta.dev/blog/${props.post.slug}`
				}
			]
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(head_default), { title: __props.post.title }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<meta name="description"${ssrRenderAttr("content", __props.post.excerpt)} data-v-f1d6bdd9${_scopeId}><meta property="og:title"${ssrRenderAttr("content", __props.post.title)} data-v-f1d6bdd9${_scopeId}><meta property="og:description"${ssrRenderAttr("content", __props.post.excerpt)} data-v-f1d6bdd9${_scopeId}><meta property="og:type" content="article" data-v-f1d6bdd9${_scopeId}><meta property="og:url"${ssrRenderAttr("content", `https://ashishgupta.dev/blog/${__props.post.slug}`)} data-v-f1d6bdd9${_scopeId}><meta property="og:site_name" content="Ashish Gupta" data-v-f1d6bdd9${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-f1d6bdd9${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", __props.post.title)} data-v-f1d6bdd9${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", __props.post.excerpt)} data-v-f1d6bdd9${_scopeId}><link rel="canonical"${ssrRenderAttr("href", `https://ashishgupta.dev/blog/${__props.post.slug}`)} data-v-f1d6bdd9${_scopeId}>`);
						ssrRenderVNode(_push, createVNode(resolveDynamicComponent("script"), { type: "application/ld+json" }, null), _parent, _scopeId);
						ssrRenderVNode(_push, createVNode(resolveDynamicComponent("script"), { type: "application/ld+json" }, null), _parent, _scopeId);
					} else return [
						createVNode("meta", {
							name: "description",
							content: __props.post.excerpt
						}, null, 8, ["content"]),
						createVNode("meta", {
							property: "og:title",
							content: __props.post.title
						}, null, 8, ["content"]),
						createVNode("meta", {
							property: "og:description",
							content: __props.post.excerpt
						}, null, 8, ["content"]),
						createVNode("meta", {
							property: "og:type",
							content: "article"
						}),
						createVNode("meta", {
							property: "og:url",
							content: `https://ashishgupta.dev/blog/${__props.post.slug}`
						}, null, 8, ["content"]),
						createVNode("meta", {
							property: "og:site_name",
							content: "Ashish Gupta"
						}),
						createVNode("meta", {
							name: "twitter:card",
							content: "summary_large_image"
						}),
						createVNode("meta", {
							name: "twitter:title",
							content: __props.post.title
						}, null, 8, ["content"]),
						createVNode("meta", {
							name: "twitter:description",
							content: __props.post.excerpt
						}, null, 8, ["content"]),
						createVNode("link", {
							rel: "canonical",
							href: `https://ashishgupta.dev/blog/${__props.post.slug}`
						}, null, 8, ["href"]),
						(openBlock(), createBlock(resolveDynamicComponent("script"), {
							type: "application/ld+json",
							innerHTML: articleSchema.value
						}, null, 8, ["innerHTML"])),
						(openBlock(), createBlock(resolveDynamicComponent("script"), {
							type: "application/ld+json",
							innerHTML: breadcrumbSchema.value
						}, null, 8, ["innerHTML"]))
					];
				}),
				_: 1
			}, _parent));
			_push(`<div class="blog-post-page" data-v-f1d6bdd9><div class="reading-progress" style="${ssrRenderStyle({ width: readingProgress.value + "%" })}" aria-hidden="true" data-v-f1d6bdd9></div><header class="hero-shell page-shell" data-v-f1d6bdd9><div class="topbar" data-v-f1d6bdd9>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/",
				class: "brand-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Ashish Gupta`);
					else return [createTextVNode("Ashish Gupta")];
				}),
				_: 1
			}, _parent));
			_push(`<div class="topbar-links" data-v-f1d6bdd9>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/",
				class: "topbar-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Portfolio`);
					else return [createTextVNode("Portfolio")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(link_default), {
				href: "/case-studies",
				class: "topbar-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Case Studies`);
					else return [createTextVNode("Case Studies")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(link_default), {
				href: "/blog",
				class: "topbar-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Blog`);
					else return [createTextVNode("Blog")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(link_default), {
				href: "/for-hiring-managers",
				class: "topbar-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`For Hiring`);
					else return [createTextVNode("For Hiring")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(ThemeToggle_default, { class: "topbar-link" }, null, _parent));
			_push(`</div></div><div class="hero-grid" data-v-f1d6bdd9><div class="hero-copy" data-v-f1d6bdd9><p class="eyebrow" data-v-f1d6bdd9>Field Notes</p><h1 data-v-f1d6bdd9>${ssrInterpolate(__props.post.title)}</h1><p class="hero-summary" data-v-f1d6bdd9>${ssrInterpolate(__props.post.excerpt)}</p></div><aside class="hero-aside" data-v-f1d6bdd9><div class="meta-block" data-v-f1d6bdd9><span class="meta-label" data-v-f1d6bdd9>Published</span><span class="meta-value" data-v-f1d6bdd9>${ssrInterpolate(formatDate(__props.post.publishedAt))}</span></div><div class="meta-block" data-v-f1d6bdd9><span class="meta-label" data-v-f1d6bdd9>Reading Time</span><span class="meta-value" data-v-f1d6bdd9>${ssrInterpolate(__props.post.readingTimeMinutes)} min</span></div><div class="meta-block" data-v-f1d6bdd9><span class="meta-label" data-v-f1d6bdd9>Tags</span><div class="tag-grid" data-v-f1d6bdd9><!--[-->`);
			ssrRenderList(__props.post.tags, (tag) => {
				_push(`<span class="tag-chip" data-v-f1d6bdd9>${ssrInterpolate(tag)}</span>`);
			});
			_push(`<!--]--></div></div></aside></div></header><main class="page-shell article-shell" data-v-f1d6bdd9><article class="article-card" data-v-f1d6bdd9><div class="article-prose" data-v-f1d6bdd9>${__props.post.bodyHtml ?? ""}</div></article><aside class="article-rail" data-v-f1d6bdd9><div class="rail-card" data-v-f1d6bdd9><span class="rail-label" data-v-f1d6bdd9>Back to</span><p data-v-f1d6bdd9>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/blog",
				class: "rail-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`All posts`);
					else return [createTextVNode("All posts")];
				}),
				_: 1
			}, _parent));
			_push(`</p></div><div class="rail-card cta-card" data-v-f1d6bdd9><span class="rail-label" data-v-f1d6bdd9>Need work like this?</span><p data-v-f1d6bdd9> I build websites, dashboards, SaaS workflows, internal tools, automation, and software upgrades for growing businesses. </p>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/case-studies",
				class: "cta-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`See case studies`);
					else return [createTextVNode("See case studies")];
				}),
				_: 1
			}, _parent));
			_push(`</div></aside></main></div><!--]-->`);
		};
	}
});
//#endregion
//#region resources/js/Pages/Blog/Show.vue
var _sfc_setup = Show_vue_vue_type_script_setup_true_lang_default.setup;
Show_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Blog/Show.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Show_default = /* @__PURE__ */ _plugin_vue_export_helper_default(Show_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-f1d6bdd9"]]);
//#endregion
export { Show_default as default };
