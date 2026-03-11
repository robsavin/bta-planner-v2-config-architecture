const BTA_CURRENCY_CONFIG: Record<string, { symbol: string; rate: number }> = {
  GBP: { symbol: "£", rate: 1 },
  USD: { symbol: "$", rate: 1.375623 },
  AUD: { symbol: "A$", rate: 1.9470168 },
};

export function useCurrency() {
  const active = (window as any).Shopify?.currency?.active ?? "GBP";
  const config = BTA_CURRENCY_CONFIG[active] ?? BTA_CURRENCY_CONFIG.GBP;

  function formatPrice(gbpAmount: number): string {
    return `${config.symbol}${Math.round(gbpAmount * config.rate).toLocaleString()}`;
  }

  function convertAmount(gbpAmount: number): number {
    return Math.round(gbpAmount * config.rate);
  }

  return {
    symbol: config.symbol,
    rate: config.rate,
    currency: active,
    formatPrice,
    convertAmount,
  };
}
