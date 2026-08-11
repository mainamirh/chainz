"use server";

import { coinPaprikaApiBaseUrl } from "../constants";

import { parseRange, fetcher, buildQueryParams } from "@/lib/utils";

import type {
  CoinMarket,
  ExchangeMarket,
  HistoricalData,
  Range,
} from "../../types";

export async function getHistoricalTicks(coinId: string, range: Range) {
  const params = buildQueryParams(parseRange(range));

  return fetcher<HistoricalData[]>(
    `${coinPaprikaApiBaseUrl}/v1/tickers/${coinId}/historical?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export async function getExchangeMarkets(name: string) {
  return fetcher<ExchangeMarket[]>(
    `${coinPaprikaApiBaseUrl}/v1/exchanges/${name}/markets`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export async function getCoinMarkets(id: string): Promise<CoinMarket[]> {
  return fetcher<CoinMarket[]>(
    `${coinPaprikaApiBaseUrl}/v1/coins/${id}/markets`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
