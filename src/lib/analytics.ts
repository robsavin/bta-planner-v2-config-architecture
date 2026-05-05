// Analytics tracking has been disabled.
// These no-op exports remain so existing imports continue to work.

export async function trackEvent(_event_type: string, _extra: Record<string, unknown> = {}) {
  /* no-op */
}

export function initAnalytics() {
  /* no-op */
}
