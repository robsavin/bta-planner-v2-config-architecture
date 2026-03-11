import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics } from "./lib/analytics";

initAnalytics();

// Read trail ID from data attribute on mount element
const rootEl = document.getElementById("root")!;
const trailId = rootEl.getAttribute("data-trail") || undefined;

// Store on window for access in getTrailConfig
(window as any).__BTA_TRAIL_ID__ = trailId;

createRoot(rootEl).render(<App />);
