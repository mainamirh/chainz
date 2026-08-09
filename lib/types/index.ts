export * from "./binance";
export * from "./coinmarketcap";
export * from "./coinpaprika";

export type Theme = "light" | "dark" | "system";

export type QueryParams = Record<
  string,
  string | string[] | number | number[] | boolean | undefined | null
>;
