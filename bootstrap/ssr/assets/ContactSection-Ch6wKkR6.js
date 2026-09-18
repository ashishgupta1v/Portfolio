import { i as link_default, o as useForm } from "./vendor-inertia-Bgi69XOP.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { computed, createTextVNode, createVNode, defineComponent, mergeProps, nextTick, onMounted, onUnmounted, ref, resolveDynamicComponent, unref, useSSRContext, watch, withCtx } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderTeleport, ssrRenderVNode } from "vue/server-renderer";
import gsap from "gsap";
import { ScrollTrigger as ScrollTrigger$1 } from "gsap/ScrollTrigger";
import { ArrowUpRight, Calendar, ExternalLink, Github, Linkedin, Mail, MessageSquare } from "lucide-vue-next";
//#region resources/js/Components/PortfolioV2/AvailabilityBadge.vue?vue&type=script&setup=true&lang.ts
var AvailabilityBadge_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "AvailabilityBadge",
	__ssrInlineRender: true,
	props: { compact: {
		type: Boolean,
		default: false
	} },
	setup(__props) {
		const props = __props;
		/**
		* Availability status — currently hardcoded.
		* TODO: Fetch from an API endpoint or site config (e.g. /api/availability)
		* so the owner can toggle status without a redeploy.
		*
		* Shape: { available: boolean, until: string | null }
		*   - available: true  -> green pulsing dot + "Available for Projects"
		*   - available: false -> amber static dot + "Booked until [until]"
		*/
		const availability = {
			available: true,
			until: null
		};
		const statusText = computed(() => {
			if (availability.available) return props.compact ? "Open to Roles" : "Open to Full-Time Remote Roles";
			const until = availability.until ?? "TBD";
			return props.compact ? `Starting ${until}` : `Starting new role ${until}`;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({
				class: ["availability-badge", { compact: __props.compact }],
				role: "status",
				"aria-label": statusText.value
			}, _attrs))} data-v-164a2693><span class="${ssrRenderClass([availability.available ? "available" : "booked", "status-dot"])}" data-v-164a2693></span><span class="status-text" data-v-164a2693>${ssrInterpolate(statusText.value)}</span></span>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/AvailabilityBadge.vue
var _sfc_setup$3 = AvailabilityBadge_vue_vue_type_script_setup_true_lang_default.setup;
AvailabilityBadge_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/AvailabilityBadge.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var AvailabilityBadge_default = /* @__PURE__ */ _plugin_vue_export_helper_default(AvailabilityBadge_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-164a2693"]]);
//#endregion
//#region resources/js/Components/PortfolioV2/NewsletterSignup.vue?vue&type=script&setup=true&lang.ts
var NewsletterSignup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "NewsletterSignup",
	__ssrInlineRender: true,
	setup(__props) {
		const email = ref("");
		const loading = ref(false);
		const feedback = ref(null);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "nl-wrap" }, _attrs))} data-v-273c0bb9><form class="nl-form" data-v-273c0bb9><input id="newsletter-email"${ssrRenderAttr("value", email.value)} type="email" class="nl-input" placeholder="your@email.com" aria-label="Email address for newsletter" required${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-273c0bb9><button type="submit" class="nl-btn"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} aria-label="Subscribe to newsletter" data-v-273c0bb9>${ssrInterpolate(loading.value ? "Subscribing..." : "Subscribe")}</button></form>`);
			if (feedback.value) _push(`<p class="${ssrRenderClass([{ "nl-feedback--error": !feedback.value.success }, "nl-feedback"])}" role="status" aria-live="polite" data-v-273c0bb9>${ssrInterpolate(feedback.value.message)}</p>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/NewsletterSignup.vue
var _sfc_setup$2 = NewsletterSignup_vue_vue_type_script_setup_true_lang_default.setup;
NewsletterSignup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/NewsletterSignup.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var NewsletterSignup_default = /* @__PURE__ */ _plugin_vue_export_helper_default(NewsletterSignup_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-273c0bb9"]]);
//#endregion
//#region resources/js/Components/PortfolioV2/ScheduleCall.vue?vue&type=script&setup=true&lang.ts
var CALENDLY_URL = "https://calendly.com/ashishgupta1v/30min";
var ScheduleCall_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ScheduleCall",
	__ssrInlineRender: true,
	setup(__props) {
		const showModal = ref(false);
		const closeBtnRef = ref(null);
		const triggerBtnRef = ref(null);
		function closeModal() {
			showModal.value = false;
		}
		function onKeydown(e) {
			if (e.key === "Escape" && showModal.value) closeModal();
		}
		watch(showModal, async (isOpen) => {
			if (isOpen) {
				await nextTick();
				closeBtnRef.value?.focus();
			} else triggerBtnRef.value?.focus();
		});
		onMounted(() => {
			window.addEventListener("keydown", onKeydown);
		});
		onUnmounted(() => {
			window.removeEventListener("keydown", onKeydown);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "schedule-call" }, _attrs))} data-v-e2e22592><button class="schedule-btn" type="button" aria-haspopup="dialog"${ssrRenderAttr("aria-expanded", showModal.value)} data-v-e2e22592>`);
			_push(ssrRenderComponent(unref(Calendar), {
				size: 16,
				"aria-hidden": "true"
			}, null, _parent));
			_push(`<span data-v-e2e22592>Schedule a Call</span></button>`);
			ssrRenderTeleport(_push, (_push) => {
				if (showModal.value) {
					_push(`<div class="schedule-overlay" role="dialog" aria-modal="true" aria-labelledby="schedule-modal-title" data-v-e2e22592><div class="schedule-modal" data-v-e2e22592><div class="schedule-modal-header" data-v-e2e22592><h3 id="schedule-modal-title" data-v-e2e22592>Schedule a Call</h3><button class="schedule-close" type="button" aria-label="Close dialog" data-v-e2e22592>×</button></div><div class="schedule-modal-body" data-v-e2e22592><p class="schedule-info" data-v-e2e22592> Pick a time that works for you. I typically respond within a few hours. </p><a${ssrRenderAttr("href", CALENDLY_URL)} target="_blank" rel="noopener noreferrer" class="schedule-external-link" data-v-e2e22592>`);
					_push(ssrRenderComponent(unref(Calendar), {
						size: 18,
						"aria-hidden": "true"
					}, null, _parent));
					_push(`<span data-v-e2e22592>Open Calendly to book a slot</span></a><p class="schedule-alt" data-v-e2e22592> Or email <a href="mailto:ashishgupta1v@gmail.com" data-v-e2e22592>ashishgupta1v@gmail.com</a> with your preferred times. </p></div></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/ScheduleCall.vue
var _sfc_setup$1 = ScheduleCall_vue_vue_type_script_setup_true_lang_default.setup;
ScheduleCall_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/ScheduleCall.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ScheduleCall_default = /* @__PURE__ */ _plugin_vue_export_helper_default(ScheduleCall_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-e2e22592"]]);
//#endregion
//#region resources/js/Components/PortfolioV2/ContactSection.vue?vue&type=script&setup=true&lang.ts
var MESSAGE_MAX = 2e3;
var FALLBACK_SUCCESS = "Message received — I'll get back to you within a business day.";
var ContactSection_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ContactSection",
	__ssrInlineRender: true,
	props: {
		profile: {},
		socialLinks: {},
		educations: {}
	},
	setup(__props) {
		gsap.registerPlugin(ScrollTrigger$1);
		const iconMap = {
			github: Github,
			linkedin: Linkedin,
			email: Mail
		};
		const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
		const sectionRef = ref(null);
		const submitted = ref(false);
		const form = useForm({
			name: "",
			email: "",
			budget: "",
			project_type: "Full-Time Role",
			timeline: "",
			message: "",
			company_website: "",
			form_started_at: Date.now(),
			source_page: "",
			referrer_url: "",
			utm_source: "",
			utm_medium: "",
			utm_campaign: "",
			utm_term: "",
			utm_content: "",
			gclid: "",
			fbclid: ""
		});
		const messageCharCount = computed(() => form.message.length);
		const messageNearLimit = computed(() => messageCharCount.value > MESSAGE_MAX * .9);
		const successMessage = ref(FALLBACK_SUCCESS);
		const whatsappHref = `https://wa.me/919087021592?text=${encodeURIComponent("Hi Ashish, I came across your portfolio at ashishgupta.dev and would like to discuss a potential role or opportunity with you. Let me know a good time to connect.")}`;
		onMounted(() => {
			const params = new URLSearchParams(window.location.search);
			form.source_page = window.location.pathname;
			form.referrer_url = document.referrer;
			form.utm_source = params.get("utm_source") ?? "";
			form.utm_medium = params.get("utm_medium") ?? "";
			form.utm_campaign = params.get("utm_campaign") ?? "";
			form.utm_term = params.get("utm_term") ?? "";
			form.utm_content = params.get("utm_content") ?? "";
			form.gclid = params.get("gclid") ?? "";
			form.fbclid = params.get("fbclid") ?? "";
			if (!sectionRef.value) return;
			const grid = sectionRef.value.querySelector(".ct-grid");
			const columns = sectionRef.value.querySelectorAll(".ct-column");
			if (columns.length > 0 && grid) gsap.from(columns, {
				scrollTrigger: {
					trigger: sectionRef.value,
					start: "top 95%",
					once: true
				},
				y: 20,
				opacity: 0,
				duration: .5,
				stagger: .08,
				ease: "power2.out",
				clearProps: "all"
			});
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				ref_key: "sectionRef",
				ref: sectionRef,
				id: "contact",
				class: "ct-section"
			}, _attrs))} data-v-dca2c42f><div class="ct-ambient-glow" aria-hidden="true" data-v-dca2c42f></div><div class="ct-shell" data-v-dca2c42f><div class="section-header" data-v-dca2c42f><div class="header-top-row" data-v-dca2c42f><h2 class="section-title" data-v-dca2c42f><span class="section-title-word" data-v-dca2c42f>Let&#39;s Discuss</span><span class="section-title-word accent" data-v-dca2c42f>an Engineering Role</span></h2>`);
			_push(ssrRenderComponent(AvailabilityBadge_default, { class: "contact-availability" }, null, _parent));
			_push(`</div><p class="section-subtitle" data-v-dca2c42f>Open to Senior / Staff Full-Stack Architect &amp; Engineering Lead opportunities (Remote worldwide or Relocation).</p><div class="section-separator" data-v-dca2c42f></div></div><div class="ct-grid" data-v-dca2c42f><div class="ct-column glass-panel" data-v-dca2c42f><h3 class="col-title" data-v-dca2c42f>Direct Contact</h3><a${ssrRenderAttr("href", `mailto:${__props.profile.email}`)} class="ct-email" data-v-dca2c42f>${ssrInterpolate(__props.profile.email)} `);
			_push(ssrRenderComponent(unref(ArrowUpRight), {
				size: 14,
				class: "arrow"
			}, null, _parent));
			_push(`</a>`);
			if (__props.profile.location) _push(`<p class="ct-location" data-v-dca2c42f>${ssrInterpolate(__props.profile.location)} · Remote Worldwide</p>`);
			else _push(`<!---->`);
			if (__props.profile.resumeUrl) {
				_push(`<a${ssrRenderAttr("href", __props.profile.resumeUrl)} download="Ashish-Gupta-Resume.pdf" target="_blank" rel="noopener noreferrer" class="resume-btn glow-pill-violet" style="${ssrRenderStyle({ "margin-bottom": "1.2rem" })}" data-v-dca2c42f> Download Résumé (PDF) `);
				_push(ssrRenderComponent(unref(ArrowUpRight), { size: 14 }, null, _parent));
				_push(`</a>`);
			} else _push(`<!---->`);
			_push(`<div class="schedule-call-wrap" data-v-dca2c42f>`);
			_push(ssrRenderComponent(ScheduleCall_default, null, null, _parent));
			_push(`</div><a${ssrRenderAttr("href", whatsappHref)} target="_blank" rel="noopener noreferrer" class="chat-btn glow-pill" style="${ssrRenderStyle({ "margin-bottom": "1.5rem" })}" data-v-dca2c42f> Message on WhatsApp `);
			_push(ssrRenderComponent(unref(ArrowUpRight), { size: 14 }, null, _parent));
			_push(`</a>`);
			if (__props.educations.length) {
				_push(`<div class="edu-list" data-v-dca2c42f><!--[-->`);
				ssrRenderList(__props.educations, (edu) => {
					_push(`<div class="edu-item" data-v-dca2c42f><p class="edu-degree" data-v-dca2c42f>${ssrInterpolate(edu.degree)}</p><p class="edu-inst" data-v-dca2c42f>${ssrInterpolate(edu.institution)}</p><p class="edu-year" data-v-dca2c42f>${ssrInterpolate(edu.startYear)} – ${ssrInterpolate(edu.endYear)}</p></div>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`</div><div class="ct-column glass-panel" data-v-dca2c42f><h3 class="col-title" data-v-dca2c42f>Profiles &amp; Briefing</h3><div class="social-list" data-v-dca2c42f><!--[-->`);
			ssrRenderList(__props.socialLinks, (link) => {
				_push(`<a${ssrRenderAttr("href", link.url)} target="_blank" rel="noopener noreferrer" class="social-link" data-v-dca2c42f>`);
				ssrRenderVNode(_push, createVNode(resolveDynamicComponent(iconMap[link.platform] || unref(Mail)), { size: 16 }, null), _parent);
				_push(`<span data-v-dca2c42f>${ssrInterpolate(link.label)}</span>`);
				_push(ssrRenderComponent(unref(ExternalLink), {
					size: 12,
					class: "ext-icon"
				}, null, _parent));
				_push(`</a>`);
			});
			_push(`<!--]-->`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/for-hiring-managers",
				class: "social-link hiring-badge-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(ArrowUpRight), { size: 16 }, null, _parent, _scopeId));
						_push(`<span data-v-dca2c42f${_scopeId}>For Hiring Managers Brief</span>`);
						_push(ssrRenderComponent(unref(ExternalLink), {
							size: 12,
							class: "ext-icon"
						}, null, _parent, _scopeId));
					} else return [
						createVNode(unref(ArrowUpRight), { size: 16 }),
						createVNode("span", null, "For Hiring Managers Brief"),
						createVNode(unref(ExternalLink), {
							size: 12,
							class: "ext-icon"
						})
					];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><footer class="ct-column glass-panel" role="contentinfo" data-v-dca2c42f><h3 class="col-title" data-v-dca2c42f>Architecture &amp; Legal</h3><p class="credit-text" data-v-dca2c42f> Designed &amp; Developed by <span class="credit-name" data-v-dca2c42f>${ssrInterpolate(__props.profile.name)}</span></p><p class="credit-year" data-v-dca2c42f>© ${ssrInterpolate(unref(currentYear))}</p><div class="credit-legal" data-v-dca2c42f>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/privacy",
				class: "legal-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Privacy Policy`);
					else return [createTextVNode("Privacy Policy")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="legal-sep" data-v-dca2c42f>·</span>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/terms",
				class: "legal-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Terms of Service`);
					else return [createTextVNode("Terms of Service")];
				}),
				_: 1
			}, _parent));
			_push(`</div><p class="credit-stack" data-v-dca2c42f> Built with VILT Stack <br data-v-dca2c42f><span class="stack-detail" data-v-dca2c42f>Vue 3 · Inertia.js · Laravel 13 · Tailwind CSS</span></p></footer></div><div class="ct-form-row glass-panel" data-v-dca2c42f><h3 class="form-title" data-v-dca2c42f>Send a message</h3>`);
			if (submitted.value) {
				_push(`<div class="form-success" role="status" aria-live="polite" data-v-dca2c42f><p data-v-dca2c42f>${ssrInterpolate(successMessage.value)}</p><p class="ai-prequalify-hint" data-v-dca2c42f>`);
				_push(ssrRenderComponent(unref(MessageSquare), {
					size: 14,
					class: "ai-hint-icon"
				}, null, _parent));
				_push(` While you wait, try the <button type="button" class="ai-hint-btn" data-v-dca2c42f>AI Assistant</button> to learn more about my experience and stack. </p></div>`);
			} else {
				_push(`<form class="contact-form" data-v-dca2c42f><p class="form-note" data-v-dca2c42f> Hiring, recruiting, or referring? Drop me a note and I&#39;ll reply within a business day. </p><div class="honeypot-wrap" aria-hidden="true" data-v-dca2c42f><label for="cf-company-website" data-v-dca2c42f>Company website</label><input id="cf-company-website"${ssrRenderAttr("value", unref(form).company_website)} type="text" tabindex="-1" autocomplete="off" data-v-dca2c42f></div><div class="form-row" data-v-dca2c42f><div class="form-field" data-v-dca2c42f><label for="cf-name" class="form-label" data-v-dca2c42f>Name</label><input id="cf-name"${ssrRenderAttr("value", unref(form).name)} type="text" class="${ssrRenderClass([{ "form-input-error": unref(form).errors.name }, "form-input"])}" placeholder="Your name or company" autocomplete="name" required data-v-dca2c42f>`);
				if (unref(form).errors.name) _push(`<span class="form-error" data-v-dca2c42f>${ssrInterpolate(unref(form).errors.name)}</span>`);
				else _push(`<!---->`);
				_push(`</div><div class="form-field" data-v-dca2c42f><label for="cf-email" class="form-label" data-v-dca2c42f>Email</label><input id="cf-email"${ssrRenderAttr("value", unref(form).email)} type="email" class="${ssrRenderClass([{ "form-input-error": unref(form).errors.email }, "form-input"])}" placeholder="you@company.com" autocomplete="email" required data-v-dca2c42f>`);
				if (unref(form).errors.email) _push(`<span class="form-error" data-v-dca2c42f>${ssrInterpolate(unref(form).errors.email)}</span>`);
				else _push(`<!---->`);
				_push(`</div></div><div class="form-field" data-v-dca2c42f><label for="cf-project-type" class="form-label" data-v-dca2c42f>What brings you here?</label><select id="cf-project-type" class="form-input" required data-v-dca2c42f><option value="Full-Time Role" data-v-dca2c42f${ssrIncludeBooleanAttr(Array.isArray(unref(form).project_type) ? ssrLooseContain(unref(form).project_type, "Full-Time Role") : ssrLooseEqual(unref(form).project_type, "Full-Time Role")) ? " selected" : ""}>Full-time role</option><option value="Contract Role" data-v-dca2c42f${ssrIncludeBooleanAttr(Array.isArray(unref(form).project_type) ? ssrLooseContain(unref(form).project_type, "Contract Role") : ssrLooseEqual(unref(form).project_type, "Contract Role")) ? " selected" : ""}>Contract role</option><option value="Recruiter Intro" data-v-dca2c42f${ssrIncludeBooleanAttr(Array.isArray(unref(form).project_type) ? ssrLooseContain(unref(form).project_type, "Recruiter Intro") : ssrLooseEqual(unref(form).project_type, "Recruiter Intro")) ? " selected" : ""}>Recruiter / talent intro</option><option value="Referral" data-v-dca2c42f${ssrIncludeBooleanAttr(Array.isArray(unref(form).project_type) ? ssrLooseContain(unref(form).project_type, "Referral") : ssrLooseEqual(unref(form).project_type, "Referral")) ? " selected" : ""}>Referral</option><option value="Other" data-v-dca2c42f${ssrIncludeBooleanAttr(Array.isArray(unref(form).project_type) ? ssrLooseContain(unref(form).project_type, "Other") : ssrLooseEqual(unref(form).project_type, "Other")) ? " selected" : ""}>Other</option></select>`);
				if (unref(form).errors.project_type) _push(`<span class="form-error" data-v-dca2c42f>${ssrInterpolate(unref(form).errors.project_type)}</span>`);
				else _push(`<!---->`);
				_push(`</div><div class="form-field" data-v-dca2c42f><label for="cf-message" class="form-label" data-v-dca2c42f>Message</label><textarea id="cf-message" class="${ssrRenderClass([{ "form-input-error": unref(form).errors.message }, "form-input form-textarea"])}" placeholder="Tell me about the role, your team, technical challenges, or what you&#39;re building…" rows="4"${ssrRenderAttr("maxlength", MESSAGE_MAX)} required data-v-dca2c42f>${ssrInterpolate(unref(form).message)}</textarea><div class="form-field-footer" data-v-dca2c42f>`);
				if (unref(form).errors.message) _push(`<span class="form-error" data-v-dca2c42f>${ssrInterpolate(unref(form).errors.message)}</span>`);
				else _push(`<!---->`);
				_push(`<span class="${ssrRenderClass([{ "char-count--warn": messageNearLimit.value }, "char-count"])}" data-v-dca2c42f>${ssrInterpolate(messageCharCount.value)}/${ssrInterpolate(MESSAGE_MAX)}</span></div></div><button type="submit" class="form-submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-dca2c42f>${ssrInterpolate(unref(form).processing ? "Sending…" : "Send message")} `);
				_push(ssrRenderComponent(unref(ArrowUpRight), { size: 14 }, null, _parent));
				_push(`</button><p class="form-consent-note" data-v-dca2c42f> By submitting, you agree to direct communication regarding your inquiry per our `);
				_push(ssrRenderComponent(unref(link_default), {
					href: "/privacy",
					class: "consent-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Privacy Policy`);
						else return [createTextVNode("Privacy Policy")];
					}),
					_: 1
				}, _parent));
				_push(`. </p></form>`);
			}
			_push(`</div><div class="ct-newsletter-row" data-v-dca2c42f><h3 class="nl-title" data-v-dca2c42f>Stay Updated</h3><p class="nl-desc" data-v-dca2c42f>Get notified about new articles and projects.</p>`);
			_push(ssrRenderComponent(NewsletterSignup_default, null, null, _parent));
			_push(`</div></div></section>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/ContactSection.vue
var _sfc_setup = ContactSection_vue_vue_type_script_setup_true_lang_default.setup;
ContactSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/ContactSection.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ContactSection_default = /* @__PURE__ */ _plugin_vue_export_helper_default(ContactSection_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-dca2c42f"]]);
//#endregion
export { ContactSection_default as default };
