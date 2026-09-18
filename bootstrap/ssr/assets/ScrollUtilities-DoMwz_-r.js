import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { defineComponent, onMounted, onUnmounted, ref, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { ArrowUp } from "lucide-vue-next";
//#region resources/js/Components/PortfolioV2/ScrollUtilities.vue?vue&type=script&setup=true&lang.ts
var ScrollUtilities_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ScrollUtilities",
	__ssrInlineRender: true,
	setup(__props) {
		/**
		* Two small UX affordances bundled together because they share a scroll
		* listener:
		*   1. A thin progress bar pinned to the top of the viewport that tracks
		*      how far the visitor has read down the page.
		*   2. A back-to-top button that appears once the visitor has scrolled
		*      past one viewport height.
		*
		* Sharing one scroll listener keeps this cheap on a long single-page site.
		* Reading progress is a percentage of `scrollHeight - clientHeight` — safe
		* for pages of any length, including the 3× viewport hero.
		*/
		const progress = ref(0);
		const showBackToTop = ref(false);
		function onScroll() {
			const doc = document.documentElement;
			const distance = doc.scrollHeight - doc.clientHeight;
			progress.value = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
			showBackToTop.value = window.scrollY > window.innerHeight;
		}
		onMounted(() => {
			onScroll();
			window.addEventListener("scroll", onScroll, { passive: true });
			window.addEventListener("resize", onScroll, { passive: true });
		});
		onUnmounted(() => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[--><div class="scroll-progress" aria-hidden="true" data-v-a2b5244b><div class="scroll-progress-fill" style="${ssrRenderStyle({ transform: `scaleX(${progress.value})` })}" data-v-a2b5244b></div></div>`);
			if (showBackToTop.value) {
				_push(`<button type="button" class="back-to-top" aria-label="Scroll to top of page" data-v-a2b5244b>`);
				_push(ssrRenderComponent(unref(ArrowUp), {
					size: 18,
					"aria-hidden": "true"
				}, null, _parent));
				_push(`</button>`);
			} else _push(`<!---->`);
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/ScrollUtilities.vue
var _sfc_setup = ScrollUtilities_vue_vue_type_script_setup_true_lang_default.setup;
ScrollUtilities_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/ScrollUtilities.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ScrollUtilities_default = /* @__PURE__ */ _plugin_vue_export_helper_default(ScrollUtilities_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-a2b5244b"]]);
//#endregion
export { ScrollUtilities_default as default };
