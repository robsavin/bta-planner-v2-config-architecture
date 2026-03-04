// === Planner Analytics Tracker ===
// Paste this into your planner project (e.g. in a useEffect or utility file)
const TRACKER_URL = "https://yghyzgnotxvirnyowiii.supabase.co/functions/v1/track";
const API_KEY = "87b8f146-1aa2-419e-bf4d-c7daf6b2147e";

function generateUserId() {
  let id = localStorage.getItem("_pa_uid");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("_pa_uid", id);
  }
  return id;
}

export async function trackEvent(event_type: string, extra: Record<string, unknown> = {}) {
  try {
    await fetch(TRACKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: API_KEY,
        events: [
          {
            event_type,
            user_identifier: generateUserId(),
            page_url: window.location.pathname,
            referrer: document.referrer,
            ...extra,
          },
        ],
      }),
    });
  } catch (e) {
    /* silent */
  }
}

export function initAnalytics() {
  trackEvent("page_view");
  trackEvent("session_start");
}
