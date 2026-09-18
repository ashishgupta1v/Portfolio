import { i as link_default, r as head_default } from "./vendor-inertia-Bgi69XOP.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { t as ThemeToggle_default } from "./ThemeToggle-Dc8552Zt.js";
import { createTextVNode, createVNode, defineComponent, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Blog/Index.vue?vue&type=script&setup=true&lang.ts
var Index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Index",
	__ssrInlineRender: true,
	props: { posts: {} },
	setup(__props) {
		function formatDate(value) {
			return new Date(value).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric"
			});
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(head_default), { title: "Blog" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<meta name="description" content="Notes on domain-driven architecture, Laravel, Vue, and building production systems that hold up under real load — from Ashish Gupta." data-v-63ed7ffa${_scopeId}><link rel="canonical" href="https://ashishgupta.dev/blog" data-v-63ed7ffa${_scopeId}>`);
					else return [createVNode("meta", {
						name: "description",
						content: "Notes on domain-driven architecture, Laravel, Vue, and building production systems that hold up under real load — from Ashish Gupta."
					}), createVNode("link", {
						rel: "canonical",
						href: "https://ashishgupta.dev/blog"
					})];
				}),
				_: 1
			}, _parent));
			_push(`<div class="blog-page" data-v-63ed7ffa><header class="hero-shell" data-v-63ed7ffa><div class="topbar" data-v-63ed7ffa>`);
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
			_push(`<div class="topbar-links" data-v-63ed7ffa>`);
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
			_push(`<span class="topbar-current" data-v-63ed7ffa>Blog</span>`);
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
			_push(`</div></div><div class="hero-copy" data-v-63ed7ffa><p class="eyebrow" data-v-63ed7ffa>Field Notes</p><h1 data-v-63ed7ffa>Writing on architecture, Laravel, and shipping systems that last.</h1><p class="hero-text" data-v-63ed7ffa> Longer-form notes on the same craft behind the case studies: domain boundaries, delivery trade-offs, and the decisions that hold up once a system meets real load. </p></div></header><main class="library-shell" data-v-63ed7ffa>`);
			if (__props.posts.length === 0) _push(`<p class="empty-state" data-v-63ed7ffa>No posts published yet. Check back soon.</p>`);
			else _push(`<!---->`);
			_push(`<!--[-->`);
			ssrRenderList(__props.posts, (post) => {
				_push(`<article class="post-card" data-v-63ed7ffa><div class="post-meta-row" data-v-63ed7ffa><span class="post-date" data-v-63ed7ffa>${ssrInterpolate(formatDate(post.publishedAt))}</span><span class="post-reading" data-v-63ed7ffa>${ssrInterpolate(post.readingTimeMinutes)} min read</span></div><h2 class="post-title" data-v-63ed7ffa>`);
				_push(ssrRenderComponent(unref(link_default), {
					href: `/blog/${post.slug}`,
					class: "post-title-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(post.title)}`);
						else return [createTextVNode(toDisplayString(post.title), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</h2><p class="post-excerpt" data-v-63ed7ffa>${ssrInterpolate(post.excerpt)}</p><div class="tag-row" data-v-63ed7ffa><!--[-->`);
				ssrRenderList(post.tags, (tag) => {
					_push(`<span class="tag-chip" data-v-63ed7ffa>${ssrInterpolate(tag)}</span>`);
				});
				_push(`<!--]--></div>`);
				_push(ssrRenderComponent(unref(link_default), {
					href: `/blog/${post.slug}`,
					class: "read-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Read post`);
						else return [createTextVNode("Read post")];
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
//#region resources/js/Pages/Blog/Index.vue
var _sfc_setup = Index_vue_vue_type_script_setup_true_lang_default.setup;
Index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Blog/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Index_default = /* @__PURE__ */ _plugin_vue_export_helper_default(Index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-63ed7ffa"]]);
//#endregion
export { Index_default as default };
