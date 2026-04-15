import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics } from "./lib/analytics";

initAnalytics();

// Clear stale Radix scroll-lock attributes that may persist from a previous
// Dialog / Sheet session (e.g. when the page is restored from bfcache).
function clearStaleScrollLock() {
  if (document.body.hasAttribute("data-scroll-locked")) {
    document.body.removeAttribute("data-scroll-locked");
    document.body.style.removeProperty("pointer-events");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("padding-right");
  }
}
clearStaleScrollLock();
// Also observe in case Radix applies it before React hydrates
const scrollLockObserver = new MutationObserver(() => {
  // Only clear if no Radix overlay is actually visible
  const hasOpenOverlay = document.querySelector("[data-state='open'][role='dialog']");
  if (!hasOpenOverlay && document.body.hasAttribute("data-scroll-locked")) {
    clearStaleScrollLock();
  }
});
scrollLockObserver.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });
// Stop observing once app is fully mounted (after 5s)
setTimeout(() => scrollLockObserver.disconnect(), 5000);

// Read trail ID from data attribute on mount element
const rootEl = document.getElementById("root")!;
const trailId = rootEl.getAttribute("data-trail") || undefined;

// Store on window for access in getTrailConfig
(window as any).__BTA_TRAIL_ID__ = trailId;

createRoot(rootEl).render(<App />);
