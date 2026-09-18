import { t as useTheme } from "./useTheme-BDmDYc1g.js";
import { computed, defineComponent, useSSRContext } from "vue";
import { Monitor, Moon, SunMedium } from "lucide-vue-next";
//#region resources/js/Components/PortfolioV2/ThemeToggle.vue?vue&type=script&setup=true&lang.ts
var ThemeToggle_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ThemeToggle",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme, setTheme } = useTheme();
		computed(() => {
			if (theme.value === "light") return SunMedium;
			if (theme.value === "dark") return Moon;
			return Monitor;
		});
		computed(() => {
			if (theme.value === "light") return "Light theme — click for dark";
			if (theme.value === "dark") return "Dark theme — click for system";
			return "System theme — click for light";
		});
		return (_ctx, _push, _parent, _attrs) => {};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/ThemeToggle.vue
var _sfc_setup = ThemeToggle_vue_vue_type_script_setup_true_lang_default.setup;
ThemeToggle_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/ThemeToggle.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ThemeToggle_default = ThemeToggle_vue_vue_type_script_setup_true_lang_default;
//#endregion
export { ThemeToggle_default as t };
