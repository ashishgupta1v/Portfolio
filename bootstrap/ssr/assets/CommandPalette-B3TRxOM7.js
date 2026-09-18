import { a as router10 } from "./vendor-inertia-Bgi69XOP.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { t as useTheme } from "./useTheme-BDmDYc1g.js";
import { computed, createVNode, defineComponent, nextTick, onMounted, onUnmounted, ref, resolveDynamicComponent, unref, useSSRContext, watch } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderTeleport, ssrRenderVNode } from "vue/server-renderer";
import { ArrowUp, BookOpen, Briefcase, Cpu, FileDown, FolderOpen, Handshake, Layers, Mail, Search, SunMoon, User } from "lucide-vue-next";
//#region resources/js/Components/PortfolioV2/CommandPalette.vue?vue&type=script&setup=true&lang.ts
var CommandPalette_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "CommandPalette",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme, setTheme } = useTheme();
		const open = ref(false);
		const query = ref("");
		const activeIndex = ref(0);
		const inputRef = ref(null);
		const actions = [
			{
				id: "nav-about",
				label: "Go to About",
				group: "Navigation",
				icon: User,
				hint: "1",
				execute: () => scrollToSection("about")
			},
			{
				id: "nav-work",
				label: "Go to Work",
				group: "Navigation",
				icon: FolderOpen,
				hint: "3",
				execute: () => scrollToSection("work")
			},
			{
				id: "nav-career",
				label: "Go to Career",
				group: "Navigation",
				icon: Briefcase,
				hint: "2",
				execute: () => scrollToSection("career")
			},
			{
				id: "nav-tech",
				label: "Go to Tech Stack",
				group: "Navigation",
				icon: Cpu,
				hint: "4",
				execute: () => scrollToSection("tech")
			},
			{
				id: "nav-contact",
				label: "Go to Contact",
				group: "Navigation",
				icon: Mail,
				hint: "6",
				execute: () => scrollToSection("contact")
			},
			{
				id: "nav-top",
				label: "Go to Top",
				group: "Navigation",
				icon: ArrowUp,
				hint: "g h",
				execute: () => {
					window.scrollTo({
						top: 0,
						behavior: "smooth"
					});
				}
			},
			{
				id: "page-blog",
				label: "Open Blog",
				group: "Pages",
				icon: BookOpen,
				hint: "",
				execute: () => router10.visit("/blog")
			},
			{
				id: "page-case-studies",
				label: "Open Case Studies",
				group: "Pages",
				icon: Layers,
				hint: "",
				execute: () => router10.visit("/case-studies")
			},
			{
				id: "page-hiring",
				label: "For Hiring Managers",
				group: "Pages",
				icon: Handshake,
				hint: "",
				execute: () => router10.visit("/for-hiring-managers")
			},
			{
				id: "action-theme",
				label: "Toggle Theme",
				group: "Actions",
				icon: SunMoon,
				hint: "",
				execute: () => {
					setTheme(theme.value === "dark" ? "light" : "dark");
				}
			},
			{
				id: "action-resume",
				label: "Download Resume",
				group: "Actions",
				icon: FileDown,
				hint: "",
				execute: () => {
					const link = document.createElement("a");
					link.href = "/resume";
					link.download = "Ashish-Gupta-Resume.pdf";
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				}
			}
		];
		const filteredActions = computed(() => {
			const q = query.value.toLowerCase().trim();
			if (!q) return actions;
			return actions.filter((a) => a.label.toLowerCase().includes(q) || a.group.toLowerCase().includes(q));
		});
		const groupedActions = computed(() => {
			const groups = [];
			for (const g of [
				"Navigation",
				"Pages",
				"Actions"
			]) {
				const items = filteredActions.value.filter((a) => a.group === g);
				if (items.length) groups.push({
					name: g,
					items
				});
			}
			return groups;
		});
		watch(filteredActions, () => {
			activeIndex.value = 0;
		});
		function scrollToSection(id) {
			const el = document.getElementById(id);
			if (el) el.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		}
		function openPalette() {
			open.value = true;
			query.value = "";
			activeIndex.value = 0;
			nextTick(() => inputRef.value?.focus());
		}
		function closePalette() {
			open.value = false;
		}
		function isEditableTarget(target) {
			if (!(target instanceof HTMLElement)) return false;
			const tag = target.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
			if (target.isContentEditable) return true;
			return false;
		}
		function onGlobalKeydown(event) {
			if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
				if (isEditableTarget(event.target)) return;
				event.preventDefault();
				if (open.value) closePalette();
				else openPalette();
			}
			if (event.key === "Escape" && open.value) {
				event.preventDefault();
				closePalette();
			}
		}
		onMounted(() => {
			window.addEventListener("keydown", onGlobalKeydown);
		});
		onUnmounted(() => {
			window.removeEventListener("keydown", onGlobalKeydown);
		});
		const isMac = ref(false);
		onMounted(() => {
			isMac.value = navigator.platform?.toUpperCase().includes("MAC") ?? false;
		});
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderTeleport(_push, (_push) => {
				if (open.value) {
					_push(`<div class="cp-overlay" role="dialog" aria-modal="true" aria-label="Command palette" data-v-330d9226><div class="cp-card" data-v-330d9226><div class="cp-header" data-v-330d9226>`);
					_push(ssrRenderComponent(unref(Search), {
						size: 18,
						class: "cp-search-icon",
						"aria-hidden": "true"
					}, null, _parent));
					_push(`<input${ssrRenderAttr("value", query.value)} class="cp-input" type="text" placeholder="Type a command or search..." aria-label="Search actions, projects, and pages" autocomplete="off" spellcheck="false" data-v-330d9226></div><div class="cp-list" role="listbox" data-v-330d9226>`);
					if (filteredActions.value.length) {
						_push(`<!--[-->`);
						ssrRenderList(groupedActions.value, (group) => {
							_push(`<!--[--><div class="cp-group-label" data-v-330d9226>${ssrInterpolate(group.name)}</div><!--[-->`);
							ssrRenderList(group.items, (action, i) => {
								_push(`<button class="${ssrRenderClass([{ "cp-item--active": filteredActions.value.indexOf(action) === activeIndex.value }, "cp-item"])}" role="option"${ssrRenderAttr("aria-selected", filteredActions.value.indexOf(action) === activeIndex.value)} data-v-330d9226>`);
								ssrRenderVNode(_push, createVNode(resolveDynamicComponent(action.icon), {
									size: 16,
									class: "cp-item-icon",
									"aria-hidden": "true"
								}, null), _parent);
								_push(`<span class="cp-item-label" data-v-330d9226>${ssrInterpolate(action.label)}</span>`);
								if (action.hint) _push(`<kbd class="cp-kbd" data-v-330d9226>${ssrInterpolate(action.hint)}</kbd>`);
								else _push(`<!---->`);
								_push(`</button>`);
							});
							_push(`<!--]--><!--]-->`);
						});
						_push(`<!--]-->`);
					} else _push(`<div class="cp-empty" data-v-330d9226>No results found</div>`);
					_push(`</div><div class="cp-footer" data-v-330d9226><span class="cp-footer-hint" data-v-330d9226><kbd class="cp-kbd cp-kbd--sm" data-v-330d9226>↑</kbd><kbd class="cp-kbd cp-kbd--sm" data-v-330d9226>↓</kbd> navigate </span><span class="cp-footer-hint" data-v-330d9226><kbd class="cp-kbd cp-kbd--sm" data-v-330d9226>↵</kbd> select </span><span class="cp-footer-hint" data-v-330d9226><kbd class="cp-kbd cp-kbd--sm" data-v-330d9226>esc</kbd> close </span><span class="cp-footer-shortcut" data-v-330d9226><kbd class="cp-kbd cp-kbd--sm" data-v-330d9226>${ssrInterpolate(isMac.value ? "⌘" : "Ctrl")}+K</kbd></span></div></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/CommandPalette.vue
var _sfc_setup = CommandPalette_vue_vue_type_script_setup_true_lang_default.setup;
CommandPalette_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/CommandPalette.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var CommandPalette_default = /* @__PURE__ */ _plugin_vue_export_helper_default(CommandPalette_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-330d9226"]]);
//#endregion
export { CommandPalette_default as default };
