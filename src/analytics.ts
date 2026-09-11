const MEASUREMENT_ID = "G-BPGXWS5CBK";

declare global {
	interface Window {
		dataLayer: unknown[];
		gtag: (...args: unknown[]) => void;
	}
}

const trackEvent = (eventName: string, parameters: Record<string, unknown> = {}) => {
	if (typeof window === "undefined" || typeof window.gtag !== "function") {
		return;
	}

	window.gtag("event", eventName, {
		...parameters,
		send_to: MEASUREMENT_ID,
	});
};

const getElementLabel = (element: Element) =>
	element.getAttribute("aria-label") ||
	element.getAttribute("title") ||
	element.textContent?.trim().replace(/\s+/g, " ").slice(0, 100) ||
	"unlabeled";

export const initializeAnalytics = () => {
	if (typeof window === "undefined" || typeof document === "undefined") {
		return () => undefined;
	}

	let touchStart: { x: number; y: number } | null = null;
	let sessionCloseSent = false;

	const handleClick = (event: MouseEvent) => {
		const target = event.target as Element | null;
		const interactiveElement = target?.closest("button, a, [data-analytics-event]");

		if (!interactiveElement) {
			return;
		}

		trackEvent(interactiveElement.getAttribute("data-analytics-event") || "click", {
			interaction_type: interactiveElement.matches("button") ? "button" : "link",
			label: getElementLabel(interactiveElement),
			target: interactiveElement.getAttribute("href") || undefined,
		});
	};

	const handleTouchStart = (event: TouchEvent) => {
		const touch = event.changedTouches[0];
		touchStart = { x: touch.clientX, y: touch.clientY };
	};

	const handleTouchEnd = (event: TouchEvent) => {
		if (!touchStart) {
			return;
		}

		const touch = event.changedTouches[0];
		const deltaX = touch.clientX - touchStart.x;
		const deltaY = touch.clientY - touchStart.y;
		const distance = Math.max(Math.abs(deltaX), Math.abs(deltaY));
		touchStart = null;

		if (distance < 40) {
			return;
		}

		trackEvent("swipe", {
			direction: Math.abs(deltaX) > Math.abs(deltaY) ? (deltaX > 0 ? "right" : "left") : deltaY > 0 ? "down" : "up",
			distance,
		});
	};

	const handleVisibilityChange = () => {
		trackEvent("page_visibility", { state: document.visibilityState });
	};

	const handlePageHide = () => {
		if (!sessionCloseSent) {
			sessionCloseSent = true;
			trackEvent("page_close");
		}
	};

	trackEvent("portfolio_session_start");
	document.addEventListener("click", handleClick);
	document.addEventListener("touchstart", handleTouchStart, { passive: true });
	document.addEventListener("touchend", handleTouchEnd, { passive: true });
	document.addEventListener("visibilitychange", handleVisibilityChange);
	window.addEventListener("pagehide", handlePageHide);

	const observedElements = new WeakSet<Element>();
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					trackEvent(entry.target.hasAttribute("data-slide") ? "slide_view" : "section_view", {
						label: entry.target.getAttribute("data-slide") || entry.target.id,
					});
				}
			});
		},
		{ threshold: 0.5 },
	);

	const observeAnalyticsElements = (root: ParentNode) => {
		root.querySelectorAll<HTMLElement>("[data-slide], section[id]").forEach((element) => {
			if (!observedElements.has(element)) {
				observedElements.add(element);
				observer.observe(element);
			}
		});
	};

	observeAnalyticsElements(document);
	const mutationObserver = new MutationObserver(() => observeAnalyticsElements(document));
	mutationObserver.observe(document.body, { childList: true, subtree: true });

	return () => {
		document.removeEventListener("click", handleClick);
		document.removeEventListener("touchstart", handleTouchStart);
		document.removeEventListener("touchend", handleTouchEnd);
		document.removeEventListener("visibilitychange", handleVisibilityChange);
		window.removeEventListener("pagehide", handlePageHide);
		observer.disconnect();
		mutationObserver.disconnect();
	};
};
