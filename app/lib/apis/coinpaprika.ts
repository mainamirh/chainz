"use server";

const apiBaseUrl = "https://api.coinpaprika.com";

type Interval =
  | "1h"
  | "2h"
  | "3h"
  | "6h"
  | "12h"
  | "24h"
  | "1d"
  | "7d"
  | "14d"
  | "30d"
  | "90d"
  | "365d";

export type Range = "1D" | "7D" | "1M" | "1Y";

function parseRange(range: Range): {
  start: EpochTimeStamp;
  interval: Interval;
} {
  const now = new Date();
  let start: Date;

  switch (range) {
    case "1D":
      start = new Date(now.getTime() - 24 * 60 * 59 * 1000);
      return { start: Math.floor(start.getTime() / 1000), interval: "1h" };

    case "7D":
      start = new Date(now.getTime() - 7 * 24 * 60 * 59 * 1000);
      return { start: Math.floor(start.getTime() / 1000), interval: "1d" };

    case "1M":
      start = new Date(now.getTime() - 30 * 24 * 60 * 59 * 1000);
      return { start: Math.floor(start.getTime() / 1000), interval: "1d" };

    case "1Y":
      start = new Date(now.getTime() - 365 * 24 * 60 * 59 * 1000);
      return { start: Math.floor(start.getTime() / 1000), interval: "1d" };

    default:
      throw new Error("Invalid range");
  }
}

export type HistoricalData = {
  timestamp: string;
  price: number;
  volume_24h: number;
  market_cap: number;
};

export async function getHistoricalTicks(
  coinId: string,
  range: Range,
): Promise<HistoricalData[]> {
  const { start, interval } = parseRange(range);

  const res = await fetch(
    `${apiBaseUrl}/v1/tickers/${coinId}/historical?start=${start}&interval=${interval}`,
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
export interface ExchangeMarket {
  pair: string;
  base_currency_id: string;
  base_currency_name: string;
  quote_currency_id: string;
  quote_currency_name: string;
  market_url: string;
  category: string;
  fee_type: string;
  outlier: boolean;
  reported_volume_24h_share: number;
  quotes: {
    USD: { price: number; volume_24h: number };
    [key: string]: { price: number; volume_24h: number };
  };
  trust_score: string;
  last_updated: string;
}

export async function getExchangeMarkets(
  name: string,
): Promise<ExchangeMarket[]> {
  const res = await fetch(`${apiBaseUrl}/v1/exchanges/${name}/markets`, {
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

export interface CoinMarket {
  exchange_id: string;
  exchange_name: string;
  pair: string;
  base_currency_id: string;
  base_currency_name: string;
  quote_currency_id: string;
  quote_currency_name: string;
  market_url: string;
  category: string;
  fee_type: string;
  outlier: boolean;
  adjusted_volume_24h_share: number;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
    };
    [key: string]: { price: number; volume_24h: number };
  };
  trust_score: string;
  last_updated: string;
}

export async function getCoinMarkets(id: string): Promise<CoinMarket[]> {
  const res = await fetch(`${apiBaseUrl}/v1/coins/${id}/markets`, {
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
