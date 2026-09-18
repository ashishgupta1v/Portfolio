import { i as link_default } from "./vendor-inertia-Bgi69XOP.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { createTextVNode, defineComponent, mergeProps, unref, useSSRContext, withCtx } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
//#region resources/js/Components/PortfolioV2/FeaturedCaseStudySection.vue?vue&type=script&setup=true&lang.ts
var featuredHref = "/case-studies/zoeticoach-ai-whatsapp-accountability-engine";
var FeaturedCaseStudySection_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "FeaturedCaseStudySection",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "case-studies",
				class: "featured-section"
			}, _attrs))} data-v-b77c55d8><div class="featured-ambient-glow" aria-hidden="true" data-v-b77c55d8></div><div class="featured-shell" data-v-b77c55d8><div class="featured-copy glass-panel" data-v-b77c55d8><span class="eyebrow glow-pill" data-v-b77c55d8>Engineering Deep-Dives</span><h2 class="featured-heading" data-v-b77c55d8><span class="text-gradient-hero" data-v-b77c55d8>Architecture decisions</span> with full context. </h2><p class="summary" data-v-b77c55d8> These case studies walk through real production systems I&#39;ve designed and shipped: the architectural trade-offs, how I handled high concurrency and scale, and measurable business outcomes. The flagship breakdown reveals how ZoetiCoach AI scaled into a WhatsApp-first autonomous accountability engine. </p><div class="cta-row" data-v-b77c55d8>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: featuredHref,
				class: "primary-cta glow-pill"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Read Deep-Dive Breakdown ↗`);
					else return [createTextVNode("Read Deep-Dive Breakdown ↗")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(link_default), {
				href: "/case-studies",
				class: "secondary-cta"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Browse All Case Studies`);
					else return [createTextVNode("Browse All Case Studies")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><aside class="featured-panel glass-panel" data-v-b77c55d8><div class="panel-card primary-card" data-v-b77c55d8><div class="panel-header-row" data-v-b77c55d8><span class="panel-label glow-pill" data-v-b77c55d8>Featured System</span><div class="metric-badges-row" data-v-b77c55d8><span class="feat-metric glow-pill" data-v-b77c55d8>⚡ 99.8% Bot Uptime</span><span class="feat-metric glow-pill-violet" data-v-b77c55d8>✦ Sub-Second RAG</span></div></div><h3 data-v-b77c55d8>ZoetiCoach AI</h3><p data-v-b77c55d8> A systems deep-dive on engineering a coaching product where the operating surface is WhatsApp, the unit of truth is accountability evidence ledgers, and AI speeds up human review loops with prompt-injection defense. </p></div><div class="signal-grid" data-v-b77c55d8><div class="signal-card glass-panel" data-v-b77c55d8><span class="signal-kicker" data-v-b77c55d8>Operating surface</span><strong data-v-b77c55d8>WhatsApp-Native UX</strong></div><div class="signal-card glass-panel" data-v-b77c55d8><span class="signal-kicker" data-v-b77c55d8>Architecture</span><strong data-v-b77c55d8>Laravel Events + Vector RAG</strong></div><div class="signal-card glass-panel" data-v-b77c55d8><span class="signal-kicker" data-v-b77c55d8>Measured Impact</span><strong data-v-b77c55d8>3.4x Higher Daily Active Retention</strong></div></div></aside></div></section>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/FeaturedCaseStudySection.vue
var _sfc_setup = FeaturedCaseStudySection_vue_vue_type_script_setup_true_lang_default.setup;
FeaturedCaseStudySection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/FeaturedCaseStudySection.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var FeaturedCaseStudySection_default = /* @__PURE__ */ _plugin_vue_export_helper_default(FeaturedCaseStudySection_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-b77c55d8"]]);
//#endregion
export { FeaturedCaseStudySection_default as default };
