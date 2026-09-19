import { i as link_default } from "./vendor-inertia-Bgi69XOP.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { computed, createVNode, defineComponent, mergeProps, nextTick, onBeforeUnmount, onMounted, ref, unref, useSSRContext, watch, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderTeleport } from "vue/server-renderer";
import gsap from "gsap";
import { ScrollTrigger as ScrollTrigger$1 } from "gsap/ScrollTrigger";
import { ArrowUpRight, BookOpen, Eye, MessageCircle, Sparkles, X } from "lucide-vue-next";
//#region resources/js/Data/projects.ts
var SHOWCASE_PROJECTS = [
	{
		slug: "zoeticoach-ai",
		name: "ZoetiCoach AI",
		title: "ZoetiCoach AI",
		type: "Live Production SaaS",
		category: "Production AI / RAG",
		positioning: "WhatsApp-First Accountability Engine with Human-in-the-Loop RAG",
		metrics: [
			"Sub-Second pgvector RAG",
			"Approval Queue Oversight",
			"Zero Injection Breaches"
		],
		image: "/images/portfolio/zoeticoach.jpg",
		imageUrl: "/images/portfolio/zoeticoach.jpg",
		description: "Production RAG on WhatsApp — human-in-the-loop approval + full AI audit trail with pgvector HNSW cosine search.",
		tech: [
			"Laravel 13",
			"pgvector (HNSW 1536d)",
			"OpenAI RAG",
			"Human-in-the-Loop",
			"Prompt Defense",
			"WhatsApp Cloud API"
		],
		tools: [
			"Laravel 13",
			"pgvector (HNSW 1536d)",
			"OpenAI RAG",
			"Human-in-the-Loop",
			"Prompt Defense",
			"WhatsApp Cloud API"
		],
		solution: "Production pgvector RAG pipeline + multi-tier prompt injection defense + asynchronous coach approval queue.",
		impact: "65% 30-day cohort retention lift, 99.8% bot uptime, ~$0.018/client/day token spend.",
		liveUrl: "https://zoeticoach.com/",
		externalUrl: "https://zoeticoach.com/",
		caseStudySlug: "zoeticoach-ai-whatsapp-accountability-engine",
		isMobile: false,
		problem: "Coaches lose up to 70% of clients between sessions due to accountability drop-off, while naive chatbots hallucinate advice and expose systems to prompt injection.",
		challenge: "Architecting an enterprise-grade RAG pipeline directly on WhatsApp with sub-second retrieval, zero prompt injection vulnerabilities, and human coach oversight.",
		architectureActions: [
			"Engineered pgvector HNSW cosine similarity search over 1,536-dimensional embeddings with <780ms median retrieval latency.",
			"Implemented multi-tier prompt-injection defense with XML <client_message> envelope isolation and control token stripping.",
			"Built an asynchronous Human-in-the-Loop Approval Queue enabling coaches to review, edit, or 1-click approve AI responses.",
			"Architected an immutable Trust & Audit Log capturing full trace metadata, similarity scores, token counts, and micro-dollar costs."
		],
		businessImpact: [
			"Achieved a 65% lift in 30-day cohort retention vs manual WhatsApp follow-ups.",
			"Zero prompt-injection breaches across 14,200+ automated evaluation traces.",
			"Scaled coach capacity 4.2x from 20–25 clients to 85–120 active clients."
		]
	},
	{
		slug: "habuilt",
		name: "Habuilt",
		title: "Habuilt",
		type: "Live Web App",
		category: "SaaS & FinTech",
		positioning: "High-Scale Habit & Wellness SaaS",
		metrics: [
			"50 Habits",
			"4 Tiers",
			"99.99% Uptime"
		],
		image: "/images/portfolio/habuilt.jpg",
		imageUrl: "/images/portfolio/habuilt.jpg",
		description: "Progressive atomic habit tracker with 50 habits, 4 tiers, streaks, and mobile deep-link auth.",
		tech: [
			"Next.js / Vue 3",
			"TypeScript",
			"Tailwind",
			"Redis Caching",
			"Mobile Deep Linking"
		],
		tools: [
			"Next.js / Vue 3",
			"TypeScript",
			"Tailwind",
			"Redis Caching",
			"Mobile Deep Linking"
		],
		solution: "4-tier unlock timeline over 26 weeks with sub-50ms XP calculation and carry-forward balances.",
		impact: "1% daily-compounding discipline engine used by thousands of active habit builders.",
		liveUrl: "https://www.habuilt.com/",
		externalUrl: "https://www.habuilt.com/",
		caseStudySlug: null,
		isMobile: false,
		problem: "Building lasting daily habits requires continuous positive reinforcement without complex friction or mobile disconnect.",
		challenge: "Supporting high-frequency daily habit check-ins and streaks across 26-week progression tiers with instant mobile app handoff.",
		architectureActions: [
			"Engineered a 4-tier progressive unlock timeline (Foundation, Build, Refine, Mastery) across 26 weeks.",
			"Implemented sub-50ms streak & XP leveling computations with carry-forward point balances.",
			"Integrated universal mobile deep linking (habuilt://auth/callback) for instant mobile session handover."
		],
		businessImpact: [
			"1% daily compounding discipline engine adopted by thousands of active habit builders.",
			"Zero-latency habit completion sync and interactive weekly completion heatmaps.",
			"99.99% uptime with high-concurrency atomic data persistence."
		]
	},
	{
		slug: "dhanda-diary",
		name: "Dhanda Diary",
		title: "Dhanda Diary",
		type: "Live Web App",
		category: "SaaS & FinTech",
		positioning: "Execution Cockpit & Business Ledger SaaS",
		metrics: ["Daily Compliance Engine", "Sub-50ms Sync"],
		image: "/images/portfolio/dhandadiary.jpg",
		imageUrl: "/images/portfolio/dhandadiary.jpg",
		description: "Execution cockpit & daily compliance SaaS (DCR, Kanban, ApexCharts KPIs, streak multipliers).",
		tech: [
			"Laravel 13",
			"Vue 3",
			"Inertia",
			"ApexCharts",
			"VAPID Web Push",
			"Google OAuth"
		],
		tools: [
			"Laravel 13",
			"Vue 3",
			"Inertia",
			"ApexCharts",
			"VAPID Web Push",
			"Google OAuth"
		],
		solution: "DCR + Weekly Review pipelines with automated streaks and real-time ApexCharts telemetry.",
		impact: "100% daily execution accountability and 85% increase in daily routine completion via Web Push.",
		liveUrl: "https://dhandadiary.cloud/",
		externalUrl: "https://dhandadiary.cloud/",
		caseStudySlug: "dhanda-diary-business-execution-operating-system",
		isMobile: false,
		problem: "Founders and enterprise teams lack a centralized execution cockpit to monitor daily compliance, habit discipline, and business KPIs in one place.",
		challenge: "Needed sub-50ms reactive state sync, real-time Kanban task reordering, Web Push reminders, and multi-tenant ledger isolation.",
		architectureActions: [
			"Architected Daily Compliance Report (DCR) and Weekly Strategic Review pipelines with automated streak calculations.",
			"Integrated interactive ApexCharts visual metric telemetry for revenue trends and operational KPIs.",
			"Built drag-and-drop Kanban workflow boards with optimistic UI updates and background sync."
		],
		businessImpact: [
			"100% daily task execution accountability for business executives and remote teams.",
			"Automated morning and evening Web Push reminders increasing daily routine completion by 85%.",
			"Seamless Google OAuth authentication and instant zero-latency multi-device sync."
		]
	},
	{
		slug: "guttalks",
		name: "GutTalks",
		title: "GutTalks",
		type: "Live Web App",
		category: "Health & Telehealth",
		positioning: "Gut Health & Telehealth Consultation Portal",
		metrics: [
			"10k+ Clients",
			"4.8★",
			"₹499 Root Rx"
		],
		image: "/images/portfolio/guttalks.jpg",
		imageUrl: "/images/portfolio/guttalks.jpg",
		description: "Evidence-based gut-health telehealth connecting patients to doctors via Root Rx consults and GutMap testing.",
		tech: [
			"Next.js",
			"React",
			"Tailwind",
			"Razorpay",
			"Microbiome API",
			"Doctor Telehealth"
		],
		tools: [
			"Next.js",
			"React",
			"Tailwind",
			"Razorpay",
			"Microbiome API",
			"Doctor Telehealth"
		],
		solution: "Instant ₹499 Root Rx booking widget with live availability slots and at-home test kit tracking.",
		impact: "10,000+ happy clients treated with 4.8-star verified Google rating and 3.2x conversion lift.",
		liveUrl: "https://guttalks.in/",
		externalUrl: "https://guttalks.in/",
		caseStudySlug: null,
		isMobile: false,
		problem: "Patients with chronic bloating, IBS, and digestive fatigue face fragmented advice and high consultation barriers.",
		challenge: "Needed a high-converting doctor booking engine with instant slot availability, GutMap kit ordering, and seamless telehealth consultations.",
		architectureActions: [
			"Built an instant Root Rx booking widget (₹499) with real-time doctor availability slot selection.",
			"Engineered GutMap Complete™ at-home testing kit portal with laboratory sequencing sample tracking.",
			"Integrated Razorpay payment gateway and automated WhatsApp consultation reminders."
		],
		businessImpact: [
			"Over 10,000+ happy clients treated with 4.8-star verified Google rating.",
			"3.2x increase in consultation conversion rate compared to standard static medical forms.",
			"Full doctor-approved lifestyle roadmap delivered within 30 days of initial consultation."
		]
	},
	{
		slug: "myastrova",
		name: "MyAstrova",
		title: "MyAstrova",
		type: "Live Web App",
		category: "Consumer & AstroTech",
		positioning: "Vedic AstroTech & Spiritual E-Commerce",
		metrics: ["<200ms Kundli Engine", "Live Calls & Chat"],
		image: "/images/portfolio/myastrova.jpg",
		imageUrl: "/images/portfolio/myastrova.jpg",
		description: "Vedic astrology consultation platform offering instant call/chat with astrologers and energized gemstone mall.",
		tech: [
			"Next.js",
			"React",
			"Tailwind",
			"Razorpay",
			"WhatsApp API",
			"Vedic Math Engine"
		],
		tools: [
			"Next.js",
			"React",
			"Tailwind",
			"Razorpay",
			"WhatsApp API",
			"Vedic Math Engine"
		],
		solution: "Mathematical Kundli and horoscope calculation engine rendering dynamic planetary charts in <200ms.",
		impact: "Instant charts, 100% astronomical precision, and 99.9% booking and checkout reliability.",
		liveUrl: "https://myastrova.com/",
		externalUrl: "https://myastrova.com/",
		caseStudySlug: "myastrova-astrology-consultation-commerce-platform",
		isMobile: false,
		problem: "Traditional astrology portals suffer from slow chart rendering, confusing interfaces, and unverified remedy purchases.",
		challenge: "Calculating planetary positions with ephemeris accuracy in sub-200ms while routing live chat/call consultation requests to available astrologers.",
		architectureActions: [
			"Engineered a mathematical Kundli Matching and Horoscope calculation engine rendering dynamic charts in <200ms.",
			"Built real-time astrologer routing for instant chats, phone calls, and video consultations.",
			"Created MyAstrova Mall e-commerce catalog for energized crystals, rudraksha, and customized remedies with Razorpay checkout."
		],
		businessImpact: [
			"Instantaneous chart generation with 100% mathematical precision.",
			"99.9% booking and checkout reliability across high consumer traffic.",
			"Built a trusted spiritual brand with direct WhatsApp concierge support."
		]
	},
	{
		slug: "krishan-balram-gaushala",
		name: "Krishan Balram Gaushala",
		title: "Krishan Balram Gaushala",
		type: "Live Web App",
		category: "Trust & NGO",
		positioning: "Devotee Engagement & Cow Shelter Philanthropy",
		metrics: ["Meta WhatsApp API", "Automated 80G Receipts"],
		image: "/images/portfolio/gaushala.jpg",
		imageUrl: "/images/portfolio/gaushala.jpg",
		description: "GauSeva Connect — devotee registration portal, automated birthday/anniversary WhatsApp blessings, and 80G receipts.",
		tech: [
			"Laravel 13",
			"Vue 3",
			"Inertia",
			"Meta WhatsApp Cloud API",
			"PWA Offline",
			"SQLite WAL"
		],
		tools: [
			"Laravel 13",
			"Vue 3",
			"Inertia",
			"Meta WhatsApp Cloud API",
			"PWA Offline",
			"SQLite WAL"
		],
		solution: "WhatsApp Cloud API webhooks auto-dispatch daily blessings with client-side canvas image compression.",
		impact: "100% automated birthday/anniversary blessings to thousands and instant automated 80G PDF receipts.",
		liveUrl: "https://krishanbalramgaushala.com/",
		externalUrl: "https://krishanbalramgaushala.com/",
		caseStudySlug: "krishan-balram-gaushala-devotee-engagement-platform",
		isMobile: false,
		problem: "The shelter handled thousands of devotee records and seva donations manually, causing delayed tax receipts and missed community touchpoints.",
		challenge: "Automating daily WhatsApp blessings, Facebook auto-posting, and instant 80G PDF receipts on a high-concurrency, lightweight server.",
		architectureActions: [
			"Integrated Meta WhatsApp Cloud API webhooks to automatically dispatch personalized birthday and anniversary blessings daily.",
			"Architected an automated 80G tax exemption PDF generator and donor contribution ledger.",
			"Optimized mobile performance via client-side canvas compression and SQLite Write-Ahead Logging."
		],
		businessImpact: [
			"100% automated birthday and anniversary blessing dispatch via official WhatsApp API.",
			"Instant 80G tax receipt PDF generation and donor ledger tracking.",
			"Zero-latency mobile uploads via client-side image compression."
		]
	},
	{
		slug: "sports-entertainment-club",
		name: "SportsEntertainmentClub",
		title: "SportsEntertainmentClub",
		type: "Mobile App (iOS/Android)",
		category: "Mobile Apps",
		positioning: "Facility & Court Booking App",
		metrics: ["0 Booking Collisions", "60 FPS Fluid UI"],
		image: "/images/portfolio/sportsclub.jpg",
		imageUrl: "/images/portfolio/sportsclub.jpg",
		description: "Sports facility reservations, court slot locking, digital QR passes, and live member leaderboards.",
		tech: [
			"Flutter / React Native",
			"Real-Time Slot Locks",
			"Push Notifications",
			"QR Access Control"
		],
		tools: [
			"Flutter / React Native",
			"Real-Time Slot Locks",
			"Push Notifications",
			"QR Access Control"
		],
		solution: "Cross-platform 60 FPS mobile app with sub-second real-time court availability and optimistic slot locking.",
		impact: "Zero court booking collisions across 12 facilities and 3x faster reception check-in via QR passes.",
		liveUrl: null,
		externalUrl: null,
		caseStudySlug: null,
		isMobile: true,
		problem: "Club members faced constant double-bookings, manual telephone reservations, and long queues at the sports complex reception.",
		challenge: "Preventing race-condition booking collisions across badminton, tennis, and squash courts during peak evening hours.",
		architectureActions: [
			"Built real-time slot reservation system with optimistic locking and 5-minute checkout countdowns.",
			"Implemented instant QR pass generation for automated turnstile and reception check-in.",
			"Integrated push notification alerts for court availability, tournament updates, and coaching schedules."
		],
		businessImpact: [
			"Zero double-booking collisions since launch across all 12 courts.",
			"92% of members transitioned to mobile booking within the first 30 days.",
			"3x faster check-in speed at club reception with digital QR passes."
		]
	},
	{
		slug: "garg-enterprises",
		name: "Garg Enterprises",
		title: "Garg Enterprises",
		type: "Mobile App (iOS/Android)",
		category: "Mobile Apps",
		positioning: "B2B Wholesale Ordering & Ledger App",
		metrics: [
			"0% Order Errors",
			"10k+ SKUs",
			"Offline Sync"
		],
		image: "/images/portfolio/gargenterprises.jpg",
		imageUrl: "/images/portfolio/gargenterprises.jpg",
		description: "B2B wholesale ordering app with offline drafting, dealer credit ledger reconciliation, 1-tap GST invoice downloads, and 10k+ SKUs.",
		tech: [
			"Android Native / Kotlin",
			"Offline SQLite Sync",
			"GST Invoice PDF",
			"Tiered B2B Pricing"
		],
		tools: [
			"Android Native / Kotlin",
			"Offline SQLite Sync",
			"GST Invoice PDF",
			"Tiered B2B Pricing"
		],
		solution: "Rugged Android enterprise app with offline SQLite order drafting and automatic background sync.",
		impact: "Order entry errors reduced from 14% to 0% and accelerated dealer reorder cycle 3x.",
		liveUrl: null,
		externalUrl: null,
		caseStudySlug: null,
		isMobile: true,
		problem: "Wholesale dealers placed orders over handwritten notes and phone calls, causing order errors, inventory mismatches, and ledger disputes.",
		challenge: "Ensuring fast order placement in low-connectivity warehouse environments with dealer-specific tiered pricing and credit limits.",
		architectureActions: [
			"Engineered rugged Android enterprise app with offline SQLite order drafting and automatic background sync.",
			"Built real-time dealer ledger displaying live balance, credit limit, and 1-tap GST invoice downloads.",
			"Implemented tiered volume discount matrix and automated warehouse dispatch alerts."
		],
		businessImpact: [
			"Reduced manual order entry errors from 14% to 0%.",
			"3x faster dealer reorder cycle with single-tap repeat order functionality.",
			"100% transparency on outstanding dealer ledger balances and credit terms."
		]
	},
	{
		slug: "ashishgupta-hub",
		name: "Ashish Gupta Hub",
		title: "Ashish Gupta Hub",
		type: "Live Web App",
		category: "Engineering",
		positioning: "Engineering Architecture Showcase",
		metrics: [
			"VILT Stack",
			"10+ Yrs IT",
			"$1M Cloud Savings"
		],
		image: "/images/portfolio/ashishgupta.jpg",
		imageUrl: "/images/portfolio/ashishgupta.jpg",
		description: "Engineering hub showcasing legacy modernization, live telemetry, and high-performance VILT architecture.",
		tech: [
			"Laravel 13",
			"Vue 3",
			"Inertia",
			"Tailwind",
			"PWA Offline",
			"Filament CMS"
		],
		tools: [
			"Laravel 13",
			"Vue 3",
			"Inertia",
			"Tailwind",
			"PWA Offline",
			"Filament CMS"
		],
		solution: "High-speed VILT platform on DDD with automated security headers, sub-50ms routing, and live telemetry.",
		impact: "Documented $1M/yr cloud infrastructure savings across enterprise modernization projects.",
		liveUrl: "https://ashishgupta.dev",
		externalUrl: "https://ashishgupta.dev",
		caseStudySlug: null,
		isMobile: false,
		problem: "Enterprise systems suffer from monolithic technical debt, sluggish client rendering, and inflated hosting bills.",
		challenge: "Demonstrating end-to-end full-stack mastery with production observability, sub-second load times, and accessible interfaces.",
		architectureActions: [
			"Architected high-speed Laravel 13 + Inertia + Vue 3 application with domain-driven design principles.",
			"Integrated client-side telemetry, custom canvas simulations, and zero-compromise security headers.",
			"Configured hardened edge caching and asset optimization pipelines for instant global loading."
		],
		businessImpact: [
			"Targeting 95+ Core Web Vitals with optimized edge SSR and sub-second first contentful paint.",
			"Demonstrated architectural leadership across 10+ enterprise case studies and open-source contributions.",
			"Built-in AI assistant for instant recruiter and client pre-qualification."
		]
	}
];
//#endregion
//#region resources/js/Components/Work/ProjectCard.vue?vue&type=script&setup=true&lang.ts
var ProjectCard_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ProjectCard",
	__ssrInlineRender: true,
	props: { project: {} },
	emits: ["quick-view"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const imgFailed = ref(false);
		const projectTitle = computed(() => {
			return props.project.name || props.project.title || "Project";
		});
		const isMobile = computed(() => {
			return Boolean(props.project.isMobile || props.project.type && props.project.type.includes("Mobile"));
		});
		const projectType = computed(() => {
			if (props.project.type) return props.project.type;
			return isMobile.value ? "Mobile App (iOS/Android)" : "Live Web App";
		});
		const showImage = computed(() => {
			return !!(props.project.image || props.project.imageUrl) && !imgFailed.value;
		});
		const imageSrc = computed(() => {
			return props.project.image || props.project.imageUrl || "";
		});
		const monogram = computed(() => {
			const words = projectTitle.value.trim().split(/\s+/);
			if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
			return (words[0][0] + (words[1] ? words[1][0] : "")).toUpperCase();
		});
		const metricDisplay = computed(() => {
			if (props.project.metrics && Array.isArray(props.project.metrics) && props.project.metrics.length > 0) return props.project.metrics.join(" · ");
			if (props.project.metricBadge) return props.project.metricBadge;
			return "";
		});
		const techList = computed(() => {
			const list = props.project.tech || props.project.tools || [];
			return Array.isArray(list) ? list.slice(0, 5) : [];
		});
		const caseStudyUrl = computed(() => {
			if (props.project.caseStudySlug) return `/case-studies/${props.project.caseStudySlug}`;
			return null;
		});
		const liveUrl = computed(() => {
			return props.project.liveUrl || props.project.externalUrl || null;
		});
		const cardRef = ref(null);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<article${ssrRenderAttrs(mergeProps({
				ref_key: "cardRef",
				ref: cardRef,
				class: "work-card glass-panel"
			}, _attrs))} data-v-5d375d85><div class="card-spotlight" aria-hidden="true" data-v-5d375d85></div><div class="card-badges" data-v-5d375d85><span class="${ssrRenderClass([{ "badge-type--mobile glow-pill-violet": isMobile.value }, "badge-type glow-pill"])}" data-v-5d375d85><span class="pulse-dot" data-v-5d375d85></span> ${ssrInterpolate(projectType.value)}</span>`);
			if (__props.project.category) _push(`<span class="badge-category" data-v-5d375d85>${ssrInterpolate(__props.project.category)}</span>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (__props.project.positioning) _push(`<p class="card-positioning" data-v-5d375d85>${ssrInterpolate(__props.project.positioning)}</p>`);
			else _push(`<!---->`);
			_push(`<h3 class="card-title" data-v-5d375d85>${ssrInterpolate(projectTitle.value)}</h3>`);
			if (metricDisplay.value) _push(`<div class="card-metric-strip glow-pill" data-v-5d375d85><span class="metric-spark" data-v-5d375d85>⚡</span><span data-v-5d375d85>${ssrInterpolate(metricDisplay.value)}</span></div>`);
			else _push(`<!---->`);
			_push(`<div class="preview-container" data-v-5d375d85><button type="button" class="preview-trigger"${ssrRenderAttr("aria-label", `Open a quick preview of ${projectTitle.value}`)} data-v-5d375d85>`);
			if (showImage.value) _push(`<img${ssrRenderAttr("src", imageSrc.value)}${ssrRenderAttr("alt", `${projectTitle.value} live interface preview`)} class="preview-image" loading="lazy" decoding="async" data-v-5d375d85>`);
			else {
				_push(`<div class="preview-placeholder" aria-hidden="true" data-v-5d375d85><div class="placeholder-glow" data-v-5d375d85></div><div class="placeholder-monogram" data-v-5d375d85>${ssrInterpolate(monogram.value)}</div><div class="placeholder-footer" data-v-5d375d85>`);
				_push(ssrRenderComponent(unref(Sparkles), { size: 12 }, null, _parent));
				_push(`<span data-v-5d375d85>${ssrInterpolate(projectTitle.value)}</span></div></div>`);
			}
			_push(`<div class="preview-overlay" data-v-5d375d85><span class="overlay-badge" data-v-5d375d85>${ssrInterpolate(showImage.value ? "Live UI Snapshot" : "Architecture Preview")}</span><span class="overlay-cta" data-v-5d375d85>Click to Expand ↗</span></div></button></div><p class="card-description" data-v-5d375d85>${ssrInterpolate(__props.project.description)}</p>`);
			if (techList.value.length) {
				_push(`<div class="card-tech-chips" data-v-5d375d85><!--[-->`);
				ssrRenderList(techList.value, (tech) => {
					_push(`<span class="tech-chip" data-v-5d375d85>${ssrInterpolate(tech)}</span>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`<div class="card-outcomes" data-v-5d375d85>`);
			if (__props.project.solution) _push(`<div class="outcome-row outcome-row--solution" data-v-5d375d85><span class="outcome-label" data-v-5d375d85>Solution:</span><span class="outcome-text" data-v-5d375d85>${ssrInterpolate(__props.project.solution)}</span></div>`);
			else _push(`<!---->`);
			if (__props.project.impact) _push(`<div class="outcome-row outcome-row--impact" data-v-5d375d85><span class="outcome-label" data-v-5d375d85>Impact:</span><span class="outcome-text" data-v-5d375d85>${ssrInterpolate(__props.project.impact)}</span></div>`);
			else _push(`<!---->`);
			_push(`</div><div class="card-actions" data-v-5d375d85>`);
			if (liveUrl.value) {
				_push(`<a${ssrRenderAttr("href", liveUrl.value)} target="_blank" rel="noopener noreferrer" class="btn-action btn-action--primary" data-v-5d375d85><span data-v-5d375d85>Visit Live</span>`);
				_push(ssrRenderComponent(unref(ArrowUpRight), {
					size: 13,
					"aria-hidden": "true"
				}, null, _parent));
				_push(`</a>`);
			} else {
				_push(`<button type="button" class="btn-action btn-action--demo" data-v-5d375d85><span data-v-5d375d85>View Details</span>`);
				_push(ssrRenderComponent(unref(ArrowUpRight), {
					size: 13,
					"aria-hidden": "true"
				}, null, _parent));
				_push(`</button>`);
			}
			_push(`<button type="button" class="btn-action btn-action--quickview" data-v-5d375d85>`);
			_push(ssrRenderComponent(unref(Eye), {
				size: 13,
				"aria-hidden": "true"
			}, null, _parent));
			_push(`<span data-v-5d375d85>Quick View</span></button>`);
			if (caseStudyUrl.value) _push(ssrRenderComponent(unref(link_default), {
				href: caseStudyUrl.value,
				class: "btn-action btn-action--casestudy"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(BookOpen), {
							size: 13,
							"aria-hidden": "true"
						}, null, _parent, _scopeId));
						_push(`<span data-v-5d375d85${_scopeId}>Case Study</span>`);
					} else return [createVNode(unref(BookOpen), {
						size: 13,
						"aria-hidden": "true"
					}), createVNode("span", null, "Case Study")];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`</div></article>`);
		};
	}
});
//#endregion
//#region resources/js/Components/Work/ProjectCard.vue
var _sfc_setup$3 = ProjectCard_vue_vue_type_script_setup_true_lang_default.setup;
ProjectCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Work/ProjectCard.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var ProjectCard_default = /* @__PURE__ */ _plugin_vue_export_helper_default(ProjectCard_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-5d375d85"]]);
//#endregion
//#region resources/js/Components/Work/ProjectQuickViewModal.vue?vue&type=script&setup=true&lang.ts
var ProjectQuickViewModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ProjectQuickViewModal",
	__ssrInlineRender: true,
	props: { project: {} },
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const modalContainer = ref(null);
		const lastFocusedElement = ref(null);
		const imgFailed = ref(false);
		const projectTitle = computed(() => {
			if (!props.project) return "Project Preview";
			return props.project.name || props.project.title || "Project";
		});
		const isMobile = computed(() => {
			if (!props.project) return false;
			return Boolean(props.project.isMobile || props.project.type && props.project.type.includes("Mobile"));
		});
		const projectType = computed(() => {
			if (!props.project) return "Live Web App";
			if (props.project.type) return props.project.type;
			return isMobile.value ? "Mobile App (iOS/Android)" : "Live Web App";
		});
		const metricDisplay = computed(() => {
			if (!props.project) return "";
			if (props.project.metrics && Array.isArray(props.project.metrics) && props.project.metrics.length > 0) return props.project.metrics.join(" · ");
			if (props.project.metricBadge) return props.project.metricBadge;
			return "";
		});
		const imageSrc = computed(() => {
			if (!props.project) return "";
			return props.project.image || props.project.imageUrl || "";
		});
		const techList = computed(() => {
			if (!props.project) return [];
			const list = props.project.tech || props.project.tools || [];
			return Array.isArray(list) ? list : [];
		});
		const liveUrl = computed(() => {
			if (!props.project) return null;
			return props.project.liveUrl || props.project.externalUrl || null;
		});
		function handleKeyDown(e) {
			if (!props.project) return;
			if (e.key === "Escape") {
				e.preventDefault();
				emit("close");
				return;
			}
			if (e.key === "Tab" && modalContainer.value) {
				const focusableElements = modalContainer.value.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])");
				if (focusableElements.length === 0) return;
				const firstElement = focusableElements[0];
				const lastElement = focusableElements[focusableElements.length - 1];
				if (e.shiftKey) {
					if (document.activeElement === firstElement || document.activeElement === modalContainer.value) {
						e.preventDefault();
						lastElement.focus();
					}
				} else if (document.activeElement === lastElement) {
					e.preventDefault();
					firstElement.focus();
				}
			}
		}
		watch(() => props.project, (newVal) => {
			imgFailed.value = false;
			if (newVal) {
				lastFocusedElement.value = document.activeElement;
				document.body.style.overflow = "hidden";
				nextTick(() => {
					modalContainer.value?.focus();
				});
			} else {
				document.body.style.overflow = "";
				if (lastFocusedElement.value) lastFocusedElement.value.focus();
			}
		});
		onMounted(() => {
			window.addEventListener("keydown", handleKeyDown);
		});
		onBeforeUnmount(() => {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		});
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderTeleport(_push, (_push) => {
				if (__props.project) {
					_push(`<div role="dialog" aria-modal="true" aria-labelledby="modal-project-title" class="modal-backdrop" data-v-d8065783><div tabindex="-1" class="modal-card" data-v-d8065783><button type="button" class="modal-close-btn" aria-label="Close project preview modal" data-v-d8065783>`);
					_push(ssrRenderComponent(unref(X), {
						size: 20,
						"aria-hidden": "true"
					}, null, _parent));
					_push(`</button><div class="modal-header" data-v-d8065783><div class="modal-badge-row" data-v-d8065783><span class="${ssrRenderClass([{ "badge-type--mobile": isMobile.value }, "badge-type"])}" data-v-d8065783><span class="pulse-dot" data-v-d8065783></span> ${ssrInterpolate(projectType.value)}</span>`);
					if (__props.project.category) _push(`<span class="badge-category" data-v-d8065783>${ssrInterpolate(__props.project.category)}</span>`);
					else _push(`<!---->`);
					if (metricDisplay.value) _push(`<span class="badge-metric" data-v-d8065783> ⚡ ${ssrInterpolate(metricDisplay.value)}</span>`);
					else _push(`<!---->`);
					_push(`</div><h2 id="modal-project-title" class="modal-title" data-v-d8065783>${ssrInterpolate(projectTitle.value)}</h2>`);
					if (__props.project.positioning) _push(`<p class="modal-positioning" data-v-d8065783>${ssrInterpolate(__props.project.positioning)}</p>`);
					else _push(`<!---->`);
					_push(`<p class="modal-description" data-v-d8065783>${ssrInterpolate(__props.project.description)}</p></div><div class="modal-image-wrapper" data-v-d8065783>`);
					if (imageSrc.value && !imgFailed.value) _push(`<img${ssrRenderAttr("src", imageSrc.value)}${ssrRenderAttr("alt", `${projectTitle.value} production interface preview`)} class="modal-image" loading="lazy" data-v-d8065783>`);
					else {
						_push(`<div class="modal-placeholder" aria-hidden="true" data-v-d8065783>`);
						_push(ssrRenderComponent(unref(Sparkles), {
							size: 28,
							class: "placeholder-icon"
						}, null, _parent));
						_push(`<span class="placeholder-text" data-v-d8065783>${ssrInterpolate(projectTitle.value)}</span></div>`);
					}
					_push(`<div class="modal-image-overlay" data-v-d8065783><span class="modal-image-badge" data-v-d8065783>Production Interface Snapshot</span></div></div>`);
					if (techList.value.length) {
						_push(`<div class="modal-tech-stack" data-v-d8065783><!--[-->`);
						ssrRenderList(techList.value, (tool) => {
							_push(`<span class="modal-tech-tag" data-v-d8065783>${ssrInterpolate(tool)}</span>`);
						});
						_push(`<!--]--></div>`);
					} else _push(`<!---->`);
					if (__props.project.problem || __props.project.challenge) {
						_push(`<div class="modal-problem-box" data-v-d8065783>`);
						if (__props.project.problem) _push(`<div class="modal-problem-row" data-v-d8065783><strong class="problem-label" data-v-d8065783>The Problem: </strong><span data-v-d8065783>${ssrInterpolate(__props.project.problem)}</span></div>`);
						else _push(`<!---->`);
						if (__props.project.challenge) _push(`<div class="modal-problem-row" data-v-d8065783><strong class="challenge-label" data-v-d8065783>The Engineering Challenge: </strong><span data-v-d8065783>${ssrInterpolate(__props.project.challenge)}</span></div>`);
						else _push(`<!---->`);
						_push(`</div>`);
					} else _push(`<!---->`);
					if (__props.project.architectureActions && __props.project.architectureActions.length > 0) {
						_push(`<div class="modal-section-block" data-v-d8065783><h3 class="modal-section-title" data-v-d8065783>Architectural Solutions &amp; Engineering</h3><ul class="modal-action-list" data-v-d8065783><!--[-->`);
						ssrRenderList(__props.project.architectureActions, (action, idx) => {
							_push(`<li class="modal-action-item" data-v-d8065783><span class="action-bullet" data-v-d8065783></span><span data-v-d8065783>${ssrInterpolate(action)}</span></li>`);
						});
						_push(`<!--]--></ul></div>`);
					} else _push(`<!---->`);
					if (__props.project.businessImpact && __props.project.businessImpact.length > 0) {
						_push(`<div class="modal-section-block" data-v-d8065783><h3 class="modal-section-title impact" data-v-d8065783>Measurable Business Impact</h3><ul class="modal-impact-list" data-v-d8065783><!--[-->`);
						ssrRenderList(__props.project.businessImpact, (impact, idx) => {
							_push(`<li class="modal-impact-item" data-v-d8065783><span class="impact-check" data-v-d8065783>✓</span><span data-v-d8065783>${ssrInterpolate(impact)}</span></li>`);
						});
						_push(`<!--]--></ul></div>`);
					} else _push(`<!---->`);
					_push(`<div class="modal-footer" data-v-d8065783>`);
					if (liveUrl.value) {
						_push(`<a${ssrRenderAttr("href", liveUrl.value)} target="_blank" rel="noopener noreferrer" class="btn-primary" data-v-d8065783><span data-v-d8065783>Visit Live App</span>`);
						_push(ssrRenderComponent(unref(ArrowUpRight), {
							size: 15,
							"aria-hidden": "true"
						}, null, _parent));
						_push(`</a>`);
					} else {
						_push(`<a href="#contact" class="btn-primary" data-v-d8065783><span data-v-d8065783>Request Demo</span>`);
						_push(ssrRenderComponent(unref(ArrowUpRight), {
							size: 15,
							"aria-hidden": "true"
						}, null, _parent));
						_push(`</a>`);
					}
					if (__props.project.caseStudySlug) _push(ssrRenderComponent(unref(link_default), {
						href: `/case-studies/${__props.project.caseStudySlug}`,
						class: "btn-secondary",
						onClick: ($event) => emit("close")
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(unref(BookOpen), {
									size: 15,
									"aria-hidden": "true"
								}, null, _parent, _scopeId));
								_push(`<span data-v-d8065783${_scopeId}>Read Full Case Study</span>`);
							} else return [createVNode(unref(BookOpen), {
								size: 15,
								"aria-hidden": "true"
							}), createVNode("span", null, "Read Full Case Study")];
						}),
						_: 1
					}, _parent));
					else _push(`<!---->`);
					_push(`<a${ssrRenderAttr("href", `https://wa.me/919915234506?text=${encodeURIComponent(`Hi Ashish, I saw your ${projectTitle.value} project on your portfolio and would like to discuss building something similar.`)}`)} target="_blank" rel="noopener noreferrer" class="btn-whatsapp" data-v-d8065783>`);
					_push(ssrRenderComponent(unref(MessageCircle), {
						size: 15,
						"aria-hidden": "true"
					}, null, _parent));
					_push(`<span data-v-d8065783>Discuss Architecture</span></a><button type="button" class="btn-outline" data-v-d8065783> Close Preview </button></div></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region resources/js/Components/Work/ProjectQuickViewModal.vue
var _sfc_setup$2 = ProjectQuickViewModal_vue_vue_type_script_setup_true_lang_default.setup;
ProjectQuickViewModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Work/ProjectQuickViewModal.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var ProjectQuickViewModal_default = /* @__PURE__ */ _plugin_vue_export_helper_default(ProjectQuickViewModal_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-d8065783"]]);
//#endregion
//#region resources/js/Components/Work/WorkSection.vue?vue&type=script&setup=true&lang.ts
var WorkSection_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "WorkSection",
	__ssrInlineRender: true,
	props: { projects: { default: () => SHOWCASE_PROJECTS } },
	setup(__props) {
		gsap.registerPlugin(ScrollTrigger$1);
		const props = __props;
		const allProjects = computed(() => {
			if (props.projects && props.projects.length > 0) return props.projects;
			return SHOWCASE_PROJECTS;
		});
		const sectionRef = ref(null);
		const activeCategory = ref("All");
		const quickViewProject = ref(null);
		const categories = computed(() => {
			const rawCategories = [...new Set(allProjects.value.map((p) => p.category))];
			return [{
				label: "All",
				count: allProjects.value.length
			}, ...rawCategories.map((cat) => ({
				label: cat,
				count: allProjects.value.filter((p) => p.category === cat).length
			}))];
		});
		const filteredProjects = computed(() => {
			if (activeCategory.value === "All") return allProjects.value;
			return allProjects.value.filter((p) => p.category === activeCategory.value);
		});
		function handleQuickView(project) {
			quickViewProject.value = project;
		}
		function handleCloseModal() {
			quickViewProject.value = null;
		}
		onMounted(() => {
			if (!sectionRef.value) return;
			setTimeout(() => {
				if (!sectionRef.value) return;
				const q = gsap.utils.selector(sectionRef.value);
				const headerEls = q(".section-header, .filter-fieldset");
				if (headerEls.length) gsap.from(headerEls, {
					scrollTrigger: {
						trigger: sectionRef.value,
						start: "top 92%",
						once: true
					},
					y: 24,
					opacity: 0,
					duration: .6,
					stagger: .08,
					ease: "power3.out",
					clearProps: "all"
				});
				const cards = q(".work-grid-item");
				if (cards.length) gsap.from(cards, {
					scrollTrigger: {
						trigger: sectionRef.value,
						start: "top 88%",
						once: true
					},
					y: 28,
					opacity: 0,
					duration: .6,
					stagger: .08,
					ease: "power3.out",
					clearProps: "all"
				});
			}, 100);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				ref_key: "sectionRef",
				ref: sectionRef,
				id: "work",
				class: "work-section"
			}, _attrs))} data-v-7bd2a089><div class="work-shell" data-v-7bd2a089><header class="section-header" data-v-7bd2a089><p class="section-eyebrow" data-v-7bd2a089>Delivered Work &amp; Case Studies</p><h2 class="section-title" data-v-7bd2a089><span data-v-7bd2a089>Production </span><span class="accent" data-v-7bd2a089>Applications</span></h2><p class="section-subtitle" data-v-7bd2a089> Explore live web platforms, cloud SaaS engines, and enterprise systems engineered with clean domain boundaries and zero technical debt. </p><div class="section-separator" aria-hidden="true" data-v-7bd2a089></div></header><fieldset class="filter-fieldset" data-v-7bd2a089><legend class="sr-only" data-v-7bd2a089>Filter projects by category</legend><div class="filter-pills" data-v-7bd2a089><!--[-->`);
			ssrRenderList(categories.value, (cat) => {
				_push(`<button type="button" class="${ssrRenderClass([{ "filter-pill--active": activeCategory.value === cat.label }, "filter-pill"])}"${ssrRenderAttr("aria-pressed", activeCategory.value === cat.label)} data-v-7bd2a089><span class="pill-label" data-v-7bd2a089>${ssrInterpolate(cat.label)}</span><span class="pill-count" data-v-7bd2a089>${ssrInterpolate(cat.count)}</span></button>`);
			});
			_push(`<!--]--></div></fieldset>`);
			if (filteredProjects.value.length > 0) {
				_push(`<div class="work-grid" data-v-7bd2a089><!--[-->`);
				ssrRenderList(filteredProjects.value, (project) => {
					_push(`<div class="work-grid-item" data-v-7bd2a089>`);
					_push(ssrRenderComponent(ProjectCard_default, {
						project,
						onQuickView: handleQuickView
					}, null, _parent));
					_push(`</div>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<div class="work-empty-state" data-v-7bd2a089><p data-v-7bd2a089>No projects found in this category.</p><button type="button" class="btn-reset-filter" data-v-7bd2a089> View All Projects </button></div>`);
			_push(`</div>`);
			_push(ssrRenderComponent(ProjectQuickViewModal_default, {
				project: quickViewProject.value,
				onClose: handleCloseModal
			}, null, _parent));
			_push(`</section>`);
		};
	}
});
//#endregion
//#region resources/js/Components/Work/WorkSection.vue
var _sfc_setup$1 = WorkSection_vue_vue_type_script_setup_true_lang_default.setup;
WorkSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Work/WorkSection.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var WorkSection_default = /* @__PURE__ */ _plugin_vue_export_helper_default(WorkSection_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-7bd2a089"]]);
//#endregion
//#region resources/js/Components/PortfolioV2/WorksSection.vue?vue&type=script&setup=true&lang.ts
var WorksSection_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "WorksSection",
	__ssrInlineRender: true,
	props: { projects: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(WorkSection_default, mergeProps({ projects: __props.projects }, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/WorksSection.vue
var _sfc_setup = WorksSection_vue_vue_type_script_setup_true_lang_default.setup;
WorksSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/WorksSection.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var WorksSection_default = WorksSection_vue_vue_type_script_setup_true_lang_default;
//#endregion
export { WorksSection_default as default };
