export interface CoinRank {
  icon: string;
  Name: string;
  symbol: string;
  price: number;
  lastHour: number;
  lastDay: number;
  lastWeek: number;
  marketCap: number;
  dayVolume: number;
  circulatingSupply: number;
  lastWeekChart: string;
}

enum CoinSymbols {
  BTC = "BTC",
  ETH = "ETH",
  USDT = "USDT",
  BNB = "BNB",
  SOL = "SOL",
  USDC = "USDC",
  XRP = "XRP",
  DOGE = "DOGE",
  TON = "TON",
  ADA = "ADA",
}

enum CoinNames {
  Bitcoin = "Bitcoin",
  Ethereum = "Ethereum",
  Tether = "Tether",
  BNB = "BNB",
  Solana = "Solana",
  USDC = "USDC",
  XRP = "XRP",
  Dogecoin = "Dogecoin",
  Toncoin = "Toncoin",
  Cardano = "Cardano",
}

export const nameToSymbolMap: Record<CoinNames, CoinSymbols> = {
  [CoinNames.Bitcoin]: CoinSymbols.BTC,
  [CoinNames.Ethereum]: CoinSymbols.ETH,
  [CoinNames.Tether]: CoinSymbols.USDT,
  [CoinNames.BNB]: CoinSymbols.BNB,
  [CoinNames.Solana]: CoinSymbols.SOL,
  [CoinNames.USDC]: CoinSymbols.USDC,
  [CoinNames.XRP]: CoinSymbols.XRP,
  [CoinNames.Dogecoin]: CoinSymbols.DOGE,
  [CoinNames.Toncoin]: CoinSymbols.TON,
  [CoinNames.Cardano]: CoinSymbols.ADA,
};

export const symbolToNameMap: Record<CoinSymbols, CoinNames> = {
  [CoinSymbols.BTC]: CoinNames.Bitcoin,
  [CoinSymbols.ETH]: CoinNames.Ethereum,
  [CoinSymbols.USDT]: CoinNames.Tether,
  [CoinSymbols.BNB]: CoinNames.BNB,
  [CoinSymbols.SOL]: CoinNames.Solana,
  [CoinSymbols.USDC]: CoinNames.USDC,
  [CoinSymbols.XRP]: CoinNames.XRP,
  [CoinSymbols.DOGE]: CoinNames.Dogecoin,
  [CoinSymbols.TON]: CoinNames.Toncoin,
  [CoinSymbols.ADA]: CoinNames.Cardano,
};

export const coinLogo = (id: number): string =>
  `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;

export const coinLastWeekChart = (id: number): string =>
  `https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${id}.svg`;
