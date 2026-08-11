"use server";

import { fetcher, buildQueryParams } from "../utils";
import { binanceApiBaseUrl } from "../constants";
import type { SymbolOrderbook, GetSymbolsOrderbookQuery } from "../../types";

export async function getSymbolsOrderbook(query: GetSymbolsOrderbookQuery) {
  const params = buildQueryParams(query);

  return fetcher<SymbolOrderbook[]>(
    `${binanceApiBaseUrl}/api/v3/ticker/bookTicker?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
