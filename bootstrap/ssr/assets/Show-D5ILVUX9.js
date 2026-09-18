import { i as link_default, r as head_default } from "./vendor-inertia-Bgi69XOP.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { t as ThemeToggle_default } from "./ThemeToggle-DfWc0Skh.js";
import { t as ArchitectureDiagram_default } from "./ArchitectureDiagram-4SIT4GO-.js";
import { computed, createBlock, createTextVNode, createVNode, defineComponent, mergeProps, onMounted, onUnmounted, openBlock, ref, resolveDynamicComponent, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderVNode } from "vue/server-renderer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Check, Download, Link2 } from "lucide-vue-next";
//#region resources/js/Components/PortfolioV2/ShareButtons.vue?vue&type=script&setup=true&lang.ts
var ShareButtons_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ShareButtons",
	__ssrInlineRender: true,
	props: {
		url: {},
		title: {},
		description: {}
	},
	setup(__props) {
		const copied = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "share-buttons" }, _attrs))} data-v-da7f2082><span class="share-label" data-v-da7f2082>Share</span><button class="share-btn" title="Share on LinkedIn" aria-label="Share on LinkedIn" data-v-da7f2082><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" data-v-da7f2082><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" data-v-da7f2082></path></svg></button><button class="share-btn" title="Share on X (Twitter)" aria-label="Share on X" data-v-da7f2082><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" data-v-da7f2082><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" data-v-da7f2082></path></svg></button><button class="${ssrRenderClass([{ copied: copied.value }, "share-btn"])}"${ssrRenderAttr("title", copied.value ? "Copied!" : "Copy link")}${ssrRenderAttr("aria-label", copied.value ? "Link copied" : "Copy link")} data-v-da7f2082>`);
			if (copied.value) _push(ssrRenderComponent(unref(Check), { size: 16 }, null, _parent));
			else _push(ssrRenderComponent(unref(Link2), { size: 16 }, null, _parent));
			_push(`</button></div>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/ShareButtons.vue
var _sfc_setup$1 = ShareButtons_vue_vue_type_script_setup_true_lang_default.setup;
ShareButtons_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/ShareButtons.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ShareButtons_default = /* @__PURE__ */ _plugin_vue_export_helper_default(ShareButtons_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-da7f2082"]]);
//#endregion
//#region resources/js/Pages/CaseStudies/Show.vue?vue&type=script&setup=true&lang.ts
var Show_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Show",
	__ssrInlineRender: true,
	props: { caseStudy: {} },
	setup(__props) {
		gsap.registerPlugin(ScrollTrigger);
		const props = __props;
		`${encodeURIComponent(`Hi Ashish, I just read your ${props.caseStudy.title} case study on ashishgupta.dev. I need a similar website, app, dashboard, software improvement, or automation for my business. Please tell me how you can help and what the next step should be.`)}`;
		const shareUrl = computed(() => `https://ashishgupta.dev/case-studies/${props.caseStudy.slug}`);
		const readingProgress = ref(0);
		function updateProgress() {
			const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			readingProgress.value = docHeight > 0 ? Math.round(window.scrollY / docHeight * 100) : 0;
		}
		const heroRef = ref(null);
		const articleRef = ref(null);
		const railRef = ref(null);
		onMounted(() => {
			window.addEventListener("scroll", updateProgress, { passive: true });
			const tl = gsap.timeline();
			if (heroRef.value) tl.from(heroRef.value.querySelectorAll(".hero-copy > *"), {
				y: 30,
				opacity: 0,
				duration: .8,
				stagger: .1,
				ease: "power3.out"
			}).from(heroRef.value.querySelectorAll(".hero-aside, .signal-band"), {
				y: 20,
				opacity: 0,
				duration: .6,
				stagger: .1,
				ease: "power3.out"
			}, "-=0.4");
			if (articleRef.value && railRef.value) {
				ScrollTrigger.create({
					trigger: articleRef.value,
					start: "top 85%",
					animation: gsap.from(articleRef.value, {
						y: 40,
						opacity: 0,
						duration: .8,
						ease: "power2.out"
					})
				});
				ScrollTrigger.create({
					trigger: railRef.value,
					start: "top 85%",
					animation: gsap.from(railRef.value.children, {
						y: 30,
						opacity: 0,
						duration: .6,
						stagger: .1,
						ease: "power2.out"
					})
				});
			}
		});
		onUnmounted(() => {
			window.removeEventListener("scroll", updateProgress);
			ScrollTrigger.getAll().forEach((t) => t.kill());
		});
		const articleSchema = computed(() => JSON.stringify({
			"@context": "https://schema.org",
			"@type": "Article",
			headline: props.caseStudy.title,
			description: props.caseStudy.seoDescription,
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
			datePublished: props.caseStudy.publishedAt,
			url: `https://ashishgupta.dev/case-studies/${props.caseStudy.slug}`,
			keywords: props.caseStudy.tags.join(", ")
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
					name: "Case Studies",
					item: "https://ashishgupta.dev/case-studies"
				},
				{
					"@type": "ListItem",
					position: 3,
					name: props.caseStudy.title,
					item: `https://ashishgupta.dev/case-studies/${props.caseStudy.slug}`
				}
			]
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(head_default), { title: __props.caseStudy.seoTitle }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<meta name="description"${ssrRenderAttr("content", __props.caseStudy.seoDescription)} data-v-e729cada${_scopeId}><meta property="og:title"${ssrRenderAttr("content", __props.caseStudy.seoTitle)} data-v-e729cada${_scopeId}><meta property="og:description"${ssrRenderAttr("content", __props.caseStudy.seoDescription)} data-v-e729cada${_scopeId}><meta property="og:type" content="article" data-v-e729cada${_scopeId}><meta property="og:url"${ssrRenderAttr("content", `https://ashishgupta.dev/case-studies/${__props.caseStudy.slug}`)} data-v-e729cada${_scopeId}><meta property="og:site_name" content="Ashish Gupta" data-v-e729cada${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-e729cada${_scopeId}><meta name="twitter:title"${ssrRenderAttr("content", __props.caseStudy.seoTitle)} data-v-e729cada${_scopeId}><meta name="twitter:description"${ssrRenderAttr("content", __props.caseStudy.seoDescription)} data-v-e729cada${_scopeId}><link rel="canonical"${ssrRenderAttr("href", `https://ashishgupta.dev/case-studies/${__props.caseStudy.slug}`)} data-v-e729cada${_scopeId}>`);
						ssrRenderVNode(_push, createVNode(resolveDynamicComponent("script"), { type: "application/ld+json" }, null), _parent, _scopeId);
						ssrRenderVNode(_push, createVNode(resolveDynamicComponent("script"), { type: "application/ld+json" }, null), _parent, _scopeId);
					} else return [
						createVNode("meta", {
							name: "description",
							content: __props.caseStudy.seoDescription
						}, null, 8, ["content"]),
						createVNode("meta", {
							property: "og:title",
							content: __props.caseStudy.seoTitle
						}, null, 8, ["content"]),
						createVNode("meta", {
							property: "og:description",
							content: __props.caseStudy.seoDescription
						}, null, 8, ["content"]),
						createVNode("meta", {
							property: "og:type",
							content: "article"
						}),
						createVNode("meta", {
							property: "og:url",
							content: `https://ashishgupta.dev/case-studies/${__props.caseStudy.slug}`
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
							content: __props.caseStudy.seoTitle
						}, null, 8, ["content"]),
						createVNode("meta", {
							name: "twitter:description",
							content: __props.caseStudy.seoDescription
						}, null, 8, ["content"]),
						createVNode("link", {
							rel: "canonical",
							href: `https://ashishgupta.dev/case-studies/${__props.caseStudy.slug}`
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
			_push(`<div class="case-study-page" data-v-e729cada><div class="reading-progress" style="${ssrRenderStyle({ width: readingProgress.value + "%" })}" aria-hidden="true" data-v-e729cada></div><header class="hero-shell page-shell" data-v-e729cada><div class="topbar" data-v-e729cada>`);
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
			_push(`<div class="topbar-links" data-v-e729cada>`);
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
			_push(ssrRenderComponent(ShareButtons_default, {
				url: shareUrl.value,
				title: __props.caseStudy.title,
				description: __props.caseStudy.seoDescription
			}, null, _parent));
			_push(`<button class="pdf-download-btn" aria-label="Download as PDF" data-v-e729cada>`);
			_push(ssrRenderComponent(unref(Download), { size: 14 }, null, _parent));
			_push(`<span data-v-e729cada>Download PDF</span></button>`);
			_push(ssrRenderComponent(ThemeToggle_default, { class: "topbar-link" }, null, _parent));
			_push(`</div></div><div class="hero-grid" data-v-e729cada><div class="hero-copy" data-v-e729cada><p class="eyebrow" data-v-e729cada>Case Study</p><h1 data-v-e729cada>${ssrInterpolate(__props.caseStudy.title)}</h1><p class="hero-summary" data-v-e729cada>${ssrInterpolate(__props.caseStudy.summary)}</p></div><aside class="hero-aside" data-v-e729cada><div class="meta-block" data-v-e729cada><span class="meta-label" data-v-e729cada>Client</span><span class="meta-value" data-v-e729cada>${ssrInterpolate(__props.caseStudy.client)}</span></div><div class="meta-block" data-v-e729cada><span class="meta-label" data-v-e729cada>Role</span><span class="meta-value" data-v-e729cada>${ssrInterpolate(__props.caseStudy.role)}</span></div><div class="meta-block" data-v-e729cada><span class="meta-label" data-v-e729cada>Industry</span><span class="meta-value" data-v-e729cada>${ssrInterpolate(__props.caseStudy.industry)}</span></div><div class="meta-block" data-v-e729cada><span class="meta-label" data-v-e729cada>Timeline</span><span class="meta-value" data-v-e729cada>${ssrInterpolate(__props.caseStudy.timeline)}</span></div><div class="meta-block" data-v-e729cada><span class="meta-label" data-v-e729cada>Reading Time</span><span class="meta-value" data-v-e729cada>${ssrInterpolate(__props.caseStudy.readingTimeMinutes)} min</span></div></aside></div><div class="signal-band" data-v-e729cada><div data-v-e729cada><span class="signal-label" data-v-e729cada>Featured outcome</span><p data-v-e729cada>${ssrInterpolate(__props.caseStudy.featuredOutcome)}</p></div><div class="signal-stack" data-v-e729cada><!--[-->`);
			ssrRenderList(__props.caseStudy.stack, (item) => {
				_push(`<span class="stack-chip" data-v-e729cada>${ssrInterpolate(item)}</span>`);
			});
			_push(`<!--]--></div></div></header><main class="page-shell article-shell" data-v-e729cada><article class="article-card" data-v-e729cada><div class="article-prose" data-v-e729cada>${__props.caseStudy.bodyHtml ?? ""}</div></article>`);
			_push(ssrRenderComponent(ArchitectureDiagram_default, { slug: __props.caseStudy.slug }, null, _parent));
			_push(`<aside class="article-rail" data-v-e729cada><div class="rail-card" data-v-e729cada><span class="rail-label" data-v-e729cada>Permission status</span><p data-v-e729cada>${ssrInterpolate(__props.caseStudy.permissionStatus)}</p></div><div class="rail-card" data-v-e729cada><span class="rail-label" data-v-e729cada>Tags</span><div class="tag-grid" data-v-e729cada><!--[-->`);
			ssrRenderList(__props.caseStudy.tags, (tag) => {
				_push(`<span class="tag-chip" data-v-e729cada>${ssrInterpolate(tag)}</span>`);
			});
			_push(`<!--]--></div></div><div class="rail-card cta-card" data-v-e729cada><span class="rail-label" data-v-e729cada>Looking to Hire?</span><p data-v-e729cada> I architect and ship production systems end-to-end. Open to Senior / Staff Full-Stack Architect and Engineering Lead roles. </p><div class="cta-card-actions" data-v-e729cada>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/#contact",
				class: "cta-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Discuss an Engineering Role`);
					else return [createTextVNode("Discuss an Engineering Role")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(link_default), {
				href: "/for-hiring-managers",
				class: "cta-link cta-link-secondary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Hiring Manager Brief`);
					else return [createTextVNode("Hiring Manager Brief")];
				}),
				_: 1
			}, _parent));
			_push(`<a href="/resume/ashish-gupta-resume.pdf" target="_blank" rel="noopener noreferrer" class="cta-link cta-link-secondary" data-v-e729cada>Download Résumé (PDF)</a></div></div></aside></main></div><!--]-->`);
		};
	}
});
//#endregion
//#region resources/js/Pages/CaseStudies/Show.vue
var _sfc_setup = Show_vue_vue_type_script_setup_true_lang_default.setup;
Show_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/CaseStudies/Show.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Show_default = /* @__PURE__ */ _plugin_vue_export_helper_default(Show_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-e729cada"]]);
//#endregion
export { Show_default as default };
