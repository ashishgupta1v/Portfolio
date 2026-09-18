import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { createVNode, defineComponent, mergeProps, onMounted, ref, resolveDynamicComponent, unref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderVNode } from "vue/server-renderer";
import gsap from "gsap";
import { ScrollTrigger as ScrollTrigger$1 } from "gsap/ScrollTrigger";
import { Boxes, Brain, ChevronDown, Gauge, Sparkles, Trophy } from "lucide-vue-next";
//#region resources/js/Components/PortfolioV2/AboutSection.vue?vue&type=script&setup=true&lang.ts
var AboutSection_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "AboutSection",
	__ssrInlineRender: true,
	props: { profile: {} },
	setup(__props) {
		gsap.registerPlugin(ScrollTrigger$1);
		const sectionRef = ref(null);
		const activeCard = ref(0);
		const capabilities = [
			{
				icon: Boxes,
				tag: "Architecture & DDD",
				title: "Modular Monoliths & Domain Isolation",
				description: "I architect decoupled modular monoliths with strict bounded contexts, explicit domain events, and zero-downtime strangler-fig migration patterns.",
				details: [
					"Bounded contexts & domain events eliminating tight coupling",
					"Safe strangler-fig refactoring patterns with zero downtime",
					"Independent domain modules with automated boundary testing"
				]
			},
			{
				icon: Brain,
				tag: "AI SaaS & Vectors",
				title: "Semantic Intelligence & RAG Engines",
				description: "I build intent-aware retrieval engines, hybrid vector embeddings, and autonomous agent loops with prompt defense and fallback safeguards.",
				details: [
					"pgvector & hybrid lexical-vector embedding pipelines",
					"Multi-stage query classification with prompt injection defense",
					"Real-time streaming agent response generation with fallback safety"
				]
			},
			{
				icon: Gauge,
				tag: "Scale & Latency",
				title: "High-Throughput Distributed Infrastructure",
				description: "I optimize system throughput and sub-50ms latencies with Redis Horizon queue topologies, SQLite WAL concurrency, and proactive OpenTelemetry observability.",
				details: [
					"Redis cache-aside, job pipelines, and sub-50ms query optimization",
					"SQLite WAL concurrency & high-throughput PostgreSQL tuning",
					"Proactive OpenTelemetry, error tracking, and automated recovery loops"
				]
			},
			{
				icon: Trophy,
				tag: "Engineering Leadership",
				title: "Technical Ownership & Delivery",
				description: "I mentor engineering teams, establish automated testing pipelines, author clear architectural RFCs, and transform complex product requirements into resilient production systems.",
				details: [
					"Architecture RFCs & ADRs aligning engineering and product roadmaps",
					"Comprehensive automated test suites (Unit, Integration, E2E) ensuring zero regressions",
					"Active mentorship on Clean Code, Domain-Driven Design, and modern TypeScript/PHP"
				]
			}
		];
		onMounted(() => {
			if (!sectionRef.value) return;
			const q = gsap.utils.selector(sectionRef.value);
			const eyebrow = q(".combo-eyebrow");
			if (eyebrow.length) gsap.from(eyebrow, {
				scrollTrigger: {
					trigger: sectionRef.value,
					start: "top 92%",
					once: true
				},
				y: 20,
				opacity: 0,
				duration: .6,
				ease: "power3.out",
				clearProps: "all"
			});
			const heading = q(".combo-heading-line");
			if (heading.length) gsap.from(heading, {
				scrollTrigger: {
					trigger: sectionRef.value,
					start: "top 90%",
					once: true
				},
				y: 30,
				opacity: 0,
				duration: .7,
				stagger: .08,
				ease: "power3.out",
				clearProps: "all"
			});
			const paras = q(".combo-para");
			if (paras.length) gsap.from(paras, {
				scrollTrigger: {
					trigger: sectionRef.value,
					start: "top 88%",
					once: true
				},
				y: 24,
				opacity: 0,
				duration: .7,
				stagger: .1,
				ease: "power3.out",
				clearProps: "all"
			});
			const cards = q(".combo-card");
			const cardsContainer = q(".combo-cards");
			if (cards.length && cardsContainer.length) gsap.from(cards, {
				scrollTrigger: {
					trigger: cardsContainer,
					start: "top 90%",
					once: true
				},
				y: 30,
				opacity: 0,
				duration: .6,
				stagger: .1,
				ease: "power3.out",
				clearProps: "all"
			});
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				ref_key: "sectionRef",
				ref: sectionRef,
				id: "about",
				class: "combo-section"
			}, _attrs))} data-v-ff3d3e27><div class="combo-ambient-glow" aria-hidden="true" data-v-ff3d3e27></div><div class="combo-shell" data-v-ff3d3e27><div class="combo-intro glass-panel" data-v-ff3d3e27><div class="intro-header-row" data-v-ff3d3e27><span class="combo-eyebrow glow-pill" data-v-ff3d3e27>`);
			_push(ssrRenderComponent(unref(Sparkles), {
				size: 12,
				class: "eyebrow-icon"
			}, null, _parent));
			_push(` About Me · Core Engineering </span></div><h2 class="combo-heading" data-v-ff3d3e27><span class="combo-heading-line" data-v-ff3d3e27>I Architect Scalable</span><span class="combo-heading-line text-gradient-accent" data-v-ff3d3e27>Transformation Engines</span></h2><p class="combo-para combo-primary" data-v-ff3d3e27>${ssrInterpolate(__props.profile.bio)}</p><p class="combo-para combo-secondary" data-v-ff3d3e27> I thrive in fast-moving engineering environments where end-to-end technical ownership matters — taking distributed systems from domain modeling through production hardening, mentoring engineers, and shipping measurable business outcomes. </p></div><div class="combo-cards" data-v-ff3d3e27><!--[-->`);
			ssrRenderList(capabilities, (item, i) => {
				_push(`<article class="${ssrRenderClass([{ active: activeCard.value === i }, "combo-card glass-panel"])}" tabindex="0"${ssrRenderAttr("aria-expanded", activeCard.value === i)} data-v-ff3d3e27><div class="card-spotlight" aria-hidden="true" data-v-ff3d3e27></div><span class="ghost-numeral" aria-hidden="true" data-v-ff3d3e27>0${ssrInterpolate(i + 1)}</span><div class="card-top-row" data-v-ff3d3e27><div class="card-icon-box" data-v-ff3d3e27>`);
				ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), { size: 20 }, null), _parent);
				_push(`</div><span class="card-tag" data-v-ff3d3e27>${ssrInterpolate(item.tag)}</span></div><h3 class="card-title" data-v-ff3d3e27>${ssrInterpolate(item.title)}</h3><p class="card-text" data-v-ff3d3e27>${ssrInterpolate(item.description)}</p><div class="card-disclosure" style="${ssrRenderStyle(activeCard.value === i ? null : { display: "none" })}" data-v-ff3d3e27><ul class="card-detail-list" data-v-ff3d3e27><!--[-->`);
				ssrRenderList(item.details, (detail, di) => {
					_push(`<li class="card-detail-item" data-v-ff3d3e27><span class="detail-dot" aria-hidden="true" data-v-ff3d3e27>›</span><span data-v-ff3d3e27>${ssrInterpolate(detail)}</span></li>`);
				});
				_push(`<!--]--></ul></div><button class="expand-btn" type="button"${ssrRenderAttr("aria-expanded", activeCard.value === i)}${ssrRenderAttr("aria-label", activeCard.value === i ? "Collapse card details" : "Expand card details")} data-v-ff3d3e27>`);
				_push(ssrRenderComponent(unref(ChevronDown), {
					size: 15,
					class: { open: activeCard.value === i },
					"aria-hidden": "true"
				}, null, _parent));
				_push(`</button></article>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/AboutSection.vue
var _sfc_setup = AboutSection_vue_vue_type_script_setup_true_lang_default.setup;
AboutSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/AboutSection.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AboutSection_default = /* @__PURE__ */ _plugin_vue_export_helper_default(AboutSection_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-ff3d3e27"]]);
//#endregion
export { AboutSection_default as default };
