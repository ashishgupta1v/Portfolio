import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { t as trackAiAssistantOpen } from "./analytics-BdbHl86R.js";
import { defineComponent, mergeProps, onBeforeUnmount, onMounted, ref, unref, useSSRContext } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { MessageSquare, Send, Sparkles, X } from "lucide-vue-next";
//#region resources/js/Components/PortfolioV2/ChatWidget.vue?vue&type=script&setup=true&lang.ts
var MAX_INPUT_LENGTH = 1e3;
var ChatWidget_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ChatWidget",
	__ssrInlineRender: true,
	setup(__props) {
		function renderChatMarkdown(input) {
			const lines = input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").split(/\r?\n/);
			const out = [];
			let listMode = null;
			function closeList() {
				if (listMode) {
					out.push(`</${listMode}>`);
					listMode = null;
				}
			}
			for (const raw of lines) {
				const line = raw.trimEnd();
				const bullet = line.match(/^\s*[-*]\s+(.*)$/);
				const numbered = line.match(/^\s*\d+\.\s+(.*)$/);
				if (bullet) {
					if (listMode !== "ul") {
						closeList();
						out.push("<ul>");
						listMode = "ul";
					}
					out.push(`<li>${inline(bullet[1])}</li>`);
				} else if (numbered) {
					if (listMode !== "ol") {
						closeList();
						out.push("<ol>");
						listMode = "ol";
					}
					out.push(`<li>${inline(numbered[1])}</li>`);
				} else if (line === "") {
					closeList();
					out.push("");
				} else {
					closeList();
					out.push(`<p>${inline(line)}</p>`);
				}
			}
			closeList();
			return out.join("");
		}
		function inline(text) {
			return text.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/|mailto:)[^\s)]+)\)/g, (_m, label, url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
		}
		const isOpen = ref(false);
		const input = ref("");
		const messages = ref([{
			role: "assistant",
			content: "Hi! I am Ashish's AI assistant. Ask me about his tech stack, work experience, or how to contact him."
		}]);
		const isTyping = ref(false);
		ref(null);
		function handleOpenAssistant() {
			if (!isOpen.value) trackAiAssistantOpen("event_trigger");
			isOpen.value = true;
		}
		onMounted(() => {
			window.addEventListener("open-ai-assistant", handleOpenAssistant);
		});
		onBeforeUnmount(() => {
			window.removeEventListener("open-ai-assistant", handleOpenAssistant);
		});
		const promptChips = [
			"Is he open to full-time — and when can he start?",
			"What's his strongest stack?",
			"Show me his AI / RAG experience.",
			"Notice period, timezone & work authorization?",
			"What's his biggest measurable impact?"
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-widget-wrapper" }, _attrs))} data-v-fae11a34><button class="${ssrRenderClass([{ "is-open": isOpen.value }, "chat-toggle-btn"])}" aria-label="Toggle AI Assistant" data-v-fae11a34>`);
			if (isOpen.value) _push(ssrRenderComponent(unref(X), { size: 24 }, null, _parent));
			else _push(ssrRenderComponent(unref(MessageSquare), { size: 24 }, null, _parent));
			_push(`</button>`);
			if (isOpen.value) {
				_push(`<div class="chat-window" data-v-fae11a34><div class="chat-header" data-v-fae11a34>`);
				_push(ssrRenderComponent(unref(Sparkles), {
					size: 18,
					class: "header-icon"
				}, null, _parent));
				_push(`<div class="header-text" data-v-fae11a34><h3 data-v-fae11a34>AI Assistant</h3><p data-v-fae11a34>Ask anything about my work</p></div></div><div class="chat-messages" data-v-fae11a34><!--[-->`);
				ssrRenderList(messages.value, (msg, idx) => {
					_push(`<div class="${ssrRenderClass([msg.role === "user" ? "bubble-user" : "bubble-assistant", "chat-bubble"])}" data-v-fae11a34>`);
					if (msg.role === "user") _push(`<!--[-->${ssrInterpolate(msg.content)}<!--]-->`);
					else _push(`<div class="bubble-md" data-v-fae11a34>${renderChatMarkdown(msg.content) ?? ""}</div>`);
					_push(`</div>`);
				});
				_push(`<!--]-->`);
				if (isTyping.value) _push(`<div class="chat-bubble bubble-assistant typing-indicator" data-v-fae11a34><span data-v-fae11a34></span><span data-v-fae11a34></span><span data-v-fae11a34></span></div>`);
				else _push(`<!---->`);
				_push(`</div><div class="chat-chips-row" aria-label="Suggested questions" data-v-fae11a34><!--[-->`);
				ssrRenderList(promptChips, (chip, idx) => {
					_push(`<button type="button" class="chat-chip"${ssrIncludeBooleanAttr(isTyping.value) ? " disabled" : ""} data-v-fae11a34>${ssrInterpolate(chip)}</button>`);
				});
				_push(`<!--]--></div><div class="chat-input-area" data-v-fae11a34><input${ssrRenderAttr("value", input.value)} type="text"${ssrRenderAttr("maxlength", MAX_INPUT_LENGTH)}${ssrIncludeBooleanAttr(isTyping.value) ? " disabled" : ""} placeholder="Ask a question..." aria-label="Ask Ashish&#39;s AI assistant a question" data-v-fae11a34><button${ssrIncludeBooleanAttr(!input.value.trim() || isTyping.value) ? " disabled" : ""} aria-label="Send message to AI assistant" data-v-fae11a34>`);
				_push(ssrRenderComponent(unref(Send), { size: 18 }, null, _parent));
				_push(`</button></div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/ChatWidget.vue
var _sfc_setup = ChatWidget_vue_vue_type_script_setup_true_lang_default.setup;
ChatWidget_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/ChatWidget.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ChatWidget_default = /* @__PURE__ */ _plugin_vue_export_helper_default(ChatWidget_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-fae11a34"]]);
//#endregion
export { ChatWidget_default as default };
