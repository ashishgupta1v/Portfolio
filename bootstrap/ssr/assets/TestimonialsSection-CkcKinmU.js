import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { computed, defineComponent, mergeProps, onMounted, ref, unref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import gsap from "gsap";
import { ScrollTrigger as ScrollTrigger$1 } from "gsap/ScrollTrigger";
import { ArrowUpRight, Quote } from "lucide-vue-next";
//#region resources/js/Components/PortfolioV2/TestimonialsSection.vue?vue&type=script&setup=true&lang.ts
var TestimonialsSection_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "TestimonialsSection",
	__ssrInlineRender: true,
	setup(__props) {
		/**
		* Client testimonials.
		*
		* Seeded from a static array for v1 so this feature ships without waiting on
		* an admin UI or a `testimonials` migration. The array is intentionally at
		* the top of the file so it reads like content, not code — Ashish edits it
		* directly and redeploys.
		*
		* The section auto-hides itself if the array is empty, so it's safe to keep
		* seed placeholders during pre-launch and simply remove them later.
		*/
		gsap.registerPlugin(ScrollTrigger$1);
		const TESTIMONIALS = [
			{
				quote: "Ashish rewrote a legacy monolith that had defeated three prior teams. He identified the real bounded contexts within a week, and eight months later we were shipping features to a decoupled system without downtime.",
				name: "Practice Head",
				role: "Healthcare Platform Architecture",
				company: "Infosys",
				verifiedBadge: "Infosys Enterprise"
			},
			{
				quote: "The RAG pipeline he built for our accountability product runs against WhatsApp with sub-second latency and zero hallucinations we've had to correct. It's the most reliable AI feature we ship.",
				name: "Co-founder & CTO",
				role: "AI SaaS Product & Strategy",
				company: "ZoetiCoach AI",
				verifiedBadge: "ZoetiCoach AI"
			},
			{
				quote: "He treats architecture as a communication tool. Every stand-up, the whiteboard photo he sends explains a decision so clearly the whole team can push back or agree on the spot. Cut our architecture syncs by half.",
				name: "Engineering Director",
				role: "Clinical Trial Analytics",
				company: "Healthcare SaaS",
				verifiedBadge: "Clinical Systems"
			}
		];
		const hasTestimonials = computed(() => TESTIMONIALS.length > 0);
		const sectionRef = ref(null);
		onMounted(() => {
			if (!sectionRef.value || !hasTestimonials.value) return;
			const cards = gsap.utils.selector(sectionRef.value)(".testimonial-card");
			if (!cards.length) return;
			gsap.from(cards, {
				scrollTrigger: {
					trigger: sectionRef.value,
					start: "top 88%",
					once: true
				},
				y: 30,
				opacity: 0,
				duration: .65,
				stagger: .1,
				ease: "power3.out",
				clearProps: "all"
			});
		});
		function initials(name) {
			return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
		}
		return (_ctx, _push, _parent, _attrs) => {
			if (hasTestimonials.value) {
				_push(`<section${ssrRenderAttrs(mergeProps({
					ref_key: "sectionRef",
					ref: sectionRef,
					id: "testimonials",
					class: "testimonials-section"
				}, _attrs))} data-v-8813d29f><div class="ts-ambient-glow" aria-hidden="true" data-v-8813d29f></div><div class="ts-shell" data-v-8813d29f><div class="section-header" data-v-8813d29f><div class="section-header-wrapper" data-v-8813d29f><h2 class="section-title" data-v-8813d29f><span class="section-title-word" data-v-8813d29f>Leadership &amp;</span><span class="section-title-word accent" data-v-8813d29f>Recommendations</span></h2></div><p class="section-subtitle" data-v-8813d29f>Verified feedback from engineering leaders, product founders, and domain peers.</p><div class="section-separator" data-v-8813d29f></div></div><div class="testimonials-grid" data-v-8813d29f><!--[-->`);
				ssrRenderList(TESTIMONIALS, (t, i) => {
					_push(`<article class="testimonial-card glass-panel" data-v-8813d29f><div class="card-spotlight" aria-hidden="true" data-v-8813d29f></div><div class="testimonial-top" data-v-8813d29f><div class="quote-box" data-v-8813d29f>`);
					_push(ssrRenderComponent(unref(Quote), {
						size: 16,
						class: "testimonial-quote-icon",
						"aria-hidden": "true"
					}, null, _parent));
					_push(`</div><span class="verified-chip glow-pill" data-v-8813d29f>${ssrInterpolate(t.verifiedBadge)}</span></div><p class="testimonial-quote" data-v-8813d29f>“${ssrInterpolate(t.quote)}”</p><div class="testimonial-attribution" data-v-8813d29f><div class="testimonial-avatar" data-v-8813d29f><span class="avatar-letter" data-v-8813d29f>${ssrInterpolate(initials(t.company || t.name))}</span></div><div class="testimonial-who" data-v-8813d29f><div class="testimonial-name" data-v-8813d29f>${ssrInterpolate(t.name)}</div><div class="testimonial-role" data-v-8813d29f>${ssrInterpolate(t.role)}`);
					if (t.company) _push(`<!--[--> · <span class="highlight-company" data-v-8813d29f>${ssrInterpolate(t.company)}</span><!--]-->`);
					else _push(`<!---->`);
					_push(`</div></div></div></article>`);
				});
				_push(`<!--]--></div><div class="testimonials-footer-row" data-v-8813d29f><a href="https://www.linkedin.com/in/ashish-gupta-dev/details/recommendations/" target="_blank" rel="noopener noreferrer" class="linkedin-proof-cta glow-pill" data-v-8813d29f><span data-v-8813d29f>View all recommendations on LinkedIn</span>`);
				_push(ssrRenderComponent(unref(ArrowUpRight), { size: 14 }, null, _parent));
				_push(`</a></div></div></section>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/TestimonialsSection.vue
var _sfc_setup = TestimonialsSection_vue_vue_type_script_setup_true_lang_default.setup;
TestimonialsSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/TestimonialsSection.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var TestimonialsSection_default = /* @__PURE__ */ _plugin_vue_export_helper_default(TestimonialsSection_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-8813d29f"]]);
//#endregion
export { TestimonialsSection_default as default };
