import { i as link_default, r as head_default } from "./vendor-inertia-Bgi69XOP.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { t as ThemeToggle_default } from "./ThemeToggle-Dz9Scuuz.js";
import { createTextVNode, createVNode, defineComponent, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/CaseStudies/Index.vue?vue&type=script&setup=true&lang.ts
var Index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Index",
	__ssrInlineRender: true,
	props: { caseStudies: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(head_default), { title: "Case Studies" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<meta name="description" content="Deep architecture and delivery case studies from Ashish Gupta. Canonical long-form proof of systems thinking, execution quality, and product outcomes." data-v-80cb1eb7${_scopeId}><link rel="canonical" href="https://ashishgupta.dev/case-studies" data-v-80cb1eb7${_scopeId}>`);
					else return [createVNode("meta", {
						name: "description",
						content: "Deep architecture and delivery case studies from Ashish Gupta. Canonical long-form proof of systems thinking, execution quality, and product outcomes."
					}), createVNode("link", {
						rel: "canonical",
						href: "https://ashishgupta.dev/case-studies"
					})];
				}),
				_: 1
			}, _parent));
			_push(`<div class="case-studies-page" data-v-80cb1eb7><header class="hero-shell" data-v-80cb1eb7><div class="topbar" data-v-80cb1eb7>`);
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
			_push(`<div class="topbar-links" data-v-80cb1eb7>`);
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
			_push(`<span class="topbar-current" data-v-80cb1eb7>Case Studies</span>`);
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
			_push(`</div></div><div class="hero-copy" data-v-80cb1eb7><p class="eyebrow" data-v-80cb1eb7>Canonical Library</p><h1 data-v-80cb1eb7>Case studies that prove portfolio depth, not vanity metrics.</h1><p class="hero-text" data-v-80cb1eb7> This library is the long-form evidence layer behind ashishgupta.dev: named systems, architectural trade-offs, delivery choices, and measurable outcomes that a recruiter or founder can assess in minutes. </p></div></header><main class="library-shell" data-v-80cb1eb7><!--[-->`);
			ssrRenderList(__props.caseStudies, (study) => {
				_push(`<article class="study-card" data-v-80cb1eb7><div class="study-meta-row" data-v-80cb1eb7><span class="study-client" data-v-80cb1eb7>${ssrInterpolate(study.client)}</span><span class="study-reading" data-v-80cb1eb7>${ssrInterpolate(study.readingTimeMinutes)} min read</span></div><h2 class="study-title" data-v-80cb1eb7>`);
				_push(ssrRenderComponent(unref(link_default), {
					href: `/case-studies/${study.slug}`,
					class: "study-title-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(study.title)}`);
						else return [createTextVNode(toDisplayString(study.title), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</h2><p class="study-summary" data-v-80cb1eb7>${ssrInterpolate(study.summary)}</p><div class="study-highlight" data-v-80cb1eb7><span class="highlight-label" data-v-80cb1eb7>Featured outcome</span><p data-v-80cb1eb7>${ssrInterpolate(study.featuredOutcome)}</p></div><div class="study-detail-row" data-v-80cb1eb7><span data-v-80cb1eb7>${ssrInterpolate(study.industry)}</span><span data-v-80cb1eb7>${ssrInterpolate(study.timeline)}</span><span data-v-80cb1eb7>${ssrInterpolate(study.publishedAt)}</span></div><div class="tag-row" data-v-80cb1eb7><!--[-->`);
				ssrRenderList(study.tags, (tag) => {
					_push(`<span class="tag-chip" data-v-80cb1eb7>${ssrInterpolate(tag)}</span>`);
				});
				_push(`<!--]--></div>`);
				_push(ssrRenderComponent(unref(link_default), {
					href: `/case-studies/${study.slug}`,
					class: "read-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Read case study`);
						else return [createTextVNode("Read case study")];
					}),
					_: 2
				}, _parent));
				_push(`</article>`);
			});
			_push(`<!--]--></main></div><!--]-->`);
		};
	}
});
//#endregion
//#region resources/js/Pages/CaseStudies/Index.vue
var _sfc_setup = Index_vue_vue_type_script_setup_true_lang_default.setup;
Index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/CaseStudies/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Index_default = /* @__PURE__ */ _plugin_vue_export_helper_default(Index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-80cb1eb7"]]);
//#endregion
export { Index_default as default };
