import { onMounted, ref } from "vue";
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
export { useTheme as t };
