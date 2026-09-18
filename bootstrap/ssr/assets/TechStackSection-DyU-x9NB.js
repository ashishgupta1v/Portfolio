import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { defineComponent, mergeProps, onMounted, onUnmounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Components/PortfolioV2/TechStackSection.vue?vue&type=script&setup=true&lang.ts
var BUBBLE_SCALE = 1.1;
var TechStackSection_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "TechStackSection",
	__ssrInlineRender: true,
	props: { skills: {} },
	setup(__props) {
		const stackSkills = [
			{
				name: "Vue 3",
				hue: 160,
				size: 1.26
			},
			{
				name: "Laravel 13",
				hue: 8,
				size: 1.3
			},
			{
				name: "TypeScript",
				hue: 212,
				size: 1.26
			},
			{
				name: "RAG Systems",
				hue: 280,
				size: 1.28
			},
			{
				name: "pgvector",
				hue: 260,
				size: 1.22
			},
			{
				name: "OpenAI API",
				hue: 170,
				size: 1.2
			},
			{
				name: "Claude Code",
				hue: 36,
				size: 1.15
			},
			{
				name: "AI Agents",
				hue: 295,
				size: 1.14
			},
			{
				name: "Domain Driven Design",
				hue: 210,
				size: 1.2
			},
			{
				name: "PHP 8.4",
				hue: 240,
				size: 1.22
			},
			{
				name: "PostgreSQL",
				hue: 205,
				size: 1.3
			},
			{
				name: "Inertia.js",
				hue: 258,
				size: 1.24
			},
			{
				name: "Tailwind CSS",
				hue: 190,
				size: 1.15
			},
			{
				name: "Python",
				hue: 215,
				size: 1.1
			},
			{
				name: "Node.js",
				hue: 120,
				size: 1.08
			},
			{
				name: "MySQL",
				hue: 200,
				size: 1.04
			},
			{
				name: "Redis",
				hue: 0,
				size: 1.12
			},
			{
				name: "Docker",
				hue: 204,
				size: 1
			},
			{
				name: "AWS",
				hue: 38,
				size: .96
			},
			{
				name: "Vite",
				hue: 238,
				size: .92
			},
			{
				name: "SOLID",
				hue: 164,
				size: .89
			},
			{
				name: "Microservices",
				hue: 222,
				size: .96
			},
			{
				name: "RESTful APIs",
				hue: 2,
				size: .94
			},
			{
				name: "Nginx",
				hue: 134,
				size: .82
			},
			{
				name: "GitHub Actions",
				hue: 215,
				size: .85
			},
			{
				name: "Cursor",
				hue: 220,
				size: .8
			}
		];
		const sectionRef = ref(null);
		const bubbleFieldRef = ref(null);
		const bubbleRefs = [];
		const state = [];
		let rafId = null;
		let observer = null;
		let onScreen = false;
		const mouse = {
			x: 0,
			y: 0,
			active: false
		};
		function initCluster() {
			const field = bubbleFieldRef.value;
			if (!field) return;
			const w = field.clientWidth;
			const count = stackSkills.length;
			const neededH = w < 480 ? 400 : w < 768 ? 460 : 520;
			field.style.minHeight = `${neededH}px`;
			const centerX = w / 2;
			const centerY = neededH / 2;
			const responsiveScale = w < 480 ? .78 : w < 768 ? .9 : BUBBLE_SCALE;
			state.length = 0;
			for (let i = 0; i < count; i++) {
				const r = 32.8 * stackSkills[i].size * responsiveScale;
				const homeX = centerX + (Math.random() - .5) * 40;
				const homeY = centerY + (Math.random() - .5) * 40;
				state.push({
					x: homeX,
					y: homeY,
					vx: (Math.random() - .5) * 2,
					vy: (Math.random() - .5) * 2,
					homeX: centerX,
					homeY: centerY,
					r
				});
			}
		}
		function animate() {
			const field = bubbleFieldRef.value;
			if (!field) {
				rafId = requestAnimationFrame(animate);
				return;
			}
			const w = field.clientWidth;
			const h = field.clientHeight;
			for (let i = 0; i < state.length; i++) {
				const b = state[i];
				const centerX = w / 2;
				const centerY = h / 2;
				const pullStrength = mouse.active ? 5e-4 : .003;
				let ax = (centerX - b.x) * pullStrength;
				let ay = (centerY - b.y) * pullStrength;
				if (mouse.active) {
					const dx = b.x - mouse.x;
					const dy = b.y - mouse.y;
					const dist = Math.hypot(dx, dy) || .001;
					const range = 260;
					if (dist < range) {
						const t2 = 1 - dist / range;
						const force = t2 * t2 * 4.5;
						ax += dx / dist * force;
						ay += dy / dist * force;
					}
				}
				b.vx = (b.vx + ax) * .94;
				b.vy = (b.vy + ay) * .94;
				const spd = Math.hypot(b.vx, b.vy);
				if (spd > 5.8) {
					b.vx = b.vx / spd * 5.8;
					b.vy = b.vy / spd * 5.8;
				}
				b.x += b.vx;
				b.y += b.vy;
				if (b.x < b.r) {
					b.x = b.r;
					b.vx = Math.abs(b.vx) * .3;
				}
				if (b.x > w - b.r) {
					b.x = w - b.r;
					b.vx = -Math.abs(b.vx) * .3;
				}
				if (b.y < b.r) {
					b.y = b.r;
					b.vy = Math.abs(b.vy) * .3;
				}
				if (b.y > h - b.r) {
					b.y = h - b.r;
					b.vy = -Math.abs(b.vy) * .3;
				}
			}
			for (let i = 0; i < state.length; i++) for (let j = i + 1; j < state.length; j++) {
				const a = state[i];
				const b = state[j];
				const dx = b.x - a.x;
				const dy = b.y - a.y;
				const d = Math.hypot(dx, dy) || .001;
				const minD = a.r + b.r + 3;
				if (d < minD) {
					const push = (minD - d) * .45;
					const nx = dx / d;
					const ny = dy / d;
					a.x -= nx * push;
					a.y -= ny * push;
					b.x += nx * push;
					b.y += ny * push;
					a.vx *= .96;
					a.vy *= .96;
					b.vx *= .96;
					b.vy *= .96;
				}
			}
			for (let i = 0; i < state.length; i++) {
				const el = bubbleRefs[i];
				const b = state[i];
				if (!el || !b) continue;
				el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)`;
			}
			rafId = requestAnimationFrame(animate);
		}
		function onResize() {
			initCluster();
		}
		function startLoop() {
			if (rafId !== null) return;
			if (!onScreen || document.hidden) return;
			rafId = requestAnimationFrame(animate);
		}
		function stopLoop() {
			if (rafId === null) return;
			cancelAnimationFrame(rafId);
			rafId = null;
		}
		function onVisibilityChange() {
			if (document.hidden) stopLoop();
			else startLoop();
		}
		onMounted(() => {
			initCluster();
			observer = new IntersectionObserver(([entry]) => {
				onScreen = entry.isIntersecting;
				if (onScreen) startLoop();
				else stopLoop();
			}, { rootMargin: "200px 0px" });
			if (sectionRef.value) observer.observe(sectionRef.value);
			document.addEventListener("visibilitychange", onVisibilityChange);
			window.addEventListener("resize", onResize);
		});
		onUnmounted(() => {
			stopLoop();
			observer?.disconnect();
			observer = null;
			document.removeEventListener("visibilitychange", onVisibilityChange);
			window.removeEventListener("resize", onResize);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				ref_key: "sectionRef",
				ref: sectionRef,
				id: "tech",
				class: "ts-section"
			}, _attrs))} data-v-a5c9ef37><div class="ts-shell" data-v-a5c9ef37><div class="section-header" data-v-a5c9ef37><div class="section-header-wrapper" data-v-a5c9ef37><h2 class="section-title" data-v-a5c9ef37><span class="section-title-word" data-v-a5c9ef37>Tech</span><span class="section-title-word accent" data-v-a5c9ef37>Stack</span></h2></div><div class="section-separator" data-v-a5c9ef37></div></div><div class="bubble-field" data-v-a5c9ef37><!--[-->`);
			ssrRenderList(stackSkills, (skill, index) => {
				_push(`<div class="bubble-wrapper" style="${ssrRenderStyle({
					"--size": skill.size,
					"--hue": skill.hue
				})}" data-v-a5c9ef37><div class="bubble" data-v-a5c9ef37><span class="bubble-text" data-v-a5c9ef37>${ssrInterpolate(skill.name)}</span></div></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/TechStackSection.vue
var _sfc_setup = TechStackSection_vue_vue_type_script_setup_true_lang_default.setup;
TechStackSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/TechStackSection.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var TechStackSection_default = /* @__PURE__ */ _plugin_vue_export_helper_default(TechStackSection_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-a5c9ef37"]]);
//#endregion
export { TechStackSection_default as default };
