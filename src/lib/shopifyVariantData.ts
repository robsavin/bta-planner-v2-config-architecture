const normalizeToken = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const paceCandidates = (pace: string) => {
  const base = pace.trim().toLowerCase().replace(/_/g, "-");
  const kebab = base.replace(/\s+/g, "-");
  const condensed = kebab.replace(/-/g, "");

  const candidates = new Set<string>([kebab, condensed]);

  // Compatibility: some pace ids are condensed (trailrunner) while attrs are hyphenated (trail-runner)
  if (condensed === "trailrunner") {
    candidates.add("trail-runner");
  }

  return [...candidates];
};

const toDatasetSuffix = (kebabOrWord: string) =>
  kebabOrWord
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

function getDatasetValueForPace(prefix: "variant" | "variantPrice", pace: string): string | null {
  const root = document.getElementById("root");
  if (!root) return null;

  const candidates = paceCandidates(pace);

  // Fast path: exact computed keys (e.g. variantHiker, variantPriceTrailRunner)
  for (const candidate of candidates) {
    const suffix = toDatasetSuffix(candidate);
    const key = `${prefix}${suffix}` as keyof DOMStringMap;
    const value = root.dataset[key];
    if (value) return value;
  }

  // Fallback: normalized comparison across dataset keys
  const candidateTokens = new Set(candidates.map(normalizeToken));
  for (const [key, value] of Object.entries(root.dataset)) {
    if (!value || !key.startsWith(prefix)) continue;
    const token = normalizeToken(key.slice(prefix.length));
    if (candidateTokens.has(token)) return value;
  }

  return null;
}

export function getVariantIdForPace(pace: string): string | null {
  return getDatasetValueForPace("variant", pace);
}

export function getVariantPriceForPace(pace: string): number | null {
  const raw = getDatasetValueForPace("variantPrice", pace);
  if (!raw) return null;
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : null;
}
