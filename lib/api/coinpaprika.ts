import { coinPaprikaApiBaseUrl } from "../constants";

import { parseRange } from "@/lib/utils";

import type {
  CoinMarket,
  ExchangeMarket,
  HistoricalData,
  Range,
} from "../types";

export async function getHistoricalTicks(
  coinId: string,
  range: Range,
): Promise<HistoricalData[]> {
  const { start, interval } = parseRange(range);

  const res = await fetch(
    `${coinPaprikaApiBaseUrl}/v1/tickers/${coinId}/historical?start=${start}&interval=${interval}`,
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

export async function getExchangeMarkets(
  name: string,
): Promise<ExchangeMarket[]> {
  const res = await fetch(
    `${coinPaprikaApiBaseUrl}/v1/exchanges/${name}/markets`,
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

export async function getCoinMarkets(id: string): Promise<CoinMarket[]> {
  const res = await fetch(`${coinPaprikaApiBaseUrl}/v1/coins/${id}/markets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data;
}
