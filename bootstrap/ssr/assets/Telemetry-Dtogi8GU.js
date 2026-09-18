import { r as head_default } from "./vendor-inertia-Bgi69XOP.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { defineComponent, onMounted, onUnmounted, ref, unref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { Activity, Cpu, Database, Globe, Server, Users } from "lucide-vue-next";
//#region resources/js/Pages/Admin/Telemetry.vue?vue&type=script&setup=true&lang.ts
var Telemetry_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Telemetry",
	__ssrInlineRender: true,
	setup(__props) {
		const stats = ref({
			activeVisitors: Math.floor(Math.random() * 10) + 1,
			pageViews: 45032,
			avgLoadTime: "124ms",
			uptime: "99.99%",
			cpuUsage: 14,
			memoryUsage: 45
		});
		let interval = null;
		onMounted(() => {
			interval = window.setInterval(() => {
				stats.value.activeVisitors = Math.max(1, stats.value.activeVisitors + (Math.random() > .5 ? 1 : -1));
				stats.value.cpuUsage = Math.floor(Math.random() * 30) + 5;
				stats.value.memoryUsage = Math.floor(Math.random() * 10) + 40;
				if (Math.random() > .8) stats.value.pageViews += 1;
			}, 2e3);
		});
		onUnmounted(() => {
			if (interval) clearInterval(interval);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(head_default), { title: "Telemetry Dashboard | Admin" }, null, _parent));
			_push(`<div class="telemetry-dashboard" data-v-0674c7eb><header class="dashboard-header" data-v-0674c7eb><div class="brand" data-v-0674c7eb>`);
			_push(ssrRenderComponent(unref(Activity), {
				class: "brand-icon",
				size: 28
			}, null, _parent));
			_push(`<h1 data-v-0674c7eb>Real-Time Telemetry</h1></div><div class="status-indicator" data-v-0674c7eb><span class="pulse" data-v-0674c7eb></span> System Operational </div></header><main class="dashboard-grid" data-v-0674c7eb><div class="stat-card" data-v-0674c7eb><div class="stat-header" data-v-0674c7eb>`);
			_push(ssrRenderComponent(unref(Users), {
				class: "stat-icon",
				size: 20
			}, null, _parent));
			_push(`<span data-v-0674c7eb>Active Visitors</span></div><div class="stat-value text-accent" data-v-0674c7eb>${ssrInterpolate(stats.value.activeVisitors)}</div><div class="stat-trend" data-v-0674c7eb>+2 this minute</div></div><div class="stat-card" data-v-0674c7eb><div class="stat-header" data-v-0674c7eb>`);
			_push(ssrRenderComponent(unref(Globe), {
				class: "stat-icon",
				size: 20
			}, null, _parent));
			_push(`<span data-v-0674c7eb>Total Pageviews</span></div><div class="stat-value" data-v-0674c7eb>${ssrInterpolate(stats.value.pageViews.toLocaleString())}</div><div class="stat-trend" data-v-0674c7eb>Global traffic</div></div><div class="stat-card" data-v-0674c7eb><div class="stat-header" data-v-0674c7eb>`);
			_push(ssrRenderComponent(unref(Cpu), {
				class: "stat-icon",
				size: 20
			}, null, _parent));
			_push(`<span data-v-0674c7eb>CPU Usage</span></div><div class="stat-value" data-v-0674c7eb>${ssrInterpolate(stats.value.cpuUsage)}%</div><div class="progress-bar" data-v-0674c7eb><div class="progress-fill" style="${ssrRenderStyle({ width: stats.value.cpuUsage + "%" })}" data-v-0674c7eb></div></div></div><div class="stat-card" data-v-0674c7eb><div class="stat-header" data-v-0674c7eb>`);
			_push(ssrRenderComponent(unref(Database), {
				class: "stat-icon",
				size: 20
			}, null, _parent));
			_push(`<span data-v-0674c7eb>Memory Usage</span></div><div class="stat-value" data-v-0674c7eb>${ssrInterpolate(stats.value.memoryUsage)}%</div><div class="progress-bar" data-v-0674c7eb><div class="progress-fill warning" style="${ssrRenderStyle({ width: stats.value.memoryUsage + "%" })}" data-v-0674c7eb></div></div></div><div class="stat-card" data-v-0674c7eb><div class="stat-header" data-v-0674c7eb>`);
			_push(ssrRenderComponent(unref(Server), {
				class: "stat-icon",
				size: 20
			}, null, _parent));
			_push(`<span data-v-0674c7eb>Avg Response Time</span></div><div class="stat-value text-success" data-v-0674c7eb>${ssrInterpolate(stats.value.avgLoadTime)}</div><div class="stat-trend" data-v-0674c7eb>US East Edge</div></div></main></div><!--]-->`);
		};
	}
});
//#endregion
//#region resources/js/Pages/Admin/Telemetry.vue
var _sfc_setup = Telemetry_vue_vue_type_script_setup_true_lang_default.setup;
Telemetry_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Telemetry.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Telemetry_default = /* @__PURE__ */ _plugin_vue_export_helper_default(Telemetry_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-0674c7eb"]]);
//#endregion
export { Telemetry_default as default };
