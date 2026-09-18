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
			"zoeticoach-ai": {
				title: "ZoetiCoach AI Architecture",
				nodes: [
					{
						id: "wa",
						label: "WhatsApp API",
						tech: "Webhook",
						x: 50,
						y: 30,
						color: "#25D366"
					},
					{
						id: "api",
						label: "Laravel API",
						tech: "Laravel 13",
						x: 200,
						y: 30,
						color: "#FF2D20"
					},
					{
						id: "ai",
						label: "AI Engine",
						tech: "OpenAI + pgvector",
						x: 350,
						y: 30,
						color: "#10a37f"
					},
					{
						id: "db",
						label: "Database",
						tech: "PostgreSQL",
						x: 200,
						y: 130,
						color: "#336791"
					},
					{
						id: "queue",
						label: "Queue Worker",
						tech: "Redis / Horizon",
						x: 350,
						y: 130,
						color: "#DC382D"
					},
					{
						id: "ui",
						label: "Dashboard",
						tech: "Vue 3 + Inertia",
						x: 50,
						y: 130,
						color: "#42b883"
					}
				],
				edges: [
					{
						from: "wa",
						to: "api",
						label: "Webhook"
					},
					{
						from: "api",
						to: "ai",
						label: "Prompt"
					},
					{
						from: "api",
						to: "db",
						label: "CRUD"
					},
					{
						from: "api",
						to: "queue",
						label: "Dispatch"
					},
					{
						from: "ui",
						to: "api",
						label: "Inertia"
					},
					{
						from: "queue",
						to: "db",
						label: "Process"
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
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "arch-diagram" }, _attrs))} data-v-fc5155bd><h4 class="arch-title" data-v-fc5155bd>${ssrInterpolate(diagram.value.title)}</h4><svg class="arch-svg" viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg" data-v-fc5155bd><!--[-->`);
				ssrRenderList(diagram.value.edges, (edge) => {
					_push(`<g data-v-fc5155bd>`);
					if (getNodeById(edge.from) && getNodeById(edge.to)) _push(`<line${ssrRenderAttr("x1", getNodeById(edge.from).x + 50)}${ssrRenderAttr("y1", getNodeById(edge.from).y + 25)}${ssrRenderAttr("x2", getNodeById(edge.to).x + 50)}${ssrRenderAttr("y2", getNodeById(edge.to).y + 25)} class="${ssrRenderClass([{ highlighted: activeNode.value === edge.from || activeNode.value === edge.to }, "arch-edge"])}" data-v-fc5155bd></line>`);
					else _push(`<!---->`);
					if (getNodeById(edge.from) && getNodeById(edge.to) && edge.label) _push(`<text${ssrRenderAttr("x", (getNodeById(edge.from).x + getNodeById(edge.to).x) / 2 + 50)}${ssrRenderAttr("y", (getNodeById(edge.from).y + getNodeById(edge.to).y) / 2 + 20)} class="arch-edge-label" data-v-fc5155bd>${ssrInterpolate(edge.label)}</text>`);
					else _push(`<!---->`);
					_push(`</g>`);
				});
				_push(`<!--]--><!--[-->`);
				ssrRenderList(diagram.value.nodes, (node) => {
					_push(`<g class="${ssrRenderClass([{ active: activeNode.value === node.id }, "arch-node-group"])}" data-v-fc5155bd><rect${ssrRenderAttr("x", node.x)}${ssrRenderAttr("y", node.y)} width="100" height="50" rx="8" class="arch-node-rect" style="${ssrRenderStyle({ "--node-color": node.color })}" data-v-fc5155bd></rect><text${ssrRenderAttr("x", node.x + 50)}${ssrRenderAttr("y", node.y + 20)} class="arch-node-label" data-v-fc5155bd>${ssrInterpolate(node.label)}</text><text${ssrRenderAttr("x", node.x + 50)}${ssrRenderAttr("y", node.y + 36)} class="arch-node-tech" data-v-fc5155bd>${ssrInterpolate(node.tech)}</text></g>`);
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
var ArchitectureDiagram_default = /* @__PURE__ */ _plugin_vue_export_helper_default(ArchitectureDiagram_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-fc5155bd"]]);
//#endregion
export { ArchitectureDiagram_default as t };
