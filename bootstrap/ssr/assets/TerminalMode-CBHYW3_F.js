import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { defineComponent, nextTick, onMounted, onUnmounted, ref, useSSRContext, watch } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrRenderTeleport } from "vue/server-renderer";
//#region resources/js/Components/PortfolioV2/TerminalMode.vue?vue&type=script&setup=true&lang.ts
var PROMPT = "visitor@ashish.dev:~$ ";
var TerminalMode_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "TerminalMode",
	__ssrInlineRender: true,
	setup(__props) {
		const KONAMI = [
			"ArrowUp",
			"ArrowUp",
			"ArrowDown",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight",
			"ArrowLeft",
			"ArrowRight",
			"b",
			"a"
		];
		const isOpen = ref(false);
		const inputText = ref("");
		const history = ref([]);
		const commandHistory = ref([]);
		const historyIndex = ref(-1);
		ref(null);
		const inputEl = ref(null);
		let konamiPos = 0;
		function onGlobalKeydown(e) {
			const tag = e.target?.tagName;
			if (!isOpen.value && (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT")) return;
			if (!isOpen.value) {
				const expected = KONAMI[konamiPos];
				if (e.key === expected || e.key.toLowerCase() === expected) {
					konamiPos++;
					if (konamiPos === KONAMI.length) {
						konamiPos = 0;
						openTerminal();
					}
				} else konamiPos = 0;
				return;
			}
			if (e.key === "Escape") {
				isOpen.value = false;
				return;
			}
		}
		function openTerminal() {
			history.value = [{
				type: "output",
				text: "Welcome to ashish.dev terminal v1.0.0\nType 'help' for available commands.\n"
			}];
			commandHistory.value = [];
			historyIndex.value = 0;
			inputText.value = "";
			isOpen.value = true;
		}
		watch(isOpen, (open) => {
			if (open) {
				document.body.style.overflow = "hidden";
				nextTick(() => inputEl.value?.focus());
			} else document.body.style.overflow = "";
		});
		onMounted(() => {
			window.addEventListener("keydown", onGlobalKeydown);
		});
		onUnmounted(() => {
			window.removeEventListener("keydown", onGlobalKeydown);
			document.body.style.overflow = "";
		});
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderTeleport(_push, (_push) => {
				if (isOpen.value) {
					_push(`<div class="terminal-overlay" data-v-88e1094e><div class="terminal-window" data-v-88e1094e><div class="scanlines" aria-hidden="true" data-v-88e1094e></div><div class="terminal-titlebar" data-v-88e1094e><span class="terminal-dot terminal-dot--red" data-v-88e1094e></span><span class="terminal-dot terminal-dot--yellow" data-v-88e1094e></span><span class="terminal-dot terminal-dot--green" data-v-88e1094e></span><span class="terminal-titlebar__text" data-v-88e1094e>visitor@ashish.dev: ~</span><button class="terminal-close" aria-label="Close terminal" data-v-88e1094e> × </button></div><div class="terminal-output" data-v-88e1094e><!--[-->`);
					ssrRenderList(history.value, (line, i) => {
						_push(`<div class="${ssrRenderClass(["terminal-line", `terminal-line--${line.type}`])}" data-v-88e1094e><pre data-v-88e1094e>${ssrInterpolate(line.text)}</pre></div>`);
					});
					_push(`<!--]--></div><form class="terminal-input-line" data-v-88e1094e><span class="terminal-prompt" data-v-88e1094e>${ssrInterpolate(PROMPT)}</span><input${ssrRenderAttr("value", inputText.value)} class="terminal-input" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="Terminal input" data-v-88e1094e></form></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/TerminalMode.vue
var _sfc_setup = TerminalMode_vue_vue_type_script_setup_true_lang_default.setup;
TerminalMode_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/TerminalMode.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var TerminalMode_default = /* @__PURE__ */ _plugin_vue_export_helper_default(TerminalMode_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-88e1094e"]]);
//#endregion
export { TerminalMode_default as default };
