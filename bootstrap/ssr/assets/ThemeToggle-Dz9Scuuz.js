import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { computed, defineComponent, onMounted, ref, useSSRContext } from "vue";
import { Monitor, Moon, SunMedium } from "lucide-vue-next";
//#region resources/js/Composables/useTheme.ts
var theme = ref("dark");
var resolvedTheme = ref("dark");
var initialized = false;
function applyResolvedTheme(resolved) {
	resolvedTheme.value = resolved;
	if (typeof document !== "undefined") document.documentElement.setAttribute("data-theme", resolved);
}
function applyThemeSettings(pref) {
	applyResolvedTheme("dark");
}
function initTheme() {
	if (initialized || typeof window === "undefined") return;
	initialized = true;
	theme.value = "dark";
	applyResolvedTheme("dark");
}
function useTheme() {
	onMounted(() => {
		initTheme();
	});
	function setTheme(next) {
		theme.value = next;
		if (typeof localStorage !== "undefined") localStorage.setItem("theme", next);
		applyThemeSettings(next);
	}
	return {
		theme,
		resolvedTheme,
		setTheme
	};
}
//#endregion
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
var ThemeToggle_default = /* @__PURE__ */ _plugin_vue_export_helper_default(ThemeToggle_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-84733fa0"]]);
//#endregion
export { useTheme as n, ThemeToggle_default as t };
