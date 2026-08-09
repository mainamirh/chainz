import type { SymbolOrderbook } from "../types";

import { binanceApiBaseUrl } from "../constants";

export async function getSymbolsOrderbook(
  symbols: string[],
): Promise<SymbolOrderbook[]> {
  const params = new URLSearchParams();
  params.append("symbols", JSON.stringify(symbols));

  const res = await fetch(
    `${binanceApiBaseUrl}/api/v3/ticker/bookTicker?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data;
}
