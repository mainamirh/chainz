import { CoinRank } from "./definitions";

const exchanges = {
  x_coins:
    "https://cryptoradar.com/storage/brokers/2LmgJgUi1JVl3eSSDrrH0necaojRzIpg6H5k8maF.optimized.png",
};

const coinsLastWeekChart = {
  bitcoin: "https://cryptoradar.com/storage/sparklines/btc-bitcoin.svg",
};

const coinIcon = {
  bitcoin: "https://cryptoradar.com/images/coins/24/BTC.svg",
};

export const CoinsRanking: CoinRank[] = [
  {
    icon: coinIcon.bitcoin,
    Name: "Bitcoin",
    symbol: "BTC",
    bestBuyPrice: 67532.08,
    buyExchange: exchanges.x_coins,
    bestSellPrice: 68532.08,
    sellExchange: exchanges.x_coins,
    marketCap: 1332,
    lastHour: 0.22,
    lastDay: 0.19,
    lastWeek: 7.9,
    lastWeekChart: coinsLastWeekChart.bitcoin,
  },
];
