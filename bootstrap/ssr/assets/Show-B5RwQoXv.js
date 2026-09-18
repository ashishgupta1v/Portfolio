import { i as link_default, r as head_default } from "./vendor-inertia-Bgi69XOP.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DMwexRDj.js";
import { t as ArchitectureDiagram_default } from "./ArchitectureDiagram-Bj25jPv4.js";
import { computed, createTextVNode, createVNode, defineComponent, mergeProps, ref, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { ArrowLeft, ArrowUpRight, ExternalLink, Play, RotateCcw } from "lucide-vue-next";
//#region resources/js/Components/PortfolioV2/ResponsiveImage.vue?vue&type=script&setup=true&lang.ts
var ResponsiveImage_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ResponsiveImage",
	__ssrInlineRender: true,
	props: {
		src: {},
		alt: {},
		width: {},
		height: {},
		sizes: {},
		srcset: {},
		webpSrc: {},
		webpSrcset: {},
		eager: { type: Boolean },
		imgClass: {}
	},
	setup(__props) {
		const isLoaded = ref(false);
		const hasError = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({
				class: ["responsive-image", {
					"is-loaded": isLoaded.value,
					"has-error": hasError.value
				}],
				style: { aspectRatio: `${__props.width} / ${__props.height}` }
			}, _attrs))} data-v-a43796f5>`);
			if (__props.webpSrc || __props.webpSrcset) _push(`<picture data-v-a43796f5><source type="image/webp"${ssrRenderAttr("srcset", __props.webpSrcset ?? __props.webpSrc)}${ssrRenderAttr("sizes", __props.sizes)} data-v-a43796f5><img${ssrRenderAttr("src", __props.src)}${ssrRenderAttr("srcset", __props.srcset)}${ssrRenderAttr("sizes", __props.sizes)}${ssrRenderAttr("alt", __props.alt)}${ssrRenderAttr("width", __props.width)}${ssrRenderAttr("height", __props.height)}${ssrRenderAttr("loading", __props.eager ? "eager" : "lazy")}${ssrRenderAttr("fetchpriority", __props.eager ? "high" : "auto")} decoding="async" class="${ssrRenderClass(__props.imgClass)}" data-v-a43796f5></picture>`);
			else _push(`<img${ssrRenderAttr("src", __props.src)}${ssrRenderAttr("srcset", __props.srcset)}${ssrRenderAttr("sizes", __props.sizes)}${ssrRenderAttr("alt", __props.alt)}${ssrRenderAttr("width", __props.width)}${ssrRenderAttr("height", __props.height)}${ssrRenderAttr("loading", __props.eager ? "eager" : "lazy")}${ssrRenderAttr("fetchpriority", __props.eager ? "high" : "auto")} decoding="async" class="${ssrRenderClass(__props.imgClass)}" data-v-a43796f5>`);
			_push(`</span>`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/ResponsiveImage.vue
var _sfc_setup$2 = ResponsiveImage_vue_vue_type_script_setup_true_lang_default.setup;
ResponsiveImage_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/ResponsiveImage.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var ResponsiveImage_default = /* @__PURE__ */ _plugin_vue_export_helper_default(ResponsiveImage_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-a43796f5"]]);
//#endregion
//#region resources/js/Components/PortfolioV2/LiveCodeDemo.vue?vue&type=script&setup=true&lang.ts
var LiveCodeDemo_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "LiveCodeDemo",
	__ssrInlineRender: true,
	props: { slug: {} },
	setup(__props) {
		const props = __props;
		const demos = { "zoeticoach-ai": {
			title: "WhatsApp Message Flow",
			description: "Interactive demo of the accountability check-in message flow.",
			html: `<div class="wa-chat">
  <div class="wa-msg bot">👋 Hey! Time for your daily check-in. How are you progressing on your goal?</div>
  <div class="wa-msg user" id="reply" style="display:none">I completed 2 out of 3 tasks today!</div>
  <div class="wa-msg bot" id="response" style="display:none">🎉 Great progress! You're 67% done. Keep pushing — consistency beats perfection. See you tomorrow!</div>
  <button class="wa-btn" id="sendBtn" onclick="sendReply()">Send Reply</button>
</div>`,
			css: `.wa-chat { max-width: 320px; margin: 0 auto; font-family: system-ui; }
.wa-msg { padding: 8px 12px; border-radius: 8px; margin: 6px 0; font-size: 14px; line-height: 1.5; }
.wa-msg.bot { background: #1a2e1a; color: #dcfce7; margin-right: 40px; }
.wa-msg.user { background: #065f46; color: #d1fae5; margin-left: 40px; }
.wa-btn { background: #25D366; color: white; border: none; padding: 8px 20px; border-radius: 20px; cursor: pointer; font-weight: 600; margin-top: 8px; width: 100%; }
.wa-btn:hover { opacity: 0.9; }
.wa-btn:disabled { opacity: 0.5; cursor: not-allowed; }`,
			js: `function sendReply() {
  document.getElementById('reply').style.display = 'block';
  document.getElementById('sendBtn').disabled = true;
  document.getElementById('sendBtn').textContent = 'Sending...';
  setTimeout(() => {
    document.getElementById('response').style.display = 'block';
    document.getElementById('sendBtn').textContent = '✓ Delivered';
  }, 1200);
}`
		} };
		const demo = computed(() => demos[props.slug] || null);
		const running = ref(false);
		const srcDoc = computed(() => {
			if (!demo.value || !running.value) return `<!DOCTYPE html><html><head><style>body { margin: 0; background: #0f1419; }</style></head><body></body></html>`;
			return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { padding: 18px 16px; background: #0f1419; color: #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    ${demo.value.css}
  </style>
</head>
<body>
  ${demo.value.html}
  <script>
    ${demo.value.js}
  <\/script>
</body>
</html>`;
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (demo.value) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "code-demo" }, _attrs))} data-v-70cd03cf><div class="demo-header" data-v-70cd03cf><h4 class="demo-title" data-v-70cd03cf>${ssrInterpolate(demo.value.title)}</h4><p class="demo-desc" data-v-70cd03cf>${ssrInterpolate(demo.value.description)}</p></div><div class="demo-preview" data-v-70cd03cf><iframe class="demo-iframe"${ssrRenderAttr("srcdoc", srcDoc.value)} sandbox="allow-scripts" title="Interactive demo" data-v-70cd03cf></iframe>`);
				if (!running.value) {
					_push(`<div class="demo-overlay" role="button" tabindex="0" aria-label="Run interactive demo" data-v-70cd03cf>`);
					_push(ssrRenderComponent(unref(Play), {
						size: 32,
						class: "demo-play-icon",
						"aria-hidden": "true"
					}, null, _parent));
					_push(`<span data-v-70cd03cf>Run Demo</span></div>`);
				} else _push(`<!---->`);
				_push(`</div><div class="demo-controls" data-v-70cd03cf><button class="demo-btn" type="button" data-v-70cd03cf>`);
				_push(ssrRenderComponent(unref(Play), {
					size: 14,
					"aria-hidden": "true"
				}, null, _parent));
				_push(` Run </button><button class="demo-btn demo-btn--ghost" type="button" data-v-70cd03cf>`);
				_push(ssrRenderComponent(unref(RotateCcw), {
					size: 14,
					"aria-hidden": "true"
				}, null, _parent));
				_push(` Reset </button></div></div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region resources/js/Components/PortfolioV2/LiveCodeDemo.vue
var _sfc_setup$1 = LiveCodeDemo_vue_vue_type_script_setup_true_lang_default.setup;
LiveCodeDemo_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PortfolioV2/LiveCodeDemo.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var LiveCodeDemo_default = /* @__PURE__ */ _plugin_vue_export_helper_default(LiveCodeDemo_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-70cd03cf"]]);
//#endregion
//#region resources/js/Pages/Projects/Show.vue?vue&type=script&setup=true&lang.ts
var resumeUrl = "/resume";
var Show_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "Show",
	__ssrInlineRender: true,
	props: {
		project: {},
		caseStudySlug: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(head_default), { title: `${__props.project.title} — Ashish Gupta` }, null, _parent));
			_push(`<main class="project-page" data-v-bdd29594><div class="project-shell" data-v-bdd29594>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/#works",
				class: "project-back"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(ArrowLeft), {
							size: 14,
							"aria-hidden": "true"
						}, null, _parent, _scopeId));
						_push(`<span data-v-bdd29594${_scopeId}>All work</span>`);
					} else return [createVNode(unref(ArrowLeft), {
						size: 14,
						"aria-hidden": "true"
					}), createVNode("span", null, "All work")];
				}),
				_: 1
			}, _parent));
			_push(`<header class="project-header" data-v-bdd29594><span class="project-category" data-v-bdd29594>${ssrInterpolate(__props.project.category)}</span><h1 class="project-title" data-v-bdd29594>${ssrInterpolate(__props.project.title)}</h1><p class="project-description" data-v-bdd29594>${ssrInterpolate(__props.project.description)}</p><div class="project-actions" data-v-bdd29594>`);
			if (__props.project.externalUrl) {
				_push(`<a${ssrRenderAttr("href", __props.project.externalUrl)} target="_blank" rel="noopener noreferrer" class="project-cta project-cta--primary" data-v-bdd29594><span data-v-bdd29594>Visit live site</span>`);
				_push(ssrRenderComponent(unref(ExternalLink), {
					size: 14,
					"aria-hidden": "true"
				}, null, _parent));
				_push(`</a>`);
			} else _push(`<!---->`);
			if (__props.caseStudySlug) _push(ssrRenderComponent(unref(link_default), {
				href: `/case-studies/${__props.caseStudySlug}`,
				class: "project-cta project-cta--ghost"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<span data-v-bdd29594${_scopeId}>Read architecture case study</span>`);
						_push(ssrRenderComponent(unref(ArrowUpRight), {
							size: 14,
							"aria-hidden": "true"
						}, null, _parent, _scopeId));
					} else return [createVNode("span", null, "Read architecture case study"), createVNode(unref(ArrowUpRight), {
						size: 14,
						"aria-hidden": "true"
					})];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`<a href="mailto:ashishgupta1v@gmail.com" class="project-cta project-cta--ghost" data-v-bdd29594><span data-v-bdd29594>Contact Ashish</span>`);
			_push(ssrRenderComponent(unref(ArrowUpRight), {
				size: 14,
				"aria-hidden": "true"
			}, null, _parent));
			_push(`</a></div></header>`);
			if (__props.project.imageUrl) {
				_push(`<section class="project-media" aria-label="Project preview" data-v-bdd29594>`);
				_push(ssrRenderComponent(ResponsiveImage_default, {
					src: __props.project.imageUrl,
					alt: `Preview of ${__props.project.title}`,
					width: 1200,
					height: 720,
					eager: true,
					class: "project-image"
				}, null, _parent));
				_push(`</section>`);
			} else _push(`<!---->`);
			_push(ssrRenderComponent(ArchitectureDiagram_default, { slug: __props.project.slug }, null, _parent));
			_push(ssrRenderComponent(LiveCodeDemo_default, { slug: __props.project.slug }, null, _parent));
			_push(`<section class="project-details" data-v-bdd29594><div data-v-bdd29594><h2 class="project-h2" data-v-bdd29594>Stack &amp; tooling</h2><ul class="project-tools" data-v-bdd29594><!--[-->`);
			ssrRenderList(__props.project.tools, (tool) => {
				_push(`<li class="project-tool" data-v-bdd29594>${ssrInterpolate(tool)}</li>`);
			});
			_push(`<!--]--></ul></div><div data-v-bdd29594><h2 class="project-h2" data-v-bdd29594>Role &amp; Opportunity</h2><p class="project-body" data-v-bdd29594> Looking for a Senior / Staff Full-Stack Architect who can lead technical initiatives, design scalable systems, and execute end-to-end with high velocity? </p><p class="project-body" data-v-bdd29594>`);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/#contact",
				class: "inline-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Discuss an engineering role`);
					else return [createTextVNode("Discuss an engineering role")];
				}),
				_: 1
			}, _parent));
			_push(`  ·  `);
			_push(ssrRenderComponent(unref(link_default), {
				href: "/for-hiring-managers",
				class: "inline-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`For hiring managers`);
					else return [createTextVNode("For hiring managers")];
				}),
				_: 1
			}, _parent));
			_push(`  ·  <a${ssrRenderAttr("href", resumeUrl)} download="Ashish-Gupta-Resume.pdf" class="inline-link" data-v-bdd29594>Download Résumé</a></p></div></section></div></main><!--]-->`);
		};
	}
});
//#endregion
//#region resources/js/Pages/Projects/Show.vue
var _sfc_setup = Show_vue_vue_type_script_setup_true_lang_default.setup;
Show_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Show.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Show_default = /* @__PURE__ */ _plugin_vue_export_helper_default(Show_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-bdd29594"]]);
//#endregion
export { Show_default as default };
