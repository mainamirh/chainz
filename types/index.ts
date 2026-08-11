export * from "./binance";
export * from "./coinmarketcap";
export * from "./coinpaprika";

export type Theme = "light" | "dark" | "system";

export type QueryParams = Record<
  string,
  string | string[] | number | number[] | boolean | undefined | null
>;

export type TokenMap = {
  [name: string]: {
    symbol: string;
    totalValue: number;
    cryptoId: number;
  };
};

export type AggregatedAllocation = {
  symbol: string;
  totalValue: number;
  percentage: number;
  cryptoId: number;
};
