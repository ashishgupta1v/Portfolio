import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { computed, defineComponent, mergeProps, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Components/PortfolioV2/ArchitectureDiagram.vue?vue&type=script&setup=true&lang.ts
var ArchitectureDiagram_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ArchitectureDiagram",
	__ssrInlineRender: true,
	props: { slug: {} },
	setup(__props) {
		const props = __props;
		const activeNode = ref(null);
		const architectures = {
			"zoeticoach-ai-whatsapp-accountability-engine": {
				title: "ZoetiCoach AI Production Architecture (RAG + Human-in-the-Loop)",
				nodes: [
					{
						id: "wa",
						label: "WhatsApp API",
						tech: "Meta Webhooks",
						x: 20,
						y: 30,
						color: "#25D366"
					},
					{
						id: "api",
						label: "Laravel Ingress",
						tech: "Event Ledger",
						x: 160,
						y: 30,
						color: "#FF2D20"
					},
					{
						id: "rag",
						label: "pgvector RAG",
						tech: "HNSW 1536d Cosine",
						x: 310,
						y: 30,
						color: "#336791"
					},
					{
						id: "guard",
						label: "Safety & Guardrails",
						tech: "Delimiters + Eval",
						x: 310,
						y: 130,
						color: "#f59e0b"
					},
					{
						id: "queue",
						label: "Approval Queue",
						tech: "Human-in-the-Loop",
						x: 160,
						y: 130,
						color: "#8b5cf6"
					},
					{
						id: "coach",
						label: "Coach Portal",
						tech: "Vue 3 + Inertia",
						x: 20,
						y: 130,
						color: "#42b883"
					}
				],
				edges: [
					{
						from: "wa",
						to: "api",
						label: "Signed Post"
					},
					{
						from: "api",
						to: "rag",
						label: "Vector Query"
					},
					{
						from: "rag",
						to: "guard",
						label: "Context Chunks"
					},
					{
						from: "guard",
						to: "queue",
						label: "Draft Action"
					},
					{
						from: "queue",
						to: "coach",
						label: "Review / Edit"
					},
					{
						from: "coach",
						to: "wa",
						label: "Approved Send"
					}
				]
			},
			"zoeticoach-ai": {
				title: "ZoetiCoach AI Production Architecture (RAG + Human-in-the-Loop)",
				nodes: [
					{
						id: "wa",
						label: "WhatsApp API",
						tech: "Meta Webhooks",
						x: 20,
						y: 30,
						color: "#25D366"
					},
					{
						id: "api",
						label: "Laravel Ingress",
						tech: "Event Ledger",
						x: 160,
						y: 30,
						color: "#FF2D20"
					},
					{
						id: "rag",
						label: "pgvector RAG",
						tech: "HNSW 1536d Cosine",
						x: 310,
						y: 30,
						color: "#336791"
					},
					{
						id: "guard",
						label: "Safety & Guardrails",
						tech: "Delimiters + Eval",
						x: 310,
						y: 130,
						color: "#f59e0b"
					},
					{
						id: "queue",
						label: "Approval Queue",
						tech: "Human-in-the-Loop",
						x: 160,
						y: 130,
						color: "#8b5cf6"
					},
					{
						id: "coach",
						label: "Coach Portal",
						tech: "Vue 3 + Inertia",
						x: 20,
						y: 130,
						color: "#42b883"
					}
				],
				edges: [
					{
						from: "wa",
						to: "api",
						label: "Signed Post"
					},
					{
						from: "api",
						to: "rag",
						label: "Vector Query"
					},
					{
						from: "rag",
						to: "guard",
						label: "Context Chunks"
					},
					{
						from: "guard",
						to: "queue",
						label: "Draft Action"
					},
					{
						from: "queue",
						to: "coach",
						label: "Review / Edit"
					},
					{
						from: "coach",
						to: "wa",
						label: "Approved Send"
					}
				]
			},
			"digital-builders": {
				title: "Digital Builders Architecture",
				nodes: [
					{
						id: "client",
						label: "Client Portal",
						tech: "Vue 3",
						x: 50,
						y: 30,
						color: "#42b883"
					},
					{
						id: "api",
						label: "API Gateway",
						tech: "Laravel",
						x: 200,
						y: 30,
						color: "#FF2D20"
					},
					{
						id: "agents",
						label: "AI Agents",
						tech: "Autonomous",
						x: 350,
						y: 30,
						color: "#a855f7"
					},
					{
						id: "db",
						label: "Database",
						tech: "PostgreSQL",
						x: 120,
						y: 130,
						color: "#336791"
					},
					{
						id: "deploy",
						label: "CI/CD",
						tech: "GitHub Actions",
						x: 280,
						y: 130,
						color: "#2088FF"
					}
				],
				edges: [
					{
						from: "client",
						to: "api",
						label: "REST"
					},
					{
						from: "api",
						to: "agents",
						label: "Orchestrate"
					},
					{
						from: "api",
						to: "db",
						label: "Store"
					},
					{
						from: "agents",
						to: "deploy",
						label: "Ship"
					}
				]
			}
		};
		const diagram = computed(() => architectures[props.slug] || null);
		function getNodeById(id) {
			return diagram.value?.nodes.find((n) => n.id === id);
		}
		return (_ctx, _push, _parent, _attrs) => {
			if (diagram.value) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "arch-diagram" }, _attrs))} data-v-c645ebb8><h4 class="arch-title" data-v-c645ebb8>${ssrInterpolate(diagram.value.title)}</h4><svg class="arch-svg" viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg" data-v-c645ebb8><!--[-->`);
				ssrRenderList(diagram.value.edges, (edge) => {
					_push(`<g data-v-c645ebb8>`);
					if (getNodeById(edge.from) && getNodeById(edge.to)) _push(`<line${ssrRenderAttr("x1", getNodeById(edge.from).x + 50)}${ssrRenderAttr("y1", getNodeById(edge.from).y + 25)}${ssrRenderAttr("x2", getNodeById(edge.to).x + 50)}${ssrRenderAttr("y2", getNodeById(edge.to).y + 25)} class="${ssrRenderClass([{ highlighted: activeNode.value === edge.from || activeNode.value === edge.to }, "arch-edge"])}" data-v-c645ebb8></line>`);
					else _push(`<!---->`);
					if (getNodeById(edge.from) && getNodeById(edge.to) && edge.label) _push(`<text${ssrRenderAttr("x", (getNodeById(edge.from).x + getNodeById(edge.to).x) / 2 + 50)}${ssrRenderAttr("y", (getNodeById(edge.from).y + getNodeById(edge.to).y) / 2 + 20)} class="arch-edge-label" data-v-c645ebb8>${ssrInterpolate(edge.label)}</text>`);
					else _push(`<!---->`);
					_push(`</g>`);
				});
				_push(`<!--]--><!--[-->`);
				ssrRenderList(diagram.value.nodes, (node) => {
					_push(`<g class="${ssrRenderClass([{ active: activeNode.value === node.id }, "arch-node-group"])}" data-v-c645ebb8><rect${ssrRenderAttr("x", node.x)}${ssrRenderAttr("y", node.y)} width="100" height="50" rx="8" class="arch-node-rect" style="${ssrRenderStyle({ "--node-color": node.color })}" data-v-c645ebb8></rect><text${ssrRenderAttr("x", node.x + 50)}${ssrRenderAttr("y", node.y + 20)} class="arch-node-label" data-v-c645ebb8>${ssrInterpolate(node.label)}</text><text${ssrRenderAttr("x", node.x + 50)}${ssrRenderAttr("y", node.y + 36)} class="arch-node-tech" data-v-c645ebb8>${ssrInterpolate(node.tech)}</text></g>`);
				});
				_push(`<!--]--></svg></div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/ArchitectureDiagram.vue
var _sfc_setup = ArchitectureDiagram_vue_vue_type_script_setup_true_lang_default.setup;
ArchitectureDiagram_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/ArchitectureDiagram.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ArchitectureDiagram_default = /* @__PURE__ */ _plugin_vue_export_helper_default(ArchitectureDiagram_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-c645ebb8"]]);
//#endregion
export { ArchitectureDiagram_default as t };
