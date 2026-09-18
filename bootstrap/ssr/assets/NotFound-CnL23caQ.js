import { i as link_default, r as head_default } from "./vendor-inertia-Bgi69XOP.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { createBlock, createVNode, defineComponent, openBlock, resolveDynamicComponent, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { ArrowLeft, ArrowUpRight } from "lucide-vue-next";
//#region resources/js/Pages/Errors/NotFound.vue?vue&type=script&setup=true&lang.ts
var NotFound_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "NotFound",
	__ssrInlineRender: true,
	props: { requestedPath: {} },
	setup(__props) {
		const suggestions = [
			{
				label: "Case Studies",
				href: "/case-studies",
				icon: ArrowUpRight
			},
			{
				label: "For Hiring Managers",
				href: "/for-hiring-managers",
				icon: ArrowUpRight
			},
			{
				label: "Get in touch",
				href: "/#contact",
				icon: ArrowUpRight
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(head_default), { title: "404 — Page not found — Ashish Gupta" }, null, _parent));
			_push(`<main class="err-shell" data-v-41599cf1><div class="err-wrap" data-v-41599cf1><p class="err-code" data-v-41599cf1>404</p><h1 class="err-title" data-v-41599cf1>The page you were looking for isn&#39;t here.</h1><p class="err-sub" data-v-41599cf1> It may have moved, been renamed, or never existed. Here&#39;s where most people go from here: </p><ul class="err-suggestions" data-v-41599cf1><!--[-->`);
			ssrRenderList(suggestions, (s) => {
				_push(`<li data-v-41599cf1>`);
				_push(ssrRenderComponent(unref(link_default), {
					href: s.href,
					class: "err-suggest-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<span data-v-41599cf1${_scopeId}>${ssrInterpolate(s.label)}</span>`);
							ssrRenderVNode(_push, createVNode(resolveDynamicComponent(s.icon), { size: 14 }, null), _parent, _scopeId);
						} else return [createVNode("span", null, toDisplayString(s.label), 1), (openBlock(), createBlock(resolveDynamicComponent(s.icon), { size: 14 }))];
					}),
					_: 2
				}, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/",
				class: "err-back"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(ArrowLeft), { size: 14 }, null, _parent, _scopeId));
						_push(`<span data-v-41599cf1${_scopeId}>Back to the home page</span>`);
					} else return [createVNode(unref(ArrowLeft), { size: 14 }), createVNode("span", null, "Back to the home page")];
				}),
				_: 1
			}, _parent));
			_push(`</div></main><!--]-->`);
		};
	}
});
//#endregion
//#region resources/js/Pages/Errors/NotFound.vue
var _sfc_setup = NotFound_vue_vue_type_script_setup_true_lang_default.setup;
NotFound_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Errors/NotFound.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var NotFound_default = /* @__PURE__ */ _plugin_vue_export_helper_default(NotFound_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-41599cf1"]]);
//#endregion
export { NotFound_default as default };
