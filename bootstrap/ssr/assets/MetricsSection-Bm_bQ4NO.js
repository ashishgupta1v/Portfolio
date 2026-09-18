import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { defineComponent, mergeProps, onMounted, onUnmounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import gsap from "gsap";
import { ScrollTrigger as ScrollTrigger$1 } from "gsap/ScrollTrigger";
//#region resources/js/Components/PortfolioV2/MetricsSection.vue?vue&type=script&setup=true&lang.ts
var MetricsSection_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "MetricsSection",
	__ssrInlineRender: true,
	setup(__props) {
		gsap.registerPlugin(ScrollTrigger$1);
		const METRICS = [
			{
				target: 1,
				prefix: "$",
				suffix: "M+",
				label: "Annual Cloud Infrastructure Savings",
				description: "Architectural optimization at Infosys"
			},
			{
				target: 30,
				prefix: "-",
				suffix: "%",
				label: "Clinical Trial Monitoring Latency",
				description: "Redis Queues + real-time sync"
			},
			{
				target: 59,
				prefix: "-",
				suffix: "%",
				label: "Order-to-Dispatch Cycle Time",
				description: "Knitwear ERP modernization"
			},
			{
				target: 10,
				prefix: "",
				suffix: "+",
				label: "Years of Engineering Experience",
				description: "Healthcare, Aviation, Logistics, SaaS"
			}
		];
		const sectionRef = ref(null);
		/** Reactive counters displayed inside each card (initialized to targets for instant SSR/deep-link accuracy) */
		const counters = ref(METRICS.map((m) => m.target));
		let triggers = [];
		onMounted(() => {
			if (!sectionRef.value) return;
			const cards = gsap.utils.selector(sectionRef.value)(".metric-card");
			if (cards.length) gsap.from(cards, {
				scrollTrigger: {
					trigger: sectionRef.value,
					start: "top 90%",
					once: true
				},
				y: 30,
				opacity: 0,
				duration: .65,
				stagger: .1,
				ease: "power3.out",
				clearProps: "all"
			});
			const proxy = {};
			METRICS.forEach((_, i) => {
				proxy[`n${i}`] = 0;
			});
			const tweenVars = {
				duration: 1.6,
				ease: "power2.out",
				paused: true,
				onUpdate() {
					counters.value = METRICS.map((_, i) => Math.round(proxy[`n${i}`]));
				}
			};
			METRICS.forEach((m, i) => {
				tweenVars[`n${i}`] = m.target;
			});
			const tween = gsap.to(proxy, tweenVars);
			const st = ScrollTrigger$1.create({
				trigger: sectionRef.value,
				start: "top 90%",
				once: true,
				onEnter() {
					tween.play();
				}
			});
			triggers.push(st);
		});
		onUnmounted(() => {
			triggers.forEach((st) => st.kill());
			triggers = [];
		});
		function formatMetric(index) {
			const m = METRICS[index];
			return `${m.prefix}${counters.value[index]}${m.suffix}`;
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				ref_key: "sectionRef",
				ref: sectionRef,
				id: "metrics",
				class: "metrics-section"
			}, _attrs))} data-v-776cab0f><div class="metrics-ambient-glow" aria-hidden="true" data-v-776cab0f></div><div class="metrics-shell" data-v-776cab0f><div class="section-header" data-v-776cab0f><div class="section-header-wrapper" data-v-776cab0f><h2 class="section-title" data-v-776cab0f><span class="section-title-word" data-v-776cab0f>Impact &amp;</span><span class="section-title-word accent" data-v-776cab0f>Outcomes</span></h2></div><p class="section-subtitle" data-v-776cab0f>Quantified business and architectural outcomes from high-scale production systems.</p><div class="section-separator" data-v-776cab0f></div></div><div class="metrics-grid" data-v-776cab0f><!--[-->`);
			ssrRenderList(METRICS, (metric, i) => {
				_push(`<article class="${ssrRenderClass([{ "metric-card--featured": i === 0 }, "metric-card glass-panel"])}" data-v-776cab0f><div class="metric-top-bar" data-v-776cab0f><span class="metric-chip glow-pill" data-v-776cab0f>`);
				if (i === 0) _push(`<span data-v-776cab0f>Enterprise Scale</span>`);
				else if (i === 1) _push(`<span data-v-776cab0f>Performance</span>`);
				else if (i === 2) _push(`<span data-v-776cab0f>Efficiency</span>`);
				else _push(`<span data-v-776cab0f>Experience</span>`);
				_push(`</span></div><span class="${ssrRenderClass([{ "text-gradient-hero": i === 0 }, "metric-number"])}"${ssrRenderAttr("aria-label", `${metric.prefix}${metric.target}${metric.suffix} ${metric.label}`)} data-v-776cab0f>${ssrInterpolate(formatMetric(i))}</span><h3 class="metric-label" data-v-776cab0f>${ssrInterpolate(metric.label)}</h3><p class="metric-desc" data-v-776cab0f>${ssrInterpolate(metric.description)}</p></article>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/MetricsSection.vue
var _sfc_setup = MetricsSection_vue_vue_type_script_setup_true_lang_default.setup;
MetricsSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/MetricsSection.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var MetricsSection_default = /* @__PURE__ */ _plugin_vue_export_helper_default(MetricsSection_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-776cab0f"]]);
//#endregion
export { MetricsSection_default as default };
