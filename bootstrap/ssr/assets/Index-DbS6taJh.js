import { i as link_default, r as head_default } from "./vendor-inertia-Bgi69XOP.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { n as trackHiringPageView } from "./analytics-BdbHl86R.js";
import { t as ThemeToggle_default } from "./ThemeToggle-Dc8552Zt.js";
import { createTextVNode, createVNode, defineComponent, onMounted, ref, resolveDynamicComponent, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderVNode } from "vue/server-renderer";
import { ArrowUpRight, Award, Bot, Briefcase, Calendar, CheckCircle2, Clock, Code2, Cpu, Database, FileText, Globe, Layers, Mail, Menu, Shield, ShieldCheck, Sparkles, Users, X, Zap } from "lucide-vue-next";
//#region resources/js/Pages/Hiring/Index.vue?vue&type=script&setup=true&lang.ts
var resumeUrl = "/resume/ashish-gupta-resume.pdf";
var emailHref = "mailto:ashishgupta1v@gmail.com";
var linkedinUrl = "https://www.linkedin.com/in/ashish-gupta-dev/";
var calendlyUrl = "https://calendly.com/ashishgupta1v/30min";
var githubUrl = "https://github.com/ashishgupta1v";
var Index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Index",
	__ssrInlineRender: true,
	props: { recruiterBrief: {} },
	setup(__props) {
		const mobileOpen = ref(false);
		onMounted(() => {
			trackHiringPageView();
		});
		const snapshot = [
			{
				label: "Status",
				value: "Actively interviewing — open to full-time"
			},
			{
				label: "Target role",
				value: "Senior / Staff / Lead Full-Stack Engineer · Architect"
			},
			{
				label: "Availability",
				value: "Immediate / Flexible start"
			},
			{
				label: "Location",
				value: "India · Remote-first / Open to relocation for top-tier roles"
			},
			{
				label: "Time zone",
				value: "IST (UTC+5:30) · 4–6 hrs daily dedicated overlap with US (EST/PST) & full UK/EU overlap"
			},
			{
				label: "Work authorization",
				value: "Authorized to work in India · Open to Remote Worldwide & Visa Sponsorship/Relocation"
			},
			{
				label: "Comp",
				value: "Open to discuss based on role scope and impact"
			}
		];
		const conversationPoints = [
			{
				metric: "$1M/year",
				label: "Cloud-Infrastructure Savings",
				description: "Through architectural optimization, query tuning, and cache-aside layers at Infosys."
			},
			{
				metric: "−30%",
				label: "Clinical Latency Reduction",
				description: "Clinical-trial monitoring latency via Redis Queues + real-time sync ($360K saved in 2024)."
			},
			{
				metric: "−59%",
				label: "Cycle Time Reduction",
				description: "Order-to-dispatch cycle time improvement through knitwear ERP legacy modernization."
			},
			{
				metric: "+60%",
				label: "User Efficiency Gain",
				description: "Increase in user workflow efficiency modernizing legacy healthcare monoliths with DDD."
			},
			{
				metric: "Squad of 7",
				label: "Engineering Leadership",
				description: "Led technical squad; enforced Pest/Vitest automated testing standards for 0-defect deployments."
			}
		];
		const aiEngineeringPillars = [
			{
				title: "RAG & Vector Search",
				description: "Production Retrieval-Augmented Generation with pgvector embeddings (HNSW cosine search) and semantic re-ranking; grounded answers over habit evidence.",
				icon: Database
			},
			{
				title: "LLM Integration & Human Approval Queue",
				description: "OpenAI APIs wired to an asynchronous Approval Queue — keeping coaches in the loop and preventing direct unreviewed LLM output to clients on WhatsApp.",
				icon: Cpu
			},
			{
				title: "AI Safety & Trust Audit Log",
				description: "Multi-tier prompt-injection defense, hallucination evaluation, and full telemetry logging (tokens, latency, confidence score) for every AI event.",
				icon: ShieldCheck
			},
			{
				title: "Agentic Automation",
				description: "Autonomous accountability and intake workflows that turn loose chat threads into verified event-sourced ledger records.",
				icon: Bot
			}
		];
		const howIWork = [
			{
				title: "Domain-Driven Design",
				subtitle: "Legacy monoliths → decoupled modular monoliths with clean bounded contexts and domain events.",
				icon: Layers
			},
			{
				title: "Production AI & Vector RAG",
				subtitle: "Grounded RAG pipelines (OpenAI + pgvector) running live on WhatsApp with human-in-the-loop Approval Queue and full Trust & Audit logging.",
				icon: Sparkles
			},
			{
				title: "Performance & Resilience",
				subtitle: "Event-driven architecture, Redis-first patterns, zero-downtime Strangler migrations, and Sentry observability.",
				icon: Zap
			},
			{
				title: "Team Leadership & Standards",
				subtitle: "Mentoring engineers, fostering an RFC/code-review culture, and enforcing automated test discipline.",
				icon: Users
			}
		];
		const coreStack = {
			languages: "PHP, JavaScript, TypeScript, Python, SQL",
			aiEngineering: "RAG Pipelines, pgvector, Vector Embeddings (OpenAI), Tool Use / Function Calling, Prompt Injection Defense, Autonomous Agents",
			frameworks: "Laravel 13, Vue 3, Inertia.js, Node.js, Nuxt.js, React / Next.js",
			data: "PostgreSQL, MySQL, Redis, pgvector, SQLite (WAL)",
			cloud: "AWS (S3, RDS, ECS, CloudFront), Docker, Nginx, Jenkins, GitHub Actions",
			practices: "DDD, SOLID, Modular Monoliths, RESTful APIs, Event-Driven Systems"
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(head_default), { title: "For Hiring Managers & Recruiters — Ashish Gupta (Senior Full-Stack Architect)" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<meta name="description" content="10+ years shipping production systems end-to-end — Vue, Laravel, DDD, and AI. Senior Full-Stack Architect open to full-time roles." data-v-fb19da1d${_scopeId}><meta property="og:title" content="For Hiring Managers &amp; Recruiters — Ashish Gupta" data-v-fb19da1d${_scopeId}><meta property="og:description" content="10+ years shipping production systems end-to-end — Vue, Laravel, DDD, and AI. Senior Full-Stack Architect open to full-time roles." data-v-fb19da1d${_scopeId}><meta property="og:type" content="website" data-v-fb19da1d${_scopeId}><meta property="og:url" content="https://ashishgupta.dev/for-hiring-managers" data-v-fb19da1d${_scopeId}><link rel="canonical" href="https://ashishgupta.dev/for-hiring-managers" data-v-fb19da1d${_scopeId}>`);
					else return [
						createVNode("meta", {
							name: "description",
							content: "10+ years shipping production systems end-to-end — Vue, Laravel, DDD, and AI. Senior Full-Stack Architect open to full-time roles."
						}),
						createVNode("meta", {
							property: "og:title",
							content: "For Hiring Managers & Recruiters — Ashish Gupta"
						}),
						createVNode("meta", {
							property: "og:description",
							content: "10+ years shipping production systems end-to-end — Vue, Laravel, DDD, and AI. Senior Full-Stack Architect open to full-time roles."
						}),
						createVNode("meta", {
							property: "og:type",
							content: "website"
						}),
						createVNode("meta", {
							property: "og:url",
							content: "https://ashishgupta.dev/for-hiring-managers"
						}),
						createVNode("link", {
							rel: "canonical",
							href: "https://ashishgupta.dev/for-hiring-managers"
						})
					];
				}),
				_: 1
			}, _parent));
			_push(`<div class="hiring-page" data-v-fb19da1d><header class="topbar" data-v-fb19da1d><div class="topbar-inner" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/",
				class: "brand"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="brand-name" data-v-fb19da1d${_scopeId}>Ashish Gupta</span><span class="brand-role" data-v-fb19da1d${_scopeId}>Senior Full-Stack Architect</span>`);
					else return [createVNode("span", { class: "brand-name" }, "Ashish Gupta"), createVNode("span", { class: "brand-role" }, "Senior Full-Stack Architect")];
				}),
				_: 1
			}, _parent));
			_push(`<nav class="topbar-nav" aria-label="Page navigation" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/",
				class: "topbar-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Home`);
					else return [createTextVNode("Home")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(link_default), {
				href: "/case-studies",
				class: "topbar-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Case Studies`);
					else return [createTextVNode("Case Studies")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(link_default), {
				href: "/blog",
				class: "topbar-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Blog`);
					else return [createTextVNode("Blog")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="topbar-current" data-v-fb19da1d>For Hiring Managers</span><a${ssrRenderAttr("href", resumeUrl)} download="Ashish-Gupta-Resume.pdf" target="_blank" rel="noopener noreferrer" class="topbar-resume glow-pill" data-v-fb19da1d><span data-v-fb19da1d>RÉSUMÉ (PDF)</span>`);
			_push(ssrRenderComponent(unref(ArrowUpRight), {
				size: 13,
				"aria-hidden": "true"
			}, null, _parent));
			_push(`</a>`);
			_push(ssrRenderComponent(ThemeToggle_default, { class: "topbar-link topbar-theme-btn" }, null, _parent));
			_push(`</nav><button class="hamburger-btn"${ssrRenderAttr("aria-expanded", mobileOpen.value)} aria-label="Toggle mobile menu" data-v-fb19da1d>`);
			if (mobileOpen.value) _push(ssrRenderComponent(unref(X), { size: 22 }, null, _parent));
			else _push(ssrRenderComponent(unref(Menu), { size: 22 }, null, _parent));
			_push(`</button></div></header>`);
			if (mobileOpen.value) {
				_push(`<div class="mobile-overlay" data-v-fb19da1d><nav class="mobile-drawer" aria-label="Mobile navigation" data-v-fb19da1d><div class="mobile-drawer-header" data-v-fb19da1d><span class="drawer-title" data-v-fb19da1d>Navigation</span><button class="drawer-close" aria-label="Close menu" data-v-fb19da1d>`);
				_push(ssrRenderComponent(unref(X), { size: 20 }, null, _parent));
				_push(`</button></div><div class="mobile-links-list" data-v-fb19da1d>`);
				_push(ssrRenderComponent(unref(link_default), {
					href: "/",
					class: "mobile-link",
					onClick: ($event) => mobileOpen.value = false
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Home`);
						else return [createTextVNode("Home")];
					}),
					_: 1
				}, _parent));
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
				_push(`<span class="mobile-link mobile-link--current" data-v-fb19da1d>For Hiring Managers</span></div><div class="mobile-actions" data-v-fb19da1d><a${ssrRenderAttr("href", resumeUrl)} download="Ashish-Gupta-Resume.pdf" target="_blank" rel="noopener noreferrer" class="mobile-resume-btn glow-pill" data-v-fb19da1d>`);
				_push(ssrRenderComponent(unref(FileText), { size: 16 }, null, _parent));
				_push(`<span data-v-fb19da1d>Download Résumé (PDF)</span>`);
				_push(ssrRenderComponent(unref(ArrowUpRight), { size: 14 }, null, _parent));
				_push(`</a></div></nav></div>`);
			} else _push(`<!---->`);
			_push(`<main class="content-shell" data-v-fb19da1d><section class="brief-hero" data-v-fb19da1d><div class="brief-badge-row" data-v-fb19da1d><span class="brief-pill glow-pill" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(Briefcase), {
				size: 13,
				class: "pill-icon"
			}, null, _parent));
			_push(` Why hire me </span><span class="brief-pill glow-pill-violet" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(Clock), {
				size: 13,
				class: "pill-icon"
			}, null, _parent));
			_push(` Available Immediately · Open to Full-Time </span></div><h1 class="hero-title" data-v-fb19da1d> An engineer who ships scalable systems <span class="text-gradient" data-v-fb19da1d>and production AI — end to end.</span></h1><p class="hero-subline" data-v-fb19da1d><strong data-v-fb19da1d>Senior Full-Stack &amp; AI Systems Architect</strong> · 10+ years · Open to full-time (Remote worldwide / Relocation) · Available immediately. </p><div class="pitch-cards-grid" data-v-fb19da1d><div class="pitch-card glass-panel" data-v-fb19da1d><div class="pitch-card-head" data-v-fb19da1d><span class="pitch-card-badge" data-v-fb19da1d>Business impact</span></div><p class="pitch-card-text" data-v-fb19da1d> Delivered <strong data-v-fb19da1d>\$1M/year</strong> in cloud savings and <strong data-v-fb19da1d>−30%</strong> latency by re-architecting legacy healthcare &amp; aviation monoliths with DDD. </p></div>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/case-studies/zoeticoach-ai-whatsapp-accountability-engine",
				class: "pitch-card glass-panel pitch-card--link",
				"aria-label": "Read ZoetiCoach AI case study"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<div class="pitch-card-head" data-v-fb19da1d${_scopeId}><span class="pitch-card-badge accent-badge" data-v-fb19da1d${_scopeId}>Production AI ↗</span></div><p class="pitch-card-text" data-v-fb19da1d${_scopeId}> Shipped a <strong data-v-fb19da1d${_scopeId}>grounded, guarded RAG pipeline</strong> (OpenAI + pgvector) on WhatsApp for ZoetiCoach AI with an <strong data-v-fb19da1d${_scopeId}>Approval Queue</strong> &amp; <strong data-v-fb19da1d${_scopeId}>Trust &amp; Audit Log</strong> — sub-second, not a demo. </p>`);
					else return [createVNode("div", { class: "pitch-card-head" }, [createVNode("span", { class: "pitch-card-badge accent-badge" }, "Production AI ↗")]), createVNode("p", { class: "pitch-card-text" }, [
						createTextVNode(" Shipped a "),
						createVNode("strong", null, "grounded, guarded RAG pipeline"),
						createTextVNode(" (OpenAI + pgvector) on WhatsApp for ZoetiCoach AI with an "),
						createVNode("strong", null, "Approval Queue"),
						createTextVNode(" & "),
						createVNode("strong", null, "Trust & Audit Log"),
						createTextVNode(" — sub-second, not a demo. ")
					])];
				}),
				_: 1
			}, _parent));
			_push(`<div class="pitch-card glass-panel" data-v-fb19da1d><div class="pitch-card-head" data-v-fb19da1d><span class="pitch-card-badge" data-v-fb19da1d>Trust &amp; leadership</span></div><p class="pitch-card-text" data-v-fb19da1d><strong data-v-fb19da1d>HIPAA-grade</strong> security (OAuth2/OIDC), <strong data-v-fb19da1d>0-defect</strong> deploys with Pest/Vitest, and led a <strong data-v-fb19da1d>squad of 7</strong>. </p></div></div><div class="best-fit-banner glass-panel" data-v-fb19da1d><p class="best-fit-text" data-v-fb19da1d> 🎯 <strong data-v-fb19da1d>Best fit for:</strong> Senior / Staff / Lead Full-Stack, AI Engineer, or Forward-Deployed Engineer roles in product teams where ownership matters. </p></div><div class="hero-actions" data-v-fb19da1d><a${ssrRenderAttr("href", resumeUrl)} download="Ashish-Gupta-Resume.pdf" target="_blank" rel="noopener noreferrer" class="btn-primary glow-pill" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(FileText), { size: 16 }, null, _parent));
			_push(`<span data-v-fb19da1d>Download Résumé (PDF)</span>`);
			_push(ssrRenderComponent(unref(ArrowUpRight), { size: 14 }, null, _parent));
			_push(`</a><a${ssrRenderAttr("href", calendlyUrl)} target="_blank" rel="noopener noreferrer" class="btn-secondary btn-calendly-accent" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(Calendar), { size: 16 }, null, _parent));
			_push(`<span data-v-fb19da1d>Book a 20-min call</span>`);
			_push(ssrRenderComponent(unref(ArrowUpRight), { size: 14 }, null, _parent));
			_push(`</a><a${ssrRenderAttr("href", emailHref)} class="btn-ghost" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(Mail), { size: 16 }, null, _parent));
			_push(`<span data-v-fb19da1d>Email me</span></a><a${ssrRenderAttr("href", linkedinUrl)} target="_blank" rel="noopener noreferrer" class="btn-ghost" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(Globe), { size: 16 }, null, _parent));
			_push(`<span data-v-fb19da1d>Connect on LinkedIn</span>`);
			_push(ssrRenderComponent(unref(ArrowUpRight), { size: 14 }, null, _parent));
			_push(`</a></div><p class="hero-microcopy" data-v-fb19da1d> *I read every message personally and reply within one business day.* </p></section><section class="snapshot-section" data-v-fb19da1d><div class="section-heading-row" data-v-fb19da1d><h2 class="section-heading" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(CheckCircle2), {
				size: 18,
				class: "heading-icon"
			}, null, _parent));
			_push(` Snapshot </h2><span class="section-heading-hint" data-v-fb19da1d>A scannable fact bar for recruiting teams</span></div><div class="snapshot-card glass-panel" data-v-fb19da1d><table class="snapshot-table" data-v-fb19da1d><tbody data-v-fb19da1d><!--[-->`);
			ssrRenderList(snapshot, (item) => {
				_push(`<tr class="snapshot-row" data-v-fb19da1d><td class="snapshot-label" data-v-fb19da1d>${ssrInterpolate(item.label)}</td><td class="snapshot-value" data-v-fb19da1d>${ssrInterpolate(item.value)}</td></tr>`);
			});
			_push(`<!--]--></tbody></table></div></section><section class="seeking-section" data-v-fb19da1d><div class="seeking-card glass-panel" data-v-fb19da1d><h2 class="seeking-title" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(Briefcase), {
				size: 20,
				class: "heading-icon"
			}, null, _parent));
			_push(` What I&#39;m looking for </h2><p class="seeking-body" data-v-fb19da1d> A senior/staff role where <strong data-v-fb19da1d>ownership matters</strong> — taking systems from architecture through production, mentoring engineers, and shipping measurable outcomes. Strongest in <strong data-v-fb19da1d>fast-moving product teams</strong> modernizing complex domains (Healthcare, Aviation, Logistics, SaaS). </p></div></section><section class="conversation-section" data-v-fb19da1d><h2 class="section-heading" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(Award), {
				size: 18,
				class: "heading-icon"
			}, null, _parent));
			_push(` Why I&#39;m worth a conversation </h2><div class="conversation-grid" data-v-fb19da1d><!--[-->`);
			ssrRenderList(conversationPoints, (point) => {
				_push(`<div class="conv-card glass-panel" data-v-fb19da1d><div class="conv-metric text-gradient" data-v-fb19da1d>${ssrInterpolate(point.metric)}</div><h3 class="conv-label" data-v-fb19da1d>${ssrInterpolate(point.label)}</h3><p class="conv-desc" data-v-fb19da1d>${ssrInterpolate(point.description)}</p></div>`);
			});
			_push(`<!--]--></div></section><section class="ai-section" data-v-fb19da1d><div class="section-heading-row" data-v-fb19da1d><h2 class="section-heading" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(Sparkles), {
				size: 18,
				class: "heading-icon accent-icon"
			}, null, _parent));
			_push(` AI Engineering — production systems, not demos </h2></div><p class="section-subtext" data-v-fb19da1d> I build LLM features that survive real users — grounded in retrieval, guarded against failure, and shipped inside products people already use. </p><div class="ai-grid" data-v-fb19da1d><!--[-->`);
			ssrRenderList(aiEngineeringPillars, (pillar) => {
				_push(`<div class="ai-card glass-panel" data-v-fb19da1d><div class="ai-header" data-v-fb19da1d>`);
				ssrRenderVNode(_push, createVNode(resolveDynamicComponent(pillar.icon), {
					size: 20,
					class: "ai-icon"
				}, null), _parent);
				_push(`<h3 class="ai-title" data-v-fb19da1d>${ssrInterpolate(pillar.title)}</h3></div><p class="ai-desc" data-v-fb19da1d>${ssrInterpolate(pillar.description)}</p></div>`);
			});
			_push(`<!--]--></div><div class="ai-cta-row" style="${ssrRenderStyle({
				"margin-top": "1.5rem",
				"text-align": "center"
			})}" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/case-studies/zoeticoach-ai-whatsapp-accountability-engine",
				class: "btn-secondary",
				style: {
					"display": "inline-flex",
					"align-items": "center",
					"gap": "0.5rem",
					"min-height": "44px",
					"padding": "0.6rem 1.25rem"
				}
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(FileText), { size: 16 }, null, _parent, _scopeId));
						_push(`<span data-v-fb19da1d${_scopeId}>Read Flagship Case Study: ZoetiCoach AI (RAG, Approval Queue &amp; Audit Trail)</span>`);
						_push(ssrRenderComponent(unref(ArrowUpRight), { size: 14 }, null, _parent, _scopeId));
					} else return [
						createVNode(unref(FileText), { size: 16 }),
						createVNode("span", null, "Read Flagship Case Study: ZoetiCoach AI (RAG, Approval Queue & Audit Trail)"),
						createVNode(unref(ArrowUpRight), { size: 14 })
					];
				}),
				_: 1
			}, _parent));
			_push(`</div></section><section class="how-i-work-section" data-v-fb19da1d><h2 class="section-heading" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(Shield), {
				size: 18,
				class: "heading-icon"
			}, null, _parent));
			_push(` How I work </h2><div class="how-grid" data-v-fb19da1d><!--[-->`);
			ssrRenderList(howIWork, (item) => {
				_push(`<div class="how-card glass-panel" data-v-fb19da1d><div class="how-header" data-v-fb19da1d>`);
				ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), {
					size: 20,
					class: "how-icon"
				}, null), _parent);
				_push(`<h3 class="how-title" data-v-fb19da1d>${ssrInterpolate(item.title)}</h3></div><p class="how-desc" data-v-fb19da1d>${ssrInterpolate(item.subtitle)}</p></div>`);
			});
			_push(`<!--]--></div></section><section class="stack-section" data-v-fb19da1d><h2 class="section-heading" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(Code2), {
				size: 18,
				class: "heading-icon"
			}, null, _parent));
			_push(` Core stack </h2><div class="stack-card glass-panel" data-v-fb19da1d><div class="stack-item" data-v-fb19da1d><span class="stack-category" data-v-fb19da1d>AI Engineering &amp; LLMs</span><span class="stack-values" data-v-fb19da1d>${ssrInterpolate(coreStack.aiEngineering)}</span></div><div class="stack-item" data-v-fb19da1d><span class="stack-category" data-v-fb19da1d>Languages</span><span class="stack-values" data-v-fb19da1d>${ssrInterpolate(coreStack.languages)}</span></div><div class="stack-item" data-v-fb19da1d><span class="stack-category" data-v-fb19da1d>Frameworks</span><span class="stack-values" data-v-fb19da1d>${ssrInterpolate(coreStack.frameworks)}</span></div><div class="stack-item" data-v-fb19da1d><span class="stack-category" data-v-fb19da1d>Data</span><span class="stack-values" data-v-fb19da1d>${ssrInterpolate(coreStack.data)}</span></div><div class="stack-item" data-v-fb19da1d><span class="stack-category" data-v-fb19da1d>Cloud / DevOps</span><span class="stack-values" data-v-fb19da1d>${ssrInterpolate(coreStack.cloud)}</span></div><div class="stack-item" data-v-fb19da1d><span class="stack-category" data-v-fb19da1d>Practices</span><span class="stack-values" data-v-fb19da1d>${ssrInterpolate(coreStack.practices)}</span></div></div></section><section class="proof-section" data-v-fb19da1d><h2 class="section-heading" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(Sparkles), {
				size: 18,
				class: "heading-icon"
			}, null, _parent));
			_push(` Proof &amp; Systems in Production </h2><div class="proof-grid" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/case-studies",
				class: "proof-card glass-panel"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="proof-title" data-v-fb19da1d${_scopeId}>Read the case studies</span><span class="proof-arrow" data-v-fb19da1d${_scopeId}>→</span>`);
					else return [createVNode("span", { class: "proof-title" }, "Read the case studies"), createVNode("span", { class: "proof-arrow" }, "→")];
				}),
				_: 1
			}, _parent));
			_push(`<a href="/#work" class="proof-card glass-panel" data-v-fb19da1d><span class="proof-title" data-v-fb19da1d>Browse my work</span><span class="proof-arrow" data-v-fb19da1d>→</span></a><a${ssrRenderAttr("href", githubUrl)} target="_blank" rel="noopener noreferrer" class="proof-card glass-panel" data-v-fb19da1d><span class="proof-title" data-v-fb19da1d>GitHub</span><span class="proof-arrow" data-v-fb19da1d>↗</span></a><a${ssrRenderAttr("href", resumeUrl)} download="Ashish-Gupta-Resume.pdf" target="_blank" rel="noopener noreferrer" class="proof-card glass-panel proof-card--highlight" data-v-fb19da1d><span class="proof-title" data-v-fb19da1d>Download résumé (PDF)</span><span class="proof-arrow" data-v-fb19da1d>↓</span></a></div></section><section class="references-section" data-v-fb19da1d><div class="references-card glass-panel" data-v-fb19da1d><div class="references-header-row" data-v-fb19da1d><h2 class="references-title" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(Users), {
				size: 20,
				class: "heading-icon"
			}, null, _parent));
			_push(` References &amp; Verified Recommendations </h2><a${ssrRenderAttr("href", linkedinUrl)} target="_blank" rel="noopener noreferrer" class="ref-linkedin-btn glow-pill" data-v-fb19da1d><span data-v-fb19da1d>LinkedIn Recommendations</span>`);
			_push(ssrRenderComponent(unref(ArrowUpRight), { size: 13 }, null, _parent));
			_push(`</a></div><p class="references-body" data-v-fb19da1d> Full recommendations and endorsements available directly on <a${ssrRenderAttr("href", linkedinUrl)} target="_blank" rel="noopener noreferrer" class="inline-link" data-v-fb19da1d>LinkedIn (Ashish Gupta)</a> — alongside verified feedback from engineering leaders at Infosys, ZoetiCoach AI, and healthcare platforms. Happy to arrange direct reference calls upon request. </p></div></section><section class="close-section glass-panel" data-v-fb19da1d><div class="close-inner" data-v-fb19da1d><h2 class="close-title" data-v-fb19da1d>Let&#39;s talk about the role.</h2><p class="close-body" data-v-fb19da1d> The fastest way to reach me is email or LinkedIn — I reply within a business day. </p><div class="close-buttons" data-v-fb19da1d><a${ssrRenderAttr("href", emailHref)} class="btn-primary glow-pill" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(Mail), { size: 16 }, null, _parent));
			_push(`<span data-v-fb19da1d>Email ashishgupta1v@gmail.com</span>`);
			_push(ssrRenderComponent(unref(ArrowUpRight), { size: 14 }, null, _parent));
			_push(`</a><a${ssrRenderAttr("href", linkedinUrl)} target="_blank" rel="noopener noreferrer" class="btn-secondary" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(Globe), { size: 16 }, null, _parent));
			_push(`<span data-v-fb19da1d>LinkedIn</span>`);
			_push(ssrRenderComponent(unref(ArrowUpRight), { size: 14 }, null, _parent));
			_push(`</a><a${ssrRenderAttr("href", calendlyUrl)} target="_blank" rel="noopener noreferrer" class="btn-ghost" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(Calendar), { size: 16 }, null, _parent));
			_push(`<span data-v-fb19da1d>Book a call</span>`);
			_push(ssrRenderComponent(unref(ArrowUpRight), { size: 14 }, null, _parent));
			_push(`</a></div></div></section></main><footer class="hiring-footer" role="contentinfo" data-v-fb19da1d><div class="footer-inner" data-v-fb19da1d><span data-v-fb19da1d>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Ashish Gupta · Senior Full-Stack Architect</span><div class="footer-links" data-v-fb19da1d>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/",
				class: "footer-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Portfolio`);
					else return [createTextVNode("Portfolio")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(link_default), {
				href: "/case-studies",
				class: "footer-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Case Studies`);
					else return [createTextVNode("Case Studies")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(link_default), {
				href: "/privacy",
				class: "footer-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Privacy Policy`);
					else return [createTextVNode("Privacy Policy")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(link_default), {
				href: "/terms",
				class: "footer-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Terms`);
					else return [createTextVNode("Terms")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></footer></div><!--]-->`);
		};
	}
});
//#endregion
//#region resources/js/Pages/Hiring/Index.vue
var _sfc_setup = Index_vue_vue_type_script_setup_true_lang_default.setup;
Index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Hiring/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Index_default = /* @__PURE__ */ _plugin_vue_export_helper_default(Index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-fb19da1d"]]);
//#endregion
export { Index_default as default };
