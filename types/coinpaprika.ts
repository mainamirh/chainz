export type Interval =
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

export type HistoricalData = {
  timestamp: string;
  price: number;
  volume_24h: number;
  market_cap: number;
};

export type ExchangeMarket = {
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
};

export type CoinMarket = {
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
};
