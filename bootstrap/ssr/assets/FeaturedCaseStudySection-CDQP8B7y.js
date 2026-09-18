import { i as link_default } from "./vendor-inertia-Bgi69XOP.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { createTextVNode, defineComponent, mergeProps, unref, useSSRContext, withCtx } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
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
			}, _attrs))} data-v-4b00cf95><div class="featured-ambient-glow" aria-hidden="true" data-v-4b00cf95></div><div class="featured-shell" data-v-4b00cf95><div class="featured-copy glass-panel" data-v-4b00cf95><span class="eyebrow glow-pill" data-v-4b00cf95>Engineering Deep-Dives</span><h2 class="featured-heading" data-v-4b00cf95><span class="text-gradient-hero" data-v-4b00cf95>Architecture decisions</span> with full context. </h2><p class="summary" data-v-4b00cf95> These case studies walk through real production systems I&#39;ve designed and shipped: the architectural trade-offs, how I handled high concurrency and scale, and measurable business outcomes. The flagship breakdown reveals how ZoetiCoach AI scaled into a WhatsApp-first autonomous accountability engine. </p><div class="cta-row" data-v-4b00cf95>`);
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
			_push(`</div></div><aside class="featured-panel glass-panel" data-v-4b00cf95><div class="panel-card primary-card" data-v-4b00cf95><div class="panel-header-row" data-v-4b00cf95><span class="panel-label glow-pill" data-v-4b00cf95>Flagship Production System</span><div class="metric-badges-row" data-v-4b00cf95><span class="feat-metric glow-pill" data-v-4b00cf95>⚡ 99.8% Bot Uptime</span><span class="feat-metric glow-pill-violet" data-v-4b00cf95>✦ Sub-Second RAG</span></div></div><h3 data-v-4b00cf95>ZoetiCoach AI</h3><p class="feat-tagline" style="${ssrRenderStyle({
				"color": "var(--accent)",
				"font-size": "0.85rem",
				"font-weight": "600",
				"margin-bottom": "0.5rem"
			})}" data-v-4b00cf95> Production RAG on WhatsApp — human-in-the-loop approval + full AI audit trail </p><p data-v-4b00cf95> A systems deep-dive on engineering a production WhatsApp-first accountability platform: pgvector HNSW cosine search, multi-tier prompt-injection defense, an asynchronous Human-in-the-Loop Approval Queue, and an immutable Trust &amp; Audit Log tracking every similarity score and token cost. </p></div><div class="signal-grid" data-v-4b00cf95><div class="signal-card glass-panel" data-v-4b00cf95><span class="signal-kicker" data-v-4b00cf95>Operating surface</span><strong data-v-4b00cf95>WhatsApp-Native UX</strong></div><div class="signal-card glass-panel" data-v-4b00cf95><span class="signal-kicker" data-v-4b00cf95>RAG &amp; Safety</span><strong data-v-4b00cf95>pgvector HNSW + Approval Queue</strong></div><div class="signal-card glass-panel" data-v-4b00cf95><span class="signal-kicker" data-v-4b00cf95>Observability</span><strong data-v-4b00cf95>Trust &amp; Audit Log (0 Breaches)</strong></div></div></aside></div></section>`);
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
var FeaturedCaseStudySection_default = /* @__PURE__ */ _plugin_vue_export_helper_default(FeaturedCaseStudySection_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-4b00cf95"]]);
//#endregion
export { FeaturedCaseStudySection_default as default };
