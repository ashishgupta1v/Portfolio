import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { computed, defineComponent, mergeProps, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Components/PortfolioV2/InitialLoader.vue?vue&type=script&setup=true&lang.ts
var InitialLoader_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "InitialLoader",
	__ssrInlineRender: true,
	props: {
		progress: {},
		visible: { type: Boolean }
	},
	emits: ["skip"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const clampedProgress = computed(() => Math.max(0, Math.min(100, props.progress || 0)));
		const pointerX = ref(50);
		const pointerY = ref(50);
		const activeNode = ref(null);
		const sparkleSeeds = [
			{
				x: 10,
				y: 22,
				delay: .2,
				dur: 3.2
			},
			{
				x: 22,
				y: 76,
				delay: .8,
				dur: 3.8
			},
			{
				x: 31,
				y: 40,
				delay: .3,
				dur: 4.4
			},
			{
				x: 44,
				y: 16,
				delay: 1.1,
				dur: 3.6
			},
			{
				x: 58,
				y: 80,
				delay: .5,
				dur: 4.1
			},
			{
				x: 66,
				y: 30,
				delay: .9,
				dur: 3.4
			},
			{
				x: 74,
				y: 62,
				delay: .7,
				dur: 4.6
			},
			{
				x: 82,
				y: 24,
				delay: 1.4,
				dur: 3.9
			},
			{
				x: 88,
				y: 48,
				delay: .6,
				dur: 4.2
			},
			{
				x: 93,
				y: 70,
				delay: 1.2,
				dur: 3.5
			}
		];
		const bootPhase = computed(() => {
			const p = clampedProgress.value;
			if (p < 20) return "Booting Experience Core";
			if (p < 45) return "Loading cinematic frames";
			if (p < 75) return "Calibrating interaction modules";
			if (p < 99) return "Stabilizing AG interface";
			return "System ready";
		});
		const stageLines = computed(() => {
			const p = clampedProgress.value;
			return [
				{
					label: "Kernel",
					done: p >= 10
				},
				{
					label: "Sequence",
					done: p >= 38
				},
				{
					label: "Motion",
					done: p >= 64
				},
				{
					label: "Interface",
					done: p >= 88
				}
			];
		});
		const panelStyle = computed(() => ({
			"--px": `${pointerX.value}%`,
			"--py": `${pointerY.value}%`
		}));
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.visible) {
				_push(`<div${ssrRenderAttrs(mergeProps({
					class: "initial-loader",
					style: panelStyle.value,
					"aria-live": "polite",
					"aria-label": "Loading portfolio"
				}, _attrs))} data-v-224a360b><div class="loader-glow" data-v-224a360b></div><div class="loader-grid" data-v-224a360b></div><div class="loader-sparkles" aria-hidden="true" data-v-224a360b><!--[-->`);
				ssrRenderList(sparkleSeeds, (sparkle, index) => {
					_push(`<span class="sparkle" style="${ssrRenderStyle({
						"--x": sparkle.x + "%",
						"--y": sparkle.y + "%",
						"--delay": sparkle.delay + "s",
						"--dur": sparkle.dur + "s"
					})}" data-v-224a360b></span>`);
				});
				_push(`<!--]--></div><div class="loader-core" data-v-224a360b><div class="ag-reactor" aria-hidden="true" data-v-224a360b><div class="reactor-ring reactor-ring-a" data-v-224a360b></div><div class="reactor-ring reactor-ring-b" data-v-224a360b></div><div class="reactor-center" data-v-224a360b><span data-v-224a360b>AG</span></div></div><div class="loader-label" data-v-224a360b>Booting Experience</div><div class="loader-phase" data-v-224a360b>${ssrInterpolate(bootPhase.value)}</div><div class="loader-progress" data-v-224a360b>${ssrInterpolate(clampedProgress.value)}%</div><div class="loader-track" data-v-224a360b><div class="loader-fill" style="${ssrRenderStyle({ width: clampedProgress.value + "%" })}" data-v-224a360b></div></div><div class="stage-list" aria-hidden="true" data-v-224a360b><!--[-->`);
				ssrRenderList(stageLines.value, (stage) => {
					_push(`<span class="${ssrRenderClass([{ "is-done": stage.done }, "stage-pill"])}" data-v-224a360b>${ssrInterpolate(stage.label)}</span>`);
				});
				_push(`<!--]--></div><div class="play-row" aria-label="Interactive boot controls" data-v-224a360b><!--[-->`);
				ssrRenderList([
					"A",
					"G",
					"*"
				], (token) => {
					_push(`<button type="button" class="${ssrRenderClass([{ "is-active": activeNode.value === token.charCodeAt(0) }, "play-node"])}" data-v-224a360b>${ssrInterpolate(token)}</button>`);
				});
				_push(`<!--]--></div><div class="loader-footer-row" data-v-224a360b><p class="loader-hint" data-v-224a360b>Move your cursor to steer the AG core.</p><button type="button" class="btn-skip-boot" data-v-224a360b> Skip Intro ↗ </button></div></div></div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/InitialLoader.vue
var _sfc_setup = InitialLoader_vue_vue_type_script_setup_true_lang_default.setup;
InitialLoader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/InitialLoader.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var InitialLoader_default = /* @__PURE__ */ _plugin_vue_export_helper_default(InitialLoader_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-224a360b"]]);
//#endregion
export { InitialLoader_default as default };
