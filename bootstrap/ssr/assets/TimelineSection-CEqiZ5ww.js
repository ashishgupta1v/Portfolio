import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import gsap from "gsap";
import { ScrollTrigger as ScrollTrigger$1 } from "gsap/ScrollTrigger";
//#region resources/js/Components/PortfolioV2/TimelineSection.vue?vue&type=script&setup=true&lang.ts
var TimelineSection_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "TimelineSection",
	__ssrInlineRender: true,
	props: { experiences: {} },
	setup(__props) {
		gsap.registerPlugin(ScrollTrigger$1);
		const sectionRef = ref(null);
		function parseYear(value) {
			if (!value) return null;
			const text = value.trim();
			if (!text || /^present$/i.test(text)) return null;
			const yearMatch = text.match(/\b(19|20)\d{2}\b/);
			if (yearMatch) return Number(yearMatch[0]);
			const parsed = Date.parse(text);
			if (!Number.isNaN(parsed)) return new Date(parsed).getUTCFullYear();
			return null;
		}
		function isOngoing(endDate) {
			return !endDate || endDate.trim().toLowerCase() === "present";
		}
		function formatDateRange(exp) {
			const start = parseYear(exp.startDate);
			if (isOngoing(exp.endDate)) return start ? `${start}–Present` : "Present";
			const end = parseYear(exp.endDate);
			if (start === null || end === null) return exp.dateRange;
			if (start === end) return String(start);
			return `${start}–${String(end).slice(2)}`;
		}
		onMounted(() => {
			if (!sectionRef.value) return;
			const q = gsap.utils.selector(sectionRef.value);
			const titleWords = q(".section-title-word");
			if (titleWords.length) gsap.from(titleWords, {
				scrollTrigger: {
					trigger: sectionRef.value,
					start: "top 92%",
					once: true
				},
				y: 30,
				opacity: 0,
				duration: .7,
				stagger: .08,
				ease: "power3.out",
				clearProps: "all"
			});
			const progressEl = q(".center-progress");
			const gridEl = q(".timeline-grid");
			if (progressEl.length && gridEl.length) gsap.to(progressEl, {
				scrollTrigger: {
					trigger: gridEl,
					start: "top 70%",
					end: "bottom 40%",
					scrub: 1
				},
				scaleY: 1
			});
			const rows = q(".tl-row");
			if (rows.length && gridEl.length) gsap.from(rows, {
				scrollTrigger: {
					trigger: gridEl,
					start: "top 90%",
					once: true
				},
				y: 30,
				opacity: 0,
				duration: .6,
				stagger: .12,
				ease: "power3.out",
				clearProps: "all"
			});
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				ref_key: "sectionRef",
				ref: sectionRef,
				id: "career",
				class: "timeline-section"
			}, _attrs))} data-v-9de0ce2b><div class="tl-shell" data-v-9de0ce2b><div class="section-header" data-v-9de0ce2b><div class="section-header-wrapper" data-v-9de0ce2b><h2 class="section-title" data-v-9de0ce2b><span class="section-title-word" data-v-9de0ce2b>My career &amp;</span><span class="section-title-word accent" data-v-9de0ce2b>experience</span></h2></div><div class="section-separator" data-v-9de0ce2b></div></div><div class="timeline-grid" data-v-9de0ce2b><div class="center-line" aria-hidden="true" data-v-9de0ce2b><div class="center-progress" data-v-9de0ce2b></div></div><!--[-->`);
			ssrRenderList(__props.experiences, (exp, index) => {
				_push(`<article class="tl-row glass-panel" data-v-9de0ce2b><div class="tl-left" data-v-9de0ce2b><span class="tl-date" data-v-9de0ce2b>${ssrInterpolate(formatDateRange(exp))}</span>`);
				if (isOngoing(exp.endDate)) _push(`<span class="now-pill glow-pill" data-v-9de0ce2b>CURRENT ROLE</span>`);
				else _push(`<!---->`);
				_push(`</div><div class="tl-node" aria-hidden="true" data-v-9de0ce2b><span class="${ssrRenderClass([{ "is-now": isOngoing(exp.endDate) }, "node-dot"])}" data-v-9de0ce2b></span></div><div class="tl-center" data-v-9de0ce2b><div class="role-header" data-v-9de0ce2b><h3 class="tl-role" data-v-9de0ce2b>${ssrInterpolate(exp.role)}</h3><div class="company-badge-wrap" data-v-9de0ce2b><span class="tl-company" data-v-9de0ce2b>${ssrInterpolate(exp.company)}</span>`);
				if (exp.location) _push(`<span class="tl-location" data-v-9de0ce2b>· ${ssrInterpolate(exp.location)}</span>`);
				else _push(`<!---->`);
				_push(`</div></div><ul class="tl-list" data-v-9de0ce2b><!--[-->`);
				ssrRenderList(exp.highlights.slice(0, 3), (point, i) => {
					_push(`<li data-v-9de0ce2b><span class="tl-bullet-dot" aria-hidden="true" data-v-9de0ce2b>◆</span><span data-v-9de0ce2b>${ssrInterpolate(point)}</span></li>`);
				});
				_push(`<!--]--></ul></div></article>`);
			});
			_push(`<!--]--><div class="bottom-dot" aria-hidden="true" data-v-9de0ce2b></div></div></div></section>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/TimelineSection.vue
var _sfc_setup = TimelineSection_vue_vue_type_script_setup_true_lang_default.setup;
TimelineSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/TimelineSection.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var TimelineSection_default = /* @__PURE__ */ _plugin_vue_export_helper_default(TimelineSection_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-9de0ce2b"]]);
//#endregion
export { TimelineSection_default as default };
