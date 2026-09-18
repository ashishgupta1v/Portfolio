import { a as router10, i as link_default, r as head_default } from "./vendor-inertia-Bgi69XOP.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { t as trackAiAssistantOpen } from "./analytics-BdbHl86R.js";
import { n as useTheme, t as ThemeToggle_default } from "./ThemeToggle-Dz9Scuuz.js";
import { computed, createTextVNode, createVNode, defineAsyncComponent, defineComponent, mergeProps, nextTick, onBeforeUnmount, onMounted, onUnmounted, readonly, ref, resolveDynamicComponent, unref, useSSRContext, watch, withCtx } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderTeleport, ssrRenderVNode } from "vue/server-renderer";
import gsap from "gsap";
import { ScrollTrigger as ScrollTrigger$1 } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUp, ArrowUpRight, BookOpen, Bot, Briefcase, Calendar, Cpu, Database, Download, ExternalLink, FileDown, FolderOpen, Github, Handshake, Instagram, Layers, Linkedin, Mail, Menu, MessageSquare, Search, Send, Sparkles, SunMoon, User, X, Youtube } from "lucide-vue-next";
import Lenis from "lenis";
//#region resources/js/Composables/useMouseDepth.ts
function useMouseDepth(strength = 1) {
	const mx = ref(0);
	const my = ref(0);
	const enabled = ref(true);
	let rafId = null;
	let latestClientX = 0;
	let latestClientY = 0;
	function updateCoordinates() {
		if (!enabled.value) return;
		mx.value = parseFloat(((latestClientX / window.innerWidth - .5) * 2).toFixed(3));
		my.value = parseFloat(((latestClientY / window.innerHeight - .5) * 2).toFixed(3));
		rafId = null;
	}
	function onMove(e) {
		if (!enabled.value) return;
		latestClientX = e.clientX;
		latestClientY = e.clientY;
		if (!rafId) rafId = requestAnimationFrame(updateCoordinates);
	}
	function checkReducedMotion() {
		enabled.value = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}
	onMounted(() => {
		checkReducedMotion();
		window.addEventListener("mousemove", onMove, { passive: true });
	});
	onUnmounted(() => {
		window.removeEventListener("mousemove", onMove);
		if (rafId) cancelAnimationFrame(rafId);
	});
	return {
		mx,
		my,
		depthVars: computed(() => ({
			"--mx": `${mx.value}`,
			"--my": `${my.value}`,
			"--depth-rx": `${(-my.value * strength * 2).toFixed(2)}deg`,
			"--depth-ry": `${(mx.value * strength * 2).toFixed(2)}deg`,
			"--depth-tx": `${(mx.value * strength * 8).toFixed(1)}px`,
			"--depth-ty": `${(my.value * strength * 8).toFixed(1)}px`
		})),
		enabled
	};
}
//#endregion
//#region resources/js/Components/PortfolioV2/NavBar.vue?vue&type=script&setup=true&lang.ts
var NavBar_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "NavBar",
	__ssrInlineRender: true,
	props: {
		initials: {},
		linkedinUrl: {},
		socialLinks: {},
		resumeUrl: {}
	},
	setup(__props) {
		const iconMap = {
			github: Github,
			linkedin: Linkedin,
			email: Mail,
			youtube: Youtube,
			instagram: Instagram
		};
		const scrolled = ref(false);
		const mobileOpen = ref(false);
		const activeSection = ref("");
		const SECTION_IDS = [
			"about",
			"career",
			"work",
			"metrics",
			"tech",
			"contact"
		];
		let sectionObserver = null;
		function onScroll() {
			scrolled.value = window.scrollY > 60;
		}
		onMounted(() => {
			window.addEventListener("scroll", onScroll, { passive: true });
			onScroll();
			router10.on("navigate", () => {
				mobileOpen.value = false;
			});
			sectionObserver = new IntersectionObserver((entries) => {
				for (const entry of entries) if (entry.isIntersecting) activeSection.value = entry.target.id;
			}, { rootMargin: "-30% 0px -60% 0px" });
			function observeSections() {
				for (const id of SECTION_IDS) {
					const el = document.getElementById(id);
					if (el) sectionObserver.observe(el);
				}
			}
			let attempts = 0;
			const poll = setInterval(() => {
				observeSections();
				attempts++;
				if (attempts >= 10) clearInterval(poll);
			}, 500);
		});
		onUnmounted(() => {
			window.removeEventListener("scroll", onScroll);
			sectionObserver?.disconnect();
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[--><nav class="${ssrRenderClass([{ scrolled: scrolled.value }, "nav"])}" aria-label="Main navigation" data-v-0d1a3015><div class="nav-inner" data-v-0d1a3015><button class="nav-logo" data-v-0d1a3015>${ssrInterpolate(__props.initials)}</button><span class="nav-spacer" aria-hidden="true" data-v-0d1a3015></span><div class="nav-links" data-v-0d1a3015><button class="${ssrRenderClass([{ active: activeSection.value === "about" }, "nav-link"])}" data-v-0d1a3015>ABOUT</button><button class="${ssrRenderClass([{ active: activeSection.value === "career" }, "nav-link"])}" data-v-0d1a3015>EXPERIENCE</button><button class="${ssrRenderClass([{ active: activeSection.value === "work" }, "nav-link"])}" data-v-0d1a3015>WORK</button>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/case-studies",
				class: "nav-link nav-link-anchor"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`CASE STUDIES`);
					else return [createTextVNode("CASE STUDIES")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(link_default), {
				href: "/for-hiring-managers",
				class: "nav-link nav-link-anchor nav-link-highlight"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`FOR HIRING`);
					else return [createTextVNode("FOR HIRING")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(link_default), {
				href: "/blog",
				class: "nav-link nav-link-anchor"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`BLOG`);
					else return [createTextVNode("BLOG")];
				}),
				_: 1
			}, _parent));
			_push(`<button class="${ssrRenderClass([{ active: activeSection.value === "contact" }, "nav-link"])}" data-v-0d1a3015>CONTACT</button>`);
			if (__props.resumeUrl) {
				_push(`<a${ssrRenderAttr("href", __props.resumeUrl)} download="Ashish-Gupta-Resume.pdf" target="_blank" rel="noopener noreferrer" class="nav-resume-pill glow-pill" aria-label="Download Ashish Gupta&#39;s Résumé (PDF)" data-v-0d1a3015><span data-v-0d1a3015>RÉSUMÉ</span>`);
				_push(ssrRenderComponent(unref(ArrowUpRight), {
					size: 12,
					"aria-hidden": "true"
				}, null, _parent));
				_push(`</a>`);
			} else _push(`<!---->`);
			_push(ssrRenderComponent(ThemeToggle_default, { class: "nav-link a11y-toggle" }, null, _parent));
			_push(`</div><button class="hamburger"${ssrRenderAttr("aria-expanded", mobileOpen.value)} aria-label="Toggle menu" data-v-0d1a3015>`);
			if (mobileOpen.value) _push(ssrRenderComponent(unref(X), { size: 22 }, null, _parent));
			else _push(ssrRenderComponent(unref(Menu), { size: 22 }, null, _parent));
			_push(`</button></div></nav>`);
			if (mobileOpen.value) {
				_push(`<div class="mobile-overlay" data-v-0d1a3015><nav class="mobile-menu" data-v-0d1a3015><button class="${ssrRenderClass([{ active: activeSection.value === "about" }, "mobile-link"])}" data-v-0d1a3015>About</button><button class="${ssrRenderClass([{ active: activeSection.value === "career" }, "mobile-link"])}" data-v-0d1a3015>Experience</button><button class="${ssrRenderClass([{ active: activeSection.value === "work" }, "mobile-link"])}" data-v-0d1a3015>Work</button>`);
				_push(ssrRenderComponent(unref(link_default), {
					href: "/case-studies",
					class: "mobile-link",
					onClick: ($event) => mobileOpen.value = false
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Case Studies`);
						else return [createTextVNode("Case Studies")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(unref(link_default), {
					href: "/for-hiring-managers",
					class: "mobile-link mobile-link-highlight",
					onClick: ($event) => mobileOpen.value = false
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`For Hiring Managers`);
						else return [createTextVNode("For Hiring Managers")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(unref(link_default), {
					href: "/blog",
					class: "mobile-link",
					onClick: ($event) => mobileOpen.value = false
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Blog`);
						else return [createTextVNode("Blog")];
					}),
					_: 1
				}, _parent));
				_push(`<button class="${ssrRenderClass([{ active: activeSection.value === "contact" }, "mobile-link"])}" data-v-0d1a3015>Contact</button>`);
				if (__props.socialLinks?.length) {
					_push(`<div class="mobile-socials" data-v-0d1a3015><!--[-->`);
					ssrRenderList(__props.socialLinks, (link) => {
						_push(`<a${ssrRenderAttr("href", link.url)} target="_blank" rel="noopener noreferrer" class="mobile-social-icon"${ssrRenderAttr("title", link.label)}${ssrRenderAttr("aria-label", link.label || link.platform)} data-v-0d1a3015>`);
						ssrRenderVNode(_push, createVNode(resolveDynamicComponent(iconMap[link.platform] || unref(Mail)), { size: 20 }, null), _parent);
						_push(`</a>`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				if (__props.resumeUrl) _push(`<a${ssrRenderAttr("href", __props.resumeUrl)} download="Ashish-Gupta-Resume.pdf" target="_blank" rel="noopener noreferrer" class="mobile-resume" data-v-0d1a3015>Download Résumé (PDF)</a>`);
				else _push(`<!---->`);
				_push(`</nav></div>`);
			} else _push(`<!---->`);
			if (__props.socialLinks?.length) {
				_push(`<aside class="social-sidebar" aria-label="Social media links" data-v-0d1a3015><!--[-->`);
				ssrRenderList(__props.socialLinks, (link) => {
					_push(`<a${ssrRenderAttr("href", link.url)} target="_blank" rel="noopener noreferrer" class="sidebar-icon"${ssrRenderAttr("title", link.label)}${ssrRenderAttr("aria-label", link.label || link.platform)} data-v-0d1a3015>`);
					ssrRenderVNode(_push, createVNode(resolveDynamicComponent(iconMap[link.platform] || unref(Mail)), { size: 18 }, null), _parent);
					_push(`</a>`);
				});
				_push(`<!--]--></aside>`);
			} else _push(`<!---->`);
			if (__props.resumeUrl) _push(`<a${ssrRenderAttr("href", __props.resumeUrl)} download="Ashish-Gupta-Resume.pdf" target="_blank" rel="noopener noreferrer" class="resume-float" data-v-0d1a3015> RESUME </a>`);
			else _push(`<!---->`);
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/NavBar.vue
var _sfc_setup$8 = NavBar_vue_vue_type_script_setup_true_lang_default.setup;
NavBar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/NavBar.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var NavBar_default = /* @__PURE__ */ _plugin_vue_export_helper_default(NavBar_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-0d1a3015"]]);
//#endregion
//#region resources/js/Components/PortfolioV2/SectionSkeleton.vue?vue&type=script&setup=true&lang.ts
var SectionSkeleton_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SectionSkeleton",
	__ssrInlineRender: true,
	setup(__props) {
		/**
		* Placeholder shown while an async section chunk is loading. Sized to roughly
		* fill the viewport so the depth-section scroll layout doesn't jitter as
		* chunks resolve. Used via defineAsyncComponent(..., { loadingComponent }).
		*
		* The shimmer only runs when motion is allowed and the section is on-screen
		* — CSS media query gate keeps it visually calm for reduced-motion users.
		*/
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "section-skeleton",
				"aria-hidden": "true"
			}, _attrs))} data-v-47f7f5a3><div class="skel-header" data-v-47f7f5a3></div><div class="skel-line skel-line-wide" data-v-47f7f5a3></div><div class="skel-line skel-line-med" data-v-47f7f5a3></div><div class="skel-line skel-line-narrow" data-v-47f7f5a3></div><div class="skel-cards" data-v-47f7f5a3><div class="skel-card" data-v-47f7f5a3></div><div class="skel-card" data-v-47f7f5a3></div><div class="skel-card" data-v-47f7f5a3></div></div></div>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/SectionSkeleton.vue
var _sfc_setup$7 = SectionSkeleton_vue_vue_type_script_setup_true_lang_default.setup;
SectionSkeleton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/SectionSkeleton.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var SectionSkeleton_default = /* @__PURE__ */ _plugin_vue_export_helper_default(SectionSkeleton_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-47f7f5a3"]]);
//#endregion
//#region resources/js/Components/PortfolioV2/SplitHero.vue?vue&type=script&setup=true&lang.ts
var SplitHero_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SplitHero",
	__ssrInlineRender: true,
	props: {
		name: { default: "Ashish Gupta" },
		title: { default: "Senior Full-Stack Architect & AI Systems Engineer" },
		subtitle: { default: "VILT Stack Specialist · Production AI & RAG Architect" },
		resumeUrl: { default: "/resume/ashish-gupta-resume.pdf" },
		contactEmail: { default: "ashishgupta1v@gmail.com" },
		linkedinUrl: { default: "https://www.linkedin.com/in/ashish-gupta-dev/" },
		calendlyUrl: { default: "https://calendly.com/ashishgupta1v/30min" },
		githubUrl: { default: "https://github.com/ashishgupta1v" },
		avatarUrl: { default: "/images/ashish-gupta-avatar.webp" },
		panelMode: { default: "architecture" },
		products: { default: () => [
			{
				title: "ZoetiCoach AI",
				tag: "Production AI & RAG",
				description: "Production RAG on WhatsApp — human-in-the-loop approval + full AI audit trail.",
				imageUrl: "/images/portfolio/zoeticoach.jpg",
				url: "https://zoeticoach.com"
			},
			{
				title: "Dhanda Diary",
				tag: "Multi-Tenant SaaS",
				description: "Business execution OS built on Laravel 13, Vue 3, Inertia, and SQLite WAL.",
				imageUrl: "/images/portfolio/dhandadiary.jpg",
				url: "https://dhandadiary.cloud"
			},
			{
				title: "MyAstrova",
				tag: "High-Concurrency Platform",
				description: "Consultation platform with sub-200ms astronomical calculations & live routing.",
				imageUrl: "/images/portfolio/myastrova.jpg",
				url: "https://myastrova.com"
			}
		] }
	},
	emits: ["open-assistant", "cta"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const proofLines = [
			"▸ Production RAG · LLM Integration · pgvector",
			"▸ Decoupled Monoliths & Domain-Driven Design (DDD)",
			"▸ 10+ Years Experience · $1M/yr Cloud Savings",
			"▸ VILT Stack Specialist (Vue 3, Inertia, Laravel 13, Tailwind)"
		];
		const currentProofIndex = ref(0);
		let proofInterval = null;
		const currentProductIndex = ref(0);
		let productInterval = null;
		const avatarLoaded = ref(true);
		const activeNodeIndex = ref(0);
		let nodeInterval = null;
		const archNodes = [
			{
				id: "ingress",
				label: "Client Ingress & Messaging",
				sub: "WhatsApp API · REST · WebSockets",
				icon: Bot,
				color: "#10b981"
			},
			{
				id: "backend",
				label: "Laravel 13 Application Core",
				sub: "Modular Monolith · DDD · Horizon Queues",
				icon: Layers,
				color: "#f43f5e"
			},
			{
				id: "ai-rag",
				label: "AI & Vector Intelligence",
				sub: "OpenAI / Claude · pgvector · Semantic Cache",
				icon: Cpu,
				color: "#8b5cf6"
			},
			{
				id: "frontend",
				label: "Reactive Client & Telemetry",
				sub: "Vue 3 · Inertia.js · Tailwind · sub-50ms",
				icon: Database,
				color: "#06b6d4"
			}
		];
		onMounted(() => {
			if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				proofInterval = window.setInterval(() => {
					currentProofIndex.value = (currentProofIndex.value + 1) % proofLines.length;
				}, 3200);
				nodeInterval = window.setInterval(() => {
					activeNodeIndex.value = (activeNodeIndex.value + 1) % archNodes.length;
				}, 2200);
				if (props.panelMode === "products") productInterval = window.setInterval(() => {
					currentProductIndex.value = (currentProductIndex.value + 1) % props.products.length;
				}, 4e3);
			}
		});
		onBeforeUnmount(() => {
			if (proofInterval) clearInterval(proofInterval);
			if (nodeInterval) clearInterval(nodeInterval);
			if (productInterval) clearInterval(productInterval);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				class: "split-hero",
				role: "region",
				"aria-label": "Introduction & Architecture Overview"
			}, _attrs))} data-v-f6db8ada><div class="hero-mesh" aria-hidden="true" data-v-f6db8ada><div class="glow-orb glow-1" data-v-f6db8ada></div><div class="glow-orb glow-2" data-v-f6db8ada></div><div class="grid-overlay" data-v-f6db8ada></div></div><div class="hero-container" data-v-f6db8ada><div class="hero-content" data-v-f6db8ada><div class="status-row" data-v-f6db8ada><span class="status-pill available" data-v-f6db8ada><span class="pulse-dot" data-v-f6db8ada></span> Open to Full-Time · Senior / Staff Architect </span><span class="status-pill remote" data-v-f6db8ada> Remote Worldwide · US/EU Overlap </span></div><p class="hero-eyebrow" data-v-f6db8ada><span class="eyebrow-line" data-v-f6db8ada></span> ${ssrInterpolate(__props.name.toUpperCase())}</p><h1 class="hero-headline" data-v-f6db8ada> I architect scalable systems <span class="gradient-accent" data-v-f6db8ada>&amp; production AI.</span></h1><div class="rotator-container" aria-live="polite" aria-atomic="true" data-v-f6db8ada><p class="proof-line" data-v-f6db8ada>${ssrInterpolate(proofLines[currentProofIndex.value])}</p></div><p class="hero-bio" data-v-f6db8ada> Senior Full-Stack &amp; AI Systems Architect with <strong data-v-f6db8ada>10+ years</strong> modernizing legacy healthcare and aviation monoliths into decoupled, domain-driven systems and engineering hallucination-resistant RAG platforms. </p><div class="cta-group" data-v-f6db8ada><a${ssrRenderAttr("href", __props.resumeUrl || void 0)} download="Ashish-Gupta-Resume.pdf" class="btn-primary" data-v-f6db8ada>`);
			_push(ssrRenderComponent(unref(Download), {
				class: "btn-icon",
				size: 18
			}, null, _parent));
			_push(`<span data-v-f6db8ada>Download Résumé</span></a><a${ssrRenderAttr("href", __props.calendlyUrl || "https://calendly.com/ashishgupta1v/30min")} target="_blank" rel="noopener noreferrer" class="btn-secondary btn-calendly" data-v-f6db8ada>`);
			_push(ssrRenderComponent(unref(Calendar), {
				class: "btn-icon text-amber-400",
				size: 17
			}, null, _parent));
			_push(`<span data-v-f6db8ada>Book a 20-min call</span>`);
			_push(ssrRenderComponent(unref(ArrowUpRight), {
				class: "btn-icon-sub",
				size: 14
			}, null, _parent));
			_push(`</a><a href="#contact" class="btn-secondary" data-v-f6db8ada>`);
			_push(ssrRenderComponent(unref(Mail), {
				class: "btn-icon",
				size: 17
			}, null, _parent));
			_push(`<span data-v-f6db8ada>Get in touch</span></a><button type="button" class="btn-ai" aria-label="Open AI Assistant to ask questions about Ashish" data-v-f6db8ada>`);
			_push(ssrRenderComponent(unref(Sparkles), {
				class: "btn-icon text-amber-400",
				size: 16
			}, null, _parent));
			_push(`<span data-v-f6db8ada>Ask my AI</span>`);
			_push(ssrRenderComponent(unref(ArrowUpRight), {
				class: "btn-icon-sub",
				size: 14
			}, null, _parent));
			_push(`</button></div><div class="social-row" data-v-f6db8ada><a${ssrRenderAttr("href", __props.linkedinUrl || void 0)} target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn Profile" data-v-f6db8ada><svg class="social-svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" data-v-f6db8ada><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" data-v-f6db8ada></path></svg><span data-v-f6db8ada>LinkedIn</span></a><a${ssrRenderAttr("href", __props.githubUrl || void 0)} target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub Profile" data-v-f6db8ada><svg class="social-svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" data-v-f6db8ada><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" data-v-f6db8ada></path></svg><span data-v-f6db8ada>GitHub</span></a><a href="/for-hiring-managers" class="social-link highlight" data-v-f6db8ada><span data-v-f6db8ada>Hiring Brief ↗</span></a></div></div><div class="hero-panel-wrapper" data-v-f6db8ada><div class="hero-panel" role="region" aria-label="System Architecture Live Demo" data-v-f6db8ada><div class="panel-header" data-v-f6db8ada><div class="window-controls" data-v-f6db8ada><span class="ctrl ctrl-red" data-v-f6db8ada></span><span class="ctrl ctrl-yellow" data-v-f6db8ada></span><span class="ctrl ctrl-green" data-v-f6db8ada></span><span class="panel-title-tag" data-v-f6db8ada>system-arch · live telemetry</span></div><div class="headshot-badge" title="Ashish Gupta" data-v-f6db8ada>`);
			if (avatarLoaded.value && __props.avatarUrl) _push(`<img${ssrRenderAttr("src", __props.avatarUrl)} alt="Ashish Gupta" class="headshot-img" width="36" height="36" data-v-f6db8ada>`);
			else _push(`<div class="monogram-fallback" data-v-f6db8ada> AG </div>`);
			_push(`</div></div>`);
			if (__props.panelMode === "architecture") {
				_push(`<div class="arch-flow-body" data-v-f6db8ada><div class="nodes-container" data-v-f6db8ada><!--[-->`);
				ssrRenderList(archNodes, (node, idx) => {
					_push(`<div class="${ssrRenderClass([{ "is-active": activeNodeIndex.value === idx }, "arch-node-item"])}" data-v-f6db8ada><div class="node-icon-box" style="${ssrRenderStyle({ "--node-color": node.color })}" data-v-f6db8ada>`);
					ssrRenderVNode(_push, createVNode(resolveDynamicComponent(node.icon), {
						class: "node-icon",
						size: 18
					}, null), _parent);
					_push(`</div><div class="node-info" data-v-f6db8ada><div class="node-title" data-v-f6db8ada>${ssrInterpolate(node.label)}</div><div class="node-sub" data-v-f6db8ada>${ssrInterpolate(node.sub)}</div></div><div class="node-status-indicator" data-v-f6db8ada><span class="live-dot" data-v-f6db8ada></span></div>`);
					if (idx < archNodes.length - 1) _push(`<div class="node-connector" aria-hidden="true" data-v-f6db8ada><div class="connector-line" data-v-f6db8ada><div class="${ssrRenderClass([{ "is-traveling": activeNodeIndex.value === idx }, "pulse-traveler"])}" data-v-f6db8ada></div></div></div>`);
					else _push(`<!---->`);
					_push(`</div>`);
				});
				_push(`<!--]--></div><div class="panel-proof-strip" data-v-f6db8ada><div class="proof-chip" data-v-f6db8ada><span class="chip-val" data-v-f6db8ada>\$1M/yr</span><span class="chip-lbl" data-v-f6db8ada>Cloud Saved</span></div><div class="proof-chip" data-v-f6db8ada><span class="chip-val" data-v-f6db8ada>−30%</span><span class="chip-lbl" data-v-f6db8ada>Trial Latency</span></div><div class="proof-chip" data-v-f6db8ada><span class="chip-val" data-v-f6db8ada>10+ Yrs</span><span class="chip-lbl" data-v-f6db8ada>Experience</span></div><div class="proof-chip" data-v-f6db8ada><span class="chip-val" data-v-f6db8ada>100/100</span><span class="chip-lbl" data-v-f6db8ada>Core Vitals</span></div></div></div>`);
			} else {
				_push(`<div class="products-montage-body" data-v-f6db8ada><div class="product-slide" data-v-f6db8ada><div class="product-image-container" data-v-f6db8ada><img${ssrRenderAttr("src", __props.products[currentProductIndex.value].imageUrl)}${ssrRenderAttr("alt", __props.products[currentProductIndex.value].title)} class="product-image" loading="lazy" data-v-f6db8ada><div class="product-badge" data-v-f6db8ada>${ssrInterpolate(__props.products[currentProductIndex.value].tag)}</div></div><div class="product-meta" data-v-f6db8ada><h2 class="product-name" data-v-f6db8ada>${ssrInterpolate(__props.products[currentProductIndex.value].title)}</h2><p class="product-desc" data-v-f6db8ada>${ssrInterpolate(__props.products[currentProductIndex.value].description)}</p>`);
				if (__props.products[currentProductIndex.value].url) {
					_push(`<a${ssrRenderAttr("href", __props.products[currentProductIndex.value].url)} target="_blank" rel="noopener noreferrer" class="product-link" data-v-f6db8ada><span data-v-f6db8ada>Visit Live System</span>`);
					_push(ssrRenderComponent(unref(ExternalLink), { size: 14 }, null, _parent));
					_push(`</a>`);
				} else _push(`<!---->`);
				_push(`</div></div></div>`);
			}
			_push(`</div></div></div><div class="scroll-cue" aria-hidden="true" data-v-f6db8ada><a href="#about" class="scroll-link" data-v-f6db8ada><span class="scroll-text" data-v-f6db8ada>SCROLL TO EXPLORE</span>`);
			_push(ssrRenderComponent(unref(ArrowDown), {
				class: "scroll-icon animate-bounce",
				size: 14
			}, null, _parent));
			_push(`</a></div></section>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/SplitHero.vue
var _sfc_setup$6 = SplitHero_vue_vue_type_script_setup_true_lang_default.setup;
SplitHero_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/SplitHero.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var SplitHero_default = /* @__PURE__ */ _plugin_vue_export_helper_default(SplitHero_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-f6db8ada"]]);
//#endregion
//#region resources/js/Components/PortfolioV2/ChatWidget.vue?vue&type=script&setup=true&lang.ts
var MAX_INPUT_LENGTH = 1e3;
var ChatWidget_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ChatWidget",
	__ssrInlineRender: true,
	setup(__props) {
		function renderChatMarkdown(input) {
			const lines = input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").split(/\r?\n/);
			const out = [];
			let listMode = null;
			function closeList() {
				if (listMode) {
					out.push(`</${listMode}>`);
					listMode = null;
				}
			}
			for (const raw of lines) {
				const line = raw.trimEnd();
				const bullet = line.match(/^\s*[-*]\s+(.*)$/);
				const numbered = line.match(/^\s*\d+\.\s+(.*)$/);
				if (bullet) {
					if (listMode !== "ul") {
						closeList();
						out.push("<ul>");
						listMode = "ul";
					}
					out.push(`<li>${inline(bullet[1])}</li>`);
				} else if (numbered) {
					if (listMode !== "ol") {
						closeList();
						out.push("<ol>");
						listMode = "ol";
					}
					out.push(`<li>${inline(numbered[1])}</li>`);
				} else if (line === "") {
					closeList();
					out.push("");
				} else {
					closeList();
					out.push(`<p>${inline(line)}</p>`);
				}
			}
			closeList();
			return out.join("");
		}
		function inline(text) {
			return text.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/|mailto:)[^\s)]+)\)/g, (_m, label, url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
		}
		const isOpen = ref(false);
		const input = ref("");
		const messages = ref([{
			role: "assistant",
			content: "Hi! I am Ashish's AI assistant. Ask me about his tech stack, work experience, or how to contact him."
		}]);
		const isTyping = ref(false);
		ref(null);
		function handleOpenAssistant() {
			if (!isOpen.value) trackAiAssistantOpen("event_trigger");
			isOpen.value = true;
		}
		onMounted(() => {
			window.addEventListener("open-ai-assistant", handleOpenAssistant);
		});
		onBeforeUnmount(() => {
			window.removeEventListener("open-ai-assistant", handleOpenAssistant);
		});
		const promptChips = [
			"Is he open to full-time — and when can he start?",
			"What's his strongest stack?",
			"Show me his AI / RAG experience.",
			"Notice period, timezone & work authorization?",
			"What's his biggest measurable impact?"
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-widget-wrapper" }, _attrs))} data-v-fae11a34><button class="${ssrRenderClass([{ "is-open": isOpen.value }, "chat-toggle-btn"])}" aria-label="Toggle AI Assistant" data-v-fae11a34>`);
			if (isOpen.value) _push(ssrRenderComponent(unref(X), { size: 24 }, null, _parent));
			else _push(ssrRenderComponent(unref(MessageSquare), { size: 24 }, null, _parent));
			_push(`</button>`);
			if (isOpen.value) {
				_push(`<div class="chat-window" data-v-fae11a34><div class="chat-header" data-v-fae11a34>`);
				_push(ssrRenderComponent(unref(Sparkles), {
					size: 18,
					class: "header-icon"
				}, null, _parent));
				_push(`<div class="header-text" data-v-fae11a34><h3 data-v-fae11a34>AI Assistant</h3><p data-v-fae11a34>Ask anything about my work</p></div></div><div class="chat-messages" data-v-fae11a34><!--[-->`);
				ssrRenderList(messages.value, (msg, idx) => {
					_push(`<div class="${ssrRenderClass([msg.role === "user" ? "bubble-user" : "bubble-assistant", "chat-bubble"])}" data-v-fae11a34>`);
					if (msg.role === "user") _push(`<!--[-->${ssrInterpolate(msg.content)}<!--]-->`);
					else _push(`<div class="bubble-md" data-v-fae11a34>${renderChatMarkdown(msg.content) ?? ""}</div>`);
					_push(`</div>`);
				});
				_push(`<!--]-->`);
				if (isTyping.value) _push(`<div class="chat-bubble bubble-assistant typing-indicator" data-v-fae11a34><span data-v-fae11a34></span><span data-v-fae11a34></span><span data-v-fae11a34></span></div>`);
				else _push(`<!---->`);
				_push(`</div><div class="chat-chips-row" aria-label="Suggested questions" data-v-fae11a34><!--[-->`);
				ssrRenderList(promptChips, (chip, idx) => {
					_push(`<button type="button" class="chat-chip"${ssrIncludeBooleanAttr(isTyping.value) ? " disabled" : ""} data-v-fae11a34>${ssrInterpolate(chip)}</button>`);
				});
				_push(`<!--]--></div><div class="chat-input-area" data-v-fae11a34><input${ssrRenderAttr("value", input.value)} type="text"${ssrRenderAttr("maxlength", MAX_INPUT_LENGTH)}${ssrIncludeBooleanAttr(isTyping.value) ? " disabled" : ""} placeholder="Ask a question..." aria-label="Ask Ashish&#39;s AI assistant a question" data-v-fae11a34><button${ssrIncludeBooleanAttr(!input.value.trim() || isTyping.value) ? " disabled" : ""} aria-label="Send message to AI assistant" data-v-fae11a34>`);
				_push(ssrRenderComponent(unref(Send), { size: 18 }, null, _parent));
				_push(`</button></div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/ChatWidget.vue
var _sfc_setup$5 = ChatWidget_vue_vue_type_script_setup_true_lang_default.setup;
ChatWidget_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/ChatWidget.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var ChatWidget_default = /* @__PURE__ */ _plugin_vue_export_helper_default(ChatWidget_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-fae11a34"]]);
//#endregion
//#region resources/js/Components/PortfolioV2/ScrollUtilities.vue?vue&type=script&setup=true&lang.ts
var ScrollUtilities_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ScrollUtilities",
	__ssrInlineRender: true,
	setup(__props) {
		/**
		* Two small UX affordances bundled together because they share a scroll
		* listener:
		*   1. A thin progress bar pinned to the top of the viewport that tracks
		*      how far the visitor has read down the page.
		*   2. A back-to-top button that appears once the visitor has scrolled
		*      past one viewport height.
		*
		* Sharing one scroll listener keeps this cheap on a long single-page site.
		* Reading progress is a percentage of `scrollHeight - clientHeight` — safe
		* for pages of any length, including the 3× viewport hero.
		*/
		const progress = ref(0);
		const showBackToTop = ref(false);
		function onScroll() {
			const doc = document.documentElement;
			const distance = doc.scrollHeight - doc.clientHeight;
			progress.value = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
			showBackToTop.value = window.scrollY > window.innerHeight;
		}
		onMounted(() => {
			onScroll();
			window.addEventListener("scroll", onScroll, { passive: true });
			window.addEventListener("resize", onScroll, { passive: true });
		});
		onUnmounted(() => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[--><div class="scroll-progress" aria-hidden="true" data-v-a2b5244b><div class="scroll-progress-fill" style="${ssrRenderStyle({ transform: `scaleX(${progress.value})` })}" data-v-a2b5244b></div></div>`);
			if (showBackToTop.value) {
				_push(`<button type="button" class="back-to-top" aria-label="Scroll to top of page" data-v-a2b5244b>`);
				_push(ssrRenderComponent(unref(ArrowUp), {
					size: 18,
					"aria-hidden": "true"
				}, null, _parent));
				_push(`</button>`);
			} else _push(`<!---->`);
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/ScrollUtilities.vue
var _sfc_setup$4 = ScrollUtilities_vue_vue_type_script_setup_true_lang_default.setup;
ScrollUtilities_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/ScrollUtilities.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var ScrollUtilities_default = /* @__PURE__ */ _plugin_vue_export_helper_default(ScrollUtilities_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-a2b5244b"]]);
//#endregion
//#region resources/js/Components/PortfolioV2/CommandPalette.vue?vue&type=script&setup=true&lang.ts
var CommandPalette_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "CommandPalette",
	__ssrInlineRender: true,
	setup(__props) {
		const { theme, setTheme } = useTheme();
		const open = ref(false);
		const query = ref("");
		const activeIndex = ref(0);
		const inputRef = ref(null);
		const actions = [
			{
				id: "nav-about",
				label: "Go to About",
				group: "Navigation",
				icon: User,
				hint: "1",
				execute: () => scrollToSection("about")
			},
			{
				id: "nav-work",
				label: "Go to Work",
				group: "Navigation",
				icon: FolderOpen,
				hint: "3",
				execute: () => scrollToSection("work")
			},
			{
				id: "nav-career",
				label: "Go to Career",
				group: "Navigation",
				icon: Briefcase,
				hint: "2",
				execute: () => scrollToSection("career")
			},
			{
				id: "nav-tech",
				label: "Go to Tech Stack",
				group: "Navigation",
				icon: Cpu,
				hint: "4",
				execute: () => scrollToSection("tech")
			},
			{
				id: "nav-contact",
				label: "Go to Contact",
				group: "Navigation",
				icon: Mail,
				hint: "6",
				execute: () => scrollToSection("contact")
			},
			{
				id: "nav-top",
				label: "Go to Top",
				group: "Navigation",
				icon: ArrowUp,
				hint: "g h",
				execute: () => {
					window.scrollTo({
						top: 0,
						behavior: "smooth"
					});
				}
			},
			{
				id: "page-blog",
				label: "Open Blog",
				group: "Pages",
				icon: BookOpen,
				hint: "",
				execute: () => router10.visit("/blog")
			},
			{
				id: "page-case-studies",
				label: "Open Case Studies",
				group: "Pages",
				icon: Layers,
				hint: "",
				execute: () => router10.visit("/case-studies")
			},
			{
				id: "page-hiring",
				label: "For Hiring Managers",
				group: "Pages",
				icon: Handshake,
				hint: "",
				execute: () => router10.visit("/for-hiring-managers")
			},
			{
				id: "action-theme",
				label: "Toggle Theme",
				group: "Actions",
				icon: SunMoon,
				hint: "",
				execute: () => {
					setTheme(theme.value === "dark" ? "light" : "dark");
				}
			},
			{
				id: "action-resume",
				label: "Download Resume",
				group: "Actions",
				icon: FileDown,
				hint: "",
				execute: () => {
					window.open("/resume/ashish-gupta-resume.pdf", "_blank");
				}
			}
		];
		const filteredActions = computed(() => {
			const q = query.value.toLowerCase().trim();
			if (!q) return actions;
			return actions.filter((a) => a.label.toLowerCase().includes(q) || a.group.toLowerCase().includes(q));
		});
		const groupedActions = computed(() => {
			const groups = [];
			for (const g of [
				"Navigation",
				"Pages",
				"Actions"
			]) {
				const items = filteredActions.value.filter((a) => a.group === g);
				if (items.length) groups.push({
					name: g,
					items
				});
			}
			return groups;
		});
		watch(filteredActions, () => {
			activeIndex.value = 0;
		});
		function scrollToSection(id) {
			const el = document.getElementById(id);
			if (el) el.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		}
		function openPalette() {
			open.value = true;
			query.value = "";
			activeIndex.value = 0;
			nextTick(() => inputRef.value?.focus());
		}
		function closePalette() {
			open.value = false;
		}
		function isEditableTarget(target) {
			if (!(target instanceof HTMLElement)) return false;
			const tag = target.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
			if (target.isContentEditable) return true;
			return false;
		}
		function onGlobalKeydown(event) {
			if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
				if (isEditableTarget(event.target)) return;
				event.preventDefault();
				if (open.value) closePalette();
				else openPalette();
			}
			if (event.key === "Escape" && open.value) {
				event.preventDefault();
				closePalette();
			}
		}
		onMounted(() => {
			window.addEventListener("keydown", onGlobalKeydown);
		});
		onUnmounted(() => {
			window.removeEventListener("keydown", onGlobalKeydown);
		});
		const isMac = ref(false);
		onMounted(() => {
			isMac.value = navigator.platform?.toUpperCase().includes("MAC") ?? false;
		});
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderTeleport(_push, (_push) => {
				if (open.value) {
					_push(`<div class="cp-overlay" role="dialog" aria-modal="true" aria-label="Command palette" data-v-53653368><div class="cp-card" data-v-53653368><div class="cp-header" data-v-53653368>`);
					_push(ssrRenderComponent(unref(Search), {
						size: 18,
						class: "cp-search-icon",
						"aria-hidden": "true"
					}, null, _parent));
					_push(`<input${ssrRenderAttr("value", query.value)} class="cp-input" type="text" placeholder="Type a command or search..." aria-label="Search actions, projects, and pages" autocomplete="off" spellcheck="false" data-v-53653368></div><div class="cp-list" role="listbox" data-v-53653368>`);
					if (filteredActions.value.length) {
						_push(`<!--[-->`);
						ssrRenderList(groupedActions.value, (group) => {
							_push(`<!--[--><div class="cp-group-label" data-v-53653368>${ssrInterpolate(group.name)}</div><!--[-->`);
							ssrRenderList(group.items, (action, i) => {
								_push(`<button class="${ssrRenderClass([{ "cp-item--active": filteredActions.value.indexOf(action) === activeIndex.value }, "cp-item"])}" role="option"${ssrRenderAttr("aria-selected", filteredActions.value.indexOf(action) === activeIndex.value)} data-v-53653368>`);
								ssrRenderVNode(_push, createVNode(resolveDynamicComponent(action.icon), {
									size: 16,
									class: "cp-item-icon",
									"aria-hidden": "true"
								}, null), _parent);
								_push(`<span class="cp-item-label" data-v-53653368>${ssrInterpolate(action.label)}</span>`);
								if (action.hint) _push(`<kbd class="cp-kbd" data-v-53653368>${ssrInterpolate(action.hint)}</kbd>`);
								else _push(`<!---->`);
								_push(`</button>`);
							});
							_push(`<!--]--><!--]-->`);
						});
						_push(`<!--]-->`);
					} else _push(`<div class="cp-empty" data-v-53653368>No results found</div>`);
					_push(`</div><div class="cp-footer" data-v-53653368><span class="cp-footer-hint" data-v-53653368><kbd class="cp-kbd cp-kbd--sm" data-v-53653368>↑</kbd><kbd class="cp-kbd cp-kbd--sm" data-v-53653368>↓</kbd> navigate </span><span class="cp-footer-hint" data-v-53653368><kbd class="cp-kbd cp-kbd--sm" data-v-53653368>↵</kbd> select </span><span class="cp-footer-hint" data-v-53653368><kbd class="cp-kbd cp-kbd--sm" data-v-53653368>esc</kbd> close </span><span class="cp-footer-shortcut" data-v-53653368><kbd class="cp-kbd cp-kbd--sm" data-v-53653368>${ssrInterpolate(isMac.value ? "⌘" : "Ctrl")}+K</kbd></span></div></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/CommandPalette.vue
var _sfc_setup$3 = CommandPalette_vue_vue_type_script_setup_true_lang_default.setup;
CommandPalette_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/CommandPalette.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var CommandPalette_default = /* @__PURE__ */ _plugin_vue_export_helper_default(CommandPalette_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-53653368"]]);
//#endregion
//#region resources/js/Components/PortfolioV2/TerminalMode.vue?vue&type=script&setup=true&lang.ts
var PROMPT = "visitor@ashish.dev:~$ ";
var TerminalMode_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "TerminalMode",
	__ssrInlineRender: true,
	setup(__props) {
		const KONAMI = [
			"ArrowUp",
			"ArrowUp",
			"ArrowDown",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight",
			"ArrowLeft",
			"ArrowRight",
			"b",
			"a"
		];
		const isOpen = ref(false);
		const inputText = ref("");
		const history = ref([]);
		const commandHistory = ref([]);
		const historyIndex = ref(-1);
		ref(null);
		const inputEl = ref(null);
		let konamiPos = 0;
		function onGlobalKeydown(e) {
			const tag = e.target?.tagName;
			if (!isOpen.value && (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT")) return;
			if (!isOpen.value) {
				const expected = KONAMI[konamiPos];
				if (e.key === expected || e.key.toLowerCase() === expected) {
					konamiPos++;
					if (konamiPos === KONAMI.length) {
						konamiPos = 0;
						openTerminal();
					}
				} else konamiPos = 0;
				return;
			}
			if (e.key === "Escape") {
				isOpen.value = false;
				return;
			}
		}
		function openTerminal() {
			history.value = [{
				type: "output",
				text: "Welcome to ashish.dev terminal v1.0.0\nType 'help' for available commands.\n"
			}];
			commandHistory.value = [];
			historyIndex.value = 0;
			inputText.value = "";
			isOpen.value = true;
		}
		watch(isOpen, (open) => {
			if (open) {
				document.body.style.overflow = "hidden";
				nextTick(() => inputEl.value?.focus());
			} else document.body.style.overflow = "";
		});
		onMounted(() => {
			window.addEventListener("keydown", onGlobalKeydown);
		});
		onUnmounted(() => {
			window.removeEventListener("keydown", onGlobalKeydown);
			document.body.style.overflow = "";
		});
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderTeleport(_push, (_push) => {
				if (isOpen.value) {
					_push(`<div class="terminal-overlay" data-v-88e1094e><div class="terminal-window" data-v-88e1094e><div class="scanlines" aria-hidden="true" data-v-88e1094e></div><div class="terminal-titlebar" data-v-88e1094e><span class="terminal-dot terminal-dot--red" data-v-88e1094e></span><span class="terminal-dot terminal-dot--yellow" data-v-88e1094e></span><span class="terminal-dot terminal-dot--green" data-v-88e1094e></span><span class="terminal-titlebar__text" data-v-88e1094e>visitor@ashish.dev: ~</span><button class="terminal-close" aria-label="Close terminal" data-v-88e1094e> × </button></div><div class="terminal-output" data-v-88e1094e><!--[-->`);
					ssrRenderList(history.value, (line, i) => {
						_push(`<div class="${ssrRenderClass(["terminal-line", `terminal-line--${line.type}`])}" data-v-88e1094e><pre data-v-88e1094e>${ssrInterpolate(line.text)}</pre></div>`);
					});
					_push(`<!--]--></div><form class="terminal-input-line" data-v-88e1094e><span class="terminal-prompt" data-v-88e1094e>${ssrInterpolate(PROMPT)}</span><input${ssrRenderAttr("value", inputText.value)} class="terminal-input" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="Terminal input" data-v-88e1094e></form></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/TerminalMode.vue
var _sfc_setup$2 = TerminalMode_vue_vue_type_script_setup_true_lang_default.setup;
TerminalMode_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/TerminalMode.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var TerminalMode_default = /* @__PURE__ */ _plugin_vue_export_helper_default(TerminalMode_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-88e1094e"]]);
//#endregion
//#region resources/js/Composables/useToast.ts
var toasts = ref([]);
var nextId = 0;
function show(message, type = "info", duration = 4e3) {
	const id = ++nextId;
	toasts.value.push({
		id,
		message,
		type
	});
	setTimeout(() => {
		const t = toasts.value.find((t) => t.id === id);
		if (t) t.leaving = true;
		setTimeout(() => {
			toasts.value = toasts.value.filter((t) => t.id !== id);
		}, 220);
	}, duration);
}
function useToast() {
	return {
		toasts: readonly(toasts),
		success: (msg) => show(msg, "success"),
		error: (msg) => show(msg, "error"),
		info: (msg) => show(msg, "info")
	};
}
//#endregion
//#region resources/js/Components/PortfolioV2/ToastContainer.vue?vue&type=script&setup=true&lang.ts
var ToastContainer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ToastContainer",
	__ssrInlineRender: true,
	setup(__props) {
		const { toasts } = useToast();
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderTeleport(_push, (_push) => {
				_push(`<div class="toast-container" aria-live="polite" aria-atomic="true"><!--[-->`);
				ssrRenderList(unref(toasts), (toast) => {
					_push(`<div class="${ssrRenderClass([[`toast--${toast.type}`, { "toast-out": toast.leaving }], "toast"])}" role="status">${ssrInterpolate(toast.message)}</div>`);
				});
				_push(`<!--]--></div>`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/ToastContainer.vue
var _sfc_setup$1 = ToastContainer_vue_vue_type_script_setup_true_lang_default.setup;
ToastContainer_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/ToastContainer.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ToastContainer_default = ToastContainer_vue_vue_type_script_setup_true_lang_default;
//#endregion
//#region resources/js/Composables/useKeyboardShortcuts.ts
/**
* Registers portfolio-wide keyboard shortcuts.
*
* Contract: shortcuts NEVER fire while the user is typing into an input,
* textarea, contenteditable, or an interactive element. That would be
* hostile — someone drafting a contact message shouldn't have the '1' key
* jump them to About. We check `event.target` before dispatching.
*
* Also skipped when any modifier key is pressed (Cmd/Ctrl/Alt/Meta), so
* browser shortcuts and copy/paste keep working normally.
*
* Shortcuts:
*   1 → About         g h → Home (top)
*   2 → Career        g c → Contact (also 6)
*   3 → Work          ?   → Show help (currently a console.info stub)
*   4 → Tech
*   5 → (unused, reserved for future)
*   6 → Contact
*   /  → Scroll to contact and focus the message textarea
*/
var SECTION_IDS = {
	"1": "about",
	"2": "career",
	"3": "work",
	"4": "tech",
	"6": "contact",
	"h": "top",
	"c": "contact"
};
function isEditableContext(target) {
	if (!(target instanceof HTMLElement)) return false;
	const tag = target.tagName;
	if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
	if (target.isContentEditable) return true;
	return false;
}
function scrollToSection(id) {
	if (id === "top") {
		const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		window.scrollTo({
			top: 0,
			behavior: prefersReduced ? "auto" : "smooth"
		});
		return;
	}
	const el = document.getElementById(id);
	if (!el) return;
	const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	el.scrollIntoView({
		behavior: prefersReduced ? "auto" : "smooth",
		block: "start"
	});
}
var awaitingGSequence = false;
var gTimeout = null;
function useKeyboardShortcuts() {
	function onKeydown(event) {
		if (event.altKey || event.ctrlKey || event.metaKey) return;
		if (isEditableContext(event.target)) return;
		if (event.key === "/") {
			event.preventDefault();
			scrollToSection("contact");
			setTimeout(() => {
				document.getElementById("cf-message")?.focus();
			}, 400);
			return;
		}
		if (event.key === "g" && !event.shiftKey) {
			awaitingGSequence = true;
			if (gTimeout) window.clearTimeout(gTimeout);
			gTimeout = window.setTimeout(() => {
				awaitingGSequence = false;
				gTimeout = null;
			}, 900);
			return;
		}
		if (awaitingGSequence) {
			const target = SECTION_IDS[event.key];
			if (target) scrollToSection(target);
			awaitingGSequence = false;
			if (gTimeout) window.clearTimeout(gTimeout);
			gTimeout = null;
			return;
		}
		const target = SECTION_IDS[event.key];
		if (target) scrollToSection(target);
	}
	onMounted(() => {
		window.addEventListener("keydown", onKeydown);
	});
	onUnmounted(() => {
		window.removeEventListener("keydown", onKeydown);
		if (gTimeout) window.clearTimeout(gTimeout);
	});
}
//#endregion
//#region resources/js/Composables/useLenisSmoothScroll.ts
gsap.registerPlugin(ScrollTrigger$1);
var lenisInstance = ref(null);
function useLenisSmoothScroll() {
	let tickerCallback = null;
	function initLenis() {
		if (typeof window === "undefined") return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if (lenisInstance.value) lenisInstance.value.destroy();
		const lenis = new Lenis({
			duration: 1.15,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: "vertical",
			gestureOrientation: "vertical",
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 1.5,
			infinite: false
		});
		lenisInstance.value = lenis;
		lenis.on("scroll", ScrollTrigger$1.update);
		tickerCallback = (time) => {
			lenis.raf(time * 1e3);
		};
		gsap.ticker.add(tickerCallback);
		gsap.ticker.lagSmoothing(0);
	}
	function destroyLenis() {
		if (tickerCallback) {
			gsap.ticker.remove(tickerCallback);
			tickerCallback = null;
		}
		if (lenisInstance.value) {
			lenisInstance.value.destroy();
			lenisInstance.value = null;
		}
	}
	function pauseScroll() {
		lenisInstance.value?.stop();
	}
	function resumeScroll() {
		lenisInstance.value?.start();
	}
	function scrollTo(target, options) {
		lenisInstance.value?.scrollTo(target, options);
	}
	return {
		lenis: lenisInstance,
		initLenis,
		destroyLenis,
		pauseScroll,
		resumeScroll,
		scrollTo
	};
}
//#endregion
//#region resources/js/Pages/Portfolio/Index.vue?vue&type=script&setup=true&lang.ts
var Index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		profile: {},
		experiences: {},
		projects: {},
		skills: {},
		socialLinks: {},
		educations: {},
		services: {}
	},
	setup(__props) {
		gsap.registerPlugin(ScrollTrigger$1);
		const asyncOpts = {
			loadingComponent: SectionSkeleton_default,
			delay: 200,
			timeout: 12e3
		};
		const AboutSection = defineAsyncComponent({
			loader: () => import("./AboutSection-BmKuS1Fk.js"),
			...asyncOpts
		});
		const TimelineSection = defineAsyncComponent({
			loader: () => import("./TimelineSection-BSeVZ36r.js"),
			...asyncOpts
		});
		const WorksSection = defineAsyncComponent({
			loader: () => import("./WorksSection-pHS3HMsO.js"),
			...asyncOpts
		});
		const MetricsSection = defineAsyncComponent({
			loader: () => import("./MetricsSection-Bm_bQ4NO.js"),
			...asyncOpts
		});
		const TestimonialsSection = defineAsyncComponent({
			loader: () => import("./TestimonialsSection-QgI4FI9R.js"),
			...asyncOpts
		});
		const FeaturedCaseStudySection = defineAsyncComponent({
			loader: () => import("./FeaturedCaseStudySection-CDQP8B7y.js"),
			...asyncOpts
		});
		const TechStackSection = defineAsyncComponent({
			loader: () => import("./TechStackSection-BvbixZU2.js"),
			...asyncOpts
		});
		const GitHubActivity = defineAsyncComponent({
			loader: () => import("./GitHubActivity-dj2Ua46l.js"),
			...asyncOpts
		});
		const ContactSection = defineAsyncComponent({
			loader: () => import("./ContactSection-DL6ax8CI.js"),
			...asyncOpts
		});
		const props = __props;
		const { depthVars } = useMouseDepth(1);
		const depthRef = ref(null);
		const { initLenis, destroyLenis } = useLenisSmoothScroll();
		useKeyboardShortcuts();
		const linkedinLink = props.socialLinks.find((l) => l.platform === "linkedin");
		const githubLink = props.socialLinks.find((l) => l.platform === "github");
		function handleOpenAiAssistant() {
			window.dispatchEvent(new CustomEvent("open-ai-assistant"));
		}
		function handleTrackCta(type) {
			if (typeof window !== "undefined" && window.plausible) window.plausible("hero_cta", { props: { type } });
		}
		ref(true);
		const pageReady = ref(true);
		ref(100);
		ref(true);
		ref(false);
		function initScrollDepth() {
			if (!depthRef.value) return;
			depthRef.value.querySelectorAll(":scope > *").forEach((section) => {
				gsap.set(section, {
					opacity: 1,
					z: 0,
					rotateX: 0,
					clearProps: "opacity,transform"
				});
			});
		}
		onMounted(() => {
			pageReady.value = true;
			initLenis();
			if (typeof window !== "undefined") sessionStorage.setItem("ag_portfolio_booted", "true");
			setTimeout(() => nextTick(initScrollDepth), 100);
		});
		onUnmounted(() => {
			destroyLenis();
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(head_default), { title: __props.profile.name + " — " + __props.profile.title }, null, _parent));
			_push(`<div class="v2-page" style="${ssrRenderStyle(unref(depthVars))}" data-v-fda3fc53>`);
			_push(ssrRenderComponent(ToastContainer_default, null, null, _parent));
			_push(ssrRenderComponent(NavBar_default, {
				initials: __props.profile.name.split(" ").map((w) => w[0]).join(""),
				"linkedin-url": unref(linkedinLink)?.url,
				"social-links": __props.socialLinks,
				"resume-url": __props.profile.resumeUrl
			}, null, _parent));
			_push(ssrRenderComponent(SplitHero_default, {
				name: __props.profile.name,
				title: __props.profile.title,
				subtitle: __props.profile.subtitle,
				"resume-url": __props.profile.resumeUrl,
				"contact-email": __props.profile.email,
				"linkedin-url": unref(linkedinLink)?.url,
				"github-url": unref(githubLink)?.url,
				"avatar-url": __props.profile.avatarUrl,
				"panel-mode": "architecture",
				onOpenAssistant: handleOpenAiAssistant,
				onCta: handleTrackCta
			}, null, _parent));
			_push(`<main id="main-content" class="depth-sections" role="main" data-v-fda3fc53>`);
			_push(ssrRenderComponent(unref(AboutSection), { profile: __props.profile }, null, _parent));
			_push(ssrRenderComponent(unref(TimelineSection), { experiences: __props.experiences }, null, _parent));
			_push(ssrRenderComponent(unref(WorksSection), { projects: __props.projects }, null, _parent));
			_push(ssrRenderComponent(unref(MetricsSection), null, null, _parent));
			_push(ssrRenderComponent(unref(TestimonialsSection), null, null, _parent));
			_push(ssrRenderComponent(unref(FeaturedCaseStudySection), null, null, _parent));
			_push(ssrRenderComponent(unref(TechStackSection), { skills: __props.skills }, null, _parent));
			_push(ssrRenderComponent(unref(GitHubActivity), null, null, _parent));
			_push(ssrRenderComponent(unref(ContactSection), {
				profile: __props.profile,
				"social-links": __props.socialLinks,
				educations: __props.educations
			}, null, _parent));
			_push(`</main>`);
			_push(ssrRenderComponent(ChatWidget_default, null, null, _parent));
			_push(ssrRenderComponent(ScrollUtilities_default, null, null, _parent));
			_push(ssrRenderComponent(CommandPalette_default, null, null, _parent));
			_push(ssrRenderComponent(TerminalMode_default, null, null, _parent));
			_push(`</div><!--]-->`);
		};
	}
});
//#endregion
//#region resources/js/Pages/Portfolio/Index.vue
var _sfc_setup = Index_vue_vue_type_script_setup_true_lang_default.setup;
Index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Portfolio/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Index_default = /* @__PURE__ */ _plugin_vue_export_helper_default(Index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-fda3fc53"]]);
//#endregion
export { Index_default as default };
