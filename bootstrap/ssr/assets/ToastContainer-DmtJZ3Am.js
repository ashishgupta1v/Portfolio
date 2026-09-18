import { defineComponent, readonly, ref, unref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderTeleport } from "vue/server-renderer";
//#region resources/js/Composables/useToast.ts
var toasts = ref([]);
var nextId = 0;
function show(message, type = "info", duration = 4e3) {
	const id = ++nextId;
	toasts.value.push({
		id,
		message,
		type
	});
	setTimeout(() => {
		const t = toasts.value.find((t) => t.id === id);
		if (t) t.leaving = true;
		setTimeout(() => {
			toasts.value = toasts.value.filter((t) => t.id !== id);
		}, 220);
	}, duration);
}
function useToast() {
	return {
		toasts: readonly(toasts),
		success: (msg) => show(msg, "success"),
		error: (msg) => show(msg, "error"),
		info: (msg) => show(msg, "info")
	};
}
//#endregion
//#region resources/js/Components/PortfolioV2/ToastContainer.vue?vue&type=script&setup=true&lang.ts
var ToastContainer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ToastContainer",
	__ssrInlineRender: true,
	setup(__props) {
		const { toasts } = useToast();
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderTeleport(_push, (_push) => {
				_push(`<div class="toast-container" aria-live="polite" aria-atomic="true"><!--[-->`);
				ssrRenderList(unref(toasts), (toast) => {
					_push(`<div class="${ssrRenderClass([[`toast--${toast.type}`, { "toast-out": toast.leaving }], "toast"])}" role="status">${ssrInterpolate(toast.message)}</div>`);
				});
				_push(`<!--]--></div>`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/ToastContainer.vue
var _sfc_setup = ToastContainer_vue_vue_type_script_setup_true_lang_default.setup;
ToastContainer_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/ToastContainer.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ToastContainer_default = ToastContainer_vue_vue_type_script_setup_true_lang_default;
//#endregion
export { ToastContainer_default as default };
