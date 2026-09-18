//#region resources/js/Utils/analytics.ts
function trackEvent(eventName, props) {
	if (typeof window === "undefined") return;
	if (typeof window.plausible === "function") window.plausible(eventName, props ? { props } : void 0);
	else {
		const plausibleQueue = window.plausible;
		if (plausibleQueue && Array.isArray(plausibleQueue.q)) plausibleQueue.q.push([eventName, props ? { props } : void 0]);
	}
}
function trackAiAssistantOpen(source = "widget") {
	trackEvent("AI Assistant Open", { source });
}
function trackHiringPageView() {
	trackEvent("Hiring Page View");
}
//#endregion
export { trackHiringPageView as n, trackAiAssistantOpen as t };
